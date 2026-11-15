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

function PinGlyph() {
  return (
    <svg className="fly-pin" viewBox="0 0 24 32" aria-hidden="true">
      <path d="M12 0.6C5.6 0.6 0.6 5.6 0.6 12c0 8.4 9.8 18.6 10.6 19.4.4.4 1.2.4 1.6 0 .8-.8 10.6-11 10.6-19.4C23.4 5.6 18.4.6 12 .6Z" fill="#fff" />
      <circle cx="12" cy="11.6" r="4.3" fill="#4d7cff" />
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
      const pin = el.querySelector<SVGElement>(".fly-pin")!;
      const type = el.querySelector<HTMLElement>(".fly-type")!;

      // Ursprung der Skalierung: unterer Teil des Pin-Körpers (unter dem Punkt),
      // damit die Kamera „in“ den Pin fliegt und das Video den Screen füllt.
      const setOrigin = () => {
        const t = type.getBoundingClientRect();
        const p = pin.getBoundingClientRect();
        const ox = p.left + p.width / 2 - t.left;
        const oy = p.top + p.height * 0.66 - t.top;
        gsap.set(type, { transformOrigin: `${ox}px ${oy}px` });
      };
      setOrigin();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: mode === "full" ? 0.6 : 0.3,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            gsap.set(type, { scale: 1 });
            setOrigin();
          },
        },
      });

      tl.to(".fly-hint", { opacity: 0, duration: 0.08 }, 0)
        .to(".fly-media", { scale: 1, duration: 0.6 }, 0)
        .to(type, { scale: mode === "full" ? 46 : 36, duration: 0.6, ease: "power3.in" }, 0)
        .to(".fly-mask", { opacity: 0, duration: 0.1 }, 0.5)
        .to(".fly-dim", { opacity: 1, duration: 0.25 }, 0.55)
        .to(".fly-copy > *", { opacity: 1, y: 0, duration: 0.22, stagger: 0.05, ease: "power2.out" }, 0.62)
        .to({}, { duration: 0.1 });
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
