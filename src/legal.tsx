import type React from "react";
import { ArrowLeft } from "lucide-react";
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

function ExtLink({ href, children }: { href: string; children?: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children ?? href}
    </a>
  );
}

function Datenschutz() {
  return (
    <article className="legal-text">
      <h1 className="display display-sm">Datenschutz{"\u00AD"}erklärung</h1>
      <p className="legal-sub">Stand: November 2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <p>
        VorOrt Webdesign, Senol Senlik, Moerser Str. 288, 47228 Duisburg, Deutschland
        <br />
        Telefon: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> · E-Mail: <a href={EMAIL_HREF}>{EMAIL}</a>
      </p>

      <h2>2. Das Wichtigste vorab</h2>
      <p>Diese Website ist bewusst datensparsam gebaut:</p>
      <ul>
        <li>keine Cookies</li>
        <li>keine Analyse- oder Tracking-Tools (kein Google Analytics, kein Facebook-Pixel o. Ä.)</li>
        <li>keine eingebundenen Inhalte von Drittanbietern (keine Google Maps, kein YouTube, keine Social-Media-Plugins)</li>
        <li>Schriften, Bilder und Videos werden ausschließlich vom eigenen Server geladen</li>
      </ul>
      <p>Personenbezogene Daten werden nur verarbeitet, soweit das für den Betrieb der Website technisch nötig ist oder wenn Sie selbst Kontakt mit mir aufnehmen.</p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>Diese Website wird bei Vercel gehostet. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>
      <p>Beim Aufruf der Website erfasst der Server automatisch technische Daten, die Ihr Browser übermittelt (Server-Logfiles):</p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite bzw. Datei</li>
        <li>Referrer-URL (die zuvor besuchte Seite)</li>
        <li>verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>Diese Daten sind nötig, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und Missbrauch (z. B. Angriffe) zu erkennen. Eine Zusammenführung mit anderen Datenquellen findet nicht statt.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt im sicheren und fehlerfreien Betrieb der Website.</p>
      <p>
        Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO). Dabei kann es zu einer Übermittlung von Daten in die USA kommen. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; damit liegt ein Angemessenheitsbeschluss der EU-Kommission vor (Art. 45 DSGVO). Ergänzend gelten die EU-Standardvertragsklauseln.
      </p>
      <p>
        Weitere Informationen: <ExtLink href="https://vercel.com/legal/privacy-notice" />
      </p>

      <h2>4. SSL-/TLS-Verschlüsselung</h2>
      <p>Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Sie erkennen eine verschlüsselte Verbindung an „https://“ und dem Schloss-Symbol in der Adresszeile Ihres Browsers.</p>

      <h2>5. Kontaktaufnahme</h2>
      <h3>Per E-Mail und über das Kontaktformular</h3>
      <p>
        Das Kontaktformular auf dieser Website versendet selbst keine Daten. Beim Klick auf „Nachricht per E-Mail senden“ öffnet sich Ihr eigenes E-Mail-Programm mit der vorausgefüllten Nachricht. Erst wenn Sie diese E-Mail selbst absenden, erhalte ich Ihre Angaben (z. B. Name, Betrieb, Telefonnummer, Nachricht, E-Mail-Adresse).
      </p>
      <p>
        Für mein E-Mail-Postfach nutze ich Gmail, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Ihre E-Mail wird daher auf Servern von Google gespeichert. Dabei kann es auch zu einer Übermittlung in die USA kommen; Google ist unter dem EU-US Data Privacy Framework zertifiziert.
      </p>

      <h3>Per Telefon</h3>
      <p>Wenn Sie mich anrufen, verarbeite ich Ihre Telefonnummer und die Inhalte des Gesprächs, soweit das zur Bearbeitung Ihres Anliegens nötig ist.</p>

      <h3>Per WhatsApp</h3>
      <p>
        Auf dieser Website gibt es Links zu WhatsApp. Diese Links sind einfache Verweise; beim bloßen Besuch der Website werden keine Daten an WhatsApp übertragen. Erst wenn Sie auf einen WhatsApp-Button klicken, öffnet sich WhatsApp bzw. die Website von WhatsApp. Anbieter ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
      </p>
      <p>
        Wenn Sie mir über WhatsApp schreiben, verarbeitet WhatsApp Ihre Nachricht, Ihre Telefonnummer und weitere Daten gemäß der eigenen Datenschutzrichtlinie:{" "}
        <ExtLink href="https://www.whatsapp.com/legal/privacy-policy-eea" />
      </p>
      <p>Dabei kann es auch zu einer Übermittlung in die USA kommen. Wenn Sie das nicht möchten, können Sie mich gern per Telefon oder E-Mail kontaktieren.</p>

      <h3>Rechtsgrundlage und Speicherdauer</h3>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage mit einem Vertrag oder vorvertraglichen Maßnahmen zusammenhängt (z. B. Anfrage für eine Website). In allen anderen Fällen ist es Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt in der Beantwortung Ihrer Anfrage.
      </p>
      <p>
        Ihre Daten bleiben bei mir, bis Ihr Anliegen erledigt ist oder Sie die Löschung verlangen. Gesetzliche Aufbewahrungspflichten (z. B. für Angebote, Rechnungen und Geschäftsbriefe nach Handels- und Steuerrecht: 6 bzw. 10 Jahre) bleiben unberührt.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>

      <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
      <p>
        Wenn eine Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Ich verarbeite Ihre Daten dann nicht mehr, es sei denn, es liegen zwingende schutzwürdige Gründe vor oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
      </p>
      <p>
        Eine kurze Nachricht an <a href={EMAIL_HREF}>{EMAIL}</a> genügt.
      </p>

      <h3>Beschwerderecht</h3>
      <p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist:</p>
      <p>
        Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestr. 2–4, 40213 Düsseldorf,{" "}
        <ExtLink href="https://www.ldi.nrw.de" />
      </p>

      <h2>7. Keine automatisierte Entscheidungsfindung</h2>
      <p>Eine automatisierte Entscheidungsfindung oder ein Profiling findet nicht statt.</p>

      <h2>8. Änderungen</h2>
      <p>Ich passe diese Datenschutzerklärung an, sobald sich die Website oder die rechtlichen Vorgaben ändern. Es gilt die jeweils hier veröffentlichte Fassung.</p>
    </article>
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
          <a className="btn btn-ghost btn-sm" href="/" aria-label="Zur Startseite">
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
