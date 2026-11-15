import { ArrowLeft, Download } from "lucide-react";
import { Footer } from "./AgencyApp";
import { Logo } from "./ui";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "./site";

function Impressum() {
  return (
    <>
      <h1 className="display display-sm">Impressum</h1>
      <p className="legal-sub">Angaben gemäß § 5 DDG</p>
      <div className="legal-grid">
        <p>
          <strong>VorOrt Webdesign</strong>
          <br />
          Senol Senlik
          <br />
          Moerser Str. 288
          <br />
          47228 Duisburg
          <br />
          Deutschland
        </p>
        <p>
          <strong>Kontakt</strong>
          <br />
          Telefon: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <br />
          E-Mail: <a href={EMAIL_HREF}>{EMAIL}</a>
        </p>
        <p>
          <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</strong>
          <br />
          Senol Senlik
          <br />
          Moerser Str. 288
          <br />
          47228 Duisburg
        </p>
      </div>
    </>
  );
}

function Datenschutz() {
  const pdf = "/datenschutzerklaerung-vorort-webdesign.pdf";
  return (
    <>
      <h1 className="display display-sm">Datenschutzerklärung</h1>
      <p className="legal-sub">
        Diese Website verwendet keine Tracking-Tools, keine Cookies zu Werbe- oder Analysezwecken und lädt Schriften ausschließlich vom eigenen Server.
      </p>
      <a className="btn btn-ghost btn-sm" href={pdf} target="_blank" rel="noopener noreferrer">
        <Download size={17} />
        <span>Datenschutzerklärung als PDF öffnen</span>
      </a>
      <iframe className="legal-frame" title="Datenschutzerklärung VorOrt Webdesign" src={`${pdf}#toolbar=0&navpanes=0&view=FitH`} loading="lazy" />
    </>
  );
}

export default function LegalPage({ page }: { page: "impressum" | "datenschutz" }) {
  return (
    <>
      <header className="site-nav is-scrolled legal-nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" aria-label="Zur Startseite">
            <Logo />
          </a>
          <a className="btn btn-ghost btn-sm" href="/">
            <ArrowLeft size={17} />
            <span>Zur Startseite</span>
          </a>
        </div>
      </header>
      <main className="legal-page">
        <div className="container legal-panel">{page === "impressum" ? <Impressum /> : <Datenschutz />}</div>
      </main>
      <Footer />
    </>
  );
}
