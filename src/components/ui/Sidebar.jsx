import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      category: 'Main',
      items: [
        { name: 'Dashboard', path: '/farmer-dashboard', icon: 'LayoutDashboard', description: 'Overview & Analytics' },
        { name: 'Disease Lab', path: '/disease-detection-lab', icon: 'Microscope', description: 'AI Crop Analysis' },
        { name: 'Community', path: '/community-forums', icon: 'Users', description: 'Farmer Network' },
        { name: 'Experts', path: '/expert-network', icon: 'GraduationCap', description: 'Professional Advice' }
      ]
    },
    {
      category: 'Resources',
      items: [
        { name: 'Knowledge', path: '/knowledge-repository', icon: 'BookOpen', description: 'Learning Center' },
        { name: 'Mobile Setup', path: '/mobile-onboarding', icon: 'Smartphone', description: 'App Configuration' }
      ]
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const shouldShowExpanded = !isCollapsed || isHovered;

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-natural ${
        shouldShowExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {shouldShowExpanded && (
              <div className="heritage-pattern">
                <h2 className="font-poppins font-semibold text-primary">Navigation</h2>
                <p className="text-xs text-muted-foreground">Agricultural Platform</p>
              </div>
            )}
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="hover-magnetic"
                iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                iconSize={16}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationItems?.map((section) => (
            <div key={section?.category}>
              {shouldShowExpanded && (
                <h3 className="text-xs font-poppins font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section?.category}
                </h3>
              )}
              <div className="space-y-1">
                {section?.items?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`group flex items-center rounded-organic transition-natural hover-magnetic ${
                      shouldShowExpanded ? 'px-3 py-3' : 'px-3 py-3 justify-center'
                    } ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-natural'
                        : 'hover:bg-muted hover:text-primary'
                    }`}
                    title={!shouldShowExpanded ? item?.name : ''}
                  >
                    <div className={`flex items-center ${isActivePath(item?.path) ? 'ai-pulse' : ''}`}>
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={shouldShowExpanded ? 'mr-3' : ''} 
                      />
                    </div>
                    
                    {shouldShowExpanded && (
                      <div className="flex-1 min-w-0">
                        <p className="font-inter font-medium truncate">{item?.name}</p>
                        <p className="text-xs opacity-75 truncate">{item?.description}</p>
                      </div>
                    )}

                    {isActivePath(item?.path) && (
                      <div className="w-2 h-2 bg-accent rounded-full ml-auto animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {shouldShowExpanded ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-organic">
                <div className="w-10 h-10 bg-harvest-gradient rounded-full flex items-center justify-center">
                  <Icon name="Sprout" size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter font-medium text-sm truncate">Smart Farming</p>
                  <p className="text-xs text-muted-foreground truncate">AI-Powered Growth</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={14}
                >
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  iconName="HelpCircle"
                  iconPosition="left"
                  iconSize={14}
                >
                  Help
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-full hover-magnetic"
                iconName="Settings"
                iconSize={18}
                title="Settings"
              />
              <Button
                variant="ghost"
                size="icon"
                className="w-full hover-magnetic"
                iconName="HelpCircle"
                iconSize={18}
                title="Help"
              />
            </div>
          )}
        </div>
      </div>
      {/* Hover Tooltip for Collapsed State */}
      {isCollapsed && !isHovered && (
        <div className="absolute left-full top-4 ml-2 px-2 py-1 bg-popover border border-border rounded-organic-sm shadow-natural text-xs font-inter opacity-0 group-hover:opacity-100 transition-natural pointer-events-none">
          Hover to expand
        </div>
      )}
    </aside>
  );
};

export default Sidebar;