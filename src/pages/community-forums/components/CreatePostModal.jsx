import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "rice", label: "Rice Cultivation" },
    { value: "vegetables", label: "Vegetable Farming" },
    { value: "fruits", label: "Fruit Orchards" },
    { value: "livestock", label: "Livestock & Poultry" },
    { value: "pest-control", label: "Pest & Disease Control" },
    { value: "soil-health", label: "Soil Management" },
    { value: "weather", label: "Weather & Climate" },
    { value: "market", label: "Market & Pricing" },
    { value: "technology", label: "Farm Technology" },
    { value: "general", label: "General Discussion" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files);
    // In a real app, you would upload these files and get URLs
    const imageUrls = files?.map(file => ({
      url: URL.createObjectURL(file),
      alt: `Uploaded image: ${file?.name}`,
      file
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      const postData = {
        ...formData,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
        createdAt: new Date()?.toISOString()
      };
      
      await onSubmit(postData);
      
      // Reset form
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        images: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-organic shadow-natural-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-poppins font-semibold text-primary">
            Create New Post
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Post Title"
            type="text"
            placeholder="What's your question or topic?"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />

          {/* Category */}
          <Select
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            required
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              placeholder="Share your experience, ask questions, or provide helpful information..."
              className="w-full p-3 border border-border rounded-organic resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={6}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Be specific and provide context to get better responses
            </p>
          </div>

          {/* Tags */}
          <Input
            label="Tags (Optional)"
            type="text"
            placeholder="rice, organic, fertilizer (separate with commas)"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Add relevant tags to help others find your post"
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Images (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-organic p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Icon name="ImagePlus" size={32} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload images or drag and drop
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB each
                </span>
              </label>
            </div>

            {/* Image Preview */}
            {formData?.images?.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {formData?.images?.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image?.url}
                      alt={image?.alt}
                      className="w-full h-24 object-cover rounded-organic"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6"
                      iconName="X"
                      iconSize={12}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="bg-muted rounded-organic p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Posting Guidelines
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be respectful and constructive in your communication</li>
              <li>• Provide accurate information and cite sources when possible</li>
              <li>• Use clear, descriptive titles that summarize your post</li>
              <li>• Include relevant details like location, crop type, and timing</li>
              <li>• Search existing posts to avoid duplicates</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              disabled={!formData?.title || !formData?.content || !formData?.category}
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;