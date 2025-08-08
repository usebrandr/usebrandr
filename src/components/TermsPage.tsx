import React from 'react';
import BrandrLogo from './BrandrLogo';
import MouseGlow from './MouseGlow';

interface TermsPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mouse Glow Effect */}
      <MouseGlow />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 bg-transparent border-b border-white/20">
        <div className="flex items-center space-x-4">
          <BrandrLogo size="lg" />
        </div>
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('landing')} className="text-white/80 hover:text-white transition-colors font-medium text-lg">Home</button>
          <button onClick={() => onNavigate('about')} className="text-white/80 hover:text-white transition-colors font-medium text-lg">About Us</button>
          <button onClick={() => onNavigate('faqs')} className="text-white/80 hover:text-white transition-colors font-medium text-lg">FAQs</button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-xl text-white/80">Last updated: August 2024</p>
        </div>

        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Welcome to Brandr. These Terms of Service ("Terms") govern your use of our AI-powered influencer marketing platform. 
              By accessing or using Brandr, you agree to be bound by these Terms.
            </p>
            <p className="text-white/80 leading-relaxed">
              Brandr is an AI-powered platform that automates influencer marketing end-to-end, connecting brands with creators 
              who match their brand identity, tone, and values.
            </p>
          </section>

          {/* Definitions */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Definitions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">"Platform"</h3>
                <p className="text-white/80">Refers to the Brandr website, mobile applications, and services.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">"Brand"</h3>
                <p className="text-white/80">Any business, company, or individual using our platform to find creators.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">"Creator"</h3>
                <p className="text-white/80">Any individual using our platform to offer content creation services.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">"Campaign"</h3>
                <p className="text-white/80">A marketing initiative created by a brand to promote their products or services.</p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Services</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                Brandr provides the following services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>AI-powered brand identity analysis</li>
                <li>Creator matching and vetting</li>
                <li>Campaign management and tracking</li>
                <li>Payment processing and escrow services</li>
                <li>Performance analytics and reporting</li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. User Accounts</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                To use our services, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </div>
          </section>

          {/* Fees and Payments */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Fees and Payments</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                Our fee structure is as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>5% fee on each campaign (applied to both brand and creator sides)</li>
                <li>£20/month subscription for brands after their first campaign</li>
                <li>£499/month enterprise tier (coming soon)</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>
            </div>
          </section>

          {/* Content and Intellectual Property */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Content and Intellectual Property</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                Users retain ownership of their content. However, by using our platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>You grant us a license to use your content for platform operations</li>
                <li>You represent that you have the rights to share the content</li>
                <li>You agree not to upload infringing or illegal content</li>
                <li>We may remove content that violates our policies</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Prohibited Activities</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Use the platform for illegal or unauthorized purposes</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access the platform</li>
              </ul>
            </div>
          </section>

          {/* Privacy and Data */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Privacy and Data</h2>
            <p className="text-white/80 leading-relaxed">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. 
              By using our platform, you consent to our collection and use of data as described in our Privacy Policy.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-white/80 leading-relaxed">
              To the maximum extent permitted by law, Brandr shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, data, or use.
            </p>
          </section>

          {/* Termination */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p className="text-white/80 leading-relaxed">
              We may terminate or suspend your account at any time for violations of these Terms. You may also terminate 
              your account at any time by contacting our support team.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-white/80 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email 
              or through the platform. Continued use of the platform after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
            <p className="text-white/80 leading-relaxed">
              If you have any questions about these Terms, please contact us at info@usebrandr.com:
            </p>
            <div className="mt-4 space-y-2 text-white/80">
              <p>Email: legal@brandr.com</p>
              <p>Address: [Your Business Address]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
