import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const bookingUrl = 'https://www.planity.com/de-DE/mods-hair-mulheim-45468-mulheim-an-der-ruhr';
const instagramUrl = 'https://www.instagram.com/modshair_muelheim/';

type Signature = {
  title: string;
  kicker: string;
  text: string;
  tone: 'noir' | 'champagne' | 'sand' | 'violet';
  size: 'hero' | 'tall' | 'wide' | 'small';
  video: string;
};

const signatures: Signature[] = [
  {
    title: 'Balayage',
    kicker: 'weiche dimension',
    text: 'Licht, Tiefe und natürliche Übergänge für Balayage in Mülheim mit ruhiger, präziser Farbtechnik.',
    tone: 'champagne',
    size: 'hero',
    video: 'balayage',
  },
  {
    title: 'Blond',
    kicker: 'glanzblond',
    text: 'Beige, kühl oder soft veredelt. Blond Spezialist in Mülheim für Nuancen mit Haltung.',
    tone: 'noir',
    size: 'tall',
    video: 'blond',
  },
  {
    title: 'Extensions',
    kicker: 'länge und fülle',
    text: 'Natürlich integrierte Fülle für mehr Bewegung, Proportion und Selbstverständlichkeit.',
    tone: 'violet',
    size: 'wide',
    video: 'extensions',
  },
  {
    title: 'Thermo Care Cut',
    kicker: 'pflege im schnitt',
    text: 'Für gepflegte Spitzen und ein Haargefühl, das sichtbar ruhiger wirkt.',
    tone: 'sand',
    size: 'small',
    video: 'cta',
  },
  {
    title: 'Schnitt & Styling',
    kicker: 'kontur',
    text: 'Moderne Damenhaarschnitte in Mülheim, klar geschnitten und weich getragen.',
    tone: 'noir',
    size: 'wide',
    video: 'hero',
  },
  {
    title: 'Glossing',
    kicker: 'finish',
    text: 'Glanzveredelung, Pflege und Tonalität für ein luxuriöses Licht im Haar.',
    tone: 'champagne',
    size: 'small',
    video: 'cta',
  },
];

const transformations = [
  ['Balayage Auffrischung', 'Weiche Übergänge, mehr Licht, ruhiger Verlauf.'],
  ['Blond Veredelung', 'Kühle Reflexe, cremige Nuancen, gepflegter Glanz.'],
  ['Extensions Ergebnis', 'Mehr Fülle, natürliche Bewegung, elegante Länge.'],
  ['Schnitt & Styling', 'Form, Textur und ein Finish, das bleibt.'],
];

const team = [
  ['Tanja', 'Balayage · Blond · Beratung'],
  ['Yoshi', 'Schnitt · Thermo Care · Styling'],
  ['Azade', 'Pflege · Glossing · Finish'],
];

const priceCategories = ['Schnitt & Styling', 'Farbe & Blond', 'Balayage', 'Extensions', 'Pflegebehandlungen'];

function Logo() {
  return (
    <a href="#start" className="logo" aria-label="mod’s hair Mülheim Startseite">
      <img src="/mods-hair-muelheim-logo.png" alt="mod’s hair Mülheim Paris Logo" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Start', '#start'],
    ['Leistungen', '#leistungen'],
    ['Salon', '#salon'],
    ['Team', '#team'],
    ['Preise', '#preise'],
    ['Kontakt', '#kontakt'],
  ];

  return (
    <header className={`site-header ${solid ? 'is-solid' : ''}`}>
      <Logo />
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href={bookingUrl} target="_blank" rel="noreferrer">
        Termin buchen
      </a>
      <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Navigation öffnen">
        <Menu size={22} />
      </button>
      {open && (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <button className="close-button" type="button" onClick={() => setOpen(false)} aria-label="Navigation schließen">
            <X size={24} />
          </button>
          <Logo />
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta mobile" href={bookingUrl} target="_blank" rel="noreferrer">
            Termin buchen
          </a>
        </div>
      )}
    </header>
  );
}

function MediaPanel({
  className = '',
  label,
  tone = 'noir',
  video,
}: {
  className?: string;
  label: string;
  tone?: Signature['tone'];
  video?: string;
}) {
  return (
    <div className={`media-panel tone-${tone} ${className}`} role="img" aria-label={label}>
      {video && (
        <video className="campaign-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={`/videos/${video}.webm`} type="video/webm" />
          <source src={`/videos/${video}.mp4`} type="video/mp4" />
        </video>
      )}
      <span className="visual-shine" aria-hidden="true" />
      <span className="visual-line" aria-hidden="true" />
    </div>
  );
}

