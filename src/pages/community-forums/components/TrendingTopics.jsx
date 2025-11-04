import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = () => {
  const trendingTopics = [
    {
      id: 1,
      title: "Rice blast disease prevention",
      category: "Pest Control",
      posts: 45,
      trend: "up",
      trendPercentage: 23,
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      id: 2,
      title: "Monsoon preparation checklist",
      category: "Weather",
      posts: 38,
      trend: "up",
      trendPercentage: 18,
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      id: 3,
      title: "Organic fertilizer recipes",
      category: "Soil Health",
      posts: 32,
      trend: "up",
      trendPercentage: 15,
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      id: 4,
      title: "Vegetable market prices",
      category: "Market",
      posts: 28,
      trend: "down",
      trendPercentage: 8,
      icon: "TrendingDown",
      color: "text-destructive"
    },
    {
      id: 5,
      title: "Drip irrigation setup",
      category: "Technology",
      posts: 24,
      trend: "up",
      trendPercentage: 12,
      icon: "TrendingUp",
      color: "text-success"
    }
  ];

  const hotDiscussions = [
    {
      id: 1,
      title: "Best time to plant winter vegetables in Dhaka?",
      author: "Rahman Ahmed",
      replies: 23,
      lastActivity: "2 hours ago",
      isHot: true
    },
    {
      id: 2,
      title: "Dealing with aphids on tomato plants",
      author: "Dr. Fatima Khatun",
      replies: 18,
      lastActivity: "4 hours ago",
      isExpert: true
    },
    {
      id: 3,
      title: "Soil pH testing methods for small farmers",
      author: "Karim Uddin",
      replies: 15,
      lastActivity: "6 hours ago",
      isHot: true
    },
    {
      id: 4,
      title: "Organic pest control for rice fields",
      author: "Nasir Hossain",
      replies: 12,
      lastActivity: "8 hours ago",
      isExpert: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-card border border-border rounded-organic shadow-natural p-6">
        <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2" />
          Trending Topics
        </h3>
        
        <div className="space-y-3">
          {trendingTopics?.map((topic) => (
            <div
              key={topic?.id}
              className="flex items-center justify-between p-3 rounded-organic hover:bg-muted transition-natural cursor-pointer group"
            >
              <div className="flex-1">
                <h4 className="font-inter font-medium text-foreground group-hover:text-primary transition-natural">
                  {topic?.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                  <span>{topic?.category}</span>
                  <span>•</span>
                  <span>{topic?.posts} posts</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${topic?.color}`}>
                  <Icon name={topic?.icon} size={14} />
                  <span className="text-xs font-medium">{topic?.trendPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Hot Discussions */}
      <div className="bg-card border border-border rounded-organic shadow-natural p-6">
        <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
          <Icon name="Flame" size={20} className="mr-2" />
          Hot Discussions
        </h3>
        
        <div className="space-y-4">
          {hotDiscussions?.map((discussion) => (
            <div
              key={discussion?.id}
              className="p-4 rounded-organic hover:bg-muted transition-natural cursor-pointer group border border-transparent hover:border-border"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-inter font-medium text-foreground group-hover:text-primary transition-natural flex-1 pr-2">
                  {discussion?.title}
                </h4>
                {discussion?.isHot && (
                  <Icon name="Flame" size={16} className="text-orange-500 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>{discussion?.author}</span>
                  {discussion?.isExpert && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      Expert
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="MessageSquare" size={12} />
                    <span>{discussion?.replies}</span>
                  </span>
                  <span>{discussion?.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Community Stats */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-organic p-6">
        <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Community Activity
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-poppins font-bold text-primary mb-1">156</div>
            <div className="text-xs text-muted-foreground">Posts Today</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-poppins font-bold text-accent mb-1">89</div>
            <div className="text-xs text-muted-foreground">Active Now</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-poppins font-bold text-success mb-1">23</div>
            <div className="text-xs text-muted-foreground">Expert Answers</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-poppins font-bold text-secondary mb-1">67</div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;