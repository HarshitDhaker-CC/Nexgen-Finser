"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Shield, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* CTA Band */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-light) 100%)",
          padding: "4rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(200,167,93,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container-custom" style={{ textAlign: "center", position: "relative" }}>
          <div className="section-label" style={{ color: "var(--gold)", borderColor: "rgba(200,167,93,0.3)", background: "rgba(200,167,93,0.08)", margin: "0 auto 1.5rem" }}>
            Begin Your Wealth Journey
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Ready to Transform Your Financial Future?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.0625rem" }}>
            Schedule a free portfolio review with our expert advisors today.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-gold">
              Free Portfolio Review <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.25)",
                borderRadius: "0.625rem",
                textDecoration: "none",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 600,
                fontSize: "0.9375rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ background: "#060f1c", color: "rgba(255,255,255,0.75)", padding: "4rem 0 2rem" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand Column */}
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  color: "white",
                  marginBottom: "0.375rem",
                }}
              >
                Nexgen Finser
              </div>
              <div
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Wealth · Planning · Growth
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: "1.5rem" }}>
                Premium financial advisory firm specialising in mutual fund distribution, SIP planning, and goal-based wealth creation in Kota, Rajasthan.
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {["fb", "in", "yt", "tw"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      width: 36,
                      height: 36,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      textTransform: "uppercase",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(200,167,93,0.15)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,167,93,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                Quick Links
              </h4>
              {[
                { label: "About Nexgen Finser", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Wealth Projection Studio", href: "/tools/wealth-studio" },
                { label: "Knowledge Center", href: "/blog" },
                { label: "Resources & Forms", href: "/resources" },
                { label: "Contact Us", href: "/contact" },
                { label: "Admin Portal", href: "/admin" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "0.3rem 0",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.paddingLeft = "6px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                Services
              </h4>
              {[
                "Mutual Fund Investments",
                "SIP Planning",
                "Retirement Planning",
                "Child Education Planning",
                "Tax Saving (ELSS)",
                "Goal-Based Financial Planning",
                "Wealth Creation Planning",
              ].map((s) => (
                <Link
                  key={s}
                  href="/services"
                  style={{
                    display: "block",
                    padding: "0.3rem 0",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {s}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                Get In Touch
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: MapPin, text: "123 Finance Square, Kota, Rajasthan 324001" },
                  { icon: Phone, text: "+91-98765-43210" },
                  { icon: Mail, text: "info@nexgenfinser.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <Icon size={16} style={{ color: "var(--gold)", marginTop: "0.125rem", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* ARN Badge */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.875rem 1rem",
                  background: "rgba(200,167,93,0.08)",
                  border: "1px solid rgba(200,167,93,0.2)",
                  borderRadius: "0.625rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                  <Shield size={14} style={{ color: "var(--gold)" }} />
                  <span
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    AMFI Registered
                  </span>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)" }}>
                  ARN-XXXXXX
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>
                  SEBI Compliant Distributor
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem" }}>
            {/* Disclaimer */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0.625rem",
                padding: "1rem 1.25rem",
                marginBottom: "1.5rem",
                fontSize: "11px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <strong style={{ color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "0.375rem" }}>Important Disclosure</strong>
              Nexgen Finser is an AMFI Registered Mutual Fund Distributor. ARN: XXXXXX. Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing. Past performance is not indicative of future returns. The information on this website is for educational purposes only and does not constitute investment advice. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Returns shown in the Wealth Projection Studio are illustrative only and are not guaranteed. Nexgen Finser is not a SEBI Registered Investment Advisor.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)" }}>
                © {currentYear} Nexgen Finser. All rights reserved.
              </div>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Resources", href: "/resources" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
