/* Week 11 · Chapter 1 animated scenes, part B (same contract as scenes-a.js). */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, { t, person, clock } = H;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED } = H.C;
  const folder = (x, y, mark, c) => `<g><path d="M${x} ${y} h12 l4 5 h18 v24 h-34z" fill="${c || "#F2D48A"}" stroke="#B9953F" stroke-width="1.5"/>${mark ? t(x + 17, y + 22, mark, 13, mark === "!" ? TERRA : GREEN, "middle", 900) : ""}</g>`;
  const gear = (cx, cy, r, c, cls) => `<g class="${cls || ""}" style="transform-box:view-box;transform-origin:${cx}px ${cy}px">` +
    Array.from({ length: 8 }, (_, k) => `<rect x="${cx - r * .22}" y="${cy - r * 1.28}" width="${r * .44}" height="${r * .5}" rx="2" fill="${c}" transform="rotate(${k * 45} ${cx} ${cy})"/>`).join("") +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="${r * .42}" fill="#fff"/></g>`;
  const lines2 = (x, y, a, b, size, fill, anchor) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="700"><tspan x="${x}" dy="0">${a}</tspan><tspan x="${x}" dy="${size * 1.2}">${b}</tspan></text>`;

  /* ------------------------------------------------------------ s05 · written by a person vs learned from data */
  SC.s05 = {
    copy: [
      { k: "The traditional way", m: "A person writes the rule from experience.", s: "It uses one piece of information: the waiting time.", l: "Written by a person" },
      { k: "The machine-learning way", m: "We show the computer thousands of past cases, with what really happened.", s: "Every folder is a past visit whose outcome we know.", l: "Past cases go in" },
      { k: "The machine-learning way", m: "The computer finds the patterns that link the information to the outcome.", s: "It can use many variables at the same time.", l: "Patterns are learned" },
      { k: "The machine-learning way", m: "Then we test those patterns on cases it has never seen.", s: "A pattern that only fits old cases is useless.", l: "Tested on new cases" },
      { k: "One thing does not change", m: "The computer predicts. People decide what to do with the predictions.", s: "", l: "People still decide" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<g class="cam">
<line x1="240" x2="240" y1="20" y2="350" stroke="#CDBFA6" stroke-width="2" stroke-dasharray="6 6"/>
${t(120, 36, "Written by a person", 17, NAVY)}${t(362, 36, "Learned from data", 17, GREEN)}
<g class="side-l">
  ${person(58, 268, NAVY, 1.4)}
  <rect x="98" y="88" width="122" height="150" rx="8" fill="#B08A5A"/><rect x="106" y="100" width="106" height="130" fill="#fff"/><rect x="140" y="82" width="38" height="14" rx="4" fill="#7A5A3A"/>
  ${t(159, 138, "If wait > 60 min", 15, INK)}${t(159, 164, "→ call", 15, TERRA)}
  <rect class="a wipe" x="108" y="118" width="102" height="56" fill="#fff" style="transform-origin:right center"/>
  <g class="a pen" style="transform:translate(0,0)"><path d="M112 150 l26 -26 l6 6 l-26 26 l-9 3z" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/></g>
  <rect x="104" y="196" width="110" height="24" rx="12" fill="${SKY}"/>${t(159, 213, "1 variable", 13, NAVY)}
</g>
<g class="side-r">
  <g class="a o0 stack">${[0, 1, 2, 3].map(k => folder(256 + (k % 2) * 6, 236 - k * 14, k % 3 ? "✓" : "!")).join("")}</g>
  <g class="a o0 flyers">${[0, 1, 2].map(k => `<g>${folder(-17, -14, k === 1 ? "!" : "✓")}<animateMotion dur="2.4s" begin="${k * .8}s" repeatCount="indefinite" path="M274 196 C 274 160, 296 140, 334 150"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="2.4s" begin="${k * .8}s" repeatCount="indefinite"/></g>`).join("")}</g>
  <g class="a o0 vars">${["wait", "staff", "handoffs", "visits"].map((v, k) => { const x = 318 + k * 44;
      return `<rect x="${x - 21}" y="78" width="42" height="20" rx="10" fill="${SKY}"/>${t(x, 92, v, 11, NAVY)}<line x1="${x}" y1="98" x2="${x}" y2="124" stroke="${NAVY}" stroke-width="2" stroke-dasharray="3 4"/><circle r="3.5" fill="${TERRA}"><animateMotion dur="1.2s" begin="${k * .3}s" repeatCount="indefinite" path="M${x} 98 V124"/></circle>`; }).join("")}</g>
  <rect x="322" y="124" width="120" height="94" rx="14" fill="${NAVY}"/>
  <rect x="336" y="136" width="92" height="40" rx="6" fill="#0F2C47"/>
  <path class="dr pat" pathLength="1" d="M342 168 C 360 168, 368 146, 384 150 S 410 138, 422 142" fill="none" stroke="#7FE0A8" stroke-width="3"/>
  ${gear(354, 198, 10, "#9FC0DD", "gr spin")}${gear(410, 198, 10, "#9FC0DD", "gr spinrev")}
  <g class="a o0 card"><rect x="328" y="228" width="108" height="34" rx="7" fill="#fff" stroke="${GREEN}" stroke-width="3"/>${t(382, 250, "learned rule", 14, GREEN)}</g>
  <g class="a o0 test">
    <path d="M252 330 H470" stroke="#CDBFA6" stroke-width="4"/><path d="M404 330 V292 Q404 280 416 280 H436 Q448 280 448 292 V330" fill="none" stroke="${NAVY}" stroke-width="4"/>
    ${[0, 1, 2].map(k => `<g><g transform="scale(.7)">${person(0, 0, k === 1 ? TERRA : NAVY, 1)}</g><animateMotion dur="3.6s" begin="${k * 1.2}s" repeatCount="indefinite" path="M256 328 H470"/></g>`).join("")}
    <g class="blink">${t(426, 270, "✓ ✓ ✗", 15, GREEN)}</g>${t(330, 352, "new cases", 13, MUTED, "middle", 600)}
  </g>
  <g class="a o0 human">${person(366, 334, TERRA, 1.1)}<rect x="388" y="284" width="84" height="30" rx="10" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>${t(430, 304, "I decide", 15, TERRA)}</g>
</g>
</g>`,
    render(r, b) {
      H.tf(r, ".wipe", "scaleX(0)"); H.delay(r, ".wipe", .3); H.set(r, ".wipe", "transitionDuration", "1.8s");
      H.tf(r, ".pen", "translate(78px,10px)"); H.set(r, ".pen", "transitionDuration", "1.8s"); H.delay(r, ".pen", .3);
      H.show(r, ".stack", b >= 1); H.show(r, ".flyers", b >= 1 && b <= 2);
      H.show(r, ".vars", b >= 2); H.draw(r, ".pat", b >= 2); H.show(r, ".card", b >= 2); H.delay(r, ".card", b >= 2 ? 1.2 : 0);
      H.cls(r, ".gr", "paused", b < 1);
      H.show(r, ".test", b === 3); H.show(r, ".human", b >= 4); H.delay(r, ".human", b >= 4 ? .6 : 0);
      if (b === 0) H.cam(r, 122, 178, 1.35); else if (b <= 3) H.cam(r, 362, 214, 1.3); else H.cam(r, 240, 180, 1);
    }
  };

  /* ------------------------------------------------------------ s06 · two conveyor belts */
  const row = (yc, c, a, bLab, proc, out, cls) => `
<g class="${cls}">
  <rect x="20" y="${yc - 40}" width="100" height="32" rx="8" fill="#fff" stroke="${c}" stroke-width="2.5"/>${t(70, yc - 19, a, 14, INK)}
  <rect class="chipB" x="20" y="${yc + 8}" width="100" height="32" rx="8" fill="#fff" stroke="${c}" stroke-width="2.5"/>${t(70, yc + 29, bLab, 13.5, INK)}
  <path id="p1${cls}" d="M120 ${yc - 24} C 140 ${yc - 24}, 145 ${yc}, 164 ${yc}" fill="none" stroke="#CDBFA6" stroke-width="5"/>
  <path id="p2${cls}" d="M120 ${yc + 24} C 140 ${yc + 24}, 145 ${yc}, 164 ${yc}" fill="none" stroke="#CDBFA6" stroke-width="5"/>
  <rect x="164" y="${yc - 32}" width="112" height="64" rx="14" fill="${c}"/>${lines2(220, yc - 6, proc[0], proc[1], 14, "#fff")}
  <path d="M276 ${yc} H330" stroke="#CDBFA6" stroke-width="5"/><path d="M322 ${yc - 7} L332 ${yc} L322 ${yc + 7}" fill="none" stroke="#AEB6C2" stroke-width="3"/>
  <rect class="outbox" x="334" y="${yc - 24}" width="132" height="48" rx="10" fill="#fff" stroke="${c}" stroke-width="3"/>${t(400, yc + 6, out, 15, c)}
  ${[0, 1, 2].map(k => `<rect width="9" height="9" rx="2" fill="${c}"><animateMotion dur="2.6s" begin="${k * .87}s" repeatCount="indefinite" path="M120 ${yc - 24} C 140 ${yc - 24}, 145 ${yc}, 164 ${yc} M276 ${yc} H330"/></rect>`).join("")}
  ${[0, 1].map(k => `<rect width="9" height="9" rx="2" fill="${TERRA}"><animateMotion dur="2.6s" begin="${k * 1.3 + .4}s" repeatCount="indefinite" path="M120 ${yc + 24} C 140 ${yc + 24}, 145 ${yc}, 164 ${yc} M276 ${yc} H330"/></rect>`).join("")}
</g>`;
  SC.s06 = {
    copy: [
      { k: "Two pictures of one idea", m: "Here is the same idea as two pictures.", s: "", l: "Two pictures" },
      { k: "Traditional programming", m: "People give the computer data and rules. The computer produces answers.", s: "", l: "Rules in, answers out" },
      { k: "Machine learning", m: "We give the computer data and the answers we know from the past. It produces the rules.", s: "Look how rules and answers swap places.", l: "Answers in, rules out" },
      { k: "Using the model", m: "The learned rules are called a model. New data goes in, predictions come out.", s: "", l: "New data in, predictions out" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<style>
@keyframes s06a{0%{transform:translate(0,0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translate(-314px,184px);opacity:0}}
@keyframes s06b{0%{transform:translate(0,0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translate(314px,120px);opacity:0}}
.s06 .gh1.go{animation:s06a 2.2s ease-in-out .6s both}.s06 .gh2.go{animation:s06b 2.2s ease-in-out .6s both}
</style>
<g class="s06">
${t(20, 40, "Traditional programming", 16, NAVY, "start", 800, "a o0 lab1")}
${t(20, 192, "Machine learning", 16, GREEN, "start", 800, "a o0 lab2")}
<g class="a o0 r1">${row(108, NAVY, "Data", "Rules", ["Computer", "program"], "Answers", "rowA")}</g>
<g class="a o0 r2">${row(260, GREEN, "Data", "Known answers", ["Learning", "algorithm"], "Rules = a model", "rowB")}</g>
<g class="a o0 r3">
  ${t(20, 40, "Using the model", 16, TERRA, "start", 800)}
  <g>${person(56, 128, NAVY, 1)}</g>${t(56, 150, "new patient", 13, MUTED, "middle", 600)}
  <path d="M84 108 H170" stroke="#CDBFA6" stroke-width="5"/><rect x="170" y="80" width="112" height="56" rx="14" fill="${GREEN}"/>${t(226, 114, "Model", 18, "#fff")}
  <path d="M282 108 H334" stroke="#CDBFA6" stroke-width="5"/>
  <rect x="334" y="84" width="132" height="48" rx="10" fill="#fff" stroke="${TERRA}" stroke-width="3"/>${t(400, 114, "risk: 72%", 16, TERRA)}
  ${[0, 1].map(k => `<circle r="5" fill="${NAVY}"><animateMotion dur="2s" begin="${k}s" repeatCount="indefinite" path="M84 108 H170 M282 108 H334"/></circle>`).join("")}
</g>
<g class="gh1" style="opacity:0"><rect x="334" y="84" width="132" height="48" rx="10" fill="${GOLD}" fill-opacity=".35" stroke="${TERRA}" stroke-width="3" stroke-dasharray="5 4"/>${t(400, 114, "Answers", 15, TERRA)}</g>
<g class="gh2" style="opacity:0"><rect x="20" y="116" width="100" height="32" rx="8" fill="${GOLD}" fill-opacity=".35" stroke="${TERRA}" stroke-width="3" stroke-dasharray="5 4"/>${t(70, 137, "Rules", 13.5, TERRA)}</g>
</g>`,
    render(r, b) {
      const op = (s, v) => H.set(r, s, "opacity", v);
      op(".lab1", b < 3 ? "1" : "0"); op(".r1", b === 0 ? ".3" : b < 3 ? "1" : "0");
      op(".lab2", b === 0 || b >= 2 ? "1" : "0"); op(".r2", b === 0 ? ".3" : b >= 2 ? "1" : "0");
      H.cls(r, ".gh1", "go", b === 2); H.cls(r, ".gh2", "go", b === 2);
      H.show(r, ".r3", b >= 3); H.delay(r, ".r3", b >= 3 ? .5 : 0);
    }
  };

  /* ------------------------------------------------------------ s07 · what it means to learn (and the accuracy trap) */
  const LC = "M70 300 C 140 296, 170 220, 240 180 S 360 110, 420 100";
  SC.s07 = {
    copy: [
      { k: "A simple definition", m: "A program learns when its performance on a task gets better with experience.", s: "Tom Mitchell, 1997.", l: "Better with experience" },
      { k: "The task", m: "Say whether a patient will complain.", s: "", l: "The task" },
      { k: "The experience", m: "Thousands of past visits whose outcome we already know.", s: "", l: "The experience" },
      { k: "The measure", m: "On new visits: how many complaints it catches, misses, and wrongly flags.", s: "", l: "The measure" },
      { k: "Careful with accuracy", m: "A lazy model that always says “no complaint” is 85% accurate, yet catches nothing.", s: "Most patients do not complain, so saying “no” is usually right.", l: "The accuracy trap" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<g class="a lc">
  <path d="M64 70 V306 H440" fill="none" stroke="${MUTED}" stroke-width="2.5"/>
  ${t(250, 330, "experience: more past cases →", 15, MUTED, "middle", 600)}
  <text x="44" y="190" font-size="15" font-weight="600" fill="${MUTED}" text-anchor="middle" transform="rotate(-90 44 190)">performance →</text>
  <path class="dr" pathLength="1" d="${LC}" fill="none" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
  <g><circle r="10" fill="${NAVY}" stroke="#fff" stroke-width="3"><animateMotion dur="4s" repeatCount="indefinite" path="${LC}"/></circle></g>
  ${t(330, 86, "gets better", 18, GREEN, "middle", 800)}
</g>
<g class="a o0 m1"><circle cx="90" cy="170" r="60" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  ${[44, 31, 18].map((rr, k) => `<circle cx="90" cy="170" r="${rr}" fill="${k % 2 ? "#fff" : TERRA}" fill-opacity="${k % 2 ? 1 : .85}"/>`).join("")}<circle cx="90" cy="170" r="6" fill="#fff"/>
  <g class="a arrow" style="transform:translate(-160px,-60px)"><path d="M92 168 L150 120" stroke="${INK}" stroke-width="4"/><path d="M150 120 l10 -4 l-4 10z M140 120 l14 -12 M146 128 l14 -12" stroke="${INK}" stroke-width="3" fill="${INK}"/></g>
  ${t(90, 262, "the task", 17, NAVY)}${t(90, 282, "complain or not?", 13, MUTED, "middle", 600)}</g>
<g class="a o0 m2"><circle cx="240" cy="170" r="60" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  ${[0, 1, 2, 3].map(k => `<g class="a fd" style="transform:translateY(-90px);opacity:0">${folder(222, 186 - k * 16, k % 2 ? "!" : "✓")}</g>`).join("")}
  ${t(240, 262, "the experience", 17, NAVY)}${t(240, 282, "past visits, known outcome", 13, MUTED, "middle", 600)}</g>
<g class="a o0 m3"><circle cx="390" cy="170" r="60" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  ${[["caught", GREEN], ["missed", TERRA], ["false alarm", "#B07D12"]].map(([l, c], k) => t(350, 150 + k * 22, l, 13, c, "start", 700) + `<rect class="a sb" x="420" y="${140 + k * 22}" width="${[22, 10, 14][k]}" height="12" rx="3" fill="${c}" style="transform:scaleX(0);transform-origin:left center"/>`).join("")}
  ${t(390, 262, "the measure", 17, NAVY)}${t(390, 282, "on new visits", 13, MUTED, "middle", 600)}</g>
<g class="a o0 lazy">
  <rect x="0" y="0" width="480" height="360" fill="#FBF8F1" fill-opacity=".94"/>
  <rect x="200" y="96" width="80" height="62" rx="14" fill="${NAVY}"/><rect x="210" y="106" width="60" height="40" rx="8" fill="${SKY}"/>
  <path d="M220 126 h12 M248 126 h12" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>
  <line x1="240" y1="96" x2="240" y2="82" stroke="${NAVY}" stroke-width="4"/><circle cx="240" cy="78" r="6" fill="${GOLD}"/>
  <rect x="206" y="162" width="68" height="62" rx="10" fill="#2D5F8F"/>${t(240, 199, "NO", 18, "#fff", "middle", 900)}
  <g>${["z", "z", "Z"].map((z, k) => `<text x="${290 + k * 12}" y="${96 - k * 14}" font-size="${14 + k * 4}" font-weight="800" fill="${MUTED}">${z}<animate attributeName="opacity" values="0;1;0" dur="2s" begin="${k * .4}s" repeatCount="indefinite"/></text>`).join("")}</g>
  <path d="M190 262 L206 300 H274 L290 262" fill="none" stroke="${MUTED}" stroke-width="4"/>${t(240, 292, "0", 18, TERRA, "middle", 900)}
  ${[0, 1, 2, 3, 4, 5].map(k => `<circle cx="${150 + (k % 3) * 90 + (k > 2 ? 45 : 0)}" cy="-10" r="6" fill="${TERRA}"><animate attributeName="cy" values="-10;380" dur="1.7s" begin="${k * .28}s" repeatCount="indefinite"/></circle>`).join("")}
  <rect x="60" y="314" width="360" height="36" rx="18" fill="${GOLD}"/>${t(240, 338, "85.4% accurate · 0 complaints caught", 16, INK, "middle", 800)}
</g>`,
    render(r, b) {
      H.draw(r, ".lc .dr", true); H.set(r, ".lc", "opacity", b === 0 ? "1" : ".1");
      H.show(r, ".m1", b >= 1 && b < 4); H.show(r, ".m2", b >= 2 && b < 4); H.show(r, ".m3", b >= 3 && b < 4);
      H.tf(r, ".arrow", b >= 1 ? "none" : "translate(-160px,-60px)"); H.delay(r, ".arrow", .5);
      H.q(r, ".fd").forEach((e, i) => { e.style.transitionDelay = (.3 + i * .25) + "s"; e.style.transform = b >= 2 ? "none" : "translateY(-90px)"; e.style.opacity = b >= 2 ? "1" : "0"; });
      H.q(r, ".sb").forEach((e, i) => { e.style.transitionDelay = (.4 + i * .3) + "s"; e.style.transform = b >= 3 ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".lazy", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s14 · the accuracy trap (interactive choice) */
  const robot = (cx, sleepy, cls) => `<g class="${cls}">
  <line x1="${cx}" y1="98" x2="${cx}" y2="84" stroke="${NAVY}" stroke-width="4"/><circle cx="${cx}" cy="80" r="6" fill="${sleepy ? GOLD : GREEN}"/>
  <rect x="${cx - 40}" y="98" width="80" height="62" rx="14" fill="${NAVY}"/><rect x="${cx - 30}" y="108" width="60" height="40" rx="8" fill="${SKY}"/>
  ${sleepy ? `<path d="M${cx - 20} 128 h12 M${cx + 8} 128 h12" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>` : `<circle cx="${cx - 13}" cy="127" r="6" fill="${NAVY}"/><circle cx="${cx + 13}" cy="127" r="6" fill="${NAVY}"/>`}
  <rect x="${cx - 34}" y="164" width="68" height="60" rx="10" fill="#2D5F8F"/>
  <rect x="${cx - 74}" y="228" width="148" height="28" rx="8" fill="#fff" stroke="${NAVY}" stroke-width="2"/>${t(cx, 247, sleepy ? "always “no complaint”" : "call if wait > 90 min", 13, NAVY)}
  <path d="M${cx - 52} 278 L${cx - 38} 316 H${cx + 38} L${cx + 52} 278" fill="none" stroke="${MUTED}" stroke-width="4"/>
</g>`;
  SC.s14 = {
    copy: [
      { k: "Your turn", m: "Two models for the clinic.", s: "Model A always says “no complaint”. Model B calls everyone who waits more than 90 minutes.", l: "Model A or model B?" },
      { k: "Your turn", m: "Which one would you put to work?", s: "Choose under the picture.", l: "Choose a model" },
      { k: "Model A", m: "85.4% accurate, yet it never catches a single complaint.", s: "", l: "A: 85.4% accurate, 0 caught" },
      { k: "Model B", m: "93.0% accurate, and it catches 605 of the 758 complaints.", s: "It also makes 209 false alarms.", l: "B: 93.0% accurate, 605 caught" },
      { k: "The lesson", m: "Always ask: how often is it right, and how many of the cases that matter does it catch?", s: "", l: "Ask two questions" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
${t(130, 60, "Model A", 18, NAVY, "middle", 800)}${t(350, 60, "Model B", 18, NAVY, "middle", 800)}
<rect class="a o0 selA" x="40" y="66" width="180" height="262" rx="18" fill="none" stroke="${TERRA}" stroke-width="4"/>
<rect class="a o0 selB" x="260" y="66" width="180" height="262" rx="18" fill="none" stroke="${TERRA}" stroke-width="4"/>
${robot(130, true, "rA")}${robot(350, false, "rB")}
<g>${["z", "z", "Z"].map((z, k) => `<text x="${178 + k * 11}" y="${100 - k * 12}" font-size="${13 + k * 4}" font-weight="800" fill="${MUTED}">${z}<animate attributeName="opacity" values="0;1;0" dur="2s" begin="${k * .4}s" repeatCount="indefinite"/></text>`).join("")}</g>
<g>${clock(392, 196, 13, "spin")}</g>
<g class="a o0 qm pulse2">${t(130, 196, "?", 30, TERRA, "middle", 900)}${t(350, 196, "?", 30, TERRA, "middle", 900)}</g>
<g class="a o0 rainA">${Array.from({ length: 7 }, (_, k) => `<circle cx="${92 + k * 13}" cy="-10" r="6" fill="${TERRA}"><animate attributeName="cy" values="-10;380" dur="1.6s" begin="${k * .23}s" repeatCount="indefinite"/></circle>`).join("")}
  <rect x="58" y="330" width="144" height="26" rx="13" fill="${TERRA}"/>${t(130, 348, "0 of 758 caught", 14, "#fff")}
  <rect x="70" y="16" width="120" height="26" rx="13" fill="${GOLD}"/>${t(130, 34, "85.4% accurate", 14, INK)}</g>
<g class="a o0 rainB">${Array.from({ length: 7 }, (_, k) => `<circle cx="${312 + k * 13}" cy="-10" r="6" fill="${k === 3 ? GOLD : TERRA}"><animate attributeName="cy" values="-10;300;300" keyTimes="0;.7;1" dur="1.6s" begin="${k * .23}s" repeatCount="indefinite"/></circle>`).join("")}
  ${Array.from({ length: 9 }, (_, k) => `<circle cx="${322 + (k % 5) * 9}" cy="${306 - Math.floor(k / 5) * 9}" r="5" fill="${TERRA}"/>`).join("")}
  <rect x="270" y="330" width="160" height="26" rx="13" fill="${GREEN}"/>${t(350, 348, "605 of 758 caught", 14, "#fff")}
  <rect x="290" y="16" width="120" height="26" rx="13" fill="${GOLD}"/>${t(350, 34, "93.0% accurate", 14, INK)}</g>
<g class="a o0 lesson"><rect x="20" y="132" width="440" height="58" rx="14" fill="${NAVY}"/>${lines2(240, 156, "How often is it right?", "How many cases that matter does it catch?", 15, "#fff")}</g>`,
    render(r, b) {
      H.show(r, ".qm", b === 1 && !r._pick);
      H.show(r, ".rainA", b >= 2); H.show(r, ".rainB", b >= 3); H.show(r, ".lesson", b >= 4);
      H.set(r, ".rA", "opacity", b >= 4 ? ".35" : "1"); H.set(r, ".rB", "opacity", b >= 4 ? ".35" : "1");
    },
    choose(r, p) { r._pick = p; H.show(r, ".qm", false); H.show(r, ".sel" + p.toUpperCase(), true); }
  };

  /* ------------------------------------------------------------ s08 · six uses in quality */
  const cell = (k, art, a, bb) => { const c = (k - 1) % 3, rr = Math.floor((k - 1) / 3), x = 9 + c * 157, y = 10 + rr * 174;
    return `<g class="a o0 cell c${k}"><rect x="${x}" y="${y}" width="148" height="164" rx="14" fill="#fff" stroke="#E0D8C8" stroke-width="2" class="cb"/>
      <g transform="translate(${x} ${y})">${art}</g>${lines2(x + 74, y + 132, a, bb, 14, NAVY)}</g>`; };
  SC.s08 = {
    copy: [
      { k: "Why it matters for quality", m: "Machine learning already works in quality management.", s: "Here are six examples.", l: "Six examples" },
      { k: "1 · Predictive maintenance", m: "Sensor readings warn that a machine will fail, so repairs are planned, not urgent.", s: "Your Assessment 3 is exactly this kind of problem.", l: "Predictive maintenance" },
      { k: "2 · Visual inspection", m: "Cameras spot scratches, cracks or missing parts on a production line.", s: "Faster than a tired human eye.", l: "Visual inspection" },
      { k: "3 · Complaint prediction", m: "Staff can reach a patient before the complaint is written.", s: "Just like in our clinic.", l: "Complaint prediction" },
      { k: "4 · Demand forecasting", m: "Predict tomorrow’s patients, orders or calls to plan staff and stock.", s: "", l: "Demand forecasting" },
      { k: "5 and 6", m: "Spot unusual readings no rule expected, and sort thousands of comments by topic and tone.", s: "Text analytics comes in Week 13.", l: "Anomalies and text" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
${cell(1, `<rect x="30" y="30" width="62" height="56" rx="8" fill="${NAVY}"/>${gear(61, 58, 13, "#9FC0DD", "spin")}
  <path d="M96 70 l8 -12 l8 22 l8 -30 l8 20 l8 -8" fill="none" stroke="${GREEN}" stroke-width="3"><animate attributeName="stroke" values="${GREEN};${GREEN};${TERRA};${TERRA}" dur="3s" repeatCount="indefinite"/></path>
  <g class="blink"><path d="M118 18 L132 42 H104Z" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>${t(118, 39, "!", 13, INK, "middle", 900)}</g>`, "Predictive", "maintenance")}
${cell(2, `<rect x="10" y="76" width="128" height="10" rx="5" fill="${MUTED}"/>
  ${[0, 1, 2].map(k => `<g><rect x="0" y="0" width="22" height="22" rx="3" fill="${k === 1 ? "#E9C9A8" : "#C9D6E3"}" stroke="${INK}" stroke-width="1.5"/>${k === 1 ? `<path d="M5 6 l6 6 l-3 4 l7 4" stroke="${TERRA}" stroke-width="2" fill="none"/>` : ""}<animateTransform attributeName="transform" type="translate" values="-24 54; 150 54" dur="4.5s" begin="${k * 1.5}s" repeatCount="indefinite"/></g>`).join("")}
  <rect x="62" y="8" width="26" height="18" rx="4" fill="${INK}"/><circle cx="75" cy="17" r="5" fill="${SKY}"/>
  <path d="M68 26 L52 74 H98 L82 26Z" fill="${GOLD}" fill-opacity=".35" class="blink"/>`, "Visual", "inspection")}
${cell(3, `${person(46, 96, TERRA, 1.3)}<g class="ringing" style="transform-box:view-box;transform-origin:96px 52px"><rect x="86" y="36" width="20" height="32" rx="4" fill="${INK}"/><rect x="89" y="40" width="14" height="20" fill="#fff"/></g>
  <path d="M112 36 q8 10 0 20 M120 30 q12 16 0 32" stroke="${TERRA}" stroke-width="2.5" fill="none" class="blink"/>`, "Complaint", "prediction")}
${cell(4, `${[30, 44, 38, 56].map((h, k) => `<rect x="${18 + k * 24}" y="${96 - h}" width="16" height="${h}" rx="2" fill="${NAVY}"/>`).join("")}
  <rect x="114" y="28" width="16" height="68" rx="2" fill="${GREEN}" fill-opacity=".25" stroke="${GREEN}" stroke-width="2" stroke-dasharray="4 3" class="blink"/>${t(122, 22, "?", 15, GREEN, "middle", 900)}
  <line x1="12" x2="138" y1="97" y2="97" stroke="${MUTED}" stroke-width="2"/>`, "Demand", "forecasting")}
${cell(5, `<path class="draw-loop" pathLength="1" d="M10 70 L30 64 L48 72 L66 62 L80 66 L92 18 L104 68 L122 62 L140 66" fill="none" stroke="${NAVY}" stroke-width="3"/>
  <circle cx="92" cy="18" r="8" fill="none" stroke="${TERRA}" stroke-width="3" class="pulse" style="transform-box:fill-box;transform-origin:center"/>`, "Anomaly", "detection")}
${cell(6, `<rect x="16" y="62" width="44" height="34" rx="6" fill="${GREEN}" fill-opacity=".2" stroke="${GREEN}" stroke-width="2"/>${t(38, 85, "+", 18, GREEN, "middle", 900)}
  <rect x="88" y="62" width="44" height="34" rx="6" fill="${TERRA}" fill-opacity=".15" stroke="${TERRA}" stroke-width="2"/>${t(110, 85, "−", 18, TERRA, "middle", 900)}
  ${[0, 1, 2].map(k => `<g><path d="M-14 -10 h28 v16 h-18 l-6 6 v-6 h-4z" fill="#fff" stroke="${k === 1 ? TERRA : GREEN}" stroke-width="2"/><animateMotion dur="2.4s" begin="${k * .8}s" repeatCount="indefinite" path="M74 14 Q74 40 ${k === 1 ? 110 : 38} 70"/></g>`).join("")}`, "Text", "analytics")}
${t(240, 190, "6 examples", 30, NAVY, "middle", 800, "a intro")}`,
    render(r, b) {
      for (let k = 1; k <= 6; k++) {
        const on = b === 0 ? true : (k <= b || (b >= 5 && k === 6)), cur = (k === b) || (b === 5 && k >= 5);
        H.set(r, ".c" + k, "opacity", b === 0 ? ".22" : on ? "1" : "0");
        H.tf(r, ".c" + k, cur ? "scale(1.04)" : "none");
        H.q(r, ".c" + k + " .cb").forEach(e => { e.style.stroke = cur ? TERRA : "#E0D8C8"; });
      }
      H.show(r, ".intro", b === 0);
    }
  };

  /* ------------------------------------------------------------ s09 · a short history: the camera travels a road */
  const MS = [
    [110, "1943", "first math model", "of a brain cell"], [260, "1957", "the perceptron", "learns from examples"], [410, "1959", "checkers program:", "“machine learning”"],
    [620, "1986", "many-layer networks", "become trainable"], [770, "1995", "support vector", "machines"], [920, "2001", "random", "forests"],
    [1110, "2012", "deep learning wins", "ImageNet"], [1260, "2017", "the Transformer:", "language models"], [1410, "2022", "ChatGPT reaches", "the public"]];
  const ICON = [
    x => `<circle cx="${x}" cy="160" r="16" fill="${NAVY}"/>${[-60, -20, 20, 60, 160, 200].map(a => `<line x1="${x}" y1="160" x2="${x + Math.cos(a * Math.PI / 180) * 34}" y2="${160 + Math.sin(a * Math.PI / 180) * 34}" stroke="${NAVY}" stroke-width="3"/>`).join("")}`,
    x => [130, 160, 190].map(y => `<circle cx="${x - 40}" cy="${y}" r="7" fill="${SKY}" stroke="${NAVY}" stroke-width="2"/><line x1="${x - 33}" y1="${y}" x2="${x - 12}" y2="160" stroke="${NAVY}" stroke-width="2.5"/>`).join("") + `<circle cx="${x}" cy="160" r="14" fill="${TERRA}"/><path d="M${x + 14} 160 H${x + 40}" stroke="${TERRA}" stroke-width="3"/>`,
    x => Array.from({ length: 16 }, (_, k) => `<rect x="${x - 32 + (k % 4) * 16}" y="${128 + Math.floor(k / 4) * 16}" width="16" height="16" fill="${(k + Math.floor(k / 4)) % 2 ? INK : "#fff"}" stroke="${INK}"/>`).join("") + `<circle cx="${x - 8}" cy="${136 + 16}" r="6" fill="${TERRA}"/><circle cx="${x + 24}" cy="${136 + 32}" r="6" fill="${GOLD}"/>`,
    x => [[-36, [130, 160, 190]], [0, [124, 148, 172, 196]], [36, [145, 175]]].map(([dx, ys], li, arr) => ys.map(y => (li < 2 ? arr[li + 1][1].map(y2 => `<line x1="${x + dx}" y1="${y}" x2="${x + arr[li + 1][0]}" y2="${y2}" stroke="${SKY}" stroke-width="1.5"/>`).join("") : "") + `<circle cx="${x + dx}" cy="${y}" r="6" fill="${NAVY}"/>`).join("")).join(""),
    x => `<line x1="${x - 34}" y1="196" x2="${x + 34}" y2="124" stroke="${INK}" stroke-width="3"/><line x1="${x - 48}" y1="184" x2="${x + 20}" y2="112" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="${x - 20}" y1="208" x2="${x + 48}" y2="136" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 3"/>` + [[-30, 140], [-38, 162], [-14, 132]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="6" fill="${NAVY}"/>`).join("") + [[24, 186], [34, 166], [8, 196]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="6" fill="${TERRA}"/>`).join(""),
    x => [-30, 0, 30].map(dx => `<rect x="${x + dx - 3}" y="170" width="6" height="26" fill="#7A5A3A"/><path d="M${x + dx} 124 L${x + dx + 18} 176 H${x + dx - 18}Z" fill="${GREEN}"/>`).join(""),
    x => `<rect x="${x - 34}" y="126" width="68" height="56" rx="4" fill="#fff" stroke="${NAVY}" stroke-width="3"/><path d="M${x - 30} 176 L${x - 10} 148 L${x + 4} 164 L${x + 14} 154 L${x + 30} 176Z" fill="${GREEN}"/><circle cx="${x + 18}" cy="140" r="6" fill="${GOLD}"/><rect x="${x - 26}" y="186" width="52" height="16" rx="8" fill="${TERRA}"/>${t(x, 198, "label", 11, "#fff")}`,
    x => [-30, -6, 18].map((dx, k) => `<rect x="${x + dx - 10}" y="180" width="22" height="16" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="2"/>`).join("") + `<path d="M${x - 29} 178 Q${x - 5} 120 ${x + 19} 178 M${x - 5} 178 Q${x + 7} 146 ${x + 19} 178" fill="none" stroke="${TERRA}" stroke-width="2.5"/>`,
    x => `<rect x="${x - 40}" y="124" width="58" height="30" rx="10" fill="${SKY}"/><path d="M${x - 30} 154 l-4 10 l14 -10" fill="${SKY}"/><rect x="${x - 14}" y="162" width="56" height="30" rx="10" fill="${GREEN}"/><path d="M${x + 32} 192 l6 9 l-16 -9" fill="${GREEN}"/>${[0, 1, 2].map(k => `<circle cx="${x + 2 + k * 12}" cy="177" r="3" fill="#fff"><animate attributeName="opacity" values=".2;1;.2" dur="1.2s" begin="${k * .2}s" repeatCount="indefinite"/></circle>`).join("")}`];
  SC.s09 = {
    copy: [
      { k: "A short history", m: "Machine learning sounds new, but most of its ideas are old.", s: "", l: "1943 to 2022" },
      { k: "1943 and 1957", m: "A first mathematical model of a brain cell, then the perceptron: a machine that learns from examples.", s: "", l: "The first learning machines" },
      { k: "1959", m: "Arthur Samuel’s checkers program made the phrase “machine learning” popular.", s: "", l: "The name appears" },
      { k: "1986, 1995, 2001", m: "Many-layer networks became trainable, then came support vector machines and random forests.", s: "", l: "The classic toolbox" },
      { k: "2012 to 2022", m: "Deep learning won contest after contest, and ChatGPT brought language models to the public.", s: "", l: "The deep-learning era" },
      { k: "What changed", m: "The ideas are decades old. What changed after 2010 was the amount of data and the speed of computers.", s: "", l: "More data, faster computers" }
    ],
    svg: `
<rect width="480" height="360" fill="#F3EEE4"/>
<style>@keyframes s09road{to{stroke-dashoffset:-48}}.s09 .lane{animation:s09road 1.2s linear infinite}</style>
<g class="cam s09">
  <rect x="-40" y="222" width="1540" height="36" fill="#CFC6B6"/>
  <path class="lane" d="M-40 240 H1500" stroke="#fff" stroke-width="4" stroke-dasharray="24 24"/>
  ${MS.map(([x, y, a, bb], k) => `<g class="ms">${ICON[k](x)}<line x1="${x}" y1="206" x2="${x}" y2="222" stroke="${MUTED}" stroke-width="3"/><circle cx="${x}" cy="240" r="9" fill="${TERRA}" stroke="#fff" stroke-width="3"/>${t(x, 284, y, 24, TERRA, "middle", 800)}${lines2(x, 306, a, bb, 15, INK)}</g>`).join("")}
  <g class="a o0 boom"><path class="dr" pathLength="1" d="M60 210 C 600 205, 900 190, 1040 150 S 1300 -40, 1440 -140" fill="none" stroke="${GREEN}" stroke-width="14" stroke-linecap="round"/></g>
</g>
${t(240, 66, "1943 → 2022", 34, NAVY, "middle", 800, "a o0 ov")}
<g class="a o0 ov2"><rect x="40" y="26" width="400" height="58" rx="14" fill="${GREEN}"/>${lines2(240, 50, "after 2010: far more data", "and far faster computers", 17, "#fff")}</g>`,
    render(r, b) {
      const view = [[760, 215, .32], [185, 215, 1], [410, 215, 1], [770, 215, .9], [1260, 215, .9], [760, 215, .32]][b] || [760, 215, .32];
      H.cam(r, view[0], view[1], view[2]);
      H.show(r, ".ov", b === 0); H.show(r, ".ov2", b === 5); H.show(r, ".boom", b === 5); H.draw(r, ".boom .dr", b === 5); H.delay(r, ".boom .dr", b === 5 ? .8 : 0);
    }
  };

  /* ------------------------------------------------------------ s10 · two goals */
  const risk = [["82%", .82], ["64%", .64], ["21%", .21], ["9%", .09]];
  SC.s10 = {
    copy: [
      { k: "Two goals", m: "A model can serve two different goals.", s: "", l: "Two goals" },
      { k: "Goal 1 · Understanding", m: "Which factors go with complaints, and how sure are we?", s: "We look at coefficients and confidence intervals.", l: "Understanding a relationship" },
      { k: "Goal 2 · Prediction", m: "Which future patients will complain?", s: "We judge the model by its errors on new cases.", l: "Predicting an outcome" },
      { k: "Your choice", m: "Statistics and machine learning can both serve either goal. Your research question decides.", s: "", l: "Your question decides" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
<style>@keyframes s10mag{0%,100%{transform:translate(0,0)}50%{transform:translate(110px,-60px)}}.s10 .mag{animation:s10mag 5s ease-in-out infinite}</style>
<g class="s10">
<g class="a pl"><rect x="10" y="24" width="222" height="270" rx="16" fill="#fff" stroke="#E0D8C8" stroke-width="2"/>
  ${t(121, 56, "Understanding", 20, NAVY, "middle", 800)}
  <path d="M34 262 V86 M34 262 H214" stroke="${MUTED}" stroke-width="2"/>
  ${[[50, 236], [66, 226], [80, 230], [96, 208], [112, 214], [126, 190], [142, 182], [158, 172], [172, 166], [190, 146], [204, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${NAVY}" fill-opacity=".5"/>`).join("")}
  <path class="dr" pathLength="1" d="M42 240 L210 136" stroke="${TERRA}" stroke-width="4"/>
  <g class="a o0 ci"><path d="M42 228 L210 150 M42 252 L210 122" stroke="${TERRA}" stroke-width="1.5" stroke-dasharray="4 4"/><rect x="66" y="96" width="120" height="26" rx="13" fill="${TERRA}"/>${t(126, 114, "β ± interval", 14, "#fff")}</g>
  <g class="mag"><circle cx="62" cy="224" r="18" fill="${SKY}" fill-opacity=".45" stroke="${INK}" stroke-width="4"/><path d="M75 237 L92 254" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>
</g>
<g class="a pr"><rect x="248" y="24" width="222" height="270" rx="16" fill="#fff" stroke="#E0D8C8" stroke-width="2"/>
  ${t(359, 56, "Prediction", 20, TERRA, "middle", 800)}${t(359, 80, "tomorrow’s patients", 13, MUTED, "middle", 600)}
  ${risk.map(([lab, v], k) => { const y = 108 + k * 44; return `<g>${person(278, y + 22, k < 2 ? TERRA : NAVY, .7)}<rect x="300" y="${y + 4}" width="120" height="14" rx="7" fill="#EEE8DC"/><rect class="a rb" x="300" y="${y + 4}" width="${120 * v}" height="14" rx="7" fill="${k < 2 ? TERRA : NAVY}" style="transform:scaleX(0);transform-origin:left center"/>${t(444, y + 16, lab, 13, INK)}${k < 2 ? `<g class="a o0 flagx blink"><path d="M${302 + 120 * v} ${y + 18} v-24 h16 l-5 6 l5 6 h-16" fill="${GOLD}" stroke="${INK}" stroke-width="1"/></g>` : ""}</g>`; }).join("")}
</g>
<g class="a o0 post"><rect x="236" y="300" width="8" height="58" fill="#7A5A3A"/>
  <path d="M124 304 H236 V328 H124 L112 316Z" fill="${NAVY}"/>${t(178, 321, "understand", 14, "#fff")}
  <path d="M244 304 H356 L368 316 L356 328 H244Z" fill="${TERRA}"/>${t(300, 321, "predict", 14, "#fff")}
  <rect x="146" y="332" width="188" height="24" rx="12" fill="#fff" stroke="${INK}" stroke-width="2"/>${t(240, 349, "your question decides", 13, INK)}</g>
</g>`,
    render(r, b) {
      H.set(r, ".pl", "opacity", b === 1 || b === 3 ? "1" : ".35"); H.set(r, ".pr", "opacity", b === 2 || b === 3 ? "1" : ".35");
      H.tf(r, ".pl", b === 1 ? "scale(1.03)" : "none"); H.tf(r, ".pr", b === 2 ? "scale(1.03)" : "none");
      H.draw(r, ".pl .dr", b >= 1); H.show(r, ".ci", b >= 1); H.delay(r, ".ci", b >= 1 ? 1 : 0); H.cls(r, ".mag", "paused", b < 1);
      H.q(r, ".rb").forEach((e, i) => { e.style.transitionDelay = (.3 + i * .2) + "s"; e.style.transform = b >= 2 ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".flagx", b >= 2); H.delay(r, ".flagx", b >= 2 ? 1.4 : 0); H.show(r, ".post", b >= 3);
    }
  };

  /* ------------------------------------------------------------ s11 · 30-second check (signpost) */
  SC.s11 = {
    copy: [
      { k: "30-second check", m: "Is each question about understanding, or about prediction?", s: "Answer A and B under the picture.", l: "Understanding or prediction?" },
      { k: "Question A", m: "“Is a longer wait linked to more complaints?” is about understanding a relationship.", s: "", l: "A: understanding" },
      { k: "Question B", m: "“Which patients tomorrow will complain?” is about prediction.", s: "", l: "B: prediction" }
    ],
    svg: `
<rect width="480" height="360" fill="#F3EEE4"/><rect y="320" width="480" height="40" fill="#E2D6C0"/>
<rect x="234" y="120" width="12" height="204" fill="#7A5A3A"/>
<path d="M68 132 H234 V176 H68 L44 154Z" fill="${NAVY}"/>${t(146, 161, "Understanding", 17, "#fff")}
<path d="M246 188 H412 L436 210 L412 232 H246Z" fill="${TERRA}"/>${t(334, 217, "Prediction", 17, "#fff")}
<g class="a cA" style="transform:translate(186px,36px)"><rect x="0" y="0" width="52" height="52" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="3"/>${t(26, 36, "A", 26, NAVY, "middle", 900)}<g class="a o0 okA">${t(60, 36, "✓", 26, GREEN, "middle", 900)}</g></g>
<g class="a cB" style="transform:translate(250px,36px)"><rect x="0" y="0" width="52" height="52" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="3"/>${t(26, 36, "B", 26, TERRA, "middle", 900)}<g class="a o0 okB">${t(60, 36, "✓", 26, GREEN, "middle", 900)}</g></g>`,
    render(r, b) {
      H.tf(r, ".cA", b >= 1 ? "translate(110px,196px)" : "translate(186px,36px)"); H.show(r, ".okA", b >= 1);
      H.tf(r, ".cB", b >= 2 ? "translate(318px,250px)" : "translate(250px,36px)"); H.show(r, ".okB", b >= 2);
    }
  };

  /* ------------------------------------------------------------ s15 · chapter quiz (full-width interaction, no stage) */
  SC.s15 = { full: true, copy: [{ k: "Check yourself", m: "Five quick questions.", s: "", l: "Chapter quiz" }], svg: "", render() {} };

  /* ------------------------------------------------------------ s16 · four ideas to keep */
  const IDEA = [
    [x => `${folder(x + 6, 52, "✓")}${folder(x + 14, 36, "!")}<path d="M${x + 52} 64 H${x + 66}" stroke="${MUTED}" stroke-width="3"/>${gear(x + 84, 64, 13, NAVY, "spin")}`, "Rules are learned", "from past cases"],
    [x => `${[10, 8, 9, 30, 62, 80].map((h, k) => `<rect x="${x + 8 + k * 14}" y="${96 - h * .7}" width="10" height="${h * .7}" fill="${k < 3 ? NAVY : TERRA}"/>`).join("")}<path d="M${x + 13} 88 C ${x + 40} 90, ${x + 50} 86, ${x + 62} 70 S ${x + 86} 44, ${x + 91} 38" fill="none" stroke="${GREEN}" stroke-width="4"/>`, "Flexible models follow", "real shapes in data"],
    [x => `<path d="M${x + 44} 94 l10 -18 l10 18z" fill="${INK}"/><g class="rock" style="transform-box:view-box;transform-origin:${x + 54}px 76px"><rect x="${x + 6}" y="72" width="96" height="7" rx="3" fill="${INK}"/><rect x="${x + 6}" y="54" width="26" height="18" rx="4" fill="${NAVY}"/><rect x="${x + 76}" y="54" width="26" height="18" rx="4" fill="${GOLD}"/></g>`, "Caught vs false alarms:", "accuracy can fool you"],
    [x => `<circle cx="${x + 30}" cy="62" r="16" fill="${SKY}" stroke="${INK}" stroke-width="4"/><path d="M${x + 42} 74 l14 14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M${x + 66} 62 H${x + 100} M${x + 92} 54 l10 8 l-10 8" stroke="${TERRA}" stroke-width="4" fill="none"/>`, "Understand or predict?", "your question decides"]];
  SC.s16 = {
    copy: [
      { k: "Chapter summary", m: "Four ideas to keep from this chapter.", s: "", l: "Four ideas" },
      { k: "Idea 1", m: "Machine learning finds rules in past cases, instead of a person writing them.", s: "", l: "Rules from past cases" },
      { k: "Idea 2", m: "A flexible model can follow real shapes in the data, like the jump after 80 minutes.", s: "", l: "Flexible shapes" },
      { k: "Idea 3", m: "Every rule trades complaints caught against false alarms, so accuracy alone can fool you.", s: "", l: "Caught vs false alarms" },
      { k: "Idea 4", m: "Your research question decides: understand a relationship, or predict an outcome.", s: "", l: "Your question decides" },
      { k: "Next", m: "Chapter 2: how a machine learns, and how we check that it has not simply memorised the past.", s: "", l: "On to Chapter 2" }
    ],
    svg: `
<rect width="480" height="360" fill="#FBF8F1"/>
${IDEA.map(([art, a, bb], k) => { const x = 12 + (k % 2) * 234, y = 12 + Math.floor(k / 2) * 150;
      return `<g class="a o0 idea i${k + 1}"><rect x="${x}" y="${y}" width="222" height="140" rx="16" fill="#fff" stroke="#E0D8C8" stroke-width="2"/>
      <g transform="translate(0 ${y - 12})">${art(x)}</g>
      <circle cx="${x + 196}" cy="${y + 26}" r="15" fill="${GREEN}"/><path class="dr" pathLength="1" d="M${x + 188} ${y + 26} l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="4"/>
      ${lines2(x + 111, y + 106, a, bb, 15, NAVY)}</g>`; }).join("")}
<g class="a o0 next"><rect x="12" y="312" width="456" height="42" rx="21" fill="${NAVY}"/>
  <rect x="30" y="318" width="22" height="30" fill="${GOLD}"/><rect class="a nd" x="30" y="318" width="22" height="30" fill="#7A5A3A" style="transform-origin:left center"/>
  ${t(258, 339, "Next: Chapter 2 · how a machine learns from data", 15, "#fff")}</g>`,
    render(r, b) {
      for (let k = 1; k <= 4; k++) { H.show(r, ".i" + k, b >= k || b === 0); H.set(r, ".i" + k, "opacity", b === 0 ? ".25" : b >= k ? "1" : "0"); H.draw(r, ".i" + k + " .dr", b >= k); H.tf(r, ".i" + k, k === b ? "scale(1.03)" : "none"); }
      H.show(r, ".next", b >= 5); H.tf(r, ".nd", b >= 5 ? "scaleX(.15)" : "none"); H.delay(r, ".nd", b >= 5 ? .8 : 0);
    }
  };
})();
