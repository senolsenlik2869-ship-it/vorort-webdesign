import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, WHATSAPP_HREF } from "./site";
import { EASE, WhatsAppIcon, WordReveal } from "./ui";

/**
 * Hero mit cineastischem Video-Hintergrund (Motionsites „Velvet Wave“).
 * - Poster sofort sichtbar, Video blendet erst ein, wenn es wirklich läuft
 * - Headline + CTAs liegen nicht hinter dem Video-Laden
 * - Handy: leichtere Video-Version; Datensparmodus / reduzierte Bewegung: nur Poster
 * - Dezenter Parallax/Fade beim Scrollen
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [src] = useState(() => {
    if (typeof window === "undefined") return null;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    return window.matchMedia("(max-width: 767px)").matches ? { mp4: HERO.mobile } : { webm: HERO.webm, mp4: HERO.mp4 };
  });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0]);

  // Video pausieren, wenn der Hero nicht sichtbar ist.
  useEffect(() => {
    const video = ref.current?.querySelector("video");
    if (!video || !ref.current) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="hero" id="start">
      <motion.div className="hero-media" style={{ y: mediaY }} aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO.posterMobile} />
          <img className="hero-poster" src={HERO.poster} alt="" fetchPriority="high" decoding="async" />
        </picture>
        {src && (
          <video className={`hero-video ${playing ? "is-playing" : ""}`} autoPlay muted loop playsInline preload="auto" poster={HERO.poster} onPlaying={() => setPlaying(true)}>
            {src.webm && <source src={src.webm} type="video/webm" />}
            <source src={src.mp4} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />

      <motion.div className="container hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.p className="hero-eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <span aria-hidden="true" />
          Webdesign aus Duisburg · Niederrhein
        </motion.p>
        <WordReveal as="h1" immediate delay={0.1} className="hero-title" text="Websites, die nach _mehr_ aussehen." />
        <p className="hero-sub">Exklusive Websites zu fairen Preisen – für lokale Firmen in Duisburg und am Niederrhein.</p>
        <div className="hero-actions">
          <a className="btn btn-whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <span>Per WhatsApp anfragen</span>
          </a>
          <a className="btn btn-ghost" href="#angebot">
            <span>So funktioniert's</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
