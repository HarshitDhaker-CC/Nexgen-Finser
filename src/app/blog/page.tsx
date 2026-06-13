'use client';

import React, { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category =
  | 'All'
  | 'Market Updates'
  | 'Investor Education'
  | 'Financial Planning'
  | 'Tax Saving'
  | 'Retirement Planning';

interface Article {
  id: number;
  category: Exclude<Category, 'All'>;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradientFrom: string;
  gradientTo: string;
  badgeColor: string;
  badgeBg: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  'All',
  'Market Updates',
  'Investor Education',
  'Financial Planning',
  'Tax Saving',
  'Retirement Planning',
];

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Market Updates',
    title: 'Sensex at 75,000: What It Means for Your Mutual Fund Portfolio',
    excerpt:
      'The Sensex crossing the 75,000 milestone is a historic moment for Indian markets. We break down what this rally means for equity mutual fund investors and whether now is the right time to rebalance your portfolio.',
    date: 'June 12, 2025',
    readTime: '5 min read',
    gradientFrom: '#0B1F3A',
    gradientTo: '#1e4080',
    badgeColor: '#3b82f6',
    badgeBg: 'rgba(59,130,246,0.1)',
  },
  {
    id: 2,
    category: 'Investor Education',
    title: 'Power of Compounding: How ₹5,000/month Becomes ₹2 Crore in 30 Years',
    excerpt:
      'Albert Einstein called compound interest the eighth wonder of the world. Discover how a modest monthly SIP of ₹5,000 can snowball into ₹2 crore over three decades with consistent investing and patience.',
    date: 'May 28, 2025',
    readTime: '7 min read',
    gradientFrom: '#0F766E',
    gradientTo: '#14b8a6',
    badgeColor: '#0F766E',
    badgeBg: 'rgba(15,118,110,0.1)',
  },
  {
    id: 3,
    category: 'Tax Saving',
    title: 'ELSS vs PPF vs NPS: The Ultimate Tax Saving Guide for FY 2025-26',
    excerpt:
      'Section 80C allows you to save up to ₹1.5 lakh in taxes annually. But choosing between ELSS, PPF, and NPS can be confusing. Our comprehensive comparison helps you pick the right instrument for your goals.',
    date: 'May 15, 2025',
    readTime: '8 min read',
    gradientFrom: '#C8A75D',
    gradientTo: '#a8873d',
    badgeColor: '#C8A75D',
    badgeBg: 'rgba(200,167,93,0.12)',
  },
  {
    id: 4,
    category: 'Financial Planning',
    title: 'Why SIP Step-Up is the Most Underrated Retirement Strategy',
    excerpt:
      'Most investors set a fixed SIP amount and forget about it. But increasing your SIP by just 10% each year can dramatically accelerate your wealth creation. Here is why the step-up SIP deserves your attention.',
    date: 'April 22, 2025',
    readTime: '6 min read',
    gradientFrom: '#7c3aed',
    gradientTo: '#4c1d95',
    badgeColor: '#7c3aed',
    badgeBg: 'rgba(124,58,237,0.1)',
  },
  {
    id: 5,
    category: 'Retirement Planning',
    title: 'How to Build a ₹3 Crore Retirement Corpus Starting at 30',
    excerpt:
      'Retiring comfortably requires a plan — not a wish. We outline a step-by-step roadmap for a 30-year-old to systematically build a ₹3 crore retirement corpus using SIPs, NPS, and smart asset allocation.',
    date: 'April 8, 2025',
    readTime: '9 min read',
    gradientFrom: '#dc2626',
    gradientTo: '#991b1b',
    badgeColor: '#dc2626',
    badgeBg: 'rgba(220,38,38,0.1)',
  },
  {
    id: 6,
    category: 'Investor Education',
    title: 'Understanding Expense Ratio: The Hidden Cost Eating Your Returns',
    excerpt:
      'A 0.5% difference in expense ratio may seem trivial, but over 20 years it can cost you lakhs of rupees. Learn how expense ratios work, why they matter, and how to pick funds that maximise your net returns.',
    date: 'March 19, 2025',
    readTime: '5 min read',
    gradientFrom: '#0369a1',
    gradientTo: '#075985',
    badgeColor: '#0369a1',
    badgeBg: 'rgba(3,105,161,0.1)',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="blog-card flex flex-col h-full group">
      {/* Thumbnail */}
      <div
        className="relative h-48 flex-shrink-0 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${article.gradientFrom} 0%, ${article.gradientTo} 100%)`,
        }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Category icon area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <CategoryIcon category={article.category} />
          </div>
        </div>
        {/* Read time badge */}
        <div className="absolute top-3 right-3 bg-black/30 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
          {article.readTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + Date row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: article.badgeColor,
              backgroundColor: article.badgeBg,
              fontFamily: 'Work Sans, sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            {article.category}
          </span>
          <span className="text-xs text-gray-400" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-serif text-gray-900 font-semibold mb-2 leading-snug line-clamp-2"
          style={{ fontSize: '1.0625rem' }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {article.excerpt}
        </p>

        {/* Read More */}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold group/link mt-auto"
          style={{
            color: 'var(--navy)',
            fontFamily: 'Work Sans, sans-serif',
          }}
          onClick={(e) => e.preventDefault()}
        >
          Read Article
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function CategoryIcon({ category }: { category: Exclude<Category, 'All'> }) {
  const icons: Record<Exclude<Category, 'All'>, React.ReactElement> = {
    'Market Updates': (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    'Investor Education': (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'Financial Planning': (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'Tax Saving': (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    'Retirement Planning': (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  };
  return icons[category];
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const filtered =
    activeCategory === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || subscribed) return;
    setSubscribing(true);
    // Simulate async operation
    await new Promise((r) => setTimeout(r, 900));
    setSubscribing(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: 'linear-gradient(135deg, #070f1e 0%, #0B1F3A 55%, #132d54 100%)',
        }}
      >
        {/* Background decorations */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #C8A75D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0F766E 0%, transparent 40%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #C8A75D, transparent)', transform: 'translate(30%, -30%)' }}
        />

        <div className="container-custom relative z-10 text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-gold-gradient" style={{ background: 'var(--gold)' }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--gold)', fontFamily: 'Work Sans, sans-serif' }}
            >
              Knowledge Center
            </span>
            <div className="w-8 h-px" style={{ background: 'var(--gold)' }} />
          </div>

          <h1
            className="heading-display text-white mb-4 animate-fadeInUp"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
          >
            Knowledge Center
          </h1>
          <p
            className="text-blue-100/70 max-w-xl mx-auto text-lg animate-fadeInUp delay-200"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Financial insights, market updates, and investment education
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 animate-fadeInUp delay-300">
            {[
              { value: '50+', label: 'Articles Published' },
              { value: '10K+', label: 'Monthly Readers' },
              { value: '5', label: 'Expert Topics' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs mt-0.5" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 800 0 480 30C240 52 80 15 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Category Filter Tabs ─────────────────────────────────────────── */}
      <section className="py-8 bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: 'Work Sans, sans-serif',
                  background: activeCategory === cat ? 'var(--navy)' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                  border: activeCategory === cat ? '2px solid var(--navy)' : '2px solid #e5e7eb',
                  transform: activeCategory === cat ? 'translateY(-1px)' : 'none',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(11,31,58,0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────────── */}
      <section className="section-py bg-gray-50">
        <div className="container-custom">
          {/* Result count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Showing{' '}
              <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'article' : 'articles'}
              {activeCategory !== 'All' && (
                <>
                  {' '}in{' '}
                  <span className="font-semibold" style={{ color: 'var(--navy)' }}>
                    {activeCategory}
                  </span>
                </>
              )}
            </p>
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="text-xs text-gray-400 hover:text-gray-700 underline transition-colors"
                style={{ fontFamily: 'Work Sans, sans-serif' }}
              >
                Clear filter
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-400" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                No articles found in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <div
                  key={article.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter Signup ─────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #132d54 100%)',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--gold), transparent)' }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, var(--gold), transparent)' }}
        />

        <div className="container-custom relative z-10 max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(200,167,93,0.15)', border: '1px solid rgba(200,167,93,0.3)' }}
          >
            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2
            className="heading-section text-white mb-3"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Stay Financially Informed
          </h2>
          <p className="text-blue-100/60 mb-8" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Get our latest articles on mutual funds, SIP strategies, and market updates delivered to your inbox every week.
          </p>

          {subscribed ? (
            <div
              className="py-4 px-6 rounded-xl inline-flex items-center gap-3"
              style={{ background: 'rgba(15,118,110,0.2)', border: '1px solid rgba(15,118,110,0.4)' }}
            >
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-emerald-300 font-medium" style={{ fontFamily: 'Work Sans, sans-serif' }}>
                You&apos;re subscribed! Expect great content soon.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  fontFamily: 'Work Sans, sans-serif',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(200,167,93,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn-gold flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {subscribing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing…
                  </>
                ) : (
                  'Subscribe Free'
                )}
              </button>
            </form>
          )}

          <p className="mt-4 text-blue-100/40 text-xs" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            No spam, ever. Unsubscribe anytime. We respect your privacy and will never share your email.
          </p>
        </div>
      </section>
    </>
  );
}
