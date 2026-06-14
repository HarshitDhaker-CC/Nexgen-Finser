'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { addLead } from '@/lib/storage';

interface LeadForm {
  name: string;
  phone: string;
  message: string;
}

interface LeadFormCardProps {
  type: 'callback' | 'portfolio_review' | 'health_check';
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function LeadFormCard({ type, title, description, icon }: LeadFormCardProps) {
  const [form, setForm] = useState<LeadForm>({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setLoading(true);
    try {
      // Try API first
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name: form.name, phone: form.phone, message: form.message }),
      });
      if (!res.ok) throw new Error('API failed');
    } catch {
      // Fallback to localStorage
      addLead({ type, name: form.name, phone: form.phone, message: form.message });
    }
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid rgba(200,167,93,0.15)', boxShadow: '0 4px 24px rgba(11,31,58,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', textAlign: 'center', gap: '1rem' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(15,118,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={36} color="var(--emerald)" />
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--navy)', fontSize: '1.5rem' }}>Thank You!</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          We've received your request. Our advisor will contact you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }); }}
          className="btn-outline"
          style={{ marginTop: '0.5rem', fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid rgba(200,167,93,0.15)', boxShadow: '0 4px 24px rgba(11,31,58,0.07)', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '0.875rem', background: 'rgba(11,31,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '0.125rem' }}>{title}</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <input
          type="text" required placeholder="Your Full Name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-premium"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem' }}
        />
        <input
          type="tel" required placeholder="Phone Number"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input-premium"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem' }}
        />
        <textarea
          placeholder="Your message (optional)" rows={3}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-premium"
          style={{ resize: 'none', fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem' }}
        />
        <button type="submit" className="btn-gold" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? 'Sending…' : 'Submit Request'}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>
    </div>
  );
}
