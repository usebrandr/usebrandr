import React from 'react';

type PrivacyPolicyPageProps = {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'privacy' | 'terms' | 'cookies') => void;
};

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5] flex flex-col items-center justify-center p-8">
    <div className="max-w-3xl w-full">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-300">Effective Date: July 30, 2025</p>
      <p className="mb-6 text-gray-300">Brandr ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li><b>Personal Information:</b> Name, email address, social media handles, and other information you provide when registering or using our services.</li>
        <li><b>Usage Data:</b> Information about how you use our platform, including log data, device information, and cookies.</li>
        <li><b>Communications:</b> Any messages or feedback you send to us.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>To provide, operate, and maintain our platform.</li>
        <li>To communicate with you, including sending updates and marketing materials.</li>
        <li>To improve our services and develop new features.</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>We do not sell your personal information.</li>
        <li>We may share information with service providers who help us operate our platform.</li>
        <li>We may disclose information if required by law or to protect our rights and safety.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Cookies and Tracking Technologies</h2>
      <p className="mb-4 text-gray-300">We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>You may access, update, or delete your personal information by contacting us.</li>
        <li>You may opt out of marketing communications at any time.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Data Security</h2>
      <p className="mb-4 text-gray-300">We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4 text-gray-300">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-8 text-gray-300">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@brandr.com" className="text-blue-400 underline">support@brandr.com</a>.</p>
      <button onClick={() => onNavigate('landing')} className="bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">Back to Home</button>
    </div>
  </div>
);

export default PrivacyPolicyPage; 