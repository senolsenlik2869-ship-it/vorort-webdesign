import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { HERO_POSTER, HERO_POSTER_MOBILE, HERO_VIDEO, WHATSAPP_HREF } from "./site";
import { WhatsAppIcon } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fly-through-Hero (Grundlage: Motionsites „Freight Scroll Hero“ – gepinnte Bühne,
 * scroll-gesteuert). Riesiges „VOR ORT“ als Maske über dem Erde-Video, das „O“ von
 * „ORT“ ist der VorOrt-Pin. Beim Scrollen fliegt die Kamera durch den Pin, das Video
 * füllt den Screen, dann erscheint die Headline.
 *
 * Technik: Schwarze Ebene mit weißer Schrift und mix-blend-mode: multiply über dem
 * Video – Weiß lässt das Video durch, Schwarz deckt ab. Skaliert wird nur per transform.
 */

/**
 * Pin als Buchstabe „O“: weiße Kontur (Video sichtbar), schwarzes Inneres,
 * der Kreis in der Mitte ist das LOCH – auch weiß, also Video sichtbar.
 * Durch dieses Loch fliegt die Kamera.
 */
function PinGlyph() {
  return (
    <svg className="fly-pin" viewBox="0 0 24 32" aria-hidden="true">
      <path
        d="M12 1.9C6.3 1.9 1.9 6.3 1.9 12c0 7.6 8.9 16.9 9.6 17.6.3.3.7.3 1 0 .7-.7 9.6-10 9.6-17.6 0-5.7-4.4-10.1-10.1-10.1Z"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <circle className="fly-hole" cx="12" cy="12" r="4.6" fill="#fff" />
    </svg>
  );
}

export function FlyHero() {
  const root = useRef<HTMLElement>(null);
  const [mode] = useState<"full" | "mobile" | "static">(() => {
    if (typeof window === "undefined") return "static";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
    return window.matchMedia("(min-width: 768px)").matches ? "full" : "mobile";
  });
  const useVideo = mode === "full";

  useLayoutEffect(() => {
    if (mode === "static" || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const hole = el.querySelector<SVGCircleElement>(".fly-hole")!;
      const type = el.querySelector<HTMLElement>(".fly-type")!;
      const zoom = { p: 0 };
      let target = 50;

      // transform-origin exakt auf den Mittelpunkt des Lochs; Zielskalierung so groß,
      // dass der Kreis auch die entfernteste Bildschirmecke abdeckt.
      const measure = () => {
        gsap.set(type, { scale: 1 });
        const t = type.getBoundingClientRect();
        const h = hole.getBoundingClientRect();
        const cx = h.left + h.width / 2;
        const cy = h.top + h.height / 2;
        const r = h.width / 2;
        gsap.set(type, { transformOrigin: `${cx - t.left}px ${cy - t.top}px` });
        const w = window.innerWidth;
        const vh = window.innerHeight;
        const far = Math.max(Math.hypot(cx, cy), Math.hypot(w - cx, cy), Math.hypot(cx, vh - cy), Math.hypot(w - cx, vh - cy));
        target = Math.max(20, (far / r) * 1.08);
        gsap.set(type, { scale: Math.pow(target, zoom.p) });
      };
      measure();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: measure,
        },
      });

      // Exponentielle Skalierung = gleichmäßiger „Flug“ statt Ruck am Ende.
      tl.to(".fly-hint", { opacity: 0, duration: 0.06 }, 0)
        .to(".fly-media", { scale: 1, duration: 0.62 }, 0)
        .to(zoom, { p: 1, duration: 0.62, ease: "power1.in", onUpdate: () => gsap.set(type, { scale: Math.pow(target, zoom.p) }) }, 0)
        .to(".fly-mask", { opacity: 0, duration: 0.05 }, 0.62)
        .to(".fly-dim", { opacity: 1, duration: 0.18 }, 0.64)
        .to(".fly-copy > *", { opacity: 1, y: 0, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.7)
        .to({}, { duration: 0.08 });
    }, el);

    // Schriften können die Breite noch ändern → danach neu messen.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [mode]);

  // Video nur abspielen, solange der Hero sichtbar ist.
  useEffect(() => {
    if (!useVideo || !root.current) return;
    const video = root.current.querySelector("video");
    if (!video) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()));
    io.observe(root.current);
    return () => io.disconnect();
  }, [useVideo]);

  return (
    <section ref={root} className={`fly fly-${mode}`} id="start" aria-label="VorOrt Webdesign">
      <div className="fly-stage">
        <div className="fly-media" aria-hidden="true">
          {useVideo ? (
            <video src={HERO_VIDEO} poster={HERO_POSTER} muted loop playsInline preload="auto" autoPlay />
          ) : (
            <picture>
              <source media="(min-width: 768px)" srcSet={HERO_POSTER} />
              <img src={HERO_POSTER_MOBILE} alt="" fetchPriority="high" />
            </picture>
          )}
        </div>

        {mode !== "static" && (
          <div className="fly-mask" aria-hidden="true">
            <div className="fly-type">
              <span>VOR</span>
              <span className="fly-gap" />
              <PinGlyph />
              <span>RT</span>
            </div>
          </div>
        )}

        <div className="fly-dim" aria-hidden="true" />

        <div className="fly-copy container">
          <h1>
            Gefunden werden.
            <br />
            <span className="accent">Vor Ort.</span>
          </h1>
          <p>Websites für lokale Unternehmen in Duisburg und NRW, die bei Google gefunden werden und Anfragen bringen.</p>
          <div className="fly-actions">
            <a className="btn btn-whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>Per WhatsApp anfragen</span>
            </a>
            <a className="btn btn-ghost" href="#demos">
              <span>Demos ansehen</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {mode !== "static" && (
          <div className="fly-hint" aria-hidden="true">
            <span>Scrollen</span>
            <i />
          </div>
        )}
      </div>
    </section>
  );
}
