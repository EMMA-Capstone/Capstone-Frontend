import { LucideIcon } from "lucide-react";

export interface StatusMetric {
    label: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    status?: string;
  }
  
  export interface HealthIndicator {
    name: string;
    value: string;
    icon: LucideIcon;
  }
  
  export interface CompostData {
    currentStatus: StatusMetric[];
    maturity: {
      level: string;
      estimatedCompletion: string;
      progressPercentage: number;
    };
    healthIndicators: HealthIndicator[];
  }