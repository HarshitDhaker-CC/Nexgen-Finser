'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the minimum amount to start investing?',
    a: 'You can start a SIP with as little as ₹500/month. Lumpsum minimum is typically ₹1,000–₹5,000 depending on the fund. Many ELSS and liquid funds accept ₹500 as minimum SIP amount.',
  },
  {
    q: 'Is my money safe with Nexgen Finser?',
    a: 'Your money is invested directly in SEBI-regulated mutual funds — the AMC (Asset Management Company) holds your funds, not us. We are AMFI-registered distributors (ARN holders). All investments carry market risk, but your capital is protected by stringent SEBI regulations.',
  },
  {
    q: 'How do I track my portfolio?',
    a: 'You receive a monthly Consolidated Account Statement (CAS) from CAMS/KFintech directly to your registered email. We also provide quarterly portfolio review reports via email and WhatsApp. You can also track your investments on the MF Central portal (mfcentral.com) using your PAN.',
  },
  {
    q: 'Do you charge any fee?',
    a: 'As an AMFI-registered distributor, we earn trail commissions from AMCs on regular mutual fund plans. No direct fee is charged to you as an investor. If any advisory fee applies (for comprehensive financial planning), it is disclosed to you upfront and in writing before engagement.',
  },
  {
    q: 'Can I get a free portfolio review?',
    a: 'Yes! We offer complimentary portfolio reviews for new and existing investors. Use the form on this page or WhatsApp us directly. Our advisor will analyze your existing holdings, identify gaps, and suggest rebalancing opportunities — at no cost.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '1rem',
        border: isOpen ? '1px solid rgba(200,167,93,0.3)' : '1px solid rgba(11,31,58,0.08)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease',
        boxShadow: isOpen ? '0 4px 24px rgba(11,31,58,0.08)' : '0 2px 8px rgba(11,31,58,0.04)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 600,
          fontSize: '1rem',
          color: 'var(--navy)',
          lineHeight: 1.45,
        }}
      >
        <span style={{ flex: 1 }}>{q}</span>
        <span style={{
          flexShrink: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          background: isOpen ? 'var(--gold)' : 'rgba(11,31,58,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? 'white' : 'var(--navy)',
          transition: 'all 0.25s ease',
        }}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 1.5rem 1.25rem',
              color: 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              borderTop: '1px solid rgba(200,167,93,0.1)',
              paddingTop: '1rem',
            }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: 'white', padding: '5rem 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-label">Common Questions</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.75, fontSize: '1.0125rem' }}>
            Everything you need to know about investing with Nexgen Finser.
          </p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <FAQItem
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            Have more questions? We're happy to help.
          </p>
          <a href="/contact" className="btn-primary">
            Talk to an Advisor
          </a>
        </motion.div>
      </div>
    </section>
  );
}
