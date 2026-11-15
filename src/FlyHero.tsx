import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { HERO_POSTER, HERO_POSTER_MOBILE, HERO_VIDEO, WHATSAPP_HREF } from "./site";
import { WhatsAppIcon } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fly-through-Hero (Grundlage: Motionsites „Freight Scroll Hero“ – gepinnte Bühne,
 * scroll-gesteuert).
 *
 * Aufbau in drei Ebenen:
 *  1. Video (bzw. Standbild am Handy) als fester Vollbild-Layer – wird nie skaliert.
 *  2. Schwarze Vollbild-SVG. Ihre Maske schneidet „VOR ORT“ aus: Buchstaben, die
 *     Pin-Kontur und das Pin-Loch sind Löcher im Schwarz, durch die man das Video sieht.
 *  3. Headline.
 *
 * Beim Scrollen skaliert nur die Gruppe in der Maske um den Mittelpunkt des Pin-Lochs,
 * bis das Loch den ganzen Screen füllt. Dann wird die schwarze Ebene ausgeblendet.
 * Die Maske ist immer exakt so groß wie der Viewport – es gibt keine Kanten.
 */

const PIN_PATH = "M12 1.9C6.3 1.9 1.9 6.3 1.9 12c0 7.6 8.9 16.9 9.6 17.6.3.3.7.3 1 0 .7-.7 9.6-10 9.6-17.6 0-5.7-4.4-10.1-10.1-10.1Z";

type Geo = { cx: number; cy: number; target: number };

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
    const svg = el.querySelector<SVGSVGElement>(".fly-svg")!;
    const group = svg.querySelector<SVGGElement>(".fly-group")!;
    const textVor = svg.querySelector<SVGTextElement>(".fly-vor")!;
    const textRt = svg.querySelector<SVGTextElement>(".fly-rt")!;
    const pinG = svg.querySelector<SVGGElement>(".fly-pin")!;
    const stage = el.querySelector<HTMLElement>(".fly-stage")!;

    const zoom = { p: 0 };
    const geo: Geo = { cx: 0, cy: 0, target: 40 };

    const applyZoom = () => {
      const s = Math.pow(geo.target, zoom.p);
      group.setAttribute("transform", `translate(${geo.cx} ${geo.cy}) scale(${s}) translate(${-geo.cx} ${-geo.cy})`);
    };

    // Schriftzug im Viewport-Koordinatensystem setzen und Loch-Mittelpunkt bestimmen.
    const layout = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.querySelectorAll<SVGRectElement>(".fly-full").forEach((r) => {
        r.setAttribute("width", String(W));
        r.setAttribute("height", String(H));
      });

      const F = W * (W >= 768 ? 0.235 : 0.24); // Schriftgröße
      const pinW = F * 0.56;
      const pinH = pinW * (32 / 24);
      const k = pinW / 24;
      const gap = F * 0.2;
      const after = F * 0.025;

      textVor.setAttribute("font-size", String(F));
      textRt.setAttribute("font-size", String(F));
      const wVor = textVor.getComputedTextLength();
      const wRt = textRt.getComputedTextLength();
      const total = wVor + gap + pinW + after + wRt;
      const x0 = (W - total) / 2;

      const midY = H * (W >= 768 ? 0.56 : 0.5); // Mitte des Schriftzugs (Desktop: auf dem Horizont)
      const capH = F * 0.7; // Versalhöhe Clash Display
      const baseline = midY + capH / 2;

      textVor.setAttribute("x", String(x0));
      textVor.setAttribute("y", String(baseline));
      const pinX = x0 + wVor + gap;
      const pinY = midY - pinH * 0.48;
      pinG.setAttribute("transform", `translate(${pinX} ${pinY}) scale(${k})`);
      textRt.setAttribute("x", String(pinX + pinW + after));
      textRt.setAttribute("y", String(baseline));

      // Loch-Mittelpunkt (Kreis cx=12, cy=12, r=4.6 im Pin-Koordinatensystem)
      geo.cx = pinX + 12 * k;
      geo.cy = pinY + 12 * k;
      const r = 4.6 * k;
      const far = Math.max(Math.hypot(geo.cx, geo.cy), Math.hypot(W - geo.cx, geo.cy), Math.hypot(geo.cx, H - geo.cy), Math.hypot(W - geo.cx, H - geo.cy));
      geo.target = Math.max(20, (far / r) * 1.06);
      applyZoom();
    };

    layout();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: layout,
        },
      });

      // Exponentielle Skalierung = gleichmäßiger Flug. Läuft vorwärts wie rückwärts,
      // weil jeder Frame nur aus dem Fortschritt berechnet wird.
      tl.to(".fly-hint", { opacity: 0, duration: 0.06 }, 0)
        .to(zoom, { p: 1, duration: 0.62, ease: "power1.in", onUpdate: applyZoom }, 0)
        .to(".fly-svg", { opacity: 0, duration: 0.05 }, 0.62)
        .to(".fly-dim", { opacity: 1, duration: 0.18 }, 0.64)
        .to(".fly-copy > *", { opacity: 1, y: 0, duration: 0.18, stagger: 0.04, ease: "power2.out" }, 0.7)
        .to({}, { duration: 0.08 });
    }, el);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => {
      layout();
      ScrollTrigger.refresh();
    });
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
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
        {useVideo ? (
          <video className="fly-media" src={HERO_VIDEO} poster={HERO_POSTER} muted loop playsInline preload="auto" autoPlay aria-hidden="true" />
        ) : (
          <picture>
            <source media="(min-width: 768px)" srcSet={HERO_POSTER} />
            <img className="fly-media" src={HERO_POSTER_MOBILE} alt="" fetchPriority="high" />
          </picture>
        )}

        {mode !== "static" && (
          <svg className="fly-svg" aria-hidden="true" preserveAspectRatio="none">
            <defs>
              <mask id="fly-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                {/* Weiß = schwarze Ebene sichtbar, Schwarz = ausgeschnitten (Video sichtbar) */}
                <rect className="fly-full" x="0" y="0" fill="#fff" />
                <g className="fly-group">
                  <text className="fly-vor fly-letters" fill="#000">
                    VOR
                  </text>
                  <g className="fly-pin">
                    <path d={PIN_PATH} fill="none" stroke="#000" strokeWidth="3.6" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="4.6" fill="#000" />
                  </g>
                  <text className="fly-rt fly-letters" fill="#000">
                    RT
                  </text>
                </g>
              </mask>
            </defs>
            <rect className="fly-full" x="0" y="0" fill="#000" mask="url(#fly-mask)" />
          </svg>
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
