import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import CategoryTabs from './components/CategoryTabs';
import FeaturedContent from './components/FeaturedContent';
import ContentCard from './components/ContentCard';
import QuickTools from './components/QuickTools';
import RecentlyViewed from './components/RecentlyViewed';
import BookmarkedContent from './components/BookmarkedContent';

const KnowledgeRepository = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data for featured content
  const featuredContent = [
  {
    id: 'featured-1',
    title: 'Advanced Rice Cultivation Techniques for Maximum Yield',
    description: 'Learn modern rice farming methods that can increase your harvest by up to 40% using sustainable practices.',
    image: "https://images.unsplash.com/photo-1599496675693-5e4741b3d6e8",
    imageAlt: 'Farmer working in green rice paddy field with traditional tools',
    type: 'guide',
    isNew: true,
    views: 15420,
    readTime: 12,
    author: {
      name: 'Dr. Rashida Begum',
      avatar: "https://images.unsplash.com/photo-1670371325848-9f462d5615f7",
      avatarAlt: 'Professional headshot of middle-aged Bangladeshi woman agricultural expert in white lab coat'
    }
  },
  {
    id: 'featured-2',
    title: 'Monsoon Farming: Complete Video Guide',
    description: 'Comprehensive video series covering all aspects of monsoon season farming in Bangladesh.',
    image: "https://images.unsplash.com/photo-1474290938751-6a20b64917d6",
    imageAlt: 'Heavy monsoon rain falling on lush green agricultural fields with farmers working',
    type: 'video',
    isNew: false,
    views: 8930,
    readTime: 25,
    author: {
      name: 'Mohammad Karim',
      avatar: "https://images.unsplash.com/photo-1622676566956-b42b50c84c31",
      avatarAlt: 'Smiling Bangladeshi male farmer in traditional white shirt standing in crop field'
    }
  }];


  // Mock data for content library
  const contentLibrary = [
  {
    id: 'content-1',
    title: 'Organic Pest Control Methods for Vegetable Gardens',
    description: 'Discover natural and effective ways to protect your vegetables from pests without harmful chemicals. Learn about companion planting, beneficial insects, and homemade organic sprays.',
    image: "https://images.unsplash.com/photo-1675851778279-87d854940cc1",
    imageAlt: 'Close-up of healthy green vegetables growing in organic garden with natural pest control methods',
    type: 'guide',
    difficulty: 'beginner',
    tags: ['organic', 'pest-control', 'vegetables', 'sustainable'],
    views: 12450,
    likes: 892,
    comments: 156,
    readTime: 8,
    isBookmarked: false,
    isExpertVerified: true,
    publishedDate: '2 days ago',
    author: {
      name: 'Fatima Khatun',
      avatar: "https://images.unsplash.com/photo-1627902874918-d42bf92419a1",
      avatarAlt: 'Professional portrait of young Bangladeshi woman agricultural specialist in green field jacket'
    }
  },
  {
    id: 'content-2',
    title: 'Soil Testing and Nutrient Management',
    description: 'Complete guide to understanding your soil composition and managing nutrients for optimal crop growth. Includes DIY testing methods and fertilizer recommendations.',
    image: "https://images.unsplash.com/photo-1638429611224-84a71b809b96",
    imageAlt: 'Farmer hands holding rich dark soil with visible nutrients and organic matter',
    type: 'article',
    difficulty: 'intermediate',
    tags: ['soil-health', 'nutrients', 'testing', 'fertilizer'],
    views: 9876,
    likes: 654,
    comments: 89,
    readTime: 15,
    isBookmarked: true,
    isExpertVerified: true,
    publishedDate: '1 week ago',
    author: {
      name: 'Dr. Abdul Rahman',
      avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
      avatarAlt: 'Professional headshot of middle-aged Bangladeshi male soil scientist in white shirt'
    }
  },
  {
    id: 'content-3',
    title: 'Water Management in Rice Cultivation',
    description: 'Master the art of water management in rice fields. Learn about irrigation timing, water depth control, and drought-resistant techniques.',
    image: "https://images.unsplash.com/photo-1669454570869-086324ae9171",
    imageAlt: 'Aerial view of flooded rice terraces with proper water management systems in rural Bangladesh',
    type: 'video',
    difficulty: 'advanced',
    tags: ['rice', 'irrigation', 'water-management', 'efficiency'],
    views: 18230,
    likes: 1205,
    comments: 234,
    readTime: 22,
    duration: '22:15',
    isBookmarked: false,
    isExpertVerified: true,
    publishedDate: '3 days ago',
    author: {
      name: 'Engineer Nasir Ahmed',
      avatar: "https://images.unsplash.com/photo-1591825356963-362fede12311",
      avatarAlt: 'Professional portrait of Bangladeshi irrigation engineer in blue shirt standing near water canal'
    }
  },
  {
    id: 'content-4',
    title: 'Seasonal Crop Calendar for Bangladesh',
    description: 'Interactive calendar showing optimal planting and harvesting times for major crops across different regions of Bangladesh.',
    image: "https://images.unsplash.com/photo-1631702193353-f63d7eadc5c9",
    imageAlt: 'Colorful seasonal calendar overlay on Bangladesh agricultural landscape showing different crop cycles',
    type: 'calendar',
    difficulty: 'beginner',
    tags: ['calendar', 'seasons', 'planting', 'harvesting'],
    views: 25670,
    likes: 1876,
    comments: 345,
    readTime: 5,
    isBookmarked: true,
    isExpertVerified: true,
    publishedDate: '1 month ago',
    author: {
      name: 'Agricultural Department',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4a17198-1762203241421.png",
      avatarAlt: 'Official logo of Bangladesh Agricultural Research Institute with green and gold colors'
    }
  },
  {
    id: 'content-5',
    title: 'Climate-Smart Farming Techniques',
    description: 'Adapt your farming practices to climate change with these innovative techniques. Learn about drought-resistant crops and weather prediction.',
    image: "https://images.unsplash.com/photo-1623136299195-570a06bdae6b",
    imageAlt: 'Modern greenhouse with climate control systems and sustainable farming technology',
    type: 'guide',
    difficulty: 'intermediate',
    tags: ['climate-change', 'adaptation', 'sustainability', 'innovation'],
    views: 14520,
    likes: 987,
    comments: 178,
    readTime: 18,
    isBookmarked: false,
    isExpertVerified: true,
    publishedDate: '5 days ago',
    author: {
      name: 'Dr. Shahida Islam',
      avatar: "https://images.unsplash.com/photo-1707944745905-1ba3ef7c0c83",
      avatarAlt: 'Professional portrait of Bangladeshi climate scientist in white lab coat with research equipment'
    }
  },
  {
    id: 'content-6',
    title: 'Fertilizer Calculator Tool',
    description: 'Calculate the exact amount of fertilizer needed for your crops based on soil type, crop variety, and field size.',
    image: "https://images.unsplash.com/photo-1684231300604-bf764429bfa5",
    imageAlt: 'Digital calculator interface showing fertilizer calculations with bags of organic fertilizer in background',
    type: 'calculator',
    difficulty: 'beginner',
    tags: ['calculator', 'fertilizer', 'nutrients', 'precision'],
    views: 31240,
    likes: 2156,
    comments: 456,
    readTime: 3,
    isBookmarked: true,
    isExpertVerified: true,
    publishedDate: '2 weeks ago',
    author: {
      name: 'AgriTech Solutions',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_128e2cdd3-1762203240332.png",
      avatarAlt: 'Modern agricultural technology company logo with digital farming symbols'
    }
  }];


  // Mock data for recently viewed content
  const recentlyViewed = [
  {
    id: 'recent-1',
    title: 'Organic Pest Control Methods for Vegetable Gardens',
    image: "https://images.unsplash.com/photo-1675851778279-87d854940cc1",
    imageAlt: 'Close-up of healthy green vegetables in organic garden with natural pest control',
    type: 'guide',
    viewedAt: '2 hours ago'
  },
  {
    id: 'recent-2',
    title: 'Water Management in Rice Cultivation',
    image: "https://images.unsplash.com/photo-1702911172401-5bf19d012508",
    imageAlt: 'Aerial view of rice terraces with water management systems',
    type: 'video',
    viewedAt: '1 day ago'
  },
  {
    id: 'recent-3',
    title: 'Fertilizer Calculator Tool',
    image: "https://images.unsplash.com/photo-1666141865663-df3bb55605f1",
    imageAlt: 'Digital fertilizer calculator with organic fertilizer bags',
    type: 'calculator',
    viewedAt: '3 days ago'
  }];


  // Mock data for bookmarked content
  const bookmarkedContent = contentLibrary?.filter((item) => item?.isBookmarked);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (categoryId, optionValue, checked) => {
    setFilters((prev) => ({
      ...prev,
      [categoryId]: checked ?
      [...(prev?.[categoryId] || []), optionValue] :
      (prev?.[categoryId] || [])?.filter((item) => item !== optionValue)
    }));
  };

  const handleBookmark = (contentId) => {
    // Handle bookmark toggle logic
    console.log('Bookmark toggled for:', contentId);
  };

  const handleViewContent = (content) => {
    // Handle content view logic
    console.log('Viewing content:', content);
  };

  const handleToolSelect = (toolId) => {
    // Handle tool selection logic
    console.log('Tool selected:', toolId);
  };

  const handleClearHistory = () => {
    // Handle clear history logic
    console.log('History cleared');
  };

  const handleRemoveBookmark = (contentId) => {
    // Handle bookmark removal logic
    console.log('Bookmark removed:', contentId);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.flat()?.length;
  };

  const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'rating', label: 'Highest Rated' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="BookOpen" size={32} className="text-harvest-gold" />
                <h1 className="font-poppins font-bold text-3xl lg:text-4xl">Knowledge Repository</h1>
              </div>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Comprehensive farming guides, expert articles, and interactive tools to enhance your agricultural knowledge and practices.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
              { label: 'Total Articles', value: '1,247', icon: 'FileText' },
              { label: 'Video Tutorials', value: '156', icon: 'Play' },
              { label: 'Interactive Tools', value: '45', icon: 'Calculator' },
              { label: 'Expert Authors', value: '89', icon: 'Users' }]?.
              map((stat, index) =>
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-organic p-4 text-center">
                  <Icon name={stat?.icon} size={24} className="text-harvest-gold mx-auto mb-2" />
                  <div className="font-poppins font-bold text-xl">{stat?.value}</div>
                  <div className="text-sm opacity-80">{stat?.label}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterToggle={handleFilterToggle}
              activeFilters={getActiveFilterCount()} />

          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory} />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Featured Content */}
              <FeaturedContent
                featuredItems={featuredContent}
                onViewContent={handleViewContent} />


              {/* Content Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-organic p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Showing {contentLibrary?.length} results
                  </span>
                  {searchQuery &&
                  <span className="text-sm text-primary">
                      for "{searchQuery}"
                    </span>
                  }
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="text-sm border border-border rounded-organic px-3 py-2 bg-background">

                    {sortOptions?.map((option) =>
                    <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    )}
                  </select>

                  <div className="flex border border-border rounded-organic overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      iconName="Grid3X3"
                      iconSize={16}
                      onClick={() => setViewMode('grid')}
                      className="rounded-none" />

                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      iconName="List"
                      iconSize={16}
                      onClick={() => setViewMode('list')}
                      className="rounded-none" />

                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
              }>
                {contentLibrary?.map((content) =>
                <ContentCard
                  key={content?.id}
                  content={content}
                  onBookmark={handleBookmark}
                  onView={handleViewContent} />

                )}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="right">

                  Load More Content
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filter Panel */}
              <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFilterChange={handleFilterChange} />


              {/* Quick Tools */}
              <QuickTools onToolSelect={handleToolSelect} />

              {/* Recently Viewed */}
              <RecentlyViewed
                recentItems={recentlyViewed}
                onViewContent={handleViewContent}
                onClearHistory={handleClearHistory} />


              {/* Bookmarked Content */}
              <BookmarkedContent
                bookmarkedItems={bookmarkedContent}
                onViewContent={handleViewContent}
                onRemoveBookmark={handleRemoveBookmark} />

            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default KnowledgeRepository;