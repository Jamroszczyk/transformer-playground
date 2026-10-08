import { useState } from 'react'

export function Datenschutz() {
  const [lang, setLang] = useState<'de' | 'en'>('de')

  return (
    <article className="legal" lang={lang}>
      <p className="legal-kicker">
        <span className="lang-switch">
          <button
            type="button"
            className={lang === 'de' ? 'text-btn active' : 'text-btn'}
            onClick={() => setLang('de')}
          >
            DE
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            className={lang === 'en' ? 'text-btn active' : 'text-btn'}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </span>
      </p>
      {lang === 'de' ? <GermanPrivacy /> : <EnglishPrivacy />}
    </article>
  )
}

function GermanPrivacy() {
  return (
    <>
      <h1>Datenschutzerklärung</h1>
      <p className="legal-lead">Rechtlich maßgeblich ist die deutsche Fassung.</p>

      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
        Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können. Ausführliche Informationen zum Thema
        Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
        Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
      <p>
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis
        zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
      </p>

      <h4>Wie erfassen wir Ihre Daten?</h4>
      <p>
        Diese Website ist ein interaktives Sampling-Playground. Es gibt kein
        Kontaktformular, kein Nutzerkonto und keine Bestellfunktion. Sie müssen
        uns keine personenbezogenen Daten mitteilen, um die Seite zu nutzen.
      </p>
      <p>
        Technische Daten können automatisch beim Besuch der Website durch die
        IT-Systeme des Hosters erfasst werden. Das sind vor allem Server-Logs
        (z. B. IP-Adresse, Internetbrowser, Betriebssystem oder Uhrzeit des
        Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald
        Sie diese Website betreten.
      </p>

      <h4>Wofür nutzen wir Ihre Daten?</h4>
      <p>
        Die automatisch erhobenen technischen Daten dienen ausschließlich der
        sicheren und fehlerfreien Bereitstellung der Website. Wir führen keine
        Reichweitenanalyse durch und nutzen Ihre Daten nicht für Werbung.
      </p>

      <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
      <p>
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
        Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
        erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
        dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
        Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit
        für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
        bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
        Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>
      <p>
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
        jederzeit an uns wenden.
      </p>

      <h2>2. Hosting</h2>
      <h3>Externes Hosting</h3>
      <p>
        Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf
        dieser Website erfasst werden, werden auf den Servern des Hosters
        gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Meta- und
        Kommunikationsdaten, Websitezugriffe und sonstige Daten handeln, die
        über eine Website generiert werden.
      </p>
      <p>
        Das externe Hosting erfolgt im Interesse einer sicheren, schnellen und
        effizienten Bereitstellung unseres Online-Angebots durch einen
        professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur
        Erfüllung seiner Leistungspflichten erforderlich ist, und unsere
        Weisungen in Bezug auf diese Daten befolgen.
      </p>
      <p>Wir setzen folgenden Hoster ein:</p>
      <p>
        Render Services, Inc.
        <br />
        525 Brannan Street Ste 300
        <br />
        San Francisco CA 94107
        <br />
        USA
        <br />
        Telefon: 415-319-8186
        <br />
        E-Mail: legal@render.com
      </p>

      <h3>Auftragsverarbeitung</h3>
      <p>
        Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des
        oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen
        datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass
        dieser die personenbezogenen Daten unserer Websitebesucher nur nach
        unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
        sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
        entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerklärung.
      </p>
      <p>
        Wenn Sie diese Website benutzen, können verschiedene personenbezogene
        Daten erhoben werden. Personenbezogene Daten sind Daten, mit denen Sie
        persönlich identifiziert werden können. Die vorliegende
        Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir
        sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
      </p>
      <p>
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei
        der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
        lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich.
      </p>

      <h3>Hinweis zur verantwortlichen Stelle</h3>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website
        ist:
      </p>
      <p>
        Johannes Jamroszczyk
        <br />
        c/o IP-Management #11378
        <br />
        Ludwig-Erhard-Straße 18
        <br />
        20459 Hamburg
      </p>
      <p>
        Telefon: +49 176 63319606
        <br />
        E-Mail:{' '}
        <a href="mailto:jojojatt@yahoo.de">jojojatt@yahoo.de</a>
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die
        allein oder gemeinsam mit anderen über die Zwecke und Mittel der
        Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen
        o. Ä.) entscheidet.
      </p>

      <h3>Speicherdauer</h3>
      <p>
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere
        Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
        uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
        berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
        Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir
        keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
        personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche
        Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach
        Fortfall dieser Gründe.
      </p>
      <p>
        Server-Logs des Hosters unterliegen dessen üblichen
        Löschfristen. Die optionale Theme-Einstellung im Local Storage Ihres
        Browsers bleibt gespeichert, bis Sie sie selbst löschen oder den
        Speicher Ihres Browsers leeren.
      </p>

      <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
      <p>
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir
        Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a
        DSGVO. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
        Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
        erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1
        lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur
        Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf
        Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann
        ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1
        lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen
        Rechtsgrundlagen wird in den folgenden Absätzen dieser
        Datenschutzerklärung informiert.
      </p>

      <h3>Datenschutzbeauftragter</h3>
      <p>Wir haben einen Datenschutzbeauftragten benannt.</p>
      <p>
        Johannes Jamroszczyk
        <br />
        c/o IP-Management #11378
        <br />
        Ludwig-Erhard-Straße 18
        <br />
        20459 Hamburg
      </p>
      <p>
        Telefon: +49 176 63319606
        <br />
        E-Mail:{' '}
        <a href="mailto:jojojatt@yahoo.de">jojojatt@yahoo.de</a>
      </p>

      <h3>Empfänger von personenbezogenen Daten</h3>
      <p>
        Im Rahmen des Betriebs dieser Website arbeiten wir mit dem oben
        genannten Hoster zusammen. Eine Übermittlung von personenbezogenen Daten
        (insbesondere IP-Adressen in Server-Logs) an diesen Auftragsverarbeiter
        ist zur Bereitstellung der Website erforderlich. Wir geben
        personenbezogene Daten nicht zu Werbe- oder Analysezwecken an Dritte
        weiter.
      </p>
      <p>
        Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten
        nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung
        weiter.
      </p>

      <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
        Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
        jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
        Datenverarbeitung bleibt vom Widerruf unberührt.
      </p>

      <h3>
        Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie
        gegen Direktwerbung (Art. 21 DSGVO)
      </h3>
      <p>
        Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f
        DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus
        Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer
        personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein
        auf diese Bestimmungen gestütztes Profiling. Die jeweilige
        Rechtsgrundlage, auf der eine Verarbeitung beruht, entnehmen Sie dieser
        Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre
        betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn,
        wir können zwingende schutzwürdige Gründe für die Verarbeitung
        nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder
        die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen dient (Widerspruch nach Art. 21 Abs. 1 DSGVO).
      </p>
      <p>
        Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu
        betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die
        Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke
        derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit
        es mit solcher Direktwerbung in Verbindung steht. Wenn Sie
        widersprechen, werden Ihre personenbezogenen Daten anschließend nicht
        mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21
        Abs. 2 DSGVO).
      </p>
      <p>
        Auf dieser Website betreiben wir keine Direktwerbung und kein
        Tracking.
      </p>

      <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
        Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
        Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder
        des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
        unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher
        Rechtsbehelfe.
      </p>
      <p>
        Zuständige Aufsichtsbehörde für Hamburg ist der Hamburgische Beauftragte
        für Datenschutz und Informationsfreiheit.
      </p>

      <h3>Recht auf Datenübertragbarkeit</h3>
      <p>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
        oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder
        an einen Dritten in einem gängigen, maschinenlesbaren Format
        aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
        einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es
        technisch machbar ist.
      </p>

      <h3>Auskunft, Berichtigung und Löschung</h3>
      <p>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
        das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
        personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
        Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
        dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten können Sie sich jederzeit an uns wenden.
      </p>

      <h3>Recht auf Einschränkung der Verarbeitung</h3>
      <p>
        Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit
        an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
        folgenden Fällen:
      </p>
      <ul>
        <li>
          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
          personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit,
          um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht,
          die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
          verlangen.
        </li>
        <li>
          Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
          geschah/geschieht, können Sie statt der Löschung die Einschränkung
          der Datenverarbeitung verlangen.
        </li>
        <li>
          Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie
          jedoch zur Ausübung, Verteidigung oder Geltendmachung von
          Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung
          die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
          verlangen.
        </li>
        <li>
          Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
          muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen
          werden. Solange noch nicht feststeht, wessen Interessen überwiegen,
          haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>
      </ul>
      <p>
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt
        haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit
        Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung
        von Rechtsansprüchen oder zum Schutz der Rechte einer anderen
        natürlichen oder juristischen Person oder aus Gründen eines wichtigen
        öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats
        verarbeitet werden.
      </p>

      <h3>SSL- bzw. TLS-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
        vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, eine
        SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
        Sie daran, dass die Adresszeile des Browsers von „http://“ auf
        „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
      </p>
      <p>
        Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
        die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Server-Logs</h3>
      <p>
        Der Hoster dieser Website erhebt und speichert automatisch Informationen
        in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        übermittelt. Dies können insbesondere sein:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
        Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
        an der technisch fehlerfreien Darstellung und der Sicherheit seiner
        Website – hierzu müssen die Server-Logs erfasst werden.
      </p>

      <h3>Cookies</h3>
      <p>
        Wir setzen keine Cookies. Insbesondere setzen wir keine Analyse-, Werbe-
        oder Tracking-Cookies ein. Ein Cookie-Banner ist daher nicht
        erforderlich.
      </p>

      <h3>Lokale Speicherung (Local Storage)</h3>
      <p>
        Sofern Sie den Hell-/Dunkelmodus über den Schalter in der Kopfzeile
        ändern, speichert Ihr Browser die gewählte Einstellung unter dem
        Schlüssel <code>theme</code> im Local Storage. Dieser Eintrag ist
        technisch erforderlich, um Ihre Auswahl bei einem erneuten Besuch
        beizubehalten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO in
        Verbindung mit § 25 Abs. 2 Nr. 2 TDDDG, da die Speicherung der
        ausdrücklich von Ihnen gewünschten Darstellung der Website dient.
      </p>
      <p>
        Der Eintrag wird nur gesetzt, wenn Sie den Schalter betätigen. Sie
        können ihn jederzeit in den Einstellungen Ihres Browsers löschen.
      </p>
      <p>
        Es werden keine weiteren Local-Storage-Einträge und keine
        Session-Storage-Einträge zu Analyse- oder Werbezwecken gesetzt.
      </p>

      <h3>Schriftarten</h3>
      <p>
        Diese Website verwendet Systemschriftarten Ihres Geräts. Es werden keine
        Schriftarten von Google Fonts oder anderen Drittanbietern nachgeladen.
        Beim Aufruf der Seite findet daher keine Verbindung zu Servern von
        Google zum Zwecke der Schriftdarstellung statt.
      </p>

      <h3>Keine Analyse-, Werbe- oder Social-Plugins</h3>
      <p>
        Wir binden keine Dienste wie YouTube, Google Analytics, Meta-Pixel oder
        vergleichbare Tracking-Werkzeuge ein. Es findet keine Auswertung Ihres
        Nutzungsverhaltens durch uns statt.
      </p>

      <p className="legal-source">
        Quelle der Basistexte:{' '}
        <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer">
          e-recht24.de
        </a>
        . Die Abschnitte wurden an den tatsächlichen Betrieb dieser Website
        (Sampling Playground, Hosting bei Render, keine Cookies, kein Tracking)
        angepasst.
      </p>
    </>
  )
}

