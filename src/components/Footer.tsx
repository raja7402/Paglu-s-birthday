import { Castle, Ghost, Heart } from "./Icons";
import { FROM, NAME } from "@/data";
import { Reveal } from "@/lib/hooks";
import { burst } from "@/lib/confetti";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-[#e6d0ff] to-[#5b2a9d] px-5 pb-36 pt-20 text-center">
      <Castle className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-full text-[#240b4a]/60" />
      <Reveal>
        <button
          onClick={(e) => burst(e.clientX, e.clientY, 80)}
          className="mx-auto mb-5 grid h-20 w-20 animate-wiggle place-items-center rounded-3xl bg-[#fffc00] shadow-xl transition active:scale-90"
          aria-label="Ghost surprise"
        >
          <Ghost className="h-14 w-14" />
        </button>
        <p className="font-script text-5xl text-white drop-shadow sm:text-6xl">Happy Birthday, {NAME}!</p>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/90">
          Thank you for being my favourite notification. Keep sparkling, keep snapping and keep that streak alive. 🔥
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 font-semibold text-white backdrop-blur">
          Made with <Heart className="h-4 w-4 animate-pulse text-[#ff7ac0]" /> by {FROM}
        </p>
      </Reveal>
    </footer>
  );
}
