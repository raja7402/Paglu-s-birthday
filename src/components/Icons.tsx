import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };

export function Crown({ className, style }: P) {
  return (
    <svg viewBox="0 0 120 84" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff2a8" />
          <stop offset="0.5" stopColor="#ffc83d" />
          <stop offset="1" stopColor="#e69a1a" />
        </linearGradient>
      </defs>
      <path
        d="M8 72 L2 18 L34 42 L60 6 L86 42 L118 18 L112 72 Z"
        fill="url(#crownGold)"
        stroke="#c97d0c"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="8" y="62" width="104" height="14" rx="5" fill="url(#crownGold)" stroke="#c97d0c" strokeWidth="3" />
      <circle cx="2" cy="16" r="6" fill="#ff4fa3" stroke="#c97d0c" strokeWidth="2" />
      <circle cx="60" cy="6" r="7" fill="#9b5cff" stroke="#c97d0c" strokeWidth="2" />
      <circle cx="118" cy="16" r="6" fill="#ff4fa3" stroke="#c97d0c" strokeWidth="2" />
      <circle cx="34" cy="69" r="4" fill="#ff4fa3" />
      <circle cx="60" cy="69" r="4.5" fill="#9b5cff" />
      <circle cx="86" cy="69" r="4" fill="#ff4fa3" />
      <path d="M24 30 L30 52" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Amulet({ className, style }: P) {
  return (
    <svg viewBox="0 0 100 130" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="gem" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#e5ccff" />
          <stop offset="0.45" stopColor="#9b5cff" />
          <stop offset="1" stopColor="#4b1d8f" />
        </radialGradient>
        <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff2a8" />
          <stop offset="0.5" stopColor="#ffc83d" />
          <stop offset="1" stopColor="#d9901a" />
        </linearGradient>
      </defs>
      <path d="M6 0 Q50 64 94 0" fill="none" stroke="url(#gold2)" strokeWidth="3.5" strokeLinecap="round" />
      {/* little wings */}
      <path d="M22 78 Q4 68 6 50 Q18 56 28 70 Z" fill="url(#gold2)" stroke="#c97d0c" strokeWidth="1.5" />
      <path d="M78 78 Q96 68 94 50 Q82 56 72 70 Z" fill="url(#gold2)" stroke="#c97d0c" strokeWidth="1.5" />
      <ellipse cx="50" cy="82" rx="30" ry="36" fill="url(#gold2)" stroke="#c97d0c" strokeWidth="2" />
      <ellipse cx="50" cy="82" rx="22" ry="28" fill="url(#gem)" stroke="#c97d0c" strokeWidth="1.5" />
      <ellipse cx="42" cy="68" rx="6" ry="10" fill="#fff" opacity=".5" transform="rotate(20 42 68)" />
      <circle cx="50" cy="44" r="5" fill="url(#gold2)" stroke="#c97d0c" strokeWidth="1.5" />
    </svg>
  );
}

export function Ghost({ className, style }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <path
        d="M50 8 C34 8 28 20 28 34 L28 44 C28 50 22 54 14 58 C20 62 26 64 30 64 C30 70 24 72 20 74 C30 80 38 76 42 74 C46 80 54 80 58 74 C62 76 70 80 80 74 C76 72 70 70 70 64 C74 64 80 62 86 58 C78 54 72 50 72 44 L72 34 C72 20 66 8 50 8 Z"
        fill="#fffc00"
        stroke="#fff"
        strokeWidth="5"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
      <path
        d="M50 8 C34 8 28 20 28 34 L28 44 C28 50 22 54 14 58 C20 62 26 64 30 64 C30 70 24 72 20 74 C30 80 38 76 42 74 C46 80 54 80 58 74 C62 76 70 80 80 74 C76 72 70 70 70 64 C74 64 80 62 86 58 C78 54 72 50 72 44 L72 34 C72 20 66 8 50 8 Z"
        fill="#fffc00"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Heart({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Butterfly({ className, style }: P) {
  return (
    <svg viewBox="0 0 60 50" className={className} style={style} aria-hidden>
      <g className="origin-center animate-flap" style={{ transformOrigin: "30px 25px" }}>
        <path d="M30 24 C18 2 2 4 4 20 C5 30 18 34 30 28Z" fill="#ff7ac0" stroke="#fff" strokeWidth="1.5" />
        <path d="M30 24 C42 2 58 4 56 20 C55 30 42 34 30 28Z" fill="#b57bff" stroke="#fff" strokeWidth="1.5" />
        <path d="M30 28 C20 34 10 40 16 46 C22 50 28 40 30 32Z" fill="#b57bff" stroke="#fff" strokeWidth="1.5" />
        <path d="M30 28 C40 34 50 40 44 46 C38 50 32 40 30 32Z" fill="#ff7ac0" stroke="#fff" strokeWidth="1.5" />
      </g>
      <rect x="28.5" y="18" width="3" height="20" rx="1.5" fill="#3a1466" />
    </svg>
  );
}

export function BunnyEars({ className, style }: P) {
  return (
    <svg viewBox="0 0 120 110" className={className} style={style} aria-hidden>
      <g transform="rotate(-12 40 100)">
        <ellipse cx="40" cy="50" rx="17" ry="46" fill="#fff" stroke="#e7c6ff" strokeWidth="3" />
        <ellipse cx="40" cy="52" rx="8" ry="34" fill="#ffadd6" />
      </g>
      <g transform="rotate(12 80 100)">
        <ellipse cx="80" cy="50" rx="17" ry="46" fill="#fff" stroke="#e7c6ff" strokeWidth="3" />
        <ellipse cx="80" cy="52" rx="8" ry="34" fill="#ffadd6" />
      </g>
    </svg>
  );
}

export function Castle({ className, style }: P) {
  return (
    <svg viewBox="0 0 400 160" className={className} style={style} preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <rect x="20" y="90" width="50" height="70" />
        <path d="M14 90 L45 30 L76 90Z" />
        <rect x="100" y="60" width="44" height="100" />
        <path d="M94 60 L122 6 L150 60Z" />
        <rect x="165" y="80" width="70" height="80" />
        <rect x="160" y="70" width="80" height="14" />
        {[165, 180, 195, 210, 225].map((x) => (
          <rect key={x} x={x} y="60" width="10" height="12" />
        ))}
        <rect x="260" y="60" width="44" height="100" />
        <path d="M254 60 L282 6 L310 60Z" />
        <rect x="330" y="90" width="50" height="70" />
        <path d="M324 90 L355 30 L386 90Z" />
      </g>
      <g fill="#fff" opacity=".35">
        <path d="M120 110 h6 v18 h-6z M280 110 h6 v18 h-6z M43 120 h6 v16 h-6z M353 120 h6 v16 h-6z" />
        <path d="M188 120 h24 v40 h-24z" />
      </g>
    </svg>
  );
}
