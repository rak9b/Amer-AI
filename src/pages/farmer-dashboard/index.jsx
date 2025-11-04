import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import WeatherWidget from './components/WeatherWidget';
import AdvisoryCard from './components/AdvisoryCard';
import QuickActions from './components/QuickActions';
import CropStatusCard from './components/CropStatusCard';
import TasksList from './components/TasksList';
import ActivityFeed from './components/ActivityFeed';
import AchievementBadges from './components/AchievementBadges';
import EmergencyAlerts from './components/EmergencyAlerts';

const FarmerDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [farmerData] = useState({
    name: "আব্দুল করিম",
    location: "Rangpur, Bangladesh",
    totalLand: "4.5 acres",
    activeCrops: 3,
    joinedDate: "March 2023"
  });

  const [advisories] = useState([
    {
      id: 1,
      type: "weather",
      category: "Weather Advisory",
      title: "Prepare for Heavy Rainfall",
      description: "Monsoon rains expected in the next 48 hours. Ensure proper drainage in your rice fields and cover sensitive crops. Check irrigation channels for blockages.",
      priority: "high",
      timeAgo: "30 minutes ago",
      crop: "Rice, Vegetables"
    },
    {
      id: 2,
      type: "fertilizer",
      category: "Fertilizer Recommendation",
      title: "NPK Application for Potato",
      description: "Your potato crops are entering the tuber formation stage. Apply NPK fertilizer (20:20:20) at 150kg per acre for optimal yield.",
      priority: "medium",
      timeAgo: "2 hours ago",
      crop: "Potato"
    },
    {
      id: 3,
      type: "pest",
      category: "Pest Alert",
      title: "Brown Planthopper Detection",
      description: "Brown planthopper activity detected in nearby rice fields. Monitor your crops closely and apply preventive measures if necessary.",
      priority: "high",
      timeAgo: "4 hours ago",
      crop: "Rice"
    },
    {
      id: 4,
      type: "harvest",
      category: "Harvest Planning",
      title: "Tomato Harvest Ready",
      description: "Your tomato crops have reached maturity. Begin harvesting ripe fruits to maintain quality and encourage continued production.",
      priority: "medium",
      timeAgo: "6 hours ago",
      crop: "Tomato"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "সুপ্রভাত"; // Good Morning in Bangla
    if (hour < 17) return "শুভ দুপুর"; // Good Afternoon in Bangla
    return "শুভ সন্ধ্যা"; // Good Evening in Bangla
  };

  const handleAdvisoryAction = (advisory) => {
    console.log('Advisory action:', advisory);
    // Handle advisory action - could navigate to detailed view
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section with Greeting */}
        <section className="bg-gradient-to-br from-primary/10 via-harvest-gold/5 to-sky-blue/10 heritage-pattern">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-harvest-gradient rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-poppins font-bold text-primary">
                      {getGreeting()}, {farmerData?.name}!
                    </h1>
                    <p className="text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={16} className="mr-1" />
                      {farmerData?.location} • {farmerData?.totalLand} • {farmerData?.activeCrops} Active Crops
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/50 rounded-organic p-4 text-center">
                    <Icon name="Sprout" size={24} className="text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold text-primary">{farmerData?.activeCrops}</div>
                    <div className="text-xs text-muted-foreground">Active Crops</div>
                  </div>
                  <div className="bg-white/50 rounded-organic p-4 text-center">
                    <Icon name="Calendar" size={24} className="text-success mx-auto mb-2" />
                    <div className="text-lg font-bold text-success">12</div>
                    <div className="text-xs text-muted-foreground">Months Active</div>
                  </div>
                  <div className="bg-white/50 rounded-organic p-4 text-center">
                    <Icon name="TrendingUp" size={24} className="text-warning mx-auto mb-2" />
                    <div className="text-lg font-bold text-warning">85%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="bg-white/50 rounded-organic p-4 text-center">
                    <Icon name="Award" size={24} className="text-accent mx-auto mb-2" />
                    <div className="text-lg font-bold text-accent">7</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-80">
                <WeatherWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Alerts */}
        <section className="container mx-auto px-4 py-6">
          <EmergencyAlerts />
        </section>

        {/* Main Dashboard Content */}
        <section className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* AI Advisory Cards */}
              <div className="bg-card rounded-organic p-6 shadow-natural">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-poppins font-bold text-foreground">AI Recommendations</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live Updates</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {advisories?.map((advisory) => (
                    <AdvisoryCard
                      key={advisory?.id}
                      advisory={advisory}
                      onAction={handleAdvisoryAction}
                    />
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    to="/knowledge-repository"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-natural font-medium"
                  >
                    <span>View All Recommendations</span>
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                </div>
              </div>

              {/* Tasks List */}
              <TasksList />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Crop Status */}
              <CropStatusCard />
              
              {/* Achievement Badges */}
              <AchievementBadges />
              
              {/* Activity Feed */}
              <ActivityFeed />
            </div>
          </div>
        </section>

        {/* Bottom Navigation for Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-40">
          <div className="grid grid-cols-5 h-16">
            <Link
              to="/farmer-dashboard"
              className="flex flex-col items-center justify-center space-y-1 text-primary bg-primary/10"
            >
              <Icon name="LayoutDashboard" size={20} />
              <span className="text-xs font-medium">Dashboard</span>
            </Link>
            <Link
              to="/disease-detection-lab"
              className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-natural"
            >
              <Icon name="Camera" size={20} />
              <span className="text-xs">Detect</span>
            </Link>
            <Link
              to="/community-forums"
              className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-natural"
            >
              <Icon name="Users" size={20} />
              <span className="text-xs">Community</span>
            </Link>
            <Link
              to="/expert-network"
              className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-natural"
            >
              <Icon name="GraduationCap" size={20} />
              <span className="text-xs">Experts</span>
            </Link>
            <Link
              to="/knowledge-repository"
              className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-natural"
            >
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Learn</span>
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default FarmerDashboard;