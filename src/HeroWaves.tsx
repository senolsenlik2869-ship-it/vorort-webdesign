import { useEffect, useRef } from "react";

/**
 * Ruhige, dunkelblaue Wellen (Look angelehnt an Motionsites „Dark Blue Waves“).
 * Reiner 2D-Canvas: wenige KB statt mehrerer MB Video. Auf dem Handy mit 30 fps und
 * weniger Ebenen, bei prefers-reduced-motion nur ein Standbild.
 */
type Layer = { base: number; amp: number; freq: number; speed: number; phase: number; hue: number; light: number; alpha: number };

const LAYERS: Layer[] = [
  { base: 0.38, amp: 0.1, freq: 1.1, speed: 0.05, phase: 0.4, hue: 222, light: 52, alpha: 0.45 },
  { base: 0.5, amp: 0.12, freq: 0.8, speed: -0.04, phase: 2.1, hue: 214, light: 58, alpha: 0.6 },
  { base: 0.62, amp: 0.11, freq: 1.3, speed: 0.06, phase: 4.2, hue: 226, light: 62, alpha: 0.75 },
  { base: 0.76, amp: 0.09, freq: 0.95, speed: -0.05, phase: 1.3, hue: 205, light: 66, alpha: 0.9 },
  { base: 0.9, amp: 0.07, freq: 1.5, speed: 0.07, phase: 3.3, hue: 220, light: 70, alpha: 1 },
];

export function HeroWaves({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mobile = window.innerWidth < 768;
    let layers = mobile ? LAYERS.filter((_, i) => i % 2 === 0 || i === 3) : LAYERS;
    let w = 0;
    let h = 0;

    const resize = () => {
      mobile = window.innerWidth < 768;
      layers = mobile ? LAYERS.filter((_, i) => i % 2 === 0 || i === 3) : LAYERS;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const yAt = (l: Layer, x: number, t: number) => {
      const nx = x / w;
      return (
        h * l.base +
        h * l.amp * Math.sin(nx * Math.PI * 2 * l.freq + l.phase + t * l.speed * 6) +
        h * l.amp * 0.45 * Math.sin(nx * Math.PI * 2 * l.freq * 2.3 - l.phase * 1.7 + t * l.speed * 9)
      );
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#03050c");
      bg.addColorStop(1, "#050a1c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const step = mobile ? 14 : 10;
      for (const l of layers) {
        ctx.beginPath();
        ctx.moveTo(0, yAt(l, 0, t));
        for (let x = step; x <= w + step; x += step) ctx.lineTo(x, yAt(l, x, t));
        const rim = new Path2D();
        rim.moveTo(0, yAt(l, 0, t));
        for (let x = step; x <= w + step; x += step) rim.lineTo(x, yAt(l, x, t));

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        const top = h * (l.base - l.amp * 1.5);
        const fill = ctx.createLinearGradient(0, top, 0, top + h * 0.38);
        fill.addColorStop(0, `hsla(${l.hue}, 80%, 22%, ${0.55 * l.alpha})`);
        fill.addColorStop(0.35, `hsla(${l.hue}, 85%, 9%, ${0.9 * l.alpha})`);
        fill.addColorStop(1, "rgba(3, 5, 12, 0.98)");
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.lineCap = "round";
        ctx.strokeStyle = `hsla(${l.hue}, 95%, ${l.light}%, ${0.08 * l.alpha})`;
        ctx.lineWidth = mobile ? 10 : 16;
        ctx.stroke(rim);
        ctx.strokeStyle = `hsla(${l.hue}, 95%, ${l.light}%, ${0.55 * l.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke(rim);
      }
    };

    resize();
    let raf = 0;
    let running = false;
    let last = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (mobile && now - last < 33) return;
      last = now;
      draw((now - start) / 1000);
    };
    const play = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    draw(2.4);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? pause() : play());
    const onResize = () => {
      resize();
      draw((performance.now() - start) / 1000);
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
