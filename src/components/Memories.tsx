import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import { Reveal, useInView } from "@/lib/hooks";
import { PHOTOS } from "@/data";
import { Sparkle } from "./Icons";

export function Memories() {
  return (
    <section id="memories" className="relative px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-script text-4xl text-[#ff2d95] sm:text-5xl">Memory Lane</p>
          <h2 className="mt-1 text-4xl font-bold text-[#3a1466] sm:text-5xl">From tiny princess to queen</h2>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <ThenNow />
        </Reveal>

        <div className="mt-24 grid gap-10 sm:grid-cols-2">
          <Reveal>
            <Polaroid
              src={PHOTOS.snow}
              pos="50% 30%"
              rotate="-3deg"
              caption="Snow Queen mode ❄️"
              sub="Cold weather, warm heart"
              snow
            />
          </Reveal>
          <Reveal delay={150} className="sm:mt-16">
            <Polaroid
              src={PHOTOS.smile}
              pos="50% 55%"
              rotate="3deg"
              caption="Winking at the camera 😉"
              sub="Pure sunshine, zero filter needed"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Polaroid({
  src,
  pos,
  rotate,
  caption,
  sub,
  snow,
}: {
  src: string;
  pos: string;
  rotate: string;
  caption: string;
  sub: string;
  snow?: boolean;
}) {
  return (
    <figure
      className="group mx-auto w-full max-w-sm rounded-md bg-white p-3 pb-5 shadow-[0_20px_50px_rgba(91,42,157,.25)] transition duration-500 hover:!rotate-0 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(255,45,149,.35)]"
      style={{ rotate }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-pink-100">
        <Photo src={src} alt={caption} className="h-full w-full transition duration-700 group-hover:scale-105" pos={pos} />
        {snow && <Snow />}
      </div>
      <figcaption className="mt-4 px-1 text-center">
        <p className="text-xl font-bold text-[#3a1466]">{caption}</p>
        <p className="font-script text-2xl text-[#ff2d95]">{sub}</p>
      </figcaption>
    </figure>
  );
}

function Snow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 47) % 100}%`,
            top: 0,
            width: 4 + (i % 4) * 2,
            height: 4 + (i % 4) * 2,
            opacity: 0.85,
            ["--sx" as string]: `${(i % 2 ? 1 : -1) * (10 + (i % 5) * 6)}px`,
            animation: `snowfall ${5 + (i % 6)}s linear ${(i % 8) * -1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Before / after drag slider using a native range input (works great on touch). */
function ThenNow() {
  const [pos, setPos] = useState(50);
  const touched = useRef(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.5);

  // little intro demo animation so people notice it's draggable
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      if (touched.current) return;
      const t = (now - t0) / 1000;
      if (t > 2.6) {
        setPos(50);
        return;
      }
      setPos(50 + Math.sin(t * 2.4) * 28 * (1 - t / 2.6));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
      <div ref={ref} className="relative mx-auto w-[min(84vw,320px)] select-none">
        <div className="relative aspect-[839/1536] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(155,92,255,.4)] ring-4 ring-white">
          {/* "now" underneath */}
          <Photo src={PHOTOS.smile} alt="Paglu now" className="absolute inset-0 h-full w-full" />
          {/* "then" on top, clipped */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Photo src={PHOTOS.kid} alt="Paglu as a child" className="h-full w-full" pos="50% 30%" />
          </div>

          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            🎀 Then
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            Now 👑
          </span>

          {/* handle */}
          <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-[0_0_16px_rgba(255,255,255,.9)]" style={{ left: `${pos}%` }}>
            <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#ff2d95] to-[#b57bff] text-white shadow-xl ring-4 ring-white">
              <span className="text-lg font-bold tracking-tighter">◀▶</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={pos}
            aria-label="Compare then and now"
            onChange={(e) => {
              touched.current = true;
              setPos(Number(e.target.value));
            }}
            onPointerDown={() => (touched.current = true)}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <Sparkle className="absolute -right-4 -top-4 h-8 w-8 animate-twinkle text-yellow-400" />
        <Sparkle className="absolute -bottom-3 -left-4 h-6 w-6 animate-twinkle text-pink-400" />
      </div>

      <div className="text-center md:text-left">
        <p className="text-2xl font-bold leading-snug text-[#3a1466] sm:text-3xl">
          Same sparkle in the eyes.
          <br />
          <span className="text-shimmer">Just a bigger crown.</span> 👑
        </p>
        <p className="mx-auto mt-4 max-w-md text-lg text-[#5b2a9d]/90 md:mx-0">
          Drag the slider and watch the little princess grow into the amazing person we all love. Some things
          never change: the cute smile, the big heart and the royal attitude. 💖
        </p>
        <p className="mt-5 inline-block animate-bob rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#ff2d95] shadow ring-1 ring-pink-200">
          👆 Drag the photo left and right
        </p>
      </div>
    </div>
  );
}
