import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/farmer-dashboard', icon: 'LayoutDashboard' },
    { name: 'Disease Lab', path: '/disease-detection-lab', icon: 'Microscope' },
    { name: 'Community', path: '/community-forums', icon: 'Users' },
    { name: 'Experts', path: '/expert-network', icon: 'GraduationCap' },
    { name: 'Knowledge', path: '/knowledge-repository', icon: 'BookOpen' }
  ];

  const moreItems = [
    { name: 'Mobile Setup', path: '/mobile-onboarding', icon: 'Smartphone' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-natural ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-natural' : 'bg-background'
    }`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/farmer-dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-natural">
          <div className="relative">
            <div className="w-10 h-10 bg-earth-to-sky rounded-organic flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="currentColor"/>
                <path d="M5 6L5.5 8L8 8.5L5.5 9L5 11L4.5 9L2 8.5L4.5 8L5 6Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-harvest-gold rounded-full flex items-center justify-center">
              <Icon name="Sprout" size={10} className="text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-poppins font-bold text-primary">AgriSmart</h1>
            <p className="text-xs text-muted-foreground -mt-1">Bangladesh</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-organic transition-natural hover-magnetic ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-natural'
                  : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span className="font-inter font-medium">{item?.name}</span>
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-organic transition-natural hover:bg-muted hover:text-primary">
              <Icon name="MoreHorizontal" size={18} />
              <span className="font-inter font-medium">More</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-organic shadow-natural-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-natural">
              {moreItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-natural first:rounded-t-organic last:rounded-b-organic"
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="font-inter">{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex ai-pulse"
            iconName="Bell"
            iconSize={20}
          />
          
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-harvest-gradient rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-organic transition-natural ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-inter font-medium">{item?.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {moreItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-organic transition-natural hover:bg-muted"
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-inter font-medium">{item?.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="w-10 h-10 bg-harvest-gradient rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-inter font-medium">Farmer Profile</p>
                  <p className="text-sm text-muted-foreground">View & Edit</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;