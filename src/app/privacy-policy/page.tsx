import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Nexgen Finser — how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: 'var(--bg-light)', minHeight: '100vh', padding: '4rem 0' }}>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', color: 'white', padding: '4rem 0', marginBottom: '3rem' }}>
        <div className="container-custom">
          <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem', fontWeight: 600 }}>
            Legal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>Last updated: June 2025</p>
        </div>
      </div>

      <div className="container-custom">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            {[
              {
                title: '1. Information We Collect',
                content: `We collect personal information that you voluntarily provide when you fill out our consultation forms, contact forms, or request a callback. This may include:
• Full name
• Phone number
• Email address
• Investment-related queries and preferences
• Any other information you choose to share

We also collect non-personal data through website analytics (page visits, browser type, etc.) to improve our services.`,
              },
              {
                title: '2. How We Use Your Information',
                content: `The information we collect is used to:
• Contact you regarding your financial planning enquiry
• Provide personalised financial advisory services
• Send relevant information about mutual funds, SIPs, and investment strategies
• Comply with regulatory requirements (AMFI/SEBI)
• Improve our website and services

We will never sell, trade, or rent your personal information to third parties.`,
              },
              {
                title: '3. Data Storage and Security',
                content: `Your information is stored securely. We implement industry-standard security measures to protect your data from unauthorised access, disclosure, alteration, or destruction. 

Calculator inputs entered in the Wealth Projection Studio are stored only in your browser's local storage and are not transmitted to our servers unless you explicitly share your details via a form.`,
              },
              {
                title: '4. Cookies',
                content: `Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device. You can choose to disable cookies through your browser settings, though this may affect certain features of our website.`,
              },
              {
                title: '5. Third-Party Services',
                content: `We may use third-party services such as Google Analytics for website analytics. These services have their own privacy policies. We are not responsible for the privacy practices of these third parties.`,
              },
              {
                title: '6. AMFI/SEBI Regulatory Compliance',
                content: `As an AMFI Registered Mutual Fund Distributor (ARN-XXXXXX), we are required to maintain certain client records as per SEBI and AMFI regulations. Such records are maintained in strict confidence and used only for regulatory compliance purposes.`,
              },
              {
                title: '7. Your Rights',
                content: `You have the right to:
• Request access to the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data (subject to regulatory requirements)
• Opt out of marketing communications at any time

To exercise these rights, please contact us at info@nexgenfinser.com.`,
              },
              {
                title: '8. Children\'s Privacy',
                content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.`,
              },
              {
                title: '9. Changes to This Policy',
                content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically.`,
              },
              {
                title: '10. Contact Us',
                content: `If you have any questions about this Privacy Policy, please contact us:

Nexgen Finser
123 Finance Square, Kota, Rajasthan 324001
Email: info@nexgenfinser.com
Phone: +91-98765-43210`,
              },
            ].map((section) => (
              <div key={section.title} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(200,167,93,0.2)' }}>
                  {section.title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
