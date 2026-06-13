'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { calculateWealthProjection, type WealthStudioInputs, type WealthProjectionResult } from '@/lib/calculations';
import { formatCurrency, type Currency, CURRENCY_SYMBOLS } from '@/lib/formatters';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToastState {
  message: string;
  visible: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_INPUTS: WealthStudioInputs = {
  lumpsumAmount: 500000,
  sipAmount: 10000,
  sipStepUpPercent: 10,
  annualReturnPercent: 12,
  totalDurationYears: 25,
  sipStopYear: 15,
  withdrawalStartYear: 20,
  withdrawalReturnPercent: 8,
  monthlySwpAmount: 50000,
  swpStepUpPercent: 5,
};

const PHASE_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Wealth Creation',
  2: 'Wealth Preservation',
  3: 'Wealth Distribution',
};

const PHASE_COLORS: Record<1 | 2 | 3, string> = {
  1: '#0B1F3A',
  2: '#C8A75D',
  3: '#0F766E',
};

// ─── Utility ──────────────────────────────────────────────────────────────────

function sliderProgress(value: number, min: number, max: number): string {
  return `${((value - min) / (max - min)) * 100}%`;
}

function encodeInputs(inputs: WealthStudioInputs): string {
  const params = new URLSearchParams();
  (Object.keys(inputs) as (keyof WealthStudioInputs)[]).forEach((key) => {
    params.set(key, String(inputs[key]));
  });
  return params.toString();
}

