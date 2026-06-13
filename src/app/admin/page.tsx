'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getLeads,
  addLead,
  updateLeadStatus,
  deleteLead,
  exportLeadsCSV,
} from '@/lib/storage';
import type { Lead, LeadStatus } from '@/lib/storage';

// ─── Constants ───────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'nexgen2025';
const SESSION_KEY = 'nexgen_admin_auth';

type FilterStatus = 'all' | LeadStatus;

const STATUS_FILTER_TABS: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Converted', value: 'converted' },
];

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function statusStyle(status: LeadStatus): { bg: string; color: string; label: string } {
  const map: Record<LeadStatus, { bg: string; color: string; label: string }> = {
    new: { bg: 'rgba(22,163,74,0.12)', color: '#16a34a', label: 'New' },
    contacted: { bg: 'rgba(59,130,246,0.12)', color: '#2563eb', label: 'Contacted' },
    qualified: { bg: 'rgba(234,179,8,0.14)', color: '#b45309', label: 'Qualified' },
    converted: { bg: 'rgba(15,118,110,0.12)', color: '#0F766E', label: 'Converted' },
  };
  return map[status];
}

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    callback: 'Callback',
    portfolio_review: 'Portfolio Review',
    health_check: 'Health Check',
  };
  return map[type] ?? type;
}

// ─── Sample lead data for seeding ────────────────────────────────────────────

