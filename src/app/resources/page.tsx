'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DownloadCard {
  id: number;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

interface UsefulLink {
  title: string;
  url: string;
  description: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DOWNLOAD_CARDS: DownloadCard[] = [
  {
    id: 1,
    title: 'KYC Application Form',
    description: 'Complete your Know Your Customer formalities. Required for all new mutual fund investments.',
    iconColor: '#0B1F3A',
    iconBg: 'rgba(11,31,58,0.08)',
  },
  {
    id: 2,
    title: 'SIP Registration Form',
    description: 'Register for a new Systematic Investment Plan with your chosen fund house and scheme.',
    iconColor: '#0F766E',
    iconBg: 'rgba(15,118,110,0.08)',
  },
  {
    id: 3,
    title: 'Nomination Form',
    description: 'Add or update your nominee details for your mutual fund folios to secure your investments.',
    iconColor: '#C8A75D',
    iconBg: 'rgba(200,167,93,0.1)',
  },
  {
    id: 4,
    title: 'Bank Mandate Form',
    description: 'Register your bank account for automatic SIP debits via ECS/NACH mandate.',
    iconColor: '#7c3aed',
    iconBg: 'rgba(124,58,237,0.08)',
  },
  {
    id: 5,
    title: 'SIP Cancellation Form',
    description: 'Request cancellation of an existing SIP. Typically processed within 30 working days.',
    iconColor: '#dc2626',
    iconBg: 'rgba(220,38,38,0.08)',
  },
  {
    id: 6,
    title: 'Portfolio Review Request',
    description: 'Schedule a comprehensive portfolio review with our advisors for personalized recommendations.',
    iconColor: '#0369a1',
    iconBg: 'rgba(3,105,161,0.08)',
  },
];

const USEFUL_LINKS: UsefulLink[] = [
  {
    title: 'AMFI Official Website',
    url: 'https://www.amfiindia.com',
    description: 'Association of Mutual Funds in India — industry body, NAV data, fund lists',
    icon: '🏛️',
  },
  {
    title: 'SEBI Official Website',
    url: 'https://www.sebi.gov.in',
    description: 'Securities and Exchange Board of India — regulations, investor grievances',
    icon: '⚖️',
  },
  {
    title: 'CDSL KYC Check',
    url: 'https://www.cdslindia.com',
    description: 'Central Depository Services — check KYC status, demat account services',
    icon: '🔍',
  },
  {
    title: 'CAMS Mutual Fund',
    url: 'https://www.camsonline.com',
    description: 'Computer Age Management Services — transaction statements, fund services',
    icon: '📊',
  },
  {
    title: 'NAV India',
    url: 'https://www.navindia.com',
    description: 'Historical and current NAV data for all mutual fund schemes in India',
    icon: '📈',
  },
  {
    title: 'Income Tax Department',
    url: 'https://www.incometax.gov.in',
    description: 'File ITR, check Form 26AS, tax-saving investment proofs and refund status',
    icon: '🏦',
  },
];

const FAQS: FAQ[] = [
  {
    question: 'What is a Mutual Fund?',
    answer:
      'A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities such as stocks, bonds, and money market instruments. Each investor owns units of the fund proportional to their investment. Mutual funds in India are regulated by SEBI (Securities and Exchange Board of India) and offer benefits like professional management, diversification, liquidity, and affordability — allowing investors to start with as little as ₹500/month through SIP.',
  },
  {
    question: 'What is an ARN number?',
    answer:
      'ARN (AMFI Registration Number) is a unique identification number issued by the Association of Mutual Funds in India (AMFI) to mutual fund distributors and agents. It certifies that the distributor is registered with AMFI and has passed the NISM certification exam. When investing through a distributor, always verify their ARN number to ensure they are authorised. Nexgen Finser is an AMFI-registered distributor with a valid ARN number.',
  },
  {
    question: 'What is SIP (Systematic Investment Plan)?',
    answer:
      'A Systematic Investment Plan (SIP) allows you to invest a fixed amount in a mutual fund at regular intervals — typically monthly or quarterly. SIP leverages the power of rupee-cost averaging: you buy more units when markets are low and fewer when they are high, reducing the average cost over time. SIPs instil financial discipline and allow you to benefit from the compounding effect. You can start an SIP with as little as ₹500 per month and increase it over time.',
  },
  {
    question: 'What is NAV (Net Asset Value)?',
    answer:
      'NAV stands for Net Asset Value — the per-unit value of a mutual fund scheme. It is calculated by dividing the total value of the fund\'s assets (minus liabilities) by the number of units outstanding. NAV is declared by every fund house at the end of each business day. When you invest, you receive units at the applicable NAV. Unlike stock prices, a lower NAV does not necessarily mean a cheaper or better fund — what matters is the quality of the portfolio and the fund\'s track record.',
  },
  {
    question: 'How safe are Mutual Funds?',
    answer:
      'Mutual funds are market-linked investments and do carry risk, but they are not unsafe. All mutual funds in India are regulated by SEBI, which mandates strict disclosure and governance norms. Fund assets are held by a custodian separately from the AMC (Asset Management Company), protecting investor money even if the AMC faces financial difficulties. Risk varies by category — liquid funds and debt funds are relatively lower risk, while equity funds carry higher short-term volatility but offer superior long-term returns. Diversification within funds further reduces concentration risk.',
  },
  {
    question: 'What is ELSS?',
    answer:
      'ELSS stands for Equity Linked Savings Scheme — a category of mutual fund that invests primarily in equities and qualifies for a tax deduction under Section 80C of the Income Tax Act. Investors can claim a deduction of up to ₹1.5 lakh per year, potentially saving up to ₹46,800 in taxes annually (at the 30% tax bracket). ELSS has the shortest lock-in period among all 80C investments — just 3 years — and offers the potential for higher returns compared to PPF or NSC due to equity exposure. Long-term capital gains (LTCG) on ELSS beyond ₹1 lakh are taxed at 10%.',
  },
  {
    question: 'How can I track my investments?',
    answer:
      'You can track your mutual fund investments through multiple channels: (1) CAMS Online (camsonline.com) for funds serviced by CAMS; (2) KFintech/Karvy portal for funds serviced by KFintech; (3) The AMC\'s own website or app; (4) Third-party platforms like MFCentral, which provides a consolidated view across all fund houses using your PAN; (5) Contacting Nexgen Finser directly — we provide regular portfolio statements and periodic reviews to all our clients.',
  },
  {
    question: 'What is the minimum investment amount?',
    answer:
      'The minimum investment amount varies by fund and mode of investment. For SIP (Systematic Investment Plan), most funds allow you to start with as little as ₹100 to ₹500 per month. For lump sum (one-time) investments, the minimum is typically ₹1,000 to ₹5,000 depending on the fund. ELSS funds can be started via SIP at ₹500/month. There is no maximum limit on mutual fund investments. At Nexgen Finser, we help you choose the right investment amount based on your goals and financial capacity.',
  },
  {
    question: 'Can I withdraw my mutual fund investment anytime?',
    answer:
      'Most mutual fund schemes are open-ended, meaning you can redeem (withdraw) your units on any business day at the prevailing NAV. Funds are typically credited to your registered bank account within 1–3 business days for equity funds and within 1 business day for liquid/debt funds. Exceptions include: (1) ELSS funds with a mandatory 3-year lock-in per SIP instalment; (2) ELSS units cannot be redeemed before the lock-in period expires; (3) Some Close-ended funds with a fixed tenure. Always check the exit load (fee for early withdrawal) before redeeming.',
  },
  {
    question: 'What is the expense ratio?',
    answer:
      'The expense ratio is the annual fee charged by a mutual fund to manage your investment, expressed as a percentage of AUM (Assets Under Management). It covers fund management fees, administrative costs, and distributor commissions. For example, a fund with a 1% expense ratio deducts 1% of your invested amount each year. SEBI has capped expense ratios based on fund category and AUM size. Direct plans (invested without a distributor) have lower expense ratios than regular plans. Over long periods, a difference of even 0.5% in expense ratio can translate to a significant difference in returns — making this a critical factor in fund selection.',
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-300"
      style={{
        borderColor: open ? 'rgba(11,31,58,0.2)' : '#e5e7eb',
        boxShadow: open ? '0 4px 20px rgba(11,31,58,0.08)' : 'none',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors duration-200"
        style={{
          background: open ? 'rgba(11,31,58,0.04)' : 'white',
        }}
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
            style={{
              background: open ? 'var(--navy)' : 'rgba(11,31,58,0.06)',
              color: open ? 'white' : 'var(--navy)',
              fontFamily: 'IBM Plex Mono, monospace',
              transition: 'background 0.3s, color 0.3s',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="font-semibold text-sm leading-snug"
            style={{
              color: open ? 'var(--navy)' : 'var(--text-dark)',
              fontFamily: 'Work Sans, sans-serif',
            }}
          >
            {faq.question}
          </span>
        </div>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: open ? 'var(--navy)' : 'rgba(11,31,58,0.06)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            className="w-3.5 h-3.5"
            style={{ color: open ? 'white' : 'var(--navy)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Accordion body with max-height CSS transition */}
      <div
        style={{
          maxHeight: open ? '600px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="px-6 pb-5 pt-1">
          <div
            className="pl-9 text-sm leading-relaxed"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'Work Sans, sans-serif',
              borderLeft: '2px solid rgba(200,167,93,0.3)',
              paddingLeft: '1rem',
              marginLeft: '2.25rem',
            }}
          >
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PDF Icon ─────────────────────────────────────────────────────────────────

function PdfIcon({ color }: { color: string }) {
  return (
    <svg className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 13h6M9 17h4M13 3v6h6"
      />
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 55%, #132d54 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 50%, #C8A75D 0%, transparent 50%), radial-gradient(circle at 85% 20%, #0F766E 0%, transparent 40%)',
          }}
        />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--gold)', fontFamily: 'Work Sans, sans-serif' }}
            >
              Investor Resources
            </span>
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
          </div>

          <h1
            className="heading-display text-white mb-4 animate-fadeInUp"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
          >
            Resources &amp; Downloads
          </h1>
          <p
            className="text-blue-100/70 max-w-xl mx-auto text-lg animate-fadeInUp delay-200"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Everything you need to get started — KYC guidance, downloadable forms, useful links, and answers to common questions.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 800 0 480 30C240 52 80 15 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── KYC Information ───────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-custom">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="section-label">KYC Compliance</span>
            <h2 className="heading-section text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              KYC Information
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Know Your Customer (KYC) is mandatory for all mutual fund investments in India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* What is KYC + Documents */}
            <div className="space-y-6">
              {/* What is KYC */}
              <div className="glass-card p-6">
                <h3
                  className="font-semibold text-lg mb-3 flex items-center gap-2"
                  style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: 'rgba(11,31,58,0.08)' }}
                  >
                    ❓
                  </span>
                  What is KYC?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  KYC (Know Your Customer) is a mandatory process required by SEBI for all mutual fund investors. It verifies your identity and address to prevent money laundering and financial fraud. Once KYC is done, it applies across all mutual fund houses in India — you only need to complete it once. KYC is managed by KYC Registration Agencies (KRAs) like CDSL, CAMS, and Karvy.
                </p>
              </div>

              {/* Required Documents */}
              <div className="glass-card p-6">
                <h3
                  className="font-semibold text-lg mb-4 flex items-center gap-2"
                  style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(11,31,58,0.08)' }}>
                    📋
                  </span>
                  Documents Required
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🪪', label: 'Aadhaar Card', sub: 'Identity + Address proof' },
                    { icon: '🗂️', label: 'PAN Card', sub: 'Mandatory for investments' },
                    { icon: '📷', label: 'Passport Photo', sub: 'Recent, clear photograph' },
                    { icon: '🏠', label: 'Address Proof', sub: 'Utility bill, bank passbook, etc.' },
                  ].map((doc) => (
                    <div
                      key={doc.label}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid #e5e7eb' }}
                    >
                      <span className="text-xl flex-shrink-0">{doc.icon}</span>
                      <div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: 'var(--navy)', fontFamily: 'Work Sans, sans-serif' }}
                        >
                          {doc.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                          {doc.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Steps + KRA Links */}
            <div className="space-y-6">
              {/* 4-step process */}
              <div className="glass-card p-6">
                <h3
                  className="font-semibold text-lg mb-5 flex items-center gap-2"
                  style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(11,31,58,0.08)' }}>
                    🔄
                  </span>
                  KYC Process (4 Steps)
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: '01',
                      title: 'Gather Documents',
                      desc: 'Collect PAN card, Aadhaar, passport photo, and address proof.',
                    },
                    {
                      step: '02',
                      title: 'Fill KYC Form',
                      desc: 'Download and complete the KYC application form, or visit our office.',
                    },
                    {
                      step: '03',
                      title: 'In-Person Verification',
                      desc: 'Submit documents for verification (can also be done via e-KYC using Aadhaar OTP).',
                    },
                    {
                      step: '04',
                      title: 'Confirmation',
                      desc: 'Receive KYC acknowledgement and start investing across all mutual funds.',
                    },
                  ].map((s, i) => (
                    <div key={s.step} className="flex gap-4 items-start">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: i % 2 === 0 ? 'var(--navy)' : 'rgba(200,167,93,0.15)',
                          color: i % 2 === 0 ? 'white' : 'var(--gold-dark)',
                          fontFamily: 'IBM Plex Mono, monospace',
                        }}
                      >
                        {s.step}
                      </div>
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: 'var(--text-dark)', fontFamily: 'Work Sans, sans-serif' }}
                        >
                          {s.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* KRA Portal Links */}
              <div className="glass-card p-6">
                <h3
                  className="font-semibold text-lg mb-4 flex items-center gap-2"
                  style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(11,31,58,0.08)' }}>
                    🌐
                  </span>
                  Check KYC Status
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'CDSL KRA Portal', url: 'https://www.cdslindia.com', desc: 'CDSL Depository' },
                    { name: 'CAMS KRA Portal', url: 'https://www.camsonline.com', desc: 'CAMS Online' },
                    { name: 'Karvy KRA Portal', url: 'https://www.karvykra.com', desc: 'Karvy/KFintech' },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl group transition-all duration-200 hover:shadow-sm"
                      style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
                    >
                      <div>
                        <div
                          className="text-sm font-semibold group-hover:text-blue-600 transition-colors"
                          style={{ color: 'var(--navy)', fontFamily: 'Work Sans, sans-serif' }}
                        >
                          {link.name}
                        </div>
                        <div className="text-xs text-gray-400">{link.desc}</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Downloadable Forms ─────────────────────────────────────────────── */}
      <section
        className="section-py"
        style={{ background: 'linear-gradient(180deg, #f8fafc 0%, white 100%)' }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-label">Downloads</span>
            <h2 className="heading-section text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              Downloadable Forms
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Download the forms you need, fill them out, and bring them to our office or email them to us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOWNLOAD_CARDS.map((card, i) => (
              <div
                key={card.id}
                className="glass-card p-5 flex flex-col gap-4 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: card.iconBg }}
                >
                  <PdfIcon color={card.iconColor} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="font-semibold text-base mb-1"
                    style={{ color: 'var(--text-dark)', fontFamily: 'Work Sans, sans-serif' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    {card.description}
                  </p>
                </div>

                {/* Download Button */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 w-full justify-center"
                  style={{
                    background: card.iconBg,
                    color: card.iconColor,
                    border: `1.5px solid ${card.iconColor}20`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = card.iconColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = card.iconBg;
                    e.currentTarget.style.color = card.iconColor;
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Need assistance filling out any form? Contact us at{' '}
            <a href="tel:+919876543210" className="underline" style={{ color: 'var(--navy)' }}>
              +91-98765-43210
            </a>{' '}
            and our team will guide you.
          </p>
        </div>
      </section>

      {/* ── Useful Financial Links ────────────────────────────────────────── */}
      <section
        className="section-py"
        style={{ background: 'rgba(11,31,58,0.02)' }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-label">External Resources</span>
            <h2 className="heading-section text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              Useful Financial Links
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Verified official portals for Indian investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USEFUL_LINKS.map((link, i) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-start gap-4 group animate-fadeInUp"
                style={{ animationDelay: `${i * 0.06}s`, textDecoration: 'none' }}
              >
                <span
                  className="text-2xl flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(11,31,58,0.06)' }}
                >
                  {link.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-sm mb-1 group-hover:underline"
                    style={{ color: 'var(--navy)', fontFamily: 'Work Sans, sans-serif' }}
                  >
                    {link.title}
                  </div>
                  <div className="text-xs text-gray-500 leading-snug" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                    {link.description}
                  </div>
                </div>
                <svg
                  className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--navy)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Help Center</span>
            <h2 className="heading-section text-3xl md:text-4xl" style={{ color: 'var(--navy)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-3" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Answers to the most common questions from our clients.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-10 text-center p-6 rounded-2xl"
            style={{ background: 'rgba(11,31,58,0.04)', border: '1px solid rgba(11,31,58,0.08)' }}
          >
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Didn&apos;t find your answer? We&apos;re happy to help.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
