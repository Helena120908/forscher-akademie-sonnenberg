// Forscher-Akademie Sonnenberg — Navigation & Rendering

const contentEl = document.getElementById("content");
const printAreaEl = document.getElementById("printArea");

let currentRoute = "welcome";
let currentDay = 1;

const SESSION = { leoXP: 0, liliStars: 0 };

function updateSessionCounter() {
  const el = document.getElementById("sessionCounter");
  if (!el) return;
  el.innerHTML = `🦁 Kadett: <strong>${SESSION.leoXP} XP</strong> &nbsp;·&nbsp; 🐢 Forscherkind: <strong>${SESSION.liliStars} ⭐</strong>`;
}

function dayTabsHtml(subjectDays, color, activeDayNum) {
  let tabs = "";
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const key = "day" + d;
    const has = !!subjectDays[key];
    if (!has) {
      tabs += `<span class="day-tab locked">🔒 Tag ${d}</span>`;
    } else {
      const isActive = d === activeDayNum;
      const style = isActive ? `style="background:${color};"` : "";
      tabs += `<button class="day-tab${isActive ? " active" : ""}" ${style} onclick="goToDay(${d})">Tag ${d}</button>`;
    }
  }
  return `<div class="day-tabs">${tabs}</div>`;
}

function notYetHtml(label) {
  return `
    <div class="card" style="text-align:center;color:#9ca3af;">
      <p style="font-size:15px;">🔒 ${label} für diesen Tag kommt noch — schau bei Tag 1 vorbei, oder warte auf das nächste Update.</p>
    </div>
  `;
}

