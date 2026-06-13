'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Calendar,
  PiggyBank,
  GraduationCap,
  Receipt,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  ArrowUpRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQ {
  q: string;
  a: string;
}

interface ServiceSection {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  name: string;
  tagline: string;
  benefits: string[];
  process: { step: string; desc: string }[];
  faqs: FAQ[];
  ctaLabel: string;
  accentColor: string;
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(200,167,93,0.15)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.125rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--navy)',
            lineHeight: 1.4,
          }}
        >
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          style={{
            flexShrink: 0,
            color: 'var(--gold)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            paddingBottom: '1.125rem',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}

// ─── Service Data ─────────────────────────────────────────────────────────────
const services: ServiceSection[] = [
  {
    id: 'mutual-funds',
    icon: <TrendingUp size={32} />,
    iconBg: 'rgba(11,31,58,0.08)',
    iconColor: 'var(--navy)',
    name: 'Mutual Fund Investments',
    tagline: 'Expert-guided diversified investing for every financial goal',
    accentColor: 'var(--navy)',
    benefits: [
      'Expert fund selection tailored to your risk profile and goals',
      'Broad diversification across equity, debt, and hybrid categories',
      'Professional fund management by SEBI-regulated AMCs',
      'Real-time portfolio monitoring and performance tracking',
      'Systematic investment options with flexibility to top-up or redeem',
    ],
    process: [
      { step: 'Goal Assessment', desc: 'We begin by deeply understanding your short-term and long-term financial goals, investment horizon, and income situation.' },
      { step: 'Risk Profiling', desc: 'A detailed risk questionnaire and discussion to determine whether you are a conservative, moderate, or aggressive investor.' },
      { step: 'Fund Selection', desc: 'We identify the optimal funds from across categories and AMCs — matched precisely to your profile and goals.' },
      { step: 'Portfolio Monitoring', desc: 'Regular reviews ensure your portfolio stays aligned with your goals, with timely rebalancing when needed.' },
    ],
    faqs: [
      {
        q: 'What is the minimum investment amount in mutual funds?',
        a: 'Most mutual funds allow investments starting from just ₹500 per month via SIP or ₹1,000 as a lump-sum. There is no maximum limit. We help you determine the right amount based on your financial capacity.',
      },
      {
        q: 'What is NAV and how does it affect my investment?',
        a: 'NAV (Net Asset Value) is the per-unit price of a mutual fund. When you invest, units are allotted at the prevailing NAV. Your returns depend on the appreciation of NAV over time, which reflects the fund\'s portfolio performance.',
      },
      {
        q: 'How can I track my mutual fund portfolio?',
        a: 'You can track your portfolio via the AMC\'s app/website, CAMS or KFintech portals, or through your investment statement. We also provide periodic review meetings and consolidated statements for your convenience.',
      },
    ],
    ctaLabel: 'Start Investing in Mutual Funds',
  },
  {
    id: 'sip-planning',
    icon: <Calendar size={32} />,
    iconBg: 'rgba(200,167,93,0.1)',
    iconColor: 'var(--gold-dark)',
    name: 'SIP Planning',
    tagline: 'Build wealth systematically through disciplined monthly investing',
    accentColor: 'var(--gold-dark)',
    benefits: [
      'Rupee cost averaging reduces the impact of market volatility',
      'Harness the unmatched power of compounding over long terms',
      'Start with amounts as low as ₹500 per month',
      'Fully automated — investments happen on auto-debit every month',
      'Step-up SIP facility to increase amount annually as income grows',
    ],
    process: [
      { step: 'Set Your SIP Amount', desc: 'Based on your budget and goals, we help you determine the ideal SIP amount — ensuring affordability without compromising on growth.' },
      { step: 'Choose the Right Fund', desc: 'We select the most suitable funds for your SIP — equity for long term, debt for stability, or hybrid for balance.' },
      { step: 'Auto-Debit Setup', desc: 'We set up the e-NACH mandate so your SIP runs automatically every month — no manual effort needed.' },
      { step: 'Annual Review', desc: 'Every year we review your SIP performance, suggest step-ups, and ensure you remain on track to hit your targets.' },
    ],
    faqs: [
      {
        q: 'What is the minimum SIP amount I can start with?',
        a: 'Most funds allow SIPs starting at ₹500 per month. Some specialized funds may have a ₹1,000 minimum. We recommend starting with whatever is comfortable and increasing gradually over time.',
      },
      {
        q: 'Can I pause or stop my SIP at any time?',
        a: 'Yes, SIPs can be paused (for up to 3 months in most funds) or stopped entirely at any time without any penalties. Your invested units remain in the fund and continue to grow.',
      },
      {
        q: 'What is a Step-Up SIP and should I opt for it?',
        a: 'A Step-Up SIP allows you to automatically increase your SIP amount by a fixed percentage or amount every year. This is highly recommended as your income grows, since it dramatically accelerates corpus accumulation over time.',
      },
    ],
    ctaLabel: 'Plan Your SIP Today',
  },
  {
    id: 'retirement-planning',
    icon: <PiggyBank size={32} />,
    iconBg: 'rgba(15,118,110,0.08)',
    iconColor: 'var(--emerald)',
    name: 'Retirement Planning',
    tagline: 'Build a robust corpus for a financially independent retirement',
    accentColor: 'var(--emerald)',
    benefits: [
      'Precise retirement corpus calculation based on your lifestyle goals',
      'Inflation-protected investment strategy to maintain purchasing power',
      'Tax-efficient structures to maximize your post-retirement income',
      'Systematic Withdrawal Plan (SWP) for regular post-retirement income',
      'Holistic planning covering healthcare, housing, and estate considerations',
    ],
    process: [
      { step: 'Define Retirement Goal', desc: 'We help you clearly define your retirement age, desired monthly income, and lifestyle expectations — the foundation of your plan.' },
      { step: 'Current Savings Assessment', desc: 'We evaluate your existing savings, EPF, PPF, and other assets to understand your current retirement readiness.' },
      { step: 'Strategy Formulation', desc: 'We build a personalized asset allocation strategy combining equity, debt, and hybrid funds for optimal growth and protection.' },
      { step: 'Implementation & Monitoring', desc: 'We execute the plan, set up SIPs, and review annually — gradually shifting to more conservative allocations as retirement nears.' },
    ],
    faqs: [
      {
        q: 'When is the right time to start retirement planning?',
        a: 'The best time is now — regardless of your age. Starting in your 20s or 30s gives compounding maximum time to work. However, even starting in your 40s or 50s with higher SIP amounts can build a meaningful corpus.',
      },
      {
        q: 'How much corpus do I need for a comfortable retirement?',
        a: 'A common benchmark is 25–30 times your annual expenses at retirement. For example, if you need ₹60,000/month (₹7.2L/year) post-retirement, you\'d need a corpus of approximately ₹1.8–2.2 crore. We calculate this precisely for you.',
      },
      {
        q: 'What if I start retirement planning late?',
        a: 'Starting late means you need to invest more aggressively. We structure a catch-up strategy with higher SIP amounts, lumpsum investments, and equity-heavy allocation to compensate. Every year matters — starting today is always better than delaying.',
      },
    ],
    ctaLabel: 'Plan My Retirement',
  },
  {
    id: 'child-education',
    icon: <GraduationCap size={32} />,
    iconBg: 'rgba(11,31,58,0.06)',
    iconColor: 'var(--navy)',
    name: 'Child Education Planning',
    tagline: 'Secure your child\'s educational future with disciplined investing',
    accentColor: 'var(--navy)',
    benefits: [
      'Goal-based investing aligned to your child\'s education milestones',
      'Inflation-adjusted target calculation for future education costs',
      'Time-based fund selection matching your investment horizon',
      'Dedicated corpus separate from other financial goals',
      'Flexibility to plan for domestic as well as international education',
    ],
    process: [
      { step: 'Education Goal Setting', desc: 'Identify your child\'s likely educational path — engineering, medicine, MBA, study abroad — and estimate the future cost with inflation.' },
      { step: 'Determine Timeframe', desc: 'We calculate the number of years until the funds are needed, which determines the appropriate investment strategy and fund category.' },
      { step: 'Monthly Requirement', desc: 'Using a goal-based calculator, we determine the exact SIP amount needed today to meet the future education cost.' },
      { step: 'Fund Selection & Monitoring', desc: 'We select age-appropriate funds — equity-heavy when your child is young, gradually shifting to debt as the goal approaches.' },
    ],
    faqs: [
      {
        q: 'How early should I start investing for my child\'s education?',
        a: 'Ideally, start at birth or as early as possible. Starting when your child is 0–3 years old gives you 15+ years of compounding, requiring much smaller monthly investments to achieve the same corpus compared to starting later.',
      },
      {
        q: 'Which type of funds are best for child education planning?',
        a: 'For long horizons (10+ years), diversified equity funds or flexi-cap funds offer the best growth. As the goal approaches (3–5 years away), we gradually shift to balanced hybrid or debt funds to protect the corpus.',
      },
      {
        q: 'Should I create a separate goal-based fund or invest in a general corpus?',
        a: 'We strongly recommend goal-based investing with a dedicated portfolio for education. This ensures mental accounting, prevents premature withdrawal, and allows us to optimize the investment strategy specifically for that goal\'s timeframe.',
      },
    ],
    ctaLabel: 'Plan Child\'s Education',
  },
  {
    id: 'tax-saving',
    icon: <Receipt size={32} />,
    iconBg: 'rgba(200,167,93,0.1)',
    iconColor: 'var(--gold-dark)',
    name: 'Tax Saving (ELSS)',
    tagline: 'Save tax under Section 80C while building long-term equity wealth',
    accentColor: 'var(--gold-dark)',
    benefits: [
      'Tax deduction up to ₹1.5 lakh under Section 80C of the Income Tax Act',
      'Shortest lock-in period of just 3 years among all 80C instruments',
      'Potential for significantly higher returns through equity market participation',
      'SIP or lumpsum investment flexibility',
      'Dual benefit: tax saving + wealth creation in a single instrument',
    ],
    process: [
      { step: 'Tax Liability Analysis', desc: 'We review your income, existing deductions, and tax bracket to determine how much ELSS investment will optimally reduce your tax liability.' },
      { step: 'ELSS Fund Selection', desc: 'We select the best-performing ELSS funds based on track record, fund manager expertise, and portfolio quality.' },
      { step: 'SIP or Lumpsum', desc: 'For tax planning, we recommend SIPs throughout the year rather than last-minute lumpsum investments to benefit from rupee cost averaging.' },
      { step: 'Annual Tax Review', desc: 'Before every financial year-end, we review your tax saving investments and ensure you\'ve maximized your 80C benefits efficiently.' },
    ],
    faqs: [
      {
        q: 'ELSS vs PPF — which is better for tax saving?',
        a: 'ELSS offers a 3-year lock-in (vs PPF\'s 15 years) and potential for much higher equity-driven returns. PPF offers guaranteed, tax-free returns with lower risk. We typically recommend combining both for a balanced tax-saving strategy — ELSS for growth, PPF for guaranteed debt allocation.',
      },
      {
        q: 'What happens to my ELSS after the 3-year lock-in?',
        a: 'After 3 years, you can withdraw, partially redeem, or continue staying invested. There is no obligation to exit. Many investors choose to stay invested since the funds continue to perform, and capital gains beyond ₹1 lakh per year are taxed at just 10% (LTCG).',
      },
      {
        q: 'When is the best time to invest in ELSS?',
        a: 'The best time is through SIPs spread across the year — starting in April rather than rushing in February or March. This avoids last-minute lumpsum pressure, benefits from market averaging, and keeps your tax planning disciplined throughout the year.',
      },
    ],
    ctaLabel: 'Start Tax Saving Now',
  },
  {
    id: 'goal-planning',
    icon: <Target size={32} />,
    iconBg: 'rgba(15,118,110,0.08)',
    iconColor: 'var(--emerald)',
    name: 'Goal-Based Financial Planning',
    tagline: 'A holistic financial roadmap aligned with every milestone in your life',
    accentColor: 'var(--emerald)',
    benefits: [
      'Comprehensive personalized financial roadmap covering all life goals',
      'Milestone-based tracking and progress monitoring',
      'Regular quarterly and annual review meetings',
      'Holistic approach covering investment, insurance, and estate needs',
      'Adaptive strategies as your life circumstances evolve',
    ],
    process: [
      { step: 'Goal Identification', desc: 'A comprehensive discovery session to map all your financial goals — home purchase, business, travel, education, retirement — with timelines and amounts.' },
      { step: 'Financial Assessment', desc: 'We assess your current income, expenses, assets, liabilities, insurance coverage, and existing investments to create your complete financial picture.' },
      { step: 'Strategy Development', desc: 'We create a priority-based investment strategy, allocating available investable surplus across your goals based on urgency, importance, and timeframe.' },
      { step: 'Monitoring & Adaptation', desc: 'Life changes — so does your plan. We meet regularly to review progress, adapt to income changes, and celebrate milestones as you achieve them.' },
    ],
    faqs: [
      {
        q: 'What types of financial goals do you help plan for?',
        a: 'We cover the full spectrum: home down payment, children\'s education, wedding expenses, vehicle purchase, international travel, business capital, retirement, and legacy/estate planning. No goal is too big or too small — we plan for all of them systematically.',
      },
      {
        q: 'How often will we review my financial plan?',
        a: 'We conduct formal review meetings twice a year — typically in April (start of financial year) and October. Additionally, we are available for ad-hoc consultations whenever there are major life events like a salary change, marriage, birth, or inheritance.',
      },
      {
        q: 'Is there a fee for your financial planning services?',
        a: 'Our financial planning consultation is completely free. We earn through AMFI-regulated distributor commissions on mutual fund investments, which are already embedded in the fund\'s expense ratio. There are no hidden charges or advisory fees.',
      },
    ],
    ctaLabel: 'Get My Financial Roadmap',
  },
];

// ─── Service Section Component ─────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceSection; index: number }) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.id}
      ref={ref}
      style={{
        padding: 'var(--section-py) 0',
        background: isEven ? 'white' : 'var(--bg-light)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <div className="container-custom">
        {/* Service Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem',
            marginBottom: '3rem',
            paddingBottom: '2rem',
            borderBottom: `2px solid ${service.accentColor === 'var(--navy)' ? 'rgba(11,31,58,0.1)' : service.accentColor === 'var(--gold-dark)' ? 'rgba(200,167,93,0.2)' : 'rgba(15,118,110,0.15)'}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              background: service.iconBg,
              borderRadius: '1.25rem',
              color: service.iconColor,
              flexShrink: 0,
            }}
          >
            {service.icon}
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>
              {String(index + 1).padStart(2, '0')} — Service
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: 'var(--navy)',
                lineHeight: 1.2,
                marginBottom: '0.5rem',
              }}
            >
              {service.name}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Benefits */}
          <div>
            <h3
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: service.iconColor,
                marginBottom: '1.25rem',
              }}
            >
              Key Benefits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {service.benefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  <CheckCircle
                    size={17}
                    style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: '0.125rem' }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      color: 'var(--text-dark)',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '2rem' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--navy)',
                  color: 'white',
                  borderRadius: '0.625rem',
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(11,31,58,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {service.ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Process */}
          <div>
            <h3
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: service.iconColor,
                marginBottom: '1.25rem',
              }}
            >
              Our Process
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.process.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      color: 'white',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: 'var(--navy)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {step.step}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div style={{ gridColumn: '1 / -1' }}>
            <h3
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: service.iconColor,
                marginBottom: '1rem',
              }}
            >
              Frequently Asked Questions
            </h3>
            <div
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(200,167,93,0.15)',
              }}
            >
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Navigation ────────────────────────────────────────────────────────
const serviceNavItems = [
  { id: 'mutual-funds', label: 'Mutual Funds' },
  { id: 'sip-planning', label: 'SIP Planning' },
  { id: 'retirement-planning', label: 'Retirement' },
  { id: 'child-education', label: 'Education' },
  { id: 'tax-saving', label: 'Tax Saving' },
  { id: 'goal-planning', label: 'Goal Planning' },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState('mutual-funds');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    services.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-mesh"
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,167,93,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              marginBottom: '1.75rem',
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <Link
              href="/"
              style={{ color: 'var(--gold-dark)', textDecoration: 'none', fontWeight: 500 }}
            >
              Home
            </Link>
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Services</span>
          </nav>

          <div className="animate-fadeInUp" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ marginBottom: '1.25rem' }}>
              What We Offer
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: 'var(--navy)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}
            >
              Our{' '}
              <span className="text-gradient-gold">Financial Services</span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.175rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: 600,
                marginBottom: '2rem',
              }}
            >
              Comprehensive wealth management and financial advisory services — from mutual fund investments to complete goal-based financial planning — all under one trusted roof.
            </p>

            {/* Quick service pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(11,31,58,0.06)',
                    border: '1px solid rgba(11,31,58,0.12)',
                    borderRadius: '2rem',
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                    color: 'var(--navy)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--navy)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(11,31,58,0.06)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--navy)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(11,31,58,0.12)';
                  }}
                >
                  {s.name}
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Service Navigation ─────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: '73px',
          zIndex: 50,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(200,167,93,0.15)',
          boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'flex',
              gap: '0.25rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '0.75rem 0',
            }}
          >
            {serviceNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: activeSection === item.id ? 'var(--navy)' : 'transparent',
                  color: activeSection === item.id ? 'white' : 'var(--text-secondary)',
                  border: activeSection === item.id ? '1px solid var(--navy)' : '1px solid transparent',
                  borderRadius: '0.5rem',
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Sections ──────────────────────────────────────────────── */}
      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--section-py) 0',
          background: 'linear-gradient(145deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-light) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,167,93,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div
            className="section-label"
            style={{ justifyContent: 'center', marginBottom: '1.25rem', borderColor: 'rgba(200,167,93,0.3)', color: 'var(--gold-light)' }}
          >
            Ready to Start?
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Let&rsquo;s Build Your Financial Future
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 520,
              margin: '0 auto 2.5rem',
              lineHeight: 1.75,
            }}
          >
            Book your free consultation today. No obligations, no sales pressure — just genuine advice aligned with your goals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn-gold"
              style={{ fontSize: '1rem', padding: '0.9375rem 2.25rem' }}
            >
              Book Free Consultation
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+919876543210"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9375rem 2.25rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                borderRadius: '0.625rem',
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                border: '1.5px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            >
              <Phone size={18} />
              +91-98765-43210
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