function Hero() {
  return (
    <section id="start" className="hero section-dark" aria-labelledby="hero-title">
      {/* Seedance 2.0: Hero-Video, glänzendes gesundes Haar, langsame Kamerafahrt, warmes Salonlicht, dunkler Hintergrund, Champagnerreflexe, keine Schrift, kein Logo, kein Wasserzeichen. */}
      <div className="hero-media" aria-hidden="true">
        <MediaPanel label="Cinematische Haarbewegung im Salonlicht" tone="noir" video="hero" />
      </div>
      <div className="hero-editorial-mark" aria-hidden="true">
        MÜLHEIM
      </div>
      <div className="hero-overlay" />
      <div className="hero-content reveal">
        <p className="eyebrow">PREMIUM FRISEUR IN MÜLHEIM</p>
        <h1 id="hero-title">Haare wie ein Statement.</h1>
        <p className="hero-subline">
          Balayage, Blond, Extensions und moderne Schnitte in einer Atmosphäre, die nach Paris, Ruhe und Schönheit wirkt.
        </p>
        <div className="hero-actions">
          <a className="button primary" href={bookingUrl} target="_blank" rel="noreferrer">
            Termin buchen
          </a>
          <a className="button secondary" href="#leistungen">
            Leistungen entdecken
          </a>
        </div>
        <p className="trust-line">mod’s hair Mülheim · Paris inspirierter Salon · Online buchbar über Planity</p>
      </div>
    </section>
  );
}

function CampaignPanel({ item, index }: { item: Signature; index: number }) {
  return (
    <article
      className={`campaign-panel panel-${item.size} tone-${item.tone} reveal`}
      style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
    >
      {/* Seedance 2.0: Signatur-Video, langsame Luxus-Haarkampagne, Haarbewegung, warmes Licht, geringe Tiefenschärfe, keine Schrift, kein Wasserzeichen. */}
      <MediaPanel label={`${item.title} bei mod’s hair Mülheim`} tone={item.tone} video={item.video} />
      <div className="campaign-copy">
        <p>{item.kicker}</p>
        <h3>{item.title}</h3>
        <span>{item.text}</span>
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          Termin buchen
        </a>
      </div>
    </article>
  );
}

