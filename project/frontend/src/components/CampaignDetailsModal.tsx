import React, { useState } from 'react';
import { X, ExternalLink, Instagram, TrendingUp, Eye, MessageCircle, Heart, Share2 } from 'lucide-react';

interface CampaignDetailsModalProps {
  campaign: any;
  onClose: () => void;
}

interface Post {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  creator: string;
  creatorHandle: string;
  creatorAvatar: string;
  postUrl: string;
  postDate: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  status: 'live' | 'scheduled' | 'draft';
}

const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({ campaign, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'creators'>('overview');

  const posts: Post[] = [
    {
      id: '1',
      platform: 'instagram',
      creator: 'Sarah Chen',
      creatorHandle: '@sarahchen_tech',
      creatorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      postUrl: 'https://instagram.com/p/example1',
      postDate: '2024-01-15',
      metrics: { views: 12500, likes: 890, comments: 45, shares: 23 },
      status: 'live'
    },
    {
      id: '2',
      platform: 'tiktok',
      creator: 'Marcus Rodriguez',
      creatorHandle: '@marcus_rodriguez',
      creatorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      postUrl: 'https://tiktok.com/@marcus_rodriguez/video/example2',
      postDate: '2024-01-16',
      metrics: { views: 45000, likes: 3200, comments: 180, shares: 95 },
      status: 'live'
    },
    {
      id: '3',
      platform: 'instagram',
      creator: 'Alex Kim',
      creatorHandle: '@alexkim_style',
      creatorAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      postUrl: 'https://instagram.com/p/example3',
      postDate: '2024-01-17',
      metrics: { views: 8900, likes: 650, comments: 32, shares: 18 },
      status: 'live'
    }
  ];

  const creators = [
    {
      id: '1',
      name: 'Sarah Chen',
      handle: '@sarahchen_tech',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      platform: 'Instagram',
      followers: '125K',
      engagement: '4.2%',
      posts: 2,
      status: 'active'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      handle: '@marcus_rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      platform: 'TikTok',
      followers: '450K',
      engagement: '6.1%',
      posts: 1,
      status: 'active'
    },
    {
      id: '3',
      name: 'Alex Kim',
      handle: '@alexkim_style',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      platform: 'Instagram',
      followers: '89K',
      engagement: '3.8%',
      posts: 1,
      status: 'active'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'tiktok':
        return <ExternalLink className="w-4 h-4" />;
      case 'youtube':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'text-pink-600';
      case 'tiktok':
        return 'text-black';
      case 'youtube':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalMetrics = {
    reach: posts.reduce((sum, post) => sum + post.metrics.views, 0),
    engagement: posts.reduce((sum, post) => sum + post.metrics.likes + post.metrics.comments, 0),
    posts: posts.length
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Campaign Status Banner */}
      {campaign.status === 'draft' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-yellow-800 font-medium">Draft Campaign</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">This campaign is saved as a draft and hasn't been published yet.</p>
        </div>
      )}

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Reach</p>
              <p className="text-2xl font-bold text-blue-900">{formatNumber(totalMetrics.reach)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-green-600 text-sm font-medium">Total Engagement</p>
              <p className="text-2xl font-bold text-green-900">{formatNumber(totalMetrics.engagement)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-purple-600 text-sm font-medium">Active Posts</p>
              <p className="text-2xl font-bold text-purple-900">{totalMetrics.posts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Campaign Goal</p>
            <p className="font-medium text-gray-900">{campaign.goal}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Budget</p>
            <p className="font-medium text-gray-900">{campaign.budget}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Platforms</p>
            <p className="font-medium text-gray-900">{campaign.platforms}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Expected Reach</p>
            <p className="font-medium text-gray-900">{campaign.expectedReach}</p>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Over Time</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Performance chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPostsTab = () => (
    <div className="space-y-4">
      {campaign.status === 'draft' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Posts Yet</h3>
          <p className="text-gray-500">Posts will appear here once the campaign is published and creators start posting.</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img src={post.creatorAvatar} alt={post.creator} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{post.creator}</h4>
                  <p className="text-gray-500 text-sm">{post.creatorHandle}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getPlatformIcon(post.platform)}
                    <span className={`text-sm ${getPlatformColor(post.platform)}`}>{post.platform}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{formatDate(post.postDate)}</span>
                  </div>
                </div>
              </div>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Post</span>
              </a>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(post.metrics.views)}</p>
                <p className="text-gray-500 text-sm">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(post.metrics.likes)}</p>
                <p className="text-gray-500 text-sm">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(post.metrics.comments)}</p>
                <p className="text-gray-500 text-sm">Comments</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(post.metrics.shares)}</p>
                <p className="text-gray-500 text-sm">Shares</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderCreatorsTab = () => (
    <div className="space-y-4">
      {campaign.status === 'draft' ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Creators Yet</h3>
          <p className="text-gray-500">Creators will appear here once the campaign is published and matched.</p>
        </div>
      ) : (
        creators.map((creator) => (
          <div key={creator.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{creator.name}</h4>
                  <p className="text-gray-500 text-sm">{creator.handle}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{creator.platform}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{creator.followers} followers</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-green-600">{creator.engagement} engagement</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">{creator.status}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{creator.posts} posts</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
            <p className="text-gray-600 mt-1">Campaign Details & Live Metrics</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'creators'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Creators ({creators.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'posts' && renderPostsTab()}
          {activeTab === 'creators' && renderCreatorsTab()}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsModal; 