import { useEffect, useRef, useState } from "react";
import { CHAT, FROM, NAME, PHOTOS, REPLIES } from "@/data";
import { Photo } from "./Photo";
import { Reveal, useInView } from "@/lib/hooks";
import { burst } from "@/lib/confetti";
import { cn } from "@/utils/cn";

export function Chat() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const body = useRef<HTMLDivElement>(null);
  const allShown = shown >= CHAT.length;

  // reveal messages one by one, with a typing indicator in between
  useEffect(() => {
    if (!inView || allShown) return;
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setShown((s) => s + 1);
    }, 900 + Math.min(CHAT[shown].length * 14, 900));
    return () => window.clearTimeout(t);
  }, [inView, shown, allShown]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [shown, typing, replies]);

  const reply = (text: string, e: React.MouseEvent) => {
    setReplies((r) => [...r, text]);
    burst(e.clientX, e.clientY, 40);
  };

  return (
    <section id="chat" className="relative px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="font-script text-4xl text-[#ff2d95] sm:text-5xl">New Chat</p>
          <h2 className="mt-1 text-4xl font-bold text-[#3a1466] sm:text-5xl">A message for you 💌</h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div
            ref={ref}
            className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(155,92,255,.35)] ring-4 ring-white"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-pink-100 bg-white px-4 py-3">
              <span className="story-ring rounded-full p-[3px]">
                <Photo
                  src={PHOTOS.smile}
                  alt={NAME}
                  className="h-11 w-11 rounded-full border-2 border-white"
                  pos="50% 50%"
                />
              </span>
              <div className="flex-1 leading-tight">
                <p className="font-bold text-[#3a1466]">{NAME} 👑</p>
                <p className="text-xs font-semibold text-[#9a6bc9]">Best friends · 🔥 ∞ streak</p>
              </div>
              <span className="text-xl">📞</span>
              <span className="text-xl">🎥</span>
            </div>

            {/* messages */}
            <div ref={body} className="h-[420px] space-y-4 overflow-y-auto bg-[#fffafd] px-4 py-5 no-scrollbar">
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#c9a4ff]">Today</p>

              {CHAT.slice(0, shown).map((m, i) => (
                <Msg key={i} who={FROM.toUpperCase()} color="#ff2d95" text={m} />
              ))}

              {typing && (
                <div className="msg-in flex items-center gap-1.5 pl-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 rounded-full bg-[#b57bff]"
                      style={{ animation: `dot 1.1s ${d * 0.15}s infinite` }}
                    />
                  ))}
                  <span className="ml-1 text-xs text-[#b57bff]">{FROM} is typing…</span>
                </div>
              )}

              {replies.map((r, i) => (
                <Msg key={`r${i}`} who="ME" color="#9b5cff" text={r} />
              ))}
            </div>

            {/* quick replies */}
            <div className="border-t border-pink-100 bg-white px-3 py-3">
              <div
                className={cn(
                  "no-scrollbar flex gap-2 overflow-x-auto transition-all duration-500",
                  allShown ? "opacity-100" : "pointer-events-none opacity-40"
                )}
              >
                {REPLIES.map((r) => (
                  <button
                    key={r}
                    onClick={(e) => reply(r, e)}
                    className="shrink-0 rounded-full bg-gradient-to-r from-pink-100 to-violet-100 px-4 py-2 text-sm font-semibold text-[#5b2a9d] transition hover:scale-105 active:scale-95"
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-xs text-[#b79ad6]">
                {allShown ? "Tap to reply 👆" : "Messages are arriving…"}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Msg({ who, color, text }: { who: string; color: string; text: string }) {
  return (
    <div className="msg-in border-l-[3px] pl-3" style={{ borderColor: color }}>
      <p className="text-[0.7rem] font-bold uppercase tracking-wider" style={{ color }}>
        {who}
      </p>
      <p className="text-[1.02rem] leading-snug text-[#3a1466]">{text}</p>
    </div>
  );
}
