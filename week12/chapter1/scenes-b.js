/* Week 12 · Chapter 1 animated scenes, part B (s10–s18). Uses window.SCH helpers from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, D = window.W12DATA;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, CL } = H.C;
  const { t, person } = H;

  /* ------------------------------------------------------------ s10 · the silhouette score */
  const G1 = [[96, 150], [120, 128], [138, 170], [110, 196], [150, 140], [84, 178], [128, 214], [160, 196], [104, 112], [146, 106]];
  const G2 = [[322, 132], [350, 160], [372, 124], [338, 198], [384, 182], [300, 170], [360, 98], [396, 148], [330, 228], [370, 214]];
  const P10 = [176, 160], B10 = [222, 176];
  const md = (p, set) => set.reduce((s, q) => s + Math.hypot(p[0] - q[0], p[1] - q[1]), 0) / set.length / 50;
  const A10 = md(P10, G1), Bv10 = md(P10, G2), S10 = (Bv10 - A10) / Math.max(A10, Bv10);
  const Sb = (md(B10, G2) - md(B10, G1)) / Math.max(md(B10, G1), md(B10, G2));
  SC.s10 = {
    copy: [
      { k: "The silhouette", m: "One question about every single episode.", s: "Does it sit comfortably in its own group?", l: "One episode, one question" },
      { k: "Distance a", m: "How close is it to the members of its own group?", s: `a = average distance to its own group = ${A10.toFixed(1)}`, l: `a = ${A10.toFixed(1)}` },
      { k: "Distance b", m: "How close is it to the nearest other group?", s: `b = average distance to the nearest other group = ${Bv10.toFixed(1)}`, l: `b = ${Bv10.toFixed(1)}` },
      { k: "The score", m: "b much bigger than a: close to 1. Near 0: on a border.", s: "silhouette = (b − a) ÷ the larger of the two. The score is the average over all episodes.", l: `this episode: ${S10.toFixed(2)}` }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="14" y="56" width="452" height="200" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<ellipse cx="124" cy="160" rx="66" ry="70" fill="${NAVY}" fill-opacity=".07"/><ellipse cx="348" cy="162" rx="70" ry="80" fill="${TERRA}" fill-opacity=".07"/>
<g class="la">${G1.map(q => `<line class="dr" pathLength="1" x1="${P10[0]}" y1="${P10[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${NAVY}" stroke-width="1.8"/>`).join("")}</g>
<g class="lb">${G2.map(q => `<line class="dr" pathLength="1" x1="${P10[0]}" y1="${P10[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${TERRA}" stroke-width="1.5" stroke-opacity=".8"/>`).join("")}</g>
${G1.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="6" fill="${NAVY}"/>`).join("")}${G2.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="6" fill="${TERRA}"/>`).join("")}
<g class="pp"><circle cx="${P10[0]}" cy="${P10[1]}" r="15" fill="${GOLD}" fill-opacity=".45" class="pulse"/><circle cx="${P10[0]}" cy="${P10[1]}" r="8.5" fill="${NAVY}" stroke="${GOLD}" stroke-width="3.5"/></g>
<g class="a o0 bp"><circle cx="${B10[0]}" cy="${B10[1]}" r="8.5" fill="${NAVY}" stroke="${INK}" stroke-width="2.5" stroke-dasharray="3 2"/>${t(B10[0], B10[1] + 26, "on the border", 12, MUTED, "middle", 700)}</g>
${t(124, 80, "own group", 13, NAVY, "middle", 700)}${t(348, 80, "nearest other group", 13, TERRA, "middle", 700)}
<g class="a o0 av">${t(26, 40, `a = ${A10.toFixed(1)}`, 22, NAVY, "start", 800)}</g>
<g class="a o0 bv">${t(454, 40, `b = ${Bv10.toFixed(1)}`, 22, TERRA, "end", 800)}</g>
<g class="a o0 fm">
  ${t(240, 276, `(b − a) ÷ max(a, b) = (${Bv10.toFixed(1)} − ${A10.toFixed(1)}) ÷ ${Bv10.toFixed(1)} = ${S10.toFixed(2)}`, 15, INK, "middle", 700)}
  <rect x="60" y="304" width="360" height="14" rx="7" fill="#E7DDCB"/>
  ${[0, .5, 1].map(v => t(60 + v * 360, 340, v ? v.toFixed(1) : "0", 12, MUTED, "middle", 600)).join("")}
  <g class="mk1 a" style="transform:translateX(0)"><path d="M60 304 l-7 -10 h14 z" fill="${NAVY}"/></g>
  <g class="mk2 a o0" style="transform:translateX(0)"><path d="M60 322 l-7 10 h14 z" fill="${INK}"/>${t(60, 354, "border episode", 11, INK, "middle", 700)}</g>
  ${t(60 + S10 * 360, 289, "this episode", 11.5, NAVY, "middle", 700, "a o0 mk1t")}
</g>`,
    render(r, b) {
      H.draw(r, ".la .dr", b >= 1); H.q(r, ".la .dr").forEach((e, i) => { e.style.transitionDelay = (i * .08) + "s"; });
      H.show(r, ".la", b === 1 || b === 3); H.show(r, ".av", b >= 1);
      H.draw(r, ".lb .dr", b >= 2); H.q(r, ".lb .dr").forEach((e, i) => { e.style.transitionDelay = (i * .08) + "s"; });
      H.show(r, ".lb", b >= 2); H.show(r, ".bv", b >= 2);
      H.show(r, ".fm", b >= 3); H.show(r, ".bp", b >= 3); H.delay(r, ".bp", b >= 3 ? 2.2 : 0);
      H.tf(r, ".mk1", b >= 3 ? `translateX(${S10 * 360}px)` : "none"); H.delay(r, ".mk1", .6); H.show(r, ".mk1t", b >= 3); H.delay(r, ".mk1t", 1.4);
      H.show(r, ".mk2", b >= 3); H.tf(r, ".mk2", b >= 3 ? `translateX(${Math.max(0, Sb) * 360}px)` : "none"); H.delay(r, ".mk2", b >= 3 ? 2.6 : 0);
    }
  };

  /* ------------------------------------------------------------ s11 / s12 · the gap chart */
  const GAPS = window.CHAPTER.gaps, GY0 = 290, GH = 360;   // value 0 at y=290; 1.0 = 360 px
  const gx = i => 80 + i * 78;
  const gapSvg = (cls) => `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="14" y="14" width="452" height="332" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
${[0, .1, .2, .3, .4, .5].map(v => `<path d="M58 ${GY0 - v * GH} H456" stroke="#EDE6D8" stroke-width="1.5"/>` + t(50, GY0 - v * GH + 4, v.toFixed(1), 11.5, MUTED, "end", 600)).join("")}
<path d="M58 ${GY0} H456" stroke="${MUTED}" stroke-width="2"/>
${t(30, 40, "silhouette", 12.5, MUTED, "start", 700)}
<g class="a o0 floor"><path d="M58 ${GY0 - .183 * GH} H456" stroke="${GREY}" stroke-width="2" stroke-dasharray="6 5"/><path d="M352 36 H372" stroke="${GREY}" stroke-width="2" stroke-dasharray="5 4"/>${t(376, 40, "noise floor ≈ 0.18", 12, MUTED, "start", 700)}</g>
${GAPS.map(([k, re, sh, gp], i) => `<g class="grp grp${i}" data-k="${k}">
  <rect class="hlk" x="${gx(i) - 6}" y="44" width="70" height="${GY0 - 44 + 30}" rx="10" fill="${GOLD}" fill-opacity="0"/>
  <rect class="br re" x="${gx(i)}" y="${GY0}" width="27" height="0" fill="${NAVY}" rx="3" data-v="${re}"/>
  <rect class="br sh" x="${gx(i) + 31}" y="${GY0}" width="27" height="0" fill="${GREY}" rx="3" data-v="${sh}"/>
  ${t(gx(i) + 13.5, GY0 - re * GH - 6, re.toFixed(2), 11.5, NAVY, "middle", 800, "a o0 vl")}
  ${t(gx(i) + 44.5, GY0 - sh * GH - 6, sh.toFixed(2), 11.5, MUTED, "middle", 700, "a o0 vl")}
  ${t(gx(i) + 29, GY0 + 20, "k = " + k, 14, INK, "middle", 800)}
  <g class="a o0 gp">${t(gx(i) + 29, GY0 + 40, "+" + gp.toFixed(3).replace(/^0/, "0"), 14, TERRA, "middle", 800)}</g>
</g>`).join("")}
<g class="leg">${t(118, 40, "■", 14, NAVY, "start")}${t(134, 40, "real data", 12.5, INK, "start", 700)}${t(214, 40, "■", 14, GREY, "start")}${t(230, 40, "shuffled data", 12.5, INK, "start", 700)}</g>
${t(30, GY0 + 40, "gap", 13, TERRA, "start", 800, "a o0 gpl")}
<g class="a o0 crown ${cls || ""}"><path d="M${gx(0) + 12} 64 l6 -14 l8 10 l8 -10 l6 14 z" fill="${GOLD}" stroke="${INK}" stroke-width="1.5"/>${t(gx(0) + 76, 66, "strongest structure", 13, INK, "start", 800)}</g>`;
  function gapRender(r, upto, gaps, floor, crown) {
    H.q(r, ".grp").forEach((g, i) => {
      const on = i <= upto;
      g.querySelectorAll(".br").forEach((e, j) => { const v = on ? +e.dataset.v : 0; e.style.transition = `y 1s cubic-bezier(.3,.8,.25,1) ${i * .15 + j * .1}s, height 1s cubic-bezier(.3,.8,.25,1) ${i * .15 + j * .1}s`; e.setAttribute("y", GY0 - v * GH); e.setAttribute("height", v * GH); });
      g.querySelectorAll(".vl").forEach(e => { e.style.transitionDelay = (.8 + i * .15) + "s"; e.style.opacity = on ? 1 : 0; });
      const gp = g.querySelector(".gp"); gp.style.transitionDelay = (1.2 + i * .25) + "s"; gp.style.opacity = gaps && on ? 1 : 0;
    });
    H.show(r, ".gpl", gaps); H.show(r, ".floor", floor); H.delay(r, ".floor", floor ? 1.4 : 0); H.show(r, ".crown", crown);
  }
  SC.s11 = {
    copy: [
      { k: "The Al Waha file", m: "Real data against shuffled data, for two to six groups.", s: "Staff ratio, training hours, occupancy and handoffs, standardised.", l: "k = 2 to 6" },
      { k: "k = 2", m: "Real data: 0.50. Shuffled data: 0.19.", s: "The real groups are far better separated than noise.", l: "0.504 vs 0.190" },
      { k: "As k grows", m: "The real score falls; the noise floor stays near 0.18.", s: "The gap shrinks from +0.31 at k = 2 to +0.07 at k = 6.", l: "The gap shrinks" },
      { k: "The verdict", m: "Real structure, strongest with two groups.", s: "We only know this because we ran the comparison.", l: "k = 2: strongest" }
    ],
    svg: gapSvg(),
    render(r, b) {
      gapRender(r, b === 0 ? -1 : b === 1 ? 0 : 4, b >= 1, b >= 2, b >= 3);
      H.q(r, ".hlk").forEach((e, i) => { e.style.transition = "fill-opacity .6s"; e.style.fillOpacity = b >= 3 && i === 0 ? .22 : 0; });
    }
  };
  SC.s12 = {
    copy: [
      { k: "Your turn", m: "Which k would you report to the hospital director?", s: "Tap a k under the stage.", l: "Choose k" },
      { k: "Remember", m: "k is chosen, not discovered.", s: "Use the gap, and whether the groups mean something.", l: "Choose, then defend" }
    ],
    svg: gapSvg(),
    pick(r, i) { H.q(r, ".hlk").forEach((e, j) => { e.style.transition = "fill-opacity .5s"; e.style.fillOpacity = j === i ? .28 : 0; }); },
    render(r) { gapRender(r, 4, true, true, false); }
  };

  /* ------------------------------------------------------------ s13 · the three assumptions */
  const PX13 = [16, 170, 324], PW = 140;
  let seed = 5; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const gauss = () => { let s = 0; for (let i = 0; i < 6; i++) s += rnd(); return (s - 3) / 1.2; };
  const CLOUD = Array.from({ length: 46 }, () => [gauss() * 16, gauss() * 16]);
  const MOON = [];
  for (let i = 0; i < 30; i++) { const a = Math.PI * i / 29; MOON.push([Math.cos(a) + (rnd() - .5) * .18, Math.sin(a) + (rnd() - .5) * .18, 0]); MOON.push([1 - Math.cos(a) + (rnd() - .5) * .18, .45 - Math.sin(a) + (rnd() - .5) * .18, 1]); }
  const mx = p => PX13[2] + 14 + (p[0] + 1.1) / 3.2 * (PW - 28), my = p => 200 - (p[1] + .7) / 1.9 * 110;
  SC.s13 = {
    copy: [
      { k: "Assumptions", m: "k-means makes three assumptions.", s: "Check each one before you trust the groups.", l: "Three checks" },
      { k: "1 · Scale", m: "The variables are on comparable scales.", s: "Check the standard deviations. Standardise every time.", l: "Comparable scales" },
      { k: "2 · Choosing k", m: "k must be chosen, not discovered.", s: "Elbow, silhouette, noise floor, and meaning to the organisation.", l: "Justify k" },
      { k: "3 · Shape", m: "Groups roughly round and of similar size.", s: "Long, thin or curved groups get cut in half: use hierarchical clustering or DBSCAN.", l: "Round groups only" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
${["Scale", "Choosing k", "Shape"].map((n, i) => `<g class="pn pn${i}"><rect x="${PX13[i]}" y="40" width="${PW}" height="250" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  <circle cx="${PX13[i] + 22}" cy="64" r="13" fill="${NAVY}"/>${t(PX13[i] + 22, 69, i + 1, 14, "#fff")}${t(PX13[i] + 42, 69, n, 15, INK, "start", 800)}</g>`).join("")}
<g class="cl1" style="transform-origin:${PX13[0] + 70}px 170px;transform:scaleX(2.6) scaleY(.5);transition:transform 1.6s cubic-bezier(.4,0,.2,1) .6s">${CLOUD.map(p => `<circle cx="${PX13[0] + 70 + p[0]}" cy="${170 + p[1]}" r="3.2" fill="${NAVY}" fill-opacity=".7"/>`).join("")}</g>
<g class="a o0 s1t">${t(PX13[0] + 70, 250, "standardised:", 12.5, MUTED, "middle", 600)}${t(PX13[0] + 70, 268, "every SD = 1", 13.5, GREEN, "middle", 800)}</g>
<g class="a o0 s2">
  <path d="M${PX13[1] + 18} 96 V230 H${PX13[1] + 128}" fill="none" stroke="${MUTED}" stroke-width="1.5"/>
  <path class="dr" pathLength="1" d="M${PX13[1] + 26} 104 L${PX13[1] + 46} 170 L${PX13[1] + 66} 196 L${PX13[1] + 86} 208 L${PX13[1] + 106} 215 L${PX13[1] + 124} 219" fill="none" stroke="${NAVY}" stroke-width="3"/>
  <circle class="a o0 kn" cx="${PX13[1] + 46}" cy="170" r="8" fill="none" stroke="${TERRA}" stroke-width="3"/>
  ${t(PX13[1] + 74, 246, "elbow · silhouette", 12, MUTED, "middle", 700)}
  ${t(PX13[1] + 74, 262, "noise floor", 12, MUTED, "middle", 700)}
  ${t(PX13[1] + 74, 280, "+ does it mean something?", 11.5, TERRA, "middle", 800)}
</g>
<g class="moons">${MOON.map((p, i) => `<circle class="mn" data-g="${p[2]}" data-x="${mx(p) < PX13[2] + PW / 2 ? 0 : 1}" cx="${mx(p).toFixed(1)}" cy="${my(p).toFixed(1)}" r="3.4" style="fill:${GREY};transition:fill .6s"/>`).join("")}</g>
<path class="dr cut" pathLength="1" d="M${PX13[2] + PW / 2} 96 V236" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="1"/>
<g class="a o0 bad">${t(PX13[2] + 70, 258, "k-means: cut in half ✗", 12.5, TERRA, "middle", 800)}</g>
<g class="a o0 good">${t(PX13[2] + 70, 276, "DBSCAN: two moons ✓", 12.5, GREEN, "middle", 800)}</g>
<g class="a o0 alt"><rect x="60" y="304" width="360" height="40" rx="10" fill="${INK}"/>${t(240, 330, "Not round? hierarchical clustering or DBSCAN", 15, "#fff", "middle", 800)}</g>`,
    render(r, b) {
      const alive = H.alive(r); clearTimeout(r._t13);
      H.q(r, ".pn").forEach((g, i) => { g.querySelector("rect").style.stroke = b === i + 1 ? NAVY : ""; g.querySelector("rect").style.strokeWidth = b === i + 1 ? "3.5" : ""; });
      H.tf(r, ".cl1", b >= 1 ? "none" : "scaleX(2.6) scaleY(.5)"); H.show(r, ".s1t", b >= 1); H.delay(r, ".s1t", b >= 1 ? 2 : 0);
      H.show(r, ".s2", b >= 2); H.draw(r, ".s2 .dr", b >= 2); H.show(r, ".kn", b >= 2); H.delay(r, ".kn", b >= 2 ? 1.6 : 0);
      H.draw(r, ".cut", b >= 3); H.show(r, ".bad", b >= 3); H.delay(r, ".bad", b >= 3 ? .6 : 0);
      H.q(r, ".mn").forEach(e => { e.style.fill = b >= 3 ? CL[+e.dataset.x ? 1 : 0] : GREY; });
      H.show(r, ".good", false); H.show(r, ".alt", false);
      if (b >= 3) r._t13 = setTimeout(() => { if (!alive()) return; H.q(r, ".mn").forEach(e => { e.style.fill = +e.dataset.g ? GREEN : GOLD; }); H.draw(r, ".cut", false); H.show(r, ".good", true); H.show(r, ".alt", true); }, 3200);
    }
  };

  /* ------------------------------------------------------------ s14 · naming from the centres */
  const [G0, G1p] = D.prof2;          // [label, staff, training, occupancy, handoffs, size]
  const ROWS14 = [["staff ratio", 1, 2], ["training hours", 2, 1], ["occupancy %", 3, 1], ["handoffs", 4, 1]];
  const bed = (x, y) => `<g transform="translate(${x} ${y})"><rect x="0" y="6" width="26" height="10" rx="2" fill="${SKY}" stroke="${NAVY}" stroke-width="1.5"/><rect x="2" y="2" width="8" height="6" rx="2" fill="#fff" stroke="${NAVY}" stroke-width="1.2"/><path d="M0 16 v5 M26 16 v5" stroke="${NAVY}" stroke-width="1.5"/></g>`;
  const card14 = (x, g, i) => `<g class="cd cd${i}">
  <rect class="cdr" x="${x}" y="50" width="214" height="196" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  ${t(x + 107, 70, `Group ${i + 1} · ${Math.round(g[5]).toLocaleString("en-US")} episodes`, 13.5, MUTED, "middle", 700)}
  <g>${i === 0 ? [0, 1, 2, 3, 4, 5].map(k => bed(x + 14 + (k % 6) * 31, 80)).join("") + person(x + 178, 132, NAVY, .62) :
                 [0, 1, 2, 3].map(k => bed(x + 14 + k * 34, 80)).join("") + person(x + 160, 132, GREEN, .62) + person(x + 182, 132, GREEN, .62) + person(x + 204 - 8, 132, GREEN, .62)}</g>
  ${ROWS14.map(([n, j], k) => { const v = g[j], o = (i === 0 ? G1p : G0)[j], up = v > o;
    return t(x + 14, 160 + k * 22, n, 13.5, INK, "start", 600) + t(x + 168, 160 + k * 22, j === 1 ? v.toFixed(2) : j === 4 ? v.toFixed(1) : v.toFixed(1), 14, INK, "end", 800) +
      `<g class="a o0 ar ar${i}" style="transition-delay:${.3 + k * .25}s">${t(x + 190, 161 + k * 22, up ? "▲ high" : "▼ low", 12, up ? TERRA : NAVY, "middle", 800)}</g>`; }).join("")}
</g>`;
  SC.s14 = {
    copy: [
      { k: "Naming", m: "Read each centre in original units.", s: "Say what is high and what is low, compared with the other group.", l: "Two centres" },
      { k: "Group 1", m: "Thin staffing, little training, full wards, many handoffs.", s: "About 2,100 episodes.", l: "Group 1 profile" },
      { k: "Group 2", m: "More staff, more training, emptier wards, fewer handoffs.", s: "About 2,600 episodes.", l: "Group 2 profile" },
      { k: "The names", m: "Stretched wards, and well-resourced wards.", s: "Every word traces back to a number in the profile.", l: "Names from numbers" },
      { k: "The final test", m: "Would a hospital manager recognise these groups?", s: "If not, you have a statistical artefact, not a segment.", l: "Recognisable?" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
${card14(18, G0, 0)}${card14(248, G1p, 1)}
${[["Stretched wards", 125, TERRA], ["Well-resourced wards", 355, GREEN]].map(([n, x, c], i) => `<g class="a o0 nm nm${i}" style="transform:translateY(-40px)"><rect x="${x - 92}" y="10" width="184" height="32" rx="16" fill="${c}"/>${t(x, 32, n, 16, "#fff", "middle", 800)}</g>`).join("")}
<g class="a o0 qn">${t(125, 34, "Group 1 = ?", 16, MUTED, "middle", 800)}${t(355, 34, "Group 2 = ?", 16, MUTED, "middle", 800)}</g>
<g class="a o0 mgr">${person(78, 340, NAVY, 1.15)}
  <path d="M112 270 H440 Q452 270 452 282 V316 Q452 328 440 328 H128 L112 342 L116 328 Q104 328 104 316 V282 Q104 270 112 270Z" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
  ${t(278, 297, "“Yes, I know those wards.”", 16, NAVY, "middle", 800)}${t(278, 318, "recognised = a segment, not an artefact", 12.5, GREEN, "middle", 700)}</g>`,
    render(r, b) {
      H.show(r, ".ar0", b >= 1); H.show(r, ".ar1", b >= 2);
      H.q(r, ".cdr").forEach((e, i) => { e.style.stroke = (b === 1 && i === 0) || (b === 2 && i === 1) ? NAVY : ""; e.style.strokeWidth = (b === 1 && i === 0) || (b === 2 && i === 1) ? "3.5" : ""; });
      H.show(r, ".qn", b < 3);
      H.show(r, ".nm", b >= 3); H.tf(r, ".nm", b >= 3 ? "none" : "translateY(-40px)"); H.delay(r, ".nm1", b >= 3 ? .5 : 0);
      H.show(r, ".mgr", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s15 · four sentences you may not write */
  const SENT = [["“The data naturally falls into four clusters.”", "You chose four."], ["“Cluster 2 is the high-performing group.”", "Performance was not a clustering variable."], ["“The clusters are statistically significant.”", "There is no test, and no p value."], ["“This segmentation explains satisfaction.”", "Nothing was explained: a description was produced."]];
  SC.s15 = {
    copy: [
      { k: "Your turn", m: "May you write each sentence, or not?", s: "Decide under the stage.", l: "Four sentences" },
      { k: "Sentence 1", m: "“Naturally falls into four”? No: you chose four.", s: "k is chosen, not discovered.", l: "1 · not allowed" },
      { k: "Sentence 2", m: "“High-performing”? No: you are importing a conclusion.", s: "Performance was not among the clustering variables.", l: "2 · not allowed" },
      { k: "Sentence 3", m: "“Statistically significant”? No: there is no test here.", s: "No p value exists to support that phrase.", l: "3 · not allowed" },
      { k: "Sentence 4", m: "“Explains satisfaction”? No: a description was produced.", s: "All four sentences are off limits.", l: "4 · not allowed" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="30" y="16" width="420" height="330" rx="6" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<path d="M30 16 h420 v10 h-420z" fill="${NAVY}"/>
${t(50, 52, "Draft report · Results", 14, MUTED, "start", 700)}
${SENT.map(([s, why], i) => `<g class="sn">${t(50, 92 + i * 70, s, 15, INK, "start", 700)}
  <path class="dr st" pathLength="1" d="M46 ${87 + i * 70} H${50 + s.length * 6.9}" stroke="${TERRA}" stroke-width="3"/>
  <g class="a o0 why">${t(50, 114 + i * 70, "✗  " + why, 13.5, TERRA, "start", 700)}</g></g>`).join("")}
<g class="a o0 pen bob"><path d="M396 64 l30 -30 l10 10 l-30 30 z" fill="${GOLD}" stroke="${INK}" stroke-width="2"/><path d="M396 64 l-6 16 l16 -6 z" fill="${INK}"/></g>
<g class="a o0 all" style="transform:scale(1.8)"><g transform="rotate(-5 342 50)"><rect x="238" y="33" width="208" height="36" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(342, 58, "ALL FOUR: OFF LIMITS", 17, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.show(r, ".pen", b === 0);
      H.q(r, ".sn").forEach((g, i) => { const on = b >= i + 1; g.querySelector(".st").style.strokeDashoffset = on ? 0 : 1; const w = g.querySelector(".why"); w.style.transitionDelay = on ? ".9s" : "0s"; w.style.opacity = on ? 1 : 0; });
      H.show(r, ".all", b >= 4); H.tf(r, ".all", b >= 4 ? "scale(1)" : "scale(1.8)"); H.delay(r, ".all", b >= 4 ? 4 : 0);
    }
  };

  /* ------------------------------------------------------------ s16 · you decide; ChatGPT assists */
  SC.s16 = {
    copy: [
      { k: "Every week", m: "You decide. ChatGPT assists.", s: "Interpretation stays on your side.", l: "You decide" },
      { k: "A good helper question", m: "Explain what n_init=10 does.", s: "And why leaving it at 1 can give a different answer each time.", l: "Explains an argument ✓" },
      { k: "A bad helper question", m: "“What should I call these clusters?”", s: "A model that names your segments has written your findings.", l: "Names your findings ✗" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="16" y="20" width="168" height="320" rx="14" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
${t(100, 50, "You decide", 17, NAVY, "middle", 800)}
${["the question", "the variables and k", "the core code", "the diagnostics", "the names"].map((s, i) => `<g class="yu${i}">${t(34, 86 + i * 34, "•  " + s, 14, INK, "start", 700)}</g>`).join("")}
<g class="a o0 lock"><rect x="26" y="${86 + 4 * 34 - 22}" width="150" height="32" rx="8" fill="${GOLD}" fill-opacity=".3" stroke="${GOLD}" stroke-width="2"/>
  <g transform="translate(160 ${86 + 4 * 34 - 7})"><rect x="-8" y="-4" width="16" height="12" rx="2" fill="${INK}"/><path d="M-5 -4 v-4 a5 5 0 0 1 10 0 v4" fill="none" stroke="${INK}" stroke-width="2.2"/></g></g>
${person(100, 318, NAVY, 1.1)}<rect x="62" y="270" width="76" height="8" rx="3" fill="${MUTED}"/>
<rect x="198" y="20" width="266" height="320" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<rect x="198" y="20" width="266" height="40" rx="14" fill="${INK}"/><rect x="198" y="46" width="266" height="14" fill="${INK}"/>
${t(331, 46, "ChatGPT assists", 15, "#fff", "middle", 800)}
<g class="a o0 gq" style="transform:translateY(16px)">
  <rect x="214" y="76" width="236" height="96" rx="14" fill="${SKY}"/>
  <foreignObject x="224" y="82" width="216" height="86"><div xmlns="http://www.w3.org/1999/xhtml" style="font:600 13.5px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.25">“Explain what <b>n_init=10</b> does, and why leaving it at 1 can give a different answer each time.”</div></foreignObject>
  <circle cx="446" cy="176" r="15" fill="${GREEN}"/>${t(446, 182, "✓", 16, "#fff", "middle", 800)}
  ${t(214, 194, "explains an argument", 13, GREEN, "start", 800)}
</g>
<g class="a o0 bq" style="transform:translateY(16px)">
  <rect x="214" y="216" width="236" height="56" rx="14" fill="${SKY}"/>
  <foreignObject x="224" y="222" width="216" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style="font:600 13.5px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.25">“What should I call these clusters?”</div></foreignObject>
  <circle cx="446" cy="276" r="15" fill="${TERRA}"/>${t(446, 282, "✗", 16, "#fff", "middle", 800)}
  ${t(214, 296, "names your findings for you", 13, TERRA, "start", 800)}
</g>`,
    render(r, b) {
      H.show(r, ".gq", b >= 1); H.tf(r, ".gq", b >= 1 ? "none" : "translateY(16px)");
      H.show(r, ".bq", b >= 2); H.tf(r, ".bq", b >= 2 ? "none" : "translateY(16px)");
      H.show(r, ".lock", b >= 2); H.delay(r, ".lock", b >= 2 ? 1.4 : 0);
    }
  };

  /* ------------------------------------------------------------ s17 · quiz (panel only) */
  SC.s17 = { full: true, copy: [{ k: "Quiz", m: "Five questions", s: "", l: "" }], svg: "", render() { } };

  /* ------------------------------------------------------------ s18 · takeaways */
  const IDEAS = [
    ["No answer key", "Clustering always returns clusters, even from noise.", "dice"],
    ["Standardise first", "Distance decides everything; units must not.", "ruler"],
    ["Gap = evidence", "Compare with the same clustering on shuffled data.", "shuffle"],
    ["Name from centres", "Original units. Describe; never claim more.", "tag"]];
  const icon = (k, x, y) => ({
    dice: `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="7" fill="#fff" stroke="${NAVY}" stroke-width="3"/>${[[-7, -7], [7, 7], [0, 0], [7, -7], [-7, 7]].map(([a, c]) => `<circle cx="${x + a}" cy="${y + c}" r="2.6" fill="${NAVY}"/>`).join("")}`,
    ruler: `<rect x="${x - 20}" y="${y - 9}" width="40" height="18" rx="3" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>${[-12, -4, 4, 12].map(a => `<path d="M${x + a} ${y - 9} v7" stroke="${INK}" stroke-width="2"/>`).join("")}`,
    shuffle: `<path d="M${x - 18} ${y - 8} H${x - 6} L${x + 6} ${y + 8} H${x + 16} M${x - 18} ${y + 8} H${x - 6} L${x + 6} ${y - 8} H${x + 16}" fill="none" stroke="${TERRA}" stroke-width="3"/><path d="M${x + 14} ${y - 13} l6 5 l-6 5 M${x + 14} ${y + 3} l6 5 l-6 5" fill="none" stroke="${TERRA}" stroke-width="3"/>`,
    tag: `<path d="M${x - 16} ${y - 10} H${x + 6} L${x + 18} ${y} L${x + 6} ${y + 10} H${x - 16} Z" fill="${GREEN}"/><circle cx="${x + 6}" cy="${y}" r="3" fill="#fff"/>`
  })[k];
  SC.s18 = {
    copy: [
      { k: "Takeaways", m: "Four ideas to keep from this chapter.", s: "", l: "Four ideas" },
      { k: "Idea 1", m: "Clustering has no answer key, and it always returns clusters.", s: "Even from noise.", l: "1 · no answer key" },
      { k: "Idea 2", m: "Distance decides everything: standardise first.", s: "Every variable, every time.", l: "2 · standardise" },
      { k: "Idea 3", m: "Compare with shuffled data. The gap is the evidence.", s: "A silhouette alone says nothing.", l: "3 · gap = evidence" },
      { k: "Idea 4", m: "Name each group from its centre, in original units.", s: "Describe; never claim more.", l: "4 · name from the centre" },
      { k: "Your self-paced session", m: "Now do it yourself.", s: "Four tasks, real data.", l: "Self-paced session" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
${IDEAS.map(([h, s, ic], i) => { const x = 20 + (i % 2) * 226, y = 18 + Math.floor(i / 2) * 120;
  return `<g class="a o0 idea" style="transform:translateY(14px)"><rect x="${x}" y="${y}" width="214" height="108" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  <circle cx="${x + 34}" cy="${y + 36}" r="24" fill="#F1ECE2"/>${icon(ic, x + 34, y + 36)}
  ${t(x + 66, y + 41, (i + 1) + " · " + h, 14.5, INK, "start", 800)}
  <foreignObject x="${x + 14}" y="${y + 62}" width="190" height="42"><div xmlns="http://www.w3.org/1999/xhtml" style="font:400 13px Calibri,Segoe UI,sans-serif;color:${MUTED};line-height:1.25">${s}</div></foreignObject></g>`; }).join("")}
<g class="a o0 tasks">
  <rect x="20" y="262" width="440" height="86" rx="14" fill="${NAVY}"/>
  ${t(36, 284, "Self-paced session", 14, GOLD, "start", 800)}
  ${["a distance by hand, twice", "cluster on new variables", "run the shuffled comparison", "name and defend each group"].map((s, i) =>
    `<g class="tk" style="transition:opacity .5s ${.4 + i * .5}s"><circle cx="${42 + (i % 2) * 214}" cy="${304 + Math.floor(i / 2) * 24}" r="7" fill="${GREEN}"/>${t(42 + (i % 2) * 214, 308 + Math.floor(i / 2) * 24, "✓", 10, "#fff")}${t(56 + (i % 2) * 214, 309 + Math.floor(i / 2) * 24, s, 13, "#fff", "start", 600)}</g>`).join("")}
</g>`,
    render(r, b) {
      H.q(r, ".idea").forEach((g, i) => { const on = b >= i + 1 || b === 0 && false; g.style.opacity = b >= i + 1 ? 1 : b === 0 ? .25 : 0; g.style.transform = b >= i + 1 ? "none" : "translateY(14px)"; });
      H.show(r, ".tasks", b >= 5); H.q(r, ".tk").forEach(e => { e.style.opacity = b >= 5 ? 1 : 0; });
    }
  };
})();
