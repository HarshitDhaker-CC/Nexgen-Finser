import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp, Calendar, Shield, BookOpen,
  Percent, Target, CheckCircle2, Phone,
  MessageCircle, Mail, ArrowRight, ChevronDown,
  Star, Play, BarChart3,
} from 'lucide-react';

// Client components
import HeroCanvas from '@/components/home/HeroCanvas';
import TrustStats from '@/components/home/TrustStats';
import LeadFormCard from '@/components/home/LeadFormCard';
import FAQSection from '@/components/home/FAQSection';

// ─── Static Data ──────────────────────────────────────────────────────────────

const services = [
  {
    icon: <TrendingUp size={28} />,
    title: 'Mutual Fund Investments',
    desc: 'Curated equity, debt, and hybrid fund portfolios aligned with your risk appetite and return expectations.',
    href: '/services',
  },
  {
    icon: <Calendar size={28} />,
    title: 'SIP Planning',
    desc: 'Disciplined Systematic Investment Plans with automated tracking, step-up strategies, and performance reviews.',
    href: '/services',
  },
  {
    icon: <Shield size={28} />,
    title: 'Retirement Planning',
    desc: 'Build a robust retirement corpus with NPS, PPF, and mutual funds to ensure financial independence.',
    href: '/services',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Child Education Planning',
    desc: "Secure your child's educational future with goal-based investment strategies spanning 10–18 year horizons.",
    href: '/services',
  },
  {
    icon: <Percent size={28} />,
    title: 'Tax Saving (ELSS)',
    desc: 'Save up to ₹46,800 in taxes annually with ELSS funds offering the shortest lock-in among 80C instruments.',
    href: '/services',
  },
  {
    icon: <Target size={28} />,
    title: 'Wealth Creation',
    desc: 'Long-term wealth accumulation through diversified portfolios crafted around your life goals and timeline.',
    href: '/services',
  },
];

const benefits = [
  { title: 'Personalized Planning', desc: 'Every plan is tailored to your unique goals, risk tolerance, and financial situation.' },
  { title: 'Goal-Based Investing', desc: 'We align investments directly with your specific life goals — home, education, retirement.' },
  { title: 'AMFI Compliant', desc: 'All recommendations follow AMFI regulations ensuring transparency and investor protection.' },
  { title: 'Ongoing Reviews', desc: 'Regular portfolio reviews and rebalancing to keep your investments on track.' },
  { title: 'Technology Enabled', desc: 'Digital dashboards and real-time tracking for complete visibility of your wealth.' },
  { title: 'Transparent Process', desc: 'No hidden charges, no conflicts of interest — your financial wellbeing is our only priority.' },
];

const testimonials = [
  {
    name: 'Rajesh Sharma', role: 'Software Engineer, Kota',
    quote: "Manoj sir helped me start my SIP journey with just ₹5,000/month. Three years later, my portfolio has grown by 42% and I've already achieved my car purchase goal. His guidance on fund selection has been invaluable.",
  },
  {
    name: 'Priya Agarwal', role: 'Doctor, Kota',
    quote: "Excellent retirement planning advice! Manoj ji helped me understand NPS and mutual fund synergies. He created a 20-year plan that gave me complete clarity on my financial future. Very professional and trustworthy.",
  },
  {
    name: 'Amit Gupta', role: 'Business Owner, Rajasthan',
    quote: "The ELSS mutual fund recommendations were spot on! I saved ₹46,000 in taxes last year while building long-term wealth. Nexgen Finser's approach of combining tax saving with wealth creation is brilliant.",
  },
  {
    name: 'Sunita Verma', role: 'Teacher, Kota',
    quote: "Finally achieving my daughter's education goal felt impossible before meeting Manoj sir. With a small monthly SIP of ₹8,000, we are confidently building her college fund. His patience in explaining everything is commendable.",
  },
];

