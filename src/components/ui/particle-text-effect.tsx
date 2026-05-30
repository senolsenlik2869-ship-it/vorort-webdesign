import { memo, useEffect, useRef, useState } from "react";

const WORDS = ["VORORT", "WEBDESIGN", "SEO", "GOOGLE", "PERFORMANCE", "CONVERSION"];
const COLORS = ["#D4AF37", "#FFFFFF", "#C9C9C9", "#8A8A8A"];
const WORD_DURATION = 5600;

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

function createTextPoints(word: string, width: number, height: number, isMobile: boolean): Point[] {
  const textCanvas = document.createElement("canvas");
  const sampleScale = isMobile ? 0.72 : 0.82;
  textCanvas.width = Math.max(1, Math.floor(width * sampleScale));
  textCanvas.height = Math.max(1, Math.floor(height * sampleScale));

  const context = textCanvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];

  const longestWordRatio = word.length > 9 ? 0.105 : word.length > 6 ? 0.13 : 0.18;
  const baseSize = Math.min(textCanvas.width * longestWordRatio, textCanvas.height * (isMobile ? 0.34 : 0.42));
  const fontSize = Math.max(isMobile ? 38 : 64, Math.min(baseSize, isMobile ? 66 : 118));

  context.clearRect(0, 0, textCanvas.width, textCanvas.height);
  context.fillStyle = "#FFFFFF";
  context.font = `900 ${fontSize}px Geist, Manrope, Inter, system-ui, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.letterSpacing = word.length > 8 ? "-2px" : "0px";
  context.fillText(word, textCanvas.width / 2, textCanvas.height / 2);

  const imageData = context.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  const step = isMobile ? 8 : 6;
  const points: Point[] = [];

  for (let y = 0; y < textCanvas.height; y += step) {
    for (let x = 0; x < textCanvas.width; x += step) {
      const alpha = imageData[(y * textCanvas.width + x) * 4 + 3];

      if (alpha > 120) {
        const normalizedX = x / sampleScale;
        const normalizedY = y / sampleScale;
        const colorIndex = Math.abs(Math.floor(normalizedX * 0.04 + normalizedY * 0.06)) % COLORS.length;

        points.push({
          x: normalizedX + (width - textCanvas.width / sampleScale) / 2,
          y: normalizedY + (height - textCanvas.height / sampleScale) / 2,
          color: COLORS[colorIndex],
        });
      }
    }
  }

  return shufflePoints(points);
}

function ParticleTextEffectComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      size: isMobile ? 1.35 : 1.75,
      alpha: 0.86 + Math.random() * 0.14,
      color: point.color,
    });

    const setWord = (wordIndex: number) => {
      const maxParticles = isMobile ? 420 : width < 900 ? 620 : 860;
      const points = createTextPoints(WORDS[wordIndex], width, height, isMobile).slice(0, maxParticles);

      particles = points.map((point, index) => {
        const existing = particles[index];

        if (!existing) return createParticle(point);

        return {
          ...existing,
          targetX: point.x,
          targetY: point.y,
          color: point.color,
          size: isMobile ? 1.35 : 1.75,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(220, rect.height);
      isMobile = width <= 640;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      setWord(activeWord);
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

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearInterval(wordTimer);
      window.removeEventListener("resize", resize);
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
    </div>
  );
}

export const ParticleTextEffect = memo(ParticleTextEffectComponent);
