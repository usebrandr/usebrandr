import React from 'react';

type CookiePolicyPageProps = {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'privacy' | 'terms' | 'cookies') => void;
};

const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5] flex flex-col items-center justify-center p-8">
    <div className="max-w-3xl w-full">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4 text-gray-300">Effective Date: July 30, 2025</p>
      <p className="mb-6 text-gray-300">This Cookie Policy explains how Brandr ("we", "us", or "our") uses cookies and similar technologies on our platform.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. What Are Cookies?</h2>
      <p className="mb-4 text-gray-300">Cookies are small text files stored on your device by your browser. They help websites remember your preferences and improve your experience.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Cookies</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li>To remember your login and preferences.</li>
        <li>To analyze site usage and performance.</li>
        <li>To deliver relevant content and marketing.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-300">
        <li><b>Essential Cookies:</b> Necessary for the platform to function.</li>
        <li><b>Analytics Cookies:</b> Help us understand how users interact with our site.</li>
        <li><b>Marketing Cookies:</b> Used to deliver personalized content and ads.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Your Choices</h2>
      <p className="mb-4 text-gray-300">You can control or delete cookies through your browser settings. Disabling cookies may affect your experience on our platform.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Changes to This Policy</h2>
      <p className="mb-4 text-gray-300">We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Contact Us</h2>
      <p className="mb-8 text-gray-300">If you have any questions about our use of cookies, please contact us at <a href="mailto:support@brandr.com" className="text-blue-400 underline">support@brandr.com</a>.</p>
      <button onClick={() => onNavigate('landing')} className="bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">Back to Home</button>
    </div>
  </div>
);

export default CookiePolicyPage; 