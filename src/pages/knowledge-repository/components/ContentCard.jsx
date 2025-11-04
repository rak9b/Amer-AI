import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContentCard = ({ content, onBookmark, onView }) => {
  const getContentTypeIcon = (type) => {
    const icons = {
      guide: 'BookOpen',
      article: 'FileText',
      video: 'Play',
      calculator: 'Calculator',
      calendar: 'Calendar'
    };
    return icons?.[type] || 'FileText';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-success text-success-foreground',
      intermediate: 'bg-warning text-warning-foreground',
      advanced: 'bg-error text-error-foreground'
    };
    return colors?.[difficulty] || 'bg-muted text-muted-foreground';
  };

  const formatReadTime = (minutes) => {
    if (minutes < 60) return `${minutes} min read`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m read`;
  };

  return (
    <div className="bg-card border border-border rounded-organic overflow-hidden shadow-natural hover-magnetic transition-natural group">
      {/* Content Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={content?.image}
          alt={content?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-natural"
        />
        
        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-organic-sm px-2 py-1 flex items-center gap-1">
          <Icon name={getContentTypeIcon(content?.type)} size={14} className="text-primary" />
          <span className="text-xs font-inter font-medium capitalize">{content?.type}</span>
        </div>

        {/* Bookmark Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={() => onBookmark(content?.id)}
          iconName={content?.isBookmarked ? "Bookmark" : "BookmarkPlus"}
          iconSize={16}
        />

        {/* Video Duration or Read Time */}
        {content?.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-organic-sm">
            {content?.type === 'video' ? content?.duration : formatReadTime(content?.readTime)}
          </div>
        )}
      </div>
      {/* Content Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded-organic-sm font-medium ${getDifficultyColor(content?.difficulty)}`}>
            {content?.difficulty}
          </span>
          {content?.isExpertVerified && (
            <div className="flex items-center gap-1 text-xs text-success">
              <Icon name="CheckCircle" size={12} />
              <span>Expert Verified</span>
            </div>
          )}
        </div>

        <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-natural">
          {content?.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {content?.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {content?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-organic-sm"
            >
              #{tag}
            </span>
          ))}
          {content?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">+{content?.tags?.length - 3} more</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={12} />
              <span>{content?.views?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="ThumbsUp" size={12} />
              <span>{content?.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageCircle" size={12} />
              <span>{content?.comments}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(content)}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            Read More
          </Button>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Image
            src={content?.author?.avatar}
            alt={content?.author?.avatarAlt}
            className="w-6 h-6 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{content?.author?.name}</p>
            <p className="text-xs text-muted-foreground">{content?.publishedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;