'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // ⬅ Import
import { LayoutDashboard, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/history', label: 'History', icon: BarChart2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function BottomNavbar() {
  const pathname = usePathname();
  const { userAccount } = useAuth(); // ⬅ Grab auth info

  if (!userAccount) return null; // ⬅ Don't render if not logged in

  return (
    <nav className="flex justify-around py-3 bg-[#121712]">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1">
            <Icon size={22} className={active ? 'text-green-400' : 'text-gray-500'} />
            <span className={`text-sm ${active ? 'text-green-400' : 'text-gray-500'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
