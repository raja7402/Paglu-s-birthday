import { useState } from "react";
import { cn } from "@/utils/cn";
import { Ghost } from "./Icons";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  pos?: string;
};

/** Photo with a pretty placeholder if the file hasn't been added yet. */
export function Photo({ src, alt, className, pos = "50% 50%" }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative grid place-items-center overflow-hidden bg-gradient-to-br from-pink-300 via-fuchsia-300 to-violet-400",
          className
        )}
      >
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,#fff,transparent_40%)]" />
        <div className="relative flex flex-col items-center gap-2 px-3 text-center text-white">
          <Ghost className="h-12 w-12 animate-bob drop-shadow" />
          <p className="text-xs font-semibold drop-shadow">
            {src ? `Add ${src.split("/").pop()}` : "Royal surprise"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
      style={{ objectPosition: pos }}
    />
  );
}
