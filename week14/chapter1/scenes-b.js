/* Week 14 · Chapter 4 animated scenes, part B (s12–s23). Uses window.SCH from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, W = window.W14, S = W.slide;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");

  /* ------------------------------------------------------------ s12 · scale the inputs */
  // two "volume" bars: raw spread of waiting (≈ 20–167 min) vs staff ratio (≈ 0.6–2.0)
  SC.s12 = {
    copy: [
      { k: "Scaling", m: "One rule matters more for a network: scale the inputs.", s: "A regression shrugs. A network does not.", l: "Scale first" },
      { k: "Units", m: "Waiting: 20 to 160+ minutes. Staff ratio: 0.6 to 2.", s: "Same importance, wildly different numbers.", l: "Different units" },
      { k: "Unscaled", m: "Waiting shouts. Staff ratio whispers.", s: "Early steps fight the units, not the pattern.", l: "Shout vs whisper" },
      { k: "Standardise", m: "Subtract the mean, divide by the spread.", s: "Every input now speaks at the same volume.", l: "z = (x − mean) ÷ sd" },
      { k: "Quietly worse", m: `No crash. RMSE just rises from ${fx(S.net.rmse)} to ${fx(S.unscaled)}.`, s: "That is why the mistake goes unnoticed.", l: `${fx(S.net.rmse)} → ${fx(S.unscaled)}` }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${["waiting time", "staff ratio"].map((n, i) => `<g>${card(16, 40 + i * 120, 448, 100, EDGE)}${t(32, 68 + i * 120, n, 16, INK, "start", 800)}
  <text class="rg12" data-i="${i}" x="32" y="${92 + i * 120}" font-size="13" fill="${MUTED}" font-weight="700"></text>
  <rect x="180" y="${84 + i * 120}" width="270" height="22" rx="11" fill="#EFE9DD"/>
  <rect class="vb12" data-i="${i}" x="180" y="${84 + i * 120}" width="0" height="22" rx="11" fill="${i ? GREEN : TERRA}" style="transition:width 1s cubic-bezier(.3,.8,.25,1)"/>
  <g class="a o0 ic12" data-i="${i}">${i ? t(440, 76 + i * 120, "🔈 whisper", 13, GREEN, "end", 800) : t(440, 76, "📢 SHOUTS", 13, TERRA, "end", 800)}</g></g>`).join("")}
<g class="a o0 z12" style="transform:translateY(10px)">${card(70, 286, 340, 50, NAVY, SKY)}${t(240, 317, "z = (x − mean) ÷ spread", 18, NAVY, "middle", 800)}</g>
<g class="a o0 rs12" style="transform:scale(.85)">${card(70, 280, 340, 64, TERRA, "#FCEFE9")}${t(240, 306, "held-out RMSE", 13, MUTED)}${t(240, 330, `scaled ${fx(S.net.rmse)}   ·   unscaled ${fx(S.unscaled)}`, 17, TERRA, "middle", 800)}</g>`,
    render(r, b) {
      const R = b >= 3 ? ["−2 to +2 (standardised)", "−2 to +2 (standardised)"] : ["20 to 167 minutes", "0.6 to 2.0"];
      H.q(r, ".rg12").forEach(e => { e.textContent = b >= 1 ? R[+e.dataset.i] : ""; });
      const wv = b >= 3 ? [150, 150] : b >= 1 ? [270, 4] : [0, 0];
      H.q(r, ".vb12").forEach(e => e.setAttribute("width", wv[+e.dataset.i]));
      H.show(r, ".ic12", b === 2);
      H.show(r, ".z12", b === 3); H.tf(r, ".z12", b === 3 ? "none" : "translateY(10px)");
      H.show(r, ".rs12", b >= 4); H.tf(r, ".rs12", b >= 4 ? "none" : "scale(.85)");
    }
  };

  /* ------------------------------------------------------------ s13 · the pipeline */
  const PIPE = [["fill the gaps", "SimpleImputer", GOLD], ["standardise", "StandardScaler", NAVY], ["train", "MLPRegressor", TERRA]];
  SC.s13 = {
    copy: [
      { k: "Pipeline", m: "Three steps chained into one: fill, standardise, train.", s: "make_pipeline(...)", l: "One pipeline" },
      { k: "Learn", m: "Means and spreads come from the training rows only.", s: "fit() on the training rows.", l: "Fit on train" },
      { k: "Apply", m: "The same numbers are applied to the test rows.", s: "The test rows never help choose them.", l: "Apply to test" },
      { k: "Week 11's rule", m: "Split before you fit now protects the scaling too.", s: "A linear model needs no scaler. A network does.", l: "Split before fit" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="18" y="128" width="444" height="74" rx="37" fill="#fff" stroke="${INK}" stroke-width="3"/>
${PIPE.map(([a, f, c], i) => `<g class="a o0 pp13" style="transition-delay:${i * .3}s"><rect x="${32 + i * 146}" y="138" width="132" height="54" rx="27" fill="${c}"/>${t(98 + i * 146, 162, a, 15, i === 0 ? INK : "#fff", "middle", 800)}${t(98 + i * 146, 181, f, 11, i === 0 ? INK : "#fff", "middle", 600)}</g>`).join("")}
<g class="a o0 tr13" style="transform:translateX(-30px)">${card(18, 34, 200, 70, NAVY, SKY)}${t(118, 58, "training rows · 3,900", 14, NAVY, "middle", 800)}${t(118, 82, "mean and spread learned here", 12, MUTED)}
  <path d="M118 104 V126" stroke="${NAVY}" stroke-width="3" marker-end="url(#ar13)"/></g>
<g class="a o0 te13" style="transform:translateX(30px)">${card(262, 230, 200, 70, TERRA)}${t(362, 254, "test rows · 1,300", 14, TERRA, "middle", 800)}${t(362, 278, "same numbers, applied only", 12, MUTED)}
  <path d="M362 204 V228" stroke="${TERRA}" stroke-width="3"/></g>
<g class="a o0 lk13">${card(18, 230, 220, 70, GREEN, "#EAF5EE")}${fo(28, 236, 202, 60, "✓ the test rows never touch the scaler's numbers", 14, GREEN, 800)}</g>
<g class="a o0 nt13">${card(60, 310, 360, 40, INK, INK)}${t(240, 336, "linear model: no scaler needed · network: needed", 14, GOLD, "middle", 800)}</g>
<defs><marker id="ar13" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${NAVY}"/></marker></defs>`,
    render(r, b) {
      H.show(r, ".pp13", true);
      H.show(r, ".tr13", b >= 1); H.tf(r, ".tr13", b >= 1 ? "none" : "translateX(-30px)");
      H.show(r, ".te13", b >= 2); H.tf(r, ".te13", b >= 2 ? "none" : "translateX(30px)"); H.show(r, ".lk13", b >= 2); H.delay(r, ".lk13", b >= 2 ? .8 : 0);
      H.show(r, ".nt13", b >= 3);
    }
  };

  /* ------------------------------------------------------------ s14 · results */
  const RES = [["Week 9 linear", S.lin.rmse, NAVY, "R² " + S.lin.r2], ["neural network", S.net.rmse, GREEN, "R² " + S.net.r2], ["network, unscaled", S.unscaled, GOLD, ""], ["spread of satisfaction", S.spread, GREY, "for scale"]];
  const BX = v => 196 + v * 15.5;
  SC.s14 = {
    copy: [
      { k: "The result", m: `${S.ntest.toLocaleString("en-US")} held-out episodes.`, s: "Held-out RMSE, in satisfaction points. Shorter is better.", l: "Held-out RMSE" },
      { k: "Baseline", m: `Week 9's linear model: ${fx(S.lin.rmse, 3)} points off.`, s: `R² ${S.lin.r2}.`, l: `Linear ${fx(S.lin.rmse, 2)}` },
      { k: "The network", m: `${fx(S.net.rmse, 3)} points off. R² ${S.net.r2} against ${S.lin.r2}.`, s: "Better on rows it had never seen.", l: `Network ${fx(S.net.rmse, 2)}` },
      { k: "Unscaled", m: `${fx(S.unscaled, 3)}: worse, but still beats the linear model.`, s: "That is why the mistake hides.", l: `Unscaled ${fx(S.unscaled, 2)}` },
      { k: "For scale", m: `${fx(S.lin.rmse - S.net.rmse)} points better, on a spread of ${fx(S.spread, 1)}.`, s: "Real, and small.", l: "Real, and small" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 30, "held-out RMSE (points off, on average)", 14, MUTED, "middle", 800)}
${RES.map(([n, v, c, s], i) => `<g class="a o0 rb14" data-i="${i}" style="transform:translateX(-12px)">${t(186, 84 + i * 66, n, 14, INK, "end", 800)}${s ? t(186, 102 + i * 66, s, 11.5, MUTED, "end", 700) : ""}
  <rect class="br14" x="196" y="${66 + i * 66}" width="${BX(v) - 196}" height="34" rx="6" fill="${c}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform 1s cubic-bezier(.3,.8,.25,1) .2s"/>
  ${t(BX(v) + 8 > 440 ? BX(v) - 8 : BX(v) + 8, 89 + i * 66, fx(v, 3), 15, i === 3 ? "#fff" : i === 2 ? "#9A6B12" : c, BX(v) + 8 > 440 ? "end" : "start", 800)}</g>`).join("")}
<g class="a o0 gp14"><path d="M${BX(S.net.rmse)} 192 V60 M${BX(S.lin.rmse)} 60 V126" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 3"/>
  <path d="M${BX(S.net.rmse)} 56 H${BX(S.lin.rmse)}" stroke="${TERRA}" stroke-width="3"/>${t((BX(S.net.rmse) + BX(S.lin.rmse)) / 2, 50, fx(S.lin.rmse - S.net.rmse) + " better", 13, TERRA, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".rb14").forEach(g => { const i = +g.dataset.i, on = b === 0 ? false : (i === 0 ? b >= 1 : i === 1 ? b >= 2 : i === 2 ? b >= 3 : b >= 4); g.style.opacity = on ? 1 : (b === 0 ? .25 : 0); g.style.transform = on ? "none" : "translateX(-12px)"; g.querySelector(".br14").style.transform = on ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".gp14", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s15 · what the accuracy costs */
  const COEF = [["waiting", "−1.23 per 10 min"], ["staff ratio", "?"], ["training", "?"], ["occupancy", "?"], ["handoffs", "?"], ["prior visits", "?"]];
  const rnd = (i) => { const s = Math.sin(i * 12.9898) * 43758.5453; return s - Math.floor(s); };
  SC.s15 = {
    copy: [
      { k: "The price", m: "What did the extra accuracy cost?", s: "", l: "The price" },
      { k: "Week 9", m: "Six coefficients you can read, report and defend.", s: "10 more minutes of waiting: about 1 point less satisfaction.", l: "Readable" },
      { k: "The network", m: `${W.params} weights. None means anything alone.`, s: "There is no number for “the effect of waiting”.", l: `${W.params} weights` },
      { k: "The trade", m: "About 1 point of accuracy for the ability to say why.", s: "Week 15 makes you decide whether it is worth it.", l: "Accuracy vs why" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 lf15">${card(14, 30, 200, 290, NAVY)}${t(114, 56, "Week 9 · regression", 14, NAVY, "middle", 800)}
  ${COEF.map(([n, v], i) => `<g>${t(28, 92 + i * 36, n, 13.5, INK, "start", 700)}${i === 0 ? t(200, 92, v, 13.5, GREEN, "end", 800) : t(200, 92 + i * 36, "a number", 12.5, MUTED, "end", 700)}</g>`).join("")}
  <g class="a o0 ok15">${t(114, 312, "✓ each one has a meaning", 13, GREEN, "middle", 800)}</g></g>
<g class="a o0 rt15">${card(228, 30, 238, 290, TERRA)}${t(347, 56, "network · " + W.params + " weights", 14, TERRA, "middle", 800)}
  ${Array.from({ length: 168 }, (_, i) => { const v = rnd(i + 1) * 2 - 1; return `<text x="${244 + (i % 12) * 18.5}" y="${84 + Math.floor(i / 12) * 15.5}" font-size="9" fill="${v < 0 ? TERRA : NAVY}" fill-opacity="${.45 + Math.abs(v) * .5}" font-weight="700">${v.toFixed(1)}</text>`; }).join("")}
  <g class="a o0 no15">${t(347, 312, "✗ none means anything alone", 13, TERRA, "middle", 800)}</g></g>
<g class="a o0 sc15" style="transform:scale(.9)">${card(60, 120, 360, 110, INK, INK)}
  ${t(150, 160, "+0.95 points", 22, GREEN, "middle", 800)}${t(150, 184, "of accuracy", 13, "#fff")}
  ${t(240, 176, "⇄", 30, GOLD, "middle", 800)}
  ${t(330, 160, "“why?”", 22, TERRA, "middle", 800)}${t(330, 184, "you can no longer answer", 13, "#fff")}
  ${t(240, 216, "worth it? Week 15 decides", 13, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".lf15", b >= 1 || b === 0); H.set(r, ".lf15", "opacity", b === 0 ? ".3" : b === 3 ? ".25" : "1"); H.show(r, ".ok15", b >= 1);
      H.show(r, ".rt15", b >= 2); H.set(r, ".rt15", "opacity", b === 2 ? "1" : b === 3 ? ".25" : "0"); H.show(r, ".no15", b >= 2);
      H.show(r, ".sc15", b >= 3); H.tf(r, ".sc15", b >= 3 ? "none" : "scale(.9)");
    }
  };

  /* ------------------------------------------------------------ s16 · overfitting */
  const OF = W.overfit, PX = ep => 76 + Math.log10(ep / 10) / Math.log10(300) * 370, PY = v => 300 - v * (250 / 75);
  SC.s16 = {
    copy: [
      { k: "One more danger", m: "It hides in the training error.", s: "", l: "Training error" },
      { k: "The set-up", m: `${W.overfitParams.toLocaleString("en-US")} weights, only ${W.overfitN} episodes.`, s: "A much bigger network, on far too few rows.", l: `${W.overfitN} rows` },
      { k: "Training error", m: `Falls and falls, to ${fx(OF[OF.length - 1][1], 1)} points.`, s: "It looks brilliant.", l: "Looks brilliant" },
      { k: "New episodes", m: `Stops early, then climbs back to ${Math.round(OF[OF.length - 1][2])} points off.`, s: `It memorised ${W.overfitN} patients instead of learning.`, l: "Memorised" },
      { k: "Overfitting", m: "Check rows against weights. Trust only held-out error.", s: "Shrink the network, regularise, or stop early.", l: "Trust held-out" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M76 300 H456 M76 300 V44" stroke="${INK}" stroke-width="2"/>
${[0, 25, 50, 75].map(v => `<path d="M76 ${PY(v)} H456" stroke="${EDGE}" stroke-opacity=".5"/>${t(68, PY(v) + 4, v, 12, MUTED, "end", 700)}`).join("")}
${[10, 100, 1000, 3000].map(e => t(PX(e), 318, e.toLocaleString("en-US"), 12, MUTED)).join("")}
${t(266, 342, "training passes (log scale)", 13, INK, "middle", 800)}<text transform="translate(28 172) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">points off</text>
<g class="a o0 su16">${card(250, 52, 200, 52, NAVY, SKY)}${fo(260, 56, 184, 46, `${W.overfitParams.toLocaleString("en-US")} weights<br>trained on ${W.overfitN} episodes`, 14, NAVY, 800)}</g>
<path class="dr tr16" pathLength="1" d="${pathOf(OF.map(([e, a]) => [PX(e), PY(a)]))}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>
<g class="a o0 trl16">${t(PX(3000) - 4, PY(OF[OF.length - 1][1]) - 10, "training: " + fx(OF[OF.length - 1][1], 1), 13, NAVY, "end", 800)}</g>
<path class="dr te16" pathLength="1" d="${pathOf(OF.map(([e, , b]) => [PX(e), PY(b)]))}" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linejoin="round"/>
<g class="a o0 tel16">${t(PX(3000) - 4, PY(OF[OF.length - 1][2]) - 10, "new episodes: " + Math.round(OF[OF.length - 1][2]), 13, TERRA, "end", 800)}</g>
<g class="a o0 gap16"><path d="M${PX(3000) - 30} ${PY(OF[OF.length - 1][1]) + 4} V${PY(OF[OF.length - 1][2]) + 6}" stroke="${TERRA}" stroke-width="3" stroke-dasharray="5 4"/>${t(PX(3000) - 40, (PY(OF[OF.length - 1][1]) + PY(OF[OF.length - 1][2])) / 2 + 4, "the gap", 13, TERRA, "end", 800)}</g>
<g class="a o0 mn16"><circle cx="${PX(50)}" cy="${PY(OF[2][2])}" r="9" fill="none" stroke="${GOLD}" stroke-width="3" class="pulse2"/>${t(PX(50), PY(OF[2][2]) + 36, "best: stop here", 12, INK, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".su16", b >= 1); H.draw(r, ".tr16", b >= 2); H.show(r, ".trl16", b >= 2); H.delay(r, ".trl16", b >= 2 ? 1.6 : 0);
      H.draw(r, ".te16", b >= 3); H.show(r, ".tel16", b >= 3); H.delay(r, ".tel16", b >= 3 ? 1.6 : 0); H.show(r, ".gap16", b >= 3); H.delay(r, ".gap16", b >= 3 ? 2 : 0);
      H.show(r, ".mn16", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s17 · try it: five seeds */
  const SX = v => 60 + (v - 5.9) * (360 / 1.3);
  SC.s17 = {
    copy: [
      { k: "Random start", m: "Different seed, different model.", s: "So how much does the result move?", l: "Seeds" },
      { k: "Your turn", m: "Train the network five times.", s: "Then press Continue.", l: "Train × 5" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 34, "held-out RMSE of each run (points off)", 14, MUTED, "middle", 800)}
<path d="M40 210 H450" stroke="${INK}" stroke-width="2"/>
${[6.0, 6.2, 6.4, 6.6, 6.8, 7.0].map(v => `<path d="M${SX(v)} 210 v6" stroke="${INK}" stroke-width="2"/>${t(SX(v), 234, v.toFixed(1), 12, MUTED)}`).join("")}
<g>${`<path d="M${SX(S.lin.rmse)} 90 V210" stroke="${NAVY}" stroke-width="3" stroke-dasharray="6 4"/>`}${t(SX(S.lin.rmse) - 4, 84, "linear " + fx(S.lin.rmse), 13, NAVY, "end", 800)}</g>
<rect class="a o0 band17" x="${SX(6.05)}" y="110" width="${SX(6.17) - SX(6.05)}" height="96" fill="${GREEN}" fill-opacity=".14"/>
${S.seeds.map((v, i) => `<g class="a o0 sd17" data-i="${i}" style="transform:translateY(-60px)"><circle cx="${SX(v)}" cy="${190 - i * 16}" r="9" fill="${GREEN}" stroke="#fff" stroke-width="2"/>${t(SX(v) + 14, 194 - i * 16, "seed " + (i + 1) + ": " + v.toFixed(2), 11.5, INK, "start", 700)}</g>`).join("")}
<g class="a o0 sm17">${card(40, 262, 400, 76, INK, INK)}${fo(54, 268, 372, 66, `Spread across 5 seeds: <b style="color:#E8B04B">0.12 points</b>. Improvement over linear: <b style="color:#E8B04B">0.95</b>. Stable here, so the gain is real.`, 14.5, "#fff", 600)}</g>`,
    render(r, b) { if (r._n17 === undefined) SC.s17.update(r, 0); },
    update(r, n) {
      r._n17 = n;
      H.q(r, ".sd17").forEach(g => { const on = +g.dataset.i < n; g.style.opacity = on ? 1 : 0; g.style.transform = on ? "none" : "translateY(-60px)"; });
      H.show(r, ".band17", n >= 5); H.show(r, ".sm17", n >= 5);
      return n;
    }
  };

  /* ------------------------------------------------------------ s18 · four checks */
  const CK = [["Scaled?", "Scaler fitted on the training rows only."], ["Enough data?", "Rows vs weights. Watch held-out error."], ["Beats the baseline?", "Fit the linear model first."], ["Survives a new seed?", "Report mean and spread."]];
  SC.s18 = {
    copy: [
      { k: "Before you report", m: "Four checks. Every one, every time.", s: "", l: "Four checks" },
      { k: "Check 1", m: "Inputs scaled, scaler fitted on training rows only.", s: "Failure: unstable training, quietly worse error.", l: "Scaled" },
      { k: "Check 2", m: "Enough data for the number of weights.", s: "Failure: training error falls while held-out error rises.", l: "Enough data" },
      { k: "Check 3", m: "It beats the simpler model.", s: "If not, the simpler model is the answer.", l: "Beats baseline" },
      { k: "Check 4", m: "It survives a new seed.", s: "Report the mean and the spread, never one lucky run.", l: "Seeds" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${CK.map(([a, s], i) => `<g class="ck18" data-i="${i}">${card(30, 30 + i * 78, 420, 66, EDGE)}
  <g class="a o0 tk18" style="transform:scale(.4)"><circle cx="66" cy="${63 + i * 78}" r="18" fill="${GREEN}"/>${t(66, 70 + i * 78, "✓", 20, "#fff")}</g>
  <circle class="a em18" cx="66" cy="${63 + i * 78}" r="18" fill="none" stroke="${GREY}" stroke-width="2.5"/>
  ${t(98, 58 + i * 78, a, 17, INK, "start", 800)}${t(98, 81 + i * 78, s, 13, MUTED, "start", 700)}</g>`).join("")}`,
    render(r, b) {
      H.q(r, ".ck18").forEach(g => { const i = +g.dataset.i, on = b >= i + 1; g.style.opacity = b === 0 || on ? 1 : .35; g.querySelector(".tk18").style.opacity = on ? 1 : 0; g.querySelector(".tk18").style.transform = on ? "none" : "scale(.4)"; g.querySelector("rect").style.stroke = b === i + 1 ? TERRA : ""; g.querySelector("rect").style.strokeWidth = b === i + 1 ? "3" : ""; });
    }
  };

  /* ------------------------------------------------------------ s19 · try it: fix a broken script */
  const CODE = [[18, "net = make_pipeline("], [19, "    SimpleImputer(strategy=\"median\"),"], [20, "    StandardScaler(),"], [21, "    MLPRegressor((32, 16), random_state=42))"], [22, "net.fit(X_train, y_train)"]];
  SC.s19 = {
    copy: [
      { k: "Your turn", m: "This script will not run.", s: "Read the error before you change anything.", l: "Read the error" },
      { k: "A clue", m: "The error names loss, a word you never wrote.", s: "Find the cause, choose the fix, then press Continue.", l: "Find and fix" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="16" width="452" height="180" rx="12" fill="${INK}"/>
${CODE.map(([n, s], i) => `<g class="cl19" data-n="${n}"><rect class="hl19" x="20" y="${30 + i * 30}" width="440" height="26" rx="5" fill="${GOLD}" fill-opacity="0" style="transition:fill-opacity .4s"/>${t(44, 48 + i * 30, n, 13, GREY, "end", 700)}<text class="cx19" x="56" y="${48 + i * 30}" font-size="13" fill="#E8EDF3" font-family="Consolas,monospace" xml:space="preserve">${s.replace(/</g, "&lt;")}</text></g>`).join("")}
<g class="err19">${card(14, 206, 452, 100, TERRA, "#FCEFE9")}${t(30, 230, "InvalidParameterError", 15, TERRA, "start", 800)}
  ${fo(30, 238, 424, 64, "The 'loss' parameter of MLPRegressor must be a str among {'squared_error', 'poisson'}. Got (32, 16) instead.", 13, INK, 600, "font-family:Consolas,monospace")}</g>
<g class="a o0 ok19">${card(14, 312, 452, 38, GREEN, "#EAF5EE")}${t(240, 337, "✓ runs: hidden_layer_sizes=(32, 16), by name", 14, GREEN, "middle", 800)}</g>`,
    render(r, b) {},
    pick(r, n) { H.q(r, ".cl19").forEach(g => { g.querySelector(".hl19").style.fillOpacity = +g.dataset.n === n ? (n === 21 ? .35 : .18) : 0; }); },
    fix(r, ok) { const c = r.querySelector('.cl19[data-n="21"] .cx19'); c.textContent = ok ? "    MLPRegressor(hidden_layer_sizes=(32, 16), random_state=42))" : CODE[3][1]; c.setAttribute("font-size", ok ? "11.5" : "13");
      H.show(r, ".ok19", ok); H.set(r, ".err19", "opacity", ok ? ".3" : "1"); }
  };

  /* ------------------------------------------------------------ s20 · sentences */
  SC.s20 = {
    copy: [
      { k: "Your turn", m: "May you write it, or not?", s: "Four sentences from real reports.", l: "Decide for each" },
      { k: "Sentence 1", m: "“The network learned that waiting matters most.”", s: "It has no coefficient for waiting.", l: "No" },
      { k: "Sentence 2", m: "“The network is much better.”", s: "0.95 points, on a spread of 16. Say the number.", l: "No" },
      { k: "Sentence 3", m: "“Deep learning was applied.”", s: "Two small layers. Describe what you fitted.", l: "No" },
      { k: "Sentence 4", m: "“The model achieved R² of 0.85.”", s: "On held-out rows, with this seed. State both.", l: "Half true" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${["learned that waiting matters most", "much better", "deep learning was applied", "R² of 0.85"].map((s, i) => `<g class="sn20" data-i="${i}">${card(30, 30 + i * 76, 420, 62, EDGE)}${t(52, 68 + i * 76, "“" + s + "”", 16, INK, "start", 800)}
  <g class="a o0 x20" style="transform:scale(1.6)"><g transform="rotate(-8 400 ${61 + i * 76})"><rect x="352" y="${46 + i * 76}" width="96" height="30" rx="6" fill="#fff" stroke="${i === 3 ? GOLD : TERRA}" stroke-width="3"/>${t(400, 67 + i * 76, i === 3 ? "HALF TRUE" : "NO", 14, i === 3 ? "#9A6B12" : TERRA, "middle", 800)}</g></g></g>`).join("")}`,
    render(r, b) { H.q(r, ".sn20").forEach(g => { const i = +g.dataset.i, on = b >= i + 1, x = g.querySelector(".x20"); x.style.opacity = on ? 1 : 0; x.style.transform = on ? "none" : "scale(1.6)"; g.querySelector("rect").style.stroke = b === i + 1 ? TERRA : ""; }); }
  };

  /* ------------------------------------------------------------ s21 · you decide, ChatGPT assists */
  SC.s21 = {
    copy: [
      { k: "Every week", m: "You decide. The helper assists.", s: "", l: "You decide" },
      { k: "A good question", m: "“Explain what max_iter controls, and what a ConvergenceWarning means.”", s: "Explaining a setting.", l: "Good" },
      { k: "A bad question", m: "“Tune this network for me.”", s: "Tuning on held-out rows destroys your only honest number.", l: "Bad" },
      { k: "Stays with you", m: "Is the accuracy worth the loss of explanation?", s: "That is interpreting the result. It stays on your side.", l: "Your call" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${person(80, 330, NAVY, 2.2)}${t(80, 350, "you", 14, NAVY, "middle", 800)}
<g class="a o0 g21" style="transform:translateY(10px)">${card(150, 30, 316, 92, GREEN, "#EAF5EE")}${t(166, 54, "✓ good", 14, GREEN, "start", 800)}${fo(166, 60, 290, 58, "“Explain what max_iter controls, and what a ConvergenceWarning means if it appears.”", 14, INK, 600)}</g>
<g class="a o0 b21" style="transform:translateY(10px)">${card(150, 136, 316, 70, TERRA, "#FCEFE9")}${t(166, 160, "✗ bad", 14, TERRA, "start", 800)}${fo(166, 166, 290, 36, "“Tune this network for me.”", 15, INK, 700)}</g>
<g class="a o0 y21" style="transform:translateY(10px)">${card(150, 220, 316, 96, INK, INK)}${fo(166, 230, 290, 80, "Is +0.95 points worth losing “why”? <b style='color:#E8B04B'>Interpreting the result stays with you.</b>", 15, "#fff", 600)}</g>`,
    render(r, b) { [[".g21", 1], [".b21", 2], [".y21", 3]].forEach(([s, k]) => { H.show(r, s, b >= k); H.tf(r, s, b >= k ? "none" : "translateY(10px)"); }); }
  };

  /* ------------------------------------------------------------ s22 · quiz (stage) */
  SC.s22 = {
    copy: [{ k: "Quiz", m: "Eight questions.", s: "Read the explanation after each answer.", l: "Quiz" }],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="bob">${H.card(140, 70, 200, 200, NAVY)}${t(240, 160, "8", 72, NAVY, "middle", 800)}${t(240, 200, "questions", 18, MUTED)}</g>
${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${156 + i * 24}" cy="250" r="7" fill="${[NAVY, TERRA, GOLD, GREEN][i % 4]}"/>`).join("")}`,
    render() {}
  };

  /* ------------------------------------------------------------ s23 · takeaways */
  const TK = [["One rule", "multiply, add, rule: the rule bends", NAVY], ["Found, not solved", "small steps downhill", GREEN], ["Scale in a pipeline", "judge on held-out rows", GOLD], ["Baseline first", "beat it by more than the seed spread", TERRA], ["Accuracy has a price", "it predicts; it cannot say why", INK]];
  SC.s23 = {
    copy: [
      { k: "Five ideas", m: "What to keep from this chapter.", s: "", l: "Takeaways" },
      { k: "1", m: "A neuron multiplies, adds a bias, applies one rule.", s: "The rule lets the network bend.", l: "One rule" },
      { k: "2", m: "The weights are found, not solved.", s: "Small corrections, walking downhill.", l: "Downhill" },
      { k: "3", m: "Scale inside a pipeline. Judge on held-out rows.", s: "", l: "Pipeline" },
      { k: "4", m: "Fit the simpler model first.", s: "Beat it by more than the spread across seeds.", l: "Baseline" },
      { k: "5", m: "A network predicts. It cannot tell you why.", s: "Next week: when is that price worth paying?", l: "The price" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${TK.map(([a, s, c], i) => `<g class="a o0 tk23" data-i="${i}" style="transform:translateX(-16px)">${card(30, 22 + i * 66, 420, 56, c)}<circle cx="62" cy="${50 + i * 66}" r="16" fill="${c}"/>${t(62, 56 + i * 66, i + 1, 15, "#fff")}${t(92, 46 + i * 66, a, 16, INK, "start", 800)}${t(92, 66 + i * 66, s, 13, MUTED, "start", 700)}</g>`).join("")}`,
    render(r, b) { H.q(r, ".tk23").forEach(g => { const on = b >= +g.dataset.i + 1; g.style.opacity = on ? 1 : .15; g.style.transform = on ? "none" : "translateX(-16px)"; }); }
  };
})();
