import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { STORIES, NAME, type StorySlide } from "@/data";
import { Photo } from "./Photo";
import { Amulet, Crown, Sparkle } from "./Icons";
import { Reveal } from "@/lib/hooks";
import { burst } from "@/lib/confetti";
import { cn } from "@/utils/cn";

const SLIDE_MS = 5500;

export function Stories() {
  const [open, setOpen] = useState<number | null>(null);
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  const markSeen = useCallback((id: string) => {
    setSeen((s) => (s[id] ? s : { ...s, [id]: true }));
  }, []);

  const openAt = (i: number) => {
    setOpen(i);
    markSeen(STORIES[i].id);
  };

  return (
    <section id="stories" className="relative isolate overflow-hidden px-5 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#4b1d8f] via-[#35126b] to-[#240b4a]" />
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[#ff2d95]/25 blur-3xl" />
      {Array.from({ length: 30 }).map((_, i) => (
        <Sparkle
          key={i}
          className="absolute -z-10 animate-twinkle text-white"
          style={{
            left: `${(i * 37 + 5) % 100}%`,
            top: `${30 + ((i * 53) % 70)}%`,
            width: 6 + (i % 4) * 3,
            height: 6 + (i % 4) * 3,
            animationDelay: `${(i % 8) * 0.45}s`,
          }}
        />
      ))}

      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-script text-4xl text-[#ff7ac0] sm:text-5xl">Royal Stories</p>
          <h2 className="mt-1 text-4xl font-bold text-white sm:text-5xl">Tap a ring to watch</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Just like on Snapchat. Tap a story, tap the sides to skip, and press and hold to pause. 👆
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
            {STORIES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => openAt(i)}
                className="group flex w-24 flex-col items-center gap-3 sm:w-28"
              >
                <span className="relative">
                  <span
                    className={cn(
                      "block rounded-full p-[4px] transition duration-500 group-hover:scale-110",
                      seen[s.id] ? "bg-white/40" : "story-ring animate-[spin_6s_linear_infinite]"
                    )}
                  >
                    <span className="block h-[5.5rem] w-[5.5rem] sm:h-24 sm:w-24" />
                  </span>
                  <span className="absolute inset-[4px] overflow-hidden rounded-full border-4 border-[#2a0f4d] bg-[#2a0f4d] transition duration-500 group-hover:scale-110">
                    {s.photo ? (
                      <Photo src={s.photo} alt={s.label} className="h-full w-full" pos={s.pos} />
                    ) : (
                      <span className="grid h-full w-full place-items-center bg-gradient-to-br from-[#ff2d95] to-[#9b5cff]">
                        <Amulet className="h-14 w-10 animate-glow" />
                      </span>
                    )}
                  </span>
                </span>
                <span className="text-sm font-semibold text-white drop-shadow sm:text-base">{s.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={250} className="mt-16">
          <button
            onClick={() => openAt(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-[#5b2a9d] shadow-[0_12px_30px_rgba(0,0,0,.3)] transition hover:-translate-y-1 active:scale-95"
          >
            <Crown className="h-5 w-6" /> Play all stories
          </button>
        </Reveal>
      </div>

      {open !== null &&
        createPortal(
          <StoryViewer
            start={open}
            onSeen={markSeen}
            onClose={() => setOpen(null)}
          />,
          document.body
        )}
    </section>
  );
}

function StoryViewer({
  start,
  onClose,
  onSeen,
}: {
  start: number;
  onClose: () => void;
  onSeen: (id: string) => void;
}) {
  const [idx, setIdx] = useState(start);
  const [paused, setPaused] = useState(false);
  const slide: StorySlide = STORIES[idx];

  const next = useCallback(() => {
    setIdx((i) => {
      if (i >= STORIES.length - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  }, [onClose]);
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  useEffect(() => {
    onSeen(slide.id);
    if (slide.id === "wish") burst(window.innerWidth / 2, window.innerHeight / 2, 120);
  }, [slide.id, onSeen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [next, onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1a0838]/90 backdrop-blur-md fade-up">
      <div
        className="relative h-[100dvh] w-full overflow-hidden bg-black sm:h-[min(92dvh,820px)] sm:w-auto sm:aspect-[9/16] sm:rounded-[2rem] sm:shadow-[0_30px_100px_rgba(255,45,149,.45)]"
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* slide */}
        <div key={slide.id} className="absolute inset-0 animate-[fadeUp_.5s_ease-out_both]">
          {slide.photo ? (
            <>
              <Photo src={slide.photo} alt="" className="absolute inset-0 h-full w-full scale-125 blur-2xl opacity-70" pos={slide.pos} />
              <Photo src={slide.photo} alt={slide.title} className="absolute inset-0 h-full w-full" pos={slide.pos} />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff4fa3] via-[#b04bd6] to-[#4b1d8f]">
              <Amulet className="absolute left-1/2 top-[18%] w-28 -translate-x-1/2 animate-glow animate-float" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />

          {/* floating stickers */}
          {slide.stickers.map((s, i) => (
            <span
              key={i}
              className="absolute animate-float text-4xl drop-shadow-lg"
              style={{
                left: `${14 + i * 30}%`,
                top: `${20 + (i % 2) * 14}%`,
                animationDelay: `${i * 0.6}s`,
                ["--r" as string]: `${i * 8 - 8}deg`,
              }}
            >
              {s}
            </span>
          ))}

          {/* caption */}
          <div className="absolute inset-x-0 top-[62%] animate-[fadeUp_.8s_.2s_ease-out_both]">
            <p className="bg-black/60 px-4 py-3 text-center text-lg font-semibold leading-snug text-white backdrop-blur-sm">
              {slide.caption}
            </p>
          </div>
        </div>

        {/* tap zones */}
        <button aria-label="Previous" onClick={prev} className="absolute inset-y-16 left-0 w-1/3 cursor-w-resize" />
        <button aria-label="Next" onClick={next} className="absolute inset-y-16 right-0 w-2/3 cursor-e-resize" />

        {/* progress bars */}
        <div className="absolute inset-x-3 top-3 z-10 flex gap-1.5">
          {STORIES.map((s, i) => (
            <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
              <div
                key={`${s.id}-${idx}`}
                className="h-full origin-left rounded-full bg-white"
                style={{
                  transform: i < idx ? "scaleX(1)" : "scaleX(0)",
                  animation: i === idx ? `storyfill ${SLIDE_MS}ms linear forwards` : undefined,
                  animationPlayState: paused ? "paused" : "running",
                }}
                onAnimationEnd={i === idx ? next : undefined}
              />
            </div>
          ))}
        </div>

        {/* header */}
        <div className="pointer-events-none absolute inset-x-3 top-7 z-10 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#ff2d95] to-[#b57bff] ring-2 ring-white">
            <Crown className="h-5 w-6" />
          </span>
          <div className="leading-tight text-white drop-shadow">
            <p className="text-base font-bold">{NAME} 👑</p>
            <p className="text-xs opacity-90">{slide.time}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close stories"
          className="absolute right-3 top-7 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-xl text-white backdrop-blur transition hover:bg-black/50 active:scale-90"
        >
          ✕
        </button>

        {/* reply bar */}
        <div className="pointer-events-none absolute inset-x-4 bottom-5 z-10 flex items-center gap-3">
          <span className="flex-1 rounded-full border border-white/60 bg-black/20 px-5 py-3 text-sm text-white/90 backdrop-blur">
            Send a chat…
          </span>
          <span className="text-2xl">💖</span>
        </div>
      </div>
    </div>
  );
}