function decodeInputs(search: string): Partial<WealthStudioInputs> {
  const params = new URLSearchParams(search);
  const result: Partial<WealthStudioInputs> = {};
  const numericKeys: (keyof WealthStudioInputs)[] = [
    'lumpsumAmount', 'sipAmount', 'sipStepUpPercent', 'annualReturnPercent',
    'totalDurationYears', 'sipStopYear', 'withdrawalStartYear',
    'withdrawalReturnPercent', 'monthlySwpAmount', 'swpStepUpPercent',
  ];
  numericKeys.forEach((key) => {
    const val = params.get(key);
    if (val !== null && !isNaN(Number(val))) {
      (result as Record<string, number>)[key] = Number(val);
    }
  });
  return result;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SliderInputProps {
  label: string;
  tooltip: string;
  value: number;
  min: number;
  max: number;
  step: number;
  sliderClass: string;
  testIdSlider: string;
  testIdInput: string;
  formatDisplay?: (v: number) => string;
  parseInput?: (s: string) => number;
  onChange: (v: number) => void;
  suffix?: string;
}

function SliderInput({
  label,
  tooltip,
  value,
  min,
  max,
  step,
  sliderClass,
  testIdSlider,
  testIdInput,
  formatDisplay,
  parseInput,
  onChange,
  suffix = '',
}: SliderInputProps) {
  const [inputVal, setInputVal] = useState<string>(String(value));
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setInputVal(String(value));
  }, [value]);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    onChange(v);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseInput ? parseInput(inputVal) : Number(inputVal);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
    } else {
      setInputVal(String(value));
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputBlur();
  };

  const displayMin = formatDisplay ? formatDisplay(min) : String(min);
  const displayMax = formatDisplay ? formatDisplay(max) : String(max);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {label}
          </span>
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
              style={{
                width: 16, height: 16,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'help', fontSize: '0.625rem', color: 'rgba(255,255,255,0.7)',
                fontWeight: 700, lineHeight: 1,
              }}
            >
              ?
            </button>
            {showTip && (
              <div style={{
                position: 'absolute',
                bottom: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0B1F3A',
                color: 'white',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(200,167,93,0.3)',
                zIndex: 20,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                fontFamily: "'Inter', sans-serif",
              }}>
                {tooltip}
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #0B1F3A' }} />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <input
            data-testid={testIdInput}
            type="text"
            inputMode="decimal"
            value={inputVal}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            style={{
              width: '80px',
              minHeight: '44px',
              padding: '0.3rem 0.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0.4rem',
              color: 'white',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8125rem',
              textAlign: 'right',
              outline: 'none',
            }}
          />
          {suffix && (
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Work Sans', sans-serif" }}>
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        data-testid={testIdSlider}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        className={sliderClass}
        style={{ '--progress': sliderProgress(value, min, max) } as React.CSSProperties}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Mono', monospace" }}>{displayMin}</span>
        <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'IBM Plex Mono', monospace" }}>{displayMax}</span>
      </div>
    </div>
  );
}


// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WealthStudioPage() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState<WealthStudioInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<WealthProjectionResult>(() =>
    calculateWealthProjection(DEFAULT_INPUTS)
  );
  const [currency, setCurrency] = useState<Currency>('INR');
  const [activeChart, setActiveChart] = useState<'corpus' | 'breakdown'>('corpus');
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const [isExporting, setIsExporting] = useState(false);
  const [todayLabel, setTodayLabel] = useState('');
  const pdfRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Set today's date client-side only (avoids hydration mismatch) ──────────
  useEffect(() => {
    setTodayLabel(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  // ── URL sync on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = window.location.search;
    if (search) {
      const decoded = decodeInputs(search);
      if (Object.keys(decoded).length > 0) {
        const merged = { ...DEFAULT_INPUTS, ...decoded };
        setInputs(merged);
        setResult(calculateWealthProjection(merged));
      }
    }
  }, []);

  // ── Recalculate on input change ────────────────────────────────────────────
  const updateInput = useCallback(<K extends keyof WealthStudioInputs>(key: K, value: WealthStudioInputs[K]) => {
    setInputs((prev) => {
      let next = { ...prev, [key]: value };
      // Auto-clamp dependent fields
      if (key === 'totalDurationYears') {
        next.sipStopYear = Math.min(next.sipStopYear, (value as number) - 1);
        next.withdrawalStartYear = Math.min(
          Math.max(next.withdrawalStartYear, next.sipStopYear + 1),
          value as number
        );
      }
      if (key === 'sipStopYear') {
        next.withdrawalStartYear = Math.max(next.withdrawalStartYear, (value as number) + 1);
      }
      const newResult = calculateWealthProjection(next);
      setResult(newResult);
      // Sync URL
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `?${encodeInputs(next)}`);
      }
      return next;
    });
  }, []);

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3500);
  }, []);

  // ── Share ──────────────────────────────────────────────────────────────────
  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      showToast('🔗 Link copied to clipboard!');
    } catch {
      showToast('Copy failed — please copy the URL manually.');
    }
  }, [showToast]);

  // ── PDF Export ─────────────────────────────────────────────────────────────
  const handleExportPDF = useCallback(async () => {
    if (!pdfRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0B1F3A',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const imgH = pageW * ratio;

      let y = 0;
      let remaining = imgH;
      while (remaining > 0) {
        pdf.addImage(imgData, 'JPEG', 0, y === 0 ? 0 : -y, pageW, imgH);
        remaining -= pageH;
        y += pageH;
        if (remaining > 0) pdf.addPage();
      }

      const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      pdf.save(`NexgenFinser_WealthProjection_${date.replace(/\s/g, '_')}.pdf`);
      showToast('📄 PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF export failed', err);
      showToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, showToast]);

  // ── Derived chart data ─────────────────────────────────────────────────────
  const chartData = useMemo(() =>
    result.yearlyData.map((d) => ({
      ...d,
      returnsAbove: Math.max(0, d.corpus - d.totalInvested),
    })),
    [result.yearlyData]
  );

  const sipStopYear = inputs.sipStopYear;
  const withdrawalStartYear = inputs.withdrawalStartYear;

  // ── Format helpers ─────────────────────────────────────────────────────────
  const fmt = (amount: number, compact = true) => formatCurrency(amount, currency, compact);
  const sym = CURRENCY_SYMBOLS[currency];

  const yAxisFormatter = (v: number) => {
    const converted = v * (currency === 'INR' ? 1 : currency === 'USD' ? 0.012 : 0.011);
    if (currency === 'INR') {
      if (converted >= 1e7) return `${sym}${(converted / 1e7).toFixed(1)}Cr`;
      if (converted >= 1e5) return `${sym}${(converted / 1e5).toFixed(1)}L`;
      return `${sym}${(converted / 1000).toFixed(0)}K`;
    }
    if (converted >= 1e9) return `${sym}${(converted / 1e9).toFixed(1)}B`;
    if (converted >= 1e6) return `${sym}${(converted / 1e6).toFixed(1)}M`;
    return `${sym}${(converted / 1000).toFixed(0)}K`;
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Toast ── */}
      {toast.visible && (
        <div className="toast" style={{ zIndex: 9999 }}>
          {toast.message}
        </div>
      )}

      {/* ── PDF-capturable wrapper ── */}
      <div id="pdf-content" ref={pdfRef}>
        {/* ── Hero Header ── */}
        <section
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 50%, #0a1e35 100%)',
            overflow: 'hidden',
            paddingTop: '5rem',
            paddingBottom: '4rem',
          }}
        >
          {/* Subtle background image overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/images/wealth-studio-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.07,
            }}
          />
          {/* Decorative gradient orbs */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,167,93,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,118,110,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.6 }} />
              <span style={{ color: 'var(--gold)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Heritage Wealth · Private Office
              </span>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.6 }} />
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}>
              Wealth Projection{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Studio
              </span>
            </h1>

            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
              fontFamily: "'Inter', sans-serif",
              maxWidth: 620,
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}>
              Model your complete wealth journey across three distinct phases — creation, preservation, and distribution — with institutional-grade projection accuracy.
            </p>

            {/* 3 Phase Journey Cards */}
            <div className="phase-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 820 }}>
              {([
                { phase: 1, icon: '📈', title: 'Phase I · Wealth Creation', desc: 'Lumpsum + SIP with step-up compounding', color: '#1e3a5f', accent: '#3b82f6' },
                { phase: 2, icon: '🏛️', title: 'Phase II · Wealth Preservation', desc: 'Pure compounding, no SIP or withdrawal', color: '#3d2f0e', accent: '#C8A75D' },
                { phase: 3, icon: '🌿', title: 'Phase III · Wealth Distribution', desc: 'SWP with step-up, separate return rate', color: '#0a2e2a', accent: '#10B981' },
              ] as const).map(({ phase, icon, title, desc, color, accent }) => (
                <div key={phase} style={{
                  background: color,
                  border: `1px solid ${accent}33`,
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <div style={{ color: accent, fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                    {title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', lineHeight: 1.5 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Calculator Layout ── */}
        <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
          <div className="container-custom" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
            {/* Currency Toggle + Action Buttons */}
            <div className="ws-action-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Currency Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.25rem' }}>
                {(['INR', 'USD', 'EUR'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    data-testid={`currency-${c.toLowerCase()}`}
                    onClick={() => setCurrency(c)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      background: currency === c ? 'var(--navy)' : 'transparent',
                      color: currency === c ? 'white' : 'var(--text-secondary)',
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {c === 'INR' ? '₹ INR' : c === 'USD' ? '$ USD' : '€ EUR'}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  data-testid="btn-share"
                  onClick={handleShare}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.625rem 1.25rem',
                    background: 'white',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '0.625rem',
                    color: 'var(--navy)',
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 600, fontSize: '0.875rem',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = 'var(--navy)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share
                </button>
                <button
                  data-testid="btn-export-pdf"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.625rem 1.25rem',
                    background: isExporting ? '#9CA3AF' : 'var(--navy)',
                    border: 'none',
                    borderRadius: '0.625rem',
                    color: 'white',
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 600, fontSize: '0.875rem',
                    cursor: isExporting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {isExporting ? 'Exporting…' : 'Download Report'}
                </button>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="ws-layout" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem', alignItems: 'start' }}>

              {/* ══ LEFT PANEL: Inputs ══ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* ── Accumulation Phase ── */}
                <div style={{
                  background: 'linear-gradient(160deg, #0B1F3A 0%, #132d54 100%)',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: '1px solid rgba(200,167,93,0.15)',
                  boxShadow: '0 8px 32px rgba(11,31,58,0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 32, height: 32, background: 'rgba(200,167,93,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📈</div>
                    <div>
                      <div style={{ color: 'var(--gold)', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Phase I</div>
                      <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem' }}>Accumulation Phase</div>
                    </div>
                  </div>

                  <SliderInput
                    label="Lumpsum Amount"
                    tooltip="One-time initial investment at the start"
                    value={inputs.lumpsumAmount}
                    min={0}
                    max={5000000}
                    step={10000}
                    sliderClass="slider-gold"
                    testIdSlider="slider-lumpsum"
                    testIdInput="input-lumpsum"
                    formatDisplay={(v) => v === 0 ? '₹0' : `₹${(v / 100000).toFixed(1)}L`}
                    onChange={(v) => updateInput('lumpsumAmount', v)}
                  />

                  <SliderInput
                    label="SIP per Month"
                    tooltip="Monthly systematic investment plan contribution"
                    value={inputs.sipAmount}
                    min={1000}
                    max={100000}
                    step={1000}
                    sliderClass="slider-premium"
                    testIdSlider="slider-sip"
                    testIdInput="input-sip"
                    formatDisplay={(v) => `₹${(v / 1000).toFixed(0)}K`}
                    onChange={(v) => updateInput('sipAmount', v)}
                  />

                  <SliderInput
                    label="SIP Step-Up %"
                    tooltip="Annual increase percentage for your SIP amount"
                    value={inputs.sipStepUpPercent}
                    min={0}
                    max={30}
                    step={1}
                    sliderClass="slider-gold"
                    testIdSlider="slider-stepup"
                    testIdInput="input-stepup"
                    formatDisplay={(v) => `${v}%`}
                    suffix="%"
                    onChange={(v) => updateInput('sipStepUpPercent', v)}
                  />

                  <SliderInput
                    label="Annual Return %"
                    tooltip="Expected annualised return during accumulation phase"
                    value={inputs.annualReturnPercent}
                    min={1}
                    max={30}
                    step={0.5}
                    sliderClass="slider-premium"
                    testIdSlider="slider-return"
                    testIdInput="input-return"
                    formatDisplay={(v) => `${v}%`}
                    suffix="%"
                    onChange={(v) => updateInput('annualReturnPercent', v)}
                  />

                  <SliderInput
                    label="Total Duration (Years)"
                    tooltip="Total projection horizon for your wealth journey"
                    value={inputs.totalDurationYears}
                    min={5}
                    max={40}
                    step={1}
                    sliderClass="slider-gold"
                    testIdSlider="slider-duration"
                    testIdInput="input-duration"
                    formatDisplay={(v) => `${v}Y`}
                    suffix="Yrs"
                    onChange={(v) => updateInput('totalDurationYears', v)}
                  />

                  <SliderInput
                    label="SIP Stoppage Year"
                    tooltip="Year in which your SIP contributions end"
                    value={inputs.sipStopYear}
                    min={1}
                    max={Math.max(1, inputs.totalDurationYears - 1)}
                    step={1}
                    sliderClass="slider-premium"
                    testIdSlider="slider-sip-stop"
                    testIdInput="input-sip-stop"
                    formatDisplay={(v) => `Yr ${v}`}
                    suffix="Yr"
                    onChange={(v) => updateInput('sipStopYear', v)}
                  />

                  <SliderInput
                    label="Withdrawal Start Year"
                    tooltip="Year when you begin systematic withdrawals (SWP)"
                    value={inputs.withdrawalStartYear}
                    min={Math.min(inputs.sipStopYear + 1, inputs.totalDurationYears)}
                    max={inputs.totalDurationYears}
                    step={1}
                    sliderClass="slider-gold"
                    testIdSlider="slider-withdrawal-start"
                    testIdInput="input-withdrawal-start"
                    formatDisplay={(v) => `Yr ${v}`}
                    suffix="Yr"
                    onChange={(v) => updateInput('withdrawalStartYear', v)}
                  />
                </div>

                {/* ── Withdrawal Phase ── */}
                <div style={{
                  background: 'linear-gradient(160deg, #063328 0%, #0a4a3e 100%)',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: '1px solid rgba(16,185,129,0.15)',
                  boxShadow: '0 8px 32px rgba(6,51,40,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 32, height: 32, background: 'rgba(16,185,129,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🌿</div>
                    <div>
                      <div style={{ color: '#10B981', fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Phase III</div>
                      <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1rem' }}>Withdrawal Phase</div>
                    </div>
                  </div>

                  <SliderInput
                    label="Withdrawal Return Rate"
                    tooltip="Expected annual return during the withdrawal phase"
                    value={inputs.withdrawalReturnPercent}
                    min={1}
                    max={20}
                    step={0.5}
                    sliderClass="slider-emerald"
                    testIdSlider="slider-withdrawal-return"
                    testIdInput="input-withdrawal-return"
                    formatDisplay={(v) => `${v}%`}
                    suffix="%"
                    onChange={(v) => updateInput('withdrawalReturnPercent', v)}
                  />

                  <SliderInput
                    label="Monthly SWP"
                    tooltip="Monthly systematic withdrawal amount from your corpus"
                    value={inputs.monthlySwpAmount}
                    min={0}
                    max={200000}
                    step={1000}
                    sliderClass="slider-emerald"
                    testIdSlider="slider-swp"
                    testIdInput="input-swp"
                    formatDisplay={(v) => v === 0 ? '₹0' : `₹${(v / 1000).toFixed(0)}K`}
                    onChange={(v) => updateInput('monthlySwpAmount', v)}
                  />

                  <SliderInput
                    label="SWP Step-Up %"
                    tooltip="Annual increase in your monthly withdrawal amount"
                    value={inputs.swpStepUpPercent}
                    min={0}
                    max={20}
                    step={1}
                    sliderClass="slider-emerald"
                    testIdSlider="slider-swp-stepup"
                    testIdInput="input-swp-stepup"
                    formatDisplay={(v) => `${v}%`}
                    suffix="%"
                    onChange={(v) => updateInput('swpStepUpPercent', v)}
                  />
                </div>
              </div>

              {/* ══ RIGHT PANEL: Results ══ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* ── Metric Cards 2×2 ── */}
                <div className="metric-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Total Investment */}
                  <div data-testid="metric-total-investment" className="metric-card" style={{ background: 'white' }}>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Total Investment
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--navy)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
                      {fmt(result.totalInvestment)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}>
                      Lumpsum + All SIPs
                    </div>
                  </div>

                  {/* Corpus @ SIP Stop */}
                  <div data-testid="metric-corpus-sip-stop" className="metric-card" style={{ background: 'white' }}>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Corpus @ SIP Stop
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--navy)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
                      {fmt(result.corpusAtSipStop)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}>
                      End of Year {inputs.sipStopYear}
                    </div>
                  </div>

                  {/* Total SWP Withdrawn */}
                  <div data-testid="metric-total-swp" className="metric-card emerald-accent" style={{ background: 'white' }}>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Total SWP Withdrawn
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--emerald)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
                      {fmt(result.totalSwpWithdrawn)}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}>
                      Phase III Payouts
                    </div>
                  </div>

                  {/* Final Corpus */}
                  <div data-testid="metric-final-corpus" className="metric-card gold-accent" style={{ background: 'linear-gradient(135deg, #fffbf0 0%, #fff9e6 100%)', borderColor: 'rgba(200,167,93,0.3)' }}>
                    <div style={{ color: 'var(--gold-dark)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Final Corpus
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', color: 'var(--gold-dark)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
                      {fmt(result.finalCorpus)}
                    </div>
                    <div style={{ color: '#a8873d', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}>
                      End of Year {inputs.totalDurationYears}
                    </div>
                  </div>
                </div>

                {/* ── Supporting Strip ── */}
                <div style={{
                  background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
                  borderRadius: '1rem',
                  padding: '1.25rem 1.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}>
                  <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Total Returns
                      </div>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        color: result.totalReturns >= 0 ? '#10B981' : '#f87171',
                      }}>
                        {result.totalReturns >= 0 ? '+' : ''}{fmt(result.totalReturns)}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Wealth Multiplier
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--gold)' }}>
                        {result.wealthMultiplier.toFixed(2)}x
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        Return %
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: '1.25rem', color: '#10B981' }}>
                        {result.totalInvestment > 0
                          ? `+${(((result.finalCorpus + result.totalSwpWithdrawn) / result.totalInvestment - 1) * 100).toFixed(1)}%`
                          : '—'
                        }
                      </div>
                    </div>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6875rem', fontFamily: "'Inter', sans-serif", maxWidth: 180, textAlign: 'right', lineHeight: 1.5 }}>
                    Illustrative projection based on constant annual returns
                  </div>
                </div>

                {/* ── Charts ── */}
                <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                  {/* Tab Bar */}
                  <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
                    {(['corpus', 'breakdown'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveChart(tab)}
                        style={{
                          flex: 1,
                          padding: '1rem',
                          border: 'none',
                          background: activeChart === tab ? 'var(--navy)' : 'white',
                          color: activeChart === tab ? 'white' : 'var(--text-secondary)',
                          fontFamily: "'Work Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {tab === 'corpus' ? 'Corpus Growth' : 'Investment Breakdown'}
                      </button>
                    ))}
                  </div>

                  <div style={{ padding: '1.5rem 1rem' }}>
                    {activeChart === 'corpus' ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis
                            dataKey="year"
                            tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                          />
                          <YAxis
                            tickFormatter={yAxisFormatter}
                            tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={false}
                            width={72}
                          />
                          <Tooltip
                            content={(props) => {
                              if (!props.active || !props.payload?.length) return null;
                              const d = (props.payload[0] as { payload: { year: number; phase: number; totalInvested: number; corpus: number } }).payload;
                              const phase = d.phase as 1 | 2 | 3;
                              return (
                                <div style={{ background: 'rgba(7,15,30,0.95)', border: `1px solid ${PHASE_COLORS[phase]}`, borderRadius: '0.75rem', padding: '0.875rem 1rem', minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Work Sans', sans-serif", marginBottom: '0.5rem' }}>Year {props.label}</div>
                                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${PHASE_COLORS[phase]}22`, border: `1px solid ${PHASE_COLORS[phase]}44`, borderRadius: '1rem', padding: '0.2rem 0.6rem', marginBottom: '0.625rem', fontSize: '0.6875rem', color: PHASE_COLORS[phase], fontFamily: "'Work Sans', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Phase {phase} · {PHASE_LABELS[phase]}</div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Work Sans', sans-serif" }}>Corpus</span>
                                    <span style={{ color: '#10B981', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.875rem', fontWeight: 600 }}>{formatCurrency(d.corpus, currency, true)}</span>
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontFamily: "'Work Sans', sans-serif" }}>Total Invested</span>
                                    <span style={{ color: '#9CA3AF', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.875rem' }}>{formatCurrency(d.totalInvested, currency, true)}</span>
                                  </div>
                                </div>
                              );
                            }}
                          />

                          {/* Phase separator lines */}
                          {sipStopYear > 0 && sipStopYear < inputs.totalDurationYears && (
                            <ReferenceLine
                              x={sipStopYear}
                              stroke="#C8A75D"
                              strokeDasharray="4 4"
                              strokeWidth={1.5}
                              label={{ value: `SIP Stop Y${sipStopYear}`, fontSize: 10, fill: '#C8A75D', position: 'insideTopRight' }}
                            />
                          )}
                          {withdrawalStartYear > 0 && withdrawalStartYear <= inputs.totalDurationYears && (
                            <ReferenceLine
                              x={withdrawalStartYear}
                              stroke="#10B981"
                              strokeDasharray="4 4"
                              strokeWidth={1.5}
                              label={{ value: `SWP Start Y${withdrawalStartYear}`, fontSize: 10, fill: '#10B981', position: 'insideTopLeft' }}
                            />
                          )}
                          <Line
                            type="monotone"
                            dataKey="corpus"
                            stroke="#064E3B"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 5, fill: '#064E3B', stroke: 'white', strokeWidth: 2 }}
                            name="Corpus"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                          <defs>
                            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis
                            dataKey="year"
                            tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                          />
                          <YAxis
                            tickFormatter={yAxisFormatter}
                            tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={false}
                            width={72}
                          />
                          <Tooltip
                            content={(props) => {
                              if (!props.active || !props.payload?.length) return null;
                              return (
                                <div style={{ background: 'rgba(7,15,30,0.95)', border: '1px solid rgba(200,167,93,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6875rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Work Sans', sans-serif", marginBottom: '0.5rem' }}>Year {props.label}</div>
                                  {(props.payload as unknown as { name: string; value: number; fill: string }[]).map((p) => (
                                    <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '0.25rem' }}>
                                      <span style={{ color: p.fill, fontSize: '0.75rem', fontFamily: "'Work Sans', sans-serif" }}>{p.name}</span>
                                      <span style={{ color: 'white', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.875rem' }}>{formatCurrency(p.value, currency, true)}</span>
                                    </div>
                                  ))}
                                </div>
                              );
                            }}
                          />

                          <Legend
                            wrapperStyle={{ fontFamily: "'Work Sans', sans-serif", fontSize: '0.8125rem', paddingTop: '0.5rem' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="totalInvested"
                            stackId="1"
                            stroke="#9CA3AF"
                            fill="url(#colorInvested)"
                            strokeWidth={1.5}
                            name="Total Invested"
                          />
                          <Area
                            type="monotone"
                            dataKey="returnsAbove"
                            stackId="1"
                            stroke="#10B981"
                            fill="url(#colorReturns)"
                            strokeWidth={1.5}
                            name="Returns"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Phase Legend */}
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '0 1.5rem 1.25rem', flexWrap: 'wrap' }}>
                    {([1, 2, 3] as const).map((ph) => (
                      <div key={ph} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <div style={{ width: 12, height: 3, borderRadius: 2, background: PHASE_COLORS[ph], opacity: ph === 2 ? 1 : 1 }} />
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.04em' }}>
                          P{ph}: {PHASE_LABELS[ph]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Year-wise Table ── */}
                <div style={{ background: 'white', borderRadius: '1.25rem', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 20px rgba(11,31,58,0.06)' }}>
                  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.0625rem', color: 'var(--navy)' }}>
                      Year-Wise Projection
                    </h3>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: "'Work Sans', sans-serif" }}>
                      {result.yearlyData.length} years · All values in {currency}
                    </span>
                  </div>
                  <div className="table-scroll-container" style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'auto' }}>
                    <table className="premium-table" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          {['Year', 'Phase', 'SIP / Yr', 'Total Invested', 'Withdrawn', 'Returns', 'Corpus'].map((col) => (
                            <th key={col} style={{ whiteSpace: 'nowrap', padding: '0.875rem 0.75rem' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyData.map((row) => (
                          <tr key={row.year} data-testid={`table-row-${row.year}`}>
                            <td style={{ fontWeight: 600, color: 'var(--navy)', textAlign: 'center' }}>{row.year}</td>
                            <td style={{ textAlign: 'center' }}>
                              <span className={`phase-badge phase-badge-${row.phase}`}>
                                P{row.phase}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', color: row.sipAmount > 0 ? 'var(--navy)' : 'var(--text-muted)' }}>
                              {row.sipAmount > 0 ? fmt(row.sipAmount * 12, true) : '—'}
                            </td>
                            <td style={{ textAlign: 'right' }}>{fmt(row.totalInvested, true)}</td>
                            <td style={{ textAlign: 'right', color: row.withdrawn > 0 ? 'var(--emerald)' : 'var(--text-muted)' }}>
                              {row.withdrawn > 0 ? fmt(row.withdrawn, true) : '—'}
                            </td>
                            <td style={{ textAlign: 'right', color: row.returns >= 0 ? '#10B981' : '#f87171' }}>
                              {row.returns >= 0 ? '+' : ''}{fmt(row.returns, true)}
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 700, color: row.corpus > 0 ? 'var(--navy)' : '#f87171' }}>
                              {fmt(row.corpus, true)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
              {/* ══ END RIGHT PANEL ══ */}
            </div>
          </div>
        </div>

        {/* ── PDF Footer ── */}
        <div style={{
          background: 'var(--navy-dark)',
          padding: '1.25rem 2rem',
          borderTop: '1px solid rgba(200,167,93,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.875rem' }}>Nexgen Finser</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Work Sans', sans-serif", fontSize: '0.75rem' }}>
              Generated on {todayLabel}
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', maxWidth: 520, lineHeight: 1.5, textAlign: 'right' }}>
            This projection is illustrative and does not guarantee actual returns. Investments are subject to market risks. Please read all scheme-related documents carefully.
          </p>
        </div>
      </div>
    </>
  );
}
