import { LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { manrope } from "@/app/layout";


export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 rounded-xl bg-[#251B18]/70 hover:bg-[#251B18]/90 transition-colors"
    >
      <LogOut size={20} stroke="#FF2453" strokeWidth={2} />
      <span className={`text-[#FF2453] font-medium tracking-wide ${manrope.className}`}>
        Logout
      </span>
    </button>
  );  
}