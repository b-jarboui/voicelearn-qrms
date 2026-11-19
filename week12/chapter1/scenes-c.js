/* Week 12 · Chapter 2 animated scenes, part C (s19–s25, added 17 Nov 2026). Uses window.SCH from scenes-a.js.
   Data: window.W12DATA (2-D map of 240 real episodes) and window.W12X (real figures computed with scikit-learn 1.8). */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, D = window.W12DATA, X = window.W12X, C = window.CHAPTER;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, CL } = H.C;
  const { t, person } = H;
  const fmt = n => Math.round(n).toLocaleString("en-US"), PAPER = "#F6F1E7", EDGE = "#CDBFA6";
  const fo = (x, y, w, h, html, size, color, weight, extra) =>
    `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:${weight || 600} ${size || 13}px Calibri,Segoe UI,sans-serif;color:${color || INK};line-height:1.25;${extra || ""}">${html}</div></foreignObject>`;

  /* ------------------------------------------------------------ s19 · why look for groups? */
  const P19 = D.pts.filter((_, i) => i % 3 === 0), L19 = D.lab2.filter((_, i) => i % 3 === 0), B19 = [42, 46, 214, 146];
  const factory = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0 44 V18 l16 10 V18 l16 10 V18 l16 10 V44 Z" fill="${c}"/><rect x="38" y="0" width="8" height="24" fill="${c}"/><g class="bob"><circle cx="42" cy="-6" r="4" fill="${GREY}" fill-opacity=".6"/><circle cx="48" cy="-13" r="3" fill="${GREY}" fill-opacity=".4"/></g>${[6, 22, 38].map(a => `<rect x="${a}" y="32" width="6" height="7" fill="#fff"/>`).join("")}</g>`;
  SC.s19 = {
    copy: [
      { k: "What would a useful group tell the manager?", m: "From rows to profiles", s: "4,740 complete episodes", l: "From rows to profiles" },
      { k: "What would a useful group tell the manager?", m: "A practical question", s: "A starting point for investigation", l: "A practical question" },
      { k: "What would a useful group tell the manager?", m: "An example from manufacturing", s: "Miller and Roth · manufacturing priorities", l: "An example from manufacturing" },
      { k: "What would a useful group tell the manager?", m: "A name with evidence", s: "Name each profile from its measurements", l: "A name with evidence" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="270" height="190" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(149, 34, "", 12.5, MUTED, "middle", 700, "cap19")}
${P19.map((p, i) => { const [x, y] = H.px(p, B19[0], B19[1], B19[2], B19[3]); return `<circle class="pt p19" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" style="transition:fill .7s ${(i * .012).toFixed(2)}s, transform 1.2s cubic-bezier(.3,.8,.25,1)"/>`; }).join("")}
<g class="a mgr19">${person(340, 196, NAVY, 1.5)}<g class="a q19"><g class="bob"><circle cx="384" cy="96" r="20" fill="${TERRA}"/>${t(384, 105, "?", 26, "#fff", "middle", 800)}</g></g></g>
${[["Profile A", TERRA, "review staffing"], ["Profile B", NAVY, "review training"]].map(([n, c, s], i) => `<g class="a o0 pol19" style="transform:translateX(30px);transition-delay:${.9 + i * .4}s"><rect x="300" y="${36 + i * 62}" width="166" height="52" rx="10" fill="#fff" stroke="${c}" stroke-width="2.5"/><circle cx="318" cy="${62 + i * 62}" r="8" fill="${c}"/>${t(334, 58 + i * 62, n, 13.5, INK, "start", 800)}${t(334, 76 + i * 62, s, 11, MUTED, "start", 600)}</g>`).join("")}
<g class="a o0 mr19" style="transform:translateY(18px)">
  <rect x="14" y="214" width="452" height="134" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(28, 236, "Miller & Roth (1994) · a taxonomy of manufacturing strategies", 12.5, MUTED, "start", 700)}
  ${[["Caretakers", NAVY, "compete on price"], ["Marketeers", TERRA, "broad lines, quality"], ["Innovators", GREEN, "new designs, fast"]].map(([n, c, s], i) => `<g class="a o0 f19" style="transition-delay:${.4 + i * .45}s;transform:translateY(14px)">${factory(54 + i * 150, 252, c)}${t(78 + i * 150, 318, n, 15, c, "middle", 800)}${t(78 + i * 150, 335, s, 11, MUTED, "middle", 600)}</g>`).join("")}
</g>
<g class="a o0 st19" style="transform:scale(1.7)"><g transform="rotate(-6 372 180)"><rect x="286" y="162" width="172" height="34" rx="7" fill="#fff" stroke="${GREEN}" stroke-width="3.5"/>${t(372, 185, "NAMES FROM NUMBERS", 14.5, GREEN, "middle", 800)}</g></g>`,
    render(r, b) {
      r.querySelector(".cap19").textContent = b >= 1 ? "two candidate profiles" : "4,740 episodes, one by one";
      H.q(r, ".p19").forEach((e, i) => { e.style.fill = b >= 1 ? CL[L19[i]] : ""; e.style.transform = b >= 1 ? `translateX(${L19[i] ? 10 : -10}px)` : "none"; });
      H.show(r, ".q19", b === 0); H.show(r, ".mgr19", b === 0);
      H.q(r, ".pol19").forEach(g => { g.style.opacity = b >= 1 ? 1 : 0; g.style.transform = b >= 1 ? "none" : "translateX(30px)"; });
      H.show(r, ".mr19", b >= 2); H.tf(r, ".mr19", b >= 2 ? "none" : "translateY(18px)");
      H.q(r, ".f19").forEach(g => { g.style.opacity = b >= 2 ? 1 : 0; g.style.transform = b >= 2 ? "none" : "translateY(14px)"; });
      H.show(r, ".st19", b >= 3); H.tf(r, ".st19", b >= 3 ? "scale(1)" : "scale(1.7)"); H.delay(r, ".st19", b >= 3 ? .5 : 0);
    }
  };

  /* ------------------------------------------------------------ s20 · inertia, and why the start matters */
  const F20 = [20, 44, 270, 280], ST20 = H.kmeans(D.pts, [[0.08, 0.9], [0.22, 0.95], [0.12, 0.72]]);
  const IN20 = ST20.map(s => s.lab ? H.inertia(D.pts, s) : null), MAX20 = Math.max(...IN20.filter(v => v !== null));
  const KM4 = [4669, 6098];
  SC.s20 = {
    copy: [
      { k: "What does a shorter line buy us?", m: "Tighter groups", s: "Smaller within-group spread = tighter fit", l: "Tighter groups" },
      { k: "What does a shorter line buy us?", m: "Count squared lengths", s: "Inertia = sum of squared distances to assigned centres", l: "Count squared lengths" },
      { k: "What does a shorter line buy us?", m: "Follow a round downhill", s: "A step can also leave inertia unchanged", l: "Follow a round downhill" },
      { k: "What does a shorter line buy us?", m: "Change the starting point", s: "A stable result can depend on its start", l: "Change the starting point" },
      { k: "What does a shorter line buy us?", m: "Keep the best run", s: "n_init = 10", l: "Keep the best run" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="${F20[0] - 8}" y="${F20[1] - 12}" width="${F20[2] + 16}" height="${F20[3] + 24}" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<g class="sp20">${D.pts.map(() => `<line stroke-width="1" stroke-opacity=".45"/>`).join("")}</g>
${H.dots(D.pts, F20[0], F20[1], F20[2], F20[3], "p20", 2.8)}
${[0, 1, 2].map(j => H.centre(j, "c20")).join("")}
<rect x="304" y="32" width="164" height="92" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(386, 54, "Map inertia", 12, MUTED, "middle", 700)}${t(386, 96, "–", 34, NAVY, "middle", 800, "in20")}${t(386, 116, "", 11, MUTED, "middle", 600, "rd20")}
<g class="a o0 hist20"><rect x="304" y="134" width="164" height="112" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(316, 152, "round by round", 11.5, MUTED, "start", 700)}
  ${ST20.slice(1).map((s, i) => `<rect class="hb20" data-i="${i + 1}" x="${316 + i * (140 / (ST20.length - 1))}" y="160" width="${Math.max(3, 140 / (ST20.length - 1) - 2).toFixed(1)}" height="76" fill="${NAVY}" style="transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform .5s"/>`).join("")}</g>
<g class="a o0 two20"><rect x="304" y="134" width="164" height="150" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>${t(386, 154, "real file · k = 4 · one start each", 10.5, MUTED, "middle", 700)}
  ${KM4.map((v, i) => `<rect class="tb20" x="${330 + i * 62}" y="${270 - v / 6098 * 92}" width="44" height="${(v / 6098 * 92).toFixed(0)}" fill="${i ? TERRA : GREEN}" style="transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform .9s ${i * .5}s"/>${t(352 + i * 62, 264 - v / 6098 * 92, fmt(v), 12.5, INK, "middle", 800)}${t(352 + i * 62, 281, i ? "worst start" : "best start", 10, MUTED, "middle", 700)}`).join("")}</g>
<g class="a o0 fix20" style="transform:translateY(12px)"><rect x="304" y="294" width="164" height="52" rx="10" fill="${INK}"/><text x="386" y="316" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="${GOLD}" font-weight="700">n_init=10</text>${t(386, 336, "10 starts · keep the tightest", 11, "#fff", "middle", 600)}</g>`,
    paint(r, i, spokes) {
      const s = ST20[i], pts = H.q(r, ".p20"), ln = H.q(r, ".sp20 line");
      H.placeCentres(r, ".c20", s.c, F20[0], F20[1], F20[2], F20[3]);
      pts.forEach((e, k) => { e.style.fill = s.lab ? CL[s.lab[k]] : ""; });
      ln.forEach((e, k) => { if (!s.lab || !spokes) { e.style.opacity = 0; return; } const [x, y] = H.px(D.pts[k], F20[0], F20[1], F20[2], F20[3]), [cx, cy] = H.px(s.c[s.lab[k]], F20[0], F20[1], F20[2], F20[3]);
        e.setAttribute("x1", x); e.setAttribute("y1", y); e.setAttribute("x2", cx); e.setAttribute("y2", cy); e.setAttribute("stroke", CL[s.lab[k]]); e.style.opacity = 1; });
      const el = r.querySelector(".in20"); if (IN20[i] !== null) H.count(el, IN20[i], 500, v => v.toFixed(1)); else { el._to = null; el._cur = MAX20; el.textContent = "–"; }
      r.querySelector(".rd20").textContent = i ? `Step ${i} / ${ST20.length - 1} · 2D map` : "";
      H.q(r, ".hb20").forEach(e => { const j = +e.dataset.i; e.style.transform = j <= i && IN20[j] ? `scaleY(${(IN20[j] / MAX20).toFixed(3)})` : "scaleY(0)"; });
    },
    render(r, b) {
      const alive = H.alive(r), last = ST20.length - 1; clearInterval(r._t20);
      H.show(r, ".hist20", b === 2); H.show(r, ".two20", b >= 3); H.q(r, ".tb20").forEach(e => { e.style.transform = b >= 3 ? "scaleY(1)" : "scaleY(0)"; });
      H.show(r, ".fix20", b >= 4); H.tf(r, ".fix20", b >= 4 ? "none" : "translateY(12px)");
      if (b === 2) { let i = 0; SC.s20.paint(r, 0, true); r._t20 = setInterval(() => { if (!alive()) { clearInterval(r._t20); return; } i++; SC.s20.paint(r, i, true); if (i >= last) clearInterval(r._t20); }, Math.min(500,4000/last)); }
      else SC.s20.paint(r, last, b >= 1);
    }
  };

  /* ------------------------------------------------------------ s21 · the elbow plot (real inertia) */
  const EL = X.inertia, EX = k => 70 + (k - 1) * 50, EY = v => 300 - v / 20000 * 240;
  const DROP = Math.round(100 * (1 - EL[1][1] / EL[0][1]));
  SC.s21 = {
    copy: [
      { k: "How much does one more centre buy?", m: "Follow the cost", s: "Inertia on 4,729 distinct complete episodes", l: "Follow the cost" },
      { k: "How much does one more centre buy?", m: "The steepest fall", s: "18,916 → 7,594", l: "The steepest fall" },
      { k: "How much does one more centre buy?", m: "Find the bend", s: "A bend marks diminishing returns", l: "Find the bend" },
      { k: "How much does one more centre buy?", m: "Use a second check", s: "The best attainable inertia cannot rise as k increases", l: "Use a second check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="452" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${[0, 5000, 10000, 15000, 20000].map(v => `<path d="M60 ${EY(v)} H440" stroke="#EEE8DC" stroke-width="1.5"/>${t(54, EY(v) + 4, fmt(v), 10.5, MUTED, "end", 600)}`).join("")}
<path d="M60 52 V300 H440" fill="none" stroke="${MUTED}" stroke-width="2"/>
${EL.map(([k]) => t(EX(k), 318, k, 12, INK, "middle", 700)).join("")}${t(250, 338, "number of groups, k", 12, MUTED, "middle", 700)}${t(28, 40, "inertia", 12, MUTED, "start", 700)}
<path class="dr l21a" pathLength="1" d="M${EX(1)} ${EY(EL[0][1])} L${EX(2)} ${EY(EL[1][1])}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round"/>
<path class="dr l21b" pathLength="1" d="M${EL.slice(1).map(([k, v]) => `${EX(k)} ${EY(v)}`).join(" L")}" fill="none" stroke="${NAVY}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
${EL.map(([k, v], i) => `<g class="a o0 d21 d21-${i}"><circle cx="${EX(k)}" cy="${EY(v)}" r="6" fill="#fff" stroke="${NAVY}" stroke-width="3"/>${t(EX(k) + (i === 0 ? 14 : i === 1 ? 4 : 0), EY(v) + (i === 1 ? 30 : -12), fmt(v), 11.5, INK, i === 0 ? "start" : "middle", 800)}</g>`).join("")}
<g class="a o0 dr21"><path d="M${EX(1) + 6} ${EY(EL[0][1]) + 6} V${EY(EL[1][1])}" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="5 4"/>${t(EX(1) + 14, (EY(EL[0][1]) + EY(EL[1][1])) / 2 + 10, `−${DROP}%`, 20, TERRA, "start", 800)}</g>
<g class="a o0 el21"><circle class="pulse2" cx="${EX(2)}" cy="${EY(EL[1][1])}" r="17" fill="none" stroke="${TERRA}" stroke-width="3.5"/>${t(EX(2) + 26, EY(EL[1][1]) - 16, "the elbow", 15, TERRA, "start", 800)}</g>
<g class="a o0 wn21" style="transform:translateY(12px)"><rect x="218" y="60" width="232" height="96" rx="12" fill="${INK}" fill-opacity=".94"/>${t(334, 84, "lowest inertia ≠ best k", 15, GOLD, "middle", 800)}
  ${["the bend in the elbow", "the silhouette", "the noise floor"].map((s, i) => `<circle cx="238" cy="${103 + i * 18}" r="6" fill="${GREEN}"/>${t(238, 107 + i * 18, "✓", 9, "#fff")}${t(252, 108 + i * 18, s, 12.5, "#fff", "start", 600)}`).join("")}</g>`,
    render(r, b) {
      H.q(r, ".d21").forEach((g, i) => { const on = i < 2 ? b >= 1 : b >= 2; g.style.opacity = on ? 1 : 0; g.style.transitionDelay = on ? (i < 2 ? i * .9 : .3 + (i - 2) * .25) + "s" : "0s"; });
      H.draw(r, ".l21a", b >= 1); H.draw(r, ".l21b", b >= 2);
      H.show(r, ".dr21", b === 1); H.delay(r, ".dr21", b === 1 ? 1.4 : 0);
      H.show(r, ".el21", b >= 2); H.delay(r, ".el21", b >= 2 ? 1.8 : 0);
      H.show(r, ".wn21", b >= 3); H.tf(r, ".wn21", b >= 3 ? "none" : "translateY(12px)");
    }
  };

  /* ------------------------------------------------------------ s22 · hierarchical clustering and DBSCAN */
  const DG = X.dendro, NL = DG.ids.length;
  const order = (() => { const kids = {}; DG.link.forEach(([a, b], i) => { kids[NL + i] = [a, b]; }); const walk = n => n < NL ? [n] : [...walk(kids[n][0]), ...walk(kids[n][1])]; return walk(NL + DG.link.length - 1); })();
  const DX0 = 34, DW = 200, DY0 = 250, DH = 150, HMAX = DG.link[DG.link.length - 1][2];
  const nodes = {}; order.forEach((leaf, i) => { nodes[leaf] = { x: DX0 + i * DW / (NL - 1), y: DY0 }; });
  const LINKS = DG.link.map(([a, b, h], i) => { const A = nodes[a], B = nodes[b], y = DY0 - h / HMAX * DH; nodes[NL + i] = { x: (A.x + B.x) / 2, y }; return { d: `M${A.x.toFixed(1)} ${A.y.toFixed(1)} V${y.toFixed(1)} H${B.x.toFixed(1)} V${B.y.toFixed(1)}`, h, i }; });
  const CUT = DY0 - 4.6 / HMAX * DH;
  const CROWD = (() => { const p = []; let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647; for (let i = 0; i < 46; i++) { const a = Math.PI * (0.05 + 0.9 * i / 45); p.push([356 + Math.cos(a) * 62 + (rnd() - .5) * 14, 190 - Math.sin(a) * 62 + (rnd() - .5) * 14, 0]); } for (let i = 0; i < 26; i++) p.push([356 + (rnd() - .5) * 46, 196 + (rnd() - .5) * 30, 1]); [[282, 96], [440, 240], [300, 246], [436, 92]].forEach(q => p.push([q[0], q[1], 2])); return p; })();
  SC.s22 = {
    copy: [
      { k: "Two ways to group visits without moving centres", m: "Change the question", s: "A hierarchy or a connected neighbourhood", l: "Change the question" },
      { k: "Two ways to group visits without moving centres", m: "Build a tree", s: "Each join becomes a branch", l: "Build a tree" },
      { k: "Two ways to group visits without moving centres", m: "Compare two fits", s: "Ward vs k-means at k = 2 · adjusted Rand index 0.973", l: "Compare two fits" },
      { k: "Two ways to group visits without moving centres", m: "Follow a crowd", s: "Density-based clustering can label visits as noise", l: "Follow a crowd" },
      { k: "Two ways to group visits without moving centres", m: "Change the reach", s: "Full file · minimum count 10 · ε = 0.60 or 0.70", l: "Change the reach" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="pn22a"><rect class="pr22" x="12" y="14" width="244" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(134, 38, "Hierarchical clustering", 14.5, NAVY, "middle", 800)}${t(134, 56, "10 real episodes", 11, MUTED, "middle", 600)}
  ${LINKS.map(l => `<path class="dr lk22" data-i="${l.i}" pathLength="1" d="${l.d}" fill="none" stroke="${MUTED}" stroke-width="2.5" stroke-linejoin="round"/>`).join("")}
  ${order.map((leaf, i) => `<circle class="lf22" data-g="${DG.grp[leaf]}" cx="${nodes[leaf].x.toFixed(1)}" cy="${DY0 + 9}" r="6.5" style="fill:${GREY};transition:fill .7s"/>`).join("")}
  <g class="a o0 cut22"><path d="M24 ${CUT} H246" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="7 5"/>${t(30, CUT - 7, "✂ cut here → 2 groups", 12, TERRA, "start", 800)}</g>
  <g class="a o0 ag22"><rect x="30" y="284" width="208" height="50" rx="10" fill="${GREEN}"/>${t(134, 305, `agrees with k-means: ${X.ward.ari.toFixed(2)}`, 14, "#fff", "middle", 800)}${t(134, 324, `whole file · groups of ${fmt(X.ward.sizes[0])} and ${fmt(X.ward.sizes[1])}`, 10.5, "#E7F3EA", "middle", 600)}</g></g>
<g class="a pn22b" style="opacity:.25"><rect class="pr22" x="266" y="14" width="202" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(367, 38, "DBSCAN", 14.5, NAVY, "middle", 800)}${t(367, 56, "illustration: density", 11, MUTED, "middle", 600)}
  ${CROWD.map((p, i) => `<circle class="cr22" data-g="${p[2]}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.6" style="fill:${GREY};transition:fill .6s ${(i * .012).toFixed(2)}s"/>`).join("")}
  <g class="a o0 nz22">${t(367, 268, "grey = noise (lonely points)", 12, MUTED, "middle", 700)}</g>
  <g class="a o0 ep22">${[["eps = 0.6", "11 groups", TERRA], ["eps = 0.7", "1 group", TERRA]].map(([a, v, c], i) => `<rect x="${278 + i * 92}" y="284" width="86" height="50" rx="10" fill="#fff" stroke="${c}" stroke-width="2.5"/>${t(321 + i * 92, 303, a, 11.5, MUTED, "middle", 700)}${t(321 + i * 92, 324, v, 15, c, "middle", 800)}`).join("")}</g></g>`,
    render(r, b) {
      H.q(r, ".lk22").forEach(e => { const i = +e.dataset.i, on = b >= 1; e.style.transitionDuration = ".7s"; e.style.transitionDelay = on && b === 1 ? (i * .75) + "s" : "0s"; e.style.strokeDashoffset = on ? 0 : 1; });
      H.show(r, ".cut22", b >= 2); H.q(r, ".lf22").forEach(e => { e.style.fill = b >= 2 ? CL[+e.dataset.g] : GREY; });
      H.show(r, ".ag22", b >= 2); H.delay(r, ".ag22", b >= 2 ? 1 : 0);
      r.querySelector(".pn22b").style.opacity = b >= 3 ? 1 : .25; r.querySelector(".pn22a").style.opacity = b >= 3 ? .45 : 1; r.querySelector(".pn22a").style.transition = "opacity .7s";
      H.q(r, ".cr22").forEach(e => { const g = +e.dataset.g; e.style.fill = b >= 3 ? [NAVY, GOLD, "#B9BEC8"][g] : GREY; });
      H.show(r, ".nz22", b >= 3); H.delay(r, ".nz22", b >= 3 ? 1.2 : 0);
      H.show(r, ".ep22", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s23 · the script, line by line */
  // X has the four complete operating columns. The imports supply NumPy and sklearn.
  const CODE = [
    [1, "Z = StandardScaler().fit_transform(X)", 1],
    [2, "rng = np.random.default_rng(42)", 2],
    [3, "U = np.column_stack([rng.permutation(col) for col in Z.T])", 2],
    [4, "for k in range(2, 7):", 3],
    [5, "    model = KMeans(n_clusters=k, n_init=10, random_state=42)", 3],
    [6, "    real = model.fit_predict(Z)", 3],
    [7, "    shuffled = model.fit_predict(U)", 3],
    [8, "    a = silhouette_score(Z, real)", 4],
    [9, "    b = silhouette_score(U, shuffled)", 4],
    [10, "    print(k, a, b, a - b)", 4]];
  const NOTE = ["", "the z-score", "the noise floor", "same clustering, twice", "measure both, print the gap"];
  SC.s23 = {
    copy: [
      { k: "Follow the two files through Python", m: "Find the comparison", s: "An excerpt of the workflow", l: "Find the comparison" },
      { k: "Follow the two files through Python", m: "Prepare the inputs", s: "Fit the scaler on operating variables", l: "Prepare the inputs" },
      { k: "Follow the two files through Python", m: "Make new partners", s: "Shuffle each column independently", l: "Make new partners" },
      { k: "Follow the two files through Python", m: "Repeat the fit", s: "k from 2 through 6", l: "Repeat the fit" },
      { k: "Follow the two files through Python", m: "Read the output", s: "Real silhouette − shuffled silhouette", l: "Read the output" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="10" y="10" width="460" height="226" rx="12" fill="#1E2430"/>
<circle cx="26" cy="24" r="4.5" fill="#E86A5A"/><circle cx="40" cy="24" r="4.5" fill="${GOLD}"/><circle cx="54" cy="24" r="4.5" fill="#6CCB92"/>${t(153, 28, "Python · operating inputs in X", 11.5, "#A9B2C0", "middle", 700)}
${CODE.map(([n, s, g], i) => `<g class="ln23" data-g="${g}"><rect class="lb23" x="14" y="${36 + i * 19.6}" width="452" height="18.6" rx="3" fill="transparent" style="transition:fill .5s"/>
  <text x="32" y="${49.5 + i * 19.6}" font-family="Consolas,monospace" font-size="10.5" fill="#6B7383" text-anchor="end">${n}</text>
  <text class="lt23" x="40" y="${49.5 + i * 19.6}" font-family="Consolas,monospace" font-size="10.6" fill="#E6EAF0" xml:space="preserve" style="transition:fill .5s,opacity .5s">${s.replace(/</g, "&lt;")}</text></g>`).join("")}
<g class="a o0 nt23"><rect x="300" y="14" width="164" height="20" rx="10" fill="${GOLD}"/>${t(382, 28, "", 11.5, INK, "middle", 800, "ntt23")}</g>
<rect x="10" y="244" width="460" height="106" rx="12" fill="#16261D"/>${t(22, 262, "Reference output", 11.5, "#A9B2C0", "start", 700)}
${C.gaps.map(([k, a, s, g], i) => `<text class="out23" x="22" y="${280 + i * 14.5}" font-family="Consolas,monospace" font-size="11.5" fill="#9EE6B8" xml:space="preserve" style="opacity:0;transition:opacity .4s">k=${k}  real ${a.toFixed(3)}   shuffled ${s.toFixed(3)}   gap +${g.toFixed(3)}</text>`).join("")}
<g class="a o0 cur23"><rect class="blink" x="22" y="270" width="8" height="13" fill="#9EE6B8"/></g>`,
    render(r, b) {
      H.q(r, ".ln23").forEach(g => { const on = +g.dataset.g === b; g.querySelector(".lb23").style.fill = on ? "rgba(232,176,75,.26)" : "transparent"; const tx = g.querySelector(".lt23"); tx.style.fill = on ? "#FFD88A" : "#E6EAF0"; tx.style.opacity = b === 0 || on ? 1 : .45; });
      H.show(r, ".nt23", b >= 1); r.querySelector(".ntt23").textContent = NOTE[b] || "";
      H.show(r, ".cur23", b < 4);
      H.q(r, ".out23").forEach((e, i) => { e.style.transitionDelay = b >= 4 ? (.6 + i * .5) + "s" : "0s"; e.style.opacity = b >= 4 ? 1 : 0; });
    }
  };

  /* ------------------------------------------------------------ s24 · skip the standardising line (activity) */
  const VN = ["staff ratio", "training h", "occupancy", "handoffs"];
  SC.s24 = {
    copy: [
      { k: "What changes if the scaling line is skipped?", m: "Compare two runs", s: "Left and right compare units on the same visits", l: "Compare two runs" },
      { k: "What changes if the scaling line is skipped?", m: "Change the number of groups", s: "Adjusted Rand agreement · 0.966 at k = 2, 0.732 at k = 4", l: "Change the number of groups" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
${[["With standardising ✓", GREEN, 14], ["Without ✗", TERRA, 244]].map(([h, c, x], v) => `<g class="col24" data-v="${v}"><rect x="${x}" y="12" width="222" height="250" rx="14" fill="#fff" stroke="${c}" stroke-width="2.5"/>${t(x + 111, 34, h, 14.5, c, "middle", 800)}
  ${t(x + 14, 56, "group sizes", 11.5, MUTED, "start", 700)}<g class="sz24"></g>
  ${t(x + 14, 152, "how far apart the centres are (in SDs)", 11, MUTED, "start", 700)}
  ${VN.map((n, i) => `${t(x + 86, 173 + i * 22, n, 12, INK, "end", 700)}<rect x="${x + 92}" y="${162 + i * 22}" width="100" height="14" rx="3" fill="#F1ECE2"/><rect class="sep24" data-i="${i}" x="${x + 92}" y="${162 + i * 22}" width="0" height="14" rx="3" fill="${c}" style="transition:width .8s"/>${t(x + 198, 174 + i * 22, "", 11.5, INK, "start", 800, "sv24")}`).join("")}</g>`).join("")}
<rect x="14" y="272" width="452" height="76" rx="14" fill="${INK}"/>
${t(30, 296, "Do the two versions give the same groups?", 12.5, "#E7DDCB", "start", 700)}
<rect x="30" y="308" width="300" height="20" rx="10" fill="#3A4252"/><rect class="ag24" x="30" y="308" width="0" height="20" rx="10" fill="${GOLD}" style="transition:width .9s"/>
${t(344, 324, "", 22, GOLD, "start", 800, "agv24")}${t(30, 342, "0 = chance expectation · 1 = same partition", 10.5, "#A9B2C0", "start", 600)}`,
    update(r, k) {
      [X["std" + k], X["raw" + k]].forEach((rows, v) => {
        const col = r.querySelectorAll(".col24")[v]; if (!col) return; const x = v ? 244 : 14, tot = rows.reduce((s, q) => s + q[4], 0), w = 194; let cx = x + 14;
        col.querySelector(".sz24").innerHTML = rows.map((q, i) => { const ww = q[4] / tot * w, s = `<rect x="${cx.toFixed(1)}" y="64" width="${(ww - 2).toFixed(1)}" height="34" rx="5" fill="${CL[i]}"/>${t(cx + ww / 2, 86, fmt(q[4]), k === 2 ? 14 : 11.5, "#fff", "middle", 800)}${t(cx + ww / 2, 114, "occ. " + q[2].toFixed(0) + "%", k === 2 ? 11.5 : 9.5, MUTED, "middle", 600)}${t(cx + ww / 2, 128, "staff " + q[0].toFixed(2), k === 2 ? 11.5 : 9.5, MUTED, "middle", 600)}`; cx += ww; return s; }).join("");
        const sep = X[(v ? "sep_raw" : "sep_std") + k];
        col.querySelectorAll(".sep24").forEach((e, i) => { e.setAttribute("width", (sep[i] / 2.6 * 100).toFixed(0)); }); col.querySelectorAll(".sv24").forEach((e, i) => { e.textContent = sep[i].toFixed(2); });
      });
      const a = X["ari" + k]; if (!r.querySelector(".ag24")) return; r.querySelector(".ag24").setAttribute("width", (300 * a).toFixed(0)); H.count(r.querySelector(".agv24"), a, 800, v => v.toFixed(2));
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s24.update(r, 2); } }
  };

  /* ------------------------------------------------------------ s25 · name the cluster yourself (activity) */
  const P3 = X.prof3, MEAN = X.mean, DEC = [2, 1, 1, 1], UNIT = ["", " h", " %", ""];
  SC.s25 = {
    copy: [
      { k: "Give three profiles defensible names", m: "Read across a profile", s: "Three distinct-complete-file centres", l: "Read across a profile" },
      { k: "Give three profiles defensible names", m: "Match and defend", s: "Support each name with a measurement", l: "Match and defend" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${P3.map((g, i) => { const x = 12 + i * 154; return `<g class="a o0 pc25" style="transform:translateY(16px);transition-delay:${i * .25}s"><rect class="pcr25" x="${x}" y="54" width="148" height="292" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <circle cx="${x + 26}" cy="80" r="15" fill="${CL[i]}"/>${t(x + 26, 86, "ABC"[i], 16, "#fff")}${t(x + 48, 78, "Profile " + "ABC"[i], 14, INK, "start", 800)}${t(x + 48, 94, fmt(g[4]) + " episodes", 11, MUTED, "start", 600)}
  ${["staff ratio", "training", "occupancy", "handoffs"].map((n, j) => { const up = g[j] > MEAN[j]; return `${t(x + 12, 128 + j * 50, n, 12, MUTED, "start", 700)}${t(x + 12, 150 + j * 50, g[j].toFixed(DEC[j]) + UNIT[j], 20, INK, "start", 800)}${t(x + 136, 149 + j * 50, up ? "▲" : "▼", 17, up ? TERRA : NAVY, "end", 800)}
    <rect x="${x + 12}" y="${157 + j * 50}" width="124" height="5" rx="2.5" fill="#F1ECE2"/><rect x="${x + 12}" y="${157 + j * 50}" width="${Math.min(124, g[j] / [2, 35, 100, 6][j] * 124).toFixed(0)}" height="5" rx="2.5" fill="${CL[i]}"/>`; }).join("")}
  <g class="nm25" style="opacity:0;transition:opacity .5s"><rect class="nmr25" x="${x + 8}" y="314" width="132" height="26" rx="13" fill="${GREEN}"/>${t(x + 74, 332, "", 12, "#fff", "middle", 800, "nmt25")}</g></g>`; }).join("")}
<rect x="12" y="12" width="456" height="34" rx="10" fill="${INK}"/>${t(240, 34, `file average: staff ${MEAN[0]} · training ${MEAN[1]} h · occupancy ${MEAN[2]} % · handoffs ${MEAN[3]}`, 11.5, "#fff", "middle", 600)}`,
    name(r, i, txt, ok) { const g = r.querySelectorAll(".pc25")[i]; if (!g) return; g.querySelector(".nmt25").textContent = txt; g.querySelector(".nmr25").setAttribute("fill", ok ? GREEN : TERRA); g.querySelector(".nm25").style.opacity = txt ? 1 : 0; g.querySelector(".pcr25").style.stroke = txt ? (ok ? GREEN : TERRA) : ""; },
    render(r, b) { H.q(r, ".pc25").forEach(g => { g.style.opacity = 1; g.style.transform = "none"; }); }
  };

  /* ------------------------------------------------------------ s26 · from clusters to segments (outside variables) */
  const SG = X.seg, M26 = [["satisfaction", "sat", 100, "", GREEN], ["complaints", "compl", 40, "%", TERRA], ["readmissions", "readmit", 40, "%", TERRA]];
  const TESTS = [["Big enough", `${fmt(SG.stretched.n)} and ${fmt(SG.resourced.n)} episodes`], ["Stable", "Repeat fits on half-samples"], ["Recognisable", "Would staff recognise them?"], ["Actionable", "Would care planning change?"]];
  SC.s26 = {
    copy: [
      { k: "Does a profile matter outside the input table?", m: "Open the outcome columns", s: "Outcomes were kept outside the operating fit", l: "Open the outcome columns" },
      { k: "Does a profile matter outside the input table?", m: "Compare satisfaction", s: "Satisfaction · 59.8 vs 84.2", l: "Compare satisfaction" },
      { k: "Does a profile matter outside the input table?", m: "Compare recorded events", s: "Complaints · 28.5% vs 3.4%", l: "Compare recorded events" },
      { k: "Does a profile matter outside the input table?", m: "Set the limit", s: "Recorded differences are associations", l: "Set the limit" },
      { k: "Does a profile matter outside the input table?", m: "Decide whether to act", s: "Size · stability · recognition · action", l: "Decide whether to act" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="226" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(160, 36, "Stretched wards", 14, TERRA, "middle", 800)}${t(360, 36, "Well-resourced wards", 14, GREEN, "middle", 800)}
${t(160, 52, fmt(SG.stretched.n) + " episodes", 11, MUTED, "middle", 600)}${t(360, 52, fmt(SG.resourced.n) + " episodes", 11, MUTED, "middle", 600)}
${M26.map(([n, key, mx, u], i) => { const y = 72 + i * 54; return `<g class="a o0 m26 m26-${i}">${t(240, y + 8, n, 12, MUTED, "middle", 800)}
  ${["stretched", "resourced"].map((sgn, j) => { const v = SG[sgn][key], w = v / mx * 150, c = i === 0 ? (j ? GREEN : TERRA) : (j ? NAVY : TERRA), x = j ? 264 : 216 - w;
    return `<rect class="b26" x="${x.toFixed(0)}" y="${y + 14}" width="${w.toFixed(0)}" height="24" rx="5" fill="${c}" style="transform-box:fill-box;transform-origin:${j ? "left" : "right"};transform:scaleX(0);transition:transform 1s ${j * .35}s"/>${t(j ? 270 + w : 210 - w, y + 32, v + u, 15, INK, j ? "start" : "end", 800)}`; }).join("")}</g>`; }).join("")}
<path d="M240 87 V116 M240 141 V170 M240 195 V230" stroke="${EDGE}" stroke-width="2"/>
<g class="a o0 warn26"><g transform="translate(0 133)"><rect x="118" y="130" width="244" height="40" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(240, 157, "Observed association", 16, TERRA, "middle", 800)}</g></g>
${TESTS.map(([h, s], i) => { const x = 12 + (i % 2) * 232, y = 248 + Math.floor(i / 2) * 52; return `<g class="a o0 t26" style="transform:translateY(12px);transition-delay:${i * .35}s"><rect x="${x}" y="${y}" width="224" height="46" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2"/><circle cx="${x + 24}" cy="${y + 23}" r="12" fill="${GREEN}"/>${t(x + 24, y + 28, "?", 14, "#fff")}${t(x + 44, y + 20, h, 14, INK, "start", 800)}${t(x + 44, y + 37, s, 11, MUTED, "start", 600)}</g>`; }).join("")}`,
    render(r, b) {
      H.q(r, ".m26").forEach((g, i) => { const on = i === 0 ? b >= 1 : b >= 2; g.style.opacity = on ? 1 : 0; g.style.transitionDelay = on && i === 2 ? "1.6s" : "0s"; g.querySelectorAll(".b26").forEach(e => { e.style.transform = on ? "scaleX(1)" : "scaleX(0)"; e.style.transitionDelay = on && i === 2 ? "1.8s" : ""; }); });
      H.show(r, ".warn26", b === 3); H.delay(r, ".warn26", b === 3 ? 1.6 : 0);
      H.q(r, ".t26").forEach(g => { g.style.opacity = b >= 4 ? 1 : 0; g.style.transform = b >= 4 ? "none" : "translateY(12px)"; });
    }
  };
})();
