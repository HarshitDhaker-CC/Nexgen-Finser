import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

interface LeadEntry {
  id: string;
  type: string;
  name: string;
  phone: string;
  message?: string;
  status: 'new';
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

function readLeads(): LeadEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as LeadEntry[];
  } catch {
    return [];
  }
}

function writeLeads(leads: LeadEntry[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { type?: string; name?: string; phone?: string; message?: string };
    const { type = 'callback', name = '', phone = '', message = '' } = body;

    if (!name.trim() || !phone.trim()) {
      return Response.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    const leads = readLeads();
    const newLead: LeadEntry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type,
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    writeLeads(leads);

    return Response.json({ success: true, id: newLead.id });
  } catch (error) {
    console.error('Lead API error:', error);
    return Response.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Simple admin read (no auth here — admin page uses password gate)
  const leads = readLeads();
  return Response.json({ leads });
}