function renderLeoSubject(key) {
  const subject = LEO[key];
  const dayKey = "day" + currentDay;
  const color = subject.color;
  const day = subject.days[dayKey];

  const header = `
    <div class="subject-header">
      <span class="subject-badge" style="background:${color};">Kadett · ${subject.label}</span>
    </div>
    <h1 class="page-title">${subject.label}</h1>
    ${dayTabsHtml(subject.days, color, currentDay)}
  `;

  if (!day) return header + notYetHtml("Der Inhalt");

  let exercisesHtml = "";
  if (Array.isArray(day.exercises)) {
    exercisesHtml = `
      <ol class="exercise-list">
        ${day.exercises.map(([a,b]) => `<li>${a} − ${b} = ? <span class="star">⭐</span></li>`).join("")}
      </ol>
      <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">🙈 Lösungen anzeigen / verbergen</button>
      <div class="solutions">
        <ol class="exercise-list">
          ${day.exercises.map(([a,b]) => `<li>${a} − ${b} = <strong>${a-b}</strong></li>`).join("")}
        </ol>
      </div>
    `;
  } else if (Array.isArray(day.exercisesAdd)) {
    exercisesHtml = `
      <ol class="exercise-list">
        ${day.exercisesAdd.map(([a,b]) => `<li>${a} + ${b} = ? <span class="star">⭐</span></li>`).join("")}
      </ol>
      <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">🙈 Lösungen anzeigen / verbergen</button>
      <div class="solutions">
        <ol class="exercise-list">
          ${day.exercisesAdd.map(([a,b]) => `<li>${a} + ${b} = <strong>${a+b}</strong></li>`).join("")}
        </ol>
      </div>
    `;
  } else if (Array.isArray(day.exercisesMixed)) {
    exercisesHtml = `
      <ol class="exercise-list">
        ${day.exercisesMixed.map(([a,b,op]) => `<li>${a} ${op} ${b} = ? <span class="star">⭐</span></li>`).join("")}
      </ol>
      <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">🙈 Lösungen anzeigen / verbergen</button>
      <div class="solutions">
        <ol class="exercise-list">
          ${day.exercisesMixed.map(([a,b,op]) => `<li>${a} ${op} ${b} = <strong>${op === '+' ? a+b : a-b}</strong></li>`).join("")}
        </ol>
      </div>
    `;
  } else if (day.exercises && day.exercises.teil1) {
    exercisesHtml = Object.values(day.exercises).map(teil => `
      <h4 style="font-family:var(--font-fun);">${teil.title}</h4>
      <ol class="exercise-list">
        ${teil.items.map(i => `<li>${i} <span class="star">⭐</span></li>`).join("")}
      </ol>
      <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">🙈 Lösung anzeigen / verbergen</button>
      <div class="solutions">${teil.solution}</div>
    `).join("<hr style='border:none;border-top:2px dashed #e5e7eb;margin:20px 0;'>");
  } else if (day.exerciseHtml) {
    exercisesHtml = `
      ${day.exerciseHtml}
      <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">🙈 Lösung anzeigen / verbergen</button>
      <div class="solutions">${day.solutionHtml}</div>
    `;
  }

  let englischExtra = "";
  if (day.roleplay) {
    englischExtra += `<div class="card"><h3>${day.roleplay.title}</h3>${day.roleplay.html}</div>`;
  }
  if (day.song) {
    englischExtra += `<div class="card"><h3>${day.song.title}</h3>${day.song.html}</div>`;
  }
  if (day.puzzle) {
    englischExtra += `
      <div class="card">
        <h3>${day.puzzle.title}</h3>
        <table class="match-table">
          ${day.puzzle.pairs.map(([w,e]) => `<tr><td>${w}</td><td>?</td><td style="opacity:0;">${e}</td></tr>`).join("")}
        </table>
        <button class="toggle-btn" style="background:${color};" onclick="this.nextElementSibling.classList.toggle('visible')">Lösung anzeigen / verbergen</button>
        <div class="solutions">${day.puzzle.solution}</div>
      </div>
    `;
  }

  let bonusHtml = "";
  if (day.bonus) {
    bonusHtml = `<div class="card" style="border-color:var(--color-einblick);"><h3>${day.bonus.title}</h3>${day.bonus.html}</div>`;
  }

  let bossHtml = "";
  if (day.bossChallenge) {
    bossHtml = `
      <div class="card" style="border: 3px solid #f59e0b; background:#fffbeb;">
        <h3>👑 ${day.bossChallenge.title}</h3>
        ${day.bossChallenge.html}
      </div>
    `;
  }

  return header + `
    <div class="parent-note"><strong>Elternhinweis:</strong> ${day.parentNote}</div>
    <div class="card">
      <h3>📘 Theorie: ${day.theoryTitle}</h3>
      ${day.theoryHtml}
    </div>
    ${englischExtra}
    <div class="worksheet" style="--ws-color:${color};">
      <div class="worksheet-header">
        <span class="badge-icon">✏️</span> Mein Übungsblatt
      </div>
      <div class="worksheet-progress">
        <span class="worksheet-progress-label">0 geschafft</span>
        <div class="worksheet-progress-bar"><div class="worksheet-progress-fill" style="background:${color};"></div></div>
      </div>
      ${exercisesHtml}
    </div>
    ${bossHtml}
    ${bonusHtml}
    <div class="preview-box">🔮 <strong>Vorschau auf morgen:</strong> ${day.preview}</div>
  `;
}

function renderLiliSubject(key) {
  const subject = LILI[key];
  const dayKey = "day" + currentDay;
  const color = subject.color;
  const day = subject.days[dayKey];

  const header = `
    <div class="subject-header">
      <span class="subject-badge" style="background:${color};">Forscherkind · ${subject.label}</span>
    </div>
    <h1 class="page-title">${subject.label}</h1>
    ${dayTabsHtml(subject.days, color, currentDay)}
  `;

  if (!day) return header + notYetHtml("Der Inhalt");

  return header + `
    <div class="parent-note"><strong>Elternhinweis:</strong> ${day.guide}</div>
    ${day.activityHtml}
    <button class="mark-done-btn" style="background:${color};">✅ Geschafft!</button>
  `;
}

