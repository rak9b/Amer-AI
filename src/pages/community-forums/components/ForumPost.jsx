import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ForumPost = ({ post, onVote, onReply, onBookmark }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleVote = (type) => {
    onVote(post?.id, type);
  };

  const handleReply = () => {
    if (replyText?.trim()) {
      onReply(post?.id, replyText);
      setReplyText("");
      setShowReplies(true);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postTime?.toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'rice': 'bg-emerald-100 text-emerald-800',
      'vegetables': 'bg-orange-100 text-orange-800',
      'fruits': 'bg-red-100 text-red-800',
      'livestock': 'bg-amber-100 text-amber-800',
      'pest-control': 'bg-red-100 text-red-800',
      'soil-health': 'bg-yellow-100 text-yellow-800',
      'weather': 'bg-blue-100 text-blue-800',
      'market': 'bg-green-100 text-green-800',
      'technology': 'bg-purple-100 text-purple-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card border border-border rounded-organic shadow-natural hover:shadow-natural-lg transition-natural">
      {/* Post Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={post?.author?.avatar}
                alt={post?.author?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              {post?.author?.isExpert && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-background">
                  <Icon name="Award" size={12} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-inter font-medium text-foreground">{post?.author?.name}</h4>
                {post?.author?.isExpert && (
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                    Expert
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{post?.author?.location}</span>
                <span>•</span>
                <span>{formatTimeAgo(post?.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(post?.category)}`}>
              {post?.categoryName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(post?.id)}
              iconName={post?.isBookmarked ? "Bookmark" : "BookmarkPlus"}
              iconSize={16}
            />
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-lg font-poppins font-semibold text-foreground mb-3 hover:text-primary transition-natural cursor-pointer">
          {post?.title}
        </h3>

        {/* Post Content */}
        <div className="text-foreground mb-4 leading-relaxed">
          {post?.content}
        </div>

        {/* Post Images */}
        {post?.images && post?.images?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {post?.images?.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-organic">
                <Image
                  src={image?.url}
                  alt={image?.alt}
                  className="w-full h-32 object-cover hover:scale-105 transition-natural cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* Post Tags */}
        {post?.tags && post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-natural cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Post Actions */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Voting */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                iconName="ChevronUp"
                iconPosition="left"
                iconSize={16}
                className={post?.userVote === 'up' ? 'text-success bg-success/10' : ''}
              >
                {post?.upvotes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                iconName="ChevronDown"
                iconPosition="left"
                iconSize={16}
                className={post?.userVote === 'down' ? 'text-destructive bg-destructive/10' : ''}
              >
                {post?.downvotes}
              </Button>
            </div>

            {/* Reply */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
            >
              {post?.replies?.length || 0} Replies
            </Button>

            {/* Share */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              iconPosition="left"
              iconSize={16}
            >
              Share
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span>{post?.views} views</span>
          </div>
        </div>
      </div>
      {/* Reply Section */}
      {showReplies && (
        <div className="px-6 py-4">
          {/* Reply Input */}
          <div className="mb-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e?.target?.value)}
              placeholder="Share your thoughts or experience..."
              className="w-full p-3 border border-border rounded-organic resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleReply}
                disabled={!replyText?.trim()}
                iconName="Send"
                iconPosition="left"
                iconSize={14}
              >
                Reply
              </Button>
            </div>
          </div>

          {/* Existing Replies */}
          {post?.replies && post?.replies?.length > 0 && (
            <div className="space-y-4">
              {post?.replies?.map((reply) => (
                <div key={reply?.id} className="flex space-x-3 p-4 bg-muted rounded-organic">
                  <Image
                    src={reply?.author?.avatar}
                    alt={reply?.author?.avatarAlt}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-inter font-medium text-sm">{reply?.author?.name}</span>
                      {reply?.author?.isExpert && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          Expert
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(reply?.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{reply?.content}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-primary transition-natural">
                        <Icon name="ThumbsUp" size={12} className="inline mr-1" />
                        {reply?.likes}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-primary transition-natural">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumPost;