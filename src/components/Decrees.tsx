import { DECREES } from "@/data";
import { Amulet, Crown, Heart } from "./Icons";
import { Reveal } from "@/lib/hooks";

export function Decrees() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-script text-4xl text-[#ff2d95] sm:text-5xl">Royal Decrees</p>
          <h2 className="mt-1 text-4xl font-bold text-[#3a1466] sm:text-5xl">Sophia-approved birthday rules</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DECREES.map((d, i) => (
            <Reveal key={d.title} delay={i * 130}>
              <article className="group relative h-full overflow-hidden rounded-3xl bg-white/80 p-7 text-center shadow-[0_16px_50px_rgba(155,92,255,.2)] ring-1 ring-white backdrop-blur transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,45,149,.3)]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#ff7ac0]/40 to-[#b57bff]/40 blur-2xl transition duration-500 group-hover:scale-150" />
                <div className="relative mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-pink-100 to-violet-100 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {d.icon === "amulet" && <Amulet className="h-16 w-12 animate-glow" />}
                  {d.icon === "heart" && <Heart className="h-12 w-12 animate-bob text-[#ff2d95]" />}
                  {d.icon === "crown" && <Crown className="h-12 w-14 animate-bob" />}
                </div>
                <p className="relative text-sm font-bold uppercase tracking-widest text-[#b57bff]">Decree #{i + 1}</p>
                <h3 className="relative mt-1 text-2xl font-bold text-[#3a1466]">{d.title}</h3>
                <p className="relative mt-3 text-[#5b2a9d]/90">{d.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
