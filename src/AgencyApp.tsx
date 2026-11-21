import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Hammer, Mail, Menu, Phone, Scissors, Store, Truck, UtensilsCrossed, X } from "lucide-react";
import { Hero } from "./Hero";
import { BlurUp, EASE, GlowCard, Logo, PinMark, WhatsAppIcon, WordReveal } from "./ui";
import { DEMOS, EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "./site";

const NAV = [
  ["Leistungen", "#leistungen"],
  ["Demos", "#demos"],
  ["Ablauf", "#ablauf"],
  ["FAQ", "#faq"],
  ["Kontakt", "#kontakt"],
] as const;

const BRANCHES = [
  { icon: Scissors, title: "Friseure & Kosmetik", text: "Gepflegt wie Ihr Salon – mit direktem Weg zum Termin." },
  { icon: UtensilsCrossed, title: "Gastronomie", text: "Appetit machen. Karte zeigen. Tisch reservieren." },
  { icon: Hammer, title: "Handwerk", text: "Referenzen zeigen und Anfragen aus der Umgebung gewinnen." },
  { icon: Store, title: "Lokale Shops", text: "Sortiment und Öffnungszeiten, die zum Vorbeikommen einladen." },
];

const MARQUEE = ["Speditionen", "Kurierdienste", "Umzugsfirmen", "Friseursalons", "Kosmetikstudios", "Restaurants", "Cafés", "Elektriker", "Dachdecker", "Werkstätten", "Boutiquen", "Bäckereien"];

const SERVICES = [
  ["Strategie & Struktur", "Klare Seiten, die in Sekunden zeigen, warum man bei Ihnen anfragen sollte."],
  ["Premium Design", "Ein eigener Look für Ihren Betrieb – kein Baukasten."],
  ["Logo & Markenauftritt", "Logo, Farben und Schriften aus einem Guss – für Website, Visitenkarte, Schild und Social Media."],
  ["Lokale SEO & Google", "Gefunden werden in Duisburg und Umgebung, inklusive Unternehmensprofil."],
  ["Performance & Technik", "Schnell, sicher und auf dem Handy so gut wie am Computer."],
  ["Hosting & Pflege", "Domain, Hosting und Updates übernehme ich."],
];

const STEPS = [
  ["Kostenlose Demo", "Ich entwerfe vorab Ihre Startseite – unverbindlich."],
  ["Besprechung", "Wir gehen die Demo durch. Sie bekommen einen Festpreis."],
  ["Umsetzung", "Ich baue die Seite, Sie geben Feedback."],
  ["Launch & Google", "Online gehen, bei Google anmelden, Profil einrichten."],
];

const FAQS = [
  ["Für wen arbeiten Sie?", "Für lokale Unternehmen in Duisburg, am Niederrhein und in ganz NRW – vor allem Transport und Logistik, aber auch Friseure, Gastronomie, Handwerk und lokale Shops."],
  ["Ist SEO enthalten?", "Ja. Jede Seite bekommt eine saubere technische Grundlage, lokale Suchbegriffe und strukturierte Daten für Google. Auf Wunsch richte ich auch Ihr Google-Unternehmensprofil ein."],
  ["Macht ihr auch Logos?", "Ja. Ich entwickle Ihr Logo und einen passenden Markenauftritt – Farben, Schriften und Vorlagen, z. B. für Visitenkarten und Social Media. Haben Sie schon ein Logo, überarbeite ich es auf Wunsch oder baue die Website darauf auf."],
  ["Ist die Seite mobil optimiert?", "Immer. Die meisten Ihrer Kunden kommen über das Handy – deshalb entwerfe ich zuerst für kleine Bildschirme."],
  ["Was kostet eine Website?", "Das hängt vom Umfang ab – nach der kostenlosen Demo bekommen Sie ein klares Festpreis-Angebot."],
  ["Wie schnell ist die Seite online?", "Die Demo meist innerhalb weniger Tage, die fertige Seite in zwei bis vier Wochen – je nachdem, wie schnell Inhalte und Feedback da sind."],
  ["Kümmern Sie sich um Hosting und Domain?", "Ja. Domain, Hosting, E-Mail-Weiterleitung und Sicherheit übernehme ich, auf Wunsch auch die laufende Pflege."],
];

function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

function WhatsAppButton({ children = "Per WhatsApp anfragen", className = "" }: { children?: string; className?: string }) {
  return (
    <a className={`btn btn-whatsapp ${className}`} href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}

/** Spielt ein Video nur, solange es sichtbar ist (spart Akku und CPU). */
function InViewVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" />;
}

/* ---------------- Navigation ---------------- */

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const hero = document.getElementById("start");
      setPastHero(hero ? window.scrollY > hero.offsetHeight - window.innerHeight * 0.6 : window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#start" className="nav-logo" aria-label="VorOrt Webdesign – zum Seitenanfang">
            <Logo />
          </a>
          <nav className="nav-links" aria-label="Hauptnavigation">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <WhatsAppButton className="nav-cta">WhatsApp</WhatsAppButton>
          <button className="burger" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile Navigation">
              {NAV.map(([label, href], i) => (
                <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: EASE }}>
                  {label}
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <WhatsAppButton />
              <a className="btn btn-ghost" href={PHONE_HREF}>
                <Phone size={18} />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a className={`fab-whatsapp ${pastHero && !open ? "is-visible" : ""}`} href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp anfragen">
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}

/* ---------------- Angebot: Links/Rechts, ohne Eyebrow ---------------- */

function Offer() {
  return (
    <section className="section offer" id="angebot">
      <div className="container split">
        <WordReveal className="display display-xl" text="Erst sehen, dann entscheiden." />
        <BlurUp className="split-aside" delay={0.2}>
          <p className="lead">Ich zeige Ihnen vorab kostenlos und unverbindlich, wie Ihre neue Startseite aussehen könnte. Gefällt sie Ihnen, besprechen wir den Rest.</p>
          <WhatsAppButton>Kostenlose Demo anfragen</WhatsAppButton>
        </BlurUp>
      </div>
    </section>
  );
}

/* ---------------- Branchen: Bento (Motionsites „Capabilities Overview“) ---------------- */

function Branches() {
  const desktop = useMedia("(min-width: 768px)");
  const reduce = useReducedMotion();
  return (
    <section className="section" id="branchen">
      <div className="container">
        <div className="head-row">
          <BlurUp>
            <h2 className="display">
              Für Betriebe,
              <br />
              <span className="dim">die vor Ort gefunden werden wollen.</span>
            </h2>
          </BlurUp>
        </div>

        <div className="bento">
          <BlurUp className="bento-feature">
            <article className="bento-card bento-media">
              {desktop && !reduce ? (
                <InViewVideo className="bento-video" src="/videos/branche-logistik.mp4" poster="/branche-logistik.webp" />
              ) : (
                <img className="bento-video" src="/branche-logistik.webp" alt="" loading="lazy" decoding="async" />
              )}
              <div className="bento-shade" />
              <span className="bento-label">Schwerpunkt</span>
              <div className="bento-feature-copy">
                <Truck size={30} strokeWidth={1.5} />
                <h3>Transport & Logistik</h3>
                <p>Mehr Aufträge und bessere Bewerbungen: Leistungen, Fuhrpark und Einsatzgebiet auf einen Blick.</p>
              </div>
            </article>
          </BlurUp>
          {BRANCHES.map((b, i) => (
            <BlurUp key={b.title} delay={0.08 * (i + 1)}>
              <GlowCard className="bento-card bento-small">
                <b.icon size={24} strokeWidth={1.5} />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </GlowCard>
            </BlurUp>
          ))}
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-row">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Konzept-Demos ---------------- */

function Demos() {
  return (
    <section className="section" id="demos">
      <div className="container">
        <div className="head-row head-row-split">
          <BlurUp>
            <h2 className="display">Konzept-Demos</h2>
          </BlurUp>
          <BlurUp delay={0.15}>
            <p className="muted">Zwei komplette, klickbare Beispiel-Websites für fiktive Firmen – so kann Ihr Auftritt aussehen.</p>
          </BlurUp>
        </div>
        <div className="demo-grid">
          {DEMOS.map((d, i) => (
            <BlurUp key={d.title} delay={i * 0.12}>
              <a className="demo-card" href={d.url} aria-label={`Demo ansehen: ${d.title} (${d.branch})`}>
                <div className="demo-media">
                  <img src={d.image} alt={`Vorschau der Konzept-Demo ${d.title}`} loading="lazy" decoding="async" width={1200} height={722} />
                </div>
                <div className="demo-body">
                  <span className="tag">{d.branch}</span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  <span className="btn btn-ghost btn-sm demo-btn">
                    <span>Demo ansehen</span>
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </a>
            </BlurUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Leistungen: große Zahl + nummerierte Liste (Motionsites „Vexa Studio“) ---------------- */

function Services() {
  return (
    <section className="section" id="leistungen">
      <div className="container services">
        <div className="big-number" aria-hidden="true">
          {String(SERVICES.length).padStart(2, "0")}
        </div>
        <div>
          <BlurUp>
            <h2 className="display display-sm">Leistungen aus einer Hand.</h2>
          </BlurUp>
          <ol className="service-list">
            {SERVICES.map(([title, text], i) => (
              <BlurUp as="li" key={title} delay={i * 0.06} className="service-row">
                <span className="service-num">({String(i + 1).padStart(2, "0")})</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </BlurUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ablauf: Fortschrittslinie wächst beim Scrollen ---------------- */

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  return (
    <section className="section" id="ablauf">
      <div className="container">
        <div className="head-row">
          <BlurUp>
            <h2 className="display">Vier Schritte bis online.</h2>
          </BlurUp>
        </div>
        <div className="steps" ref={ref}>
          <div className="steps-track" aria-hidden="true">
            <motion.div className="steps-fill" style={{ scaleX: scrollYProgress }} />
          </div>
          <ol>
            {STEPS.map(([title, text], i) => (
              <BlurUp as="li" key={title} delay={i * 0.1} className="step">
                <span className="step-dot" />
                <span className="step-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </BlurUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Über mich ---------------- */

function About() {
  return (
    <section className="section" id="ueber-mich">
      <div className="container about">
        <BlurUp className="about-mark">
          <div className="glow-ring">
            <PinMark className="about-pin" />
          </div>
          <p className="about-name">
            <strong>Şenol Şenlik</strong>
            <span>Inhaber · Duisburg</span>
          </p>
        </BlurUp>
        <div className="about-copy">
          <BlurUp>
            <h2 className="display display-sm">
              Ein Ansprechpartner.
              <br />
              <span className="dim">Kein Callcenter.</span>
            </h2>
          </BlurUp>
          <BlurUp delay={0.15}>
            <p className="lead">
              Sie sprechen direkt mit mir – persönlich, am Telefon oder per WhatsApp. Ich bin selbst Unternehmer in Duisburg und weiß, was ein Betrieb braucht: eine Website, die Anfragen bringt und keine Arbeit macht.
            </p>
          </BlurUp>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ: Links Titel, rechts Liste ---------------- */

function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="faq-title">
          <BlurUp>
            <h2 className="display">Fragen?</h2>
            <p className="muted">
              Nicht dabei? Schreiben Sie mir einfach{" "}
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                per WhatsApp
              </a>
              .
            </p>
          </BlurUp>
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <BlurUp key={q} delay={i * 0.04}>
              <details>
                <summary>
                  <span>{q}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            </BlurUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kontakt (Motionsites „Editorial Collection CTA“) ---------------- */

function ContactTile({ href, icon, title, sub, external, green }: { href: string; icon: ReactNode; title: string; sub: string; external?: boolean; green?: boolean }) {
  return (
    <a className={`contact-tile ${green ? "is-green" : ""}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="contact-icon">{icon}</span>
      <strong>{title}</strong>
      <span className="contact-sub">{sub}</span>
      <ArrowUpRight className="contact-arrow" size={20} />
    </a>
  );
}

function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Website-Anfrage${company ? ` – ${company}` : ""}`;
    const lines = [`Name: ${name}`];
    if (company) lines.push(`Betrieb: ${company}`);
    if (phone) lines.push(`Telefon: ${phone}`);
    const body = `${lines.join("\n")}\n\n${message}`;
    window.location.href = `${EMAIL_HREF}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section contact" id="kontakt">
      <div className="container">
        <BlurUp>
          <h2 className="display display-hero">
            Lassen Sie uns
            <br />
            <span className="accent">sprechen.</span>
          </h2>
        </BlurUp>
        <div className="contact-buttons">
          <BlurUp delay={0.1}>
            <ContactTile href={WHATSAPP_HREF} external green icon={<WhatsAppIcon size={26} />} title="WhatsApp" sub="Schnellste Antwort" />
          </BlurUp>
          <BlurUp delay={0.18}>
            <ContactTile href={PHONE_HREF} icon={<Phone size={24} strokeWidth={1.6} />} title="Anrufen" sub={PHONE_DISPLAY} />
          </BlurUp>
          <BlurUp delay={0.26}>
            <ContactTile href={EMAIL_HREF} icon={<Mail size={24} strokeWidth={1.6} />} title="E-Mail" sub={EMAIL} />
          </BlurUp>
        </div>

        <BlurUp>
          <form className="contact-form" onSubmit={onSubmit}>
            <p className="form-intro">Lieber schreiben? Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht.</p>
            <div className="form-grid">
              <label>
                <span>Name *</span>
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                <span>Betrieb</span>
                <input name="company" autoComplete="organization" />
              </label>
              <label className="span-2">
                <span>Telefon (für Rückruf)</span>
                <input name="phone" type="tel" autoComplete="tel" inputMode="tel" />
              </label>
              <label className="span-2">
                <span>Nachricht *</span>
                <textarea name="message" required rows={4} placeholder="Was machen Sie, und was soll die neue Website können?" />
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              <Mail size={18} />
              <span>Nachricht per E-Mail senden</span>
            </button>
          </form>
        </BlurUp>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>Webdesign für lokale Unternehmen in Duisburg, am Niederrhein und in NRW.</p>
        </div>
        <ul className="footer-contact">
          <li>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </li>
          <li>
            <a href={PHONE_HREF}>
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={EMAIL_HREF}>
              <Mail size={16} /> {EMAIL}
            </a>
          </li>
        </ul>
        <nav className="footer-legal" aria-label="Rechtliches">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} VorOrt Webdesign</p>
      </div>
    </footer>
  );
}

export default function AgencyApp() {
  return (
    <>
      <a className="skip-link" href="#angebot">
        Zum Inhalt springen
      </a>
      <Navigation />
      <main>
        <Hero />
        <Offer />
        <Branches />
        <Demos />
        <Services />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
