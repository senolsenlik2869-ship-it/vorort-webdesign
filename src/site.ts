export const PHONE_DISPLAY = "0177 933 97 80";
export const PHONE_HREF = "tel:+491779339780";
export const EMAIL = "vorort.webdesign@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const WHATSAPP_TEXT = "Hallo, ich interessiere mich für eine neue Website.";
export const WHATSAPP_HREF = `https://wa.me/491779339780?text=${encodeURIComponent(WHATSAPP_TEXT)}`;


/**
 * Über-mich-Foto: Bild nach public/ legen (z. B. public/ueber-mich.webp) und den Pfad hier eintragen.
 * Solange der Wert leer ist, erscheint ein Platzhalter.
 */
export const ABOUT_PHOTO = "";

/** Konzept-Demos – eigene Unterseiten mit fiktiven Firmen. */
export const DEMOS = [
  {
    title: "Muster Transporte",
    branch: "Transport & Spedition",
    text: "Dunkler Premium-Auftritt mit interaktivem 3D-Lkw, der sich beim Scrollen dreht.",
    image: "/demos/muster-transporte-vorschau.webp",
    url: "/demos/muster-transporte/",
  },
  {
    title: "Muster Logistik",
    branch: "Lager & Kontraktlogistik",
    text: "Heller, klarer Auftritt mit scroll-gesteuertem Luftaufnahme-Video und animiertem Netzwerk.",
    image: "/demos/muster-logistik-vorschau.webp",
    url: "/demos/muster-logistik/",
  },
];

/** Hero-Hintergrund: Motionsites „Velvet Wave“, aufgehellt und in Markenblau umgefärbt. */
export const HERO = {
  mp4: "/videos/velvet-blue.mp4",
  webm: "/videos/velvet-blue.webm",
  mobile: "/videos/velvet-blue-mobile.mp4",
  poster: "/hero-velvet-blue.webp",
  posterMobile: "/hero-velvet-blue-mobile.webp",
};
