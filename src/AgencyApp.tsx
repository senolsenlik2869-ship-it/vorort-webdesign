import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Gauge,
  Hammer,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Search,
  ServerCog,
  Sparkles,
  Store,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { CountUp, EASE, GlowCard, Logo, Reveal, WhatsAppIcon, WordReveal } from "./ui";
import {
  ABOUT_PHOTO,
  DEMOS,
  EMAIL,
  EMAIL_HREF,
  HERO_POSTER,
  HERO_POSTER_MOBILE,
  HERO_VIDEO,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
} from "./site";

const NAV = [
  ["Leistungen", "#leistungen"],
  ["Demos", "#demos"],
  ["Ablauf", "#ablauf"],
  ["FAQ", "#faq"],
  ["Kontakt", "#kontakt"],
] as const;

const BRANCHES = [
  {
    icon: Truck,
    title: "Transport & Logistik",
    text: "Mehr Aufträge und bessere Fahrer-Bewerbungen: Leistungen, Fuhrpark und Einsatzgebiet auf einen Blick, Anfrage mit einem Klick.",
    tags: ["Speditionen", "Kurierdienste", "Umzüge"],
    featured: true,
  },
  { icon: Scissors, title: "Friseure & Kosmetik", text: "Ein Auftritt, der so gepflegt wirkt wie Ihr Salon und neue Kunden direkt zum Termin führt." },
  { icon: UtensilsCrossed, title: "Gastronomie", text: "Appetit machen, Speisekarte zeigen, Reservierungen per Telefon oder WhatsApp bekommen." },
  { icon: Hammer, title: "Handwerk", text: "Referenzen zeigen, Vertrauen aufbauen und Anfragen aus der Umgebung gewinnen statt über Portale." },
  { icon: Store, title: "Lokale Shops", text: "Öffnungszeiten, Sortiment und Anfahrt so präsentiert, dass Kunden vorbeikommen wollen." },
];

const SERVICES = [
  { icon: LayoutGrid, title: "Strategie & Struktur", text: "Wir klären, was Ihre Kunden wissen wollen, und bauen die Seite so, dass sie schnell verstehen, warum sie bei Ihnen anfragen sollten." },
  { icon: Sparkles, title: "Premium Design", text: "Ein eigener, hochwertiger Look statt Baukasten-Optik. Passend zu Ihrem Betrieb und auf jedem Bildschirm stark." },
  { icon: Search, title: "Lokale SEO & Google-Sichtbarkeit", text: "Damit Sie gefunden werden, wenn jemand in Duisburg und Umgebung nach Ihrer Leistung sucht, inklusive Google-Unternehmensprofil." },
  { icon: Gauge, title: "Performance & Technik", text: "Schnelle Ladezeiten, sauber programmiert, sicher und auf dem Handy genauso gut wie am Computer." },
  { icon: ServerCog, title: "Hosting & Pflege", text: "Domain, Hosting, Updates und kleine Änderungen übernehme ich. Sie kümmern sich um Ihr Geschäft." },
];

const STEPS = [
  { title: "Kostenlose Demo", text: "Sie schreiben mir kurz, was Sie machen. Ich gestalte vorab einen Entwurf Ihrer Startseite – kostenlos und unverbindlich." },
  { title: "Besprechung", text: "Wir schauen uns die Demo gemeinsam an, klären Wünsche und Inhalte. Danach bekommen Sie ein klares Festpreis-Angebot." },
  { title: "Umsetzung", text: "Ich baue die komplette Seite, Sie geben Feedback. Texte, Bilder und Technik kommen aus einer Hand." },
  { title: "Launch & Google", text: "Die Seite geht online, wird bei Google angemeldet und Ihr Unternehmensprofil eingerichtet." },
];

const FAQS = [
  ["Für wen arbeiten Sie?", "Für lokale Unternehmen in Duisburg, am Niederrhein und in ganz NRW – vor allem Transport- und Logistikbetriebe, aber auch Friseure, Gastronomie, Handwerk und lokale Shops."],
  ["Ist SEO enthalten?", "Ja. Jede Seite bekommt eine saubere technische Grundlage, lokale Suchbegriffe, Meta-Daten und strukturierte Daten für Google. Auf Wunsch richte ich auch Ihr Google-Unternehmensprofil ein."],
  ["Ist die Seite mobil optimiert?", "Ja, immer. Die meisten Ihrer Kunden kommen über das Handy – deshalb entwerfe ich zuerst für kleine Bildschirme und dann für Desktop."],
  ["Was kostet eine Website?", "Das hängt vom Umfang ab – nach der kostenlosen Demo bekommen Sie ein klares Festpreis-Angebot."],
  ["Wie schnell ist die Seite online?", "Die Demo bekommen Sie meist innerhalb weniger Tage. Eine typische Seite ist in zwei bis vier Wochen online – je nachdem, wie schnell Inhalte und Feedback da sind."],
  ["Kümmern Sie sich um Hosting und Domain?", "Ja. Ich kümmere mich um Domain, Hosting, E-Mail-Weiterleitung und Sicherheit. Auf Wunsch übernehme ich auch die laufende Pflege."],
];