const SAMPLE_LEADS = [
  {
    type: 'callback' as const,
    name: 'Ravi Sharma',
    phone: '9876543201',
    email: 'ravi.sharma@email.com',
    message: 'Interested in starting SIP of ₹5,000/month for 10 years.',
  },
  {
    type: 'portfolio_review' as const,
    name: 'Priya Mehta',
    phone: '8765432190',
    email: 'priya.mehta@email.com',
    message: 'Need help reviewing existing portfolio and rebalancing.',
  },
  {
    type: 'health_check' as const,
    name: 'Ankit Gupta',
    phone: '7654321089',
    email: 'ankit.gupta@email.com',
    message: 'Want to plan for retirement at 55. Currently 32 years old.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  accent,
  icon,
  badge,
}: {
  title: string;
  value: number;
  accent: string;
  icon: React.ReactNode;
  badge?: { label: string; color: string };
}) {
  return (
    <div
      className="metric-card relative"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}15` }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: badge.color + '18',
              color: badge.color,
              fontFamily: 'Work Sans, sans-serif',
            }}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div
        className="text-3xl font-bold mb-1"
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          color: accent,
        }}
      >
        {value}
      </div>
      <div
        className="text-sm text-gray-500"
        style={{ fontFamily: 'Work Sans, sans-serif' }}
      >
        {title}
      </div>
    </div>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate brief delay for UX
    await new Promise((r) => setTimeout(r, 500));

    if (password === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // sessionStorage blocked — proceed anyway
      }
      onAuthenticated();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 60%, #132d54 100%)',
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 40%, #C8A75D 0%, transparent 50%), radial-gradient(circle at 80% 60%, #0F766E 0%, transparent 40%)',
        }}
      />

      <div
        className="w-full max-w-md relative z-10 p-8 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(200,167,93,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'rgba(200,167,93,0.15)', border: '1px solid rgba(200,167,93,0.3)' }}
          >
            <svg className="w-7 h-7" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Nexgen Finser Admin
          </h1>
          <p className="text-blue-100/50 text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Enter your password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Work Sans, sans-serif' }}
            >
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: error
                    ? '1.5px solid rgba(239,68,68,0.6)'
                    : '1.5px solid rgba(255,255,255,0.12)',
                  color: 'white',
                  fontFamily: 'IBM Plex Mono, monospace',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <p
                className="mt-2 text-xs flex items-center gap-1.5"
                style={{ color: '#f87171', fontFamily: 'Work Sans, sans-serif' }}
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              color: 'white',
              fontFamily: 'Work Sans, sans-serif',
              boxShadow: '0 4px 16px rgba(200,167,93,0.3)',
            }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Verifying…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Access Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load leads from storage
  const loadLeads = useCallback(() => {
    setLeads(getLeads());
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Handle status update
  const handleStatusUpdate = (id: string, status: LeadStatus) => {
    updateLeadStatus(id, status);
    loadLeads();
    showToast(`Status updated to "${status}"`);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteLead(id);
      loadLeads();
      setDeleteConfirm(null);
      showToast('Lead deleted successfully');
    } else {
      setDeleteConfirm(id);
      // Auto-cancel after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  // Seed sample leads
  const handleSeedData = async () => {
    setSeeding(true);
    for (const lead of SAMPLE_LEADS) {
      addLead(lead);
      await new Promise((r) => setTimeout(r, 100));
    }
    loadLeads();
    setSeeding(false);
    showToast('3 sample leads added successfully!');
  };

  // Filtered leads
  const filteredLeads =
    filterStatus === 'all' ? leads : leads.filter((l) => l.status === filterStatus);

  // Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;

  return (
    <div className="min-h-screen" style={{ background: '#f1f5f9' }}>
      {/* Toast */}
      {toast && (
        <div
          className="toast"
          style={{
            borderLeftColor: toast.type === 'error' ? '#ef4444' : 'var(--gold)',
          }}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* ── Admin Header ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 shadow-sm"
        style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(200,167,93,0.2)' }}
      >
        <div className="container-custom py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(200,167,93,0.15)', border: '1px solid rgba(200,167,93,0.3)' }}
            >
              <svg className="w-5 h-5" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div
                className="font-bold text-white text-sm leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Nexgen Finser Admin
              </div>
              <div className="text-white/40 text-xs" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                Lead Management Dashboard
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:block text-xs px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(22,163,74,0.2)', color: '#4ade80', fontFamily: 'Work Sans, sans-serif' }}
            >
              ● Live
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Work Sans, sans-serif' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8 space-y-8">
        {/* ── Stats Row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value={totalLeads}
            accent="var(--navy)"
            icon={
              <svg className="w-5 h-5" style={{ color: 'var(--navy)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <StatCard
            title="New Leads"
            value={newLeads}
            accent="#16a34a"
            icon={
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            badge={{ label: 'New', color: '#16a34a' }}
          />
          <StatCard
            title="Contacted"
            value={contactedLeads}
            accent="#2563eb"
            icon={
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
          />
          <StatCard
            title="Converted"
            value={convertedLeads}
            accent="var(--emerald)"
            icon={
              <svg className="w-5 h-5" style={{ color: 'var(--emerald)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />
        </div>

        {/* ── Leads Table Panel ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Panel header */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2
              className="font-bold text-lg"
              style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}
            >
              Leads
              <span
                className="ml-2 text-sm font-normal text-gray-400"
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              >
                ({filteredLeads.length})
              </span>
            </h2>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Seed button */}
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-60"
                style={{
                  background: 'rgba(200,167,93,0.1)',
                  color: 'var(--gold-dark)',
                  border: '1px solid rgba(200,167,93,0.25)',
                  fontFamily: 'Work Sans, sans-serif',
                }}
              >
                {seeding ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Adding…
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Sample Leads
                  </>
                )}
              </button>

              {/* Export button */}
              <button
                onClick={() => {
                  exportLeadsCSV();
                  showToast('CSV export started!');
                }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--navy)',
                  color: 'white',
                  fontFamily: 'Work Sans, sans-serif',
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pt-4 flex gap-1 flex-wrap border-b border-gray-50">
            {STATUS_FILTER_TABS.map((tab) => {
              const count =
                tab.value === 'all'
                  ? leads.length
                  : leads.filter((l) => l.status === tab.value).length;
              const isActive = filterStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setFilterStatus(tab.value)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all duration-200 mb-px"
                  style={{
                    fontFamily: 'Work Sans, sans-serif',
                    borderBottomColor: isActive ? 'var(--navy)' : 'transparent',
                    color: isActive ? 'var(--navy)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(11,31,58,0.04)' : 'transparent',
                  }}
                >
                  {tab.label}
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{
                      background: isActive ? 'var(--navy)' : '#e5e7eb',
                      color: isActive ? 'white' : '#6b7280',
                      fontFamily: 'IBM Plex Mono, monospace',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredLeads.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-4xl mb-3">📭</div>
                <h3
                  className="font-semibold text-gray-700 mb-1"
                  style={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  No leads yet
                </h3>
                <p className="text-gray-400 text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  Forms submitted on the website will appear here. Use &quot;Add Sample Leads&quot; to test the dashboard.
                </p>
              </div>
            ) : (
              <table className="premium-table">
                <thead>
                  <tr>
                    <th className="text-left" style={{ width: '40px' }}>#</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Phone</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Type</th>
                    <th className="text-left" style={{ minWidth: '180px' }}>Message</th>
                    <th className="text-left" style={{ minWidth: '140px' }}>Status</th>
                    <th className="text-left">Date</th>
                    <th className="text-left" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, idx) => {
                    const st = statusStyle(lead.status);
                    const isConfirming = deleteConfirm === lead.id;
                    return (
                      <tr key={lead.id}>
                        {/* # */}
                        <td>
                          <span
                            className="text-gray-400 text-xs"
                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                          >
                            {idx + 1}
                          </span>
                        </td>

                        {/* Name */}
                        <td>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: 'var(--navy)', fontFamily: 'Work Sans, sans-serif' }}
                          >
                            {lead.name}
                          </div>
                        </td>

                        {/* Phone */}
                        <td>
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--navy)', fontFamily: 'IBM Plex Mono, monospace' }}
                          >
                            {lead.phone}
                          </a>
                        </td>

                        {/* Email */}
                        <td>
                          {lead.email ? (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-xs text-blue-600 hover:underline truncate block max-w-[160px]"
                              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                            >
                              {lead.email}
                            </a>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>

                        {/* Type */}
                        <td>
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap"
                            style={{
                              background: 'rgba(11,31,58,0.07)',
                              color: 'var(--navy)',
                              fontFamily: 'Work Sans, sans-serif',
                            }}
                          >
                            {typeLabel(lead.type)}
                          </span>
                        </td>

                        {/* Message */}
                        <td>
                          <span
                            className="text-xs text-gray-500 line-clamp-2 block max-w-[200px]"
                            style={{ fontFamily: 'Work Sans, sans-serif' }}
                            title={lead.message}
                          >
                            {lead.message || '—'}
                          </span>
                        </td>

                        {/* Status — editable dropdown */}
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusUpdate(lead.id, e.target.value as LeadStatus)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-full border-0 outline-none cursor-pointer transition-all duration-200 appearance-none pr-6"
                            style={{
                              background: st.bg,
                              color: st.color,
                              fontFamily: 'Work Sans, sans-serif',
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='${encodeURIComponent(st.color)}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l4 4 4-4'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 8px center',
                            }}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Date */}
                        <td>
                          <span
                            className="text-xs text-gray-400 whitespace-nowrap"
                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                          >
                            {formatDate(lead.createdAt)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200"
                            style={{
                              background: isConfirming ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.06)',
                              color: '#dc2626',
                              fontFamily: 'Work Sans, sans-serif',
                              border: isConfirming ? '1px solid rgba(220,38,38,0.3)' : '1px solid transparent',
                            }}
                            title={isConfirming ? 'Click again to confirm delete' : 'Delete lead'}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            {isConfirming ? 'Confirm?' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs text-gray-400 pb-4"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
          Data is stored locally in this browser. Export CSV to back up your leads regularly.
        </p>
      </main>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      setAuthenticated(stored === 'true');
    } catch {
      setAuthenticated(false);
    }
  }, []);

  const handleAuthenticated = () => setAuthenticated(true);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // sessionStorage blocked — proceed anyway
    }
    setAuthenticated(false);
  };

  // Still checking sessionStorage
  if (authenticated === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 100%)' }}
      >
        <svg className="w-8 h-8 animate-spin" style={{ color: 'var(--gold)' }} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
