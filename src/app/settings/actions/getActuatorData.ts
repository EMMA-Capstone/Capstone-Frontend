import { Wind, Droplet } from "lucide-react";
import Cookies from "js-cookie";

export default async function getDashboardData() {
  const token = Cookies.get("Authorization") || "";
  const cleanedToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compost-bin/event`, {
    method: "GET",
    headers: { Authorization: `Bearer ${cleanedToken}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Fetching actuator data failed");

  const result = await response.json();

  return {
    healthIndicators: [
      {
        name: "Ventilation System",
        status: result.status_fan ? "Active" : "Inactive",
        isActive: result.status_fan,
        icon: Wind,
      },
      {
        name: "Pump Control",
        status: result.status_pump ? "Active" : "Inactive",
        isActive: result.status_pump,
        icon: Droplet,
      },
    ],
  };
}
