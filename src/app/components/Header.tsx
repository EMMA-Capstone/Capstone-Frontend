"use client";

import { useAuth } from "../context/AuthContext";
import { manrope } from "../layout";
import Image from "next/image";
import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// import boxes
import NotificationBox from "./NotificationBox";
import SettingBox from "./SettingBox";

export default function Header() {
  const { userAccount } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="border-b border-gray-700 p-4 flex items-center justify-between bg-[#121712] relative">
      {/* Title */}
      <h1 className={`text-xl font-extrabold ${manrope.className} text-white`}>
        Compost Tracker
      </h1>

      {/* Right side icons — only show if logged in */}
      {userAccount && (
        <div className="flex items-center gap-3 relative">
          {/* Notification Button */}
          <button
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowSettings(false);
            }}
            className="p-2 rounded-full bg-gray-800 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-700 relative"
          >
            <Bell size={18} className="text-white" />
          </button>

          {/* Animated Notification Box */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-8 w-64 z-50"
              >
                <NotificationBox />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Image (acts as settings toggle) */}
          <button
            onClick={() => {
              setShowSettings((prev) => !prev);
              setShowNotifications(false);
            }}
            className="w-8 h-8 rounded-full  overflow-hidden cursor:pointer border-transparent hover:border-green-400 transition-all"
          >
            <Settings size={24} className="object-cover cursor-pointer" />
          </button>

          {/* Animated SettingBox dropdown */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-0 w-40 z-50"
              >
                <SettingBox />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
