import { Ghost } from "./Icons";
import { NAME } from "@/data";

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const unit = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-6">
          <span className="text-2xl font-bold uppercase tracking-wider text-[#3a1466] sm:text-3xl">
            Happy Birthday {NAME}
          </span>
          <span className="text-2xl">👑</span>
          <Ghost className="h-8 w-8" />
          <span className="text-2xl">💖</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 -rotate-1 overflow-hidden border-y-4 border-white bg-[#fffc00] py-3 shadow-[0_8px_30px_rgba(255,200,0,.45)]">
      <div
        className="flex w-max animate-marquee"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {unit}
        {unit}
      </div>
    </div>
  );
}
