import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./agency.css";
import AgencyApp from "./AgencyApp";
import LegalPage from "./legal";

const root = document.getElementById("root")!;
const page = root.dataset.page as "impressum" | "datenschutz" | undefined;

createRoot(root).render(page ? <LegalPage page={page} /> : <AgencyApp />);

// Weiches Scrollen nur am Desktop mit Maus und ohne „Bewegung reduzieren“.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (!reduce && finePointer) {
  const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 } });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
