import { Photo } from "./Photo";
import { Amulet, Butterfly, Castle, Crown, Ghost, Sparkle } from "./Icons";
import { NAME, PHOTOS } from "@/data";
import { burst } from "@/lib/confetti";
import { cn } from "@/utils/cn";

export function Hero({ started }: { started: boolean }) {
  const anim = (delay: number) => ({
    className: started ? "fade-up" : "opacity-0",
    style: { animationDelay: `${delay}ms` },
  });

  return (
    <section id="home" className="relative isolate overflow-hidden px-5 pb-32 pt-10 sm:pt-16">
      {/* castle skyline */}
      <Castle className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-full text-[#c9a4ff]/35 sm:h-72" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#f2e4ff] to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* ---------- text ---------- */}
        <div className="text-center lg:text-left">
          <div
            {...anim(100)}
            className={cn(
              "mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-royal shadow-md ring-1 ring-pink-200 backdrop-blur lg:mx-0",
              anim(100).className
            )}
          >
            <Ghost className="h-5 w-5" />
            <span>New snap from your bestie</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff2d95]" />
          </div>

          <p
            className={cn("font-script text-5xl text-[#ff2d95] sm:text-6xl", anim(250).className)}
            style={anim(250).style}
          >
            Happy Birthday
          </p>

          <h1
            className={cn(
              "text-shimmer mt-1 text-[5.2rem] font-bold leading-[0.95] tracking-tight sm:text-[7.5rem]",
              anim(400).className
            )}
            style={anim(400).style}
          >
            {NAME}
            <span className="inline-block animate-wiggle align-top text-[0.45em]">👑</span>
          </h1>

          <p
            className={cn("mx-auto mt-5 max-w-md text-lg text-[#5b2a9d]/90 lg:mx-0", anim(600).className)}
            style={anim(600).style}
          >
            A little royal snap, made just for the princess who owns every selfie, every streak and every
            adventure. 💜
          </p>

          <div
            className={cn("mt-7 flex flex-wrap justify-center gap-3 lg:justify-start", anim(800).className)}
            style={anim(800).style}
          >
            <a
              href="#stories"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d95] to-[#b57bff] px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_rgba(255,45,149,.45)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,45,149,.6)] active:scale-95"
            >
              Open my stories
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={(e) => burst(e.clientX, e.clientY, 100)}
              className="inline-flex items-center gap-2 rounded-full bg-[#fffc00] px-6 py-3.5 text-base font-bold text-[#3a1466] shadow-[0_10px_24px_rgba(255,200,0,.5)] transition hover:-translate-y-1 active:scale-95"
            >
              <Ghost className="h-6 w-6" /> Snap me a surprise
            </button>
          </div>

          <div
            className={cn("mt-8 flex flex-wrap justify-center gap-2 lg:justify-start", anim(1000).className)}
            style={anim(1000).style}
          >
            {["🔥 Streak: ∞", "💖 Pink Mode: ON", "🏰 Enchancia Edition"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-pink-200 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-royal backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- camera frame ---------- */}
        <div
          className={cn("relative mx-auto", started ? "fade-up" : "opacity-0")}
          style={{ animationDelay: "500ms" }}
        >
          {/* rotating halo */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#ff2d95,#ffc83d,#b57bff,#ff2d95)] opacity-40 blur-2xl" />

          <div className="relative animate-float-slow">
            <div className="relative w-[min(78vw,300px)] overflow-hidden rounded-[2.2rem] bg-white p-2 shadow-[0_30px_80px_rgba(155,92,255,.45)] ring-2 ring-white">
              <div className="relative aspect-[839/1536] overflow-hidden rounded-[1.7rem] bg-pink-200">
                <Photo src={PHOTOS.smile} alt="Paglu smiling" className="h-full w-full" pos="50% 50%" />
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-[#4b1d8f]/50" />

                {/* camera UI */}
                <div className="absolute right-3 top-3 flex flex-col gap-2.5">
                  {["🔄", "⚡", "🎵", "✨"].map((e, i) => (
                    <span
                      key={e}
                      className="grid h-8 w-8 place-items-center rounded-full bg-black/35 text-sm backdrop-blur animate-pop"
                      style={{ animationDelay: `${1200 + i * 120}ms` }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-sm text-white backdrop-blur">
                  👤
                </span>

                {/* crown filter */}
                <Crown className="absolute left-[27%] top-[7%] w-[46%] -rotate-6 animate-bob drop-shadow-[0_6px_10px_rgba(0,0,0,.35)]" />
                <Sparkle className="absolute left-[18%] top-[14%] h-5 w-5 animate-twinkle text-yellow-200" />
                <Sparkle
                  className="absolute right-[22%] top-[9%] h-4 w-4 animate-twinkle text-white"
                  style={{ animationDelay: "0.8s" }}
                />

                {/* snap caption */}
                <div className="absolute inset-x-0 top-[72%] bg-black/55 px-3 py-2 text-center text-[0.95rem] font-semibold text-white backdrop-blur-sm">
                  Princess {NAME} 👑 turns another year magical ✨
                </div>

                {/* shutter */}
                <div className="absolute inset-x-0 bottom-3 flex justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-white">
                    <span className="h-7 w-7 rounded-full bg-white/30" />
                  </span>
                </div>
              </div>
            </div>

            {/* floating stickers outside the frame */}
            <div
              className="absolute -right-6 bottom-24 w-16 animate-float"
              style={{ "--r": "8deg" } as React.CSSProperties}
            >
              <Amulet className="animate-glow" />
            </div>
            <Butterfly className="absolute -left-8 top-1/3 h-10 w-10 animate-float" />
            <Butterfly
              className="absolute -right-4 top-10 h-8 w-8 animate-float"
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className="absolute -left-5 bottom-14 grid h-14 w-14 place-items-center rounded-2xl bg-[#fffc00] shadow-lg animate-float"
              style={{ "--r": "-10deg" } as React.CSSProperties}
            >
              <Ghost className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
