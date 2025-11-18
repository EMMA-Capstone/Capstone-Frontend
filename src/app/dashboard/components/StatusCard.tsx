import Image from "next/image";
import { manrope } from "@/app/layout";
import { StatusMetric } from "../../type/Compost";

interface StatusCardProps {
  metric: StatusMetric;
  index: number;
}

export default function StatusCard({ metric, index }: StatusCardProps) {
  const changeColorClass = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-gray-400"
  }[metric.changeType || "neutral"];

  return (
    <div
      className="relative overflow-hidden bg-[#2E362B] backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-[#384132] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Decoration Top Left */}
      <Image
        src="/cardDecoration.png"
        alt=""
        fill
        className="absolute opacity-10 pointer-events-none object-contain"
        style={{
          top: "-40%",      // pushed further up
          left: "-35%",     // pushed further left
          transform: "scale(1.5)"
        }}
      />

      {/* Decoration Bottom Right (mirrored) */}
      <Image
        src="/cardDecoration.png"
        alt=""
        fill
        className="absolute opacity-10 pointer-events-none object-contain"
        style={{
          bottom: "-40%",   // pushed further down
          right: "-35%",    // pushed further right
          transform: "scale(1.5) scaleX(-1)"
        }}
      />
      <div className={`relative text-slate-300 text-base mb-2 font-normal ${manrope.className}`}>
        {metric.label}
      </div>

      <div className={`relative text-white text-4xl font-semibold mb-2 ${manrope.className}`}>
        {metric.value}
      </div>

      {metric.change && (
        <div className={`relative text-sm font-medium ${changeColorClass} ${manrope.className}`}>
          {metric.change}
        </div>
      )}

      {metric.status && (
        <div className="relative text-green-400 text-lg font-bold">
          {metric.status}
        </div>
      )}
    </div>
  );
}
