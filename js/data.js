// Forscher-Akademie Sonnenberg — Inhalts-Daten
// Architektur: Jedes Fach/Bereich ist ein Objekt, das pro Tag einen Schlüssel "day1", "day2", ... bekommt.
// So können weitere Tage später einfach ergänzt werden, ohne die App-Struktur zu ändern.

const TOTAL_DAYS = 30;

const ISLANDS = [
  { week: 1, name: "Dschungel-Insel", theme: "Tiere & Pflanzen" },
  { week: 2, name: "Wetterstation-Insel", theme: "Wetter & Jahreszeiten" },
  { week: 3, name: "Körper-Insel", theme: "Körper, Gesundheit, Ernährung" },
  { week: 4, name: "Stadt-Insel", theme: "Berufe, Fahrzeuge, Zusammenleben" },
  { week: 5, name: "Forscher-Insel", theme: "Experimente & Umwelt" },
  { week: 6, name: "Weltkarten-Insel", theme: "Karten, Wiederholung, Abschlussfest" },
];

const MASCOT_TILLY_SVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="55" cy="152" rx="18" ry="12" fill="#fcd9a8" stroke="#c88a4c" stroke-width="3"/>
  <ellipse cx="145" cy="152" rx="18" ry="12" fill="#fcd9a8" stroke="#c88a4c" stroke-width="3"/>
  <ellipse cx="42" cy="112" rx="16" ry="11" fill="#fcd9a8" stroke="#c88a4c" stroke-width="3"/>
  <ellipse cx="158" cy="112" rx="16" ry="11" fill="#fcd9a8" stroke="#c88a4c" stroke-width="3"/>
  <ellipse cx="100" cy="118" rx="72" ry="56" fill="#4ade80" stroke="#15803d" stroke-width="4"/>
  <path d="M100 66 L100 174" stroke="#15803d" stroke-width="3" fill="none"/>
  <path d="M31 118 L169 118" stroke="#15803d" stroke-width="3" fill="none"/>
  <path d="M52 78 L148 158" stroke="#15803d" stroke-width="3" fill="none"/>
  <path d="M148 78 L52 158" stroke="#15803d" stroke-width="3" fill="none"/>
  <circle cx="100" cy="55" r="32" fill="#fde3b6" stroke="#c88a4c" stroke-width="3"/>
  <circle cx="87" cy="48" r="8" fill="#fff"/>
  <circle cx="113" cy="48" r="8" fill="#fff"/>
  <circle cx="88" cy="49" r="4" fill="#1f2937"/>
  <circle cx="114" cy="49" r="4" fill="#1f2937"/>
  <ellipse cx="76" cy="63" rx="6.5" ry="4.5" fill="#fca5a5" opacity="0.7"/>
  <ellipse cx="124" cy="63" rx="6.5" ry="4.5" fill="#fca5a5" opacity="0.7"/>
  <path d="M87 66 Q100 76 113 66" stroke="#7c4a20" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`;

const MASCOT_MOMO_SVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="45" cy="72" r="25" fill="#8a5a3a"/>
  <circle cx="155" cy="72" r="25" fill="#8a5a3a"/>
  <circle cx="45" cy="72" r="14" fill="#f3d9b1"/>
  <circle cx="155" cy="72" r="14" fill="#f3d9b1"/>
  <circle cx="100" cy="88" r="56" fill="#8a5a3a"/>
  <ellipse cx="100" cy="101" rx="39" ry="35" fill="#f3d9b1"/>
  <circle cx="85" cy="92" r="8.5" fill="#fff"/>
  <circle cx="115" cy="92" r="8.5" fill="#fff"/>
  <circle cx="86" cy="93" r="4.2" fill="#1f2937"/>
  <circle cx="116" cy="93" r="4.2" fill="#1f2937"/>
  <path d="M85 111 Q100 121 115 111" stroke="#5c3a20" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M62 132 Q100 154 138 132 L127 149 Q100 165 73 149 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
</svg>`;

const EXCURSIONS = [
  {
    week: 1, island: "Dschungel-Insel",
    options: [
      { name: "Zoo in eurer Nähe", desc: "Tiger, Affen und Elefanten hautnah erleben — passt perfekt zum Dschungel-Thema der Woche. Gut für beide Altersgruppen. (Tipp für Berlin: Zoo Berlin.)" },
      { name: "Tierpark oder Wildgehege in eurer Region", desc: "Weitläufiges Gelände mit großen Freigehegen, oft ruhiger als ein Zoo — gut geeignet, wenn eure kleinen Kinder viel Platz zum Laufen brauchen. (Tipp für Berlin: Tierpark Friedrichsfelde.)" }
    ]
  }
];

const WELCOME_LETTER_HTML = `
  <div class="letter-wrap">
    <div class="letter-card">
      <div class="letter-seal">🧭</div>
      <div class="letter-mascot letter-mascot-left">${MASCOT_TILLY_SVG}</div>
      <div class="letter-mascot letter-mascot-right">${MASCOT_MOMO_SVG}</div>
      <p class="letter-greeting">Lieber Kadett<br>und liebes Forscherkind,</p>
      <div class="letter-body">
        <p><strong>wir freuen uns, euch auf der Kadetten-Akademie aufzunehmen!</strong></p>
        <p>In den nächsten sechs Wochen werdet ihr echte Forscherinnen und Forscher der
        <em>Forscher-Akademie Sonnenberg</em>. Zusammen bereist ihr sechs geheimnisvolle Inseln:
        den wilden Dschungel, die stürmische Wetterstation, die spannende Körper-Insel,
        die belebte Stadt-Insel, die knifflige Forscher-Insel und ganz am Ende die
        große Weltkarten-Insel.</p>
        <p>Auf jeder Insel warten neue Abenteuer, Rätsel und Aufgaben auf euch.
        Tilly die Schildkröte und Momo der Affe begleiten euch dabei und helfen euch,
        wenn es mal knifflig wird.</p>
        <p><strong>Du bist unser Kadett</strong>: Du sammelst XP-Punkte, steigst Level für Level auf
        und verdienst dir Tierabzeichen. Jeden Freitag wartet eine große Endboss-Challenge auf dich.</p>
        <p><strong>Du bist unser Forscherkind</strong>: Du sammelst auf deiner Reise Sterne
        und Sticker. Bei dir zählt vor allem eins — mitmachen und Spaß haben!</p>
        <p>Packt eure Forscher-Rucksäcke, denn morgen geht die Reise los.</p>
      </div>
      <p class="letter-signature">Wir freuen uns auf euch! 🧭<br>Eure Forscher-Akademie Sonnenberg</p>
    </div>
  </div>
`;

const SCHEDULE_HTML = `
  <div class="card">
    <h3>🕒 Der Tagesrhythmus</h3>
    <table class="milestone-table">
      <tr><th>Zeit (Richtwert)</th><th>Block</th></tr>
      <tr><td>09:00 – 09:20</td><td>🤝 Geschwistermission (gemeinsam)</td></tr>
      <tr><td>09:20 – 10:00</td><td>Kadett: 1. Fach &nbsp;|&nbsp; Forscherkind: 1. Bereich (parallel)</td></tr>
      <tr><td>10:00 – 10:15</td><td>🏃 Bewegungspause (gemeinsam)</td></tr>
      <tr><td>10:15 – 10:55</td><td>Kadett: 2. Fach &nbsp;|&nbsp; Forscherkind: 2. Bereich (parallel)</td></tr>
      <tr><td>10:55 – 11:10</td><td>🏃 Bewegungspause (gemeinsam)</td></tr>
      <tr><td>11:10 – 11:45</td><td>Kadett: 3. Fach &nbsp;|&nbsp; Forscherkind: 3. Bereich (parallel)</td></tr>
      <tr><td>Nachmittag</td><td>Frei, spielen, ausruhen</td></tr>
      <tr><td>Abends</td><td>🎉 Abschlussritual (gemeinsam)</td></tr>
    </table>
    <p style="font-size:13.5px;color:#6b7280;margin-top:10px;">
      Ein Elternteil betreut beide Kinder abwechselnd: kurz beim Kadett erklären, ihn rechnen/lesen lassen,
      währenddessen mit dem Forscherkind spielen — und umgekehrt. Die Reihenfolge der Fächer/Bereiche darf je nach
      Tagesform getauscht werden.
    </p>
  </div>
  <div class="card">
    <h3>🏝️ Die sechs Inseln</h3>
    <table class="milestone-table">
      <tr><th>Woche</th><th>Insel</th><th>Thema</th></tr>
      ${ISLANDS.map(i => `<tr><td>${i.week}</td><td>${i.name}</td><td>${i.theme}</td></tr>`).join("")}
    </table>
  </div>
`;

function trackerGridHtml(activeColor, child) {
  let cells = "";
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const isToday = d === 1;
    const style = isToday ? `style="border-color:${activeColor};color:${activeColor};background:${activeColor}1a;"` : "";
    cells += `<div class="tracker-day" data-child="${child}" data-day="${d}" ${style}>Tag ${d}</div>`;
  }
  return `<div class="tracker-grid">${cells}</div>`;
}

const TRACKER_HTML = `
  <p class="page-subtitle">Tipp: Tippt auf einen Tag, um ihn abzuhaken — der Rang aktualisiert sich live!</p>
  <div class="two-col">
    <div class="card">
      <h3>🦁 Kadett-XP-Tracker</h3>
      <p>Für jede erledigte Aufgabe gibt es 10–30 XP, je nach Schwierigkeit. Ein Klebefeld pro Tag
      wartet auf einen Sticker, sobald das Tagesprogramm geschafft ist.</p>
      <table class="milestone-table">
        <tr><th>XP</th><th>Rang</th></tr>
        <tr><td>0 – 99</td><td>🥉 Kadett</td></tr>
        <tr><td>100 – 249</td><td>🥈 Juniorforscher</td></tr>
        <tr><td>250 – 499</td><td>🥇 Forscher</td></tr>
        <tr><td>500 – 799</td><td>🏅 Expeditionsleiter</td></tr>
        <tr><td>800+</td><td>👑 Meisterforscher der Akademie</td></tr>
      </table>
      <p style="font-size:13.5px;color:#6b7280;">Pro abgeschlossener Insel (Woche) gibt es zusätzlich ein
      Tierabzeichen. Freitags wartet eine große Endboss-Challenge mit Bonus-XP.</p>
      <p style="font-family:var(--font-fun);color:#4f46e5;">Aktueller Rang: <span class="tracker-live-rank">🥉 Kadett (0 XP)</span></p>
      <p class="tracker-live-count" style="font-size:13px;color:#6b7280;">0 von ${TOTAL_DAYS} Tagen abgehakt</p>
      ${trackerGridHtml("#4f46e5", "leo")}
    </div>
    <div class="card">
      <h3>🐢 Forscherkind-Sterne-Tracker</h3>
      <p>Kein Testcharakter, kein Punktesystem — jede Teilnahme ist ein Erfolg! Für jeden Kurstag gibt
      es einen Stern oder Sticker zum Aufkleben.</p>
      <p style="font-size:13.5px;color:#6b7280;">Am Ende jeder Woche gibt es ein eigenes kleines
      Wochendiplom, ganz unabhängig vom Fortschritt des Kadetten.</p>
      <p class="tracker-live-count" style="font-size:13px;color:#6b7280;">0 von ${TOTAL_DAYS} Tagen abgehakt</p>
      ${trackerGridHtml("#db2777", "lili")}
    </div>
  </div>
`;

const MATERIALS = {
  day1: {
    toPrint: [
      { item: "Ausmalbild „Tilly die Schildkröte“", note: "Forscherkind · Kreativ & Ausmalen — oder direkt am Bildschirm/Tablet zeigen und auf Papier nachmalen lassen." },
      { item: "Mathe-Übungsblatt (25 Aufgaben)", note: "Kadett · Mathe — praktisch, wenn dein Kind lieber auf Papier statt am Bildschirm rechnet." },
      { item: "Steckbrief-Vorlage Elefant", note: "Kadett · Sachunterricht — die Lückentabelle zum Ausfüllen." },
      { item: "Zwei Tagesdiplome (Kadett & Forscherkind)", note: "Für das Abschlussritual am Abend." },
      { item: "Tracker-Poster", note: "Nur nötig, falls ihr lieber ein Poster an die Wand hängen statt digital abzuhaken." }
    ],
    toGet: [
      { item: "Klopapierrolle + braune Farbe oder braunes Papier, Schere, Kleber, Wolle", note: "Für die Bastelidee „Klopapierrollen-Affe“ (Forscherkind)." },
      { item: "Ein großes gesammeltes grünes Blatt, weißes Papier", note: "Alternative Bastelidee „Blätter-Frosch“ (Forscherkind)." },
      { item: "Buntstifte oder Wachsmalstifte", note: "Für das Ausmalbild (Forscherkind)." },
      { item: "Durchsichtiges Glas, Lebensmittelfarbe (blau oder rot), weiße Blume oder Selleriestängel mit Blättern", note: "Für das Experiment „Wie trinkt eine Blume?“ (Forscherkind · Naturwissen) — morgens ansetzen, abends das Ergebnis anschauen." },
      { item: "Kissen, Decken, ein Stuhl oder Tisch", note: "Für das Dschungel-Lager (Geschwistermission) und den Dschungel-Parcours (Bewegung)." },
      { item: "Klebeband oder eine Teppichkante", note: "Als „Ast“ zum Balancieren beim Dschungel-Parcours (Bewegung)." },
      { item: "Sticker oder kleine Stern-Aufkleber", note: "Für den Kadett-XP-Tracker und den Forscherkind-Sterne-Tracker." },
      { item: "Drucker + Papier", note: "Nur, falls ihr etwas von der Liste oben tatsächlich ausdrucken möchtet — alles funktioniert auch rein digital." }
    ]
  },
  day2: {
    toPrint: [
      { item: "Ausmalbild „Momo der Affe“", note: "Forscherkind · Kreativ & Ausmalen." },
      { item: "Mathe-Übungsblatt (25 Aufgaben Addition)", note: "Kadett · Mathe." },
      { item: "Steckbrief-Vorlage Schlange", note: "Kadett · Sachunterricht." }
    ],
    toGet: [
      { item: "Gesammelte Blätter oder buntes Papier, Buntstifte", note: "Für die Bastelidee „Blätter-Kunst-Dschungelbild“ (Forscherkind)." },
      { item: "Eine kleine Papiertüte, gelbe/orange Farbe, Wolle", note: "Alternative Bastelidee „Papiertüten-Löwe“ (Forscherkind)." },
      { item: "Große Schüssel Wasser + Alltagsgegenstände (Holzlöffel, Stein, Büroklammer, Korken, Plastiklöffel, Papier)", note: "Für das Experiment „Schwimmt es oder sinkt es?“ (Forscherkind · Naturwissen)." },
      { item: "Klebeband oder zwei Kissen als Start-/Ziellinie", note: "Für das Dschungel-Tier-Wettrennen (Bewegung)." },
      { item: "Kleine Süßigkeiten, Sticker oder Naturmaterialien als \"Schatz\"", note: "Für die Geschwistermission „Dschungel-Schatzsuche\"." }
    ]
  },
  day3: {
    toPrint: [
      { item: "Ausmalbild „Coco der Papagei“", note: "Forscherkind · Kreativ & Ausmalen." },
      { item: "Mathe-Übungsblatt (25 Aufgaben Ausgleichstrick)", note: "Kadett · Mathe." },
      { item: "Steckbrief-Vorlage Papagei", note: "Kadett · Sachunterricht." }
    ],
    toGet: [
      { item: "Papierteller, bunte Papierstreifen oder Fingerfarbe", note: "Für die Bastelidee „Papierteller-Papagei“ oder „Fingerabdruck-Federn“ (Forscherkind)." },
      { item: "Ein Glas Mineralwasser mit viel Kohlensäure, ein paar Rosinen", note: "Für das Experiment „Die tanzenden Rosinen“ (Forscherkind · Naturwissen)." },
      { item: "Yogamatte, Handtuch oder weicher Teppich", note: "Für das Dschungel-Yoga (Bewegung)." },
      { item: "Bauklötze, Perlen oder kleines Spielzeug in 2 Farben", note: "Für das Muster-Spiel (Forscherkind · Mathe)." }
    ]
  },
  day4: {
    toPrint: [
      { item: "Ausmalbild „Karl das Krokodil“", note: "Forscherkind · Kreativ & Ausmalen." },
      { item: "Mathe-Übungsblatt (25 gemischte Aufgaben)", note: "Kadett · Mathe." },
      { item: "Steckbrief-Vorlage Leopard", note: "Kadett · Sachunterricht." }
    ],
    toGet: [
      { item: "2 Klopapierrollen, grüne + braune/graue Farbe, Schere (Elternteil)", note: "Für „Klopapierrollen-Krokodil“ oder „-Faultier“ (Forscherkind)." },
      { item: "Großes Glas Wasser, Rasierschaum, blaue Lebensmittelfarbe", note: "Für das Experiment „Wolken im Glas“ (Forscherkind · Naturwissen)." },
      { item: "Decken, Kissen, Taschenlampe", note: "Für die Geschwistermission „Sturm-Schutz bauen“." }
    ]
  },
  day5: {
    toPrint: [
      { item: "Ausmalbild „Regenbogen über der Dschungel-Insel“", note: "Forscherkind · Kreativ & Ausmalen." },
      { item: "Mathe-Übungsblatt (25 gemischte Aufgaben + Endboss-Challenge)", note: "Kadett · Mathe." },
      { item: "Beide Wochendiplome (Kadett & Forscherkind)", note: "Für die Feier am Freitagabend." }
    ],
    toGet: [
      { item: "Buntes Papier, Klebstoff, Schere (Elternteil)", note: "Für die Party-Krone (Forscherkind · Kreativ)." },
      { item: "Flacher Teller, Vollmilch, Lebensmittelfarbe, Spülmittel, Wattestäbchen", note: "Für das Experiment „Milch-Farben-Tanz“ (Forscherkind · Naturwissen)." },
      { item: "Kleine Snacks oder Beeren zum Feiern", note: "Für das gemeinsame Dschungel-Fest am Abend." },
      { item: "Zettel mit den 6 Ausflugszielen der Woche 1", note: "Für die Geschwistermission — gemeinsam den Belohnungsausflug aussuchen." }
    ]
  }
};

