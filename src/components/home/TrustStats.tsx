'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, BarChart3, Award } from 'lucide-react';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function TrustStats() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(15, 1500, triggered);
  const clients = useCountUp(2000, 2000, triggered);
  const sips = useCountUp(5000, 2200, triggered);
  const goals = useCountUp(200, 1800, triggered);

  const stats = [
    { number: years, suffix: '+', label: 'Years of Experience', sublabel: 'Trusted Financial Advisory', icon: <Clock size={28} /> },
    { number: clients, suffix: '+', label: 'Clients Served', sublabel: 'Happy Families & Individuals', icon: <Users size={28} /> },
    { number: sips, suffix: '+', label: 'SIPs Managed', sublabel: 'Systematic Investment Plans', icon: <BarChart3 size={28} /> },
    { number: goals, suffix: '+', label: 'Goals Achieved', sublabel: 'Dreams Turned Into Reality', icon: <Award size={28} /> },
  ];

  return (
    <section ref={sectionRef} id="about-preview" style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-label">Our Track Record</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--navy)', marginTop: '0.5rem' }}>
            Numbers That Tell Our Story
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                borderRadius: '1.25rem',
                background: 'white',
                border: '1px solid rgba(200,167,93,0.12)',
                boxShadow: '0 4px 24px rgba(11,31,58,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))' }} />
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', margin: '0 auto 1.25rem', background: 'rgba(11,31,58,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: 'var(--navy)', lineHeight: 1, marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {stat.number.toLocaleString('en-IN')}{stat.suffix}
              </div>
              <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))', margin: '0.75rem auto', borderRadius: '2px' }} />
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{stat.label}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
