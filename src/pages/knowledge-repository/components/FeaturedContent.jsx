import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedContent = ({ featuredItems, onViewContent }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-organic overflow-hidden shadow-natural-lg">
      <div className="p-6 text-primary-foreground">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Star" size={20} className="text-harvest-gold" />
          <h2 className="font-poppins font-bold text-xl">Featured Content</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredItems?.slice(0, 2)?.map((item, index) => (
            <div key={item?.id} className="bg-white/10 backdrop-blur-sm rounded-organic p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-20 h-20 rounded-organic object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={item?.type === 'video' ? 'Play' : 'BookOpen'} size={14} />
                    <span className="text-xs font-medium opacity-90 capitalize">{item?.type}</span>
                    {item?.isNew && (
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-organic-sm">
                        New
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-poppins font-semibold text-sm mb-2 line-clamp-2">
                    {item?.title}
                  </h3>
                  
                  <p className="text-xs opacity-80 mb-3 line-clamp-2">
                    {item?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs opacity-75">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={10} />
                        {item?.views?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={10} />
                        {item?.readTime}min
                      </span>
                    </div>
                    
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => onViewContent(item)}
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={12}
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button
            variant="secondary"
            onClick={() => onViewContent('featured')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Featured Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;