const STATS = [
  { to: 0, suffix: " €", label: "für Ihre Demo" },
  { to: 1, suffix: "", label: "fester Ansprechpartner" },
  { to: 100, suffix: " %", label: "mobil optimiert" },
  { to: 4, suffix: "", label: "klare Schritte bis online" },
];

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

function WhatsAppButton({ children = "Per WhatsApp anfragen", className = "" }: { children?: string; className?: string }) {
  return (
    <a className={`btn btn-whatsapp ${className}`} href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

/* ---------------- Navigation ---------------- */

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
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

/* ---------------- Hero ---------------- */

function Hero() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollY, [0, 600], [1, reduce ? 1 : 0.2]);
  const yMedia = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 80]);
  const showVideo = desktop && !reduce;

  return (
    <section className="hero" id="start">
      <motion.div className="hero-media" style={{ y: yMedia }} aria-hidden="true">
        {showVideo ? (
          <video className="hero-video" src={HERO_VIDEO} poster={HERO_POSTER} autoPlay muted loop playsInline preload="auto" />
        ) : (
          <picture>
            <source media="(min-width: 768px)" srcSet={HERO_POSTER} />
            <img className="hero-video" src={HERO_POSTER_MOBILE} alt="" fetchPriority="high" />
          </picture>
        )}
      </motion.div>
      <div className="hero-shade" />

      <motion.div className="container hero-content" style={{ y: yContent, opacity }}>
        <motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <MapPin size={15} /> Webdesign aus Duisburg für ganz NRW
        </motion.p>
        <WordReveal
          as="h1"
          immediate
          delay={0.15}
          className="hero-title"
          text="Mehr Anfragen aus Ihrer _Region_ – mit einer Website, die Ihre Konkurrenz *alt* *aussehen* lässt."
        />
        <motion.p className="hero-sub" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }}>
          Premium-Webdesign für lokale Unternehmen in Duisburg und NRW.
        </motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05, ease: EASE }}>
          <WhatsAppButton />
          <a className="btn btn-ghost" href="#demos">
            <span>Demos ansehen</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
      <a className="scroll-hint" href="#angebot" aria-label="Weiter zum Angebot">
        <span />
      </a>
    </section>
  );
}

/* ---------------- Angebot ---------------- */

