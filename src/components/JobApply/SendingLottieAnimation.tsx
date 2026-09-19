import React from 'react';
import { Lottie } from 'lottie-react';
import emailSendingAnimationData from '../../assets/emailSendingLottie.json';

interface SendingLottieAnimationProps {
  className?: string;
  senderEmail?: string;
}

export const SendingLottieAnimation: React.FC<SendingLottieAnimationProps> = ({
  className = 'w-44 h-44',
  senderEmail,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 text-center select-none">
      {/* Lottie Animation Container */}
      <div className={`relative flex items-center justify-center ${className}`}>
        <Lottie
          src={emailSendingAnimationData}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>

      {/* Main Title */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 tracking-tight">
        Mengirimkan Lamaran ...
      </h3>

      {/* Subtitle with sender email */}
      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
        Via {senderEmail || 'Google Apps Script'}
      </p>
    </div>
  );
};


