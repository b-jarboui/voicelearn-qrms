/* Week 12 · Chapter 1 animated scenes, part A (s01–s09).
   Each scene: SC[id] = { svg, copy[beat], render(root, beat) } on a 480 x 360 stage.
   render() sets the full state for a beat (so jumping between beats works); CSS transitions do the motion,
   SMIL / CSS keyframes keep the world alive between beats. Data: window.W12DATA (real Al Waha episodes). */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const D = window.W12DATA;
  const NAVY = "#1F4E79", TERRA = "#C0502A", GREEN = "#2E7D4F", GOLD = "#E8B04B", INK = "#1A1F2B", SKY = "#DCE7F2", MUTED = "#5A6373", GREY = "#9AA3B2";
  const CL = [NAVY, TERRA, GREEN, GOLD, "#7B5EA7", "#2A9D8F"];

  const H = window.SCH = {
    q: (r, s) => Array.from(r.querySelectorAll(s)),
    set(r, s, p, v) { H.q(r, s).forEach(e => { e.style[p] = v; }); },
    show(r, s, on) { H.q(r, s).forEach(e => { e.style.opacity = on ? "1" : "0"; }); },
    tf(r, s, v) { H.q(r, s).forEach(e => { e.style.transform = v; }); },
    draw(r, s, on) { H.q(r, s).forEach(e => { e.style.strokeDashoffset = on ? "0" : "1"; }); },
    cls(r, s, c, on) { H.q(r, s).forEach(e => e.classList.toggle(c, !!on)); },
    delay(r, s, sec) { H.q(r, s).forEach(e => { e.style.transitionDelay = sec + "s"; }); },
    cam(r, cx, cy, s) { H.set(r, ".cam", "transform", `translate(${-s * (cx - 240)}px,${-s * (cy - 180)}px) scale(${s})`); },
    count(el, to, ms, fmt) {
      if (!el || el._to === to) return;
      fmt = fmt || (v => Math.round(v).toLocaleString("en-US"));
      const from = el._cur || 0, t0 = performance.now(); el._to = to; cancelAnimationFrame(el._raf);
      const f = now => { const p = Math.min(1, (now - t0) / (ms || 1000)), e = 1 - Math.pow(1 - p, 3), v = from + (to - from) * e;
        el._cur = v; el.textContent = fmt(v); if (p < 1) el._raf = requestAnimationFrame(f); };
      el._raf = requestAnimationFrame(f);
    },
    t: (x, y, s, size, fill, anchor, weight, cls) =>
      `<text${cls ? ` class="${cls}"` : ""} x="${x}" y="${y}" font-size="${size || 16}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="${weight || 700}">${s}</text>`,
    person: (x, y, c, s, cls) =>
      `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><circle class="hd" cx="0" cy="-31" r="8.5" fill="${c}"/><path class="bd" d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${c}"/></g></g>`,
    // scatter: points p in [0,1]^2 drawn inside box (x0,y0,w,h)
    px: (p, x0, y0, w, h) => [x0 + p[0] * w, y0 + (1 - p[1]) * h],
    dots(pts, x0, y0, w, h, cls, rad) {
      return pts.map((p, i) => { const [x, y] = H.px(p, x0, y0, w, h); return `<circle class="pt ${cls || ""}" data-i="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad || 3}"/>`; }).join("");
    },
    colour(r, sel, lab) { H.q(r, sel).forEach((e, i) => { e.style.fill = lab ? CL[lab[i]] : ""; }); },
    // k-means on 2-D points: the list of states, alternating "assign" and "move"
    kmeans(P, init) {
      let c = init.map(x => x.slice()), lab = null; const st = [{ c: c.map(x => x.slice()), lab: null, kind: "start" }];
      for (let it = 0; it < 40; it++) {
        const nl = P.map(p => { let b = 0, bd = 1e9; c.forEach((q, j) => { const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; if (d < bd) { bd = d; b = j; } }); return b; });
        const changed = !lab || nl.some((v, i) => v !== lab[i]); lab = nl;
        st.push({ c: c.map(x => x.slice()), lab, kind: "assign" });
        const nc = c.map((q, j) => { const m = P.filter((_, i) => lab[i] === j); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : q; });
        const moved = nc.some((q, j) => Math.hypot(q[0] - c[j][0], q[1] - c[j][1]) > 1e-6); c = nc;
        if (!changed && !moved) break;
        st.push({ c: c.map(x => x.slice()), lab, kind: "move" });
      }
      return st;
    },
    inertia(P, st) { return P.reduce((s, p, i) => { const q = st.c[st.lab[i]]; return s + (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; }, 0); },
    centre: (j, cls) => `<g class="ctr ${cls || ""}" data-j="${j}"><g class="ci"><circle r="10" fill="#fff" stroke="${CL[j]}" stroke-width="3.5"/><path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="${CL[j]}" stroke-width="3.5" stroke-linecap="round"/></g></g>`,
    placeCentres(r, sel, cs, x0, y0, w, h) { H.q(r, sel).forEach((g, j) => { const q = cs[j]; if (!q) return; const [x, y] = H.px(q, x0, y0, w, h); g.style.transform = `translate(${x}px,${y}px)`; }); },
    alive: r => { const s = r.querySelector("svg"); return () => s && s.isConnected; },
    C: { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, CL }
  };
  const { t, person } = H;

  /* a little ward building used in several scenes */
  const ward = (x, y, s, label) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="40" width="150" height="110" fill="#fff"/>
    <path class="dr" pathLength="1" d="M0 150 V40 H150 V150" fill="none" stroke="${NAVY}" stroke-width="5"/>
    <path class="dr" pathLength="1" d="M-12 46 L75 0 L162 46" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <g><rect x="61" y="12" width="28" height="28" rx="5" fill="${TERRA}"/><rect x="71" y="16" width="8" height="20" fill="#fff"/><rect x="65" y="22" width="20" height="8" fill="#fff"/></g>
    <rect x="16" y="50" width="118" height="20" rx="4" fill="${NAVY}"/>${t(75, 65, label || "AL WAHA HOSPITAL", 11.5, "#fff")}
    ${[0, 1, 2].map(i => `<rect x="${16 + i * 44}" y="80" width="30" height="24" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="2.5"/>`).join("")}
    <rect x="58" y="110" width="34" height="40" fill="${NAVY}"/></g>`;

  /* ------------------------------------------------------------ s01 · title: unlabelled episodes pour out */
  const P01 = D.pts.filter((_, i) => i % 2 === 0);
  const L01 = D.lab2.filter((_, i) => i % 2 === 0);
  SC.s01 = {
    copy: [
      { k: "Week 12 · Chapter 1", m: "Finding groups in the data that nobody has labelled.", s: "Clustering and segmentation analysis.", l: "4,740 episodes, no labels" },
      { k: "The harder half", m: "Then proving that those groups are real.", s: "Anyone can find groups. Few people check them.", l: "Real, or invented?" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<g class="cam">
  <circle class="a o0 sun" cx="440" cy="40" r="22" fill="${GOLD}"/>
  <rect y="300" width="480" height="60" fill="#E7DDCB"/><path d="M0 300 H480" stroke="#CDBFA6" stroke-width="3"/>
  <g class="a o0 bld">${ward(24, 150, 1, "AL WAHA HOSPITAL")}</g>
  <rect x="214" y="96" width="250" height="196" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  ${t(339, 118, "4,740 episodes · no labels", 13, MUTED, "middle", 600)}
  <g class="fall">${P01.map((p, i) => { const [x, y] = H.px(p, 232, 130, 214, 150); return `<circle class="pt a o0 f1" data-i="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" style="transform:translate(${(100 - x).toFixed(0)}px,${(262 - y).toFixed(0)}px)"/>`; }).join("")}</g>
  <ellipse class="dr e1" pathLength="1" cx="0" cy="0" rx="1" ry="1" fill="none" stroke="${NAVY}" stroke-width="2.5" stroke-dasharray="1"/>
  <g class="a o0 qm">${[[262, 90], [330, 80], [400, 92]].map(([x, y], i) => `<g class="bob" style="animation-delay:${i * .4}s"><circle cx="${x}" cy="${y}" r="13" fill="${TERRA}"/>${t(x, y + 6, "?", 17, "#fff", "middle", 800)}</g>`).join("")}</g>
  <g class="a o0 mag"><g><animateMotion dur="7s" repeatCount="indefinite" path="M250 230 C 300 140, 420 140, 420 220 S 300 290, 250 230 Z"/>
    <circle r="24" fill="${SKY}" fill-opacity=".35" stroke="${INK}" stroke-width="5"/><path d="M17 17 L34 34" stroke="${INK}" stroke-width="8" stroke-linecap="round"/></g></g>
  <g class="a o0 tag" style="transform:scale(1.8)"><g transform="rotate(-6 339 322)"><rect x="244" y="304" width="190" height="34" rx="7" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(339, 327, "REAL, OR INVENTED?", 16, TERRA, "middle", 800)}</g></g>
</g>`,
    render(r, b) {
      H.draw(r, ".bld .dr", true); H.show(r, ".sun", true); H.show(r, ".bld", true);
      H.q(r, ".f1").forEach((e, i) => { e.style.transitionDelay = (.5 + i * .012) + "s"; e.style.opacity = "1"; e.style.transform = "none"; });
      H.show(r, ".qm", b === 0); H.delay(r, ".qm", b === 0 ? 2.2 : 0);
      H.q(r, ".f1").forEach((e, i) => { e.style.fill = b >= 1 ? CL[L01[i]] : ""; });
      H.show(r, ".mag", b >= 1); H.delay(r, ".mag", b >= 1 ? .6 : 0);
      H.show(r, ".tag", b >= 1); H.delay(r, ".tag", b >= 1 ? 1.6 : 0); H.tf(r, ".tag", b >= 1 ? "scale(1)" : "scale(1.8)");
      H.cam(r, b >= 1 ? 300 : 240, b >= 1 ? 200 : 180, b >= 1 ? 1.12 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · the answer key disappears */
  const ROWS = [["AW103952", "1.00", "7.7", "83.6", "5", "67.8", 1], ["AW100447", "1.72", "17.1", "65.1", "2", "93.0", 1], ["AW101099", "1.43", "19.3", "67.2", "3", "71.7", 0], ["AW104431", "1.93", "32.0", "87.9", "2", "87.2", 1], ["AW102630", "0.71", "3.5", "91.0", "5", "53.5", 1]];
  const CX = [70, 150, 212, 278, 340, 410];
  SC.s02 = {
    copy: [
      { k: "Weeks 9 to 11", m: "Every dataset came with an answer key: the outcome.", s: "Satisfaction, or whether the patient complained.", l: "The outcome column" },
      { k: "Weeks 9 to 11", m: "So we could always check our work.", s: "Prediction against the real answer; count the errors.", l: "Check against the answer" },
      { k: "Week 12", m: "This week, the answer key is gone.", s: "No outcome. Nothing says whether we are right.", l: "No outcome column" },
      { k: "Unsupervised learning", m: "No answer key changes how the method must be judged.", s: "That is the whole lesson of this week.", l: "Unsupervised learning" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="22" y="44" width="436" height="214" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
${["episode", "staff ratio", "training h", "occupancy %", "handoffs"].map((h, i) => t(CX[i], 70, h, 12.5, MUTED, "middle", 700)).join("")}
<path d="M34 80 H446" stroke="#CDBFA6" stroke-width="2"/>
${ROWS.map((row, j) => row.slice(0, 5).map((v, i) => t(CX[i], 108 + j * 32, v, 14, INK, "middle", i ? 400 : 600)).join("")).join("")}
<g class="a key">
  <rect x="372" y="52" width="76" height="200" rx="8" fill="${TERRA}" fill-opacity=".14" stroke="${TERRA}" stroke-width="2.5"/>
  ${t(410, 70, "satisfaction", 12.5, TERRA, "middle", 800)}
  ${ROWS.map((row, j) => t(410, 108 + j * 32, row[5], 15, TERRA, "middle", 800)).join("")}
  <g class="a o0 ticks">${ROWS.map((row, j) => `<circle cx="452" cy="${103 + j * 32}" r="9" fill="${row[6] ? GREEN : TERRA}"/>` + t(452, 108 + j * 32, row[6] ? "✓" : "✗", 12, "#fff", "middle", 800)).join("")}</g>
</g>
<g class="a o0 err">${t(120, 290, "prediction checked against the answer:", 14, MUTED, "start", 400)}${t(120, 312, "4 right · 1 error", 19, GREEN, "start", 800)}</g>
<g class="a o0 gone">${ROWS.map((_, j) => `<g class="bob" style="animation-delay:${j * .25}s"><circle cx="410" cy="${103 + j * 32}" r="11" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="4 3"/>${t(410, 109 + j * 32, "?", 15, MUTED, "middle", 800)}</g>`).join("")}</g>
<g class="a o0 nok">${t(240, 296, "no outcome · no score · no leaderboard", 17, NAVY, "middle", 800)}</g>
<g class="a o0 stamp" style="transform:scale(1.9)"><g transform="rotate(-7 240 196)"><rect x="96" y="172" width="288" height="48" rx="8" fill="#fff" fill-opacity=".9" stroke="${TERRA}" stroke-width="4"/>${t(240, 204, "UNSUPERVISED LEARNING", 21, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.show(r, ".ticks", b === 1); H.show(r, ".err", b === 1);
      H.tf(r, ".key", b >= 2 ? "translate(120px,-300px) rotate(28deg)" : "none"); H.show(r, ".key", b < 2);
      H.show(r, ".gone", b >= 2); H.delay(r, ".gone", b >= 2 ? .7 : 0);
      H.show(r, ".nok", b >= 2); H.delay(r, ".nok", b >= 2 ? 1.2 : 0);
      H.show(r, ".stamp", b >= 3); H.tf(r, ".stamp", b >= 3 ? "scale(1)" : "scale(1.9)"); H.delay(r, ".stamp", b >= 3 ? .8 : 0);
    }
  };

  /* ------------------------------------------------------------ s03 · which picture has real groups? (choice) */
  const PA = [24, 86, 206, 196], PB = [250, 86, 206, 196];   // x, y, w, h
  SC.s03 = {
    copy: [
      { k: "Your turn", m: "Two clouds of hospital episodes, each squeezed onto a flat map.", s: "Each dot is one episode.", l: "Two pictures" },
      { k: "Your turn", m: "One of them has real groups in it. Which one?", s: "Choose picture A or picture B under the stage.", l: "Choose A or B" },
      { k: "Watch", m: "We ask the computer for four groups in each picture.", s: "k-means, k = 4, on both.", l: "k = 4 on both pictures" },
      { k: "The trap", m: "Four tidy groups in both. But picture A is pure noise.", s: "We shuffled it: it has no structure at all.", l: "A = shuffled noise" },
      { k: "Remember", m: "Clustering always returns clusters, even from noise.", s: "Finding clusters is not evidence that clusters exist.", l: "Clusters ≠ evidence" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
${[["A", PA], ["B", PB]].map(([n, p]) => `<rect class="frame fr${n}" x="${p[0] - 8}" y="${p[1] - 12}" width="${p[2] + 16}" height="${p[3] + 24}" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<g class="a o0 lbl lbl${n}"><circle cx="${p[0] + p[2] / 2}" cy="${p[1] - 34}" r="17" fill="${NAVY}"/>${t(p[0] + p[2] / 2, p[1] - 27, n, 19, "#fff", "middle", 800)}</g>`).join("")}
<g class="ptsA">${H.dots(D.shuf, PA[0], PA[1], PA[2], PA[3], "a o0 pa", 2.6)}</g>
<g class="ptsB">${H.dots(D.pts, PB[0], PB[1], PB[2], PB[3], "a o0 pb", 2.6)}</g>
<g class="a o0 gearA spin" style="transform-origin:${PA[0] + PA[2] / 2}px 200px"></g>
<g class="a o0 stA" style="transform:scale(1.8)"><g transform="rotate(-8 127 318)"><rect x="40" y="300" width="174" height="34" rx="7" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(127, 323, "SHUFFLED · NOISE", 16, TERRA, "middle", 800)}</g></g>
<g class="a o0 stB" style="transform:scale(1.8)"><g transform="rotate(5 353 318)"><rect x="276" y="300" width="154" height="34" rx="7" fill="#fff" stroke="${GREEN}" stroke-width="3.5"/>${t(353, 323, "REAL EPISODES", 16, GREEN, "middle", 800)}</g></g>
<g class="a o0 k4">${t(240, 30, "k-means · k = 4", 16, NAVY, "middle", 800)}</g>
<g class="a o0 ban"><rect x="70" y="150" width="340" height="62" rx="12" fill="${INK}" fill-opacity=".9"/>${t(240, 178, "Clusters found ≠ clusters exist", 20, "#fff", "middle", 800)}${t(240, 200, "a method always returns what you ask for", 13.5, "#E7DDCB", "middle", 400)}</g>`,
    choose(r, p) { H.q(r, ".frame").forEach(f => { f.style.stroke = ""; f.style.strokeWidth = ""; }); const f = r.querySelector(".fr" + p.toUpperCase()); if (f) { f.style.stroke = NAVY; f.style.strokeWidth = "4"; } },
    render(r, b) {
      H.q(r, ".pa,.pb").forEach((e, i) => { e.style.transitionDelay = (i % 240) * .004 + "s"; e.style.opacity = "1"; });
      H.show(r, ".lbl", b >= 1); H.cls(r, ".lbl", "pulse2", b === 1);
      H.show(r, ".k4", b >= 2);
      H.q(r, ".pa").forEach((e, i) => { e.style.fill = b >= 2 ? CL[D.shufLab4[i]] : ""; e.style.transitionDelay = b >= 2 ? (.3 + (i % 40) * .01) + "s" : "0s"; });
      H.q(r, ".pb").forEach((e, i) => { e.style.fill = b >= 2 ? CL[D.lab4[i]] : ""; e.style.transitionDelay = b >= 2 ? (.3 + (i % 40) * .01) + "s" : "0s"; });
      ["A", "B"].forEach(n => { H.show(r, ".st" + n, b >= 3); H.tf(r, ".st" + n, b >= 3 ? "scale(1)" : "scale(1.8)"); });
      H.delay(r, ".stA", b >= 3 ? .4 : 0); H.delay(r, ".stB", b >= 3 ? 1.6 : 0);
      H.show(r, ".ban", b >= 4); H.delay(r, ".ban", b >= 4 ? .5 : 0);
    }
  };

  /* ------------------------------------------------------------ s04 · the k-means algorithm, animated on real points */
  const F4 = [22, 46, 300, 278];
  const ST4 = H.kmeans(D.pts, [[0.08, 0.9], [0.22, 0.95], [0.12, 0.72]]);
  const STEPS = ["Choose k, drop centres", "Assign to nearest", "Move to the middle", "Repeat until still"];
  SC.s04 = {
    copy: [
      { k: "k-means", m: "The whole algorithm, in four moves.", s: "240 real episodes on a flat map.", l: "240 episodes" },
      { k: "Move 1", m: "Choose k. Drop k centres at random.", s: "Here k = 3.", l: "k = 3 centres dropped" },
      { k: "Move 2", m: "Give every episode to its nearest centre.", s: "Each episode takes the colour of its centre.", l: "Assign to the nearest centre" },
      { k: "Move 3", m: "Move each centre to the middle of its episodes.", s: "The centre is the average of its members.", l: "Centres move to the middle" },
      { k: "Move 4", m: "Repeat until nothing changes.", s: "That is the whole algorithm.", l: "Repeat…" },
      { k: "The key word", m: "Everything rests on the word nearest.", s: "Nearest depends on how we measure distance, and on the units.", l: "Nearest = distance" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="${F4[0] - 10}" y="${F4[1] - 12}" width="${F4[2] + 20}" height="${F4[3] + 24}" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<g class="spokes"></g>
${H.dots(D.pts, F4[0], F4[1], F4[2], F4[3], "a o0 p4", 3)}
<g class="trails"></g>
${[0, 1, 2].map(j => H.centre(j, "a o0 c4")).join("")}
${STEPS.map((s, i) => `<g class="step st${i}"><rect x="340" y="${52 + i * 64}" width="130" height="52" rx="10" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  <circle cx="360" cy="${78 + i * 64}" r="12" fill="${MUTED}"/>${t(360, 83 + i * 64, i + 1, 13, "#fff")}
  <foreignObject x="376" y="${56 + i * 64}" width="92" height="46"><div xmlns="http://www.w3.org/1999/xhtml" style="font:700 12.5px Calibri,Segoe UI,sans-serif;color:${INK};line-height:1.15;height:46px;display:flex;align-items:center">${s}</div></foreignObject></g>`).join("")}
<g class="a o0 rnd">${t(172, 22, "", 15, NAVY, "middle", 800, "rndt")}</g>
<g class="a o0 near"><rect x="96" y="134" width="156" height="78" rx="12" fill="${INK}" fill-opacity=".9"/>${t(174, 164, "NEAREST?", 22, GOLD, "middle", 800)}${t(174, 190, "in % · hours · ratios?", 14, "#fff", "middle", 400)}</g>`,
    render(r, b) {
      const alive = H.alive(r); clearInterval(r._t4);
      H.q(r, ".p4").forEach((e, i) => { e.style.transitionDelay = (i * .004) + "s"; e.style.opacity = "1"; });
      const hl = b >= 4 ? 3 : b >= 3 ? 2 : b >= 2 ? 1 : b >= 1 ? 0 : -1;
      H.q(r, ".step").forEach((g, i) => { g.querySelector("rect").style.fill = i === hl ? NAVY : "#fff"; g.querySelector("circle").style.fill = i === hl ? GOLD : MUTED; g.querySelector("div").style.color = i === hl ? "#fff" : INK; });
      const sp = r.querySelector(".spokes"), tr = r.querySelector(".trails"); sp.innerHTML = ""; tr.innerHTML = "";
      const show = (k) => {
        const s = ST4[Math.min(k, ST4.length - 1)];
        H.colour(r, ".p4", s.lab); H.placeCentres(r, ".c4", s.c, F4[0], F4[1], F4[2], F4[3]);
        const n = Math.ceil(Math.min(k, ST4.length - 1) / 2);
        r.querySelector(".rndt").textContent = k >= ST4.length - 1 ? `round ${n}: nothing moves ✓` : `round ${Math.max(1, n)}`;
      };
      H.show(r, ".c4", b >= 1); H.show(r, ".rnd", b >= 2 && b <= 4);
      if (b === 0) { H.colour(r, ".p4", null); H.placeCentres(r, ".c4", ST4[0].c, F4[0], F4[1], F4[2], F4[3]); }
      if (b === 1) { H.colour(r, ".p4", null); H.placeCentres(r, ".c4", ST4[0].c, F4[0], F4[1], F4[2], F4[3]); }
      if (b === 2) {
        show(1);
        const i0 = 150, p = H.px(D.pts[i0], F4[0], F4[1], F4[2], F4[3]); const cs = ST4[1].c; const near = ST4[1].lab[i0];
        sp.innerHTML = cs.map((q, j) => { const [x, y] = H.px(q, F4[0], F4[1], F4[2], F4[3]); return `<line class="dr" pathLength="1" x1="${p[0]}" y1="${p[1]}" x2="${x}" y2="${y}" stroke="${j === near ? CL[j] : GREY}" stroke-width="${j === near ? 3 : 1.6}" stroke-dasharray="${j === near ? "1" : "1"}" style="transition-delay:${.6 + j * .3}s"/>`; }).join("") +
          `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="none" stroke="${INK}" stroke-width="2.5" class="pulse2"/>`;
        requestAnimationFrame(() => requestAnimationFrame(() => H.draw(r, ".spokes .dr", true)));
      }
      if (b === 3) {
        show(2);
        tr.innerHTML = ST4[1].c.map((q, j) => { const a = H.px(q, F4[0], F4[1], F4[2], F4[3]), z = H.px(ST4[2].c[j], F4[0], F4[1], F4[2], F4[3]); return `<line x1="${a[0]}" y1="${a[1]}" x2="${z[0]}" y2="${z[1]}" stroke="${CL[j]}" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/><circle cx="${a[0]}" cy="${a[1]}" r="4" fill="none" stroke="${CL[j]}" stroke-width="2"/>`; }).join("");
      }
      if (b === 4) {
        let k = 2; show(k);
        r._t4 = setInterval(() => { if (!alive()) { clearInterval(r._t4); return; } k++; if (k > ST4.length - 1) { clearInterval(r._t4); return; } show(k); }, 900);
      }
      if (b >= 5) show(ST4.length - 1);
      H.show(r, ".near", b >= 5); H.delay(r, ".near", b >= 5 ? .4 : 0);
    }
  };

  /* ------------------------------------------------------------ s05 · playground: run k-means yourself */
  const F5 = [26, 26, 428, 300];
  SC.s05 = {
    copy: [
      { k: "Your turn", m: "Run k-means yourself on 240 real episodes.", s: "Use the buttons under the stage.", l: "Your k-means" },
      { k: "Your turn", m: "Choose k, then Assign and Move, one step at a time.", s: "Stop when the centres stop moving.", l: "Assign, Move, repeat" },
      { k: "Your turn", m: "Try a new random start. Do you get the same groups?", s: "Compare the total spread after each run.", l: "Try another start" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="${F5[0] - 12}" y="${F5[1] - 12}" width="${F5[2] + 24}" height="${F5[3] + 24}" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<g class="lines5"></g>
${H.dots(D.pts, F5[0], F5[1], F5[2], F5[3], "a o0 p5", 3.6)}
${[0, 1, 2, 3, 4, 5].map(j => H.centre(j, "a o0 c5")).join("")}
<g class="a o0 done5"><rect x="150" y="296" width="180" height="30" rx="15" fill="${GREEN}"/>${t(240, 316, "Stable: nothing moves ✓", 15, "#fff")}</g>`,
    // state machine used by the panel under the stage
    reset(r, k, random) {
      const P = D.pts, ids = []; let seed = random ? Math.floor(Math.random() * 1e6) : 11;
      const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      while (ids.length < k) { const i = Math.floor(rnd() * P.length); if (!ids.includes(i)) ids.push(i); }
      r._k5 = { k, c: ids.map(i => P[i].slice()), lab: null, phase: "assign", stable: false, rounds: 0 };
      this.paint(r);
    },
    step(r) {
      const s = r._k5; if (!s || s.stable) return s; const P = D.pts;
      if (s.phase === "assign") {
        const nl = P.map(p => { let b = 0, bd = 1e9; s.c.forEach((q, j) => { const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2; if (d < bd) { bd = d; b = j; } }); return b; });
        const changed = !s.lab || nl.some((v, i) => v !== s.lab[i]); s.lab = nl; s.phase = "move"; s.rounds++;
        if (!changed) s.stable = true;
      } else {
        s.prev = s.c.map(x => x.slice());
        s.c = s.c.map((q, j) => { const m = P.filter((_, i) => s.lab[i] === j); return m.length ? [m.reduce((a, p) => a + p[0], 0) / m.length, m.reduce((a, p) => a + p[1], 0) / m.length] : q; });
        s.phase = "assign";
      }
      this.paint(r); return s;
    },
    paint(r) {
      const s = r._k5; if (!s) return;
      H.q(r, ".c5").forEach((g, j) => { g.style.opacity = j < s.k ? "1" : "0"; });
      H.placeCentres(r, ".c5", s.c, F5[0], F5[1], F5[2], F5[3]);
      H.colour(r, ".p5", s.lab);
      const ln = r.querySelector(".lines5");
      ln.innerHTML = s.lab ? D.pts.map((p, i) => { const a = H.px(p, F5[0], F5[1], F5[2], F5[3]), z = H.px(s.c[s.lab[i]], F5[0], F5[1], F5[2], F5[3]); return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${z[0].toFixed(1)}" y2="${z[1].toFixed(1)}" stroke="${CL[s.lab[i]]}" stroke-opacity=".16" stroke-width="1"/>`; }).join("") : "";
      H.show(r, ".done5", s.stable);
    },
    spread(r) { const s = r._k5; return s && s.lab ? H.inertia(D.pts, s) : null; },
    render(r, b) {
      H.q(r, ".p5").forEach((e, i) => { e.style.transitionDelay = (i * .003) + "s"; e.style.opacity = "1"; });
      const sv = r.querySelector("svg"); if (!sv._init) { sv._init = 1; this.reset(r, 3, false); }
    }
  };

  /* ------------------------------------------------------------ s06 · distance by hand: one variable swallows the other */
  const AX = 54, AY = 196, U = 6;          // 6 px per unit, same scale on both axes
  SC.s06 = {
    copy: [
      { k: "Worked by hand", m: "How far apart are episode A and episode B?", s: "A: occupancy 60%, staff ratio 1.2. B: occupancy 80%, staff ratio 0.9.", l: "Two episodes" },
      { k: "Step 1", m: "Gap in occupancy: 20 points. Squared: 400.", s: "20 × 20 = 400", l: "Occupancy: 400" },
      { k: "Step 2", m: "Gap in staff ratio: 0.3. Squared: 0.09.", s: "0.3 × 0.3 = 0.09: a speck you can hardly see.", l: "Staff ratio: 0.09" },
      { k: "Step 3", m: "Add, take the square root: the distance is 20.00.", s: "√(400 + 0.09) = √400.09 = 20.00", l: "Distance = 20.00" },
      { k: "The lesson", m: "Occupancy supplied 400 of the 400.09.", s: "Staffing counts for almost nothing, only because its numbers are small.", l: "Units decided the answer" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
${[["A", 22, "60%", "1.2", NAVY], ["B", 250, "80%", "0.9", TERRA]].map(([n, x, o, s, c]) => `<g class="a o0 card${n}"><rect x="${x}" y="16" width="208" height="64" rx="12" fill="#fff" stroke="${c}" stroke-width="3"/>
  <circle cx="${x + 30}" cy="48" r="17" fill="${c}"/>${t(x + 30, 54, n, 17, "#fff", "middle", 800)}
  ${t(x + 58, 42, "occupancy " + o, 15, INK, "start", 700)}${t(x + 58, 64, "staff ratio " + s, 15, INK, "start", 700)}</g>`).join("")}
<g class="a o0 legh">
  <rect class="a sq400" x="${AX}" y="${AY}" width="120" height="120" fill="${TERRA}" fill-opacity=".22" stroke="${TERRA}" stroke-width="2.5" style="transform-origin:${AX}px ${AY}px;transform:scale(0)"/>
  ${t(AX + 60, AY + 66, "400", 30, TERRA, "middle", 800, "a o0 n400")}
  <path class="dr" pathLength="1" d="M${AX} ${AY} H${AX + 120}" stroke="${TERRA}" stroke-width="4"/>
  ${t(AX + 60, AY - 8, "occupancy gap = 20", 13.5, TERRA, "middle", 700)}
</g>
<path class="dr hyp" pathLength="1" d="M${AX} ${AY} L${AX + 120} ${AY - 1.8}" stroke="${INK}" stroke-width="3"/>
<circle class="a o0 pA" cx="${AX}" cy="${AY}" r="8" fill="${NAVY}"/><circle class="a o0 pB" cx="${AX + 120}" cy="${AY - 1.8}" r="8" fill="${TERRA}"/>
<g class="a o0 speck">
  <rect x="${AX + 120}" y="${AY - 1.8}" width="1.8" height="1.8" fill="${NAVY}"/>
  <circle cx="${AX + 121}" cy="${AY - 1}" r="7" fill="none" stroke="${NAVY}" stroke-width="2"/>
  <path d="M${AX + 127} ${AY - 6} L246 132" stroke="${NAVY}" stroke-width="1.5" stroke-dasharray="3 3"/>
  <circle cx="276" cy="120" r="34" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  <rect x="268" y="112" width="16" height="16" fill="${NAVY}" fill-opacity=".3" stroke="${NAVY}" stroke-width="2"/>
  ${t(276, 170, "staff gap 0.3 → 0.09", 13, NAVY, "middle", 700)}
</g>
<g class="sum">
  <g class="a o0 f1">${t(326, 214, "20 × 20 =", 17, INK, "start", 400)}${t(462, 214, "400", 19, TERRA, "end", 800)}</g>
  <g class="a o0 f2">${t(326, 242, "0.3 × 0.3 =", 17, INK, "start", 400)}${t(462, 242, "0.09", 19, NAVY, "end", 800)}</g>
  <g class="a o0 f3"><path d="M326 254 H462" stroke="${INK}" stroke-width="2"/>${t(326, 280, "√400.09 =", 17, INK, "start", 400)}${t(462, 280, "20.00", 21, INK, "end", 800)}</g>
</g>
<g class="a o0 scale">
  <rect x="226" y="104" width="240" height="236" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
  ${t(346, 132, "who decides the distance?", 15, INK, "middle", 800)}
  <g class="beam" style="transform-origin:346px 200px;transition:transform 1.4s cubic-bezier(.3,1.6,.5,1)">
    <path d="M262 200 H430" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M262 200 L246 236 M262 200 L278 236 M430 200 L414 236 M430 200 L446 236" stroke="${MUTED}" stroke-width="1.5"/>
    <path d="M240 236 H284 L278 244 H246 Z" fill="${INK}"/><path d="M408 236 H452 L446 244 H414 Z" fill="${INK}"/>
    <rect x="240" y="196" width="44" height="40" rx="5" fill="${TERRA}"/>${t(262, 222, "400", 15, "#fff", "middle", 800)}
    <rect x="425" y="229" width="10" height="7" rx="1.5" fill="${NAVY}"/>${t(430, 222, "0.09", 13, NAVY, "middle", 800)}
  </g>
  <path d="M346 200 L332 262 H360 Z" fill="${MUTED}"/>
  ${t(262, 290, "occupancy", 13, TERRA, "middle", 800)}${t(430, 290, "staffing", 13, NAVY, "middle", 800)}
  ${t(346, 322, "99.98% of it comes from occupancy", 14, TERRA, "middle", 800)}
</g>`,
    render(r, b) {
      H.show(r, ".cardA,.cardB,.pA,.pB", true); H.delay(r, ".cardB", .4);
      H.show(r, ".legh", b >= 1); H.draw(r, ".legh .dr", b >= 1);
      H.tf(r, ".sq400", b >= 1 ? "scale(1)" : "scale(0)"); H.delay(r, ".sq400", b >= 1 ? .9 : 0); H.show(r, ".n400", b >= 1); H.delay(r, ".n400", b >= 1 ? 1.6 : 0);
      H.show(r, ".f1", b >= 1); H.delay(r, ".f1", b === 1 ? 1.4 : 0);
      H.show(r, ".speck", b >= 2); H.show(r, ".f2", b >= 2); H.delay(r, ".f2", b === 2 ? 1 : 0);
      H.draw(r, ".hyp", b >= 3); H.show(r, ".f3", b >= 3); H.delay(r, ".f3", b === 3 ? 1.2 : 0);
      H.show(r, ".speck", b === 2 || b === 3);
      H.show(r, ".scale", b >= 4); H.tf(r, ".beam", b >= 4 ? "rotate(-16deg)" : "none"); H.delay(r, ".beam", b >= 4 ? .6 : 0);
      H.show(r, ".f1,.f2,.f3", b >= 3 && b < 4 ? true : false);
      if (b === 1) H.show(r, ".f1", true); if (b === 2) H.show(r, ".f1,.f2", true);
    }
  };

  /* ------------------------------------------------------------ s07 · standardise: the z-score does real work */
  const V7 = [["occupancy %", D.sd.occupancy_pct, D.shareRaw.occupancy_pct, TERRA], ["training hours", D.sd.training_hours, D.shareRaw.training_hours, GOLD], ["handoffs", D.sd.handoffs, D.shareRaw.handoffs, GREEN], ["staff ratio", D.sd.staff_ratio, D.shareRaw.staff_ratio, NAVY]];
  SC.s07 = {
    copy: [
      { k: "The cure, from Week 4", m: "The z-score: subtract the mean, divide by the standard deviation.", s: "Applied to every column.", l: "z = (x − mean) ÷ SD" },
      { k: "The real file", m: "The columns have very different spreads.", s: "Occupancy SD ≈ 10.4, training ≈ 9.7, staff ratio ≈ 0.34.", l: "Spreads in raw units" },
      { k: "Without standardising", m: "Two columns supply 99% of every distance.", s: "Staff ratio supplies 0.1%.", l: "99% from two columns" },
      { k: "After standardising", m: "Every column has SD 1, and each supplies about a quarter.", s: "Four variables, four equal voices.", l: "25% each" },
      { k: "In Python", m: "One line: StandardScaler().fit_transform(X).", s: "Skip it, and your segments are bands of one variable in disguise.", l: "One line prevents it" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="60" y="14" width="360" height="52" rx="12" fill="${NAVY}"/>
${t(240, 48, "z = (x − mean) ÷ SD", 24, "#fff", "middle", 800)}
<g class="a o0 ruler">
  <rect x="40" y="120" width="400" height="34" rx="6" fill="#fff" stroke="${MUTED}" stroke-width="2"/>
  ${[50, 60, 70, 80, 90, 100].map((v, i) => `<line x1="${60 + i * 72}" y1="120" x2="${60 + i * 72}" y2="134" stroke="${MUTED}" stroke-width="2"/>` + t(60 + i * 72, 150, v, 13, MUTED, "middle", 600)).join("")}
  ${t(240, 108, "occupancy, in %", 14, MUTED, "middle", 600)}
  <g class="zr a" style="transform-origin:240px 210px;transform:scaleX(1.9);opacity:0">
    <rect x="132" y="192" width="216" height="34" rx="6" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
    ${[-2, -1, 0, 1, 2].map((v, i) => `<line x1="${150 + i * 45}" y1="192" x2="${150 + i * 45}" y2="206" stroke="${NAVY}" stroke-width="2"/>` + t(150 + i * 45, 222, v, 13, NAVY, "middle", 700)).join("")}
  </g>
  ${t(240, 250, "the same column, in standard deviations", 14, NAVY, "middle", 600, "a o0 zl")}
  <path class="dr ar7" pathLength="1" d="M240 158 V186" stroke="${NAVY}" stroke-width="3"/>
</g>
<g class="a o0 sds">
  ${t(24, 92, "standard deviation", 12.5, MUTED, "start", 700)}
  ${V7.map(([n, sd, , c], i) => `${t(24, 118 + i * 30, n, 14, INK, "start", 700)}<rect class="a sdb" data-w="${Math.max(3, sd * 20)}" x="140" y="${104 + i * 30}" width="1" height="18" rx="4" fill="${c}" style="transform-origin:140px 0;transition:width 1.2s"/>${t(0, 118 + i * 30, sd.toFixed(2), 13.5, c, "start", 800, "sdv")}`).join("")}
</g>
<g class="a o0 share">
  ${t(24, 252, "share of the distance between two episodes", 12.5, MUTED, "start", 700)}
  <g class="segs">${V7.map(([n, , sh, c], i) => `<rect class="seg" data-i="${i}" y="262" height="34" fill="${c}" style="transition:x 1.2s,width 1.2s"/>`).join("")}</g>
  <g class="sl">${V7.map(([n, , sh, c], i) => t(0, 316, "", 12.5, c, "middle", 800, "segl")).join("")}</g>
  <g class="a o0 br99"><path d="M24 300 V306 H440 V300" fill="none" stroke="${TERRA}" stroke-width="2"/></g>
</g>
<g class="a o0 code"><rect x="24" y="294" width="432" height="54" rx="10" fill="${INK}"/>
  <text x="40" y="327" font-family="Consolas,monospace" font-size="16" fill="#E7DDCB">Z = <tspan fill="${GOLD}">StandardScaler</tspan>().fit_transform(X)</text></g>`,
    render(r, b) {
      H.show(r, ".ruler", b === 0); H.draw(r, ".ar7", b === 0);
      H.q(r, ".zr").forEach(e => { e.style.transitionDelay = b === 0 ? ".9s" : "0s"; e.style.opacity = b === 0 ? "1" : "0"; e.style.transform = b === 0 ? "none" : "scaleX(1.9)"; });
      H.show(r, ".zl", b === 0); H.delay(r, ".zl", b === 0 ? 1.8 : 0);
      H.show(r, ".sds", b >= 1);
      const z = b >= 3;
      H.q(r, ".sdb").forEach((e, i) => { const w = z ? 20 : +e.dataset.w; e.setAttribute("width", w); e.style.transitionDelay = b === 1 ? (i * .2) + "s" : "0s"; });
      H.q(r, ".sdv").forEach((e, i) => { const w = z ? 20 : +H.q(r, ".sdb")[i].dataset.w; e.setAttribute("x", 148 + w); e.textContent = z ? "1.00" : V7[i][1].toFixed(2); });
      H.show(r, ".share", b >= 2 && b <= 3); H.show(r, ".br99", b === 2);
      let x = 24; const W = 416;
      H.q(r, ".seg").forEach((e, i) => { const f = z ? .25 : V7[i][2]; const w = Math.max(1, f * W); e.setAttribute("x", x); e.setAttribute("width", w); x += w; });
      x = 24; H.q(r, ".segl").forEach((e, i) => { const f = z ? .25 : V7[i][2]; const w = f * W; e.setAttribute("x", x + w / 2); x += f * W;
        e.textContent = z ? "25%" : (f > .2 ? Math.round(f * 1000) / 10 + "%" : ""); });
      H.show(r, ".code", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s08 · interactive: who decides the distance? */
  const VARS = [["staff_ratio", "staff ratio", NAVY, 2], ["training_hours", "training hours", GOLD, 1], ["occupancy_pct", "occupancy %", TERRA, 1], ["handoffs", "handoffs", GREEN, 0]];
  SC.s08 = {
    copy: [
      { k: "Your turn", m: "Who decides the distance between two episodes?", s: "Pick two real episodes under the stage.", l: "Pick two episodes" },
      { k: "Your turn", m: "Switch between raw units and standardised units.", s: "Watch the share each variable supplies.", l: "Raw or standardised?" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="16" y="14" width="448" height="332" rx="14" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
${t(36, 44, "", 15, NAVY, "start", 800, "e8a")}${t(444, 44, "", 15, TERRA, "end", 800, "e8b")}
<text class="mode8" x="240" y="76" font-size="14" fill="${MUTED}" text-anchor="middle" font-weight="700"></text>
${VARS.map(([k, n, c], i) => `<g class="row8" data-i="${i}">${t(36, 112 + i * 52, n, 15, INK, "start", 700)}
  <text class="gap8" x="36" y="130" transform="translate(0 ${i * 52})" font-size="12.5" fill="${MUTED}" font-weight="400"></text>
  <rect x="170" y="${98 + i * 52}" width="240" height="26" rx="6" fill="#F1ECE2"/>
  <rect class="bar8" x="170" y="${98 + i * 52}" width="0" height="26" rx="6" fill="${c}" style="transition:width .8s cubic-bezier(.3,.8,.25,1)"/>
  <text class="pc8" x="418" y="${117 + i * 52}" font-size="15" fill="${c}" font-weight="800"></text></g>`).join("")}
<path d="M36 312 H444" stroke="#CDBFA6" stroke-width="2"/>
${t(36, 336, "distance between the two episodes", 14, MUTED, "start", 600)}
<text class="dist8" x="444" y="337" font-size="22" fill="${INK}" text-anchor="end" font-weight="800"></text>`,
    update(r, ia, ib, z) {
      const E = D.episodes, A = E[ia], B = E[ib]; if (!A || !B) return;
      const sq = VARS.map(([k], j) => { const g = A[j + 1] - B[j + 1]; const s = z ? g / D.sd[k] : g; return { g, s2: s * s }; });
      const tot = sq.reduce((a, x) => a + x.s2, 0) || 1e-9;
      r.querySelector(".e8a").textContent = "A · " + A[0]; r.querySelector(".e8b").textContent = "B · " + B[0];
      r.querySelector(".mode8").textContent = z ? "standardised units: each gap ÷ its standard deviation" : "raw units: % , hours, ratio, count";
      H.q(r, ".row8").forEach((g, j) => {
        const f = sq[j].s2 / tot, k = VARS[j][0];
        g.querySelector(".bar8").setAttribute("width", Math.max(0, f * 240));
        g.querySelector(".pc8").textContent = (f < .001 && f > 0 ? "<0.1" : (Math.round(f * 1000) / 10)) + "%";
        g.querySelector(".gap8").textContent = `${A[j + 1]} vs ${B[j + 1]}` + (z ? ` → gap ${(Math.abs(sq[j].g) / D.sd[k]).toFixed(2)} SD` : ` → gap ${+Math.abs(sq[j].g).toFixed(2)}`);
      });
      r.querySelector(".dist8").textContent = Math.sqrt(tot).toFixed(2) + (z ? " SD" : "");
    },
    render(r, b) { const sv = r.querySelector("svg"); if (!sv._init) { sv._init = 1; this.update(r, 2, 5, false); } }
  };

  /* ------------------------------------------------------------ s09 · the noise floor: shuffle each column */
  const T9 = [["1.00", "7.7", "83.6", "5"], ["1.72", "17.1", "65.1", "2"], ["1.43", "19.3", "67.2", "3"], ["1.93", "32.0", "87.9", "2"], ["0.71", "3.5", "91.0", "5"], ["1.24", "8.5", "95.9", "5"]];
  const PERM = [[3, 0, 5, 1, 2, 4], [2, 4, 0, 5, 3, 1], [5, 3, 1, 0, 4, 2], [1, 5, 4, 2, 0, 3]];   // new row of each cell, per column
  const SH9 = ["staff", "train", "occup.", "hand."];
  const F9 = [276, 70, 184, 160];
  SC.s09 = {
    copy: [
      { k: "The noise floor", m: "How do we know our groups are real?", s: "We build what 'no structure' looks like.", l: "Build a noise floor" },
      { k: "Step 1", m: "Shuffle each column on its own.", s: "Like spinning the reels of a slot machine.", l: "Spin each column" },
      { k: "Step 2", m: "Same values in every column. The links between columns are gone.", s: "Same mean, same spread. Any real group disappears.", l: "Links destroyed" },
      { k: "Step 3", m: "Run exactly the same clustering on the shuffled data.", s: "Its score is what 'no structure' looks like.", l: "Same method, both files" },
      { k: "The evidence", m: "The gap between the two scores is your evidence.", s: "Four lines of code. Almost nobody runs them.", l: "Gap = evidence" }
    ],
    svg: `
<rect width="480" height="360" fill="#F6F1E7"/>
<rect x="14" y="32" width="246" height="236" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
${SH9.map((h, c) => t(50 + c * 58, 56, h, 13, MUTED, "middle", 700)).join("")}
<path d="M24 64 H250" stroke="#CDBFA6" stroke-width="2"/>
<defs><clipPath id="clip9"><rect x="14" y="66" width="246" height="186"/></clipPath></defs>
<g clip-path="url(#clip9)">${T9.map((row, j) => row.map((v, c) => `<g class="cell" data-c="${c}" data-j="${j}" style="transition:transform 1.1s cubic-bezier(.4,1.4,.5,1)">${t(50 + c * 58, 92 + j * 30, v, 15, j % 2 ? NAVY : INK, "middle", 600)}</g>`).join("")).join("")}</g>
<g class="a o0 lever"><rect x="252" y="96" width="10" height="70" rx="5" fill="${MUTED}"/><g class="lv" style="transform-origin:257px 166px;transition:transform .5s"><path d="M257 166 V108" stroke="${INK}" stroke-width="5"/><circle cx="257" cy="104" r="9" fill="${TERRA}"/></g></g>
<g class="a o0 same">${SH9.map((_, c) => `<g><path d="M${34 + c * 58} 300 v-8 h8 v-14 h8 v8 h8 v-18 h8 v32 Z" fill="${CL[c]}" fill-opacity=".35" stroke="${CL[c]}" stroke-width="1.5"/></g>`).join("")}
  ${t(137, 322, "✓ same values, same mean, same spread", 13, GREEN, "middle", 800)}</g>
<rect x="${F9[0] - 10}" y="${F9[1] - 38}" width="${F9[2] + 20}" height="${F9[3] + 50}" rx="12" fill="#fff" stroke="#CDBFA6" stroke-width="2"/>
<text class="sc9" x="${F9[0] + F9[2] / 2}" y="${F9[1] - 16}" font-size="13" fill="${MUTED}" text-anchor="middle" font-weight="700">real episodes: structure</text>
${D.pts.map((p, i) => { const a = H.px(p, F9[0], F9[1], F9[2], F9[3]), z = H.px(D.shuf[i], F9[0], F9[1], F9[2], F9[3]); return `<circle class="pt p9" cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="2.4" data-dx="${(z[0] - a[0]).toFixed(1)}" data-dy="${(z[1] - a[1]).toFixed(1)}" style="fill:${CL[D.lab2[i]]};transition:transform 1.6s cubic-bezier(.4,0,.2,1) ${(i % 30) * .02}s,fill .6s"/>`; }).join("")}
<g class="a o0 meters">
  ${t(24, 292, "silhouette score, k = 2", 12, MUTED, "start", 700)}
  ${t(24, 314, "real", 14, NAVY, "start", 800)}<rect x="92" y="302" width="200" height="16" rx="8" fill="#E7DDCB"/><rect class="m1" x="92" y="302" width="0" height="16" rx="8" fill="${NAVY}" style="transition:width 1.4s"/>${t(0, 315, "0.50", 14, NAVY, "start", 800, "m1t")}
  ${t(24, 342, "shuffled", 14, MUTED, "start", 800)}<rect x="92" y="330" width="200" height="16" rx="8" fill="#E7DDCB"/><rect class="m2" x="92" y="330" width="0" height="16" rx="8" fill="${GREY}" style="transition:width 1.4s .3s"/>${t(0, 343, "0.19", 14, MUTED, "start", 800, "m2t")}
</g>
<g class="a o0 gap9"><path d="M${92 + 200 * .19} 324 H${92 + 200 * .504}" stroke="${TERRA}" stroke-width="3" marker-end="url(#ar9)" marker-start="url(#ar9)"/>
  <defs><marker id="ar9" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${TERRA}"/></marker></defs>
  <rect x="318" y="296" width="146" height="52" rx="10" fill="${TERRA}"/>${t(391, 318, "gap +0.31", 18, "#fff", "middle", 800)}${t(391, 338, "= your evidence", 13.5, "#fff", "middle", 700)}</g>
<g class="a o0 four"><rect x="292" y="248" width="164" height="30" rx="15" fill="${INK}"/>${t(374, 268, "4 lines of code", 14, GOLD, "middle", 800)}</g>`,
    render(r, b) {
      const shuf = b >= 1;
      H.q(r, ".cell").forEach(g => { const c = +g.dataset.c, j = +g.dataset.j; const nj = shuf ? PERM[c][j] : j; g.style.transform = `translateY(${(nj - j) * 30}px)`; g.style.transitionDelay = shuf ? (c * .35) + "s" : "0s"; });
      H.show(r, ".lever", b === 1); H.tf(r, ".lv", b === 1 ? "rotate(160deg)" : "none"); H.delay(r, ".lv", .3);
      H.show(r, ".same", b === 2);
      H.q(r, ".p9").forEach((e, i) => { e.style.transform = b >= 2 ? `translate(${e.dataset.dx}px,${e.dataset.dy}px)` : "none"; e.style.fill = b >= 2 ? GREY : CL[D.lab2[i]]; });
      r.querySelector(".sc9").textContent = b >= 2 ? "after shuffling: no structure" : "real episodes: structure";
      H.show(r, ".meters", b >= 3);
      r.querySelector(".m1").setAttribute("width", b >= 3 ? 200 * .504 : 0); r.querySelector(".m2").setAttribute("width", b >= 3 ? 200 * .19 : 0);
      r.querySelector(".m1t").setAttribute("x", 98 + 200 * .504); r.querySelector(".m2t").setAttribute("x", 98 + 200 * .19);
      H.show(r, ".gap9", b >= 4); H.delay(r, ".gap9", b >= 4 ? .4 : 0);
      H.show(r, ".four", b >= 4); H.delay(r, ".four", b >= 4 ? 1.2 : 0);
    }
  };
})();
