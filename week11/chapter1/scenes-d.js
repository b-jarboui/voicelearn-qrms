/* Worked examples. Each stage is drawn once. A beat sets the entire visible state,
   so replay, direct scene navigation and learner controls share the same drawing. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH;
  const {NAVY:N, TERRA:T, GREEN:G, GOLD:Y, MUTED:M, INK:I, SKY:S} = H.C;
  const paper = "#F6F1E7", pale = "#E7DDCB", white = "#FFFDFA";
  const txt = (x,y,v,size=14,c=I,anchor="middle") =>
    H.t(x,y,String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;"),size,c,anchor,700);
  const rect = (x,y,w,h,fill,stroke="none",radius=8) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const dot = (x,y,r,color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  const path = (d,color=N,width=3,dash="") =>
    `<path d="${d}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const card = (x,y,w,h,title,detail,color=N) =>
    rect(x,y,w,h,white,pale)+rect(x+1,y+6,4,h-12,color,"none",2)+
    txt(x+w/2,y+h/2-(detail?3:-5),title,16,color)+(detail?txt(x+w/2,y+h/2+18,detail,12,M):"");
  const tag = (x,y,w,v,color=N) => rect(x,y,w,28,color)+txt(x+w/2,y+19,v,13,white);
  const layer = (from,art,to=100) => `<g class="lesson-layer" data-from="${from}" data-to="${to}">${art}</g>`;
  const arrow = (x,y,w) => path(`M${x} ${y} h${w} m-7 -6 l7 6 -7 6`,M,2);
  function lesson(id,title,source,summaries,art,action) {
    const s=window.CHAPTER.scenes.find(x=>x.id===id);
    const copy=summaries.map((m,i)=>({k:title,m,s:source,l:`${i+1} / ${s.lines.length} · ${title}`}));
    if(copy.length!==s.lines.length) throw Error("Beat count for "+id);
    SC[id]={copy,svg:rect(0,0,480,360,paper,"none",0)+rect(12,12,456,336,white,pale,16)+
      txt(29,42,title,20,N,"start")+path("M28 54 H452",pale,1)+art+
      path("M28 305 H452",pale,1)+`<g class="ticks">${summaries.map((_,i)=>{
        const unit=420/summaries.length;return rect(30+i*unit,323,unit-4,5,pale,"none",2);
      }).join("")}</g>`,render(r,b) {
        r.querySelectorAll(".lesson-layer").forEach(el=>{
          const visible=b>=+el.dataset.from && b<=+el.dataset.to;
          el.style.opacity=visible?1:0;
          el.style.transform=visible?"none":"translateY(5px)";
        });
        r.querySelectorAll(".ticks rect").forEach((el,i)=>el.setAttribute("fill",i===b?T:i<b?N:pale));
        if(action) action(r,b);
      }};
  }

  lesson("s26","Fit a rule","Illustration · estimating complaint risk",[
    "Start with one chance for everyone.","Pair the estimate with the recorded answer.","A confident wrong answer costs more.",
    "The penalty is called a loss.","Compare the total across training visits.","Let the estimate rise with waiting time.",
    "Keep the change if total loss falls.","Fitting adjusts the rule.","Apply the fixed rule to a fresh wait."
  ],path("M65 86 V242 H425",M,2)+txt(242,268,"waiting time →",14,M)+txt(76,78,"estimated chance",13,M,"start")+
    layer(0,path("M72 187 H414",N,4),4)+layer(1,dot(342,105,8,T)+txt(335,90,"complaint recorded",13,T))+
    layer(2,path("M342 120 V183",T,2,"4 4")+tag(103,109,126,"prediction loss",T),4)+
    layer(4,tag(87,212,104,"sum losses",N),7)+layer(5,path("M72 217 C222 217 260 204 297 170 S353 115 416 108",G,4))+
    layer(6,tag(74,109,128,"lower total loss",G))+layer(8,path("M305 244 V163 H66",T,2,"4 4")+dot(305,163,7,T)));

  const clusters=[[86,212,0],[113,201,0],[101,232,0],[137,213,0],[205,137,1],[229,126,1],[248,144,1],[206,160,1],[335,204,2],[358,199,2],[367,221,2],[329,228,2]];
  lesson("s27","Visits on a map","Illustrative workload map · no complaint outcomes supplied",[
    "Which kinds of front-desk work arrive together?","Give each visit two coordinates.","Nearby visits have similar measurements.",
    "Gather neighbouring visits around centres.","These groups are clusters.","A centre describes a typical group member.",
    "Boundaries can move when the centres move.","Units change the meaning of distance.","Ask the desk team what each group represents."
  ],path("M60 91 V257 H427",M,2)+txt(63,79,"handoffs ↑",13,M,"start")+txt(245,279,"waiting time →",14,M)+
    layer(1,clusters.map(([x,y])=>dot(x,y,6,N)).join(""))+layer(2,path("M86 212 L113 201 L101 232 Z",G,2,"3 3"),3)+
    layer(3,[[110,214],[224,145],[348,213]].map(([x,y],i)=>
      `<ellipse cx="${x}" cy="${y}" rx="44" ry="32" fill="none" stroke="${[N,T,G][i]}" stroke-width="2" stroke-dasharray="5 4"/>`).join(""))+
    layer(5,[[110,214],[224,145],[348,213]].map(([x,y])=>path(`M${x-5} ${y} h10 m-5 -5 v10`,T,3)).join(""))+
    layer(6,path("M155 245 L177 169",T,2,"5 4"),7)+layer(7,txt(404,78,"minutes or seconds?",12,T,"end"),7)+
    layer(8,tag(276,77,142,"review with staff",G)));

  lesson("s28","The prediction moment","Al Waha · a review list at the end of the wait",[
    "Issue the score when the wait ends.","Mark the decision time.","The completed wait is available.","The later questionnaire is unavailable.",
    "Check when handoffs were recorded.","At check-in the wait is still unknown.","Specify the moment in the question.",
    "Define the outcome window.","An open follow-up window has no final label."
  ],path("M48 170 H430",M,3)+[["Check-in",63],["Wait ends",215],["Survey",340],["Review",413]].map(([v,x])=>dot(x,170,7,N)+txt(x,196,v,13)).join("")+
    layer(1,path("M215 89 V252",T,2,"5 4")+tag(156,81,118,"score now",T),4)+
    layer(2,tag(91,222,116,"wait known",G),4)+layer(3,tag(268,128,137,"survey later",T),4)+
    layer(4,txt(339,249,"Handoff time?",14,T),4)+layer(5,path("M63 92 V250",T,2,"4 4")+tag(29,86,126,"earlier score",T),5)+
    layer(6,tag(151,82,130,"time specified",N))+layer(7,path("M218 228 H416 m-6 -5 l6 5 -6 5",G)+txt(320,254,"outcome window",15,G))+
    layer(8,tag(276,122,139,"still observing",T)));

  const blocks=(x,y,n,per,c)=>Array.from({length:n},(_,i)=>rect(x+i%per*15,y+Math.floor(i/per)*15,11,11,c,"none",2)).join("");
  lesson("s29","Three jobs for the data","Proposed development design · blocks show roles, not measured results",[
    "Give building and judging different records.","Fit candidates on training records.","Compare candidates on reserved development records.",
    "These judging records form a validation set.","Keep the final test sealed.","Select settings and the operating cut-off.",
    "Refit the agreed procedure on development.","Freeze the procedure before scoring test rows.","Using test feedback spends the final check."
  ],rect(25,82,288,170,white,N)+txt(169,108,"DEVELOPMENT",15,N)+rect(326,82,127,170,paper,T)+txt(389,108,"FINAL TEST",15,T)+
    layer(1,blocks(44,135,24,6,N)+txt(84,222,"Fit",16,N))+layer(2,blocks(180,135,12,4,G)+txt(205,222,"Validate",16,G))+
    layer(4,blocks(357,153,12,4,T)+txt(389,222,"Sealed",16,T),6)+layer(5,tag(46,263,218,"settings + cut-off agreed",G),6)+
    layer(6,path("M76 240 H237",G,3))+layer(7,tag(313,153,131,"score once",T)+txt(169,280,"Procedure frozen",15,G))+
    layer(8,path("M386 129 H304",T,3,"5 5")+txt(382,246,"No feedback",13,T)));

  lesson("s30","Discharge-time audit","Al Waha · predictors must exist when the score is issued",[
    "Score at discharge and observe complaints later.","The completed wait is ready.","The closure date arrives afterwards.",
    "A future investigation can reveal the answer.","That shortcut is leakage.","A whole-file average also crosses the boundary.",
    "Learn replacements using training rows.","Which field must stay out?"
  ],path("M55 166 H427",M)+layer(0,tag(166,84,147,"DISCHARGE",N)+path("M240 119 V263",N,2,"4 4"))+
    layer(1,card(32,177,191,66,"Wait duration","known at discharge",G))+
    layer(2,card(257,177,191,66,"Closure date","recorded afterwards",T))+
    layer(3,path("M370 152 Q307 114 252 151",T,3,"4 4"),4)+
    layer(4,txt(352,271,"Outcome information",14,T),4)+layer(5,tag(38,259,189,"whole-file average",T),5)+
    layer(6,tag(38,259,189,"training average only",G)));

  lesson("s31","Choose the unit of the split","Study design · illustrative Al Waha records",[
    "Two exports may include the same episode.","Copies on both sides make evaluation too easy.","Remove duplicate episodes.",
    "One person can still have distinct visits.","Keep each person together for a new-patient question.",
    "A future season asks a different question.","Use earlier visits to predict later visits.","Allow training outcomes time to mature.",
    "Report the unit and dates of the split."
  ],layer(0,card(42,86,176,67,"Export A","Episode K",N)+card(262,86,176,67,"Export B","Episode K",T),2)+
    layer(1,path("M125 165 L254 241 M352 165 L221 241",T,3,"4 4"),1)+layer(2,tag(155,201,171,"one copy of K",G),2)+
    layer(3,card(37,97,195,84,"Patient A","visit 1  ·  visit 2",N)+card(246,97,195,84,"Patient B","visit 1  ·  visit 2",G),4)+
    layer(4,tag(55,203,156,"fit together",N)+tag(267,203,156,"hold together",G),4)+
    layer(5,path("M48 197 H431",M)+txt(100,230,"earlier",15,N)+txt(379,230,"later",15,T))+
    layer(6,blocks(60,147,10,10,N)+blocks(306,147,8,8,T)+path("M278 128 V209",T,2,"5 4"))+
    layer(7,tag(138,81,190,"outcomes mature first",G))+layer(8,txt(236,275,"Patient grouping + calendar dates",16,N)));

  function treeNode(x,y,w,label,color=N){return rect(x-w/2,y-16,w,32,white,color)+txt(x,y+5,label,13,color);}
  const branch=(x,y,toX,toY)=>path(`M${x} ${y} L${toX} ${toY}`,N,2);
  lesson("s32","Grow a decision tree","Illustrative tree · questions and leaves are teaching examples",[
    "Start with a pile of visit cards.","The root contains both outcomes.","Ask whether the wait was long.","Send each answer down its branch.",
    "Split the longer-wait group by handoffs.","The connected questions form a tree.","A leaf ends the questions.",
    "A leaf can estimate complaint chance.","A new visit follows one route."
  ],layer(0,treeNode(240,88,143,"All visits"),1)+layer(1,[N,T,N,T,N,T].map((c,i)=>dot(196+i*17,119,5,c)).join(""),1)+
    layer(2,treeNode(240,88,143,"Long wait?"))+layer(3,branch(224,104,106,164)+branch(256,104,344,164)+
      txt(142,127,"no",13,M)+txt(330,126,"yes",13,M))+layer(3,treeNode(104,177,111,"Shorter wait",G),5)+layer(3,treeNode(345,177,134,"Longer wait",T),3)+
    layer(4,treeNode(345,177,134,"Handoffs > 2?",T)+branch(331,193,275,239)+branch(357,193,403,239)+
      txt(287,212,"no",12,M)+txt(400,211,"yes",12,M)+treeNode(269,254,100,"Leaf B",G))+layer(4,treeNode(405,254,95,"Leaf C",G),7)+
    layer(6,treeNode(104,177,111,"Leaf A",G))+layer(7,txt(273,288,"Leaf share = complaints ÷ visits",14,G))+
    layer(8,path("M252 105 L329 157 M359 195 L400 235",T,5)+treeNode(403,254,99,"Visit here",T))+
    Array.from({length:6},(_,i)=>`<g class="tree-card">${rect(-6,-8,12,16,i%3===0?T:N,white,2)}</g>`).join(""),
    (r,b)=>{r.querySelectorAll(".tree-card").forEach((el,i)=>{
      let x=202+i*15,y=60;
      if(b>=3){x=i<3?85+i*17:328+(i-3)*17;y=150;}
      if(b>=4&&i>=3){x=i===3?268:394+(i-4)*18;y=230;}
      el.style.transform=`translate(${x}px,${y}px)`;
      el.style.opacity=b===8&&i!==5?.22:1;
    });});

  const teaching=[0,0,1,0,1,1];
  const gini=rows=>{const p=rows.reduce((a,b)=>a+b,0)/rows.length;return 2*p*(1-p);};
  function divider(root,k){
    const left=teaching.slice(0,k),right=teaching.slice(k);
    const weighted=(k*gini(left)+right.length*gini(right))/teaching.length;
    root.querySelector(".divider").style.transform=`translateX(${(k-2)*61}px)`;
    root.querySelector(".groups").textContent=`Left: ${left.reduce((a,b)=>a+b,0)}/${k} complaints   ·   Right: ${right.reduce((a,b)=>a+b,0)}/${right.length} complaints`;
    root.querySelector(".impurity").textContent=`Weighted impurity ${weighted.toFixed(3)}   ·   Reduction ${(.5-weighted).toFixed(3)}`;
    return weighted;
  }
  lesson("s33","Test a candidate split","Six invented cards · N = no complaint · C = complaint",[
    "Sort the cards by waiting time.","Read the outcomes on the cards.","Divide after the second card.","A single-outcome group has no mixture.",
    "Consider two draws with replacement.","Gini impurity = 2 × p × (1 − p).","Weight children by their sizes.",
    "Compare the reduction from the parent.","Which offered dividers tie for best?"
  ],txt(240,86,"shorter wait                                     longer wait →",13,M)+
    teaching.map((v,i)=>rect(61+i*61,125,48,61,v?T:N)+txt(85+i*61,164,v?"C":"N",23,white)).join("")+
    layer(2,`<g class="divider">${path("M176 109 V199",G,4)+dot(176,107,6,G)}</g>`)+
    layer(2,'<text class="groups" x="240" y="226" text-anchor="middle" font-size="15" font-weight="700"></text>')+
    layer(4,txt(240,254,"Pure group = 0      ·      Half and half = 0.5",14,M))+
    layer(6,'<text class="impurity" x="240" y="282" text-anchor="middle" font-size="14" font-weight="700" fill="#2E7D4F"></text>'),
    (r,b)=>{divider(r,+(r.dataset.divider||2));if(r.dataset.divider) r.querySelectorAll(".lesson-layer").forEach(e=>e.style.opacity="1");});
  SC.s33.move=(r,k)=>{r.dataset.divider=k;SC.s33.render(r,8);};

  lesson("s34","How small can a leaf be?","Illustrative fits · the marks represent training visits",[
    "Keep every visit in one leaf.","One estimate cannot distinguish waits.","The same restriction persists across samples.",
    "A useful pattern can be underfit.","Allow a first question.","A deep path can isolate one example.",
    "One complaint in one visit gives 100%.","A minimum leaf size limits tiny groups.","Choose this setting in validation."
  ],layer(0,treeNode(232,91,191,"All training visits")+
    [N,N,T,N,T,N].map((c,i)=>dot(167+i*27,130,8,c)).join(""))+
    layer(1,tag(147,176,170,"one shared estimate",N),3)+layer(3,txt(240,250,"Underfitting",24,T),3)+
    layer(4,branch(215,145,121,179)+branch(246,145,350,179)+treeNode(119,193,147,"Shorter waits",G)+treeNode(349,193,147,"Longer waits",T))+
    layer(5,branch(349,209,378,237)+treeNode(377,251,112,"1 visit",T),6)+layer(6,txt(138,256,"1 / 1 = 100%",20,T),6)+
    layer(7,tag(131,245,210,"minimum visits per leaf",G)));

  const target=(x,y)=>[35,24,12].map(rad=>`<circle cx="${x}" cy="${y}" r="${rad}" fill="none" stroke="${pale}" stroke-width="3"/>`).join("")+dot(x,y,3,T);
  lesson("s35","Bias and variance","Illustrative repeated fits · each dot estimates the same quantity",[
    "Refit the same procedure on new samples.","Track the chance at one fixed wait.","The target marks the underlying chance.",
    "Bias is a systematic displacement.","Variance describes the spread of estimates.","A rigid rule can miss consistently.",
    "Flexible rules can move between samples.","The underlying chance is hidden in practice.","Check performance on fresh visits."
  ],rect(28,81,202,170,paper)+rect(250,81,202,170,paper)+txt(129,110,"Rigid rule",17,N)+txt(350,110,"Flexible rule",17,T)+
    layer(2,target(130,179)+target(350,179))+
    layer(1,[[79,154],[81,161],[86,153],[86,165],[90,160],[77,163]].map(([x,y])=>dot(x,y,4,N)).join(""))+
    layer(1,[[318,156],[365,149],[384,187],[341,207],[352,172],[322,192]].map(([x,y])=>dot(x,y,5,G)).join(""))+
    layer(3,path("M86 161 L126 177",T,2,"3 3")+txt(126,236,"average off target",13,T))+
    layer(4,txt(350,236,"wide scatter",13,G))+layer(7,txt(240,278,"A teaching target stands in for an unknown truth.",14,M)));
  const cells=[[605,"caught",G],[153,"missed",T],[209,"false alarms","#92671B"],[4237,"unflagged",N]];
  function miniMatrix(){
    return txt(143,84,"Flagged",14,N)+txt(315,84,"Unflagged",14,N)+cells.map(([v,label,color],i)=>{
      const x=65+i%2*169,y=96+Math.floor(i/2)*64;
      return `<g class="metric-cell">${rect(x,y,157,53,white,color)+txt(x+78,y+24,v.toLocaleString("en-US"),20,color)+txt(x+78,y+43,label,12,M)}</g>`;
    }).join("");
  }
  function focusMatrix(r,active){r.querySelectorAll(".metric-cell").forEach((e,i)=>{e.style.opacity=active.includes(i)?1:.27;});}
  lesson("s36","Three denominators","90-minute rule · 758 complaints among 5,204 visits (14.6%)",[
    "Start with the manager’s question.","All actual complaints form the recall denominator.","Recall = 605 / 758 ≈ 80%.",
    "All flagged visits form the precision denominator.","Precision = 605 / 814 ≈ 74%.","Add both correct cells for accuracy.",
    "Accuracy = 4,842 / 5,204 ≈ 93%.","Name the denominator in words."
  ],miniMatrix()+layer(1,tag(100,245,280,"Actual complaints: 605 + 153",G),2)+
    layer(3,tag(100,245,280,"Calls: 605 + 209",N),4)+layer(5,tag(83,245,314,"Correct: 605 + 4,237 · base rate 14.6%",N),6)+
    layer(7,tag(100,245,280,"Complaints, calls or all visits?",N)),
    (r,b)=>focusMatrix(r,b===1||b===2?[0,1]:b===3||b===4?[0,2]:b===5||b===6?[0,3]:[0,1,2,3]));

  lesson("s37","The F1 score","90-minute waiting rule · descriptive file of 5,204 visits",[
    "A summary for finding complaints and keeping calls relevant.","A short list can be precise.","Calling everyone gives full recall.",
    "F1 is the harmonic mean of precision and recall.","The weaker measure pulls the summary down.",
    "F1 = 2 × hits / (2 × hits + false alarms + misses).","1,210 / 1,572 ≈ 0.770.",
    "Correctly unflagged visits drop out.","State the clinic’s costs separately."
  ],layer(0,card(28,91,201,80,"Precision","605 / 814",N)+card(251,91,201,80,"Recall","605 / 758",G))+
    layer(3,path("M126 175 L205 211 M351 175 L272 211",M,2)+treeNode(240,219,147,"Harmonic mean"))+
    layer(5,tag(66,257,347,"2 × 605 / (2 × 605 + 209 + 153)",N),5)+
    layer(6,tag(143,257,194,"F1 ≈ 0.770",G)));

  const mixBar=(x,y,hits,falseCalls)=>rect(x,y,hits*6,22,G,"none",0)+rect(x+hits*6,y,falseCalls*6,22,Y,"none",0);
  lesson("s38","When the event is rare","Illustrative populations · both catch 80% of complaints and flag 10% of quiet visits",[
    "Base rate = outcomes / eligible visits.","Al Waha’s complaint base rate is 14.6%.","The two classes have different sizes.",
    "Imagine adding more visits without complaints.","Keep both flagging fractions fixed.","More quiet visits add more false alarms.",
    "Precision falls from 16/24 to 16/34.","Estimate workload using the local base rate.","Read accuracy beside the base rate."
  ],layer(0,tag(40,75,177,"Al Waha · 14.6%",N),2)+layer(1,rect(40,130,380,24,S)+rect(40,130,55.5,24,T)+
    txt(42,189,"758 complaint visits out of 5,204",16,T,"start"),2)+
    layer(3,txt(41,88,"Teaching population A · 20 complaints + 80 quiet",14,N,"start")+mixBar(42,102,16,8)+
      txt(41,144,"16 hits + 8 false calls",13,M,"start"))+
    layer(4,txt(41,185,"Teaching population B · 20 complaints + 180 quiet",14,N,"start")+
      mixBar(42,199,16,18)+txt(41,242,"16 hits + 18 false calls",13,M,"start"))+
    layer(6,tag(41,262,293,"Precision: 67% → 47%",G)));

  const cut=window.CHAPTER.cutoffs;
  const roc=[{name:"Nobody flagged",x:0,y:0},...cut.slice().reverse().map(([minutes,,tp,,fp])=>({
    name:`Wait > ${minutes} min`,x:fp/4446,y:tp/758})),{name:"Everyone flagged",x:1,y:1}];
  const rx=v=>77+324*v,ry=v=>252-168*v;
  function rocPoint(r,i) {
    const p=roc[i],label=r.querySelector(".roc-value");
    r.querySelector(".roc-marker").style.transform=`translate(${rx(p.x)}px,${ry(p.y)}px)`;
    label.textContent=`${p.name} · false alarms ${(p.x*100).toFixed(1)}% · recall ${(p.y*100).toFixed(1)}%`;
    return p;
  }
  lesson("s39","ROC operating points","Original waiting-time file · measured cut-offs plus conceptual endpoints",[
    "Nobody flagged gives the origin.","Looser cut-offs add calls.","Vertical movement is recall.","Horizontal movement is the false-positive rate.",
    "False-positive rate = false alarms / 4,446 quiet visits.","One cut-off gives one pair of rates.","Trace the ROC curve across cut-offs.",
    "At 90 minutes, recall is about 80% and false-positive rate is about 5%.","Explore the sampled waiting-time curve."
  ],path("M77 83 V252 H406",M,2)+txt(77,73,"Recall",13,G,"start")+txt(247,280,"False-positive rate",14,T)+
    [0,.5,1].map(v=>txt(rx(v),267,v,10,M)+txt(68,ry(v)+3,v,10,M,"end")).join("")+
    layer(2,path("M77 250 V112",G,3,"3 4"),2)+layer(3,path("M81 252 H325",T,3,"3 4"),4)+
    layer(6,path(roc.map((p,i)=>(i?"L":"M")+rx(p.x)+" "+ry(p.y)).join(" "),N,3)+
      roc.map(p=>dot(rx(p.x),ry(p.y),2.6,N)).join(""))+
    `<g class="roc-marker">${dot(0,0,9,white)+dot(0,0,6,T)}</g><text class="roc-value" x="240" y="296" text-anchor="middle" font-size="12" font-weight="700" fill="${N}"></text>`,
    (r,b)=>{const index=r.dataset.roc===undefined?[0,2,3,4,5,6,7,7,7][b]:+r.dataset.roc;
      rocPoint(r,index);
      const control=document.getElementById("roc-cut");
      if(control){control.value=index;control.style.setProperty("--p",(100*index/(roc.length-1))+"%");}
      if(r.dataset.roc!==undefined)r.querySelector('[data-from="6"]').style.opacity=1;});
  SC.s39.points=roc;
  SC.s39.move=(r,i)=>{r.dataset.roc=i;r.querySelector('[data-from="6"]').style.opacity=1;return rocPoint(r,i);};

  lesson("s40","AUC as a pairwise contest","Illustrative pair · a higher score predicts a complaint",[
    "Draw one visit from each outcome group.","Rank the pair by their scores.","A correctly ordered pair earns one point.",
    "Ties earn half a point and a reversal earns zero.","Average the credit over all eligible pairs.","This average equals ROC AUC.",
    "Perfect order earns 1 and chance averages 0.5.","Order survives a strictly increasing rescaling.","The ranking leaves the cut-off open."
  ],card(37,87,189,72,"Complaint visit","score A",T)+card(255,87,189,72,"Quiet visit","score B",N)+
    layer(1,path("M67 201 H413",M,2)+txt(62,226,"lower",12,M)+txt(417,226,"higher",12,M)+dot(326,201,9,T)+dot(146,201,9,N))+
    layer(2,tag(77,250,325,"A > B: 1 point",G),2)+layer(3,tag(62,250,356,"A > B: 1      A = B: ½      A < B: 0",N),3)+
    layer(4,tag(74,250,332,"Total ranking credit ÷ number of pairs",G),5)+layer(6,tag(74,250,332,"Chance: 0.5       Perfect order: 1.0",N),6)+
    layer(7,tag(74,250,332,"Same order → same AUC",G)));

  function round(root,k) {
    root.querySelectorAll(".tray").forEach((e,i)=>{
      const held=k===i;
      e.querySelector("rect").setAttribute("fill",held?T:N);
      e.querySelector(".job").textContent=held?"judge":"fit";
      e.style.transform=held?"translateY(13px)":"none";
    });
    root.querySelector(".round-caption").textContent=`Round ${k+1} · visit C helps ${k===2?"judge":"fit"} the rule`;
  }
  lesson("s41","Rotate the held-out tray","Development only · the test envelope stays sealed",[
    "Follow a visit in tray C.","Hold A aside in round one.","C helps fit this round.","In round three, hold C aside.",
    "Fit replacements and the model on A, B, D and E.","Save the held-out prediction for C.","Every tray gets one validation turn.",
    "Different mixtures can give different scores.","Rotate all five rounds."
  ],Array.from({length:5},(_,i)=>`<g class="tray">${rect(31+i*85,109,76,81,N)+txt(69+i*85,140,"ABCDE"[i],23,white)}
    <text class="job" x="${69+i*85}" y="169" text-anchor="middle" font-size="14" fill="white"></text>${i===2?dot(92+i*85,120,4,Y):""}</g>`).join("")+
    '<text class="round-caption" x="240" y="237" text-anchor="middle" font-size="18" font-weight="700"></text>'+
    tag(135,261,210,"Final test · sealed",G),
    (r,b)=>round(r,r.dataset.round===undefined?(b<3?0:b<6?2:b-4):+r.dataset.round));
  SC.s41.move=(r,k)=>{r.dataset.round=k;round(r,k);};

  lesson("s42","Compare on equal terms","Al Waha · a proposed comparison of complaint classifiers",[
    "Compare a smooth rule with a flexible procedure.","Agree on the target and prediction time.","Use the same rows, inputs and folds.",
    "Extra inputs change the comparison.","Learn replacements inside training folds.","Apply the fitted replacements unchanged.",
    "Tune the whole procedure fairly.","Compare paired predictions on one primary measure.","Choose before opening the test envelope."
  ],card(37,88,174,66,"Simple curve","candidate A",N)+card(268,88,174,66,"Flexible rule","candidate B",T)+
    layer(1,txt(240,180,"Same outcome at the same time",14,M))+
    layer(2,path("M122 159 V199 H355 V159",G,2)+tag(111,213,258,"Matched validation visits",G),3)+
    layer(4,tag(54,204,161,"fit on training",N)+arrow(222,218,32)+tag(263,204,165,"apply to held fold",G),6)+
    layer(7,tag(94,210,292,"Difference on the same cases",G))+
    layer(8,txt(240,270,"Final test remains sealed",15,T)));

  lesson("s43","What do the extra calls buy?","Original waiting rules · historical workload across 5,204 visits",[
    "A ranked list still needs a stopping point.","At 110 minutes, flag 407 visits.","At 90 minutes, flag 814 visits.",
    "Gain 225 additional recorded complaints.","Add 182 calls to visits without complaints.","The extra 407 calls have two parts.",
    "Shift planning also needs local visit volume.","Use development results for a model threshold.","Freeze the policy before final evaluation."
  ],layer(0,txt(43,88,"Visits assigned to the call list",16,N,"start"))+
    layer(1,txt(44,119,"110 min",13,M,"start")+rect(114,104,153,19,N)+txt(282,119,"407",14,N,"start"))+
    layer(2,txt(44,157,"90 min",13,M,"start")+rect(114,143,306,19,N)+txt(420,187,"814 calls",14,N,"end"))+
    layer(3,rect(57,212,184,28,G)+txt(149,231,"+225 hits",14,white))+
    layer(4,rect(241,212,148,28,Y)+txt(315,231,"+182 false calls",13,I))+
    layer(6,txt(240,277,"From historical totals to shift capacity",15,M)));

  const calX=v=>83+308*v,calY=v=>245-146*v;
  lesson("s44","Check the numerical chances","Illustrative calibration plot · no fitted Al Waha calibration values",[
    "Gather visits given similar chances.","One in five predicted should mean about one in five observed.","Agreement is calibration.",
    "Plot the mean prediction horizontally.","Plot the observed event share vertically.","Below the diagonal means overprediction.",
    "Rescaling can preserve ranks while changing chances.","Reliable probabilities help estimate demand.","Show how many visits support each point."
  ],path("M83 92 V245 H398",M,2)+txt(245,275,"mean predicted chance",14,N)+txt(44,80,"observed share",13,M,"start")+
    layer(1,path("M83 245 L391 99",G,2,"5 5"))+
    layer(3,path(`M${calX(.2)} 244 V${calY(.2)}`,N,2,"3 3")+txt(calX(.2),262,"0.2",11,N))+
    layer(4,dot(calX(.2),calY(.2),6,N)+dot(calX(.5),calY(.34),6,T)+dot(calX(.8),calY(.66),6,T))+
    layer(5,path(`M${calX(.5)} ${calY(.5)} V${calY(.34)}`,T,3)+txt(305,215,"too high",13,T))+
    layer(8,txt(244,294,"Report group sizes with the plot.",13,M)));

  lesson("s45","Keep predictions paired","Illustrative bootstrap · each letter identifies one patient",[
    "Score two fixed rules on the same patients.","The observed difference varies across samples.","Draw patients again with replacement.",
    "Carry each outcome and both scores together.","Calculate the difference each time.","Use its spread to quantify uncertainty.",
    "Keep repeated visits from a patient together.","Report the interval method and sampling unit.","The interval applies to this evaluation setting."
  ],card(28,78,424,60,"Original evaluation group","A      B      C      D      E",N)+
    layer(2,card(28,151,199,68,"Resample one","B   B   C   A   E",G)+card(250,151,201,68,"Resample two","D   E   E   B   A",T))+
    layer(3,txt(240,243,"One bundle = outcome + score A + score B",13,N))+
    layer(4,tag(100,262,280,"One paired difference per resample",G)));

  const reportSections=["Population and time","Eligible episodes","Inputs and missingness","Development and split","Positive category",
    "Test base rate and accuracy","Errors and uncertainty","Ranking and calibration","Limits and implications"];
  const reportNote=["Who is scored, and when?","Eligibility, exclusions, follow-up","Inputs available at the decision",
    "Split unit, folds, settings, cut-off","Complaint recorded = positive","Events / visits · correct / visits",
    "TP, FP, FN, TN · recall · precision","AUC across cut-offs · probability check","Likely workload and missed visits"];
  lesson("s46","Build the results paragraph","Thesis writing guide · fill with your own locked evaluation results",[
    "Name the population and prediction moment.","Account for eligible episodes and exclusions.","Describe predictors and missing-data handling.",
    "Explain validation, splitting and freezing.","Identify the positive category.","Give test base rate beside accuracy.",
    "Report all four cells and interval estimates.","Distinguish discrimination from calibration.","Interpret the consequences within this population."
  ],rect(42,70,396,221,paper,pale)+reportSections.map((v,i)=>layer(i,
    rect(59,89,361,61,white)+txt(77,113,"REPORT SECTION",11,T,"start")+txt(77,138,v,18,N,"start")+
    txt(77,185,reportNote[i],14,I,"start")+
    path("M76 215 H364 M76 231 H326 M76 247 H290",pale,3),i)).join(""));

  lesson("s47","Edit the claim","Original waiting-time analysis · descriptive comparison",[
    "Review a coauthor’s draft.","Identify the evaluation population.","Check who belongs in the denominator.",
    "Observed outcomes cannot identify the effect of shortening a wait.","Prevention requires an intervention study.","Select a defensible results sentence."
  ],rect(38,83,404,192,paper,pale)+txt(65,118,"RESULTS",13,T,"start")+
    layer(1,txt(65,152,"In the original waiting-time file,",16,N,"start"))+
    layer(2,txt(65,183,"605 of 758 visits with complaints",16,I,"start")+
      txt(65,208,"would have been flagged.",16,I,"start"))+
    layer(3,path("M63 222 H356",G,2)+txt(65,253,"Observed counting claim",14,G,"start")));

  lesson("s48","Change the outcome","Al Waha · 5,200 cleaned episodes · 30-day readmission",[
    "Change the event to a return within 30 days.","Score each eligible visit at discharge.","Check that each feature is available.",
    "Allow the full 30 days of follow-up.","The archived readmission base rate is 21.6%.","Compare on matched development folds.",
    "Define the cost of a miss and an additional call.","Describe the frozen policy on held-out visits.","Evaluating follow-up itself is a further study."
  ],layer(0,card(34,79,412,60,"Return within 30 days","new outcome definition",N))+
    layer(1,path("M59 191 H419",M)+dot(71,191,7,N)+dot(408,191,7,T)+txt(78,173,"Discharge",13,N)+txt(398,173,"Day 30",13,T))+
    layer(2,txt(101,218,"Inputs ready",13,N))+layer(3,txt(370,218,"Outcome known",13,T))+
    layer(4,tag(116,246,249,"21.6% readmission base rate",G),4)+layer(5,tag(110,246,260,"Shared development folds",G),6)+
    layer(7,tag(80,246,320,"Frozen follow-up policy · final test",N)));
})();
