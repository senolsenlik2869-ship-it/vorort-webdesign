import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Gauge, LayoutDashboard, Mail, MapPin, MousePointer2, Sparkles } from "lucide-react";
import * as THREE from "three";

const services = [
  ["Webdesign", "Premium Webseiten mit klarer Struktur, starker Typografie und sauberer Conversion-Führung."],
  ["SEO", "Lokale Sichtbarkeit für Duisburg, Düsseldorf, Köln, Essen und Unternehmen in NRW."],
  ["Motion", "Cinematische Scroll-Erlebnisse, Mikrointeraktionen und ruhige Premium-Bewegung."],
  ["Branding", "Digitale Markenauftritte, die hochwertig wirken und Vertrauen vor Ort aufbauen."],
];

const glowFeatures = [
  {
    title: "Strategie & Struktur",
    description: "Wir planen Seiten so, dass Besucher schnell verstehen, warum sie genau bei Ihnen anfragen sollen.",
    gradient: "linear-gradient(137deg, #FF8A3D 0%, #FFD6A5 45%, #F97316 100%)",
    icon: LayoutDashboard,
  },
  {
    title: "Premium Design",
    description: "Moderne Layouts, starke Typografie und visuelle Führung statt austauschbarer Baukasten-Optik.",
    gradient: "linear-gradient(137deg, #FFFFFF 0%, #93C5FD 45%, #2563EB 100%)",
    icon: Sparkles,
  },
  {
    title: "Lokale Sichtbarkeit",
    description: "SEO-Struktur für Städte, Leistungen und regionale Suchbegriffe - damit Kunden Sie online finden.",
    gradient: "linear-gradient(137deg, #22C55E 0%, #BBF7D0 45%, #14B8A6 100%)",
    icon: MapPin,
  },
  {
    title: "Performance & Technik",
    description: "Schnelle Ladezeiten, saubere Struktur und responsive Umsetzung für Desktop, Tablet und Smartphone.",
    gradient: "linear-gradient(137deg, #A855F7 0%, #F0ABFC 45%, #EC4899 100%)",
    icon: Gauge,
  },
];

const projects = [
  ["SHINZO", "SHINZO", "Exklusive Motion-Webseite mit Video-Atmosphäre, weichen Scroll-Übergängen, Glow-Effekten und hochwertiger Bildführung. Für Kunden, die keinen normalen Internetauftritt möchten, sondern ein digitales Erlebnis.", "#4D7CFF"],
  ["DEKBAU", "Bauunternehmen", "Architektonisches Webdesign für ein regionales Unternehmen mit klarer Leistungskommunikation.", "#5EA2FF"],
  ["Restaurant Beispiel", "Gastronomie", "Eine emotionale Seite mit Atmosphäre, Reservierungsfokus und starker mobiler Wirkung.", "#7B1E3A"],
  ["Handwerker Beispiel", "Premium Handwerk", "Modernes Responsive Webdesign für lokale Sichtbarkeit, Vertrauen und qualifizierte Anfragen.", "#8AA8FF"],
];

const pricing = [
  ["Starter", "ab 690 €", "Für einen klaren, modernen Webauftritt mit sauberer mobiler Darstellung."],
  ["Business", "ab 1.290 €", "Für Unternehmen, die mehr Wirkung, Struktur und lokale Sichtbarkeit möchten."],
  ["Individuell", "Projektpreis nach Umfang", "Für besondere Seiten mit Motion, Video, Branding oder erweitertem Aufbau."],
];

const faqs = [
  ["Für welche Unternehmen arbeitet VorOrt Webdesign?", "Für Unternehmen, die online professionell wirken und lokal sichtbar werden wollen."],
  ["Ist SEO enthalten?", "Ja. Jede Seite erhält eine saubere technische Struktur, lokale SEO-Grundlagen und klare Inhalte für bessere Sichtbarkeit."],
  ["Werden die Seiten mobil optimiert?", "Ja. Mobile, Tablet und Desktop werden von Anfang an mitgedacht."],
  ["Wie startet ein Projekt?", "Mit einem kurzen Gespräch über Zielgruppe, Stil, Inhalte und gewünschte Wirkung."],
];

const processSteps = [
  ["01", "Analyse", "Ziel, Markt und Wirkung werden klar definiert."],
  ["02", "Design", "Eine moderne visuelle Richtung entsteht als starkes Raster."],
  ["03", "Umsetzung", "Webdesign, Motion, SEO und mobile Details werden aufgebaut."],
  ["04", "Launch", "Die Seite geht sauber live und bleibt regional auffindbar."],
];

