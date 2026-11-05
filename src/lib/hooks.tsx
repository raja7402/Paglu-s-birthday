import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export function useInView<T extends HTMLElement>(threshold = 0.2, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return [ref, inView] as const;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", inView && "in", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
