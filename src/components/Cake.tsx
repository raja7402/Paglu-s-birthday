import { useState } from "react";
import { Reveal } from "@/lib/hooks";
import { burst, rain } from "@/lib/confetti";
import { NAME } from "@/data";
import { cn } from "@/utils/cn";

const CANDLES = [
  { x: 100, c: "#ff7ac0" },
  { x: 125, c: "#ffd34d" },
  { x: 150, c: "#b57bff" },
  { x: 175, c: "#ffd34d" },
  { x: 200, c: "#ff7ac0" },
];

export function Cake() {
  const [blown, setBlown] = useState(false);

  const blow = (e: React.MouseEvent) => {
    if (blown) {
      setBlown(false);
      return;
    }
    setBlown(true);
    burst(e.clientX, e.clientY, 130);
    rain(3800);
  };

  return (
    <section id="cake" className="relative isolate overflow-hidden px-5 pb-40 pt-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-[#ffd6ea]/60 to-[#e6d0ff]" />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-script text-4xl text-[#ff2d95] sm:text-5xl">Make a wish</p>
          <h2 className="mt-1 text-4xl font-bold text-[#3a1466] sm:text-5xl">Time for the candles 🕯️</h2>
          <p className="mx-auto mt-3 max-w-md text-lg text-[#5b2a9d]/90">
            Close your eyes, think of something magical, and blow them out, Princess {NAME}.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <button onClick={blow} className="group relative mx-auto block w-[min(86vw,380px)]" aria-label="Blow the candles">
            <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc83d]/40 blur-3xl transition duration-1000" style={{ opacity: blown ? 0.1 : 0.9 }} />
            <svg viewBox="0 0 300 280" className="w-full transition duration-300 group-hover:scale-[1.03] group-active:scale-95">
              <defs>
                <linearGradient id="tierA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff9acb" />
                  <stop offset="1" stopColor="#ff4fa3" />
                </linearGradient>
                <linearGradient id="tierB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#cda4ff" />
                  <stop offset="1" stopColor="#9b5cff" />
                </linearGradient>
              </defs>
              {/* plate */}
              <ellipse cx="150" cy="252" rx="140" ry="18" fill="#fff" stroke="#e9d5ff" strokeWidth="3" />
              {/* bottom tier */}
              <rect x="30" y="170" width="240" height="80" rx="16" fill="url(#tierA)" />
              <rect x="30" y="170" width="240" height="20" rx="10" fill="#fff" />
              {Array.from({ length: 9 }).map((_, i) => (
                <circle key={i} cx={46 + i * 26} cy="190" r="11" fill="#fff" />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <text key={i} x={50 + i * 40} y="232" fontSize="20" textAnchor="middle">
                  {["💖", "✨", "👑", "💜", "🦋", "💖"][i]}
                </text>
              ))}
              {/* top tier */}
              <rect x="70" y="110" width="160" height="66" rx="14" fill="url(#tierB)" />
              <rect x="70" y="110" width="160" height="18" rx="9" fill="#fff" />
              {Array.from({ length: 7 }).map((_, i) => (
                <circle key={i} cx={82 + i * 22.5} cy="128" r="10" fill="#fff" />
              ))}
              {[
                [92, 150, 20],
                [120, 158, -30],
                [150, 148, 60],
                [180, 158, 10],
                [208, 148, -50],
              ].map(([x, y, r], i) => (
                <rect key={i} x={x} y={y} width="10" height="3.5" rx="2" fill={i % 2 ? "#ffd34d" : "#fff"} transform={`rotate(${r} ${x} ${y})`} />
              ))}
              {/* candles */}
              {CANDLES.map((c, i) => (
                <g key={c.x}>
                  <rect x={c.x - 4} y="70" width="8" height="42" rx="3" fill={c.c} />
                  <rect x={c.x - 4} y="82" width="8" height="4" fill="#fff" opacity=".6" />
                  <rect x={c.x - 4} y="94" width="8" height="4" fill="#fff" opacity=".6" />
                  <rect x={c.x - 0.6} y="64" width="1.2" height="7" fill="#3a1466" />
                  {!blown ? (
                    <g
                      className="animate-flicker"
                      style={{ transformBox: "fill-box", transformOrigin: "center bottom", animationDelay: `${i * 0.13}s` }}
                    >
                      <ellipse cx={c.x} cy="54" rx="7" ry="11" fill="#ffc83d" />
                      <ellipse cx={c.x} cy="57" rx="3.5" ry="6" fill="#fff6c9" />
                    </g>
                  ) : (
                    <circle
                      cx={c.x}
                      cy="62"
                      r="7"
                      fill="#c9b6e6"
                      style={{ animation: `smoke 1.8s ${i * 0.1}s ease-out forwards`, transformBox: "fill-box", transformOrigin: "center" }}
                    />
                  )}
                </g>
              ))}
            </svg>
          </button>

          <button
            onClick={blow}
            className={cn(
              "mt-8 rounded-full px-8 py-4 text-lg font-bold shadow-xl transition hover:-translate-y-1 active:scale-95",
              blown
                ? "bg-white text-[#5b2a9d] ring-2 ring-pink-200"
                : "bg-gradient-to-r from-[#ff2d95] to-[#b57bff] text-white shadow-[0_14px_36px_rgba(255,45,149,.5)]"
            )}
          >
            {blown ? "Light them again 🕯️" : "Blow the candles 💨"}
          </button>

          <div
            className={cn(
              "mx-auto mt-8 max-w-md rounded-3xl bg-white/85 p-6 shadow-lg ring-1 ring-pink-200 backdrop-blur transition-all duration-700",
              blown ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none h-0 translate-y-6 scale-95 overflow-hidden p-0 opacity-0"
            )}
          >
            <p className="font-script text-4xl text-[#ff2d95]">Wish granted ✨</p>
            <p className="mt-2 text-lg text-[#3a1466]">
              The Amulet of Avalor heard you, {NAME}. May every wish come true this year. 💜
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
