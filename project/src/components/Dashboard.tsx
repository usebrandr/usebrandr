import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp,
  Menu,
  Users, 
  MessageSquare, 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  DollarSign,
  Eye,
  LogOut,
  Calendar,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit3,
  Send,
  X,
  ChevronRight,
  ChevronLeft,
  Upload,
  CreditCard,
  Bell,
  Shield,
  Building,
  Mail,
  Phone,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Download,
  FileText,
  UserPlus,
  BarChart3,
  Settings
} from 'lucide-react';
import ChatbotCampaignModal, { ChatMessage } from './ChatbotCampaignModal';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [createCampaignStep, setCreateCampaignStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const [showInfluencerModal, setShowInfluencerModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: '',
    budget: 5000,
    deliverables: '',
    duration: '',
    platforms: [] as string[],
    category: '',
    followerRange: '',
    description: ''
  });

  const campaigns = [
    {
      id: 1,
      name: 'Summer Product Launch',
      status: 'Live',
      influencers: 12,
      budget: 5000,
      spent: 2340,
      impressions: 45600,
      clicks: 1230,
      conversions: 23,
      engagement: '3.2%',
      createdAt: '2024-01-15',
      matchedInfluencers: 8,
      pendingResponses: 4
    },
    {
      id: 2,
      name: 'Brand Awareness Q1',
      status: 'Draft',
      influencers: 0,
      budget: 8000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      engagement: '0%',
      createdAt: '2024-01-20',
      matchedInfluencers: 0,
      pendingResponses: 0
    },
    {
      id: 3,
      name: 'Holiday Season Push',
      status: 'Completed',
      influencers: 8,
      budget: 12000,
      spent: 11200,
      impressions: 78900,
      clicks: 2340,
      conversions: 67,
      engagement: '4.1%',
      createdAt: '2024-01-10',
      matchedInfluencers: 8,
      pendingResponses: 0
    }
  ];

  const influencers = [
    {
      id: 1,
      name: '@lifestyle_sarah',
      platform: 'Instagram',
      followers: '45.2K',
      category: 'Lifestyle',
      matchPercentage: 94,
      status: 'Accepted',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      engagementRate: '4.2%',
      avgViews: '12.5K',
      bio: 'Lifestyle content creator passionate about sustainable living and wellness.'
    },
    {
      id: 2,
      name: '@tech_reviewer',
      platform: 'YouTube',
      followers: '128K',
      category: 'Technology',
      matchPercentage: 89,
      status: 'Invited',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      engagementRate: '6.8%',
      avgViews: '45K',
      bio: 'Tech enthusiast reviewing the latest gadgets and software.'
    },
    {
      id: 3,
      name: '@fitness_mike',
      platform: 'TikTok',
      followers: '67.8K',
      category: 'Fitness',
      matchPercentage: 76,
      status: 'Declined',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      engagementRate: '8.1%',
      avgViews: '28K',
      bio: 'Fitness coach helping people achieve their health goals.'
    }
  ];

  const messageThreads = [
    {
      id: 1,
      creatorName: '@lifestyle_sarah',
      lastMessage: 'Thanks for the campaign details! I\'m excited to work with you.',
      timestamp: '2 hours ago',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'You',
          message: 'Hi Sarah! We\'d love to work with you on our upcoming campaign.',
          timestamp: '2 days ago',
          isFromBrand: true
        },
        {
          id: 2,
          sender: '@lifestyle_sarah',
          message: 'Thanks for reaching out! I\'m interested in learning more.',
          timestamp: '2 days ago',
          isFromBrand: false
        },
        {
          id: 3,
          sender: '@lifestyle_sarah',
          message: 'Thanks for the campaign details! I\'m excited to work with you.',
          timestamp: '2 hours ago',
          isFromBrand: false
        }
      ]
    },
    {
      id: 2,
      creatorName: '@tech_reviewer',
      lastMessage: 'I have a few questions about the deliverables...',
      timestamp: '1 day ago',
      unread: false,
      messages: [
        {
          id: 1,
          sender: '@tech_reviewer',
          message: 'I have a few questions about the deliverables...',
          timestamp: '1 day ago',
          isFromBrand: false
        }
      ]
    }
  ];

  const invoices = [
    {
      id: 1,
      campaign: 'Summer Product Launch',
      amount: '$2,340',
      date: '2024-01-20',
      status: 'Paid',
      invoice: 'INV-001'
    },
    {
      id: 2,
      campaign: 'Holiday Season Push',
      amount: '$11,200',
      date: '2024-01-15',
      status: 'Paid',
      invoice: 'INV-002'
    },
    {
      id: 3,
      campaign: 'Brand Awareness Q1',
      amount: '$1,500',
      date: '2024-02-01',
      status: 'Pending',
      invoice: 'INV-003'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Invited': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Declined': return 'bg-red-100 text-red-700 border-red-200';
      case 'Paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'influencers', label: 'Influencers', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: Building },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Add fetchOpenAI helper
  async function fetchOpenAI(messages: { role: string; content: string }[]) {
    const res = await fetch('http://localhost:3001/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [campaignAnswers, setCampaignAnswers] = useState<Record<string, string>>({});
  const [chatStep, setChatStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Add a placeholder for businessMeta (in a real app, this would come from user profile or context)
  const [businessMeta] = useState({
    businessType: 'SaaS',
    industry: 'Technology',
    targetAudience: '25-34, US, productivity professionals',
    adBudget: '$10,000/month',
    influencerExperience: 'Some experience with micro-influencers',
  });

  const campaignQuestions = [
    {
      key: 'goal',
      prompt: "What's the main goal of this campaign? (e.g., sales, awareness, traffic)"
    },
    {
      key: 'creators',
      prompt: "What kind of creators do you picture running this? (e.g., fitness, fashion, tech)"
    },
    {
      key: 'platforms',
      prompt: "Which platform(s) should they post on? (e.g., TikTok, Instagram, YouTube)"
    },
    {
      key: 'audience',
      prompt: "Who are you hoping to reach? Describe your ideal audience."
    },
    {
      key: 'budget',
      prompt: "What budget do you have in mind for this campaign?"
    },
    {
      key: 'dates',
      prompt: "When do you want the campaign to start and finish?"
    },
    {
      key: 'guidelines',
      prompt: "Do you have any brand guidelines or specific messaging you want the creators to follow?"
    }
  ];

  const startChatbot = () => {
    setShowChatbotModal(true);
    setChatMessages([
      { id: 'welcome', sender: 'bot', text: campaignQuestions[0].prompt }
    ]);
    setChatInput('');
    setChatStep(0);
    setCampaignAnswers({});
    setShowSummary(false);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, sender: 'user', text: chatInput };
    setChatMessages((msgs) => [...msgs, userMsg]);
    setCampaignAnswers((prev) => ({ ...prev, [campaignQuestions[chatStep].key]: chatInput }));
    setChatInput('');
    setChatLoading(true);

    // Build OpenAI chat history
    const systemPrompt = `You are an AI influencer marketing strategist. Guide the business through creating a campaign using short, easy-to-read chat messages. Only suggest context or options if it helps, but never force it. Never mention their monthly budget. Ask one question at a time, and if an answer is vague, ask a brief clarifying follow-up. Use any onboarding data (like industry or experience) only as gentle context for your questions. When all questions are answered, simply say 'Click Finish' (or similar) and let the app handle the summary and metrics. Do not mention that you will provide a summary or expected metrics. Never ask two questions in a single message.`;
    const history = [
      { role: 'system', content: systemPrompt },
      ...chatMessages.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })),
      { role: 'user', content: chatInput }
    ];

    // Get AI response
    const aiResponse = await fetchOpenAI(history);
    setChatMessages((msgs) => [...msgs, { id: `bot-${Date.now()}`, sender: 'bot', text: aiResponse }]);
    setChatLoading(false);
    if (chatInputRef.current) chatInputRef.current.focus();

    // When all campaign questions have been answered, show the summary popup
    if (chatStep + 1 >= campaignQuestions.length) {
      setTimeout(() => {
        setShowChatbotModal(false);
        setShowSummary(true);
      }, 800);
    } else {
      setChatStep(chatStep + 1);
    }
  };

  const handleCampaignNext = () => {
    if (createCampaignStep < 4) {
      setCreateCampaignStep(createCampaignStep + 1);
    } else {
      // Save campaign
      setShowCreateCampaign(false);
      setCreateCampaignStep(1);
    }
  };

  const handleCampaignPrevious = () => {
    if (createCampaignStep > 1) {
      setCreateCampaignStep(createCampaignStep - 1);
    }
  };

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = campaignData.platforms;
    if (currentPlatforms.includes(platform)) {
      setCampaignData({
        ...campaignData,
        platforms: currentPlatforms.filter(p => p !== platform)
      });
    } else {
      setCampaignData({
        ...campaignData,
        platforms: [...currentPlatforms, platform]
      });
    }
  };

  const openCampaignDetails = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  const openInfluencerDetails = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setShowInfluencerModal(true);
  };

  const openChatModal = (thread: any) => {
    setSelectedThread(thread);
    setShowChatModal(true);
  };

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || influencer.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];
  const categories = ['Lifestyle', 'Fashion', 'Technology', 'Fitness', 'Food', 'Travel', 'Beauty', 'Gaming'];
  const followerRanges = ['1K - 10K', '10K - 50K', '50K - 100K', '100K - 500K', '500K - 1M', '1M+'];

  const handlePublishCampaign = () => {
    // Add to Active Campaigns (simulate)
    campaigns.unshift({
      id: Date.now(),
      name: campaignAnswers.goal || 'New Campaign',
      status: 'Active',
      influencers: 0,
      budget: Number(campaignAnswers.budget) || 0,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      engagement: '0%',
      createdAt: new Date().toISOString().slice(0, 10),
      matchedInfluencers: 0,
      pendingResponses: 0
    });
    setShowChatbotModal(false);
    setShowSummary(false);
    setChatMessages([]);
    setChatStep(0);
    setCampaignAnswers({});
  };

  // Add file upload/attachment support to the chat UI
  const [attachments, setAttachments] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
      // Add each file as a chat message
      Array.from(files).forEach(file => {
        setChatMessages(msgs => [
          ...msgs,
          { id: `file-${Date.now()}-${file.name}`, sender: 'user', text: file.name, type: 'attachment', file }
        ]);
      });
    }
    if (chatInputRef.current) chatInputRef.current.focus();
  };

  // Add a helper to parse budget string to number
  function parseBudget(budgetStr: string) {
    const match = budgetStr.replace(/[^\d.]/g, '');
    return Number(match) || 0;
  }

  // In the summary, calculate expected metrics
  function getExpectedMetrics() {
    const budget = parseBudget(campaignAnswers.budget || '0');
    const platforms = (campaignAnswers.platforms || '').toLowerCase();
    let reach = 0;
    let engagementRate = 0;
    if (platforms.includes('instagram')) {
      reach += budget * 100;
      engagementRate += 2.5;
    }
    if (platforms.includes('tiktok')) {
      reach += budget * 120;
      engagementRate += 3.5;
    }
    if (platforms.includes('youtube')) {
      reach += budget * 80;
      engagementRate += 1.5;
    }
    // If multiple platforms, average engagement
    let platformCount = 0;
    if (platforms.includes('instagram')) platformCount++;
    if (platforms.includes('tiktok')) platformCount++;
    if (platforms.includes('youtube')) platformCount++;
    if (platformCount > 1) engagementRate = engagementRate / platformCount;
    if (reach === 0) reach = budget * 100; // fallback
    if (engagementRate === 0) engagementRate = 2.5; // fallback
    return {
      reach: Math.round(reach),
      engagementRate: engagementRate.toFixed(1) + '%',
    };
  }

  const chatInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
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
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-9 h-9 text-gray-900" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-3xl font-extrabold text-white">Brandr</span>
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
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
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
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'influencers' && 'Influencers'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'billing' && 'Billing'}
                {activeTab === 'profile' && 'Profile'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === 'dashboard' && 'Manage your campaigns and track performance'}
                {activeTab === 'influencers' && 'Connect with creators for your campaigns'}
                {activeTab === 'messages' && 'Communicate with your creators'}
                {activeTab === 'analytics' && 'Track campaign performance and ROI'}
                {activeTab === 'billing' && 'Manage payments and invoices'}
                {activeTab === 'profile' && 'Update your business information'}
                {activeTab === 'settings' && 'Account and notification preferences'}
              </p>
            </div>
            {activeTab === 'dashboard' && (
              <button 
                onClick={startChatbot}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Campaign</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Active Campaigns */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {campaigns.map((campaign) => (
                    <div 
                      key={campaign.id} 
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:shadow-md"
                      onClick={() => openCampaignDetails(campaign)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <MoreHorizontal className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="text-lg font-medium text-gray-900">{campaign.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Budget</p>
                          <p className="text-lg font-medium text-gray-900">${campaign.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Matched</p>
                          <p className="text-lg font-medium text-gray-900">{campaign.matchedInfluencers} creators</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Pending</p>
                          <p className="text-lg font-medium text-gray-900">{campaign.pendingResponses} responses</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'influencers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search creators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 w-full sm:w-64"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 w-full sm:w-auto"
                  >
                    <option value="all">All Status</option>
                    <option value="invited">Invited</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredInfluencers.map((influencer) => (
                  <div 
                    key={influencer.id} 
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:shadow-md"
                    onClick={() => openInfluencerDetails(influencer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={influencer.avatar}
                          alt={influencer.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{influencer.name}</h3>
                          <p className="text-gray-600">{influencer.platform} • {influencer.followers} followers</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Match</p>
                          <p className="text-lg font-medium text-gray-900">{influencer.matchPercentage}%</p>
                        </div>
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(influencer.status)}`}>
                          {influencer.status}
                        </span>
                        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-[600px] flex">
              {/* Message List */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                </div>
                <div className="overflow-y-auto h-full">
                  {messageThreads.length > 0 ? (
                    messageThreads.map((thread) => (
                      <div 
                        key={thread.id}
                        className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedThread?.id === thread.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => setSelectedThread(thread)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{thread.creatorName}</h4>
                          <span className="text-xs text-gray-500">{thread.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                        {thread.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No messages yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 flex flex-col">
                {selectedThread ? (
                  <>
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">{selectedThread.creatorName}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedThread.messages.map((message: any) => (
                        <div key={message.id} className={`flex ${message.isFromBrand ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            message.isFromBrand 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.isFromBrand ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 p-4">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                          <Send className="w-4 h-4" />
                          <span>Send</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Reach</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">124.5K</p>
                  <p className="text-sm text-emerald-600">+12% from last month</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Rate</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">3.7%</p>
                  <p className="text-sm text-emerald-600">+0.5% from last month</p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversions</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">90</p>
                  <p className="text-sm text-emerald-600">+23% from last month</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Last year</option>
                    </select>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {campaigns.filter(c => c.status !== 'Draft').map((campaign) => (
                    <div key={campaign.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Impressions</p>
                          <p className="text-gray-900 font-medium">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Clicks</p>
                          <p className="text-gray-900 font-medium">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Engagement</p>
                          <p className="text-gray-900 font-medium">{campaign.engagement}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Conversions</p>
                          <p className="text-gray-900 font-medium">{campaign.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                    Update Payment Method
                  </button>
                </div>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{invoice.campaign}</p>
                        <p className="text-sm text-gray-600">{invoice.date} • {invoice.invoice}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{invoice.amount}</p>
                          <span className={`text-sm px-2 py-1 rounded-full border ${getStatusColor(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-400" />
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                      Upload Logo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        defaultValue="TechFlow Inc."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Technology</option>
                        <option>E-commerce</option>
                        <option>SaaS</option>
                        <option>Fashion</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="hello@techflow.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                    <textarea
                      rows={4}
                      defaultValue="We're a technology company focused on building innovative productivity tools for creative professionals."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Social Links</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Twitter className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          placeholder="https://twitter.com/yourcompany"
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Linkedin className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          placeholder="https://linkedin.com/company/yourcompany"
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
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
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Campaign updates</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Creator responses</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Security</span>
                    </h4>
                    <div className="space-y-3">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                        Change Password
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <UserPlus className="w-5 h-5" />
                      <span>Team Access</span>
                    </h4>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                      Manage Team Members
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create Campaign</h2>
                <p className="text-gray-600">Step {createCampaignStep} of 4</p>
              </div>
              <button
                onClick={() => setShowCreateCampaign(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(createCampaignStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {createCampaignStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Basics</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                    <input
                      type="text"
                      value={campaignData.name}
                      onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                      placeholder="Enter campaign name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objective</label>
                    <select
                      value={campaignData.objective}
                      onChange={(e) => setCampaignData({...campaignData, objective: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select objective</option>
                      <option value="brand-awareness">Brand Awareness</option>
                      <option value="product-launch">Product Launch</option>
                      <option value="lead-generation">Lead Generation</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget: ${campaignData.budget.toLocaleString()}</label>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={campaignData.budget}
                      onChange={(e) => setCampaignData({...campaignData, budget: parseInt(e.target.value)})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$1,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                </div>
              )}

              {createCampaignStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Campaign Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables</label>
                    <textarea
                      value={campaignData.deliverables}
                      onChange={(e) => setCampaignData({...campaignData, deliverables: e.target.value})}
                      placeholder="Describe what you want creators to deliver..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
                    <select
                      value={campaignData.duration}
                      onChange={(e) => setCampaignData({...campaignData, duration: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select duration</option>
                      <option value="1-week">1 Week</option>
                      <option value="2-weeks">2 Weeks</option>
                      <option value="1-month">1 Month</option>
                      <option value="3-months">3 Months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Platforms</label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map(platform => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => handlePlatformToggle(platform)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            campaignData.platforms.includes(platform)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-sm font-medium text-gray-900">{platform}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {createCampaignStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Creator Criteria</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={campaignData.category}
                      onChange={(e) => setCampaignData({...campaignData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Follower Range</label>
                    <select
                      value={campaignData.followerRange}
                      onChange={(e) => setCampaignData({...campaignData, followerRange: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select follower range</option>
                      {followerRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                    <textarea
                      value={campaignData.description}
                      onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                      placeholder="Any specific requirements or preferences..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    />
                  </div>
                </div>
              )}

              {createCampaignStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Review & Launch</h3>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Campaign Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="text-gray-900">{campaignData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Objective:</span>
                        <span className="text-gray-900">{campaignData.objective}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="text-gray-900">${campaignData.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-gray-900">{campaignData.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platforms:</span>
                        <span className="text-gray-900">{campaignData.platforms.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  onClick={handleCampaignPrevious}
                  disabled={createCampaignStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                    createCampaignStep === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateCampaign(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={handleCampaignNext}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    <span>{createCampaignStep === 4 ? 'Launch Campaign' : 'Next'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCampaign.name}</h2>
                <p className="text-gray-600">Campaign Details</p>
              </div>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedCampaign.status)}`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-semibold text-gray-900">${selectedCampaign.budget.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedCampaign.impressions.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Impressions</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedCampaign.clicks.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Clicks</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedCampaign.engagement}</p>
                    <p className="text-sm text-gray-600">Engagement</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedCampaign.conversions}</p>
                    <p className="text-sm text-gray-600">Conversions</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Edit Campaign
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Influencer Details Modal */}
      {showInfluencerModal && selectedInfluencer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedInfluencer.avatar}
                  alt={selectedInfluencer.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedInfluencer.name}</h2>
                  <p className="text-gray-600">{selectedInfluencer.platform} • {selectedInfluencer.followers} followers</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfluencerModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedInfluencer.matchPercentage}%</p>
                  <p className="text-sm text-gray-600">Match Score</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedInfluencer.engagementRate}</p>
                  <p className="text-sm text-gray-600">Engagement</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-900">{selectedInfluencer.avgViews}</p>
                  <p className="text-sm text-gray-600">Avg Views</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-700">{selectedInfluencer.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedInfluencer.status)}`}>
                  {selectedInfluencer.status}
                </span>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatbotCampaignModal
        isOpen={showChatbotModal}
        onClose={() => setShowChatbotModal(false)}
        onComplete={() => {}}
        messages={chatMessages}
        inputValue={chatInput}
        onInputChange={setChatInput}
        onSend={handleChatSend}
        loading={chatLoading}
        attachments={attachments}
        onFileChange={handleFileChange}
        inputRef={chatInputRef}
      />
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl h-[80vh] flex flex-col p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Campaign Summary</h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {campaignQuestions.map(q => (
                <div key={q.key} className="border-b pb-4">
                  <div className="text-gray-500 text-sm mb-1">{q.prompt}</div>
                  <div className="text-lg font-semibold">{campaignAnswers[q.key]}</div>
                </div>
              ))}
              {attachments.length > 0 && (
                <div className="mt-6">
                  <div className="text-gray-500 text-sm mb-2">Attached Content</div>
                  <ul className="space-y-2">
                    {attachments.map((file, i) => (
                      <li key={i} className="text-blue-600 underline cursor-pointer" onClick={() => window.open(URL.createObjectURL(file), '_blank')}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Expected Metrics */}
              <div className="mt-6 p-4 bg-gray-100 rounded-xl">
                <div className="font-bold mb-2">Expected Metrics</div>
                <div>Estimated Reach: {getExpectedMetrics().reach.toLocaleString()} impressions</div>
                <div>Estimated Engagement Rate: {getExpectedMetrics().engagementRate}</div>
              </div>
            </div>
            <button
              className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              onClick={handlePublishCampaign}
            >
              Post Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;