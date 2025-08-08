import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Upload, Building, Target, User, Briefcase, Instagram, Youtube, Video, CheckCircle, Zap, Users, DollarSign } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'business' | 'influencer'>('business');
  const [formData, setFormData] = useState({
    // Business fields
    companyName: '',
    founderName: '',
    industry: '',
    // Influencer fields
    username: '',
    platforms: [] as string[],
    niche: '',
    followerCount: '',
    mediaLinks: '',
    // Common fields
    email: '',
    password: '',
    logo: null as File | null,
  });
  const [businessMeta, setBusinessMeta] = useState({
    businessType: '',
    industry: '',
    targetAudience: '',
    adBudget: '',
    influencerExperience: '',
  });

  const totalSteps = userType === 'influencer' ? 5 : 2;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | number | File | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = formData.platforms;
    if (currentPlatforms.includes(platform)) {
      handleInputChange('platforms', currentPlatforms.filter(p => p !== platform));
    } else {
      handleInputChange('platforms', [...currentPlatforms, platform]);
    }
  };

  const industries = [
    'SaaS',
    'E-commerce',
    'Fitness & Health',
    'Food & Beverage',
    'Fashion',
    'Technology',
    'Education',
    'Travel'
  ];

  const niches = [
    'Lifestyle',
    'Fashion',
    'Beauty',
    'Fitness',
    'Food',
    'Travel',
    'Technology',
    'Gaming',
    'Business',
    'Education'
  ];

  const followerRanges = [
    '1K - 10K',
    '10K - 50K',
    '50K - 100K',
    '100K - 500K',
    '500K - 1M',
    '1M+'
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram },
    { name: 'YouTube', icon: Youtube },
    { name: 'TikTok', icon: Video }  // Changed from BookText to Video
  ];

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5] flex items-center justify-center p-4" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-md w-full p-8 border border-[#f5f5f5]/10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-[#f5f5f5]/70">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-[#f5f5f5]">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
          </div>
          <div className="w-full bg-[#1c1c1c] rounded-full h-2">
            <div
              className="bg-[#f5f5f5] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Choose your account type</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">Are you a business or an influencer?</p>

              <div className="space-y-4">
                <button
                  onClick={() => setUserType('business')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    userType === 'business'
                      ? 'border-[#f5f5f5] bg-[#f5f5f5]/10'
                      : 'border-[#f5f5f5]/20 hover:border-[#f5f5f5]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-6 h-6 text-[#f5f5f5]" />
                    <div className="text-left">
                      <div className="font-semibold text-[#f5f5f5]">Business</div>
                      <div className="text-sm text-[#f5f5f5]/70">I want to work with influencers</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUserType('influencer')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    userType === 'influencer'
                      ? 'border-[#f5f5f5] bg-[#f5f5f5]/10'
                      : 'border-[#f5f5f5]/20 hover:border-[#f5f5f5]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-[#f5f5f5]" />
                    <div className="text-left">
                      <div className="font-semibold text-[#f5f5f5]">Influencer</div>
                      <div className="text-sm text-[#f5f5f5]/70">I want to work with brands</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && userType === 'business' && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Tell us about your business</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">Let's get your company set up</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Business Type</label>
                  <input
                    type="text"
                    value={businessMeta.businessType}
                    onChange={e => setBusinessMeta(meta => ({ ...meta, businessType: e.target.value }))}
                    placeholder="e.g. SaaS, Retail, Agency, etc."
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Industry</label>
                  <select
                    value={businessMeta.industry}
                    onChange={e => setBusinessMeta(meta => ({ ...meta, industry: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Target Audience</label>
                  <input
                    type="text"
                    value={businessMeta.targetAudience}
                    onChange={e => setBusinessMeta(meta => ({ ...meta, targetAudience: e.target.value }))}
                    placeholder="e.g. 18-34, US, fitness enthusiasts, etc."
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Ad Budget</label>
                  <input
                    type="text"
                    value={businessMeta.adBudget}
                    onChange={e => setBusinessMeta(meta => ({ ...meta, adBudget: e.target.value }))}
                    placeholder="e.g. $5,000/month"
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Previous Influencer Marketing Experience</label>
                  <input
                    type="text"
                    value={businessMeta.influencerExperience}
                    onChange={e => setBusinessMeta(meta => ({ ...meta, influencerExperience: e.target.value }))}
                    placeholder="e.g. Yes, No, Briefly describe"
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && userType === 'influencer' && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Connect your social media</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">You must connect at least one platform to continue</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Your creator handle"
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Platforms (Select at least one)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {platforms.map(platform => {
                      const Icon = platform.icon;
                      const isSelected = formData.platforms.includes(platform.name);
                      return (
                        <button
                          key={platform.name}
                          type="button"
                          onClick={() => handlePlatformToggle(platform.name)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#f5f5f5] bg-[#f5f5f5]/10'
                              : 'border-[#f5f5f5]/20 hover:border-[#f5f5f5]/40'
                          }`}
                        >
                          <Icon className="w-6 h-6 text-[#f5f5f5] mx-auto mb-1" />
                          <div className="text-xs font-medium text-[#f5f5f5]">{platform.name}</div>
                        </button>
                      );
                    })}
                  </div>
                  {formData.platforms.length === 0 && (
                    <p className="text-sm text-red-400 mt-2">Please select at least one platform</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && userType === 'influencer' && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Tell us about your content</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">Help brands discover you</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Niche</label>
                  <select
                    value={formData.niche}
                    onChange={(e) => handleInputChange('niche', e.target.value)}
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent"
                  >
                    <option value="">Select your niche</option>
                    {niches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Follower Count</label>
                  <select
                    value={formData.followerCount}
                    onChange={(e) => handleInputChange('followerCount', e.target.value)}
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent"
                  >
                    <option value="">Select follower range</option>
                    {followerRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && userType === 'influencer' && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Add your best work</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">Share links to your best content (optional)</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#f5f5f5]/70 mb-2">Media Links</label>
                  <textarea
                    value={formData.mediaLinks}
                    onChange={(e) => handleInputChange('mediaLinks', e.target.value)}
                    placeholder="Paste links to your best posts, videos, or content..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[#f5f5f5]/20 bg-[#1c1c1c] text-[#f5f5f5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5f5f5]/50 focus:border-transparent placeholder-[#f5f5f5]/50"
                  />
                  <p className="text-sm text-[#f5f5f5]/50 mt-2">This helps brands understand your content style</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && userType === 'influencer' && (
            <div>
              <div className="w-16 h-16 bg-[#f5f5f5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-[#f5f5f5]" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-[#f5f5f5]">Welcome to InfluenceConnect!</h2>
              <p className="text-[#f5f5f5]/70 text-center mb-8">Here's how our platform works</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#f5f5f5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#f5f5f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f5f5f5] mb-1">Receive Campaign Invites</h3>
                    <p className="text-sm text-[#f5f5f5]/70">Brands will send you personalized campaign invitations based on your profile and content style.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#f5f5f5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#f5f5f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f5f5f5] mb-1">Accept & Create</h3>
                    <p className="text-sm text-[#f5f5f5]/70">Review campaign details, accept the ones you love, and create authentic content that resonates with your audience.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#f5f5f5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-[#f5f5f5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f5f5f5] mb-1">Get Paid</h3>
                    <p className="text-sm text-[#f5f5f5]/70">Once your content is approved and published, you'll receive payment directly to your account.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 1
                ? 'text-[#f5f5f5]/30 cursor-not-allowed'
                : 'text-[#f5f5f5]/70 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={userType === 'influencer' && currentStep === 2 && formData.platforms.length === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl ${
              (userType === 'influencer' && currentStep === 2 && formData.platforms.length === 0)
                ? 'bg-[#f5f5f5]/30 text-[#1c1c1c]/50 cursor-not-allowed'
                : 'bg-[#f5f5f5] text-[#1c1c1c] hover:bg-[#e5e5e5]'
            }`}
          >
            <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