function Offer() {
  return (
    <section className="section offer" id="angebot">
      <div className="container offer-inner">
        <div className="offer-glow" aria-hidden="true" />
        <SectionLabel>Das Angebot</SectionLabel>
        <WordReveal className="display" text="Erst *sehen,* dann _entscheiden._" />
        <Reveal delay={0.2}>
          <p className="lead">
            Ich zeige Ihnen vorab kostenlos und unverbindlich, wie Ihre neue Startseite aussehen könnte. Gefällt sie Ihnen, besprechen wir den Rest.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <WhatsAppButton>Kostenlose Demo anfragen</WhatsAppButton>
        </Reveal>
        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i} className="stat">
              <strong>
                <CountUp to={s.to} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Branchen ---------------- */

function Branches() {
  return (
    <section className="section" id="branchen">
      <div className="container">
        <div className="section-head">
          <SectionLabel>Branchen</SectionLabel>
          <WordReveal className="display" text="Gemacht für Betriebe, die _vor_ _Ort_ gefunden werden wollen." />
        </div>
        <div className="branch-grid">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07} className={b.featured ? "branch-featured" : ""}>
              <GlowCard featured={b.featured} className="branch-card">
                <span className="card-icon">
                  <b.icon size={b.featured ? 30 : 24} strokeWidth={1.6} />
                </span>
                {b.featured && <span className="pill">Schwerpunkt</span>}
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                {b.tags && (
                  <ul className="tag-list">
                    {b.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Demos ---------------- */

function Demos() {
  return (
    <section className="section" id="demos">
      <div className="container">
        <div className="section-head">
          <SectionLabel>Konzept-Demos</SectionLabel>
          <WordReveal className="display" text="So kann sich Ihre Website *anfühlen.*" />
        </div>
        <div className="demo-grid">
          {DEMOS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1}>
              <GlowCard className="demo-card">
                <div className="demo-media">
                  <img src={d.image} alt={`Vorschau: ${d.title} – Konzept-Demo von VorOrt Webdesign`} loading="lazy" decoding="async" width={1400} height={740} />
                </div>
                <div className="demo-body">
                  <span className="pill pill-quiet">Konzept-Demo von VorOrt Webdesign</span>
                  <h3>{d.title}</h3>
                  <p className="demo-kind">{d.kind}</p>
                  <p>{d.text}</p>
                  {d.url ? (
                    <a className="btn btn-ghost btn-sm" href={d.url} target="_blank" rel="noopener noreferrer">
                      <span>Demo ansehen</span>
                      <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <span className="btn btn-ghost btn-sm is-disabled" aria-disabled="true">
                      <span>Demo-Link folgt</span>
                    </span>
                  )}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="demo-note">Echte Kundenprojekte folgen in Kürze.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Leistungen ---------------- */

function Services() {
  return (
    <section className="section" id="leistungen">
      <div className="container">
        <div className="section-head">
          <SectionLabel>Leistungen</SectionLabel>
          <WordReveal className="display" text="Alles aus einer Hand. _Verständlich_ erklärt." />
        </div>
        <ol className="service-list">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="service-row">
              <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="service-title">
                <s.icon size={22} strokeWidth={1.6} />
                <h3>{s.title}</h3>
              </div>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Ablauf ---------------- */

function Process() {
  return (
    <section className="section" id="ablauf">
      <div className="container">
        <div className="section-head">
          <SectionLabel>Ablauf</SectionLabel>
          <WordReveal className="display" text="In *vier* Schritten zur neuen Website." />
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="step">
              <span className="step-num">
                <CountUp to={i + 1} prefix="0" />
              </span>
              <motion.span className="step-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: EASE }} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Über mich ---------------- */

function About() {
  return (
    <section className="section" id="ueber-mich">
      <div className="container about">
        <Reveal className="about-photo">
          {ABOUT_PHOTO ? (
            <img src={ABOUT_PHOTO} alt="Ihr Ansprechpartner bei VorOrt Webdesign" loading="lazy" decoding="async" />
          ) : (
            <div className="photo-placeholder" role="img" aria-label="Platzhalter für Foto">
              <Camera size={34} strokeWidth={1.4} />
              <span>Foto einsetzen</span>
            </div>
          )}
        </Reveal>
        <div className="about-copy">
          <SectionLabel>Über mich</SectionLabel>
          <WordReveal className="display display-sm" text="Ihr Ansprechpartner aus _Duisburg._" />
          <Reveal delay={0.15}>
            <p className="lead">
              Bei VorOrt Webdesign sprechen Sie direkt mit mir – persönlich, telefonisch oder per WhatsApp. Kein anonymes Callcenter, keine Warteschleife.
            </p>
            <p>
              Ich bin selbst Unternehmer und weiß, was ein Betrieb braucht: eine Website, die Vertrauen schafft, Anfragen bringt und keine Arbeit macht. Genau das baue ich für Sie.
            </p>
            <ul className="check-list">
              <li>Persönlich erreichbar</li>
              <li>Aus der Region, für die Region</li>
              <li>Klare Festpreise statt Überraschungen</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container faq">
        <div className="section-head">
          <SectionLabel>FAQ</SectionLabel>
          <WordReveal className="display display-sm" text="Häufige Fragen, *klar* beantwortet." />
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04}>
              <details>
                <summary>
                  <span>{q}</span>
                  <i aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kontakt ---------------- */

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
        <div className="contact-head">
          <SectionLabel>Kontakt</SectionLabel>
          <WordReveal className="display display-xl" text="Lassen Sie uns über Ihre neue Website _sprechen._" />
        </div>
        <div className="contact-buttons">
          <Reveal delay={0}>
            <a className="contact-tile tile-whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={30} />
              <strong>WhatsApp</strong>
              <span>Schnellste Antwort</span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <a className="contact-tile" href={PHONE_HREF}>
              <Phone size={28} strokeWidth={1.6} />
              <strong>Anrufen</strong>
              <span>{PHONE_DISPLAY}</span>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <a className="contact-tile" href={EMAIL_HREF}>
              <Mail size={28} strokeWidth={1.6} />
              <strong>E-Mail</strong>
              <span>{EMAIL}</span>
            </a>
          </Reveal>
        </div>

        <Reveal>
          <form className="contact-form" onSubmit={onSubmit}>
            <p className="form-intro">Lieber schreiben? Kurz ausfüllen – Ihr E-Mail-Programm öffnet sich mit der fertigen Nachricht.</p>
            <div className="form-grid">
              <label>
                <span>Ihr Name *</span>
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
                <span>Ihre Nachricht *</span>
                <textarea name="message" required rows={4} placeholder="Was machen Sie, und was soll die neue Website können?" />
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              <Mail size={18} />
              <span>Nachricht per E-Mail senden</span>
            </button>
          </form>
        </Reveal>
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
          <p>Premium-Webdesign für lokale Unternehmen in Duisburg, am Niederrhein und in NRW.</p>
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
