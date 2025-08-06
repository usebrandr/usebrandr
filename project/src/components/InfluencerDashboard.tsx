import React, { useState } from 'react';
import { 
  MessageSquare,
  Menu,
  DollarSign, 
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  LogOut,
  User,
  Settings,
  Mail,
  Eye,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Timer,
  ArrowLeft,
  Instagram,
  Camera,
  Edit3,
  Bell,
  Shield,
  CreditCard,
  Send
} from 'lucide-react';
import BrandrLogo from './BrandrLogo';

interface InfluencerDashboardProps {
  onLogout: () => void;
}

const InfluencerDashboard: React.FC<InfluencerDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('invites');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const campaignInvites = [
    {
      id: 1,
      brandName: 'TechFlow',
      brandLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      campaignTitle: 'SaaS Product Launch Campaign',
      purpose: 'Help us launch our new productivity tool to creative professionals with authentic reviews and tutorials.',
      summary: 'We\'re looking for creators to showcase our new productivity app through authentic content that demonstrates real-world usage and benefits.',
      timeLeft: '2 days, 14 hours',
      expiresAt: new Date('2024-02-15T23:59:59'),
      compensation: '$2,500 - $5,000',
      objectives: [
        'Increase brand awareness among creative professionals',
        'Drive sign-ups for our free trial',
        'Generate authentic user-generated content'
      ],
      deliverables: [
        '2 Instagram posts with product showcase',
        '1 Instagram Story series (3-5 slides)',
        '1 YouTube tutorial video (5-10 minutes)',
        'Honest review highlighting key features'
      ],
      execution: 'We want authentic, genuine content that shows how our tool fits into your creative workflow. Please focus on the time-saving benefits and ease of use. Creative freedom is encouraged - we trust your expertise in connecting with your audience.',
      keyDates: [
        { date: '2024-02-20', event: 'Content creation deadline' },
        { date: '2024-02-22', event: 'Content review and approval' },
        { date: '2024-02-25', event: 'Content goes live' }
      ]
    },
    {
      id: 2,
      brandName: 'GreenLife',
      brandLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      campaignTitle: 'Sustainable Fashion Collaboration',
      purpose: 'Partner with us to showcase our eco-friendly clothing line with creative freedom for authentic storytelling.',
      summary: 'We\'re seeking influencers who are passionate about sustainability to feature our eco-conscious fashion pieces in their content.',
      timeLeft: '5 days, 8 hours',
      expiresAt: new Date('2024-02-18T23:59:59'),
      compensation: '$1,500 - $3,000',
      objectives: [
        'Promote sustainable fashion choices',
        'Showcase our eco-friendly materials',
        'Drive traffic to our online store'
      ],
      deliverables: [
        '3 Instagram posts featuring different outfits',
        '2 Instagram Story highlights',
        '1 TikTok styling video',
        'Authentic testimonial about fabric quality'
      ],
      execution: 'We love authentic storytelling about sustainability. Share your personal journey with eco-conscious fashion and how our pieces fit into your lifestyle. Focus on versatility and quality over fast fashion trends.',
      keyDates: [
        { date: '2024-02-25', event: 'Content creation deadline' },
        { date: '2024-02-27', event: 'Content review' },
        { date: '2024-03-01', event: 'Campaign launch' }
      ]
    },
    {
      id: 3,
      brandName: 'FitnessPro',
      brandLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      campaignTitle: 'Fitness App Beta Testing',
      purpose: 'Be among the first to try our revolutionary fitness tracking app and share your genuine experience.',
      summary: 'We\'re looking for fitness enthusiasts to test our new app and create authentic content about their experience.',
      timeLeft: '12 hours',
      expiresAt: new Date('2024-02-12T23:59:59'),
      compensation: '$800 - $1,500',
      objectives: [
        'Generate buzz for our app launch',
        'Collect user feedback and testimonials',
        'Drive pre-launch sign-ups'
      ],
      deliverables: [
        '1 Instagram post with app screenshots',
        '1 Instagram Story series showing app usage',
        '1 TikTok video demonstrating key features',
        'Written testimonial for marketing materials'
      ],
      execution: 'We want honest feedback about your experience using the app. Show the interface, highlight features you love, and share any suggestions. Your authentic voice is what makes this valuable to your audience.',
      keyDates: [
        { date: '2024-02-15', event: 'Beta access provided' },
        { date: '2024-02-20', event: 'Content creation deadline' },
        { date: '2024-02-22', event: 'Content goes live' }
      ]
    }
  ];

  const activeCampaigns = [
    {
      id: 4,
      brandName: 'StyleCo',
      campaignTitle: 'Summer Collection Launch',
      status: 'In Progress',
      deadline: '2024-02-28',
      compensation: '$3,200',
      progress: 75
    },
    {
      id: 5,
      brandName: 'TechGear',
      campaignTitle: 'Gadget Review Series',
      status: 'Completed',
      deadline: '2024-01-15',
      compensation: '$2,800',
      progress: 100
    }
  ];

  const messageThreads = [
    {
      id: 1,
      brandName: 'TechFlow',
      lastMessage: 'Thanks for accepting! Here are the campaign details...',
      timestamp: '2 hours ago',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'TechFlow',
          message: 'Hi! We\'d love to work with you on our upcoming campaign.',
          timestamp: '2 days ago',
          isFromBrand: true
        },
        {
          id: 2,
          sender: 'You',
          message: 'Thanks for reaching out! I\'m interested in learning more.',
          timestamp: '2 days ago',
          isFromBrand: false
        },
        {
          id: 3,
          sender: 'TechFlow',
          message: 'Thanks for accepting! Here are the campaign details...',
          timestamp: '2 hours ago',
          isFromBrand: true
        }
      ]
    },
    {
      id: 2,
      brandName: 'GreenLife',
      lastMessage: 'We love your content style! Would you be interested in...',
      timestamp: '1 day ago',
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'GreenLife',
          message: 'We love your content style! Would you be interested in collaborating?',
          timestamp: '1 day ago',
          isFromBrand: true
        }
      ]
    }
  ];

  const earnings = [
    {
      id: 1,
      brandName: 'TechGear',
      amount: '$2,800',
      date: '2024-01-20',
      status: 'Paid'
    },
    {
      id: 2,
      brandName: 'FashionForward',
      amount: '$1,950',
      date: '2024-01-15',
      status: 'Paid'
    },
    {
      id: 3,
      brandName: 'HealthyEats',
      amount: '$1,200',
      date: '2024-01-10',
      status: 'Paid'
    }
  ];

  // Sort invites by expiration time (soonest first)
  const sortedInvites = [...campaignInvites].sort((a, b) => 
    a.expiresAt.getTime() - b.expiresAt.getTime()
  );

  const getTimeLeftColor = (timeLeft: string) => {
    if (timeLeft.includes('hour') && !timeLeft.includes('day')) {
      return 'text-red-400';
    } else if (timeLeft.includes('1 day') || timeLeft.includes('2 day')) {
      return 'text-yellow-400';
    }
    return 'text-[#f5f5f5]/70';
  };

  const sidebarItems = [
    { id: 'invites', label: 'Campaign Invites', icon: Mail },
    { id: 'campaigns', label: 'Campaigns', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const openCampaignDetails = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  const closeCampaignModal = () => {
    setShowCampaignModal(false);
    setSelectedCampaign(null);
  };

  const openChatModal = (thread: any) => {
    setSelectedThread(thread);
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
    setSelectedThread(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 shadow-sm border-r border-gray-700 transition-all duration-300`}>
        <div className="p-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors mb-4"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-5'}`}>
            {sidebarCollapsed ? (
              <BrandrLogo size="md" />
            ) : (
              <BrandrLogo size="lg" />
            )}
          </div>
        </div>
        
        <nav className="px-4 pb-4">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-xl mb-1 transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors`}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === 'invites' && 'Campaign Invites'}
                {activeTab === 'campaigns' && 'Campaigns'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'earnings' && 'Earnings'}
                {activeTab === 'profile' && 'Profile'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === 'invites' && 'Brands that want to work with you'}
                {activeTab === 'campaigns' && 'Your active and completed campaigns'}
                {activeTab === 'messages' && 'Communicate with brands'}
                {activeTab === 'earnings' && 'Track your income and payments'}
                {activeTab === 'profile' && 'Manage your creator profile'}
                {activeTab === 'settings' && 'Account and notification preferences'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'invites' && (
            <div className="space-y-6">
              {/* Campaign Invites */}
              <div className="space-y-6">
                {sortedInvites.map((invite) => (
                  <div 
                    key={invite.id} 
                    className="bg-white rounded-2xl border border-blue-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    onClick={() => openCampaignDetails(invite)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={invite.brandLogo}
                          alt={invite.brandName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{invite.campaignTitle}</h3>
                          <p className="text-gray-600">{invite.brandName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Timer className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm font-medium ${getTimeLeftColor(invite.timeLeft)}`}>
                            {invite.timeLeft}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{invite.purpose}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{invite.compensation}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button 
                          className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept</span>
                        </button>
                        <button 
                          className="px-4 py-2 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <X className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 font-medium transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>Click to view details</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="grid gap-6">
                {activeCampaigns.map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="bg-white rounded-2xl border border-blue-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    onClick={() => openCampaignDetails(campaign)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.campaignTitle}</h3>
                        <p className="text-gray-600">{campaign.brandName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        campaign.status === 'In Progress' 
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Deadline</p>
                        <p className="text-sm font-medium text-gray-900">{campaign.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Compensation</p>
                        <p className="text-sm font-medium text-gray-900">{campaign.compensation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <p className="text-sm font-medium text-gray-900">{campaign.progress}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              {messageThreads.length > 0 ? (
                messageThreads.map((thread) => (
                  <div 
                    key={thread.id} 
                    className="bg-white rounded-2xl border border-blue-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    onClick={() => openChatModal(thread)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{thread.brandName}</h3>
                          <p className="text-gray-600">{thread.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{thread.timestamp}</p>
                        {thread.unread && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-blue-200 p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">You have no messages yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
                <div className="space-y-4">
                  {earnings.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{payment.brandName}</p>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{payment.amount}</p>
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                      <Camera className="w-8 h-8 text-blue-400" />
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                      Upload Photo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue="@creativecreator"
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="creator@example.com"
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                      <select className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Lifestyle</option>
                        <option>Fashion</option>
                        <option>Technology</option>
                        <option>Fitness</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Follower Count</label>
                      <input
                        type="text"
                        defaultValue="25,000"
                        className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Creative content creator passionate about lifestyle and technology. I love sharing authentic experiences with my audience."
                      className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Connected Platforms</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <Instagram className="w-6 h-6 text-gray-900" />
                          <span className="text-gray-900">Instagram</span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Email notifications</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Campaign invites</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Payment notifications</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Privacy</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Profile visibility</span>
                        <select className="px-3 py-1 bg-white border border-blue-200 rounded-lg text-gray-900">
                          <option>Public</option>
                          <option>Private</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Payment Settings</span>
                    </h4>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">
                      Manage Payment Methods
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Details Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-200">
            <div className="sticky top-0 bg-white border-b border-blue-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCampaign.brandLogo}
                  alt={selectedCampaign.brandName}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCampaign.campaignTitle}</h2>
                  <p className="text-gray-600">{selectedCampaign.brandName}</p>
                </div>
              </div>
              <button
                onClick={closeCampaignModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedCampaign.purpose && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Campaign Purpose</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedCampaign.purpose}</p>
                </div>
              )}

              {selectedCampaign.objectives && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Campaign Objectives</h3>
                  <ul className="space-y-2">
                    {selectedCampaign.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCampaign.deliverables && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Deliverables</h3>
                  <ul className="space-y-2">
                    {selectedCampaign.deliverables.map((deliverable: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCampaign.compensation && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Compensation</h3>
                  <p className="text-gray-700 text-xl font-medium">{selectedCampaign.compensation}</p>
                </div>
              )}

              {selectedCampaign.execution && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How We Want It Executed</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedCampaign.execution}</p>
                </div>
              )}

              {selectedCampaign.keyDates && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Dates</h3>
                  <div className="space-y-2">
                    {selectedCampaign.keyDates.map((dateItem: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3 text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="font-medium">{dateItem.date}</span>
                        <span>-</span>
                        <span>{dateItem.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedCampaign.timeLeft && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center space-x-2">
                    <Timer className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-700">
                      {selectedCampaign.timeLeft} remaining to respond
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 pt-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Accept Campaign</span>
                </button>
                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <X className="w-5 h-5" />
                  <span>Decline</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedThread && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-blue-200 flex flex-col">
            <div className="bg-white border-b border-blue-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedThread.brandName}</h2>
                  <p className="text-gray-600 text-sm">Conversation</p>
                </div>
              </div>
              <button
                onClick={closeChatModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedThread.messages.map((message: any) => (
                <div key={message.id} className={`flex ${message.isFromBrand ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isFromBrand 
                      ? 'bg-gray-100 text-gray-900 border border-gray-200' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isFromBrand ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-blue-200 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white border border-blue-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                />
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerDashboard;