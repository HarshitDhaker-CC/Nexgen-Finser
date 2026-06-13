"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Send } from "lucide-react";
import { addLead, type LeadType } from "@/lib/storage";

interface ToastState { message: string; visible: boolean }

function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });
  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3500);
  };
  return { toast, showToast };
}

interface LeadFormCardProps {
  title: string;
  subtitle: string;
  type: LeadType;
  fields: { name: string; label: string; type: string; placeholder: string; required?: boolean; options?: string[] }[];
  accentColor: string;
  onSuccess: (msg: string) => void;
}

function LeadFormCard({ title, subtitle, type, fields, accentColor, onSuccess }: LeadFormCardProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      type,
      name: values.name || "",
      phone: values.phone || "",
      email: values.email,
      message: Object.entries(values)
        .filter(([k]) => !["name", "phone", "email"].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | "),
    });
    setSubmitted(true);
    onSuccess(`✅ Thank you! We'll contact you within 24 hours.`);
    setTimeout(() => { setSubmitted(false); setValues({}); }, 4000);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "1rem",
        border: "1px solid rgba(11,31,58,0.08)",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(11,31,58,0.07)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(11,31,58,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(11,31,58,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >
      <div style={{ height: "4px", background: accentColor }} />
      <div style={{ padding: "2rem" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.375rem" }}>{title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{subtitle}</p>
        {submitted ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0", gap: "0.75rem" }}>
            <CheckCircle2 size={40} style={{ color: "var(--emerald)" }} />
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600, color: "var(--navy)", textAlign: "center" }}>Request submitted! We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {fields.map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.375rem", letterSpacing: "0.02em" }}>{f.label}{f.required && <span style={{ color: "var(--gold)" }}>*</span>}</label>
                {f.type === "select" ? (
                  <select value={values[f.name] || ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} required={f.required} className="input-premium" style={{ cursor: "pointer" }}>
                    <option value="">Select…</option>
                    {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea rows={3} value={values[f.name] || ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} placeholder={f.placeholder} className="input-premium" style={{ resize: "vertical" }} />
                ) : (
                  <input type={f.type} value={values[f.name] || ""} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} placeholder={f.placeholder} required={f.required} className="input-premium" />
                )}
              </div>
            ))}
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem", background: accentColor, color: "white", border: "none", borderRadius: "0.625rem", fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", marginTop: "0.5rem", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <Send size={16} /> Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { toast, showToast } = useToast();

  const contactMethods = [
    { icon: Phone, label: "Call Us", value: "+91-98765-43210", href: "tel:+919876543210", color: "var(--navy)" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91-98765-43210", href: "https://wa.me/919876543210", color: "#25D366" },
    { icon: Mail, label: "Email Us", value: "info@nexgenfinser.com", href: "mailto:info@nexgenfinser.com", color: "var(--gold-dark)" },
  ];

  const [formState, setFormState] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleMainForm = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({ type: "callback", name: formState.name, phone: formState.phone, email: formState.email, message: `Service: ${formState.service}. ${formState.message}` });
    setFormSubmitted(true);
    showToast("✅ Message sent! We'll reach out within 24 hours.");
    setTimeout(() => { setFormSubmitted(false); setFormState({ name: "", phone: "", email: "", service: "", message: "" }); }, 5000);
  };

  return (
    <div style={{ background: "var(--bg-light)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-light) 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(200,167,93,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container-custom" style={{ position: "relative", textAlign: "center" }}>
          <div className="section-label" style={{ color: "var(--gold)", borderColor: "rgba(200,167,93,0.3)", background: "rgba(200,167,93,0.08)", display: "inline-flex", margin: "0 auto 1.25rem" }}>Reach Us</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, color: "white", marginBottom: "1rem", lineHeight: 1.15 }}>
            Get In Touch
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.125rem", color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: "0 auto" }}>
            Schedule your free financial consultation with Manoj Dhakar today.
          </p>
        </div>
      </div>

      {/* Contact Method Cards */}
      <div className="container-custom" style={{ marginTop: "-2rem", marginBottom: "3rem", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
          {contactMethods.map(({ icon: Icon, label, value, href, color }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.75rem 1.5rem", background: "white", borderRadius: "1rem", textDecoration: "none", border: "1px solid rgba(11,31,58,0.07)", boxShadow: "0 4px 20px rgba(11,31,58,0.07)", transition: "all 0.25s ease", textAlign: "center" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(11,31,58,0.14)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(11,31,58,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ width: 52, height: 52, background: `${color}15`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={24} style={{ color }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--navy)" }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Form + Map */}
      <div className="container-custom" style={{ marginBottom: "4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "2rem", alignItems: "start" }}>
          {/* Contact Form */}
          <div style={{ background: "white", borderRadius: "1.25rem", padding: "2.5rem", boxShadow: "0 4px 24px rgba(11,31,58,0.07)", border: "1px solid rgba(11,31,58,0.06)" }}>
            <div style={{ borderLeft: "4px solid var(--gold)", paddingLeft: "1rem", marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.25rem" }}>Send a Message</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--text-secondary)" }}>We typically respond within a few hours</p>
            </div>
            {formSubmitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 0", gap: "1rem" }}>
                <CheckCircle2 size={48} style={{ color: "var(--emerald)" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "var(--navy)", textAlign: "center" }}>Message Received!</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-secondary)", textAlign: "center" }}>Manoj Dhakar will personally review your request and get back to you.</p>
              </div>
            ) : (
              <form onSubmit={handleMainForm} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91-XXXXX-XXXXX", required: true },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.375rem" }}>
                      {f.label} {f.required && <span style={{ color: "var(--gold)" }}>*</span>}
                    </label>
                    <input type={f.type} value={formState[f.key as keyof typeof formState]} onChange={(e) => setFormState((s) => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} required={f.required} className="input-premium" />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Service Interest</label>
                  <select value={formState.service} onChange={(e) => setFormState((s) => ({ ...s, service: e.target.value }))} className="input-premium" style={{ cursor: "pointer" }}>
                    <option value="">Select a service…</option>
                    {["Mutual Fund Investments", "SIP Planning", "Retirement Planning", "Tax Saving (ELSS)", "Child Education Planning", "Goal-Based Planning", "General Inquiry"].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Message</label>
                  <textarea rows={4} value={formState.message} onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} placeholder="Tell us about your financial goals…" className="input-premium" style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: "0.25rem" }}>
                  <Send size={16} /> Send Message
                </button>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                  Your information is secure. Mutual Fund investments are subject to market risks.
                </p>
              </form>
            )}
          </div>

          {/* Right: Info + Map */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Office Info */}
            <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", boxShadow: "0 4px 24px rgba(11,31,58,0.07)", border: "1px solid rgba(11,31,58,0.06)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.5rem", borderBottom: "2px solid rgba(200,167,93,0.2)", paddingBottom: "0.75rem" }}>Office Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: MapPin, label: "Address", value: "123 Finance Square, Kota, Rajasthan 324001" },
                  { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM\nSunday: By Appointment Only" },
                  { icon: Phone, label: "Phone", value: "+91-98765-43210" },
                  { icon: Mail, label: "Email", value: "info@nexgenfinser.com" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, background: "rgba(200,167,93,0.1)", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.125rem" }}>
                      <Icon size={16} style={{ color: "var(--gold-dark)" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{label}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map */}
            <div style={{ borderRadius: "1.25rem", overflow: "hidden", boxShadow: "0 4px 24px rgba(11,31,58,0.07)", border: "1px solid rgba(11,31,58,0.06)", height: "280px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57659.86775048427!2d75.79037895820315!3d25.15151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f86de7dc4f009%3A0xcaaa7a22c7af5c08!2sKota%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Nexgen Finser Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Generation Forms */}
      <div style={{ background: "var(--bg-light)", borderTop: "1px solid rgba(11,31,58,0.07)", padding: "4rem 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label" style={{ display: "inline-flex", margin: "0 auto 1rem" }}>Free Services</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--navy)" }}>Request a Free Consultation</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-secondary)", marginTop: "0.5rem" }}>Choose the service that suits your needs</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <LeadFormCard
              title="Free Callback Request"
              subtitle="We'll call you at your preferred time"
              type="callback"
              accentColor="var(--navy)"
              onSuccess={showToast}
              fields={[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91-XXXXX-XXXXX", required: true },
                { name: "preferred_time", label: "Preferred Call Time", type: "select", placeholder: "", options: ["Morning (9AM–12PM)", "Afternoon (12PM–4PM)", "Evening (4PM–7PM)"] },
                { name: "message", label: "Query (optional)", type: "textarea", placeholder: "What would you like to discuss?" },
              ]}
            />
            <LeadFormCard
              title="Free Portfolio Review"
              subtitle="Get expert analysis of your current investments"
              type="portfolio_review"
              accentColor="var(--gold-dark)"
              onSuccess={showToast}
              fields={[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91-XXXXX-XXXXX", required: true },
                { name: "current_investment", label: "Current Investment Approx.", type: "select", placeholder: "", options: ["< ₹1 Lakh", "₹1–5 Lakh", "₹5–20 Lakh", "₹20–50 Lakh", "> ₹50 Lakh"] },
                { name: "message", label: "Investment Details", type: "textarea", placeholder: "Brief description of your current portfolio" },
              ]}
            />
            <LeadFormCard
              title="Financial Health Check"
              subtitle="Assess your complete financial wellness"
              type="health_check"
              accentColor="var(--emerald)"
              onSuccess={showToast}
              fields={[
                { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91-XXXXX-XXXXX", required: true },
                { name: "age", label: "Age Range", type: "select", placeholder: "", options: ["20–30", "30–40", "40–50", "50–60", "60+"] },
                { name: "income", label: "Annual Income Range", type: "select", placeholder: "", options: ["< ₹5 LPA", "₹5–10 LPA", "₹10–25 LPA", "₹25–50 LPA", "> ₹50 LPA"] },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && <div className="toast">{toast.message}</div>}
    </div>
  );
}
