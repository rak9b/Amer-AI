import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PhoneVerificationScreen = ({ onNext, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

  // Mock phone number for demo
  const mockPhoneNumber = '01712345678';
  const mockOtp = '123456';

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError('মোবাইল নম্বর দিন');
      return;
    }

    if (phoneNumber?.length !== 11) {
      setError('সঠিক মোবাইল নম্বর দিন (১১ সংখ্যার)');
      return;
    }

    setIsSending(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setIsOtpSent(true);
    setCountdown(60);
  };

  const handleOtpChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp?.join('');
    
    if (otpString?.length !== 6) {
      setError('৬ সংখ্যার OTP দিন');
      return;
    }

    if (otpString !== mockOtp) {
      setError('ভুল OTP। সঠিক OTP: 123456');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsVerifying(false);
    onNext({ phoneNumber, verified: true });
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    
    setOtp(['', '', '', '', '', '']);
    setCountdown(60);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            iconName="ArrowLeft"
            iconSize={20}
          />
          <div>
            <h1 className="text-xl font-poppins font-bold text-foreground">
              মোবাইল যাচাইকরণ
            </h1>
            <p className="text-sm text-muted-foreground">
              নিরাপত্তার জন্য মোবাইল নম্বর যাচাই করুন
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="space-y-6">
          {/* Icon */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Smartphone" size={32} className="text-primary" />
            </div>
          </div>

          {!isOtpSent ? (
            /* Phone Number Input */
            (<div className="space-y-4">
              <div>
                <h2 className="text-lg font-poppins font-semibold text-foreground mb-2">
                  মোবাইল নম্বর দিন
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  আপনার মোবাইল নম্বরে একটি যাচাইকরণ কোড পাঠানো হবে
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  type="tel"
                  label="মোবাইল নম্বর"
                  placeholder="01XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e?.target?.value?.replace(/\D/g, '');
                    if (value?.length <= 11) {
                      setPhoneNumber(value);
                      setError('');
                    }
                  }}
                  error={error}
                  className="text-lg"
                />

                {/* Demo Hint */}
                <div className="bg-muted/50 p-3 rounded-organic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">ডেমো টেস্টের জন্য:</p>
                      <p className="text-xs text-muted-foreground">
                        মোবাইল: <span className="font-mono font-semibold">{mockPhoneNumber}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="font-poppins font-semibold text-foreground">যাচাইকরণের সুবিধা:</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">অ্যাকাউন্ট নিরাপত্তা</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Bell" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">গুরুত্বপূর্ণ বিজ্ঞপ্তি</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">কমিউনিটি বিশ্বস্ততা</span>
                  </div>
                </div>
              </div>
            </div>)
          ) : (
            /* OTP Input */
            (<div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-poppins font-semibold text-foreground mb-2">
                  যাচাইকরণ কোড দিন
                </h2>
                <p className="text-sm text-muted-foreground">
                  <span className="font-mono font-semibold">{phoneNumber}</span> নম্বরে পাঠানো ৬ সংখ্যার কোড দিন
                </p>
              </div>
              {/* OTP Input Fields */}
              <div className="flex justify-center space-x-3">
                {otp?.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e?.target?.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-border rounded-organic bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                ))}
              </div>
              {error && (
                <div className="text-center">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}
              {/* Demo Hint */}
              <div className="bg-muted/50 p-3 rounded-organic">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">ডেমো টেস্টের জন্য:</p>
                    <p className="text-xs text-muted-foreground">
                      OTP কোড: <span className="font-mono font-semibold">{mockOtp}</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Resend OTP */}
              <div className="text-center">
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className={`text-sm ${
                    countdown > 0 
                      ? 'text-muted-foreground cursor-not-allowed' 
                      : 'text-primary hover:underline'
                  }`}
                >
                  {countdown > 0 
                    ? `পুনরায় পাঠান (${countdown}s)` 
                    : 'কোড পুনরায় পাঠান'
                  }
                </button>
              </div>
            </div>)
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="p-6 border-t border-border">
        {!isOtpSent ? (
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isSending}
            onClick={handleSendOtp}
            disabled={phoneNumber?.length !== 11}
            className="shadow-natural-lg hover-magnetic"
          >
            {isSending ? 'কোড পাঠানো হচ্ছে...' : 'যাচাইকরণ কোড পাঠান'}
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isVerifying}
            onClick={handleVerifyOtp}
            disabled={otp?.join('')?.length !== 6}
            className="shadow-natural-lg hover-magnetic"
          >
            {isVerifying ? 'যাচাই করা হচ্ছে...' : 'যাচাই করুন'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhoneVerificationScreen;