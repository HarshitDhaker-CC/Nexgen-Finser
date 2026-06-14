'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ComplianceBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show unless dismissed this session
    const dismissed = sessionStorage.getItem('compliance-banner-dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('compliance-banner-dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #070f1e, #0B1F3A)',
        padding: '6px 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        zIndex: 200,
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Work Sans', sans-serif", lineHeight: 1.5 }}>
          ⚠️ Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
        </span>
        <span style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          ARN-XXXXXX · AMFI Registered
        </span>
      </div>
      <button
        onClick={dismiss}
        aria-label="Close compliance banner"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)',
          padding: '2px', display: 'flex', alignItems: 'center',
          flexShrink: 0,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
