/** Kleine gemeinsame Helfer der Konzept-Demos (kein Framework, damit die Seiten sofort stehen). */

export const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Elemente mit .reveal blenden beim Scrollen ein. */
export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (reduceMotion() || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

/** Zahlen mit data-count zählen beim Sichtbarwerden hoch. */
export function initCounters() {
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  if (reduceMotion() || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target as HTMLElement;
        const to = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(to * eased)}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/** Plant Arbeit, wenn der Browser nach dem ersten Bild Luft hat. */
export function whenIdle(fn: () => void) {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(fn, { timeout: 1200 });
  else setTimeout(fn, 200);
}
