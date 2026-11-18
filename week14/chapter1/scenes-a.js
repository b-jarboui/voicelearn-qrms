/* Week 14 · Chapter 4 animated scenes, part A (s01–s11).
   Each scene: SC[id] = { svg, copy[beat], render(root, beat) } on a 480 x 360 stage.
   render() sets the full state for a beat (so jumping between beats works); CSS transitions do the motion.
   Data: window.W14 (Week 14 slide figures + curves computed on the Al Waha episodes file). */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const W = window.W14;
  const NAVY = "#1F4E79", TERRA = "#C0502A", GREEN = "#2E7D4F", GOLD = "#E8B04B", INK = "#1A1F2B", SKY = "#DCE7F2", MUTED = "#5A6373", GREY = "#9AA3B2", PAPER = "#F6F1E7", EDGE = "#CDBFA6";

  const H = window.SCH = {
    q: (r, s) => Array.from(r.querySelectorAll(s)),
    set(r, s, p, v) { H.q(r, s).forEach(e => { e.style[p] = v; }); },
    show(r, s, on) { H.q(r, s).forEach(e => { e.style.opacity = on ? "1" : "0"; }); },
    tf(r, s, v) { H.q(r, s).forEach(e => { e.style.transform = v; }); },
    draw(r, s, on) { H.q(r, s).forEach(e => { e.style.strokeDashoffset = on ? "0" : "1"; }); },
    delay(r, s, sec) { H.q(r, s).forEach(e => { e.style.transitionDelay = sec + "s"; }); },
    cam(r, cx, cy, s) { H.set(r, ".cam", "transform", `translate(${-s * (cx - 240)}px,${-s * (cy - 180)}px) scale(${s})`); },
    count(el, to, ms, f) {
      if (!el || el._to === to) return;
      f = f || (v => Math.round(v).toLocaleString("en-US"));
      const from = el._cur || 0, t0 = performance.now(); el._to = to; cancelAnimationFrame(el._raf);
      const step = now => { const p = Math.min(1, (now - t0) / (ms || 1000)), e = 1 - Math.pow(1 - p, 3), v = from + (to - from) * e;
        el._cur = v; el.textContent = f(v); if (p < 1) el._raf = requestAnimationFrame(step); };
      el._raf = requestAnimationFrame(step);
    },
    t: (x, y, s, size, fill, anchor, weight, cls) =>
      `<text${cls ? ` class="${cls}"` : ""} x="${x}" y="${y}" font-size="${size || 16}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="${weight || 700}">${s}</text>`,
    fo: (x, y, w, h, html, size, color, weight, extra) =>
      `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:${weight || 600} ${size || 13}px Calibri,Segoe UI,sans-serif;color:${color || INK};line-height:1.25;${extra || ""}">${html}</div></foreignObject>`,
    person: (x, y, c, s, cls) =>
      `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><circle cx="0" cy="-31" r="8.5" fill="${c}"/><path d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${c}"/></g></g>`,
    card: (x, y, w, h, stroke, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill || "#fff"}" stroke="${stroke || EDGE}" stroke-width="2"/>`,
    alive: r => { const s = r.querySelector("svg"); return () => s && s.isConnected; },
    C: { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE }
  };
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const STY = `<style>.flow{stroke-dasharray:3 9;animation:flow .9s linear infinite}@keyframes flow{to{stroke-dashoffset:-12}}</style>`;

  /* shared drawings */
  const ward = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="40" width="150" height="110" fill="#fff"/>
    <path class="dr" pathLength="1" d="M0 150 V40 H150 V150" fill="none" stroke="${NAVY}" stroke-width="5"/>
    <path class="dr" pathLength="1" d="M-12 46 L75 0 L162 46" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <g><rect x="61" y="12" width="28" height="28" rx="5" fill="${TERRA}"/><rect x="71" y="16" width="8" height="20" fill="#fff"/><rect x="65" y="22" width="20" height="8" fill="#fff"/></g>
    <rect x="16" y="50" width="118" height="20" rx="4" fill="${NAVY}"/>${t(75, 65, "AL WAHA HOSPITAL", 11.5, "#fff")}
    ${[0, 1, 2].map(i => `<rect x="${16 + i * 44}" y="80" width="30" height="24" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="2.5"/>`).join("")}
    <rect x="58" y="110" width="34" height="40" fill="${NAVY}"/></g>`;
  // a mini network drawing: layers = [n...], box = [x0,y0,x1,y1]
  const mini = (layers, x0, y0, x1, y1, r, cls) => {
    const xs = layers.map((_, i) => x0 + (x1 - x0) * i / (layers.length - 1));
    const ys = n => Array.from({ length: n }, (_, j) => n === 1 ? (y0 + y1) / 2 : y0 + (y1 - y0) * j / (n - 1));
    let e = "", v = "";
    for (let i = 0; i < layers.length - 1; i++) ys(layers[i]).forEach(a => ys(layers[i + 1]).forEach(b => { e += `<path d="M${xs[i]} ${a} L${xs[i + 1]} ${b}" stroke="${GREY}" stroke-width="1" stroke-opacity=".55"/>`; }));
    layers.forEach((n, i) => ys(n).forEach(y => { v += `<circle cx="${xs[i]}" cy="${y}" r="${r}" fill="${i === 0 ? GOLD : i === layers.length - 1 ? TERRA : NAVY}"/>`; }));
    return `<g class="${cls || ""}">${e}${v}</g>`;
  };

  /* chart helpers for the occupancy cliff: occupancy 50–100 → x 70–450, satisfaction 40–95 → y 300–50 */
  const OX = o => 70 + (o - 50) * 7.6, OY = s => 300 - (s - 40) * (250 / 55);
  const axes = (xl, yl) => `<path d="M70 300 H456 M70 300 V44" stroke="${INK}" stroke-width="2"/>
    ${[50, 60, 70, 80, 90, 100].map(o => `<path d="M${OX(o)} 300 v5" stroke="${INK}" stroke-width="2"/>${t(OX(o), 320, o + "%", 12, MUTED, "middle", 700)}`).join("")}
    ${[40, 50, 60, 70, 80, 90].map(s => `<path d="M70 ${OY(s)} h-5" stroke="${INK}" stroke-width="2"/><path d="M70 ${OY(s)} H456" stroke="${EDGE}" stroke-width="1" stroke-opacity=".5"/>${t(60, OY(s) + 4, s, 12, MUTED, "end", 700)}`).join("")}
    ${t(263, 344, xl || "bed occupancy", 13, INK, "middle", 800)}${`<text transform="translate(24 172) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">${yl || "satisfaction"}</text>`}`;
  const pathOf = (pts) => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");
  const BAND = W.occ.band;
  const LIN = W.occ.x.map((o, i) => [o, W.occ.lin[i]]).filter(([o]) => o >= 50);
  const NET = W.occ.x.map((o, i) => [o, W.occ.net[i]]).filter(([o]) => o >= 50);
  const relu = v => Math.max(0, v);

  /* ------------------------------------------------------------ s01 · welcome */
  SC.s01 = {
    copy: [
      { k: "Week 14 · Chapter 4", m: "Inside the neural network.", s: "One of the models behind artificial intelligence.", l: "Neural networks" },
      { k: "The question", m: "How satisfied will this patient be?", s: "This time we want a better prediction.", l: "Predict satisfaction" },
      { k: "The promise", m: "A neuron is a regression with one extra step.", s: "Far less mysterious than it sounds.", l: "One extra step" }
    ],
    svg: `${STY}