function renderMaterials() {
  const color = "#0d9488";
  const dayKey = "day" + currentDay;
  const day = MATERIALS[dayKey];
  const header = `
    <h1 class="page-title">🧰 Materialien</h1>
    <p class="page-subtitle">Alles, was ihr vorab ausdrucken oder besorgen könnt — schaut hier immer schon am Vortag rein.</p>
    ${dayTabsHtml(MATERIALS, color, currentDay)}
  `;
  if (!day) return header + notYetHtml("Die Materialliste");

  const listHtml = (items) => `
    <ul style="padding-left:20px;">
      ${items.map(i => `<li style="margin-bottom:10px;"><strong>${i.item}</strong><br><span style="font-size:13px;color:#6b7280;">${i.note}</span></li>`).join("")}
    </ul>
  `;
  return header + `
    <div class="card">
      <h3 style="color:${color};">🖨️ Optional zum Ausdrucken</h3>
      <p style="font-size:13.5px;color:#6b7280;">Nichts davon ist Pflicht — die ganze App funktioniert auch rein digital am Bildschirm/Tablet.</p>
      ${listHtml(day.toPrint)}
    </div>
    <div class="card">
      <h3 style="color:${color};">🛒 Zu besorgen / bereitzustellen</h3>
      ${listHtml(day.toGet)}
    </div>
  `;
}

function renderMission() {
  const color = "#f59e0b";
  const dayKey = "day" + currentDay;
  const header = `
    <h1 class="page-title">🤝 Geschwistermission — Tag ${currentDay}</h1>
    ${dayTabsHtml(MISSIONS, color, currentDay)}
  `;
  const html = MISSIONS[dayKey];
  if (!html) return header + notYetHtml("Die Mission");
  return header + html;
}

const EXCURSION_STYLE = {
  1: { p1: "#4ade80", p2: "#15803d", emoji: "🐒" },
  2: { p1: "#38bdf8", p2: "#2563eb", emoji: "⛅" },
  3: { p1: "#fb7185", p2: "#be185d", emoji: "❤️" },
  4: { p1: "#fbbf24", p2: "#ea580c", emoji: "🏙️" },
  5: { p1: "#c084fc", p2: "#7c3aed", emoji: "🔬" },
  6: { p1: "#2dd4bf", p2: "#0d9488", emoji: "🗺️" },
};

function renderExcursions() {
  const cards = EXCURSIONS.map(w => {
    const s = EXCURSION_STYLE[w.week];
    return `
    <div class="poster-card" style="--p1:${s.p1};--p2:${s.p2};">
      <p class="poster-eyebrow">Woche ${w.week} · Belohnung</p>
      <h2 class="poster-title">${s.emoji} ${w.island}</h2>
      <div class="poster-badges">
        ${w.options.map(o => `
          <div class="poster-badge">
            <span class="poster-emoji">🎟️</span>
            <h4>${o.name}</h4>
            <p>${o.desc}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  }).join("");
  return `
    <h1 class="page-title">🎡 Ausflugsziele</h1>
    <p class="page-subtitle">Zwei Ausflugsziel-Ideen pro Woche für eure Region, thematisch passend zur jeweiligen Insel —
    baut sie als Belohnung unter der Woche ein, z. B. mittwochs und freitags. Am besten ausdrucken und als Poster
    an die Wand hängen, damit sich die Kinder schon darauf freuen können!</p>
    ${cards}
  `;
}

