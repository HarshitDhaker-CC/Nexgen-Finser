"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useScroll, useSpring, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Tools",
    href: "/tools/wealth-studio",
    children: [
      { label: "Wealth Projection Studio", href: "/tools/wealth-studio", desc: "Complete financial life projection" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("/");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  // Track active section
  useEffect(() => {
    const sectionIds = ["hero", "about-preview", "services", "tools-preview", "faq", "contact-cta"];
    const hrefs = ["/", "/about", "/services", "/tools/wealth-studio", "/#faq", "/contact"];
    const observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveSection(hrefs[idx]);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.observe(el);
    });
    return () => observerRef.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(200,167,93,0.15)" : "1px solid transparent",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: scrolled ? "0 4px 24px rgba(11,31,58,0.08)" : "none",
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))",
            transformOrigin: "0%",
            scaleX,
            zIndex: 110,
          }}
        />
        <div className="container-custom">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "72px",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              <div style={{ position: "relative", width: 40, height: 40 }}>
                <Image src="/images/logo.png" alt="Nexgen Finser" fill sizes="40px" style={{ objectFit: "contain" }} priority />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    color: "var(--navy)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Nexgen Finser
                </div>
                <div
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold-dark)",
                    fontWeight: 600,
                  }}
                >
                  Wealth · Planning · Growth
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              className="hidden lg:flex"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.5rem 0.875rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.9375rem",
                        color: activeDropdown === link.label ? "var(--navy)" : "var(--text-secondary)",
                        transition: "color 0.2s",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        style={{
                          transform: activeDropdown === link.label ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    {activeDropdown === link.label && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "white",
                          border: "1px solid rgba(200,167,93,0.2)",
                          borderRadius: "0.875rem",
                          padding: "0.5rem",
                          boxShadow: "0 16px 48px rgba(11,31,58,0.14)",
                          minWidth: "240px",
                          animation: "fadeInDown 0.2s ease-out",
                        }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              display: "block",
                              padding: "0.75rem 1rem",
                              borderRadius: "0.625rem",
                              textDecoration: "none",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(200,167,93,0.06)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontWeight: 600,
                                fontSize: "0.9375rem",
                                color: "var(--navy)",
                              }}
                            >
                              {child.label}
                            </div>
                            {child.desc && (
                              <div
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: "0.75rem",
                                  color: "var(--text-secondary)",
                                  marginTop: "0.125rem",
                                }}
                              >
                                {child.desc}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      padding: "0.5rem 0.875rem",
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: activeSection === link.href ? 600 : 500,
                      fontSize: "0.9375rem",
                      color: activeSection === link.href ? "var(--gold-dark)" : "var(--text-secondary)",
                      textDecoration: "none",
                      borderRadius: "0.5rem",
                      transition: "color 0.2s, background 0.2s",
                      borderBottom: activeSection === link.href ? "2px solid var(--gold)" : "2px solid transparent",
                      paddingBottom: "calc(0.5rem - 2px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--navy)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(11,31,58,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = activeSection === link.href ? "var(--gold-dark)" : "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <a
                href="tel:+919876543210"
                className="hidden lg:flex"
                style={{
                  alignItems: "center",
                  gap: "0.375rem",
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--navy)",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} />
                +91-98765-43210
              </a>
              <Link
                href="/contact"
                className="btn-primary hidden lg:inline-flex"
                style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}
              >
                Free Consultation
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
                style={{
                  background: "none",
                  border: "1px solid rgba(11,31,58,0.15)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  color: "var(--navy)",
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(11,31,58,0.5)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 90vw)",
              background: "white",
              padding: "1.5rem",
              overflowY: "auto",
              animation: "fadeInRight 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  color: "var(--navy)",
                }}
              >
                Nexgen Finser
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--navy)" }}
              >
                <X size={24} />
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.children ? link.children[0].href : link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.875rem 1rem",
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "1.0625rem",
                    color: "var(--navy)",
                    textDecoration: "none",
                    borderRadius: "0.625rem",
                    borderBottom: "1px solid rgba(11,31,58,0.06)",
                  }}
                >
                  {link.label}
                  {link.children && (
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.6875rem",
                        letterSpacing: "0.08em",
                        fontWeight: 700,
                        color: "var(--gold-dark)",
                        textTransform: "uppercase",
                        background: "rgba(200,167,93,0.12)",
                        padding: "0.125rem 0.375rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      New
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{ justifyContent: "center" }}>
                Free Consultation
              </Link>
              <a
                href="tel:+919876543210"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.875rem",
                  border: "1.5px solid var(--navy)",
                  borderRadius: "0.625rem",
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 600,
                  color: "var(--navy)",
                  textDecoration: "none",
                }}
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "rgba(11,31,58,0.04)",
                borderRadius: "0.75rem",
                fontSize: "0.6875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              AMFI Reg. ARN-XXXXXX · Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
