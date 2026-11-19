/* Week 14 · Chapter 4 animated scenes, part D (s37–s48).
   Covers: validation set vs test set, early stopping, L2 regularisation & interactive reglab,
   5-fold cross-validation, parameters vs hyperparameters, permutation importance & interactive permlab,
   partial dependence plots (PDP), limits of interpretability tools, thesis reporting checklist, and full Python code walkthrough. */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const H = window.SCH, W = window.W14, S = W.slide;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, card } = H;
  const fx = (n, d) => Number(n).toFixed(d === undefined ? 2 : d);
  const pathOf = pts => "M" + pts.map(([x, y]) => `${fx(x, 1)} ${fx(y, 1)}`).join(" L");

  /* ------------------------------------------------------------ s37 · validation set */
  SC.s37 = {
    copy: H.beats("Al Waha · reserve independent visits", [
      "Who gets to choose a stopping pass?",
      "Repeated test checks influence the choice.",
      "Those visits have now helped select the model.",
      "Divide development into 3,510 fitting visits and 390 checks.",
      ["The checking group is the validation set.","It helps choose a pass or setting without updating the weights."],
      "Score on the reserved 1,300 after selection."
    ]),
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="top37">${card(16, 16, 448, 50, INK, INK)}
  ${t(240, 46, "All 5,200 cleaned Al Waha hospital episodes", 15, GOLD, "middle", 800)}
</g>
<g class="a o0 sp1-37">
  <path d="M160 66 V88 M370 66 V88" stroke="${INK}" stroke-width="2.5"/>
  ${card(16, 88, 288, 56, NAVY, SKY)}
  ${t(160, 112, "Training pool · 3,900 episodes (75%)", 13.5, NAVY, "middle", 800)}
  ${t(160, 132, "All model building happens inside here", 11.5, MUTED)}
  ${card(314, 88, 150, 56, TERRA, "#FCEFE9")}
  ${t(389, 112, "🔒 Test vault · 1,300", 13.5, TERRA, "middle", 800)}
  ${t(389, 132, "Touched ONCE at the end", 11, TERRA, "middle", 700)}
</g>
<g class="a o0 no37">
  ${card(64, 156, 352, 46, TERRA, "#FCEFE9")}
  ${t(240, 184, "Using test visits to choose makes them part of selection.", 13.5, TERRA, "middle", 800)}
</g>
<g class="a o0 sp2-37">
  <path d="M96 144 V168 M228 144 V168" stroke="${NAVY}" stroke-width="2.5"/>
  ${card(16, 168, 154, 108, NAVY)}
  ${t(93, 192, "1 · Training rows", 13, NAVY, "middle", 800)}
  ${t(93, 212, "3,510 episodes (90%)", 12, INK, "middle", 800)}
  ${fo(26, 222, 134, 46, "Compute gradients and update the 769 parameters", 11.5, MUTED, 600, "text-align:center")}

  ${card(178, 168, 154, 108, GREEN, "#EAF5EE")}
  ${t(255, 192, "2 · Validation set", 13, GREEN, "middle", 800)}
  ${t(255, 212, "390 episodes (10%)", 12, INK, "middle", 800)}
  ${fo(188, 222, 134, 46, "Choose a setting or stopping pass", 11.5, GREEN, 700, "text-align:center")}

  ${card(340, 168, 124, 108, TERRA, "#FCEFE9")}
  ${t(402, 192, "3 · Test set", 13, TERRA, "middle", 800)}
  ${t(402, 212, "1,300 episodes", 12, INK, "middle", 800)}
  ${fo(348, 222, 108, 46, "Locked vault: one final honest score", 11.5, TERRA, 700, "text-align:center")}
</g>
<g class="a o0 bot37">${card(16, 290, 448, 54, INK, INK)}
  ${t(240, 314, "Fit the weights. Check a choice. Evaluate once.", 12.8, GOLD, "middle", 800)}
  ${t(240, 334, "Settle the modelling choices before scoring the test visits.", 12, "#fff", "middle", 600)}
</g>`,
    render(r, b) {
      H.show(r, ".sp1-37", b >= 1);
      H.show(r, ".no37", b === 2);
      H.show(r, ".sp2-37", b >= 3);
      H.show(r, ".bot37", b >= 4);
    }
  };

const {panel,path,dot,moving,move,textAt,layer,reveal,note}=H;
  // A small regression problem shared by the checkpoint animation and lab.
  // ŷ = 70 + wx. Each pair is [x, survey score]. All six visits are invented for practice.
  const practice={fit:[[-1,60],[1,80]],valid:[[-1,64],[1,76]],test:[[-1,63],[1,77]]};
  const error=(row,w)=>row[1]-(70+w*row[0]);
  const rmse=(rows,w)=>Math.sqrt(rows.reduce((s,row)=>s+error(row,w)**2,0)/rows.length);
  function checkpoints(alpha){
    let w=0;
    return Array.from({length:13},(_,pass)=>{
      const row={pass,w,tr:rmse(practice.fit,w),val:rmse(practice.valid,w)};
      const grad=practice.fit.reduce((s,r)=>s-r[0]*error(r,w),0)/practice.fit.length;
      w-=.22*(grad+alpha*w);
      return row;
    });
  }
  const cx=i=>65+28*i,cy=v=>244-v*13;
  const checkpointArt=path("M65 98 V244 H413",GREY,2)+
    [0,5,10].map(n=>t(54,cy(n)+4,n,12,MUTED,"end")).join("")+
    [0,3,6,9,12].map(n=>t(cx(n),262,n,12,MUTED)).join("")+
    t(425,261,"pass",12,MUTED)+t(76,98,"RMSE (points)",12,MUTED,"start")+
    path("M245 94 h20",NAVY,4)+t(271,98,"fit",12,NAVY,"start")+path("M313 94 h20",TERRA,4)+t(339,98,"validation",12,TERRA,"start")+
    '<path class="fit-line" fill="none" stroke="#1F4E79" stroke-width="3"/><path class="val-line" fill="none" stroke="#C0502A" stroke-width="4"/>'+
    moving("checkpoint",path("M0 112 V245",MUTED,1.5,'stroke-dasharray="4 4"'))+
    moving("fit-dot",dot(0,0,6,NAVY))+moving("valid-dot",dot(0,0,7,TERRA))+
    t(240,295,"",16,NAVY,"middle",800,"checkpoint-value")+t(240,320,"",13,MUTED,"middle",700,"checkpoint-detail");
  function seeCheckpoint(r,alpha,k,limit=12){
    const rows=checkpoints(alpha),row=rows[k],shown=rows.slice(0,limit+1);
    for(const [key,cl] of [["tr","fit"],["val","val"]])r.querySelector("."+cl+"-line").setAttribute("d",pathOf(shown.map(p=>[cx(p.pass),cy(p[key])])));
    move(r,".checkpoint",cx(k),0);move(r,".fit-dot",cx(k),cy(row.tr));move(r,".valid-dot",cx(k),cy(row.val));
    textAt(r,".checkpoint-value",`Pass ${k}     Fit ${row.tr.toFixed(2)}     Validation ${row.val.toFixed(2)}`);
    textAt(r,".checkpoint-detail",`Practice rule    ŷ = 70 + w × x     ·     w = ${row.w.toFixed(2)}`);
    return row;
  }
  SC.s38={copy:H.beats("Practice · restore a checkpoint", [
      "Save the weights after each pass.",
      "Both errors fall at first.",
      "The lowest fitting error can come later than the best check.",
      ["Return to the best validation checkpoint.","The number of passes allowed without sufficient improvement is called patience."],
      ["Early stopping uses validation R² in this regressor.","Al Waha (32, 16): stops at epoch 321, best validation R² 0.818, held-out RMSE 6.165."],
      ["A tiny validation split can stop at the wrong place.","60-episode (256, 256) net: stops at epoch 80, validation R² −1.568, held-out RMSE 20.646."]
    ]),svg:panel("Keep a copy at each pass","Practice visits   ·   watch the validation checkpoints",checkpointArt),
    render(r,b){const best=checkpoints(0).reduce((a,p)=>p.val<a.val?p:a).pass;
      const k=[0,2,9,best,best,best][b];seeCheckpoint(r,0,k,[0,2,9,9,9,9][b]);
      if(b>=3)textAt(r,".checkpoint-detail",["Restore weights saved at the lowest validation error.","Al Waha (32, 16): epoch 321 · val R² 0.818 · test RMSE 6.165","60-row (256, 256): epoch 80 · val R² −1.568 · test RMSE 20.646"][b-3]);
    }
  };
  SC.s40={copy:H.beats("Practice · selection before evaluation", [
      "Choose how flexible the practice fit can be.",
      ["Find a low validation error with the penalty and pass controls.","Each pass updates the practice weight using the fitting visits and the chosen penalty."],
      "Commit before opening the two final practice visits."
    ]),svg:panel("Choose a checkpoint","Six practice visits   ·   two each for fit, validation and final scoring",checkpointArt),
    render(r){if(!r.dataset.practice)this.update(r,0,0,false);},
    update(r,alpha,k,locked){r.dataset.practice="yes";const row=seeCheckpoint(r,alpha,k);
      if(locked){row.errors=practice.test.map(record=>error(record,row.w));row.test=rmse(practice.test,row.w);
        textAt(r,".checkpoint-detail",`Locked choice   ·   final practice RMSE ${row.test.toFixed(2)} points`);}
      return row;
    }
  };

  const visits=["A","B","C","D"],rowY=i=>133+36*i,colors=[NAVY,GREEN,TERRA,"#926911"];
  const visitTable=(headers,xs)=>headers.map((v,i)=>t(xs[i],100,v,12,MUTED)).join("")+
    visits.map((v,i)=>path(`M32 ${rowY(i)+12} H448`,EDGE,1)+t(xs[0],rowY(i),v,15,INK)).join("");
  const occ=[60,70,85,95],wait=[10,20,30,40],prior=[0,2,1,3],survey=[87,86,76,65];
  const predict=(o,w)=>90-w/5-1.2*Math.max(0,o-80);
  function shuffleCells(values,col,x){
    return values.map((v,i)=>moving(`value-${col}-${i}`,t(x,rowY(i),v,14,colors[i]))).join("");
  }
  function rotate(r,field,i,on){
    const dest=on?(i+1)%4:i;move(r,`.value-${field}-${i}`,0,rowY(dest)-rowY(i));
  }
  SC.s43={copy:H.beats("Al Waha · inspect a frozen model", [
      "Does the model use bed occupancy?",
      "Score the original records first.",
      "Reassign only the occupancy column.",
      ["Subtract the original RMSE from the shuffled RMSE.","ΔRMSE = shuffled error − original error, in satisfaction points."],
      ["Occupancy, waiting time and staff ratio lead.","ΔRMSE (mean ± SD): occupancy +4.823 ± 0.131, wait +2.234 ± 0.078, staff ratio +2.232 ± 0.105."],
      ["Handoffs and training follow; prior visits is near zero.","ΔRMSE: handoffs +1.210 ± 0.061, training +0.722 ± 0.067, prior visits −0.006 ± 0.010."]
    ]),svg:panel("Break one link","Shuffle diagram   ·   colours follow the original occupancy entries",
    visitTable(["Visit","Occupancy","Survey"],[72,217,381])+shuffleCells(["oA","oB","oC","oD"],"occ",217)+
    visits.map((v,i)=>t(381,rowY(i),`y${v}`,15,INK)).join("")+
    t(240,289,"",16,NAVY,"middle",800,"score")+t(240,316,"",13,MUTED,"middle",700,"interpret")),
    render(r,b){visits.forEach((_,i)=>rotate(r,"occ",i,b>=2));
      textAt(r,".score",["Freeze the network","Original RMSE = 6.124 points","Same outcomes, reassigned occupancy","Δ = shuffled RMSE − original RMSE","Occupancy +4.823 ± 0.131 · Wait +2.234 ± 0.078 · Staff +2.232 ± 0.105","Handoffs +1.210 ± 0.061 · Training +0.722 ± 0.067 · Prior −0.006 ± 0.010"][b]);
      textAt(r,".interpret",b>=3?"10 shuffles on 1,300 held-out visits · mean ± SD increase in RMSE":"Held-out benchmark · 1,300 episodes");
    }
  };
  const cols=[occ,wait,prior],names=["Occupancy","Wait","Prior visits"];
  SC.s44={copy:H.beats("Practice · shuffle one column of four visits", [
      "Check the practice rule against the four surveys.",
      "Follow a value as it moves to a new visit.",
      ["Compare an input the rule uses with one it ignores.","Prior visits never enters the practice prediction formula."]
    ]),svg:panel("Shuffle four practice visits","Teaching rule    ŷ = 90 − wait / 5 − 1.2 × max(0, occupancy − 80)",
    visitTable(["Visit","Occ. %","Wait","Prior","Survey","Predict"],[49,116,186,250,328,413])+
    cols.map((arr,j)=>shuffleCells(arr,j,[116,186,250][j])).join("")+
    survey.map((v,i)=>t(328,rowY(i),v,14,INK)+t(413,rowY(i),"",14,NAVY,"middle",800,"pred"+i)).join("")+
    t(240,290,"",17,NAVY,"middle",800,"score")+t(240,317,"Survey scores stay with their visits.",13,MUTED)),
    render(r){if(!r.dataset.shuffle)this.shuffle(r,-1);},
    shuffle(r,col){r.dataset.shuffle=String(col);
      const basePred=visits.map((_,i)=>predict(occ[i],wait[i])),pred=visits.map((_,i)=>{
        const from=(i+3)%4;
        return predict(occ[col===0?from:i],wait[col===1?from:i]);
      });
      cols.forEach((_,j)=>visits.forEach((v,i)=>rotate(r,j,i,col===j)));
      pred.forEach((p,i)=>textAt(r,".pred"+i,p.toFixed(0)));
      const score=ps=>Math.sqrt(ps.reduce((s,p,i)=>s+(survey[i]-p)**2,0)/ps.length);
      const base=score(basePred),after=score(pred);textAt(r,".score",`RMSE    ${base.toFixed(2)} → ${after.toFixed(2)} points`);
      return {field:names[col],base,after};
    }
  };

  const px=o=>68+(o-50)*6.9,py=v=>251-(v-40)*2.7;
  const grid=[50,60,70,80,85,90,95,100];
  const avg=o=>wait.reduce((sum,w)=>sum+predict(o,w),0)/wait.length;
  const teachingCurve=pathOf(grid.map(o=>[px(o),py(avg(o))]));
  const obsCurve=pathOf(W.occ.x.flatMap((o,i)=>o>=50?[[px(o),py(W.occ.net[i])]]:[]));
  const pdpVals=[[50,78.8],[60,77.8],[70,77.6],[80,77.7],[85,75.7],[90,70.5],[95,63.1],[100,56.1]];
  const pdpCurve=pathOf(pdpVals.map(([o,v])=>[px(o),py(v)]));
  SC.s45={copy:H.beats("Practice average and Al Waha partial dependence", [
      "What if all visits had the same occupancy?",
      "Set occupancy to 50% and keep each visit’s own wait.",
      "Predict separately, then average.",
      ["Repeat along the grid to trace partial dependence.","Each plotted point summarises all four practice visits."],
      "The saved hospital curve holds five inputs at their medians.",
      ["Averaged across all 3,900 training visits, the PDP bends above 80%.","50%: 78.8 · 60%: 77.8 · 70%: 77.6 · 80%: 77.7 · 85%: 75.7 · 90%: 70.5 · 95%: 63.1 · 100%: 56.1"]
    ]),svg:panel("Whose prediction is averaged?","Trace a practice average, the median profile and the Al Waha PDP.",
    layer(0,2,visitTable(["Visit","Wait","Occupancy","Prediction"],[60,151,251,385])+
      visits.map((v,i)=>t(151,rowY(i),wait[i],14,INK)+t(251,rowY(i),"",14,TERRA,"middle",800,"occ"+i)+
        layer(2,2,t(385,rowY(i),predict(50,wait[i]),15,NAVY))).join(""))+
    layer(3,5,path("M68 98 V251 H424",GREY,2)+[40,60,80,90].map(v=>t(58,py(v)+4,v,12,MUTED,"end")).join("")+
      [50,60,70,80,90,100].map(o=>t(px(o),272,o+"%",11,MUTED)).join(""))+
    layer(3,3,path(teachingCurve,GREEN,4,'class="dr pd-trace" pathLength="1"')+grid.map(o=>dot(px(o),py(avg(o)),4,GREEN)).join("")+
      moving("sweep-dot",dot(0,0,7,GOLD)))+
    layer(4,5,path(obsCurve,NAVY,4)+dot(px(100),py(W.occ.net.at(-1)),6,TERRA))+
    layer(5,5,path(pdpCurve,TERRA,4)+pdpVals.map(([o,v])=>dot(px(o),py(v),4,TERRA)).join(""))+
    t(240,307,"",14,NAVY,"middle",800,"legend")),
    render(r,b){reveal(r,b);H.draw(r,".pd-trace",b===3);
      const cursor=r.querySelector(".sweep-dot");
      if(cursor.getAnimations)cursor.getAnimations().forEach(a=>a.cancel());
      move(r,".sweep-dot",px(100),py(avg(100)));
      if(b===3&&cursor.animate&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        cursor.animate(grid.map(o=>({offset:(o-50)/50,transform:`translate(${px(o)}px,${py(avg(o))}px)`})),{duration:1800});
      }
      visits.forEach((_,i)=>textAt(r,".occ"+i,(b?50:occ[i])+"%"));
      textAt(r,".legend",["Four practice visits with their own waiting times","Set every occupancy to 50%","(88 + 86 + 84 + 82) / 4 = 85 points","Practice curve · average over the four visits","Al Waha · one profile, other inputs at their medians","Al Waha PDP (3,900 rows): 78.8 (50%) → 77.7 (80%) → 75.7 (85%) → 56.1 (100%)"][b]);}
  };

  SC.s39={copy:H.beats("Illustration · a penalty on large weights", [
      "Compare a smooth bend with a local detour.",
      "Large weights can amplify small changes.",
      "Squared weights add to the cost of fitting.",
      ["Alpha controls the strength of L2 regularisation.","60-episode (256, 256) held-out RMSE: 11.01 (α = 0.0001), 10.29 (α = 1.0), 8.84 (α = 10.0)."],
      ["On 3,900 rows the (32, 16) network changes very little.","Full-train held-out RMSE: 6.128 (α = 0.0001), 6.168 (α = 1.0), 6.108 (α = 10.0)."],
      "Dropout is another approach to regularisation."
    ]),svg:panel("What does a weight penalty buy?","Illustrative occupancy curves   ·   the penalty applies during fitting",
    path("M52 238 V102 M52 238 H430",GREY,2)+t(55,95,"score",12,MUTED,"start")+t(426,258,"occupancy →",12,MUTED,"end")+
    '<path class="fitshape" stroke="#1F4E79" fill="none" stroke-width="4"/>'+
    t(240,289,"",16,NAVY,"middle",800,"cost")+t(240,318,"",13,MUTED,"middle",700,"cost-detail")),
    render(r,b){const amp=[.75,1,1,.35,0,.35][b];
      const pts=Array.from({length:97},(_,i)=>{const x=i/96,drop=(b===4?20:78)*Math.max(0,(x-.55)/.45);
        return [54+372*x,132+drop+amp*18*Math.sin(x*49)*Math.exp(-((x-.62)**2)/.055)];});
      const curve=r.querySelector(".fitshape"),previous=curve.getAttribute("d"),next=pathOf(pts);
      curve.setAttribute("d",next);
      if(previous&&curve.animate&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        curve.getAnimations().forEach(a=>a.cancel());
        curve.animate([{d:`path("${previous}")`},{d:`path("${next}")`}],{duration:650,easing:"ease-out"});
      }
      textAt(r,".cost",["Follow the bend along occupancy","Large weights can amplify small input changes","Fitting cost includes a sum of squared weights","Larger alpha gives the penalty more influence","A very strong penalty can flatten signal too","Dropout temporarily silences selected units"][b]);
      textAt(r,".cost-detail",["Practice curve","Trace the local detours.","A weight of 4 contributes 16 to that sum.","60-row (256, 256) RMSE: 11.01 (α=0.0001) → 10.29 (α=1) → 8.84 (α=10)","3,900-row (32, 16) RMSE: 6.128 (α=0.0001) · 6.168 (α=1) · 6.108 (α=10)","The Al Waha regressor uses L2 regularisation."][b]);
    }
  };
  SC.s41={copy:H.beats("Al Waha · development folds", [
      "Could one checking group have been unusually easy?",
      "Use four groups to fit and one to check.",
      ["Five equal folds contain 780 visits each.","The separate 1,300 test visits have no role in these five rounds."],
      "Rotate the checking role across all five groups.",
      "Refit preprocessing inside each round.",
      ["Summarise the five validation scores.","5-fold CV RMSE (mean ± SD): linear 7.104 ± 0.135 vs network 6.150 ± 0.198."]
    ]),svg:panel("Rotate the validation fold","3,900 development visits   ·   the final 1,300 are reserved",
    Array.from({length:5},(_,i)=>{const x=42+i*81;return card(x,122,73,70,EDGE,SKY)+t(x+36,147,`Fold ${i+1}`,14,NAVY)+t(x+36,174,"780",15,INK)}).join("")+
    moving("fold",`<rect x="40" y="119" width="77" height="76" rx="12" fill="none" stroke="${TERRA}" stroke-width="4"/>`)+
    layer(1,5,note(47,213,178,"Fit · 3,120 visits","four folds",NAVY)+note(252,213,179,"Check · 780 visits","one fold",TERRA))+
    t(240,309,"",14,NAVY,"middle",800,"fold-note")),
    render(r,b){reveal(r,b);r.querySelector(".fold").style.opacity=b?1:0;
      const mark=r.querySelector(".fold");if(mark.getAnimations)mark.getAnimations().forEach(a=>a.cancel());
      move(r,".fold",b>=3?324:0,0);
      if(b===3&&mark.animate&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        mark.animate([0,1,2,3,4].map(i=>({transform:`translateX(${81*i}px)`})),{duration:3200,easing:"linear"});
      }
      textAt(r,".fold-note",["How sensitive is a score to the visits used to check it?","Each fold will check one fresh fit.","5 × 780 = 3,900 episodes","Every fold takes a turn in validation.","Refit the imputer, scaler and network in each round.","5-fold CV RMSE (5,200 rows): linear 7.104 ± 0.135 · network 6.150 ± 0.198"][b]);
    }
  };
  SC.s42={copy:H.beats("Design choices and learned numbers", [
      "Decide how many units to connect.",
      "The optimiser adjusts the parameters.",
      "Set the hyperparameters before fitting.",
      ["Compare three candidate architectures.","5-fold CV RMSE on 3,900 rows: (8,) 6.238 ± 0.088 · (32, 16) 6.205 ± 0.053 · (64, 32) 6.194 ± 0.072."],
      ["Choose on common folds, then refit.","(32, 16) captures nearly the same CV accuracy with 769 parameters vs 2,561 for (64, 32)."],
      "Evaluate the selected procedure once on the final test group."
    ]),svg:panel("Who chooses which numbers?","Trace one candidate design from planning to final scoring.",
    layer(0,5,note(36,100,192,"Choose the design","layers, penalty, step size",NAVY))+
    layer(1,5,note(252,100,192,"Learn in each fit","weights and biases",GREEN))+
    layer(3,5,[["(8,)","65 params · 6.238 ± 0.088"],["(32, 16)","769 params · 6.205 ± 0.053"],["(64, 32)","2,561 params · 6.194 ± 0.072"]].map(([s,d],i)=>note(32+i*141,190,134,s,d,NAVY)).join(""))+
    layer(4,4,t(240,302,"Same folds → compare validation RMSE → refit",14,GREEN))+
    layer(5,5,t(240,302,"Selected pipeline → evaluate on the final 1,300 visits",14,TERRA))),render:reveal};

SC.s46={copy:H.beats("From an edited record to a policy question", [
      "What would the ward manager need to know?",
      "Editing a record changes a model prediction.",
      "A busy shift could influence handoffs and satisfaction.",
      "A shuffle can create an unusual combination.",
      "Two fitted models can share credit differently.",
      "Use inspection to check plausibility."
    ]),svg:panel("What would a policy change do?","Compare a change on screen with a change on the ward.",
    layer(0,1,note(42,117,154,"Edit occupancy","in a patient record")+path("M206 146 H264",GREY)+note(275,117,159,"Prediction","run the fitted rule",GREEN)+
      layer(1,1,note(98,226,284,"A policy question","Follow outcomes under an intervention",TERRA)))+
    layer(2,2,note(148,93,184,"Busy shift","possible common cause",TERRA)+path("M235 155 L126 203 M245 155 L354 203",MUTED)+
      note(35,211,174,"More handoffs","recorded input")+note(270,211,174,"Lower satisfaction","observed outcome",GREEN))+
    layer(3,3,note(47,109,163,"Very short wait","taken from visit A")+note(268,109,163,"Full occupancy","taken from visit B",TERRA)+
      path("M130 177 L216 221 M350 177 L264 221",MUTED)+note(104,229,272,"Edited record","Check support in the original visits",GREEN))+
    layer(4,4,note(44,111,174,"Model A","relies on occupancy")+note(264,111,174,"Model B","relies on waiting",TERRA)+
      path("M135 177 L215 218 M348 177 L262 218",MUTED)+note(128,226,224,"Similar predictions","shared information",GREEN))+
    layer(5,5,note(60,111,360,"Inspect the fitted response","Check unusual combinations and alternative fits")+note(60,218,360,"Evaluate a proposed intervention","Define the comparison and collect outcome evidence",GREEN))),render:reveal};

  const stats=[["RMSE",S.lin.rmse,S.net.rmse],["MAE",S.lin.mae,S.net.mae],["R²",S.lin.r2,S.net.r2]];
  SC.s47={copy:H.beats("Al Waha · reporting the comparison", [
      "What would a colleague need to reproduce this table?",
      "Describe the inputs, gates, hidden layers and output.",
      "Document the split and preprocessing.",
      "Compare both models on the same held-out episodes.",
      "Show the full five-seed range.",
      "Interpret the RMSE difference in the outcome’s units."
    ]),svg:panel("A reproducible results table","Al Waha   ·   satisfaction points   ·   1,300 held-out episodes",
    layer(1,5,t(36,102,"6 inputs  →  32 ReLU  →  16 ReLU  →  1 score",16,NAVY,"start"))+
    layer(2,5,t(36,129,"Fit on 3,900   ·   fill gaps, scale, train",14,MUTED,"start"))+
    t(69,166,"Metric",13,MUTED)+t(236,166,"Linear",13,MUTED)+t(378,166,"Network",13,MUTED)+
    stats.map(([label,a,b],i)=>path(`M36 ${176+i*28} H444`,EDGE,1)+t(69,196+i*28,label,15,INK)+
      layer(3,5,t(236,196+i*28,a.toFixed(3),15,NAVY)+t(378,196+i*28,b.toFixed(3),15,GREEN))).join("")+
    layer(4,5,t(240,285,"Five starts on the same split   ·   RMSE 6.05–6.17",14,NAVY))+
    layer(5,5,t(240,320,"RMSE reduction 0.947 points   ·   outcome SD 16.048",14,TERRA))),render:reveal};

  const codeBlocks=[
    ["Split visits","Fit the baseline","Fit the network","Score fresh visits","Repeat the prespecified starts"],
    ["X_tr, X_te, y_tr, y_te = train_test_split(","    X, y, test_size=0.25, random_state=42",")"],
    ["fill = SimpleImputer(strategy='median')","lin = make_pipeline(fill, LinearRegression())","lin.fit(X_tr, y_tr)"],
    ["def network(seed):","    return make_pipeline(","        SimpleImputer(strategy='median'),","        StandardScaler(),","        MLPRegressor(hidden_layer_sizes=(32, 16),","                     random_state=seed, max_iter=500))","net = network(42).fit(X_tr, y_tr)"],
    ["def score(model):","    pred = model.predict(X_te)","    return mean_squared_error(y_te, pred) ** 0.5","print(score(lin), score(net))"],
    ["scores = []","for seed in range(1, 6):","    model = network(seed).fit(X_tr, y_tr)","    scores.append(score(model))","print(scores)"]
  ];
  SC.s48={copy:H.beats("Python · core workflow excerpts", [
      "Trace the allowed data through five operations.",
      "Reserve the final quarter first.",
      "Fit the imputed linear baseline.",
      "Add scaling and name the hidden layers.",
      "Take the root of the mean square.",
      "Refit each prespecified seed and retain its score."
    ]),svg:panel("Read the hospital script","Core Python excerpts   ·   follow the data through each block",
    card(24,89,432,216,INK,INK)+codeBlocks.map((lines,b)=>layer(b,b,lines.map((line,i)=>`<text x="38" y="${119+i*26}" font-size="12.5" font-family="Consolas,monospace" xml:space="preserve" fill="${i===0?GOLD:"#fff"}">${line}</text>`).join(""))).join("")+
    t(240,330,"",13,NAVY,"middle",800,"code-title")),
    render(r,b){reveal(r,b);textAt(r,".code-title",["Five operations","Reserve the final quarter","Fit the linear baseline","Name the hidden layers","Return error to satisfaction points","Keep all five results"][b]);}
  };
})();