const articles = [
  {
    category: 'Market Insights', categoryColor: 'var(--emerald)',
    date: 'June 2, 2025', readTime: '5 min read',
    title: 'Power of Compounding: How ₹5,000/month Becomes ₹2 Crore',
    excerpt: 'Discover how starting early with just ₹5,000 per month in a diversified equity mutual fund can create a ₹2 crore corpus over 25 years through the magic of compounding.',
    gradient: 'linear-gradient(135deg, #0B1F3A 0%, #1e4080 100%)',
    icon: <TrendingUp size={36} color="rgba(200,167,93,0.7)" />,
  },
  {
    category: 'Tax Saving', categoryColor: 'var(--gold-dark)',
    date: 'May 18, 2025', readTime: '7 min read',
    title: 'ELSS vs PPF: The Ultimate Tax Saving Guide for FY 2025-26',
    excerpt: 'A comprehensive comparison of ELSS mutual funds and PPF for tax saving under Section 80C. Learn which instrument suits your investment horizon and risk profile.',
    gradient: 'linear-gradient(135deg, #a8873d 0%, #C8A75D 100%)',
    icon: <Percent size={36} color="rgba(255,255,255,0.7)" />,
  },
  {
    category: 'Financial Planning', categoryColor: 'var(--navy)',
    date: 'May 5, 2025', readTime: '6 min read',
    title: 'Why SIP Step-Up is the Most Underrated Retirement Strategy',
    excerpt: "Most investors never step up their SIPs with income growth. We show you how increasing your SIP by just 10% annually can double your final retirement corpus.",
    gradient: 'linear-gradient(135deg, #0F766E 0%, #14b8a6 100%)',
    icon: <Shield size={36} color="rgba(255,255,255,0.7)" />,
  },
];

