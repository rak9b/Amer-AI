import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create the App Context
const AppContext = createContext();

// App Provider Component
export const AppProvider = ({ children }) => {
  // User preferences
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [notifications, setNotifications] = useLocalStorage('notifications', {
    weather: true,
    crop: true,
    pest: true,
    market: false,
    tips: true,
  });
  
  // App state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected crops for the user
  const [selectedCrops, setSelectedCrops] = useLocalStorage('selectedCrops', []);
  
  // User's farming experience level
  const [experienceLevel, setExperienceLevel] = useLocalStorage('experienceLevel', 'beginner');

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Update notification preferences
  const updateNotifications = (newNotifications) => {
    setNotifications(newNotifications);
  };

  // Add a crop to selected crops
  const addCrop = (cropId) => {
    if (!selectedCrops.includes(cropId)) {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };

  // Remove a crop from selected crops
  const removeCrop = (cropId) => {
    setSelectedCrops(selectedCrops.filter(id => id !== cropId));
  };

  const value = {
    // Preferences
    language,
    setLanguage,
    notifications,
    updateNotifications,
    
    // App state
    sidebarOpen,
    toggleSidebar,
    mobileMenuOpen,
    toggleMobileMenu,
    
    // User data
    selectedCrops,
    addCrop,
    removeCrop,
    experienceLevel,
    setExperienceLevel,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the App Context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

export default AppContext;