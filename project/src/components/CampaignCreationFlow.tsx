import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

interface CampaignCreationFlowProps {
  onClose: () => void;
  onCampaignCreated: (campaign: any) => void;
}

const CampaignCreationFlow: React.FC<CampaignCreationFlowProps> = ({ onClose, onCampaignCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    goal: 'Increase brand awareness',
    audience: 'Young professionals aged 25-35',
    platforms: 'Instagram, TikTok',
    budget: 5000,
    timeline: '2-3 weeks'
  });

  const budgetRanges = [
    { label: '$50', value: 50 },
    { label: '$100', value: 100 },
    { label: '$500', value: 500 },
    { label: '$1K', value: 1000 },
    { label: '$5K', value: 5000 },
    { label: '$10K', value: 10000 },
    { label: '$25K', value: 25000 },
    { label: '$50K', value: 50000 },
    { label: '$100K', value: 100000 }
  ];

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep(2);
      addAIMessage("I've analysed Brandr's website. Looks like you're all about helping startups grow through organic reach. Let's build a campaign that reflects that. Want to refine the tone, target audience, or platform focus before we match creators?");
    }, 1750);
  };

  const addAIMessage = (message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: message }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      addAIMessage("Great! I'll use that to refine your campaign strategy. What's your budget range for this campaign?");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmit(e);
    }
  };

  const handleReviewCampaign = () => {
    setCurrentStep(3);
  };

  const handlePostCampaign = () => {
    const newCampaign = {
      id: Date.now().toString(),
      title: 'Brandr Growth Campaign',
      status: 'active',
      budget: `$${editValues.budget.toLocaleString()}`,
      goal: editValues.goal,
      creators: 'Tech & Business',
      platforms: editValues.platforms,
      expectedReach: '25K - 75K',
      expectedEngagement: '4.2% - 6.1%',
      expectedClicks: '800 - 2.5K'
    };
    
    onCampaignCreated(newCampaign);
    onClose();
  };

  const handleEditField = (field: string) => {
    setEditingField(field);
  };

  const handleSaveEdit = (field: string) => {
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const min = Math.log(50);
    const max = Math.log(100000);
    const scale = (max - min) / 100;
    const budget = Math.round(Math.exp(min + scale * value));
    setEditValues(prev => ({ ...prev, budget }));
  };

  const getBudgetPercentage = () => {
    const min = Math.log(50);
    const max = Math.log(100000);
    const current = Math.log(editValues.budget);
    return ((current - min) / (max - min)) * 100;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Save as draft and close
      const draftCampaign = {
        id: `draft-${Date.now()}`,
        title: 'Draft Campaign',
        status: 'draft',
        budget: `$${editValues.budget.toLocaleString()}`,
        goal: editValues.goal,
        creators: 'Tech & Business',
        platforms: editValues.platforms,
        expectedReach: '25K - 75K',
        expectedEngagement: '4.2% - 6.1%',
        expectedClicks: '800 - 2.5K'
      };
      onCampaignCreated(draftCampaign);
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="text-center p-8 pt-6">
      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.029 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Start Your Campaign</h2>
      <p className="text-gray-600 mb-6">Enter your website for us to analyze your brand identity</p>
      
      <form onSubmit={handleWebsiteSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Enter your website</label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="yourwebsite.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 text-base"
        >
          Continue
        </button>
      </form>

      {isAnalyzing && (
        <div className="mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-gray-600 mt-4">Analyzing your brand identity...</p>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Campaign Assistant</h2>
        
        <div className="space-y-4 mb-6">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <form onSubmit={handleUserSubmit} className="flex space-x-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <button
          onClick={handleReviewCampaign}
          className="w-full mt-4 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Review Campaign
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Results</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Campaign Goal:</span>
                {editingField === 'goal' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValues.goal}
                      onChange={(e) => setEditValues(prev => ({ ...prev, goal: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => handleSaveEdit('goal')} className="text-green-600">✓</button>
                    <button onClick={handleCancelEdit} className="text-red-600">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">{editValues.goal}</span>
                    <button onClick={() => handleEditField('goal')} className="text-blue-600 text-sm">Edit</button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Target Audience:</span>
                {editingField === 'audience' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValues.audience}
                      onChange={(e) => setEditValues(prev => ({ ...prev, audience: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => handleSaveEdit('audience')} className="text-green-600">✓</button>
                    <button onClick={handleCancelEdit} className="text-red-600">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">{editValues.audience}</span>
                    <button onClick={() => handleEditField('audience')} className="text-blue-600 text-sm">Edit</button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Platforms:</span>
                {editingField === 'platforms' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValues.platforms}
                      onChange={(e) => setEditValues(prev => ({ ...prev, platforms: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => handleSaveEdit('platforms')} className="text-green-600">✓</button>
                    <button onClick={handleCancelEdit} className="text-red-600">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">{editValues.platforms}</span>
                    <button onClick={() => handleEditField('platforms')} className="text-blue-600 text-sm">Edit</button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Budget:</span>
                  <span className="text-gray-900">${editValues.budget.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={getBudgetPercentage()}
                    onChange={handleBudgetChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${getBudgetPercentage()}%, #e5e7eb ${getBudgetPercentage()}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50</span>
                    <span>$100K</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Timeline:</span>
                {editingField === 'timeline' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValues.timeline}
                      onChange={(e) => setEditValues(prev => ({ ...prev, timeline: e.target.value }))}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => handleSaveEdit('timeline')} className="text-green-600">✓</button>
                    <button onClick={handleCancelEdit} className="text-red-600">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">{editValues.timeline}</span>
                    <button onClick={() => handleEditField('timeline')} className="text-blue-600 text-sm">Edit</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Expected Metrics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">25K - 75K</div>
                <div className="text-sm text-blue-700">Expected Reach</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">4.2% - 6.1%</div>
                <div className="text-sm text-purple-700">Engagement Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">800 - 2.5K</div>
                <div className="text-sm text-green-700">Expected Clicks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6">
        <button
          onClick={handlePostCampaign}
          className="w-full px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Post Campaign</span>
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[70vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-end p-6">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreationFlow; 