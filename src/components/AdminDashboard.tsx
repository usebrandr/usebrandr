import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import BrandrLogo from './BrandrLogo';

interface AdminDashboardProps {
  onNavigate: (page: 'landing' | 'about' | 'faqs' | 'contact' | 'privacy' | 'terms' | 'cookies') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [mongodbStatus, setMongodbStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkMongoDBStatus = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        setMongodbStatus('ok');
      } else {
        setMongodbStatus('error');
      }
      setLastChecked(new Date());
    } catch (error) {
      console.error('Failed to check MongoDB status:', error);
      setMongodbStatus('error');
      setLastChecked(new Date());
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkMongoDBStatus();
  }, []);

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

      {/* Admin Dashboard Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-6">Admin Dashboard</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Monitor system status and manage your Brandr application.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* MongoDB Status Card */}
          <div className="bg-[#1c1c1c]/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Database className="w-8 h-8 text-[#3B82F6]" />
                <h3 className="text-2xl font-bold text-[#f5f5f5]">MongoDB Status</h3>
              </div>
              <button
                onClick={checkMongoDBStatus}
                disabled={isChecking}
                className="p-2 text-gray-400 hover:text-[#f5f5f5] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isChecking ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {mongodbStatus === 'loading' && (
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                )}
                {mongodbStatus === 'ok' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {mongodbStatus === 'error' && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-lg font-medium">
                  {mongodbStatus === 'loading' && 'Checking...'}
                  {mongodbStatus === 'ok' && 'MongoDB: Live'}
                  {mongodbStatus === 'error' && 'MongoDB: Offline'}
                </span>
              </div>

              {lastChecked && (
                <p className="text-sm text-gray-400">
                  Last checked: {lastChecked.toLocaleTimeString()}
                </p>
              )}

              <div className="bg-[#1c1c1c]/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Database Info</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Database: waitlist</p>
                  <p>Collection: emails</p>
                  <p>Connection: MongoDB Atlas</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Info Card */}
          <div className="bg-[#1c1c1c]/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-[#f5f5f5] mb-6">System Information</h3>
            
            <div className="space-y-4">
              <div className="bg-[#1c1c1c]/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Application</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Name: Brandr</p>
                  <p>Version: 1.0.0</p>
                  <p>Environment: Production</p>
                </div>
              </div>

              <div className="bg-[#1c1c1c]/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">API Endpoints</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>POST /api/waitlist</p>
                  <p>GET /api/status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1c1c1c]/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-[#f5f5f5] mb-6">Quick Actions</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={checkMongoDBStatus}
              disabled={isChecking}
              className="flex items-center justify-center space-x-2 bg-[#3B82F6] text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isChecking ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
            
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center justify-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
            >
              <span>View Landing Page</span>
            </button>
            
            <button
              onClick={() => window.open('https://cloud.mongodb.com', '_blank')}
              className="flex items-center justify-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
            >
              <Database className="w-5 h-5" />
              <span>MongoDB Atlas</span>
            </button>
          </div>
        </div>
      </div>

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

export default AdminDashboard; 