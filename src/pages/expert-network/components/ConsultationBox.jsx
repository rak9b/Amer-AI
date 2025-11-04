import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationBookingModal = ({ expert, isOpen, onClose, onBooking }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '30',
    consultationType: 'video',
    description: '',
    farmerName: '',
    farmerPhone: '',
    cropType: '',
    urgency: 'normal'
  });

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes - ৳500' },
    { value: '60', label: '1 hour - ৳800' },
    { value: '90', label: '1.5 hours - ৳1,200' }
  ];

  const consultationTypes = [
    { value: 'video', label: 'Video Call' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'chat', label: 'Text Chat' }
  ];

  const urgencyOptions = [
    { value: 'normal', label: 'Normal (2-3 days)' },
    { value: 'urgent', label: 'Urgent (Same day) +৳200' },
    { value: 'emergency', label: 'Emergency (Within 2 hours) +৳500' }
  ];

  const cropTypes = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'jute', label: 'Jute' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onBooking(bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-organic max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={expert?.avatar}
                alt={expert?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-poppins font-semibold text-lg text-foreground">Book Consultation</h3>
                <p className="text-sm text-muted-foreground">with {expert?.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Preferred Date"
              required
              value={bookingData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />

            <Select
              label="Preferred Time"
              options={timeSlots}
              value={bookingData?.time}
              onChange={(value) => handleInputChange('time', value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Duration & Price"
              options={durationOptions}
              value={bookingData?.duration}
              onChange={(value) => handleInputChange('duration', value)}
              required
            />

            <Select
              label="Consultation Type"
              options={consultationTypes}
              value={bookingData?.consultationType}
              onChange={(value) => handleInputChange('consultationType', value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Your Name"
              placeholder="Enter your full name"
              required
              value={bookingData?.farmerName}
              onChange={(e) => handleInputChange('farmerName', e?.target?.value)}
            />

            <Input
              type="tel"
              label="Phone Number"
              placeholder="01XXXXXXXXX"
              required
              value={bookingData?.farmerPhone}
              onChange={(e) => handleInputChange('farmerPhone', e?.target?.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary Crop"
              options={cropTypes}
              value={bookingData?.cropType}
              onChange={(value) => handleInputChange('cropType', value)}
              required
            />

            <Select
              label="Urgency Level"
              options={urgencyOptions}
              value={bookingData?.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Describe Your Issue
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-organic focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              placeholder="Please describe your farming issue or question in detail..."
              value={bookingData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
          </div>

          <div className="bg-muted rounded-organic p-4">
            <h4 className="font-poppins font-medium text-foreground mb-2">Consultation Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Fee ({bookingData?.duration} min):</span>
                <span className="font-medium">৳{bookingData?.duration === '30' ? '500' : bookingData?.duration === '60' ? '800' : '1,200'}</span>
              </div>
              {bookingData?.urgency === 'urgent' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency Fee:</span>
                  <span className="font-medium">৳200</span>
                </div>
              )}
              {bookingData?.urgency === 'emergency' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency Fee:</span>
                  <span className="font-medium">৳500</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span className="text-primary">৳{
                  parseInt(bookingData?.duration === '30' ? '500' : bookingData?.duration === '60' ? '800' : '1200') +
                  (bookingData?.urgency === 'urgent' ? 200 : bookingData?.urgency === 'emergency' ? 500 : 0)
                }</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationBookingModal;