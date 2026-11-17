/* Week 11 · Chapter 1 animated scenes, part C (s17–s25, added 17 Nov 2026). Uses window.SCH from scenes-a.js.
   Data: window.W11X (real figures computed with scikit-learn 1.8 on the Al Waha file, 5,200 visits after removing duplicates). */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, X = window.W11X;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED } = H.C;
  const { t, person } = H;
  const GREY = "#9AA3B2", PAPER = "#F6F1E7", EDGE = "#CDBFA6";
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const fo = (x, y, w, h, html, size, color, weight, extra) =>
    `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:${weight || 600} ${size || 13}px Calibri,Segoe UI,sans-serif;color:${color || INK};line-height:1.25;${extra || ""}">${html}</div></foreignObject>`;
  const alive = r => { const s = r.querySelector("svg"); return () => s && s.isConnected; };
  const RA = X.readmitted_30d, CO = X.complaint_filed;

  /* ------------------------------------------------------------ s17 · three kinds of learning */
  const DOTS17 = [[0, 30, 30], [0, 44, 22], [0, 36, 46], [0, 52, 38], [1, 92, 34], [1, 104, 22], [1, 112, 44], [1, 98, 52], [2, 60, 86], [2, 74, 78], [2, 68, 98], [2, 84, 92]];
  SC.s17 = {
    copy: [
      { k: "Three kinds", m: "What does the computer learn from?", s: "That question sorts machine learning into three kinds.", l: "Three kinds of learning" },
      { k: "1 · Supervised", m: "Every past case comes with its answer.", s: "Like a teacher marking homework: complaint, or no complaint.", l: "With answers" },
      { k: "2 · Unsupervised", m: "No answers at all. Find structure alone.", s: "Groups of similar patients: Week 12.", l: "Without answers" },
      { k: "3 · Reinforcement", m: "Learn by trial and error, for a reward.", s: "As game-playing programs do.", l: "By reward" },
      { k: "In quality research", m: "You will mostly meet the first two.", s: "This chapter is about supervised learning.", l: "Supervised, here" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${[0, 1, 2].map(i => `<g class="pn17" data-i="${i}" style="transition:opacity .6s"><rect class="pr17" x="${10 + i * 155}" y="16" width="150" height="270" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2" style="transition:stroke .4s"/>
  <circle cx="${32 + i * 155}" cy="40" r="12" fill="${[NAVY, TERRA, GREEN][i]}"/>${t(32 + i * 155, 45, i + 1, 13, "#fff")}${t(50 + i * 155, 45, ["Supervised", "Unsupervised", "Reinforcement"][i], 14, INK, "start", 800)}</g>`).join("")}
<g class="sup17">${[0, 1, 2, 3, 4].map(k => { const y = 68 + k * 34, yes = k === 1 || k === 4; return `<g class="a o0 r17" style="transition-delay:${k * .2}s;transform:translateX(-10px)"><rect x="22" y="${y}" width="84" height="24" rx="5" fill="${SKY}"/>${[0, 1, 2].map(j => `<rect x="${28 + j * 25}" y="${y + 9}" width="18" height="6" rx="3" fill="${NAVY}" fill-opacity=".5"/>`).join("")}
  <g class="a o0 tag17" style="transition-delay:${.9 + k * .2}s"><rect x="112" y="${y}" width="38" height="24" rx="12" fill="${yes ? TERRA : GREEN}"/>${t(131, y + 17, yes ? "yes" : "no", 12, "#fff", "middle", 800)}</g></g>`; }).join("")}
  <g class="a o0 tch17">${person(86, 280, NAVY, .9)}${t(104, 262, "✓ answers", 12, NAVY, "start", 800)}</g></g>
<g class="uns17" transform="translate(184 80)">${DOTS17.map(([g, x, y], k) => `<circle class="d17" data-g="${g}" cx="${x}" cy="${y}" r="7" style="fill:${GREY};transition:fill .7s ${(k * .08).toFixed(2)}s"/>`).join("")}
  <g class="a o0 ring17">${[[40, 34, NAVY], [102, 38, TERRA], [72, 88, GREEN]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="27" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="5 4"/>`).join("")}</g>
  ${t(72, 152, "no answers given", 12, MUTED, "middle", 700)}${t(72, 172, "→ groups found", 13, TERRA, "middle", 800)}</g>
<g class="rl17">
  ${[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => `<rect x="${336 + c * 28}" y="${78 + r * 28}" width="26" height="26" rx="4" fill="${(r === 1 && c === 2) || (r === 2 && c === 1) ? "#E3DCCD" : "#F1ECE2"}"/>`).join("")).join("")}
  <g transform="translate(${336 + 3 * 28 + 13} ${78 + 3 * 28 + 13})"><circle r="10" fill="${GOLD}"/>${t(0, 5, "★", 13, "#fff")}</g>
  <g class="bot17" style="transition:transform .6s"><circle cx="349" cy="91" r="9" fill="${GREEN}"/><circle cx="346" cy="89" r="2" fill="#fff"/><circle cx="352" cy="89" r="2" fill="#fff"/></g>
  <g class="a o0 rw17">${t(392, 222, "+1 reward", 14, GOLD, "middle", 800)}${t(392, 242, "try, fail, try again", 12, MUTED, "middle", 700)}</g></g>
<g class="a o0 ban17" style="transform:translateY(14px)"><rect x="40" y="298" width="400" height="48" rx="12" fill="${INK}"/>${t(240, 320, "This chapter: supervised learning", 16, "#fff", "middle", 800)}${t(240, 338, "Week 12: unsupervised", 12, GOLD, "middle", 700)}</g>`,
    render(r, b) {
      const live = alive(r); clearInterval(r._t17);
      H.q(r, ".pn17").forEach(g => { const i = +g.dataset.i, on = b === 0 || b === 4 || b === i + 1; g.style.opacity = on ? 1 : .3; g.querySelector(".pr17").style.stroke = b === i + 1 ? [NAVY, TERRA, GREEN][i] : ""; g.querySelector(".pr17").style.strokeWidth = b === i + 1 ? "3.5" : ""; });
      H.q(r, ".r17").forEach(e => { e.style.opacity = b >= 1 ? 1 : 0; e.style.transform = b >= 1 ? "none" : "translateX(-10px)"; });
      H.show(r, ".tag17", b >= 1); H.show(r, ".tch17", b >= 1);
      H.q(r, ".sup17,.uns17,.rl17").forEach((g, i) => { g.style.opacity = b === 0 || b === 4 || b === i + 1 ? 1 : .3; g.style.transition = "opacity .6s"; });
      H.q(r, ".d17").forEach(e => { e.style.fill = b >= 2 ? [NAVY, TERRA, GREEN][+e.dataset.g] : GREY; }); H.show(r, ".ring17", b >= 2); H.delay(r, ".ring17", b >= 2 ? 1.2 : 0);
      H.show(r, ".rw17", b >= 3);
      const path = [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3]], bot = r.querySelector(".bot17");
      if (b === 3) { let k = 0; bot.style.transform = "none"; r._t17 = setInterval(() => { if (!live()) { clearInterval(r._t17); return; } k = (k + 1) % (path.length + 2); const p = path[Math.min(k, path.length - 1)]; bot.style.transform = `translate(${p[0] * 28}px,${p[1] * 28}px)`; }, 650); }
      else bot.style.transform = b > 3 ? "translate(84px,84px)" : "none";
      H.show(r, ".ban17", b >= 4); H.tf(r, ".ban17", b >= 4 ? "none" : "translateY(14px)");
    }
  };

  /* ------------------------------------------------------------ s18 · features and labels */
  const COLS = ["wait", "staff", "training", "occup.", "handoffs", "prior", "complaint", "satisf."];
  const CX18 = [30, 82, 128, 180, 232, 280, 340, 412];
  const cell = (v, j) => v === null || v === undefined || (typeof v === "number" && isNaN(v)) ? "–" : j === 6 ? (v ? "yes" : "no") : j === 1 ? (+v).toFixed(2) : j >= 4 && j <= 5 ? v : (+v).toFixed(1);
  SC.s18 = {
    copy: [
      { k: "The shape of the data", m: "Five real visits from the Al Waha file.", s: "One row = one example.", l: "Five visits" },
      { k: "Features (X)", m: "The columns we predict from are the features.", s: "Waiting time, staff ratio, training, occupancy, handoffs, earlier visits.", l: "Features = X" },
      { k: "Label (y) · classification", m: "The column we predict is the label.", s: "A category, such as complaint yes or no: classification.", l: "Label: a category" },
      { k: "Label (y) · regression", m: "When the label is a number, it is regression.", s: "Such as a satisfaction score from 0 to 100.", l: "Label: a number" },
      { k: "In Python", m: "Features are called X. The label is called y.", s: "Capital X, small y: you will see them in every script.", l: "X and y" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="10" y="36" width="460" height="226" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<rect class="hx18" x="14" y="42" width="290" height="214" rx="9" fill="${NAVY}" fill-opacity=".1" stroke="${NAVY}" stroke-width="2.5" style="opacity:0;transition:opacity .6s"/>
<rect class="hy18" x="310" y="42" width="60" height="214" rx="9" fill="${TERRA}" fill-opacity=".12" stroke="${TERRA}" stroke-width="2.5" style="opacity:0;transition:opacity .6s"/>
<rect class="hs18" x="378" y="42" width="72" height="214" rx="9" fill="${GREEN}" fill-opacity=".12" stroke="${GREEN}" stroke-width="2.5" style="opacity:0;transition:opacity .6s"/>
${COLS.map((c, j) => t(CX18[j] + (j < 6 ? 10 : 0), 66, c, 12, MUTED, "middle", 800)).join("")}
<path d="M18 76 H462" stroke="${EDGE}" stroke-width="2"/>
${X.rows.map((row, i) => row.slice(1).map((v, j) => `<g class="a o0 c18" style="transition-delay:${(i * .15 + j * .03).toFixed(2)}s">${t(CX18[j] + (j < 6 ? 10 : 0), 104 + i * 34, cell(v, j), 14, j === 6 ? TERRA : j === 7 ? GREEN : INK, "middle", j >= 6 ? 800 : 500)}</g>`).join("")).join("")}
<g class="a o0 lx18">${t(159, 26, "features  X", 17, NAVY, "middle", 800)}</g>
<g class="a o0 ly18">${t(340, 26, "label  y", 17, TERRA, "middle", 800)}</g>
<g class="a o0 ls18">${t(414, 26, "or label  y", 15, GREEN, "middle", 800)}</g>
<g class="a o0 cl18" style="transform:translateY(12px)"><rect x="40" y="276" width="190" height="66" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>${t(135, 300, "a category → classification", 13.5, TERRA, "middle", 800)}${t(135, 324, "yes / no", 15, INK, "middle", 700)}</g>
<g class="a o0 rg18" style="transform:translateY(12px)"><rect x="250" y="276" width="190" height="66" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>${t(345, 300, "a number → regression", 13.5, GREEN, "middle", 800)}${t(345, 324, "69.9 · 81.9 · 94.0", 15, INK, "middle", 700)}</g>
<g class="a o0 py18"><rect x="120" y="276" width="240" height="66" rx="12" fill="${INK}"/><text x="240" y="304" text-anchor="middle" font-family="Consolas,monospace" font-size="15" fill="${GOLD}" font-weight="700">X = df[features]</text><text x="240" y="328" text-anchor="middle" font-family="Consolas,monospace" font-size="15" fill="#F6B8A0" font-weight="700">y = df["complaint_filed"]</text></g>`,
    render(r, b) {
      H.show(r, ".c18", true);
      r.querySelector(".hx18").style.opacity = b >= 1 ? 1 : 0; H.show(r, ".lx18", b >= 1);
      r.querySelector(".hy18").style.opacity = b >= 2 ? 1 : 0; H.show(r, ".ly18", b >= 2);
      r.querySelector(".hs18").style.opacity = b === 3 ? 1 : 0; H.show(r, ".ls18", b === 3);
      H.show(r, ".cl18", b === 2 || b === 3); H.tf(r, ".cl18", b >= 2 ? "none" : "translateY(12px)");
      H.show(r, ".rg18", b === 3); H.tf(r, ".rg18", b >= 3 ? "none" : "translateY(12px)");
      H.show(r, ".py18", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s19 · split before you fit */
  const G19 = Array.from({ length: 100 }, (_, i) => i);
  SC.s19 = {
    copy: [
      { k: "The most important habit", m: "Before training anything, split the data.", s: `${fmt(X.n)} visits, each square = 52.`, l: "Split first" },
      { k: "Training set · 75%", m: `${fmt(RA.ntrain)} visits to learn from.`, s: "The model sees only these.", l: `train ${fmt(RA.ntrain)}` },
      { k: "Test set · 25%", m: `${fmt(RA.ntest)} visits, locked away.`, s: "The model never sees them while it learns.", l: `test ${fmt(RA.ntest)}` },
      { k: "The final exam", m: "Unlock the test set and predict it.", s: "That score tells us how the model will do on tomorrow's patients.", l: "Score on unseen rows" },
      { k: "Remember", m: "A training score is a student marking their own exam.", s: "Only the test score counts.", l: "Test score only" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${G19.map(i => { const x = 40 + (i % 10) * 22, y = 40 + Math.floor(i / 10) * 22; return `<rect class="sq19" data-i="${i}" x="${x}" y="${y}" width="18" height="18" rx="3" fill="${GREY}" style="transition:transform 1.1s cubic-bezier(.3,.8,.25,1) ${(i * .012).toFixed(2)}s, fill .5s"/>`; }).join("")}
<g class="a o0 trb19"><rect x="22" y="26" width="270" height="200" rx="14" fill="none" stroke="${NAVY}" stroke-width="3" stroke-dasharray="8 5"/>${t(157, 18, "TRAINING · learn from these", 13, NAVY, "middle", 800)}</g>
<g class="a o0 teb19"><rect class="vault19" x="318" y="66" width="140" height="120" rx="14" fill="${INK}" fill-opacity=".06" stroke="${TERRA}" stroke-width="3"/>${t(388, 204, "TEST · locked", 14, TERRA, "middle", 800)}
  <g class="lock19" style="transition:transform .6s"><rect x="376" y="40" width="24" height="18" rx="3" fill="${INK}"/><path class="sh19" d="M381 40 v-7 a7 7 0 0 1 14 0 v7" fill="none" stroke="${INK}" stroke-width="3.5" style="transition:transform .6s;transform-box:fill-box;transform-origin:left bottom"/></g></g>
<g class="a o0 sc19" style="transform:scale(1.5)"><rect x="300" y="236" width="170" height="64" rx="12" fill="${GREEN}"/>${t(385, 262, "test score", 13, "#E7F3EA", "middle", 700)}${t(385, 288, "= the real grade", 17, "#fff", "middle", 800)}</g>
<g class="a o0 self19" style="transform:translateY(10px)"><rect x="22" y="272" width="270" height="72" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>${person(54, 334, NAVY, .85)}<path d="M82 300 l10 -10 l30 30 l-10 10 z" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>${fo(126, 280, 160, 58, "Marking your own exam: training score ✗", 13, TERRA, 800)}</g>`,
    render(r, b) {
      H.q(r, ".sq19").forEach(e => { const i = +e.dataset.i, test = i % 4 === 3, k = Math.floor(i / 4) % 25;
        if (b >= 2 && test) { const tx = 330 + (k % 5) * 24 - (40 + (i % 10) * 22), ty = 78 + Math.floor(k / 5) * 20 - (40 + Math.floor(i / 10) * 22); e.style.transform = `translate(${tx}px,${ty}px) scale(.85)`; e.style.fill = TERRA; }
        else { e.style.transform = "none"; e.style.fill = b >= 1 ? NAVY : GREY; } });
      H.show(r, ".trb19", b >= 1); H.show(r, ".teb19", b >= 2);
      r.querySelector(".sh19").style.transform = b >= 3 ? "rotate(-35deg) translateY(-6px)" : "none";
      H.show(r, ".sc19", b >= 3); H.tf(r, ".sc19", b >= 3 ? "scale(1)" : "scale(1.5)"); H.delay(r, ".sc19", b >= 3 ? .8 : 0);
      H.show(r, ".self19", b >= 4); H.tf(r, ".self19", b >= 4 ? "none" : "translateY(10px)");
    }
  };

  /* ------------------------------------------------------------ s20 · overfitting (real depth curve, readmissions) */
  const DP = RA.depth, CX = (i) => 70 + i * (380 / (DP.length - 1)), CY = v => 270 - (v - .5) / .5 * 220;
  const line = k => "M" + DP.map((d, i) => `${CX(i).toFixed(1)} ${CY(d[k]).toFixed(1)}`).join(" L");
  const BEST = DP.reduce((b, d, i) => d[2] > DP[b][2] ? i : b, 0), FULL = DP[DP.length - 1];
  SC.s20 = {
    copy: [
      { k: "The biggest danger", m: "Predict 30-day readmissions with a decision tree.", s: "Score = AUC: 1 is perfect, 0.5 is a coin flip.", l: "Readmissions · AUC" },
      { k: "Training data", m: "Deeper tree, more questions: the score climbs to 1.", s: `A fully grown tree: ${FULL[3]} leaves, perfect on the training data.`, l: `train → ${FULL[1].toFixed(2)}` },
      { k: "Test data", m: `Best at depth ${DP[BEST][0]}: ${DP[BEST][2].toFixed(2)}. Then it falls.`, s: `Fully grown: ${FULL[2].toFixed(2)} on new patients. Barely better than a coin.`, l: `test peak ${DP[BEST][2].toFixed(2)}` },
      { k: "Overfitting", m: "The deep tree memorised the training patients.", s: "Their noise too, instead of the pattern.", l: "Memorising ≠ learning" },
      { k: "The rule", m: "Choose a model by its test score.", s: "Never by its training score.", l: "Test score decides" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${[.5, .6, .7, .8, .9, 1].map(v => `<path d="M64 ${CY(v)} H456" stroke="#EEE8DC" stroke-width="1.5"/>${t(58, CY(v) + 4, v.toFixed(1), 10.5, MUTED, "end", 600)}`).join("")}
<path d="M64 46 V270 H456" fill="none" stroke="${MUTED}" stroke-width="2"/>
${DP.map((d, i) => i % 2 === 0 || i === DP.length - 1 ? t(CX(i), 288, d[0] === 99 ? "full" : d[0], 11, INK, "middle", 700) : "").join("")}${t(260, 308, "tree depth (number of questions in a row)", 12, MUTED, "middle", 700)}${t(26, 36, "AUC", 12, MUTED, "start", 800)}
<path class="gap20" d="${line(1)} L${DP.slice().reverse().map((d, j) => `${CX(DP.length - 1 - j).toFixed(1)} ${CY(d[2]).toFixed(1)}`).join(" L")} Z" fill="${TERRA}" fill-opacity=".1" style="opacity:0;transition:opacity .8s"/>
<path class="dr tr20" pathLength="1" d="${line(1)}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round" style="transition:stroke-dashoffset 2.4s ease"/>
<path class="dr te20" pathLength="1" d="${line(2)}" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linejoin="round" style="transition:stroke-dashoffset 2.4s ease"/>
<g class="a o0 ltr20">${t(CX(DP.length - 1) - 4, CY(FULL[1]) - 10, "training " + FULL[1].toFixed(2), 13, NAVY, "end", 800)}</g>
<g class="a o0 lte20">${t(CX(DP.length - 1) - 4, CY(FULL[2]) + 22, "test " + FULL[2].toFixed(2), 13, TERRA, "end", 800)}</g>
<g class="a o0 pk20"><circle class="pulse2" cx="${CX(BEST)}" cy="${CY(DP[BEST][2])}" r="11" fill="none" stroke="${GREEN}" stroke-width="3.5"/>${t(CX(BEST), CY(DP[BEST][2]) + 30, `best: depth ${DP[BEST][0]} · ${DP[BEST][2].toFixed(2)}`, 13, GREEN, "middle", 800)}</g>
<g class="a o0 st20" style="transform:scale(1.6)"><g transform="rotate(-6 300 120)"><rect x="196" y="98" width="208" height="42" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(300, 127, "OVERFITTING", 21, TERRA, "middle", 800)}</g></g>
<g class="a o0 rule20"><rect x="120" y="318" width="240" height="26" rx="13" fill="${INK}"/>${t(240, 336, "choose by the TEST score", 13.5, "#fff", "middle", 800)}</g>`,
    render(r, b) {
      H.draw(r, ".tr20", b >= 1); H.show(r, ".ltr20", b >= 1); H.delay(r, ".ltr20", b >= 1 ? 2 : 0);
      H.draw(r, ".te20", b >= 2); H.show(r, ".lte20", b >= 2); H.delay(r, ".lte20", b >= 2 ? 2 : 0);
      H.show(r, ".pk20", b >= 2); H.delay(r, ".pk20", b >= 2 ? 1.2 : 0);
      r.querySelector(".gap20").style.opacity = b >= 3 ? 1 : 0;
      H.show(r, ".st20", b === 3); H.tf(r, ".st20", b === 3 ? "scale(1)" : "scale(1.6)");
      H.show(r, ".rule20", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s21 · grow the tree yourself (activity) */
  const NODE = (x, y, c) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`;
  SC.s21 = {
    copy: [
      { k: "Your turn", m: "Grow the tree: from one question to fully grown.", s: "Readmissions, real data.", l: "Grow the tree" },
      { k: "Your turn", m: "Find the depth you would choose.", s: "Then press Continue.", l: "Pick a depth" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="290" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<g class="tree21"></g>
${t(157, 334, "", 13, MUTED, "middle", 700, "lv21")}
<rect x="312" y="12" width="156" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(390, 70, "AUC", 13, MUTED, "middle", 800)}
<path d="M326 296 H456" stroke="${MUTED}" stroke-width="2"/>
${[["training", NAVY, 344], ["test", TERRA, 404]].map(([n, c, x], i) => `<rect class="bar21 b21-${i}" x="${x}" y="96" width="44" height="200" fill="${c}" style="transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform .6s"/>${t(x + 22, 316, n, 12.5, c, "middle", 800)}${t(x + 22, 90, "", 15, INK, "middle", 800, "bv21-" + i)}`).join("")}
<path d="M326 ${296 - 240 * .5 / .5 * 0} H456" stroke="none"/>
<g class="coin21">${t(390, 336, "0.5 = coin flip", 10.5, MUTED, "middle", 600)}</g>`,
    update(r, i) {
      const d = DP[i], depth = d[0] === 99 ? 14 : d[0], shown = Math.min(depth, 6), g = r.querySelector(".tree21"); if (!g) return;
      let s = "", lvl = [[157, 64]];
      for (let L = 0; L < shown; L++) { const nx = [], w = 260 / Math.pow(2, L + 1);
        lvl.forEach(([x, y]) => { [[x - w / 2, y + 36], [x + w / 2, y + 36]].forEach(([cx, cy]) => { s += `<path d="M${x} ${y} L${cx} ${cy}" stroke="${GREY}" stroke-width="${Math.max(1, 2.5 - L * .3)}"/>`; nx.push([cx, cy]); }); s += NODE(x, y, NAVY); });
        lvl = nx; }
      lvl.forEach(([x, y]) => { s += NODE(x, y, d[2] < .6 ? TERRA : GREEN); });
      if (depth > 6) s += `<text x="157" y="${64 + 6 * 36 + 24}" text-anchor="middle" font-size="13" fill="${TERRA}" font-weight="800">… and ${depth - 6} more levels of questions</text>`;
      g.innerHTML = s;
      r.querySelector(".lv21").textContent = `depth ${d[0] === 99 ? "full" : d[0]} · ${d[3]} leaves`;
      [1, 2].forEach((k, j) => { r.querySelector(".b21-" + j).style.transform = `scaleY(${Math.max(0, (d[k] - .5) / .5).toFixed(3)})`; r.querySelector(".bv21-" + j).textContent = d[k].toFixed(2); });
      return d;
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s21.update(r, 0); } }
  };

  /* ------------------------------------------------------------ s22 · the confusion matrix (90-minute rule) */
  const CM = [[605, "caught", GREEN, "real complaint · predicted complaint"], [153, "missed", TERRA, "real complaint · predicted no"], [209, "false alarm", GOLD, "no complaint · predicted complaint"], [4237, "correctly left alone", NAVY, "no complaint · predicted no"]];
  SC.s22 = {
    copy: [
      { k: "Four boxes", m: "Every yes or no prediction lands in one of four boxes.", s: "The confusion matrix of the 90-minute rule.", l: "Confusion matrix" },
      { k: "Real complaints", m: "605 caught. 153 missed.", s: "Of the 758 real complaints.", l: "605 · 153" },
      { k: "No complaint", m: "209 false alarms. 4,237 correctly left alone.", s: "Of the 4,446 patients who did not complain.", l: "209 · 4,237" },
      { k: "Two key numbers", m: "Recall 80%. Precision 74%.", s: "Recall: complaints caught ÷ all complaints. Precision: real complaints ÷ patients called.", l: "Recall · precision" },
      { k: "Beyond accuracy", m: "Accuracy mixes all four boxes.", s: "Recall and precision say what the manager needs.", l: "Ask the right question" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(250, 30, "the 90-minute rule predicts", 13, MUTED, "middle", 800)}${t(178, 50, "complaint", 14, INK, "middle", 800)}${t(322, 50, "no complaint", 14, INK, "middle", 800)}
<g transform="rotate(-90 36 160)">${t(36, 160, "really complained?", 13, MUTED, "middle", 800)}</g>
${t(92, 114, "yes", 15, INK, "end", 800)}${t(92, 214, "no", 15, INK, "end", 800)}
${CM.map(([v, n, c], i) => { const x = 106 + (i === 1 || i === 3 ? 144 : 0), y = 62 + (i >= 2 ? 100 : 0);
  return `<g class="cm22" data-i="${i}"><rect class="cmr22" x="${x}" y="${y}" width="138" height="94" rx="12" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="2.5" style="transition:fill-opacity .6s"/>
  ${t(x + 69, y + 52, "", 28, c === GOLD ? "#9A6B0A" : c, "middle", 800, "cv22-" + i)}${t(x + 69, y + 76, n, 12.5, INK, "middle", 700)}</g>`; }).join("")}
<g class="a o0 rc22" style="transform:translateX(16px)"><rect x="394" y="62" width="78" height="94" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>${t(433, 88, "recall", 13, GREEN, "middle", 800)}${t(433, 118, "80%", 24, GREEN, "middle", 800)}${t(433, 140, "605 ÷ 758", 11, MUTED, "middle", 700)}</g>
<g class="a o0 pr22" style="transform:translateY(14px)"><rect x="106" y="266" width="138" height="66" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>${t(175, 288, "precision", 13, NAVY, "middle", 800)}${t(175, 314, "74%", 22, NAVY, "middle", 800)}${t(175, 328, "605 ÷ 814 called", 10.5, MUTED, "middle", 700)}</g>
<g class="a o0 ac22"><rect x="262" y="266" width="210" height="66" rx="12" fill="${INK}"/>${t(367, 290, "accuracy 93% mixes", 13.5, GOLD, "middle", 800)}${t(367, 312, "all four boxes together", 13, "#fff", "middle", 600)}</g>`,
    render(r, b) {
      CM.forEach(([v], i) => { const on = (i < 2 && b >= 1) || (i >= 2 && b >= 2), el = r.querySelector(".cv22-" + i);
        if (on) H.count(el, v, 1100); else { el._to = null; el._cur = 0; el.textContent = b === 0 ? "?" : ""; }
        const rc = r.querySelectorAll(".cmr22")[i]; rc.style.fillOpacity = (b === 1 && i < 2) || (b === 2 && i >= 2) ? ".28" : ".12"; });
      H.show(r, ".rc22", b >= 3); H.tf(r, ".rc22", b >= 3 ? "none" : "translateX(16px)");
      H.show(r, ".pr22", b >= 3); H.tf(r, ".pr22", b >= 3 ? "none" : "translateY(14px)"); H.delay(r, ".pr22", b >= 3 ? 1.2 : 0);
      H.show(r, ".ac22", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s23 · four algorithms */
  const ALG = [["Logistic regression", "a smooth probability curve", NAVY], ["Decision tree", "a chain of yes/no questions", GREEN], ["Random forest", "hundreds of trees vote", "#2A7A4A"], ["k-nearest neighbours", "copy the most similar patients", TERRA]];
  const pic = i => { const x = 34 + (i % 2) * 226, y = 34 + Math.floor(i / 2) * 140;
    return [
      `<path d="M${x} ${y + 82} H${x + 120}" stroke="${GREY}" stroke-width="1.5"/><path class="dr" pathLength="1" d="M${x} ${y + 80} C${x + 50} ${y + 80}, ${x + 60} ${y + 22}, ${x + 120} ${y + 20}" fill="none" stroke="${NAVY}" stroke-width="4"/>${[[8, 80], [24, 79], [40, 78], [88, 24], [100, 22], [114, 21]].map(([a, c], k) => `<circle cx="${x + a}" cy="${y + c + (k < 3 ? -2 : 2)}" r="4" fill="${k < 3 ? GREEN : TERRA}"/>`).join("")}`,
      `<g><rect x="${x + 44}" y="${y + 6}" width="34" height="18" rx="5" fill="${GREEN}"/>${t(x + 61, y + 19, "> 90?", 10, "#fff", "middle", 800)}<path d="M${x + 61} ${y + 24} L${x + 26} ${y + 50} M${x + 61} ${y + 24} L${x + 96} ${y + 50}" stroke="${GREY}" stroke-width="2"/><rect x="${x + 10}" y="${y + 50}" width="32" height="18" rx="5" fill="${GREEN}" fill-opacity=".7"/><rect x="${x + 80}" y="${y + 50}" width="32" height="18" rx="5" fill="${GREEN}" fill-opacity=".7"/><path d="M${x + 26} ${y + 68} l-12 18 M${x + 26} ${y + 68} l12 18 M${x + 96} ${y + 68} l-12 18 M${x + 96} ${y + 68} l12 18" stroke="${GREY}" stroke-width="2"/>${[14, 38, 84, 108].map((a, k) => `<circle cx="${x + a}" cy="${y + 89}" r="5" fill="${k === 3 ? TERRA : NAVY}"/>`).join("")}</g>`,
      `${[0, 1, 2, 3, 4].map(k => `<g class="bob" style="animation-delay:${k * .3}s"><path d="M${x + 12 + k * 24} ${y + 30} l11 22 h-22 z M${x + 12 + k * 24} ${y + 44} l13 24 h-26 z" fill="#2A7A4A" fill-opacity="${.55 + k * .09}"/><rect x="${x + 10 + k * 24}" y="${y + 68}" width="4" height="10" fill="#7A5A3A"/></g>`).join("")}${t(x + 60, y + 96, "vote: 4 × no · 1 × yes", 11, MUTED, "middle", 700)}`,
      `${[[20, 30], [40, 64], [70, 24], [96, 70], [110, 36], [30, 84], [84, 90]].map(([a, c], k) => `<circle cx="${x + a}" cy="${y + c}" r="5" fill="${k % 3 ? NAVY : TERRA}"/>`).join("")}<circle cx="${x + 62}" cy="${y + 56}" r="6" fill="${GOLD}" stroke="${INK}" stroke-width="2"/><circle class="pulse2" cx="${x + 62}" cy="${y + 56}" r="34" fill="none" stroke="${GOLD}" stroke-width="2.5" stroke-dasharray="5 4"/>`
    ][i]; };
  SC.s23 = {
    copy: [
      { k: "The toolbox", m: "Four algorithms you will meet again and again.", s: "", l: "Four algorithms" },
      { k: "1 · Logistic regression", m: "A smooth curve turns features into a probability.", s: "You met it in Week 10.", l: "Logistic regression" },
      { k: "2 · Decision tree", m: "A chain of yes or no questions.", s: "Did the patient wait more than 90 minutes?", l: "Decision tree" },
      { k: "3 · Random forest", m: "Hundreds of different trees, and a vote.", s: "Each tree sees a slightly different sample.", l: "Random forest" },
      { k: "4 · k-nearest neighbours", m: "Find the most similar past patients, and copy them.", s: "k = how many neighbours to ask.", l: "k-nearest neighbours" },
      { k: "No single winner", m: "None of them is best everywhere.", s: "Test them on data they have never seen.", l: "Test them all" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${ALG.map(([n, s, c], i) => { const x = 14 + (i % 2) * 230, y = 14 + Math.floor(i / 2) * 140; return `<g class="al23" data-i="${i}" style="transition:opacity .6s,transform .6s"><rect class="alr23" x="${x}" y="${y}" width="222" height="130" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2" style="transition:stroke .4s"/>
  ${pic(i)}${fo(x + 146, y + 30, 70, 90, `<b style="color:${c}">${n}</b><br><span style="font-weight:400;color:${MUTED}">${s}</span>`, 12, INK, 700)}</g>`; }).join("")}
<g class="a o0 nw23"><rect x="90" y="298" width="300" height="48" rx="12" fill="${INK}"/>${t(240, 320, "No algorithm wins everywhere.", 15, "#fff", "middle", 800)}${t(240, 338, "Test them on unseen data.", 12, GOLD, "middle", 700)}</g>`,
    render(r, b) {
      H.q(r, ".al23").forEach(g => { const i = +g.dataset.i, on = b === 0 || b === 5 || b === i + 1; g.style.opacity = on ? 1 : .3; const rc = g.querySelector(".alr23"); rc.style.stroke = b === i + 1 ? ALG[i][2] : ""; rc.style.strokeWidth = b === i + 1 ? "3.5" : ""; });
      H.draw(r, ".al23 .dr", b >= 1);
      H.show(r, ".nw23", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s24 · predict the winner (activity) */
  SC.s24 = {
    copy: [
      { k: "Your turn", m: "Which algorithm predicts readmissions best?", s: "On patients it has never seen.", l: "Make your pick" },
      { k: "Your turn", m: "Pick, then compare the real test results.", s: "Then press Continue.", l: "Real results" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(240, 38, "", 14, MUTED, "middle", 800, "ti24")}
${[0.5, 0.6, 0.7, 0.8, 0.9, 1].map(v => { const x = 196 + (v - .5) / .5 * 250; return `<path d="M${x} 52 V300" stroke="#EEE8DC" stroke-width="1.5"/>${t(x, 316, v.toFixed(1), 10.5, MUTED, "middle", 600)}`; }).join("")}
${[0, 1, 2, 3].map(i => `<g class="row24" data-i="${i}">${t(186, 86 + i * 60, "", 13, INK, "end", 800, "nm24-" + i)}
  <rect class="btr24" x="196" y="${68 + i * 60}" width="250" height="14" rx="3" fill="${NAVY}" fill-opacity=".35" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .8s ${i * .15}s"/>
  <rect class="bte24" x="196" y="${84 + i * 60}" width="250" height="18" rx="3" fill="${TERRA}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .9s ${.3 + i * .15}s"/>
  ${t(0, 80 + i * 60, "", 11, NAVY, "start", 700, "vtr24-" + i)}${t(0, 98 + i * 60, "", 12.5, TERRA, "start", 800, "vte24-" + i)}
  <g class="win24" style="opacity:0;transition:opacity .5s 1.2s"><circle cx="452" cy="${93 + i * 60}" r="11" fill="${GOLD}"/>${t(452, 98 + i * 60, "★", 12, "#fff")}</g></g>`).join("")}
${t(240, 336, "light bar = training AUC · dark bar = test AUC", 11.5, MUTED, "middle", 700)}`,
    update(r, target, show, pick) {
      const M = X[target].models, best = M.reduce((b, m, i) => m[2] > M[b][2] ? i : b, 0);
      r.querySelector(".ti24").textContent = target === "readmitted_30d" ? "30-day readmissions · real held-out results" : "complaints · real held-out results";
      M.forEach((m, i) => { const g = r.querySelectorAll(".row24")[i];
        r.querySelector(".nm24-" + i).textContent = m[0].replace(" (depth 4)", "");
        const sx = v => Math.max(0, (v - .5) / .5), xr = v => 196 + sx(v) * 250 + 6;
        g.querySelector(".btr24").style.transform = `scaleX(${show ? sx(m[1]).toFixed(3) : 0})`; g.querySelector(".bte24").style.transform = `scaleX(${show ? sx(m[2]).toFixed(3) : 0})`;
        const a = r.querySelector(".vtr24-" + i), b2 = r.querySelector(".vte24-" + i);
        a.setAttribute("x", Math.min(410, xr(m[1]))); b2.setAttribute("x", Math.min(410, xr(m[2]))); a.textContent = show ? m[1].toFixed(3) : ""; b2.textContent = show ? m[2].toFixed(3) : "";
        g.querySelector(".win24").style.opacity = show && i === best ? 1 : 0;
        g.style.opacity = pick === null || pick === undefined || pick === i || show ? 1 : .45; });
      return best;
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s24.update(r, "readmitted_30d", false, null); } }
  };

  /* ------------------------------------------------------------ s25 · cross-validation and the scikit-learn workflow */
  const CV = RA.cv;
  SC.s25 = {
    copy: [
      { k: "Cross-validation", m: "One split can be lucky. Test five times.", s: "", l: "5 folds" },
      { k: "How it works", m: "Train on four folds, test on the fifth. Repeat.", s: "Every visit is tested exactly once.", l: "Rotate the test fold" },
      { k: "Readmissions · logistic regression", m: `Five scores from ${Math.min(...CV).toFixed(2)} to ${Math.max(...CV).toFixed(2)}. Average ${RA.cvMean.toFixed(2)}.`, s: "More honest than any single split.", l: `mean ${RA.cvMean.toFixed(2)}` },
      { k: "In Python", m: "Split, fit, predict, score.", s: "The same four steps for every model.", l: "The workflow" },
      { k: "The heart of scikit-learn", m: "fit learns. predict applies.", s: "You will type these two words again and again.", l: "fit · predict" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="178" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${[0, 1, 2, 3, 4].map(rw => `<g class="fr25" data-r="${rw}" style="opacity:.25;transition:opacity .5s">${t(40, 44 + rw * 26, "round " + (rw + 1), 11, MUTED, "start", 700)}
  ${[0, 1, 2, 3, 4].map(c => `<rect x="${100 + c * 52}" y="${30 + rw * 26}" width="48" height="20" rx="4" fill="${c === rw ? TERRA : NAVY}" fill-opacity="${c === rw ? 1 : .35}"/>`).join("")}
  ${t(392, 45 + rw * 26, CV[rw].toFixed(3), 13, TERRA, "start", 800, "cvv25")}</g>`).join("")}
<g class="a o0 mn25"><rect x="378" y="160" width="82" height="22" rx="11" fill="${GREEN}"/>${t(419, 176, "mean " + RA.cvMean.toFixed(3), 11.5, "#fff", "middle", 800)}</g>
<rect x="12" y="198" width="456" height="150" rx="12" fill="#1E2430"/>
${[["X_tr, X_te, y_tr, y_te = train_test_split(X, y)", 1], ["model = LogisticRegression()", 2], ["model.fit(X_tr, y_tr)", 2], ["p = model.predict_proba(X_te)[:, 1]", 3], ["print(roc_auc_score(y_te, p))", 4], ["cross_val_score(model, X, y, cv=5, scoring=\"roc_auc\")", 5]].map(([s, g], i) =>
  `<text class="cd25" data-g="${g}" x="26" y="${220 + i * 22}" font-family="Consolas,monospace" font-size="${s.length > 52 ? 11 : 12.5}" fill="#E6EAF0" xml:space="preserve" style="opacity:0;transition:opacity .5s,fill .5s">${s.replace(/</g, "&lt;")}</text>`).join("")}
<g class="a o0 tags25">${[["split", 220], ["fit", 264], ["predict", 286], ["score", 308]].map(([n, y]) => `<rect x="404" y="${y - 14}" width="56" height="19" rx="9" fill="${GOLD}"/>${t(432, y, n, 11, INK, "middle", 800)}`).join("")}</g>`,
    render(r, b) {
      const live = alive(r); clearInterval(r._t25);
      const rows = H.q(r, ".fr25");
      if (b === 1 || b === 2) { let k = 0; const step = () => { rows.forEach((g, i) => { g.style.opacity = i <= k ? 1 : .25; }); }; step(); r._t25 = setInterval(() => { if (!live()) { clearInterval(r._t25); return; } k = Math.min(4, k + 1); step(); if (k >= 4) clearInterval(r._t25); }, b === 1 ? 900 : 300); }
      else rows.forEach(g => { g.style.opacity = b >= 3 ? 1 : .25; });
      H.q(r, ".cvv25").forEach(e => { e.style.opacity = b >= 2 ? 1 : 0; }); H.show(r, ".mn25", b >= 2); H.delay(r, ".mn25", b === 2 ? 1.8 : 0);
      H.q(r, ".cd25").forEach(e => { const g = +e.dataset.g; e.style.opacity = b >= 3 ? 1 : 0; e.style.fill = b === 4 && (g === 2 || g === 3) ? "#FFD88A" : "#E6EAF0"; });
      H.show(r, ".tags25", b >= 3);
    }
  };
})();
