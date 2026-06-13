// ─────────────────────────────────────────────────────────────────────────────
// storage.ts
// Nexgen Finser — Lead management system backed by localStorage
// ─────────────────────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';
export type LeadType = 'callback' | 'portfolio_review' | 'health_check';

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: LeadStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'nexgen_leads';

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Returns true when running in a browser environment (guards against SSR). */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/** Generate a simple unique ID (timestamp + random hex segment). */
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 9);
  return `${timestamp}-${random}`;
}

/** Read raw leads array from localStorage; returns [] on any error or SSR. */
function readFromStorage(): Lead[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Lead[];
  } catch {
    // JSON parse error or security exception — start fresh
    return [];
  }
}

/** Persist leads array to localStorage; silently no-ops on SSR. */
function writeToStorage(leads: Lead[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch {
    // QuotaExceededError or similar — fail silently
  }
}

// ─── Escape a single CSV field value ─────────────────────────────────────────

function escapeCsvField(value: string | undefined): string {
  if (value === undefined || value === null) return '';
  // Wrap in double-quotes and escape internal double-quotes
  const escaped = value.toString().replace(/"/g, '""');
  return `"${escaped}"`;
}

// ─── Public CRUD API ──────────────────────────────────────────────────────────

/**
 * Retrieve all leads from localStorage.
 * Returns an empty array when called server-side.
 */
export function getLeads(): Lead[] {
  return readFromStorage();
}

/**
 * Persist a new lead.
 * Automatically assigns: id, status = 'new', createdAt, updatedAt.
 *
 * @param lead - Lead data without auto-assigned fields
 * @returns    - The fully hydrated lead object that was stored
 */
export function addLead(
  lead: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
): Lead {
  const now = new Date().toISOString();
  const newLead: Lead = {
    ...lead,
    id: generateId(),
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };

  const existing = readFromStorage();
  writeToStorage([...existing, newLead]);
  return newLead;
}

/**
 * Update the status of an existing lead.
 * Also updates the `updatedAt` timestamp.
 * Silently no-ops if no lead with the given id is found.
 *
 * @param id     - The lead's unique identifier
 * @param status - The new status value
 */
export function updateLeadStatus(id: string, status: LeadStatus): void {
  const leads = readFromStorage();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return;

  leads[index] = {
    ...leads[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  writeToStorage(leads);
}

/**
 * Permanently delete a lead by id.
 * Silently no-ops if no matching lead is found.
 *
 * @param id - The lead's unique identifier
 */
export function deleteLead(id: string): void {
  const leads = readFromStorage();
  const filtered = leads.filter((l) => l.id !== id);
  writeToStorage(filtered);
}

/**
 * Export all leads as a CSV file and trigger a browser download.
 * No-ops when called server-side (SSR / Node.js environment).
 *
 * CSV columns:
 *   ID, Type, Name, Phone, Email, Message, Status, Created At, Updated At
 */
export function exportLeadsCSV(): void {
  if (!isBrowser()) return;

  const leads = readFromStorage();

  const header = [
    'ID',
    'Type',
    'Name',
    'Phone',
    'Email',
    'Message',
    'Status',
    'Created At',
    'Updated At',
  ].join(',');

  const rows = leads.map((lead) =>
    [
      escapeCsvField(lead.id),
      escapeCsvField(lead.type),
      escapeCsvField(lead.name),
      escapeCsvField(lead.phone),
      escapeCsvField(lead.email),
      escapeCsvField(lead.message),
      escapeCsvField(lead.status),
      escapeCsvField(lead.createdAt),
      escapeCsvField(lead.updatedAt),
    ].join(','),
  );

  const csvContent = [header, ...rows].join('\r\n');

  // Build a Blob and create a temporary object URL for the download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const filename = `nexgen_leads_${timestamp}.csv`;

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.setAttribute('download', filename);
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();

  // Clean up — revoke the object URL after a short delay to allow the download
  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 150);
}
