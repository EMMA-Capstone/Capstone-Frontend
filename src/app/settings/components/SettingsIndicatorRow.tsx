'use client';

import { LucideIcon } from "lucide-react";
import Switch from "./Switch";
import { manrope } from "@/app/layout";

export interface SystemIndicator {
  name: string;
  status: string;
  isActive: boolean;
  icon: LucideIcon;
  onToggle: () => void;
}

export interface SettingsIndicatorRowProps {
  indicator: SystemIndicator;
  index: number;
}

export default function SettingsIndicatorRow({ indicator, index }: SettingsIndicatorRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-5">
      <div className="flex items-center">
        <div className="text-white mr-4 bg-[#2E362B] p-4 rounded-lg">
          <indicator.icon size={28} />
        </div>
        <div>
          <h3 className={`text-white text-lg font-medium ${manrope.className}`}>
            {indicator.name}
          </h3>
          <p className={`text-gray-400 text-sm ${manrope.className}`}>
            Status: {indicator.status}
          </p>
        </div>
      </div>

      <Switch checked={indicator.isActive} onCheckedChange={indicator.onToggle} />
    </div>
  );
}
