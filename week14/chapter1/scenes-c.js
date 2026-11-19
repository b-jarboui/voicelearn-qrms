/* Week 14 · Chapter 4 animated scenes, part C (s24–s36).
   Covers: activation functions beyond ReLU (step, sigmoid, tanh, identity/output, interactive actlab),
   parameter counting (720 weights + 49 biases = 769 parameters), loss functions (MSE, RMSE, MAE, Huber, cross-entropy),
   gradient descent, learning rate & interactive lrlab, backpropagation, batches & epochs, data leakage & interactive leakspot. */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const H = window.SCH, W = window.W14, S = W.slide;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");
  const STY = `<style>.flow{stroke-dasharray:3 9;animation:flow .9s linear infinite}.flowrev{stroke-dasharray:4 8;animation:flowrev .85s linear infinite}@keyframes flow{to{stroke-dashoffset:-12}}@keyframes flowrev{to{stroke-dashoffset:12}}</style>`;

  const OX = o => 256 + (o - 55) * 4.3, OY = s => 242 - (s - 40) * (180 / 55);
  const BAND = W.occ.band;

  /* ------------------------------------------------------------ s24 · activation function intro */
  SC.s24 = {
    copy: H.beats("One gate · two practice totals", [
      "What sits between the total and the next unit?",
      "Compare totals of −4 and +9.",
      "One sends zero and the other sends nine.",
      "This hinge is a rectified linear unit.",
      "A hard step sends one for any positive total.",
      "Only the active hinge keeps increasing."
    ]),
    svg: `${STY}
<rect width="480" height="360" fill="${PAPER}"/>
<g class="top24">${card(16, 16, 448, 92, NAVY)}
  ${t(32, 42, "inside one neuron", 12, MUTED, "start", 800)}
  ${card(30, 50, 148, 46, EDGE, SKY)}${t(104, 70, "weighted sum + bias", 11.5, MUTED)}${t(104, 88, "z = w·x + b", 14, NAVY, "middle", 800)}
  <path d="M178 73 H216" stroke="${NAVY}" stroke-width="3.5"/>
  <rect x="216" y="46" width="114" height="54" rx="12" fill="${INK}"/>
  ${t(273, 68, "activation", 13, GOLD, "middle", 800)}${t(273, 86, "function g(z)", 12, "#fff", "middle", 700)}
  <path d="M330 73 H366" stroke="${NAVY}" stroke-width="3.5"/>
  <g class="a o0 ex24">${card(366, 48, 86, 50, GREEN, "#EAF5EE")}${t(409, 68, "z = −4 → 0", 12, MUTED, "middle", 800)}${t(409, 88, "z = +9 → 9", 13, GREEN, "middle", 800)}</g>
</g>
<g class="a o0 stp24" style="transform:translateY(10px)">${card(16, 122, 216, 174, EDGE)}
  ${t(124, 144, "Hard step function", 14, TERRA, "middle", 800)}
  <path d="M38 256 H208 M124 270 V158" stroke="${GREY}" stroke-width="1.5"/>
  <path d="M44 256 H124 V178 H202" fill="none" stroke="${TERRA}" stroke-width="4" stroke-linejoin="round"/>
  ${t(82, 246, "0 (off)", 11.5, MUTED)}${t(166, 170, "1 (alarm)", 11.5, TERRA, "middle", 800)}
  <g class="a o0 sl24">${t(124, 284, "✗ slope = 0 on both flat shelves", 12, TERRA, "middle", 800)}</g>
</g>
<g class="a o0 rl24" style="transform:translateY(10px)">${card(248, 122, 216, 174, GREEN)}
  ${t(356, 144, "ReLU: max(0, z)", 14, GREEN, "middle", 800)}
  <path d="M270 256 H440 M346 270 V158" stroke="${GREY}" stroke-width="1.5"/>
  <path d="M274 256 H346 L426 172" fill="none" stroke="${GREEN}" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="346" cy="256" r="5.5" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
  ${t(308, 246, "0 (silent)", 11.5, MUTED)}${t(408, 216, "passes z", 11.5, GREEN, "middle", 800)}
  <g class="a o0 sl24">${t(356, 284, "✓ slope = 1 guides weight updates", 12, GREEN, "middle", 800)}</g>
</g>
<g class="a o0 bot24">${card(16, 306, 448, 42, INK, INK)}${t(240, 332, "Negative side: slope 0     ·     Positive side: slope 1", 13.5, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".ex24", b >= 1); H.set(r,".ex24 text","opacity",b===1?".6":"1");
      H.show(r, ".rl24", b >= 3); H.tf(r, ".rl24", b >= 3 ? "none" : "translateY(10px)");
      H.show(r, ".stp24", b >= 4); H.tf(r, ".stp24", b >= 4 ? "none" : "translateY(10px)");
      H.show(r, ".sl24", b >= 5); H.show(r, ".bot24", b >= 5);
    }
  };

  /* ------------------------------------------------------------ s25 · sigmoid and tanh */
  const sigPts = [], tanhPts = [];
  for (let z = -4; z <= 4.01; z += 0.25) {
    const x1 = 124 + z * 21, s = 1 / (1 + Math.exp(-z)), y1 = 212 - s * 86;
    sigPts.push([x1, y1]);
    const x2 = 356 + z * 21, th = Math.tanh(z), y2 = 169 - th * 45;
    tanhPts.push([x2, y2]);
  }
  SC.s25 = {
    copy: H.beats("Hidden gates and probability outputs", [
      "Look for a smooth change in the signal.",
      "A complaint outcome has two possible answers.",
      ["A sigmoid maps a zero total to one half.","A probability of 0.5 corresponds to even odds."],
      "Logistic regression uses the same curve.",
      "Tanh also carries negative signals.",
      "The tails respond very little to a change in input.",
      "A ReLU can stay silent across visits."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a o0 sg25">${card(16, 20, 216, 218, NAVY)}
  ${t(124, 42, "Sigmoid · logistic(z)", 14, NAVY, "middle", 800)}
  ${t(124, 58, "output between 0 and 1", 11.5, MUTED)}
  <path d="M36 212 H212 M124 220 V116" stroke="${GREY}" stroke-width="1.4"/>
  <path d="M36 126 H212" stroke="${EDGE}" stroke-dasharray="3 3"/>
  ${t(32, 130, "1", 11, MUTED, "end", 700)}${t(32, 172, "0.5", 10.5, MUTED, "end", 700)}${t(32, 214, "0", 11, MUTED, "end", 700)}
  <path class="dr sgc25" pathLength="1" d="${pathOf(sigPts)}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>
  <g class="a o0 sgex25"><circle cx="${124}" cy="${169}" r="5.5" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>
    ${t(124, 96, "z = 0 gives probability 0.5", 11.5, NAVY, "middle", 800)}</g>
  <g class="a o0 sat25"><rect x="36" y="202" width="38" height="16" rx="4" fill="${TERRA}" fill-opacity=".22"/><rect x="174" y="118" width="38" height="16" rx="4" fill="${TERRA}" fill-opacity=".22"/>
    ${t(124, 231, "⚠ tails flatten → slope ≈ 0", 11.5, TERRA, "middle", 800)}</g>
</g>
<g class="a o0 th25">${card(248, 20, 216, 218, GREEN)}
  ${t(356, 42, "Hyperbolic tangent · tanh(z)", 14, GREEN, "middle", 800)}
  ${t(356, 58, "range: −1 to +1 (zero-centred)", 11.5, MUTED)}
  <path d="M268 169 H444 M356 222 V116" stroke="${GREY}" stroke-width="1.4"/>
  <path d="M268 124 H444 M268 214 H444" stroke="${EDGE}" stroke-dasharray="3 3"/>
  ${t(264, 128, "+1", 10.5, MUTED, "end", 700)}${t(264, 173, "0", 10.5, MUTED, "end", 700)}${t(264, 218, "−1", 10.5, MUTED, "end", 700)}
  <path class="dr thc25" pathLength="1" d="${pathOf(tanhPts)}" fill="none" stroke="${GREEN}" stroke-width="4" stroke-linecap="round"/>
  ${H.moving("probe25",H.dot(0,0,5,GOLD))}<g class="a o0 sat25"><rect x="268" y="206" width="38" height="16" rx="4" fill="${TERRA}" fill-opacity=".22"/><rect x="406" y="116" width="38" height="16" rx="4" fill="${TERRA}" fill-opacity=".22"/>
    ${t(356, 231, "⚠ tails also saturate at ±1", 11.5, TERRA, "middle", 800)}</g>
</g>
<g class="a o0 bot25">${card(16, 250, 448, 94, EDGE)}
  ${t(32, 274, "Trace the two sides of ReLU", 13.5, INK, "start", 800)}
  ${t(32, 296, "Positive totals pass through with slope 1.", 12.5, GREEN, "start", 700)}
  <g class="a o0 die25">${t(32, 318, "If every total stays negative, the unit stays silent.", 12.5, TERRA, "start", 700)}</g>
</g>`,
    render(r, b) {
      H.show(r, ".sg25", b >= 0); H.draw(r, ".sgc25", b >= 0);
      H.show(r, ".sgex25", b >= 1 && b <= 4);
      H.show(r, ".th25", b >= 4 || b === 0); H.draw(r, ".thc25", b >= 4);
      H.show(r, ".sat25", b >= 5); H.show(r,".probe25",b >= 4); const z=b>=5?3.5:0; move(r,".probe25",356+21*z,169-45*Math.tanh(z)); H.show(r, ".bot25", b >= 5); H.show(r, ".die25", b >= 6);
    }
  };

  /* ------------------------------------------------------------ s26 · output activation */
  const OUTS = [
    ["Satisfaction (points)", "Identity: g(z) = z (no squashing)", "MLPRegressor", GREEN],
    ["Readmission (yes or no)", "Sigmoid: probability in (0, 1)", "MLPClassifier", NAVY],
    ["Triage (three categories)", "Softmax: probabilities sum to 1.0", "MLPClassifier", GOLD]
  ];
  SC.s26 = {
    copy: H.beats("Choose the output scale", [
      "What should the team read at the end?",
      "Hidden gates let the prediction bend.",
      "The hospital outcome is a score in points.",
      "A sigmoid cannot pass 78 points unchanged.",
      ["An identity gate lets the score through.","A final total of 78 gives a prediction of 78 points."],
      "Use probabilities for categorical outcomes."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="hid26">${card(14, 34, 152, 294, NAVY, SKY)}
  ${t(90, 60, "Hidden layers", 14, NAVY, "middle", 800)}
  ${t(90, 80, "(32, then 16)", 12, MUTED)}
  ${[0, 1, 2, 3].map(i => `<circle cx="62" cy="${114 + i * 38}" r="9" fill="${NAVY}"/><circle cx="118" cy="${128 + i * 34}" r="9" fill="${NAVY}"/><path d="M71 ${114 + i * 38} L109 ${128 + i * 34}" stroke="${NAVY}" stroke-width="1.5"/>`).join("")}
  <rect x="28" y="264" width="124" height="46" rx="8" fill="#fff" stroke="${NAVY}" stroke-width="2"/>
  ${t(90, 284, "ReLU or tanh", 13, NAVY, "middle", 800)}${t(90, 301, "job: bend curves", 11, MUTED)}
</g>
<path d="M166 180 H194" stroke="${INK}" stroke-width="3.5"/>
${OUTS.map(([title, rule, fn, c], i) => `<g class="a o0 oc26" data-i="${i}" style="transform:translateX(14px)">
  ${card(196, 34 + i * 102, 270, 90, c)}
  <rect x="196" y="${34 + i * 102}" width="8" height="90" rx="4" fill="${c}"/>
  ${t(214, 58 + i * 102, title, 11.8, INK, "start", 800)}
  ${t(214, 82 + i * 102, rule, 13.5, i === 2 ? "#9A6B12" : c, "start", 800)}
  ${t(214, 106 + i * 102, "scikit-learn: " + fn, 11.5, MUTED, "start", 700)}
</g>`).join("")}
<g class="a o0 bad26">${card(196, 34, 270, 90, TERRA, "#FCEFE9")}
  ${t(331, 66, "✗ If output used Sigmoid on Al Waha:", 13, TERRA, "middle", 800)}
  ${t(331, 90, "Every output lies between 0 and 1.", 13, INK, "middle", 700)}
  ${t(331, 110, "(78 satisfaction points cannot come out)", 11.5, MUTED)}
</g>`,
    render(r, b) {
      H.q(r, ".oc26").forEach(g => {
        const i = +g.dataset.i;
        const on = (i === 0 && b >= 2 && b !== 3) || (i >= 1 && b >= 5);
        g.style.opacity = on ? 1 : (b === 0 && i === 0 ? 0.35 : 0);
        g.style.transform = on ? "none" : "translateX(14px)";
      });
      H.show(r, ".bad26", b === 3);
    }
  };

const {panel,path,dot,moving,move,textAt,layer,reveal,note}=H;
  // The plot and the readout use the same activation and coordinate system.
  const gates={
    relu:{name:"ReLU",fn:z=>Math.max(0,z),slope:z=>z===0?null:Number(z>0)},
    tanh:{name:"Tanh",fn:Math.tanh,slope:z=>1-Math.tanh(z)**2},
    linear:{name:"Identity",fn:z=>z,slope:()=>1},
    step:{name:"Hard step",fn:z=>Number(z>=0),slope:z=>z===0?null:0}
  };
  SC.s27={copy:H.beats("Practice · inspect the response to one input", [
      "Start below zero.",
      ["Change the rule with the input held still.","The dashed segment shows the local tangent wherever the derivative exists."],
      ["Cross zero and inspect the local slope.","Al Waha held-out RMSE: ReLU 6.128, tanh 6.138, logistic 6.108."]
    ]),svg:panel("One input, four gates","Move the total z and compare what leaves the unit.",
    path("M52 188 H303 M177 290 V88",GREY,2)+t(301,206,"z",12,MUTED)+t(178,94,"g(z)",12,MUTED,"start")+
    [-2,-1,1,2].map(z=>t(177+z*38,205,z,11,MUTED)).join("")+
    '<path class="curve" stroke="#1F4E79" fill="none" stroke-width="4"/><path class="tangent" stroke="#C0502A" stroke-width="2" stroke-dasharray="4 3"/>'+
    moving("cursor",dot(0,0,7,GOLD))+card(318,105,128,148,EDGE,SKY)+
    t(382,131,"Output",13,NAVY)+t(382,161,"",25,INK,"middle",800,"out")+t(382,195,"Local slope",13,NAVY)+t(382,223,"",17,TERRA,"middle",800,"slope")+
    t(240,321,"",15,NAVY,"middle",700,"rule")),
    render(r){if(!r.dataset.gate)this.update(r,"relu",-1.4);},
    update(r,key,z){
      r.dataset.gate=key;const gate=gates[key],out=gate.fn(z),slope=gate.slope(z);
      const X=v=>177+38*v,Y=v=>188-33*v;
      const pts=Array.from({length:61},(_,i)=>{const x=-3+i/10;return[X(x),Y(gate.fn(x))]});
      r.querySelector(".curve").setAttribute("d",key==="step"?`M${X(-3)} ${Y(0)} H${X(0)} M${X(0)} ${Y(1)} H${X(3)}`:pathOf(pts));
      r.querySelector(".tangent").setAttribute("d",slope===null?"":`M${X(z-.28)} ${Y(out-.28*slope)} L${X(z+.28)} ${Y(out+.28*slope)}`);
      move(r,".cursor",X(z),Y(out));textAt(r,".out",out.toFixed(2));textAt(r,".slope",slope===null?"undefined":slope.toFixed(2));
      textAt(r,".rule",`${gate.name}   ·   z = ${z.toFixed(1)}`);
      return {out,slope};
    }
  };

  // Gradient descent on L(w) = w², so each worked step uses dL/dw = 2w.
  const rates={tiny:.04,good:.25,fast:.75,huge:1.05};
  const bowlX=w=>240+w*92,bowlY=w=>245-43*w*w;
  const lossBowl=path(pathOf(Array.from({length:81},(_,i)=>{const w=(i-40)/22;return[bowlX(w),bowlY(w)]})),NAVY,3);
  function valley(title,subtitle){
    return panel(title,subtitle,lossBowl+path("M55 247 H425",GREY,1)+t(418,265,"weight",12,MUTED)+t(66,101,"loss",12,MUTED)+
      '<path class="route" fill="none" stroke="#C0502A" stroke-width="2" stroke-dasharray="5 4"/>'+
      moving("ball",dot(0,0,9,GOLD))+t(240,294,"",17,NAVY,"middle",800,"math")+t(240,321,"",13,MUTED,"middle",700,"readout"));
  }
  function descent(r,rate,step){
    const weights=[-1];for(let i=0;i<6;i++)weights.push(weights[i]-rate*2*weights[i]);
    const w=weights[step],prev=weights[Math.max(0,step-1)];
    r.querySelector(".route").setAttribute("d",pathOf(weights.slice(0,step+1).map(x=>[bowlX(x),bowlY(x)])));
    move(r,".ball",bowlX(w),bowlY(w));textAt(r,".math",`Step ${step}     w = ${w.toFixed(3)}     loss = ${(w*w).toFixed(4)}`);
    textAt(r,".readout",step?`Previous weight ${prev.toFixed(2)}   −   ${rate} × slope ${(2*prev).toFixed(2)}`:"Starting weight −1     ·     loss = 1");
    return w;
  }
  SC.s30={copy:H.beats("Practice · loss as one weight changes", [
      "Freeze every weight except one.",
      "Read loss as height above the weight axis.",
      "The tangent shows the local change.",
      ["Negative slope means move right.","Increasing the weight a little reduces loss here."],
      ["Positive slope means move left.","Increasing the weight a little increases loss here."],
      "Use all the local slopes to take a descent step."
    ]),svg:valley("Which way is downhill?","One-weight illustration   ·   loss = w²"),
    render(r,b){
      const w=[-1,-1,-1,-.75,.75,0][b],slope=2*w;
      r.querySelector(".route").setAttribute("d",b>=2&&b<5?`M${bowlX(w-.4)} ${bowlY(w)+43*slope*.4} L${bowlX(w+.4)} ${bowlY(w)-43*slope*.4}`:"");
      move(r,".ball",bowlX(w),bowlY(w));textAt(r,".math",["Change one weight","Height measures loss","Inspect the local slope","Negative slope → move right","Positive slope → move left","At the bottom the slope is zero"][b]);
      textAt(r,".readout",`Weight ${w.toFixed(2)}     ·     slope ${slope.toFixed(2)}     ·     loss ${(w*w).toFixed(2)}`);
    }
  };
  SC.s31={copy:H.beats("Practice · compare steps from the same starting point", [
      "How far should the weight move?",
      ["Multiply the slope by a learning rate.","New weight = old weight − rate × local slope"],
      ["A small step can leave much of the loss.","Al Waha at 0.00001: 200 epochs (not converged), train RMSE 73.18, held-out 73.43."],
      ["A large step can cross to a higher point.","Al Waha at 0.5: stops at 23 epochs, train RMSE 6.53, held-out 6.48."],
      "A balanced step approaches the bottom.",
      ["Adam adapts the step for each weight.","Default 0.001 reaches held-out RMSE 6.12 vs 73.43 (0.00001) and 6.48 (0.5)."]
    ]),svg:valley("How far on one update?","One-weight illustration   ·   same starting point for each comparison"),
    render(r,b){const rate=[.25,.25,.04,1.05,.25,.25][b];descent(r,rate,[0,1,6,6,6,6][b]);
      if(b===2)textAt(r,".readout","Al Waha lr 0.00001 · 200 epochs · train 73.18 · held-out 73.43");
      if(b===3)textAt(r,".readout","Al Waha lr 0.5 · stops at 23 epochs · train 6.53 · held-out 6.48");
      if(b===5)textAt(r,".readout","Hospital model · Adam · initial learning rate 0.001");
    }
  };
  SC.s32={copy:H.beats("Practice · six updates on one quadratic", [
      "Choose a rate and keep the start fixed.",
      ["Step through the weights and their losses.","Keep the update number fixed when comparing two rates."],
      "Compare the last loss with the starting loss."
    ]),svg:valley("Take six downhill steps","Practice bowl   ·   loss = w²   ·   every run starts at −1"),
    render(r){if(!r.dataset.rate)this.update(r,"good",0);},
    update(r,mode,k){r.dataset.rate=mode;const rate=rates[mode],w=descent(r,rate,k);
      return {w,loss:w*w,rate};}
  };

  /* ------------------------------------------------------------ s28 · counting 769 parameters */
  const L28 = [
    ["Layer 1 (32 neurons)", "6 × 32 = 192 weights", "+ 32 biases", "224 parameters", NAVY],
    ["Layer 2 (16 neurons)", "32 × 16 = 512 weights", "+ 16 biases", "528 parameters", GREEN],
    ["Output (1 neuron)", "16 × 1 = 16 weights", "+ 1 output bias", "17 parameters", TERRA]
  ];
  SC.s28 = {
    copy: H.beats("Al Waha · count incoming connections", [
      "Follow the adjustable numbers layer by layer.",
      "First hidden layer has 192 weights and 32 biases.",
      "Second hidden layer has 512 weights and 16 biases.",
      "The output has 16 weights and one bias.",
      ["Add the two kinds of numbers separately.","Weights: 192 + 512 + 16. Biases: 32 + 16 + 1."],
      "All 769 adjustable numbers are parameters."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="top28">${card(16, 16, 448, 72, INK, INK)}
  ${[["6 inputs", 58, GOLD], ["32 hidden", 180, NAVY], ["16 hidden", 308, GREEN], ["1 output", 422, TERRA]].map(([s, x, c]) => `<rect x="${x - 42}" y="32" width="84" height="40" rx="10" fill="${c}"/>${t(x, 57, s, 13, c === GOLD ? INK : "#fff", "middle", 800)}`).join("")}
  ${[[119, "192 w + 32 b"], [244, "512 w + 16 b"], [365, "16 w + 1 b"]].map(([x, s]) => t(x, 28, s, 10.5, GOLD, "middle", 800)).join("")}
</g>
${L28.map(([h, w, b, tot, c], i) => `<g class="a o0 c28" data-i="${i}" style="transform:translateY(12px)">
  ${card(16 + i * 152, 102, 144, 154, c)}
  <rect x="${16 + i * 152}" y="102" width="144" height="8" rx="4" fill="${c}"/>
  ${t(88 + i * 152, 130, h, 13, c, "middle", 800)}
  ${t(88 + i * 152, 162, w, 12, INK, "middle", 700)}
  ${t(88 + i * 152, 186, b, 12, MUTED, "middle", 700)}
  <line x1="${32 + i * 152}" y1="204" x2="${144 + i * 152}" y2="204" stroke="${EDGE}" stroke-width="1.5"/>
  ${t(88 + i * 152, 232, tot, 15, c, "middle", 800)}
</g>`).join("")}
<g class="a o0 tot28" style="transform:scale(.92)">${card(16, 270, 448, 74, TERRA, "#FCEFE9")}
  ${t(240, 298, "192 + 512 + 16 = 720 weights   ·   32 + 16 + 1 = 49 biases", 14, INK, "middle", 800)}
  ${t(240, 326, "769 parameters learned from 3,900 visits", 16, TERRA, "middle", 800)}
</g>`,
    render(r, b) {
      H.q(r, ".c28").forEach(g => {
        const i = +g.dataset.i, on = b >= i + 1;
        g.style.opacity = on ? 1 : (b === 0 ? 0.3 : 0);
        g.style.transform = on ? "none" : "translateY(12px)";
      });
      H.show(r, ".tot28", b >= 4); H.tf(r, ".tot28", b >= 4 ? "none" : "scale(.92)");
    }
  };

  /* ------------------------------------------------------------ s29 · loss functions */
  const sqPts = [], absPts = [], hubPts = [];
  for (let e = -8; e <= 8.01; e += 0.4) {
    const x = 126 + e * 11.5;
    sqPts.push([x, 208 - (e * e) * 2.1]);
    absPts.push([x, 208 - Math.abs(e) * 2.1]);
    const d = 3, h = Math.abs(e) <= d ? 0.5 * e * e : d * (Math.abs(e) - 0.5 * d);
    hubPts.push([x, 208 - h * 2.1]);
  }
  SC.s29 = {
    copy: H.beats("Loss and evaluation", [
      "Compare two sets of mistakes.",
      "A loss function assigns their cost.",
      "Double the miss and its square quadruples.",
      "A mean square near 37.5 corresponds to 6.124 RMSE.",
      "Average absolute misses to get 4.912 points.",
      ["The two summaries weight large misses differently.","Both figures use the same 1,300 held-out episodes."],
      "Huber handles tails differently. Log loss scores probabilities."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${card(14, 18, 224, 214, EDGE)}
${t(126, 38, "Penalty for error (real − predicted)", 12.5, INK, "middle", 800)}
<path d="M32 208 H220 M126 216 V56" stroke="${GREY}" stroke-width="1.4"/>
${t(126, 224, "error e = y − ŷ", 11, MUTED)}
<path class="dr sqc29" pathLength="1" d="${pathOf(sqPts)}" fill="none" stroke="${TERRA}" stroke-width="3.5"/>
<path class="dr abc29" pathLength="1" d="${pathOf(absPts)}" fill="none" stroke="${NAVY}" stroke-width="3"/>
<path class="dr hbc29" pathLength="1" d="${pathOf(hubPts)}" fill="none" stroke="${GREEN}" stroke-width="3" stroke-dasharray="5 3"/>
<g class="a o0 lg29">${t(214, 76, "squared e²", 11.5, TERRA, "end", 800)}${t(214, 114, "absolute |e|", 11.5, NAVY, "end", 800)}</g>
<g class="a o0 hbl29">${t(214, 152, "Huber", 11.5, GREEN, "end", 800)}</g>

<g class="a o0 rt29">${card(248, 18, 218, 214, NAVY)}
  ${t(357, 40, "Al Waha held-out scores", 13.5, NAVY, "middle", 800)}
  <g class="a o0 mse29">${card(262, 52, 190, 48, EDGE, SKY)}${t(357, 70, "Mean Squared Error (MSE)", 11.5, MUTED)}${t(357, 90, "≈ 37.5 squared points", 14, INK, "middle", 800)}</g>
  <g class="a o0 rmse29">${card(262, 108, 190, 52, TERRA, "#FCEFE9")}${t(357, 126, "Root Mean Squared Error (RMSE)", 11, TERRA, "middle", 800)}${t(357, 148, "√MSE ≈ 6.12 points", 15, TERRA, "middle", 800)}</g>
  <g class="a o0 mae29">${card(262, 168, 190, 52, GREEN, "#EAF5EE")}${t(357, 186, "Mean Absolute Error (MAE)", 11, GREEN, "middle", 800)}${t(357, 208, "4.912 points (average |e|)", 14.5, GREEN, "middle", 800)}</g>
</g>
<g class="a o0 neq29">${card(14, 242, 452, 50, INK, INK)}
  ${t(240, 264, "RMSE 6.124   ·   MAE 4.912", 14, GOLD, "middle", 800)}
  ${t(240, 283, "Squaring gives more influence to large misses.", 12, "#fff", "middle", 600)}
</g>
<g class="a o0 extra29">${card(14, 300, 452, 46, GREEN, "#EAF5EE")}
  ${t(240, 320, "Huber has linear tails. Log loss scores probabilities.", 12.5, GREEN, "middle", 800)}
  ${t(240, 338, "Always report error in the outcome's own units alongside the baseline.", 11.5, MUTED, "middle", 700)}
</g>`,
    render(r, b) {
      H.draw(r, ".sqc29", b >= 1); H.show(r, ".lg29", b >= 2);
      H.show(r, ".rt29", b >= 2); H.show(r, ".mse29", b >= 2);
      H.show(r, ".rmse29", b >= 3);
      H.draw(r, ".abc29", b >= 4); H.show(r, ".mae29", b >= 4);
      H.show(r, ".neq29", b >= 5);
      H.draw(r, ".hbc29", b >= 6); H.show(r, ".hbl29", b >= 6); H.show(r, ".extra29", b >= 6);
    }
  };



// Follow the derivative of half squared error through two active branches.
  // Here both hidden activations depend on an earlier shared signal h.
  const coords33=[[79,185],[226,130],[226,226],[383,178]];
  const paths33=[[0,1],[0,2],[1,3],[2,3]];
  const diagram33=paths33.map(([i,j])=>{const [x,y]=coords33[i],[u,v]=coords33[j];
    return path(`M${x} ${y} L${u} ${v}`,EDGE,4)+`<path class="stream-${i}-${j}" d="M${x} ${y} L${u} ${v}" fill="none" stroke="${TERRA}" stroke-width="3"/>`;}).join("")+
    coords33.map(([x,y],i)=>dot(x,y,i===3?18:12,[GOLD,NAVY,NAVY,TERRA][i])).join("")+
    t(78,215,"Signal h",12,INK)+t(223,105,"Path A",13,NAVY)+t(223,255,"Path B",13,NAVY)+t(383,151,"Prediction",13,TERRA)+t(383,183,"79",13,"#fff")+
    layer(2,6,t(386,212,"Survey 85",13,MUTED))+
    layer(4,6,t(301,128,"× 0.8",13,NAVY)+t(304,229,"× 0.1",13,NAVY))+
    layer(5,6,`<circle cx="226" cy="226" r="15" fill="#fff" stroke="${MUTED}" stroke-width="2"/>${t(226,231,"0",15,MUTED)}`)+
    t(240,290,"",15,NAVY,"middle",800,"back-main")+t(240,318,"",13,MUTED,"middle",700,"back-sub");
  SC.s33={copy:H.beats("One practice visit · from prediction to gradient", [
      "Which early weight contributed to this miss?",
      "Trying every weight would repeat the forward calculation.",
      "Real 85 minus predicted 79 gives +6.",
      ["Follow the loss sensitivity back through the paths.","Here the loss is half the squared error, so its output slope is predicted minus real."],
      "Multiply slopes along paths and add where they meet.",
      "A negative ReLU total blocks this path's gradient.",
      "The optimiser uses the gradients to update the weights."
    ]),svg:panel("Follow a loss gradient","Practice visit   ·   loss = ½ × (real − predicted)²",STY+diagram33),
    render(r,b){reveal(r,b);paths33.forEach(([i,j])=>{const p=r.querySelector(`.stream-${i}-${j}`);
      p.classList.toggle("flow",b===2);p.classList.toggle("flowrev",b>=3);
      p.style.opacity=b<2||(b>=5&&i===0&&j===2)?0:1;p.style.stroke=b===2?GREEN:TERRA;});
      textAt(r,".back-main",["Which early weight contributed?","Run the forward calculation again for each trial.","Signed error = 85 − 79 = +6","Loss slope at the prediction = 79 − 85 = −6","Path A receives −6 × 0.8 = −4.8","A closed ReLU multiplies this path’s gradient by 0.","Backpropagation supplies a slope for each parameter."][b]);
      textAt(r,".back-sub",["Two paths connect h to the same output.","A separate forward pass would be needed for each trial.","Signals move forward to produce one prediction.","Carry that sensitivity back to the hidden signals.","Continue multiplying local slopes, then add at h.","The other path can still carry a gradient.","The optimiser uses those slopes for its next update."][b]);
    }
  };
SC.s34={copy:H.beats("Al Waha · 3,900 training visits", [
      "Start with the full stack of visits.",
      "Compare one visit with the entire stack.",
      "Collect up to 200 visits in a mini-batch.",
      "One batch supplies one weight update.",
      ["Finish with a group of 100.","Nineteen full batches account for the first 3,800 visits."],
      "Twenty updates make one epoch."
    ]),svg:panel("One pass through the fitting visits","3,900 episodes   ·   a tile stands for one group of records",
    Array.from({length:20},(_,i)=>{const x=37+i%5*54,y=100+Math.floor(i/5)*42;
      return `<g class="packet" data-i="${i}">${card(x,y,46,31,EDGE,i===19?"#FFF2CD":SKY)}${t(x+23,y+21,i===19?"100":"200",13,NAVY)}</g>`}).join("")+
    note(319,150,124,"Weights","one update",GREEN)+moving("batch-dot",dot(0,0,7,TERRA))+
    t(240,293,"",17,NAVY,"middle",800,"batch-main")+t(240,320,"",13,MUTED,"middle",700,"batch-sub")),
    render(r,b){
      r.querySelectorAll(".packet").forEach((p,i)=>{p.style.opacity=b===2||b===3?(i===0?1:.28):1});
      const ball=r.querySelector(".batch-dot");ball.style.opacity=b===2||b===3?1:0;move(r,".batch-dot",b===3?321:62,b===3?177:115);
      textAt(r,".batch-main",["The full stack holds 3,900 visits","One visit or the whole stack?","A mini-batch holds up to 200 visits","One batch gradient → one update","19 × 200 + 1 × 100 = 3,900","321 epochs × 20 updates = 6,420 updates"][b]);
      textAt(r,".batch-sub",["","A single gradient can be noisy.","At this sample size, the automatic batch size is 200.","Average the contributions from the group.","The last, smaller batch still produces one update.","Each visit takes part once per epoch."][b]);
    }
  };

  const auditPairs=[
    ["Today's discharge","input record","Tomorrow's survey","future information"],
    ["Fit the model","decisions made here","Later event","unavailable at discharge"],
    ["Pipeline scaler","RMSE 6.128","Pre-split scaler","leaky RMSE 6.117"],
    ["Choose layers","model design","Test scores","used to rank candidates"],
    ["Predict satisfaction","at discharge","Apology call","logged after the survey"],
    ["Fit on earlier visits","training group","Future or related visit","group by patient or date"],
    ["Build the pipeline","development visits","Score the model","reserved visits"]
  ];
  SC.s35={copy:H.beats("Audit a study at the moment of prediction", [
      "Imagine tomorrow’s survey in today’s training file.",
      "Future information can leak into a decision.",
      ["Test visits can slip into a preprocessing mean.","Al Waha held-out RMSE: 6.117 pre-split vs 6.128 inside the training pipeline."],
      "Repeated test scores can guide design choices.",
      "An apology call comes after the outcome.",
      "Match patient groups or dates to the prediction question.",
      "Check when each piece of information became available."
    ]),svg:panel("Find the first leak","Trace the source of each input or modelling choice.",
    card(32,114,184,91,NAVY,SKY)+card(264,114,184,91,TERRA,"#FCEFE9")+
    t(124,150,"",15,NAVY,"middle",800,"left-title")+t(124,177,"",12,INK,"middle",700,"left-detail")+
    t(356,150,"",15,TERRA,"middle",800,"right-title")+t(356,177,"",12,INK,"middle",700,"right-detail")+
    path("M239 98 V248",MUTED,1.5,'stroke-dasharray="4 4"')+
    '<path class="leak-path" fill="none" stroke-width="3"/>'+moving("document",dot(0,0,7,GOLD))+
    t(240,280,"",16,NAVY,"middle",800,"audit-caption")+t(240,314,"Prediction time and split membership both matter.",13,MUTED)),
    render(r,b){const vals=auditPairs[b];
      [".left-title",".left-detail",".right-title",".right-detail"].forEach((cl,i)=>textAt(r,cl,vals[i]));
      const p=r.querySelector(".leak-path");p.setAttribute("d",b===6?"M120 216 Q240 261 357 216 l-7 10":"M357 216 Q240 261 120 216 l8 10");
      p.setAttribute("stroke",b===6?GREEN:TERRA);p.style.opacity=b?1:0;
      const packet=r.querySelector(".document");const start=b===6?120:357,end=b===6?357:120;
      move(r,".document",b?end:start,216);
      if(packet.getAnimations)packet.getAnimations().forEach(a=>a.cancel());
      if(b&&packet.animate&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        packet.animate([{transform:`translate(${start}px,216px)`},{transform:"translate(240px,238px)"},{transform:`translate(${end}px,216px)`}],{duration:1100});
      textAt(r,".audit-caption",["When is the prediction due?","Unavailable information crosses into development.","Preparation leak","Selection leak","Future predictor","Choose a split that matches the deployment question.","Fit on development. Apply to reserved visits."][b]);
    }
  };

  /* ------------------------------------------------------------ s36 · interactive: leakspot */
  const WF36 = [
    ["1 · Pre-split scaling", "Scale all visits.\nThen split the scaled rows.", "LEAKED ✗", TERRA],
    ["2 · Fit on training visits", "Fit on training visits.\nApply the pipeline to test visits.", "CLEAN ✓", GREEN],
    ["3 · Choose on test error", "Try 15 sizes on test visits.\nKeep the lowest test RMSE.", "LEAKED ✗", TERRA],
    ["4 · Post-survey column", "Use the apology call logged\n48 hours after the survey.", "LEAKED ✗", TERRA]
  ];
  SC.s36 = {
    copy: H.beats("Practice · trace each workflow", [
      "Inspect four proposed workflows.",
      "Find the first use of forbidden information.",
      "Classify each workflow and read its explanation."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${t(240, 28, "Examiner's audit board: clean evaluation or data leakage?", 13.5, NAVY, "middle", 800)}
${WF36.map(([h, code, stamp, c], i) => {
  const x = 16 + (i % 2) * 228, y = 42 + Math.floor(i / 2) * 148;
  return `<g class="wf36" data-i="${i}">
    ${card(x, y, 220, 136, EDGE)}
    ${t(x + 12, y + 24, h, 12.5, NAVY, "start", 800)}
    ${fo(x + 12, y + 34, 196, 86, `<pre style="margin:0;white-space:pre-wrap;font:600 11px Consolas,monospace;color:${INK}">${code}</pre>`, 11, INK, 600)}
    <g class="a o0 st36" style="transform:scale(1.4)"><g transform="rotate(-7 ${x + 156} ${y + 106})">
      <rect x="${x + 104}" y="${y + 90}" width="104" height="30" rx="6" fill="#fff" stroke="${c}" stroke-width="3"/>
      ${t(x + 156, y + 110, stamp, 13.5, c, "middle", 800)}
    </g></g>
  </g>`;
}).join("")}`,
    render() {},
    mark(r, i) {
      const g = r.querySelector(`.wf36[data-i="${i}"]`);
      if (!g) return;
      const st = g.querySelector(".st36");
      st.style.opacity = "1"; st.style.transform = "none";
      g.querySelector("rect").style.stroke = i === 1 ? GREEN : TERRA;
      g.querySelector("rect").style.strokeWidth = "3";
    }
  };
})();
