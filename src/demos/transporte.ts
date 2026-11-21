import "./shared.css";
import "./transporte.css";
import { initCounters, initReveal, reduceMotion, whenIdle } from "./common";

initReveal();
initCounters();

// 3D-Lkw erst nach dem ersten Bild laden – die Seite steht sofort.
const canvas = document.getElementById("truck") as HTMLCanvasElement | null;
const hero = document.getElementById("hero");
const webgl = (() => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
})();

if (canvas && hero && webgl) {
  whenIdle(async () => {
    await document.fonts?.ready;
    const { mountTruck } = await import("./truck3d");
    mountTruck(canvas, hero, { reduce: reduceMotion() });
  });
}