<rect width="480" height="360" fill="${PAPER}"/>
<g class="cam">
  <circle cx="446" cy="36" r="20" fill="${GOLD}"/>
  <rect y="300" width="480" height="60" fill="#E7DDCB"/><path d="M0 300 H480" stroke="${EDGE}" stroke-width="3"/>
  <g class="bld">${ward(18, 150, 1)}</g>
  ${[0, 1, 2].map(i => person(200 + i * 30, 330, [NAVY, TERRA, GREEN][i], .8, "bob")).join("")}
  <g class="a box01">
    <rect x="290" y="70" width="170" height="170" rx="18" fill="${INK}"/>
    <g class="a o0 net01">${mini([3, 5, 4, 1], 318, 98, 432, 212, 7)}
      ${[0, 1, 2].map(i => `<path class="flow" d="M318 ${98 + i * 57} L364 ${126 + i * 20} L398 ${120 + i * 25} L432 155" fill="none" stroke="${GOLD}" stroke-width="2.5"/>`).join("")}</g>
    <g class="a q01">${t(375, 178, "?", 84, GOLD, "middle", 800)}</g>
  </g>
  <g class="a o0 gauge01" style="transform:translateY(10px)">
    <rect x="300" y="250" width="150" height="40" rx="10" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>
    ${t(375, 268, "illustrative prediction", 11, MUTED, "middle", 700)}<text class="gv01" x="375" y="285" font-size="15" fill="${TERRA}" text-anchor="middle" font-weight="800">…</text>
  </g>
  <g class="a o0 eq01" style="transform:scale(.8)">
    <rect x="96" y="40" width="292" height="44" rx="22" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
    ${t(242, 69, "regression  +  one rule  =  a neuron", 16, NAVY, "middle", 800)}
  </g>
</g>`,
    render(r, b) {
      H.draw(r, ".bld .dr", true);
      H.show(r, ".q01", b < 2); H.show(r, ".net01", b >= 2); H.delay(r, ".net01", b >= 2 ? .5 : 0);
      H.show(r, ".gauge01", b >= 1); H.tf(r, ".gauge01", b >= 1 ? "none" : "translateY(10px)");
      const gv = r.querySelector(".gv01"); if (b >= 1) H.count(gv, 78, 1400, v => Math.round(v) + " / 100"); else { gv.textContent = "…"; gv._to = null; gv._cur = 0; }
      H.show(r, ".eq01", b >= 2); H.tf(r, ".eq01", b >= 2 ? "none" : "scale(.8)"); H.delay(r, ".eq01", b >= 2 ? 1 : 0);
      H.cam(r, b >= 1 ? 300 : 240, 180, b >= 1 ? 1.04 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · what you already have */
  const R02 = [["coefficient", "→ weight", "How much the prediction moves per unit.", NAVY], ["intercept", "→ bias", "The value when every input is zero.", GREEN], ["held-out scoring", "→ same", "Judge on rows never seen.", TERRA], ["standardising", "→ scaling", "Units stop deciding things.", GOLD]];
  SC.s02 = {
    copy: [
      { k: "Recall", m: "You already own almost everything a network uses.", s: "Weeks 8, 9, 11 and 12.", l: "Four old tools" },
      { k: "Week 9", m: "A coefficient: how much the prediction moves per unit.", s: "In a network it is called a weight.", l: "coefficient → weight" },
      { k: "Week 8", m: "An intercept: the value when every input is zero.", s: "In a network it is called a bias.", l: "intercept → bias" },
      { k: "Weeks 11–12", m: "Held-out scoring, and standardising.", s: "Both come back, under the same names.", l: "Same rules" },
      { k: "So", m: "New names. Mostly old ideas.", s: "That is most of what a neural network is.", l: "Old ideas, new names" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${R02.map(([a, n, s, c], i) => { const x = 16 + (i % 2) * 228, y = 30 + Math.floor(i / 2) * 150;
  return `<g class="a o0 c02" data-i="${i}" style="transform:translateY(14px)">${card(x, y, 220, 136, c)}<rect x="${x}" y="${y}" width="220" height="8" rx="4" fill="${c}"/>
    ${t(x + 16, y + 40, a, 19, INK, "start", 800)}<g class="a o0 nn02">${t(x + 16, y + 70, n, 19, c, "start", 800)}</g>${fo(x + 16, y + 82, 194, 46, s, 13, MUTED, 600)}</g>`; }).join("")}
<g class="a o0 st02" style="transform:scale(1.5)"><g transform="rotate(-5 240 180)"><rect x="128" y="156" width="224" height="46" rx="10" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(240, 187, "OLD IDEAS, NEW NAMES", 19, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.q(r, ".c02").forEach(g => { const i = +g.dataset.i, on = b === 0 || (i === 0 && b >= 1) || (i === 1 && b >= 2) || (i >= 2 && b >= 3); g.style.opacity = on ? (b === 0 ? .55 : 1) : .2; g.style.transform = on ? "none" : "translateY(14px)"; });
      H.q(r, ".c02").forEach(g => { const i = +g.dataset.i, nn = g.querySelector(".nn02"); nn.style.opacity = (i === 0 && b >= 1) || (i === 1 && b >= 2) || (i >= 2 && b >= 3) ? 1 : 0; });
      H.show(r, ".st02", b >= 4); H.tf(r, ".st02", b >= 4 ? "none" : "scale(1.5)");
    }
  };

  /* ------------------------------------------------------------ s03 · the bend */
  SC.s03 = {
    copy: [
      { k: "Real data", m: "Average satisfaction in each occupancy band.", s: "5,200 Al Waha episodes; dot size = number of episodes.", l: "Banded averages" },
      { k: "The cliff", m: `Flat until about 80%, then a fall to ${Math.round(BAND[BAND.length - 1][1])}.`, s: `From ${Math.round(BAND.find(p => p[0] === 80)[1])} points at 80% to ${Math.round(BAND[BAND.length - 1][1])} in the busiest band.`, l: "A cliff after 80%" },
      { k: "Week 9", m: "The regression's occupancy effect: a straight line.", s: "Other predictors held at their medians.", l: "Straight line" },
      { k: "The problem", m: "A straight line cannot bend.", s: "It falls too early, and not nearly enough where it matters.", l: "Cannot bend" },
      { k: "This week", m: "A network can bend.", s: "Network prediction, other predictors at their medians.", l: "It bends" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${axes()}
<rect class="a o0 dz03" x="${OX(85)}" y="44" width="${OX(100) - OX(85)}" height="256" fill="${TERRA}" fill-opacity=".09"/>
<g class="a o0 dzl03">${t(OX(92.5), 62, "danger zone", 12, TERRA, "middle", 800)}</g>
<path class="dr ln03" pathLength="1" d="${pathOf(LIN.map(([o, s]) => [OX(o), OY(s)]))}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>
<g class="a o0 lnl03">${t(OX(56), OY(LIN[0][1]) - 12, "Week 9: straight", 13, NAVY, "start", 800)}</g>
<path class="dr cv03" pathLength="1" d="${pathOf(BAND.map(([o, s]) => [OX(o), OY(s)]))}" fill="none" stroke="${TERRA}" stroke-width="3" stroke-dasharray="1" stroke-opacity=".5"/>
${BAND.map(([o, s, n], i) => `<g class="a o0 pt03" style="transition-delay:${(i * .09).toFixed(2)}s;transform:translateY(-14px)"><circle cx="${OX(o)}" cy="${OY(s)}" r="${(3.5 + Math.sqrt(n || 400) / 7).toFixed(1)}" fill="${TERRA}" stroke="#fff" stroke-width="2"/></g>`).join("")}
<g class="a o0 gap03">${[90, 95, 100].map(o => { const s = BAND.find(p => p[0] === o)[1], l = LIN.find(p => p[0] === o)[1]; return `<path d="M${OX(o)} ${OY(l)} V${OY(s) - 8}" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="4 3"/>`; }).join("")}
  ${t(OX(88) - 6, OY(52), "compare the shapes", 12, TERRA, "end", 800)}</g>
<path class="dr nt03" pathLength="1" d="${pathOf(NET.map(([o, s]) => [OX(o), OY(s)]))}" fill="none" stroke="${GREEN}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<g class="a o0 ntl03">${t(OX(68), OY(72), "network (others at median)", 13, GREEN, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".pt03", true); H.tf(r, ".pt03", "none");
      H.draw(r, ".cv03", b >= 1); H.show(r, ".dz03", b >= 1); H.show(r, ".dzl03", b >= 1);
      H.draw(r, ".ln03", b >= 2); H.show(r, ".lnl03", b >= 2);
      H.show(r, ".gap03", b >= 3);
      H.draw(r, ".nt03", b >= 4); H.show(r, ".ntl03", b >= 4); H.delay(r, ".ntl03", b >= 4 ? 1.2 : 0);
    }
  };

  /* ------------------------------------------------------------ s04 · one neuron */
  // inputs: waiting 62 min, occupancy 88%; weights illustrative (marked)
  SC.s04 = {
    copy: [
      { k: "One neuron", m: "Two inputs come in.", s: "Waiting time and occupancy of one episode.", l: "Inputs" },
      { k: "Step 1 · Multiply", m: "Each input × its weight.", s: "Same role as Week 9's coefficients.", l: "× weights" },
      { k: "Step 2 · Add", m: "Add them up, plus one number: the bias.", s: "It plays the intercept's role.", l: "Σ + bias" },
      { k: "Step 3 · The rule", m: "If the total is negative, output zero.", s: "Otherwise, pass it on. The only new idea.", l: "The rule" },
      { k: "That is all", m: "Multiply, add, apply the rule.", s: "All one neuron here does.", l: "Multiply · add · rule" }
    ],
    svg: `${STY}