// Sparkline SVG (server-renderable)
function SparklineSVG({ color = '#C8A75D' }: { color?: string }) {
  const pts = [10, 30, 20, 15, 25, 10, 18, 5, 12, 3].map((y, i) => `${i * 9},${y}`).join(' ');
  return (
    <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
      <polyline points={pts} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points={`${pts} 81,32 0,32`} fill={`${color}18`} stroke="none" />
    </svg>
  );
}

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ═══ SECTION 1 — HERO ════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', alignItems: 'center',
          background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 45%, #132d54 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Hero background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-bg.png" alt="Hero background"
            fill priority style={{ objectFit: 'cover', opacity: 0.12 }}
          />
        </div>

        {/* Canvas overlay — client component */}
        <HeroCanvas />

        {/* Mesh gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `
            radial-gradient(ellipse 70% 70% at 80% 20%, rgba(200,167,93,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(15,118,110,0.07) 0%, transparent 60%)
          `,
        }} />

        {/* Content */}
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, padding: 'clamp(5rem, 12vw, 8rem) 1.5rem clamp(4rem, 8vw, 6rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

            {/* Left Column */}
            <div style={{ maxWidth: '600px' }}>
              {/* Trust badges */}
              <div className="animate-fadeInDown" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2rem' }}>
                {['AMFI Registered', '15+ Years', '2000+ Clients', 'SEBI Compliant'].map((badge) => (
                  <span key={badge} style={{ padding: '0.3rem 0.875rem', border: '1px solid rgba(200,167,93,0.35)', borderRadius: '2rem', fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(200,167,93,0.85)', background: 'rgba(200,167,93,0.07)' }}>
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="animate-fadeInUp heading-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'white', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                Transform Your Income Into{' '}
                <span style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Long-Term Wealth
                </span>
              </h1>

              <p className="animate-fadeInUp delay-200" style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.65)', marginBottom: '2.25rem', fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7, letterSpacing: '0.01em' }}>
                Mutual Funds&nbsp;&bull;&nbsp;SIP Planning&nbsp;&bull;&nbsp;Retirement Planning&nbsp;&bull;&nbsp;Goal-Based Wealth Creation
              </p>

              <div className="animate-fadeInUp delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <Link href="/tools/wealth-studio" className="btn-primary" style={{ background: 'white', color: 'var(--navy)' }}>
                  Start Financial Planning <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="btn-outline-gold">
                  Free Portfolio Review
                </Link>
              </div>

              {/* Stats row */}
              <div className="animate-fadeInUp delay-400" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem 2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { num: '₹50 Cr+', label: 'Assets Advised' },
                  { num: '18.4%', label: 'Avg. Portfolio Return' },
                  { num: '94.2%', label: 'Goal Achievement' },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.5rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '0.125rem' }}>
                      {item.num}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.05em' }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Floating Stat Cards (hidden on mobile) */}
            <div className="hero-cards-col" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem' }}>

              {/* Card 1 — Portfolio Return */}
              <div className="animate-float" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,167,93,0.2)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', animationDuration: '6s' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Portfolio Return</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '2rem', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>+18.4%</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', fontFamily: 'Inter, sans-serif' }}>vs 12.1% benchmark</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                  <SparklineSVG color="#4ade80" />
                  <div style={{ padding: '0.25rem 0.625rem', borderRadius: '1rem', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', fontSize: '0.6875rem', color: '#4ade80', fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>↑ Outperforming</div>
                </div>
              </div>

              {/* Card 2 — Active SIPs */}
              <div className="animate-float" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,167,93,0.2)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', animationDelay: '1.5s', animationDuration: '7s', marginLeft: 'clamp(0rem, 5vw, 2rem)', maxWidth: '100%' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Active SIPs</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>2,847</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem', fontFamily: 'Inter, sans-serif' }}>Across 45+ fund schemes</div>
                </div>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(200,167,93,0.15)', border: '1px solid rgba(200,167,93,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={22} color="var(--gold)" />
                </div>
              </div>

              {/* Card 3 — Goal Achievement */}
              <div className="animate-float" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(200,167,93,0.2)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', animationDelay: '0.75s', animationDuration: '8s' }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Goal Achievement Rate</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '2rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>94.2%</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>200+ goals met</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: '94.2%', height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))', borderRadius: '4px', boxShadow: '0 0 8px rgba(200,167,93,0.5)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', animation: 'float2 2.5s ease-in-out infinite' }}>
          <span style={{ fontSize: '0.6875rem', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ═══ SECTION 2 — TRUST STATS ═════════════════════════════════════════ */}
      <TrustStats />

      {/* ═══ SECTION 3 — ABOUT PREVIEW ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-light)', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left — Text */}
            <div>
              <span className="section-label">About Us</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                Meet <span style={{ color: 'var(--gold)' }}>Manoj Dhakar</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.0125rem' }}>
                With over 15 years of experience in financial advisory, Manoj Dhakar has helped thousands of families in Kota and across Rajasthan achieve their financial dreams. As an AMFI-certified Mutual Fund Distributor, he brings institutional-grade expertise to every client relationship.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0125rem' }}>
                His philosophy is simple: every rupee you invest should have a purpose. Through goal-based planning, disciplined SIPs, and periodic reviews, he ensures your wealth grows in alignment with your life's milestones.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2rem' }}>
                {[
                  { label: 'Certified Advisor', color: 'var(--navy)' },
                  { label: 'AMFI ARN Holder', color: 'var(--gold-dark)' },
                  { label: '2000+ Clients', color: 'var(--emerald)' },
                ].map((badge) => (
                  <span key={badge.label} style={{ padding: '0.4rem 1rem', borderRadius: '2rem', border: `1.5px solid ${badge.color}`, color: badge.color, fontSize: '0.8125rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.04em', background: `${badge.color}08` }}>
                    ✓ {badge.label}
                  </span>
                ))}
              </div>
              <Link href="/about" className="btn-primary">
                Read Full Story <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right — Founder image */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '360px', maxWidth: '100%', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 24px 64px rgba(11,31,58,0.18)', border: '3px solid rgba(200,167,93,0.2)' }}>
                <Image
                  src="/images/founder.png" alt="Manoj Dhakar — Financial Advisor"
                  width={360} height={440}
                  style={{ objectFit: 'cover', width: '100%', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(11,31,58,0.92) 0%, transparent 100%)', padding: '2rem 1.5rem 1.5rem' }}>
                  <div style={{ color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600 }}>Manoj Dhakar</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.8125rem', fontFamily: "'Work Sans', sans-serif", marginTop: '0.25rem' }}>Founder & Chief Financial Advisor</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', marginTop: '0.125rem' }}>Kota, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — SERVICES GRID ══════════════════════════════════════ */}
      <section id="services" style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">What We Offer</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
              Comprehensive Financial Services
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '1rem auto 0', lineHeight: 1.75, fontSize: '1.0125rem' }}>
              From mutual fund investments to retirement planning, we offer end-to-end financial solutions tailored to your unique goals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, i) => (
              <div
                key={i}
                className="card-3d"
                style={{
                  background: 'white', border: '1px solid rgba(200,167,93,0.12)',
                  borderRadius: '1.25rem', padding: '2rem',
                  borderTop: '3px solid var(--gold)',
                  boxShadow: '0 4px 20px rgba(11,31,58,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '0.875rem', background: 'rgba(11,31,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--navy)' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.625rem', fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  {service.desc}
                </p>
                <Link href={service.href} style={{ fontSize: '0.875rem', color: 'var(--gold-dark)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — WHY CHOOSE US ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-light)', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left — Benefits list */}
            <div>
              <span className="section-label">Why Nexgen Finser</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', color: 'var(--navy)', marginBottom: '2rem', marginTop: '0.5rem' }}>
                Your Wealth Journey, <span style={{ color: 'var(--gold)' }}>Our Expertise</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: 'white', borderRadius: '0.875rem', border: '1px solid rgba(200,167,93,0.1)', boxShadow: '0 2px 12px rgba(11,31,58,0.04)', transition: 'transform 0.2s ease' }}>
                    <CheckCircle2 size={20} color="var(--emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.125rem' }}>{b.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.845rem', lineHeight: 1.6 }}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Wealth Journey Timeline */}
            <div>
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid rgba(200,167,93,0.15)', boxShadow: '0 8px 40px rgba(11,31,58,0.08)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.375rem', color: 'var(--navy)', marginBottom: '2rem', fontWeight: 600 }}>Your Wealth Journey</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { phase: '01', label: 'Invest', color: 'var(--navy)', bg: 'rgba(11,31,58,0.06)', desc: 'Start with a goal-based SIP plan tailored to your income and risk appetite.', items: ['Risk Assessment', 'Fund Selection', 'SIP Automation'] },
                    { phase: '02', label: 'Grow', color: 'var(--gold-dark)', bg: 'rgba(200,167,93,0.08)', desc: 'Watch your wealth grow with regular reviews, rebalancing, and SIP step-ups.', items: ['Portfolio Reviews', 'SIP Step-Up', 'Tax Optimization'] },
                    { phase: '03', label: 'Retire', color: 'var(--emerald)', bg: 'rgba(15,118,110,0.07)', desc: 'Achieve financial independence and live your retirement without compromise.', items: ['Corpus Planning', 'Withdrawal Strategy', 'Legacy Planning'] },
                  ].map((phase, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
                      {i < 2 && (<div style={{ position: 'absolute', left: '23px', top: '52px', bottom: 0, width: '2px', background: `linear-gradient(to bottom, ${phase.color}40, transparent)`, zIndex: 0 }} />)}
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: phase.bg, border: `2px solid ${phase.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.875rem', fontWeight: 700, color: phase.color, flexShrink: 0, zIndex: 1 }}>
                        {phase.phase}
                      </div>
                      <div style={{ paddingBottom: '1.75rem', flex: 1 }}>
                        <div style={{ fontWeight: 700, color: phase.color, fontSize: '1.0625rem', fontFamily: "'Playfair Display', serif", marginBottom: '0.375rem' }}>Phase {phase.phase}: {phase.label}</div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.845rem', lineHeight: 1.6, marginBottom: '0.625rem' }}>{phase.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                          {phase.items.map((item) => (
                            <span key={item} style={{ padding: '0.2rem 0.625rem', background: phase.bg, borderRadius: '1rem', fontSize: '0.7rem', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, color: phase.color }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — WEALTH STUDIO PREVIEW ══════════════════════════════ */}
      <section id="tools-preview" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, #132d54 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 90% 10%, rgba(200,167,93,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(15,118,110,0.06) 0%, transparent 60%)' }} />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ background: 'rgba(200,167,93,0.12)', borderColor: 'rgba(200,167,93,0.3)', color: 'var(--gold)' }}>Wealth Studio</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.875rem)', color: 'white', marginTop: '0.5rem' }}>
              Heritage Wealth&nbsp;&middot;&nbsp;<span style={{ color: 'var(--gold)' }}>Private Office</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '1rem auto 0', lineHeight: 1.75, fontSize: '1.0125rem' }}>
              Our Wealth Projection Studio lets you model your financial future — simulate SIP growth, visualize corpus milestones, and stress-test your retirement plan, all in one place.
            </p>
          </div>

          {/* Preview Card */}
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(200,167,93,0.2)', borderRadius: '1.5rem', padding: '2.5rem', maxWidth: '900px', margin: '0 auto 3rem', boxShadow: '0 16px 64px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {[
                { label: 'Projected Corpus', value: '₹2.4 Cr', sub: '20-year horizon', accent: 'var(--gold)' },
                { label: 'Wealth Multiplier', value: '3.2×', sub: 'vs fixed deposit', accent: '#4ade80' },
                { label: 'Monthly SIP', value: '₹15,000', sub: 'Current investment', accent: 'rgba(255,255,255,0.7)' },
                { label: 'Expected XIRR', value: '14.5%', sub: 'Historical avg.', accent: '#60a5fa' },
              ].map((metric) => (
                <div key={metric.label} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{metric.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.625rem', fontWeight: 700, color: metric.accent, lineHeight: 1, marginBottom: '0.25rem' }}>{metric.value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>{metric.sub}</div>
                </div>
              ))}
            </div>

            {/* Mock growth bar */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>Corpus Growth Projection</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold)', fontFamily: "'IBM Plex Mono', monospace" }}>Year 20 → ₹2.4 Cr</span>
              </div>
              {[
                { year: 'Year 5', val: 15, corpus: '₹13.5 L' },
                { year: 'Year 10', val: 35, corpus: '₹42 L' },
                { year: 'Year 15', val: 62, corpus: '₹1.1 Cr' },
                { year: 'Year 20', val: 100, corpus: '₹2.4 Cr' },
              ].map((row) => (
                <div key={row.year} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.625rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', width: '52px', flexShrink: 0 }}>{row.year}</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${row.val}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontFamily: "'IBM Plex Mono', monospace", width: '60px', textAlign: 'right', flexShrink: 0 }}>{row.corpus}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(200,167,93,0.07)', borderRadius: '0.875rem', border: '1px solid rgba(200,167,93,0.15)' }}>
              <Play size={16} color="var(--gold)" fill="var(--gold)" />
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', fontFamily: 'Inter, sans-serif' }}>
                This is a sample projection. Your actual results depend on your investment horizon, fund selection, and market performance.
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/tools/wealth-studio" className="btn-gold" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Launch Wealth Studio <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — TESTIMONIALS ════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-light)', padding: '5rem 0', overflow: 'hidden' }}>
        <div className="container-custom" style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Client Stories</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
              What Our Clients Say
            </h2>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2, background: 'linear-gradient(to right, var(--bg-light), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2, background: 'linear-gradient(to left, var(--bg-light), transparent)', pointerEvents: 'none' }} />
          <style>{`
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .marquee-track { display: flex; gap: 1.5rem; width: max-content; animation: marquee 30s linear infinite; }
            .marquee-track:hover { animation-play-state: paused; }
          `}</style>
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="testimonial-card" style={{ minWidth: '340px', maxWidth: '340px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, si) => <Star key={si} size={15} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.75, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.9375rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8 — LEAD GENERATION ════════════════════════════════════ */}
      <section id="contact-cta" style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">Get Started</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
              Let&apos;s Begin Your <span style={{ color: 'var(--gold)' }}>Financial Journey</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.75 }}>
              Choose how you&apos;d like to connect with us. Our advisor will reach out within 24 hours.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <LeadFormCard type="callback" title="Free Callback Request" description="Request a callback from our advisor at your convenient time." icon={<Phone size={22} />} />
            <LeadFormCard type="portfolio_review" title="Portfolio Review" description="Get a free in-depth review of your existing investment portfolio." icon={<BarChart3 size={22} />} />
            <LeadFormCard type="health_check" title="Financial Health Check" description="Discover gaps in your financial plan with our 360° health assessment." icon={<Target size={22} />} />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9 — BLOG PREVIEW ════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-light)', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-label">Knowledge Hub</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>Financial Insights</h2>
            </div>
            <Link href="/blog" style={{ color: 'var(--gold-dark)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.9375rem' }}>
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {articles.map((article, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(200,167,93,0.1)', boxShadow: '0 4px 24px rgba(11,31,58,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <div style={{ height: '200px', background: article.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {article.icon}
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: '1rem', fontSize: '0.7rem', color: 'white', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {article.category}
                  </span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem', fontSize: '0.775rem', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.4 }}>{article.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{article.excerpt}</p>
                  <Link href="/blog" style={{ fontSize: '0.875rem', color: 'var(--gold-dark)', fontFamily: "'Work Sans', sans-serif", fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10 — FAQ ════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══ SECTION 11 — CONTACT CTA ════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-light)', padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">Contact Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
              Get In Touch
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { label: 'Phone', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–7pm', icon: <Phone size={28} />, href: 'tel:+919876543210', color: 'var(--navy)', bg: 'rgba(11,31,58,0.07)' },
              { label: 'WhatsApp', value: '+91 98765 43210', sub: 'Quick Response', icon: <MessageCircle size={28} />, href: 'https://wa.me/919876543210', color: '#25D366', bg: 'rgba(37,211,102,0.08)' },
              { label: 'Email', value: 'info@nexgenfinser.com', sub: 'We reply within 24h', icon: <Mail size={28} />, href: 'mailto:info@nexgenfinser.com', color: 'var(--gold-dark)', bg: 'rgba(200,167,93,0.08)' },
            ].map((contact) => (
              <a key={contact.label} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem', background: 'white', borderRadius: '1.25rem', textDecoration: 'none', border: '1px solid rgba(200,167,93,0.1)', boxShadow: '0 4px 20px rgba(11,31,58,0.06)', textAlign: 'center', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: contact.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: contact.color, marginBottom: '1rem' }}>
                  {contact.icon}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Work Sans', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>{contact.label}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.25rem', fontFamily: 'Inter, sans-serif' }}>{contact.value}</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{contact.sub}</div>
              </a>
            ))}
          </div>

          {/* Google Maps Embed */}
          <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(200,167,93,0.15)', boxShadow: '0 8px 40px rgba(11,31,58,0.08)', height: '420px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57905.10073208698!2d75.80259014863278!3d25.143798100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f8066729a8e0d%3A0x5ec8bef2e0f88e2f!2sKota%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1717600000000!5m2!1sen!2sin"
              width="100%" height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nexgen Finser Location — Kota, Rajasthan"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