function Button({ children, href, ghost = false }: { children: React.ReactNode; href: string; ghost?: boolean }) {
  return (
    <motion.a className={`magnetic-button ${ghost ? "ghost" : ""}`} href={href} whileHover={{ scale: 1.035, y: -2 }} whileTap={{ scale: 0.98 }}>
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1.8} />
    </motion.a>
  );
}

function Logo() {
  return (
    <span className="brand-logo" aria-label="VorOrt Webdesign">
      <span className="brand-pin">
        <span />
      </span>
      <span className="brand-word">
        Vor<span>Ort</span> Webdesign
      </span>
    </span>
  );
}

function BrowserMockup({ title, label, accent }: { title: string; label: string; accent: string }) {
  const isShinzo = title === "SHINZO";
  const isDekbau = title === "DEKBAU";
  const isHeroInterface = title === "Lokale Marke";
  const liveSiteUrl = isShinzo ? "https://dekbau-premium.vercel.app" : "";
  const displaySiteUrl = isShinzo ? "shinzo.vercel.app" : isDekbau ? "dekbau.de" : "vorort-webdesign.de";

  return (
    <div className={`browser-mockup ${isShinzo ? "shinzo-mockup live-site-mockup" : ""}`} style={{ "--accent": accent } as React.CSSProperties}>
      <div className="browser-top">
        <span /><span /><span />
        <small>{displaySiteUrl}</small>
      </div>
      {isShinzo ? (
        <div className="live-site-stage">
          <div className="live-site-frame-wrap">
            <iframe
              title="SHINZO Live-Vorschau"
              src={liveSiteUrl}
              loading="lazy"
            />
          </div>
          <div className="live-site-overlay">
            <span>Live Webseite</span>
            <strong>SHINZO</strong>
            <a href={liveSiteUrl} target="_blank" rel="noreferrer">
              Seite öffnen
            </a>
          </div>
        </div>
      ) : isHeroInterface ? (
        <div className="interface-stage">
          <div className="interface-orbit" />
          <div className="interface-copy">
            <span>Digitale Präsenz</span>
            <h3>
              Sichtbar.
              <br />
              Modern.
              <br />
              VorOrt.
            </h3>
          </div>
        </div>
      ) : (
        <div className="browser-stage">
          <div className="browser-hero-line" />
          <p>{label}</p>
          <h3>{title}</h3>
          <div className="browser-grid"><i /><i /><i /></div>
        </div>
      )}
    </div>
  );
}

function Hero() {
  const spotlight = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 22 });
  const rotateY = useTransform(smoothX, [-400, 400], [-9, 9]);
  const rotateX = useTransform(smoothY, [-300, 300], [7, -7]);

  useEffect(() => {
    const el = spotlight.current;
    if (!el) return;
    let cx = 0, cy = 0;
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - window.innerWidth / 2);
      y.set(event.clientY - window.innerHeight / 2);
      cx += (event.clientX - 240 - cx) * 0.12;
      cy += (event.clientY - 240 - cy) * 0.12;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <section className="hero" id="start">
      <div className="spotlight" ref={spotlight} />
      <video className="hero-video" src="/videos/agency-hero.mp4" autoPlay muted loop playsInline />
      <div className="hero-shade" />
      <motion.nav className="nav-glass" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
        <a className="brand" href="#start"><Logo /></a>
        <div className="nav-links">
          <a href="#branchen">Branchen</a><a href="#projekte">Projekte</a><a href="#leistungen">Leistungen</a><a href="#preise">Preise</a><a href="#kontakt">Kontakt</a>
        </div>
      </motion.nav>

      <div className="hero-layout">
        <div className="hero-copy hero-copy-animate">
          <div className="eyebrow"><Sparkles size={15} />Premium Webdesign Agentur aus NRW</div>
          <h1>Webseiten,<br />die auffallen.<span>Für Marken vor Ort.</span></h1>
          <p>VorOrt Webdesign entwickelt moderne Webseiten mit Cinematic Motion, starker Markenwirkung und lokaler Sichtbarkeit für Unternehmen in Deutschland.</p>
          <div className="hero-actions">
            <Button href="#kontakt">Kostenlos beraten lassen</Button>
            <Button href="#projekte" ghost>Projekte ansehen</Button>
          </div>
          <div className="trust-row"><span>Modernes Webdesign</span><span>Lokale SEO</span><span>Motion Design</span></div>
        </div>

        <motion.div className="hero-depth" style={{ rotateX, rotateY }}>
          <motion.div className="float-card review-card" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <span>Kundenwirkung</span><strong>klarer, moderner, sichtbarer</strong>
          </motion.div>
          <motion.div className="float-card seo-card" animate={{ y: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity }}>
            <MapPin size={17} /><span>Webdesign Duisburg · Düsseldorf · Köln</span>
          </motion.div>
          <motion.div className="hero-browser" animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
            <BrowserMockup title="Lokale Marke" label="Premium Auftritt" accent="#4D7CFF" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return <div className="section-heading"><p>{label}</p><h2>{title}</h2></div>;
}

function CinematicSceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.08);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 11.5);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0x88aaff, 0.6));
    const blueLight = new THREE.PointLight(0x5ea2ff, 6.5, 18);
    blueLight.position.set(3.5, 3, 4);
    scene.add(blueLight);
    const bordeauxLight = new THREE.PointLight(0x7b1e3a, 4.5, 16);
    bordeauxLight.position.set(-4, -2.5, 3);
    scene.add(bordeauxLight);
    const acidLight = new THREE.PointLight(0xd7ff3f, 1.2, 9);
    acidLight.position.set(-2.8, 2.2, 3);
    scene.add(acidLight);

    const rounded = (ctx: CanvasRenderingContext2D, xPos: number, yPos: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(xPos + radius, yPos);
      ctx.arcTo(xPos + width, yPos, xPos + width, yPos + height, radius);
      ctx.arcTo(xPos + width, yPos + height, xPos, yPos + height, radius);
      ctx.arcTo(xPos, yPos + height, xPos, yPos, radius);
      ctx.arcTo(xPos, yPos, xPos + width, yPos, radius);
      ctx.closePath();
    };

    const makeBrowserTexture = () => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 1400;
      textureCanvas.height = 860;
      const ctx = textureCanvas.getContext("2d")!;
      const bg = ctx.createLinearGradient(0, 0, 1400, 860);
      bg.addColorStop(0, "#070b19");
      bg.addColorStop(0.5, "#0c1228");
      bg.addColorStop(1, "#050816");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1400, 860);
      const glow = ctx.createRadialGradient(1080, 210, 0, 1080, 210, 520);
      glow.addColorStop(0, "rgba(94,162,255,0.42)");
      glow.addColorStop(0.42, "rgba(77,124,255,0.1)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1400, 860);

      ctx.fillStyle = "rgba(255,255,255,0.045)";
      for (let xLine = 0; xLine < 1400; xLine += 72) ctx.fillRect(xLine, 96, 1, 764);
      for (let yLine = 96; yLine < 860; yLine += 72) ctx.fillRect(0, yLine, 1400, 1);

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(0, 0, 1400, 96);
      ["#d7ff3f", "#5ea2ff", "#ffffff66"].forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(46 + index * 28, 48, 9, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = "rgba(247,241,232,0.48)";
      ctx.font = "600 24px Manrope, sans-serif";
      ctx.fillText("motion-webdesign.studio", 140, 56);

      ctx.fillStyle = "#f7f1e8";
      ctx.font = "900 92px Geist, Manrope, sans-serif";
      ctx.fillText("Webseiten,", 80, 270);
      ctx.fillText("die Eindruck", 80, 382);
      ctx.fillText("machen.", 80, 494);

      ctx.fillStyle = "rgba(247,241,232,0.5)";
      ctx.font = "800 22px Manrope, sans-serif";
      ctx.fillText("Premium Webdesign · Motion · lokale Sichtbarkeit", 84, 590);

      rounded(ctx, 900, 392, 380, 250, 34);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(94,162,255,0.32)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(94,162,255,0.5)";
      rounded(ctx, 934, 426, 312, 118, 26);
      ctx.fill();
      ctx.fillStyle = "#f7f1e8";
      ctx.font = "900 42px Geist, sans-serif";
      ctx.fillText("Modern", 934, 608);

      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      return texture;
    };

    const makePhoneTexture = () => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 420;
      textureCanvas.height = 820;
      const ctx = textureCanvas.getContext("2d")!;
      ctx.fillStyle = "#060a18";
      ctx.fillRect(0, 0, 420, 820);
      const glow = ctx.createRadialGradient(210, 210, 0, 210, 210, 260);
      glow.addColorStop(0, "rgba(94,162,255,0.72)");
      glow.addColorStop(0.45, "rgba(77,124,255,0.18)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 420, 520);
      rounded(ctx, 48, 52, 324, 360, 52);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fill();
      ctx.fillStyle = "rgba(247,241,232,0.46)";
      ctx.font = "800 28px Manrope, sans-serif";
      ctx.fillText("Mobile", 54, 560);
      ctx.fillStyle = "#f7f1e8";
      ctx.font = "900 58px Geist, sans-serif";
      ctx.fillText("Motion", 54, 636);
      ctx.fillStyle = "#d7ff3f";
      ctx.beginPath();
      ctx.arc(340, 712, 12, 0, Math.PI * 2);
      ctx.fill();
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const browser = new THREE.Mesh(
      new THREE.PlaneGeometry(5.55, 3.42),
      new THREE.MeshPhysicalMaterial({
        map: makeBrowserTexture(),
        transparent: true,
        roughness: 0.38,
        metalness: 0.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
      }),
    );
    browser.position.set(-0.25, 0.35, 0);
    browser.rotation.set(-0.055, -0.1, 0.006);
    group.add(browser);

    const phone = new THREE.Mesh(
      new THREE.PlaneGeometry(1.08, 2.14),
      new THREE.MeshPhysicalMaterial({
        map: makePhoneTexture(),
        transparent: true,
        roughness: 0.32,
        metalness: 0.08,
        clearcoat: 1,
      }),
    );
    phone.position.set(2.28, -1.02, 1.15);
    phone.rotation.set(-0.05, -0.3, 0.075);
    group.add(phone);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x5ea2ff,
      transparent: true,
      opacity: 0.11,
      roughness: 0.18,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    const leftGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 4.2), glassMaterial);
    leftGlass.position.set(-2.85, -0.05, -1.2);
    leftGlass.rotation.set(0.03, 0.48, -0.08);
    group.add(leftGlass);
    const rightGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 4.6), glassMaterial.clone());
    rightGlass.position.set(2.9, 0.12, -1.35);
    rightGlass.rotation.set(-0.02, -0.46, 0.08);
    group.add(rightGlass);

    const particleCount = 380;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 10;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x5ea2ff, size: 0.025, transparent: true, opacity: 0.62 }),
    );
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height || 1;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      group.rotation.y += (mouse.x * 0.12 - group.rotation.y) * 0.045;
      group.rotation.x += (-mouse.y * 0.07 - group.rotation.x) * 0.045;
      browser.position.y = Math.sin(time * 0.55) * 0.08;
      phone.position.y = -1.15 + Math.sin(time * 0.76) * 0.14;
      leftGlass.position.y = -0.15 + Math.sin(time * 0.45) * 0.1;
      rightGlass.position.y = 0.05 + Math.cos(time * 0.4) * 0.12;
      points.rotation.y = time * 0.025;
      blueLight.intensity = 5.8 + Math.sin(time * 0.9) * 0.9;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      browser.geometry.dispose();
      phone.geometry.dispose();
      leftGlass.geometry.dispose();
      rightGlass.geometry.dispose();
      particleGeometry.dispose();
    };
  }, []);

  return <canvas className="cinematic-canvas" ref={canvasRef} aria-hidden="true" />;
}

