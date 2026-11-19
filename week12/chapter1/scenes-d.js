/* Week 12 · Chapter 2 animated scenes, part D (s27–s38). Uses window.SCH helpers from scenes-a.js.
   Data: window.W12DATA (240 real Al Waha episodes) and window.W12X (real figures from scikit-learn). */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, D = window.W12DATA, X = window.W12X, C = window.CHAPTER;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, CL } = H.C;
  const { t } = H;
  const PAPER = "#F6F1E7", EDGE = "#CDBFA6";
  const fmt = n => Math.round(n).toLocaleString("en-US");

  /* ------------------------------------------------------------ s27 · supervised vs unsupervised side by side */
  const P27 = D.pts.filter((_, i) => i % 3 === 0);
  const L27 = D.lab2.filter((_, i) => i % 3 === 0);
  SC.s27 = {
    copy: [
      { k: "Follow one row through two analyses", m: "Two questions for one file", s: "Same visits, different questions", l: "Two questions for one file" },
      { k: "Follow one row through two analyses", m: "An input and a target", s: "X = operating measurements   ·   y = satisfaction", l: "An input and a target" },
      { k: "Follow one row through two analyses", m: "Measure the miss", s: "Test on visits kept aside", l: "Measure the miss" },
      { k: "Follow one row through two analyses", m: "Remove the target", s: "Keep patient outcomes outside X", l: "Remove the target" },
      { k: "Follow one row through two analyses", m: "A label made from inputs", s: "The fitted groups supply the colours", l: "A label made from inputs" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="pn27L">
  <rect x="14" y="16" width="218" height="328" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <rect x="14" y="16" width="218" height="34" rx="14" fill="${NAVY}"/><rect x="14" y="36" width="218" height="14" fill="${NAVY}"/>
  ${t(123, 38, "Weeks 9–11 · Supervised", 13.5, "#fff", "middle", 800)}
  <g class="a o0 tb27L">
    <rect x="26" y="60" width="122" height="36" rx="6" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/>
    ${t(87, 75, "Inputs X", 11, NAVY, "middle", 800)}${t(87, 89, "staff · occ · train", 10.5, INK, "middle", 600)}
    ${t(156, 82, "→", 16, TERRA, "middle", 800)}
    <rect x="164" y="60" width="56" height="36" rx="6" fill="${TERRA}" fill-opacity=".16" stroke="${TERRA}" stroke-width="2"/>
    ${t(192, 75, "Target y", 11, TERRA, "middle", 800)}${t(192, 89, "satisf.", 10.5, TERRA, "middle", 700)}
  </g>
  <rect x="28" y="108" width="190" height="168" rx="10" fill="#FBF8F1" stroke="${EDGE}" stroke-width="1.5"/>
  <path d="M46 122 V256 H204" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
  ${t(125, 270, "Example occupancy (X)", 10.5, MUTED, "middle", 700)}
  ${t(38, 190, "y", 11, TERRA, "middle", 800)}
  ${P27.slice(0, 36).map((p, i) => {
    const x = 52 + p[0] * 144, y = 134 + p[0] * 96 + (p[1] - 0.5) * 44;
    const yh = 134 + p[0] * 96;
    return `<line class="a o0 res27" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${yh.toFixed(1)}" stroke="${TERRA}" stroke-width="1.2" stroke-dasharray="2 2"/>
            <circle class="a o0 d27L" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.8" fill="${NAVY}" style="transition-delay:${(i * .012).toFixed(2)}s"/>`;
  }).join("")}
  <path class="dr fit27" pathLength="1" d="M52 134 L196 230" fill="none" stroke="${TERRA}" stroke-width="3" stroke-linecap="round"/>
  <g class="a o0 ok27L"><rect x="28" y="286" width="190" height="44" rx="9" fill="${GREEN}" fill-opacity=".14" stroke="${GREEN}" stroke-width="2"/>
    ${t(123, 305, "✓ Checked on held-out test set", 11.5, GREEN, "middle", 800)}
    ${t(123, 321, "prediction compared with real y", 10.5, INK, "middle", 600)}</g>
</g>
<g class="pn27R">
  <rect x="248" y="16" width="218" height="328" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <rect x="248" y="16" width="218" height="34" rx="14" fill="${TERRA}"/><rect x="248" y="36" width="218" height="14" fill="${TERRA}"/>
  ${t(357, 38, "Unsupervised learning", 13.5, "#fff", "middle", 800)}
  <g class="a o0 tb27R">
    <rect x="260" y="60" width="134" height="36" rx="6" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/>
    ${t(327, 75, "Inputs X only", 11, NAVY, "middle", 800)}${t(327, 89, "staff · train · occ · hand", 10, INK, "middle", 600)}
    <rect x="400" y="60" width="54" height="36" rx="6" fill="#F4F0E8" stroke="${MUTED}" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${t(427, 76, "no y", 11.5, MUTED, "middle", 800)}${t(427, 90, "none", 10, MUTED, "middle", 600)}
  </g>
  <rect x="262" y="108" width="190" height="168" rx="10" fill="#FBF8F1" stroke="${EDGE}" stroke-width="1.5"/>
  <path d="M280 122 V256 H438" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
  ${t(359, 270, "Projected positions", 10.5, MUTED, "middle", 700)}
  ${t(270, 190, "↑", 10.5, NAVY, "middle", 800)}
  ${P27.map((p, i) => {
    const [x, y] = H.px(p, 286, 128, 146, 122);
    return `<circle class="pt a o0 d27R" data-g="${L27[i]}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.8" style="transition-delay:${(i * .01).toFixed(2)}s"/>`;
  }).join("")}
  <g class="a o0 el27">
    <ellipse cx="322" cy="196" rx="34" ry="38" fill="none" stroke="${NAVY}" stroke-width="2" stroke-dasharray="5 3"/>
    <ellipse cx="404" cy="192" rx="34" ry="44" fill="none" stroke="${TERRA}" stroke-width="2" stroke-dasharray="5 3"/>
  </g>
  <g class="a o0 ok27R"><rect x="262" y="286" width="190" height="44" rx="9" fill="${INK}"/>
    ${t(357, 305, "Groups episodes that look alike", 11.5, GOLD, "middle", 800)}
    ${t(357, 321, "no target y · must check against noise", 10.5, "#fff", "middle", 600)}</g>
</g>`,
    render(r, b) {
      H.show(r, ".tb27L,.d27L", b >= 1);
      H.draw(r, ".fit27", b >= 2); H.show(r, ".res27,.ok27L", b >= 2);
      H.show(r, ".tb27R,.d27R", b >= 3);
      H.q(r, ".d27R").forEach(e => { e.style.fill = b >= 4 ? CL[+e.dataset.g] : GREY; });
      H.show(r, ".el27,.ok27R", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s28 · which variables belong inside the clustering? */
  const IN28 = [
    ["staff_ratio", "1.30 avg", "Recorded staffing ratio"],
    ["training_hours", "18.5 h avg", "Recorded training time"],
    ["occupancy_pct", "80.3% avg", "How full the ward beds are"],
    ["handoffs", "3.85 avg", "Shift handovers per episode"]
  ];
  const OUT28 = [
    ["satisfaction", "Survey score", "Patient survey after discharge"],
    ["complaint", "Yes / no", "Formal complaint filed"],
    ["readmission", "Yes / no", "Readmission recorded"],
    ["wait_time", "Minutes", "Emergency waiting time"]
  ];
  SC.s28 = {
    copy: [
      { k: "Which columns may give a visit its colour?", m: "Choose what similar means", s: "The research question defines similarity", l: "Choose what similar means" },
      { k: "Which columns may give a visit its colour?", m: "Inside the fit", s: "Staffing · training · occupancy · handoffs", l: "Inside the fit" },
      { k: "Which columns may give a visit its colour?", m: "Set four columns aside", s: "Satisfaction · complaints · readmission · wait", l: "Set four columns aside" },
      { k: "Which columns may give a visit its colour?", m: "Follow one outcome", s: "Using a column twice makes the comparison circular", l: "Follow one outcome" },
      { k: "Which columns may give a visit its colour?", m: "Rejoin by episode", s: "Retain the episode identifier", l: "Rejoin by episode" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="12" width="452" height="32" rx="9" fill="${INK}"/>
${t(240, 33, "Al Waha Hospital dataset · 4,740 complete episodes", 13.5, "#fff", "middle", 800)}
<g class="box28L">
  <rect x="14" y="54" width="214" height="232" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
  <rect x="14" y="54" width="214" height="30" rx="12" fill="${NAVY}"/><rect x="14" y="72" width="214" height="12" fill="${NAVY}"/>
  ${t(121, 74, "1 · Inside Clustering (X)", 13, "#fff", "middle", 800)}
  ${IN28.map(([k, v, d], i) => `<g class="a o0 in28" style="transform:translateX(-16px);transition-delay:${(i * .12).toFixed(2)}s">
    <rect x="24" y="${94 + i * 46}" width="194" height="40" rx="8" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/>
    ${t(34, 111 + i * 46, k, 12.5, NAVY, "start", 800)}${t(208, 111 + i * 46, v, 11.5, INK, "end", 700)}
    ${t(34, 126 + i * 46, d, 10.5, MUTED, "start", 600)}</g>`).join("")}
</g>
<g class="box28R">
  <rect x="252" y="54" width="214" height="232" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>
  <rect x="252" y="54" width="214" height="30" rx="12" fill="${GREEN}"/><rect x="252" y="72" width="214" height="12" fill="${GREEN}"/>
  ${t(359, 74, "2 · Held Out for Validation", 13, "#fff", "middle", 800)}
  ${OUT28.map(([k, v, d], i) => `<g class="a o0 out28" style="transform:translateX(16px);transition-delay:${(i * .12).toFixed(2)}s">
    <rect x="262" y="${94 + i * 46}" width="194" height="40" rx="8" fill="#F1F7F3" stroke="${GREEN}" stroke-width="1.5"/>
    ${t(272, 111 + i * 46, k, 12.5, GREEN, "start", 800)}${t(446, 111 + i * 46, v, 11.5, INK, "end", 700)}
    ${t(272, 126 + i * 46, d, 10.5, MUTED, "start", 600)}</g>`).join("")}
</g>
<g class="a o0 wall28">
  <path d="M240 56 V284" stroke="${TERRA}" stroke-width="4" stroke-dasharray="6 4"/>
  <circle cx="240" cy="170" r="18" fill="${TERRA}"/>
  ${t(240, 176, "✗", 18, "#fff", "middle", 800)}
  <g><rect x="132" y="300" width="216" height="34" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="3"/>
    ${t(240, 322, "Keep outcomes outside the fit", 13.5, TERRA, "middle", 800)}</g>
</g>
<g class="a o0 pipe28">
  <rect x="14" y="296" width="452" height="50" rx="11" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(118, 318, "Step 1: Cluster on 4 ward inputs", 12, NAVY, "middle", 800)}
  ${t(118, 334, "finds operating regimes", 10.5, MUTED, "middle", 600)}
  ${t(240, 325, "━━━▶", 16, GOLD, "middle", 800)}
  ${t(362, 318, "Step 2: Compare on 4 outcomes", 12, GREEN, "middle", 800)}
  ${t(362, 334, "tests whether regimes matter", 10.5, MUTED, "middle", 600)}
</g>`,
    render(r, b) {
      H.q(r, ".in28").forEach(g => { g.style.opacity = b >= 1 ? 1 : b === 0 ? 0.55 : 0; g.style.transform = b >= 1 ? "none" : "translateX(-16px)"; });
      H.q(r, ".out28").forEach(g => { g.style.opacity = b >= 2 ? 1 : b === 0 ? 0.55 : 0; g.style.transform = b >= 2 ? "none" : "translateX(16px)"; });
      H.show(r, ".wall28", b === 3);
      H.show(r, ".pipe28", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s29 · Voronoi boundaries and column averages */
  const box29 = [100, 48, 264, 264];
  const round29 = H.kmeans(D.pts, [[0.25,0.72], [0.76,0.30]]);
  // The perpendicular bisector and assignments use the same square map metric.
  function boundary29(centres) {
    const [a,b] = centres.map(p => H.px(p,...box29));
    const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    const dx=b[0]-a[0], dy=b[1]-a[1];
    return [mx-2*dy,my+2*dx,mx+2*dy,my-2*dx];
  }
  SC.s29 = {
    copy: [
      { k: "Who changes sides when a centre moves?", m: "Two centres on a map", s: "Fit on displayed coordinates", l: "Two centres on a map" },
      { k: "Who changes sides when a centre moves?", m: "What the map leaves out", s: "PC1 69.3% + PC2 14.9% = 84.2% of 4D variance", l: "What the map leaves out" },
      { k: "Who changes sides when a centre moves?", m: "Find the tie", s: "Equal distance to both centres", l: "Find the tie" },
      { k: "Who changes sides when a centre moves?", m: "Read the territories", s: "An assignment depends on which side a dot occupies", l: "Read the territories" },
      { k: "Who changes sides when a centre moves?", m: "Move and reassign", s: "Recalculate the boundary from the new means", l: "Move and reassign" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,28,"One round on the two-dimensional practice map",16,NAVY)}
      <rect x="92" y="40" width="280" height="280" rx="12" fill="white" stroke="${EDGE}"/>
      <defs><clipPath id="map29"><rect x="100" y="48" width="264" height="264"/></clipPath></defs>
      <g clip-path="url(#map29)">${H.dots(D.pts,...box29,"p29",3)}
      <line class="a o0 bis29" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4" style="transition:x1 .9s,y1 .9s,x2 .9s,y2 .9s,opacity .5s"/>
      ${[0,1].map(j=>H.centre(j,"cross29")).join("")}</g>
      ${t(240,344,"",14,INK,"middle",700,"label29")}`,
    render(r,b) {
      const state = round29[b >= 4 ? 3 : b >= 3 ? 1 : 0];
      H.placeCentres(r,".cross29",state.c,...box29);
      H.colour(r,".p29",state.lab);
      const line=r.querySelector(".bis29");
      boundary29(state.c).forEach((v,i)=>line.setAttribute(["x1","y1","x2","y2"][i],v));
      H.show(r,".bis29",b>=2);
      r.querySelector(".label29").textContent=["Two starting centres","PC1 (69.3%) + PC2 (14.9%) = 84.2% of variance","On the line both distances are equal","Each colour follows its nearest centre","Move to the means and assign again"][b];
    }
  };

  /* ------------------------------------------------------------ s30 · why random starts get trapped, and k-means++ */
  const F30L = [22, 60, 198, 196], F30R = [260, 60, 198, 196];
  const BAD_C = [[0.18, 0.36], [0.22, 0.52], [0.28, 0.42], [0.79, 0.47]];
  const GOOD_C = [[0.19, 0.46], [0.36, 0.28], [0.76, 0.25], [0.80, 0.66]];
  const ST30_BAD = H.kmeans(D.pts, BAD_C);
  const ST30_GOOD = H.kmeans(D.pts, GOOD_C);
  SC.s30 = {
    copy: [
      { k: "Why spread the starting centres out?", m: "Same dots, different first moves", s: "Two illustrative starts on the same map", l: "Same dots, different first moves" },
      { k: "Why spread the starting centres out?", m: "A crowded start", s: "Three centres begin on the left", l: "A crowded start" },
      { k: "Why spread the starting centres out?", m: "A local solution", s: "A settled fit can still be improved by restarting", l: "A local solution" },
      { k: "Why spread the starting centres out?", m: "Give distant dots a chance", s: "Distant candidates receive greater weight", l: "Give distant dots a chance" },
      { k: "Why spread the starting centres out?", m: "Compare the final totals", s: "Full-file k = 4 runs · 4,669 to 6,098", l: "Compare the final totals" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="left30">
  <rect x="14" y="16" width="214" height="264" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2"/>
  ${t(121, 36, "Unlucky random start", 13.5, TERRA, "middle", 800)}
  ${t(121, 51, "3 centres dropped in left cloud", 10.5, MUTED, "middle", 600)}
  ${H.dots(D.pts, F30L[0], F30L[1], F30L[2], F30L[3], "p30L", 2.4)}
  ${[0, 1, 2, 3].map(j => H.centre(j, "a o0 c30L")).join("")}
  <g class="a o0 badbadge"><rect x="34" y="244" width="174" height="28" rx="7" fill="${TERRA}"/>
    ${t(121, 263, "One settled map fit", 12.5, "#fff", "middle", 800)}</g>
</g>
<g class="right30">
  <rect x="252" y="16" width="214" height="264" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2"/>
  ${t(359, 36, "Spread-out example", 13.5, GREEN, "middle", 800)}
  ${t(359, 51, "starting centres spread far apart", 10.5, MUTED, "middle", 600)}
  ${H.dots(D.pts, F30R[0], F30R[1], F30R[2], F30R[3], "p30R", 2.4)}
  <g class="a o0 rings30">
    <circle cx="${F30R[0] + GOOD_C[0][0] * F30R[2]}" cy="${F30R[1] + (1 - GOOD_C[0][1]) * F30R[3]}" r="34" fill="none" stroke="${NAVY}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <circle cx="${F30R[0] + GOOD_C[2][0] * F30R[2]}" cy="${F30R[1] + (1 - GOOD_C[2][1]) * F30R[3]}" r="34" fill="none" stroke="${GREEN}" stroke-width="1.5" stroke-dasharray="4 3"/>
  </g>
  ${[0, 1, 2, 3].map(j => H.centre(j, "a o0 c30R")).join("")}
  <g class="a o0 goodbadge"><rect x="272" y="244" width="174" height="28" rx="7" fill="${GREEN}"/>
    ${t(359, 263, "Another settled map fit", 12.5, "#fff", "middle", 800)}</g>
</g>
<g class="a o0 bar30">
  <rect x="14" y="290" width="452" height="56" rx="11" fill="${INK}"/>
  ${t(240, 312, "KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)", 12, GOLD, "middle", 700)}
  ${t(240, 332, "Recorded full-file range at k = 4 · 4,669 to 6,098", 11, "#fff", "middle", 600)}
</g>`,
    render(r, b) {
      const sb = ST30_BAD[b >= 2 ? ST30_BAD.length - 1 : 0];
      const sg = ST30_GOOD[b >= 4 ? ST30_GOOD.length - 1 : 0];
      H.show(r, ".c30L", b >= 1);
      H.placeCentres(r, ".c30L", sb.c, F30L[0], F30L[1], F30L[2], F30L[3]);
      H.colour(r, ".p30L", b >= 2 ? sb.lab : null);
      H.show(r, ".badbadge", b >= 2);
      H.show(r, ".c30R,.rings30", b >= 3);
      H.placeCentres(r, ".c30R", sg.c, F30R[0], F30R[1], F30R[2], F30R[3]);
      H.colour(r, ".p30R", b >= 4 ? sg.lab : null);
      H.show(r, ".goodbadge,.bar30", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s31 · 4D Euclidean distance on two real Al Waha episodes */
  const E31A = D.episodes[2], E31B = D.episodes[5]; // AW103952 vs AW100447
  const ROWS31 = [
    ["Occupancy %", E31A[3], E31B[3], "18.5", "342.25", 0.778, TERRA],
    ["Training hours", E31A[2], E31B[2], "9.4", "88.36", 0.201, GOLD],
    ["Handoffs", E31A[4], E31B[4], "3.0", "9.00", 0.020, GREEN],
    ["Staff ratio", E31A[1], E31B[1], "0.72", "0.52", 0.001, NAVY]
  ];
  SC.s31 = {
    copy: [
      { k: "Trace the distance between two actual records", m: "Four contributions", s: "Staff ratio · training · occupancy · handoffs", l: "Four contributions" },
      { k: "Trace the distance between two actual records", m: "Read across the records", s: "AW103952 and AW100447", l: "Read across the records" },
      { k: "Trace the distance between two actual records", m: "Follow the same recipe", s: "Square → sum → square root", l: "Follow the same recipe" },
      { k: "Trace the distance between two actual records", m: "Read the total", s: "√440.13 ≈ 20.98", l: "Read the total" },
      { k: "Trace the distance between two actual records", m: "Ask which difference mattered", s: "Pair-specific shares of squared distance", l: "Ask which difference mattered" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="452" height="50" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(28, 35, "Episode A · " + E31A[0], 13, NAVY, "start", 800)}
${t(28, 53, `staff ${E31A[1].toFixed(2)} · train ${E31A[2]}h · occ ${E31A[3]}% · handoffs ${E31A[4]}`, 11, MUTED, "start", 600)}
${t(452, 35, "Episode B · " + E31B[0], 13, TERRA, "end", 800)}
${t(452, 53, `staff ${E31B[1].toFixed(2)} · train ${E31B[2]}h · occ ${E31B[3]}% · handoffs ${E31B[4]}`, 11, MUTED, "end", 600)}
<rect x="14" y="74" width="452" height="196" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(26, 94, "Variable", 11.5, MUTED, "start", 700)}${t(162, 94, "A vs B", 11.5, MUTED, "middle", 700)}${t(236, 94, "|Gap|", 11.5, MUTED, "middle", 700)}${t(312, 94, "Gap²", 11.5, MUTED, "end", 700)}${t(448, 94, "Share of d²", 11.5, MUTED, "end", 700)}
<path d="M24 102 H456" stroke="${EDGE}" stroke-width="1.5"/>
${ROWS31.map(([n, va, vb, g, g2, sh, c], i) => `<g class="a o0 r31" style="transition-delay:${(i * .12).toFixed(2)}s">
  ${t(26, 126 + i * 38, n, 13, INK, "start", 700)}
  ${t(162, 126 + i * 38, `${va} vs ${vb}`, 12, MUTED, "middle", 600)}
  ${t(236, 126 + i * 38, g, 12.5, INK, "middle", 700)}
  ${t(312, 126 + i * 38, g2, 13.5, c, "end", 800)}
  <rect x="326" y="${113 + i * 38}" width="84" height="16" rx="4" fill="#F1ECE2"/>
  <rect class="b31" data-w="${Math.max(2, sh * 84).toFixed(1)}" x="326" y="${113 + i * 38}" width="0" height="16" rx="4" fill="${c}" style="transition:width .9s cubic-bezier(.3,.8,.25,1)"/>
  ${t(452, 126 + i * 38, (sh * 100).toFixed(1) + "%", 12, c, "end", 800)}
</g>`).join("")}
<g class="a o0 sum31">
  <rect x="14" y="280" width="452" height="66" rx="12" fill="${INK}"/>
  ${t(28, 305, "d = √(342.25 + 88.36 + 9.00 + 0.52) = √440.13 =", 13.5, "#fff", "start", 700)}
  ${t(452, 306, "20.98", 20, GOLD, "end", 800)}
  ${t(28, 330, "Occupancy + training supply 97.8% of d² · Staff ratio supplies 0.1%", 12, "#E7DDCB", "start", 600,"a shares31")}
</g>`,
    render(r, b) {
      H.show(r, ".r31", b >= 2);
      H.q(r, ".b31").forEach(e => { e.setAttribute("width", b >= 3 ? e.dataset.w : 0); });
      H.show(r, ".sum31", b >= 3); H.show(r,".shares31",b>=4);
    }
  };

  /* ------------------------------------------------------------ s32 · distance metrics: Euclidean, Manhattan, Cosine */
  SC.s32 = {
    copy: [
      { k: "Which journey counts as short?", m: "Join the visits directly", s: "Straight-line distance", l: "Join the visits directly" },
      { k: "Which journey counts as short?", m: "Follow one large gap", s: "One squared gap grows quickly", l: "Follow one large gap" },
      { k: "Which journey counts as short?", m: "Walk around the block", s: "Sum the absolute gaps", l: "Walk around the block" },
      { k: "Which journey counts as short?", m: "Use an actual visit as centre", s: "Manhattan k-medoids vs Euclidean k-means (k = 2) · ARI = 0.974", l: "Use an actual visit as centre" },
      { k: "Which journey counts as short?", m: "Compare directions", s: "Cosine similarity uses the angle between profiles", l: "Compare directions" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="mcard m32-0">
  <rect class="mr32" x="14" y="20" width="144" height="258" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
  ${t(86, 44, "Euclidean", 14.5, NAVY, "middle", 800)}
  ${t(86, 61, "√(Σ Δ²)", 12, MUTED, "middle", 700)}
  <rect x="26" y="74" width="120" height="106" rx="8" fill="#FBF8F1" stroke="${EDGE}"/>
  <path d="M42 160 H126 V94" fill="none" stroke="${GREY}" stroke-width="1.5" stroke-dasharray="3 3"/>
  <path class="dr eu32" pathLength="1" d="M42 160 L126 94" fill="none" stroke="${NAVY}" stroke-width="3.5"/>
  <circle cx="42" cy="160" r="5" fill="${NAVY}"/><circle cx="126" cy="94" r="5" fill="${TERRA}"/>
  ${t(86, 198, "Straight-line path", 11.5, INK, "middle", 800)}
  ${t(86,215,"Squares big gaps",10.5,TERRA,"middle",700,"a spike32")}
  <rect x="24" y="232" width="124" height="32" rx="7" fill="${SKY}"/>
  ${t(86, 252, "Used by k-means", 11, NAVY, "middle", 800)}
</g>
<g class="a o0 mcard m32-1">
  <rect class="mr32" x="168" y="20" width="144" height="258" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>
  ${t(240, 44, "Manhattan", 14.5, TERRA, "middle", 800)}
  ${t(240, 61, "Σ |Δ|", 12, MUTED, "middle", 700)}
  <rect x="180" y="74" width="120" height="106" rx="8" fill="#FBF8F1" stroke="${EDGE}"/>
  <path class="dr mn32" pathLength="1" d="M196 160 H238 V126 H280 V94" fill="none" stroke="${TERRA}" stroke-width="3.5" stroke-linejoin="round"/>
  <circle cx="196" cy="160" r="5" fill="${NAVY}"/><circle cx="280" cy="94" r="5" fill="${TERRA}"/>
  ${t(240, 198, "City-block path", 11.5, INK, "middle", 800)}
  ${t(240, 215, "Adds gaps linearly", 10.5, MUTED, "middle", 600)}
  <rect x="178" y="232" width="124" height="32" rx="7" fill="#FCEFE9"/>
  ${t(240,252,"Medoid = actual visit",11,TERRA,"middle",800,"a medoid32")}
</g>
<g class="a o0 mcard m32-2">
  <rect class="mr32" x="322" y="20" width="144" height="258" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>
  ${t(394, 44, "Cosine / Shape", 14.5, GREEN, "middle", 800)}
  ${t(394, 61, "angle between profiles", 11, MUTED, "middle", 700)}
  <rect x="334" y="74" width="120" height="106" rx="8" fill="#FBF8F1" stroke="${EDGE}"/>
  <path class="dr cs32" pathLength="1" d="M346 160 L432 94" fill="none" stroke="${NAVY}" stroke-width="2.8"/>
  <path class="dr cs32" pathLength="1" d="M346 160 L389 127" fill="none" stroke="${GREEN}" stroke-width="4"/>
  ${t(394, 198, "Same direction", 11.5, INK, "middle", 800)}
  ${t(394, 215, "Length can differ", 10.5, MUTED, "middle", 600)}
  <rect x="332" y="232" width="124" height="32" rx="7" fill="#EBF5EE"/>
  ${t(394, 252, "Profile shape match", 11, GREEN, "middle", 800)}
</g>
<rect x="14" y="290" width="452" height="54" rx="11" fill="${INK}"/>
${t(240, 312, "The mean minimises the sum of squared straight-line distances.", 11.5, GOLD, "middle", 800)}
${t(240, 331, "Al Waha (k = 2): Euclidean k-means vs Manhattan k-medoids ARI = 0.974", 11, "#fff", "middle", 600)}`,
    render(r, b) {
      H.draw(r, ".eu32", b >= 0); H.show(r,".spike32",b>=1); H.show(r,".medoid32",b>=3);
      H.show(r, ".m32-1", b >= 2); H.draw(r, ".mn32", b >= 2);
      H.show(r, ".m32-2", b >= 4); H.draw(r, ".cs32", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s33 · watch standardising reshape the episode cloud */
  const visit33 = D.episodes;
  const origin33 = [245,167];
  function position33(row,z){
    const dx=row[3]-D.mean.occupancy_pct, dy=row[1]-D.mean.staff_ratio;
    const unit=z?53:9;
    return [origin33[0]+unit*dx/(z?D.sd.occupancy_pct:1),
            origin33[1]-unit*dy/(z?D.sd.staff_ratio:1)];
  }
  SC.s33 = {
    copy: [
      { k: "Watch the same visits change shape", m: "Eight records, two measurements", s: "Eight records from the episode selector", l: "Eight records, two measurements" },
      { k: "Watch the same visits change shape", m: "Read along the axes", s: "Horizontal = occupancy   ·   vertical = staff ratio", l: "Read along the axes" },
      { k: "Watch the same visits change shape", m: "A narrow band", s: "Identical numerical spacing on both axes", l: "A narrow band" },
      { k: "Watch the same visits change shape", m: "Change both rulers", s: "Use each full column’s own mean and SD", l: "Change both rulers" },
      { k: "Watch the same visits change shape", m: "Read the new position", s: "Position is relative to the hospital average", l: "Read the new position" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,29,"Eight Al Waha visits on the same two axes",16,NAVY)}
      <rect x="36" y="44" width="411" height="251" rx="12" fill="white" stroke="${EDGE}"/>
      <path d="M52 167 H432 M245 56 V282" stroke="${GREY}" stroke-dasharray="4 4"/>
      ${t(46,66,"Staff ratio ↑",12,NAVY,"start")}
      ${t(435,282,"Occupancy →",12,NAVY,"end")}
      ${visit33.map((row,i)=>`<circle class="dot33" r="${i===0?6:4.5}" fill="${i===0?TERRA:NAVY}" stroke="white" style="transition:cx 1.3s,cy 1.3s"><title>${row[0]} · staff ${row[1]} · occupancy ${row[3]}%</title></circle>`).join("")}
      ${t(240,318,"",14,INK,"middle",700,"units33")}
      ${t(240,341,"",12,MUTED,"middle",600,"focus33")}`,
    render(r,b){
      const z=b>=3;
      H.q(r,".dot33").forEach((dot,i)=>{
        const [x,y]=position33(visit33[i],z);
        dot.setAttribute("cx",x);dot.setAttribute("cy",y);
      });
      r.querySelector(".units33").textContent=z?"Both axes · 53 pixels per standard deviation":"Both axes · 9 pixels per original unit";
      r.querySelector(".focus33").textContent=b===4?"Highlighted visit · staffing +1.83 SD, occupancy +0.73 SD":
        b===2?"Highlighted visit · staff ratio 1.93, occupancy 87.9%":"Dashed lines cross at the two hospital means";
    }
  };

  /* ------------------------------------------------------------ s34 · silhouette knife plot (k=2 vs k=4) */
  // The bars are computed in map space. The dashed marks are full-file course means.
  function blades34(k) {
    const starts = k===2 ? [[.2,.4],[.8,.5]] : [[.15,.4],[.35,.6],[.72,.3],[.83,.65]];
    const labels=H.kmeans(D.pts,starts).at(-1).lab;
    const groups=Array.from({length:k},()=>[]);
    D.pts.forEach((point,i)=>{
      const sums=Array(k).fill(0), counts=Array(k).fill(0);
      D.pts.forEach((other,j)=>{
        if(j===i)return;
        sums[labels[j]]+=Math.hypot(point[0]-other[0],point[1]-other[1]);
        counts[labels[j]]++;
      });
      const g=labels[i], means=sums.map((sum,j)=>counts[j]?sum/counts[j]:Infinity);
      const a=means[g], b=Math.min(...means.filter((_,j)=>j!==g));
      groups[g].push(counts[g]?(b-a)/Math.max(a,b):0);
    });
    let y=67;
    return groups.map((group,g)=>{
      const rows=group.sort((a,b)=>b-a).map(v=>{
        const row=`<rect x="${Math.min(0,v)*145}" y="${y.toFixed(2)}" width="${Math.abs(v)*145}" height=".77" fill="${v<0?TERRA:CL[g]}"/>`;
        y+=.77;return row;
      });
      y+=5;return rows.join("");
    }).join("");
  }
  SC.s34 = {
    copy: [
      { k: "What can a mean silhouette hide?", m: "One bar per visit", s: "Illustrative bars · hospital means shown separately", l: "One bar per visit" },
      { k: "What can a mean silhouette hide?", m: "Sort within each colour", s: "A thicker blade contains more visits", l: "Sort within each colour" },
      { k: "What can a mean silhouette hide?", m: "Locate the hospital mean", s: "Hospital mean at k = 2 · 0.504", l: "Locate the hospital mean" },
      { k: "What can a mean silhouette hide?", m: "Compare four groups", s: "Hospital mean at k = 4 · 0.331", l: "Compare four groups" },
      { k: "What can a mean silhouette hide?", m: "Inspect a negative bar", s: "At k = 4: 20 episodes (0.4%) have s < 0", l: "Inspect a negative bar" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${[2,4].map((k,i)=>{
        const x=14+230*i,zero=x+50,mean=C.gaps.find(row=>row[0]===k)[1];
        return `<g class="a panel34-${k}"><rect x="${x}" y="16" width="218" height="285" rx="12" fill="white" stroke="${EDGE}"/>
          ${t(x+109,40,"Practice map · "+k+" groups",15,NAVY)}
          <path d="M${zero} 58 V273" stroke="${MUTED}"/>
          <g class="a bars34" transform="translate(${zero} 0)">${blades34(k)}</g>
          <g class="a mean34"><path d="M${zero+mean*145} 57 V273" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/></g>
          ${[0,.5,1].map(v=>t(zero+145*v,289,v,11,MUTED)).join("")}</g>`;
      }).join("")}
      <g class="a o0 zoom34"><rect x="51" y="303" width="378" height="31" rx="6" fill="white" stroke="${EDGE}"/>
        ${t(66,324,"k = 4 · 20 episodes (0.4%) < 0 · tail × 20",12.5,INK,"start")}
        <rect class="tail34" y="314" height="9" fill="${TERRA}"/><path d="M396 308 v19" stroke="${INK}"/>
        ${t(405,323,"0",12,MUTED)}</g>
      ${t(240,323,"Bars use distances between the 240 displayed positions.",13,INK,"middle",700,"source34")}
      ${t(240,345,"Dashed lines mark the separate hospital means.",13,MUTED)}`,
    render(r,b){
      H.show(r,".panel34-4",b>=3);
      H.show(r,".zoom34",b===4);H.show(r,".source34",b!==4);
      const minX=Math.min(0,...H.q(r,".panel34-4 .bars34 rect").map(el=>Number(el.getAttribute("x"))));
      const zoom=r.querySelector(".tail34");
      zoom.setAttribute("x",396+minX*20);zoom.setAttribute("width",-minX*20);
      H.show(r,".bars34",b>=1);H.show(r,".mean34",b>=2);
      H.q(r,".bars34 rect").forEach(bar=>{
        bar.style.opacity=b===4 && Number(bar.getAttribute("x"))===0 ? ".42":"1";
      });
    }
  };

  /* ------------------------------------------------------------ s35 · the formal Gap Statistic (Tibshirani et al., 2001) */
  // A small worked example keeps the course's uncomputed full-file Gap separate.
  // Find the minimum within-group sum of squares for contiguous groups on a line.
  function inertia35(values,maxK) {
    const v=values.slice().sort((a,b)=>a-b), n=v.length;
    const sums=[0],squares=[0];
    for(const x of v){sums.push(sums.at(-1)+x);squares.push(squares.at(-1)+x*x);}
    let last=Array(n+1).fill(Infinity);last[0]=0;
    const result=[];
    for(let k=1;k<=maxK;k++){
      const next=Array(n+1).fill(Infinity);
      for(let end=k;end<=n;end++){
        for(let start=k-1;start<end;start++){
          const sum=sums[end]-sums[start];
          const cost=squares[end]-squares[start]-sum*sum/(end-start);
          next[end]=Math.min(next[end],last[start]+cost);
        }
      }
      result.push(Math.log(next[n]));last=next;
    }
    return result;
  }
  const example35=[0,.5,1,1.5,12.5,13,13.5,14], B35=40;
  let seed35=27;
  function sample35(){seed35=(Math.imul(1664525,seed35)+1013904223)>>>0;return 14*seed35/4294967296;}
  const obs35=inertia35(example35,5);
  const sims35=Array.from({length:B35},()=>inertia35(example35.map(sample35),5));
  const ref35=obs35.map((_,i)=>sims35.reduce((sum,row)=>sum+row[i],0)/B35);
  const gap35=ref35.map((v,i)=>v-obs35[i]);
  const err35=ref35.map((v,i)=>Math.sqrt((1+1/B35)*sims35.reduce((sum,row)=>sum+(row[i]-v)**2,0)/(B35-1)));
  const pick35=gap35.findIndex((v,i)=>i+1<gap35.length && v>=gap35[i+1]-err35[i+1])+1;
  const x35=i=>72+i*84, y35=v=>228-v*26;
  const curve35=values=>values.map((v,i)=>(i?"L":"M")+x35(i)+" "+y35(v)).join(" ");
  SC.s35 = {
    copy: [
      { k: "How much tighter than a reference file?", m: "Start with spread", s: "The formal statistic uses logged within-group spread", l: "Start with spread" },
      { k: "How much tighter than a reference file?", m: "Build the reference", s: "State how the reference tables were generated", l: "Build the reference" },
      { k: "How much tighter than a reference file?", m: "Use a common scale", s: "Compute a reference mean for each k", l: "Use a common scale" },
      { k: "How much tighter than a reference file?", m: "Measure the gap", s: "Gap(k) = mean reference log inertia − observed log inertia", l: "Measure the gap" },
      { k: "How much tighter than a reference file?", m: "Allow for simulation error", s: "Al Waha (k = 2): Gap(2) = 1.435, s₂ = 0.007", l: "Allow for simulation error" }
    ],
    svg: `<rect width="480" height="360" fill="${PAPER}"/>
      ${t(240,28,"Worked example · eight positions on a line",16,NAVY)}
      <rect x="22" y="42" width="436" height="246" rx="12" fill="white" stroke="${EDGE}"/>
      ${t(38,64,"Log inertia",12,MUTED,"start")}
      <path d="M50 78 V258 H434" stroke="${GREY}" fill="none"/>
      ${[-1,1,3,5].map(v=>t(44,y35(v)+4,v,11,MUTED,"end")).join("")}
      ${[1,2,3,4,5].map((v,i)=>t(x35(i),278,"k = "+v,12,INK)).join("")}
      <path class="dr obs35" pathLength="1" d="${curve35(obs35)}" stroke="${NAVY}" stroke-width="3" fill="none"/>
      <path class="dr ref35" pathLength="1" d="${curve35(ref35)}" stroke="${TERRA}" stroke-width="3" fill="none"/>
      <g class="a o0 mark35"><line x1="${x35(1)}" x2="${x35(1)}" y1="${y35(ref35[1])}" y2="${y35(obs35[1])}" stroke="${INK}" stroke-dasharray="3 2" stroke-width="3"/>
      ${t(x35(1)+8,(y35(ref35[1])+y35(obs35[1]))/2,"Gap(2)",12,INK,"start")}</g>
      ${t(240,314,"",14,NAVY,"middle",700,"note35")}
      ${t(240,340,"",12,MUTED,"middle",600,"detail35")}`,
    render(r,b){
      H.draw(r,".obs35",true);H.draw(r,".ref35",b>=1);H.show(r,".mark35",b>=3);
      r.querySelector(".note35").textContent=["Blue · logged spread of the eight example values","Orange · mean of 40 uniform reference runs","Compare the two curves at the same k","At k = 2 the illustrated gap is "+gap35[1].toFixed(2),"Al Waha (k = 2) · Gap(2) = 1.435 (s₂ = 0.007)"][b];
      r.querySelector(".detail35").textContent=b===4 && pick35 ? "Worked example: Gap("+pick35+") = "+gap35[pick35-1].toFixed(2)+"   ≥   next gap − allowance = "+(gap35[pick35]-err35[pick35]).toFixed(2):"Example positions · "+example35.join(", ");
    }
  };

  /* ------------------------------------------------------------ s36 · interactive kexplorer (map + elbow + gap) */
  const F36 = [20, 42, 210, 246];
  const INIT36 = {
    2: [[0.20, 0.45], [0.80, 0.45]],
    3: [[0.20, 0.45], [0.78, 0.25], [0.80, 0.70]],
    4: [[0.18, 0.52], [0.35, 0.26], [0.76, 0.24], [0.82, 0.68]],
    5: [[0.14, 0.54], [0.34, 0.42], [0.38, 0.18], [0.76, 0.24], [0.82, 0.68]],
    6: [[0.12, 0.56], [0.28, 0.40], [0.40, 0.20], [0.74, 0.20], [0.82, 0.45], [0.82, 0.76]]
  };
  const KM36 = {};
  [2, 3, 4, 5, 6].forEach(k => { const st = H.kmeans(D.pts, INIT36[k]); KM36[k] = st[st.length - 1]; });
  const ex36 = k => 278 + (k - 1) * 34, ey36 = v => 148 - v / 20000 * 92;
  const gx36 = i => 286 + i * 38, gy36 = v => 288 - v / 0.55 * 88;

  SC.s36 = {
    copy: [
      { k: "What changes when you add one group?", m: "Connect three views", s: "2D practice fit · full-file diagnostics", l: "Connect three views" },
      { k: "What changes when you add one group?", m: "Move from two to three", s: "Read both the map and the change in inertia", l: "Move from two to three" },
      { k: "What changes when you add one group?", m: "Try a finer split", s: "Report the trade-off at your chosen k", l: "Try a finer split" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="14" width="228" height="288" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(126, 33, "240 Al Waha episodes", 12.5, NAVY, "middle", 800, "cap36")}
${H.dots(D.pts, F36[0], F36[1], F36[2], F36[3], "p36", 2.7)}
${[0, 1, 2, 3, 4, 5].map(j => H.centre(j, "c36")).join("")}
<rect x="252" y="14" width="216" height="140" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(360, 32, "1 · Elbow plot (inertia)", 12, INK, "middle", 800)}
<path d="M272 44 V148 H454" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
<path d="M${X.inertia.slice(0, 6).map(([k, v]) => `${ex36(k)} ${ey36(v).toFixed(1)}`).join(" L")}" fill="none" stroke="${NAVY}" stroke-width="2.5"/>
${X.inertia.slice(0, 6).map(([k, v]) => `<circle class="ed36" data-k="${k}" cx="${ex36(k)}" cy="${ey36(v).toFixed(1)}" r="4" fill="#fff" stroke="${NAVY}" stroke-width="2"/>`).join("")}
<circle class="esel36 pulse2" cx="${ex36(2)}" cy="${ey36(7594).toFixed(1)}" r="8" fill="none" stroke="${TERRA}" stroke-width="2.5"/>
<rect x="252" y="162" width="216" height="140" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(360, 180, "2 · Real vs shuffled silhouette", 12, INK, "middle", 800)}
<path d="M272 192 V288 H454" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
${C.gaps.map(([k, re, sh], i) => `<g class="gbar36" data-k="${k}">
  <rect class="ghl36" x="${gx36(i) - 4}" y="192" width="30" height="96" rx="5" fill="${GOLD}" fill-opacity="0"/>
  <rect x="${gx36(i)}" y="${gy36(re).toFixed(1)}" width="10" height="${(288 - gy36(re)).toFixed(1)}" fill="${NAVY}" rx="2"/>
  <rect x="${gx36(i) + 12}" y="${gy36(sh).toFixed(1)}" width="10" height="${(288 - gy36(sh)).toFixed(1)}" fill="${GREY}" rx="2"/>
  ${t(gx36(i) + 11, 299, "k=" + k, 9.5, INK, "middle", 700)}
</g>`).join("")}
<rect x="12" y="310" width="456" height="38" rx="10" fill="${INK}"/>
${t(240, 334, "", 12.5, GOLD, "middle", 800, "sum36")}`,
    pick(r, k) {
      const st = KM36[k]; if (!st) return;
      H.colour(r, ".p36", st.lab);
      H.q(r, ".c36").forEach((g, j) => { g.style.opacity = j < k ? "1" : "0"; });
      H.placeCentres(r, ".c36", st.c, F36[0], F36[1], F36[2], F36[3]);
      r.querySelector(".cap36").textContent = `2D practice fit · k = ${k}`;
      const inRow = X.inertia.find(x => x[0] === k);
      const esel = r.querySelector(".esel36");
      if (esel && inRow) { esel.setAttribute("cx", ex36(k)); esel.setAttribute("cy", ey36(inRow[1]).toFixed(1)); }
      H.q(r, ".ghl36").forEach((e, i) => { e.setAttribute("fill-opacity", i === k - 2 ? "0.32" : "0"); });
      const gRow = C.gaps.find(x => x[0] === k);
      if (gRow && inRow) {
        r.querySelector(".sum36").textContent = `Full file · inertia ${fmt(inRow[1])}   |   silhouette advantage +${gRow[3].toFixed(3)}`;
      }
    },
    render(r) {
      const sv = r.querySelector("svg");
      if (!sv._init36) { sv._init36 = 1; SC.s36.pick(r, 2); }
    }
  };

  /* ------------------------------------------------------------ s37 · hierarchical clustering step by step on 10 Al Waha episodes */
  const DG37 = X.dendro, NL37 = DG37.ids.length;
  const ord37 = (() => {
    const kids = {}; DG37.link.forEach(([a, b], i) => { kids[NL37 + i] = [a, b]; });
    const walk = n => n < NL37 ? [n] : [...walk(kids[n][0]), ...walk(kids[n][1])];
    return walk(NL37 + DG37.link.length - 1);
  })();
  const DX37 = 48, DW37 = 374, DY37 = 266, DH37 = 198, HMAX37 = DG37.link[DG37.link.length - 1][2];
  const nd37 = {};
  ord37.forEach((leaf, i) => { nd37[leaf] = { x: DX37 + i * DW37 / (NL37 - 1), y: DY37 }; });
  const LK37 = DG37.link.map(([a, b, h], i) => {
    const A = nd37[a], B = nd37[b], y = DY37 - h / HMAX37 * DH37;
    nd37[NL37 + i] = { x: (A.x + B.x) / 2, y };
    return { d: `M${A.x.toFixed(1)} ${A.y.toFixed(1)} V${y.toFixed(1)} H${B.x.toFixed(1)} V${B.y.toFixed(1)}`, x: (A.x + B.x) / 2, y, h, i };
  });

  SC.s37 = {
    copy: [
      { k: "Read a tree from the leaves upwards", m: "Ten visits", s: "Tree from ten recorded visits", l: "Ten visits" },
      { k: "Read a tree from the leaves upwards", m: "Start at the leaves", s: "One leaf per episode", l: "Start at the leaves" },
      { k: "Read a tree from the leaves upwards", m: "Follow the first bridge", s: "AW101743 and AW100485 · height 0.72", l: "Follow the first bridge" },
      { k: "Read a tree from the leaves upwards", m: "Trace the next joins", s: "Follow the horizontal joins upwards", l: "Trace the next joins" },
      { k: "Read a tree from the leaves upwards", m: "Read the tall interval", s: "Final merge height · 6.82", l: "Read the tall interval" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="452" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(240, 36, "Al Waha dendrogram · Ward linkage on 10 episodes", 13.5, NAVY, "middle", 800)}
<path d="M36 56 V266 H440" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
${[0, 2, 4, 6].map(h => {
  const y = DY37 - h / HMAX37 * DH37;
  return `<path d="M36 ${y.toFixed(1)} H440" stroke="#EFE8DA" stroke-width="1.2"/>` + t(30, y + 4, h, 10, MUTED, "end", 700);
}).join("")}
${t(44,60,"Ward merge height",12,MUTED,"start")}
${LK37.map(l => `<g class="m37" data-i="${l.i}">
  <path class="dr p37" pathLength="1" d="${l.d}" fill="none" stroke="${l.i === 8 ? TERRA : NAVY}" stroke-width="${l.i === 8 ? 3.2 : 2.5}" stroke-linejoin="round"/>
  <g class="a o0 lb37"><rect x="${(l.x - 16).toFixed(1)}" y="${(l.y - 15).toFixed(1)}" width="32" height="14" rx="4" fill="#fff" stroke="${l.i === 8 ? TERRA : NAVY}" stroke-width="1.2"/>
    ${t(l.x.toFixed(1), (l.y - 5).toFixed(1), l.h.toFixed(2), 9.5, l.i === 8 ? TERRA : NAVY, "middle", 800)}</g>
</g>`).join("")}
${ord37.map(leaf => `<g>
  <circle class="lf37" data-g="${DG37.grp[leaf]}" cx="${nd37[leaf].x.toFixed(1)}" cy="${DY37}" r="5.5" fill="${NAVY}"/>
  <text x="${nd37[leaf].x.toFixed(1)}" y="${DY37 + 14}" font-size="9.5" fill="${INK}" font-weight="700" text-anchor="end" transform="rotate(-40 ${nd37[leaf].x.toFixed(1)} ${DY37 + 14})">${DG37.ids[leaf]}</text>
</g>`).join("")}
<g class="a o0 jmp37">
  <path d="M372 ${LK37[8].y.toFixed(1)} V${LK37[7].y.toFixed(1)}" stroke="${TERRA}" stroke-width="3" stroke-dasharray="4 3"/>
  <rect x="276" y="76" width="168" height="40" rx="8" fill="${TERRA}"/>
  ${t(360, 94, "Tall jump: 3.43 → 6.82", 12, "#fff", "middle", 800)}
  ${t(360, 109, "same two branches over this interval", 10, "#fff", "middle", 600)}
</g>`,
    render(r, b) {
      H.q(r, ".m37").forEach(g => {
        const i = +g.dataset.i;
        const on = (b === 2 && i === 0) || (b === 3 && i <= 7) || (b >= 4);
        g.querySelector(".p37").style.transitionDelay = b===3 && i>0 ? (i-1)*.25+"s" : "0s";
        g.querySelector(".p37").style.strokeDashoffset = on ? 0 : 1;
        g.querySelector(".lb37").style.opacity = on && (i === 0 || i === 1 || i === 7 || i === 8) ? 1 : 0;
      });
      H.q(r, ".lf37").forEach(e => { e.style.fill = b >= 4 ? CL[+e.dataset.g] : NAVY; });
      H.show(r, ".jmp37", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s38 · linkage methods compared */
  SC.s38 = {
    copy: [
      { k: "Which pair should two branches join through?", m: "Compare whole branches", s: "Several distances can connect the same branches", l: "Compare whole branches" },
      { k: "Which pair should two branches join through?", m: "Choose a joining rule", s: "Linkage specifies how to compare them", l: "Choose a joining rule" },
      { k: "Which pair should two branches join through?", m: "Measure the shortest bridge", s: "Single linkage · ARI = 0.000 vs k-means (n = 2,500)", l: "Measure the shortest bridge" },
      { k: "Which pair should two branches join through?", m: "Look beyond the closest pair", s: "Complete ARI = 0.976 · Average ARI = 0.962 (n = 2,500)", l: "Look beyond the closest pair" },
      { k: "Which pair should two branches join through?", m: "Price a merge", s: "Ward = smallest increase in total squared spread", l: "Price a merge" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="lkcard lk38-0">
  <rect x="14" y="16" width="218" height="156" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2.2"/>
  ${t(26, 38, "1 · Single linkage", 13.5, TERRA, "start", 800)}${t(220, 38, "min pair", 11, MUTED, "end", 700)}
  <circle cx="56" cy="84" r="4.5" fill="${NAVY}"/><circle cx="72" cy="70" r="4.5" fill="${NAVY}"/><circle cx="88" cy="90" r="5" fill="${NAVY}"/>
  <circle cx="144" cy="88" r="5" fill="${GREEN}"/><circle cx="164" cy="74" r="4.5" fill="${GREEN}"/><circle cx="176" cy="96" r="4.5" fill="${GREEN}"/>
  <line class="dr sgl38" pathLength="1" x1="88" y1="90" x2="144" y2="88" stroke="${TERRA}" stroke-width="3"/>
  ${t(123, 128, "Shortest bridge between groups", 11.5, INK, "middle", 700)}
  ${t(123, 145, "Intermediate points can form a chain", 10.5, TERRA, "middle", 700)}
  ${t(123, 162, "Al Waha (n = 2,500): ARI = 0.000 vs k-means", 10, MUTED, "middle", 700)}
</g>
<g class="a o0 lkcard lk38-1">
  <rect x="248" y="16" width="218" height="156" rx="12" fill="#fff" stroke="${NAVY}" stroke-width="2.2"/>
  ${t(260, 38, "2 · Complete linkage", 13.5, NAVY, "start", 800)}${t(454, 38, "max pair", 11, MUTED, "end", 700)}
  <circle cx="286" cy="86" r="5" fill="${NAVY}"/><circle cx="306" cy="72" r="4.5" fill="${NAVY}"/><circle cx="320" cy="92" r="4.5" fill="${NAVY}"/>
  <circle cx="382" cy="88" r="4.5" fill="${GREEN}"/><circle cx="400" cy="72" r="4.5" fill="${GREEN}"/><circle cx="422" cy="94" r="5" fill="${GREEN}"/>
  <line class="dr cmp38" pathLength="1" x1="286" y1="86" x2="422" y2="94" stroke="${NAVY}" stroke-width="3"/>
  ${t(357, 128, "Furthest pair across the two groups", 11.5, INK, "middle", 700)}
  ${t(357, 145, "Favours compact groups", 10.5, NAVY, "middle", 700)}
  ${t(357, 162, "Al Waha (n = 2,500): ARI = 0.976 vs k-means", 10, NAVY, "middle", 700)}
</g>
<g class="a o0 lkcard lk38-2">
  <rect x="14" y="186" width="218" height="158" rx="12" fill="#fff" stroke="${GOLD}" stroke-width="2.2"/>
  ${t(26, 208, "3 · Average linkage", 13.5, INK, "start", 800)}${t(220, 208, "all pairs", 11, MUTED, "end", 700)}
  ${[[60, 250], [82, 238], [86, 264]].map(([x1, y1]) => [[152, 242], [168, 260], [182, 246]].map(([x2, y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.3"/>`
  ).join("")).join("")}
  <circle cx="60" cy="250" r="4.5" fill="${NAVY}"/><circle cx="82" cy="238" r="4.5" fill="${NAVY}"/><circle cx="86" cy="264" r="4.5" fill="${NAVY}"/>
  <circle cx="152" cy="242" r="4.5" fill="${GREEN}"/><circle cx="168" cy="260" r="4.5" fill="${GREEN}"/><circle cx="182" cy="246" r="4.5" fill="${GREEN}"/>
  ${t(123, 298, "Average of every pairwise line", 11.5, INK, "middle", 700)}
  ${t(123, 315, "Each cross-pair counts equally", 10.5, GREEN, "middle", 700)}
  ${t(123, 332, "Al Waha (n = 2,500): ARI = 0.962 vs k-means", 10, INK, "middle", 700)}
</g>
<g class="a o0 lkcard lk38-3">
  <rect x="248" y="186" width="218" height="158" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>
  ${t(260, 208, "4 · Ward linkage", 13.5, GREEN, "start", 800)}${t(454, 208, "min Δ inertia", 11, GREEN, "end", 800)}
  <ellipse cx="310" cy="252" rx="28" ry="20" fill="${NAVY}" fill-opacity=".12" stroke="${NAVY}" stroke-width="2"/>
  <ellipse cx="398" cy="252" rx="28" ry="20" fill="${TERRA}" fill-opacity=".12" stroke="${TERRA}" stroke-width="2"/>
  <circle cx="310" cy="252" r="5" fill="${NAVY}"/><circle cx="398" cy="252" r="5" fill="${TERRA}"/>
  <path d="M318 252 H390" stroke="${GREEN}" stroke-width="2.5" stroke-dasharray="4 3"/>
  ${t(357, 298, "Minimises increase in inertia", 11.5, INK, "middle", 800)}
  <rect x="262" y="306" width="190" height="28" rx="7" fill="${GREEN}"/>
  ${t(357, 324, "Al Waha: 0.973 agreement with k-means", 10.5, "#fff", "middle", 800)}
</g>`,
    render(r, b) {
      H.draw(r, ".sgl38", b >= 2);
      H.show(r, ".lk38-1,.lk38-2", b >= 3); H.draw(r, ".cmp38", b >= 3);
      H.show(r, ".lk38-3", b >= 4);
    }
  };
})();
