'use client';

import { manrope } from "@/app/layout";

interface MaturitySectionProps {
  level: string;
  estimatedCompletion: string;
  progressPercentage: number;
}

export default function MaturitySection({ 
  level, 
  estimatedCompletion, 
  progressPercentage 
}: MaturitySectionProps) {
  return (
    <div className="mb-8">
      <div className={`text-white text-xl font-semibold mb-4 ${manrope.className}`}>Maturity</div>
      <div className={`text-white text-3xl font-semibold mb-3 ${manrope.className}`}>{level}</div>
      <div className={`text-gray-400 text-base mb-5 ${manrope.className}`}>
        Estimated completion: {estimatedCompletion}
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 animate-progress"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}