import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ExpertCard from './components/ExpertCard';
import ExpertFilters from './components/ExpertFilters';
import ExpertStats from './components/ExpertStats';
import FeaturedExperts from './components/FeaturedExperts';
import ExpertCategories from './components/ExpertCategories';
import ConsultationBookingModal from './components/ConsultationBookingModal';

const ExpertNetwork = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialization: 'all',
    location: 'all',
    experience: 'all',
    priceRange: 'all',
    availability: 'all'
  });

  const stats = {
    totalExperts: "1,247",
    verifiedExperts: "892",
    consultationsToday: "156",
    averageRating: "4.8"
  };

  const categories = [
  { id: 'crop-diseases', name: 'Crop Diseases', icon: 'Bug', expertCount: 156 },
  { id: 'soil-management', name: 'Soil Management', icon: 'Mountain', expertCount: 134 },
  { id: 'pest-control', name: 'Pest Control', icon: 'Shield', expertCount: 98 },
  { id: 'irrigation', name: 'Irrigation', icon: 'Droplets', expertCount: 87 },
  { id: 'organic-farming', name: 'Organic Farming', icon: 'Leaf', expertCount: 76 },
  { id: 'livestock', name: 'Livestock', icon: 'Cow', expertCount: 65 },
  { id: 'agribusiness', name: 'Agribusiness', icon: 'TrendingUp', expertCount: 54 },
  { id: 'climate-adaptation', name: 'Climate Adaptation', icon: 'CloudRain', expertCount: 43 }];


  const featuredExperts = [
  {
    id: 1,
    name: "Dr. Rashida Khatun",
    title: "Senior Agricultural Scientist",
    specialization: "Crop Disease Management",
    avatar: "https://images.unsplash.com/photo-1670371325848-9f462d5615f7",
    avatarAlt: "Professional woman in white lab coat with hijab smiling in agricultural research facility",
    rating: 4.9,
    reviewCount: 234,
    location: "Dhaka Division",
    experience: 15,
    farmersHelped: 1200,
    consultationFee: 800,
    expertise: ["Rice Diseases", "Pest Management", "Soil Health"],
    isVerified: true
  },
  {
    id: 2,
    name: "Prof. Abdul Karim",
    title: "Agricultural Extension Officer",
    specialization: "Sustainable Farming",
    avatar: "https://images.unsplash.com/photo-1624933909651-4cd56df5e97b",
    avatarAlt: "Middle-aged man with beard in traditional white shirt standing in green rice field",
    rating: 4.8,
    reviewCount: 189,
    location: "Rajshahi Division",
    experience: 20,
    farmersHelped: 950,
    consultationFee: 600,
    expertise: ["Organic Methods", "Water Management", "Crop Rotation"],
    isVerified: true
  },
  {
    id: 3,
    name: "Dr. Fatima Begum",
    title: "Soil Science Specialist",
    specialization: "Soil Health & Nutrition",
    avatar: "https://images.unsplash.com/photo-1681958757441-2ec7b81fb0d9",
    avatarAlt: "Professional woman in green field jacket examining soil samples in agricultural field",
    rating: 4.9,
    reviewCount: 156,
    location: "Chittagong Division",
    experience: 12,
    farmersHelped: 780,
    consultationFee: 700,
    expertise: ["Soil Testing", "Fertilizer Planning", "Nutrient Management"],
    isVerified: true
  }];


  const allExperts = [
  ...featuredExperts,
  {
    id: 4,
    name: "Mohammad Hasan",
    title: "Irrigation Specialist",
    specialization: "Water Management Systems",
    avatar: "https://images.unsplash.com/photo-1652879463120-376583d714b1",
    avatarAlt: "Young man in blue shirt standing near irrigation canal in rural farming area",
    rating: 4.7,
    reviewCount: 98,
    location: "Khulna Division",
    experience: 8,
    farmersHelped: 450,
    consultationFee: 500,
    expertise: ["Drip Irrigation", "Water Conservation", "Pump Systems"],
    isVerified: true
  },
  {
    id: 5,
    name: "Dr. Nasreen Akter",
    title: "Entomologist",
    specialization: "Integrated Pest Management",
    avatar: "https://images.unsplash.com/photo-1535531888087-da86f4ff0a85",
    avatarAlt: "Woman scientist in field gear examining crop plants with magnifying glass",
    rating: 4.8,
    reviewCount: 167,
    location: "Sylhet Division",
    experience: 14,
    farmersHelped: 890,
    consultationFee: 750,
    expertise: ["Biological Control", "Pesticide Management", "Crop Protection"],
    isVerified: true
  },
  {
    id: 6,
    name: "Aminul Islam",
    title: "Livestock Consultant",
    specialization: "Animal Husbandry",
    avatar: "https://images.unsplash.com/photo-1648159121923-b43ec328f043",
    avatarAlt: "Man in traditional vest standing with cattle in rural farm setting",
    rating: 4.6,
    reviewCount: 134,
    location: "Rangpur Division",
    experience: 18,
    farmersHelped: 670,
    consultationFee: 600,
    expertise: ["Cattle Management", "Poultry Farming", "Feed Optimization"],
    isVerified: true
  }];


  const handleViewProfile = (expert) => {
    console.log('Viewing profile for:', expert?.name);
  };

  const handleBookConsultation = (expert) => {
    setSelectedExpert(expert);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking consultation:', bookingData);
    setIsBookingModalOpen(false);
    setSelectedExpert(null);
  };

  const handleClearFilters = () => {
    setFilters({
      specialization: 'all',
      location: 'all',
      experience: 'all',
      priceRange: 'all',
      availability: 'all'
    });
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const filteredExperts = allExperts?.filter((expert) => {
    const matchesSearch = expert?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    expert?.specialization?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-earth-to-sky text-white py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-poppins font-bold mb-6">
                Connect with Agricultural Experts
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Get professional guidance from verified agricultural specialists across Bangladesh. 
                Book consultations, ask questions, and grow your farming knowledge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  iconSize={20}
                  className="w-full sm:w-auto">

                  Find Expert Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  iconSize={20}
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">

                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <ExpertStats stats={stats} />
          </div>
        </section>

        {/* Expert Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <ExpertCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory} />

          </div>
        </section>

        {/* Featured Experts */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <FeaturedExperts
              experts={featuredExperts}
              onViewProfile={handleViewProfile}
              onBookConsultation={handleBookConsultation} />

          </div>
        </section>

        {/* Filters and Expert List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="mb-8">
              <ExpertFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery} />

            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-poppins font-bold text-foreground">All Experts</h2>
                <p className="text-muted-foreground">
                  Showing {filteredExperts?.length} of {allExperts?.length} experts
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={14}>

                  Sort by Rating
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredExperts?.map((expert) =>
              <ExpertCard
                key={expert?.id}
                expert={expert}
                onViewProfile={handleViewProfile}
                onBookConsultation={handleBookConsultation} />

              )}
            </div>

            {filteredExperts?.length === 0 &&
            <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
                  No experts found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button
                variant="outline"
                onClick={handleClearFilters}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}>

                  Clear Filters
                </Button>
              </div>
            }
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Become an Expert on AgriSmart
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Share your agricultural knowledge and help farmers across Bangladesh. 
              Join our network of verified experts and earn while making a difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={20}>

                Apply as Expert
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="FileText"
                iconPosition="left"
                iconSize={20}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">

                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Booking Modal */}
      {selectedExpert &&
      <ConsultationBookingModal
        expert={selectedExpert}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedExpert(null);
        }}
        onBooking={handleBookingSubmit} />

      }
    </div>);

};

export default ExpertNetwork;