function MotionShowcase() {
  return (
    <section
      className="immersive-section agency-grid"
      id="branchen"
    >
      <div className="immersive-heading">
        <p>Branchen</p>
        <h2>Für Unternehmen,<br />die online hochwertig wirken wollen.</h2>
        <span>Friseure, Restaurants, Handwerk, Architektur und lokale Marken mit Anspruch.</span>
      </div>

      <div className="motion-environment" aria-label="Premium Webdesign Showcase">
        <CinematicSceneCanvas />
        <div className="webgl-caption">
          <span>3D Webdesign Erlebnis</span>
          <strong>Webseiten, die Eindruck machen.</strong>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ title, label, accent }: { title: string; label: string; accent: string }) {
  const isShinzo = title === "SHINZO";

  return (
    <motion.div className="project-visual" whileHover={{ rotateY: -7, rotateX: 4, scale: 1.02 }}>
      <BrowserMockup title={title} label={label} accent={accent} />
      {isShinzo && (
        <>
          <motion.a
            className="before-preview-card"
            href="https://shinzo.hair/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -5, scale: 1.025 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="before-preview-top">
              <span /><span /><span />
              <small>shinzo.hair</small>
            </div>
            <div className="before-preview-frame">
              <iframe
                title="SHINZO Vorher Vorschau"
                src="https://shinzo.hair/"
                loading="lazy"
              />
              <div className="before-preview-fallback">
                <strong>Vorher</strong>
                <p>Klassische Salon-Webseite</p>
              </div>
            </div>
            <div className="before-preview-label">
              <span>Vorher</span>
              <strong>shinzo.hair</strong>
              <small>Klassische Salon-Webseite</small>
            </div>
          </motion.a>
          <div className="after-badge">
            <span>Nachher</span>
            <strong>Motion Premium Experience</strong>
          </div>
        </>
      )}
      <div className="floating-mini"><MousePointer2 size={15} /><span>Motion aktiv</span></div>
    </motion.div>
  );
}