function EnglishPrivacy() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p className="legal-lead">
        The German version is legally authoritative.
      </p>

      <h2>1. Privacy at a glance</h2>
      <h3>General information</h3>
      <p>
        The following notes give a simple overview of what happens to your
        personal data when you visit this website. Personal data is any data
        with which you can be personally identified. Detailed information is
        available in the privacy policy below.
      </p>

      <h3>Data collection on this website</h3>
      <h4>Who is responsible for data collection on this website?</h4>
      <p>
        Data processing on this website is carried out by the website operator.
        You can find the operator’s contact details in the section “Information
        about the controller” in this privacy policy.
      </p>

      <h4>How do we collect your data?</h4>
      <p>
        This website is an interactive sampling playground. There is no contact
        form, user account, or checkout. You do not need to provide personal
        data to use the site.
      </p>
      <p>
        Technical data may be collected automatically by the hoster’s IT
        systems when you visit the site. This is mainly server log data (for
        example IP address, browser, operating system, or time of access). This
        collection happens automatically as soon as you enter this website.
      </p>

      <h4>What do we use your data for?</h4>
      <p>
        Automatically collected technical data is used only to provide the
        website securely and without errors. We do not run audience analytics
        and we do not use your data for advertising.
      </p>

      <h4>What rights do you have regarding your data?</h4>
      <p>
        You have the right to obtain information about origin, recipient, and
        purpose of your stored personal data free of charge at any time. You
        also have the right to request correction or deletion. If you have given
        consent to data processing, you may revoke that consent for the future
        at any time. You also have the right, under certain circumstances, to
        request restriction of processing, and a right to lodge a complaint with
        the competent supervisory authority.
      </p>
      <p>
        You can contact us at any time about this and any other questions on
        data protection.
      </p>

      <h2>2. Hosting</h2>
      <h3>External hosting</h3>
      <p>
        This website is hosted externally. Personal data collected on this
        website is stored on the hoster’s servers. This may include IP
        addresses, meta and communication data, website access data, and other
        data generated via a website.
      </p>
      <p>
        External hosting is carried out in the interest of a secure, fast, and
        efficient provision of our online offering by a professional provider
        (Art. 6(1)(f) GDPR).
      </p>
      <p>
        Our hoster will process your data only to the extent necessary to
        fulfil its service obligations and will follow our instructions with
        respect to this data.
      </p>
      <p>We use the following hoster:</p>
      <p>
        Render Services, Inc.
        <br />
        525 Brannan Street Ste 300
        <br />
        San Francisco CA 94107
        <br />
        USA
        <br />
        Phone: 415-319-8186
        <br />
        Email: legal@render.com
      </p>

      <h3>Data processing agreement</h3>
      <p>
        We have concluded a data processing agreement (DPA) for the use of the
        service named above. This is a contract required by data protection law
        which ensures that the provider processes personal data of our website
        visitors only according to our instructions and in compliance with the
        GDPR.
      </p>

      <h2>3. General notes and mandatory information</h2>
      <h3>Data protection</h3>
      <p>
        The operators of these pages take the protection of your personal data
        very seriously. We treat your personal data confidentially and in
        accordance with the statutory data protection regulations and this
        privacy policy.
      </p>
      <p>
        When you use this website, various personal data may be collected. This
        privacy policy explains which data we collect and what we use it for. It
        also explains how and for what purpose this happens.
      </p>
      <p>
        We point out that data transmission on the Internet (e.g. communication
        by email) can have security gaps. Complete protection of data against
        access by third parties is not possible.
      </p>

      <h3>Information about the controller</h3>
      <p>The controller for data processing on this website is:</p>
      <p>
        Johannes Jamroszczyk
        <br />
        c/o IP-Management #11378
        <br />
        Ludwig-Erhard-Straße 18
        <br />
        20459 Hamburg
        <br />
        Germany
      </p>
      <p>
        Phone: +49 176 63319606
        <br />
        Email:{' '}
        <a href="mailto:jojojatt@yahoo.de">jojojatt@yahoo.de</a>
      </p>
      <p>
        The controller is the natural or legal person who, alone or jointly
        with others, decides on the purposes and means of processing personal
        data.
      </p>

      <h3>Storage period</h3>
      <p>
        Unless a more specific storage period is stated in this privacy policy,
        your personal data remains with us until the purpose for processing
        ceases to apply. If you assert a legitimate request for deletion or
        revoke consent, your data will be deleted unless we have other legally
        permissible reasons for storing it (e.g. tax or commercial retention
        periods); in the latter case, deletion takes place after those reasons
        cease to apply.
      </p>
      <p>
        The hoster’s server logs are subject to its usual deletion periods. The
        optional theme setting in your browser’s local storage remains until
        you delete it yourself or clear your browser storage.
      </p>

      <h3>Legal bases for processing</h3>
      <p>
        If you have consented to data processing, we process your personal data
        on the basis of Art. 6(1)(a) GDPR. Consent can be revoked at any time.
        If your data is required to perform a contract or pre-contractual
        measures, we process it on the basis of Art. 6(1)(b) GDPR. We also
        process data where this is necessary to fulfil a legal obligation, on
        the basis of Art. 6(1)(c) GDPR. Processing may also take place on the
        basis of our legitimate interest under Art. 6(1)(f) GDPR. The legal
        basis relevant in each case is stated in the following sections.
      </p>

      <h3>Data protection officer</h3>
      <p>We have appointed a data protection officer.</p>
      <p>
        Johannes Jamroszczyk
        <br />
        c/o IP-Management #11378
        <br />
        Ludwig-Erhard-Straße 18
        <br />
        20459 Hamburg
      </p>
      <p>
        Phone: +49 176 63319606
        <br />
        Email:{' '}
        <a href="mailto:jojojatt@yahoo.de">jojojatt@yahoo.de</a>
      </p>

      <h3>Recipients of personal data</h3>
      <p>
        To operate this website we work with the hoster named above. Transfer
        of personal data (in particular IP addresses in server logs) to this
        processor is necessary to provide the website. We do not share personal
        data with third parties for advertising or analytics.
      </p>

      <h3>Revocation of your consent</h3>
      <p>
        Many data processing operations are only possible with your express
        consent. You may revoke consent already given at any time. The
        lawfulness of processing carried out until revocation remains
        unaffected.
      </p>

      <h3>
        Right to object (Art. 21 GDPR)
      </h3>
      <p>
        If processing is based on Art. 6(1)(e) or (f) GDPR, you have the right
        to object at any time, on grounds relating to your particular
        situation, to processing of your personal data; this also applies to
        profiling based on those provisions. If you object, we will no longer
        process the affected personal data unless we can demonstrate compelling
        legitimate grounds which override your interests, rights, and freedoms,
        or the processing serves the establishment, exercise, or defence of
        legal claims (objection under Art. 21(1) GDPR).
      </p>
      <p>
        If your personal data is processed for direct marketing, you have the
        right to object at any time. If you object, your personal data will
        subsequently no longer be used for direct marketing (objection under
        Art. 21(2) GDPR).
      </p>
      <p>This website does not use direct marketing or tracking.</p>

      <h3>Right to lodge a complaint</h3>
      <p>
        In the event of GDPR infringements, data subjects have the right to
        lodge a complaint with a supervisory authority, in particular in the
        Member State of their habitual residence, place of work, or place of
        the alleged infringement.
      </p>
      <p>
        The competent supervisory authority for Hamburg is the Hamburg
        Commissioner for Data Protection and Freedom of Information.
      </p>

      <h3>Right to data portability</h3>
      <p>
        You have the right to have data that we process automatically on the
        basis of your consent or in performance of a contract handed over to
        you or to a third party in a commonly used, machine-readable format.
      </p>

      <h3>Access, rectification, and erasure</h3>
      <p>
        Within the framework of the applicable legal provisions, you have the
        right at any time to obtain free information about your stored personal
        data, its origin and recipients, and the purpose of data processing
        and, if applicable, a right to rectification or erasure of this data.
      </p>

      <h3>Right to restriction of processing</h3>
      <p>
        You have the right to request restriction of processing of your
        personal data. You can contact us at any time for this purpose.
      </p>

      <h3>SSL / TLS encryption</h3>
      <p>
        This site uses SSL/TLS encryption for security reasons and to protect
        the transmission of confidential content that you send to us. You can
        recognise an encrypted connection by the browser address changing from
        “http://” to “https://” and by the lock icon in your browser bar.
      </p>

      <h2>4. Data collection on this website</h2>
      <h3>Server logs</h3>
      <p>
        The hoster of this website automatically collects and stores
        information in server log files that your browser transmits. This may
        include:
      </p>
      <ul>
        <li>browser type and version</li>
        <li>operating system used</li>
        <li>referrer URL</li>
        <li>host name of the accessing computer</li>
        <li>time of the server request</li>
        <li>IP address</li>
      </ul>
      <p>
        This data is not merged with other data sources. Collection is based on
        Art. 6(1)(f) GDPR. The website operator has a legitimate interest in
        the technically error-free presentation and security of the website —
        server logs must be recorded for this purpose.
      </p>

      <h3>Cookies</h3>
      <p>
        We do not use cookies. In particular, we do not use analytics,
        advertising, or tracking cookies. A cookie banner is therefore not
        required.
      </p>

      <h3>Local storage</h3>
      <p>
        If you change light/dark mode with the control in the header, your
        browser stores the chosen setting under the key <code>theme</code> in
        local storage. This entry is technically necessary to keep your choice
        on a later visit. The legal basis is Art. 6(1)(f) GDPR in conjunction
        with Section 25(2) no. 2 TDDDG, because the storage serves the display
        of the website expressly requested by you.
      </p>
      <p>
        The entry is only written when you use the toggle. You can delete it at
        any time in your browser settings.
      </p>
      <p>
        No further local-storage or session-storage entries are set for
        analytics or advertising.
      </p>

      <h3>Fonts</h3>
      <p>
        This website uses your device’s system fonts. Fonts are not loaded from
        Google Fonts or other third-party providers. Visiting the site
        therefore does not establish a connection to Google servers for the
        purpose of displaying fonts.
      </p>

      <h3>No analytics, ads, or social plugins</h3>
      <p>
        We do not embed services such as YouTube, Google Analytics, Meta Pixel,
        or comparable tracking tools. We do not evaluate your usage behaviour.
      </p>

      <p className="legal-source">
        Source of the base texts:{' '}
        <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer">
          e-recht24.de
        </a>
        . The sections were adapted to the actual operation of this website
        (Sampling Playground, hosting on Render, no cookies, no tracking).
      </p>
    </>
  )
}
