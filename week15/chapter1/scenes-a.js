/* Week 15 · Chapter 5 animated scenes, part A (s01–s11).
   Each scene: SC[id] = { svg, copy[beat], render(root, beat) } on a 480 x 360 stage.
   Data: window.W15 (split luck computed on the Al Waha episodes; occupancy curves from Chapter 4; slide figures). */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const W = window.W15;
  const NAVY = "#1F4E79", TERRA = "#C0502A", GREEN = "#2E7D4F", GOLD = "#E8B04B", INK = "#1A1F2B", SKY = "#DCE7F2", MUTED = "#5A6373", GREY = "#9AA3B2", PAPER = "#F6F1E7", EDGE = "#CDBFA6";

  const H = window.SCH = {
    q: (r, s) => Array.from(r.querySelectorAll(s)),
    set(r, s, p, v) { H.q(r, s).forEach(e => { e.style[p] = v; }); },
    show(r, s, on) { H.q(r, s).forEach(e => { e.style.opacity = on ? "1" : "0"; }); },
    tf(r, s, v) { H.q(r, s).forEach(e => { e.style.transform = v; }); },
    draw(r, s, on) { H.q(r, s).forEach(e => { e.style.strokeDashoffset = on ? "0" : "1"; }); },
    delay(r, s, sec) { H.q(r, s).forEach(e => { e.style.transitionDelay = sec + "s"; }); },
    cam(r, cx, cy, s) { H.set(r, ".cam", "transform", `translate(${-s * (cx - 240)}px,${-s * (cy - 180)}px) scale(${s})`); },
    t: (x, y, s, size, fill, anchor, weight, cls) =>
      `<text${cls ? ` class="${cls}"` : ""} x="${x}" y="${y}" font-size="${size || 16}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="${weight || 700}">${s}</text>`,
    fo: (x, y, w, h, html, size, color, weight, extra) =>
      `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:${weight || 600} ${size || 13}px Calibri,Segoe UI,sans-serif;color:${color || INK};line-height:1.25;${extra || ""}">${html}</div></foreignObject>`,
    person: (x, y, c, s, cls) =>
      `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><circle cx="0" cy="-31" r="8.5" fill="${c}"/><path d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${c}"/></g></g>`,
    card: (x, y, w, h, stroke, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill || "#fff"}" stroke="${stroke || EDGE}" stroke-width="2"/>`,
    C: { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE }
  };
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");

  /* method icons, reused across scenes */
  const ICON = {
    compare: (x, y, c) => `<rect x="${x - 18}" y="${y - 6}" width="14" height="22" rx="2" fill="${c}"/><rect x="${x + 4}" y="${y - 16}" width="14" height="32" rx="2" fill="${c}" fill-opacity=".6"/>`,
    line: (x, y, c) => `<path d="M${x - 20} ${y + 14} L${x + 20} ${y - 14}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>${[[-12, 10], [-2, -2], [8, 2], [14, -12]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="3" fill="${c}" fill-opacity=".6"/>`).join("")}`,
    lines: (x, y, c) => `<path d="M${x - 20} ${y + 14} L${x + 20} ${y - 6} M${x - 20} ${y + 4} L${x + 20} ${y - 16}" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`,
    classify: (x, y, c) => `<circle cx="${x - 8}" cy="${y - 4}" r="9" fill="${c}"/><circle cx="${x + 10}" cy="${y + 8}" r="9" fill="none" stroke="${c}" stroke-width="3"/>`,
    cluster: (x, y, c) => [[-12, -8], [-6, -12], [-14, -2], [10, 8], [14, 12], [6, 12]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="4" fill="${c}"/>`).join(""),
    text: (x, y, c) => `<rect x="${x - 18}" y="${y - 14}" width="36" height="28" rx="5" fill="none" stroke="${c}" stroke-width="3"/>${[-6, 0, 6].map(d => `<path d="M${x - 11} ${y + d} h${d === 6 ? 14 : 22}" stroke="${c}" stroke-width="2.5"/>`).join("")}`,
    net: (x, y, c) => `${[-12, 0, 12].map(a => `<path d="M${x - 16} ${y + a} L${x} ${y - 6} M${x - 16} ${y + a} L${x} ${y + 6} M${x} ${y - 6} L${x + 16} ${y} M${x} ${y + 6} L${x + 16} ${y}" stroke="${c}" stroke-width="1.4"/>`).join("")}${[-12, 0, 12].map(a => `<circle cx="${x - 16}" cy="${y + a}" r="4" fill="${c}"/>`).join("")}<circle cx="${x}" cy="${y - 6}" r="4" fill="${c}"/><circle cx="${x}" cy="${y + 6}" r="4" fill="${c}"/><circle cx="${x + 16}" cy="${y}" r="5" fill="${TERRA}"/>`
  };
  const METH = [["compare", "group comparison", "Week 7"], ["line", "regression", "Week 8"], ["lines", "adjusted regression", "Week 9"], ["classify", "classifier", "Week 10–11"], ["cluster", "clustering", "Week 12"], ["text", "text model", "Week 13"], ["net", "neural network", "Week 14"]];

  /* ------------------------------------------------------------ s01 · welcome */
  SC.s01 = {
    copy: [
      { k: "Week 15 · Chapter 5", m: "The last week of the course.", s: "Evidence synthesis and responsible reporting.", l: "Week 15" },
      { k: "Fourteen weeks", m: "One question of one dataset.", s: "What drives patient satisfaction at Al Waha?", l: "One question" },
      { k: "This week", m: "Several answers, side by side.", s: "And the one you would defend.", l: "The one you defend" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="cam">
  <circle cx="446" cy="36" r="20" fill="${GOLD}"/>
  <rect y="300" width="480" height="60" fill="#E7DDCB"/><path d="M0 300 H480" stroke="${EDGE}" stroke-width="3"/>
  <g class="a o0 q01" style="transform:translateY(10px)">${card(120, 34, 240, 56, NAVY)}${t(240, 58, "one question", 12, MUTED)}${t(240, 79, "What drives satisfaction?", 16, NAVY, "middle", 800)}</g>
  ${METH.map(([k, n], i) => { const x = 50 + i * 63.3; return `<g class="a o0 m01" data-i="${i}" style="transform:translateY(16px)"><circle cx="${x}" cy="170" r="27" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${ICON[k](x, 170, [NAVY, NAVY, NAVY, GREEN, GOLD, TERRA, INK][i])}${fo(x - 31, 202, 62, 34, n, 10.5, MUTED, 700, "text-align:center")}<path class="ln01" d="M${x} 143 L240 92" stroke="${EDGE}" stroke-width="1.5" stroke-dasharray="3 4"/></g>`; }).join("")}
  <g class="a o0 pick01" style="transform:scale(.8)"><rect x="150" y="244" width="180" height="46" rx="23" fill="${TERRA}"/>${t(240, 273, "the one you defend", 16, "#fff", "middle", 800)}<path d="M240 244 V230" stroke="${TERRA}" stroke-width="3"/></g>
  ${person(60, 330, NAVY, .9, "bob")}${person(420, 330, GREEN, .9, "bob")}
</g>`,
    render(r, b) {
      H.show(r, ".q01", b >= 1); H.tf(r, ".q01", b >= 1 ? "none" : "translateY(10px)");
      H.q(r, ".m01").forEach(g => { const i = +g.dataset.i; g.style.transitionDelay = (b >= 1 ? .4 + i * .12 : 0) + "s"; g.style.opacity = b >= 1 ? (b >= 2 && i !== 2 ? .45 : 1) : 0; g.style.transform = b >= 1 ? "none" : "translateY(16px)"; });
      H.show(r, ".pick01", b >= 2); H.tf(r, ".pick01", b >= 2 ? "none" : "scale(.8)");
      H.cam(r, 240, 180, b === 0 ? 1.04 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · the term on one page */
  const TERM = [["Weeks 1–6", "samples · formulas · p values · reading your code", NAVY], ["Weeks 7–10", "comparisons · lines · adjusted lines · probabilities", GREEN], ["Weeks 11–14", "honest scoring · unlabelled groups · words · a model you cannot read", TERRA]];
  SC.s02 = {
    copy: [
      { k: "Retrieval", m: "The whole term on one page.", s: "", l: "Fifteen weeks" },
      { k: "Weeks 1–6", m: "Samples, formulas, p values, and your own code.", s: "", l: "Foundations" },
      { k: "Weeks 7–10", m: "Comparisons, lines, adjusted lines, probabilities.", s: "", l: "Models" },
      { k: "Weeks 11–14", m: "Honest scoring, unlabelled groups, words, a black box.", s: "", l: "Machine learning" },
      { k: "Today", m: "One dataset. One question. The answers meet.", s: "", l: "Week 15" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M40 60 V300" stroke="${EDGE}" stroke-width="4"/>
${TERM.map(([a, s, c], i) => `<g class="a o0 tm02" data-i="${i}" style="transform:translateX(-16px)"><circle cx="40" cy="${84 + i * 76}" r="13" fill="${c}"/>${card(66, 56 + i * 76, 396, 60, c)}${t(82, 80 + i * 76, a, 16, c, "start", 800)}${fo(82, 86 + i * 76, 372, 28, s, 13, MUTED, 700)}</g>`).join("")}
<g class="a o0 w15" style="transform:scale(.8)"><circle cx="40" cy="314" r="16" fill="${GOLD}"/>${card(66, 290, 396, 50, INK, INK)}${t(264, 321, "Week 15: one dataset, one question, all the answers", 15, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".tm02").forEach(g => { const on = b >= +g.dataset.i + 1; g.style.opacity = on ? 1 : (b === 0 ? .25 : 0); g.style.transform = on ? "none" : "translateX(-16px)"; });
      H.show(r, ".w15", b >= 4); H.tf(r, ".w15", b >= 4 ? "none" : "scale(.8)");
    }
  };

  /* ------------------------------------------------------------ s03 · one question, many methods */
  SC.s03 = {
    copy: [
      { k: "What you hold", m: "Many methods, the same episodes.", s: "", l: "Same episodes" },
      { k: "The toolkit", m: "Comparison, regressions, classifier, clusters, text, network.", s: "", l: "Seven methods" },
      { k: "Different by design", m: "Different questions, assumptions and standards.", s: "", l: "Not the same job" },
      { k: "The real question", m: "Not “which model is best?”", s: "“Which question was I asking, and which result answers it?”", l: "Which question?" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g>${card(170, 136, 140, 86, NAVY, SKY)}${t(240, 168, "5,200", 24, NAVY, "middle", 800)}${t(240, 192, "Al Waha episodes", 13, NAVY, "middle", 700)}${t(240, 210, "the same rows", 11, MUTED)}</g>
${METH.map(([k, n, w], i) => { const a = -Math.PI / 2 + i * (2 * Math.PI / 7), x = 240 + Math.cos(a) * 178, y = 172 + Math.sin(a) * 120;
  return `<g class="a o0 mt03" data-i="${i}" style="transition-delay:${(i * .12).toFixed(2)}s"><path d="M240 172 L${fx(x, 0)} ${fx(y, 0)}" stroke="${EDGE}" stroke-width="2" stroke-dasharray="4 4"/><circle cx="${fx(x, 0)}" cy="${fx(y, 0)}" r="28" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${ICON[k](x, y, NAVY)}${t(x, y + 44, n, 11.5, INK, "middle", 800)}${t(x, y + 58, w, 10.5, MUTED)}</g>`; }).join("")}
<g class="a o0 tg03">${card(150, 122, 180, 116, INK, "#fff")}${[["different questions", 136, NAVY], ["different assumptions", 170, GREEN], ["different standards", 204, TERRA]].map(([s, y, c]) => `<rect x="160" y="${y}" width="160" height="26" rx="13" fill="${c}"/>${t(240, y + 18, s, 12.5, "#fff", "middle", 800)}`).join("")}</g>
<g class="a o0 qq03" style="transform:scale(.85)">${card(60, 120, 360, 120, INK, INK)}${t(240, 156, "not: which model is best?", 16, GREY, "middle", 700)}<path d="M150 151 H330" stroke="${TERRA}" stroke-width="3"/>
  ${fo(80, 170, 320, 64, "which question was I asking, and which result answers it?", 18, GOLD, 800, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".mt03", b >= 1 || b === 0); H.set(r, ".mt03", "opacity", b === 0 ? "0" : b === 3 ? ".2" : "1");
      H.show(r, ".tg03", b === 2);
      H.show(r, ".qq03", b >= 3); H.tf(r, ".qq03", b >= 3 ? "none" : "scale(.85)");
    }
  };

  /* ------------------------------------------------------------ s04 · the same question, five ways */
  const FIVE = [["7", "Do long and short waits differ?", "+16.4 pts, d = 1.21", "how much of a wait matters"], ["8", "How much per minute?", "−3.01 / 10 min, R² 0.41", "whether waiting stands in for something else"],
    ["9", "Holding the others constant?", "−1.23 / 10 min, R² 0.79", "anything that is not a straight line"], ["12", "Are there profiles at all?", "structure beats the noise", "anything about satisfaction"], ["14", "The best prediction?", "RMSE 6.21, R² 0.85", "why: no coefficient to defend"]];
  SC.s04 = {
    copy: [
      { k: "Five answers", m: "The same question, answered five ways.", s: "Week · question · result · what it cannot say.", l: "Five ways" },
      { k: "Week 7", m: "Long vs short waits: +16.4 points, d = 1.21.", s: "Cannot say: how much of a wait matters.", l: "Comparison" },
      { k: "Week 8", m: "−3.01 points per 10 minutes.", s: "Cannot say: whether waiting stands in for something else.", l: "Regression" },
      { k: "Week 9", m: "−1.23 per 10 minutes, others held constant.", s: "Cannot say: anything that is not a straight line.", l: "Adjusted" },
      { k: "Week 12", m: "Profiles exist: structure beats the noise.", s: "Cannot say: anything about satisfaction.", l: "Clustering" },
      { k: "Week 14", m: "Best prediction: RMSE 6.21, R² 0.85.", s: "Cannot say: why.", l: "Network" },
      { k: "Read the last column", m: "What it cannot say is what the examiner asks.", s: "", l: "The last column" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${[["wk", 14, 34], ["question", 54, 120], ["result", 178, 124], ["cannot say", 306, 160]].map(([s, x, w]) => `<rect x="${x}" y="14" width="${w}" height="24" rx="6" fill="${s === "cannot say" ? TERRA : INK}" class="${s === "cannot say" ? "hc04" : ""}"/>${t(x + w / 2, 31, s, 12, "#fff", "middle", 800)}`).join("")}
${FIVE.map(([w, q, r, c], i) => `<g class="a o0 rw04" data-i="${i}" style="transform:translateX(-14px)"><rect x="14" y="${46 + i * 60}" width="452" height="54" rx="8" fill="#fff" stroke="${EDGE}" stroke-width="1.5"/>
  ${t(31, 78 + i * 60, w, 16, NAVY, "middle", 800)}${fo(58, 50 + i * 60, 116, 46, q, 12, INK, 700, "display:flex;align-items:center;height:46px")}${fo(182, 50 + i * 60, 118, 46, r, 12.5, NAVY, 800, "display:flex;align-items:center;height:46px")}
  <g class="lc04">${fo(310, 50 + i * 60, 152, 46, c, 12, TERRA, 800, "display:flex;align-items:center;height:46px")}</g></g>`).join("")}`,
    render(r, b) {
      H.q(r, ".rw04").forEach(g => { const i = +g.dataset.i, on = b >= i + 1; g.style.opacity = on ? 1 : (b === 0 ? .2 : 0); g.style.transform = on ? "none" : "translateX(-14px)";
        g.querySelector("rect").style.stroke = b === i + 1 ? NAVY : ""; g.querySelector("rect").style.strokeWidth = b === i + 1 ? "3" : "";
        g.querySelector(".lc04").style.opacity = b === 6 ? 1 : b === i + 1 ? 1 : .55; });
      H.q(r, ".rw04").forEach(g => { if (b === 6) g.querySelector("rect").style.fill = "#fff"; });
      H.set(r, ".hc04", "transform", b === 6 ? "scale(1.06)" : "none");
    }
  };

  /* ------------------------------------------------------------ s05 · try it: match */
  SC.s05 = {
    copy: [
      { k: "Your turn", m: "Each result answers its own question.", s: "", l: "Match them" },
      { k: "Your turn", m: "Match every result to its question.", s: "Then press Continue.", l: "Match, then continue" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${FIVE.map(([w, q, r], i) => `<g class="mr05" data-i="${i}">${card(14, 20 + i * 66, 200, 54, EDGE)}${t(30, 52 + i * 66, r, 13.5, NAVY, "start", 800)}
  <path class="lk05" d="M214 ${47 + i * 66} L266 ${47 + i * 66}" stroke="${GREY}" stroke-width="2.5" stroke-dasharray="4 4"/>
  <rect class="qb05" x="266" y="${20 + i * 66}" width="200" height="54" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/><text class="qt05" x="366" y="${52 + i * 66}" font-size="13" fill="${MUTED}" text-anchor="middle" font-weight="700">?</text></g>`).join("")}`,
    render() {},
    set(r, i, txt, ok) { const g = r.querySelector(`.mr05[data-i="${i}"]`); g.querySelector(".qt05").textContent = txt || "?"; g.querySelector(".qt05").setAttribute("fill", ok === undefined ? MUTED : ok ? GREEN : TERRA);
      g.querySelector(".qb05").setAttribute("stroke", ok === undefined ? EDGE : ok ? GREEN : TERRA); g.querySelector(".lk05").setAttribute("stroke", ok === undefined ? GREY : ok ? GREEN : TERRA); g.querySelector(".lk05").setAttribute("stroke-dasharray", ok ? "none" : "4 4"); }
  };

  /* ------------------------------------------------------------ s06 · −3 or −1.2 */
  SC.s06 = {
    copy: [
      { k: "A puzzle", m: "−3.01 or −1.23 per 10 minutes?", s: "Same data, two numbers.", l: "Two slopes" },
      { k: "Week 8 · alone", m: "Waiting carries everything that comes with it.", s: "Busy wards, handoffs, tired staff.", l: "−3.01 carries it all" },
      { k: "Week 9 · adjusted", m: "The others held constant: −1.23 is waiting's own share.", s: "", l: "−1.23 is its own" },
      { k: "Both true", m: "Different questions. Say which one you asked.", s: "", l: "Say the question" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M60 300 H450 M60 300 V40" stroke="${INK}" stroke-width="2"/>${t(255, 326, "waiting time →", 13, INK, "middle", 800)}<text transform="translate(34 170) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">satisfaction</text>
<path class="dr s8" pathLength="1" d="M70 70 L440 270" stroke="${TERRA}" stroke-width="5" stroke-linecap="round"/>
<g class="a o0 s8l">${t(440, 262, "", 13)}${card(300, 56, 160, 44, TERRA, "#FCEFE9")}${t(380, 76, "Week 8 · alone", 12, TERRA, "middle", 800)}${t(380, 93, "−3.01 per 10 min", 14, TERRA, "middle", 800)}</g>
<g class="a o0 bag06">${[["busy wards", 150, 150], ["handoffs", 230, 196], ["tired staff", 316, 236]].map(([s, x, y]) => `<rect x="${x - 40}" y="${y - 30}" width="80" height="22" rx="11" fill="${GOLD}"/>${t(x, y - 15, s, 11.5, INK, "middle", 800)}`).join("")}</g>
<path class="dr s9" pathLength="1" d="M70 120 L440 200" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/>
<g class="a o0 s9l">${card(300, 216, 160, 44, NAVY, SKY)}${t(380, 236, "Week 9 · adjusted", 12, NAVY, "middle", 800)}${t(380, 253, "−1.23 per 10 min", 14, NAVY, "middle", 800)}</g>
<g class="a o0 bt06" style="transform:scale(.85)">${card(80, 120, 200, 60, INK, INK)}${t(180, 146, "both true", 18, GOLD, "middle", 800)}${t(180, 168, "different questions", 13, "#fff")}</g>`,
    render(r, b) {
      H.draw(r, ".s8", true); H.show(r, ".s8l", true); H.show(r, ".bag06", b === 1);
      H.draw(r, ".s9", b >= 2); H.show(r, ".s9l", b >= 2);
      H.show(r, ".bt06", b >= 3); H.tf(r, ".bt06", b >= 3 ? "none" : "scale(.85)");
    }
  };

  /* ------------------------------------------------------------ s07 · agreement can be worth nothing */
  const OX = o => 70 + (o - 50) * 7.6, OY = s => 300 - (s - 40) * (250 / 55);
  const BAND = W.occ.band, LIN = W.occ.x.map((o, i) => [o, W.occ.lin[i]]).filter(([o]) => o >= 50), NET = W.occ.x.map((o, i) => [o, W.occ.net[i]]).filter(([o]) => o >= 50);
  SC.s07 = {
    copy: [
      { k: "Careful", m: "When methods agree, it feels like evidence.", s: "", l: "Agreement" },
      { k: "Three straight lines", m: "Three linear models agree: occupancy is a straight line.", s: "", l: "They agree" },
      { k: "Worth nothing", m: "None of them could have found anything else.", s: "They share the same blind spot.", l: "Shared blind spot" },
      { k: "Could disagree", m: "Banded averages and the network: a cliff after 80%.", s: "Week 5 and Week 14.", l: "A cliff" },
      { k: "The rule", m: "Agreement counts only if the methods could have disagreed.", s: "Here, the disagreement is worth more.", l: "Could they disagree?" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M70 300 H456 M70 300 V44" stroke="${INK}" stroke-width="2"/>
${[50, 60, 70, 80, 90, 100].map(o => t(OX(o), 320, o + "%", 12, MUTED)).join("")}${[40, 60, 80].map(s => t(60, OY(s) + 4, s, 12, MUTED, "end", 700)).join("")}
${t(263, 344, "bed occupancy", 13, INK, "middle", 800)}<text transform="translate(26 172) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">satisfaction</text>
${[0, 1, 2].map(k => `<path class="dr l07" data-k="${k}" pathLength="1" d="${pathOf(LIN.map(([o, s]) => [OX(o), OY(s + (k - 1) * 2.2)]))}" fill="none" stroke="${["#3F6E99", NAVY, "#6D93B8"][k]}" stroke-width="4" stroke-linecap="round"/>`).join("")}
<g class="a o0 al07">${card(250, 50, 196, 50, NAVY, SKY)}${fo(260, 54, 180, 44, "3 straight-line models:<br>“it is a straight line”", 13, NAVY, 800)}</g>
<g class="a o0 bs07" style="transform:scale(1.4)"><g transform="rotate(-6 200 200)"><rect x="100" y="182" width="200" height="40" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(200, 209, "SHARED BLIND SPOT", 16, TERRA, "middle", 800)}</g></g>
${BAND.map(([o, s], i) => `<g class="a o0 bd07" style="transition-delay:${(i * .07).toFixed(2)}s"><circle cx="${OX(o)}" cy="${OY(s)}" r="6.5" fill="${TERRA}" stroke="#fff" stroke-width="2"/></g>`).join("")}
<path class="dr nt07" pathLength="1" d="${pathOf(NET.map(([o, s]) => [OX(o), OY(s)]))}" fill="none" stroke="${GREEN}" stroke-width="4" stroke-dasharray="1" stroke-linecap="round"/>
<g class="a o0 dl07">${t(OX(97), OY(43) - 14, "banded averages", 12, TERRA, "end", 800)}${t(OX(90), OY(77), "network", 12, GREEN, "middle", 800)}</g>
<g class="a o0 rl07">${card(84, 226, 232, 56, INK, INK)}${fo(94, 232, 214, 48, "Agreement counts only if the methods <b style='color:#E8B04B'>could have disagreed</b>.", 13, "#fff", 600)}</g>`,
    render(r, b) {
      H.q(r, ".l07").forEach(e => { e.style.strokeDashoffset = b >= 1 ? "0" : "1"; e.style.transitionDelay = (+e.dataset.k * .4) + "s"; e.style.opacity = b >= 3 ? ".35" : "1"; });
      H.show(r, ".al07", b >= 1 && b <= 2); H.show(r, ".bs07", b === 2); H.tf(r, ".bs07", b === 2 ? "none" : "scale(1.4)");
      H.show(r, ".bd07", b >= 3); H.draw(r, ".nt07", b >= 3); H.delay(r, ".nt07", b >= 3 ? 1 : 0); H.show(r, ".dl07", b >= 3);
      H.show(r, ".rl07", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s08 · MAE by hand */
  const ER = [-2, 1, -3, 6];
  SC.s08 = {
    copy: [
      { k: "MAE", m: "Mean absolute error.", s: "The error a reader can act on.", l: "M A E" },
      { k: "Same four errors", m: "−2, 1, −3, 6.", s: "From Chapter 4.", l: "Four errors" },
      { k: "Drop the signs", m: "2 + 1 + 3 + 6 = 12. 12 ÷ 4 = 3.", s: "", l: "MAE = 3.0" },
      { k: "Compare", m: "MAE 3.0 · RMSE 3.54, same predictions.", s: "", l: "3.0 vs 3.54" },
      { k: "Usable", m: "On a typical episode: about 3 points out.", s: "A sentence a manager can use.", l: "3 points out" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M240 40 V220" stroke="${INK}" stroke-width="2"/>${t(240, 32, "0", 12, MUTED)}
${ER.map((e, i) => `<g class="er08" data-i="${i}"><rect class="eb08" x="${e < 0 ? 240 + e * 24 : 240}" y="${56 + i * 40}" width="${Math.abs(e) * 24}" height="26" rx="4" fill="${e < 0 ? NAVY : TERRA}" style="transition:transform .8s cubic-bezier(.3,.8,.25,1);transform-box:fill-box;transform-origin:${e < 0 ? "right" : "left"}"/>
  <text class="el08" x="${e < 0 ? 240 + e * 24 - 8 : 240 + e * 24 + 8}" y="${74 + i * 40}" font-size="15" fill="${INK}" text-anchor="${e < 0 ? "end" : "start"}" font-weight="800">${e > 0 ? "+" + e : "−" + Math.abs(e)}</text></g>`).join("")}
<g class="a o0 sm08">${card(70, 236, 340, 50, INK, INK)}${t(240, 268, "(2 + 1 + 3 + 6) ÷ 4 = 3.0", 19, GOLD, "middle", 800)}</g>
<g class="a o0 cp08">${card(70, 294, 160, 50, GREEN, "#EAF5EE")}${t(150, 314, "MAE", 12, MUTED)}${t(150, 334, "3.0 points", 17, GREEN, "middle", 800)}${card(250, 294, 160, 50, NAVY, SKY)}${t(330, 314, "RMSE", 12, MUTED)}${t(330, 334, "3.54 points", 17, NAVY, "middle", 800)}</g>
<g class="a o0 us08" style="transform:scale(.85)">${card(90, 236, 300, 108, GREEN, "#EAF5EE")}${fo(104, 246, 272, 92, "“On a typical episode, the model is about <b>3 points</b> out.”", 17, GREEN, 700, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".er08").forEach(g => { const i = +g.dataset.i, e = ER[i], bar = g.querySelector(".eb08"), lab = g.querySelector(".el08");
        g.style.opacity = b >= 1 ? 1 : .25;
        if (b >= 2) { bar.setAttribute("x", 240); bar.setAttribute("fill", GREEN); lab.setAttribute("x", 240 + Math.abs(e) * 24 + 8); lab.setAttribute("text-anchor", "start"); lab.textContent = Math.abs(e); }
        else { bar.setAttribute("x", e < 0 ? 240 + e * 24 : 240); bar.setAttribute("fill", e < 0 ? NAVY : TERRA); lab.setAttribute("x", e < 0 ? 240 + e * 24 - 8 : 240 + e * 24 + 8); lab.setAttribute("text-anchor", e < 0 ? "end" : "start"); lab.textContent = e > 0 ? "+" + e : "−" + Math.abs(e); } });
      H.show(r, ".sm08", b === 2 || b === 3); H.show(r, ".cp08", b === 3);
      H.show(r, ".us08", b >= 4); H.tf(r, ".us08", b >= 4 ? "none" : "scale(.85)");
    }
  };

  /* ------------------------------------------------------------ s09 · try it: MAE vs RMSE gap */
  SC.s09 = {
    copy: [
      { k: "Your turn", m: "Make one error bigger.", s: "Watch MAE and RMSE.", l: "Move error 4" },
      { k: "Your turn", m: "MAE treats all errors alike. RMSE squares them.", s: "Watch the gap. Then press Continue.", l: "The gap" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 30, "the four errors (points)", 13, MUTED, "middle", 800)}
<path d="M100 44 V210" stroke="${INK}" stroke-width="2"/>
${[0, 1, 2, 3].map(i => `<g class="gr09" data-i="${i}"><rect class="gb09" x="100" y="${52 + i * 40}" width="0" height="26" rx="4" fill="${i === 3 ? TERRA : NAVY}" style="transition:width .3s"/><text class="gl09" x="108" y="${70 + i * 40}" font-size="14" fill="${INK}" font-weight="800"></text>${t(88, 70 + i * 40, "e" + (i + 1), 13, MUTED, "end", 700)}</g>`).join("")}
${[["MAE", GREEN, 40], ["RMSE", NAVY, 250]].map(([n, c, x]) => `<g>${card(x, 226, 190, 70, c, "#fff")}${t(x + 95, 250, n, 13, MUTED)}<text class="mv09" data-n="${n}" x="${x + 95}" y="${280}" font-size="24" fill="${c}" text-anchor="middle" font-weight="800"></text></g>`).join("")}
<text class="gp09" x="240" y="328" font-size="15" fill="${TERRA}" text-anchor="middle" font-weight="800"></text>`,
    render(r) { if (r._e09 === undefined) SC.s09.update(r, 6); },
    update(r, e4) {
      r._e09 = e4; const E = [-2, 1, -3, e4], mae = E.reduce((a, c) => a + Math.abs(c), 0) / 4, rmse = Math.sqrt(E.reduce((a, c) => a + c * c, 0) / 4);
      H.q(r, ".gr09").forEach(g => { const i = +g.dataset.i, v = Math.abs(E[i]); g.querySelector(".gb09").setAttribute("width", Math.min(340, v * 11)); const l = g.querySelector(".gl09"); l.setAttribute("x", 108 + Math.min(340, v * 11)); l.textContent = (E[i] < 0 ? "−" : E[i] > 0 ? "+" : "") + v; });
      r.querySelector('.mv09[data-n="MAE"]').textContent = fx(mae); r.querySelector('.mv09[data-n="RMSE"]').textContent = fx(rmse);
      r.querySelector(".gp09").textContent = `gap: ${fx(rmse - mae)} points (RMSE is ${fx(rmse / mae)} × MAE)`;
      return { mae, rmse };
    }
  };

  /* ------------------------------------------------------------ s10 · why both */
  SC.s10 = {
    copy: [
      { k: "Why both?", m: "Two summaries of the same errors.", s: "", l: "Both" },
      { k: "The gap", m: "RMSE ≥ MAE, always. The gap measures unevenness.", s: "", l: "Gap = unevenness" },
      { k: "Hidden misses", m: "A small MAE can hide rare, large misses.", s: "Only RMSE reveals them.", l: "Rare big misses" },
      { k: "Report", m: "Both, in the outcome's units, beside its spread.", s: "Nobody can act on an R².", l: "MAE · RMSE · spread" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${[["model A · even errors", [5, 5, 4, 6, 5, 5, 4, 6], 40, NAVY], ["model B · same MAE, rare big misses", [2, 2, 2, 2, 2, 2, 2, 26], 186, TERRA]].map(([n, E, y, c], k) => { const mae = E.reduce((a, v) => a + v, 0) / E.length, rm = Math.sqrt(E.reduce((a, v) => a + v * v, 0) / E.length);
  return `<g class="a o0 md10" data-k="${k}">${card(14, y, 452, 132, c)}${t(30, y + 26, n, 14, c, "start", 800)}
  ${E.map((v, i) => `<rect x="${34 + i * 30}" y="${y + 118 - v * 3.2}" width="22" height="${v * 3.2}" rx="3" fill="${c}" fill-opacity=".75"/>`).join("")}
  ${t(300, y + 64, "MAE " + fx(mae, 2), 18, GREEN, "start", 800)}<g class="a o0 rm10">${t(300, y + 96, "RMSE " + fx(rm, 2), 18, c, "start", 800)}</g></g>`; }).join("")}
<g class="a o0 rp10" style="transform:translateY(8px)">${card(40, 326 - 6, 400, 34, INK, INK)}${t(240, 342, "report: MAE · RMSE · the outcome's spread (16 points)", 13, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".md10").forEach(g => { const k = +g.dataset.k; g.style.opacity = k === 0 ? 1 : (b >= 2 ? 1 : 0); });
      H.show(r, ".rm10", b >= 1); H.show(r, ".rp10", b >= 3); H.tf(r, ".rp10", b >= 3 ? "none" : "translateY(8px)");
    }
  };

  /* ------------------------------------------------------------ s11 · one split, outside everything */
  const MOD = [["1 predictor", NAVY], ["6 predictors", GREEN], ["network", TERRA]];
  SC.s11 = {
    copy: [
      { k: "The script", m: "Three models: 1 predictor, 6 predictors, a network.", s: "", l: "Three models" },
      { k: "Line 10", m: "The split happens once, before the loop.", s: "train_test_split(...)", l: "Split once" },
      { k: "Same rows", m: "Every model trained on the same rows, scored on the same rows.", s: "", l: "Same rows" },
      { k: "Otherwise", m: "Different splits cannot be compared.", s: "And nothing in the output would tell you.", l: "Silent failure" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 sp11" style="transform:translateY(-10px)">${card(140, 20, 200, 60, INK, INK)}${t(240, 44, "line 10 · split ONCE", 15, GOLD, "middle", 800)}
  <rect x="160" y="56" width="120" height="14" rx="4" fill="${NAVY}"/><rect x="284" y="56" width="40" height="14" rx="4" fill="${TERRA}"/></g>
${MOD.map(([n, c], i) => `<g class="a o0 md11" data-i="${i}">${card(24 + i * 152, 150, 128, 64, c)}${t(88 + i * 152, 188, n, 15, c, "middle", 800)}
  <path class="ar11" d="M240 80 L${88 + i * 152} 148" stroke="${GREY}" stroke-width="2.5" stroke-dasharray="5 4"/>
  <g class="a o0 sc11"><rect x="${36 + i * 152}" y="236" width="104" height="40" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="2"/>${t(88 + i * 152, 261, "same test rows", 11.5, TERRA, "middle", 800)}<path d="M${88 + i * 152} 214 V234" stroke="${TERRA}" stroke-width="2.5"/></g></g>`).join("")}
<g class="a o0 bad11" style="transform:scale(.9)">${card(40, 286, 400, 60, TERRA, "#FCEFE9")}${fo(54, 292, 372, 50, "Different splits → no comparison. <b>No error message will tell you.</b>", 15, TERRA, 700, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".md11", true); H.show(r, ".sp11", b >= 1); H.tf(r, ".sp11", b >= 1 ? "none" : "translateY(-10px)");
      H.set(r, ".ar11", "stroke", b >= 1 ? GOLD : GREY); H.show(r, ".sc11", b >= 2);
      H.show(r, ".bad11", b >= 3); H.tf(r, ".bad11", b >= 3 ? "none" : "scale(.9)");
    }
  };
})();
