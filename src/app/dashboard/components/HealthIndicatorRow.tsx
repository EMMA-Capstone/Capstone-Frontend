'use client';

import { manrope } from '@/app/layout';
import { HealthIndicator } from '../../type/Compost';

interface HealthIndicatorRowProps {
  indicator?: HealthIndicator | null;
  index: number;
}

export default function HealthIndicatorRow({ indicator, index }: HealthIndicatorRowProps) {
  // Show skeleton when data not yet available
  if (!indicator) {
    return (
      <div 
        className="flex items-center justify-between rounded-lg px-2 py-5 animate-pulse"
        style={{ animationDelay: `${1000 + index * 100}ms` }}
      >
        <div className="flex items-center">
          <div className="mr-4 w-12 h-12 rounded-lg bg-[#2E362B]" />
          <div>
            <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-700 rounded" />
      </div>
    );
  }

  // Normal render
  return (
    <div 
      className="flex items-center justify-between rounded-lg px-2 py-5"
      style={{ animationDelay: `${1000 + index * 100}ms` }}
    >
      <div className="flex items-center">
        {indicator.icon && (
          <div className="text-white mr-4 bg-[#2E362B] p-4 rounded-lg">
            <indicator.icon size={32} />
          </div>
        )}
        <div>
          <h3 className={`text-white text-lg font-medium mb-1 ${manrope.className}`}>
            {indicator.name}
          </h3>
        </div>
      </div>
      <div className={`text-white text-xl font-semibold ${manrope.className}`}>
        {indicator.value}
      </div>
    </div>
  );
}
