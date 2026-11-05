import { useRef, useState } from "react";
import { Photo } from "./Photo";
import { Amulet, BunnyEars, Butterfly, Crown, Heart, Sparkle } from "./Icons";
import { Reveal } from "@/lib/hooks";
import { burst } from "@/lib/confetti";
import { PHOTOS } from "@/data";
import { cn } from "@/utils/cn";

const LENSES = [
  { id: "none", name: "Just Paglu", icon: "🙂" },
  { id: "crown", name: "Royal Crown", icon: "👑" },
  { id: "amulet", name: "Amulet of Avalor", icon: "🔮" },
  { id: "butterfly", name: "Butterfly Garden", icon: "🦋" },
  { id: "bunny", name: "Clover Ears", icon: "🐰" },
  { id: "pink", name: "Pink Mode", icon: "💖" },
] as const;

type LensId = (typeof LENSES)[number]["id"];

export function Lens() {
  const [lens, setLens] = useState<LensId>("crown");
  const [flashKey, setFlashKey] = useState(0);
  const [toast, setToast] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const current = LENSES.find((l) => l.id === lens)!;

  const snap = (e: React.MouseEvent) => {
    setFlashKey((k) => k + 1);
    setToast(true);
    burst(e.clientX, e.clientY, 70);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(false), 2400);
  };

  return (
    <section id="lens" className="relative px-5 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal className="order-2 text-center md:order-1 md:text-left">
          <p className="font-script text-4xl text-[#ff2d95] sm:text-5xl">Royal Lenses</p>
          <h2 className="mt-1 text-4xl font-bold text-[#3a1466] sm:text-5xl">
            Try a lens, <span className="text-shimmer">Princess</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-[#5b2a9d]/90 md:mx-0">
            Because no Snapchat birthday is complete without filters. Swipe through the lenses, then hit the
            big shutter button to snap it. 📸
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/80 px-5 py-3 shadow-md ring-1 ring-pink-200 backdrop-blur">
            <span className="text-3xl">{current.icon}</span>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#ff2d95]">Active lens</p>
              <p className="text-lg font-bold text-[#3a1466]">{current.name}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="order-1 flex justify-center md:order-2">
          <div className="relative w-[min(82vw,320px)]">
            <div className="relative overflow-hidden rounded-[2.2rem] bg-black shadow-[0_30px_80px_rgba(155,92,255,.45)] ring-4 ring-white">
              <div className="relative aspect-[839/1536] overflow-hidden">
                <Photo
                  src={PHOTOS.smile}
                  alt="Paglu with a lens"
                  className={cn(
                    "h-full w-full transition duration-700",
                    lens === "pink" && "saturate-150 hue-rotate-[-12deg] brightness-110"
                  )}
                />

                {/* ---- LENS OVERLAYS ---- */}
                <div key={lens} className="pointer-events-none absolute inset-0 animate-[fadeUp_.5s_ease-out_both]">
                  {lens === "crown" && (
                    <>
                      <Crown className="absolute left-[24%] top-[8%] w-[48%] -rotate-6 animate-bob drop-shadow-[0_8px_12px_rgba(0,0,0,.4)]" />
                      {[
                        ["14%", "20%"],
                        ["78%", "14%"],
                        ["70%", "28%"],
                        ["22%", "30%"],
                      ].map(([l, t], i) => (
                        <Sparkle
                          key={i}
                          className="absolute h-5 w-5 animate-twinkle text-yellow-200"
                          style={{ left: l, top: t, animationDelay: `${i * 0.5}s` }}
                        />
                      ))}
                    </>
                  )}
                  {lens === "amulet" && (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_88%,rgba(155,92,255,.65),transparent_55%)]" />
                      <Amulet className="absolute left-[38%] top-[80%] w-[22%] animate-glow" />
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Sparkle
                          key={i}
                          className="absolute h-4 w-4 animate-twinkle text-fuchsia-200"
                          style={{
                            left: `${15 + ((i * 29) % 70)}%`,
                            top: `${60 + ((i * 17) % 35)}%`,
                            animationDelay: `${i * 0.35}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                  {lens === "butterfly" &&
                    Array.from({ length: 6 }).map((_, i) => (
                      <Butterfly
                        key={i}
                        className="absolute animate-float-slow"
                        style={{
                          left: `${8 + ((i * 37) % 76)}%`,
                          top: `${6 + ((i * 23) % 60)}%`,
                          width: 28 + (i % 3) * 8,
                          height: 24 + (i % 3) * 6,
                          animationDelay: `${i * 0.7}s`,
                        }}
                      />
                    ))}
                  {lens === "bunny" && (
                    <>
                      <BunnyEars className="absolute left-[22%] top-[3%] w-[52%] animate-wiggle origin-bottom drop-shadow-lg" />
                      <span className="absolute left-[54%] top-[55%] h-3.5 w-5 rounded-full bg-pink-400/90 shadow" />
                    </>
                  )}
                  {lens === "pink" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 via-fuchsia-300/20 to-pink-500/40 mix-blend-soft-light" />
                      <div className="absolute inset-0 bg-pink-300/15" />
                      {Array.from({ length: 9 }).map((_, i) => (
                        <Heart
                          key={i}
                          className="absolute animate-float text-pink-300"
                          style={{
                            left: `${5 + ((i * 41) % 85)}%`,
                            top: `${10 + ((i * 29) % 75)}%`,
                            width: 14 + (i % 3) * 8,
                            height: 14 + (i % 3) * 8,
                            animationDelay: `${i * 0.5}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                {/* camera chrome */}
                <div className="absolute left-3 top-3 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {current.icon} {current.name}
                </div>
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  {["🔄", "⚡", "⏱️"].map((e) => (
                    <span key={e} className="grid h-8 w-8 place-items-center rounded-full bg-black/35 text-sm backdrop-blur">
                      {e}
                    </span>
                  ))}
                </div>

                {/* flash */}
                {flashKey > 0 && <div key={flashKey} className="flash pointer-events-none absolute inset-0 bg-white" />}

                {/* saved toast */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-[44%] flex justify-center transition-all duration-500",
                    toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  <span className="rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    Saved to Royal Memories 💾
                  </span>
                </div>

                {/* bottom gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

                {/* lens carousel + shutter */}
                <div className="absolute inset-x-0 bottom-3">
                  <div className="no-scrollbar flex snap-x snap-mandatory items-center gap-3 overflow-x-auto px-[38%] py-2">
                    {LENSES.map((l) => (
                      <button
                        key={l.id}
                        onClick={(e) => {
                          setLens(l.id);
                          e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        }}
                        aria-label={l.name}
                        className={cn(
                          "grid shrink-0 snap-center place-items-center rounded-full bg-white/90 transition-all duration-300",
                          lens === l.id
                            ? "h-14 w-14 text-2xl ring-4 ring-[#ff2d95]"
                            : "h-10 w-10 text-lg opacity-80 hover:opacity-100"
                        )}
                      >
                        {l.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* big shutter outside the frame */}
            <div className="relative z-10 mx-auto -mt-1 flex justify-center">
              <button
                onClick={snap}
                aria-label="Take a snap"
                className="relative mt-5 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-[5px] border-[#ff2d95] bg-white shadow-[0_10px_30px_rgba(255,45,149,.5)] transition active:scale-90"
              >
                <span className="absolute inset-0 rounded-full border-4 border-[#ff2d95] animate-pulse-ring" />
                <span className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ff7ac0] to-[#ff2d95]" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
