import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BookmarkedContent = ({ bookmarkedItems, onViewContent, onRemoveBookmark }) => {
  if (!bookmarkedItems || bookmarkedItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-organic p-6 shadow-natural text-center">
        <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-poppins font-semibold text-lg mb-2">No Bookmarks Yet</h3>
        <p className="text-muted-foreground text-sm">
          Bookmark your favorite articles and guides to access them quickly later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h2 className="font-poppins font-bold text-lg">Bookmarked Content</h2>
          <span className="text-sm text-muted-foreground">({bookmarkedItems?.length})</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewContent('all-bookmarks')}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarkedItems?.slice(0, 4)?.map((item) => (
          <div
            key={item?.id}
            className="group bg-muted/30 hover:bg-muted border border-border rounded-organic p-4 transition-natural"
          >
            <div className="flex gap-3">
              <Image
                src={item?.image}
                alt={item?.imageAlt}
                className="w-16 h-16 rounded-organic object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-sm line-clamp-2 group-hover:text-primary transition-natural">
                    {item?.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onRemoveBookmark(item?.id);
                    }}
                    className="w-6 h-6 text-muted-foreground hover:text-error flex-shrink-0"
                    iconName="X"
                    iconSize={12}
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={item?.type === 'video' ? 'Play' : 'FileText'} size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">{item?.type}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{item?.readTime}min</span>
                </div>
                
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onViewContent(item)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={12}
                  className="mt-2"
                >
                  Continue Reading
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedContent;