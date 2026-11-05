import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Crown, Ghost } from "./Icons";

const ITEMS = [
  { id: "home", label: "Home", icon: "🏰" },
  { id: "stories", label: "Stories", icon: "👥" },
  { id: "lens", label: "Camera", icon: "camera" },
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "cake", label: "Wish", icon: "🎂" },
];

/** Snapchat-style bottom nav that scrolls to each section. */
export function Dock({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      )}
      aria-label="Sections"
    >
      <ul className="flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-1.5 shadow-[0_10px_40px_rgba(155,92,255,.35)] backdrop-blur-xl">
        {ITEMS.map((it) => {
          const isCam = it.icon === "camera";
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-label={it.label}
                className={cn(
                  "grid place-items-center rounded-full transition-all duration-300",
                  isCam
                    ? "mx-1 h-12 w-12 bg-gradient-to-br from-[#ff2d95] to-[#b57bff] text-white shadow-lg hover:scale-110"
                    : "h-10 w-10 text-lg hover:scale-110",
                  !isCam && active === it.id && "bg-pink-100 scale-110",
                  isCam && active === it.id && "scale-110 ring-4 ring-pink-200"
                )}
              >
                {isCam ? <Crown className="h-6 w-7" /> : it.icon === "🏰" ? <Ghost className="h-6 w-6" /> : it.icon}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