const ROUTES = {
  welcome: () => `<h1 class="page-title">💌 Willkommensbrief</h1>${WELCOME_LETTER_HTML}`,
  schedule: () => `<h1 class="page-title">🗓️ Tagesplan</h1>${SCHEDULE_HTML}`,
  tracker: () => `<h1 class="page-title">📊 Tracker-Poster</h1>${TRACKER_HTML}`,
  mission: renderMission,
  materials: renderMaterials,
  excursions: renderExcursions,
  closing: () => `<h1 class="page-title">🎉 Abschluss</h1>${CLOSING_HTML}`,
  "leo-mathe": () => renderLeoSubject("mathe"),
  "leo-deutsch": () => renderLeoSubject("deutsch"),
  "leo-lesen": () => renderLeoSubject("lesen"),
  "leo-englisch": () => renderLeoSubject("englisch"),
  "leo-sachunterricht": () => renderLeoSubject("sachunterricht"),
  "leo-einblick3": () => renderLeoSubject("mathe") /* placeholder overwritten below */,
  "leo-bewegung": () => renderLeoSubject("bewegung"),
  "lili-geschichte": () => renderLiliSubject("geschichte"),
  "lili-sprache": () => renderLiliSubject("sprache"),
  "lili-mathe": () => renderLiliSubject("mathe"),
  "lili-englisch": () => renderLiliSubject("englisch"),
  "lili-kreativ": () => renderLiliSubject("kreativ"),
  "lili-naturwissen": () => renderLiliSubject("naturwissen"),
};

// "Einblick 3. Klasse" ist inhaltlich Teil des Mathe-Bonus, bekommt aber eine eigene Ansicht.
ROUTES["leo-einblick3"] = () => {
  const dayKey = "day" + currentDay;
  const day = LEO.mathe.days[dayKey];
  const header = `
    <div class="subject-header">
      <span class="subject-badge" style="background:var(--color-einblick);">Kadett · Einblick 3. Klasse</span>
    </div>
    <h1 class="page-title">✨ Einblick 3. Klasse</h1>
    <p class="page-subtitle">Freiwillige Bonus-Inhalte oberhalb des Klassenniveaus — niemals Pflicht, niemals am selben Tag wie das Hauptthema vermischt.</p>
    ${dayTabsHtml(LEO.mathe.days, "var(--color-einblick)", currentDay)}
  `;
  if (!day || !day.bonus) return header + notYetHtml("Der Bonus-Inhalt");
  return header + `
    <div class="card">
      <h3>${day.bonus.title}</h3>
      ${day.bonus.html}
    </div>
  `;
};

function setActiveNav(route) {
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const btn = document.querySelector(`.nav-item[data-route="${route}"]`);
  if (btn) btn.classList.add("active");
}

function renderCurrentRoute() {
  const renderer = ROUTES[currentRoute];
  if (!renderer) return;
  contentEl.innerHTML = renderer();
  initInteractiveWidgets();
}

function navigate(route) {
  if (!ROUTES[route]) return;
  currentRoute = route;
  currentDay = 1;
  renderCurrentRoute();
  setActiveNav(route);
  window.scrollTo(0, 0);
  closeMobileMenu();
}

function closeMobileMenu() {
  const sidebarEl = document.querySelector(".sidebar");
  const overlayEl = document.getElementById("sidebarOverlay");
  if (sidebarEl) sidebarEl.classList.remove("open");
  if (overlayEl) overlayEl.classList.remove("open");
}

function goToDay(n) {
  currentDay = n;
  renderCurrentRoute();
  window.scrollTo(0, 0);
}

// ---------- Interaktivität: Sterne, Fortschritt, Tracker ----------

function updateWorksheetProgress(worksheet) {
  if (!worksheet) return;
  const stars = worksheet.querySelectorAll(".star");
  const done = worksheet.querySelectorAll(".star.done").length;
  const total = stars.length;
  const fill = worksheet.querySelector(".worksheet-progress-fill");
  const label = worksheet.querySelector(".worksheet-progress-label");
  if (fill) fill.style.width = (total ? (done / total * 100) : 0) + "%";
  if (label) label.textContent = total ? `${done} von ${total} geschafft` : "";
  const existingBanner = worksheet.querySelector(".celebrate-banner");
  if (total > 0 && done === total) {
    if (!existingBanner) {
      const banner = document.createElement("div");
      banner.className = "celebrate-banner";
      banner.textContent = "🎉 Super gemacht! Alles geschafft! 🎉";
      worksheet.insertBefore(banner, worksheet.firstChild.nextSibling);
      requestAnimationFrame(() => banner.classList.add("show"));
    }
  } else if (existingBanner) {
    existingBanner.remove();
  }
}

