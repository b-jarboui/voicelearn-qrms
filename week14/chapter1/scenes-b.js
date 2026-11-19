/* Week 14 · Chapter 4 animated scenes, part B (s12–s23). Uses window.SCH from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, W = window.W14, S = W.slide;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");

const {panel,path,dot,moving,move,textAt,layer,reveal,note}=H;
  SC.s12={copy:H.beats("Practice inputs and the Al Waha benchmark", [
      "Which difference looks bigger on paper?",
      "Minutes and ratios have different numerical scales.",
      "An equal weight change can move the two signals unequally.",
      ["Measure each distance from its own training mean.","z = (value − fitting mean) / fitting standard deviation"],
      "Compare the scaled and unscaled networks."
    ]),svg:panel("Give two measurements a common scale","Worked example   ·   compare a visit with its training group",
    ["Waiting time","Staff ratio"].map((name,i)=>{const y=118+i*84;return t(36,y,name,15,NAVY,"start")+path(`M161 ${y} H433`,EDGE,8)+
      moving("meter"+i,dot(0,y,8,i?GREEN:TERRA))+t(36,y+26,"",13,MUTED,"start",700,"units"+i)}).join("")+
    t(240,286,"",17,NAVY,"middle",800,"formula")+t(240,316,"",13,MUTED,"middle",700,"scale-detail")),
    render(r,b){
      const norm=b>=3;move(r,".meter0",norm?355:388,0);move(r,".meter1",norm?355:166,0);
      textAt(r,".units0",norm?"(60 − 50) / 10 = +1 SD":"60 minutes · training mean 50, SD 10");
      textAt(r,".units1",norm?"(1.2 − 1.1) / 0.1 = +1 SD":"1.2 staff ratio · training mean 1.1, SD 0.1");
      textAt(r,".formula",["Compare the numbers on one visit","Minutes and ratios use different units","An equal weight change acts on unequal inputs","Both values lie one training SD above average","Al Waha RMSE    6.124 scaled   ·   6.912 unscaled"][b]);
      textAt(r,".scale-detail",b>=3?"Use the fitting group’s mean and standard deviation.":"Practice inputs shown in their original units.");
    }
  };
  SC.s15={copy:H.beats("Al Waha · explaining a prediction", [
      "What happens when a wait gets longer?",
      "Trace one slope in the linear model.",
      "Trace several paths in the network.",
      "Weigh the error reduction against the work of explaining it."
    ]),svg:panel("A manager asks about ten extra minutes","Keep the other five inputs fixed for the same visit.",
    layer(0,3,note(36,101,150,"Waiting time","+10 minutes",TERRA))+
    layer(1,1,path("M187 130 H246",NAVY)+note(252,101,182,"Linear model","10 × waiting coefficient",NAVY))+
    layer(2,2,miniPaths())+layer(3,3,note(247,101,185,"RMSE reduction","0.947 points",GREEN))+
    t(240,295,"",15,NAVY,"middle",800,"trade")),
    render(r,b){reveal(r,b);textAt(r,".trade",["What changes in the prediction?","A fixed slope gives the same change per minute.","Which paths carry a change depends on the visit.","How much explanation does the manager need?"][b]);}
  };
  function miniPaths(){
    return [[211,130,290,99],[211,130,290,167],[290,99,392,132],[290,167,392,132]].map(([a,b,c,d])=>path(`M${a} ${b} L${c} ${d}`,NAVY,3,'class="flow"')).join("")+
      dot(211,130,8,TERRA)+dot(290,99,10,GREEN)+dot(290,167,10,NAVY)+dot(392,132,12,TERRA)+t(306,211,"Two active paths shown",13,MUTED);
  }

  /* ------------------------------------------------------------ s13 · the pipeline */
  const PIPE = [["fill the gaps", "SimpleImputer", GOLD], ["standardise", "StandardScaler", NAVY], ["train", "MLPRegressor", TERRA]];
  SC.s13 = {
    copy: H.beats("Al Waha · the preprocessing pipeline", [
      "Fill gaps, scale inputs, then fit.",
      "Learn the medians, means and spreads on the fitting rows.",
      "Apply the saved numbers to a new visit.",
      "One pipeline keeps the ruler with the model."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="18" y="128" width="444" height="74" rx="37" fill="#fff" stroke="${INK}" stroke-width="3"/>
${PIPE.map(([a, f, c], i) => `<g class="a o0 pp13" style="transition-delay:${i * .3}s"><rect x="${32 + i * 146}" y="138" width="132" height="54" rx="27" fill="${c}"/>${t(98 + i * 146, 162, a, 15, i === 0 ? INK : "#fff", "middle", 800)}${t(98 + i * 146, 181, f, 11, i === 0 ? INK : "#fff", "middle", 600)}</g>`).join("")}
<g class="a o0 tr13" style="transform:translateX(-30px)">${card(18, 34, 200, 70, NAVY, SKY)}${t(118, 58, "training rows · 3,900", 14, NAVY, "middle", 800)}${t(118, 82, "medians, means, spreads learned here", 11.5, MUTED)}
  <path d="M118 104 V126" stroke="${NAVY}" stroke-width="3" marker-end="url(#ar13)"/></g>
<g class="a o0 te13" style="transform:translateX(30px)">${card(262, 230, 200, 70, TERRA)}${t(362, 254, "test rows · 1,300", 14, TERRA, "middle", 800)}${t(362, 278, "same numbers, applied only", 12, MUTED)}
  <path d="M362 204 V228" stroke="${TERRA}" stroke-width="3"/></g>
<g class="a o0 lk13">${card(18, 230, 220, 70, GREEN, "#EAF5EE")}${fo(28, 236, 202, 60, "✓ the test rows never help set these numbers", 14, GREEN, 800)}</g>
<g class="a o0 nt13">${card(60, 310, 360, 40, INK, INK)}${t(240, 336, "Use the training ruler on every new visit.", 14, GOLD, "middle", 800)}</g>
<defs><marker id="ar13" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${NAVY}"/></marker></defs>`,
    render(r, b) {
      H.show(r, ".pp13", true);
      H.show(r, ".tr13", b >= 1); H.tf(r, ".tr13", b >= 1 ? "none" : "translateX(-30px)");
      H.show(r, ".te13", b >= 2); H.tf(r, ".te13", b >= 2 ? "none" : "translateX(30px)"); H.show(r, ".lk13", b >= 2); H.delay(r, ".lk13", b >= 2 ? .8 : 0);
      H.show(r, ".nt13", b >= 3);
    }
  };

  /* ------------------------------------------------------------ s14 · results */
  const RES = [["linear regression", S.lin.rmse, NAVY, "R² " + S.lin.r2], ["neural network", S.net.rmse, GREEN, "R² " + S.net.r2], ["network, unscaled", S.unscaled, GOLD, ""], ["SD of satisfaction", S.sd, GREY, "for scale"]];
  const BX = v => 196 + v * 15.5;
  SC.s14 = {
    copy: H.beats("Al Waha · same 1,300 test episodes", [
      "Compare both models in satisfaction points.",
      "Linear regression gives 7.071 RMSE.",
      "The scaled network gives 6.124.",
      "Without scaling the network gives 6.912.",
      ["Read the 0.947-point reduction beside the outcome SD of 16.048.","The grey bar gives the spread of satisfaction scores."]
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 30, "held-out RMSE (satisfaction points, slides)", 14, MUTED, "middle", 800)}
${RES.map(([n, v, c, s], i) => `<g class="a o0 rb14" data-i="${i}" style="transform:translateX(-12px)">${t(186, 84 + i * 66, n, 14, INK, "end", 800)}${s ? t(186, 102 + i * 66, s, 11.5, MUTED, "end", 700) : ""}
  <rect class="br14" x="196" y="${66 + i * 66}" width="${BX(v) - 196}" height="34" rx="6" fill="${c}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform 1s cubic-bezier(.3,.8,.25,1) .2s"/>
  ${t(BX(v) + 8 > 440 ? BX(v) - 8 : BX(v) + 8, 89 + i * 66, fx(v, 3), 15, i === 3 ? INK : i === 2 ? "#9A6B12" : c, BX(v) + 8 > 440 ? "end" : "start", 800)}</g>`).join("")}
<g class="a o0 gp14"><path d="M${BX(S.net.rmse)} 192 V60 M${BX(S.lin.rmse)} 60 V126" stroke="${TERRA}" stroke-width="2" stroke-dasharray="4 3"/>
  <path d="M${BX(S.net.rmse)} 56 H${BX(S.lin.rmse)}" stroke="${TERRA}" stroke-width="3"/>${t((BX(S.net.rmse) + BX(S.lin.rmse)) / 2, 50, fx(S.lin.rmse - S.net.rmse) + " better", 13, TERRA, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".rb14").forEach(g => { const i = +g.dataset.i, on = b === 0 ? false : (i === 0 ? b >= 1 : i === 1 ? b >= 2 : i === 2 ? b >= 3 : b >= 4); g.style.opacity = on ? 1 : (b === 0 ? .25 : 0); g.style.transform = on ? "none" : "translateX(-12px)"; g.querySelector(".br14").style.transform = on ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".gp14", b >= 4);
    }
  };



  /* ------------------------------------------------------------ s16 · overfitting */
  const OF = W.overfit, PX = ep => 76 + Math.log10(ep / 10) / Math.log10(300) * 370, PY = v => 300 - v * (250 / 75);
  SC.s16 = {
    copy: H.beats("Al Waha · recorded size experiment", [
      "Can a training score flatter us?",
      "Fit 67,841 parameters on 60 visits.",
      "Training RMSE reaches 5.24.",
      "Unseen RMSE at that same pass is 12.73.",
      ["The persistent gap is evidence of overfitting.","The comparison uses the same large network at the same checkpoint."]
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path d="M76 300 H456 M76 300 V44" stroke="${INK}" stroke-width="2"/>
${[0, 25, 50, 75].map(v => `<path d="M76 ${PY(v)} H456" stroke="${EDGE}" stroke-opacity=".5"/>${t(68, PY(v) + 4, v, 12, MUTED, "end", 700)}`).join("")}
${[10, 100, 1000, 3000].map(e => t(PX(e), 318, e.toLocaleString("en-US"), 12, MUTED)).join("")}
${t(266, 342, "training passes (log scale)", 13, INK, "middle", 800)}<text transform="translate(28 172) rotate(-90)" font-size="13" fill="${INK}" text-anchor="middle" font-weight="800">RMSE (points)</text>
<g class="a o0 su16">${card(250, 52, 200, 52, NAVY, SKY)}${fo(260, 56, 184, 46, `${W.overfitParams.toLocaleString("en-US")} parameters<br>trained on ${W.overfitN} episodes`, 14, NAVY, 800)}</g>
<path class="dr tr16" pathLength="1" d="${pathOf(OF.map(([e, a]) => [PX(e), PY(a)]))}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linejoin="round"/>
<g class="a o0 trl16">${t(PX(3000) - 4, PY(OF[OF.length - 1][1]) - 10, "training: " + fx(OF[OF.length - 1][1], 1), 13, NAVY, "end", 800)}</g>
<path class="dr te16" pathLength="1" d="${pathOf(OF.map(([e, , b]) => [PX(e), PY(b)]))}" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linejoin="round"/>
<g class="a o0 tel16">${t(PX(3000) - 4, PY(OF[OF.length - 1][2]) - 10, "new episodes: " + fx(OF[OF.length - 1][2], 1), 13, TERRA, "end", 800)}</g>
<g class="a o0 gap16"><path d="M${PX(3000) - 30} ${PY(OF[OF.length - 1][1]) + 4} V${PY(OF[OF.length - 1][2]) + 6}" stroke="${TERRA}" stroke-width="3" stroke-dasharray="5 4"/>${t(PX(3000) - 40, (PY(OF[OF.length - 1][1]) + PY(OF[OF.length - 1][2])) / 2 + 4, "", 13, TERRA, "end", 800)}</g>
<g class="a o0 mn16"><path d="M76 ${PY(S.net.rmse)} H456" stroke="${GREEN}" stroke-width="2" stroke-dasharray="6 4"/>${t(84, PY(S.net.rmse) + 14, "small network, 3,900 episodes: " + S.net.rmse, 11.5, GREEN, "start", 800)}</g>`,
    render(r, b) {
      H.show(r, ".su16", b >= 1); H.draw(r, ".tr16", b >= 2); H.show(r, ".trl16", b >= 2); H.delay(r, ".trl16", b >= 2 ? 1.6 : 0);
      H.draw(r, ".te16", b >= 3); H.show(r, ".tel16", b >= 3); H.delay(r, ".tel16", b >= 3 ? 1.6 : 0); H.show(r, ".gap16", b >= 4); H.delay(r, ".gap16", b >= 3 ? 2 : 0);
      H.show(r, ".mn16", false);
    }
  };

  /* ------------------------------------------------------------ s17 · try it: five seeds */
  const SX = v => 60 + (v - 5.9) * (360 / 1.3);
  SC.s17 = {
    copy: H.beats("Al Waha · five runs on one fixed split", [
      "Change the starting weights and visit order.",
      ["Reveal every run and compare the range.","Five starts on one split answer a different question from testing on five different splits."]
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 34, "held-out RMSE of each run (points off)", 14, MUTED, "middle", 800)}
<path d="M40 210 H450" stroke="${INK}" stroke-width="2"/>
${[6.0, 6.2, 6.4, 6.6, 6.8, 7.0].map(v => `<path d="M${SX(v)} 210 v6" stroke="${INK}" stroke-width="2"/>${t(SX(v), 234, v.toFixed(1), 12, MUTED)}`).join("")}
<g>${`<path d="M${SX(S.lin.rmse)} 90 V210" stroke="${NAVY}" stroke-width="3" stroke-dasharray="6 4"/>`}${t(SX(S.lin.rmse) - 4, 84, "linear " + fx(S.lin.rmse), 13, NAVY, "end", 800)}</g>
<rect class="a o0 band17" x="${SX(6.05)}" y="110" width="${SX(6.17) - SX(6.05)}" height="96" fill="${GREEN}" fill-opacity=".14"/>
${S.seeds.map((v, i) => `<g class="a o0 sd17" data-i="${i}" style="transform:translateY(-60px)"><circle cx="${SX(v)}" cy="${190 - i * 16}" r="9" fill="${GREEN}" stroke="#fff" stroke-width="2"/>${t(SX(v) + 14, 194 - i * 16, "run " + (i + 1) + ": " + v.toFixed(2), 11.5, INK, "start", 700)}</g>`).join("")}
<g class="a o0 sm17">${card(40, 262, 400, 76, INK, INK)}${fo(54, 268, 372, 66, `Spread across 5 seeds: <b style="color:#E8B04B">0.12 points</b>. Improvement over linear: <b style="color:#E8B04B">0.95</b>. All five runs beat the baseline on this split.`, 14.5, "#fff", 600)}</g>`,
    render(r, b) { if (r._n17 === undefined) SC.s17.update(r, 0); },
    update(r, n) {
      r._n17 = n;
      H.q(r, ".sd17").forEach(g => { const on = +g.dataset.i < n; g.style.opacity = on ? 1 : 0; g.style.transform = on ? "none" : "translateY(-60px)"; });
      H.show(r, ".band17", n >= 5); H.show(r, ".sm17", n >= 5);
      return n;
    }
  };

  /* ------------------------------------------------------------ s18 · four checks */
  const CK = [["Scaled?", "Scaler fitted on the training rows only."], ["Evidence of overfitting?", "Compare fitting and validation errors."], ["Beats the baseline?", "Fit the linear model first."], ["Survives a new seed?", "Report mean and spread."]];
  SC.s18 = {
    copy: H.beats("Audit the comparison", [
      "Trace how the number was produced.",
      "Which visits set the scaler?",
      "Check the fitting and validation gap.",
      "Use the same benchmark and test visits.",
      "Report sensitivity to random starts."
    ]),
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
    copy: H.beats("Debug the course script", [
      "Where did the pair in the error come from?",
      "Choose the line and name the intended argument."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="16" width="452" height="180" rx="12" fill="${INK}"/>
${CODE.map(([n, s], i) => `<g class="cl19" data-n="${n}"><rect class="hl19" x="20" y="${30 + i * 30}" width="440" height="26" rx="5" fill="${GOLD}" fill-opacity="0" style="transition:fill-opacity .4s"/>${t(44, 48 + i * 30, n, 13, GREY, "end", 700)}<text class="cx19" x="56" y="${48 + i * 30}" font-size="13" fill="#E8EDF3" font-family="Consolas,monospace" xml:space="preserve">${s.replace(/</g, "&lt;")}</text></g>`).join("")}
<g class="err19">${card(14, 206, 452, 100, TERRA, "#FCEFE9")}${t(30, 230, "InvalidParameterError", 15, TERRA, "start", 800)}
  ${fo(30, 238, 424, 64, "The 'loss' parameter of MLPRegressor must be a str among {'squared_error', 'poisson'}. Got (32, 16) instead.", 13, INK, 600, "font-family:Consolas,monospace")}</g>
<g class="a o0 ok19">${card(14, 312, 452, 38, GREEN, "#EAF5EE")}${t(240, 337, "Uses hidden_layer_sizes=(32, 16), by name", 14, GREEN, "middle", 800)}</g>`,
    render(r, b) {},
    pick(r, n) { H.q(r, ".cl19").forEach(g => { g.querySelector(".hl19").style.fillOpacity = +g.dataset.n === n ? (n === 21 ? .35 : .18) : 0; }); },
    fix(r, ok) { const c = r.querySelector('.cl19[data-n="21"] .cx19'); c.textContent = ok ? "    MLPRegressor(hidden_layer_sizes=(32, 16), random_state=42))" : CODE[3][1]; c.setAttribute("font-size", ok ? "11.5" : "13");
      H.show(r, ".ok19", ok); H.set(r, ".err19", "opacity", ok ? ".3" : "1"); }
  };

  /* ------------------------------------------------------------ s20 · sentences */
  SC.s20 = {
    copy: H.beats("Draft thesis sentences", [
      "Would you sign each statement?",
      "An importance ranking needs evidence.",
      "Give the measured gain and its scale.",
      "Specify the sizes of the hidden layers.",
      ["Give the evaluation sample and fitting conditions.","The network's R² was 0.854 on the 1,300 held-out visits."]
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${["learned that waiting matters most", "much better", "deep learning was applied", "R² of 0.85"].map((s, i) => `<g class="sn20" data-i="${i}">${card(30, 30 + i * 76, 420, 62, EDGE)}${t(52, 68 + i * 76, "“" + s + "”", 16, INK, "start", 800)}
  <g class="a o0 x20" style="transform:scale(1.6)"><g transform="rotate(-8 400 ${61 + i * 76})"><rect x="352" y="${46 + i * 76}" width="96" height="30" rx="6" fill="#fff" stroke="${i === 3 ? GOLD : TERRA}" stroke-width="3"/>${t(400, 67 + i * 76, i === 3 ? "INCOMPLETE" : "NO", 14, i === 3 ? "#9A6B12" : TERRA, "middle", 800)}</g></g></g>`).join("")}`,
    render(r, b) { H.q(r, ".sn20").forEach(g => { const i = +g.dataset.i, on = b >= i + 1, x = g.querySelector(".x20"); x.style.opacity = on ? 1 : 0; x.style.transform = on ? "none" : "scale(1.6)"; g.querySelector("rect").style.stroke = b === i + 1 ? TERRA : ""; }); }
  };

  /* ------------------------------------------------------------ s21 · you decide, ChatGPT assists */
  SC.s21 = {
    copy: H.beats("Discussing the result", [
      "Which decision belongs to the researcher?",
      "Ask what the training warning means.",
      "Keep the test set out of decisions.",
      "Judge the trade-off for the hospital."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${person(80, 330, NAVY, 2.2)}${t(80, 350, "you", 14, NAVY, "middle", 800)}
<g class="a o0 g21" style="transform:translateY(10px)">${card(150, 30, 316, 92, GREEN, "#EAF5EE")}${t(166, 54, "✓ good", 14, GREEN, "start", 800)}${fo(166, 60, 290, 58, "“Explain what max_iter controls, and what a ConvergenceWarning means if it appears.”", 14, INK, 600)}</g>
<g class="a o0 b21" style="transform:translateY(10px)">${card(150, 136, 316, 70, TERRA, "#FCEFE9")}${t(166, 160, "✗ bad", 14, TERRA, "start", 800)}${fo(166, 164, 290, 40, "“Keep trying settings until my test score improves.”", 13.5, INK, 700)}</g>
<g class="a o0 y21" style="transform:translateY(10px)">${card(150, 220, 316, 96, INK, INK)}${fo(166, 230, 290, 80, "Is a 0.95-point RMSE reduction worth the added complexity? <b style='color:#E8B04B'>Interpreting the result stays with you.</b>", 15, "#fff", 600)}</g>`,
    render(r, b) { [[".g21", 1], [".b21", 2], [".y21", 3]].forEach(([s, k]) => { H.show(r, s, b >= k); H.tf(r, s, b >= k ? "none" : "translateY(10px)"); }); }
  };

  /* ------------------------------------------------------------ s22 · quiz (stage) */
  SC.s22 = {
    copy: H.beats("Mastery check", [
      "Use the explanation after each answer."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g>${H.card(126, 56, 228, 210, NAVY)}${t(240, 148, "1 / 14", 42, NAVY, "middle", 800, "quiz-index")}${t(240, 188, "questions", 18, MUTED)}${t(240, 214, "Mastery check", 12.5, NAVY, "middle", 800)}</g>
${Array.from({ length: 14 }, (_, i) => `<circle class="quiz-mark" cx="${149 + i * 14}" cy="244" r="5" fill="${EDGE}"/>`).join("")}`,
    render() {}
  };

  /* ------------------------------------------------------------ s23 · takeaways */
  const TK = [
    ["One nonlinear rule", "multiply, add bias, activate (ReLU / tanh / sigmoid)", NAVY],
    ["769 parameters", "720 weights + 49 biases learned; settings are hyperparameters", GREEN],
    ["Backprop + mini-batches", "loss minimised by gradient steps across epochs", GOLD],
    ["RMSE ≠ average error", "error = real − predicted; squaring weighs worst misses", TERRA],
    ["Pipeline + validation", "scale on train only; stop early & regularise on validation", NAVY],
    ["Baseline & 5 seeds", "beat linear 7.07 (vs 6.12); report mean & spread across seeds", GREEN],
    ["Inspect, never claim cause", "permutation & PDP describe the model, not hospital causation", INK]
  ];
  SC.s23 = {
    copy: H.beats("A fresh hospital study", [
      "Should a network join the benchmark?",
      "Follow one weighted total through its gate.",
      "Record the architecture and learned parameter count.",
      "Trace a batch forward and its gradients backward.",
      "Express root mean squared error in points.",
      "Keep preprocessing and selection inside development.",
      "Compare the baseline and the seed range.",
      "Identify the evidence needed for a policy decision."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${TK.map(([a, s, c], i) => `<g class="a o0 tk23" data-i="${i}" style="transform:translateX(-16px)">${card(24, 12 + i * 48, 432, 42, c)}<circle cx="50" cy="${33 + i * 48}" r="13" fill="${c}"/>${t(50, 38 + i * 48, i + 1, 13, "#fff")}${t(74, 29 + i * 48, a, 14, INK, "start", 800)}${t(74, 46 + i * 48, s, 11.5, MUTED, "start", 700)}</g>`).join("")}`,
    render(r, b) { H.q(r, ".tk23").forEach(g => { const on = b >= +g.dataset.i + 1; g.style.opacity = on ? 1 : .15; g.style.transform = on ? "none" : "translateX(-16px)"; }); }
  };
})();
