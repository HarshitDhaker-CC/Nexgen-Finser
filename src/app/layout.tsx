import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ComplianceBanner from "@/components/layout/ComplianceBanner";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B1F3A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nexgenfinser.com"),
  title: {
    default: "Nexgen Finser | Mutual Fund Distribution & Financial Planning, Kota",
    template: "%s | Nexgen Finser",
  },
  description:
    "Nexgen Finser is a premium AMFI-registered Mutual Fund Distributor and Financial Planning firm based in Kota, Rajasthan. Expert SIP planning, retirement planning, ELSS, and goal-based wealth creation.",
  keywords: [
    "Mutual Fund Distributor Kota",
    "SIP Investment Kota",
    "Financial Planner Rajasthan",
    "Retirement Planning Kota",
    "ELSS Tax Saving Kota",
    "Wealth Management Rajasthan",
    "Nexgen Finser",
    "Manoj Dhakar",
    "AMFI Registered",
  ],
  authors: [{ name: "Nexgen Finser" }],
  creator: "Nexgen Finser",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nexgenfinser.com",
    siteName: "Nexgen Finser",
    title: "Nexgen Finser | Mutual Fund Distribution & Financial Planning",
    description:
      "Transform your income into long-term wealth with expert mutual fund, SIP, and retirement planning. Based in Kota, Rajasthan.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Nexgen Finser" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexgen Finser | Wealth Planning",
    description: "Premium financial advisory — Mutual Funds, SIP, Retirement Planning in Rajasthan.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://nexgenfinser.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum amount to start investing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can start a SIP with as little as ₹500/month. Lumpsum minimum is typically ₹1,000–₹5,000 depending on the fund.",
      },
    },
    {
      "@type": "Question",
      name: "Is my money safe with Nexgen Finser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your money is invested directly in SEBI-regulated mutual funds — the AMC holds your funds, not us. We are AMFI-registered distributors. All investments carry market risk.",
      },
    },
    {
      "@type": "Question",
      name: "How do I track my portfolio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You receive a monthly CAS from CAMS/KFintech. We also provide quarterly review reports via email/WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Do you charge any fee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As an AMFI distributor, we earn trail commissions from AMCs on regular plans. No direct fee is charged to you. Advisory fee (if any) is disclosed upfront.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a free portfolio review?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer complimentary portfolio reviews. Use the form on this page or WhatsApp us directly.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "Nexgen Finser",
              url: "https://nexgenfinser.com",
              logo: "https://nexgenfinser.com/images/logo.png",
              description:
                "AMFI-registered Mutual Fund Distributor and Financial Planning firm in Kota, Rajasthan.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Finance Square",
                addressLocality: "Kota",
                addressRegion: "Rajasthan",
                postalCode: "324001",
                addressCountry: "IN",
              },
              telephone: "+91-98765-43210",
              email: "info@nexgenfinser.com",
              founder: {
                "@type": "Person",
                name: "Manoj Dhakar",
                jobTitle: "Founder & Financial Advisor",
              },
              areaServed: ["Kota", "Rajasthan", "India"],
              serviceType: [
                "Mutual Fund Distribution",
                "SIP Planning",
                "Retirement Planning",
                "ELSS Tax Saving",
                "Wealth Management",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ComplianceBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