const MISSIONS = {
  day1: `
    <div class="parent-note"><strong>Elternhinweis:</strong> Heute startet die Dschungel-Insel! Diese
    Mission dauert ca. 10–15 Minuten und macht beiden Kindern zusammen Lust auf die neue Woche.</div>
    <div class="card">
      <h3>🏕️ Das Dschungel-Lager</h3>
      <p>Baut gemeinsam mit Decken, Kissen und Stühlen ein kleines "Dschungel-Lager" im Wohnzimmer.
      Das ist ab heute der Treffpunkt der Forscher-Akademie für die ganze Woche.</p>
      <p>Fragt die Kinder: "Welche Tiere, glaubt ihr, leben im Dschungel? Welche Geräusche hört man dort?"
      Sammelt ein paar Ideen und lasst die Kinder die passenden Tiergeräusche nachmachen.</p>
      <p>Zum Abschluss der Mission: Lest gemeinsam die letzten zwei Sätze aus dem Willkommensbrief noch
      einmal vor, bevor jedes Kind in sein eigenes Programm startet.</p>
    </div>
  `,
  day2: `
    <div class="parent-note"><strong>Elternhinweis:</strong> Eine kleine Schatzsuche, ca. 15–20 Minuten.
    Versteckt die "Schätze" vorab, während die Kinder noch nicht zuschauen.</div>
    <div class="card">
      <h3>🗺️ Die Dschungel-Schatzsuche</h3>
      <p>Versteckt 5–6 kleine "Schätze" (Sticker, Naturmaterialien oder kleine Süßigkeiten) im Zimmer
      oder Garten. Malt oder schreibt dazu einfache Hinweiszettel, die von einem Versteck zum nächsten führen.</p>
      <p>Beispiel-Hinweis: "Der nächste Schatz versteckt sich dort, wo Momo gerne klettert!" (→ ein hoher
      Ort wie ein Regal oder Baum).</p>
      <p>Lasst beide Kinder gemeinsam die Hinweise lösen und die Schätze einsammeln — am Ende darf
      jedes Kind sich einen Schatz aussuchen.</p>
    </div>
  `,
  day3: `
    <div class="parent-note"><strong>Elternhinweis:</strong> Eine ruhigere, gemeinsame Mission zum
    Wochenausklang, ca. 15 Minuten. Ein großes Blatt Papier oder Plakat bereitlegen.</div>
    <div class="card">
      <h3>🖼️ Unser großes Dschungel-Bild</h3>
      <p>Legt ein großes Blatt Papier oder ein Plakat auf den Tisch oder Boden. Gemeinsam malt ihr
      alle Tiere, die beide Kinder diese Woche schon kennengelernt haben: Tiger, Affe, Schlange,
      Krokodil und Papagei.</p>
      <p>Jedes Kind darf sich sein Lieblingstier aussuchen und besonders schön ausmalen. Am Ende hängt
      ihr das Bild als Erinnerung an die Dschungel-Insel auf.</p>
    </div>
  `,
  day4: `
    <div class="parent-note"><strong>Elternhinweis:</strong> Passend zur heutigen Sturm-Geschichte, ca.
    15 Minuten. Eine gemütliche, geborgene Mission zum Kuscheln.</div>
    <div class="card">
      <h3>⛺ Sturm-Schutz bauen</h3>
      <p>Baut gemeinsam eine gemütliche Höhle aus Decken und Kissen — den "Schutz vor dem Sturm", genau
      wie Coco ihn in der heutigen Geschichte gebraucht hat.</p>
      <p>Kriecht mit einer Taschenlampe hinein und erzählt euch gegenseitig, welches Tier aus der Woche
      euch am besten gefallen hat und warum.</p>
      <p>Zum Abschluss: Wer möchte, darf in der Höhle bleiben und dort das Abschlussritual des Tages machen.</p>
    </div>
  `,
  day5: `
    <div class="parent-note"><strong>Elternhinweis:</strong> Die große Wochenfeier, ca. 20 Minuten —
    heute darf gefeiert werden!</div>
    <div class="card">
      <h3>🎉 Das Dschungel-Fest & die Ausflugswahl</h3>
      <p>Feiert gemeinsam das Ende der ersten Woche! Jedes Kind erzählt dem anderen sein
      Lieblingstier, seine Lieblingsgeschichte und seine Lieblingsaufgabe der Woche.</p>
      <p>Schaut euch danach gemeinsam die Seite "🎡 Ausflugsziele" an und wählt als Familie aus, zu
      welchem der beiden Woche-1-Ziele ihr als Belohnung fahren möchtet.</p>
      <p>Zum Abschluss: Überreicht beiden Kindern ihre Wochendiplome und lasst sie stolz erzählen, was
      sie diese Woche alles geschafft haben.</p>
    </div>
  `
};

const CLOSING_HTML = `
  <div class="card">
    <h3>🌙 Das Abschlussritual (jeden Abend)</h3>
    <ol>
      <li>Eine kurze gemeinsame Geschichte mit Momo und Tilly (siehe den Bereich "Geschichte" für die
      Tagesgeschichte — sie darf gerne beiden Kindern vorgelesen werden).</li>
      <li>Erzähl-Runde: Jedes Kind beantwortet die Frage "Was war dein Lieblingsmoment heute?"</li>
      <li>Zwei getrennte Tagesdiplome werden ausgehändigt.</li>
    </ol>
  </div>
  <div class="two-col">
    <div class="card">
      <h3>🦁 Kadett-Tagesdiplom (Vorlage)</h3>
      <p style="font-size:14px;">
      <strong>Urkunde der Forscher-Akademie Sonnenberg</strong><br>
      Hiermit wird bestätigt, dass Kadett <strong>_______________</strong> heute tapfer
      geforscht, gerechnet und gelesen hat.<br>
      Verdiente XP heute: ______<br>
      Unterschrift der Akademie: ______</p>
    </div>
    <div class="card">
      <h3>🐢 Forscherkind-Tagesdiplom (Vorlage)</h3>
      <p style="font-size:14px;">
      <strong>Urkunde der Forscher-Akademie Sonnenberg</strong><br>
      Hiermit wird bestätigt, dass das Forscherkind <strong>_______________</strong>
      heute mutig mitgemacht hat.<br>
      Verdiente Sterne heute: ______<br>
      Unterschrift der Akademie: ______</p>
    </div>
  </div>
  <div class="card">
    <h3>🏆 Das große Abschlussfest (Ende Woche 6)</h3>
    <p>Am letzten Kurstag, auf der Weltkarten-Insel, blicken beide Kinder gemeinsam auf ihre ganze
    Reise zurück. Es gibt eine kleine Feier mit beiden großen Wochendiplomen, der Verleihung aller
    gesammelten Tierabzeichen und einer gemeinsamen "Weltkarte der Forscher-Akademie", auf der beide
    Kinder eintragen, welche Insel ihnen am besten gefallen hat.</p>
    <p style="font-size:13.5px;color:#6b7280;">Die vollständigen Inhalte für Woche 6 werden ergänzt,
    sobald die vorherigen Wochen fertig ausgearbeitet sind.</p>
  </div>
`;

// ============================================================
// LEO — Fächer
// ============================================================

