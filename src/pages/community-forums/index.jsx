import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ForumHeader from './components/ForumHeader';
import CategorySidebar from './components/CategorySidebar';
import ForumPost from './components/ForumPost';
import TrendingTopics from './components/TrendingTopics';
import CreatePostModal from './components/CreatePostModal';
import ExpertBadge from './components/ExpertBadge';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityForums = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showSidebar, setShowSidebar] = useState(false);

  // Mock data for forum posts
  const mockPosts = [
  {
    id: 1,
    title: "Rice blast disease affecting my crops - need urgent help",
    content: `I'm facing a serious issue with rice blast disease in my 2-acre paddy field in Comilla district. The disease appeared after the recent heavy rains and is spreading rapidly.\n\nSymptoms I'm observing:\n• Brown spots on leaves with gray centers\n• Neck rot on some panicles\n• Reduced grain filling\n\nI've tried copper-based fungicides but the spread continues. Has anyone dealt with similar issues? What organic or chemical treatments worked for you?`,
    author: {
      name: "Rahman Ahmed",
      avatar: "https://images.unsplash.com/photo-1663601160610-11f6c275817e",
      avatarAlt: "Middle-aged Bangladeshi farmer with mustache wearing traditional white shirt",
      location: "Comilla, Bangladesh",
      isExpert: false
    },
    category: "pest-control",
    categoryName: "Pest & Disease Control",
    tags: ["rice", "disease", "fungicide", "monsoon"],
    images: [
    {
      url: "https://images.unsplash.com/photo-1552530693-3714da94a961",
      alt: "Close-up of rice plant leaves showing brown spots with gray centers indicating blast disease"
    },
    {
      url: "https://images.unsplash.com/photo-1695547952977-0975f0ab7c48",
      alt: "Wide view of rice paddy field with affected plants showing disease symptoms"
    }],

    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    upvotes: 23,
    downvotes: 2,
    userVote: null,
    views: 156,
    isBookmarked: false,
    replies: [
    {
      id: 1,
      content: "I faced similar issue last season. Try Tricyclazole 75% WP at 0.6g/L. Apply during early morning or evening. Also ensure proper drainage to reduce humidity.",
      author: {
        name: "Dr. Fatima Khatun",
        avatar: "https://images.unsplash.com/photo-1727835869340-dd39ab892b7f",
        avatarAlt: "Professional woman agricultural scientist wearing hijab and lab coat",
        isExpert: true
      },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 18
    }]

  },
  {
    id: 2,
    title: "Best organic fertilizer combinations for tomato cultivation",
    content: `Planning to start tomato cultivation in my 1-acre plot near Jessore. I want to go completely organic this season.\n\nSeeking advice on:\n• Best organic fertilizer combinations\n• Application timing and quantities\n• Companion planting suggestions\n• Pest management without chemicals\n\nSoil test shows slightly acidic pH (6.2) with moderate organic matter. Any experienced organic farmers here who can share their successful recipes?`,
    author: {
      name: "Nasir Hossain",
      avatar: "https://images.unsplash.com/photo-1603642282073-0102b1ccb938",
      avatarAlt: "Young Bangladeshi farmer in checkered shirt smiling at camera in field",
      location: "Jessore, Bangladesh",
      isExpert: false
    },
    category: "vegetables",
    categoryName: "Vegetable Farming",
    tags: ["tomato", "organic", "fertilizer", "soil-health"],
    images: [
    {
      url: "https://images.unsplash.com/photo-1721521221421-fd4fe6822ccf",
      alt: "Healthy tomato plants growing in organic farm with mulched soil"
    }],

    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    upvotes: 31,
    downvotes: 1,
    userVote: "up",
    views: 234,
    isBookmarked: true,
    replies: [
    {
      id: 1,
      content: "For organic tomatoes, I use cow dung compost (5 tons/acre) + neem cake (200kg/acre) + bone meal (100kg/acre). Apply in 3 splits. Works great!",
      author: {
        name: "Karim Uddin",
        avatar: "https://images.unsplash.com/photo-1641190116877-0025dcfc9d76",
        avatarAlt: "Experienced farmer with gray beard wearing traditional lungi and shirt",
        isExpert: false
      },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      likes: 12
    },
    {
      id: 2,
      content: "Add vermicompost for better soil structure. Also try marigold as companion plant - it repels many pests naturally.",
      author: {
        name: "Rashida Begum",
        avatar: "https://images.unsplash.com/photo-1709544161154-80537d029d88",
        avatarAlt: "Middle-aged woman farmer wearing colorful sari and head covering",
        isExpert: false
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 8
    }]

  },
  {
    id: 3,
    title: "Monsoon preparation checklist for small farmers",
    content: `With monsoon approaching, I want to share a comprehensive checklist that has helped me protect my crops over the years:\n\n**Pre-Monsoon Tasks:**\n• Clean drainage channels and waterways\n• Repair farm boundaries and embankments\n• Stock up on fungicides and bactericides\n• Harvest mature crops before heavy rains\n• Prepare raised beds for vegetable cultivation\n\n**During Monsoon:**\n• Monitor weather forecasts daily\n• Ensure proper water drainage\n• Apply preventive fungicide sprays\n• Store harvested crops in dry places\n\nWhat would you add to this list? Share your monsoon preparation tips!`,
    author: {
      name: "Abdul Majid",
      avatar: "https://images.unsplash.com/photo-1721469436871-7166d6868f20",
      avatarAlt: "Senior farmer with white beard wearing white cap and traditional shirt",
      location: "Sylhet, Bangladesh",
      isExpert: true
    },
    category: "weather",
    categoryName: "Weather & Climate",
    tags: ["monsoon", "preparation", "drainage", "crop-protection"],
    images: [
    {
      url: "https://images.unsplash.com/photo-1723540066891-0ee65fd37651",
      alt: "Farmer checking drainage channels in rice field during monsoon preparation"
    },
    {
      url: "https://images.unsplash.com/photo-1592581963833-aa73612f8676",
      alt: "Well-maintained farm drainage system with clear water channels"
    }],

    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    upvotes: 45,
    downvotes: 0,
    userVote: null,
    views: 389,
    isBookmarked: false,
    replies: []
  }];


  // Mock expert data
  const featuredExperts = [
  {
    id: 1,
    name: "Dr. Fatima Khatun",
    title: "Senior Agricultural Scientist",
    avatar: "https://images.unsplash.com/photo-1727835869340-dd39ab892b7f",
    avatarAlt: "Professional woman agricultural scientist wearing hijab and lab coat",
    expertise: ["Crop Specialist", "Pest Control", "Soil Expert"],
    answersGiven: 234,
    helpfulVotes: 1876,
    reputation: 4.9
  },
  {
    id: 2,
    name: "Prof. Aminul Islam",
    title: "Plant Pathology Expert",
    avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    avatarAlt: "Distinguished professor in white shirt and glasses in laboratory setting",
    expertise: ["Pest Control", "Agricultural Engineer"],
    answersGiven: 189,
    helpfulVotes: 1543,
    reputation: 4.8
  }];


  useEffect(() => {
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered?.filter((post) => post?.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter((post) =>
      post?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      post?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      post?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Sort posts
    switch (sortBy) {
      case "recent":
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "popular":
        filtered?.sort((a, b) => b?.upvotes - b?.downvotes - (a?.upvotes - a?.downvotes));
        break;
      case "mostReplies":
        filtered?.sort((a, b) => (b?.replies?.length || 0) - (a?.replies?.length || 0));
        break;
      default:
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const handleCreatePost = () => {
    setIsCreateModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {
    if (filters?.category !== undefined) {
      setSelectedCategory(filters?.category);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleVote = (postId, voteType) => {
    setPosts((prevPosts) =>
    prevPosts?.map((post) => {
      if (post?.id === postId) {
        const newPost = { ...post };

        // Remove previous vote if exists
        if (post?.userVote === 'up') {
          newPost.upvotes -= 1;
        } else if (post?.userVote === 'down') {
          newPost.downvotes -= 1;
        }

        // Add new vote
        if (voteType === 'up' && post?.userVote !== 'up') {
          newPost.upvotes += 1;
          newPost.userVote = 'up';
        } else if (voteType === 'down' && post?.userVote !== 'down') {
          newPost.downvotes += 1;
          newPost.userVote = 'down';
        } else {
          newPost.userVote = null;
        }

        return newPost;
      }
      return post;
    })
    );
  };

  const handleReply = (postId, replyContent) => {
    const newReply = {
      id: Date.now(),
      content: replyContent,
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1729100125245-9c5b091e8081",
        avatarAlt: "Current user profile photo",
        isExpert: false
      },
      createdAt: new Date()?.toISOString(),
      likes: 0
    };

    setPosts((prevPosts) =>
    prevPosts?.map((post) => {
      if (post?.id === postId) {
        return {
          ...post,
          replies: [...(post?.replies || []), newReply]
        };
      }
      return post;
    })
    );
  };

  const handleBookmark = (postId) => {
    setPosts((prevPosts) =>
    prevPosts?.map((post) => {
      if (post?.id === postId) {
        return {
          ...post,
          isBookmarked: !post?.isBookmarked
        };
      }
      return post;
    })
    );
  };

  const handleSubmitPost = async (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1719735903589-2012c168d128",
        avatarAlt: "Current user profile photo",
        location: "Dhaka, Bangladesh",
        isExpert: false
      },
      categoryName: mockPosts?.find((p) => p?.category === postData?.category)?.categoryName || "General",
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      views: 0,
      isBookmarked: false,
      replies: []
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "mostReplies", label: "Most Replies" }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <ForumHeader
          onCreatePost={handleCreatePost}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange} />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowSidebar(!showSidebar)}
                iconName="Filter"
                iconPosition="left"
                className="mb-4">

                Categories
              </Button>
            </div>

            {/* Sidebar */}
            <div className={`lg:block ${showSidebar ? 'block' : 'hidden'} lg:w-80 flex-shrink-0`}>
              <div className="sticky top-24 space-y-6">
                <CategorySidebar
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect} />

              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-poppins font-semibold text-foreground">
                  {selectedCategory === "all" ? "All Discussions" : `${selectedCategory?.charAt(0)?.toUpperCase() + selectedCategory?.slice(1)} Discussions`}
                  <span className="text-muted-foreground ml-2">({filteredPosts?.length})</span>
                </h2>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-organic text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">

                    {sortOptions?.map((option) =>
                    <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    )}
                  </select>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-6">
                {filteredPosts?.length > 0 ?
                filteredPosts?.map((post) =>
                <ForumPost
                  key={post?.id}
                  post={post}
                  onVote={handleVote}
                  onReply={handleReply}
                  onBookmark={handleBookmark} />

                ) :

                <div className="text-center py-12">
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-poppins font-medium text-foreground mb-2">
                      No discussions found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "Try adjusting your search terms" : "Be the first to start a discussion in this category"}
                    </p>
                    <Button
                    variant="default"
                    onClick={handleCreatePost}
                    iconName="Plus"
                    iconPosition="left">

                      Create New Post
                    </Button>
                  </div>
                }
              </div>

              {/* Load More */}
              {filteredPosts?.length > 0 &&
              <div className="text-center mt-8">
                  <Button
                  variant="outline"
                  iconName="ChevronDown"
                  iconPosition="left">

                    Load More Discussions
                  </Button>
                </div>
              }
            </div>

            {/* Right Sidebar */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <TrendingTopics />
                
                {/* Featured Experts */}
                <div className="bg-card border border-border rounded-organic shadow-natural p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
                    <Icon name="Award" size={20} className="mr-2" />
                    Featured Experts
                  </h3>
                  <div className="space-y-4">
                    {featuredExperts?.map((expert) =>
                    <ExpertBadge
                      key={expert?.id}
                      expert={expert}
                      size="small" />

                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitPost} />

    </div>);

};

export default CommunityForums;