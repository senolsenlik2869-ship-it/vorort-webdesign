import "./shared.css";
import "./logistik.css";
import { initCounters, initReveal, reduceMotion, whenIdle } from "./common";

initReveal();
initCounters();

// Navigation wird hell, sobald die helle Seite beginnt.
const nav = document.querySelector<HTMLElement>(".ml-nav");
const track = document.getElementById("flug");
const onScroll = () => {
  if (!nav || !track) return;
  nav.classList.toggle("is-light", track.getBoundingClientRect().bottom < 120);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Netzwerk-Linien zeichnen, wenn sichtbar.
const map = document.querySelector(".ml-map");
if (map) {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      map.classList.add("is-in");
      io.disconnect();
    }
  }, { threshold: 0.35 });
  io.observe(map);
}

/**
 * Scroll-Flug (Technik nach Motionsites „Freight Scroll Hero“): Das Video wird nie
 * abgespielt, sondern nur per currentTime an den Scroll-Fortschritt gekoppelt.
 * Bis es bereit ist, steht das Standbild – kein schwarzer Bildschirm.
 */
const video = document.querySelector<HTMLVideoElement>(".ml-video");
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
if (video && track && !reduceMotion() && !saveData) {
  whenIdle(() => {
    const small = window.matchMedia("(max-width: 759px)").matches;
    video.src = small ? "/demos/entwurf-muster-logistik/flug-mobile.mp4" : "/demos/entwurf-muster-logistik/flug.mp4";
    video.load();

    let want = 0;
    let cur = 0;
    const progress = () => {
      const r = track.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      return Math.min(1, Math.max(0, -r.top / total));
    };
    const seek = (t: number) => {
      if (video.readyState < 1 || video.seeking) return;
      if (Math.abs(video.currentTime - t) > 1 / 60) video.currentTime = t;
    };
    video.addEventListener("seeked", () => seek(cur));
    video.addEventListener(
      "loadeddata",
      () => {
        video.classList.add("is-ready");
      },
      { once: true },
    );

    let raf = 0;
    const tick = () => {
      const span = (video.duration || 9) - 1 / 24;
      want = progress() * span;
      cur += (want - cur) * 0.2;
      if (Math.abs(want - cur) < 1 / 240) cur = want;
      seek(cur);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(track);
  });
}
