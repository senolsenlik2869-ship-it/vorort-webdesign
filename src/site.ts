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
 * Hero-Video: Motionsites-Video (z. B. „Dark Blue Waves“) als MP4 nach public/videos/ legen
 * und den Pfad hier eintragen. Solange leer, läuft die eigene Wellen-Animation im Canvas.
 */
export const HERO_VIDEO = "";
export const HERO_POSTER = "/hero-poster.webp";
