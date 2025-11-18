import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Compost Connect",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}






