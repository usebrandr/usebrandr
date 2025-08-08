import React from 'react';
import BrandrLogo from './BrandrLogo';
import MouseGlow from './MouseGlow';

interface PrivacyPageProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'terms' | 'privacy' | 'contact') => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-white/80">Last updated: August 2024</p>
        </div>

        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              At Brandr, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              AI-powered influencer marketing platform.
            </p>
            <p className="text-white/80 leading-relaxed">
              By using Brandr, you consent to the data practices described in this policy. If you do not agree with our 
              policies and practices, please do not use our platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>Name, email address, and phone number</li>
                  <li>Business information and company details</li>
                  <li>Social media profiles and handles</li>
                  <li>Payment and billing information</li>
                  <li>Profile pictures and branding materials</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Brand Identity Data</h3>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>Website content and social media posts</li>
                  <li>Brand tone, style, and visual elements</li>
                  <li>Target audience and market positioning</li>
                  <li>Campaign briefs and creative requirements</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  <li>Platform usage patterns and interactions</li>
                  <li>Campaign performance and analytics</li>
                  <li>Communication logs and support tickets</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
              We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Provide and maintain our AI-powered matching services</li>
                <li>Analyze brand identity and match with appropriate creators</li>
                <li>Process payments and manage financial transactions</li>
                <li>Send important updates and notifications</li>
                <li>Improve our platform and develop new features</li>
                <li>Provide customer support and resolve issues</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations and regulations</li>
              </ul>
            </div>
          </section>

          {/* AI and Data Processing */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. AI and Data Processing</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
                Our AI systems process your data to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Analyze your brand's tone, style, and values</li>
                <li>Match you with creators who align with your brand</li>
                <li>Optimize campaign performance and recommendations</li>
                <li>Improve our matching algorithms over time</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                All AI processing is done securely and in accordance with data protection regulations. 
                We do not use your data for purposes unrelated to our services.
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li><strong>With other users:</strong> Basic profile information is shared between brands and creators for matching purposes</li>
                <li><strong>Service providers:</strong> Third-party vendors who help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With your consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee 
                absolute security, but we are committed to protecting your data to the best of our ability.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
            <p className="text-white/80 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and 
              fulfill the purposes outlined in this policy. When you delete your account, we will delete 
              or anonymize your personal data within 30 days, except where we are required to retain 
              certain information for legal, regulatory, or legitimate business purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where applicable</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                To exercise these rights, please contact us at info@usebrandr.com. We will respond to 
                your request within 30 days.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences. However, disabling 
                certain cookies may affect platform functionality.
              </p>
            </div>
          </section>

          {/* International Transfers */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
            <p className="text-white/80 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure that such transfers comply with applicable data protection laws and implement 
              appropriate safeguards to protect your data.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
            <p className="text-white/80 leading-relaxed">
              Our platform is not intended for children under 16 years of age. We do not knowingly 
              collect personal information from children under 16. If you believe we have collected 
              information from a child under 16, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Policy</h2>
            <p className="text-white/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new policy on our platform and updating the "Last updated" date. 
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at info@usebrandr.com:
            </p>
            <div className="space-y-2 text-white/80">
              <p>Email: privacy@brandr.com</p>
              <p>Data Protection Officer: dpo@brandr.com</p>
              <p>Address: [Your Business Address]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
