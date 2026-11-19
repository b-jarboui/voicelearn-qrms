/* Week 15 · Chapter 5 animated scenes, part A (s01–s11, s23–s32).
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
  const METH = [["compare", "group comparison", "short vs long"], ["line", "regression", "1 predictor"], ["lines", "adjusted regression", "6 predictors"], ["classify", "classifier", "held-out test"], ["cluster", "clustering", "unlabelled groups"], ["text", "text model", "review words"], ["net", "neural network", "flexible curve"]];

  /* ------------------------------------------------------------ s01 · welcome */
  SC.s01 = {
    copy: [
      { k: "Overview", m: "Evidence synthesis and responsible reporting.", s: "Putting results together and reporting them honestly.", l: "Synthesis" },
      { k: "Many methods", m: "One question of one dataset.", s: "What is related to patient satisfaction at Al Waha?", l: "One question" },
      { k: "This chapter", m: "Several answers, side by side.", s: "And the one you would defend.", l: "The one you defend" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="cam">
  <circle cx="446" cy="36" r="20" fill="${GOLD}"/>
  <rect y="300" width="480" height="60" fill="#E7DDCB"/><path d="M0 300 H480" stroke="${EDGE}" stroke-width="3"/>
  <g class="a o0 q01" style="transform:translateY(10px)">${card(120, 34, 240, 56, NAVY)}${t(240, 58, "one question", 12, MUTED)}${t(240, 79, "What goes with satisfaction?", 16, NAVY, "middle", 800)}</g>
  ${METH.map(([k, n], i) => { const x = 50 + i * 63.3; return `<g class="a o0 m01" data-i="${i}" style="transform:translateY(16px)"><circle cx="${x}" cy="170" r="27" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${ICON[k](x, 170, [NAVY, NAVY, NAVY, GREEN, GOLD, TERRA, INK][i])}${fo(x - 31, 202, 62, 34, n, 10.5, MUTED, 700, "text-align:center")}<path class="ln01" d="M${x} 143 L240 92" stroke="${EDGE}" stroke-width="1.5" stroke-dasharray="3 4"/></g>`; }).join("")}
  <g class="a o0 pick01" style="transform:scale(.8)"><rect x="150" y="244" width="180" height="46" rx="23" fill="${TERRA}"/>${t(240, 273, "the one you defend", 16, "#fff", "middle", 800)}<path d="M240 244 V230" stroke="${TERRA}" stroke-width="3"/></g>
  ${person(60, 330, NAVY, .9, "bob")}${person(420, 330, GREEN, .9, "bob")}
</g>`,
    render(r, b) {
      H.show(r, ".q01", b >= 1); H.tf(r, ".q01", b >= 1 ? "none" : "translateY(10px)");
      H.q(r, ".m01").forEach(g => { const i = +g.dataset.i; g.style.transitionDelay = (b >= 1 ? .4 + i * .12 : 0) + "s"; g.style.opacity = b >= 1 ? 1 : 0; g.style.transform = b >= 1 ? "none" : "translateY(16px)"; });
      H.show(r, ".pick01", b >= 2); H.tf(r, ".pick01", b >= 2 ? "none" : "scale(.8)");
      H.cam(r, 240, 180, b === 0 ? 1.04 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · the term on one page */
  const TERM = [["Foundations", "samples · formulas · p values · reading your code", NAVY], ["Classical models", "comparisons · lines · adjusted lines · probabilities", GREEN], ["ML & text", "honest scoring · unlabelled groups · words · a model you cannot read", TERRA]];
  SC.s02 = {
    copy: [
      { k: "Overview", m: "The whole toolkit on one page.", s: "", l: "Full toolkit" },
      { k: "Foundations", m: "Samples, formulas, p values, and your own code.", s: "", l: "Foundations" },
      { k: "Classical models", m: "Comparisons, lines, adjusted lines, probabilities.", s: "", l: "Models" },
      { k: "ML & text", m: "Honest scoring, unlabelled groups, words, a black box.", s: "", l: "Machine learning" },
      { k: "Synthesis", m: "One dataset. One topic. The answers meet.", s: "", l: "Synthesis" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M40 60 V300" stroke="${EDGE}" stroke-width="4"/>
${TERM.map(([a, s, c], i) => `<g class="a o0 tm02" data-i="${i}" style="transform:translateX(-16px)"><circle cx="40" cy="${84 + i * 76}" r="13" fill="${c}"/>${card(66, 56 + i * 76, 396, 60, c)}${t(82, 80 + i * 76, a, 16, c, "start", 800)}${fo(82, 86 + i * 76, 372, 28, s, 13, MUTED, 700)}</g>`).join("")}
<g class="a o0 w15" style="transform:scale(.8)"><circle cx="40" cy="314" r="16" fill="${GOLD}"/>${card(66, 290, 396, 50, INK, INK)}${t(264, 321, "Synthesis: one dataset, one question, all the answers", 15, GOLD, "middle", 800)}</g>`,
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

  /* ------------------------------------------------------------ s23 · estimand, estimator, estimate */
  const bullseye = (x, y, c) => `<circle cx="${x}" cy="${y}" r="18" fill="#fff" stroke="${c}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="4.5" fill="${c}"/>`;
  SC.s23 = {
    copy: [
      { k: "Intuition", m: "Which target was the archer aiming at?", s: "You cannot judge a shot before naming the target.", l: "Name the target" },
      { k: "Common trap", m: "Jumping straight to the formula.", s: "Calculating a number before defining what it measures.", l: "Formula first?" },
      { k: "At Al Waha", m: "Group gap vs adjusted ten-minute slope.", s: "Two distinct targets on the same hospital episodes.", l: "Two Al Waha targets" },
      { k: "1 · Estimand", m: "The exact target quantity your question asks for.", s: "Defined in the population or process, before choosing a model.", l: "Estimand = target" },
      { k: "2 · Estimator", m: "The rule or method used to compute an answer.", s: "Such as ordinary least squares or a difference of means.", l: "Estimator = rule" },
      { k: "3 · Estimate", m: "The numerical value produced from your sample.", s: "Minus 1.23 points per 10 minutes on the 5,200 episodes.", l: "Estimate = number" },
      { k: "Three distinct words", m: "Estimand → Estimator → Estimate.", s: "Target → Tool → Sample number.", l: "Target · tool · number" },
      { k: "Why it matters", m: "Different numbers often mean different estimands.", s: "Ask which target each analysis aimed at before comparing them.", l: "Compare estimands" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 28, "three distinct concepts in every quantitative analysis", 13, MUTED, "middle", 800)}
<g class="a o0 col23" data-i="0" style="transform:translateY(12px)">
  ${card(16, 44, 140, 206, NAVY, "#fff")}
  <rect x="16" y="44" width="140" height="32" rx="10" fill="${NAVY}"/>${t(86, 65, "1 · ESTIMAND", 13, "#fff", "middle", 800)}
  ${bullseye(86, 106, NAVY)}
  ${t(86, 142, "the target quantity", 12.5, NAVY, "middle", 800)}
  <g class="a o0 ex23a">${card(26, 152, 120, 40, EDGE, SKY)}${fo(30, 156, 112, 34, "Target A: short vs long wait gap", 11, INK, 700, "text-align:center")}</g>
  <g class="a o0 ex23b">${card(26, 198, 120, 42, NAVY, SKY)}${fo(30, 202, 112, 36, "Target B: slope per 10 min, others fixed", 11, NAVY, 800, "text-align:center")}</g>
</g>
<g class="a o0 col23" data-i="1" style="transform:translateY(12px)">
  ${card(170, 44, 140, 206, GREEN, "#fff")}
  <rect x="170" y="44" width="140" height="32" rx="10" fill="${GREEN}"/>${t(240, 65, "2 · ESTIMATOR", 13, "#fff", "middle", 800)}
  <circle cx="240" cy="106" r="18" fill="#EAF5EE" stroke="${GREEN}" stroke-width="2.5"/>${t(240, 111, "f(X,y)", 12, GREEN, "middle", 800)}
  ${t(240, 142, "the rule / method", 12.5, GREEN, "middle", 800)}
  ${card(180, 154, 120, 40, EDGE, "#EAF5EE")}${fo(184, 158, 112, 34, "Mean difference:<br>ȳ₁ − ȳ₂", 11, INK, 700, "text-align:center")}
  ${card(180, 200, 120, 40, GREEN, "#EAF5EE")}${fo(184, 204, 112, 34, "OLS regression:<br>6 predictors", 11, GREEN, 800, "text-align:center")}
</g>
<g class="a o0 col23" data-i="2" style="transform:translateY(12px)">
  ${card(324, 44, 140, 206, TERRA, "#fff")}
  <rect x="324" y="44" width="140" height="32" rx="10" fill="${TERRA}"/>${t(394, 65, "3 · ESTIMATE", 13, "#fff", "middle", 800)}
  <rect x="366" y="88" width="56" height="34" rx="8" fill="#FCEFE9" stroke="${TERRA}" stroke-width="2.5"/>${t(394, 110, "#.#", 14, TERRA, "middle", 800)}
  ${t(394, 142, "the sample number", 12.5, TERRA, "middle", 800)}
  ${card(334, 154, 120, 40, EDGE, "#FCEFE9")}${t(394, 179, "+16.4 points", 13.5, INK, "middle", 800)}
  ${card(334, 200, 120, 40, TERRA, "#FCEFE9")}${t(394, 225, "−1.23 / 10 min", 13.5, TERRA, "middle", 800)}
</g>
<g class="a o0 ar23"><path d="M156 146 H170 M310 146 H324" stroke="${GOLD}" stroke-width="4"/></g>
<g class="a o0 warn23">${card(40, 262, 400, 80, TERRA, "#FCEFE9")}${fo(56, 272, 368, 64, "<b>Mistake to avoid:</b> jumping straight to a formula (estimator) or quoting a number (estimate) without stating which target (estimand) it aims at.", 13.5, TERRA, 700, "text-align:center")}</g>
<g class="a o0 sum23" style="transform:scale(.94)">${card(24, 264, 432, 80, INK, INK)}${t(240, 292, "Estimand (target)  →  Estimator (rule)  →  Estimate (number)", 14, GOLD, "middle", 800)}${fo(40, 304, 400, 36, "When two analyses give different numbers on the same 5,200 Al Waha rows, check first whether they aimed at different estimands.", 12.5, "#fff", 600, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".col23").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && (b === 0 || b >= 2)) || (i === 1 && (b === 0 || b === 1 || b >= 4)) || (i === 2 && (b === 0 || b === 1 || b >= 5));
        g.style.opacity = on ? 1 : 0.22;
        g.style.transform = on ? "none" : "translateY(12px)";
      });
      H.show(r, ".ex23a", b >= 2);
      H.show(r, ".ex23b", b >= 2);
      H.show(r, ".warn23", b === 1);
      H.show(r, ".ar23", b >= 6);
      H.show(r, ".sum23", b >= 6);
      H.tf(r, ".sum23", b >= 6 ? "none" : "scale(.94)");
    }
  };

  /* ------------------------------------------------------------ s24 · three estimands for Al Waha waiting time */
  const LANES24 = [
    ["1 · Total marginal association", "How satisfaction varies with 10 min of waiting in routine clinic life (letting occupancy, staff, and handoffs co-vary naturally).", "−3.01 pts / 10 min", "Simple regression (1 predictor)", TERRA, "#FCEFE9"],
    ["2 · Conditional association", "How satisfaction varies with 10 min of waiting among episodes matched on the other 5 measured predictors.", "−1.23 pts / 10 min", "Adjusted regression (6 predictors)", NAVY, SKY],
    ["3 · Causal intervention effect", "How much satisfaction would change if managers intervened to cut waits by 10 min while holding all else fixed.", "Unmeasured acuity?", "Needs trial or causal assumptions", GREEN, "#EAF5EE"]
  ];
  SC.s24 = {
    copy: [
      { k: "Three targets", m: "Three waiting-time estimands at Al Waha.", s: "Same predictor, same outcome, three different questions.", l: "Three estimands" },
      { k: "Estimand 1", m: "Total marginal association in routine visits.", s: "Letting everything else vary naturally as it does in the clinic.", l: "Total association" },
      { k: "Estimate 1", m: "−3.01 points per 10 minutes (waiting alone).", s: "Carries the crowded wards and stretched shifts that travel with long waits.", l: "−3.01 / 10 min" },
      { k: "Estimand 2", m: "Conditional association, holding 5 predictors constant.", s: "Comparing episodes with the same occupancy, staffing, handoffs, and training.", l: "Conditional" },
      { k: "Estimate 2", m: "−1.23 points per 10 minutes (6 predictors).", s: "Isolates waiting among episodes matched on the five measured covariates.", l: "−1.23 / 10 min" },
      { k: "Estimand 3", m: "Causal effect of an active intervention.", s: "If managers cut every patient's wait by 10 minutes tomorrow.", l: "Causal target" },
      { k: "The boundary", m: "Unmeasured illness severity could still confound.", s: "Observational data alone cannot rule out unmeasured patient acuity at arrival.", l: "Unmeasured acuity" },
      { k: "Honest reporting", m: "−1.23 is a conditional association, not causal proof.", s: "Naming the estimand keeps your conclusion honest and defensible.", l: "Name it honestly" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "three different waiting-time estimands on the 5,200 Al Waha episodes", 12.5, MUTED, "middle", 800)}
${LANES24.map(([title, desc, est, meth, c, bg], i) => {
  const y = 36 + i * 94;
  return `<g class="a o0 ln24" data-i="${i}" style="transform:translateX(-14px)">
    ${card(14, y, 452, 84, c, "#fff")}
    <rect x="14" y="${y}" width="10" height="84" rx="4" fill="${c}"/>
    ${t(32, y + 22, title, 14, c, "start", 800)}
    ${fo(32, y + 28, 274, 50, desc, 11.5, INK, 600)}
    <g class="a o0 bg24" data-i="${i}">
      <rect x="314" y="${y + 12}" width="142" height="60" rx="10" fill="${bg}" stroke="${c}" stroke-width="1.5"/>
      ${t(385, y + 36, est, 14, c, "middle", 800)}
      ${t(385, y + 56, meth, 10.5, MUTED, "middle", 700)}
    </g>
  </g>`;
}).join("")}
<g class="a o0 rl24" style="transform:translateY(8px)">${card(14, 318, 452, 34, INK, INK)}${t(240, 340, "−3.01 (total) · −1.23 (adjusted association) · never claim causal proof", 12.5, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".ln24").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && (b === 0 || b >= 1)) || (i === 1 && (b === 0 || b >= 3)) || (i === 2 && (b === 0 || b >= 5));
        g.style.opacity = on ? 1 : 0.2;
        g.style.transform = on ? "none" : "translateX(-14px)";
      });
      H.q(r, ".bg24").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 2) || (i === 1 && b >= 4) || (i === 2 && b >= 6);
        g.style.opacity = on ? 1 : 0.15;
      });
      H.show(r, ".rl24", b >= 7);
      H.tf(r, ".rl24", b >= 7 ? "none" : "translateY(8px)");
    }
  };

  /* ------------------------------------------------------------ s04 · the same question, five ways */
  const FIVE = [["1", "Do short and long waits differ?", "short − long: +16.4 pts, d = 1.21", "how much each extra minute matters"], ["2", "How much per 10 minutes?", "−3.01 / 10 min, R² 0.41", "whether waiting stands in for other things"],
    ["3", "Holding the other five constant?", "−1.23 / 10 min, R² 0.79", "anything that is not a straight line"], ["4", "Are there profiles at all?", "clearer than shuffled data", "anything about satisfaction on their own"], ["5", "The best prediction?", "MAE 4.9 · RMSE 6.12 · R² 0.85", "why: its weights cannot say"]];
  SC.s04 = {
    copy: [
      { k: "Five answers", m: "One topic, five different questions.", s: "Method · question · result · what it cannot say.", l: "Five questions" },
      { k: "Group comparison", m: "Short minus long waits: +16.4 points, d = 1.21.", s: "Cannot say: how much each extra minute matters.", l: "Comparison" },
      { k: "Simple regression", m: "−3.01 points per 10 minutes.", s: "Cannot say: whether waiting stands in for something else.", l: "Regression" },
      { k: "Adjusted regression", m: "−1.23 per 10 minutes, others held constant.", s: "Cannot say: anything that is not a straight line.", l: "Adjusted" },
      { k: "Clustering", m: "Profiles exist: clearer than in shuffled data.", s: "Formed without the outcome: silent on satisfaction.", l: "Clustering" },
      { k: "Neural network", m: "Best prediction: MAE 4.9, RMSE 6.12, R² 0.85.", s: "Its weights cannot say why.", l: "Network" },
      { k: "Read the last column", m: "What it cannot say is what the examiner asks.", s: "", l: "The last column" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${[["#", 14, 34], ["question", 54, 120], ["result", 178, 124], ["cannot say", 306, 160]].map(([s, x, w]) => `<rect x="${x}" y="14" width="${w}" height="24" rx="6" fill="${s === "cannot say" ? TERRA : INK}" class="${s === "cannot say" ? "hc04" : ""}"/>${t(x + w / 2, 31, s, 12, "#fff", "middle", 800)}`).join("")}
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
      { k: "Simple · alone", m: "Waiting carries everything that comes with it.", s: "Fewer staff, more handoffs, less training.", l: "−3.01 carries them" },
      { k: "Adjusted · 6 predictors", m: "Others held constant: −1.23 among similar episodes.", s: "An association, not yet proof of cause.", l: "−1.23 adjusted" },
      { k: "Both true", m: "Different questions. Say which one you asked.", s: "", l: "Say the question" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M60 300 H450 M60 300 V40" stroke="${INK}" stroke-width="2"/>${t(255, 326, "waiting time →", 13, INK, "middle", 800)}<text transform="translate(34 170) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">satisfaction</text>
<path class="dr s8" pathLength="1" d="M70 70 L440 270" stroke="${TERRA}" stroke-width="5" stroke-linecap="round"/>
<g class="a o0 s8l">${t(440, 262, "", 13)}${card(300, 56, 160, 44, TERRA, "#FCEFE9")}${t(380, 76, "Simple · waiting alone", 12, TERRA, "middle", 800)}${t(380, 93, "−3.01 per 10 min", 14, TERRA, "middle", 800)}</g>
<g class="a o0 bag06">${[["fewer staff", 150, 150], ["more handoffs", 230, 196], ["less training", 316, 236]].map(([s, x, y]) => `<rect x="${x - 40}" y="${y - 30}" width="80" height="22" rx="11" fill="${GOLD}"/>${t(x, y - 15, s, 11.5, INK, "middle", 800)}`).join("")}</g>
<path class="dr s9" pathLength="1" d="M70 120 L440 200" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/>
<g class="a o0 s9l">${card(300, 216, 160, 44, NAVY, SKY)}${t(380, 236, "Adjusted · 6 predictors", 12, NAVY, "middle", 800)}${t(380, 253, "−1.23 per 10 min", 14, NAVY, "middle", 800)}</g>
<g class="a o0 bt06" style="transform:scale(.85)">${card(80, 120, 200, 60, INK, INK)}${t(180, 146, "both true", 18, GOLD, "middle", 800)}${t(180, 168, "different questions", 13, "#fff")}</g>`,
    render(r, b) {
      H.draw(r, ".s8", true); H.show(r, ".s8l", true); H.show(r, ".bag06", b === 1);
      H.draw(r, ".s9", b >= 2); H.show(r, ".s9l", b >= 2);
      H.show(r, ".bt06", b >= 3); H.tf(r, ".bt06", b >= 3 ? "none" : "scale(.85)");
    }
  };

  /* ------------------------------------------------------------ s25 · triangulation */
  const LENS25 = [
    ["Linear Regression", "6 predictors · straight slope", "Assumes linearity", NAVY, 67],
    ["Banded Averages", "5% occupancy slices", "No shape assumed", TERRA, 182],
    ["Neural Network", "Flexible non-linear curve", "Others at median", GREEN, 297],
    ["Patient Reviews", "Text complaints in reviews", "Words in crowded shifts", GOLD, 412]
  ];
  SC.s25 = {
    copy: [
      { k: "Intuition", m: "Surveyors sight a peak from several hills.", s: "One angle leaves depth uncertain; multiple angles pin it down.", l: "Sighting from angles" },
      { k: "Every method", m: "Every statistical tool has a lens and a blind spot.", s: "Lines, local averages, networks, and text each see something different.", l: "Lens & blind spot" },
      { k: "The Al Waha question", m: "How does high bed occupancy affect satisfaction?", s: "Inspecting the same hospital phenomenon with four distinct tools.", l: "Occupancy question" },
      { k: "Lens 1 and 2", m: "Linear regression versus banded 5% averages.", s: "A global straight line versus assumption-free local averages.", l: "Line vs bands" },
      { k: "Lens 3 and 4", m: "The neural network curve and patient text reviews.", s: "Flexible non-linear predictions plus complaint language on crowded shifts.", l: "Network & text" },
      { k: "Precise terms", m: "Triangulation produces convergent evidence.", s: "Combining methods with different assumptions that point to the same truth.", l: "Triangulation" },
      { k: "The key condition", m: "Methods must not share the same fatal blind spot.", s: "Different assumptions guard against an artifact of one formula.", l: "Different assumptions" },
      { k: "Next", m: "What happens when methods share a blind spot?", s: "Versus when they are truly free to disagree.", l: "Free to disagree" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="tg25">${card(110, 16, 260, 58, INK, INK)}${t(240, 38, "PHENOMENON TO PIN DOWN", 11, GOLD, "middle", 800)}${t(240, 60, "Bed occupancy & satisfaction at Al Waha", 13.5, "#fff", "middle", 800)}</g>
${LENS25.map(([name, wk, sub, c, cx], i) => {
  const x = cx - 53;
  return `<g class="a o0 ln25" data-i="${i}" style="transform:translateY(14px)">
    <path class="dr bm25" data-i="${i}" pathLength="1" d="M${cx} 130 L240 76" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
    ${card(x, 130, 106, 108, c, "#fff")}
    <circle cx="${cx}" cy="154" r="14" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2"/>
    ${t(cx, 159, i + 1, 13, c, "middle", 800)}
    ${fo(x + 4, 174, 98, 32, name, 12, INK, 800, "text-align:center")}
    ${fo(x + 4, 206, 98, 28, sub, 10.5, MUTED, 700, "text-align:center")}
  </g>`;
}).join("")}
<g class="a o0 cv25" style="transform:scale(.92)">${card(24, 252, 432, 92, GREEN, "#EAF5EE")}
  ${t(240, 276, "TRIANGULATION  →  CONVERGENT EVIDENCE", 14, GREEN, "middle", 800)}
  ${fo(40, 286, 400, 52, "When methods with <b>different assumptions and different blind spots</b> converge on the same substantive finding, confidence in the conclusion grows.", 12.5, INK, 600, "text-align:center")}
</g>`,
    render(r, b) {
      H.q(r, ".ln25").forEach(g => {
        const i = +g.dataset.i;
        const on = b >= 1 && (b >= 4 || (b === 1) || (b === 2) || (b === 3 && i <= 1));
        g.style.opacity = on ? 1 : (b === 0 ? 0.25 : 0.15);
        g.style.transform = on ? "none" : "translateY(14px)";
      });
      H.q(r, ".bm25").forEach(p => {
        const i = +p.dataset.i;
        const on = (b === 3 && i <= 1) || (b >= 4);
        p.style.strokeDashoffset = on ? "0" : "1";
      });
      H.show(r, ".cv25", b >= 5);
      H.tf(r, ".cv25", b >= 5 ? "none" : "scale(.92)");
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
      { k: "Could disagree", m: "Banded averages and the network both bend down.", s: "Bands: steep after 80%. Network: after about 85%.", l: "Both bend" },
      { k: "The rule", m: "Agreement counts only if the methods could have disagreed.", s: "Here, the disagreement is worth more.", l: "Could they disagree?" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M70 300 H456 M70 300 V44" stroke="${INK}" stroke-width="2"/>
${[50, 60, 70, 80, 90, 100].map(o => t(OX(o), 320, o + "%", 12, MUTED)).join("")}${[40, 60, 80].map(s => t(60, OY(s) + 4, s, 12, MUTED, "end", 700)).join("")}
${t(263, 344, "bed occupancy", 13, INK, "middle", 800)}<text transform="translate(26 172) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">satisfaction</text>
${[0, 1, 2].map(k => `<path class="dr l07" data-k="${k}" pathLength="1" d="${pathOf(LIN.map(([o, s]) => [OX(o), OY(s + (k - 1) * 2.2)]))}" fill="none" stroke="${["#3F6E99", NAVY, "#6D93B8"][k]}" stroke-width="4" stroke-linecap="round"/>`).join("")}
${t(456, 300 - 6, "illustration: straight-line fits", 10, MUTED, "end", 700)}<g class="a o0 al07">${card(250, 50, 196, 50, NAVY, SKY)}${fo(260, 54, 180, 44, "3 straight-line models:<br>“it is a straight line”", 13, NAVY, 800)}</g>
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

  /* ------------------------------------------------------------ s26 · convergent evidence and productive disagreement */
  const OX26 = o => 66 + (o - 55) * 8.2, OY26 = s => 248 - (s - 40) * (200 / 55);
  SC.s26 = {
    copy: [
      { k: "Look closer", m: "Where do the three occupancy curves agree and diverge?", s: "Banded means, adjusted network, and straight-line regression.", l: "Three curves" },
      { k: "60% to 80%", m: "A flat plateau in the normal operating zone.", s: "Banded averages hover near 83; the network stays flat near 77.", l: "Flat plateau" },
      { k: "Below 80%", m: "Moderate occupancy shifts barely move satisfaction.", s: "The hospital absorbs routine occupancy changes up to 80%.", l: "Up to 80%" },
      { k: "Above 80%", m: "Both flexible methods bend sharply downward.", s: "Bands plunge from 80.9 to 43.0; the network drops from 77.2 to 56.2.", l: "The tipping point" },
      { k: "Why the gap?", m: "The network holds waits and staffing at their medians.", s: "Raw bands also carry the longer waits that happen when wards overflow.", l: "Direct vs total drop" },
      { k: "The straight line", m: "Linear regression averages a plateau and a cliff.", s: "Predicting 81.8 at 60% and 66.3 at 100%, missing the 80% threshold.", l: "Forced straight line" },
      { k: "Convergence", m: "Bands and network converge on a non-linear threshold.", s: "Both reject the straight line and point to overcrowding above 80–85%.", l: "Threshold confirmed" },
      { k: "Synthesis", m: "Convergence gives the bend; divergence explains the mechanism.", s: "Part of overcrowding's harm works directly, and part through longer waits.", l: "Full synthesis" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect class="a o0 zn26a" x="${OX26(58)}" y="36" width="${OX26(80) - OX26(58)}" height="212" fill="#EAF5EE" fill-opacity=".7"/>
<rect class="a o0 zn26b" x="${OX26(80)}" y="36" width="${OX26(101) - OX26(80)}" height="212" fill="#FCEFE9" fill-opacity=".75"/>
<path d="M66 248 H452 M66 248 V36" stroke="${INK}" stroke-width="2"/>
<path d="M${OX26(80)} 36 V248" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 4"/>
${[60, 70, 80, 90, 100].map(o => t(OX26(o), 266, o + "%", 11.5, MUTED)).join("")}
${[45, 65, 85].map(s => t(58, OY26(s) + 4, s, 11.5, MUTED, "end", 700)).join("")}
${t(158, 50, "Plateau (60–80%)", 11.5, GREEN, "middle", 800)}
${t(360, 50, "Overcrowding cliff (>80%)", 11.5, TERRA, "middle", 800)}
<path class="a l26" d="${pathOf(LIN.filter(([o]) => o >= 60).map(([o, s]) => [OX26(o), OY26(s)]))}" fill="none" stroke="${NAVY}" stroke-width="3.5" stroke-dasharray="6 4"/>
<path class="a n26" d="${pathOf(NET.filter(([o]) => o >= 60).map(([o, s]) => [OX26(o), OY26(s)]))}" fill="none" stroke="${GREEN}" stroke-width="4" stroke-linecap="round"/>
${BAND.map(([o, s]) => `<circle class="a b26" cx="${OX26(o)}" cy="${OY26(s)}" r="5.5" fill="${TERRA}" stroke="#fff" stroke-width="1.5"/>`).join("")}
${t(OX26(100) - 6, OY26(66.3) - 8, "linear (66.3)", 11, NAVY, "end", 800)}
${t(OX26(100) - 6, OY26(56.2) - 8, "network (56.2)", 11, GREEN, "end", 800)}
${t(OX26(100) - 6, OY26(43.0) + 15, "bands (43.0)", 11, TERRA, "end", 800)}
<g class="a o0 bx26a">${card(18, 276, 444, 72, GREEN, "#EAF5EE")}${fo(30, 284, 420, 58, "<b>60% to 80% plateau:</b> Banded means stay near 83–84 points and the network stays near 77 points. Routine occupancy fluctuations below 80% do not erode satisfaction.", 12.5, INK, 600)}</g>
<g class="a o0 bx26b">${card(18, 276, 444, 72, TERRA, "#FCEFE9")}${fo(30, 284, 420, 58, "<b>Above 80% tipping point:</b> Unadjusted bands drop to 43.0 (carrying longer waits), while the median-adjusted network drops to 56.2. The straight line (66.3) misses the bend.", 12.5, INK, 600)}</g>
<g class="a o0 bx26c">${card(18, 276, 444, 72, INK, INK)}${fo(30, 284, 420, 58, "<b style='color:#E8B04B'>Synthesis:</b> Convergent evidence proves a non-linear overcrowding cliff above 80%; divergent steepness shows part of the drop is direct and part travels through waiting times.", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.show(r, ".zn26a", b >= 1 && b <= 2);
      H.show(r, ".zn26b", b >= 3);
      H.set(r, ".l26", "opacity", b === 5 || b === 0 || b >= 6 ? "1" : "0.35");
      H.show(r, ".bx26a", b >= 1 && b <= 2);
      H.show(r, ".bx26b", b >= 3 && b <= 5);
      H.show(r, ".bx26c", b >= 6);
    }
  };

  /* ------------------------------------------------------------ s27 · forest plot of effect sizes and CIs */
  const FX27 = v => 395 + v * 58; // v from -4.0 to +0.8; 0 is at x=395
  const FROWS27 = [
    ["Unadjusted (1 predictor)", -3.03, -3.13, -2.92, TERRA, "−3.03 [95% CI: −3.13, −2.92]"],
    ["Adjusted (6 predictors)", -1.23, -1.31, -1.16, NAVY, "−1.23 [95% CI: −1.31, −1.16]"],
    ["Daytime shifts subgroup", -1.16, -1.33, -0.99, GREEN, "−1.16 (same units)"],
    ["Night & weekend subgroup", -1.38, -1.68, -1.08, GREEN, "−1.38 (wider interval)"],
    ["Quadratic occupancy spec", -1.16, -1.24, -1.09, NAVY, "−1.16 (robust to bend)"]
  ];
  SC.s27 = {
    copy: [
      { k: "Beyond p values", m: "How big is the estimate, and how uncertain?", s: "A paragraph of p values hides magnitude and precision.", l: "Size & precision" },
      { k: "The visual tool", m: "One row per analysis: dot and whiskers.", s: "The dot is the point estimate; the bar is the 95% confidence interval.", l: "Dot and interval" },
      { k: "Forest plot", m: "Lining up estimates against the zero line.", s: "Compare direction, magnitude, and precision at a single glance.", l: "Forest plot" },
      { k: "Unadjusted", m: "−3.03 points per 10 minutes (95% CI: −3.13 to −2.92).", s: "Far to the left of zero, carrying co-varying hospital congestion.", l: "Unadjusted: −3.03" },
      { k: "Adjusted", m: "−1.23 points per 10 minutes (95% CI: −1.31 to −1.16).", s: "Closer to zero after adjustment (n = 4,724), yet the entire interval stays below zero.", l: "Adjusted: −1.23" },
      { k: "Same units", m: "Subgroups and alternative models on the same scale.", s: "Every row is measured in satisfaction points per 10 minutes of waiting.", l: "Common scale" },
      { k: "Clearer than words", m: "Adjustment halves the slope, yet the negative sign holds.", s: "You see both the confounding shift and the remaining precision.", l: "Shift & precision" },
      { k: "Reporting rule", m: "Always report point estimates with confidence intervals.", s: "In real outcome units, so readers can judge practical importance.", l: "Estimate + 95% CI" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "forest plot · waiting-time slope (satisfaction points per 10 minutes)", 12.5, MUTED, "middle", 800)}
<rect x="14" y="34" width="452" height="236" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="1.5"/>
<path d="M${FX27(0)} 44 V246" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="5 4"/>
${t(FX27(0), 262, "0 (no association)", 11, TERRA, "middle", 800)}
<path d="M180 244 H440" stroke="${INK}" stroke-width="1.5"/>
${[-3.5, -3.0, -2.0, -1.0, 0].map(v => `<path d="M${FX27(v)} 244 v5" stroke="${INK}" stroke-width="1.5"/>${t(FX27(v), 258, v === 0 ? "" : v.toFixed(1), 10.5, MUTED)}`).join("")}
${FROWS27.map(([lab, est, lo, hi, c, note], i) => {
  const y = 66 + i * 38;
  return `<g class="a o0 fr27" data-i="${i}" style="transform:translateX(-10px)">
    ${t(24, y + 4, lab, 11.5, INK, "start", 800)}
    <path d="M${FX27(lo)} ${y} H${FX27(hi)}" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M${FX27(lo)} ${y - 5} V${y + 5} M${FX27(hi)} ${y - 5} V${y + 5}" stroke="${c}" stroke-width="2.5"/>
    <circle cx="${FX27(est)}" cy="${y}" r="5.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>
    ${t(FX27(est), y - 9, note, 10, c, "middle", 800)}
  </g>`;
}).join("")}
<g class="a o0 ar27"><path d="M${FX27(-3.03)} 82 C${FX27(-2.1)} 95, ${FX27(-2.1)} 95, ${FX27(-1.23)} 94" fill="none" stroke="${GOLD}" stroke-width="2.5"/>${t(FX27(-2.1), 91, "adjustment shift", 10.5, INK, "middle", 800)}</g>
<g class="a o0 bt27">${card(14, 280, 452, 66, INK, INK)}${fo(28, 288, 424, 52, "<b style='color:#E8B04B'>Why forest plots beat p-value tables:</b> Every row sits on the same horizontal scale in real units (points per 10 min), showing at once the effect size, the 95% interval width, and the distance from zero.", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.q(r, ".fr27").forEach(g => {
        const i = +g.dataset.i;
        const on = (b <= 2 && i <= 1) || (b === 3 && i === 0) || (b === 4 && i <= 1) || (b >= 5);
        g.style.opacity = on ? 1 : 0.18;
        g.style.transform = on ? "none" : "translateX(-10px)";
      });
      H.show(r, ".ar27", b >= 6);
      H.show(r, ".bt27", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s28 · what makes a confidence interval wide or narrow */
  const FX28 = v => 350 + v * 75; // v from -3.0 to +1.0; 0 at x=350
  const CASES28 = [
    ["Full cleaned sample (n = 4,724)", -1.23, -1.31, -1.16, NAVY, "Tight CI: large n averages out noise"],
    ["Small weekend ward (n = 80)", -1.40, -2.45, -0.35, TERRA, "Wide CI: small n inflates standard error"],
    ["Highly collinear predictors added", -1.20, -2.15, -0.25, GOLD, "Wide CI: shared variance blurs slopes"],
    ["Huge sample, trivial slope (−0.10)", -0.10, -0.18, -0.02, GREEN, "p < 0.05, but too small to matter"],
    ["Small sample crossing zero (−1.10)", -1.10, -2.40, 0.20, MUTED, "Inconclusive (noisy), NOT proof of zero"]
  ];
  SC.s28 = {
    copy: [
      { k: "Interval width", m: "What makes a confidence interval wide or narrow?", s: "The range of values compatible with your data and assumptions.", l: "CI width" },
      { k: "1 · Sample size", m: "5,200 Al Waha episodes give a tight interval.", s: "Random episode-to-episode noise averages out in a large sample.", l: "Large n = tight" },
      { k: "Group gap interval", m: "Short vs long wait gap (<54.1 vs ≥54.1 min): +16.38 points (95% CI: 15.64 to 17.12).", s: "Large sample size pins down the group difference with high precision.", l: "+16.38 [15.64, 17.12]" },
      { k: "Small subgroup", m: "In a weekend clinic of 80 episodes, the bar stretches wide.", s: "Standard error scales with 1 / √n, so small subgroups have wide intervals.", l: "Small n = wide" },
      { k: "2 · Collinearity", m: "Tangled predictors widen the confidence interval.", s: "When predictors move together, the model has less independent signal.", l: "Collinearity widens" },
      { k: "Trivial significance", m: "−0.10 points can have p < 0.05 yet be clinically trivial.", s: "A tight interval near zero proves the association is negligibly small.", l: "Significant ≠ large" },
      { k: "Crossing zero", m: "A wide bar crossing zero does not prove zero effect.", s: "When the interval runs from −2.4 to +0.2, the sample is simply too noisy.", l: "Not proof of zero" },
      { k: "How to read it", m: "Check the clinical meaning of both ends of the bar.", s: "What do the lower bound and upper bound mean for Al Waha patients?", l: "Read both ends" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "five confidence interval patterns · points per 10 minutes of waiting", 12.5, MUTED, "middle", 800)}
<rect x="14" y="34" width="452" height="238" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="1.5"/>
<rect x="${FX28(-0.25)}" y="40" width="${FX28(0.25) - FX28(-0.25)}" height="206" fill="${SKY}" fill-opacity=".65"/>
${t(FX28(0), 52, "trivial zone", 9.5, NAVY, "middle", 700)}
<path d="M${FX28(0)} 56 V246" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M165 246 H435" stroke="${INK}" stroke-width="1.5"/>
${[-2.5, -2.0, -1.0, 0, 0.5].map(v => `<path d="M${FX28(v)} 246 v4" stroke="${INK}" stroke-width="1.5"/>${t(FX28(v), 260, v.toFixed(1), 10, MUTED)}`).join("")}
${CASES28.map(([lab, est, lo, hi, c, tag], i) => {
  const y = 72 + i * 36;
  return `<g class="a o0 cs28" data-i="${i}">
    ${t(22, y + 4, lab, 11, INK, "start", 800)}
    <path d="M${FX28(lo)} ${y} H${FX28(hi)}" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M${FX28(lo)} ${y - 5} V${y + 5} M${FX28(hi)} ${y - 5} V${y + 5}" stroke="${c}" stroke-width="2"/>
    <circle cx="${FX28(est)}" cy="${y}" r="5" fill="${c}" stroke="#fff" stroke-width="1.5"/>
    ${t(FX28(lo) - 4, y + 3, tag, 9.5, MUTED, "end", 700)}
  </g>`;
}).join("")}
<g class="a o0 bt28">${card(14, 280, 452, 66, INK, INK)}${fo(28, 288, 424, 52, "<b style='color:#E8B04B'>Examiner rule:</b> Never reduce a confidence interval to “crosses zero vs does not cross zero”. Inspect both endpoints in real satisfaction points.", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.q(r, ".cs28").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 1) || (i === 1 && b >= 3) || (i === 2 && b >= 4) || (i === 3 && b >= 5) || (i === 4 && b >= 6) || b === 0;
        g.style.opacity = on ? 1 : 0.15;
      });
      H.show(r, ".bt28", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s29 · try it: forest plot & interval width simulator */
  const FX29 = v => 375 + v * 62; // -4.5 to +1.0
  SC.s29 = {
    copy: [
      { k: "Your turn", m: "Change sample size and predictor correlation.", s: "Watch how the 95% confidence interval responds.", l: "Adjust controls" },
      { k: "Your turn", m: "Watch the whiskers widen and shrink on the forest plot.", s: "Compare against zero and the −1.0 clinical threshold.", l: "Watch the CI" },
      { k: "Your turn", m: "Explore when intervals cross zero or stay tight.", s: "Then press Continue.", l: "Explore, then continue" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 26, "interactive forest plot · waiting-time slope (points per 10 min)", 13, MUTED, "middle", 800)}
${card(14, 38, 452, 186, EDGE, "#fff")}
<path d="M${FX29(0)} 52 V192" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="5 4"/>
${t(FX29(0), 210, "0 (no effect)", 11, TERRA, "middle", 800)}
<path d="M${FX29(-1.0)} 52 V192" stroke="${GREEN}" stroke-width="2" stroke-dasharray="3 3"/>
${t(FX29(-1.0), 64, "−1.0 meaningful threshold", 10, GREEN, "end", 800)}
<path d="M90 192 H435" stroke="${INK}" stroke-width="1.5"/>
${[-4, -3, -2, -1, 0, 0.5].map(v => `<path d="M${FX29(v)} 192 v5" stroke="${INK}" stroke-width="1.5"/>${t(FX29(v), 208, v.toFixed(1), 10.5, MUTED)}`).join("")}
<g opacity=".45">
  ${t(84, 96, "Ref (n=4,724)", 11, MUTED, "end", 700)}
  <path d="M${FX29(-1.31)} 92 H${FX29(-1.16)}" stroke="${GREY}" stroke-width="3"/>
  <circle cx="${FX29(-1.23)}" cy="92" r="4.5" fill="${GREY}"/>
</g>
<g class="sim29">
  ${t(84, 144, "Your setting", 12, NAVY, "end", 800)}
  <path class="bar29" d="M${FX29(-1.31)} 140 H${FX29(-1.16)}" stroke="${NAVY}" stroke-width="5" stroke-linecap="round"/>
  <path class="capL29" d="M${FX29(-1.31)} 132 V148" stroke="${NAVY}" stroke-width="3"/>
  <path class="capR29" d="M${FX29(-1.16)} 132 V148" stroke="${NAVY}" stroke-width="3"/>
  <circle class="dot29" cx="${FX29(-1.23)}" cy="140" r="7" fill="${NAVY}" stroke="#fff" stroke-width="2"/>
  <text class="lbl29" x="${FX29(-1.23)}" y="124" font-size="13" fill="${NAVY}" text-anchor="middle" font-weight="800"></text>
</g>
${[["Point estimate", "est29", NAVY, 14], ["95% CI bounds", "ci29", GREEN, 168], ["Interval width", "wd29", TERRA, 322]].map(([lab, cls, c, x]) =>
  `${card(x, 238, 144, 104, c, "#fff")}${t(x + 72, 264, lab, 12, MUTED, "middle", 700)}<text class="${cls}" x="${x + 72}" y="302" font-size="17" fill="${c}" text-anchor="middle" font-weight="800"></text><text class="${cls}s" x="${x + 72}" y="324" font-size="11.5" fill="${MUTED}" text-anchor="middle" font-weight="700"></text>`
).join("")}`,
    render(r) { if (!r._ci29) SC.s29.update(r, 5200, "adj"); },
    update(r, n, mode) {
      r._ci29 = true;
      const est = mode === "unadj" ? -3.025 : -1.2325;
      const baseSE = mode === "unadj" ? 0.0536 : (mode === "col" ? 0.165 : 0.0383);
      const se = baseSE * Math.sqrt(5200 / n);
      const lo = est - 1.96 * se, hi = est + 1.96 * se, width = hi - lo;
      const xEst = FX29(est), xLo = FX29(Math.max(-4.5, lo)), xHi = FX29(Math.min(0.9, hi));
      const c = hi >= 0 ? TERRA : (mode === "unadj" ? GOLD : NAVY);
      r.querySelector(".bar29").setAttribute("d", `M${fx(xLo, 1)} 140 H${fx(xHi, 1)}`);
      r.querySelector(".bar29").setAttribute("stroke", c);
      r.querySelector(".capL29").setAttribute("d", `M${fx(xLo, 1)} 132 V148`);
      r.querySelector(".capL29").setAttribute("stroke", c);
      r.querySelector(".capR29").setAttribute("d", `M${fx(xHi, 1)} 132 V148`);
      r.querySelector(".capR29").setAttribute("stroke", c);
      r.querySelector(".dot29").setAttribute("cx", fx(xEst, 1));
      r.querySelector(".dot29").setAttribute("fill", c);
      r.querySelector(".lbl29").setAttribute("x", fx(xEst, 1));
      r.querySelector(".lbl29").setAttribute("fill", c);
      r.querySelector(".lbl29").textContent = `${fx(est)} [${fx(lo)} to ${fx(hi)}]`;
      r.querySelector(".est29").textContent = `${fx(est)} pts`;
      r.querySelector(".est29s").textContent = mode === "unadj" ? "unadjusted (1 pred.)" : "adjusted (6 pred.)";
      r.querySelector(".ci29").textContent = `${fx(lo)} to ${fx(hi)}`;
      r.querySelector(".ci29s").textContent = hi >= 0 ? "crosses zero!" : "entirely below zero";
      r.querySelector(".wd29").textContent = `${fx(width)} pts`;
      r.querySelector(".wd29s").textContent = `n = ${n.toLocaleString("en-US")}`;
      return { est, lo, hi, width, se };
    }
  };

  /* ------------------------------------------------------------ s08 · MAE by hand */
  const ER = [-2, 1, -3, 6];
  SC.s08 = {
    copy: [
      { k: "MAE", m: "Mean absolute error.", s: "The error a reader can act on.", l: "M A E" },
      { k: "Four example errors", m: "−2, 1, −3, 6.", s: "Example prediction errors (real − predicted).", l: "Four errors" },
      { k: "Drop the signs", m: "2 + 1 + 3 + 6 = 12. 12 ÷ 4 = 3.", s: "", l: "MAE = 3.0" },
      { k: "Compare", m: "MAE 3.0 · RMSE 3.54, same predictions.", s: "", l: "3.0 vs 3.54" },
      { k: "Usable", m: "On average: about 3 points out.", s: "A sentence a manager can use.", l: "3 points out" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M240 40 V220" stroke="${INK}" stroke-width="2"/>${t(240, 32, "0", 12, MUTED)}
${ER.map((e, i) => `<g class="er08" data-i="${i}"><rect class="eb08" x="${e < 0 ? 240 + e * 24 : 240}" y="${56 + i * 40}" width="${Math.abs(e) * 24}" height="26" rx="4" fill="${e < 0 ? NAVY : TERRA}" style="transition:transform .8s cubic-bezier(.3,.8,.25,1);transform-box:fill-box;transform-origin:${e < 0 ? "right" : "left"}"/>
  <text class="el08" x="${e < 0 ? 240 + e * 24 - 8 : 240 + e * 24 + 8}" y="${74 + i * 40}" font-size="15" fill="${INK}" text-anchor="${e < 0 ? "end" : "start"}" font-weight="800">${e > 0 ? "+" + e : "−" + Math.abs(e)}</text></g>`).join("")}
<g class="a o0 sm08">${card(70, 236, 340, 50, INK, INK)}${t(240, 268, "(2 + 1 + 3 + 6) ÷ 4 = 3.0", 19, GOLD, "middle", 800)}</g>
<g class="a o0 cp08">${card(70, 294, 160, 50, GREEN, "#EAF5EE")}${t(150, 314, "MAE", 12, MUTED)}${t(150, 334, "3.0 points", 17, GREEN, "middle", 800)}${card(250, 294, 160, 50, NAVY, SKY)}${t(330, 314, "RMSE", 12, MUTED)}${t(330, 334, "3.54 points", 17, NAVY, "middle", 800)}</g>
<g class="a o0 us08" style="transform:scale(.85)">${card(90, 236, 300, 108, GREEN, "#EAF5EE")}${fo(104, 246, 272, 92, "“On average, the model is about <b>3 points</b> out.”", 17, GREEN, 700, "text-align:center")}</g>`,
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
      { k: "Hidden misses", m: "A small MAE can hide rare, large misses.", s: "Of the two, only RMSE is pulled up.", l: "Rare big misses" },
      { k: "Report", m: "Both, in the outcome's units, beside its spread.", s: "R² alone says nothing about the size of errors.", l: "MAE · RMSE · SD" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${[["model A · even errors", [5, 5, 4, 6, 5, 5, 4, 6], 40, NAVY], ["model B · same MAE, rare big misses", [2, 2, 2, 2, 2, 2, 2, 26], 186, TERRA]].map(([n, E, y, c], k) => { const mae = E.reduce((a, v) => a + v, 0) / E.length, rm = Math.sqrt(E.reduce((a, v) => a + v * v, 0) / E.length);
  return `<g class="a o0 md10" data-k="${k}">${card(14, y, 452, 132, c)}${t(30, y + 26, n, 14, c, "start", 800)}
  ${E.map((v, i) => `<rect x="${34 + i * 30}" y="${y + 118 - v * 3.2}" width="22" height="${v * 3.2}" rx="3" fill="${c}" fill-opacity=".75"/>`).join("")}
  ${t(300, y + 64, "MAE " + fx(mae, 2), 18, GREEN, "start", 800)}<g class="a o0 rm10">${t(300, y + 96, "RMSE " + fx(rm, 2), 18, c, "start", 800)}</g></g>`; }).join("")}
<g class="a o0 rp10" style="transform:translateY(8px)">${card(40, 326 - 6, 400, 34, INK, INK)}${t(240, 342, "report: MAE · RMSE · the outcome's SD (16 points)", 13, GOLD, "middle", 800)}</g>`,
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
      { k: "The split", m: "The split happens once, before the loop.", s: "train_test_split(...)", l: "Split once" },
      { k: "Same rows", m: "Every model trained on the same rows, scored on the same rows.", s: "", l: "Same rows" },
      { k: "Otherwise", m: "Different splits cannot be compared fairly.", s: "And nothing in the output would tell you.", l: "Silent failure" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 sp11" style="transform:translateY(-10px)">${card(140, 20, 200, 60, INK, INK)}${t(240, 44, "split ONCE, before the loop", 15, GOLD, "middle", 800)}
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

  /* ------------------------------------------------------------ s30 · paired model comparison across repeated splits */
  const SUB30 = W.splitDev.slice(0, 16);
  const Y30 = v => 196 - (v - 5.6) * 82; // maps RMSE ~ 5.8..7.4 into y=64..180
  SC.s30 = {
    copy: [
      { k: "Intuition", m: "Two runners on different tracks cannot be compared.", s: "Headwinds on Monday versus tailwinds on Tuesday distort the clock.", l: "Different tracks" },
      { k: "Side by side", m: "Race on the exact same track fifty times.", s: "Windy days slow both runners together; calm days speed both up.", l: "Same track" },
      { k: "Split bounce", m: "Regression RMSE spans 0.46 points across 50 splits.", s: "Standard deviation across splits: 0.12 points on cleaned Al Waha data.", l: "0.46 split range" },
      { k: "Why it bounces", m: "Some test splits draw harder-to-predict episodes.", s: "Random sampling puts more unusual hospital visits into some test sets.", l: "Hard vs easy splits" },
      { k: "Co-movement", m: "On the same split, both models rise and fall together.", s: "Hard test rows pull both regression and network RMSE up in tandem.", l: "Rise and fall together" },
      { k: "Paired difference", m: "Subtract network RMSE from regression RMSE on each split.", s: "Split luck cancels out of the vertical gap between the two models.", l: "Paired difference" },
      { k: "Across 50 splits", m: "Mean paired gain: 0.915 RMSE points (SD = 0.095) across all 50 splits.", s: "Paired RMSE gain (regression minus network): 0.915 ± 0.095 points.", l: "0.915 ± 0.095 pts" },
      { k: "The standard", m: "Report the paired difference and its uncertainty.", s: "Proves the gain is real and not a lucky draw of test episodes.", l: "Paired uncertainty" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "paired held-out RMSE across repeated random splits (first 16 of 50 shown)", 12, MUTED, "middle", 800)}
${card(14, 34, 452, 186, EDGE, "#fff")}
${[6.0, 6.5, 7.0, 7.5].map(v => `<path d="M52 ${Y30(v)} H450" stroke="${SKY}" stroke-width="1"/>${t(46, Y30(v) + 4, v.toFixed(1), 10.5, MUTED, "end", 700)}`).join("")}
${SUB30.map((d, i) => {
  const x = 68 + i * 24.5, reg = 7.071 + d, net = 6.124 + d * 0.88;
  return `<g class="sp30" data-i="${i}">
    <path class=" a o0 bar30" d="M${x} ${Y30(reg)} V${Y30(net)}" stroke="${GOLD}" stroke-width="3"/>
    <circle class="a reg30" cx="${x}" cy="${Y30(reg)}" r="4.5" fill="${NAVY}"/>
    <circle class="a o0 net30" cx="${x}" cy="${Y30(net)}" r="4.5" fill="${TERRA}"/>
  </g>`;
}).join("")}
${t(130, 50, "● 6-predictor regression (~7.07)", 11, NAVY, "start", 800)}
${t(320, 50, "● neural network (~6.12)", 11, TERRA, "start", 800)}
${t(250, 212, "random 75/25 splits of the 5,200 Al Waha episodes →", 11, MUTED, "middle", 700)}
<g class="a o0 cd30a">${card(14, 230, 218, 114, NAVY, SKY)}
  ${t(123, 254, "Unpaired single-model bounce", 12.5, NAVY, "middle", 800)}
  ${t(123, 282, "Range: 0.46 RMSE pts", 16, NAVY, "middle", 800)}
  ${fo(26, 294, 194, 44, "Across 50 splits (SD = 0.12), test-set difficulty moves one model's score by nearly half a point.", 11, INK, 600, "text-align:center")}
</g>
<g class="a o0 cd30b">${card(248, 230, 218, 114, GREEN, "#EAF5EE")}
  ${t(357, 254, "Paired difference (Reg − Net)", 12.5, GREEN, "middle", 800)}
  ${t(357, 282, "Mean: +0.915 pts (SD 0.095)", 14.5, GREEN, "middle", 800)}
  ${fo(260, 294, 194, 44, "Hard splits lift both models together, so test-set luck cancels out of the paired gap (SD 0.095).", 11, INK, 600, "text-align:center")}
</g>`,
    render(r, b) {
      H.show(r, ".net30", b >= 4 || b <= 1);
      H.show(r, ".bar30", b >= 5);
      H.show(r, ".cd30a", b >= 2);
      H.show(r, ".cd30b", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s31 · k-fold cross-validation */
  SC.s31 = {
    copy: [
      { k: "Single-split limit", m: "One 75/25 split tests only a quarter of the data.", s: "Three quarters of the 5,200 Al Waha episodes never get tested.", l: "Only 25% tested" },
      { k: "The goal", m: "Can every episode take a turn in the test set?", s: "Without ever testing a model on rows it trained on.", l: "Test every row" },
      { k: "Five folds", m: "Slice the 5,200 episodes into five equal folds.", s: "About 1,040 randomly assigned episodes in each fold.", l: "5 equal folds" },
      { k: "Round 1", m: "Hold out Fold 1 for testing; train on Folds 2 to 5.", s: "Score both the regression and the network on Fold 1.", l: "Round 1: Fold 1" },
      { k: "Rounds 2 to 5", m: "Rotate the test fold until every fold is scored once.", s: "Five paired held-out evaluations covering all 5,200 episodes.", l: "Rotate across folds" },
      { k: "k-fold summary", m: "10-fold CV MAE: Regression 5.67 ± 0.20 vs Network 4.93 ± 0.21.", s: "Exact 10-fold CV MAE (mean ± SD): 5.666 ± 0.203 (regression) vs 4.929 ± 0.214 (network).", l: "5.67 vs 4.93 MAE" },
      { k: "No leakage rule", m: "Scale and impute INSIDE each training fold.", s: "Every step that learns from data must fit on training folds only.", l: "Inside the fold" },
      { k: "Why it matters", m: "Scaling before splitting leaks test information.", s: "Keep the held-out fold completely unseen until prediction time.", l: "Zero leakage" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "5-fold cross-validation across the 5,200 cleaned Al Waha episodes", 12.5, MUTED, "middle", 800)}
<g class="top31">
  ${[0, 1, 2, 3, 4].map(j => `<rect x="${74 + j * 64}" y="34" width="60" height="24" rx="5" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/>${t(104 + j * 64, 50, "Fold " + (j + 1), 11, NAVY, "middle", 800)}`).join("")}
</g>
${[0, 1, 2, 3, 4].map(rIdx => {
  const y = 70 + rIdx * 34;
  return `<g class="a o0 rd31" data-r="${rIdx}">
    ${t(64, y + 17, "Round " + (rIdx + 1), 11.5, INK, "end", 800)}
    ${[0, 1, 2, 3, 4].map(fIdx => {
      const isTest = rIdx === fIdx;
      return `<rect x="${74 + fIdx * 64}" y="${y}" width="60" height="26" rx="5" fill="${isTest ? TERRA : NAVY}" fill-opacity="${isTest ? 1 : .78}"/>
      ${t(104 + fIdx * 64, y + 17, isTest ? "TEST" : "train", 10.5, "#fff", "middle", 800)}`;
    }).join("")}
    ${card(398, y, 68, 26, TERRA, "#FCEFE9")}${t(432, y + 17, "Score " + (rIdx + 1), 10.5, TERRA, "middle", 800)}
  </g>`;
}).join("")}
<g class="a o0 avg31">${card(14, 246, 452, 42, GREEN, "#EAF5EE")}${t(240, 272, "10-Fold CV MAE: Regression 5.67 ± 0.20 pts  ·  Network 4.93 ± 0.21 pts", 13, GREEN, "middle", 800)}</g>
<g class="a o0 lk31">${card(14, 294, 452, 54, TERRA, "#FCEFE9")}${fo(26, 300, 428, 44, "<b>Pipeline rule:</b> Standardize predictors and impute missing values <b>inside each training split</b>. Scaling all 5,200 rows before cross-validation leaks test-fold statistics.", 12, TERRA, 700, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".rd31").forEach(g => {
        const idx = +g.dataset.r;
        const on = (b === 3 && idx === 0) || (b >= 4) || (b <= 1 && idx === 0);
        g.style.opacity = on ? 1 : (b === 2 ? 0.25 : 0.12);
      });
      H.show(r, ".avg31", b >= 5);
      H.show(r, ".lk31", b >= 6);
    }
  };

  /* ------------------------------------------------------------ s32 · try it: single split vs paired cross-validation */
  SC.s32 = {
    copy: [
      { k: "Your turn", m: "Compare unpaired splits, paired splits, and cross-validation.", s: "Use the buttons and split slider below the stage.", l: "Compare designs" },
      { k: "Your turn", m: "Scrub across the 50 real Al Waha random splits.", s: "See how unpaired splits distort the gap between models.", l: "Scrub 50 splits" },
      { k: "Your turn", m: "Notice how paired CV stabilizes the model comparison.", s: "Then press Continue.", l: "Paired CV" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "model comparison design · 6-predictor regression vs neural network", 12.5, MUTED, "middle", 800)}
${card(14, 36, 452, 92, EDGE, "#fff")}
<text class="mdTitle32" x="240" y="58" font-size="14" fill="${NAVY}" text-anchor="middle" font-weight="800"></text>
<g class="rows32">
  ${t(110, 84, "Regression test rows:", 11.5, INK, "end", 700)}
  <rect class="rBarA32" x="120" y="71" width="160" height="18" rx="4" fill="${NAVY}"/>
  <text class="rTxtA32" x="290" y="84" font-size="11.5" fill="${NAVY}" font-weight="800"></text>
  ${t(110, 110, "Network test rows:", 11.5, INK, "end", 700)}
  <rect class="rBarB32" x="120" y="97" width="160" height="18" rx="4" fill="${TERRA}"/>
  <text class="rTxtB32" x="290" y="110" font-size="11.5" fill="${TERRA}" font-weight="800"></text>
</g>
${[["6-Predictor Regression", "reg32", NAVY, 14], ["Neural Network", "net32", TERRA, 170], ["Apparent RMSE Gain", "dif32", GREEN, 326]].map(([title, cls, c, x]) =>
  `${card(x, 140, 140, 110, c, "#fff")}${t(x + 70, 166, title, 11.5, MUTED, "middle", 800)}<text class="${cls}" x="${x + 70}" y="204" font-size="22" fill="${c}" text-anchor="middle" font-weight="800"></text><text class="${cls}s" x="${x + 70}" y="230" font-size="11" fill="${MUTED}" text-anchor="middle" font-weight="700"></text>`
).join("")}
<g class="bot32">${card(14, 262, 452, 84, INK, INK)}<foreignObject x="28" y="272" width="424" height="68"><div xmlns="http://www.w3.org/1999/xhtml" class="note32" style="font:600 12.5px Calibri,Segoe UI,sans-serif;color:#fff;line-height:1.35;text-align:center"></div></foreignObject></g>`,
    render(r) { if (!r._cv32) SC.s32.update(r, "paired", 1); },
    update(r, mode, k) {
      r._cv32 = true;
      const idxA = (k - 1) % 50;
      const idxB = (k + 6) % 50; // different split when unpaired
      const devA = W.splitDev[idxA], devB = W.splitDev[idxB];
      let reg, net, gain, title, txtA, txtB, barBX, subG, note;
      if (mode === "unpaired") {
        reg = 7.071 + devA;
        net = 6.124 + devB;
        gain = reg - net;
        title = "✗ Unpaired Single Splits (Different Test Rows)";
        txtA = `Split #${idxA + 1} (${devA >= 0 ? "+" : ""}${fx(devA)} luck)`;
        txtB = `Split #${idxB + 1} (${devB >= 0 ? "+" : ""}${fx(devB)} luck)`;
        barBX = 175;
        subG = "distorted by split luck!";
        note = `<b style="color:#E8B04B">Flawed comparison:</b> Regression was scored on Split #${idxA + 1} while the Network was scored on Split #${idxB + 1}. Because the two test sets have different difficulty, the apparent gain swings from <b>0.51 to 1.39 points</b> purely by luck.`;
      } else if (mode === "paired") {
        reg = 7.071 + devA;
        net = 6.124 + devA * 0.9;
        gain = reg - net;
        title = "✓ Paired Single Split (Identical Test Rows)";
        txtA = `Split #${idxA + 1} (1,300 rows)`;
        txtB = `Split #${idxA + 1} (same 1,300 rows)`;
        barBX = 120;
        subG = "same test rows";
        note = `<b style="color:#6CCB92">Fair comparison on Split #${idxA + 1}:</b> Both models are evaluated on the exact same 1,300 held-out episodes. When Split #${idxA + 1} is harder or easier (${devA >= 0 ? "+" : ""}${fx(devA)} pts), both models shift together.`;
      } else {
        reg = 7.071;
        net = 6.124;
        gain = 0.947;
        title = "★ Paired 10-Fold Cross-Validation (All 5,200 Rows)";
        txtA = "All 10 folds (5,200 rows)";
        txtB = "Same 10 folds (5,200 rows)";
        barBX = 120;
        subG = "Mean Δ ± fold SD";
        note = `<b style="color:#E8B04B">Gold standard:</b> Every Al Waha episode serves in the test fold once, and both models are compared on identical folds. You report the mean paired gain (0.95 RMSE / 0.72 MAE) plus its fold-to-fold spread.`;
      }
      r.querySelector(".mdTitle32").textContent = title;
      r.querySelector(".mdTitle32").setAttribute("fill", mode === "unpaired" ? TERRA : GREEN);
      r.querySelector(".rBarB32").setAttribute("x", barBX);
      r.querySelector(".rTxtA32").textContent = txtA;
      r.querySelector(".rTxtB32").textContent = txtB;
      r.querySelector(".reg32").textContent = fx(reg) + " pts";
      r.querySelector(".reg32s").textContent = mode === "cv" ? "10-fold mean RMSE" : `Split #${idxA + 1} RMSE`;
      r.querySelector(".net32").textContent = fx(net) + " pts";
      r.querySelector(".net32s").textContent = mode === "cv" ? "10-fold mean RMSE" : `Split #${mode === "unpaired" ? idxB + 1 : idxA + 1} RMSE`;
      r.querySelector(".dif32").textContent = (gain >= 0 ? "+" : "") + fx(gain) + " pts";
      r.querySelector(".dif32").setAttribute("fill", mode === "unpaired" ? TERRA : GREEN);
      r.querySelector(".dif32s").textContent = subG;
      r.querySelector(".note32").innerHTML = note;
      return { reg, net, gain };
    }
  };
})();