<rect width="480" height="360" fill="${PAPER}"/>
${t(470, 352, "illustration · weights chosen for the example", 10, MUTED, "end", 700)}
<g class="a in04">${card(14, 70, 112, 60, GOLD)}${t(70, 94, "waiting", 13, MUTED)}${t(70, 118, "62 min", 18, INK, "middle", 800)}
  ${card(14, 210, 112, 60, GOLD)}${t(70, 234, "occupancy", 13, MUTED)}${t(70, 258, "88 %", 18, INK, "middle", 800)}</g>
<path d="M126 100 L230 168" stroke="${NAVY}" stroke-width="4"/><path d="M126 240 L230 192" stroke="${NAVY}" stroke-width="4"/>
<path class="a o0 fl04 flow" d="M126 100 L230 168 M126 240 L230 192" stroke="${GOLD}" stroke-width="4" fill="none"/>
<g class="a o0 w04">${card(140, 106, 76, 30, NAVY, SKY)}${t(178, 126, "× −0.10", 14, NAVY, "middle", 800)}${card(140, 222, 76, 30, NAVY, SKY)}${t(178, 242, "× −0.05", 14, NAVY, "middle", 800)}</g>
<g class="a o0 pr04">${t(178, 96, "= −6.2", 13, TERRA, "middle", 800)}${t(178, 272, "= −4.4", 13, TERRA, "middle", 800)}</g>
<circle cx="250" cy="180" r="34" fill="#fff" stroke="${NAVY}" stroke-width="4"/>${t(250, 192, "Σ", 32, NAVY, "middle", 800)}
<g class="a o0 b04" style="transform:translateY(-10px)">${card(212, 34, 76, 34, GREEN, "#EAF5EE")}${t(250, 57, "+ 14 bias", 13, GREEN, "middle", 800)}<path d="M250 68 V144" stroke="${GREEN}" stroke-width="3" stroke-dasharray="4 3"/></g>
<g class="a o0 sum04">${card(304, 82, 162, 50, NAVY, SKY)}${t(385, 100, "total", 12, MUTED)}<text class="sv04" x="385" y="122" font-size="20" fill="${INK}" text-anchor="middle" font-weight="800">3.4</text></g>
<path d="M284 180 H320" stroke="${NAVY}" stroke-width="4"/>
<g class="rl04"><rect x="320" y="142" width="80" height="76" rx="12" fill="${INK}"/><path d="M332 200 H360 L388 160" fill="none" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>${t(360, 214, "rule", 11, "#fff", "middle", 700)}</g>
<g class="a o0 neg04">${card(296, 236, 168, 52, TERRA, "#FCEFE9")}${fo(304, 240, 154, 46, "negative → 0<br>zero or positive → passes on", 13, TERRA, 800)}</g>
<path d="M400 180 H440" stroke="${NAVY}" stroke-width="4"/>
<g class="a o0 out04"><circle cx="452" cy="180" r="20" fill="${TERRA}"/>${t(452, 186, "3.4", 13, "#fff", "middle", 800)}</g>
<g class="a o0 all04" style="transform:translateY(8px)"><rect x="96" y="300" width="288" height="40" rx="20" fill="${INK}"/>${t(240, 326, "multiply  ·  add  ·  apply the rule", 16, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".w04", b >= 1); H.show(r, ".pr04", b >= 1); H.delay(r, ".pr04", b >= 1 ? .6 : 0); H.show(r, ".fl04", b >= 1 && b <= 2);
      H.show(r, ".b04", b >= 2); H.tf(r, ".b04", b >= 2 ? "none" : "translateY(-10px)"); H.show(r, ".sum04", b >= 2); H.delay(r, ".sum04", b >= 2 ? .8 : 0);
      const sv = r.querySelector(".sv04"); sv.textContent = "−6.2 − 4.4 + 14 = 3.4"; sv.setAttribute("font-size", "14");
      H.show(r, ".neg04", b >= 3); H.show(r, ".out04", b >= 3); H.delay(r, ".out04", b >= 3 ? 1 : 0);
      H.show(r, ".all04", b >= 4); H.tf(r, ".all04", b >= 4 ? "none" : "translateY(8px)");
    }
  };

  /* ------------------------------------------------------------ s05 · try it: one neuron by hand */
  const EP = { A: [10, 30], B: [20, 10] }, NW = [0.5, -0.2], NB = 1;
  SC.s05 = {
    copy: [
      { k: "Your turn", m: "w1 = 0.5, w2 = −0.2, b = 1.", s: "Rule: negatives become zero.", l: "One neuron" },
      { k: "Two episodes", m: "A: 10 and 30. B: 20 and 10.", s: "Work out each total, then apply the rule.", l: "A and B" },
      { k: "Your turn", m: "Choose an episode and predict the output.", s: "Then press Continue.", l: "Predict, then check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${card(14, 20, 452, 70, NAVY)}${t(30, 48, "this neuron", 12, MUTED, "start", 800)}
${t(30, 76, "w1 = 0.5  ·  w2 = −0.2  ·  b = 1  ·  rule: negative → 0", 16, NAVY, "start", 800)}
<g class="ep05">${["A", "B"].map((k, i) => `<g class="a epc05" data-k="${k}">${card(14 + i * 230, 104, 222, 56, EDGE)}${t(30 + i * 230, 138, "episode " + k + ":  x1 = " + EP[k][0] + ",  x2 = " + EP[k][1], 15, INK, "start", 800)}</g>`).join("")}</g>
${card(14, 174, 452, 170, EDGE)}
${[0, 1, 2, 3].map(i => `<g class="a o0 ln05" data-i="${i}" style="transform:translateX(-10px)"><text class="tx05" x="34" y="${208 + i * 34}" font-size="17" fill="${INK}" font-weight="700"></text></g>`).join("")}
<g class="a o0 res05" style="transform:scale(.6)"><circle cx="418" cy="232" r="30" fill="${TERRA}"/><text class="rv05" x="418" y="241" font-size="24" fill="#fff" text-anchor="middle" font-weight="800">0</text></g>`,
    render(r, b) { if (!r._k05) SC.s05.pick(r, null); },
    pick(r, k) {
      r._k05 = k || "none";
      H.q(r, ".epc05").forEach(g => { const on = g.dataset.k === k; g.querySelector("rect").style.stroke = on ? TERRA : ""; g.querySelector("rect").style.strokeWidth = on ? "4" : ""; });
      if (!k) { H.show(r, ".ln05", false); H.show(r, ".res05", false); return; }
      const [x1, x2] = EP[k], p1 = NW[0] * x1, p2 = NW[1] * x2, tot = p1 + p2 + NB, out = relu(tot);
      const L = [`multiply:   0.5 × ${x1} = ${fx(p1, 0)}  ·  −0.2 × ${x2} = −${fx(Math.abs(p2), 0)}`, `add the bias:   ${fx(p1, 0)} ${p2 < 0 ? "−" : "+"} ${fx(Math.abs(p2), 0)} + 1 = ${fx(tot, 0)}`,
        `the rule:   ${tot < 0 ? "negative → 0" : tot === 0 ? "zero stays 0" : "positive → passes on"}`, `output:   ${fx(out, 0)}${k === "A" ? "   (this neuron is silent for A)" : ""}`];
      H.q(r, ".ln05").forEach((g, i) => { g.querySelector(".tx05").textContent = L[i]; g.style.transitionDelay = (i * .5) + "s"; g.style.opacity = 1; g.style.transform = "none"; });
      r.querySelector(".rv05").textContent = fx(out, 0); H.delay(r, ".res05", 2); H.show(r, ".res05", true); H.tf(r, ".res05", "none");
      r.querySelector(".res05 circle").setAttribute("fill", out > 0 ? GREEN : TERRA);
      return out;
    }
  };

  /* ------------------------------------------------------------ s06 · why the rule matters */
  // left panel: straight line → straight line; right panel: ReLU hinge
  const P6 = (x0, y0) => `<rect x="${x0}" y="${y0}" width="210" height="150" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2"/><path d="M${x0 + 20} ${y0 + 130} H${x0 + 196} M${x0 + 20} ${y0 + 130} V${y0 + 14}" stroke="${INK}" stroke-width="1.8"/>`;
  SC.s06 = {
    copy: [
      { k: "The rule", m: "Why does one small rule matter so much?", s: "Look at what happens without it.", l: "Without the rule" },
      { k: "Without it", m: "A weighted sum of a weighted sum is a weighted sum.", s: "Line → line → line.", l: "Still a line" },
      { k: "Any depth", m: "Ten layers, a hundred: still one linear function.", s: "Nothing Week 9 could not already do.", l: "Collapses" },
      { k: "With it", m: "Each neuron becomes a hinge.", s: "Flat on one side, sloped on the other. Hinges can bend.", l: "A hinge" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a lf06">${P6(16, 40)}${t(121, 30, "without the rule", 14, NAVY, "middle", 800)}
  ${[0, 1, 2, 3].map(i => `<path class="a o0 ly06" data-i="${i}" d="M36 ${160 - i * 6} L212 ${70 + i * 9}" stroke="${[NAVY, "#3F6E99", "#6D93B8", "#97B3CE"][i]}" stroke-width="4" stroke-linecap="round"/>`).join("")}
  <g class="a o0 eq06">${t(121, 216, "layer → layer → layer", 13, MUTED)}${t(121, 236, "= one straight line", 15, NAVY, "middle", 800)}</g></g>
<g class="a o0 rt06" style="transform:translateX(16px)">${P6(254, 40)}${t(359, 30, "with the rule", 14, TERRA, "middle", 800)}
  <path class="dr hg06" pathLength="1" d="M274 170 H352 L440 70" fill="none" stroke="${TERRA}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle class="a o0 kn06 pulse2" cx="352" cy="170" r="7" fill="${GOLD}"/>
  ${t(312, 160, "flat", 13, MUTED)}${t(420, 120, "sloped", 13, MUTED)}
  <g class="a o0 eqr06">${t(359, 216, "a hinge", 15, TERRA, "middle", 800)}${t(359, 236, "and hinges can bend", 13, MUTED)}</g></g>
<g class="a o0 st06">${card(60, 270, 360, 64, INK, INK)}${fo(76, 280, 330, 50, "Ten layers or a hundred: without the rule, it is still Week 9's straight line.", 14, "#fff", 700, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".ly06").forEach(e => { const i = +e.dataset.i; e.style.opacity = b >= 1 ? (i <= (b >= 2 ? 3 : 1) ? 1 : 0) : (i === 0 ? 1 : 0); e.style.transitionDelay = (i * .35) + "s"; });
      H.show(r, ".eq06", b >= 1); H.show(r, ".st06", b === 2);
      H.show(r, ".rt06", b >= 3); H.tf(r, ".rt06", b >= 3 ? "none" : "translateX(16px)"); H.draw(r, ".hg06", b >= 3); H.show(r, ".kn06", b >= 3); H.show(r, ".eqr06", b >= 3);
      H.set(r, ".lf06", "opacity", b >= 3 ? ".45" : "1");
    }
  };

  /* ------------------------------------------------------------ s07 · building a bend from hinges */
  const HG = [[80, -1.6], [86, -1.4], [94, 1.6]];
  const curveK = k => { const pts = []; for (let o = 50; o <= 100; o += 1) { let s = 84; for (let j = 0; j < k; j++) s += HG[j][1] * relu(o - HG[j][0]); pts.push([OX(o), OY(s)]); } return pathOf(pts); };
  SC.s07 = {
    copy: [
      { k: "Bend it", m: "Fit the occupancy cliff with nothing but hinges.", s: "The red dots are the real banded averages.", l: "Hinges only" },
      { k: "A constant", m: "The output bias: 84 points.", s: "Fine on the left, useless on the right.", l: "Flat" },
      { k: "Hinge at 80%", m: "Below 80%: nothing changes. Above it: a fall.", s: "One neuron, one hinge.", l: "+ hinge 80%" },
      { k: "Two more", m: "A steeper fall from 86%, a softer end from 94%.", s: "Each hinge is one neuron.", l: "+ 86% · + 94%" },
      { k: "A network", m: "Three hinges already follow the real cliff.", s: "A network uses many; training decides where they go.", l: "It bends" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${axes()}
${BAND.map(([o, s]) => `<circle cx="${OX(o)}" cy="${OY(s)}" r="6.5" fill="${TERRA}" fill-opacity=".85" stroke="#fff" stroke-width="2"/>`).join("")}
${[0, 1, 2, 3].map(k => `<path class="a o0 cv07" data-k="${k}" d="${curveK(k)}" fill="none" stroke="${k === 3 ? GREEN : NAVY}" stroke-width="${k === 3 ? 5 : 4}" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
${HG.map(([o], j) => `<g class="a o0 hk07" data-j="${j}"><path d="M${OX(o)} 300 V52" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 4"/><rect x="${OX(o) - 24}" y="34" width="48" height="20" rx="10" fill="${GOLD}"/>${t(OX(o), 49, o + "%", 12, INK, "middle", 800)}</g>`).join("")}
<g class="a o0 lb07">${card(84, 214, 184, 52, GREEN, "#EAF5EE")}${fo(94, 220, 168, 44, "3 hidden neurons = 3 hinges,<br>plus the output bias", 13, GREEN, 800)}</g>${t(84, 292, "illustration · hinges placed by hand", 10, MUTED, "start", 700)}`,
    render(r, b) {
      const k = b <= 1 ? 0 : b === 2 ? 1 : 3;
      H.q(r, ".cv07").forEach(e => { e.style.opacity = b >= 1 && +e.dataset.k === k ? 1 : 0; });
      H.q(r, ".hk07").forEach(e => { e.style.opacity = +e.dataset.j < k || (b >= 4) ? 1 : 0; });
      H.show(r, ".lb07", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s08 · a network */
  const NL = [6, 10, 8, 1], NX = [70, 200, 320, 430];
  const NY = (n, j) => n === 1 ? 180 : 50 + (260 / (n - 1)) * j;
  const INPUTS = ["waiting", "staff ratio", "training", "occupancy", "handoffs", "prior visits"];
  SC.s08 = {
    copy: [
      { k: "A network", m: "Connect many neurons.", s: "This week's script: MLPRegressor(hidden_layer_sizes=(32, 16)).", l: "6 → 32 → 16 → 1" },
      { k: "Inputs", m: "Six inputs, one per predictor.", s: "The same six as Week 9.", l: "6 inputs" },
      { k: "Layer 1", m: "32 neurons. Each sees all six inputs.", s: "Multiply, add a bias, apply the rule.", l: "32 neurons" },
      { k: "Layer 2 + output", m: "16 neurons, then one output neuron.", s: "Weighted sum + bias, no rule: the prediction.", l: "16 → 1" },
      { k: "769 numbers", m: `${W.params} weights and biases to learn.`, s: `${W.weights} weights + ${W.biases} biases. Two hidden layers: say so.`, l: `${W.params} parameters` }
    ],
    svg: `${STY}
<rect width="480" height="360" fill="${PAPER}"/>
${[0, 1, 2].map(i => NY(NL[i], 0) !== undefined ? Array.from({ length: NL[i] }, (_, a) => Array.from({ length: NL[i + 1] }, (_, c) => `<path class="a o0 e08 e08-${i}" d="M${NX[i]} ${NY(NL[i], a)} L${NX[i + 1]} ${NY(NL[i + 1], c)}" stroke="${GREY}" stroke-width="1" stroke-opacity=".45"/>`).join("")).join("") : "").join("")}
${[0, 1, 2].map(i => `<path class="a o0 f08 f08-${i} flow" d="M${NX[i]} ${NY(NL[i], 2)} L${NX[i + 1]} ${NY(NL[i + 1], 4 % NL[i + 1])} M${NX[i]} ${NY(NL[i], NL[i] - 1)} L${NX[i + 1]} ${NY(NL[i + 1], 1 % NL[i + 1])}" stroke="${GOLD}" stroke-width="3" fill="none"/>`).join("")}
${NL.map((n, i) => Array.from({ length: n }, (_, j) => `<g class="a o0 v08 v08-${i}" style="transition-delay:${(j * .04).toFixed(2)}s"><circle cx="${NX[i]}" cy="${NY(n, j)}" r="${i === 3 ? 16 : 10}" fill="${i === 0 ? GOLD : i === 3 ? TERRA : NAVY}" stroke="#fff" stroke-width="2"/></g>`).join("")).join("")}
<g class="a o0 v08-0">${INPUTS.map((s, j) => t(NX[0] - 16, NY(6, j) + 4, s, 11.5, INK, "end", 700)).join("")}</g>
<g class="a o0 lb08-1">${t(NX[1], 336, "32 neurons", 13, NAVY, "middle", 800)}${t(NX[1], 30, "⋮ (10 of 32 drawn)", 10.5, MUTED)}</g>
<g class="a o0 lb08-2">${t(NX[2], 336, "16 neurons", 13, NAVY, "middle", 800)}${t(NX[2], 30, "(8 of 16 drawn)", 10.5, MUTED)}${t(NX[3], 214, "prediction", 12, TERRA, "middle", 800)}</g>
<g class="a o0 pc08" style="transform:scale(.8)">${card(340, 254, 132, 64, TERRA)}<text class="pv08" x="406" y="284" font-size="22" fill="${TERRA}" text-anchor="middle" font-weight="800">0</text>${t(406, 306, "weights + biases", 11.5, MUTED)}</g>`,
    render(r, b) {
      H.show(r, ".v08-0", b >= 0); H.show(r, ".e08-0", b >= 2); H.show(r, ".v08-1", b >= 2); H.show(r, ".lb08-1", b >= 2); H.show(r, ".f08-0", b >= 2);
      H.show(r, ".e08-1,.e08-2", b >= 3); H.show(r, ".v08-2,.v08-3", b >= 3); H.show(r, ".lb08-2", b >= 3); H.show(r, ".f08-1,.f08-2", b >= 3);
      if (b === 0) { H.show(r, ".v08", true); H.show(r, ".e08", true); H.set(r, ".v08,.e08", "opacity", ".35"); H.set(r, ".v08-0", "opacity", "1"); }
      H.show(r, ".pc08", b >= 4); H.tf(r, ".pc08", b >= 4 ? "none" : "scale(.8)");
      const pv = r.querySelector(".pv08"); if (b >= 4) H.count(pv, W.params, 1500); else { pv.textContent = "0"; pv._to = null; pv._cur = 0; }
    }
  };

  /* ------------------------------------------------------------ s09 · how it learns */
  const TR = W.trainRmse, LX = i => 70 + i * (380 / (TR.length - 1)), LY = v => 300 - v * (240 / 80);
  SC.s09 = {
    copy: [
      { k: "Who chooses?", m: `You choose the design. Training finds ${W.params} numbers.`, s: "Starting from small random values.", l: "Random start" },
      { k: "First pass", m: `After pass 1: RMSE ${Math.round(TR[0])} points.`, s: "Random starting values predict badly.", l: `RMSE ${Math.round(TR[0])}` },
      { k: "One step", m: "Measure the error. Nudge every weight downhill.", s: "Every weight and bias, a small step downhill.", l: "Nudge, repeat" },
      { k: "The real training", m: `About ${Math.round(TR[19])} after 20 passes; ${fx(TR[TR.length - 1], 1)} when it stops.`, s: `${W.iters} passes through the training rows.`, l: "Downhill" },
      { k: "No formula", m: "The numbers were found, not solved.", s: "Thousands of small corrections.", l: "Found, not solved" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a hill09">
  <path d="M30 60 C120 60 150 250 250 250 C350 250 380 120 460 110" fill="none" stroke="${NAVY}" stroke-width="4"/>
  <path d="M30 60 C120 60 150 250 250 250 C350 250 380 120 460 110 V300 H30 Z" fill="${SKY}" fill-opacity=".5"/>
  ${t(250, 284, "small error", 13, GREEN, "middle", 800)}${t(56, 48, "big error", 13, TERRA, "middle", 800)}
  <rect x="0" y="0" width="480" height="140" fill="#fff" fill-opacity=".0"/>
  <g class="fog09" style="transition:opacity .8s;opacity:0"><rect x="0" y="40" width="480" height="230" fill="#fff" fill-opacity=".45"/></g>
  <g class="ball09" style="transition:transform 1.2s cubic-bezier(.4,0,.2,1)"><circle cx="0" cy="0" r="13" fill="${TERRA}" stroke="#fff" stroke-width="3"/></g>
</g>
<g class="a o0 ch09">
  <path d="M70 300 H456 M70 300 V50" stroke="${INK}" stroke-width="2"/>
  ${[0, 20, 40, 60, 80].map(v => `<path d="M70 ${LY(v)} H456" stroke="${EDGE}" stroke-opacity=".5"/>${t(62, LY(v) + 4, v, 12, MUTED, "end", 700)}`).join("")}
  ${[1, 100, 200, 300].filter(i => i <= TR.length).map(i => t(LX(i - 1), 318, i, 12, MUTED, "middle", 700)).join("")}
  ${t(263, 342, "passes through the training rows", 13, INK, "middle", 800)}<text transform="translate(26 176) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">training RMSE (points)</text>
  <path class="dr lc09" pathLength="1" d="${pathOf(TR.map((v, i) => [LX(i), LY(v)]))}" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linejoin="round"/>
  <g class="a o0 end09">${card(300, 160, 150, 52, GREEN, "#EAF5EE")}${t(375, 184, "when it stops", 12, MUTED)}${t(375, 204, fx(TR[TR.length - 1], 1) + " points", 17, GREEN, "middle", 800)}</g>
  <g class="a o0 st09">${card(300, 70, 150, 52, TERRA)}${t(375, 94, "after pass 1", 12, MUTED)}${t(375, 114, "RMSE " + Math.round(TR[0]), 17, TERRA, "middle", 800)}</g>
</g>`,
    render(r, b) {
      const ballAt = [[46, 48], [46, 48], [176, 200], [250, 238], [250, 238]][b];
      H.set(r, ".ball09", "transform", `translate(${ballAt[0]}px,${ballAt[1]}px)`);
      H.set(r, ".fog09", "opacity", b === 2 ? "1" : "0");
      H.show(r, ".hill09", b <= 2); H.show(r, ".ch09", b >= 3 || b === 1);
      H.set(r, ".hill09", "opacity", b <= 2 ? (b === 1 ? "0" : "1") : "0");
      H.draw(r, ".lc09", b >= 3); H.show(r, ".st09", b >= 1); H.show(r, ".end09", b >= 3); H.delay(r, ".end09", b >= 3 ? 1.6 : 0);
      if (b === 4) { H.set(r, ".ch09", "opacity", "1"); }
    }
  };

  /* ------------------------------------------------------------ s10 · RMSE by hand */
  const RE = [70, 75, 80, 85], PR = [72, 74, 83, 79];
  const sqBox = (cls, extra) => RE.map((v, i) => { const e = PR[i] - v, s = Math.abs(e) * 9; return `<g class="a o0 ${cls}" data-i="${i}" ${extra || ""}><rect x="${60 + i * 105 - s / 2 + 20}" y="${282 - s}" width="${s}" height="${s}" fill="${i === 3 ? TERRA : NAVY}" fill-opacity="${i === 3 ? .85 : .6}"/>${t(80 + i * 105, 300 + 0, (e * e) + "", 15, i === 3 ? TERRA : NAVY, "middle", 800)}</g>`; }).join("");
  SC.s10 = {
    copy: [
      { k: "RMSE", m: "Root mean squared error.", s: "A typical size of error, in the outcome's own units.", l: "R M S E" },
      { k: "Four episodes", m: "Real 70, 75, 80, 85. Predicted 72, 74, 83, 79.", s: "", l: "Real vs predicted" },
      { k: "Square", m: "Errors −2, 1, −3, 6 → squares 4, 1, 9, 36.", s: "Error = real − predicted.", l: "Square the errors" },
      { k: "Mean, then root", m: "50 ÷ 4 = 12.5 → √12.5 = 3.54 points.", s: "Back in satisfaction points.", l: "RMSE = 3.54" },
      { k: "The worst case rules", m: "The one error of 6 gave 36 of the 50.", s: "Squaring makes RMSE sensitive to the worst cases.", l: "72% from one error" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${RE.map((v, i) => `<g class="a o0 ep10" data-i="${i}" style="transition-delay:${i * .15}s">${card(28 + i * 105, 22, 96, 100, EDGE)}${t(76 + i * 105, 44, "episode " + (i + 1), 12, MUTED)}
  ${t(76 + i * 105, 72, "real " + v, 16, INK, "middle", 800)}${t(76 + i * 105, 96, "pred " + PR[i], 16, NAVY, "middle", 800)}
  <g class="a o0 er10">${t(76 + i * 105, 116, "error " + (v - PR[i] > 0 ? "+" : "−") + Math.abs(v - PR[i]), 13, i === 3 ? TERRA : MUTED, "middle", 800)}</g></g>`).join("")}
${sqBox("sq10")}
<g class="a o0 mn10">${card(60, 140, 360, 48, INK, INK)}${t(240, 171, "(4 + 1 + 9 + 36) ÷ 4 = 12.5   →   √12.5 = 3.54", 17, GOLD, "middle", 800)}</g>
<g class="a o0 sh10">${card(14, 196, 190, 50, TERRA, "#FCEFE9")}${fo(22, 200, 176, 44, "one error of 6 = 36 of the 50", 14, TERRA, 800, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".ep10", b >= 1 || b === 0); H.set(r, ".ep10", "opacity", b === 0 ? ".35" : "1");
      H.show(r, ".er10", b >= 2); H.show(r, ".sq10", b >= 2); H.delay(r, ".sq10", b >= 2 ? .5 : 0);
      H.show(r, ".mn10", b >= 3); H.show(r, ".sh10", b >= 4);
      H.q(r, ".sq10").forEach(g => { g.style.opacity = b >= 2 ? (b >= 4 && g.dataset.i !== "3" ? .35 : 1) : 0; });
    }
  };

  /* ------------------------------------------------------------ s11 · try it: the worst error rules */
  SC.s11 = {
    copy: [
      { k: "Your turn", m: "Move the fourth prediction.", s: "Watch its square grow and shrink.", l: "Move prediction 4" },
      { k: "Your turn", m: "How much of the error does one prediction own?", s: "Then press Continue.", l: "One bad prediction" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 28, "squared errors of the four episodes (area = square)", 13, MUTED, "middle", 800)}
${RE.map((v, i) => `<g class="sq11" data-i="${i}"><rect class="sr11" x="0" y="0" width="0" height="0" fill="${i === 3 ? TERRA : NAVY}" fill-opacity="${i === 3 ? .85 : .6}" style="transition:all .35s"/>
  ${t(70 + i * 112, 300, "episode " + (i + 1), 12, MUTED)}<text class="sl11" x="${70 + i * 112}" y="318" font-size="15" fill="${i === 3 ? TERRA : NAVY}" text-anchor="middle" font-weight="800"></text></g>`).join("")}
<g>${card(110, 36, 260, 52, INK, INK)}<text class="rm11" x="240" y="68" font-size="18" fill="${GOLD}" text-anchor="middle" font-weight="800"></text></g>`,
    render(r, b) { if (!r._p11) SC.s11.update(r, 79); },
    update(r, p4) {
      r._p11 = p4; const P = [72, 74, 83, p4], sq = RE.map((v, i) => (P[i] - v) ** 2), tot = sq.reduce((a, c) => a + c, 0), rmse = Math.sqrt(tot / 4), share = tot ? sq[3] / tot : 0;
      H.q(r, ".sq11").forEach(g => { const i = +g.dataset.i, s = Math.sqrt(sq[i]) * 7, cx = 70 + i * 112, rc = g.querySelector(".sr11");
        rc.setAttribute("x", cx - s / 2); rc.setAttribute("y", 282 - s); rc.setAttribute("width", s); rc.setAttribute("height", s); g.querySelector(".sl11").textContent = (RE[i] - P[i] > 0 ? "+" : RE[i] - P[i] < 0 ? "−" : "") + Math.abs(RE[i] - P[i]) + " → " + sq[i]; });
      r.querySelector(".rm11").textContent = `RMSE = ${fx(rmse)}   ·   episode 4 owns ${Math.round(share * 100)}%`;
      return { rmse, share, err: 85 - p4 };
    }
  };
})();