function SignatureServices() {
  return (
    <section id="leistungen" className="campaign-section section-dark" aria-labelledby="services-title">
      <div className="campaign-heading reveal">
        <p className="eyebrow">SIGNATUR</p>
        <h2 id="services-title">Farbe. Form. Präsenz.</h2>
        <p>
          Keine Standardbehandlung. Ein Schönheitserlebnis aus Beratung, Handwerk und einem Ergebnis, das zu Ihnen
          gehört.
        </p>
      </div>
      <div className="campaign-grid">
        {signatures.map((item, index) => (
          <CampaignPanel key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="salon" className="atelier-section" aria-labelledby="experience-title">
      <div className="atelier-copy reveal">
        <p className="eyebrow dark">SALONERLEBNIS</p>
        <h2 id="experience-title">Ein Besuch wie ein ruhiger Schnitt aus einem Kampagnenfilm.</h2>
        <p>
          Bei mod’s hair Mülheim geht es um Nähe, Blick, Technik und die richtige Atmosphäre. Modern, hochwertig und
          persönlich – mitten in Mülheim an der Ruhr.
        </p>
      </div>
      <div className="atelier-mosaic">
        {/* Seedance 2.0: Salon-Atmosphäre, dunkles warmes Interieur, Champagnerlicht, hochwertige Reflexionen, ruhige Kamerabewegung. */}
        <MediaPanel className="mosaic-main reveal" label="Luxuriöse Salonatmosphäre in Mülheim" tone="champagne" video="salon" />
        <MediaPanel className="mosaic-small reveal" label="Detailaufnahme von glänzendem Haar" tone="noir" video="cta" />
        <div className="mosaic-caption reveal">
          <span>01</span>
          <p>Persönliche Beratung</p>
        </div>
        <div className="mosaic-caption reveal">
          <span>02</span>
          <p>Paris inspirierte Ästhetik</p>
        </div>
        <div className="mosaic-caption reveal">
          <span>03</span>
          <p>Online-Termine über Planity</p>
        </div>
      </div>
    </section>
  );
}

function TransformationShowcase() {
  return (
    <section className="transformation-editorial" aria-labelledby="transformations-title">
      <div className="transformation-title reveal">
        <p className="eyebrow dark">TRANSFORMATION</p>
        <h2 id="transformations-title">Farbe, Form und Persönlichkeit im richtigen Licht.</h2>
      </div>
      <div className="transformation-wall">
        {transformations.map(([title, text], index) => (
          <article className={`story-frame story-${index + 1} reveal`} key={title}>
            <MediaPanel label={`${title} bei mod’s hair Mülheim`} tone={index % 2 ? 'sand' : 'noir'} video={index === 0 ? 'balayage' : index === 1 ? 'blond' : index === 2 ? 'extensions' : 'hero'} />
            <div>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="team-editorial section-dark" aria-labelledby="team-title">
      <div className="team-title reveal">
        <p className="eyebrow">TEAM</p>
        <h2 id="team-title">Die Menschen hinter dem Schönheitserlebnis.</h2>
        <p>Technik, Erfahrung und ein feines Gespür für individuelle Schönheit.</p>
        <div className="team-index" aria-hidden="true">
          <span>MÜLHEIM · PARIS</span>
          <strong>Farbe · Schnitt · Finish</strong>
        </div>
      </div>
      <div className="portrait-runway">
        {team.map(([person, role], index) => (
          <article className="portrait-panel reveal" key={person} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
            <MediaPanel
              label={`Editorialer Portraitbereich für ${person}`}
              tone={index === 1 ? 'champagne' : 'noir'}
              video={index === 0 ? 'hero' : index === 1 ? 'extensions' : 'blond'}
            />
            <div>
              <h3>{person}</h3>
              <p>{role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricePreview() {
  return (
    <section id="preise" className="price-editorial" aria-labelledby="prices-title">
      <div className="price-visual reveal">
        <MediaPanel label="Editoriale Preisübersicht mit glänzender Haarbewegung" tone="sand" video="cta" />
      </div>
      <div className="price-copy reveal">
        <p className="eyebrow dark">PREISE</p>
        <h2 id="prices-title">Leistungen & Preise</h2>
        <p>Die aktuelle Preisliste und freie Termine finden Sie direkt über Planity.</p>
        <div className="price-index">
          {priceCategories.map((category, index) => (
            <a key={category} href={bookingUrl} target="_blank" rel="noreferrer">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{category}</strong>
              <em>Planity öffnen</em>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocalSeoSection() {
  return (
    <section className="local-editorial" aria-labelledby="local-title">
      <p className="eyebrow reveal">MÜLHEIM AN DER RUHR</p>
      <h2 id="local-title" className="reveal">
        Premium Friseur in Mülheim an der Ruhr
      </h2>
      <p className="reveal">
        Ob Balayage, Blond, Extensions oder moderner Damenhaarschnitt – mod’s hair Mülheim ist Ihr Friseur in Mülheim
        an der Ruhr für hochwertige Beratung, präzises Handwerk und ein Ergebnis, das zu Ihnen passt. Auch Kundinnen aus
        Oberhausen, Duisburg, Essen und dem Ruhrgebiet erreichen den Salon schnell.
      </p>
    </section>
  );
}

function BookingCTA() {
  return (
    <section id="kontakt" className="booking-cta section-dark" aria-labelledby="booking-title">
      {/* Seedance 2.0: Finales Hintergrundvideo, glänzende Haar-Details, warme Reflexe, langsame Bewegung, dunkle Luxus-Haarkampagne, keine Schrift, kein Wasserzeichen. */}
      <div className="cta-media" aria-hidden="true">
        <MediaPanel label="Glänzendes Haar im warmen Kampagnenlicht" tone="noir" video="cta" />
      </div>
      <div className="cta-content reveal">
        <p className="eyebrow">TERMIN</p>
        <h2 id="booking-title">Bereit für Ihr nächstes Haargefühl?</h2>
        <p>Buchen Sie Ihren Termin bequem online über Planity.</p>
        <a className="button primary" href={bookingUrl} target="_blank" rel="noreferrer">
          Jetzt Termin buchen
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>mod’s hair Mülheim · Mülheim an der Ruhr</p>
      </div>
      <nav aria-label="Fußnavigation">
        <a href="#leistungen">Leistungen</a>
        <a href="#salon">Salon</a>
        <a href="#team">Team</a>
        <a href="#preise">Preise</a>
      </nav>
      <div className="footer-links">
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          Planity
        </a>
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="#impressum">Impressum</a>
        <a href="#datenschutz">Datenschutz</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SignatureServices />
        <ExperienceSection />
        <TransformationShowcase />
        <TeamSection />
        <PricePreview />
        <LocalSeoSection />
        <BookingCTA />
      </main>
      <Footer />
      <a className="mobile-booking" href={bookingUrl} target="_blank" rel="noreferrer">
        Termin buchen
      </a>
    </>
  );
}
