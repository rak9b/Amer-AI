import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentlyViewed = ({ recentItems, onViewContent, onClearHistory }) => {
  if (!recentItems || recentItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-organic p-6 shadow-natural text-center">
        <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-poppins font-semibold text-lg mb-2">No Recent Activity</h3>
        <p className="text-muted-foreground text-sm">
          Start exploring our knowledge repository to see your recently viewed content here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="font-poppins font-bold text-lg">Recently Viewed</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear History
        </Button>
      </div>
      <div className="space-y-3">
        {recentItems?.slice(0, 5)?.map((item) => (
          <div
            key={item?.id}
            className="flex items-center gap-3 p-3 hover:bg-muted rounded-organic cursor-pointer transition-natural group"
            onClick={() => onViewContent(item)}
          >
            <Image
              src={item?.image}
              alt={item?.imageAlt}
              className="w-12 h-12 rounded-organic object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-inter font-medium text-sm line-clamp-1 group-hover:text-primary transition-natural">
                {item?.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Icon name={item?.type === 'video' ? 'Play' : 'FileText'} size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">{item?.type}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item?.viewedAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-natural" />
              <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-primary transition-natural" />
            </div>
          </div>
        ))}
      </div>
      {recentItems?.length > 5 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewContent('all-recent')}
          >
            View All Recent ({recentItems?.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;