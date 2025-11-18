"use client";

import { useAuth } from "@/app/context/AuthContext";
import { LogOut, LayoutDashboard, Settings, BarChart2 } from "lucide-react";
import { manrope } from "../layout";
import { useRouter } from "next/navigation";

export default function SettingBox() {
  const { logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "History", icon: BarChart2, href: "/history" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="bg-[#131a13] rounded-lg shadow-md p-2 w-36 border border-[#1d261d]">
      {menuItems.map(({ label, icon: Icon, href }) => (
        <button
          key={label}
          onClick={() => router.push(href)}
          className={`flex items-center gap-2 w-full px-2 py-2 rounded-md hover:bg-[#1c241c] transition-colors text-sm text-white ${manrope.className}`}
        >
          <Icon size={16} className="text-green-400" />
          {label}
        </button>
      ))}

      <div className="border-t border-[#1d261d] my-2" />

      <button
        onClick={logout}
        className={`flex items-center gap-2 w-full px-2 py-2 rounded-md hover:bg-[#1c241c] transition-colors text-sm text-white ${manrope.className}`}
      >
        <LogOut size={16} className="text-green-400" />
        Logout
      </button>
    </div>
  );
}
