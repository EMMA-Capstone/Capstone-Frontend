"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  Leaf,
  Snowflake,
  Trophy,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { manrope } from "@/app/layout";

export default function CompostLifecycle({
  currentPhase,
}: {
  currentPhase: string;
}) {
  return (
    <div className="bg-[#1A2219] border border-white/10 rounded-2xl p-6 md:p-8 text-slate-200 space-y-8">
      <h2 className={`text-2xl font-semibold mb-4 ${manrope.className}`}>
        Compost Lifecycle
      </h2>

      <LifecycleRow
        icon={<Leaf className="text-green-400" size={24} />}
        title="Phase 1: Mesophilic"
        desc="Initial breakdown begins. Temperature starts rising. (Approx. 1–2 weeks)"
        trends={[
          {
            label: "Microbial Activity",
            trend: "Increasing",
            icon: <ArrowUp size={16} />,
          },
          { label: "Temperature", trend: "Rising", icon: <ArrowUp size={16} /> },
        ]}
        isCurrent={currentPhase.includes("Mesophilic")}
        done={!currentPhase.includes("Mesophilic")}
      />

      <LifecycleRow
        icon={<Flame className="text-orange-400" size={24} />}
        title="Phase 2: Thermophilic"
        desc="High temperatures kill pathogens and weed seeds. (Approx. 2–4 weeks)"
        trends={[
          { label: "Heat", trend: "Peak", icon: <ArrowUp size={16} /> },
          {
            label: "Pathogens",
            trend: "Neutralized",
            icon: <ArrowDown size={16} />,
          },
        ]}
        isCurrent={currentPhase.includes("Thermophilic")}
        done={!currentPhase.includes("Thermophilic")}
      />

      <LifecycleRow
        icon={<Snowflake className="text-white" size={24} />}
        title="Phase 3: Cooling & Curing"
        desc="Temperature drops. Fungi and invertebrates continue breaking down material."
        trends={[
          {
            label: "Temperature",
            trend: "Decreasing",
            icon: <ArrowDown size={16} />,
          },
          {
            label: "Fungi Activity",
            trend: "High",
            icon: <ArrowUp size={16} />,
          },
        ]}
        isCurrent={currentPhase.includes("Cooling")}
        done={!currentPhase.includes("Cooling")}
      />

      <LifecycleRow
        icon={<Trophy className="text-green-500" size={24} />}
        title="Phase 4: Mature Compost"
        desc="Compost becomes dark, crumbly, and earthy. Ready for use."
        trends={[
          { label: "Stability", trend: "Stable", icon: <ArrowUp size={16} /> },
          { label: "Usability", trend: "Optimal", icon: <ArrowUp size={16} /> },
        ]}
        isCurrent={
          currentPhase.includes("Maturation") ||
          currentPhase.includes("Finished")
        }
        done={
          !currentPhase.includes("Maturation") &&
          !currentPhase.includes("Finished")
        }
      />
    </div>
  );
}

function LifecycleRow({
  icon,
  title,
  desc,
  trends,
  isCurrent,
  done,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  trends: { label: string; trend: string; icon: React.ReactNode }[];
  isCurrent?: boolean;
  done?: boolean;
  highlight?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isCurrent) setIsOpen(true);
  }, [isCurrent]);

  return (
    <div className="relative pl-12 pb-6 rounded-xl">
      {/* ICON */}
      <div
        className={`absolute left-0 transition-all duration-300 ${
          isOpen ? "top-1/2 -translate-y-1/2" : "top-0"
        } w-7 h-7 flex items-center justify-center bg-[#1A2219] rounded-full border-transparent`}
      >
        {icon}
      </div>

      {/* TITLE */}
      <div
        className={`flex justify-between items-center font-semibold cursor-pointer ${manrope.className} ${
          highlight
            ? "text-white text-lg"
            : done
            ? "text-slate-400"
            : "text-slate-300"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {title}
          {isCurrent && (
            <span className="ml-2 text-green-400 text-xs">(You are here)</span>
          )}
        </span>

        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* DESCRIPTION */}
      <p
        className={`text-base leading-snug ${manrope.className} ${
          done ? "text-slate-500" : "text-slate-300"
        } mb-2`}
      >
        {desc}
      </p>

      {/* COLLAPSE */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="bg-[#2E362B] rounded-xl p-4 border border-white/10 space-y-3 mt-2">
          <h4
            className={`text-sm font-semibold text-slate-200 ${manrope.className}`}
          >
            Stage Trends
          </h4>

          <div className="space-y-1">
            {trends.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center text-sm">
                <span className="text-slate-300">{item.icon}</span>
                <span
                  className={`${manrope.className} text-slate-200 font-medium`}
                >
                  {item.label}:
                </span>
                <span className={`${manrope.className} text-slate-300`}>
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
