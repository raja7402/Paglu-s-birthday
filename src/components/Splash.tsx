import { useEffect, useState } from "react";
import { Ghost, Crown, Sparkle } from "./Icons";
import { burst } from "@/lib/confetti";
import { NAME } from "@/data";
import { cn } from "@/utils/cn";

export function Splash({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "gone">("idle");

  useEffect(() => {
    if (phase !== "gone") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [phase]);

  const open = (e: React.MouseEvent) => {
    if (phase !== "idle") return;
    setPhase("opening");
    burst(e.clientX, e.clientY, 90);
    onOpen();
    setTimeout(() => setPhase("gone"), 950);
  };

  if (phase === "gone") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#ff4fa3] via-[#c04bd6] to-[#4b1d8f]",
        phase === "opening" && "iris-out"
      )}
    >
      {/* sparkles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <Sparkle
          key={i}
          className="absolute h-4 w-4 animate-twinkle text-white"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37 + 11) % 100}%`,
            animationDelay: `${(i % 7) * 0.4}s`,
          }}
        />
      ))}

      <div className="relative mx-5 w-full max-w-sm text-center">
        <div className="fade-up mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[28px] bg-[#fffc00] shadow-[0_12px_40px_rgba(0,0,0,.3)] animate-wiggle">
          <Ghost className="h-16 w-16" />
        </div>

        {/* notification card */}
        <button
          onClick={open}
          className="fade-up group relative w-full rounded-3xl bg-white/95 p-4 text-left shadow-[0_20px_60px_rgba(36,11,74,.45)] backdrop-blur transition active:scale-[0.97]"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fffc00]">
              <Ghost className="h-8 w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#9a6bc9]">
                <span>SNAP</span>
                <span>now</span>
              </div>
              <p className="truncate text-base font-bold text-[#3a1466]">Royal Palace 👑</p>
              <p className="text-sm text-[#5b2a9d]">
                You got a new snap, Princess {NAME}! 💖
              </p>
            </div>
          </div>
        </button>

        {/* unopened snap icon */}
        <button
          onClick={open}
          className="fade-up relative mx-auto mt-10 block"
          style={{ animationDelay: "0.35s" }}
          aria-label="Tap to open your snap"
        >
          <span className="absolute inset-0 rounded-2xl bg-white/60 animate-pulse-ring" />
          <span className="relative flex h-20 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff2d95] to-[#ff7ac0] text-white shadow-[0_10px_30px_rgba(255,45,149,.6)] ring-4 ring-white transition active:scale-90">
            <Crown className="h-10 w-12 animate-bob" />
          </span>
        </button>
        <p className="fade-up mt-5 text-lg font-semibold tracking-wide text-white" style={{ animationDelay: "0.5s" }}>
          Tap to open
        </p>
      </div>
    </div>
  );
}
