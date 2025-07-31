import React from 'react';

type TermsOfServicePageProps = {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'privacy' | 'terms' | 'cookies') => void;
};

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5] flex flex-col items-center justify-center p-8">
    <div className="max-w-3xl w-full">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-gray-300">Effective Date: July 30, 2025</p>
      <p className="mb-6 text-gray-300">These Terms of Service ("Terms") govern your use of the Brandr platform. By accessing or using our services, you agree to these Terms.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Use of the Platform</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>You must be at least 18 years old to use Brandr.</li>
        <li>You agree to provide accurate and complete information when creating an account.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. User Content</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>You retain ownership of content you submit, but grant Brandr a license to use, display, and distribute it as needed to provide our services.</li>
        <li>You are responsible for the legality and appropriateness of your content.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Prohibited Activities</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>No unlawful, fraudulent, or harmful activity.</li>
        <li>No impersonation, harassment, or abuse of others.</li>
        <li>No interference with the platform or its security.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Termination</h2>
      <p className="mb-4 text-gray-300">We may suspend or terminate your access to Brandr at our discretion, with or without notice, for any violation of these Terms.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Disclaimers</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>Brandr is provided "as is" without warranties of any kind.</li>
        <li>We do not guarantee the accuracy, completeness, or reliability of any content or service.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4 text-gray-300">To the fullest extent permitted by law, Brandr is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Changes to Terms</h2>
      <p className="mb-4 text-gray-300">We may update these Terms from time to time. Continued use of the platform constitutes acceptance of the new Terms.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-8 text-gray-300">If you have any questions about these Terms, please contact us at <a href="mailto:support@brandr.com" className="text-blue-400 underline">support@brandr.com</a>.</p>
      <button onClick={() => onNavigate('landing')} className="bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">Back to Home</button>
    </div>
  </div>
);

export default TermsOfServicePage; 