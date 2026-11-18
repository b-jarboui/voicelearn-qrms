/* Week 15 · Chapter 5 animated scenes, part B (s12–s22). Uses window.SCH from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, W = window.W15;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);

  /* ------------------------------------------------------------ s12 · split luck (real) */
  const DV = W.splitDev, DX = v => 240 + v * 300;
  // stack dots into a little dot plot by rounding to 0.03
  const bins = {}; const DOTS = DV.map(v => { const k = Math.round(v / 0.03); bins[k] = (bins[k] || 0) + 1; return [DX(k * 0.03), 246 - (bins[k] - 1) * 13]; });
  SC.s12 = {
    copy: [
      { k: "A test", m: "How much can the split alone move a score?", s: "", l: "Split luck" },
      { k: "The set-up", m: "Same regression, same data, 50 random splits.", s: "Al Waha episodes (cleaned) · six predictors.", l: "50 splits" },
      { k: "The result", m: `Best to worst split: ${fx(W.splitRange)} points of RMSE.`, s: `Only the test rows changed. SD across splits: ${fx(W.splitSD)}.`, l: `${fx(W.splitRange)} points` },
      { k: "Compare", m: `The network's RMSE gain (slides): ${W.slide.netGainRMSE}.`, s: "The split alone can move a score by about half of it.", l: "About half" },
      { k: "So", m: "Same rows for every model; ideally repeated splits.", s: "Report how much the difference varies.", l: "Same rows" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 30, "held-out RMSE of the same model on each split, vs the average split", 12.5, MUTED, "middle", 800)}
<path d="M30 260 H450" stroke="${INK}" stroke-width="2"/>
${[-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3].map(v => `<path d="M${DX(v)} 260 v6" stroke="${INK}" stroke-width="2"/>${t(DX(v), 282, (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(1), 12, MUTED)}`).join("")}
${t(240, 302, "points better ← average split → points worse", 12.5, INK, "middle", 800)}
${DOTS.map(([x, y], i) => `<g class="a o0 dt12" style="transition-delay:${(i * .025).toFixed(3)}s;transform:translateY(-40px)"><circle cx="${x}" cy="${y}" r="5" fill="${NAVY}" stroke="#fff" stroke-width="1"/></g>`).join("")}
<g class="a o0 rg12"><path d="M${DX(Math.min(...DV))} 92 V250 M${DX(Math.max(...DV))} 92 V250" stroke="${TERRA}" stroke-width="2" stroke-dasharray="5 4"/><path d="M${DX(Math.min(...DV))} 96 H${DX(Math.max(...DV))}" stroke="${TERRA}" stroke-width="3"/>${t(240, 88, fx(W.splitRange) + " points from luckiest to unluckiest split", 13, TERRA, "middle", 800)}</g>
<g class="a o0 gn12"><rect x="${DX(-0.475)}" y="56" width="${0.95 * 300}" height="16" rx="8" fill="${GREEN}" fill-opacity=".85"/>${t(240, 50, "the network's RMSE gain over the regression (slides): 0.95", 12.5, GREEN, "middle", 800)}</g>
<g class="a o0 so12" style="transform:scale(.9)">${card(80, 312, 320, 40, INK, INK)}${t(240, 338, "same rows · repeated splits · report the spread", 14, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".dt12").forEach(g => { g.style.opacity = b >= 1 ? 1 : 0; g.style.transform = b >= 1 ? "none" : "translateY(-40px)"; });
      H.show(r, ".rg12", b >= 2); H.show(r, ".gn12", b >= 3); H.show(r, ".so12", b >= 4); H.tf(r, ".so12", b >= 4 ? "none" : "scale(.9)");
    }
  };

  /* ------------------------------------------------------------ s13 · try it: a table that looks fine */
  const CODE = [[18, "for name, model in models.items():"], [19, "    X_tr, X_te, y_tr, y_te = train_test_split("], [20, "        X, y, test_size=0.25)"], [21, "    model.fit(X_tr, y_tr)"], [22, "    scores[name] = mae(y_te, model.predict(X_te))"]];
  SC.s13 = {
    copy: [
      { k: "Your turn", m: "This script runs. The table looks fine.", s: "No error. No warning.", l: "Looks fine" },
      { k: "Your turn", m: "Find the problem. Choose the fix.", s: "Then press Continue.", l: "Find and fix" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="16" width="452" height="180" rx="12" fill="${INK}"/>
${CODE.map(([n, s], i) => `<g class="cl13" data-n="${n}"><rect class="hl13" x="20" y="${30 + i * 30}" width="440" height="26" rx="5" fill="${GOLD}" fill-opacity="0" style="transition:fill-opacity .4s"/>${t(44, 48 + i * 30, n, 13, GREY, "end", 700)}<text class="cx13" x="56" y="${48 + i * 30}" font-size="13" fill="#E8EDF3" font-family="Consolas,monospace" xml:space="preserve">${s}</text></g>`).join("")}
<g class="tb13">${card(14, 206, 452, 96, EDGE)}${t(30, 230, "output (illustrative)", 12, MUTED, "start", 800)}
  ${[["1 predictor", "MAE 10.3"], ["6 predictors", "MAE 5.5"], ["network", "MAE 5.0"]].map(([a, v], i) => `${t(40 + i * 146, 262, a, 14, INK, "start", 800)}${t(40 + i * 146, 284, v, 15, [NAVY, GREEN, TERRA][i], "start", 800)}`).join("")}</g>
<g class="a o0 w13">${t(450, 230, "each on its own random split!", 12.5, TERRA, "end", 800)}</g>
<g class="a o0 ok13">${card(14, 310, 452, 40, GREEN, "#EAF5EE")}${t(240, 336, "✓ split once, before the loop, with a fixed random_state", 14, GREEN, "middle", 800)}</g>`,
    render() {},
    pick(r, n) { H.q(r, ".cl13").forEach(g => { const k = +g.dataset.n; g.querySelector(".hl13").style.fillOpacity = (n === 19 && (k === 19 || k === 20)) ? .35 : k === n ? .18 : 0; }); H.show(r, ".w13", n === 19); },
    fix(r, ok) { H.show(r, ".ok13", ok); }
  };

  /* ------------------------------------------------------------ s14 · report the search */
  SC.s14 = {
    copy: [
      { k: "One more assumption", m: "The result was not picked out of many.", s: "", l: "Picked?" },
      { k: "This term", m: "Dozens of models, variables, settings, subgroups.", s: "", l: "Dozens of analyses" },
      { k: "The trap", m: "The best of forty, reported as if it were the only one.", s: "Its effect looks larger, its p value smaller.", l: "Best of 40" },
      { k: "So", m: "Report the search. Label exploratory findings.", s: "Confirm them on data you have not used.", l: "Report the search" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${Array.from({ length: 40 }, (_, i) => { const x = 40 + (i % 10) * 44, y = 50 + Math.floor(i / 10) * 52, best = i === 27;
  return `<g class="a o0 an14" data-i="${i}" style="transition-delay:${(i * .02).toFixed(2)}s"><rect x="${x - 17}" y="${y - 17}" width="34" height="34" rx="7" fill="${best ? GOLD : "#fff"}" stroke="${best ? TERRA : EDGE}" stroke-width="${best ? 3 : 1.5}"/>${t(x, y + 5, i + 1, 12, best ? INK : MUTED, "middle", 800)}</g>`; }).join("")}
<g class="a o0 tr14" style="transform:scale(.9)">${card(60, 244, 360, 92, TERRA, "#FCEFE9")}${fo(76, 252, 330, 80, "“We found that …” <span style='color:#5A6373'>(analysis 28 of 40, not mentioned)</span>", 16, TERRA, 700, "text-align:center")}</g>
<g class="a o0 ok14" style="transform:scale(.9)">${card(60, 244, 360, 92, GREEN, "#EAF5EE")}${fo(76, 252, 330, 80, "“In an exploratory analysis (one of 40 fitted), we found …”", 16, GREEN, 700, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".an14").forEach(g => { const i = +g.dataset.i; g.style.opacity = b === 0 ? (i === 27 ? 1 : 0) : b >= 2 && i !== 27 ? (b === 2 ? .15 : 1) : 1; });
      H.show(r, ".tr14", b === 2); H.tf(r, ".tr14", b === 2 ? "none" : "scale(.9)");
      H.show(r, ".ok14", b >= 3); H.tf(r, ".ok14", b >= 3 ? "none" : "scale(.9)");
    }
  };

  /* ------------------------------------------------------------ s15 · four questions */
  const FQ = [["Explanatory or predictive?", "Answer first. Everything follows."], ["Same held-out rows?", "If not, there is no comparison."], ["Is the simplest adequate model much worse?", "About 0.7 MAE points, on an SD of 16."], ["Explanatory? Say what each input does.", "If not, not as an explanation."]];
  SC.s15 = {
    copy: [
      { k: "Which to defend?", m: "Four questions, in this order.", s: "", l: "Four questions" },
      { k: "Question 1", m: "Explanatory or predictive?", s: "Answer this first. Everything follows.", l: "Why or what?" },
      { k: "Question 2", m: "Same held-out rows for every model?", s: "If not, you do not have a comparison.", l: "Same rows" },
      { k: "Question 3", m: "Is the simpler model materially worse?", s: `Network vs regression: about ${W.slide.maeGain} MAE points, on an SD of 16.`, l: `${W.slide.maeGain} on 16` },
      { k: "Question 4", m: "Explanatory question? Say what each input does.", s: "If not, you cannot defend it as an explanation.", l: "Explain it" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${FQ.map(([a, s], i) => `<g class="fq15" data-i="${i}">${card(30, 24 + i * 80, 420, 68, EDGE)}<circle cx="64" cy="${58 + i * 80}" r="18" fill="${[NAVY, GREEN, GOLD, TERRA][i]}"/>${t(64, 64 + i * 80, i + 1, 16, "#fff")}${t(96, 52 + i * 80, a, 15.5, INK, "start", 800)}${t(96, 76 + i * 80, s, 13, MUTED, "start", 700)}</g>`).join("")}
<g class="a o0 sc15"><rect x="300" y="${24 + 2 * 80 + 50}" width="${W.slide.maeGain / 16 * 140}" height="10" fill="${TERRA}"/><rect x="300" y="${24 + 2 * 80 + 50}" width="140" height="10" fill="none" stroke="${GREY}"/></g>`,
    render(r, b) { H.q(r, ".fq15").forEach(g => { const i = +g.dataset.i, on = b >= i + 1; g.style.opacity = b === 0 || on ? 1 : .3; g.querySelector("rect").style.stroke = b === i + 1 ? TERRA : ""; g.querySelector("rect").style.strokeWidth = b === i + 1 ? "3" : ""; }); H.show(r, ".sc15", false); }
  };

  /* ------------------------------------------------------------ s16 · try it: the result you would defend */
  SC.s16 = {
    copy: [
      { k: "Your turn", m: "What kind of question? Which model?", s: "", l: "Choose" },
      { k: "Your turn", m: "Give three reasons that are not its score.", s: "Then press Continue.", l: "Three reasons" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 30, "the model you would defend", 14, MUTED, "middle", 800)}
${[["1 predictor", "MAE ≈ 10 · one slope", NAVY], ["6 predictors", "MAE ≈ 5.6 · six readable slopes", GREEN], ["network", "MAE ≈ 4.9 · no slopes", TERRA]].map(([n, s, c], i) => `<g class="md16" data-i="${i}">${card(20 + i * 152, 50, 136, 120, EDGE)}${t(88 + i * 152, 92, n, 16, c, "middle", 800)}${fo(30 + i * 152, 104, 116, 60, s, 12.5, MUTED, 700, "text-align:center")}</g>`).join("")}
<g class="rs16">${card(20, 186, 440, 160, EDGE)}<foreignObject x="34" y="196" width="412" height="144"><div xmlns="http://www.w3.org/1999/xhtml" class="rsx16" style="font:600 14px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.35">Choose the kind of research question first.</div></foreignObject></g>`,
    render() {},
    pick(r, q, m, html) { H.q(r, ".md16").forEach(g => { const on = +g.dataset.i === m, rc = g.querySelector("rect"); rc.style.stroke = on ? (html && html.ok ? GREEN : TERRA) : ""; rc.style.strokeWidth = on ? "4" : ""; });
      if (html) r.querySelector(".rsx16").innerHTML = html.text; }
  };

  /* ------------------------------------------------------------ s17 · the structure of the chapter */
  const CH = [["Question and design", "construct · proxy · why this design", "Weeks 1–2"], ["Data and screening", "every decision, its size, who was lost", "Weeks 3–4"], ["Method and assumptions", "the table, checked, and what you did", "Weeks 5–10"], ["Results", "estimate · interval · effect size · exact p · tests run", "Weeks 6–14"], ["Limitations", "what it cannot support · what would overturn it", "Week 15"]];
  SC.s17 = {
    copy: [
      { k: "Your chapter", m: "Five sections, in this order.", s: "", l: "Five sections" },
      { k: "1", m: "Question and design.", s: "Don't name the construct and report only the proxy.", l: "Question" },
      { k: "2", m: "Data and screening.", s: "Never just “the data were cleaned”.", l: "Data" },
      { k: "3", m: "Method and assumptions.", s: "Checked, with what you did on failure.", l: "Method" },
      { k: "4", m: "Results.", s: "Significance never without a size beside it.", l: "Results" },
      { k: "5", m: "Limitations.", s: "What it cannot support, and what would overturn it.", l: "Limitations" },
      { k: "Not a coincidence", m: "Every section draws on weeks of this course.", s: "The course was ordered to build this chapter.", l: "The course = the chapter" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="30" y="16" width="420" height="328" rx="6" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(240, 42, "Your thesis · the analysis chapter", 15, NAVY, "middle", 800)}
${CH.map(([a, s, w], i) => `<g class="a o0 ch17" data-i="${i}" style="transform:translateX(-12px)"><rect x="46" y="${56 + i * 56}" width="388" height="48" rx="8" fill="${SKY}" fill-opacity=".55"/>${t(60, 76 + i * 56, (i + 1) + ". " + a, 15, INK, "start", 800)}${t(60, 95 + i * 56, s, 12, MUTED, "start", 700)}
  <g class="a o0 wk17"><rect x="${352}" y="${64 + i * 56}" width="74" height="22" rx="11" fill="${GOLD}"/>${t(389, 79 + i * 56, w, 11.5, INK, "middle", 800)}</g></g>`).join("")}`,
    render(r, b) { H.q(r, ".ch17").forEach(g => { const i = +g.dataset.i, on = b >= i + 1; g.style.opacity = on ? 1 : (b === 0 ? .25 : 0); g.style.transform = on ? "none" : "translateX(-12px)"; g.querySelector(".wk17").style.opacity = 0; g.querySelector(".wk17").style.transitionDelay = (i * .2) + "s"; }); }
  };

  /* ------------------------------------------------------------ s18 · five sentences */
  const SN = ["85% accuracy", "a significant relationship", "the data were cleaned and analysed", "performed best, therefore selected", "further research is needed"];
  SC.s18 = {
    copy: [
      { k: "Your turn", m: "May you write it, or not?", s: "Five sentences examiners see every year.", l: "Decide" },
      { k: "1", m: "“85% accuracy.”", s: "On what data, against what base rate?", l: "No" },
      { k: "2", m: "“A significant relationship.”", s: "How large, in what units, out of how many tests?", l: "No" },
      { k: "3", m: "“The data were cleaned and analysed.”", s: "Which decisions, and how many rows each?", l: "No" },
      { k: "4", m: "“Performed best and was selected.”", s: "Best at what, and at what cost?", l: "No" },
      { k: "5", m: "“Further research is needed.”", s: "On what, and what would it settle?", l: "No" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${SN.map((s, i) => `<g class="sn18" data-i="${i}">${card(30, 20 + i * 66, 420, 54, EDGE)}${t(50, 53 + i * 66, "“… " + s + " …”", 15, INK, "start", 800)}
  <g class="a o0 x18" style="transform:scale(1.6)"><g transform="rotate(-8 404 ${47 + i * 66})"><rect x="370" y="${33 + i * 66}" width="68" height="28" rx="6" fill="#fff" stroke="${TERRA}" stroke-width="3"/>${t(404, 53 + i * 66, "NO", 14, TERRA, "middle", 800)}</g></g></g>`).join("")}`,
    render(r, b) { H.q(r, ".sn18").forEach(g => { const i = +g.dataset.i, on = b >= i + 1, x = g.querySelector(".x18"); x.style.opacity = on ? 1 : 0; x.style.transform = on ? "none" : "scale(1.6)"; g.querySelector("rect").style.stroke = b === i + 1 ? TERRA : ""; }); }
  };

  /* ------------------------------------------------------------ s19 · two prompts */
  SC.s19 = {
    copy: [
      { k: "Fifteen weeks", m: "Two prompts, one last time.", s: "", l: "Two prompts" },
      { k: "Verification", m: "Which assumptions does it need, and does my output show I checked each?", s: "", l: "Verification" },
      { k: "Adversarial", m: "What is the strongest reason not to trust this result?", s: "", l: "Adversarial" },
      { k: "Before your supervisor", m: "“This conclusion would not survive if …”", s: "Often the strongest paragraph in the chapter.", l: "Would not survive if" },
      { k: "The rule", m: "Whatever the helper says, you write the response.", s: "Since Week 1.", l: "You write it" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 v19" style="transform:translateY(10px)">${card(20, 24, 440, 74, NAVY, SKY)}${t(36, 48, "VERIFICATION", 12, NAVY, "start", 800)}${fo(36, 54, 410, 40, "“Which assumptions does this method require, and does my output show I checked each one?”", 14, INK, 700)}</g>
<g class="a o0 a19" style="transform:translateY(10px)">${card(20, 110, 440, 74, TERRA, "#FCEFE9")}${t(36, 134, "ADVERSARIAL", 12, TERRA, "start", 800)}${fo(36, 140, 410, 40, "“What is the strongest reason this result should not be trusted?”", 14, INK, 700)}</g>
<g class="a o0 s19" style="transform:scale(.9)">${card(20, 196, 440, 70, INK, INK)}${fo(36, 208, 410, 50, "This conclusion would not survive if <span style='border-bottom:2px dashed #E8B04B'>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</span>.", 17, GOLD, 700)}</g>
<g class="a o0 y19">${person(60, 346, NAVY, 1.4)}${card(100, 282, 360, 56, GREEN, "#EAF5EE")}${fo(114, 290, 336, 44, "Whatever the helper says, <b>you</b> write the response.", 15, GREEN, 700)}</g>`,
    render(r, b) { [[".v19", 1], [".a19", 2], [".s19", 3], [".y19", 4]].forEach(([s, k]) => { H.show(r, s, b >= k); H.tf(r, s, b >= k ? "none" : (s === ".s19" ? "scale(.9)" : "translateY(10px)")); }); }
  };

  /* ------------------------------------------------------------ s20 · you decide, for the last time */
  const LEFT = ["the research question", "variables and method", "write and run the core code", "look at the diagnostics", "whether assumptions hold", "interpret the result", "check every claim"];
  const RIGHT = ["explain an error message", "explain a function", "improve a plot you chose", "comment your own code", "suggest a small test", "extend working code, as told"];
  SC.s20 = {
    copy: [
      { k: "The last time", m: "You decide; ChatGPT assists.", s: "", l: "The table" },
      { k: "You do this", m: "Question, method, code, diagnostics, assumptions, interpretation, checking.", s: "", l: "Your side" },
      { k: "The helper may", m: "Explain, suggest, extend when told exactly how.", s: "", l: "Helper's side" },
      { k: "Fifteen weeks", m: "Every row on the left stayed on the left.", s: "That was the point.", l: "That was the point" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 lf20">${card(14, 18, 222, 324, NAVY)}${t(125, 44, "you do this", 15, NAVY, "middle", 800)}${LEFT.map((s, i) => `<circle cx="34" cy="${74 + i * 38}" r="6" fill="${NAVY}"/>${t(48, 79 + i * 38, s, 13, INK, "start", 700)}`).join("")}</g>
<g class="a o0 rt20">${card(244, 18, 222, 324, GREEN)}${t(355, 44, "the helper may", 15, GREEN, "middle", 800)}${RIGHT.map((s, i) => `<circle cx="264" cy="${74 + i * 38}" r="6" fill="${GREEN}"/>${t(278, 79 + i * 38, s, 13, INK, "start", 700)}`).join("")}</g>
<g class="a o0 st20" style="transform:scale(1.4)"><g transform="rotate(-6 355 180)"><rect x="270" y="161" width="170" height="38" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(355, 186, "STAYED LEFT", 17, TERRA, "middle", 800)}</g></g>`,
    render(r, b) { H.show(r, ".lf20", b >= 1 || b === 0); H.set(r, ".lf20", "opacity", b === 0 ? ".4" : "1"); H.show(r, ".rt20", b >= 2); H.set(r, ".rt20", "opacity", b === 2 ? "1" : b === 3 ? ".35" : "0"); H.show(r, ".st20", b >= 3); H.tf(r, ".st20", b >= 3 ? "none" : "scale(1.4)"); }
  };

  /* ------------------------------------------------------------ s21 · quiz */
  SC.s21 = {
    copy: [{ k: "Quiz", m: "Eight questions.", s: "Read the explanation after each answer.", l: "Quiz" }],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="bob">${card(140, 70, 200, 200, NAVY)}${t(240, 160, "8", 72, NAVY, "middle", 800)}${t(240, 200, "questions", 18, MUTED)}</g>
${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${156 + i * 24}" cy="250" r="7" fill="${[NAVY, TERRA, GOLD, GREEN][i % 4]}"/>`).join("")}`,
    render() {}
  };

  /* ------------------------------------------------------------ s22 · takeaways */
  const TK = [["State the question first", "then compare any two results", NAVY], ["Agreement needs a rival", "only if the methods could disagree", GREEN], ["Same rows · MAE and RMSE", "in the outcome's own units", GOLD], ["Report the search", "and what would overturn it", TERRA], ["You decide", "now write your own analysis plan", INK]];
  SC.s22 = {
    copy: [
      { k: "Five ideas", m: "From this chapter, and the course.", s: "", l: "Takeaways" },
      { k: "1", m: "State the question before comparing results.", s: "", l: "Question first" },
      { k: "2", m: "Agreement is evidence only if methods could disagree.", s: "", l: "Could disagree" },
      { k: "3", m: "Same held-out rows. MAE and RMSE, in real units.", s: "", l: "Same rows" },
      { k: "4", m: "Report the search, and what would overturn it.", s: "", l: "Search" },
      { k: "5", m: "You decide; the helper assists.", s: "Now write the analysis plan for your own research. Good luck.", l: "Good luck" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${TK.map(([a, s, c], i) => `<g class="a o0 tk22" data-i="${i}" style="transform:translateX(-16px)">${card(30, 22 + i * 66, 420, 56, c)}<circle cx="62" cy="${50 + i * 66}" r="16" fill="${c}"/>${t(62, 56 + i * 66, i + 1, 15, "#fff")}${t(92, 46 + i * 66, a, 16, INK, "start", 800)}${t(92, 66 + i * 66, s, 13, MUTED, "start", 700)}</g>`).join("")}`,
    render(r, b) { H.q(r, ".tk22").forEach(g => { const on = b >= +g.dataset.i + 1; g.style.opacity = on ? 1 : .15; g.style.transform = on ? "none" : "translateX(-16px)"; }); }
  };
})();
