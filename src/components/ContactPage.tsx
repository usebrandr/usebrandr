import React from 'react';
import BrandrLogo from './BrandrLogo';

type ContactPageProps = {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'contact' | 'admin' | 'privacy' | 'terms' | 'cookies') => void;
};

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-8 py-4 bg-[#1c1c1c]/90 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button onClick={() => onNavigate('landing')}>
            <BrandrLogo size="md" variant="white" />
          </button>
        </div>
        <div className="flex items-center space-x-8">
          <button onClick={() => onNavigate('about')} className="text-[#f5f5f5] hover:text-white transition-colors font-medium text-lg">About Us</button>
          <button onClick={() => onNavigate('faqs')} className="text-[#f5f5f5] hover:text-white transition-colors font-medium text-lg">FAQs</button>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Contact background" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/90 via-[#1c1c1c]/85 to-[#1c1c1c]/90"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to revolutionize your influencer marketing? Let's talk about how Brandr can help your business grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-[#1c1c1c]/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-[#f5f5f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-[#f5f5f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-[#f5f5f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-[#f5f5f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-[#f5f5f5] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your influencer marketing needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#f5f5f5] mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-[#f5f5f5] font-medium">hello@usebrandr.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-[#f5f5f5] font-medium">London, UK</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Response Time</p>
                      <p className="text-[#f5f5f5] font-medium">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1c1c1c]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h4 className="text-lg font-bold text-[#f5f5f5] mb-4">Why Contact Us?</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get a personalized demo of our AI platform</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Discuss your specific marketing goals</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Learn about pricing and packages</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Join our early access program</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12 px-6 lg:px-8 bg-gradient-to-br from-[#1c1c1c] to-[#1c1c1c]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 flex flex-col items-start">
              <BrandrLogo size="lg" variant="white" />
              <p className="text-gray-300 mb-6 max-w-md mt-4">
                AI makes influencer marketing easy. No wasted time, no wrong people. Just results.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f5f5f5] mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => onNavigate('about')} className="hover:text-[#f5f5f5] transition-colors">About</button></li>
                <li><button onClick={() => onNavigate('faqs')} className="hover:text-[#f5f5f5] transition-colors">FAQs</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-[#f5f5f5] transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#f5f5f5] mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-[#f5f5f5] transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="hover:text-[#f5f5f5] transition-colors">Terms of Service</button></li>
                <li><button onClick={() => onNavigate('cookies')} className="hover:text-[#f5f5f5] transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Brandr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage; 