import { memo, useEffect, useRef, useState } from "react";

const WORDS = ["VORORT", "WEBDESIGN", "SEO", "GOOGLE", "PERFORMANCE", "CONVERSION"];
const COLORS = ["#D4AF37", "#FFFFFF", "#C9C9C9", "#8A8A8A"];
const WORD_DURATION = 5600;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 900;

type Point = {
  x: number;
  y: number;
  color: string;
};

type Particle = Point & {
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  return reducedMotion;
}

function shufflePoints(points: Point[]) {
  for (let index = points.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [points[index], points[swapIndex]] = [points[swapIndex], points[index]];
  }
  return points;
}

function getResponsiveFontBounds(width: number) {
  if (width <= MOBILE_BREAKPOINT) return { min: 34, max: 46, step: 10 };
  if (width <= TABLET_BREAKPOINT) return { min: 64, max: 78, step: 7 };
  return { min: 90, max: 110, step: 5 };
}

function getFittedFontSize(context: CanvasRenderingContext2D, word: string, width: number, height: number) {
  const { min, max } = getResponsiveFontBounds(width);
  const horizontalPadding = width <= MOBILE_BREAKPOINT ? 24 : 42;
  const availableWidth = Math.max(120, width - horizontalPadding * 2);
  const availableHeight = Math.max(80, height * (width <= MOBILE_BREAKPOINT ? 0.58 : 0.68));

  for (let size = max; size >= min; size -= 1) {
    context.font = `900 ${size}px Geist, Manrope, Inter, system-ui, sans-serif`;
    const metrics = context.measureText(word);
    const textHeight = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);

    if (metrics.width <= availableWidth && textHeight <= availableHeight) {
      return size;
    }
  }

  return min;
}

function createTextPoints(word: string, width: number, height: number, isMobile: boolean): Point[] {
  const textCanvas = document.createElement("canvas");
  textCanvas.width = Math.max(1, Math.floor(width));
  textCanvas.height = Math.max(1, Math.floor(height));

  const context = textCanvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];

  context.clearRect(0, 0, textCanvas.width, textCanvas.height);
  context.fillStyle = "#FFFFFF";
  const fontSize = getFittedFontSize(context, word, width, height);
  context.font = `900 ${fontSize}px Geist, Manrope, Inter, system-ui, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(word, textCanvas.width / 2, textCanvas.height / 2);

  const imageData = context.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  const step = isMobile ? 10 : width <= TABLET_BREAKPOINT ? 7 : 5;
  const points: Point[] = [];

  for (let y = 0; y < textCanvas.height; y += step) {
    for (let x = 0; x < textCanvas.width; x += step) {
      const alpha = imageData[(y * textCanvas.width + x) * 4 + 3];

      if (alpha > 120) {
        const normalizedX = x;
        const normalizedY = y;
        const colorIndex = Math.abs(Math.floor(normalizedX * 0.04 + normalizedY * 0.06)) % COLORS.length;

        points.push({
          x: normalizedX,
          y: normalizedY,
          color: COLORS[colorIndex],
        });
      }
    }
  }

  return shufflePoints(points);
}

function ParticleTextEffectComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeTimerRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let animationFrame = 0;
    let wordTimer = 0;
    let activeWord = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let isMobile = false;

    const createParticle = (point: Point): Particle => ({
      x: width / 2 + (Math.random() - 0.5) * width * 0.18,
      y: height / 2 + (Math.random() - 0.5) * height * 0.18,
      targetX: point.x,
      targetY: point.y,
      vx: 0,
      vy: 0,
      size: isMobile ? 1.2 : 1.75,
      alpha: 0.86 + Math.random() * 0.14,
      color: point.color,
    });

    const setWord = (wordIndex: number) => {
      const maxParticles = isMobile ? 330 : width < TABLET_BREAKPOINT ? 620 : 900;
      const points = createTextPoints(WORDS[wordIndex], width, height, isMobile).slice(0, maxParticles);

      particles = points.map((point, index) => {
        const existing = particles[index];

        if (!existing) return createParticle(point);

        return {
          ...existing,
          targetX: point.x,
          targetY: point.y,
          color: point.color,
          size: isMobile ? 1.2 : 1.75,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      isMobile = width <= MOBILE_BREAKPOINT;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      setWord(activeWord);
    };

    const debouncedResize = () => {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = window.setTimeout(resize, 120);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.55);
      glow.addColorStop(0, "rgba(212, 175, 55, 0.12)");
      glow.addColorStop(0.45, "rgba(201, 201, 201, 0.05)");
      glow.addColorStop(1, "rgba(5, 8, 22, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;

        particle.vx = (particle.vx + dx * 0.018) * 0.86;
        particle.vy = (particle.vy + dy * 0.018) * 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();

    wordTimer = window.setInterval(() => {
      activeWord = (activeWord + 1) % WORDS.length;
      setWord(activeWord);
    }, WORD_DURATION);

    window.addEventListener("resize", debouncedResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearInterval(wordTimer);
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
      }
      window.removeEventListener("resize", debouncedResize);
      particles = [];
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="particle-text-static" aria-label="VorOrt Webdesign SEO">
        <span>VORORT</span>
        <span>WEBDESIGN</span>
        <span>SEO</span>
      </div>
    );
  }

  return (
    <div className="particle-text-shell" aria-label="VorOrt Webdesign Visual">
      <canvas className="particle-text-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="particle-text-mobile-fallback" aria-hidden="true">
        <span>VORORT</span>
        <span>WEBDESIGN</span>
        <span>SEO</span>
      </div>
    </div>
  );
}

export const ParticleTextEffect = memo(ParticleTextEffectComponent);
