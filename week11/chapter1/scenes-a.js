/* Week 11 · Chapter 1 animated scenes, part A.
   Each scene: SC[id] = { svg, copy[beat], render(root, beat) } on a 480 x 360 stage.
   render() sets the full state for a beat (so jumping between beats works); CSS transitions do the motion,
   SMIL / CSS keyframes keep the world alive between beats. */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const NAVY = "#1F4E79", TERRA = "#C0502A", GREEN = "#2E7D4F", GOLD = "#E8B04B", INK = "#1A1F2B", SKY = "#DCE7F2", MUTED = "#5A6373";

  const H = window.SCH = {
    q: (r, s) => Array.from(r.querySelectorAll(s)),
    set(r, s, p, v) { H.q(r, s).forEach(e => { e.style[p] = v; }); },
    show(r, s, on) { H.q(r, s).forEach(e => { e.style.opacity = on ? "1" : "0"; }); },
    tf(r, s, v) { H.q(r, s).forEach(e => { e.style.transform = v; }); },
    draw(r, s, on) { H.q(r, s).forEach(e => { e.style.strokeDashoffset = on ? "0" : "1"; }); },
    cls(r, s, c, on) { H.q(r, s).forEach(e => e.classList.toggle(c, !!on)); },
    delay(r, s, sec) { H.q(r, s).forEach(e => { e.style.transitionDelay = sec + "s"; }); },
    // camera: bring point (cx, cy) to the centre of the 480 x 360 stage at zoom s
    cam(r, cx, cy, s) { H.set(r, ".cam", "transform", `translate(${-s * (cx - 240)}px,${-s * (cy - 180)}px) scale(${s})`); },
    count(el, to, ms, fmt) {
      if (!el || el._to === to) return;
      fmt = fmt || (v => Math.round(v).toLocaleString("en-US"));
      const from = el._cur || 0, t0 = performance.now(); el._to = to; cancelAnimationFrame(el._raf);
      const f = now => { const p = Math.min(1, (now - t0) / (ms || 1000)), e = 1 - Math.pow(1 - p, 3), v = from + (to - from) * e;
        el._cur = v; el.textContent = fmt(v); if (p < 1) el._raf = requestAnimationFrame(f); };
      el._raf = requestAnimationFrame(f);
    },
    t: (x, y, s, size, fill, anchor, weight, cls) =>
      `<text${cls ? ` class="${cls}"` : ""} x="${x}" y="${y}" font-size="${size || 16}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="${weight || 700}">${s}</text>`,
    person: (x, y, c, s, cls) =>
      `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><circle class="hd" cx="0" cy="-31" r="8.5" fill="${c}"/><path class="bd" d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${c}"/></g></g>`,
    clock: (cx, cy, r, cls) =>
      `<g class="${cls || ""}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${NAVY}" stroke-width="${Math.max(2, r / 7)}"/>` +
      [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2; return `<line x1="${cx + Math.cos(a) * r * .7}" y1="${cy + Math.sin(a) * r * .7}" x2="${cx + Math.cos(a) * r * .86}" y2="${cy + Math.sin(a) * r * .86}" stroke="${NAVY}" stroke-width="2"/>`; }).join("") +
      `<line class="hand-m" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * .72}" stroke="${TERRA}" stroke-width="${Math.max(2, r / 9)}" stroke-linecap="round" style="transform-box:view-box;transform-origin:${cx}px ${cy}px"/>` +
      `<line class="hand-h" x1="${cx}" y1="${cy}" x2="${cx + r * .45}" y2="${cy}" stroke="${NAVY}" stroke-width="${Math.max(2, r / 8)}" stroke-linecap="round" style="transform-box:view-box;transform-origin:${cx}px ${cy}px"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${Math.max(2, r / 9)}" fill="${NAVY}"/></g>`,
    C: { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED }
  };
  const { t, person, clock } = H;

  /* ------------------------------------------------------------ s01 · the clinic */
  SC.s01 = {
    copy: [
      { k: "Week 11 · Chapter 1", m: "What is machine learning, and why should a quality manager care?", s: "We will answer this one idea at a time.", l: "A question to answer" },
      { k: "Our running case", m: "We start with a clinic you already know: Al Waha.", s: "You met its patients and their complaints in Week 10.", l: "Back to the Al Waha clinic" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<g class="cam">
  <circle class="a o0 sun" cx="420" cy="62" r="28" fill="${GOLD}"/>
  <rect x="0" y="292" width="480" height="68" fill="#E7DDCB"/><path d="M0 292 H480" stroke="#CDBFA6" stroke-width="3"/>
  <g class="a o0 tree"><rect x="60" y="232" width="8" height="62" fill="#7A5A3A"/><circle cx="64" cy="222" r="28" fill="#5E9C76"/><circle cx="46" cy="238" r="17" fill="#6FAE86"/></g>
  <g class="a o0 tree"><rect x="412" y="240" width="8" height="54" fill="#7A5A3A"/><circle cx="416" cy="230" r="24" fill="#5E9C76"/></g>
  <rect class="a o0 wall" x="150" y="140" width="180" height="152" fill="#FFFFFF"/>
  <path class="dr" pathLength="1" d="M150 292 V140 H330 V292" fill="none" stroke="${NAVY}" stroke-width="5"/>
  <path class="dr" pathLength="1" d="M136 146 L240 92 L344 146" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
  <g class="a o0 cross"><rect x="223" y="104" width="34" height="34" rx="6" fill="${TERRA}"/><rect x="236" y="109" width="8" height="24" fill="#fff"/><rect x="228" y="117" width="24" height="8" fill="#fff"/></g>
  <g class="a o0 sign"><rect x="172" y="150" width="136" height="24" rx="5" fill="${NAVY}"/>${t(240, 167, "AL WAHA CLINIC", 14, "#fff")}</g>
  <g class="a o0 win"><rect x="166" y="186" width="40" height="34" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="3"/><rect x="274" y="186" width="40" height="34" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="3"/></g>
  <g class="a o0 wclock">${clock(240, 203, 13, "spin")}</g>
  <rect x="216" y="232" width="48" height="60" fill="#FFF6D8" stroke="${NAVY}" stroke-width="4"/>
  <rect class="a door" x="218" y="234" width="44" height="56" fill="${NAVY}" style="transform-origin:left center"/>
  <g class="a pt">${person(44, 292, TERRA, 1.25, "bob")}</g>
  <g class="a o0 q"><path d="M22 28 H262 Q274 28 274 40 V80 Q274 92 262 92 H86 L60 116 L66 92 H34 Q22 92 22 80 V40 Q22 28 34 28Z" fill="#fff" stroke="${NAVY}" stroke-width="3"/>${t(148, 67, "What is machine learning?", 19, NAVY)}</g>
</g>`,
    render(r, b) {
      H.draw(r, ".dr", true);
      [".sun", ".tree", ".wall", ".cross", ".sign", ".win", ".wclock"].forEach((s, i) => { H.delay(r, s, .4 + i * .14); H.show(r, s, true); });
      H.delay(r, ".q", b === 0 ? 1.4 : 0); H.show(r, ".q", b === 0);
      H.tf(r, ".pt", b >= 1 ? "translate(192px,0) scale(.85)" : "none"); H.delay(r, ".pt", b >= 1 ? .3 : 0);
      H.tf(r, ".door", b >= 1 ? "scaleX(.12)" : "none");
      H.cam(r, 240, b >= 1 ? 238 : 180, b >= 1 ? 1.4 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · the waiting room (Week 10 recap) */
  const RED2 = [2, 9, 15, 20, 29];
  SC.s02 = {
    copy: [
      { k: "Week 10 in one minute", m: "We followed more than 5,000 patient visits.", s: "For each visit, we knew whether the patient later complained.", l: "5,204 visits" },
      { k: "Week 10 in one minute", m: "About 15 visits in every 100 ended with a complaint.", s: "Complaints are a minority, but an expensive one.", l: "14.6% complained" },
      { k: "Week 10 in one minute", m: "Every 10 extra minutes of waiting roughly doubled the odds of a complaint.", s: "Logistic regression: odds ratio 2.08 for each 10 minutes.", l: "+10 minutes: odds × 2.08" },
      { k: "The surprise", m: "That logistic regression was already a machine-learning tool.", s: "You have done machine learning without calling it that.", l: "Already machine learning" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/><rect y="292" width="480" height="68" fill="#E2D6C0"/>
${clock(44, 44, 24, "wc")}
<text class="cnt" x="180" y="52" font-size="34" font-weight="800" fill="${NAVY}" text-anchor="middle">0</text>
${t(180, 74, "patient visits followed", 15, MUTED, "middle", 400)}
${[150, 195, 240, 285].map(y => `<rect x="14" y="${y + 1}" width="292" height="6" rx="3" fill="#CDBFA6"/>`).join("")}
${Array.from({ length: 32 }, (_, i) => { const x = 34 + (i % 8) * 36, y = 150 + Math.floor(i / 8) * 45, red = RED2.includes(i);
      return `<g class="a o0 pp${red ? " cp" : ""}">${person(x, y, NAVY, .72)}</g>` + (red ? `<g class="a o0 bang"><circle cx="${x + 9}" cy="${y - 38}" r="8" fill="${TERRA}"/>${t(x + 9, y - 33, "!", 13, "#fff")}</g>` : ""); }).join("")}
<rect x="318" y="96" width="152" height="188" rx="10" fill="#fff" stroke="#CDBFA6" stroke-width="3"/>
<g class="a o0 odds">
  ${clock(346, 128, 15, "oc")}${t(400, 134, "+10 min", 17, NAVY)}
  <rect x="340" y="226" width="42" height="40" fill="${SKY}"/>
  <rect class="a grow" x="404" y="183" width="42" height="83" fill="${TERRA}" style="transform-origin:center bottom"/>
  ${t(425, 175, "× 2.08", 17, TERRA, "middle", 800, "a o0 x2")}
  ${t(361, 282, "odds", 13, MUTED, "middle", 400)}${t(425, 282, "odds", 13, MUTED, "middle", 400)}
</g>
<g class="a o0 sc">
  <path d="M334 116 V258 H458" fill="none" stroke="${MUTED}" stroke-width="2"/>
  <path class="dr" pathLength="1" d="M336 252 C 384 252, 392 124, 456 120" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/>
  ${t(394, 276, "longer wait →", 13, MUTED, "middle", 400)}
  <text x="326" y="190" font-size="13" fill="${MUTED}" text-anchor="middle" transform="rotate(-90 326 190)">chance of complaint</text>
</g>
<g class="a o0 stamp" style="transform:scale(1.9)"><g transform="rotate(-9 392 214)"><rect x="306" y="192" width="172" height="44" rx="7" fill="#fff" fill-opacity=".85" stroke="${TERRA}" stroke-width="4"/>${t(392, 221, "MACHINE LEARNING", 18, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.q(r, ".pp").forEach((e, i) => { e.style.transitionDelay = (i * .035) + "s"; e.style.opacity = "1"; });
      H.count(r.querySelector(".cnt"), 5204, 1600);
      H.cls(r, ".cp", "red", b >= 1); H.show(r, ".bang", b >= 1); H.cls(r, ".bang", "bob", b >= 1);
      H.show(r, ".odds", b === 2); H.tf(r, ".grow", b === 2 ? "scaleY(1)" : "scaleY(.48)"); H.delay(r, ".grow", .5);
      H.show(r, ".x2", b === 2); H.delay(r, ".x2", 1.2); H.cls(r, ".wc .hand-m", "spinfast", b === 2);
      H.show(r, ".sc", b >= 3); H.draw(r, ".sc .dr", b >= 3);
      H.show(r, ".stamp", b >= 3); H.delay(r, ".stamp", b >= 3 ? 1.4 : 0); H.tf(r, ".stamp", b >= 3 ? "scale(1)" : "scale(1.9)");
    }
  };

  /* ------------------------------------------------------------ s12 · guess where the risk jumps (interactive) */
  const BX = i => 24 + i * 36;           // band i starts here, 36 wide
  const BANDS = ["0", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120"];
  SC.s12 = {
    copy: [
      { k: "Your turn", m: "Before we look at the real numbers, make a guess.", s: "Watch the patient: the longer the wait, the worse the mood.", l: "Make a guess" },
      { k: "Your turn", m: "In which waiting band do complaints start to jump?", s: "Tap a band under the picture.", l: "Tap a waiting band" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/><rect y="250" width="480" height="110" fill="#E7DDCB"/>
${t(240, 44, "How long has the patient waited?", 20, NAVY)}
${BANDS.map((l, i) => `<rect class="a o0 seg" x="${BX(i)}" y="236" width="36" height="20" fill="${i % 2 ? "#fff" : "#EFE8DA"}" stroke="#CDBFA6"/>` + t(BX(i), 276, l, 13, MUTED, "middle", 600, "a o0 seg")).join("")}
${t(240, 302, "waiting time (minutes)", 14, MUTED, "middle", 400)}
<rect class="a o0 glow" x="${BX(7)}" y="150" width="36" height="106" fill="${TERRA}" fill-opacity=".22"/>
<g class="walker">
  <animateTransform attributeName="transform" type="translate" values="0 0; 400 0" dur="10s" repeatCount="indefinite"/>
  <g transform="translate(42 234) scale(1.2)">
    <circle cx="0" cy="-31" r="8.5" fill="${GREEN}"><animate attributeName="fill" values="${GREEN};${GREEN};${GOLD};${TERRA};${TERRA}" keyTimes="0;.5;.62;.72;1" dur="10s" repeatCount="indefinite"/></circle>
    <path d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${NAVY}"/>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.7;.74;1" dur="10s" repeatCount="indefinite"/>
    <circle cx="58" cy="168" r="11" fill="${TERRA}"/>${t(58, 174, "!", 16, "#fff")}</g>
  ${clock(26, 172, 12, "")}
</g>
<g class="a o0 hand"><g class="bob"><path d="M232 180 H248 V204 H258 L240 226 L222 204 H232Z" fill="${TERRA}"/></g></g>
<g class="a o0 pin" style="transform:translate(240px,90px)"><path d="M0 -40 C-14 -40 -16 -26 -11 -19 L0 0 L11 -19 C16 -26 14 -40 0 -40Z" fill="${NAVY}"/><circle cx="0" cy="-28" r="6" fill="#fff"/></g>`,
    render(r, b) {
      H.q(r, ".seg").forEach((e, i) => { e.style.transitionDelay = (i * .03) + "s"; e.style.opacity = "1"; });
      H.show(r, ".hand", b >= 1 && !r._picked);
    },
    pin(r, i) {
      r._picked = true; H.show(r, ".hand", false);
      H.show(r, ".pin", true); H.tf(r, ".pin", `translate(${BX(i) + 18}px,234px)`);
      setTimeout(() => H.show(r, ".glow", true), 800);
    }
  };

  /* ------------------------------------------------------------ s03 · the complaint jump */
  const RATES = [8.5, 3.5, 2.1, 2.1, 1.8, 2.6, 3.1, 14.8, 44.5, 71.3, 88.7, 95.4];
  const CX = i => 48 + i * 35.5 + 17.75, BASE = 300, Y = p => BASE - p * 2.5;
  const curveD = (() => { let d = `M${CX(0)} ${Y(RATES[0])}`; for (let i = 1; i < 12; i++) { const x0 = CX(i - 1), y0 = Y(RATES[i - 1]), x1 = CX(i), y1 = Y(RATES[i]); d += ` C${x0 + 14} ${y0} ${x1 - 14} ${y1} ${x1} ${y1}`; } return d; })();
  SC.s03 = {
    copy: [
      { k: "What our data shows", m: "Each bar is the share of patients who complained, for one band of waiting time.", s: "5,204 real visits from the course dataset.", l: "Complaint rate by waiting time" },
      { k: "What our data shows", m: "Up to 80 minutes, the rate stays low: between 2% and 4%.", s: "Most patients accept a normal wait.", l: "Flat and low up to 80 minutes" },
      { k: "What our data shows", m: "After 80 minutes it climbs fast: 15%, 45%, 71%, then over 90%.", s: "Beyond two hours, almost every patient complains.", l: "Then it jumps" },
      { k: "The shape matters", m: "The risk does not rise in a straight line. It stays flat, then it jumps.", s: "Like water held back by a wall.", l: "A straight line misses the jump" },
      { k: "Why machine learning", m: "A flexible method can bend with this shape.", s: "That flexibility is one thing machine learning offers.", l: "A flexible model fits the shape" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<g class="cam">
${[0, 25, 50, 75, 100].map(g => `<line x1="48" x2="474" y1="${Y(g)}" y2="${Y(g)}" stroke="#E5DED0"/>` + t(42, Y(g) + 4, g + "%", 12, MUTED, "end", 400)).join("")}
<line x1="48" x2="474" y1="${BASE}" y2="${BASE}" stroke="${MUTED}" stroke-width="2"/>
${RATES.map((p, i) => `<rect class="a bar g${i < 7 ? 1 : 2}" x="${CX(i) - 13}" y="${Y(p)}" width="26" height="${p * 2.5}" rx="3" fill="${i < 7 ? NAVY : TERRA}" style="transform:scaleY(0);transform-origin:center bottom"/>` +
      `<text class="a o0 val g${i < 7 ? 1 : 2}" x="${CX(i)}" y="${Y(p) - 7}" font-size="12.5" font-weight="800" fill="${i < 7 ? NAVY : TERRA}" text-anchor="middle" data-v="${p}">0%</text>` +
      t(CX(i), 318, ["<20", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120+"][i], 12, MUTED, "middle", 600)).join("")}
${t(260, 342, "waiting time (minutes)", 13, MUTED, "middle", 400)}
<g class="a avg"><line x1="48" x2="474" y1="${Y(14.6)}" y2="${Y(14.6)}" stroke="${TERRA}" stroke-width="2" stroke-dasharray="6 5"/>
<text x="150" y="${Y(14.6) - 6}" font-size="12.5" font-weight="700" fill="${TERRA}" stroke="#FBF8F1" stroke-width="4" paint-order="stroke">average 14.6%</text></g>
${clock(84, 82, 18, "bc")}
<g class="a o0 dam">
  <rect x="${48 + 7 * 35.5 - 6}" y="190" width="10" height="110" fill="#8D6E52"/>
  ${[0, 1, 2, 3, 4, 5].map(k => `<line x1="${48 + 7 * 35.5 - 6}" x2="${48 + 7 * 35.5 + 4}" y1="${200 + k * 18}" y2="${200 + k * 18}" stroke="#6B5038"/>`).join("")}
  <rect x="50" y="${BASE - 12}" width="${7 * 35.5 - 8}" height="12" fill="#7FB3D5" fill-opacity=".55"><animate attributeName="y" values="${BASE - 12};${BASE - 14};${BASE - 12}" dur="2.4s" repeatCount="indefinite"/></rect>
  ${t(170, 196, "flat …", 18, NAVY, "middle", 800)}${t(236, 112, "… then a jump", 18, TERRA, "middle", 800)}
</g>
<g class="a o0 straight"><line x1="${CX(0)}" y1="${Y(-4)}" x2="${CX(11)}" y2="${Y(58)}" stroke="${MUTED}" stroke-width="4" stroke-dasharray="2 7" stroke-linecap="round"/>
  <text x="96" y="236" font-size="14" font-weight="700" fill="${MUTED}" stroke="#FBF8F1" stroke-width="4" paint-order="stroke">a straight line misses it</text></g>
<g class="a o0 cv"><path class="dr" pathLength="1" d="${curveD}" fill="none" stroke="${GREEN}" stroke-width="5" stroke-linecap="round"/>
  <circle r="7" fill="${GREEN}" stroke="#fff" stroke-width="2"><animateMotion dur="3.2s" repeatCount="indefinite" path="${curveD}"/></circle>
  <text x="96" y="150" font-size="16" font-weight="800" fill="${GREEN}" stroke="#FBF8F1" stroke-width="4" paint-order="stroke">a flexible model bends with the data</text></g>
</g>`,
    render(r, b) {
      const grow = (g, on) => H.q(r, ".bar.g" + g).forEach((e, i) => { e.style.transitionDelay = (on ? i * .12 : 0) + "s"; e.style.transform = on ? "scaleY(1)" : "scaleY(0)"; });
      grow(1, b >= 1); grow(2, b >= 2);
      H.q(r, ".val").forEach(e => { const g = e.classList.contains("g1") ? 1 : 2, on = b >= g; e.style.transitionDelay = on ? ".5s" : "0s"; e.style.opacity = on ? "1" : "0";
        if (on) H.count(e, +e.dataset.v, 1400, v => v.toFixed(1) + "%"); });
      H.cls(r, ".bc .hand-m", "spinfast", b === 1 || b === 2);
      H.show(r, ".dam", b === 3); H.show(r, ".straight", b === 3); H.cls(r, ".straight", "shake", b === 3);
      H.set(r, ".avg", "opacity", b >= 3 ? ".15" : "1");
      H.show(r, ".cv", b >= 4); H.draw(r, ".cv .dr", b >= 4);
      if (b === 1) H.cam(r, 170, 236, 1.55); else if (b === 2) H.cam(r, 300, 185, 1.1); else H.cam(r, 240, 180, 1);
    }
  };

  /* ------------------------------------------------------------ s04 · a rule written by a person: three tubes */
  const RX = m => 40 + (m - 20) * 400 / 130;
  const RULE = { 60: [681, 77, 1479], 110: [380, 378, 27] };
  SC.s04 = {
    copy: [
      { k: "A rule written by a person", m: "The manager writes a simple rule: call every patient who waits longer than X minutes.", s: "The clinic had 758 complaints in total.", l: "Call if the wait is longer than X" },
      { k: "Cut-off at 60 minutes", m: "The clinic catches 90% of complaints, but makes almost 1,500 needless calls.", s: "681 caught, 77 missed, 1,479 false alarms.", l: "60 minutes: many false alarms" },
      { k: "Cut-off at 110 minutes", m: "False alarms fall to only 27, but half of the complaints are missed.", s: "380 caught, 378 missed, 27 false alarms.", l: "110 minutes: many misses" },
      { k: "The trade-off", m: "There is no free lunch: catching more always costs more false alarms.", s: "Every machine-learning model faces this same trade-off.", l: "No free lunch" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<line x1="40" x2="440" y1="62" y2="62" stroke="${MUTED}" stroke-width="3"/>
${[20, 40, 60, 80, 100, 120, 140].map(m => `<line x1="${RX(m)}" x2="${RX(m)}" y1="56" y2="68" stroke="${MUTED}" stroke-width="2"/>` + t(RX(m), 84, m, 12, MUTED, "middle", 600)).join("")}
<rect class="a zone" x="40" y="54" width="400" height="16" fill="${TERRA}" fill-opacity=".22" style="transform:scaleX(0);transform-origin:right center"/>
<g class="a flag" style="transform:translate(${RX(85)}px,0)">
  <line x1="0" y1="20" x2="0" y2="72" stroke="${INK}" stroke-width="3"/>
  <path d="M0 20 H96 L88 30 L96 40 H0Z" fill="${NAVY}"/><text class="ft" x="46" y="35" font-size="12.5" font-weight="800" fill="#fff" text-anchor="middle">call if &gt; X min</text>
</g>
<g class="tubes">
${[["caught", NAVY], ["missed", TERRA], ["false alarms", GOLD]].map(([lab, c], j) => { const x = 100 + j * 140;
      return `<rect x="${x - 32}" y="120" width="64" height="170" rx="12" fill="#fff" stroke="#AEB6C2" stroke-width="3"/>` +
        `<rect class="a liq liq${j}" x="${x - 29}" y="123" width="58" height="164" rx="9" fill="${c}" style="transform:scaleY(0);transform-origin:center bottom"/>` +
        `<text class="num num${j}" x="${x}" y="110" font-size="22" font-weight="800" fill="${c === GOLD ? "#B07D12" : c}" text-anchor="middle">0</text>` +
        t(x, 312, lab === "caught" ? "complaints caught" : lab === "missed" ? "complaints missed" : "false alarms", 14, INK, "middle", 700); }).join("")}
<g class="a o0 phones">${[0, 1, 2].map(k => `<g class="ringing" style="animation-delay:${k * .15}s"><rect x="${352 + k * 20}" y="128" width="14" height="22" rx="3" fill="${INK}"/><rect x="${354 + k * 20}" y="131" width="10" height="13" fill="#fff"/></g>`).join("")}</g>
</g>
<g class="a o0 saw">
  <rect x="80" y="110" width="320" height="200" rx="16" fill="#FBF8F1" fill-opacity=".92"/>
  ${t(240, 150, "No free lunch", 26, TERRA, "middle", 800)}
  <path d="M226 290 L240 262 L254 290Z" fill="${INK}"/>
  <g class="rock" style="transform-box:view-box;transform-origin:240px 262px">
    <rect x="96" y="256" width="288" height="9" rx="4" fill="${INK}"/>
    <path d="M100 256 L112 222 H156 L168 256Z" fill="${NAVY}"/>${t(134, 214, "caught", 15, NAVY)}
    <path d="M312 256 L324 222 H368 L380 256Z" fill="${GOLD}"/>${t(346, 214, "false alarms", 15, "#B07D12")}
  </g>
</g>`,
    render(r, b) {
      const cut = b === 1 ? 60 : b >= 2 ? 110 : null;
      H.tf(r, ".flag", `translate(${RX(cut || 85)}px,0)`);
      H.q(r, ".ft").forEach(e => { e.textContent = cut ? `call if > ${cut} min` : "call if > X min"; });
      H.tf(r, ".zone", cut ? `scaleX(${(440 - RX(cut)) / 400})` : "scaleX(0)");
      const v = cut ? RULE[cut] : [0, 0, 0];
      v.forEach((n, j) => { H.tf(r, ".liq" + j, `scaleY(${Math.max(0, n / 1500)})`); H.count(r.querySelector(".num" + j), n, 1100); });
      H.show(r, ".phones", b === 1);
      H.set(r, ".tubes", "opacity", b >= 3 ? ".18" : "1");
      H.show(r, ".saw", b >= 3);
    }
  };

  /* ------------------------------------------------------------ s13 · hands-on: real patients and a movable cut-off */
  const DOTS = [[11,1],[12,1],[16,0],[16,0],[17,0],[17,0],[18,0],[20,0],[20,0],[20,0],[20,0],[22,1],[23,0],[24,0],[25,0],[25,0],[26,0],[26,0],[26,0],[27,0],[27,0],[28,0],[28,0],[28,0],[29,0],[29,0],[29,0],[30,0],[30,0],[30,0],[31,0],[32,0],[32,0],[32,0],[32,0],[32,0],[32,0],[32,0],[32,0],[32,0],[33,0],[33,0],[33,0],[34,0],[34,0],[34,0],[34,0],[35,0],[35,0],[35,0],[35,0],[36,0],[36,0],[36,0],[36,0],[37,0],[38,0],[38,0],[38,0],[39,0],[39,0],[39,0],[40,0],[40,0],[40,0],[40,0],[40,0],[41,0],[42,0],[42,0],[42,0],[43,0],[43,0],[43,0],[43,0],[43,0],[43,0],[43,0],[43,0],[44,0],[44,0],[44,0],[44,0],[44,0],[45,0],[45,0],[45,0],[45,0],[46,0],[46,0],[46,0],[47,0],[47,0],[48,0],[48,0],[48,0],[48,0],[48,0],[49,0],[49,0],[49,0],[50,0],[50,0],[50,0],[50,0],[51,0],[51,0],[52,0],[52,0],[52,0],[52,0],[52,0],[53,0],[53,0],[54,0],[55,0],[55,0],[55,0],[55,0],[55,0],[56,0],[56,0],[56,0],[56,0],[56,0],[57,0],[57,0],[57,0],[58,0],[58,0],[58,0],[58,0],[58,0],[58,0],[59,0],[59,0],[59,0],[59,0],[60,0],[60,0],[60,0],[60,0],[60,0],[60,0],[60,0],[61,0],[61,0],[61,0],[62,0],[62,0],[62,0],[63,0],[63,0],[63,0],[64,0],[64,0],[64,0],[64,0],[64,0],[64,0],[65,0],[65,0],[65,0],[66,0],[66,0],[66,0],[66,0],[66,0],[66,0],[66,0],[67,0],[67,0],[68,0],[68,0],[68,0],[68,0],[69,0],[69,0],[70,0],[70,0],[70,0],[70,0],[70,0],[71,0],[71,0],[72,0],[72,1],[72,0],[73,0],[73,0],[74,0],[74,0],[75,0],[75,0],[75,0],[75,0],[76,0],[76,0],[76,0],[77,0],[77,0],[78,0],[78,0],[79,0],[79,0],[80,0],[80,0],[81,0],[81,0],[82,0],[82,0],[82,0],[83,0],[85,0],[86,0],[86,0],[87,1],[88,0],[88,0],[89,0],[90,1],[91,0],[91,0],[92,0],[92,1],[94,0],[94,1],[95,1],[96,0],[96,1],[97,0],[98,1],[98,0],[99,0],[99,1],[99,1],[101,1],[101,1],[101,1],[102,1],[102,0],[103,1],[107,1],[108,1],[109,1],[111,1],[112,1],[124,1],[124,1],[126,1],[131,1],[135,1],[136,1],[154,1],[157,1],[158,1],[163,1],[180,1],[183,1],[192,1]];
  const DX = m => 30 + Math.min(m, 195) * 2.2;
  const dotSvg = (() => { const h = {}; return DOTS.map(([w, c]) => { const bin = Math.floor(w / 5); h[bin] = (h[bin] || 0) + 1;
    const x = 30 + (bin * 5 + 2.5) * 2.2, y = 300 - (h[bin] - 1) * 7.6;
    return `<circle class="dt${c ? " cmp" : ""}" data-w="${w}" cx="${x}" cy="${y}" r="3.6"/>`; }).join(""); })();
  SC.s13 = {
    copy: [
      { k: "Hands-on", m: "You are the clinic manager now.", s: "Each dot is one real patient from the course data (a sample of 260). Red dots complained.", l: "260 real patients" },
      { k: "Hands-on", m: "Move the slider: everyone to the right of the line gets a call.", s: "Green rings are complaints you catch. Yellow dots are calls for nothing.", l: "Move the cut-off" },
      { k: "Hands-on", m: "Find a cut-off you could defend to your director.", s: "Then press Continue.", l: "Choose your cut-off" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<circle cx="36" cy="22" r="5" fill="${TERRA}"/>${t(46, 27, "complained", 13, INK, "start", 600)}
<circle cx="136" cy="22" r="5" fill="${NAVY}" fill-opacity=".45"/>${t(146, 27, "no complaint", 13, INK, "start", 600)}
<g class="a o0 leg2"><circle cx="36" cy="44" r="5" fill="${TERRA}" stroke="${GREEN}" stroke-width="2.6"/>${t(46, 49, "caught", 13, INK, "start", 600)}
  <circle cx="136" cy="44" r="5" fill="${GOLD}"/>${t(146, 49, "called for nothing", 13, INK, "start", 600)}</g>
<line x1="26" x2="462" y1="306" y2="306" stroke="${MUTED}" stroke-width="2"/>
${[0, 30, 60, 90, 120, 150, 180].map(m => `<line x1="${DX(m)}" x2="${DX(m)}" y1="306" y2="312" stroke="${MUTED}" stroke-width="2"/>` + t(DX(m), 326, m, 12.5, MUTED, "middle", 600)).join("")}
${t(244, 348, "waiting time (minutes)", 13, MUTED, "middle", 400)}
<g class="dots">${dotSvg}</g>
<g class="a o0 cut" style="transform:translateX(${DX(60)}px)">
  <rect x="0" y="100" width="${470 - DX(60)}" height="206" fill="${TERRA}" fill-opacity=".07" class="cutzone"/>
  <line x1="0" x2="0" y1="96" y2="306" stroke="${TERRA}" stroke-width="3" stroke-dasharray="7 5"/>
  <g class="handle"><rect x="-58" y="70" width="116" height="26" rx="13" fill="${TERRA}"/><text class="ct" x="0" y="88" font-size="13.5" font-weight="800" fill="#fff" text-anchor="middle">call if &gt; 60 min</text></g>
</g>`,
    render(r, b) {
      H.q(r, ".dt").forEach((e, i) => { if (!e._in) { e._in = 1; e.style.transitionDelay = (i * .005) + "s"; e.style.opacity = "1"; e.style.transform = "none"; } });
      if (b >= 1) SC.s13.cut(r, r._cut || 60);
      H.cls(r, ".handle", "pulse2", b === 2);
    },
    cut(r, x) {
      r._cut = x; H.show(r, ".cut", true); H.show(r, ".leg2", true);
      H.tf(r, ".cut", `translateX(${DX(x)}px)`);
      H.q(r, ".cutzone").forEach(e => e.setAttribute("width", Math.max(0, 470 - DX(x))));
      H.q(r, ".ct").forEach(e => { e.textContent = `call if > ${x} min`; });
      H.q(r, ".dt").forEach(e => { const called = +e.dataset.w > x, c = e.classList.contains("cmp");
        e.classList.toggle("caught", called && c); e.classList.toggle("fa", called && !c); });
    }
  };
})();
