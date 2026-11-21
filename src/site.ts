export const PHONE_DISPLAY = "0177 933 97 80";
export const PHONE_HREF = "tel:+491779339780";
export const EMAIL = "vorort.webdesign@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const WHATSAPP_TEXT = "Hallo, ich interessiere mich für eine neue Website.";
export const WHATSAPP_HREF = `https://wa.me/491779339780?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

/** Konzept-Demos. Iris-Link folgt – solange `url` leer ist, wird der Button deaktiviert angezeigt. */
export const DEMOS = [
  {
    title: "Reverie Motion Experience",
    kind: "Motion-Webseite",
    text: "Interaktive Webdemo mit Scroll-Animationen, Parallax-Tiefe und cineastischer Atmosphäre.",
    image: "/projects/reverie-motion-experience.webp",
    url: "https://vorort-motion-demo-reverie.vercel.app/",
  },
  {
    title: "Iris Estates",
    kind: "Immobilien-Demo",
    text: "Hochwertige Immobilien-Präsentation mit ruhiger Bildführung, klarer Struktur und edler Typografie.",
    image: "/projects/iris-estates-demo.webp",
    url: "",
  },
];

/**
 * Über-mich-Foto: Bild nach public/ legen (z. B. public/ueber-mich.webp) und den Pfad hier eintragen.
 * Solange der Wert leer ist, erscheint ein Platzhalter.
 */
export const ABOUT_PHOTO = "";

/**
 * Hero-Hintergrund: Motionsites „Velvet Wave“, komprimiert.
 * Zwei Farbvarianten zur Auswahl: "blue" (in Markenblau umgefärbt) und "warm" (Original).
 * Zum Vergleich per URL umschaltbar: ?hero=warm bzw. ?hero=blue (nur vorübergehend).
 */
const HERO_DEFAULT: "blue" | "warm" = "blue";
const heroParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("hero") : null;
const HERO_VARIANT = heroParam === "warm" || heroParam === "blue" ? heroParam : HERO_DEFAULT;

export const HERO = {
  mp4: `/videos/velvet-${HERO_VARIANT}.mp4`,
  webm: `/videos/velvet-${HERO_VARIANT}.webm`,
  mobile: `/videos/velvet-${HERO_VARIANT}-mobile.mp4`,
  poster: `/hero-velvet-${HERO_VARIANT}.webp`,
  posterMobile: `/hero-velvet-${HERO_VARIANT}-mobile.webp`,
};
