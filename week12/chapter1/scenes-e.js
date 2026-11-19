/* Week 12 · Chapter 2 animated scenes, part E (s39–s49). Uses window.SCH helpers from scenes-a.js.
   Data: window.W12DATA and window.W12X. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, D = window.W12DATA, X = window.W12X;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, CL } = H.C;
  const { t } = H;
  const PAPER = "#F6F1E7", EDGE = "#CDBFA6";
  const fmt = n => Math.round(n).toLocaleString("en-US");

  /* ------------------------------------------------------------ s39 · interactive dendrogram cutter */
  const DG39 = X.dendro, NL39 = DG39.ids.length;
  const ord39 = (() => {
    const kids = {}; DG39.link.forEach(([a, b], i) => { kids[NL39 + i] = [a, b]; });
    const walk = n => n < NL39 ? [n] : [...walk(kids[n][0]), ...walk(kids[n][1])];
    return walk(NL39 + DG39.link.length - 1);
  })();
  const DX39 = 38, DW39 = 236, DY39 = 278, DH39 = 204, HMAX39 = DG39.link[DG39.link.length - 1][2];
  const nd39 = {};
  ord39.forEach((leaf, i) => { nd39[leaf] = { x: DX39 + i * DW39 / (NL39 - 1), y: DY39 }; });
  const LK39 = DG39.link.map(([a, b, h], i) => {
    const A = nd39[a], B = nd39[b], y = DY39 - h / HMAX39 * DH39;
    nd39[NL39 + i] = { x: (A.x + B.x) / 2, y };
    return { d: `M${A.x.toFixed(1)} ${A.y.toFixed(1)} V${y.toFixed(1)} H${B.x.toFixed(1)} V${B.y.toFixed(1)}`, h, y, i };
  });
  // Cut presets: [height, k, leafGroups in leaf index 0..9]
  const CUTS39 = [
    { h: 5.0, k: 2, grp: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], desc: "2 balanced groups (5 and 5 episodes)" },
    { h: 2.8, k: 3, grp: [2, 0, 0, 0, 0, 1, 1, 1, 1, 1], desc: "3 groups: AW101757 splits off from Group 1" },
    { h: 2.1, k: 4, grp: [2, 3, 0, 0, 0, 1, 1, 1, 1, 1], desc: "4 groups: AW100198 splits off next" },
    { h: 1.7, k: 5, grp: [2, 3, 0, 0, 0, 1, 1, 4, 4, 4], desc: "5 groups: Group 2 splits into two sub-branches" }
  ];
  const POS39 = [[338, 128], [358, 108], [344, 78], [368, 86], [352, 68], [418, 134], [434, 142], [412, 168], [428, 176], [442, 160]];

  SC.s39 = {
    copy: [
      { k: "Where would you cut the tree?", m: "Keep the tree fixed", s: "Ten episodes · one fixed tree", l: "Keep the tree fixed" },
      { k: "Where would you cut the tree?", m: "Count crossings", s: "Crossings at the cut = number of groups", l: "Count crossings" },
      { k: "Where would you cut the tree?", m: "Lower the cut", s: "The branch containing AW101757 splits", l: "Lower the cut" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="14" width="284" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(154, 35, "Al Waha dendrogram (10 episodes)", 13, NAVY, "middle", 800)}
<path d="M30 56 V278 H284" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
${[0, 2, 4, 6].map(h => {
  const y = DY39 - h / HMAX39 * DH39;
  return `<path d="M30 ${y.toFixed(1)} H284" stroke="#EFE8DA" stroke-width="1"/>` + t(25, y + 4, h, 9.5, MUTED, "end", 700);
}).join("")}
${LK39.map(l => `<path class="br39" data-h="${l.h}" d="${l.d}" fill="none" stroke="${NAVY}" stroke-width="2.6" stroke-linejoin="round" style="transition:stroke .5s"/>`).join("")}
<g class="cutline39" style="transition:transform .7s cubic-bezier(.3,.8,.25,1)">
  <line x1="28" y1="0" x2="286" y2="0" stroke="${TERRA}" stroke-width="2.8" stroke-dasharray="6 4"/>
  <rect x="34" y="-18" width="114" height="16" rx="4" fill="${TERRA}"/>
  ${t(91, -6, "✂ cut = 5.0 → k = 2", 10, "#fff", "middle", 800, "cuttxt39")}
</g>
${ord39.map(leaf => `<g>
  <circle class="lf39" data-leaf="${leaf}" cx="${nd39[leaf].x.toFixed(1)}" cy="${DY39}" r="5.5" style="transition:fill .5s"/>
  <title>${DG39.ids[leaf]}</title>${t(nd39[leaf].x,DY39+22,DG39.ids[leaf].slice(-4),9.5,INK)}
</g>`).join("")}
${t(154,327,"Visit ID · last four digits",11,MUTED)}
<rect x="306" y="14" width="162" height="196" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(387, 35, "Same leaves · schematic", 12.5, INK, "middle", 800)}
<rect x="318" y="46" width="138" height="148" rx="8" fill="#FBF8F1" stroke="${EDGE}"/>
${POS39.map(([x, y], leaf) => `<circle class="mp39" data-leaf="${leaf}" cx="${x}" cy="${y}" r="5.5" stroke="#fff" stroke-width="1.5" style="transition:fill .5s"/>`).join("")}
<rect x="306" y="220" width="162" height="126" rx="14" fill="${INK}"/>
${t(387, 242, "Why trees help", 13, GOLD, "middle", 800)}
${t(387, 264, "", 11.5, "#fff", "middle", 700, "ndesc39")}
${t(387, 290, "Lowering the cut splits", 10.5, "#E7DDCB", "middle", 600)}
${t(387, 305, "one branch without", 10.5, "#E7DDCB", "middle", 600)}
${t(387, 320, "reshuffling the others.", 10.5, "#E7DDCB", "middle", 600)}`,
    cut(r, idx) {
      const c = CUTS39[idx] || CUTS39[0];
      const y = DY39 - c.h / HMAX39 * DH39;
      const cl = r.querySelector(".cutline39");
      if (cl) cl.style.transform = `translateY(${y.toFixed(1)}px)`;
      const ct = r.querySelector(".cuttxt39");
      if (ct) ct.textContent = `✂ h = ${c.h.toFixed(1)} → k = ${c.k}`;
      H.q(r, ".br39").forEach(e => { e.style.stroke = +e.dataset.h > c.h ? GREY : NAVY; });
      H.q(r, ".lf39,.mp39").forEach(e => { const lf = +e.dataset.leaf; e.style.fill = CL[c.grp[lf]]; });
      const nd = r.querySelector(".ndesc39");
      if (nd) nd.textContent = `k = ${c.k} nested groups`;
    },
    render(r) {
      const sv = r.querySelector("svg");
      if (!sv._init39) { sv._init39 = 1; SC.s39.cut(r, 0); }
    }
  };

  /* ------------------------------------------------------------ s40 · DBSCAN mechanism: core, border, noise */
  function densityGroups(points,radius,minimum) {
    const neighbours=points.map(([x,y])=>points.reduce((found,p,i)=>{
      if(Math.hypot(p[0]-x,p[1]-y)<=radius)found.push(i);
      return found;
    },[]));
    const core=neighbours.map(near=>near.length>=minimum);
    const labels=points.map(()=>-1);
    let count=0;
    for(let seed=0;seed<points.length;seed++){
      if(!core[seed] || labels[seed]!==-1)continue;
      labels[seed]=count;
      const queue=[seed];
      for(let i=0;i<queue.length;i++){
        for(const j of neighbours[queue[i]]){
          if(labels[j]!==-1)continue;
          labels[j]=count;
          if(core[j])queue.push(j);
        }
      }
      count++;
    }
    return {neighbours,core,labels,count,noise:labels.filter(v=>v<0).length};
  }
  const sample40=[[133,163],[111,148],[111,177],[135,142],[153,152],[158,172],
    [177,162],[193,150],[194,179],[215,163],[227,180],[245,175],[84,160],[331,110],[372,205]];
  const eps40=36, density40=densityGroups(sample40,eps40,5);
  const order40=sample40.map((p,i)=>i).sort((a,b)=>Math.hypot(sample40[a][0]-133,sample40[a][1]-163)-Math.hypot(sample40[b][0]-133,sample40[b][1]-163));
  SC.s40 = {
    copy: [
      { k: "Grow one group by visiting its neighbours", m: "Start with a single dot", s: "Illustrative neighbourhood", l: "Start with a single dot" },
      { k: "Grow one group by visiting its neighbours", m: "Draw its neighbourhood", s: "ε sets the radius   ·   minimum count includes the centre", l: "Draw its neighbourhood" },
      { k: "Grow one group by visiting its neighbours", m: "Recognise a core", s: "A core has at least five visits within reach here", l: "Recognise a core" },
      { k: "Grow one group by visiting its neighbours", m: "Grow from core to core", s: "Only a core can extend the group", l: "Grow from core to core" },
      { k: "Grow one group by visiting its neighbours", m: "Leave an isolated visit ungrouped", s: "Al Waha (ε = 0.7, min_samples = 10) · 23 noise episodes (label −1)", l: "Leave an isolated visit ungrouped" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,32,"Grow a neighbourhood · illustrative visits",16,NAVY)}
      <rect x="23" y="50" width="434" height="210" rx="15" fill="white" stroke="${EDGE}"/>
      ${sample40.map(([x,y],i)=>density40.core[i]?`<circle class="a o0 ring40" data-i="${i}" cx="${x}" cy="${y}" r="${eps40}" fill="${NAVY}" fill-opacity=".045" stroke="${NAVY}" stroke-dasharray="4 4"/>`:"").join("")}
      <circle class="a o0 start40" cx="133" cy="163" r="${eps40}" fill="${GOLD}" fill-opacity=".2" stroke="${TERRA}" stroke-width="2"/>
      ${sample40.map(([x,y],i)=>`<circle class="pt vis40" cx="${x}" cy="${y}" r="6" stroke="white" stroke-width="1.5"/>`).join("")}
      ${t(240,292,"",16,INK,"middle",700,"count40")}
      ${t(240,323,"",13,MUTED,"middle",600,"legend40")}`,
    render(r,b){
      H.show(r,".start40",b===1 || b===2);
      H.q(r,".ring40").forEach(el=>{
        el.style.transitionDelay=b===3?order40.indexOf(+el.dataset.i)*.09+"s":"0s";
        el.style.opacity=b>=3?"1":"0";
      });
      H.q(r,".vis40").forEach((el,i)=>{
        const inside=density40.neighbours[0].includes(i);
        el.style.transitionDelay=b===3?order40.indexOf(i)*.09+"s":"0s";
        el.style.fill=b>=3?(density40.labels[i]<0?GREY:density40.core[i]?NAVY:GOLD):b===2 && inside?NAVY:i===0?TERRA:GREY;
        el.style.stroke=b===4 && density40.labels[i]<0?TERRA:"white";
      });
      r.querySelector(".count40").textContent=["Start at the marked visit","Count the centre itself",density40.neighbours[0].length+" visits inside · minimum 5","Blue cores extend the search","Isolated grey visits receive label −1 (23 at Al Waha, ε = 0.7)"][b];
      r.querySelector(".legend40").textContent=b===4?"Al Waha (ε = 0.7, min_samples = 10): 23 noise episodes":b>=3?"Gold · reachable border     Grey · outside the group":"One circle shows the reach of a single step";
    }
  };

  /* ------------------------------------------------------------ s41 · interactive DBSCAN radius explorer */
  const radii41=[.03,.055,.075,.11,.18];
  const fits41=radii41.map(rad=>densityGroups(D.pts,rad,10));
  const box41=[20,57,240,240], anchor41=D.pts[17];
  SC.s41 = {
    copy: [
      { k: "How far should a neighbourhood reach?", m: "Hold the minimum fixed", s: "240 displayed dots · measured in map coordinates", l: "Hold the minimum fixed" },
      { k: "How far should a neighbourhood reach?", m: "Try two nearby radii", s: "Grey = noise for this setting", l: "Try two nearby radii" },
      { k: "How far should a neighbourhood reach?", m: "Compare with the full fit", s: "Compare the recorded four-variable fit separately", l: "Compare with the full fit" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,30,"DBSCAN on 240 displayed positions",17,NAVY)}
      <rect x="12" y="48" width="256" height="258" rx="12" fill="white" stroke="${EDGE}"/>
      ${H.dots(D.pts,...box41,"p41",2.65)}
      <circle class="rad41" cx="${20+240*anchor41[0]}" cy="${57+240*(1-anchor41[1])}" fill="${GOLD}" fill-opacity=".18" stroke="${INK}" stroke-width="1.7" style="transition:r .7s"/>
      ${t(291,88,"Map radius",14,MUTED,"start")}
      ${t(291,122,"",26,NAVY,"start",800,"eps41")}
      ${t(291,163,"",16,INK,"start",700,"groups41")}
      ${t(291,196,"",16,INK,"start",700,"noise41")}
      ${t(291,244,"Minimum count",13,MUTED,"start")}
      ${t(291,266,"10 including self",14,NAVY,"start")}
      ${t(240,330,"Each map axis spans one unit. Grey dots are noise.",13,INK)}`,
    radii:radii41,
    setEps(r,i){
      const fit=fits41[i], radius=radii41[i];
      r.querySelector(".rad41").setAttribute("r",240*radius);
      r.querySelector(".eps41").textContent=radius.toFixed(3);
      r.querySelector(".groups41").textContent=fit.count+" groups";
      r.querySelector(".noise41").textContent=fit.noise+" noise visits";
      H.q(r,".p41").forEach((el,j)=>{
        const group=fit.labels[j];
        el.style.fill=group<0?GREY:(CL[group] || "hsl("+((group*137)%360)+" 55% 38%)");
      });
      return fit;
    },
    render(r){
      if(!r.dataset.radiusSet){r.dataset.radiusSet="1";this.setEps(r,1);}
    }
  };

  /* ------------------------------------------------------------ s42 · Gaussian Mixture Models (soft clustering & ellipses) */
  // Two equally weighted illustrative Gaussian components with equal determinants.
  const means42=[[150,142],[310,142]],angle42=[-18,18];
  function share42(x,y){
    const densities=means42.map(([mx,my],i)=>{
      const a=angle42[i]*Math.PI/180, dx=x-mx,dy=y-my;
      const u=(dx*Math.cos(a)+dy*Math.sin(a))/54;
      const v=(-dx*Math.sin(a)+dy*Math.cos(a))/28;
      return Math.exp(-.5*(u*u+v*v));
    });
    return densities[0]/(densities[0]+densities[1]);
  }
  SC.s42 = {
    copy: [
      { k: "How much support does a visit give each group?", m: "Start with a single label", s: "A hard assignment gives one label", l: "Start with a single label" },
      { k: "How much support does a visit give each group?", m: "Follow a visit into the overlap", s: "Illustrative visit · two overlapping profiles", l: "Follow a visit into the overlap" },
      { k: "How much support does a visit give each group?", m: "Model the overlap", s: "Ellipses mark equal density within a component", l: "Model the overlap" },
      { k: "How much support does a visit give each group?", m: "Apportion membership", s: "Al Waha (k = 2): AW101099 is 1.00 / 0.00 · only 0.3% have max p < 0.80", l: "Apportion membership" },
      { k: "How much support does a visit give each group?", m: "Compare model sizes", s: "Lower BIC is preferred among the fitted candidates", l: "Compare model sizes" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,29,"Two illustrative operating profiles",16,NAVY)}
      <rect x="20" y="44" width="440" height="180" rx="13" fill="white" stroke="${EDGE}"/>
      ${means42.map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(${angle42[i]})">
        ${[1,2].map(scale=>`<ellipse class="a o0 contour42" rx="${54*scale}" ry="${28*scale}" fill="${CL[i]}" fill-opacity=".08" stroke="${CL[i]}" stroke-width="1.5"/>`).join("")}
        <circle r="5" fill="${CL[i]}"/></g>`).join("")}
      <path class="a cut42" d="M230 55 V215" stroke="${GREY}" stroke-dasharray="5 4"/>
      <circle class="marker42" cy="142" cx="158" r="8" stroke="${INK}" stroke-width="2.5" fill="${GOLD}" style="transition:cx 1.2s"/>
      <g class="a o0 shares42"><rect x="75" y="255" width="330" height="19" rx="4" fill="${TERRA}"/>
      <rect x="75" y="255" width="0" height="19" rx="4" class="blue42" fill="${NAVY}" style="transition:width 1.2s"/>
      ${t(75,298,"",14,NAVY,"start",700,"left42")}
      ${t(405,298,"",14,TERRA,"end",700,"right42")}</g>
      ${t(240,335,"",13,INK,"middle",700,"foot42")}`,
    render(r,b){
      const x=[159,216,216,230,230][b],share=share42(x,142);
      r.querySelector(".marker42").setAttribute("cx",x);H.show(r,".cut42",b<2);
      H.show(r,".contour42",b>=2);H.show(r,".shares42",b>=2);
      r.querySelector(".blue42").setAttribute("width",330*share);
      const blue=Math.round(100*share);
      r.querySelector(".left42").textContent="Blue · "+blue+"%";
      r.querySelector(".right42").textContent="Orange · "+(100-blue)+"%";
      r.querySelector(".foot42").textContent=["Nearest centre assigns one label","The marked visit approaches the boundary","Ellipses trace the two model densities","Al Waha (k = 2): AW101099 has posteriors 1.00 and 0.00 · 0.3% < 0.80","Compare fit and complexity using BIC"][b];
    }
  };

  /* ------------------------------------------------------------ s43 · four clustering methods compared */
  const methods43=[
    ["k-means","A centre for each group","Choose k",NAVY],
    ["Ward","A tree of nested groups","Choose a cut",GREEN],
    ["DBSCAN","Neighbourhoods and noise","Choose radius and count",TERRA],
    ["Gaussian mixture","A share for each component","Compare candidate fits","#77548B"]
  ];
  const marks43=[
    '<path d="M0 0 L15 -9 M0 0 L19 8 M0 0 L-12 8" stroke="currentColor"/><circle r="4" fill="currentColor"/>',
    '<path d="M-16 12 V1 H0 V12 M-8 1 V-9 H13 V12" fill="none" stroke="currentColor" stroke-width="2"/>',
    '<circle cx="-5" r="12" fill="none" stroke="currentColor"/><circle cx="-9" r="3"/><circle cy="4" r="3"/><circle cx="-4" cy="-5" r="3"/><circle cx="18" cy="7" r="2" fill="gray"/>',
    '<ellipse cx="-6" rx="12" ry="6" transform="rotate(-20)" fill="none" stroke="currentColor"/><ellipse cx="6" rx="12" ry="7" transform="rotate(20)" fill="none" stroke="currentColor"/>'
  ];
  SC.s43 = {
    copy: [
      { k: "Which output does the ward team need?", m: "Start from the question", s: "Match the output to the question", l: "Start from the question" },
      { k: "Which output does the ward team need?", m: "A representative centre", s: "k-means · centres", l: "A representative centre" },
      { k: "Which output does the ward team need?", m: "A nested description", s: "Ward · nested groups", l: "A nested description" },
      { k: "Which output does the ward team need?", m: "A neighbourhood", s: "DBSCAN · dense neighbourhoods", l: "A neighbourhood" },
      { k: "Which output does the ward team need?", m: "A share for each group", s: "Gaussian mixture · membership probabilities", l: "A share for each group" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,33,"What will the manager receive?",17,INK)}
      ${methods43.map(([name,output,setting,col],i)=>{
        const y=53+i*72;
        return `<g class="a method43"><rect x="18" y="${y}" width="444" height="60" rx="10" fill="white" stroke="${col}" stroke-width="2"/>
        <g transform="translate(52 ${y+30})" color="${col}" fill="${col}">${marks43[i]}</g>
        ${t(85,y+25,name,15,col,"start",800)}${t(85,y+47,setting,12,MUTED,"start")}
        ${t(249,y+35,output,14,INK,"start")}</g>`;
      }).join("")}`,
    render(r,b){H.q(r,".method43").forEach((g,i)=>g.style.opacity=b===0||b===i+1?"1":".38");}
  };

  /* ------------------------------------------------------------ s44 · cluster stability (seed, subsample, method) */
  SC.s44 = {
    copy: [
      { k: "Would the same visits stay together?", m: "Repeat the decision", s: "Repeat starts, samples and methods", l: "Repeat the decision" },
      { k: "Would the same visits stay together?", m: "Ignore the colour names", s: "Chance-adjusted pair agreement can also be negative", l: "Ignore the colour names" },
      { k: "Would the same visits stay together?", m: "Change the start", s: "Minimum across starts · 1.00 vs 0.56", l: "Change the start" },
      { k: "Would the same visits stay together?", m: "Change the sample", s: "Compare labels on the same visits", l: "Change the sample" },
      { k: "Would the same visits stay together?", m: "Change the method", s: "Ward vs k-means · adjusted Rand index 0.973", l: "Change the method" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="12" width="452" height="52" rx="11" fill="${INK}"/>
${t(240, 32, "Adjusted Rand Index (ARI) · Agreement between two clusterings", 12.5, GOLD, "middle", 800)}
<rect x="44" y="40" width="392" height="10" rx="5" fill="#3A4252"/>
<rect x="44" y="40" width="392" height="10" rx="5" fill="${GREEN}" fill-opacity=".75"/>
${t(44, 60, "0 = expected by chance", 9.5, "#E7DDCB", "start", 600)}${t(436, 60, "1.00 = identical groups", 9.5, "#9EE6B8", "end", 700)}
<g class="a o0 pairs44">
      <rect x="36" y="100" width="408" height="185" rx="12" fill="#fff" stroke="${EDGE}"/>
      ${t(240,127,"Do the same visits stay together?",16,INK)}
      ${[0,1].map(row=>`<g class="pairfit44-${row}">${t(67,166+row*61,"Fit "+(row+1),14,INK,"start")}
        ${["A","B","C","D"].map((name,i)=>{
          const x=163+i*66,y=162+row*61,col=(i<2)!==Boolean(row)?NAVY:TERRA;
          return `<circle cx="${x}" cy="${y}" r="17" fill="${col}"/>${t(x,y+5,name,14,"white")}`;
        }).join("")}</g>`).join("")}
      ${t(240,266,"A stays with B even when the colour names switch.",13,MUTED)}</g>
<g class="a o0 stcard44-1">
  <rect x="14" y="74" width="144" height="270" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2"/>
  ${t(86, 96, "1 · Seed stability", 13, NAVY, "middle", 800)}
  ${t(86, 112, "20 random starts", 10.5, MUTED, "middle", 600)}
  ${[["k = 2", 1.00, GREEN], ["k = 4", 0.558, TERRA], ["k = 6", 0.532, TERRA]].map(([k, v, c], i) => {
    const h = v * 120, y = 268 - h;
    return `<rect x="${30 + i * 40}" y="${y.toFixed(1)}" width="30" height="${h.toFixed(1)}" rx="5" fill="${c}"/>
      ${t(45 + i * 40, y - 6, v.toFixed(2), 11, c, "middle", 800)}
      ${t(45 + i * 40, 284, k, 11, INK, "middle", 700)}`;
  }).join("")}
  ${t(86, 312, "Minimum pairwise ARI", 10.5, MUTED, "middle", 700)}
  ${t(86, 328, "k = 2 minimum · 1.00", 11, GREEN, "middle", 800)}
</g>
<g class="a o0 stcard44-2">
  <rect x="168" y="74" width="144" height="270" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2"/>
  ${t(240, 96, "2 · Half-samples", 13, GREEN, "middle", 800)}
  ${t(240, 112, "20 random 50% splits", 10.5, MUTED, "middle", 600)}
  <rect x="186" y="130" width="108" height="34" rx="7" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/>
  ${t(240, 151, "Full file (4,729)", 11.5, NAVY, "middle", 800)}
  ${t(240, 180, "↕ compare 20×", 11, MUTED, "middle", 700)}
  <rect x="186" y="190" width="108" height="34" rx="7" fill="#EBF5EE" stroke="${GREEN}" stroke-width="1.5"/>
  ${t(240, 211, "Half of the visits", 11, GREEN, "middle", 800)}
  <rect x="184" y="246" width="112" height="44" rx="9" fill="${GREEN}"/>
  ${t(240, 274, "ARI = 1.00", 18, "#fff", "middle", 800)}
  ${t(240, 312, "Same two regimes on", 10.5, MUTED, "middle", 600)}
  ${t(240, 328, "the half-sample check", 11, GREEN, "middle", 800)}
</g>
<g class="a o0 stcard44-3">
  <rect x="322" y="74" width="144" height="270" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2"/>
  ${t(394, 96, "3 · Across methods", 13, NAVY, "middle", 800)}
  ${t(394, 112, "k-means vs Ward (k=2)", 10.5, MUTED, "middle", 600)}
  <circle cx="374" cy="182" r="34" fill="${NAVY}" fill-opacity=".22" stroke="${NAVY}" stroke-width="2"/>
  <circle cx="410" cy="182" r="34" fill="${GREEN}" fill-opacity=".22" stroke="${GREEN}" stroke-width="2"/>
  ${t(392, 186, "Pairs", 14, INK, "middle", 800)}
  <rect x="338" y="246" width="112" height="44" rx="9" fill="${NAVY}"/>
  ${t(394, 274, "ARI = 0.973", 17, "#fff", "middle", 800)}
  ${t(394, 312, "Two algorithms,", 10.5, MUTED, "middle", 600)}
  ${t(394, 328, "high pair agreement", 11, NAVY, "middle", 800)}
</g>`,
    render(r, b) {
      H.show(r,".pairs44",b<=1); H.show(r,".pairfit44-1",b===1);
      H.show(r, ".stcard44-1", b >= 2);
      H.show(r, ".stcard44-2", b >= 3);
      H.show(r, ".stcard44-3", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s45 · sensitivity to adding or dropping variables */
  SC.s45 = {
    copy: [
      { k: "What if the same idea enters twice?", m: "Count the measurements", s: "Columns define the distance calculation", l: "Count the measurements" },
      { k: "What if the same idea enters twice?", m: "One term per column", s: "A pair’s individual shares can differ", l: "One term per column" },
      { k: "What if the same idea enters twice?", m: "Copy the occupancy column", s: "Three identical occupancy terms in a six-term sum", l: "Copy the occupancy column" },
      { k: "What if the same idea enters twice?", m: "Leave one input out", s: "Four reduced fits on the same visits", l: "Leave one input out" },
      { k: "What if the same idea enters twice?", m: "Compare the pairings", s: "ARI from 0.857 (drop training) to 0.977 (drop handoffs)", l: "Compare the pairings" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="452" height="156" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(26, 36, "The Redundant Variable Trap (even after StandardScaler)", 13, INK, "start", 800)}
<g class="bal45">
  ${t(26, 58, "Four inputs, one term per squared gap", 11, MUTED, "start", 700)}
  ${[["Staff ratio", NAVY], ["Training", GOLD], ["Occupancy", TERRA], ["Handoffs", GREEN]].map(([n, c], i) =>
    `<rect x="${26 + i * 108}" y="66" width="102" height="28" rx="6" fill="${c}"/>${t(77 + i * 108, 84, n, 10.5, "#fff", "middle", 800)}`
  ).join("")}
</g>
<g class="a o0 dup45">
  ${t(26, 114, "Copy occupancy twice and its squared gap enters three times.", 11, TERRA, "start", 800)}
  ${[["staff", NAVY], ["train", GOLD], ["hand", GREEN], ["occupancy_%", TERRA], ["Copy 1", TERRA], ["Copy 2", TERRA]].map(([n, c], i) =>
    `<rect x="${26 + i * 72}" y="122" width="68" height="30" rx="6" fill="${c}"/>${t(60 + i * 72, 141, n, 9.5, "#fff", "middle", 800)}`
  ).join("")}
</g>
<g class="a o0 loo45">
  <rect x="14" y="182" width="452" height="164" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(26, 204, "Leave-One-Variable-Out Sensitivity Check (k = 2 on Al Waha)", 13, NAVY, "start", 800)}
  ${[
    ["Drop staff_ratio", "cluster on train, occ, handoffs", "ARI = 0.976"],
    ["Drop training_hours", "cluster on staff, occ, handoffs", "ARI = 0.857"],
    ["Drop occupancy_pct", "cluster on staff, train, handoffs", "ARI = 0.931"],
    ["Drop handoffs", "cluster on staff, train, occ", "ARI = 0.977"]
  ].map(([d, sub, res], i) => `<g transform="translate(0 ${216 + i * 30})">
    <rect x="26" y="0" width="428" height="25" rx="6" fill="#FBF8F1" stroke="${EDGE}"/>
    ${t(36, 17, d, 11.5, INK, "start", 800)}
    ${t(226, 17, sub, 10.5, MUTED, "middle", 600)}
    ${t(442,17,res,11,NAVY,"end",800,"result45")}
  </g>`).join("")}
</g>`,
    render(r, b) {
      H.show(r, ".bal45", b>=1);
      H.show(r, ".dup45", b >= 2);
      H.show(r, ".loo45", b >= 3); H.show(r,".result45",b>=4);
    }
  };

  /* ------------------------------------------------------------ s46 · profiling: z-score snake plot + original units */
  // Exact z-scores from data.js: Group 1 (Stretched: 1.02, 9.66, 89.48, 5.12), Group 2 (Resourced: 1.54, 25.83, 72.68, 2.80)
  // Mean: [1.30, 18.51, 80.29, 3.85], SD: [0.344, 9.668, 10.485, 1.618]
  const Z_STR = [-0.81, -0.92, +0.88, +0.78];
  const Z_RES = [+0.70, +0.76, -0.73, -0.65];
  const VX46 = [56, 122, 188, 254], VY46 = z => 176 - z * 82;

  SC.s46 = {
    copy: [
      { k: "Read the centre in two sets of units", m: "Build a profile", s: "One centre per group", l: "Build a profile" },
      { k: "Read the centre in two sets of units", m: "Read the two scales", s: "Relative values and hospital units", l: "Read the two scales" },
      { k: "Read the centre in two sets of units", m: "Find the zero line", s: "Zero = column mean among complete visits", l: "Find the zero line" },
      { k: "Read the centre in two sets of units", m: "Trace one profile", s: "Stretched occupancy · about +0.88 SD", l: "Trace one profile" },
      { k: "Read the centre in two sets of units", m: "Return to the ward", s: "Within-group SDs (G1 / G2): staff 0.23/0.23 · train 6.13/4.21 · occ 6.73/5.80 · hand 1.06/1.21", l: "Return to the ward" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="14" width="276" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(150, 35, "1 · Z-score snake plot", 13.5, NAVY, "middle", 800)}
${[-1, -0.5, 0, 0.5, 1].map(z => `<path d="M40 ${VY46(z).toFixed(1)} H274" stroke="${z === 0 ? INK : "#EFE8DA"}" stroke-width="${z === 0 ? 2 : 1.2}" stroke-dasharray="${z === 0 ? "5 3" : ""}"/>` + t(35, VY46(z) + 4, z > 0 ? "+" + z : z, 9.5, z === 0 ? INK : MUTED, "end", 700)).join("")}
${["staff", "training", "occupancy", "handoffs"].map((n, i) => `<line x1="${VX46[i]}" y1="74" x2="${VX46[i]}" y2="274" stroke="#F2ECE1" stroke-width="1"/>` + t(VX46[i], 292, n, 10.5, INK, "middle", 700)).join("")}
<path class="dr snk1" pathLength="1" d="M${VX46.map((x, i) => `${x} ${VY46(Z_STR[i]).toFixed(1)}`).join(" L")}" fill="none" stroke="${TERRA}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path class="dr snk2" pathLength="1" d="M${VX46.map((x, i) => `${x} ${VY46(Z_RES[i]).toFixed(1)}`).join(" L")}" fill="none" stroke="${GREEN}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
${VX46.map((x, i) => `<g class="a o0 spts46">
  <circle cx="${x}" cy="${VY46(Z_STR[i]).toFixed(1)}" r="5" fill="${TERRA}"/>
  ${t(x, VY46(Z_STR[i]) + (Z_STR[i] > 0 ? -9 : 16), (Z_STR[i] > 0 ? "+" : "") + Z_STR[i].toFixed(2), 10, TERRA, "middle", 800)}
  <circle cx="${x}" cy="${VY46(Z_RES[i]).toFixed(1)}" r="5" fill="${GREEN}"/>
  ${t(x, VY46(Z_RES[i]) + (Z_RES[i] > 0 ? -9 : 16), (Z_RES[i] > 0 ? "+" : "") + Z_RES[i].toFixed(2), 10, GREEN, "middle", 800)}
</g>`).join("")}
${t(84, 326, "● Stretched (2,147)", 11, TERRA, "middle", 800)}
${t(214, 326, "● Well-resourced (2,593)", 11, GREEN, "middle", 800)}
<g class="a o0 orig46">
  <rect x="298" y="14" width="170" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(383, 35, "2 · Original units", 13.5, INK, "middle", 800)}
  ${t(383, 51, "scaler.inverse_transform()", 10, MUTED, "middle", 600)}
  ${[
    ["Staff ratio", "1.02", "1.54", "1.30", "0.23", "0.23"],
    ["Training (h)", "9.7", "25.8", "18.5", "6.13", "4.21"],
    ["Occupancy (%)", "89.5%", "72.7%", "80.3%", "6.73", "5.80"],
    ["Handoffs", "5.1", "2.8", "3.85", "1.06", "1.21"]
  ].map(([n, s, w, m, sd1, sd2], i) => `<g transform="translate(308 ${66 + i * 66})">
    <rect width="150" height="58" rx="8" fill="#FBF8F1" stroke="${EDGE}"/>
    ${t(75, 16, n + " (mean " + m + ")", 10.5, MUTED, "middle", 700)}
    ${t(38, 40, s, 14.5, TERRA, "middle", 800)}${t(112, 40, w, 14.5, GREEN, "middle", 800)}
    ${t(38, 53, "SD " + sd1, 8.5, MUTED, "middle", 600)}${t(112, 53, "SD " + sd2, 8.5, MUTED, "middle", 600)}
  </g>`).join("")}
</g>`,
    render(r, b) {
      H.draw(r, ".snk1,.snk2", b >= 2);
      H.show(r, ".spts46", b >= 3);
      H.show(r, ".orig46", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s47 · why p-values on clustering variables are a trap */
  const row47=[13,20,24,35,38,42,47,50,54,57,63,66,69,73,80,87];
  SC.s47 = {
    copy: [
      { k: "Why an input cannot validate its own split", m: "Recognise the proposed test", s: "Trace the input from fit to test", l: "Recognise the proposed test" },
      { k: "Why an input cannot validate its own split", m: "Follow the same column twice", s: "Selection changes what the test can tell you", l: "Follow the same column twice" },
      { k: "Why an input cannot validate its own split", m: "Inspect the sorting rule", s: "Within-group spread was minimised", l: "Inspect the sorting rule" },
      { k: "Why an input cannot validate its own split", m: "Try a single cloud", s: "Shuffled noise (k = 2) occupancy ANOVA · F = 16.8, p = 4.12 × 10⁻⁵", l: "Try a single cloud" },
      { k: "Why an input cannot validate its own split", m: "Open a separate column", s: "Mean waiting time · 78 vs 48 minutes", l: "Open a separate column" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,32,"Which column chose the groups?",17,NAVY)}
      <rect x="20" y="48" width="440" height="208" rx="12" fill="white" stroke="${EDGE}"/>
      ${t(240,77,"Illustrative occupancy values",14,MUTED)}
      <path d="M54 180 H428" stroke="${GREY}" stroke-width="2"/>
      ${row47.map((v,i)=>`<circle class="pt dots47" cx="${48+4*v}" cy="${172-(i%3)*9}" r="5"/>`).join("")}
      <path class="dr split47" pathLength="1" d="M250 100 V193" stroke="${INK}" stroke-width="2"/>
      ${t(143,213,"Lower half",13,NAVY,"middle",700,"a low47")}
      ${t(337,213,"Upper half",13,TERRA,"middle",700,"a low47")}
      <g class="a o0 means47">${[0,1].map(g=>{
        const x=48+4*row47.slice(8*g,8*g+8).reduce((a,v)=>a+v,0)/8;
        return `<path d="M${x} 190 v-47" stroke="${g?TERRA:NAVY}" stroke-width="3"/>`;
      }).join("")}</g>
      ${t(240,285,"",15,INK,"middle",700,"note47")}
      ${t(240,319,"",14,MUTED,"middle",600,"external47")}`,
    render(r,b){
      H.draw(r,".split47",b>=1);H.show(r,".low47",b>=1);H.show(r,".means47",b>=2);
      H.q(r,".dots47").forEach((p,i)=>p.style.fill=b===0?GREY:i<8?NAVY:TERRA);
      r.querySelector(".note47").textContent=["Fit using occupancy","Compare occupancy across the labels it helped choose","Each half now has a different mean","Shuffled noise (k = 2) · occupancy ANOVA F = 16.8, p = 4.12 × 10⁻⁵","Open the separate column for waiting time"][b];
      r.querySelector(".external47").textContent=b===4?"Al Waha · stretched 78 min   /   well-resourced 48 min":b===3?"Even shuffled noise clusters differ on the input used to split them":"The split and the proposed test use the same values";
    }
  };

  /* ------------------------------------------------------------ s48 · reporting clustering in a doctoral thesis */
  const CH48 = [
    ["1 · Variables & Pre-processing", "4 inputs · 4,740 complete rows · 4,729 after deduplication", NAVY],
    ["2 · Distance, Algorithm & Seed", "Euclidean distance · start rule · 10 starts · seed · software version", NAVY],
    ["3 · Choosing k & Noise Floor", "Compare inertia and real versus shuffled silhouette across k.", TERRA],
    ["4 · Stability Audit", "Repeat starts, compare shared visits in subsamples, then change method.", GREEN],
    ["5 · Profiles, Validation & Scope", "Show group sizes, centres, spread and outcomes kept outside the fit.", GREEN]
  ];
  SC.s48 = {
    copy: [
      { k: "What would another researcher need to repeat?", m: "Build the audit trail", s: "From eligibility to interpretation", l: "Build the audit trail" },
      { k: "What would another researcher need to repeat?", m: "Account for the rows", s: "4,740 complete rows · 4,729 distinct complete rows", l: "Account for the rows" },
      { k: "What would another researcher need to repeat?", m: "Record the fitting decisions", s: "Record enough detail to repeat the fit", l: "Record the fitting decisions" },
      { k: "What would another researcher need to repeat?", m: "Show all the candidates", s: "Show real and shuffled scores across k", l: "Show all the candidates" },
      { k: "What would another researcher need to repeat?", m: "Write the interpretation", s: "Use evidence appropriate to the claim", l: "Write the interpretation" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="12" width="452" height="32" rx="9" fill="${INK}"/>
${t(240, 33, "Doctoral Thesis Reporting Blueprint · Clustering & Segmentation", 13, GOLD, "middle", 800)}
${CH48.map(([h, s, c], i) => {
  const y = 52 + i * 60;
  return `<g class="a o0 th48" style="transform:translateX(-14px);transition-delay:${(i * .08).toFixed(2)}s">
    <rect x="14" y="${y}" width="452" height="52" rx="10" fill="#fff" stroke="${c}" stroke-width="2"/>
    <circle cx="38" cy="${y + 26}" r="13" fill="${c}"/>
    ${t(38, y + 31, "✓", 14, "#fff", "middle", 800)}
    ${t(60, y + 21, h, 13, c, "start", 800)}
    ${t(60, y + 40, s, 10.5, INK, "start", 600)}
  </g>`;
}).join("")}`,
    render(r, b) {
      H.q(r, ".th48").forEach((g, i) => {
        const on = b === 0 || (b === 1 && i === 0) || (b === 2 && i <= 1) || (b === 3 && i <= 2) || b >= 4;
        g.style.opacity = on ? 1 : 0.2;
        g.style.transform = on ? "none" : "translateX(-14px)";
      });
    }
  };

  /* ------------------------------------------------------------ s49 · interactive thesis audit */
  const AUDIT_ROWS = [
    ["1 · Variables in X", "Pending examiner review…"],
    ["2 · Evidence for k = 2", "Pending examiner review…"],
    ["3 · Profile table tests", "Pending examiner review…"],
    ["4 · Discussion claim", "Pending examiner review…"]
  ];
  SC.s49 = {
    copy: [
      { k: "Audit a draft before it goes to the examiner", m: "Take the examiner’s chair", s: "Check inputs, evidence, profiles and wording", l: "Take the examiner’s chair" },
      { k: "Audit a draft before it goes to the examiner", m: "Inspect each choice", s: "The review sheet follows your decisions", l: "Inspect each choice" },
      { k: "Audit a draft before it goes to the examiner", m: "Revise a weak claim", s: "A revision should explain what the data support", l: "Revise a weak claim" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="18" y="14" width="444" height="332" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<rect x="18" y="14" width="444" height="38" rx="12" fill="${NAVY}"/><rect x="18" y="38" width="444" height="14" fill="${NAVY}"/>
${t(240, 38, "Doctoral Thesis Viva · Examiner Audit Sheet", 14.5, "#fff", "middle", 800)}
${AUDIT_ROWS.map(([h, s], i) => {
  const y = 66 + i * 56;
  return `<g class="arow49" data-i="${i}">
    <rect class="abox49" x="32" y="${y}" width="416" height="46" rx="9" fill="#FBF8F1" stroke="${EDGE}" stroke-width="2"/>
    <circle class="aic49" cx="54" cy="${y + 23}" r="12" fill="${MUTED}"/>
    ${t(54, y + 28, i + 1, 12, "#fff", "middle", 800, "aict49")}
    ${t(76, y + 19, h, 12.5, INK, "start", 800)}
    ${t(76, y + 36, s, 11, MUTED, "start", 600, "ast49")}
  </g>`;
}).join("")}
<rect x="32" y="294" width="416" height="38" rx="9" fill="${INK}"/>
${t(240, 318, "Select your decisions in the 4 cards below the stage", 12.5, GOLD, "middle", 800, "asum49")}`,
    mark(r, i, ok, txt) {
      const g = r.querySelectorAll(".arow49")[i]; if (!g) return;
      const c = ok ? GREEN : TERRA;
      g.querySelector(".abox49").style.stroke = c;
      g.querySelector(".aic49").style.fill = c;
      g.querySelector(".aict49").textContent = ok ? "✓" : "✗";
      const st = g.querySelector(".ast49");
      st.textContent = txt; st.style.fill = c;
      const all = Array.from(r.querySelectorAll(".aict49")).map(x => x.textContent);
      const goods = all.filter(x => x === "✓").length, done = all.filter(x => x === "✓" || x === "✗").length;
      const sum = r.querySelector(".asum49");
      if (sum && done === 4) {
        sum.textContent = goods === 4 ? "Four choices supported by the evidence" : `Examiner verdict: ${goods} / 4 passed · Revise the red items`;
      }
    },
    render() {}
  };
})();
