'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  CheckCircle,
  Eye,
  Target,
  Shield,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  Calendar,
  ArrowRight,
  Star,
  Lightbulb,
  BarChart2,
  Clock,
  Flag,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatProps {
  value: string;
  label: string;
  delay?: number;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedStat({ value, label, delay = 0 }: StatProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '0.375rem',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: '0.8125rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Philosophy Step ──────────────────────────────────────────────────────────
const philosophySteps = [
  {
    icon: <Lightbulb size={22} />,
    title: 'Understand Goals First',
    desc: 'Every financial journey starts with a deep conversation about your life goals — not just numbers. We learn what truly matters to you before recommending anything.',
    color: '#0B1F3A',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Risk Assessment',
    desc: 'We carefully evaluate your risk tolerance, investment horizon, income stability, and family situation to map out the right risk profile for you.',
    color: '#C8A75D',
  },
  {
    icon: <Target size={22} />,
    title: 'Personalized Strategy',
    desc: 'Based on your goals and risk profile, we build a bespoke investment strategy with the right fund mix — no one-size-fits-all solutions.',
    color: '#0F766E',
  },
  {
    icon: <Clock size={22} />,
    title: 'Regular Reviews',
    desc: 'Markets and life both change. We conduct periodic reviews to realign your portfolio with your evolving goals, ensuring you stay on track.',
    color: '#0B1F3A',
  },
  {
    icon: <Flag size={22} />,
    title: 'Goal Achievement',
    desc: 'Through disciplined investing and consistent guidance, we celebrate with you when your financial milestones are reached — and plan the next ones.',
    color: '#C8A75D',
  },
];

// ─── Core Values ──────────────────────────────────────────────────────────────
const coreValues = [
  {
    icon: <Shield size={28} />,
    title: 'Trust',
    desc: 'Trust is the foundation of every client relationship. We treat your money and your confidence with the same care and responsibility.',
    color: 'var(--navy)',
    bg: 'rgba(11,31,58,0.06)',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Transparency',
    desc: 'We believe in clear, jargon-free communication. You always know exactly where your money is, why it\'s there, and how it\'s performing.',
    color: 'var(--gold-dark)',
    bg: 'rgba(200,167,93,0.08)',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Long-Term Thinking',
    desc: 'Wealth is not built overnight. We champion patience, consistency, and the power of compounding — because real wealth is built over decades.',
    color: 'var(--emerald)',
    bg: 'rgba(15,118,110,0.08)',
  },
  {
    icon: <Star size={28} />,
    title: 'Client Success',
    desc: 'Your financial goals are our goals. We measure our success only through the milestones our clients achieve — your wins are our wins.',
    color: 'var(--navy)',
    bg: 'rgba(11,31,58,0.06)',
  },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const founderReveal = useReveal();
  const valuesReveal = useReveal();
  const visionReveal = useReveal();
  const philoReveal = useReveal();

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
        {/* decorative gold mesh circles */}
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-8%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,31,58,0.05) 0%, transparent 70%)',
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
            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>About</span>
          </nav>

          {/* Headline */}
          <div className="animate-fadeInUp" style={{ maxWidth: 700 }}>
            <div className="section-label" style={{ marginBottom: '1.25rem' }}>
              Our Story
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
              About{' '}
              <span className="text-gradient-gold">Nexgen Finser</span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.175rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: 580,
              }}
            >
              A story rooted in trust, built on expertise, and driven by one singular purpose — empowering families across Rajasthan to achieve lasting financial freedom.
            </p>
          </div>
        </div>
      </section>

      {/* ── Founder Section ───────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-py) 0', background: 'white' }}>
        <div className="container-custom">
          <div
            ref={founderReveal.ref}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'start',
              opacity: founderReveal.visible ? 1 : 0,
              transform: founderReveal.visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            {/* Left: Founder Image */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: 'min(380px, 100%)',
                }}
              >
                {/* Decorative background block */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    right: -20,
                    bottom: -20,
                    background: 'var(--navy)',
                    borderRadius: '1.5rem',
                    zIndex: 0,
                  }}
                />
                {/* Gold border frame */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    border: '3px solid var(--gold)',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    background: 'var(--navy)',
                    aspectRatio: '4/5',
                  }}
                >
                  <Image
                    src="nexgen-finser\public\images\Manoj.jpeg"
                    alt="Manoj Dhakar — Founder & Chief Financial Advisor, Nexgen Finser"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                    onError={(e) => {
                      // Graceful fallback if image is missing
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Overlay name tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(11,31,58,0.95) 0%, transparent 100%)',
                      padding: '2.5rem 1.5rem 1.5rem',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        color: 'white',
                        marginBottom: '0.25rem',
                      }}
                    >
                      Manoj Dhakar
                    </div>
                    <div
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Founder & Chief Financial Advisor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>
                Meet the Founder
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  color: 'var(--navy)',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem',
                }}
              >
                Manoj Dhakar
              </h2>
              <p
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '1.25rem',
                }}
              >
                Founder &amp; Chief Financial Advisor
              </p>

              {/* AMFI Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.125rem',
                  background: 'rgba(11,31,58,0.06)',
                  border: '1.5px solid rgba(11,31,58,0.15)',
                  borderRadius: '2rem',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                  marginBottom: '1.75rem',
                }}
              >
                <Award size={14} style={{ color: 'var(--gold)' }} />
                AMFI Registered Mutual Fund Distributor
              </div>

              {/* Bio paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  'Manoj Dhakar has spent over 15 years transforming the financial futures of families across Kota and Rajasthan. What began as a personal passion for financial literacy has evolved into Nexgen Finser — a trusted practice built on transparency, integrity, and genuine care for every client.',
                  'Specializing in mutual fund distribution, SIP planning, and goal-based investing, Manoj brings a rare combination of deep technical expertise and empathetic advisory. He firmly believes that the right financial strategy, applied with patience, can unlock extraordinary wealth over time.',
                  'Having served over 2,000 families and structured 5,000+ SIPs, Manoj\'s methodology centres on understanding each family\'s unique goals before recommending any product. His expertise spans retirement corpus planning, children\'s education funding, ELSS tax optimization, and comprehensive wealth management.',
                  'Based in Kota, Rajasthan, Manoj is deeply committed to elevating financial literacy in the region. He regularly conducts workshops and seminars, empowering everyday investors to make informed, confident decisions about their money and their future.',
                ].map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.8,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Achievement Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'var(--bg-light)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(200,167,93,0.15)',
                }}
              >
                <AnimatedStat value="15+" label="Years Experience" delay={0} />
                <AnimatedStat value="2000+" label="Families Served" delay={100} />
                <AnimatedStat value="5000+" label="SIPs Structured" delay={200} />
                <AnimatedStat value="₹50+ Cr" label="AUM Managed" delay={300} />
              </div>

              {/* Qualifications */}
              <div>
                <div
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    marginBottom: '1rem',
                  }}
                >
                  Qualifications &amp; Certifications
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    'AMFI Certified Mutual Fund Distributor',
                    'NISM Series V-A Certified',
                    'Financial Planning Expert',
                    'Retirement Planning Specialist',
                  ].map((qual) => (
                    <div
                      key={qual}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9375rem',
                        color: 'var(--text-dark)',
                      }}
                    >
                      <CheckCircle size={17} style={{ color: 'var(--emerald)', flexShrink: 0 }} />
                      {qual}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--section-py) 0',
          background: 'var(--bg-light)',
        }}
      >
        <div className="container-custom">
          <div
            ref={visionReveal.ref}
            style={{
              opacity: visionReveal.visible ? 1 : 0,
              transform: visionReveal.visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                What Drives Us
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: 'var(--navy)',
                  lineHeight: 1.2,
                }}
              >
                Our Vision &amp; Mission
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {/* Vision Card — Navy */}
              <div
                style={{
                  background: 'linear-gradient(145deg, var(--navy) 0%, var(--navy-light) 100%)',
                  borderRadius: '1.5rem',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  border: '1px solid rgba(200,167,93,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: 'rgba(200,167,93,0.07)',
                  }}
                />
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    background: 'rgba(200,167,93,0.15)',
                    borderRadius: '0.875rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Eye size={26} style={{ color: 'var(--gold)' }} />
                </div>
                <div
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '0.875rem',
                  }}
                >
                  Our Vision
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                    color: 'white',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;To be Rajasthan&rsquo;s most trusted partner in creating lasting wealth for every family.&rdquo;
                </p>
              </div>

              {/* Mission Card — White */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '1.5rem',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  border: '2px solid var(--navy)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    left: -40,
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: 'rgba(11,31,58,0.04)',
                  }}
                />
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    background: 'rgba(11,31,58,0.06)',
                    borderRadius: '0.875rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Target size={26} style={{ color: 'var(--navy)' }} />
                </div>
                <div
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--navy)',
                    marginBottom: '0.875rem',
                  }}
                >
                  Our Mission
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 500,
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                    color: 'var(--navy)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;Providing transparent, goal-based financial guidance with integrity and genuine care for client outcomes.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ────────────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-py) 0', background: 'white' }}>
        <div className="container-custom">
          <div
            ref={valuesReveal.ref}
            style={{
              opacity: valuesReveal.visible ? 1 : 0,
              transform: valuesReveal.visible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                Our Principles
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: 'var(--navy)',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                }}
              >
                Core Values
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  maxWidth: 520,
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                These values aren&apos;t just words on a wall — they are the daily commitments that shape every interaction and every recommendation.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {coreValues.map((val, i) => (
                <div
                  key={val.title}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(200,167,93,0.15)',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'default',
                    opacity: valuesReveal.visible ? 1 : 0,
                    transform: valuesReveal.visible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(11,31,58,0.12)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,167,93,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,167,93,0.15)';
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      background: val.bg,
                      borderRadius: '0.875rem',
                      marginBottom: '1.25rem',
                      color: val.color,
                    }}
                  >
                    {val.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'var(--navy)',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Philosophy Timeline ──────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--section-py) 0',
          background: 'var(--bg-light)',
        }}
      >
        <div className="container-custom">
          <div
            ref={philoReveal.ref}
            style={{
              opacity: philoReveal.visible ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                How We Work
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: 'var(--navy)',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                }}
              >
                Investment Philosophy
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  maxWidth: 520,
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Our structured five-step approach ensures every client receives a truly personalized, disciplined, and goal-aligned investment experience.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto' }}>
              {/* Vertical connector line */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 28,
                  top: 32,
                  bottom: 32,
                  width: 2,
                  background: 'linear-gradient(to bottom, var(--gold), var(--navy))',
                  opacity: 0.25,
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {philosophySteps.map((step, i) => (
                  <div
                    key={step.title}
                    style={{
                      display: 'flex',
                      gap: '1.75rem',
                      alignItems: 'flex-start',
                      opacity: philoReveal.visible ? 1 : 0,
                      transform: philoReveal.visible ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                    }}
                  >
                    {/* Step number + icon */}
                    <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: step.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        }}
                      >
                        {step.icon}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: 'var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Work Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.6875rem',
                          color: 'white',
                          border: '2px solid white',
                        }}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        flex: 1,
                        border: '1px solid rgba(200,167,93,0.12)',
                        boxShadow: '0 2px 12px rgba(11,31,58,0.05)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          color: 'var(--navy)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.75,
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
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────────── */}
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
            background: 'radial-gradient(circle, rgba(200,167,93,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1.25rem', borderColor: 'rgba(200,167,93,0.3)', color: 'var(--gold-light)' }}>
            Take The First Step
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
            Begin Your Wealth Journey Today
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
            Schedule a free, no-obligation consultation with Manoj Dhakar and take the first step towards financial clarity and long-term wealth creation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              className="btn-gold"
              style={{ fontSize: '1rem', padding: '0.9375rem 2.25rem' }}
            >
              Schedule Free Consultation
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
                transition: 'background 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Calendar size={18} />
              Call +91-98765-43210
            </a>
          </div>
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: <Shield size={15} />, text: '100% Free Consultation' },
              { icon: <Users size={15} />, text: '2000+ Families Served' },
              { icon: <Award size={15} />, text: 'AMFI Registered' },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
