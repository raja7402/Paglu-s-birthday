type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  life: number;
  color: string;
  kind: "rect" | "circle" | "emoji";
  emoji?: string;
};

const COLORS = ["#ff2d95", "#ff7ac0", "#ffd6ea", "#b57bff", "#9b5cff", "#ffc83d", "#fffc00", "#ffffff"];
const EMOJIS = ["👑", "💖", "✨", "🦋", "💜", "🎀", "👻", "🎉"];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let parts: Particle[] = [];
let raf = 0;
let rainUntil = 0;

function ensure() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999",
  });
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  const resize = () => {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
}

function make(x: number, y: number, vx: number, vy: number): Particle {
  const r = Math.random();
  return {
    x,
    y,
    vx,
    vy,
    size: 6 + Math.random() * 8,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    kind: r < 0.18 ? "emoji" : r < 0.5 ? "circle" : "rect",
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
  };
}

function tick() {
  if (!canvas || !ctx) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  if (performance.now() < rainUntil) {
    for (let i = 0; i < 2; i++) {
      parts.push(make(Math.random() * w, -20, (Math.random() - 0.5) * 2, 2 + Math.random() * 3));
    }
  }

  parts = parts.filter((p) => p.y < h + 40 && p.life > 0);
  for (const p of parts) {
    p.vy += 0.16;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 0.004;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2));
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.kind === "emoji") {
      ctx.font = `${p.size * 2}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.emoji ?? "✨", 0, 0);
    } else if (p.kind === "circle") {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    ctx.restore();
  }

  if (parts.length === 0 && performance.now() > rainUntil) {
    ctx.clearRect(0, 0, w, h);
    raf = 0;
    return;
  }
  raf = requestAnimationFrame(tick);
}

function start() {
  if (!raf) raf = requestAnimationFrame(tick);
}

export function burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 110) {
  ensure();
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 4 + Math.random() * 9;
    parts.push(make(x, y, Math.cos(a) * s, Math.sin(a) * s - 5));
  }
  start();
}

export function rain(ms = 3500) {
  ensure();
  rainUntil = performance.now() + ms;
  start();
}