function Showcase() {
  return (
    <section className="showcase agency-grid" id="projekte">
      <div className="showcase-heading"><SectionHeading label="Showcase" title="Digitale Auftritte, die sich nicht wie Standard anfühlen." /></div>
      <div className="project-stack" style={{ perspective: "1000px" }}>
        {projects.map(([title, label, text, accent], index) => (
          <motion.article className={`project-card ${index % 2 ? "project-card-reverse" : ""}`} key={title} style={{ "--accent": accent, top: `${92 + index * 20}px`, transformOrigin: "top center" } as React.CSSProperties} initial={{ opacity: 0, y: 80, scale: 0.96, rotateX: -15 }} whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.85, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <div className="project-copy">
              <span>{label}</span><h3>{title}</h3><p>{text}</p>
              {title === "SHINZO" && (
                <div className="project-highlights">
                  <em>Video-Hero</em>
                  <em>Scroll Motion</em>
                  <em>Premium Effekte</em>
                  <em>Exklusiver Aufbau</em>
                </div>
              )}
              <a href="#kontakt">{title === "SHINZO" ? "So eine Webseite anfragen" : "Ähnliches Projekt anfragen"}<ArrowUpRight size={16} /></a>
            </div>
            <ProjectVisual title={title} label={label} accent={accent} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function GlowFeatureCard({
  title,
  description,
  gradient,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  description: string;
  gradient: string;
  icon: typeof LayoutDashboard;
  delay?: number;
}) {
  return (
    <motion.div
      className="glow-feature-card group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      <div className="glow-feature-card__glow" style={{ background: gradient }} />
      <motion.article
        className="glow-feature-card__surface"
        style={{ background: `linear-gradient(#111113, #111113) padding-box, ${gradient} border-box` }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="glow-feature-card__inner">
          <Icon size={32} strokeWidth={2.4} className="glow-feature-card__icon" />
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Services() {
  return (
    <section className="glow-feature-section" id="leistungen">
      <div className="glow-feature-head">
        <p>Leistungen</p>
        <h2>Webdesign, das nicht nur gut aussieht - sondern verkauft.</h2>
        <span>Strategie, Design, Technik und lokale Sichtbarkeit in einem modernen System für Unternehmen aus NRW.</span>
      </div>
      <div className="glow-feature-grid">
        {glowFeatures.map((feature, index) => (
          <GlowFeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            icon={feature.icon}
            delay={index * 0.08}
          />
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process-section agency-grid">
      <div className="section-aside">
        <SectionHeading label="Ablauf" title="Vom ersten Eindruck bis zum Launch." />
      </div>
      <div className="process-timeline">
        {processSteps.map(([number, title, text], index) => (
          <motion.article
            className="process-step"
            key={number}
            initial={{ opacity: 0, x: index % 2 ? 38 : -38 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="minimal-section pricing-section agency-grid" id="preise">
      <div className="section-aside">
      <SectionHeading label="Preise" title="Passende Lösungen für Unternehmen vor Ort." />
      </div>
      <div className="pricing-grid" style={{ perspective: "1000px" }}>
        {pricing.map(([title, price, text], index) => (
          <motion.article
            className={`price-card ${index === 1 ? "featured" : ""}`}
            key={title}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{title}</h3><strong>{price}</strong><p>{text}</p><div className="price-check"><Check size={16} />Persönliche Beratung inklusive</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section agency-grid" id="faq">
      <div className="section-aside">
      <SectionHeading label="FAQ" title="Häufige Fragen. Klar beantwortet." />
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section agency-grid" id="kontakt">
      <motion.div className="contact-panel" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9 }}>
        <span>Projektstart</span>
        <h2>Bereit für einen Auftritt, der hochwertig wirkt?</h2>
        <p>Erzählen Sie kurz, welches Unternehmen sichtbar werden soll. VorOrt Webdesign meldet sich mit einer klaren Einschätzung für Design, SEO und Umsetzung.</p>
        <div className="contact-actions">
          <Button href="mailto:vorort.webdesign@gmail.com"><Mail size={16} />Projekt anfragen</Button>
          <Button href="tel:+491779339780" ghost>Kostenlos beraten lassen</Button>
        </div>
      </motion.div>
    </section>
  );
}

function LegalNotice() {
  return (
    <section className="legal-section" id="impressum">
      <div className="legal-panel">
        <div>
          <span>Impressum</span>
          <h2>Angaben gemäß § 5 TMG</h2>
        </div>
        <div className="legal-grid">
          <p>
            <strong>VorOrt Webdesign</strong>
            <br />Senol Senlik
            <br />Moerser Str. 288
            <br />47228 Duisburg
            <br />Deutschland
          </p>
          <p>
            <strong>Kontakt</strong>
            <br />Telefon: <a href="tel:+491779339780">0177 9339780</a>
            <br />E-Mail: <a href="mailto:vorort.webdesign@gmail.com">vorort.webdesign@gmail.com</a>
          </p>
          <p>
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong>
            <br />Senol Senlik
            <br />Moerser Str. 288
            <br />47228 Duisburg
          </p>
        </div>
      </div>
    </section>
  );
}

function PrivacyNotice() {
  return (
    <section className="legal-section" id="datenschutz">
      <div className="legal-panel privacy-panel">
        <div>
          <span>Datenschutz</span>
          <h2>Datenschutzerklärung</h2>
        </div>
        <iframe
          className="privacy-frame"
          title="Datenschutzerklärung VorOrt Webdesign"
          src="/datenschutzerklaerung-vorort-webdesign.pdf#toolbar=0&navpanes=0&view=FitH"
        />
      </div>
    </section>
  );
}

function LegalModal({ view, onClose }: { view: "impressum" | "datenschutz" | null; onClose: () => void }) {
  if (!view) return null;

  return (
    <motion.div className="legal-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <button className="legal-backdrop" type="button" aria-label="Fenster schließen" onClick={onClose} />
      <motion.div className="legal-dialog" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        <button className="legal-close" type="button" aria-label="Schließen" onClick={onClose}>×</button>
        {view === "impressum" ? <LegalNotice /> : <PrivacyNotice />}
      </motion.div>
    </motion.div>
  );
}

function CookieBanner({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("vorort-cookie-consent") !== "accepted";
  });

  if (!visible) return null;

  const acceptCookies = () => {
    window.localStorage.setItem("vorort-cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <motion.div
      className="cookie-banner"
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <span>Datenschutz</span>
        <p>Wir verwenden nur technisch notwendige Funktionen und speichern Ihre Auswahl lokal im Browser.</p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-ghost" type="button" onClick={onPrivacyClick}>Datenschutz</button>
        <button type="button" onClick={acceptCookies}>Verstanden</button>
      </div>
    </motion.div>
  );
}

export default function AgencyApp() {
  const [legalView, setLegalView] = useState<"impressum" | "datenschutz" | null>(null);

  return (
    <main className="agency-app">
      <Hero />
      <MotionShowcase />
      <Showcase />
      <Services />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
      <CookieBanner onPrivacyClick={() => setLegalView("datenschutz")} />
      <LegalModal view={legalView} onClose={() => setLegalView(null)} />
      <footer className="footer">
        <Logo />
        <nav className="footer-links" aria-label="Rechtliche Links">
          <button type="button" onClick={() => setLegalView("impressum")}>Impressum</button>
          <button type="button" onClick={() => setLegalView("datenschutz")}>Datenschutz</button>
        </nav>
        <p>Premium Webdesign, Motion und lokale SEO für moderne Unternehmen in NRW. Stand: Layout 22.05.</p>
      </footer>
    </main>
  );
}