function initInteractiveWidgets() {
  document.querySelectorAll(".worksheet").forEach(updateWorksheetProgress);
}

document.addEventListener("click", (e) => {
  const star = e.target.closest(".star");
  if (star) {
    const wasDone = star.classList.contains("done");
    star.classList.toggle("done");
    star.textContent = star.classList.contains("done") ? "🌟" : "⭐";
    SESSION.leoXP += wasDone ? -15 : 15;
    if (SESSION.leoXP < 0) SESSION.leoXP = 0;
    updateSessionCounter();
    updateWorksheetProgress(star.closest(".worksheet"));
    return;
  }

  const doneBtn = e.target.closest(".mark-done-btn");
  if (doneBtn) {
    const wasDone = doneBtn.classList.contains("done");
    doneBtn.classList.toggle("done");
    doneBtn.textContent = doneBtn.classList.contains("done") ? "🎉 Super gemacht!" : "✅ Geschafft!";
    SESSION.liliStars += wasDone ? -1 : 1;
    if (SESSION.liliStars < 0) SESSION.liliStars = 0;
    updateSessionCounter();
    return;
  }

  const trackerDay = e.target.closest(".tracker-day");
  if (trackerDay) {
    trackerDay.classList.toggle("done");
    const grid = trackerDay.closest(".tracker-grid");
    const wrap = grid.closest(".card");
    const doneCount = grid.querySelectorAll(".tracker-day.done").length;
    const countLabel = wrap.querySelector(".tracker-live-count");
    if (countLabel) countLabel.textContent = `${doneCount} von ${TOTAL_DAYS} Tagen abgehakt`;
    const rankEl = wrap.querySelector(".tracker-live-rank");
    if (rankEl) {
      const xp = doneCount * 60;
      rankEl.textContent = `${rankFor(xp)} (${xp} XP)`;
    }
    return;
  }
});

function rankFor(xp) {
  if (xp >= 800) return "👑 Meisterforscher der Akademie";
  if (xp >= 500) return "🏅 Expeditionsleiter";
  if (xp >= 250) return "🥇 Forscher";
  if (xp >= 100) return "🥈 Juniorforscher";
  return "🥉 Kadett";
}

document.querySelectorAll(".nav-item[data-route]").forEach(btn => {
  btn.addEventListener("click", () => navigate(btn.dataset.route));
});

document.querySelectorAll(".nav-group-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebarOverlay = document.getElementById("sidebarOverlay");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("open");
    sidebarOverlay.classList.toggle("open");
  });
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeMobileMenu);
}

// ---------- Drucken ----------
document.getElementById("printAllBtn").addEventListener("click", () => {
  const savedRoute = currentRoute, savedDay = currentDay;
  let html = "";
  for (const r of Object.keys(ROUTES)) {
    currentRoute = r;
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      currentDay = d;
      const rendered = ROUTES[r]();
      if (!rendered.includes("kommt noch")) {
        html += `<div class="card" style="margin-bottom:30px;">${rendered}</div>`;
      }
      if (!["leo-mathe","leo-deutsch","leo-lesen","leo-englisch","leo-sachunterricht","leo-einblick3","leo-bewegung",
            "lili-geschichte","lili-sprache","lili-mathe","lili-englisch","lili-kreativ","lili-naturwissen",
            "materials","mission"].includes(r)) {
        break; // Seiten ohne Tage nur einmal rendern
      }
    }
  }
  printAreaEl.innerHTML = html;
  currentRoute = savedRoute; currentDay = savedDay;
  window.print();
});

// ---------- Start ----------
document.querySelector('.nav-group-toggle[data-toggle="leo"]').parentElement.classList.add("open");
navigate("welcome");
