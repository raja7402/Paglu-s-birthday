import { useMemo } from "react";
import { Sparkle, Heart } from "./Icons";

/** Fixed, soft floating sparkles & hearts that live behind the whole page. */
export function Background() {
  const items = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        left: (i * 41 + 7) % 100,
        top: (i * 67 + 13) % 100,
        size: 10 + ((i * 7) % 16),
        delay: (i % 9) * 0.5,
        heart: i % 4 === 0,
        color: ["text-pink-300", "text-fuchsia-300", "text-violet-300", "text-yellow-200"][i % 4],
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#fff0f8] via-[#ffe3f2] to-[#f2e4ff]">
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-pink-300/40 blur-3xl" />
      <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-300/40 blur-3xl" />
      {items.map((it, i) => {
        const Cmp = it.heart ? Heart : Sparkle;
        return (
          <Cmp
            key={i}
            className={`absolute animate-twinkle ${it.color}`}
            style={{
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: it.size,
              height: it.size,
              animationDelay: `${it.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
