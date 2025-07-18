import React from 'react';
import { Zap, ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: 'landing' | 'about' | 'blog' | 'faqs') => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-4 lg:px-8 bg-[#1c1c1c]/90 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Zap className="w-9 h-9 text-white" />
          </div>
          <span className="text-3xl font-extrabold text-[#f5f5f5]">Brandr</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('landing')}
            className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('faqs')}
            className="text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors font-medium"
          >
            FAQs
          </button>
        </div>
      </nav>

      {/* Blog Section */}
      <div className="py-24 px-6 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#f5f5f5] mb-6">Blog</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-[#f5f5f5]/80 max-w-3xl mx-auto leading-relaxed">
              Insights, tips, and stories from the world of creator marketing and authentic brand partnerships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30">Creator Tips</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-blue-400 transition-colors">
                How to Build Authentic Brand Partnerships That Last
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                Learn the key strategies successful creators use to build long-term relationships with brands and maximize their earning potential.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By Sarah Chen</span>
                <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
            
            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-orange-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-600/20 text-orange-400 text-sm rounded-full border border-orange-500/30">Business Growth</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-orange-400 transition-colors">
                Why Brands Are Ditching Ads for Creator Marketing
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                Discover why forward-thinking brands are shifting their marketing budgets from paid ads to authentic creator partnerships.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By Marcus Rodriguez</span>
                <button className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
            
            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-green-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-600/20 text-green-400 text-sm rounded-full border border-green-500/30">Platform Updates</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-green-400 transition-colors">
                Introducing Smart Matching: Find Your Perfect Creator
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                Our new AI-powered matching system helps brands connect with creators who align perfectly with their values and audience.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By Alex Kim</span>
                <button className="text-green-400 hover:text-green-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-400 text-sm rounded-full border border-purple-500/30">Industry Insights</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-purple-400 transition-colors">
                The Future of Influencer Marketing in 2024
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                Explore the latest trends and predictions shaping the influencer marketing landscape this year.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By Emma Thompson</span>
                <button className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 text-sm rounded-full border border-cyan-500/30">Success Stories</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-cyan-400 transition-colors">
                How TechCorp Increased ROI by 300% with Creator Partnerships
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                A deep dive into how one company transformed their marketing strategy with authentic influencer collaborations.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By David Park</span>
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            <article className="bg-gradient-to-br from-[#1c1c1c] to-[#333] rounded-3xl border border-[#f5f5f5]/10 p-8 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer group hover:scale-105">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30">Best Practices</span>
              </div>
              <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4 group-hover:text-yellow-400 transition-colors">
                Content Creation Guidelines That Actually Work
              </h3>
              <p className="text-[#f5f5f5]/80 mb-6 leading-relaxed">
                Essential tips for creating compelling campaign briefs that inspire creators to produce their best work.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]/60">By Lisa Wang</span>
                <button className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm transition-colors flex items-center space-x-1">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#f5f5f5]/10 py-20 px-10 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-[#f5f5f5]">Brandr</span>
          </div>
          
          <div className="flex space-x-8">
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Terms</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Privacy</button>
            <button className="text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;