const LEO = {
  mathe: {
    color: "var(--color-mathe)",
    label: "Mathe",
    days: {
      day1: {
        parentNote: "Heute lernt dein Kadett den <strong>Ergänzungstrick</strong> für die Subtraktion mit Zehnerübergang. Es geht nur um dieses eine Thema — kein Malnehmen, kein Teilen, keine Uhr.",
        theoryTitle: "Subtraktion mit dem Ergänzungstrick",
        theoryHtml: `
          <p>Wenn man zwei Zahlen subtrahiert und bei den Einern nicht "normal" abziehen kann
          (weil die zweite Ziffer größer ist als die erste), hilft dieser Trick:</p>
          <p><strong>Beispiel: 64 − 37 = ?</strong></p>
          <ol>
            <li>Schau nur auf die letzten Ziffern: <strong>4</strong> und <strong>7</strong>.</li>
            <li>Da 7 größer ist als 4, rechnest du: 7 − 4 = 3.</li>
            <li>Jetzt suchst du die "verliebte Zahl" von 3 (die Zahl, die mit 3 zusammen 10 ergibt):
            3 + 7 = 10 → die 7 ist die letzte Ziffer des Ergebnisses.</li>
            <li>Jetzt die Zehner: 6 − 3 = 3.</li>
            <li>Weil wir bei den Einern "geliehen" haben, ziehen wir von den Zehnern noch 1 ab: 3 − 1 = 2.</li>
            <li>Ergebnis: <strong>27</strong>.</li>
          </ol>
          <p><strong>Zweites Beispiel: 52 − 28 = ?</strong></p>
          <ol>
            <li>Einer: 2 und 8. Da 8 größer ist: 8 − 2 = 6.</li>
            <li>Verliebte Zahl von 6 ist 4 (6+4=10) → letzte Ziffer des Ergebnisses ist 4.</li>
            <li>Zehner: 5 − 2 = 3, minus 1 fürs Leihen = 2.</li>
            <li>Ergebnis: <strong>24</strong>.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Dieser Trick funktioniert später genauso bei
          dreistelligen Zahlen — das üben wir aber erst, wenn die zweistellige Version ganz sicher sitzt.</p>
        `,
        exercises: [
          [52,28],[71,45],[83,56],[44,19],[92,67],[61,34],[55,28],[73,46],[82,55],[93,76],
          [41,23],[62,45],[84,27],[91,53],[70,42],[53,26],[64,28],[81,34],[92,45],[45,19],
          [63,27],[74,38],[85,49],[96,58],[51,24]
        ],
        preview: "Morgen üben wir den Ergänzungstrick weiter mit noch etwas größeren Zahlen, damit er ganz sicher sitzt, bevor es mit neuen Themen weitergeht.",
        bonus: {
          title: "✨ Einblick 3. Klasse (Bonus, freiwillig)",
          html: `<p>In der 3. Klasse lernt man, ein Ganzes in gleich große Teile zu zerlegen und
          diese Teile als <strong>Brüche</strong> aufzuschreiben.</p>
          <div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;margin:14px 0;">
            <div style="text-align:center;">
              <svg width="110" height="110" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 50 95 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13.5px;margin:4px 0 0 0;">Ein Halb: <strong>1/2</strong></p>
            </div>
            <div style="text-align:center;">
              <svg width="110" height="110" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13.5px;margin:4px 0 0 0;">Ein Viertel: <strong>1/4</strong></p>
            </div>
          </div>
          <p><strong>Ein Halb (1/2):</strong> Teilt man ein Ganzes in 2 gleich große Teile, heißt
          jedes Teil "ein Halb". Man schreibt: 1/2.</p>
          <p><strong>Ein Viertel (1/4):</strong> Teilt man das Ganze in 4 gleich große Teile, heißt
          jedes Teil "ein Viertel". Man schreibt: 1/4.</p>
          <p>Übung (freiwillig): Wie viele Viertel ergeben zusammen ein Ganzes? Wie viele Viertel
          ergeben zusammen ein Halb?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: 4 Viertel ergeben ein Ganzes. 2 Viertel ergeben ein Halb.</p>`
        }
      },
      day2: {
        parentNote: "Heute lernt dein Kadett den <strong>Trick der stellenweisen Addition</strong> für die Addition mit Zehnerübergang. Wieder nur dieses eine Thema.",
        theoryTitle: "Addition mit dem Trick der stellenweisen Addition",
        theoryHtml: `
          <p>Bei der Addition mit Zehnerübergang hilft es, Zehner und Einer getrennt zu addieren:</p>
          <p><strong>Beispiel: 49 + 36 = ?</strong></p>
          <ol>
            <li>Zehner getrennt addieren: 40 + 30 = 70.</li>
            <li>Einer getrennt addieren: 9 + 6 = 15.</li>
            <li>Beides zusammenzählen: 70 + 15 = 85.</li>
          </ol>
          <p><strong>Zweites Beispiel: 27 + 58 = ?</strong></p>
          <ol>
            <li>Zehner: 20 + 50 = 70.</li>
            <li>Einer: 7 + 8 = 15.</li>
            <li>Zusammen: 70 + 15 = 85.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Das ist der gleiche Trick, den wir gestern
          beim Subtrahieren schon in einer ähnlichen Form kennengelernt haben — Zehner und Einer
          getrennt betrachten macht große Rechnungen einfacher.</p>
        `,
        exercisesAdd: [
          [49,36],[27,58],[38,47],[56,29],[64,18],[35,29],[48,37],[26,49],[57,34],[63,28],
          [19,46],[28,53],[37,45],[46,38],[55,27],[68,19],[29,64],[47,36],[58,25],[34,58],
          [24,68],[39,27],[46,29],[58,36],[27,45]
        ],
        preview: "Morgen üben wir die Addition mit Zehnerübergang weiter, damit sie genauso sicher sitzt wie die Subtraktion.",
        bonus: {
          title: "✨ Einblick 3. Klasse (Bonus, freiwillig)",
          html: `<p>Gestern haben wir <strong>1/2</strong> und <strong>1/4</strong> kennengelernt.
          Heute vergleichen wir Brüche: Was ist größer — ein Halb oder ein Viertel?</p>
          <div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;margin:14px 0;">
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 50 95 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">1/2</p>
            </div>
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">1/4</p>
            </div>
          </div>
          <p>Man sieht: Das blaue Stück beim Halb ist größer als das blaue Stück beim Viertel.
          Je mehr Teile ein Ganzes hat, desto kleiner wird jedes einzelne Teil!</p>
          <p>Übung (freiwillig): Was ist größer, 1/2 oder 1/4?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: 1/2 ist größer als 1/4.</p>`
        }
      },
      day3: {
        parentNote: "Heute lernt dein Kadett den <strong>Ausgleichstrick</strong> — eine zweite, oft noch schnellere Methode für die Addition mit Zehnerübergang.",
        theoryTitle: "Addition mit dem Ausgleichstrick",
        theoryHtml: `
          <p>Wenn eine Zahl fast eine "runde" Zehnerzahl ist (endet auf 8 oder 9), lohnt sich dieser Trick:</p>
          <p><strong>Beispiel: 49 + 36 = ?</strong></p>
          <ol>
            <li>49 ist fast 50. Runde auf: 49 + 1 = 50.</li>
            <li>Rechne mit der runden Zahl: 50 + 36 = 86.</li>
            <li>Die 1, die du dazugegeben hast, wieder abziehen: 86 − 1 = 85.</li>
          </ol>
          <p><strong>Zweites Beispiel: 38 + 47 = ?</strong></p>
          <ol>
            <li>38 ist fast 40. Runde auf: 38 + 2 = 40.</li>
            <li>Rechne: 40 + 47 = 87.</li>
            <li>Die 2 wieder abziehen: 87 − 2 = 85.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Dein Kadett kennt jetzt zwei Methoden für die Addition mit
          Zehnerübergang: die stellenweise Addition von gestern und den Ausgleichstrick von heute. Er darf
          sich für jede Aufgabe die Methode aussuchen, die er schneller findet.</p>
        `,
        exercisesAdd: [
          [29,47],[38,26],[59,24],[48,35],[19,38],[68,15],[29,56],[39,48],[58,17],[47,29],
          [69,14],[28,37],[49,27],[38,45],[59,18],[28,56],[39,26],[48,29],[69,23],[19,47],
          [58,35],[29,38],[49,18],[68,27],[39,57]
        ],
        preview: "Morgen üben wir gemischt: mal Subtraktion, mal Addition — dein Kadett entscheidet jeweils selbst, welcher Trick passt.",
        bonus: {
          title: "✨ Einblick 3. Klasse (Bonus, freiwillig)",
          html: `<p>Nach 1/2 und 1/4 kommt heute <strong>1/3</strong> dazu — ein Ganzes in drei gleich
          große Teile geteilt.</p>
          <div style="text-align:center;margin:14px 0;">
            <svg width="110" height="110" viewBox="0 0 100 100">
              <path d="M50 50 L50 5 A45 45 0 0 1 89 65 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
              <path d="M50 50 L89 65 A45 45 0 0 1 11 65 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              <path d="M50 50 L11 65 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
            </svg>
            <p style="font-size:13px;">1/3</p>
          </div>
          <p>Übung (freiwillig): Wie viele Drittel ergeben zusammen ein Ganzes?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: 3 Drittel ergeben ein Ganzes.</p>`
        }
      },
      day4: {
        parentNote: "Heute übt dein Kadett <strong>gemischt</strong>: mal Subtraktion, mal Addition mit Zehnerübergang. Er darf sich jeweils selbst aussuchen, welchen Trick er nutzt.",
        theoryTitle: "Gemischte Übung: Subtraktion und Addition",
        theoryHtml: `
          <p>Dein Kadett kennt jetzt drei Tricks:</p>
          <ol>
            <li><strong>Ergänzungstrick</strong> für die Subtraktion (Tag 1)</li>
            <li><strong>Stellenweise Addition</strong> für die Addition (Tag 2)</li>
            <li><strong>Ausgleichstrick</strong> als Alternative für die Addition (Tag 3)</li>
          </ol>
          <p>Heute kommen Plus- und Minusaufgaben gemischt vor. Der erste Schritt ist immer:
          <strong>Erst schauen, ob ein Plus oder ein Minus dasteht</strong> — dann den passenden Trick anwenden.</p>
        `,
        exercisesMixed: [
          [74,38,"−"],[46,38,"+"],[91,56,"−"],[27,49,"+"],[62,27,"−"],[58,26,"+"],[83,49,"−"],[39,47,"+"],
          [71,34,"−"],[24,68,"+"],[95,58,"−"],[35,49,"+"],[52,36,"−"],[68,17,"+"],[81,45,"−"],[29,54,"+"],
          [63,28,"−"],[47,38,"+"],[90,52,"−"],[56,29,"+"],[84,57,"−"],[38,44,"+"],[73,46,"−"],[49,26,"+"],
          [61,45,"−"]
        ],
        preview: "Morgen wartet die große Freitags-Endboss-Challenge — eine Mischung aus allem, was diese Woche geübt wurde!",
        bonus: {
          title: "✨ Einblick 3. Klasse (Bonus, freiwillig)",
          html: `<p>Wusstest du, dass manche Brüche gleich groß sind, obwohl sie unterschiedlich
          aussehen? Man nennt das <strong>gleichwertige Brüche</strong>.</p>
          <div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;margin:14px 0;">
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 50 95 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">1/2</p>
            </div>
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">2/4</p>
            </div>
          </div>
          <p>1/2 und 2/4 sind gleich groß — beide sind genau die Hälfte vom Ganzen!</p>
          <p>Übung (freiwillig): Ist 2/4 größer, kleiner oder gleich groß wie 1/2?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Gleich groß.</p>`
        }
      },
      day5: {
        parentNote: "🎉 Freitag: Große Wiederholungsübung plus die Endboss-Challenge — der spannende Wochenabschluss!",
        theoryTitle: "Rückblick: Eine ganze Woche Rechentricks",
        theoryHtml: `
          <p>Diese Woche hat dein Kadett gelernt:</p>
          <ul>
            <li>Den <strong>Ergänzungstrick</strong> für die Subtraktion mit Zehnerübergang</li>
            <li>Die <strong>stellenweise Addition</strong> für die Addition mit Zehnerübergang</li>
            <li>Den <strong>Ausgleichstrick</strong> als zweite Additions-Methode</li>
            <li>Gemischtes Rechnen — selbst entscheiden, welcher Trick gerade passt</li>
          </ul>
          <p>Heute wird alles noch einmal geübt — und dann wartet die Endboss-Challenge!</p>
        `,
        exercisesMixed: [
          [82,47,"−"],[27,36,"+"],[94,58,"−"],[48,29,"+"],[71,26,"−"],[56,38,"+"],[63,39,"−"],[19,67,"+"],
          [85,48,"−"],[38,45,"+"],[92,57,"−"],[29,66,"+"],[74,29,"−"],[57,34,"+"],[61,28,"−"],[46,37,"+"],
          [83,56,"−"],[28,59,"+"],[90,64,"−"],[34,48,"+"],[75,48,"−"],[39,56,"+"],[62,35,"−"],[47,29,"+"],
          [81,37,"−"]
        ],
        preview: "Nächste Woche geht die Reise weiter zur Wetterstation-Insel!",
        bossChallenge: {
          title: "Der Wächter des Dschungeltempels — Endboss-Challenge",
          html: `
            <p>Tief im Dschungel steht ein alter Tempel. Ein steinerner Wächter versperrt die Tür zur
            Schatzkammer mit vier Zahlenschlössern. Nur wer alle vier Aufgaben löst, darf den Schatz
            der Dschungel-Insel sehen!</p>
            <table class="milestone-table">
              <tr><th>Schloss 1</th><td>68 − 39 = ?</td></tr>
              <tr><th>Schloss 2</th><td>47 + 36 = ?</td></tr>
              <tr><th>Schloss 3</th><td>91 − 56 = ?</td></tr>
              <tr><th>Schloss 4</th><td>58 + 27 = ?</td></tr>
            </table>
            <p>Schreibe die vier Ergebnisse der Reihe nach auf — das ist der Geheimcode, der den
            Tempel öffnet!</p>
            <button class="toggle-btn" style="background:#f59e0b;" onclick="this.nextElementSibling.classList.toggle('visible')">🔓 Geheimcode aufdecken</button>
            <div class="solutions">
              <p>Schloss 1: 29 · Schloss 2: 83 · Schloss 3: 35 · Schloss 4: 85</p>
              <p><strong>Geheimcode: 29 – 83 – 35 – 85</strong></p>
              <p>🎉 Der Tempel öffnet sich! Dein Kadett hat die erste Insel der Forscher-Akademie gemeistert
              und verdient sich ein extra großes Tierabzeichen für die Dschungel-Insel.</p>
            </div>
          `
        }
      }
    }
  },

  deutsch: {
    color: "var(--color-deutsch)",
    label: "Deutsch",
    days: {
      day1: {
        parentNote: "Neues Thema heute: <strong>Nomen (Namenwörter)</strong> erkennen. Nomen werden in der 2. Klasse mit zwei festen Proben geprüft — das üben wir heute.",
        theoryTitle: "Nomen erkennen",
        theoryHtml: `
          <p>Nomen sind Wörter für Personen, Tiere, Dinge oder Sachen. Man erkennt sie mit zwei Proben:</p>
          <p><strong>1. Die Artikel-Probe:</strong> Passt <em>der, die</em> oder <em>das</em> davor?
          Zum Beispiel: <em>der Tiger</em> ✓ — also ist "Tiger" ein Nomen.</p>
          <p><strong>2. Die Mehrzahl-Probe:</strong> Kann man das Wort in die Mehrzahl setzen?
          Zum Beispiel: <em>eine Blume → viele Blumen</em> ✓ — auch das zeigt: Nomen.</p>
          <p><strong>Wichtige Regel:</strong> Nomen schreibt man im Deutschen immer groß, egal wo sie im Satz stehen.</p>
        `,
        exercises: {
          teil1: {
            title: "Teil 1 — Artikel-Probe: Kreise alle Nomen ein",
            items: ["Hund", "laufen", "Baum", "schnell", "Sonne", "lachen", "Auto", "blau", "Blume", "springen"],
            solution: "Nomen: Hund, Baum, Sonne, Auto, Blume"
          },
          teil2: {
            title: "Teil 2 — Mehrzahl-Probe: Schreibe die Mehrzahl",
            items: ["Hund", "Baum", "Sonne", "Auto", "Blume", "Tiger"],
            solution: "Hunde · Bäume · Sonnen · Autos · Blumen · Tiger"
          },
          teil3: {
            title: "Teil 3 — Finde die Nomen und schreibe die Sätze richtig groß",
            items: [
              "der tiger schleicht durch den dschungel.",
              "die schlange versteckt sich hinter einem stein.",
              "ein affe klettert auf den baum.",
              "das kind sieht einen bunten vogel.",
              "am fluss sitzt ein frosch."
            ],
            solution: `
              Der Tiger schleicht durch den Dschungel. (Tiger, Dschungel)<br>
              Die Schlange versteckt sich hinter einem Stein. (Schlange, Stein)<br>
              Ein Affe klettert auf den Baum. (Affe, Baum)<br>
              Das Kind sieht einen bunten Vogel. (Kind, Vogel)<br>
              Am Fluss sitzt ein Frosch. (Fluss, Frosch)
            `
          }
        },
        preview: "Morgen schauen wir uns Verben an und lernen die Ich-Probe, um sie von Nomen zu unterscheiden."
      },
      day2: {
        parentNote: "Neues Thema heute: <strong>Verben (Tätigkeitswörter)</strong> erkennen — mit der Ich-Probe und der Veränder-Probe.",
        theoryTitle: "Verben erkennen",
        theoryHtml: `
          <p>Verben sind Wörter für Tätigkeiten — Dinge, die man tut. Man erkennt sie mit zwei Proben:</p>
          <p><strong>1. Die Ich-Probe:</strong> Passt "ich" davor? Zum Beispiel: <em>ich laufe</em> ✓ —
          also ist "laufen" ein Verb.</p>
          <p><strong>2. Die Veränder-Probe:</strong> Das Verb verändert sich, wenn man die Person wechselt:
          <em>ich laufe, du läufst, er läuft</em>.</p>
        `,
        exercises: {
          teil1: {
            title: "Teil 1 — Ich-Probe: Kreise alle Verben ein",
            items: ["laufen", "Hund", "springen", "blau", "lachen", "Baum", "tanzen", "Auto", "schwimmen", "Blume"],
            solution: "Verben: laufen, springen, lachen, tanzen, schwimmen"
          },
          teil2: {
            title: "Teil 2 — Veränder-Probe: Wie heißt es bei \"er/sie/es\"?",
            items: ["laufen (er ...)", "springen (er ...)", "lachen (er ...)", "schwimmen (er ...)"],
            solution: "er läuft · er springt · er lacht · er schwimmt"
          },
          teil3: {
            title: "Teil 3 — Finde das Verb im Satz",
            items: [
              "der affe klettert auf den baum.",
              "die schlange schleicht durch das gras.",
              "wir tanzen fröhlich im dschungel.",
              "mia lacht laut.",
              "der frosch springt ins wasser."
            ],
            solution: `
              Der Affe klettert auf den Baum. (Verb: klettert)<br>
              Die Schlange schleicht durch das Gras. (Verb: schleicht)<br>
              Wir tanzen fröhlich im Dschungel. (Verb: tanzen)<br>
              Mia lacht laut. (Verb: lacht)<br>
              Der Frosch springt ins Wasser. (Verb: springt)
            `
          }
        },
        preview: "Morgen schauen wir uns Adjektive an — Wörter, die beschreiben, wie etwas ist."
      },
      day3: {
        parentNote: "Neues Thema heute: <strong>Adjektive (Wiewörter)</strong> erkennen — mit der Wie-Probe.",
        theoryTitle: "Adjektive erkennen",
        theoryHtml: `
          <p>Adjektive beschreiben, wie etwas ist. Man erkennt sie mit der Wie-Probe:</p>
          <p><strong>Die Wie-Probe:</strong> "Wie ist das Tier?" → <em>Das Tier ist schnell.</em> ✓ —
          also ist "schnell" ein Adjektiv.</p>
          <p>Weitere Beispiele: groß, klein, bunt, laut, leise, schön.</p>
        `,
        exercises: {
          teil1: {
            title: "Teil 1 — Wie-Probe: Kreise alle Adjektive ein",
            items: ["schnell", "Affe", "groß", "springen", "bunt", "Baum", "laut", "Auto", "leise", "schwimmen"],
            solution: "Adjektive: schnell, groß, bunt, laut, leise"
          },
          teil2: {
            title: "Teil 2 — Wie ist das Tier? Finde ein passendes Adjektiv",
            items: ["Der Tiger ist ...", "Die Schlange ist ...", "Der Affe ist ...", "Der Elefant ist ..."],
            solution: "z. B. Der Tiger ist stark. Die Schlange ist lang. Der Affe ist flink. Der Elefant ist groß. (Eigene passende Adjektive zählen auch!)"
          },
          teil3: {
            title: "Teil 3 — Finde das Adjektiv im Satz",
            items: [
              "der schnelle affe klettert auf den baum.",
              "die grüne schlange versteckt sich im gras.",
              "ein lauter papagei sitzt auf dem ast.",
              "das kleine kind sieht einen bunten vogel.",
              "am fluss sitzt ein leiser frosch."
            ],
            solution: `
              Der schnelle Affe klettert auf den Baum. (Adjektiv: schnelle)<br>
              Die grüne Schlange versteckt sich im Gras. (Adjektiv: grüne)<br>
              Ein lauter Papagei sitzt auf dem Ast. (Adjektiv: lauter)<br>
              Das kleine Kind sieht einen bunten Vogel. (Adjektive: kleine, bunten)<br>
              Am Fluss sitzt ein leiser Frosch. (Adjektiv: leiser)
            `
          }
        },
        preview: "Morgen wiederholen wir Nomen, Verben und Adjektive gemischt, damit dein Kadett alle drei sicher unterscheiden kann."
      },
      day4: {
        parentNote: "Heute wiederholt dein Kadett <strong>Nomen, Verben und Adjektive gemischt</strong> — er entscheidet bei jedem Wort selbst, welche Wortart es ist.",
        theoryTitle: "Wortarten gemischt bestimmen",
        theoryHtml: `
          <p>Zur Erinnerung, alle drei Proben:</p>
          <ul>
            <li><strong>Nomen:</strong> Artikel-Probe (der/die/das) oder Mehrzahl-Probe</li>
            <li><strong>Verben:</strong> Ich-Probe ("ich ...") oder Veränder-Probe</li>
            <li><strong>Adjektive:</strong> Wie-Probe ("Wie ist es?")</li>
          </ul>
        `,
        exercises: {
          teil1: {
            title: "Teil 1 — Bestimme die Wortart: Nomen (N), Verb (V) oder Adjektiv (A)?",
            items: ["Krokodil", "schwimmt", "grün", "Papagei", "fliegt", "bunt", "klettert", "Ast", "laut", "Wasserfall"],
            solution: "Krokodil (N) · schwimmt (V) · grün (A) · Papagei (N) · fliegt (V) · bunt (A) · klettert (V) · Ast (N) · laut (A) · Wasserfall (N)"
          },
          teil2: {
            title: "Teil 2 — Finde je ein Nomen, ein Verb und ein Adjektiv im Satz",
            items: [
              "Der schnelle Affe springt auf den hohen Baum.",
              "Die grüne Schlange schleicht durch das dichte Gras."
            ],
            solution: `
              Satz 1 — Nomen: Affe, Baum · Verb: springt · Adjektive: schnelle, hohen<br>
              Satz 2 — Nomen: Schlange, Gras · Verb: schleicht · Adjektive: grüne, dichte
            `
          }
        },
        preview: "Morgen wartet die Freitags-Endboss-Challenge — auch mit einer Wortarten-Aufgabe!"
      },
      day5: {
        parentNote: "🎉 Freitag: Große Wortarten-Wiederholung zum Abschluss der ersten Woche — Nomen, Verben und Adjektive gemischt, mit neuen Beispielen.",
        theoryTitle: "Wortarten-Endboss",
        theoryHtml: `
          <p>Zur Erinnerung, alle drei Proben:</p>
          <ul>
            <li><strong>Nomen:</strong> Artikel-Probe oder Mehrzahl-Probe</li>
            <li><strong>Verben:</strong> Ich-Probe oder Veränder-Probe</li>
            <li><strong>Adjektive:</strong> Wie-Probe</li>
          </ul>
        `,
        exercises: {
          teil1: {
            title: "Teil 1 — Bestimme die Wortart: Nomen (N), Verb (V) oder Adjektiv (A)?",
            items: ["Faultier", "hängt", "langsam", "Leopard", "jagt", "kräftig", "schleicht", "Wasserfall", "glitzernd", "Insel"],
            solution: "Faultier (N) · hängt (V) · langsam (A) · Leopard (N) · jagt (V) · kräftig (A) · schleicht (V) · Wasserfall (N) · glitzernd (A) · Insel (N)"
          },
          teil2: {
            title: "Teil 2 — Finde je ein Nomen, ein Verb und ein Adjektiv im Satz",
            items: [
              "Das müde Faultier hängt im hohen Baum.",
              "Der starke Leopard trägt seine Beute auf den sicheren Ast."
            ],
            solution: `
              Satz 1 — Nomen: Faultier, Baum · Verb: hängt · Adjektive: müde, hohen<br>
              Satz 2 — Nomen: Leopard, Beute, Ast · Verb: trägt · Adjektive: starke, sicheren
            `
          }
        },
        preview: "Nächste Woche lernen wir neue Wortarten auf der Wetterstation-Insel kennen."
      }
    }
  },

  lesen: {
    color: "var(--color-lesen)",
    label: "Lesen",
    days: {
      day1: {
        parentNote: "Leseübung auf 2.-Klasse-Niveau, ca. 15 Minuten: Text vorlesen lassen (laut, in eigenem Tempo), dann die Verständnisfragen gemeinsam beantworten und die kurze Schreibaufgabe erledigen.",
        theoryTitle: "Der mutige Tiger",
        theoryHtml: `
          <p>Im dichten Dschungel lebte ein junger Tiger namens Rufus. Rufus hatte ein besonderes
          Streifenmuster: Auf seinem Rücken sah man ein kleines Herz aus Streifen. Die anderen Tiere
          im Dschungel nannten ihn deshalb "Herz-Tiger".</p>
          <p>Eines Morgens hörte Rufus ein lautes Piepen. Er folgte dem Geräusch bis zu einem tiefen
          Loch im Boden. Dort saß ein kleiner Papagei fest. Der Papagei hieß Coco und konnte nicht
          mehr herausfliegen, weil sein Flügel wehtat.</p>
          <p>Rufus überlegte kurz. Dann legte er sich flach auf den Bauch und streckte seine Pfote in
          das Loch. "Halt dich an meiner Pfote fest!", rief er Coco zu. Der kleine Papagei krallte
          sich mit seinen Füßen an Rufus' Pfote fest. Ganz langsam zog Rufus ihn nach oben.</p>
          <p>Endlich war Coco gerettet! Er saß sicher auf einem Ast und bedankte sich laut. "Danke,
          Rufus! Du bist der mutigste Tiger im ganzen Dschungel!"</p>
          <p>Rufus lächelte. Er war stolz, dass er Coco helfen konnte. Von diesem Tag an waren Rufus
          und Coco die besten Freunde. Sie trafen sich jeden Morgen am großen Wasserfall und erzählten
          sich Geschichten.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Wie heißt der Tiger in der Geschichte? <span class="star">⭐</span></li>
            <li>Was ist das Besondere an Rufus' Streifenmuster? <span class="star">⭐</span></li>
            <li>Wer saß in dem Loch fest? <span class="star">⭐</span></li>
            <li>Warum konnte Coco nicht herausfliegen? <span class="star">⭐</span></li>
            <li>Wie hat Rufus Coco gerettet? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Was könnten Rufus und Coco als Nächstes gemeinsam erleben?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Rufus · 2. Ein kleines Herz aus Streifen · 3. Der Papagei Coco · 4. Weil sein Flügel
          wehtat · 5. Er streckte seine Pfote ins Loch und zog Coco vorsichtig hoch</p>
          <p><strong>Schreibübung:</strong> Keine feste Lösung — jede sinnvolle, selbst ausgedachte
          kleine Geschichte zählt. Beispiel: "Rufus und Coco entdecken eine geheime Höhle. Dort finden
          sie eine Schatzkiste. Sie teilen den Schatz mit allen Tieren im Dschungel."</p>
        `,
        preview: "Morgen liest dein Kadett eine neue Geschichte über die kluge Schlange Kiara.",
        bonus: {
          title: "✨ Vorschau: So liest man in der 3. Klasse (Bonus, freiwillig)",
          html: `<p style="font-style:italic;">Tief im Regenwald, wo die Bäume so hoch waren, dass man
          ihre Wipfel kaum erkennen konnte, lebte eine Gemeinschaft von Tieren, die einander in
          schwierigen Situationen stets zur Seite standen. Besonders bemerkenswert war die Freundschaft
          zwischen dem Tiger Rufus und dem Papagei Coco, die trotz ihrer unterschiedlichen Lebensweisen
          — der eine bewegte sich geschickt am Boden, der andere hoch in den Lüften — eine tiefe
          Verbundenheit entwickelt hatten.</p>
          <p>Frage (freiwillig): Worin unterschieden sich Rufus und Coco in ihrer Lebensweise?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Rufus bewegte sich am Boden, Coco hoch in den Lüften.</p>`
        }
      },
      day2: {
        parentNote: "Leseübung auf 2.-Klasse-Niveau, ca. 15 Minuten: Text vorlesen lassen, dann Verständnisfragen und Schreibaufgabe gemeinsam bearbeiten.",
        theoryTitle: "Kiara, die kluge Schlange",
        theoryHtml: `
          <p>Kiara war eine grüne Schlange, die im hohen Gras der Dschungel-Insel lebte. Anders als
          viele andere Schlangen war Kiara nicht gefährlich — sie ernährte sich nur von kleinen
          Insekten und mochte es, den anderen Tieren zuzuhören.</p>
          <p>Eines Tages hörte Kiara ein Streitgespräch. Der Affe Momo und der Frosch Felix stritten
          sich um den schönsten Platz am Fluss. "Ich war zuerst hier!", rief Momo. "Nein, ich!", rief
          Felix zurück.</p>
          <p>Kiara schlängelte sich näher heran. "Warum teilt ihr euch den Platz nicht einfach?",
          schlug sie vor. "Morgens kann Momo dort sitzen, und nachmittags ist Felix an der Reihe."</p>
          <p>Momo und Felix schauten sich an. Das war eine gute Idee! Sie bedankten sich bei Kiara und
          vertrugen sich wieder. Von diesem Tag an fragten die Tiere im Dschungel oft die kluge
          Schlange Kiara um Rat, wenn sie sich stritten.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Welche Farbe hat die Schlange Kiara? <span class="star">⭐</span></li>
            <li>Wovon ernährt sich Kiara? <span class="star">⭐</span></li>
            <li>Worüber haben sich Momo und Felix gestritten? <span class="star">⭐</span></li>
            <li>Welchen Vorschlag hat Kiara gemacht? <span class="star">⭐</span></li>
            <li>Was passiert seitdem, wenn sich die Tiere streiten? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Wie würdest du einen Streit zwischen zwei Freunden schlichten?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Grün · 2. Von kleinen Insekten · 3. Um den schönsten Platz am Fluss · 4. Sich den Platz
          zu teilen (morgens Momo, nachmittags Felix) · 5. Die Tiere fragen Kiara um Rat</p>
          <p><strong>Schreibübung:</strong> Keine feste Lösung — jede durchdachte eigene Idee zählt.</p>
        `,
        preview: "Morgen liest dein Kadett eine Geschichte über das schlaue Krokodil Karl.",
        bonus: {
          title: "✨ Vorschau: So liest man in der 3. Klasse (Bonus, freiwillig)",
          html: `<p style="font-style:italic;">Konflikte zwischen Freunden entstehen häufig dann, wenn
          beide Seiten der Überzeugung sind, im Recht zu sein, ohne die Perspektive des anderen
          ausreichend zu berücksichtigen. Im Dschungel, in dem Momo und Felix lebten, zeigte sich
          jedoch, dass ein durchdachter Kompromiss — wie ihn die kluge Schlange Kiara vorschlug —
          oftmals wesentlich wirkungsvoller ist als ein andauernder Streit. Diese Fähigkeit, gemeinsam
          eine Lösung zu finden, bezeichnet man auch als Konfliktfähigkeit.</p>
          <p>Frage (freiwillig): Wie nennt man die Fähigkeit, gemeinsam eine Lösung zu finden?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Konfliktfähigkeit.</p>`
        }
      },
      day3: {
        parentNote: "Leseübung auf 2.-Klasse-Niveau, ca. 15 Minuten: Text vorlesen lassen, dann Verständnisfragen und Schreibaufgabe gemeinsam bearbeiten.",
        theoryTitle: "Das schlaue Krokodil",
        theoryHtml: `
          <p>Am Flussufer der Dschungel-Insel lebte ein altes Krokodil namens Karl. Karl lag den
          ganzen Tag reglos im Wasser und sah aus wie ein Ast. Viele Tiere hatten Angst vor ihm, weil
          Krokodile kräftige Zähne haben.</p>
          <p>Eines Tages wollte der kleine Frosch Felix über den Fluss springen, aber die Strömung war
          zu stark. "Oh nein, wie komme ich nur ans andere Ufer?", rief Felix verzweifelt.</p>
          <p>Karl, das Krokodil, hob langsam seinen Kopf aus dem Wasser. "Ich kann dir helfen", sagte
          er ruhig. "Spring auf meinen Rücken, ich bringe dich sicher hinüber."</p>
          <p>Felix zögerte zuerst, aber Karl wirkte freundlich. Also sprang er auf den breiten Rücken
          des Krokodils. Karl schwamm langsam und vorsichtig ans andere Ufer. Felix kam sicher an und
          sprang erleichtert von Karls Rücken.</p>
          <p>"Danke, Karl! Ich hatte Angst vor dir, aber du bist gar nicht gefährlich!", sagte Felix.
          Karl lächelte. "Nicht jedes Tier, das gefährlich aussieht, ist auch böse", antwortete er weise.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Wie heißt das Krokodil in der Geschichte? <span class="star">⭐</span></li>
            <li>Warum haben viele Tiere Angst vor Karl? <span class="star">⭐</span></li>
            <li>Welches Problem hatte der Frosch Felix? <span class="star">⭐</span></li>
            <li>Wie hat Karl Felix geholfen? <span class="star">⭐</span></li>
            <li>Was hat Felix am Ende über Karl gelernt? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Warum sollte man nicht vorschnell über andere urteilen?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Karl · 2. Weil Krokodile kräftige Zähne haben · 3. Er wollte über den Fluss, aber die
          Strömung war zu stark · 4. Er trug Felix sicher auf seinem Rücken ans andere Ufer · 5. Dass
          nicht jedes gefährlich aussehende Tier auch böse ist</p>
          <p><strong>Schreibübung:</strong> Keine feste Lösung — jede durchdachte eigene Idee zählt.</p>
        `,
        preview: "Morgen liest dein Kadett eine spannende Geschichte über einen Sturm im Dschungel.",
        bonus: {
          title: "✨ Vorschau: So liest man in der 3. Klasse (Bonus, freiwillig)",
          html: `<p style="font-style:italic;">Vorurteile entstehen häufig durch das äußere
          Erscheinungsbild eines Lebewesens, ohne dass sein tatsächliches Verhalten berücksichtigt
          wird. Das Krokodil Karl, dessen kräftige Zähne bei vielen Tieren Furcht auslösten, erwies
          sich als hilfsbereiter und weiser Freund, sobald man ihn näher kennenlernte. Diese Geschichte
          verdeutlicht, dass es sich lohnt, genauer hinzuschauen, bevor man sich ein Urteil über
          jemanden bildet.</p>
          <p>Frage (freiwillig): Wodurch entstehen laut dem Text Vorurteile?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Durch das äußere Erscheinungsbild, ohne das tatsächliche Verhalten zu berücksichtigen.</p>`
        }
      },
      day4: {
        parentNote: "Leseübung auf 2.-Klasse-Niveau, ca. 15 Minuten: Text vorlesen lassen, dann Verständnisfragen und Schreibaufgabe gemeinsam bearbeiten.",
        theoryTitle: "Der Sturm im Dschungel",
        theoryHtml: `
          <p>Eines Nachmittags zog ein starker Sturm über die Dschungel-Insel. Der Wind riss Äste von
          den Bäumen, und Cocos Nest fiel aus seinem Baum herunter. Der kleine Papagei war verzweifelt:
          "Wo soll ich jetzt nur schlafen?"</p>
          <p>Rufus der Tiger hörte Cocos Rufe und trommelte sofort seine Freunde zusammen: Momo den
          Affen, Kiara die Schlange und Karl das Krokodil. "Wir bauen Coco gemeinsam ein neues Nest!",
          schlug Rufus vor.</p>
          <p>Momo sammelte starke Äste, Kiara flocht sie geschickt mit Gras zusammen, und Karl trug
          die schwersten Zweige mit seinem starken Schwanz heran. Rufus passte auf, dass alles sicher
          befestigt war.</p>
          <p>Nach einer Stunde war das neue Nest fertig — sogar stabiler als das alte! Coco war überglücklich.
          "Danke, dass ihr alle geholfen habt! Allein hätte ich das niemals so schnell geschafft."</p>
          <p>Rufus lächelte. "Dafür sind Freunde da. Gemeinsam schaffen wir alles."</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Was ist während des Sturms mit Cocos Nest passiert? <span class="star">⭐</span></li>
            <li>Wen hat Rufus zusammengetrommelt? <span class="star">⭐</span></li>
            <li>Was hat Momo zum Nestbau beigetragen? <span class="star">⭐</span></li>
            <li>Was hat Karl beigetragen? <span class="star">⭐</span></li>
            <li>Wie fühlte sich Coco am Ende der Geschichte? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Welches Tier aus der Geschichte hättest du am liebsten beim Bauen geholfen und warum?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Es ist aus dem Baum gefallen · 2. Momo, Kiara und Karl · 3. Er hat starke Äste
          gesammelt · 4. Er hat die schwersten Zweige mit seinem Schwanz herangetragen · 5. Überglücklich</p>
          <p><strong>Schreibübung:</strong> Keine feste Lösung — jede durchdachte eigene Idee zählt.</p>
        `,
        preview: "Morgen, am Freitag, gibt es die große Endboss-Challenge mit allem, was diese Woche gelernt wurde!",
        bonus: {
          title: "✨ Vorschau: So liest man in der 3. Klasse (Bonus, freiwillig)",
          html: `<p style="font-style:italic;">Naturereignisse wie Stürme stellen Lebensgemeinschaften
          häufig vor besondere Herausforderungen, zeigen jedoch zugleich, wie wirkungsvoll
          Zusammenarbeit sein kann. Als Cocos Nest durch den Sturm zerstört wurde, gelang es der
          Gemeinschaft der Tiere durch die Kombination ihrer unterschiedlichen Fähigkeiten — Kraft,
          Geschicklichkeit und Umsicht —, in kurzer Zeit ein noch stabileres Nest zu errichten, als es
          zuvor bestanden hatte.</p>
          <p>Frage (freiwillig): Welche drei Fähigkeiten werden im Text genannt?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Kraft, Geschicklichkeit und Umsicht.</p>`
        }
      },
      day5: {
        parentNote: "Leseübung auf 2.-Klasse-Niveau, ca. 15 Minuten — die letzte Geschichte dieser Woche, mit allen Freunden zusammen.",
        theoryTitle: "Der Schatz der Dschungel-Insel",
        theoryHtml: `
          <p>Am letzten Tag der Woche versammelten sich alle Freunde am großen Wasserfall: Rufus der
          Tiger, Momo der Affe, Kiara die Schlange, Karl das Krokodil und Coco der Papagei.</p>
          <p>"Ich habe eine alte Schriftrolle gefunden", verkündete Coco aufgeregt. Darauf stand eine
          Schatzkarte, die zu einer geheimen Höhle hinter dem Wasserfall führte.</p>
          <p>Gemeinsam folgten sie der Karte. Rufus schob einen schweren Stein zur Seite, Karl half,
          durch den Fluss zu schwimmen, Momo kletterte durch einen schmalen Spalt, und Kiara
          schlängelte sich durch die letzte enge Stelle.</p>
          <p>In der Höhle fanden sie keinen Goldschatz — sondern eine Wand voller funkelnder
          Kristalle, die im Licht schimmerten wie Sterne. "Der wahre Schatz ist, dass wir das
          gemeinsam entdeckt haben", sagte Rufus lächelnd. Alle waren sich einig: Das war der schönste
          Schatz, den man sich vorstellen konnte.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Wer hat die Schriftrolle gefunden? <span class="star">⭐</span></li>
            <li>Wohin führte die Schatzkarte? <span class="star">⭐</span></li>
            <li>Wie hat jedes Tier beim Weg in die Höhle geholfen? <span class="star">⭐</span></li>
            <li>Was fanden die Freunde in der Höhle? <span class="star">⭐</span></li>
            <li>Was war laut Rufus der wahre Schatz? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 3–4 eigene Sätze: Was war dein Lieblingsmoment aus den Geschichten dieser Woche und warum?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Coco der Papagei · 2. Zu einer geheimen Höhle hinter dem Wasserfall · 3. Rufus schob
          einen Stein, Karl half beim Schwimmen, Momo kletterte durch einen Spalt, Kiara schlängelte
          sich durch eine enge Stelle · 4. Eine Wand voller funkelnder Kristalle · 5. Dass sie es
          gemeinsam entdeckt haben</p>
          <p><strong>Schreibübung:</strong> Keine feste Lösung — jede persönliche Erinnerung an die Woche zählt.</p>
        `,
        preview: "Nächste Woche beginnt ein neues Abenteuer auf der Wetterstation-Insel!",
        bonus: {
          title: "✨ Vorschau: So liest man in der 3. Klasse (Bonus, freiwillig)",
          html: `<p style="font-style:italic;">Am Ende ihrer gemeinsamen Erkundung stellten die Tiere
          fest, dass der eigentliche Wert ihres Abenteuers nicht in einem materiellen Fund bestand,
          sondern in der Erfahrung, die sie durch die Kombination ihrer unterschiedlichen Fähigkeiten
          gemeinsam gemacht hatten. Diese Erkenntnis — dass Zusammenhalt wertvoller ist als jeder
          Schatz — begleitete sie noch lange nach diesem besonderen Tag.</p>
          <p>Frage (freiwillig): Was war laut dem Text wertvoller als jeder Schatz?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: Der Zusammenhalt der Freunde.</p>`
        }
      }
    }
  },

  englisch: {
    color: "var(--color-englisch)",
    label: "Englisch",
    days: {
      day1: {
        parentNote: "Heutiges Englisch-Kapitel: <strong>„Hello! All about me“</strong> — ca. 45–60 Minuten Inhalt, passend zum Dschungel-Thema.",
        theoryTitle: "Wortschatz & Satzmuster",
        theoryHtml: `
          <p><strong>Neue Wörter:</strong></p>
          <table class="match-table">
            <tr><td>hello</td><td>hallo</td></tr>
            <tr><td>my name is …</td><td>ich heiße …</td></tr>
            <tr><td>I am … years old</td><td>ich bin … Jahre alt</td></tr>
            <tr><td>I have</td><td>ich habe</td></tr>
            <tr><td>I like</td><td>ich mag</td></tr>
            <tr><td>lion / monkey / elephant / snake / frog</td><td>Löwe / Affe / Elefant / Schlange / Frosch</td></tr>
          </table>
          <p><strong>Satzmuster zum Üben:</strong><br>
          "I am Mika." · "I am 7 years old." · "I have a snake." · "I like monkeys."</p>
        `,
        roleplay: {
          title: "🎭 Rollenspiel-Dialog",
          html: `
            <p><strong>A:</strong> Hello! My name is Mika. What is your name?<br>
            <strong>B:</strong> Hello! My name is Tilly.<br>
            <strong>A:</strong> How old are you?<br>
            <strong>B:</strong> I am 100 years old! And you?<br>
            <strong>A:</strong> I am 7 years old. I have a pet snake. I like monkeys!<br>
            <strong>B:</strong> I like frogs!</p>
            <p style="font-size:13px;color:#6b7280;">Spielt den Dialog zusammen — ein Elternteil oder
            Das Geschwisterkind kann die Rolle von "B" übernehmen.</p>
          `
        },
        song: {
          title: "🎵 Lied",
          html: `<p>Hello, hello, what is your name?<br>
          Hello, hello, let's play a game!<br>
          I am happy, I am fine,<br>
          Come and join the jungle line!</p>
          <p style="font-size:13px;color:#6b7280;">Keine feste Melodie nötig — einfach rhythmisch
          sprechen oder frei singen.</p>`
        },
        puzzle: {
          title: "🔍 Suchbild: Verbinde das englische Wort mit dem passenden Tier",
          pairs: [["lion","🦁"],["monkey","🐒"],["elephant","🐘"],["snake","🐍"],["frog","🐸"]],
          solution: "lion🦁 · monkey🐒 · elephant🐘 · snake🐍 · frog🐸"
        },
        preview: "Morgen bauen wir auf 'I have' und 'I like' auf und lernen Farbwörter dazu."
      },
      day2: {
        parentNote: "Heute geht es weiter mit <strong>Farbwörtern</strong> — aufbauend auf 'I have' und 'I like' von gestern.",
        theoryTitle: "Colors",
        theoryHtml: `
          <p><strong>Neue Wörter:</strong></p>
          <table class="match-table">
            <tr><td>red / blue / green / yellow</td><td>rot / blau / grün / gelb</td></tr>
            <tr><td>brown / black / white</td><td>braun / schwarz / weiß</td></tr>
            <tr><td>What color is it?</td><td>Welche Farbe hat es?</td></tr>
            <tr><td>It is …</td><td>Es ist …</td></tr>
          </table>
          <p><strong>Satzmuster zum Üben:</strong><br>
          "The lion is yellow." · "The frog is green." · "I like blue."</p>
        `,
        roleplay: {
          title: "🎭 Rollenspiel-Dialog",
          html: `
            <p><strong>A:</strong> What color do you like?<br>
            <strong>B:</strong> I like blue. What color is the frog?<br>
            <strong>A:</strong> The frog is green! What color is the lion?<br>
            <strong>B:</strong> The lion is yellow!</p>
          `
        },
        song: {
          title: "🎵 Lied",
          html: `<p>Red and yellow, blue and green,<br>
          Look at all the colors that I've seen!<br>
          Brown like Momo, green like the tree,<br>
          What color, what color do you see?</p>`
        },
        puzzle: {
          title: "🔍 Suchbild: Verbinde das Farbwort mit der passenden Farbe",
          pairs: [["red","🔴"],["green","🟢"],["yellow","🟡"],["brown","🟤"],["blue","🔵"]],
          solution: "red🔴 · green🟢 · yellow🟡 · brown🟤 · blue🔵"
        },
        preview: "Morgen lernen wir Zahlen und Familienwörter auf Englisch."
      },
      day3: {
        parentNote: "Heutiges Thema: <strong>Zahlen 1-10 und Familienwörter</strong> — aufbauend auf den Farben von gestern.",
        theoryTitle: "Numbers & Family",
        theoryHtml: `
          <p><strong>Neue Wörter:</strong></p>
          <table class="match-table">
            <tr><td>one, two, three, four, five</td><td>eins, zwei, drei, vier, fünf</td></tr>
            <tr><td>six, seven, eight, nine, ten</td><td>sechs, sieben, acht, neun, zehn</td></tr>
            <tr><td>mother / father</td><td>Mutter / Vater</td></tr>
            <tr><td>sister / brother</td><td>Schwester / Bruder</td></tr>
            <tr><td>family</td><td>Familie</td></tr>
          </table>
          <p><strong>Satzmuster zum Üben:</strong><br>
          "I have one brother." · "I have two sisters." · "This is my mother."</p>
        `,
        roleplay: {
          title: "🎭 Rollenspiel-Dialog",
          html: `
            <p><strong>A:</strong> How many sisters do you have?<br>
            <strong>B:</strong> I have one sister. How many brothers do you have?<br>
            <strong>A:</strong> I have two brothers! This is my family.<br>
            <strong>B:</strong> Nice to meet your family!</p>
          `
        },
        song: {
          title: "🎵 Lied",
          html: `<p>One, two, three, this is my family,<br>
          Four, five, six, we like to mix,<br>
          Seven, eight, nine, all in a line,<br>
          Ten! My family is just fine!</p>`
        },
        puzzle: {
          title: "🔍 Suchbild: Verbinde die Zahl mit der richtigen Anzahl",
          pairs: [["one","👧"],["two","👦👦"],["three","🧑🧑🧑"],["four","👩👩👩👩"],["five","🧑🧑🧑🧑🧑"]],
          solution: "one👧 · two👦👦 · three🧑🧑🧑 · four👩👩👩👩 · five🧑🧑🧑🧑🧑"
        },
        preview: "Morgen üben wir Zahlen und Farben gemischt in kleinen Sätzen."
      },
      day4: {
        parentNote: "Heute verbindet dein Kadett Zahlen und Farben aus den letzten Tagen zu kleinen, vollständigen Sätzen.",
        theoryTitle: "Numbers & Colors together",
        theoryHtml: `
          <p>Wir verbinden, was wir schon können:</p>
          <p><strong>Satzmuster:</strong><br>
          "I have three green frogs." · "I see two yellow snakes." · "I like one brown monkey."</p>
          <table class="match-table">
            <tr><td>I have …</td><td>Ich habe …</td></tr>
            <tr><td>I see …</td><td>Ich sehe …</td></tr>
          </table>
        `,
        roleplay: {
          title: "🎭 Rollenspiel-Dialog",
          html: `
            <p><strong>A:</strong> How many frogs do you have?<br>
            <strong>B:</strong> I have three green frogs! How many snakes do you see?<br>
            <strong>A:</strong> I see two yellow snakes!</p>
          `
        },
        puzzle: {
          title: "🔍 Suchbild: Verbinde die Sätze mit dem passenden Bild",
          pairs: [["three green frogs","🐸🐸🐸"],["two yellow snakes","🐍🐍"],["one brown monkey","🐒"],["four red birds","🐦🐦🐦🐦"]],
          solution: "three green frogs🐸🐸🐸 · two yellow snakes🐍🐍 · one brown monkey🐒 · four red birds🐦🐦🐦🐦"
        },
        preview: "Morgen gibt es die große Endboss-Challenge — auch auf Englisch wird es spannend!"
      },
      day5: {
        parentNote: "🎉 Freitag: Alles aus dieser Woche gemischt — Farben, Zahlen, Familie in einem großen Abschluss-Song.",
        theoryTitle: "Week 1 Review",
        theoryHtml: `
          <p>Diese Woche hat dein Kadett gelernt: hello & my name is, Farben, Zahlen 1-10, Familienwörter.
          Heute kommt alles in einem großen Lied zusammen.</p>
        `,
        song: {
          title: "🎵 Abschluss-Lied: My Jungle Week",
          html: `<p>Hello, hello, I am Mika,<br>
          Red and blue and green, you know!<br>
          One, two, three, my family and me,<br>
          Big and small, we like them all!</p>`
        },
        puzzle: {
          title: "🔍 Suchbild: Verbinde das englische Wort mit dem passenden Bild",
          pairs: [["red","🔴"],["three","🐒🐒🐒"],["big","🐘"],["brother","👦"],["small","🐜"]],
          solution: "red🔴 · three🐒🐒🐒 · big🐘 · brother👦 · small🐜"
        },
        preview: "Nächste Woche lernen wir neue englische Wörter zum Thema Wetter."
      }
    }
  },

  sachunterricht: {
    color: "var(--color-sachunterricht)",
    label: "Sachunterricht",
    days: {
      day1: {
        parentNote: "Heute führen wir die <strong>Steckbrief-Struktur</strong> ein, die ab jetzt bei jedem neuen Tier wiederkehrt.",
        theoryTitle: "Der Tier-Steckbrief: Der Tiger",
        theoryHtml: `
          <p>Ein Steckbrief beschreibt ein Tier immer nach demselben Muster — das macht es leicht,
          Tiere zu vergleichen:</p>
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Dschungel und Wälder in Asien</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser (Raubtier): jagt Hirsche und Wildschweine</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Jeder Tiger hat ein einzigartiges Streifenmuster — wie ein Fingerabdruck</td></tr>
            <tr><th>Fortpflanzung</th><td>2–4 Jungtiere, blind geboren, bleiben ca. 2 Jahre bei der Mutter</td></tr>
          </table>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Elefanten",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Savannen und Wälder in Afrika und Asien · Pflanzenfresser: frisst Gräser,
          Blätter und Früchte · Wildtier · Größtes Landtier der Welt, greift mit dem Rüssel · Babys
          wiegen schon ca. 100 kg und bleiben viele Jahre bei der Mutter</em></p>
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>____________________</td></tr>
            <tr><th>Nahrung</th><td>____________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>____________________</td></tr>
            <tr><th>Besonderheit</th><td>____________________</td></tr>
            <tr><th>Fortpflanzung</th><td>____________________</td></tr>
          </table>
        `,
        solutionHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Savannen und Wälder in Afrika und Asien</td></tr>
            <tr><th>Nahrung</th><td>Pflanzenfresser: frisst Gräser, Blätter und Früchte</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Größtes Landtier der Welt, greift mit dem Rüssel</td></tr>
            <tr><th>Fortpflanzung</th><td>Babys wiegen schon ca. 100 kg und bleiben viele Jahre bei der Mutter</td></tr>
          </table>
        `,
        preview: "Morgen lernen wir ein weiteres Dschungeltier kennen und füllen den Steckbrief diesmal ganz allein aus."
      },
      day2: {
        parentNote: "Heute lernen wir ein zweites Dschungeltier kennen — dein Kadett füllt den Steckbrief diesmal möglichst allein aus.",
        theoryTitle: "Der Tier-Steckbrief: Der Affe",
        theoryHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Regenwälder und Dschungel weltweit</td></tr>
            <tr><th>Nahrung</th><td>Allesfresser: Früchte, Blätter, manchmal auch Insekten</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Kann mit Händen und Füßen gleichzeitig greifen — ein sehr geschickter Kletterer</td></tr>
            <tr><th>Fortpflanzung</th><td>Meist ein Junges, das sich lange am Bauch der Mutter festhält</td></tr>
          </table>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für die Schlange",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Wälder, Wüsten und Wiesen weltweit · Fleischfresser: verschluckt kleine
          Tiere im Ganzen · Wildtier · Hat keine Beine, bewegt sich wellenförmig, manche Arten sind giftig ·
          Die meisten Arten legen Eier</em></p>
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>____________________</td></tr>
            <tr><th>Nahrung</th><td>____________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>____________________</td></tr>
            <tr><th>Besonderheit</th><td>____________________</td></tr>
            <tr><th>Fortpflanzung</th><td>____________________</td></tr>
          </table>
        `,
        solutionHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Wälder, Wüsten und Wiesen weltweit</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser: verschluckt kleine Tiere im Ganzen</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Hat keine Beine, bewegt sich wellenförmig, manche Arten sind giftig</td></tr>
            <tr><th>Fortpflanzung</th><td>Die meisten Arten legen Eier</td></tr>
          </table>
        `,
        preview: "Morgen geht es mit einem neuen Dschungelbewohner weiter."
      },
      day3: {
        parentNote: "Ein drittes Dschungeltier — dein Kadett füllt den Steckbrief jetzt schon recht selbstständig aus.",
        theoryTitle: "Der Tier-Steckbrief: Das Krokodil",
        theoryHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Flüsse und Seen in tropischen Regionen</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser: lauert im Wasser auf Beute</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Kann bis zu einer Stunde die Luft anhalten und unter Wasser bleiben</td></tr>
            <tr><th>Fortpflanzung</th><td>Legt Eier in einem Nest aus Pflanzen am Ufer</td></tr>
          </table>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Papagei",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Tropische Regenwälder weltweit · Frisst Früchte, Samen und Nüsse ·
          Wildtier (manche Arten auch als Haustier gehalten) · Kann Wörter und Geräusche nachahmen ·
          Legt Eier in Baumhöhlen</em></p>
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>____________________</td></tr>
            <tr><th>Nahrung</th><td>____________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>____________________</td></tr>
            <tr><th>Besonderheit</th><td>____________________</td></tr>
            <tr><th>Fortpflanzung</th><td>____________________</td></tr>
          </table>
        `,
        solutionHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Tropische Regenwälder weltweit</td></tr>
            <tr><th>Nahrung</th><td>Frisst Früchte, Samen und Nüsse</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier (manche Arten auch als Haustier gehalten)</td></tr>
            <tr><th>Besonderheit</th><td>Kann Wörter und Geräusche nachahmen</td></tr>
            <tr><th>Fortpflanzung</th><td>Legt Eier in Baumhöhlen</td></tr>
          </table>
        `,
        preview: "Morgen lernen wir ein besonders gemütliches Dschungeltier kennen."
      },
      day4: {
        parentNote: "Ein viertes Dschungeltier — ganz anders als die bisherigen: langsam statt schnell.",
        theoryTitle: "Der Tier-Steckbrief: Das Faultier",
        theoryHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Regenwälder in Mittel- und Südamerika</td></tr>
            <tr><th>Nahrung</th><td>Pflanzenfresser: frisst hauptsächlich Blätter</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Bewegt sich extrem langsam und hängt die meiste Zeit kopfüber in Bäumen</td></tr>
            <tr><th>Fortpflanzung</th><td>Meist ein Junges, das sich am Bauch der Mutter festhält</td></tr>
          </table>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Leoparden",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Savannen und Wälder in Afrika und Asien · Fleischfresser: jagt vor allem
          nachts · Wildtier · Kann sein Fleisch-Beute auf Bäume tragen, um sie vor anderen Räubern zu
          schützen · 2–3 Junge, die gut versteckt aufwachsen</em></p>
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>____________________</td></tr>
            <tr><th>Nahrung</th><td>____________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>____________________</td></tr>
            <tr><th>Besonderheit</th><td>____________________</td></tr>
            <tr><th>Fortpflanzung</th><td>____________________</td></tr>
          </table>
        `,
        solutionHtml: `
          <table class="milestone-table">
            <tr><th>Lebensraum</th><td>Savannen und Wälder in Afrika und Asien</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser: jagt vor allem nachts</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Kann seine Beute auf Bäume tragen, um sie vor anderen Räubern zu schützen</td></tr>
            <tr><th>Fortpflanzung</th><td>2–3 Junge, die gut versteckt aufwachsen</td></tr>
          </table>
        `,
        preview: "Morgen ist die große Wiederholung aller sechs Dschungeltiere beim Endboss-Freitag!"
      },
      day5: {
        parentNote: "🎉 Freitag: Ein 'Wer bin ich?'-Rätsel-Quiz über alle Tiere dieser Woche — ganz ohne neuen Steckbrief, nur zur Wiederholung.",
        theoryTitle: "Wer bin ich? Das große Dschungeltier-Quiz",
        theoryHtml: `
          <p>Diese Woche hat dein Kadett acht Dschungeltiere kennengelernt: Tiger, Elefant, Affe, Schlange,
          Krokodil, Papagei, Faultier und Leopard. Löse die Rätsel und finde heraus, welches Tier gemeint ist!</p>
        `,
        exerciseHtml: `
          <ol class="exercise-list">
            <li>Ich habe ein einzigartiges Streifenmuster wie ein Fingerabdruck. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich bin das größte Landtier der Welt und greife mit meinem Rüssel. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich kann mit Händen und Füßen gleichzeitig greifen und klettere sehr geschickt. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich habe keine Beine und bewege mich wellenförmig. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich kann bis zu einer Stunde die Luft anhalten und unter Wasser bleiben. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich kann Wörter und Geräusche nachahmen. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich bewege mich extrem langsam und hänge kopfüber in Bäumen. Wer bin ich? <span class="star">⭐</span></li>
            <li>Ich trage meine Beute auf Bäume, um sie vor anderen Räubern zu schützen. Wer bin ich? <span class="star">⭐</span></li>
          </ol>
        `,
        solutionHtml: `
          <p>1. Der Tiger · 2. Der Elefant · 3. Der Affe · 4. Die Schlange · 5. Das Krokodil ·
          6. Der Papagei · 7. Das Faultier · 8. Der Leopard</p>
        `,
        preview: "Nächste Woche entdecken wir Tiere und Phänomene der Wetterstation-Insel!"
      }
    }
  },

  bewegung: {
    color: "var(--color-bewegung)",
    label: "Bewegung",
    days: {
      day1: {
        parentNote: "Bewegung passend zum Dschungel-Thema — gerne auch zusammen mit dem Forscherkind.",
        theoryTitle: "Der Dschungel-Parcours",
        theoryHtml: `
          <p>Baut mit Kissen, Stühlen und einer Decke einen kleinen Parcours im Zimmer oder Garten auf:</p>
          <ol>
            <li><strong>Schlangen-Kriechen:</strong> Unter einem Tisch oder Stuhl hindurchkriechen.</li>
            <li><strong>Affen-Sprünge:</strong> Von Kissen zu Kissen hüpfen, ohne den Boden zu berühren.</li>
            <li><strong>Tiger-Schleichen:</strong> Ganz leise auf allen Vieren an einer "schlafenden" Person vorbeischleichen.</li>
            <li><strong>Balance-Ast:</strong> Auf einer Linie (Klebeband oder Teppichkante) wie auf einem Ast balancieren.</li>
            <li><strong>Löwen-Brüllen:</strong> Am Ziel angekommen, einmal laut wie ein Löwe brüllen!</li>
          </ol>
        `,
        preview: "Morgen gibt es eine neue Bewegungsaufgabe passend zum Tagesthema."
      },
      day2: {
        parentNote: "Ein neues Bewegungsspiel — heute wird gerannt statt geschlichen.",
        theoryTitle: "Das Dschungel-Tier-Wettrennen",
        theoryHtml: `
          <p>Markiert eine Start- und eine Ziellinie (z. B. mit Klebeband oder zwei Kissen). Jede Runde
          wird ein anderes Tier nachgeahmt:</p>
          <ol>
            <li><strong>Runde 1 — Affen-Hüpfen:</strong> Auf allen Vieren hüpfend zur Ziellinie.</li>
            <li><strong>Runde 2 — Schlangen-Kriechen:</strong> Auf dem Bauch robbend zur Ziellinie.</li>
            <li><strong>Runde 3 — Frosch-Sprünge:</strong> Aus der Hocke mit beiden Beinen springen.</li>
            <li><strong>Runde 4 — Freie Wahl:</strong> Beide Kinder dürfen sich ihr Lieblingstier aus den
            ersten drei Runden aussuchen und noch einmal rennen.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Bei mehreren Mitspielern: wer zuerst ankommt,
          gewinnt die Runde. Allein spielbar: gegen die eigene Zeit rennen.</p>
        `,
        preview: "Morgen gibt es wieder eine neue Bewegungsidee."
      },
      day3: {
        parentNote: "Ein ruhigerer Bewegungstag nach zwei energiegeladenen Tagen.",
        theoryTitle: "Dschungel-Yoga",
        theoryHtml: `
          <p>Haltet jede Position ruhig für ein paar Atemzüge:</p>
          <ol>
            <li><strong>Schlangen-Pose (Kobra):</strong> Bäuchlings hinlegen, Hände neben die Schultern,
            Oberkörper langsam nach oben drücken wie eine Schlange, die den Kopf hebt.</li>
            <li><strong>Baum-Pose:</strong> Auf einem Bein stehen, den anderen Fuß an die Wade oder das
            Knie stützen, Arme wie Äste nach oben strecken.</li>
            <li><strong>Katzen-Pose:</strong> Auf allen Vieren den Rücken abwechselnd rund machen (wie
            eine faule Katze) und durchdrücken (wie ein wachsamer Tiger).</li>
            <li><strong>Frosch-Pose:</strong> In die Hocke gehen, Hände zwischen den Füßen aufstützen,
            ruhig wie ein wartender Frosch verharren.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Am besten mit ruhiger Musik oder ganz still —
          ein schöner Ausgleich nach den schnellen Bewegungsspielen der letzten Tage.</p>
        `,
        preview: "Morgen wird es wieder actionreicher."
      },
      day4: {
        parentNote: "Ein Versteckspiel mit Dschungel-Dreh — heute darf laut gelacht werden.",
        theoryTitle: "Dschungel-Verstecken",
        theoryHtml: `
          <p>Ganz normales Verstecken, mit einem Extra:</p>
          <ol>
            <li>Eine Person zählt (z. B. bis 20), während die anderen sich verstecken.</li>
            <li>Wird jemand gefunden, muss diese Person laut das Geräusch <strong>ihres Lieblingstiers</strong>
            aus dieser Woche nachmachen (Tiger brüllen, Affe schreien, Schlange zischen, Krokodil
            klappern, Papagei krächzen, Faultier ganz leise gähnen).</li>
            <li>Wer zuletzt gefunden wird, darf beim nächsten Mal zählen.</li>
          </ol>
        `,
        preview: "Morgen ist Endboss-Freitag — mit einer besonders lustigen Bewegungsaufgabe zum Abschluss der Woche!"
      },
      day5: {
        parentNote: "🎉 Freitag: Die große Dschungel-Olympiade — alle Bewegungsspiele der Woche in einem großen Finale.",
        theoryTitle: "Die Dschungel-Olympiade",
        theoryHtml: `
          <p>Baut einen kleinen Rundkurs mit allen Stationen der Woche auf und lasst die Kinder ihn
          nacheinander durchlaufen:</p>
          <ol>
            <li><strong>Station 1 — Schlangen-Kriechen:</strong> Unter einem Stuhl hindurchkriechen.</li>
            <li><strong>Station 2 — Affen-Sprünge:</strong> Von Kissen zu Kissen hüpfen.</li>
            <li><strong>Station 3 — Balance-Ast:</strong> Auf einer Linie balancieren.</li>
            <li><strong>Station 4 — Dschungel-Yoga:</strong> Einmal die Baum-Pose halten.</li>
            <li><strong>Station 5 — Ziel-Brüllen:</strong> Am Ende wie das Lieblingstier der Woche brüllen/rufen.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Am Ende gibt es für alle einen großen Applaus —
          das war die Dschungel-Insel-Olympiade!</p>
        `,
        preview: "Nächste Woche wird es stürmisch auf der Wetterstation-Insel!"
      }
    }
  }
};

