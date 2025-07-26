import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  Sparkles,
  Edit3,
  Users,
  DollarSign,
  Target,
  Instagram,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  Plus,
  Minus,
  Save,
  Upload,
  FileText,
  Calendar,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  User,
  MapPin,
  Clock,
  Zap,
  X,
  Play,
  BarChart3,
  Brain,
  Rocket,
  Mail,
  Repeat,
  Palette,
  TestTube,
  ChevronDown,
  ChevronUp,
  Filter,
  Star,
  Globe
} from 'lucide-react';

const CampaignAI = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [campaignData, setCampaignData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(10000);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [expandedSections, setExpandedSections] = useState({
    objectives: true,
    strategy: true,
    timeline: true,
    content: true
  });
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [creatorFilter, setCreatorFilter] = useState('all');
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const suggestedPrompts = [
    "Launch sustainable skincare for millennials",
    "Promote fitness app to busy parents",
    "Market vintage clothing to Gen Z",
    "B2B SaaS tool for small agencies"
  ];

  const creators = [
    {
      id: 1,
      name: 'Emma Greenbeauty',
      handle: '@emmagreenbeauty',
      followers: '125K',
      engagement: '4.8%',
      price: '$800-1200',
      niche: 'Beauty & Sustainability',
      platform: 'Instagram',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      matchScore: 96
    },
    {
      id: 2,
      name: 'Zoe Lifestyle',
      handle: '@zoelifestyle',
      followers: '89K',
      engagement: '6.2%',
      price: '$650-900',
      niche: 'Wellness & Lifestyle',
      platform: 'Instagram',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      matchScore: 91
    },
    {
      id: 3,
      name: 'Natural Radiance',
      handle: '@naturalradiance',
      followers: '203K',
      engagement: '3.9%',
      price: '$1200-1800',
      niche: 'Skincare Expert',
      platform: 'Instagram',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      matchScore: 88
    },
    {
      id: 4,
      name: 'TechReview Mike',
      handle: '@techreviewmike',
      followers: '156K',
      engagement: '5.1%',
      price: '$900-1400',
      niche: 'Technology',
      platform: 'YouTube',
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      matchScore: 85
    }
  ];

  useEffect(() => {
    if (currentScreen === 2 && chatMessages.length === 0) {
      setChatMessages([
        {
          id: '1',
          sender: 'ai',
          message: "Hi! I'm your AI marketing strategist. I can help you refine your campaign, adjust targeting, find better creators, or optimize your budget. What would you like to work on?",
          timestamp: new Date()
        }
      ]);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatLoading]);

  const generateCampaign = async () => {
    setIsGenerating(true);

    const stages = [
      { stage: 'Analyzing your input...', duration: 1200 },
      { stage: 'Building strategy...', duration: 1500 },
      { stage: 'Matching creators...', duration: 1300 },
      { stage: 'Optimizing campaign...', duration: 1000 }
    ];

    for (const { stage, duration } of stages) {
      setLoadingStage(stage);
      await new Promise(resolve => setTimeout(resolve, duration));
    }

    const generatedCampaign = {
      title: 'Sustainable Skincare Launch',
      objectives: [
        'Increase brand awareness among eco-conscious millennials',
        'Drive 500+ website visits in first month',
        'Generate 50+ qualified leads',
        'Build authentic brand community'
      ],
      strategy: 'Focus on authentic storytelling through Instagram creators who genuinely use and love sustainable products. Emphasize the environmental impact and personal benefits of switching to eco-friendly skincare.',
      timeline: [
        { week: 1, task: 'Creator outreach & content planning' },
        { week: 2, task: 'Content creation & review' },
        { week: 3, task: 'Campaign launch & monitoring' },
        { week: 4, task: 'Optimization & reporting' }
      ],
      contentSuggestions: [
        'Unboxing videos showcasing eco-friendly packaging',
        'Morning/evening skincare routine tutorials',
        'Before/after transformation stories',
        'Behind-the-scenes sustainability practices',
        'User-generated content challenges'
      ],
      budget: selectedBudget,
      expectedResults: {
        reach: '150K-200K',
        engagement: '4.2%',
        conversions: '2.5%',
        roi: '320%'
      }
    };

    setCampaignData(generatedCampaign);
    setIsGenerating(false);
    setCurrentScreen(2);
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    setTimeout(() => {
      const responses = [
        "I can help you find more creators in the sustainable beauty niche. Would you like me to search for micro-influencers with higher engagement rates?",
        "Your budget allocation looks good! Consider allocating 15% more to content creation for better quality assets.",
        "The eco-conscious millennial segment has great potential. I recommend adding Gen Z sustainability advocates to expand your reach.",
        "Based on your campaign goals, Instagram Stories and Reels will perform better than static posts. Should I adjust the content strategy?",
        "I notice seasonality could impact your campaign. Spring launches typically see 23% higher engagement for skincare products."
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsChatLoading(false);
    }, 1500);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCreator = (creatorId) => {
    setSelectedCreators(prev =>
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  const filteredCreators = creators.filter(creator =>
    creatorFilter === 'all' || creator.platform.toLowerCase() === creatorFilter
  );

  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6"
           style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 p-12">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                AI Campaign Builder
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Describe your campaign goals and let AI create a complete marketing strategy with matched creators
              </p>
            </div>

            <div className="space-y-8">
              {/* Primary Input */}
              <div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your campaign goal... (e.g., 'Launch our new sustainable skincare line to eco-conscious millennials aged 25-35. Focus on Instagram and TikTok with a $10k budget.')"
                  className="w-full h-32 px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 text-slate-900 placeholder-slate-400 resize-none text-lg leading-relaxed"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-slate-500">{userInput.length}/1000 characters</span>
                </div>
              </div>

              {/* Quick Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Platform</label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="multi">Multi-platform</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Budget: ${selectedBudget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>$1K</span>
                    <span>$50K</span>
                  </div>
                </div>
              </div>

              {/* Suggested Prompts */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-4">Quick Start Ideas:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setUserInput(prompt)}
                      className="text-left p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-slate-700"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCampaign}
                disabled={!userInput.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-coral-500 to-coral-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-coral-600 hover:to-coral-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)' }}
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{loadingStage}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Generate Campaign</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #4F46E5;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #4F46E5;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar Chat Panel */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-96'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-lg`}>
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">AI Strategist</h3>
                  <p className="text-sm text-slate-500">Your campaign assistant</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-slate-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Actions */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setChatInput("Find more sustainable beauty creators")}
                  className="text-xs px-3 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                >
                  Find creators
                </button>
                <button
                  onClick={() => setChatInput("Optimize my budget allocation")}
                  className="text-xs px-3 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                >
                  Optimize budget
                </button>
                <button
                  onClick={() => setChatInput("Improve engagement strategy")}
                  className="text-xs px-3 py-2 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                >
                  Improve strategy
                </button>
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  disabled={isChatLoading}
                />
                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-4 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Panel */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentScreen(1)}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>New Campaign</span>
              </button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                {campaignData?.title || 'Campaign Builder'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>AI Generated</span>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-xl font-semibold hover:from-coral-600 hover:to-coral-700 transition-all duration-200"
                      style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%)' }}>
                Launch Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Content */}
        <div className="p-8 space-y-8">
          {/* Campaign Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                Campaign Overview
              </h2>
              <div className="flex items-center space-x-2 text-indigo-600">
                <BarChart3 className="w-5 h-5" />
                <span className="font-semibold">Expected ROI: {campaignData?.expectedResults.roi}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-slate-900">{campaignData?.expectedResults.reach}</div>
                <div className="text-sm text-slate-600">Expected Reach</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-slate-900">{campaignData?.expectedResults.engagement}</div>
                <div className="text-sm text-slate-600">Engagement Rate</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-slate-900">{campaignData?.expectedResults.conversions}</div>
                <div className="text-sm text-slate-600">Conversion Rate</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <div className="text-2xl font-bold text-slate-900">${campaignData?.budget.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Total Budget</div>
              </div>
            </div>
          </div>

          {/* Modular Campaign Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Objectives */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleSection('objectives')}
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Objectives</h3>
                </div>
                {expandedSections.objectives ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </div>
              {expandedSections.objectives && (
                <div className="px-6 pb-6">
                  <div className="space-y-3">
                    {campaignData?.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Strategy */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleSection('strategy')}
              >
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Strategy</h3>
                </div>
                {expandedSections.strategy ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </div>
              {expandedSections.strategy && (
                <div className="px-6 pb-6">
                  <p className="text-slate-700 leading-relaxed">{campaignData?.strategy}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleSection('timeline')}
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
                </div>
                {expandedSections.timeline ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </div>
              {expandedSections.timeline && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {campaignData?.timeline.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                          {item.week}
                        </div>
                        <span className="text-slate-700">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content Suggestions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleSection('content')}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Content Ideas</h3>
                </div>
                {expandedSections.content ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
              </div>
              {expandedSections.content && (
                <div className="px-6 pb-6">
                  <div className="space-y-3">
                    {campaignData?.contentSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                        <Zap className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className="text-slate-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Creator Matching Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, Inter, sans-serif' }}>
                  Matched Creators
                </h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={creatorFilter}
                    onChange={(e) => setCreatorFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Platforms</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </button>
                </div>
              </div>
              <p className="text-slate-600">
                {selectedCreators.length} of {filteredCreators.length} creators selected
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                      selectedCreators.includes(creator.id)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                    onClick={() => toggleCreator(creator.id)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{creator.name}</h3>
                        <p className="text-sm text-slate-600">{creator.handle}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-sm font-semibold text-slate-900">{creator.matchScore}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-slate-500">Followers</span>
                        <div className="font-semibold text-slate-900">{creator.followers}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Engagement</span>
                        <div className="font-semibold text-slate-900">{creator.engagement}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                        {creator.niche}
                      </span>
                      <span className="font-semibold text-slate-900">{creator.price}</span>
                    </div>

                    <button
                      className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        selectedCreators.includes(creator.id)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCreator(creator.id);
                      }}
                    >
                      {selectedCreators.includes(creator.id) ? 'Added to Campaign' : 'Add to Campaign'}
                    </button>
                  </div>
                ))}
              </div>

              {filteredCreators.length > 4 && (
                <div className="text-center mt-8">
                  <button className="px-8 py-3 border-2 border-dashed border-slate-300 text-slate-600 rounded-xl hover:border-slate-400 hover:text-slate-700 transition-colors">
                    Load More Creators ({creators.length - 4} remaining)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAI;