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
    <div class="card allow-break">
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
    <div class="card allow-break">
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
      Hiermit wird bestätigt, dass Kadett <strong>_________________________</strong> heute tapfer
      geforscht, gerechnet und gelesen hat.<br>
      Verdiente XP heute: ____________________<br>
      Unterschrift der Akademie: ____________________</p>
    </div>
    <div class="card">
      <h3>🐢 Forscherkind-Tagesdiplom (Vorlage)</h3>
      <p style="font-size:14px;">
      <strong>Urkunde der Forscher-Akademie Sonnenberg</strong><br>
      Hiermit wird bestätigt, dass das Forscherkind <strong>_________________________</strong>
      heute mutig mitgemacht hat.<br>
      Verdiente Sterne heute: ____________________<br>
      Unterschrift der Akademie: ____________________</p>
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

const RECAP_1KLASSE_HTML = `
  <div class="card">
    <h3 style="color:var(--color-mathe);">🔟 Zehner und Einer</h3>
    <p>Jede zweistellige Zahl besteht aus Zehnern und Einern. Bei <strong>64</strong> sind das
    <strong>6 Zehner</strong> und <strong>4 Einer</strong>. Das brauchst du für fast jede Rechnung.</p>
  </div>
  <div class="card">
    <h3 style="color:var(--color-mathe);">➕➖ Plus und Minus ohne Übergang</h3>
    <p>Solange man beim Rechnen im selben Zehner bleibt, ist es einfach:</p>
    <p style="font-size:16px;"><strong>23 + 5 = 28</strong> &nbsp;&nbsp; <strong>38 − 6 = 32</strong></p>
    <p style="font-size:13.5px;color:#6b7280;">Man rechnet einfach mit den Einern weiter, die Zehner bleiben gleich.</p>
  </div>
  <div class="card">
    <h3 style="color:var(--color-mathe);">⚖️ Zahlen vergleichen</h3>
    <p>Mit diesen Zeichen vergleicht man zwei Zahlen:</p>
    <p style="font-size:16px;"><strong>7 &gt; 4</strong> (größer als) &nbsp;&nbsp; <strong>4 &lt; 7</strong> (kleiner als) &nbsp;&nbsp; <strong>5 = 5</strong> (gleich)</p>
  </div>
  <div class="card">
    <h3 style="color:var(--color-mathe);">💞 Die "verliebten Zahlen"</h3>
    <p>Zahlenpaare, die zusammen genau <strong>10</strong> ergeben — die kennst du am besten auswendig,
    denn viele Rechentricks bauen darauf auf:</p>
    <p style="font-size:16px;">1 + 9 &nbsp;·&nbsp; 2 + 8 &nbsp;·&nbsp; 3 + 7 &nbsp;·&nbsp; 4 + 6 &nbsp;·&nbsp; 5 + 5</p>
  </div>
  <div class="card">
    <h3 style="color:var(--color-mathe);">✖️ Verdoppeln und Halbieren</h3>
    <p><strong>Verdoppeln</strong> heißt: eine Zahl zu sich selbst addieren. <strong>4 + 4 = 8</strong>.<br>
    <strong>Halbieren</strong> heißt: eine Zahl in zwei gleich große Teile teilen. Die Hälfte von <strong>8</strong> ist <strong>4</strong>.</p>
  </div>
  <div class="card" style="border-color:var(--color-mathe);background:#fff7ed;">
    <p style="margin:0;font-size:14px;"><strong>Und jetzt geht's weiter:</strong> Auf den nächsten Seiten lernst du
    neue Rechentricks für Plus und Minus mit Zehnerübergang — wir starten mit dem Einfachsten und steigern
    uns langsam. Alles baut genau auf dem auf, was du hier gerade wiederholt hast.</p>
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
        parentNote: "Heute rechnet dein Kadett zum ersten Mal im Zahlenraum bis 100 und entdeckt dabei, wie einfach sich Zehner und Einer getrennt addieren lassen. Genau dieser entspannte Einstieg gibt ihm die Sicherheit, die er für die kniffligeren Tricks der nächsten Tage braucht. So beginnt die Woche mit einem echten Erfolgserlebnis.",
        theoryTitle: "Addition ohne Zehnerübergang",
        theoryHtml: `
          <p>Bei der Addition hilft es, Zehner und Einer getrennt zu addieren:</p>
          <p><strong>Beispiel: 23 + 34 = ?</strong></p>
          <ol>
            <li>Zehner getrennt addieren: 20 + 30 = 50.</li>
            <li>Einer getrennt addieren: 3 + 4 = 7.</li>
            <li>Beides zusammenzählen: 50 + 7 = 57.</li>
          </ol>
          <p><strong>Zweites Beispiel: 45 + 32 = ?</strong></p>
          <ol>
            <li>Zehner: 40 + 30 = 70.</li>
            <li>Einer: 5 + 2 = 7.</li>
            <li>Zusammen: 70 + 7 = 77.</li>
          </ol>
          <p style="font-size:13.5px;color:#6b7280;">Hier ergeben die Einer zusammen nie mehr als 10 —
          dadurch bleibt es einfach. In den nächsten Tagen kommt der Fall dazu, dass die Einer zusammen
          über 10 kommen (der sogenannte Zehnerübergang) — dafür gibt es dann eigene Tricks.</p>
        `,
        exercisesAdd: [
          [23,34],[45,32],[52,16],[61,27],[34,53],[26,41],[72,15],[43,25],[38,21],[56,13],
          [24,63],[47,31],[15,82],[36,42],[58,11],[27,52],[64,23],[41,36],[73,14],[25,44],
          [32,57],[46,21],[63,25],[18,71],[54,33]
        ],
        preview: "Morgen kommt der nächste Schritt: Was macht man, wenn die Einer zusammen mehr als 10 ergeben? Dafür gibt es einen cleveren Trick, die stellenweise Addition.",
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
        parentNote: "Dein Kadett rechnet inzwischen sicher im Zahlenraum bis 100 – heute kommt der erste richtige Rechentrick dazu. Mit der stellenweisen Addition löst er Aufgaben wie 49 + 36 im Kopf, ganz so, wie es auch viele Erwachsene tun. Ein kleiner Aha-Moment, auf den du dich freuen darfst.",
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
          <p style="font-size:13.5px;color:#6b7280;">Der Unterschied zu gestern: Die Einer ergeben jetzt
          zusammen mehr als 10 (hier 15). Das macht nichts — man zählt einfach ganz normal weiter
          zusammen, wie oben gezeigt.</p>
        `,
        exercisesAdd: [
          [49,36],[27,58],[38,47],[56,29],[64,18],[35,29],[48,37],[26,49],[57,34],[63,28],
          [19,46],[28,53],[37,45],[46,38],[55,27],[68,19],[29,64],[47,36],[58,25],[34,58],
          [24,68],[39,27],[46,29],[58,36],[27,45]
        ],
        preview: "Morgen lernst du einen zweiten Trick für die Addition mit Zehnerübergang: den Ausgleichstrick.",
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
        parentNote: "Heute lernt dein Kadett einen zweiten cleveren Weg, um mit Zehnerübergang zu rechnen: den Ausgleichstrick. Zwei Wege zum gleichen Ziel zu kennen, macht selbstbewusst – dein Kind darf sich später aussuchen, welcher Trick ihm leichter fällt.",
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
        preview: "Morgen lernst du einen neuen Trick — diesmal für die Subtraktion: den Ergänzungstrick.",
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
        parentNote: "Nach der Addition kommt heute die Subtraktion dazu – mit dem Ergänzungstrick, extra für Aufgaben wie 64 – 28. Genau diese Art von Aufgaben bereitet vielen Kindern in der 2. Klasse Kopfzerbrechen. Heute übt dein Kadett gezielt genau das, bis es sitzt.",
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
        preview: "Morgen wartet die große Freitags-Endboss-Challenge — eine Mischung aus Addition und Subtraktion, alles, was diese Woche geübt wurde!",
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
        parentNote: "Freitag heißt: alles noch einmal zeigen, was diese Woche gelernt wurde – und dann die große Endboss-Challenge! Dein Kadett hat drei clevere Rechentricks im Gepäck und darf heute stolz beweisen, wie sicher er sie schon beherrscht. Ein Wochenabschluss, auf den man wirklich stolz sein kann.",
        theoryTitle: "Rückblick: Eine ganze Woche Rechentricks",
        theoryHtml: `
          <p>Diese Woche hat dein Kadett gelernt:</p>
          <ul>
            <li>Addition <strong>ohne</strong> Zehnerübergang als sichere Grundlage</li>
            <li>Die <strong>stellenweise Addition</strong> für die Addition mit Zehnerübergang</li>
            <li>Den <strong>Ausgleichstrick</strong> als zweite Additions-Methode</li>
            <li>Den <strong>Ergänzungstrick</strong> für die Subtraktion mit Zehnerübergang</li>
          </ul>
          <p>Heute wird alles noch einmal gemischt geübt — und dann wartet die Endboss-Challenge!</p>
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
        },
        bonus: {
          title: "✨ Einblick 3. Klasse (Bonus, freiwillig)",
          html: `<p>Diese Woche hast du 1/2, 1/4 und 1/3 kennengelernt — und weißt jetzt, dass 1/2
          genauso groß ist wie 2/4. Heute lernst du, wie man Brüche mit dem <strong>gleichen Nenner</strong>
          einfach <strong>zusammenrechnet</strong>.</p>
          <div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;margin:14px 0;">
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">1/4</p>
            </div>
            <div style="text-align:center;font-size:32px;color:#6b7280;">+</div>
            <div style="text-align:center;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="#2563eb" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
                <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#dbeafe" stroke="#1f2937" stroke-width="2"/>
              </svg>
              <p style="font-size:13px;">1/4</p>
            </div>
            <div style="text-align:center;font-size:32px;color:#6b7280;">=</div>
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
          <p>Wenn der Nenner (die untere Zahl) gleich bleibt, addiert man einfach die Zähler (die
          oberen Zahlen): <strong>1/4 + 1/4 = 2/4</strong>. Und 2/4 kennst du schon — das ist dasselbe wie 1/2!</p>
          <p>Übung (freiwillig): Was ergibt 1/4 + 2/4?</p>
          <p style="font-size:13px;color:#6b7280;">Lösung: 3/4.</p>`
        }
      }
    }
  },

  deutsch: {
    color: "var(--color-deutsch)",
    label: "Deutsch",
    days: {
      day1: {
        parentNote: "Heute lernt dein Kadett, wie man Nomen sicher erkennt – mit zwei kleinen Proben, die in der 2. Klasse fest dazugehören. Wer diese Proben einmal verinnerlicht hat, hat ein Werkzeug für die ganze Grundschulzeit. Ein schöner, klarer Einstieg in die Grammatik.",
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
        parentNote: "Nach den Nomen kommt heute die nächste Wortart dazu: Verben, erkannt mit der Ich-Probe und der Veränder-Probe. Zwei Wortarten unterscheiden zu können, ist die Grundlage für fast jede Grammatikregel, die noch folgt. Dein Kadett baut sich gerade sein sprachliches Handwerkszeug auf.",
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
        parentNote: "Heute wird das Bild komplett: Adjektive, erkannt mit der Wie-Probe. Damit kennt dein Kind ab heute alle drei wichtigen Wortarten der 2. Klasse. Ein echter Grund, stolz zu sein.",
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
        parentNote: "Jetzt kommt der spannende Teil: Nomen, Verben und Adjektive gemischt erkennen. Dein Kadett muss sich bei jedem Wort neu entscheiden – genau das macht aus Wissen echtes Können. So wird Grammatik zu etwas, das dein Kind einfach kann, lebendig und alltagstauglich.",
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
        parentNote: "Freitag: noch einmal alles zeigen, was diese Woche an Wortarten gelernt wurde. Dein Kadett hat sich in dieser Woche ein komplettes Grundgerüst für die 2. Klasse aufgebaut. Zeit für einen verdienten Wochenabschluss.",
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
        parentNote: "Heute liest dein Kadett die Geschichte vom mutigen Tiger Rufus – laut, in seinem eigenen Tempo. Lautes Vorlesen übt nicht nur die Aussprache, sondern auch, den Sinn eines Textes wirklich zu verstehen. Und ganz nebenbei erzählt die Geschichte, wie schön es ist, anderen zu helfen.",
        theoryTitle: "Der mutige Tiger",
        theoryHtml: `
          <p>Im dichten Dschungel lebte ein junger Tiger namens Rufus. Rufus hatte ein besonderes
          Streifenmuster: Auf seinem Rücken sah man ein kleines Herz aus Streifen. Die anderen Tiere
          im Dschungel nannten ihn deshalb "Herz-Tiger". Rufus war stolz auf sein Muster, aber noch
          stolzer war er darauf, dass er allen Tieren im Dschungel half, wenn sie in Schwierigkeiten
          steckten.</p>
          <p>Eines Morgens hörte Rufus ein lautes Piepen. Zuerst dachte er, es wäre nur der Wind, der
          durch die Blätter strich. Doch das Piepen wurde lauter und klang immer verzweifelter. Rufus
          folgte dem Geräusch durch dichtes Gebüsch, über einen umgestürzten Ast und vorbei an einem
          kleinen Bach, bis er zu einem tiefen Loch im Boden kam. Dort saß ein kleiner bunter Papagei
          fest. Der Papagei hieß Coco und konnte nicht mehr herausfliegen, weil sein Flügel wehtat.</p>
          <p>"Bitte hilf mir!", rief Coco mit zitternder Stimme. "Ich bin beim Landen abgerutscht und
          in dieses Loch gefallen."</p>
          <p>Rufus überlegte kurz, wie er helfen könnte. Dann legte er sich flach auf den Bauch und
          streckte seine Pfote so weit wie möglich in das Loch. "Halt dich an meiner Pfote fest!", rief
          er Coco zu. Der kleine Papagei krallte sich mit seinen Füßen an Rufus' Pfote fest. Ganz
          langsam und vorsichtig zog Rufus ihn nach oben, Stück für Stück, bis Coco endlich wieder
          festen Boden unter den Krallen hatte.</p>
          <p>Endlich war Coco gerettet! Er saß sicher auf einem Ast und bedankte sich immer wieder.
          "Danke, Rufus! Du bist der mutigste und stärkste Tiger im ganzen Dschungel!"</p>
          <p>Rufus lächelte bescheiden. "Jeder hätte das getan", sagte er, aber innerlich war er sehr
          stolz, dass er Coco helfen konnte. Von diesem Tag an waren Rufus und Coco die besten Freunde.
          Sie trafen sich jeden Morgen am großen Wasserfall, erzählten sich Geschichten, und Coco
          erzählte allen anderen Tieren stolz von seinem Freund, dem Herz-Tiger, der ihm das Leben
          gerettet hatte.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Wie heißt der Tiger in der Geschichte? <span class="star">⭐</span></li>
            <li>Was ist das Besondere an Rufus' Streifenmuster? <span class="star">⭐</span></li>
            <li>Wer saß in dem Loch fest? <span class="star">⭐</span></li>
            <li>Warum konnte Coco nicht herausfliegen? <span class="star">⭐</span></li>
            <li>Wie hat Rufus Coco gerettet? <span class="star">⭐</span></li>
            <li>Was hat Coco zu Rufus gesagt, nachdem er gerettet wurde? <span class="star">⭐</span></li>
            <li>Wo treffen sich Rufus und Coco jetzt jeden Morgen? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Was könnten Rufus und Coco als Nächstes gemeinsam erleben?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Rufus · 2. Ein kleines Herz aus Streifen · 3. Der Papagei Coco · 4. Weil sein Flügel
          wehtat · 5. Er streckte seine Pfote ins Loch und zog Coco vorsichtig hoch · 6. "Danke, Rufus!
          Du bist der mutigste und stärkste Tiger im ganzen Dschungel!" · 7. Am großen Wasserfall</p>
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
        parentNote: "Die kluge Schlange Kiara zeigt heute, wie man einen Streit klug lösen kann. Nach dem Lesen warten Verständnisfragen und eine kleine Schreibaufgabe – eine schöne Gelegenheit für ein Gespräch über eigene Streitigkeiten. Lesen und Nachdenken gehen hier Hand in Hand.",
        theoryTitle: "Kiara, die kluge Schlange",
        theoryHtml: `
          <p>Kiara war eine grüne Schlange, die im hohen Gras der Dschungel-Insel lebte. Anders als
          viele andere Schlangen war Kiara nicht gefährlich — sie ernährte sich nur von kleinen
          Insekten und mochte es, den anderen Tieren zuzuhören und ihnen bei ihren Problemen zu
          helfen. Am liebsten lag sie in der warmen Mittagssonne auf einem flachen Stein und
          beobachtete, wie das Leben auf der Dschungel-Insel an ihr vorbeizog.</p>
          <p>Eines Tages hörte Kiara ein lautes Streitgespräch am Flussufer. Der Affe Momo und der
          Frosch Felix stritten sich um den schönsten Platz am Fluss, direkt unter einem schattigen
          Baum. "Ich war zuerst hier!", rief Momo und stampfte mit dem Fuß auf. "Nein, ich!", rief
          Felix zurück und blies wütend seine Backen auf. Die beiden stritten schon eine ganze Weile,
          und keiner wollte nachgeben. Sogar die Vögel in den Bäumen über ihnen wurden unruhig von
          dem lauten Gezank.</p>
          <p>Kiara schlängelte sich neugierig näher heran und beobachtete die beiden eine Zeit lang,
          bevor sie sich einmischte. "Warum teilt ihr euch den Platz nicht einfach?", schlug sie
          schließlich vor. "Morgens, wenn die Sonne noch nicht so heiß ist, kann Momo dort sitzen und
          die kühle Luft genießen. Und nachmittags, wenn es heißer wird, ist Felix an der Reihe und
          kann sich im Schatten abkühlen."</p>
          <p>Momo und Felix schauten sich überrascht an. Das war eine wirklich gute Idee, auf die sie
          selbst nicht gekommen waren! Sie bedankten sich bei Kiara und vertrugen sich sofort wieder.
          Zur Feier des Tages verbrachten sie den restlichen Nachmittag gemeinsam am Fluss, planschten
          im seichten Wasser und lachten über ihren albernen Streit. Von diesem Tag an fragten die
          Tiere im Dschungel immer öfter die kluge Schlange Kiara um Rat, wenn sie sich stritten oder
          nicht weiterwussten.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Welche Farbe hat die Schlange Kiara? <span class="star">⭐</span></li>
            <li>Wovon ernährt sich Kiara? <span class="star">⭐</span></li>
            <li>Worüber haben sich Momo und Felix gestritten? <span class="star">⭐</span></li>
            <li>Welchen Vorschlag hat Kiara gemacht? <span class="star">⭐</span></li>
            <li>Was passiert seitdem, wenn sich die Tiere streiten? <span class="star">⭐</span></li>
            <li>Wie haben Momo und Felix auf Kiaras Vorschlag reagiert? <span class="star">⭐</span></li>
            <li>Warum ist der Platz morgens und nachmittags unterschiedlich angenehm? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Wie würdest du einen Streit zwischen zwei Freunden schlichten?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Grün · 2. Von kleinen Insekten · 3. Um den schönsten Platz am Fluss · 4. Sich den Platz
          zu teilen (morgens Momo, nachmittags Felix) · 5. Die Tiere fragen Kiara öfter um Rat · 6. Sie
          waren überrascht, fanden die Idee gut und vertrugen sich sofort · 7. Weil es morgens kühler
          und nachmittags heißer ist</p>
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
        parentNote: "Heute ist die Geschichte etwas länger: Karl das Krokodil zeigt, dass man niemanden nach dem ersten Eindruck beurteilen sollte. Genau diese Länge tut gut – dein Kind übt sich in Ausdauer beim Zuhören und Lesen. Eine Geschichte mit einer schönen Botschaft.",
        theoryTitle: "Das schlaue Krokodil",
        theoryHtml: `
          <p>Am Flussufer der Dschungel-Insel lebte ein altes Krokodil namens Karl. Karl lag den
          ganzen Tag reglos im Wasser und sah aus wie ein alter, moosbedeckter Ast. Viele Tiere hatten
          großen Respekt vor ihm, denn Krokodile haben kräftige Zähne und einen langen Schwanz, mit dem
          sie kräftig schlagen können. Die meisten Tiere schwammen deshalb lieber weit um Karl herum.
          Schon seit vielen Jahren lebte er an dieser Stelle des Flusses und kannte jede Strömung und
          jeden glatten Stein unter der Wasseroberfläche ganz genau.</p>
          <p>Eines Tages wollte der kleine Frosch Felix unbedingt über den Fluss springen, um seine
          Familie auf der anderen Seite zu besuchen. Doch die Strömung war an diesem Tag viel zu stark
          und die Wellen schlugen hoch. "Oh nein, wie komme ich nur ans andere Ufer?", rief Felix
          verzweifelt und blickte ängstlich auf das reißende Wasser.</p>
          <p>Karl, das Krokodil, hob langsam seinen Kopf aus dem Wasser. "Ich kann dir helfen", sagte
          er mit ruhiger, tiefer Stimme. "Spring auf meinen Rücken, ich bringe dich sicher hinüber." Der
          kleine Frosch erschrak zunächst, denn er hatte noch nie mit einem Krokodil gesprochen, und
          sein Herz klopfte bis zum Hals.</p>
          <p>Felix zögerte lange und schaute unsicher zwischen dem reißenden Fluss und dem großen
          Krokodil hin und her. Aber Karls Augen wirkten freundlich und geduldig, ganz anders, als
          Felix es sich vorgestellt hatte. Schließlich fasste er sich ein Herz und sprang auf den
          breiten, schuppigen Rücken des Krokodils. Karl schwamm ganz langsam und vorsichtig gegen
          die starke Strömung ans andere Ufer, damit Felix nicht herunterrutschte. Mitten im Fluss
          spritzte eine hohe Welle über sie hinweg, und Felix klammerte sich fest an eine der harten
          Rückenschuppen. "Halt dich einfach gut fest, ich lasse dich nicht fallen", brummte Karl
          beruhigend. Endlich kam Felix sicher an und sprang erleichtert von Karls Rücken auf das
          trockene Ufer.</p>
          <p>"Danke, Karl! Ich hatte solche Angst vor dir, aber du bist gar nicht gefährlich!", sagte
          Felix erstaunt und schüttelte sich das Wasser aus den Augen. Karl lächelte müde. "Nicht
          jedes Tier, das gefährlich aussieht, ist auch böse", antwortete er weise, "und manchmal
          lohnt es sich, genauer hinzuschauen, bevor man jemanden fürchtet." Felix nickte nachdenklich
          und versprach, bald mit seiner ganzen Familie wiederzukommen, um Karl richtig
          kennenzulernen.</p>
          <p>Am Abend erzählte Felix allen Fröschen in seiner Familie von seinem neuen Freund am
          Fluss. Zuerst wollte ihm niemand glauben, dass ausgerechnet das gefürchtete Krokodil so
          freundlich sein sollte — aber schon am nächsten Tag besuchten sie Karl gemeinsam, und von
          diesem Tag an hatte Karl viele neue Freunde am Fluss. Er musste nie wieder ganz allein wie
          ein moosbedeckter Ast im Wasser liegen.</p>
        `,
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">📋 Verständnisfragen</h4>
          <ol class="exercise-list">
            <li>Wie heißt das Krokodil in der Geschichte? <span class="star">⭐</span></li>
            <li>Warum haben viele Tiere Angst vor Karl? <span class="star">⭐</span></li>
            <li>Welches Problem hatte der Frosch Felix? <span class="star">⭐</span></li>
            <li>Wie hat Karl Felix geholfen? <span class="star">⭐</span></li>
            <li>Was hat Felix am Ende über Karl gelernt? <span class="star">⭐</span></li>
            <li>Warum wollte Felix überhaupt auf die andere Seite des Flusses? <span class="star">⭐</span></li>
            <li>Warum ist Karl besonders langsam und vorsichtig geschwommen? <span class="star">⭐</span></li>
          </ol>
          <h4 style="font-family:var(--font-fun);">✍️ Schreibübung</h4>
          <p>Schreibe 2–3 eigene Sätze: Warum sollte man nicht vorschnell über andere urteilen?</p>
        `,
        solutionHtml: `
          <p><strong>Verständnisfragen:</strong></p>
          <p>1. Karl · 2. Weil Krokodile kräftige Zähne haben · 3. Er wollte über den Fluss, aber die
          Strömung war zu stark · 4. Er trug Felix sicher auf seinem Rücken ans andere Ufer · 5. Dass
          nicht jedes gefährlich aussehende Tier auch böse ist · 6. Er wollte seine Familie auf der
          anderen Seite besuchen · 7. Damit Felix nicht von seinem Rücken herunterrutscht</p>
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
        parentNote: "Ein Sturm zieht über den Dschungel – und alle Freunde helfen zusammen, ein neues Nest zu bauen. Frag dein Kind danach ruhig, welches Tier ihm am besten beim Helfen gefallen hat. Zusammenhalt macht eben stark, auch in Geschichten.",
        theoryTitle: "Der Sturm im Dschungel",
        theoryHtml: `
          <p>Eines Nachmittags verdunkelte sich plötzlich der Himmel über der Dschungel-Insel. Dicke
          graue Wolken zogen heran, der Wind wurde von Minute zu Minute stärker, und schon bald zog
          ein heftiger Sturm über den Dschungel. Die Bäume bogen sich unter den Windböen, Blätter
          wirbelten durch die Luft, und dicke Äste brachen krachend von den Ästen ab. Mitten in diesem
          Chaos fiel Cocos Nest aus seinem Baum herunter und zerbrach am Boden in viele Einzelteile.
          Der kleine Papagei saß nass und zitternd daneben und war ganz verzweifelt: "Wo soll ich jetzt
          nur schlafen?"</p>
          <p>Rufus der Tiger hörte Cocos verzweifelte Rufe durch den Wind und lief sofort los, um seine
          Freunde zusammenzutrommeln: Momo den Affen, Kiara die Schlange und Karl das Krokodil. Der
          Regen prasselte inzwischen so stark, dass Rufus kaum die Augen offenhalten konnte, aber er
          gab nicht auf, bis alle vier zusammengefunden hatten. "Wir bauen Coco gemeinsam ein neues
          Nest!", schlug er vor, und alle waren sofort einverstanden — schließlich war Coco einer von
          ihnen, und im Sturm hilft man sich gegenseitig.</p>
          <p>Jeder half auf seine eigene Weise mit: Momo kletterte flink von Baum zu Baum, obwohl die
          Äste im Wind hin und her schwankten, und sammelte starke, biegsame Zweige ein. Kiara flocht
          sie geschickt mit langen Grashalmen zu einem festen Geflecht zusammen, wobei sie sich immer
          wieder um die dünneren Äste schlängelte, damit alles gut hielt. Karl trug die schwersten und
          dicksten Zweige mit seinem kräftigen Schwanz heran, weil er der Stärkste von allen war, und
          watete dafür sogar mehrmals durch die aufgewühlten Pfützen am Fuß des Baumes. Rufus behielt
          währenddessen alles im Blick, gab Anweisungen und passte genau auf, dass jedes Teil sicher
          und fest befestigt wurde, bevor das nächste dazukam.</p>
          <p>Nach einer ganzen Stunde harter Arbeit war das neue Nest endlich fertig — und es war sogar
          stabiler und gemütlicher als das alte! Coco hüpfte vor Freude von einem Fuß auf den anderen
          und war überglücklich: "Danke, dass ihr alle geholfen habt! Allein hätte ich das niemals so
          schnell geschafft."</p>
          <p>Rufus lächelte zufrieden und legte seine Pfote sanft auf Cocos Schulter. "Dafür sind
          Freunde da. Gemeinsam schaffen wir alles — auch die größten Stürme können uns nichts
          anhaben."</p>
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
        parentNote: "Die letzte Geschichte der Woche bringt noch einmal alle Freunde zusammen. Ein schöner Anlass, um mit deinem Kind zurückzublicken: Welche Geschichte hat am besten gefallen? So bleibt die ganze Woche noch etwas länger in Erinnerung.",
        theoryTitle: "Der Schatz der Dschungel-Insel",
        theoryHtml: `
          <p>Am letzten Tag der Woche versammelten sich alle Freunde am großen Wasserfall: Rufus der
          Tiger, Momo der Affe, Kiara die Schlange, Karl das Krokodil und Coco der Papagei. Die Sonne
          schien golden durch die Blätter, und alle waren aufgeregt, denn Coco hatte eine Neuigkeit
          angekündigt.</p>
          <p>"Ich habe eine alte Schriftrolle gefunden", verkündete Coco aufgeregt und breitete sie
          vor den anderen auf einem flachen Stein aus. Er hatte sie ganz zufällig zwischen zwei
          Steinen versteckt entdeckt, als er nach einer neuen Futterstelle gesucht hatte. Darauf stand
          eine Schatzkarte mit krummen Linien und einem großen roten Kreuz, die zu einer geheimen
          Höhle hinter dem Wasserfall führte. "Wollen wir zusammen nachsehen, was sich dort
          verbirgt?", fragte Coco aufgeregt, und alle nickten begeistert. Niemand von ihnen hatte
          bisher gewusst, dass es hinter dem tosenden Wasserfall überhaupt eine Höhle gab.</p>
          <p>Gemeinsam folgten sie der Karte durch den dichten Dschungel. Der Weg war nicht leicht,
          und jeder musste mit seinen eigenen Stärken helfen: Rufus schob mit aller Kraft einen
          schweren Stein zur Seite, der den Pfad versperrte. Karl half allen dabei, sicher durch den
          reißenden Fluss zu schwimmen, indem er sie nacheinander auf seinem Rücken ans andere Ufer
          trug. Momo kletterte flink durch einen schmalen Felsspalt, den kein anderes Tier erreichen
          konnte, und Kiara schlängelte sich geschmeidig durch die allerletzte, besonders enge Stelle
          direkt vor dem Eingang der Höhle.</p>
          <p>Endlich standen alle gemeinsam vor dem Eingang, außer Atem, aber überglücklich, es
          gemeinsam bis hierher geschafft zu haben. In der Höhle fanden sie keinen Goldschatz —
          sondern eine ganze Wand voller funkelnder Kristalle, die im hereinfallenden Licht
          schimmerten wie tausend kleine Sterne. Manche Kristalle leuchteten blau, andere violett
          oder golden, je nachdem, wie das Licht des Wasserfalls durch die Öffnung fiel. Alle staunten
          lange sprachlos über den wunderschönen Anblick, bevor Coco die Stille brach.</p>
          <p>"Der wahre Schatz ist, dass wir das alles gemeinsam entdeckt haben", sagte Rufus lächelnd
          und schaute in die Runde seiner Freunde. Momo nickte zustimmend und meinte, dass sie ohne
          Karls Hilfe niemals über den Fluss gekommen wären, und Kiara fügte hinzu, dass jeder von
          ihnen auf seine eigene Weise unersetzlich gewesen war. Alle waren sich einig: Das war der
          schönste Schatz, den man sich vorstellen konnte — schöner als jedes Gold. Bevor sie sich auf
          den Heimweg machten, versprachen sich die fünf Freunde, im nächsten Jahr wieder gemeinsam
          hierher zurückzukehren.</p>
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
        parentNote: "Heute startet dein Kadett mit einem vollwertigen Englisch-Kapitel: Wortschatz, Rollenspiel, Lied und Suchbild, alles rund ums Dschungel-Thema. Singen, sprechen und schreiben zugleich – so bleiben neue Wörter am besten hängen. Ein rundum gelungener Einstieg.",
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
            <tr><td>tiger / parrot</td><td>Tiger / Papagei</td></tr>
          </table>
          <p><strong>Satzmuster zum Üben:</strong><br>
          "I am Mika." · "I am 7 years old." · "I have a snake." · "I like monkeys." · "I like tigers."</p>
        `,
        roleplay: {
          title: "🎭 Rollenspiel-Dialog",
          html: `
            <p><strong>A:</strong> Hello! My name is Mika. What is your name?<br>
            <strong>B:</strong> Hello! My name is Tilly.<br>
            <strong>A:</strong> How old are you?<br>
            <strong>B:</strong> I am 100 years old! And you?<br>
            <strong>A:</strong> I am 7 years old. I have a pet snake. I like monkeys!<br>
            <strong>B:</strong> I like frogs! Do you like tigers?<br>
            <strong>A:</strong> Yes, I like tigers! And I like the parrot too.<br>
            <strong>B:</strong> Me too! Nice to meet you, Mika!</p>
            <p style="font-size:13px;color:#6b7280;">Spielt den Dialog zusammen — ein Elternteil kann die
            Rolle von "B" übernehmen. <strong>Wiederholt den Dialog danach noch 2-3 Mal</strong> und tauscht
            dabei Tiere, Namen und Zahlen aus — das festigt den Wortschatz spielerisch und macht aus dem
            kurzen Text eine richtige Sprechübung.</p>
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
          pairs: [["lion","🦁"],["monkey","🐒"],["elephant","🐘"],["snake","🐍"],["frog","🐸"],["tiger","🐯"],["parrot","🦜"]],
          solution: "lion🦁 · monkey🐒 · elephant🐘 · snake🐍 · frog🐸 · tiger🐯 · parrot🦜"
        },
        exerciseHtml: `
          <h4 style="font-family:var(--font-fun);">✏️ Ergänze die Sätze</h4>
          <p>Fülle die Lücken mit dem passenden englischen Wort:</p>
          <ol class="exercise-list">
            <li>Hello! I ___ Mika. (bin/heiße) <span class="star">⭐</span></li>
            <li>I am ___ years old. (deine eigene Zahl) <span class="star">⭐</span></li>
            <li>I ___ a pet snake. (habe) <span class="star">⭐</span></li>
            <li>I ___ monkeys and tigers. (mag) <span class="star">⭐</span></li>
            <li>___! What is your name? (Hallo) <span class="star">⭐</span></li>
          </ol>
        `,
        solutionHtml: `
          <p>1. am · 2. (individuelle Antwort) · 3. have · 4. like · 5. Hello</p>
        `,
        preview: "Morgen bauen wir auf 'I have' und 'I like' auf und lernen Farbwörter dazu."
      },
      day2: {
        parentNote: "Weiter geht's mit Farbwörtern, aufbauend auf „I have“ und „I like“ von gestern. So wächst der Wortschatz Tag für Tag, während das Satzmuster von gestern einfach weiterverwendet wird. Ein kleiner, aber wirkungsvoller Schritt.",
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
        parentNote: "Heute kommen Zahlen von 1 bis 10 und Familienwörter dazu. Damit kann dein Kadett schon bald die eigene Familie auf Englisch vorstellen – ein Wortschatz, der sofort im echten Leben nützlich ist.",
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
        parentNote: "Heute verbindet dein Kadett Zahlen und Farben zu kleinen, vollständigen Sätzen. Aus einzelnen Wörtern werden plötzlich echte Aussagen – ein Moment, in dem viele Kinder das erste Mal merken: Ich kann schon richtig Englisch sprechen!",
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
          pairs: [["three green frogs","🐸🐸🐸"],["two yellow snakes","🐍🐍"],["one brown monkey","🐒"],["four blue birds","🐦🐦🐦🐦"]],
          solution: "three green frogs🐸🐸🐸 · two yellow snakes🐍🐍 · one brown monkey🐒 · four blue birds🐦🐦🐦🐦"
        },
        preview: "Morgen gibt es die große Endboss-Challenge — auch auf Englisch wird es spannend!"
      },
      day5: {
        parentNote: "Freitag heißt: alles aus der Woche in einem fröhlichen Abschluss-Song. Ein Lied bleibt oft noch tagelang im Ohr – der perfekte Weg, die Woche mit einem Lächeln zu beenden.",
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
        parentNote: "Heute lernt dein Kadett den Steckbrief kennen – eine feste Struktur, die ab jetzt bei jedem neuen Tier wiederkehrt. Dieses Muster hilft, Wissen zu ordnen, und wird ihm noch oft in der Schule begegnen. Ein kluger Start in eine ganze Tierreihe.",
        theoryTitle: "Der Tier-Steckbrief: Der Tiger",
        theoryHtml: `
          <p>Ein Steckbrief beschreibt ein Tier immer nach demselben Muster — das macht es leicht,
          Tiere zu vergleichen:</p>
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐯</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>Dschungel und Wälder in Asien</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser (Raubtier): jagt Hirsche und Wildschweine</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Jeder Tiger hat ein einzigartiges Streifenmuster — wie ein Fingerabdruck</td></tr>
            <tr><th>Fortpflanzung</th><td>2–4 Jungtiere, blind geboren, bleiben ca. 2 Jahre bei der Mutter</td></tr>
          </table>
          </div>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Elefanten",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Savannen und Wälder in Afrika und Asien · Pflanzenfresser: frisst Gräser,
          Blätter und Früchte · Wildtier · Größtes Landtier der Welt, greift mit dem Rüssel · Babys
          wiegen schon ca. 100 kg und bleiben viele Jahre bei der Mutter</em></p>
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐘</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>________________________________________</td></tr>
            <tr><th>Nahrung</th><td>________________________________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>________________________________________</td></tr>
            <tr><th>Besonderheit</th><td>________________________________________</td></tr>
            <tr><th>Fortpflanzung</th><td>________________________________________</td></tr>
          </table>
          </div>
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
        parentNote: "Ein zweites Dschungeltier – und heute darf dein Kadett den Steckbrief schon ganz allein ausfüllen. Das ist ein schöner Moment, um zu sehen, wie sicher die Struktur von gestern schon sitzt.",
        theoryTitle: "Der Tier-Steckbrief: Der Affe",
        theoryHtml: `
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐵</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>Regenwälder und Dschungel weltweit</td></tr>
            <tr><th>Nahrung</th><td>Allesfresser: Früchte, Blätter, manchmal auch Insekten</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Kann mit Händen und Füßen gleichzeitig greifen — ein sehr geschickter Kletterer</td></tr>
            <tr><th>Fortpflanzung</th><td>Meist ein Junges, das sich lange am Bauch der Mutter festhält</td></tr>
          </table>
          </div>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für die Schlange",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Wälder, Wüsten und Wiesen weltweit · Fleischfresser: verschluckt kleine
          Tiere im Ganzen · Wildtier · Hat keine Beine, bewegt sich wellenförmig, manche Arten sind giftig ·
          Die meisten Arten legen Eier</em></p>
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐍</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>________________________________________</td></tr>
            <tr><th>Nahrung</th><td>________________________________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>________________________________________</td></tr>
            <tr><th>Besonderheit</th><td>________________________________________</td></tr>
            <tr><th>Fortpflanzung</th><td>________________________________________</td></tr>
          </table>
          </div>
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
        parentNote: "Das dritte Tier dieser Woche – und dein Kadett füllt den Steckbrief schon richtig selbstständig aus. Mit jedem Tier wächst nicht nur das Wissen, sondern auch das Selbstvertrauen.",
        theoryTitle: "Der Tier-Steckbrief: Das Krokodil",
        theoryHtml: `
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐊</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>Flüsse und Seen in tropischen Regionen</td></tr>
            <tr><th>Nahrung</th><td>Fleischfresser: lauert im Wasser auf Beute</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Kann bis zu einer Stunde die Luft anhalten und unter Wasser bleiben</td></tr>
            <tr><th>Fortpflanzung</th><td>Legt Eier in einem Nest aus Pflanzen am Ufer</td></tr>
          </table>
          </div>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Papagei",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Tropische Regenwälder weltweit · Frisst Früchte, Samen und Nüsse ·
          Wildtier (manche Arten auch als Haustier gehalten) · Kann Wörter und Geräusche nachahmen ·
          Legt Eier in Baumhöhlen</em></p>
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🦜</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>________________________________________</td></tr>
            <tr><th>Nahrung</th><td>________________________________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>________________________________________</td></tr>
            <tr><th>Besonderheit</th><td>________________________________________</td></tr>
            <tr><th>Fortpflanzung</th><td>________________________________________</td></tr>
          </table>
          </div>
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
        parentNote: "Heute wird's gemütlich: Das Faultier zeigt, dass nicht jedes Tier schnell sein muss, um erfolgreich zu sein. Ein schöner Kontrast zu den flinken Tieren der letzten Tage.",
        theoryTitle: "Der Tier-Steckbrief: Das Faultier",
        theoryHtml: `
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🦥</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>Regenwälder in Mittel- und Südamerika</td></tr>
            <tr><th>Nahrung</th><td>Pflanzenfresser: frisst hauptsächlich Blätter</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>Wildtier</td></tr>
            <tr><th>Besonderheit</th><td>Bewegt sich extrem langsam und hängt die meiste Zeit kopfüber in Bäumen</td></tr>
            <tr><th>Fortpflanzung</th><td>Meist ein Junges, das sich am Bauch der Mutter festhält</td></tr>
          </table>
          </div>
        `,
        exerciseTitle: "✏️ Praxis: Erstelle den Steckbrief für den Leoparden",
        exerciseHtml: `
          <p>Setze die passenden Satzteile aus dem Wortspeicher an die richtige Stelle:</p>
          <p><em>Wortspeicher: Savannen und Wälder in Afrika und Asien · Fleischfresser: jagt vor allem
          nachts · Wildtier · Kann sein Fleisch-Beute auf Bäume tragen, um sie vor anderen Räubern zu
          schützen · 2–3 Junge, die gut versteckt aufwachsen</em></p>
          <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
          <div style="font-size:64px;flex-shrink:0;">🐆</div>
          <table class="milestone-table" style="flex:1;min-width:260px;">
            <tr><th>Lebensraum</th><td>________________________________________</td></tr>
            <tr><th>Nahrung</th><td>________________________________________</td></tr>
            <tr><th>Wildtier oder Haustier</th><td>________________________________________</td></tr>
            <tr><th>Besonderheit</th><td>________________________________________</td></tr>
            <tr><th>Fortpflanzung</th><td>________________________________________</td></tr>
          </table>
          </div>
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
        parentNote: "Freitag heißt: ein spannendes „Wer bin ich?“-Rätsel über alle Tiere der Woche. So merkt dein Kadett oft selbst gar nicht, wie viel er diese Woche schon gelernt hat – das Quiz macht's sichtbar.",
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
        parentNote: "Nach dem Lernen darf heute richtig getobt werden – Bewegung passend zum Dschungel-Thema. Kleine Pausen wie diese tun gut und machen den Kopf frei für die nächste Aufgabe.",
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
        parentNote: "Heute wird gerannt und getobt – ein actionreicher Gegenpol zum ruhigen Tag von gestern. Genau dieser Wechsel macht Bewegung so richtig spannend.",
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
        parentNote: "Ein ruhigerer Tag nach zwei energiegeladenen Runden: Dschungel-Yoga sorgt für Entspannung. Auch Ruhe darf mal geübt werden.",
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
        parentNote: "Ein Versteckspiel mit Dschungel-Dreh – heute darf viel gelacht werden. Gemeinsames Lachen gehört einfach zu einer schönen Ferienwoche dazu.",
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
        parentNote: "Freitag heißt: die große Dschungel-Olympiade mit allen Lieblingsspielen der Woche. Ein motivierender Abschluss für einen richtig fitten Kadetten.",
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
        guide: "Lies deinem Forscherkind heute die Geschichte gemütlich vor, am besten im neuen „Dschungel-Lager“. Betone beim Vorlesen, wie mutig Tilly am Ende ist. Solche gemeinsamen Vorlesemomente bleiben oft ein Leben lang in Erinnerung.",
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
        guide: "Heute geht es um Teamarbeit: Tilly und Momo finden gemeinsam eine Lösung. Betone das beim Vorlesen ruhig extra – es ist eine schöne kleine Botschaft fürs Leben.",
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
        guide: "Ein neuer Freund kommt dazu: der ängstliche Coco. Zeig beim Vorlesen, wie freundlich Tilly und Momo ihm begegnen – Kinder lernen von solchen Vorbildern oft mehr als von jeder Ermahnung.",
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
        guide: "Ein Gewitter kann kleinen Kindern Angst machen – lies diesen Teil besonders liebevoll und beruhigend vor. So meistert dein Forscherkind die Geschichte gemeinsam mit Tilly und ihren Freunden.",
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
        guide: "Die letzte Geschichte bringt alle Freunde noch einmal zusammen – ein fröhlicher Abschluss. Frag dein Forscherkind danach, welcher Moment der Woche am schönsten war.",
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
        guide: "Klatscht heute gemeinsam die Silben der Tierwörter – laut und mit viel Übertreibung. Genau dieses Spiel schärft ganz nebenbei das Ohr für Sprache.",
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
        guide: "Reime machen heute Spaß und schulen das Ohr für Sprache. Sprecht die Reimpaare gemeinsam nach – ein kleines Spiel mit großer Wirkung.",
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
        guide: "Ein Sortierspiel: Dein Forscherkind lernt, Dinge nach Kategorien zu ordnen. So einfach das klingt – es ist ein wichtiger Baustein, um die Welt zu verstehen.",
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
        guide: "Gegensätze werden heute mit Bewegung verbunden – das bleibt besonders gut im Kopf. Je mehr Körpereinsatz, desto mehr Spaß und desto mehr bleibt hängen.",
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
        guide: "Freitag heißt: ein fröhliches Abschlussspiel, das alles aus der Woche noch einmal aufgreift. Du wirst überrascht sein, wie viel Sprachgefühl dein Forscherkind diese Woche schon aufgebaut hat.",
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
        guide: "Heute entdeckt dein Forscherkind kleine Mengen einfach als Bild im Kopf. Zeig beim Vorlesen auf die Matten und lass die Menge auf dein Kind wirken. So entsteht ganz nebenbei ein erstes Gefühl für Zahlen.",
        activityHtml: `
          <div class="card">
            <h3>🐒 Die Affen und ihre Matten</h3>
            <p><strong>Schau mal:</strong> Ein Affe liegt auf seiner Matte und macht ein Nickerchen.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Da kommt noch einer dazu</strong> und legt sich auf seine eigene Matte.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Und jetzt kommt noch einer!</strong> Jetzt liegen alle drei gemütlich nebeneinander in der Sonne.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p style="font-size:13.5px;color:#6b7280;">Bitte nicht (vor)zählen — einfach die Geschichte erzählen und
            auf die Matten zeigen. Zeig am Ende alle drei Bilder noch einmal und lass das Forscherkind darauf zeigen,
            wo die meisten Affen liegen.</p>
          </div>
        `
      },
      day2: {
        guide: "Die Affengruppe wächst heute bis auf fünf, Stück für Stück als Bild im Kopf. Dein Forscherkind übt, auch etwas größere Mengen auf einen Blick zu erfassen. Ein kleiner, aber wichtiger Schritt.",
        activityHtml: `
          <div class="card">
            <h3>🐒 Noch mehr Affen kommen dazu</h3>
            <p><strong>Heute kommen noch mehr Besucher!</strong> Ein Affe macht es sich auf seiner Matte gemütlich.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Ein zweiter Affe</strong> gesellt sich dazu.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Dann kommt ein dritter.</strong></p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Und noch einer!</strong> Jetzt sind es schon vier.</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p><strong>Zum Schluss kommt der letzte Affe dazu</strong> — jetzt ist die ganze Affenbande versammelt!</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">🐒</div>
          </div>
            <p style="font-size:13.5px;color:#6b7280;">Auch hier gilt: nicht zählen, einfach Bild für Bild anschauen
            und die wachsende Menge auf das Forscherkind wirken lassen.</p>
          </div>
        `
      },
      day3: {
        guide: "Heute geht es um Muster erkennen und fortsetzen – ganz spielerisch mit Farben und Formen. Wer Muster versteht, tut sich später mit Zahlenfolgen viel leichter. Lass dein Kind ruhig auch eigene Muster erfinden.",
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
        guide: "Formen im Alltag entdecken – beim Spazierengehen oder Zuhause umschauen. Kreis, Dreieck und Viereck überall wiederzufinden, macht Formen greifbar, lange bevor die Fachbegriffe wichtig werden.",
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
        guide: "Heute trainiert dein Kind eine besondere Fähigkeit: kleine Mengen auf einen Blick zu erkennen, ganz wie ein kleiner Rechenprofi. So entsteht Schritt für Schritt ein echtes Gefühl für Zahlen, das dein Kind später beim Rechnen enorm hilft. Eine clevere kleine Übung mit großer Wirkung.",
        activityHtml: `
          <div class="card">
            <h3>💎 Die große Schatzsuche</h3>
            <p><strong>Tief im Dschungel wartet ein Schatz!</strong> Versteckt 5 kleine Schätze (Knöpfe, Steine
            oder Perlen) im Zimmer, bevor ihr startet. Das Forscherkind sucht — und jeder gefundene Schatz
            kommt auf ein Schatztuch oder einen Teller.</p>
            <p><strong>Der erste Schatz ist gefunden!</strong></p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
          </div>
            <p><strong>Ein zweiter Schatz kommt dazu.</strong></p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
          </div>
            <p><strong>Und ein dritter!</strong></p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
          </div>
            <p><strong>Ein vierter Schatz taucht auf!</strong></p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
          </div>
            <p><strong>Und zum Schluss der fünfte Schatz</strong> — die ganze Schatzkiste ist komplett!</p>
            <div style="display:flex;gap:12px;margin:14px 0;">
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
            <div style="background:#fde68a;border-radius:10px;width:56px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px;">💎</div>
          </div>
            <p style="font-size:13.5px;color:#6b7280;">Bitte nicht zählen — einfach freuen, wenn ein neuer Schatz
            dazukommt, und am Ende alle fünf gemeinsam anschauen.</p>
            <p><strong>Und jetzt das Schatzspiel:</strong> "Zeig mir mal 3 von deinen Schätzen!" Das Forscherkind
            schiebt auf einen Blick drei Schätze beiseite, ohne zu zählen. Dann fragt ihr: "Und wie viele hast
            du da noch übrig?" — das Forscherkind schaut auf den kleinen Rest und erfasst die Menge direkt,
            ganz ohne nachzuzählen.</p>
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
        guide: "Heute wird gesungen und gezeigt – ganz entspannt und spielerisch. Zeig beim Singen auf das passende Tier, das macht die neuen Wörter lebendig. Genau so bleiben erste englische Wörter am längsten hängen.",
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
        guide: "Englische Zahlwörter, heute mit viel Bewegung verbunden. Je mehr Körpereinsatz, desto mehr Spaß – und desto besser bleiben die Wörter im Kopf.",
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
        guide: "Ein Ja/Nein-Ratespiel verbindet heute Farben und Größen der letzten Tage. Genau diese Wiederholung sorgt dafür, dass der Wortschatz wirklich hängen bleibt.",
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
        guide: "Big and small auf Englisch, wieder mit Bewegung verbunden. So ein einfaches Gegensatzpaar bleibt am besten im Gedächtnis, wenn der ganze Körper mitmacht.",
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
        guide: "Freitag heißt: ein fröhliches Abschluss-Lied mit Farben, Zahlen und Größen der Woche. Vielleicht summt dein Forscherkind es noch tagelang vor sich hin.",
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
        guide: "Erst das Ausmalbild, dann – wenn noch Lust ist – eine Bastelidee. Hier zählt einzig die Freude am eigenen Werk. Jedes Ergebnis ist genau richtig, so wie dein Kind es gestaltet.",
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
        guide: "Wieder erst Malen, dann Basteln – heute dreht sich alles um Momo. Diese kleine feste Struktur gibt deinem Forscherkind Sicherheit und Vorfreude.",
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
        guide: "Heute steht der bunte Papagei Coco im Mittelpunkt. Lass dein Forscherkind ruhig eigene Farben wählen, auch wenn sie in der Natur anders aussehen.",
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
        guide: "Heute wird gleich doppelt gebastelt: Krokodil Karl und das gemütliche Faultier. Zwei Techniken an einem Tag halten die Motivation richtig hoch.",
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
        guide: "Ein festliches Bastelprojekt für die große Abschlussfeier am Ende der Woche. Darauf darf dein Forscherkind zu Recht stolz sein.",
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
        guide: "Heute wird morgens ein kleines Experiment gestartet, das abends sein Geheimnis verrät: Wie trinkt eine Blume eigentlich? Die Vorfreude auf das Ergebnis ist oft das Schönste am ganzen Tag.",
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
        guide: "Schwimmt es oder sinkt es? Lasst euer Forscherkind vorher raten, bevor ihr es gemeinsam ausprobiert. Genau dieses Raten macht aus einem einfachen Versuch ein kleines Abenteuer.",
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
        guide: "Ein kleines Zauber-Experiment, das garantiert für strahlende Augen sorgt: tanzende Rosinen im Glas. Das Öffnen des Mineralwassers übernimmst du am besten selbst.",
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
        guide: "Passend zur Sturm-Geschichte von heute entsteht im Glas ein eigenes kleines Gewitter. Der Moment, in dem die Farbe herabtropft, sorgt garantiert für ein Staunen.",
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
        guide: "Zum großen Fest-Abschluss wartet das magischste Experiment der Woche: der Milch-Farben-Tanz. Ein wirklich schöner Schlusspunkt für eine ganze Woche voller kleiner Entdeckungen.",
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