// ============================================================
// LILI — Bereiche
// ============================================================

const LILI = {
  geschichte: {
    color: "var(--color-geschichte)",
    label: "Geschichte",
    days: {
      day1: {
        guide: "Lies dem Forscherkind die Geschichte gemütlich vor, am besten im neuen 'Dschungel-Lager'. Zeig beim Vorlesen gerne mit der Stimme, wie mutig Tilly am Ende ist.",
        activityHtml: `
          <div class="card">
            <h3>📖 Tilly entdeckt die Dschungel-Insel</h3>
            <div class="mascot-row">
              <div class="mascot-icon">${MASCOT_TILLY_SVG}</div>
              <div class="mascot-icon">${MASCOT_MOMO_SVG}</div>
            </div>
            <p>Tilly die Schildkröte watschelte gemütlich am Ufer entlang, als sie plötzlich ein
            lautes Rascheln hörte. Ihr Herz klopfte schnell. "Was, wenn da ein Monster im Dschungel
            wohnt?", dachte sie und zog ihren Kopf ein Stückchen in ihren Panzer.</p>
            <p>Da hüpfte Momo der Affe von einem Ast herunter und lachte fröhlich. "Tilly, komm mit!
            Ich zeige dir die schönste Insel, die ich kenne!" Tilly zitterte ein bisschen.
            "Aber ich habe Angst vor dem, was da drin ist", flüsterte sie.</p>
            <p>Momo setzte sich neben sie. "Weißt du, Mut heißt nicht, gar keine Angst zu haben.
            Mut heißt: Man hat ein kleines bisschen Angst — und geht trotzdem los."</p>
            <p>Tilly dachte kurz nach, atmete tief durch und streckte ihren Kopf wieder heraus.
            "Dann bin ich jetzt mutig!", sagte sie und watschelte los. Im Dschungel wartete keine
            Gefahr, sondern bunte Vögel, freundliche Frösche und duftende Blumen. Tilly und Momo
            hatten von diesem Tag an ganz viele neue Freunde auf der Dschungel-Insel.</p>
          </div>
        `
      },
      day2: {
        guide: "Zweiter Teil der Geschichte — heute geht es um Teamarbeit. Betone beim Vorlesen, wie Tilly und Momo gemeinsam eine Lösung finden.",
        activityHtml: `
          <div class="card">
            <h3>📖 Der Wasserfall der geteilten Früchte</h3>
            <div class="mascot-row">
              <div class="mascot-icon">${MASCOT_TILLY_SVG}</div>
              <div class="mascot-icon">${MASCOT_MOMO_SVG}</div>
            </div>
            <p>Am nächsten Tag entdeckten Tilly und Momo einen glitzernden Wasserfall. Direkt daneben
            hing ein Baum voller saftiger, gelber Mangofrüchte — aber ganz oben, viel zu hoch für Momo
            zum Springen.</p>
            <p>Momo sprang und sprang, aber die Frucht blieb außer Reichweite. "Ich schaffe das nicht
            allein", seufzte er. Tilly überlegte kurz. "Ich bin zwar langsam, aber mein Panzer ist stark
            und stabil. Steig auf meinen Rücken!"</p>
            <p>Momo kletterte auf Tillys Panzer, streckte sich — und konnte die Mango endlich pflücken!
            Die beiden teilten die Frucht brüderlich und lachten über den glitzernden Wasserfall.</p>
            <p>"Zusammen schaffen wir mehr als allein", sagte Tilly zufrieden. Und Momo nickte mit vollen
            Backen.</p>
          </div>
        `
      },
      day3: {
        guide: "Dritter Teil der Geschichte — heute kommt ein neuer Freund dazu. Betone beim Vorlesen, wie freundlich Tilly und Momo dem ängstlichen Coco begegnen.",
        activityHtml: `
          <div class="card">
            <h3>📖 Ein neuer Freund: Coco der Papagei</h3>
            <div class="mascot-row">
              <div class="mascot-icon">${MASCOT_TILLY_SVG}</div>
              <div class="mascot-icon">${MASCOT_MOMO_SVG}</div>
            </div>
            <p>Tilly und Momo hörten ein trauriges Piepen zwischen den Blättern. Dort saß ein bunter
            Papagei namens Coco, ganz allein und verängstigt. "Ich habe meinen Schwarm verloren!",
            schluchzte er.</p>
            <p>"Keine Sorge", sagte Momo sanft, "wir helfen dir, deine Familie wiederzufinden."
            Tilly nickte. "Bleib erstmal bei uns, du bist nicht allein."</p>
            <p>Gemeinsam suchten sie den ganzen Nachmittag, bis sie endlich Cocos Schwarm auf einem
            hohen Baum entdeckten. Coco flog freudig zu ihnen zurück, drehte sich aber noch einmal um.
            "Danke, dass ihr so lieb zu mir wart, obwohl ihr mich gar nicht kanntet!"</p>
            <p>Von diesem Tag an besuchte Coco seine neuen Freunde Tilly und Momo jede Woche am
            Wasserfall.</p>
          </div>
        `
      },
      day4: {
        guide: "Ein Gewitter kann kleinen Kindern Angst machen — lies diesen Teil besonders liebevoll und beruhigend vor.",
        activityHtml: `
          <div class="card">
            <h3>📖 Der kleine Sturm</h3>
            <div class="mascot-row">
              <div class="mascot-icon">${MASCOT_TILLY_SVG}</div>
              <div class="mascot-icon">${MASCOT_MOMO_SVG}</div>
            </div>
            <p>Es donnerte laut über der Dschungel-Insel. Tilly zog erschrocken ihren Kopf in ihren
            Panzer zurück. "Ich mag das laute Donnern nicht!", flüsterte sie.</p>
            <p>Momo kletterte schnell zu ihr und breitete ein großes Blatt wie ein Dach über beiden
            aus. "Komm, wir warten zusammen, bis der Sturm vorbei ist. Ich singe dir ein Lied."</p>
            <p>Momo summte eine leise, beruhigende Melodie, und ganz langsam wurde Tilly ruhiger. Nach
            einer Weile hörte der Regen auf, und ein wunderschöner Regenbogen erschien am Himmel.</p>
            <p>"Siehst du", sagte Momo lächelnd, "nach jedem Sturm kommt etwas Schönes. Und du musstest
            nicht allein warten."</p>
          </div>
        `
      },
      day5: {
        guide: "Die letzte Geschichte der Woche — ein fröhlicher Abschluss mit allen Freunden zusammen. Ein schöner Moment, um gemeinsam zurückzublicken.",
        activityHtml: `
          <div class="card">
            <h3>📖 Das große Dschungel-Fest</h3>
            <div class="mascot-row">
              <div class="mascot-icon">${MASCOT_TILLY_SVG}</div>
              <div class="mascot-icon">${MASCOT_MOMO_SVG}</div>
            </div>
            <p>Am Ende der Woche luden Tilly und Momo alle ihre neuen Freunde zu einem großen Fest am
            Wasserfall ein: die kluge Schlange Kiara, das hilfsbereite Krokodil Karl und den bunten
            Papagei Coco.</p>
            <p>Jeder brachte etwas mit: Kiara brachte süße Beeren, Karl half beim Aufbauen der
            Sitzplätze aus Blättern, und Coco sang ein fröhliches Lied.</p>
            <p>"Diese Woche war die schönste Woche meines Lebens", sagte Tilly glücklich. "Und das
            Beste daran ist: Wir haben jetzt so viele Freunde!"</p>
            <p>Alle Tiere tanzten und lachten bis die Sonne unterging. Die Dschungel-Insel hatte sich
            in einen Ort voller Freundschaft verwandelt.</p>
          </div>
        `
      }
    }
  },

  sprache: {
    color: "var(--color-sprache, var(--color-deutsch))",
    label: "Sprache",
    days: {
      day1: {
        guide: "Klatscht die Silben der Tierwörter gemeinsam laut mit. Übertreibt ruhig ein bisschen — je lauter geklatscht wird, desto mehr Spaß macht es.",
        activityHtml: `
          <div class="card">
            <h3>👏 Silben klatschen: Dschungeltiere</h3>
            <p>Sagt jedes Wort langsam und klatscht bei jeder Silbe einmal in die Hände:</p>
            <table class="match-table">
              <tr><td>Af-fe</td><td>👏👏 (2 Silben)</td></tr>
              <tr><td>Ti-ger</td><td>👏👏 (2 Silben)</td></tr>
              <tr><td>Frosch</td><td>👏 (1 Silbe)</td></tr>
              <tr><td>E-le-fant</td><td>👏👏👏 (3 Silben)</td></tr>
              <tr><td>Schlan-ge</td><td>👏👏 (2 Silben)</td></tr>
              <tr><td>Kro-ko-dil</td><td>👏👏👏 (3 Silben)</td></tr>
            </table>
            <p style="font-size:13.5px;color:#6b7280;">Danach: Wer findet noch ein Tier mit nur einer Silbe? (z. B. Bär, Wolf)</p>
          </div>
        `
      },
      day2: {
        guide: "Reime machen Spaß und schulen das Ohr für Sprache — sprecht die Reimpaare gemeinsam nach.",
        activityHtml: `
          <div class="card">
            <h3>🎵 Reime finden: Dschungel-Reime</h3>
            <p>Sprich das erste Wort, das Forscherkind sucht das reimende Wort aus den beiden Möglichkeiten:</p>
            <table class="match-table">
              <tr><td><strong>Baum</strong></td><td>Traum <em>oder</em> Tisch? → <strong>Traum</strong></td></tr>
              <tr><td><strong>Maus</strong></td><td>Haus <em>oder</em> Ball? → <strong>Haus</strong></td></tr>
              <tr><td><strong>Frosch</strong></td><td>Kloß <em>oder</em> Sonne? → <strong>Kloß</strong></td></tr>
              <tr><td><strong>Hand</strong></td><td>Sand <em>oder</em> Stuhl? → <strong>Sand</strong></td></tr>
            </table>
            <p style="font-size:13.5px;color:#6b7280;">Danach frei weiterspielen: Wer findet noch mehr Wörter, die sich auf "-aus" reimen?</p>
          </div>
        `
      },
      day3: {
        guide: "Ein einfaches Sortierspiel — das Forscherkind lernt, Dinge nach Kategorien (Oberbegriffen) zu ordnen.",
        activityHtml: `
          <div class="card">
            <h3>🗂️ Was gehört zusammen?</h3>
            <p>Legt Bildkarten oder sagt die Wörter laut: Affe, Banane, Tiger, Apfel, Frosch, Traube.
            Das Forscherkind sortiert sie in zwei Gruppen:</p>
            <table class="match-table">
              <tr><td><strong>Tiere</strong></td><td>Affe, Tiger, Frosch</td></tr>
              <tr><td><strong>Früchte</strong></td><td>Banane, Apfel, Traube</td></tr>
            </table>
            <p style="font-size:13.5px;color:#6b7280;">Danach: Wer findet noch ein Tier oder eine Frucht,
            die dazu passen würde?</p>
          </div>
        `
      },
      day4: {
        guide: "Gegensätze mit Körperbewegung verbinden — das bleibt besonders gut im Gedächtnis.",
        activityHtml: `
          <div class="card">
            <h3>🔄 Gegensätze spielen</h3>
            <p>Sage ein Wort, das Forscherkind macht das Gegenteil vor:</p>
            <table class="match-table">
              <tr><td><strong>groß</strong></td><td>klein → ganz klein zusammenkauern</td></tr>
              <tr><td><strong>laut</strong></td><td>leise → ganz leise flüstern</td></tr>
              <tr><td><strong>schnell</strong></td><td>langsam → in Zeitlupe laufen</td></tr>
              <tr><td><strong>hoch</strong></td><td>tief → auf die Zehenspitzen stellen / hinhocken</td></tr>
            </table>
          </div>
        `
      },
      day5: {
        guide: "Ein fröhliches Abschlussspiel, das alles aus der Woche noch einmal aufgreift.",
        activityHtml: `
          <div class="card">
            <h3>🎉 Das große Dschungel-Ratespiel</h3>
            <p>Mische alles, was das Forscherkind diese Woche gelernt hat: Silben klatschen, Reime, Oberbegriffe
            und Gegensätze. Stelle abwechselnd Fragen:</p>
            <p>"Klatsche die Silben von Kro-ko-dil!" · "Was reimt sich auf Baum?" · "Ist ein Affe ein
            Tier oder eine Frucht?" · "Zeig mir das Gegenteil von groß!"</p>
            <p style="font-size:13.5px;color:#6b7280;">Lob jede Antwort — es geht nur ums fröhliche Wiederholen, nicht ums Testen.</p>
          </div>
        `
      }
    }
  },

  mathe: {
    color: "var(--color-mathe)",
    label: "Mathe",
    days: {
      day1: {
        guide: "Spielerisch zählen, ohne Druck — es geht nur ums gemeinsame Entdecken der Mengen.",
        activityHtml: `
          <div class="card">
            <h3>🔢 Wie viele Affen siehst du?</h3>
            <p>Zähle laut mit dem Finger auf jede Gruppe:</p>
            <p style="font-size:26px;">🐒 (1) &nbsp;&nbsp;&nbsp; 🐒🐒 (2) &nbsp;&nbsp;&nbsp; 🐒🐒🐒 (3)</p>
            <p style="font-size:26px;">🐒🐒🐒🐒 (4) &nbsp;&nbsp;&nbsp; 🐒🐒🐒🐒🐒 (5)</p>
            <p>Spiel danach: Halte kurz eine bestimmte Anzahl Finger hoch (1–5) und lass das Forscherkind raten,
            wie viele es sind, ohne zu zählen — das nennt man "auf einen Blick erfassen".</p>
          </div>
        `
      },
      day2: {
        guide: "Heute geht es um Mengen vergleichen — spielerisch, ganz ohne Zahlen benennen zu müssen.",
        activityHtml: `
          <div class="card">
            <h3>⚖️ Mehr oder weniger?</h3>
            <p>Zeige dem Forscherkind zwei Gruppen von Tieren und frag: "Wo sind mehr?"</p>
            <p style="font-size:26px;">🐒🐒🐒 &nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp; 🐸🐸</p>
            <p style="font-size:14px;color:#6b7280;">(Hier sind mehr Affen als Frösche)</p>
            <p style="font-size:26px;">🐍 &nbsp;&nbsp;&nbsp;vs.&nbsp;&nbsp;&nbsp; 🦋🦋🦋🦋</p>
            <p style="font-size:14px;color:#6b7280;">(Hier sind mehr Schmetterlinge als Schlangen)</p>
            <p>Lass das Forscherkind selbst zwei Gruppen mit Spielzeug oder Fingern bilden und entscheiden, welche
            Gruppe mehr ist.</p>
          </div>
        `
      },
      day3: {
        guide: "Ein einfaches Muster-Spiel — fördert das Erkennen von Regelmäßigkeiten, ganz spielerisch.",
        activityHtml: `
          <div class="card">
            <h3>🔴🔵 Muster fortsetzen</h3>
            <p>Lege oder male ein Muster vor und lass das Forscherkind es fortsetzen:</p>
            <p style="font-size:30px;">🔴🔵🔴🔵🔴 ___?</p>
            <p style="font-size:14px;color:#6b7280;">(Lösung: 🔵)</p>
            <p style="font-size:30px;">🐒🐸🐒🐸🐒 ___?</p>
            <p style="font-size:14px;color:#6b7280;">(Lösung: 🐸)</p>
            <p>Danach darf das Forscherkind selbst ein Muster mit Bauklötzen, Perlen oder Spielzeug legen, das du fortsetzen sollst!</p>
          </div>
        `
      },
      day4: {
        guide: "Formen im Alltag entdecken — einfach beim Spazierengehen oder Zuhause umschauen.",
        activityHtml: `
          <div class="card">
            <h3>🔵🔺 Formen entdecken</h3>
            <p>Zeige dem Forscherkind die drei Grundformen und sucht gemeinsam passende Dinge im Dschungel-Bild oder im Zimmer:</p>
            <p style="font-size:26px;">⭕ Kreis — wie die Sonne ☀️<br>
            🔺 Dreieck — wie ein Blatt 🍃<br>
            🟧 Viereck — wie ein Fenster</p>
            <p style="font-size:13.5px;color:#6b7280;">Spiel danach: "Ich sehe was, das rund ist!" — das Forscherkind sucht im Raum danach.</p>
          </div>
        `
      },
      day5: {
        guide: "Eine spielerische Zählschatzsuche zum Abschluss der Woche.",
        activityHtml: `
          <div class="card">
            <h3>💎 Die Schatzsuche zum Zählen</h3>
            <p>Versteckt 10 kleine Gegenstände (Knöpfe, Steine, Perlen) im Zimmer. Das Forscherkind sucht sie und
            zählt laut mit, wie viele sie schon gefunden hat.</p>
            <p>Am Ende: Legt alle gefundenen Schätze in eine Reihe und zählt gemeinsam noch einmal von
            vorne — wie viele waren es insgesamt?</p>
            <p style="font-size:13.5px;color:#6b7280;">Variante: Zwei Schatzhaufen bilden und vergleichen, wo mehr liegt.</p>
          </div>
        `
      }
    }
  },

  englisch: {
    color: "var(--color-englisch)",
    label: "Englisch",
    days: {
      day1: {
        guide: "Nur singen und zeigen, keine Vokabeltests. Zeig beim Singen jeweils auf das passende Tier.",
        activityHtml: `
          <div class="card">
            <h3>🎵 Farben-Lied: What color is it?</h3>
            <p>Singt oder sprecht rhythmisch:</p>
            <p>"Green, green, the little frog. 🐸<br>
            Orange, orange, the big tiger. 🐯<br>
            Brown, brown, the funny monkey. 🐒<br>
            What color, what color, do you see?"</p>
            <p style="font-size:13.5px;color:#6b7280;">Danach: Zeig auf ein Tier im Zimmer/Buch und
            frag "What color is it?" — das Forscherkind darf raten oder zeigen.</p>
          </div>
        `
      },
      day2: {
        guide: "Zählen auf Englisch, mit Bewegung verbunden — je mehr Körpereinsatz, desto mehr Spaß.",
        activityHtml: `
          <div class="card">
            <h3>🎵 Zähl-Lied: One, two, three!</h3>
            <p>Singt oder sprecht rhythmisch, bei jeder Zahl einmal in die Hände klatschen:</p>
            <p>"One, two, three, jump with me! 🐒<br>
            Four, five, six, gather sticks! 🌿<br>
            Seven, eight, nine, all in line! 🐍<br>
            Ten! We made it, feeling fine!" 🎉</p>
            <p style="font-size:13.5px;color:#6b7280;">Danach: Zähle gemeinsam Gegenstände im Zimmer auf Englisch, von eins bis fünf.</p>
          </div>
        `
      },
      day3: {
        guide: "Ein einfaches Ja/Nein-Ratespiel, das Farben und Größen von gestern und vorgestern verbindet.",
        activityHtml: `
          <div class="card">
            <h3>❓ Yes or No? Ratespiel</h3>
            <p>Stelle einfache Fragen, das Forscherkind antwortet mit "Yes" oder "No":</p>
            <p>"Is the frog green? 🐸" → <strong>Yes!</strong><br>
            "Is the elephant small? 🐘" → <strong>No, it's big!</strong><br>
            "Is the sun blue? ☀️" → <strong>No!</strong></p>
            <p style="font-size:13.5px;color:#6b7280;">Danach: das Forscherkind darf selbst eine Frage stellen, du antwortest mit "Yes" oder "No".</p>
          </div>
        `
      },
      day4: {
        guide: "Big and small auf Englisch, mit Bewegung verbunden.",
        activityHtml: `
          <div class="card">
            <h3>🐘🐜 Big and small</h3>
            <p>Macht euch groß und klein passend zum Wort:</p>
            <p>"Big, big, the elephant!" 🐘 (ganz groß machen und Arme ausbreiten)<br>
            "Small, small, the little ant!" 🐜 (ganz klein zusammenkauern)</p>
            <p style="font-size:13.5px;color:#6b7280;">Wiederholen und dabei immer schneller werden — sorgt für viel Gelächter!</p>
          </div>
        `
      },
      day5: {
        guide: "Ein fröhliches Abschluss-Lied, das Farben, Zahlen und Größen der Woche verbindet.",
        activityHtml: `
          <div class="card">
            <h3>🎵 Abschluss-Lied: My Jungle Friends</h3>
            <p>Singt gemeinsam, mit viel Bewegung dazu:</p>
            <p>"One green frog, two red birds,<br>
            Big elephant, small little ant,<br>
            Colors and numbers, all in a song,<br>
            Our jungle week was never too long!"</p>
            <p style="font-size:13.5px;color:#6b7280;">Danach: das Forscherkind darf sein Lieblingstier aus dem Lied zeigen und benennen.</p>
          </div>
        `
      }
    }
  },

  kreativ: {
    color: "var(--color-kreativ)",
    label: "Kreativ & Ausmalen",
    days: {
      day1: {
        guide: "Zuerst das Ausmalbild anbieten, danach — wenn noch Zeit und Lust ist — eine der Bastelideen.",
        activityHtml: `
          <div class="card">
            <h3>🎨 Ausmalbild: Tilly die Schildkröte</h3>
            <svg class="coloring-svg" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg"
              stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="150" cy="120" rx="90" ry="70"/>
              <path d="M150 50 L150 190"/>
              <path d="M60 120 L240 120"/>
              <path d="M85 70 L215 170"/>
              <path d="M215 70 L85 170"/>
              <circle cx="150" cy="35" r="25"/>
              <circle cx="142" cy="30" r="3" fill="#333"/>
              <circle cx="158" cy="30" r="3" fill="#333"/>
              <ellipse cx="60" cy="70" rx="20" ry="12" transform="rotate(-30 60 70)"/>
              <ellipse cx="240" cy="70" rx="20" ry="12" transform="rotate(30 240 70)"/>
              <ellipse cx="60" cy="170" rx="20" ry="12" transform="rotate(30 60 170)"/>
              <ellipse cx="240" cy="170" rx="20" ry="12" transform="rotate(-30 240 170)"/>
              <path d="M150 190 L150 210"/>
            </svg>
          </div>
          <div class="card">
            <h3>✂️ Bastelideen (eine auswählen)</h3>
            <p><strong>Option 1 — Klopapierrollen-Affe:</strong> Klopapierrolle braun anmalen oder mit
            braunem Papier bekleben, runde Ohren aus Papier aufkleben, Gesicht aufmalen, einen
            geschwungenen Schwanz aus Wolle oder Papier hinten ankleben.</p>
            <p><strong>Option 2 — Blätter-Frosch:</strong> Ein großes grünes Blatt (gesammelt beim
            Spaziergang oder aus Papier ausgeschnitten) als Körper aufkleben, mit weißen Kreisen für
            Augen und wackeligen Beinen aus Papierstreifen ergänzen.</p>
          </div>
        `
      },
      day2: {
        guide: "Wieder zuerst das Ausmalbild, dann die Bastelidee — heute dreht sich alles um Momo.",
        activityHtml: `
          <div class="card">
            <h3>🎨 Ausmalbild: Momo der Affe</h3>
            <svg class="coloring-svg" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg"
              stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="70" cy="95" r="32"/>
              <circle cx="230" cy="95" r="32"/>
              <circle cx="150" cy="115" r="72"/>
              <ellipse cx="150" cy="135" rx="46" ry="42"/>
              <circle cx="132" cy="122" r="6" fill="#333"/>
              <circle cx="168" cy="122" r="6" fill="#333"/>
              <path d="M132 150 Q150 163 168 150"/>
              <path d="M105 180 Q150 215 195 180 L195 225 Q150 245 105 225 Z"/>
            </svg>
          </div>
          <div class="card">
            <h3>✂️ Bastelideen (eine auswählen)</h3>
            <p><strong>Option 1 — Blätter-Kunst-Dschungelbild:</strong> Gesammelte Blätter (oder aus Papier
            ausgeschnittene) auf ein Blatt Papier kleben und mit Buntstiften zu Tieren oder Bäumen
            weitermalen — jedes Blatt wird Teil eines größeren Dschungel-Bildes.</p>
            <p><strong>Option 2 — Papiertüten-Löwe:</strong> Eine kleine Papiertüte gelb/orange anmalen,
            Wollfäden oder Papierstreifen als Mähne rundherum ankleben, Gesicht aufmalen.</p>
          </div>
        `
      },
      day3: {
        guide: "Heute dreht sich alles um den neuen Freund Coco den Papagei.",
        activityHtml: `
          <div class="card">
            <h3>🎨 Ausmalbild: Coco der Papagei</h3>
            <svg class="coloring-svg" viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg"
              stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="130" cy="70" r="45"/>
              <circle cx="115" cy="60" r="5" fill="#333"/>
              <path d="M85 75 Q60 85 85 100 Q95 90 95 78 Z"/>
              <ellipse cx="130" cy="170" rx="60" ry="80"/>
              <path d="M170 120 Q210 160 170 220 Q150 190 155 150 Z"/>
              <path d="M110 245 Q100 290 80 300"/>
              <path d="M130 250 Q130 295 130 300"/>
              <path d="M150 245 Q160 290 180 300"/>
            </svg>
          </div>
          <div class="card">
            <h3>✂️ Bastelideen (eine auswählen)</h3>
            <p><strong>Option 1 — Papierteller-Papagei:</strong> Papierteller bunt anmalen, aus buntem
            Papier ausgeschnittene Federn am Rand ankleben, Schnabel und Augen aufmalen.</p>
            <p><strong>Option 2 — Fingerabdruck-Federn:</strong> Mit den Fingern in verschiedenen Farben
            Fingerabdrücke als Federn auf ein aufgemaltes Papagei-Umriss-Bild drucken — je bunter, desto schöner.</p>
          </div>
        `
      },
      day4: {
        guide: "Heute geht es um Karl das Krokodil und um das gemütliche Faultier aus dem heutigen Sachunterricht.",
        activityHtml: `
          <div class="card">
            <h3>🎨 Ausmalbild: Karl das Krokodil</h3>
            <svg class="coloring-svg" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
              stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="160" cy="130" rx="140" ry="40"/>
              <circle cx="240" cy="95" r="10"/>
              <circle cx="265" cy="98" r="10"/>
              <path d="M280 120 L310 115 L280 140 Z"/>
              <path d="M70 95 L85 75 L100 95"/>
              <path d="M115 90 L130 70 L145 90"/>
              <path d="M160 90 L175 70 L190 90"/>
              <path d="M90 170 L80 190"/>
              <path d="M140 170 L135 190"/>
              <path d="M190 170 L195 190"/>
            </svg>
          </div>
          <div class="card">
            <h3>✂️ Bastelideen (eine auswählen)</h3>
            <p><strong>Option 1 — Klopapierrollen-Krokodil:</strong> Klopapierrolle grün anmalen, oben
            einen Zickzack-Schnitt für die Zähne einschneiden (Elternteil hilft), Augen aufkleben.</p>
            <p><strong>Option 2 — Klopapierrollen-Faultier:</strong> Klopapierrolle braun/grau anmalen,
            lange Arme aus Papier ankleben, damit es sich an einem "Ast" (Stift oder Stock) festhält —
            passend zum gemütlichen Faultier von heute.</p>
          </div>
        `
      },
      day5: {
        guide: "Ein festliches Bastelprojekt für die Dschungel-Fest-Feier am Ende der Woche.",
        activityHtml: `
          <div class="card">
            <h3>🎉 Ausmalbild: Regenbogen über der Dschungel-Insel</h3>
            <svg class="coloring-svg" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"
              stroke="#333" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 180 A130 130 0 0 1 280 180"/>
              <path d="M50 180 A100 100 0 0 1 250 180"/>
              <path d="M80 180 A70 70 0 0 1 220 180"/>
              <circle cx="60" cy="160" r="18"/>
              <circle cx="240" cy="160" r="14"/>
            </svg>
          </div>
          <div class="card">
            <h3>✂️ Bastelidee: Dschungel-Party-Krone</h3>
            <p>Einen Papierstreifen um den Kopf messen und zu einem Kronenring kleben. Aus buntem
            Papier ausgeschnittene "Blätter" und Tierbilder (Tiger, Affe, Schlange, Krokodil, Papagei,
            Faultier) daran ankleben — für das große Dschungel-Fest heute Abend!</p>
          </div>
        `
      }
    }
  },

  naturwissen: {
    color: "var(--color-naturwissen)",
    label: "Naturwissen",
    days: {
      day1: {
        guide: "Ein einfaches, sicheres Experiment — am besten morgens starten, damit man abends das Ergebnis sehen kann.",
        activityHtml: `
          <div class="card">
            <h3>🧪 Wie trinkt eine Blume?</h3>
            <p><strong>Material:</strong> ein Glas Wasser, Lebensmittelfarbe (blau oder rot),
            eine weiße Blume oder ein Selleriestängel mit Blättern.</p>
            <p><strong>So geht's:</strong></p>
            <ol>
              <li>Ein paar Tropfen Lebensmittelfarbe ins Wasser geben und umrühren.</li>
              <li>Die Blume oder den Selleriestängel hineinstellen.</li>
              <li>Ein paar Stunden warten und immer wieder nachschauen.</li>
            </ol>
            <p><strong>Was passiert?</strong> Die Blume "trinkt" das gefärbte Wasser durch ganz feine
            Röhrchen im Stängel nach oben — nach einer Weile werden die Blütenblätter oder Blätter
            bunt gefärbt!</p>
          </div>
        `
      },
      day2: {
        guide: "Ein einfaches Experiment mit Alltagsgegenständen — lasst das Forscherkind vorher raten, bevor ihr es ausprobiert.",
        activityHtml: `
          <div class="card">
            <h3>🧪 Schwimmt es oder sinkt es?</h3>
            <p><strong>Material:</strong> eine große Schüssel Wasser und verschiedene Gegenstände
            (z. B. ein Holzlöffel, ein Stein, eine Büroklammer, ein Korken, ein Plastiklöffel, ein Blatt Papier).</p>
            <p><strong>So geht's:</strong></p>
            <ol>
              <li>Das Forscherkind darf für jeden Gegenstand erst raten: Schwimmt er oder sinkt er?</li>
              <li>Dann vorsichtig ins Wasser legen und schauen, was wirklich passiert.</li>
              <li>Die Gegenstände in zwei Gruppen sortieren: "schwimmt" und "sinkt".</li>
            </ol>
            <p><strong>Was passiert?</strong> Leichte Dinge wie Holz oder Korken schwimmen oben,
            schwere Dinge wie Steine oder Metall sinken nach unten.</p>
          </div>
        `
      },
      day3: {
        guide: "Ein kleines Zauber-Experiment, das sofort Freude macht — ein Erwachsener sollte das Mineralwasseröffnen übernehmen.",
        activityHtml: `
          <div class="card">
            <h3>🧪 Die tanzenden Rosinen</h3>
            <p><strong>Material:</strong> ein Glas Mineralwasser mit viel Kohlensäure, ein paar Rosinen.</p>
            <p><strong>So geht's:</strong></p>
            <ol>
              <li>Das Glas mit Mineralwasser füllen.</li>
              <li>Ein paar Rosinen hineingeben.</li>
              <li>Genau hinschauen: Was passiert mit den Rosinen?</li>
            </ol>
            <p><strong>Was passiert?</strong> Die Rosinen sinken zuerst nach unten. Dann setzen sich
            kleine Sprudel-Bläschen an ihnen fest und tragen sie nach oben — die Rosinen "tanzen" im
            Glas auf und ab!</p>
          </div>
        `
      },
      day4: {
        guide: "Ein zauberhaftes Experiment passend zur Sturm-Geschichte von heute — Kinder lieben den Moment, in dem die Farbe 'heraustropft'.",
        activityHtml: `
          <div class="card">
            <h3>🧪 Wolken im Glas (Regen-Experiment)</h3>
            <p><strong>Material:</strong> ein großes Glas Wasser, Rasierschaum, Lebensmittelfarbe (blau).</p>
            <p><strong>So geht's:</strong></p>
            <ol>
              <li>Das Glas zu zwei Dritteln mit Wasser füllen.</li>
              <li>Rasierschaum als "Wolke" obendrauf spritzen.</li>
              <li>Tropfenweise blaue Lebensmittelfarbe auf die "Wolke" träufeln und beobachten.</li>
            </ol>
            <p><strong>Was passiert?</strong> Die Farbe sammelt sich zuerst in der Schaum-Wolke, bis sie
            zu schwer wird — dann "regnet" sie als blaue Tropfen ins Wasser darunter, genau wie eine
            echte Regenwolke!</p>
          </div>
        `
      },
      day5: {
        guide: "Das magischste Experiment der Woche zum großen Fest-Abschluss — Kinder lieben diesen Moment.",
        activityHtml: `
          <div class="card">
            <h3>🧪 Der Milch-Farben-Tanz</h3>
            <p><strong>Material:</strong> ein flacher Teller Vollmilch, ein paar Tropfen
            Lebensmittelfarbe (mehrere Farben), ein Wattestäbchen, ein Tropfen Spülmittel.</p>
            <p><strong>So geht's:</strong></p>
            <ol>
              <li>Milch in den Teller füllen.</li>
              <li>Ein paar Tropfen verschiedener Lebensmittelfarben auf die Milch tropfen.</li>
              <li>Das Wattestäbchen kurz in Spülmittel tauchen und die Mitte des Tellers berühren.</li>
            </ol>
            <p><strong>Was passiert?</strong> Die Farben beginnen sofort, wild durcheinander zu tanzen
            und bunte Muster zu bilden — wie ein kleines Feuerwerk in der Milch! Ein schönes,
            magisches Finale für die erste Woche der Forscher-Akademie.</p>
          </div>
        `
      }
    }
  }
};
