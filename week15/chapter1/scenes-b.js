/* Week 15 · Chapter 5 animated scenes, part B (s12–s22, s33–s49). Uses window.SCH from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, W = window.W15;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");

  /* ------------------------------------------------------------ s12 · split luck (real) */
  const DV = W.splitDev, DX = v => 240 + v * 300;
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
      { k: "In practice", m: "Dozens of models, variables, settings, subgroups.", s: "", l: "Dozens of analyses" },
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

  /* ------------------------------------------------------------ s33 · the garden of forking paths */
  SC.s33 = {
    copy: [
      { k: "Quiet choices", m: "False discoveries rarely start with intentional cheating.", s: "They grow from reasonable choices made while looking at the data.", l: "Quiet choices" },
      { k: "Fork 1 · Cleaning", m: "How do you handle occupancy above 100%?", s: "Drop rows, cap at 100%, or set invalid values to missing?", l: "Fork 1: cleaning" },
      { k: "Fork 2 · Coding", m: "How do you code waiting time?", s: "Raw minutes, tens of minutes, logarithm, or a 30-minute cutoff?", l: "Fork 2: coding" },
      { k: "Fork 3 & 4 · Model", m: "Which covariates, outliers, and ward subgroups?", s: "Linear versus curved occupancy; all episodes versus 15 wards.", l: "Forks 3 & 4" },
      { k: "Combinatorics", m: "Four binary forks already create 2 × 2 × 2 × 2 = 16 analyses.", s: "Every branch produces its own slope and its own p value.", l: "16 branches" },
      { k: "Precise term", m: "The garden of forking paths (Gelman & Loken).", s: "Every single path sounds completely reasonable after the fact.", l: "Forking paths" },
      { k: "The hidden trap", m: "Picking the branch that looked best in the data.", s: "Reporting one lucky path as if it were the only analysis possible.", l: "Data-contingent path" },
      { k: "Consequence", m: "Nominal p values lose their face-value meaning.", s: "You must either lock the path in advance or report the whole tree.", l: "Lock or disclose" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "the garden of forking paths · 4 binary choices = 16 plausible analyses", 12, MUTED, "middle", 800)}
${[["Raw data", 44], ["1. Cleaning", 130], ["2. Coding", 224], ["3. Covariates", 318], ["4. Subgroups (16)", 416]].map(([lab, x]) => t(x, 42, lab, 10.5, NAVY, "middle", 800)).join("")}
<g class="fk0">
  <rect x="14" y="132" width="62" height="36" rx="8" fill="${NAVY}"/>${t(45, 154, "5,200 rows", 11, "#fff", "middle", 800)}
</g>
${[0, 1].map(i => {
  const y = 96 + i * 108;
  return `<g class="a o0 fk1" data-i="${i}">
    <path d="M76 150 L104 ${y}" stroke="${i === 1 ? TERRA : EDGE}" stroke-width="${i === 1 ? 2.5 : 1.5}"/>
    <rect x="104" y="${y - 14}" width="58" height="28" rx="6" fill="#fff" stroke="${i === 1 ? TERRA : NAVY}" stroke-width="2"/>
    ${t(133, y + 4, i === 0 ? "set NaN" : "cap 100%", 10, INK, "middle", 800)}
  </g>`;
}).join("")}
${[0, 1, 2, 3].map(i => {
  const yP = 96 + Math.floor(i / 2) * 108, y = 70 + i * 54, hi = i === 2;
  return `<g class="a o0 fk2">
    <path d="M162 ${yP} L196 ${y}" stroke="${hi ? TERRA : EDGE}" stroke-width="${hi ? 2.5 : 1.5}"/>
    <rect x="196" y="${y - 11}" width="58" height="22" rx="5" fill="#fff" stroke="${hi ? TERRA : GREEN}" stroke-width="1.8"/>
    ${t(225, y + 4, ["per 10m", "log(wait)", ">30m cut", ">45m cut"][i], 9.5, INK, "middle", 700)}
  </g>`;
}).join("")}
${Array.from({ length: 8 }, (_, i) => {
  const yP = 70 + Math.floor(i / 2) * 54, y = 58 + i * 27, hi = i === 5;
  return `<g class="a o0 fk3">
    <path d="M254 ${yP} L292 ${y}" stroke="${hi ? TERRA : EDGE}" stroke-width="${hi ? 2.5 : 1.4}"/>
    <rect x="292" y="${y - 9}" width="54" height="18" rx="4" fill="#fff" stroke="${hi ? TERRA : GOLD}" stroke-width="1.6"/>
    ${t(319, y + 4, i % 2 === 0 ? "6 pred" : "3 pred", 9, INK, "middle", 700)}
  </g>`;
}).join("")}
${Array.from({ length: 16 }, (_, i) => {
  const yP = 58 + Math.floor(i / 2) * 27, y = 52 + i * 13.5, hi = i === 11;
  return `<g class="a o0 fk4">
    <path d="M346 ${yP} L388 ${y}" stroke="${hi ? TERRA : EDGE}" stroke-width="${hi ? 2.5 : 1.2}"/>
    <circle cx="394" cy="${y}" r="${hi ? 5.5 : 3.5}" fill="${hi ? TERRA : GREY}"/>
    ${hi ? `<rect x="404" y="${y - 9}" width="64" height="18" rx="4" fill="${TERRA}"/>${t(436, y + 4, "p = 0.008*", 9.5, "#fff", "middle", 800)}` : ""}
  </g>`;
}).join("")}
<g class="a o0 bt33">${card(14, 272, 452, 74, INK, INK)}${fo(28, 280, 424, 58, "<b style='color:#E8B04B'>The Garden of Forking Paths (Gelman & Loken):</b> Even without intentional fishing, choosing your cleaning, coding, and subgroup path <i>after</i> seeing the data invalidates standard p-values.", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.show(r, ".fk1", b >= 1 || b === 0);
      H.show(r, ".fk2", b >= 2 || b === 0);
      H.show(r, ".fk3", b >= 3 || b === 0);
      H.show(r, ".fk4", b >= 4 || b === 0);
      H.show(r, ".bt33", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s34 · pre-registration */
  SC.s34 = {
    copy: [
      { k: "The question", m: "How do you prove you did not pick the lucky branch?", s: "Showing an examiner your primary test was not data-dredged.", l: "Prove it" },
      { k: "Marksmanship", m: "Call the target before you release the arrow.", s: "Drawing a bullseye around where the arrow landed is not a test.", l: "Target first" },
      { k: "Pre-registration", m: "Lock your statistical analysis plan in advance.", s: "Time-stamped before inspecting outcome relationships.", l: "Pre-registration" },
      { k: "What it locks", m: "Estimand, cleaning rules, primary model, and metric.", s: "Occupancy >100% & negative waits → missing; 6-predictor OLS.", l: "Locked protocol" },
      { k: "Confirmatory", m: "Pre-planned tests keep valid p values and intervals.", s: "Because only one pre-committed path was tested for confirmation.", l: "Confirmatory track" },
      { k: "What about curves?", m: "Pre-registration never bans exploring the data!", s: "You can still discover the >80% occupancy bend and fit the network.", l: "Exploration allowed" },
      { k: "Two clear labels", m: "Separate confirmatory tests from exploratory discoveries.", s: "Never mix pre-planned tests with post-hoc data exploration.", l: "Two tracks" },
      { k: "Honest science", m: "Labelled exploration survives any doctoral viva.", s: "Unlabelled exploration disguised as confirmation fails review.", l: "Label honestly" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="top34">
  ${[["1. State Question", 14, NAVY], ["2. Lock Plan 🔒", 170, GREEN], ["3. Inspect Outcome", 326, TERRA]].map(([s, x, c], i) =>
    `${card(x, 18, 140, 44, c, "#fff")}${t(x + 70, 45, s, 13, c, "middle", 800)}${i < 2 ? `<path d="M${x + 140} 40 H${x + 156}" stroke="${INK}" stroke-width="2.5"/>` : ""}`
  ).join("")}
</g>
<g class="a o0 cf34" style="transform:translateY(10px)">
  ${card(14, 76, 218, 192, GREEN, "#EAF5EE")}
  <rect x="14" y="76" width="218" height="32" rx="10" fill="${GREEN}"/>
  ${t(123, 97, "CONFIRMATORY TRACK 🔒", 12.5, "#fff", "middle", 800)}
  ${[["Estimand:", "Conditional waiting slope"], ["Screening:", "Occ >100%, wait <0 → NaN"], ["Model:", "6-predictor linear OLS"], ["Inference:", "95% CI & p-value valid ✓"]].map(([k, v], i) =>
    `${t(26, 128 + i * 34, k, 11, GREEN, "start", 800)}${t(26, 143 + i * 34, v, 11.5, INK, "start", 700)}`
  ).join("")}
</g>
<g class="a o0 ex34" style="transform:translateY(10px)">
  ${card(248, 76, 218, 192, GOLD, "#FFFDF5")}
  <rect x="248" y="76" width="218" height="32" rx="10" fill="${GOLD}"/>
  ${t(357, 97, "EXPLORATORY TRACK 🧭", 12.5, INK, "middle", 800)}
  ${[["Trigger:", "Residual curve seen in plot"], ["Discovery:", "Occupancy cliff above 80%"], ["Follow-up:", "Banded means & network"], ["Reporting:", "Labelled exploratory ✓"]].map(([k, v], i) =>
    `${t(260, 128 + i * 34, k, 11, TERRA, "start", 800)}${t(260, 143 + i * 34, v, 11.5, INK, "start", 700)}`
  ).join("")}
</g>
<g class="a o0 bt34">${card(14, 280, 452, 66, INK, INK)}${fo(28, 288, 424, 52, "<b style='color:#E8B04B'>The Golden Rule of Pre-Registration:</b> Pre-registration does not ban exploration; it separates <b>confirmatory tests</b> (locked before seeing results) from <b>exploratory discoveries</b> (labelled honestly).", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.show(r, ".cf34", b >= 2 || b === 0);
      H.tf(r, ".cf34", b >= 2 || b === 0 ? "none" : "translateY(10px)");
      H.show(r, ".ex34", b >= 5 || b === 0);
      H.tf(r, ".ex34", b >= 5 || b === 0 ? "none" : "translateY(10px)");
      H.show(r, ".bt34", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s35 · multiple testing */
  const MX35 = m => 64 + (m / 40) * 380, MY35 = p => 210 - p * 160;
  const MPTS35 = Array.from({ length: 41 }, (_, m) => [MX35(m), MY35(1 - Math.pow(0.95, m))]);
  SC.s35 = {
    copy: [
      { k: "One roll", m: "Roll a fair 20-sided die once: 1 in 20 chance (5%).", s: "The exact false-alarm rate of α = 0.05 when the null is true.", l: "1 test = 5%" },
      { k: "Alpha = 0.05", m: "One test under a true null has a 5% false-alarm risk.", s: "Ninety-five percent of the time, no false alarm occurs.", l: "α = 0.05" },
      { k: "Twenty rolls", m: "Roll 20 times: 64% chance of at least one twenty!", s: "1 − 0.95²⁰ = 0.642: more likely than not to get a false winner.", l: "20 tests = 64%" },
      { k: "In your thesis", m: "Every ward, shift, or variable pair is another roll.", s: "Testing 15 wards and 4 shifts multiplies your false-alarm risk.", l: "Subgroup hunting" },
      { k: "Multiple testing", m: "At 20 independent null tests, false alarms reach 64%.", s: "At 40 tests, the chance of at least one false positive hits 87%.", l: "40 tests = 87%" },
      { k: "Al Waha subgroups", m: "6 clinical subgroups: Emergency survives Bonferroni correction.", s: "Emergency slope: raw p = 9.94e-88, Bonferroni p (×6) = 5.96e-87.", l: "6 subgroups · Bonferroni" },
      { k: "Remedy 1", m: "Name one primary test; label subgroup checks exploratory.", s: "Keep your confirmatory α budget on the primary research question.", l: "One primary test" },
      { k: "Remedy 2", m: "Adjust the threshold (Bonferroni α/m or FDR) and report m.", s: "State the exact number of tests run beside every p value.", l: "Bonferroni / FDR" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "chance of at least one false positive: 1 − (1 − 0.05)ᵐ across m independent null tests", 11.5, MUTED, "middle", 800)}
${card(14, 32, 452, 204, EDGE, "#fff")}
<path d="M64 210 H448 M64 210 V46" stroke="${INK}" stroke-width="1.8"/>
${[0, 0.25, 0.5, 0.75, 1.0].map(p => `<path d="M64 ${MY35(p)} H444" stroke="${SKY}" stroke-width="1"/>${t(56, MY35(p) + 4, Math.round(p * 100) + "%", 10, MUTED, "end", 700)}`).join("")}
${[1, 10, 20, 30, 40].map(m => `<path d="M${MX35(m)} 210 v5" stroke="${INK}" stroke-width="1.5"/>${t(MX35(m), 226, m + (m === 1 ? " test" : " tests"), 10, MUTED)}`).join("")}
<path d="M64 ${MY35(0.05)} H444" stroke="${GREEN}" stroke-width="2" stroke-dasharray="4 4"/>
${t(440, MY35(0.05) - 5, "nominal α = 5%", 10, GREEN, "end", 800)}
<path class="dr cv35" pathLength="1" d="${pathOf(MPTS35)}" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linecap="round"/>
<g class="a o0 pt35a"><circle cx="${MX35(1)}" cy="${MY35(0.05)}" r="5.5" fill="${GREEN}" stroke="#fff" stroke-width="1.5"/>${t(MX35(1) + 8, MY35(0.05) - 8, "1 test: 5%", 11, GREEN, "start", 800)}</g>
<g class="a o0 pt35b"><path d="M${MX35(20)} ${MY35(0.642)} V210" stroke="${TERRA}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="${MX35(20)}" cy="${MY35(0.642)}" r="6.5" fill="${TERRA}" stroke="#fff" stroke-width="2"/>${card(MX35(20) - 58, MY35(0.642) - 42, 116, 32, TERRA, "#FCEFE9")}${t(MX35(20), MY35(0.642) - 21, "20 tests → 64%!", 12, TERRA, "middle", 800)}</g>
<g class="a o0 pt35c"><circle cx="${MX35(40)}" cy="${MY35(0.871)}" r="6" fill="${TERRA}" stroke="#fff" stroke-width="1.5"/>${t(MX35(40) - 8, MY35(0.871) - 10, "40 tests → 87%", 11, TERRA, "end", 800)}</g>
<g class="a o0 rm35">${card(14, 244, 218, 102, TERRA, "#FCEFE9")}${t(123, 266, "Subgroup Checks (m = 6)", 13, TERRA, "middle", 800)}${fo(24, 274, 198, 66, "Across 6 clinical subgroups, Emergency has raw p = 9.94×10⁻⁸⁸ and Bonferroni p = 5.96×10⁻⁸⁷ (survives correction; noisy null checks would not).", 11, INK, 600, "text-align:center")}
${card(248, 244, 218, 102, GREEN, "#EAF5EE")}${t(357, 266, "Two Defensible Fixes", 13, GREEN, "middle", 800)}${fo(258, 274, 198, 66, "<b>1.</b> Pre-specify 1 primary test; label subgroups exploratory.<br><b>2.</b> Divide α by m (Bonferroni: 0.05/20 = 0.0025) or control FDR.", 11.2, INK, 600)}</g>`,
    render(r, b) {
      H.draw(r, ".cv35", b >= 2 || b === 0);
      H.show(r, ".pt35a", b >= 1 || b === 0);
      H.show(r, ".pt35b", b >= 2);
      H.show(r, ".pt35c", b >= 4);
      H.show(r, ".rm35", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s36 · try it: walk the garden of forking paths */
  SC.s36 = {
    copy: [
      { k: "Your turn", m: "Choose a cleaning rule, a model, and a sample scope.", s: "Watch how branching choices affect the estimate and false-alarm risk.", l: "Choose your path" },
      { k: "Your turn", m: "Compare a pre-planned path with subgroup cherry-picking.", s: "Watch the false-alarm meter on the right.", l: "Check false-alarm risk" },
      { k: "Your turn", m: "Test several combinations in the multiverse.", s: "Then press Continue.", l: "Explore, then continue" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "interactive multiverse explorer · Al Waha waiting-time analysis", 12.5, MUTED, "middle", 800)}
${card(14, 34, 452, 166, EDGE, "#fff")}
${[["1 · Cleaning rule", 84, "f1Txt36"], ["2 · Model covariates", 240, "f2Txt36"], ["3 · Sample scope", 396, "f3Txt36"]].map(([h, cx, cls], i) => `
  ${i > 0 ? `<path d="M${cx - 102} 112 H${cx - 56}" stroke="${GOLD}" stroke-width="3.5"/>` : ""}
  ${card(cx - 56, 56, 112, 112, NAVY, SKY)}
  ${t(cx, 78, h, 11, NAVY, "middle", 800)}
  <foreignObject x="${cx - 50}" y="90" width="100" height="70"><div xmlns="http://www.w3.org/1999/xhtml" class="${cls}" style="font:700 12px Calibri,Segoe UI,sans-serif;color:${INK};text-align:center;line-height:1.25"></div></foreignObject>
`).join("")}
${[["Waiting Slope Estimate", "est36", NAVY, 14], ["False-Alarm Risk (α)", "alp36", TERRA, 170], ["Audit Classification", "aud36", GREEN, 326]].map(([h, cls, c, x]) =>
  `${card(x, 212, 140, 132, c, "#fff")}${t(x + 70, 236, h, 11.5, MUTED, "middle", 800)}<text class="${cls}" x="${x + 70}" y="278" font-size="18" fill="${c}" text-anchor="middle" font-weight="800"></text><foreignObject x="${x + 10}" y="292" width="120" height="46"><div xmlns="http://www.w3.org/1999/xhtml" class="${cls}s" style="font:700 11px Calibri,Segoe UI,sans-serif;color:${MUTED};text-align:center;line-height:1.25"></div></foreignObject>`
).join("")}`,
    render(r) { if (!r._fk36) SC.s36.update(r, "std", "adj", "full"); },
    update(r, clean, spec, scope) {
      r._fk36 = true;
      const cleanMap = { std: "Standard cleaning (occ >100%, wait <0 → NaN)", trim: "Trim top 1% longest waiting times" };
      const specMap = { unadj: "Unadjusted (waiting alone)", adj: "Adjusted (6 predictors held constant)", quad: "Adjusted + quadratic occupancy bend" };
      const scopeMap = { full: "Full cleaned sample (5,200 rows)", cherry: "Cherry-pick most extreme of 15 wards" };
      r.querySelector(".f1Txt36").textContent = cleanMap[clean];
      r.querySelector(".f2Txt36").textContent = specMap[spec];
      r.querySelector(".f3Txt36").textContent = scopeMap[scope];

      let slope = spec === "unadj" ? -3.03 : (spec === "quad" ? -1.16 : -1.23);
      if (clean === "trim") slope += (spec === "adj" ? -0.10 : -0.08);
      if (scope === "cherry") slope -= 0.85;

      const isCherry = scope === "cherry";
      const isPrimary = clean === "std" && spec === "adj" && scope === "full";
      r.querySelector(".est36").textContent = `${fx(slope)} / 10m`;
      r.querySelector(".est36s").textContent = spec === "unadj" ? "Marginal (carries confounders)" : "Adjusted association";
      r.querySelector(".alp36").textContent = isCherry ? "54% risk!" : "5% (nominal)";
      r.querySelector(".alp36").setAttribute("fill", isCherry ? TERRA : GREEN);
      r.querySelector(".alp36s").textContent = isCherry ? "1 − 0.95¹⁵ across 15 wards" : "Single pre-specified test";
      r.querySelector(".aud36").textContent = isCherry ? "P-Hacked ✗" : (isPrimary ? "Confirmatory ✓" : "Sensitivity ✓");
      r.querySelector(".aud36").setAttribute("fill", isCherry ? TERRA : (isPrimary ? GREEN : NAVY));
      r.querySelector(".aud36s").textContent = isCherry ? "Must disclose all 15 tests & adjust α" : (isPrimary ? "Matches pre-registered plan" : "Valid robustness check");
      return { slope, isCherry, isPrimary };
    }
  };

  /* ------------------------------------------------------------ s37 · sensitivity analysis & specification curve */
  const SX37 = v => 405 + v * 155; // v from -2.0 to +0.2; 0 at x=405
  const SPECS37 = [
    ["1. Primary: 6-predictor linear OLS (cleaned)", -1.23, -1.31, -1.16, NAVY, "−1.23 (primary)"],
    ["2. Trim top 1% longest waiting times", -1.33, -1.41, -1.25, GREEN, "−1.33 (trimmed 1%)"],
    ["3. Add quadratic bed occupancy term", -1.16, -1.23, -1.09, GREEN, "−1.16 (quad occ)"],
    ["4. Multiple imputation for missing rows", -1.25, -1.33, -1.17, GREEN, "−1.25 (imputed)"],
    ["5. Huber outlier-resistant regression", -1.21, -1.29, -1.13, GREEN, "−1.21 (Huber fit)"]
  ];
  SC.s37 = {
    copy: [
      { k: "The examiner's question", m: "What if you had chosen a different reasonable fork?", s: "Does your conclusion depend on one arbitrary decision?", l: "What if?" },
      { k: "Bridge testing", m: "Engineers test bridges under crosswinds and heavy loads.", s: "A sound structure holds up across plausible conditions.", l: "Stress test" },
      { k: "Sensitivity analysis", m: "Re-run the analysis under alternative defensible choices.", s: "Also called a robustness check.", l: "Sensitivity analysis" },
      { k: "Primary baseline", m: "Cleaned data, six linear predictors: −1.23 per 10 min.", s: "Now let us stress-test this estimate against four threats.", l: "Baseline: −1.23" },
      { k: "Check 1 · Outliers", m: "Trim the top 1% longest waits: slope shifts to −1.33.", s: "Trimmed slope: −1.33 points per 10 minutes.", l: "Check 1: −1.33" },
      { k: "Check 2 · Curvature", m: "Add a quadratic occupancy term: slope becomes −1.16.", s: "Slope with quadratic occupancy: −1.16 points per 10 minutes.", l: "Check 2: −1.16" },
      { k: "Check 3 · Missing data", m: "Compare complete cases with multiple imputation.", s: "Plus outlier-resistant Huber regression.", l: "Check 3: missingness" },
      { k: "Specification curve", m: "Lay all plausible specifications side by side on the page.", s: "Instead of hiding alternative branches, show them openly.", l: "Specification curve" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "specification curve · Al Waha adjusted waiting-time slope across 5 checks", 12, MUTED, "middle", 800)}
${card(14, 32, 452, 232, EDGE, "#fff")}
<rect x="${SX37(-1.41)}" y="42" width="${SX37(-1.09) - SX37(-1.41)}" height="196" fill="#EAF5EE" fill-opacity=".8"/>
${t((SX37(-1.41) + SX37(-1.09)) / 2, 54, "consistent band", 10, GREEN, "middle", 800)}
<path d="M${SX37(0)} 42 V238" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="4 4"/>
${t(SX37(0), 254, "0 (no effect)", 10.5, TERRA, "middle", 800)}
${SPECS37.map(([lab, est, lo, hi, c, tag], i) => {
  const y = 74 + i * 34;
  return `<g class="a o0 sp37" data-i="${i}" style="transform:translateX(-10px)">
    ${t(24, y + 4, lab, 11, INK, "start", 800)}
    <path d="M${SX37(lo)} ${y} H${SX37(hi)}" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${SX37(est)}" cy="${y}" r="5" fill="${c}" stroke="#fff" stroke-width="1.5"/>
    ${t(SX37(hi) + 8, y + 4, tag, 9.5, c, "start", 800)}
  </g>`;
}).join("")}
<g class="a o0 bt37">${card(14, 274, 452, 72, INK, INK)}${fo(28, 282, 424, 56, "<b style='color:#E8B04B'>Sensitivity Analysis in Your Thesis:</b> By plotting the primary model alongside trimming, non-linear occupancy, and imputation checks, you prove your conclusion is not an artifact of one analytical fork.", 12.5, "#fff", 600)}</g>`,
    render(r, b) {
      H.q(r, ".sp37").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0) || (i === 1 && b >= 4) || (i === 2 && b >= 5) || (i >= 3 && b >= 6) || b === 0;
        g.style.opacity = on ? 1 : 0.15;
        g.style.transform = on ? "none" : "translateX(-10px)";
      });
      H.show(r, ".bt37", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s38 · robust vs fragile findings */
  SC.s38 = {
    copy: [
      { k: "Two patterns", m: "What a specification curve reveals.", s: "Robust stability versus fragile sensitivity.", l: "Two patterns" },
      { k: "Pattern 1", m: "Estimates cluster tightly; every interval stays negative.", s: "Nudging from −1.23 to −1.16 or −1.33 across all checks.", l: "Tight cluster" },
      { k: "Robust finding", m: "The conclusion survives every reasonable alternative.", s: "You can defend the negative waiting-time slope with confidence.", l: "Robust finding" },
      { k: "Pattern 2", m: "Removing 3 rows or bending a line flips the sign!", s: "The estimate swings across zero depending on minor choices.", l: "Swings across zero" },
      { k: "Fragile finding", m: "Report the fragility honestly — never hide it.", s: "Tell the reader the data cannot support a firm claim on that variable.", l: "Fragile finding" },
      { k: "The contrast", m: "P-hacking searches in secret for one dramatic branch.", s: "Hiding the thirty-nine specifications that did not work.", l: "Secret search" },
      { k: "Public audit", m: "Sensitivity analysis walks the branches in public.", s: "Showing the reader whether the finding holds across all of them.", l: "Public robustness" },
      { k: "In your chapter", m: "Include a sensitivity table right after your main table.", s: "Primary specification plus two or three pre-planned checks.", l: "Sensitivity table" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 rb38">
  ${card(14, 24, 218, 236, GREEN, "#fff")}
  <rect x="14" y="24" width="218" height="32" rx="10" fill="${GREEN}"/>
  ${t(123, 45, "ROBUST FINDING ✓", 13, "#fff", "middle", 800)}
  <path d="M196 66 V214" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 4"/>
  ${t(196, 228, "0", 11, TERRA, "middle", 800)}
  ${[[-1.23, 82], [-1.33, 110], [-1.16, 138], [-1.25, 166], [-1.21, 194]].map(([v, y], i) => {
    const cx = 196 + v * 75;
    return `${t(24, y + 4, "Spec " + (i + 1), 10.5, MUTED, "start", 700)}
      <path d="M${cx - 16} ${y} H${cx + 16}" stroke="${GREEN}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${y}" r="4.5" fill="${GREEN}"/>`;
  }).join("")}
  ${fo(24, 232, 198, 26, "All 5 checks stay clearly below zero.", 11.5, GREEN, 800, "text-align:center")}
</g>
<g class="a o0 fg38">
  ${card(248, 24, 218, 236, TERRA, "#fff")}
  <rect x="248" y="24" width="218" height="32" rx="10" fill="${TERRA}"/>
  ${t(357, 45, "FRAGILE FINDING ⚠", 13, "#fff", "middle", 800)}
  <path d="M366 66 V214" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 4"/>
  ${t(366, 228, "0", 11, TERRA, "middle", 800)}
  ${[[-0.85, 82], [-0.10, 110], [0.22, 138], [-0.45, 166], [0.35, 194]].map(([v, y], i) => {
    const cx = 366 + v * 65;
    return `${t(258, y + 4, "Spec " + (i + 1), 10.5, MUTED, "start", 700)}
      <path d="M${cx - 26} ${y} H${cx + 26}" stroke="${TERRA}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${y}" r="4.5" fill="${TERRA}"/>`;
  }).join("")}
  ${fo(258, 232, 198, 26, "Sign & significance flip across specs!", 11.5, TERRA, 800, "text-align:center")}
</g>
<g class="a o0 bt38">${card(14, 272, 452, 74, INK, INK)}${fo(28, 280, 424, 58, "<b style='color:#E8B04B'>P-Hacking vs Sensitivity Analysis:</b> P-hacking walks the branches in secret and reports only the luckiest one. Sensitivity analysis puts the branches in a table so the reader sees whether the claim is robust or fragile.", 12.2, "#fff", 600)}</g>`,
    render(r, b) {
      H.show(r, ".rb38", b >= 1 || b === 0);
      H.show(r, ".fg38", b >= 3 || b === 0);
      H.show(r, ".bt38", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s39 · computational reproducibility */
  SC.s39 = {
    copy: [
      { k: "The audit question", m: "“How did you get −1.23 in Table 4, Row 2?”", s: "Can you prove where every number in your thesis came from?", l: "Where did it come from?" },
      { k: "Broken workflow", m: "Hand-edited spreadsheets and copy-pasted tables.", s: "Impossible to verify or re-run six months later.", l: "Manual edits fail" },
      { k: "The standard", m: "Computational reproducibility: one click, exact output.", s: "Same raw data + your script = identical tables and figures.", l: "Reproducibility" },
      { k: "Rule 1 · Raw data", m: "Never edit the raw data file by hand.", s: "Keep al_waha_raw.csv read-only and untouched in its folder.", l: "Read-only raw file" },
      { k: "Rule 2 · Code screening", m: "Every cleaning rule is written in Python code.", s: "Occupancy >100% and negative waits set to missing by script.", l: "Screen in code" },
      { k: "Rule 3 · Fixed seeds", m: "Fix random_state in code for splits and networks.", s: "So the train-test split and initial weights never drift.", l: "Fix random_state" },
      { k: "Two distinct words", m: "Reproducibility versus replicability.", s: "Reproducibility = same data, same code, exact same numbers.", l: "Reproducible" },
      { k: "Replicability", m: "Replicability = new data, same protocol, consistent finding.", s: "Reproducibility is the baseline duty you owe every examiner.", l: " vs Replicable" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 bad39">
  ${card(14, 18, 452, 68, TERRA, "#FCEFE9")}
  ${t(30, 40, "✗ NON-REPRODUCIBLE MANUAL WORKFLOW", 12, TERRA, "start", 800)}
  ${t(240, 66, "Edit Excel by hand  →  Point-and-click menu  →  Retype numbers into Word", 12.5, INK, "middle", 700)}
  <path d="M26 62 H454" stroke="${TERRA}" stroke-width="2.5"/>
</g>
<g class="a o0 gd39">
  ${card(14, 98, 452, 134, GREEN, "#fff")}
  ${t(30, 120, "✓ REPRODUCIBLE CODE PIPELINE (ONE COMMAND RUNS ALL)", 12, GREEN, "start", 800)}
  ${[
    ["al_waha.csv", "READ-ONLY", "5,200 raw rows", NAVY, 24],
    ["01_clean.py", "CODE RULES", "occ>100, wait<0", GREEN, 134],
    ["02_models.py", "SEED = 42", "1 split, 3 models", GREEN, 244],
    ["Table 4 & Fig 2", "AUTO-EXPORT", "−1.23 · MAE 4.9", TERRA, 354]
  ].map(([a, b, c, col, x], i) => `
    ${i > 0 ? `<path d="M${x - 12} 172 H${x}" stroke="${INK}" stroke-width="2.5"/>` : ""}
    ${card(x, 134, 98, 82, col, i === 0 ? SKY : "#EAF5EE")}
    ${t(x + 49, 156, a, 11.5, INK, "middle", 800)}
    <rect x="${x + 11}" y="164" width="76" height="18" rx="9" fill="${col}"/>
    ${t(x + 49, 177, b, 9.5, "#fff", "middle", 800)}
    ${t(x + 49, 202, c, 10, MUTED, "middle", 700)}
  `).join("")}
</g>
<g class="a o0 vs39">
  ${card(14, 244, 218, 100, NAVY, SKY)}
  ${t(123, 268, "REPRODUCIBILITY", 13, NAVY, "middle", 800)}
  ${fo(24, 276, 198, 60, "<b>Same data + same code</b><br>→ exact same numbers, tables, and figures every single time.", 11.5, INK, 600, "text-align:center")}
  ${card(248, 244, 218, 100, GREEN, "#EAF5EE")}
  ${t(357, 268, "REPLICABILITY", 13, GREEN, "middle", 800)}
  ${fo(258, 276, 198, 60, "<b>New hospital data + same protocol</b><br>→ consistent scientific pattern in a new quarter or hospital.", 11.5, INK, 600, "text-align:center")}
</g>`,
    render(r, b) {
      H.show(r, ".bad39", b >= 1 || b === 0);
      H.show(r, ".gd39", b >= 2 || b === 0);
      H.show(r, ".vs39", b >= 6);
    }
  };

  /* ------------------------------------------------------------ s40 · code sharing, environment locks, and audit trail */
  const TERM40 = [
    "$ python run_all.py",
    "[01_clean] Raw Al Waha rows: 5,200",
    "[01_clean] Occ >100% (7) / wait <0 (7) -> NaN",
    "[01_clean] assert (df['wait'] >= 0).all()  ✓",
    "[02_split] Fixed random_state=42 (75% / 25%) ✓",
    "[03_fit]   OLS -1.23 | Net MAE 4.91 | 50 splits ✓",
    "[04_out]   Exported Table_4.csv & Fig_2.svg ✓"
  ];
  SC.s40 = {
    copy: [
      { k: "Your repository", m: "What an auditable doctoral analysis folder contains.", s: "Everything needed to verify your chapter from scratch.", l: "Repository layout" },
      { k: "1 · Folder layout", m: "Separate read-only raw data, scripts, and outputs.", s: "data/raw/ · src/ · output/ — numbered in run order.", l: "Clean folders" },
      { k: "2 · Audit log", m: "Print starting rows and every screening count.", s: "Never hide how many episodes were modified or excluded.", l: "Print audit log" },
      { k: "Al Waha log", m: "5,200 starting episodes; 7 invalid occupancy & 7 negative waits → NaN.", s: "Logged automatically: 7 episodes with occupancy >100% and 7 with wait <0 set to missing.", l: "7 + 7 set to NaN" },
      { k: "3 · Assertions", m: "Embed assert statements in your Python code.", s: "Verify no negative waits remain and train + test counts match.", l: "Code assertions" },
      { k: "4 · Environment", m: "Lock package versions in requirements.txt.", s: "scikit-learn==1.9, pandas, numpy — prevents silent version drift.", l: "requirements.txt" },
      { k: "5 · README.md", m: "Three lines: install, run command, and table map.", s: "Which script generates each table and figure in the thesis.", l: "Clear README" },
      { k: "Scientific record", m: "Runnable code turns “trust me” into “verify me”.", s: "The strongest defense against any question about your numbers.", l: "Auditable science" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 tr40">
  ${card(14, 22, 188, 240, NAVY, "#fff")}
  <rect x="14" y="22" width="188" height="30" rx="10" fill="${NAVY}"/>
  ${t(108, 42, "al-waha-thesis-repo/", 12, "#fff", "middle", 800)}
  ${[
    ["📁 data/raw/", "al_waha.csv (read-only)", NAVY],
    ["🐍 src/01_clean.py", "screening + asserts", GREEN],
    ["🐍 src/02_models.py", "split once + 50 splits", GREEN],
    ["📄 requirements.txt", "scikit-learn==1.9 ...", TERRA],
    ["📘 README.md", "how to run & table map", INK]
  ].map(([f, s, c], i) => `
    ${t(26, 74 + i * 38, f, 11.5, c, "start", 800)}
    ${t(38, 89 + i * 38, s, 10, MUTED, "start", 700)}
  `).join("")}
</g>
<g class="a o0 lg40">
  <rect x="214" y="22" width="252" height="240" rx="12" fill="${INK}"/>
  ${t(340, 44, "automated audit log & assertions", 11.5, GOLD, "middle", 800)}
  ${TERM40.map((line, i) => `<text class="a o0 tl40" data-i="${i}" x="226" y="${72 + i * 26}" font-size="10.8" fill="${i === 0 ? GOLD : "#E8EDF3"}" font-family="Consolas,monospace">${line}</text>`).join("")}
</g>
<g class="a o0 bt40">${card(14, 274, 452, 72, GREEN, "#EAF5EE")}${fo(28, 282, 424, 56, "<b>Reproducibility Checklist:</b> Read-only raw data + scripted screening with <code>assert</code> checks + pinned <code>requirements.txt</code> (scikit-learn 1.9) + a one-page <code>README.md</code>.", 12.5, INK, 600, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".tr40", true);
      H.show(r, ".lg40", b >= 2 || b === 0);
      H.q(r, ".tl40").forEach(el => {
        const i = +el.dataset.i;
        const on = b === 0 || (b >= 2 && i <= 1) || (b >= 3 && i <= 2) || (b >= 4 && i <= 4) || (b >= 5);
        el.style.opacity = on ? 1 : 0.15;
      });
      H.show(r, ".bt40", b >= 6);
    }
  };

  /* ------------------------------------------------------------ s41 · reporting standards: STROBE and TRIPOD */
  SC.s41 = {
    copy: [
      { k: "Why checklists?", m: "Pilots use pre-flight checklists on every flight.", s: "Not from ignorance, but so memory never skips a critical check.", l: "Pre-flight checklist" },
      { k: "Research standards", m: "International guidelines ensure complete disclosure.", s: "Examiners and journals check your chapter against them.", l: "Reporting guidelines" },
      { k: "Which checklist?", m: "It depends on Question 1: explanatory or predictive?", s: "Observational association study versus multivariable prediction model.", l: "Match to Question 1" },
      { k: "STROBE", m: "For observational studies of associations.", s: "Comparing groups and estimating adjusted regression slopes.", l: "STROBE" },
      { k: "22 STROBE items", m: "Strengthening the Reporting of Observational Studies.", s: "Covers setting, participant flow, confounders, and adjusted CIs.", l: "22 STROBE items" },
      { k: "TRIPOD", m: "For multivariable prediction models.", s: "Developing and validating classifiers or neural networks.", l: "TRIPOD" },
      { k: "22 TRIPOD items", m: "Transparent Reporting of a multivariable prediction model.", s: "Covers predictors, validation split, error in units, and calibration.", l: "22 TRIPOD items" },
      { k: "Their purpose", m: "They never dictate your model; they ban hidden omissions.", s: "So any reader can judge, reproduce, and synthesize your work.", l: "Full transparency" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g>${card(110, 14, 260, 44, INK, INK)}${t(240, 33, "Question 1: Explanatory or Predictive?", 12.5, GOLD, "middle", 800)}${t(240, 49, "chooses your international reporting checklist", 11, "#fff", "middle", 600)}</g>
<g class="a o0 st41" style="transform:translateY(10px)">
  ${card(14, 70, 218, 200, NAVY, "#fff")}
  <rect x="14" y="70" width="218" height="36" rx="10" fill="${NAVY}"/>
  ${t(123, 93, "STROBE · 22 Items", 14, "#fff", "middle", 800)}
  ${t(123, 122, "Explanatory Observational Studies", 11.5, NAVY, "middle", 800)}
  ${[
    "✓ Comparisons & regressions",
    "✓ Study design, setting & flow",
    "✓ Construct vs measured proxy",
    "✓ Unadjusted AND adjusted slopes",
    "✓ 95% CIs & confounder rationale"
  ].map((s, i) => t(26, 148 + i * 23, s, 11.2, INK, "start", 700)).join("")}
</g>
<g class="a o0 tr41" style="transform:translateY(10px)">
  ${card(248, 70, 218, 200, GREEN, "#fff")}
  <rect x="248" y="70" width="218" height="36" rx="10" fill="${GREEN}"/>
  ${t(357, 93, "TRIPOD · 22 Items", 14, "#fff", "middle", 800)}
  ${t(357, 122, "Multivariable Prediction Models", 11.5, GREEN, "middle", 800)}
  ${[
    "✓ Classifiers & neural networks",
    "✓ Predictor coding & missing data",
    "✓ Exact holdout / CV split design",
    "✓ MAE & RMSE in outcome units",
    "✓ Calibration & subgroup accuracy"
  ].map((s, i) => t(260, 148 + i * 23, s, 11.2, INK, "start", 700)).join("")}
</g>
<g class="a o0 bt41">${card(14, 282, 452, 64, INK, INK)}${fo(28, 290, 424, 48, "<b style='color:#E8B04B'>Examiner Standard:</b> STROBE and TRIPOD do not tell you which model to prefer; they guarantee that your design, screening, validation, and uncertainty are never left off the page.", 12.2, "#fff", 600, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".st41", b >= 3 || b === 0);
      H.tf(r, ".st41", b >= 3 || b === 0 ? "none" : "translateY(10px)");
      H.show(r, ".tr41", b >= 5 || b === 0);
      H.tf(r, ".tr41", b >= 5 || b === 0 ? "none" : "translateY(10px)");
      H.show(r, ".bt41", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s42 · applying STROBE and TRIPOD to Al Waha */
  const ITEMS42 = [
    ["1 · Participant Flow (STROBE & TRIPOD)", "5,200 recorded episodes → 7 occupancy >100% and 7 negative waits set to missing (4,724 complete cases) → exact train/test counts.", NAVY],
    ["2 · Unadjusted & Adjusted Estimates (STROBE #16)", "Report BOTH unadjusted (−3.01 / 10m) and adjusted (−1.23 / 10m) slopes with 95% CIs, naming all 5 covariates.", GREEN],
    ["3 · Validation Design & Real Units (TRIPOD)", "Pre-loop split + 50 splits · Held-out MAE (4.9 vs 5.6) and RMSE (6.12 vs 7.07) beside outcome SD (16 pts).", TERRA],
    ["4 · Behavior Across Ranges (TRIPOD)", "Check predictions across occupancy bands — revealing the steep non-linear drop above 80–85% capacity.", GOLD]
  ];
  SC.s42 = {
    copy: [
      { k: "Four disclosures", m: "What STROBE and TRIPOD force onto your page.", s: "Four items that unguided thesis drafts routinely omit.", l: "Four required items" },
      { k: "1 · Participant flow", m: "From 5,200 recorded episodes to the analyzed sample.", s: "Every exclusion and missing value counted by variable.", l: "Participant flow" },
      { k: "2 · STROBE Item 16", m: "Report both unadjusted and adjusted estimates + CIs.", s: "And explain why each confounder was held constant.", l: "Unadjusted & adjusted" },
      { k: "On Al Waha", m: "Both −3.01 (unadjusted) and −1.23 (adjusted) belong in the table.", s: "Naming occupancy, staffing, handoffs, training, and age.", l: "−3.01 and −1.23" },
      { k: "3 · TRIPOD validation", m: "State the exact holdout or cross-validation protocol.", s: "And report prediction error in the outcome's own units.", l: "Validation & units" },
      { k: "On Al Waha", m: "MAE 4.9 vs 5.6 and RMSE 6.12 vs 7.07 beside SD = 16.", s: "Never report an R² or accuracy percentage without real units.", l: "MAE · RMSE · SD 16" },
      { k: "4 · Range behavior", m: "Check model performance across outcome and input ranges.", s: "Such as high-occupancy hospital surges above 85%.", l: "Range & calibration" },
      { k: "Before submission", m: "Verify every STROBE or TRIPOD row against your draft.", s: "If an item has no home in your chapter, add it before the viva.", l: "Check every item" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "four mandatory STROBE / TRIPOD disclosures on the Al Waha dataset", 12, MUTED, "middle", 800)}
${ITEMS42.map(([title, body, c], i) => {
  const y = 34 + i * 64;
  return `<g class="a o0 it42" data-i="${i}" style="transform:translateX(-12px)">
    ${card(14, y, 452, 56, c, "#fff")}
    <rect x="14" y="${y}" width="10" height="56" rx="4" fill="${c}"/>
    ${t(32, y + 20, title, 13, c === GOLD ? INK : c, "start", 800)}
    ${fo(32, y + 24, 424, 30, body, 11.2, INK, 600)}
  </g>`;
}).join("")}
<g class="a o0 bt42">${card(14, 294, 452, 52, INK, INK)}${t(240, 325, "✓ Put STROBE (explanatory) or TRIPOD (predictive) in your Methods Appendix", 13, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".it42").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 1) || (i === 1 && b >= 2) || (i === 2 && b >= 4) || (i === 3 && b >= 6) || b === 0;
        g.style.opacity = on ? 1 : 0.18;
        g.style.transform = on ? "none" : "translateX(-12px)";
      });
      H.show(r, ".bt42", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s43 · ethics, patient privacy, and de-identification */
  SC.s43 = {
    copy: [
      { k: "Human data", m: "5,200 rows mean 5,200 real hospital patient visits.", s: "Ethics and participant protection come before every formula.", l: "5,200 real patients" },
      { k: "The tension", m: "Open science asks for sharing; ethics demands privacy.", s: "How do you make research reproducible without exposing patients?", l: "Sharing vs privacy" },
      { k: "A common myth", m: "Deleting names and ID numbers is not enough.", s: "Pseudonymized records can still be re-identified.", l: "Names ≠ anonymous" },
      { k: "Indirect linkage", m: "Date + shift + 96% occupancy + free-text complaint.", s: "Free-text patient review sentences can single out one patient or clinician.", l: "Indirect identifiers" },
      { k: "True anonymization", m: "Scrub text notes, coarsen dates, check rare cells.", s: "Ensure no combination of quasi-identifiers isolates an individual.", l: "Scrub & coarsen" },
      { k: "Safe code sharing", m: "Share your full code plus a synthetic dataset.", s: "Anyone can verify your scripts without touching real patient rows.", l: "Code + synthetic data" },
      { k: "AI hygiene", m: "Never paste raw patient rows into public AI chat tools.", s: "Keep confidential clinical data inside approved institutional systems.", l: "No raw rows in AI" },
      { k: "In your chapter", m: "State ethics approval, governance, and privacy steps.", s: "Document your IRB reference number and data protection safeguards.", l: "Report IRB & rules" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 id43">
  ${card(14, 18, 452, 82, TERRA, "#FCEFE9")}
  ${t(30, 39, "⚠ THE RE-IDENTIFICATION TRAP (WHY DROPPING NAMES IS NOT ENOUGH)", 11.5, TERRA, "start", 800)}
  ${[["Name: [DELETED]", 26, GREY], ["+ Shift: Tue Night", 136, NAVY], ["+ Occ: 96% Ward C", 248, NAVY], ["+ Text: “Dr. Tariq…”", 360, TERRA]].map(([s, x, c]) =>
    `<rect x="${x}" y="50" width="102" height="24" rx="6" fill="#fff" stroke="${c}" stroke-width="1.5"/>${t(x + 51, 66, s, 10, c, "middle", 800)}`
  ).join("")}
  ${t(240, 92, "Combined quasi-identifiers + free-text notes uniquely re-identify one person!", 11, TERRA, "middle", 800)}
</g>
${[
  ["1 · Deep De-Identification", "Scrub free-text patient reviews of names/dates; coarsen timestamps and rare subgroup cells.", NAVY, 14],
  ["2 · Code + Synthetic Data", "Publish your full Python pipeline with a synthetic Al Waha CSV when raw clinical rows are restricted.", GREEN, 170],
  ["3 · AI & Cloud Governance", "Never paste confidential patient rows or clinical text into public external AI chat windows.", INK, 326]
].map(([title, body, c, x], i) => `
  <g class="a o0 pl43" data-i="${i}" style="transform:translateY(10px)">
    ${card(x, 114, 140, 152, c, "#fff")}
    <rect x="${x}" y="114" width="140" height="30" rx="10" fill="${c}"/>
    ${t(x + 70, 134, title, 10.8, "#fff", "middle", 800)}
    ${fo(x + 10, 154, 120, 104, body, 11.2, INK, 600, "text-align:center")}
  </g>
`).join("")}
<g class="a o0 bt43">${card(14, 278, 452, 68, GREEN, "#EAF5EE")}${fo(28, 286, 424, 52, "<b>Section 2 Ethical Disclosure:</b> Always report your Institutional Review Board (IRB) approval number, data minimization protocol, and how patient confidentiality was protected.", 12.2, INK, 600, "text-align:center")}</g>`,
    render(r, b) {
      H.show(r, ".id43", b >= 2 || b === 0);
      H.q(r, ".pl43").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 4) || (i === 1 && b >= 5) || (i === 2 && b >= 6) || b <= 1;
        g.style.opacity = on ? 1 : 0.2;
        g.style.transform = on ? "none" : "translateY(10px)";
      });
      H.show(r, ".bt43", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s44 · subgroup errors and responsible deployment */
  SC.s44 = {
    copy: [
      { k: "Real-world impact", m: "Who is helped or harmed when managers act on a model?", s: "Statistical summaries have operational consequences.", l: "Real consequences" },
      { k: "Hidden by averages", m: "An overall MAE of 4.9 is an average across all test rows.", s: "A comforting average can mask severe misses in one subgroup.", l: "Averages hide misses" },
      { k: "Al Waha surges", m: "Error on routine shifts (≤85%) vs surge shifts (>85%, n = 478).", s: "Above 85% occupancy: Network MAE 5.18 (vs 4.77 ≤85%); Linear MAE 6.44 (vs 5.16 ≤85%).", l: "Surge MAE: 5.18 & 6.44" },
      { k: "Unfair evaluation", m: "Using a model to score wards or allocate nurse bonuses.", s: "Without auditing how the model behaves during emergency surges.", l: "High-stakes misuse" },
      { k: "Penalizing strain", m: "Black-box errors under overcrowding punish strained wards.", s: "Staff on the hardest night shifts get blamed for model blind spots.", l: "Unfair penalty" },
      { k: "Causal misreading", m: "Treating −1.23 as a reason to ignore staffing and handoffs.", s: "Focusing only on waiting-room clocks while wards remain understaffed.", l: "Misguided policy" },
      { k: "Disaggregate", m: "Report error metrics separately across key subgroups.", s: "By occupancy band, shift type, and clinic department.", l: "Subgroup audit" },
      { k: "Safe boundaries", m: "State which decisions your model can and cannot support.", s: "High-stakes deployment requires prospective trials and fairness audits.", l: "State safe use" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "subgroup error audit & responsible deployment · Al Waha hospital", 12, MUTED, "middle", 800)}
<g class="a o0 ch44">
  ${card(14, 34, 224, 226, EDGE, "#fff")}
  ${t(126, 56, "Disaggregated Held-Out Error", 12.5, NAVY, "middle", 800)}
  ${[
    ["Overall test set", "Net 4.91 · Linear 5.63 MAE", 115, NAVY, 82],
    ["Occupancy ≤ 85% (routine)", "Net 4.77 · Linear 5.16 MAE", 105, GREEN, 132],
    ["Occupancy > 85% (n = 478)", "Net 5.18 · Linear 6.44 MAE", 150, TERRA, 182]
  ].map(([lab, val, w, c, y]) => `
    ${t(26, y, lab, 11, INK, "start", 800)}
    <rect x="26" y="${y + 6}" width="${w}" height="18" rx="4" fill="${c}"/>
    ${t(26, y + 36, val, 10, MUTED, "start", 700)}
  `).join("")}
</g>
<g class="a o0 rk44">
  ${card(248, 34, 218, 108, TERRA, "#FCEFE9")}
  ${t(357, 56, "Risk 1 · Unfair Ward Penalties", 12, TERRA, "middle", 800)}
  ${fo(258, 64, 198, 70, "Judging ward staff by an unexplained model that errs most during >85% overcrowding penalizes the teams under greatest strain.", 11.2, INK, 600)}
  ${card(248, 152, 218, 108, GOLD, "#FFFDF5")}
  ${t(357, 174, "Risk 2 · Naive Causal Policy", 12, INK, "middle", 800)}
  ${fo(258, 182, 198, 70, "Treating the observational −1.23 slope as a standalone causal lever ignores the staffing and handoff shortages behind long waits.", 11.2, INK, 600)}
</g>
<g class="a o0 bt44">${card(14, 272, 452, 74, INK, INK)}${fo(28, 280, 424, 58, "<b style='color:#E8B04B'>Responsible Reporting Standard:</b> Always disaggregate MAE and RMSE across operational subgroups, and state explicitly which management decisions would require a controlled trial before deployment.", 12.2, "#fff", 600)}</g>`,
    render(r, b) {
      H.show(r, ".ch44", true);
      H.show(r, ".rk44", b >= 3 || b === 0);
      H.show(r, ".bt44", b >= 6);
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
  const CH = [["Question and design", "construct · proxy · why this design", "Design"], ["Data and screening", "every decision, its size, who was lost", "Data"], ["Method and assumptions", "the table, checked, and what you did", "Method"], ["Results", "estimate · interval · effect size · exact p · tests run", "Evidence"], ["Limitations", "what it cannot support · what would overturn it", "Synthesis"]];
  SC.s17 = {
    copy: [
      { k: "Your chapter", m: "Five sections, in this order.", s: "", l: "Five sections" },
      { k: "1", m: "Question and design.", s: "Don't name the construct and report only the proxy.", l: "Question" },
      { k: "2", m: "Data and screening.", s: "Never just “the data were cleaned”.", l: "Data" },
      { k: "3", m: "Method and assumptions.", s: "Checked, with what you did on failure.", l: "Method" },
      { k: "4", m: "Results.", s: "Significance never without a size beside it.", l: "Results" },
      { k: "5", m: "Limitations.", s: "What it cannot support, and what would overturn it.", l: "Limitations" },
      { k: "One workflow", m: "Every section draws on a distinct part of the workflow.", s: "Put together, they build a defensible analysis chapter.", l: "One complete chapter" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="30" y="16" width="420" height="328" rx="6" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(240, 42, "Your thesis · the analysis chapter", 15, NAVY, "middle", 800)}
${CH.map(([a, s, w], i) => `<g class="a o0 ch17" data-i="${i}" style="transform:translateX(-12px)"><rect x="46" y="${56 + i * 56}" width="388" height="48" rx="8" fill="${SKY}" fill-opacity=".55"/>${t(60, 76 + i * 56, (i + 1) + ". " + a, 15, INK, "start", 800)}${t(60, 95 + i * 56, s, 12, MUTED, "start", 700)}
  <g class="a o0 wk17"><rect x="${352}" y="${64 + i * 56}" width="74" height="22" rx="11" fill="${GOLD}"/>${t(389, 79 + i * 56, w, 11.5, INK, "middle", 800)}</g></g>`).join("")}`,
    render(r, b) { H.q(r, ".ch17").forEach(g => { const i = +g.dataset.i, on = b >= i + 1; g.style.opacity = on ? 1 : (b === 0 ? .25 : 0); g.style.transform = on ? "none" : "translateX(-12px)"; g.querySelector(".wk17").style.opacity = b >= 6 ? 1 : 0; g.querySelector(".wk17").style.transitionDelay = (i * .12) + "s"; }); }
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

  /* ------------------------------------------------------------ s45 · writing limitations that actually bite */
  const LIMS45 = [
    ["1 · Internal Validity (Unmeasured Confounding)", "−1.23 holds 5 covariates constant, but unmeasured patient illness severity at arrival could lengthen waits and lower satisfaction.", NAVY],
    ["2 · Functional Form (Linearity Assumption)", "The 6-predictor linear model forces a straight slope across bed occupancy, missing the steep drop above 80% capacity.", TERRA],
    ["3 · External Validity & Construct Proxy", "Episodes come from one hospital (Al Waha), and the satisfaction score is an imperfect proxy for clinical quality of care.", GREEN]
  ];
  SC.s45 = {
    copy: [
      { k: "Weak drafts", m: "“Sample size could be larger. Further research is needed.”", s: "Generic filler that appears in weak dissertations every year.", l: "Generic filler" },
      { k: "Throat-clearing", m: "Names no threat, no direction, and no boundary.", s: "Examiners reject apologies that avoid specific methodological limits.", l: "Throat-clearing" },
      { k: "What a limitation is", m: "Not an apology — a precise boundary map.", s: "Names the constraint, how it pulls your estimate, and where claims stop.", l: "Boundary map" },
      { k: "Three for Al Waha", m: "Internal validity, functional form, external validity.", s: "Each tied directly to our methods and numbers.", l: "Three boundaries" },
      { k: "1 · Unmeasured acuity", m: "Observational adjustment cannot rule out arrival severity.", s: "Unmeasured emergency acuity could account for part of the −1.23 slope.", l: "Unmeasured confounding" },
      { k: "2 · Functional form", m: "Linear regression misses the >80% occupancy cliff.", s: "Shown clearly by comparing the line with banded means and the network.", l: "Non-linear cliff" },
      { k: "3 · Generalizability", m: "Single hospital system and proxy survey measurement.", s: "Requires external validation before applying to other hospitals.", l: "External validity" },
      { k: "The anatomy", m: "Mechanism + effect on your number + safe interpretation.", s: "Every sentence tells the reader how to use your result responsibly.", l: "Specific & actionable" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 bd45">
  ${card(14, 16, 452, 52, TERRA, "#FCEFE9")}
  ${t(240, 36, "✗ THROAT-CLEARING (NEVER WRITE THIS)", 11, TERRA, "middle", 800)}
  ${t(240, 56, "“The sample could be larger, and further research is needed.”", 12.5, INK, "middle", 700)}
  <path d="M50 52 H430" stroke="${TERRA}" stroke-width="2.5"/>
</g>
${LIMS45.map(([title, body, c], i) => {
  const y = 78 + i * 68;
  return `<g class="a o0 lm45" data-i="${i}" style="transform:translateX(-12px)">
    ${card(14, y, 452, 60, c, "#fff")}
    <rect x="14" y="${y}" width="10" height="60" rx="4" fill="${c}"/>
    ${t(32, y + 21, title, 13, c, "start", 800)}
    ${fo(32, y + 26, 424, 32, body, 11.2, INK, 600)}
  </g>`;
}).join("")}
<g class="a o0 bt45">${card(14, 286, 452, 60, INK, INK)}${t(240, 310, "ANATOMY OF A DOCTORAL LIMITATION", 12, GOLD, "middle", 800)}${t(240, 331, "Specific methodological threat  →  Pull on your estimate  →  Boundary of claim", 12, "#fff", "middle", 700)}</g>`,
    render(r, b) {
      H.show(r, ".bd45", b >= 0);
      H.q(r, ".lm45").forEach(g => {
        const i = +g.dataset.i;
        const on = (b >= 3 && i === 0) || (b >= 5 && i === 1) || (b >= 6 && i === 2) || b === 0;
        g.style.opacity = on ? 1 : 0.18;
        g.style.transform = on ? "none" : "translateX(-12px)";
      });
      H.show(r, ".bt45", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s46 · conclusions and what would overturn them */
  const BLK46 = [
    ["1 · Answer in Real Units (Match the Estimand)", "Among Al Waha episodes matched on occupancy, staffing, handoffs, and training, each 10 min of waiting goes with 1.23 points lower satisfaction.", NAVY],
    ["2 · Guard Against Causal Slippage", "Never write in the final paragraph that cutting waiting time by 10 min is guaranteed to raise satisfaction by 1.23 points.", TERRA],
    ["3 · Synthesize Convergence & Divergence", "The negative waiting slope holds across sensitivity checks, while bed occupancy adds a steep non-linear drop above 80%.", GREEN],
    ["4 · State What Would Overturn the Conclusion", "“This conclusion would not survive if adjusting for arrival triage acuity reduced the slope below 0.5 pts / 10 min, or if next quarter's data failed to replicate it.”", INK]
  ];
  SC.s46 = {
    copy: [
      { k: "The final page", m: "How to write a conclusion that is clear and bulletproof.", s: "Usable by a hospital manager, defensible to an examiner.", l: "The conclusion" },
      { k: "Step 1", m: "Answer Question 1 in real units matching your estimand.", s: "Satisfaction points per 10 minutes among matched episodes.", l: "Answer in units" },
      { k: "On Al Waha", m: "Each 10 minutes of waiting goes with −1.23 points.", s: "Holding occupancy, staffing, handoffs, training, and age constant.", l: "−1.23 matched" },
      { k: "Step 2", m: "Never slip into a causal promise on the last page.", s: "Do not claim that cutting waits by 10 minutes guarantees +1.23 points.", l: "No causal slip" },
      { k: "Step 3", m: "Synthesize what converged and where models diverged.", s: "Robust waiting slope + non-linear occupancy cliff above 80%.", l: "Synthesize both" },
      { k: "Step 4", m: "Name the exact finding that would overturn your claim.", s: "The strongest paragraph in any empirical dissertation.", l: "What overturns it" },
      { k: "Al Waha example", m: "“This conclusion would not survive if arrival triage acuity…”", s: "“…reduced the slope below 0.5 points, or if external validation failed.”", l: "Would not survive if" },
      { k: "Falsifiability", m: "Stating how you could be proved wrong is true rigor.", s: "A claim with an explicit falsification test commands respect.", l: "Scientific rigor" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "four building blocks of a defensible doctoral conclusion", 12, MUTED, "middle", 800)}
${BLK46.map(([title, body, c], i) => {
  const y = 32 + i * 78, isLast = i === 3;
  return `<g class="a o0 bk46" data-i="${i}" style="transform:translateY(10px)">
    ${card(14, y, 452, 70, isLast ? GOLD : c, isLast ? INK : "#fff")}
    ${t(30, y + 21, title, 12.5, isLast ? GOLD : c, "start", 800)}
    ${fo(30, y + 27, 424, 40, body, 11.3, isLast ? "#fff" : INK, 600)}
  </g>`;
}).join("")}`,
    render(r, b) {
      H.q(r, ".bk46").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 1) || (i === 1 && b >= 3) || (i === 2 && b >= 4) || (i === 3 && b >= 5) || b === 0;
        g.style.opacity = on ? 1 : 0.18;
        g.style.transform = on ? "none" : "translateY(10px)";
      });
    }
  };

  /* ------------------------------------------------------------ s47 · try it: upgrade a weak limitation */
  const CLAIMS47 = [
    {
      title: "Claim 1 · Waiting-time adjusted slope (−1.23 pts / 10 min)",
      weak: "“A limitation of this study is that sample size could always be larger. Further research is needed on waiting times.”",
      strong: "“Because episodes are observational, unmeasured arrival triage acuity could confound waiting time and satisfaction. This conclusion would not survive if controlling for triage acuity reduced the slope below 0.5 pts / 10 min.”",
      whyWeak: "Names no specific threat to the −1.23 slope (5,200 rows is already large!) and offers no falsification condition.",
      whyStrong: "Names the exact unmeasured confounder (arrival triage acuity), the direction of bias, and the specific test that would overturn the claim."
    },
    {
      title: "Claim 2 · Bed occupancy linear slope across the hospital",
      weak: "“Linear regression was used to study bed occupancy. Future researchers could try other statistical packages.”",
      strong: "“The linear regression forces a straight line across bed occupancy, missing the steep drop above 80% shown by banded means (43.0) and the network (56.2). Linear estimates should not be extrapolated above 80% occupancy.”",
      whyWeak: "Treats a failed linearity assumption as a software preference rather than reporting where the straight line breaks down.",
      whyStrong: "Uses triangulation with the banded averages and neural network to bound where the linear model is and is not valid."
    },
    {
      title: "Claim 3 · Neural network prediction model (held-out MAE 4.9 pts)",
      weak: "“The neural network achieved the lowest MAE (4.9) and is therefore ready to grade hospital wards automatically.”",
      strong: "“While the network improved held-out MAE by 0.72 points over linear regression on internal splits, its weights are not directly interpretable and it lacks external validation across other quarters or hospitals.”",
      whyWeak: "Ignores explainability cost, subgroup errors during >85% surges, and the lack of external validation.",
      whyStrong: "Contextualizes the 0.72 MAE gain against the 16-point SD, notes the explainability trade-off, and requires external validation before deployment."
    }
  ];
  SC.s47 = {
    copy: [
      { k: "Your turn", m: "Select each of the three Al Waha findings.", s: "Compare throat-clearing against a doctoral limitation.", l: "Select a claim" },
      { k: "Your turn", m: "Choose the paragraph that states what would overturn it.", s: "See how an examiner grades each version.", l: "Upgrade the text" },
      { k: "Your turn", m: "Review all three claims.", s: "Then press Continue.", l: "Review, then continue" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 24, "doctoral limitation & falsification builder · Al Waha chapter", 12.5, MUTED, "middle", 800)}
${card(14, 34, 452, 44, NAVY, SKY)}
<text class="clTitle47" x="240" y="61" font-size="13.5" fill="${NAVY}" text-anchor="middle" font-weight="800"></text>
<g class="box47">
  ${card(14, 90, 452, 144, EDGE, "#fff")}
  <text class=" badge47" x="30" y="114" font-size="12" fill="${MUTED}" font-weight="800"></text>
  <foreignObject x="28" y="122" width="424" height="104"><div xmlns="http://www.w3.org/1999/xhtml" class="txt47" style="font:600 13.5px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.38"></div></foreignObject>
</g>
${card(14, 246, 452, 100, INK, INK)}
${t(30, 268, "EXAMINER ASSESSMENT", 11.5, GOLD, "start", 800)}
<foreignObject x="28" y="276" width="424" height="64"><div xmlns="http://www.w3.org/1999/xhtml" class="why47" style="font:600 12.5px Calibri,Segoe UI,sans-serif;color:#fff;line-height:1.35"></div></foreignObject>`,
    render(r) { if (!r._lm47) SC.s47.update(r, 0, "strong"); },
    update(r, idx, mode) {
      r._lm47 = true;
      const item = CLAIMS47[idx] || CLAIMS47[0];
      const ok = mode === "strong";
      r.querySelector(".clTitle47").textContent = item.title;
      r.querySelector(".badge47").textContent = ok ? "✓ RIGOROUS DOCTORAL LIMITATION & FALSIFICATION CONDITION" : "✗ WEAK THROAT-CLEARING / UNGUARDED CLAIM";
      r.querySelector(".badge47").setAttribute("fill", ok ? GREEN : TERRA);
      r.querySelector(".box47 rect").setAttribute("stroke", ok ? GREEN : TERRA);
      r.querySelector(".box47 rect").setAttribute("fill", ok ? "#EAF5EE" : "#FCEFE9");
      r.querySelector(".txt47").textContent = ok ? item.strong : item.weak;
      r.querySelector(".why47").innerHTML = ok ? `<b style="color:#6CCB92">Passes doctoral examination:</b> ${item.whyStrong}` : `<b style="color:#F08A62">Challenged in viva:</b> ${item.whyWeak}`;
      return { ok, item };
    }
  };

  /* ------------------------------------------------------------ s48 · defending your analysis in a doctoral viva */
  const VIVA48 = [
    ["Q1 · “Why not pick the neural network? It won on MAE.”", "My question was explanatory (requiring readable slopes); 0.72 MAE pts on an SD of 16 is modest, so I reported the network alongside as a benchmark.", NAVY],
    ["Q2 · “Linearity failed above 80% occupancy — why trust you?”", "We do not trust a straight line above 80%; Section 4.4 triangulates the regression with banded averages (43.0) and the network curve (56.2).", GREEN],
    ["Q3 · “Isn't −1.23 just unmeasured patient illness?”", "Observational adjustment cannot rule out arrival acuity; I state that boundary explicitly and name the triage score that would test it.", TERRA]
  ];
  SC.s48 = {
    copy: [
      { k: "The viva", m: "Two examiners, your open thesis, and your decisions.", s: "Testing whether you truly own every choice in your chapter.", l: "The oral defense" },
      { k: "What they test", m: "Examiners rarely fail a thesis over a modest R².", s: "They test honesty, question-method fit, and assumption checks.", l: "Honesty > high R²" },
      { k: "What fails", m: "Hiding failed checks or claiming cause from correlation.", s: "Or picking a black box when the research question asked “why?”.", l: "Why defenses fail" },
      { k: "Challenge 1", m: "“Why defend regression when the network won by 0.72 MAE?”", s: "A classic examiner test of Question 1 and Question 3.", l: "Challenge 1: model" },
      { k: "Your answer 1", m: "“My question was explanatory; 0.72 on SD 16 is small.”", s: "“And I reported the network beside it as a non-linear benchmark.”", l: "Defense 1: question fit" },
      { k: "Challenge 2", m: "“Your linear occupancy assumption failed above 80%!”", s: "“We showed that failure ourselves and triangulated with bands and network.”", l: "Defense 2: triangulation" },
      { k: "Challenge 3", m: "“Could −1.23 just be unmeasured patient severity?”", s: "“Yes — we state that boundary and the triage measure that would test it.”", l: "Defense 3: falsifiability" },
      { k: "No bluffing needed", m: "Transparency is your strongest defense in a viva.", s: "When your chapter already answers the adversarial prompt, you are ready.", l: "Transparency wins" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g>${card(14, 14, 452, 38, INK, INK)}${t(120, 38, "EXAMINER CHALLENGE", 12, GOLD, "middle", 800)}${t(348, 38, "CANDIDATE'S DOCTORAL DEFENSE", 12, "#6CCB92", "middle", 800)}</g>
${VIVA48.map(([q, a, c], i) => {
  const y = 60 + i * 74;
  return `<g class="a o0 vv48" data-i="${i}" style="transform:translateX(-10px)">
    ${card(14, y, 188, 66, TERRA, "#FCEFE9")}
    ${fo(22, y + 8, 172, 52, q, 11.2, TERRA, 800)}
    <path d="M202 ${y + 33} H216" stroke="${INK}" stroke-width="2.5"/>
    ${card(216, y, 250, 66, c, "#fff")}
    ${fo(226, y + 8, 232, 52, a, 11, INK, 600)}
  </g>`;
}).join("")}
<g class="a o0 bt48">${card(14, 286, 452, 60, GREEN, "#EAF5EE")}${fo(28, 294, 424, 46, "<b>The Viva Rule:</b> You never have to bluff when your chapter already states the estimand, compares models on identical rows, shows the diagnostic checks, and names what would overturn the claim.", 12, INK, 700, "text-align:center")}</g>`,
    render(r, b) {
      H.q(r, ".vv48").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 3) || (i === 1 && b >= 5) || (i === 2 && b >= 6) || b <= 2;
        g.style.opacity = on ? 1 : 0.18;
        g.style.transform = on ? "none" : "translateX(-10px)";
      });
      H.show(r, ".bt48", b >= 7);
    }
  };

  /* ------------------------------------------------------------ s49 · try it: face the viva examiner */
  const VIVA49 = [
    {
      q: "Examiner Challenge 1: “Table 4 shows the neural network beat your six-predictor regression by 0.95 RMSE and 0.72 MAE. Why didn't you throw away the regression and report only the network?”",
      opts: [
        ["✗ Bluff: “Because neural networks always overfit and cannot be trusted on hospital data.”", false, "False: our network was evaluated on the exact same held-out test rows and generalized well. Attacking a valid benchmark weakens your credibility."],
        ["✓ Doctoral Defense: “My research question was explanatory—estimating how each factor associates with satisfaction holding others constant. A 0.72 MAE gain on an SD of 16 did not justify losing readable slopes, so I reported the network alongside it as a non-linear benchmark.”", true, "Strong defense: connects directly to Question 1 (explanatory vs predictive), contextualizes 0.72 against the 16-point SD, and uses the network constructively for triangulation."],
        ["✗ Retreat: “You are right, I should delete the regression chapter and replace everything with the network.”", false, "Retreating abandons your explanatory research question! If your question asks what each input does, a black-box network alone cannot answer it."]
      ]
    },
    {
      q: "Examiner Challenge 2: “Your regression assumes a straight line for bed occupancy, yet your own plot shows satisfaction plunges steeply after 80% occupancy. Doesn't that invalidate your thesis?”",
      opts: [
        ["✗ Bluff: “The R² of the regression is 0.793, which is high enough that the linearity assumption does not matter.”", false, "A high overall R² never excuses a violated assumption! Above 80% occupancy, the straight line predicts 66.3 while actual satisfaction drops to 43.0."],
        ["✓ Doctoral Defense: “A straight line is indeed inadequate above 80% occupancy. That is why I checked the assumption, reported where it failed, triangulated it with banded averages and the network, and tested a quadratic occupancy specification in my sensitivity table.”", true, "Strong defense: shows you checked the assumption, disclosed the failure mode, used triangulation to reveal the >80% cliff, and verified robustness."],
        ["✗ Hide it: “I can remove the banded averages plot from the final version so the chapter looks consistent.”", false, "Hiding diagnostic plots or discordant evidence is research misconduct. Productive disagreement between methods is one of the strongest discoveries in your thesis."]
      ]
    },
    {
      q: "Examiner Challenge 3: “How do I know your −1.23 waiting-time slope isn't just unmeasured patient severity, or a lucky train-test split out of forty tries?”",
      opts: [
        ["✓ Doctoral Defense: “First, the split was fixed once outside the loop and checked across 50 repeated splits (range 0.46) and appendix sensitivity specs. Second, −1.23 is explicitly reported as a conditional association, and Section 4.5 states that arrival triage acuity could overturn it if the adjusted slope fell below 0.5.”", true, "Complete doctoral defense: separates split uncertainty (handled by reproducible paired splits) from unmeasured confounding (bounded honestly with an explicit falsification condition)."],
        ["✗ Overclaim: “Holding five variables constant proves mathematically that waiting time causes the 1.23-point drop.”", false, "Never claim causal proof from observational covariate adjustment: unmeasured confounders can always remain."],
        ["✗ Vague: “Further research is needed with a larger sample size.”", false, "Throat-clearing! A larger sample size from the same observational process will not remove unmeasured confounding or explain your split protocol."]
      ]
    }
  ];
  SC.s49 = {
    copy: [
      { k: "Your turn", m: "Step into the viva room: three examiner challenges.", s: "Pick the strongest defense for each challenge.", l: "Viva challenge" },
      { k: "Your turn", m: "Defend with methodological honesty, not bluffing.", s: "Read the examiner panel's feedback after each choice.", l: "Choose your defense" },
      { k: "Your turn", m: "Complete all three viva challenges.", s: "Then press Continue.", l: "Complete all three" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 22, "doctoral viva examination room · Al Waha thesis defense", 12.5, MUTED, "middle", 800)}
${person(46, 118, TERRA, 1.05)}
${card(82, 32, 384, 86, TERRA, "#FCEFE9")}
${t(96, 52, "EXTERNAL EXAMINER", 11, TERRA, "start", 800)}
<foreignObject x="96" y="56" width="358" height="58"><div xmlns="http://www.w3.org/1999/xhtml" class="vq49" style="font:700 12px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.3"></div></foreignObject>
${person(434, 222, NAVY, 1.05)}
<g class="vaBox49">
  ${card(14, 130, 384, 98, NAVY, "#fff")}
  <text class="vaTag49" x="28" y="150" font-size="11" fill="${NAVY}" font-weight="800"></text>
  <foreignObject x="28" y="156" width="358" height="66"><div xmlns="http://www.w3.org/1999/xhtml" class="va49" style="font:600 11.8px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.3"></div></foreignObject>
</g>
${card(14, 240, 452, 106, INK, INK)}
<text class="verdTag49" x="28" y="264" font-size="12" fill="${GOLD}" font-weight="800"></text>
<foreignObject x="28" y="272" width="424" height="68"><div xmlns="http://www.w3.org/1999/xhtml" class="verd49" style="font:600 12.2px Calibri,Segoe UI,sans-serif;color:#fff;line-height:1.35"></div></foreignObject>`,
    render(r) { if (!r._vv49) SC.s49.update(r, 0, 1); },
    update(r, qIdx, optIdx) {
      r._vv49 = true;
      const item = VIVA49[qIdx] || VIVA49[0];
      const [ansTxt, ok, why] = item.opts[optIdx] || item.opts[0];
      r.querySelector(".vq49").textContent = item.q;
      r.querySelector(".vaTag49").textContent = ok ? "YOUR RESPONSE · TRANSPARENT DOCTORAL DEFENSE ✓" : "YOUR RESPONSE · FLAWED DEFENSE ✗";
      r.querySelector(".vaTag49").setAttribute("fill", ok ? GREEN : TERRA);
      r.querySelector(".vaBox49 rect").setAttribute("stroke", ok ? GREEN : TERRA);
      r.querySelector(".vaBox49 rect").setAttribute("fill", ok ? "#EAF5EE" : "#FCEFE9");
      r.querySelector(".va49").textContent = ansTxt;
      r.querySelector(".verdTag49").textContent = ok ? "EXAMINER PANEL VERDICT: STRONG PASS ✓" : "EXAMINER PANEL VERDICT: FOLLOW-UP OBJECTION ⚠";
      r.querySelector(".verdTag49").setAttribute("fill", ok ? "#6CCB92" : "#F08A62");
      r.querySelector(".verd49").textContent = why;
      return { ok, why };
    }
  };

  /* ------------------------------------------------------------ s19 · two prompts */
  SC.s19 = {
    copy: [
      { k: "Core habit", m: "Two prompts for checking your work.", s: "", l: "Two prompts" },
      { k: "Verification", m: "Which assumptions does it need, and does my output show I checked each?", s: "", l: "Verification" },
      { k: "Adversarial", m: "What is the strongest reason not to trust this result?", s: "", l: "Adversarial" },
      { k: "Before your supervisor", m: "“This conclusion would not survive if …”", s: "Often the strongest paragraph in the chapter.", l: "Would not survive if" },
      { k: "The rule", m: "Whatever the helper says, you write the response.", s: "Every time.", l: "You write it" }
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
      { k: "The boundary", m: "You decide; ChatGPT assists.", s: "", l: "The table" },
      { k: "You do this", m: "Question, method, code, diagnostics, assumptions, interpretation, checking.", s: "", l: "Your side" },
      { k: "The helper may", m: "Explain, suggest, extend when told exactly how.", s: "", l: "Helper's side" },
      { k: "Every time", m: "Every row on the left stays on the left.", s: "That is the point.", l: "That is the point" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 lf20">${card(14, 18, 222, 324, NAVY)}${t(125, 44, "you do this", 15, NAVY, "middle", 800)}${LEFT.map((s, i) => `<circle cx="34" cy="${74 + i * 38}" r="6" fill="${NAVY}"/>${t(48, 79 + i * 38, s, 13, INK, "start", 700)}`).join("")}</g>
<g class="a o0 rt20">${card(244, 18, 222, 324, GREEN)}${t(355, 44, "the helper may", 15, GREEN, "middle", 800)}${RIGHT.map((s, i) => `<circle cx="264" cy="${74 + i * 38}" r="6" fill="${GREEN}"/>${t(278, 79 + i * 38, s, 13, INK, "start", 700)}`).join("")}</g>
<g class="a o0 st20" style="transform:scale(1.4)"><g transform="rotate(-6 355 180)"><rect x="270" y="161" width="170" height="38" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(355, 186, "STAYS LEFT", 17, TERRA, "middle", 800)}</g></g>`,
    render(r, b) { H.show(r, ".lf20", b >= 1 || b === 0); H.set(r, ".lf20", "opacity", b === 0 ? ".4" : "1"); H.show(r, ".rt20", b >= 2); H.set(r, ".rt20", "opacity", b === 2 ? "1" : b === 3 ? ".35" : "0"); H.show(r, ".st20", b >= 3); H.tf(r, ".st20", b >= 3 ? "none" : "scale(1.4)"); }
  };

  /* ------------------------------------------------------------ s21 · quiz (14 questions) */
  SC.s21 = {
    copy: [
      { k: "Quiz", m: "Fourteen questions.", s: "Covering synthesis, estimands, splits, forks, standards, and the viva.", l: "14 questions" },
      { k: "Quiz", m: "Read the explanation after each answer.", s: "Take your time.", l: "Quiz" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="bob">${card(130, 64, 220, 196, NAVY)}${t(240, 156, "14", 68, NAVY, "middle", 800)}${t(240, 198, "questions", 18, MUTED)}${t(240, 224, "synthesis & reporting", 12.5, NAVY, "middle", 700)}</g>
${Array.from({ length: 14 }, (_, i) => `<circle cx="${110 + i * 20}" cy="292" r="6" fill="${[NAVY, TERRA, GOLD, GREEN][i % 4]}"/>`).join("")}`,
    render() {}
  };

  /* ------------------------------------------------------------ s22 · takeaways */
  const TK = [
    ["Name the estimand & question first", "different methods estimate different targets", NAVY],
    ["Triangulate with methods that can disagree", "convergent evidence needs independent assumptions", GREEN],
    ["Same held-out rows · CIs · MAE & RMSE", "paired splits or CV, in the outcome's real units", GOLD],
    ["Reproducible code · STROBE/TRIPOD · ethics", "report the search and what would overturn your claim", TERRA],
    ["You decide; the helper assists", "now write the analysis plan for your own doctorate", INK]
  ];
  SC.s22 = {
    copy: [
      { k: "Five ideas", m: "Five ideas to keep from this chapter.", s: "", l: "Takeaways" },
      { k: "1", m: "Name the estimand and state the question first.", s: "Different methods estimate different targets.", l: "Question & estimand" },
      { k: "2", m: "Triangulate: agreement counts only if methods could disagree.", s: "Seek convergent evidence across different assumptions.", l: "Triangulation" },
      { k: "3", m: "Same held-out rows across repeated splits or CV.", s: "Report effect sizes with 95% CIs plus MAE and RMSE in real units.", l: "Same rows & units" },
      { k: "4", m: "Reproducible code, STROBE or TRIPOD, ethics, and the search.", s: "And write the finding that would overturn your conclusion.", l: "Standards & search" },
      { k: "5", m: "You decide; the helper assists.", s: "Now write the analysis plan for your own doctoral research. Good luck.", l: "Good luck" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${TK.map(([a, s, c], i) => `<g class="a o0 tk22" data-i="${i}" style="transform:translateX(-16px)">${card(24, 22 + i * 66, 432, 56, c)}<circle cx="54" cy="${50 + i * 66}" r="16" fill="${c}"/>${t(54, 56 + i * 66, i + 1, 15, "#fff")}${t(82, 46 + i * 66, a, 15, INK, "start", 800)}${t(82, 66 + i * 66, s, 12.2, MUTED, "start", 700)}</g>`).join("")}`,
    render(r, b) { H.q(r, ".tk22").forEach(g => { const on = b >= +g.dataset.i + 1; g.style.opacity = on ? 1 : .15; g.style.transform = on ? "none" : "translateX(-16px)"; }); }
  };
})();
