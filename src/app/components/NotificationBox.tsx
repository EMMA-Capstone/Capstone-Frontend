"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Bell } from "lucide-react";
import { manrope } from "../layout";
import { useMemo } from "react";

export default function NotificationBox() {
  const { userAccount } = useAuth();

  // safe browser UUID generator
  const generateUUID = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15);

  // Pre-compute stable UUIDs
  const notificationsWithIds = useMemo(() => {
    if (!userAccount?.notifications) return [];
    return userAccount.notifications.map((notif) => ({
      ...notif,
      _uuid: notif.id || generateUUID(),
    }));
  }, [userAccount?.notifications]);

  if (!userAccount || notificationsWithIds.length === 0) {
    return (
      <div className="p-4 bg-[#131a13] rounded-xl shadow-md text-center">
        <p className={`${manrope.className} text-sm text-gray-400`}>No notifications</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#131a13] rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="text-green-400" size={18} />
        <h2 className={`text-md font-semibold text-white ${manrope.className}`}>
          Notifications
        </h2>
      </div>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {notificationsWithIds.map((notif) => (
          <li
            key={notif._uuid}
            className="flex items-start gap-2 bg-[#222d22] p-2 rounded-lg hover:bg-[#2a362a] transition-colors"
          >
            <div className="mt-0.5">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <div>
              <p className={`text-sm text-white ${manrope.className}`}>
                {notif.message}
              </p>
              <span className={`text-xs text-gray-400 ${manrope.className}`}>
                {new Date(notif.timestamp).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
