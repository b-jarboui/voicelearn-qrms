/* An episode row · Chapter 1 animated scenes, part A (s01–s10).
   Each scene: SC[id] = { svg, copy[beat], render(root, beat) } on a 480 x 360 stage.
   render() sets the full state for a beat (so jumping between beats works); CSS transitions do the motion.
   Data: window.W13DATA (real Al Waha reviews and results computed with scikit-learn 1.8). */
(function () {
  "use strict";
  const SC = window.SC = window.SC || {};
  const D = window.W13DATA;
  const NAVY = "#1F4E79", TERRA = "#C0502A", GREEN = "#2E7D4F", GOLD = "#E8B04B", INK = "#1A1F2B", SKY = "#DCE7F2", MUTED = "#5A6373", GREY = "#9AA3B2", PAPER = "#F6F1E7", EDGE = "#CDBFA6";
  const fmt = n => n.toLocaleString("en-US");

  const H = window.SCH = {
    q: (r, s) => Array.from(r.querySelectorAll(s)),
    set(r, s, p, v) { H.q(r, s).forEach(e => { e.style[p] = v; }); },
    show(r, s, on) { H.q(r, s).forEach(e => { e.style.opacity = on ? "1" : "0"; }); },
    tf(r, s, v) { H.q(r, s).forEach(e => { e.style.transform = v; }); },
    draw(r, s, on) { H.q(r, s).forEach(e => { e.style.strokeDashoffset = on ? "0" : "1"; }); },
    cls(r, s, c, on) { H.q(r, s).forEach(e => e.classList.toggle(c, !!on)); },
    delay(r, s, sec) { H.q(r, s).forEach(e => { e.style.transitionDelay = sec + "s"; }); },
    cam(r, cx, cy, s) { H.set(r, ".cam", "transform", `translate(${-s * (cx - 240)}px,${-s * (cy - 180)}px) scale(${s})`); },
    count(el, to, ms, f) {
      if (!el || el._to === to) return;
      f = f || (v => Math.round(v).toLocaleString("en-US"));
      const from = el._cur || 0, t0 = performance.now(); el._to = to; cancelAnimationFrame(el._raf);
      const step = now => { const p = Math.min(1, (now - t0) / (ms || 1000)), e = 1 - Math.pow(1 - p, 3), v = from + (to - from) * e;
        el._cur = v; el.textContent = f(v); if (p < 1) el._raf = requestAnimationFrame(step); };
      el._raf = requestAnimationFrame(step);
    },
    t: (x, y, s, size, fill, anchor, weight, cls) =>
      `<text${cls ? ` class="${cls}"` : ""} x="${x}" y="${y}" font-size="${size || 16}" fill="${fill || INK}" text-anchor="${anchor || "middle"}" font-weight="${weight || 700}">${s}</text>`,
    fo: (x, y, w, h, html, size, color, weight, extra) =>
      `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:${weight || 600} ${size || 13}px Calibri,Segoe UI,sans-serif;color:${color || INK};line-height:1.25;${extra || ""}">${html}</div></foreignObject>`,
    person: (x, y, c, s, cls) =>
      `<g class="${cls || ""}"><g transform="translate(${x} ${y}) scale(${s || 1})"><circle cx="0" cy="-31" r="8.5" fill="${c}"/><path d="M-11 0 V-11 Q-11 -20 0 -20 Q11 -20 11 -11 V0 Z" fill="${c}"/></g></g>`,
    tw: (s, size) => s.length * (size || 15) * 0.52 + 18,   // approximate tile width
    tile: (x, y, s, o) => { o = o || {}; const sz = o.size || 15, w = H.tw(s, sz), h = o.h || 30;
      return `<g class="${o.cls || ""}" data-w="${w.toFixed(1)}"${o.style ? ` style="${o.style}"` : ""}><rect x="${x}" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="8" fill="${o.fill || "#fff"}" stroke="${o.stroke || NAVY}" stroke-width="2.2"/>${H.t(x + w / 2, y + h / 2 + sz * .35, s, sz, o.color || INK, "middle", 700)}</g>`; },
    bubble: (x, y, s, o) => { o = o || {}; const sz = o.size || 13, w = s.length * sz * .5 + 22;
      return `<g class="${o.cls || ""}"${o.style ? ` style="${o.style}"` : ""}><rect x="${x}" y="${y}" width="${w.toFixed(0)}" height="${sz + 14}" rx="${(sz + 14) / 2}" fill="${o.fill || "#fff"}" stroke="${o.stroke || NAVY}" stroke-width="2"/><path d="M${x + 16} ${y + sz + 13} l-4 9 l12 -8" fill="${o.fill || "#fff"}" stroke="${o.stroke || NAVY}" stroke-width="2" stroke-linejoin="round"/><rect x="${x + 10}" y="${y + sz + 9}" width="16" height="4" fill="${o.fill || "#fff"}"/>${H.t(x + w / 2, y + sz + 3, s, sz, o.color || INK, "middle", 600)}</g>`; },
    alive: r => { const s = r.querySelector("svg"); return () => s && s.isConnected; },
    C: { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE }
  };
  const { t, fo, person, tile, bubble } = H;

  const ward = (x, y, s, label) => `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="40" width="150" height="110" fill="#fff"/>
    <path class="dr" pathLength="1" d="M0 150 V40 H150 V150" fill="none" stroke="${NAVY}" stroke-width="5"/>
    <path class="dr" pathLength="1" d="M-12 46 L75 0 L162 46" fill="none" stroke="${NAVY}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <g><rect x="61" y="12" width="28" height="28" rx="5" fill="${TERRA}"/><rect x="71" y="16" width="8" height="20" fill="#fff"/><rect x="65" y="22" width="20" height="8" fill="#fff"/></g>
    <rect x="16" y="50" width="118" height="20" rx="4" fill="${NAVY}"/>${t(75, 65, label || "AL WAHA HOSPITAL", 11.5, "#fff")}
    ${[0, 1, 2].map(i => `<rect x="${16 + i * 44}" y="80" width="30" height="24" rx="3" fill="${SKY}" stroke="${NAVY}" stroke-width="2.5"/>`).join("")}
    <rect x="58" y="110" width="34" height="40" fill="${NAVY}"/></g>`;

  /* ------------------------------------------------------------ s01 · five thousand reviews, can they be measured? */
  const B01 = [[196, 26, "Thank you to the whole team.", GREEN], [236, 70, "Very disappointing visit.", TERRA], [200, 114, "I felt completely ignored.", TERRA], [232, 158, "Excellent care from start to finish.", GREEN]];
  SC.s01 = {
    copy: [
      { k: "An episode row", m: "5,200 episode reviews from Al Waha.", s: "Text analytics: turning written reviews into variables.", l: "5,200 written reviews" },
      { k: "The question", m: "Can those sentences be measured, and used as variables?", s: "What can a count preserve about an experience?", l: "Words → numbers?" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="cam">
  <circle cx="446" cy="36" r="20" fill="${GOLD}"/>
  <rect y="300" width="480" height="60" fill="#E7DDCB"/><path d="M0 300 H480" stroke="${EDGE}" stroke-width="3"/>
  <g class="bld">${ward(20, 150, 1)}</g>
  ${[0, 1, 2, 3].map(i => person(40 + i * 34, 330, [NAVY, TERRA, GREEN, GOLD][i], .8, "bob")).join("")}
  ${B01.map(([x, y, s, c], i) => `<g class="a o0 b01" style="transform:translate(${95 - x}px,${200 - y}px) scale(.2)"><g class="bob" style="animation-delay:${i * .5}s">${bubble(x, y, s, { stroke: c })}</g></g>`).join("")}
  <g class="a o0 tbl">
    <rect x="214" y="208" width="250" height="84" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
    ${["staff", "kind", "ignored", "waiting", "excellent"].map((h, j) => t(250 + j * 46, 226, h, 11, MUTED, "middle", 700)).join("")}
    ${[0, 1, 2].map(i => [0, 1, 2, 3, 4].map(j => { const v = ((i * 7 + j * 3) % 5); return `<rect class="cell" x="${232 + j * 46}" y="${234 + i * 18}" width="36" height="13" rx="3" fill="${v > 2 ? NAVY : v > 1 ? "#8FB0D0" : "#E8EEF4"}"/>`; }).join("")).join("")}
  </g>
  <g class="a o0 stamp" style="transform:scale(1.8)"><g transform="rotate(-6 336 330)"><rect x="232" y="312" width="208" height="34" rx="7" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(336, 335, "CAN IT BE MEASURED?", 16, TERRA, "middle", 800)}</g></g>
</g>`,
    render(r, b) {
      H.draw(r, ".bld .dr", true);
      H.q(r, ".b01").forEach((e, i) => { e.style.transitionDelay = (.4 + i * .6) + "s"; e.style.opacity = "1"; e.style.transform = "none"; });
      H.show(r, ".tbl", b >= 1); H.delay(r, ".tbl", b >= 1 ? .5 : 0);
      H.show(r, ".stamp", b >= 1); H.tf(r, ".stamp", b >= 1 ? "scale(1)" : "scale(1.8)"); H.delay(r, ".stamp", b >= 1 ? 2.4 : 0);
      H.cam(r, b >= 1 ? 250 : 240, b >= 1 ? 190 : 180, b >= 1 ? 1.03 : 1);
    }
  };

  /* ------------------------------------------------------------ s02 · what you already have */
  const R02 = [["Split before you fit", "Score on rows the model has never seen.", "split"], ["Choose a unit", "A minute and a mention measure different things.", "ruler"], ["Runs ≠ measures", "A perfect run can still measure nothing.", "gauge"]];
  const ic02 = (k, x, y) => ({
    split: `<rect x="${x - 40}" y="${y - 9}" width="58" height="18" rx="4" fill="${NAVY}"/><rect x="${x + 22}" y="${y - 9}" width="20" height="18" rx="4" fill="${TERRA}"/>${t(x - 11, y + 24, "train", 11, NAVY, "middle", 700)}${t(x + 32, y + 24, "test", 11, TERRA, "middle", 700)}`,
    ruler: `<rect x="${x - 34}" y="${y - 11}" width="68" height="22" rx="3" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>${[-24, -12, 0, 12, 24].map(a => `<path d="M${x + a} ${y - 11} v8" stroke="${INK}" stroke-width="2"/>`).join("")}`,
    gauge: `<path d="M${x - 30} ${y + 12} A30 30 0 0 1 ${x + 30} ${y + 12}" fill="none" stroke="${GREY}" stroke-width="7" stroke-linecap="round"/><g class="needle" style="transform-origin:${x}px ${y + 12}px"><path d="M${x} ${y + 12} L${x} ${y - 14}" stroke="${TERRA}" stroke-width="4" stroke-linecap="round"/></g><circle cx="${x}" cy="${y + 12}" r="5" fill="${INK}"/>`
  })[k];
  SC.s02 = {
    copy: [
      { k: "Evaluation", m: "Split before you fit, and score on unseen rows.", s: "", l: "1 · split first" },
      { k: "Units", m: "The units of a variable decide how much it counts.", s: "", l: "2 · units decide" },
      { k: "Measurement", m: "A model that runs perfectly can still measure nothing.", s: "", l: "3 · runs ≠ measures" },
      { k: "An episode row", m: "Today the data arrives as sentences instead of numbers.", s: "Join the text to the correct visit.", l: "Same statistics" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
${R02.map(([h, s, ic], i) => { const x = 14 + i * 154; return `<g class="a o0 c02" style="transform:translateY(16px)"><rect x="${x}" y="24" width="144" height="178" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <circle cx="${x + 72}" cy="76" r="38" fill="#F1ECE2"/>${ic02(ic, x + 72, 74)}
  ${t(x + 72, 140, h, 14.5, NAVY, "middle", 800)}${fo(x + 10, 148, 124, 52, s, 12.5, MUTED, 400, "text-align:center")}</g>`; }).join("")}
<g class="a o0 tb02">
  <rect x="24" y="226" width="432" height="112" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${["wait (min)", "staff ratio", "occupancy %", "review"].map((h, j) => t([70, 156, 246, 368][j], 250, h, 12.5, MUTED, "middle", 700)).join("")}
  <path d="M36 258 H444" stroke="${EDGE}" stroke-width="2"/>
  ${[["89.1", "1.00", "83.6"], ["70.2", "1.03", "99.7"]].map((row, i) => row.map((v, j) => t([70, 156, 246][j], 282 + i * 28, v, 14, INK, "middle", 400)).join("")).join("")}
  <rect x="300" y="266" width="140" height="56" rx="8" fill="${SKY}" fill-opacity=".5" stroke="${NAVY}" stroke-dasharray="5 4" stroke-width="2"/>
</g>
<g class="a o0 drop" style="transform:translateY(-150px)">${bubble(306, 272, "Poor communication…", { size: 12.5, stroke: TERRA })}</g>
<g class="a o0 same">${t(368, 334, "a sentence, where a number used to be", 11.5, TERRA, "middle", 700)}</g>`,
    render(r, b) {
      H.q(r, ".c02").forEach((g, i) => { g.style.opacity = b >= i ? 1 : 0; g.style.transform = b >= i ? "none" : "translateY(16px)"; });
      H.cls(r, ".needle", "spin", b >= 2);
      H.show(r, ".tb02", b >= 3); H.show(r, ".drop", b >= 3); H.tf(r, ".drop", b >= 3 ? "none" : "translateY(-150px)"); H.delay(r, ".drop", b >= 3 ? .8 : 0);
      H.show(r, ".same", b >= 3); H.delay(r, ".same", b >= 3 ? 1.8 : 0);
    }
  };

  /* ------------------------------------------------------------ s03 · from a sentence to a row of numbers */
  const EX = D.example, STOP = new Set(["the", "were", "nothing", "to", "about"]);
  const ROW1 = EX.raw.slice(0, 4), ROW2 = EX.raw.slice(4);
  const lay = (ws, y) => { const sz = 15, gap = 8, w = ws.map(s => H.tw(s, sz)), tot = w.reduce((a, c) => a + c, 0) + gap * (ws.length - 1); let x = 240 - tot / 2; return ws.map((s, i) => { const o = { s, x, y, w: w[i] }; x += w[i] + gap; return o; }); };
  const T03 = [...lay(ROW1, 92), ...lay(ROW2, 132)];
  const KEEP = lay(EX.kept, 180), BI = lay(["staff outstanding", "outstanding complain"], 218);
  const BIN = { x: 22, y: 262 };
  let binN = 0;
  T03.forEach(o => { if (STOP.has(o.s)) { o.tx = BIN.x + 12 + (binN % 3) * 50 - o.x; o.ty = BIN.y + 26 + Math.floor(binN / 3) * 26 - o.y; o.rot = (binN % 2 ? 8 : -10); binN++; } else { const k = KEEP.find(q => q.s === o.s); o.tx = k.x - o.x; o.ty = k.y - o.y; } });
  const W03 = Object.entries(D.exW).sort((a, b) => b[1] - a[1]);
  SC.s03 = {
    copy: [
      { k: "A real review", m: "“The staff were outstanding. Nothing to complain about.”", s: `Written ${EX.n} times in the file.`, l: "One review" },
      { k: "Step 1", m: "Cut it into words, all lower case.", s: "These pieces are called tokens.", l: "Tokens" },
      { k: "Step 2", m: "Apply the selected stop list.", s: "The, were, to, about… and nothing.", l: "Stop words removed" },
      { k: "Step 3", m: "Keep pairs of neighbouring words too: bigrams.", s: "“staff outstanding”, “outstanding complain”.", l: "Bigrams" },
      { k: "Step 4", m: "Each survivor is a column. The review is one row of numbers.", s: `Only 5 of the ${D.vocabTrain} columns are not zero for this review.`, l: "A row of numbers" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a sent03">${fo(20, 12, 440, 62, "“The staff were outstanding. Nothing to complain about.”", 16.5, INK, 700, "text-align:center;background:#fff;border:2px solid " + NAVY + ";border-radius:16px;padding:8px 10px;box-sizing:border-box")}</g>
<g class="a o0 bin"><path d="M${BIN.x} ${BIN.y} h160 l-10 82 h-140 z" fill="#E7DDCB" stroke="${MUTED}" stroke-width="2.5"/>${t(BIN.x + 80, BIN.y - 8, "stop words: thrown away", 12.5, MUTED, "middle", 800)}</g>
${T03.map((o, i) => `<g class="a o0 tk03${STOP.has(o.s) ? " stop" : " keep"}" data-i="${i}">${tile(o.x, o.y, o.s, { stroke: o.s === "nothing" ? TERRA : NAVY, color: o.s === "nothing" ? TERRA : INK })}</g>`).join("")}
<g class="a o0 noth">${t(196, 322, "← “nothing” goes too", 14, TERRA, "start", 800)}</g>
${BI.map(o => `<g class="a o0 bi03" style="transform:translateY(12px)">${tile(o.x, o.y, o.s, { fill: "#FFF6E3", stroke: GOLD })}</g>`).join("")}
<g class="a o0 row03">
  <rect x="200" y="252" width="268" height="100" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${W03.map(([k, v], i) => `${t(334, 270 + i * 18, k, 12, INK, "end", 700)}<rect class="wb" x="340" y="${260 + i * 18}" width="${(v * 150).toFixed(0)}" height="12" rx="3" fill="${k.includes(" ") ? GOLD : NAVY}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .8s ${.3 + i * .15}s"/>${t(344 + v * 150, 270 + i * 18, v.toFixed(2), 11.5, MUTED, "start", 700)}`).join("")}
</g>`,
    render(r, b) {
      H.q(r, ".tk03").forEach((g, i) => { const o = T03[i];
        g.style.transitionDelay = b === 1 ? (i * .12) + "s" : b === 2 ? (STOP.has(o.s) ? .2 + i * .15 : 1.4) + "s" : "0s";
        g.style.opacity = b >= 1 ? (b >= 4 && STOP.has(o.s) ? .35 : 1) : 0;
        g.style.transform = b >= 2 ? `translate(${o.tx}px,${o.ty}px) rotate(${STOP.has(o.s) ? o.rot : 0}deg) scale(${STOP.has(o.s) ? .8 : 1})` : b >= 1 ? "none" : "translateY(-50px)"; });
      H.show(r, ".bin", b >= 2); H.show(r, ".noth", b >= 2 && b < 4); H.delay(r, ".noth", b >= 2 ? 1.8 : 0);
      H.q(r, ".bi03").forEach((g, i) => { g.style.opacity = b >= 3 ? 1 : 0; g.style.transform = b >= 3 ? "none" : "translateY(12px)"; g.style.transitionDelay = b >= 3 ? (.3 + i * .5) + "s" : "0s"; });
      H.show(r, ".row03", b >= 4); H.q(r, ".wb").forEach(e => { e.style.transform = b >= 4 ? "scaleX(1)" : "scaleX(0)"; });
    }
  };

  /* ------------------------------------------------------------ s04 · four choices (activity) */
  const SW = [["low", "Lower case"], ["stop", "Remove stop words"], ["bi", "Add word pairs"], ["md5", "Drop words in < 5 reviews"]];
  SC.s04 = {
    copy: [
      { k: "Your decisions", m: "Four decisions sit between the sentence and the variable.", s: "Every one of them is yours.", l: "Four switches" },
      { k: "Your turn", m: "Flip the switches under the stage.", s: "Each setting is a real model, scored on 1,300 unseen reviews.", l: "16 real models" },
      { k: "Watch", m: "Inspect how the top words change.", s: "Use training validation for choosing settings.", l: "Score and words" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="12" y="14" width="212" height="332" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(118, 40, "Your text pipeline", 15, NAVY, "middle", 800)}
${SW.map(([k, s], i) => `<g class="sw sw-${k}" data-k="${k}"><rect class="swbg" x="24" y="${56 + i * 50}" width="188" height="40" rx="10" fill="#F4F6F8"/>
  ${fo(32, 60 + i * 50, 120, 34, s, 13, INK, 700, "display:flex;align-items:center;height:34px")}
  <rect class="tr" x="160" y="${66 + i * 50}" width="42" height="20" rx="10" fill="${GREY}" style="transition:fill .4s"/>
  <circle class="kn" cx="171" cy="${76 + i * 50}" r="7.5" fill="#fff" style="transition:transform .4s"/></g>`).join("")}
<g class="gears"><g class="spin" style="transform-origin:70px 302px"><circle cx="70" cy="302" r="22" fill="none" stroke="${NAVY}" stroke-width="7" stroke-dasharray="7 5"/><circle cx="70" cy="302" r="8" fill="${NAVY}"/></g>
  <g class="spin" style="transform-origin:112px 286px;animation-direction:reverse"><circle cx="112" cy="286" r="15" fill="none" stroke="${TERRA}" stroke-width="6" stroke-dasharray="6 4"/><circle cx="112" cy="286" r="5" fill="${TERRA}"/></g></g>
${t(170, 320, "290 → ?", 14, MUTED, "middle", 700, "vct")}
<rect x="234" y="14" width="114" height="80" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(291, 36, "vocabulary", 12.5, MUTED)}${t(291, 70, "290", 28, NAVY, "middle", 800, "vv")}${t(291, 86, "terms", 11, MUTED, "middle", 400)}
<rect x="354" y="14" width="114" height="80" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(411, 36, "held-out R²", 12.5, MUTED)}${t(411, 70, "0.739", 28, GREEN, "middle", 800, "rr")}${t(411, 86, "1,300 unseen", 11, MUTED, "middle", 400)}
<g class="tw"><rect class="twb" x="234" y="104" width="234" height="116" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2"/>${t(246, 126, "▲ words that push satisfaction up", 12.5, GREEN, "start", 800)}
  ${[0, 1, 2].map(i => t(252, 152 + i * 24, "", 15, INK, "start", 700, "up" + i)).join("")}</g>
<g class="bw"><rect class="bwb" x="234" y="228" width="234" height="118" rx="12" fill="#fff" stroke="${TERRA}" stroke-width="2"/>${t(246, 250, "▼ words that pull it down", 12.5, TERRA, "start", 800)}
  ${[0, 1, 2].map(i => t(252, 276 + i * 24, "", 15, INK, "start", 700, "dn" + i)).join("")}</g>`,
    combo(c) { return D.combos.find(x => x.low === c.low && x.stop === c.stop && x.bi === c.bi && x.md5 === c.md5); },
    update(r, c) {
      const m = SC.s04.combo(c); if (!m) return;
      SW.forEach(([k], i) => { const g = r.querySelector(".sw-" + k); if (!g) return; g.querySelector(".tr").style.fill = c[k] ? NAVY : GREY; g.querySelector(".kn").style.transform = c[k] ? "translateX(20px)" : "none"; });
      H.count(r.querySelector(".vv"), m.vocab, 700); H.count(r.querySelector(".rr"), m.r2, 700, v => v.toFixed(3));
      r.querySelector(".vct").textContent = "columns: " + m.vocab;
      m.top.forEach((w, i) => { const e = r.querySelector(".up" + i); e.textContent = "“" + w + "”"; });
      m.bottom.forEach((w, i) => { const e = r.querySelector(".dn" + i); e.textContent = "“" + w + "”"; });
      H.q(r, ".tw text,.bw text").forEach(e => { e.style.transition = "none"; e.style.opacity = .2; void e.getBoundingClientRect(); e.style.transition = "opacity .6s"; e.style.opacity = 1; });
    },
    render(r, b) {
      const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s04.update(r, { low: true, stop: true, bi: true, md5: true }); }
      H.cls(r, ".swbg", "pulse2", b === 1);
      r.querySelector(".twb").style.strokeWidth = b >= 2 ? 4 : 2; r.querySelector(".bwb").style.strokeWidth = b >= 2 ? 4 : 2;
    }
  };

  /* ------------------------------------------------------------ s05 · TF and IDF */
  const REV05 = "Very disappointing visit. Not what I expected from this hospital.";
  const GRID = (k, x0, y0, col) => D.grid[k].map((v, i) => `<rect class="gc g-${k}" data-v="${v}" x="${x0 + (i % 20) * 12}" y="${y0 + Math.floor(i / 20) * 11}" width="10.5" height="9.5" rx="1.5" fill="${col}" style="fill-opacity:.08;transition:fill-opacity .5s ${(.2 + (i % 20) * .03 + Math.floor(i / 20) * .05).toFixed(2)}s"/>`).join("");
  const IDF = [["the", 3982], ["hospital", D.dfreq.hospital], ["disappointing", D.dfreq.disappointing]].map(([w, d]) => [w, d, Math.log(D.D / d)]);
  SC.s05 = {
    copy: [
      { k: "How much should a word count?", m: "TF-IDF: frequent here, and distinctive everywhere else.", s: "", l: "TF-IDF" },
      { k: "TF · term frequency", m: "How often does the word appear in this review?", s: "Here: 1 time in 10 words, for each word.", l: "TF = count ÷ length" },
      { k: "IDF · inverse document frequency", m: "How many of all the reviews contain it at all?", s: `${fmt(D.D)} reviews; each square = 26 of them.`, l: "IDF = rare across reviews" },
      { k: "Real counts", m: `“hospital”: ${fmt(D.dfreq.hospital)} reviews. “disappointing”: ${D.dfreq.disappointing}.`, s: "Darker squares represent more reviews containing the word.", l: "Where each word appears" },
      { k: "The whole idea", m: "At equal local frequency, rarer terms weigh more.", s: "IDF = ln(5,200 ÷ reviews containing the word).", l: "Rare = heavy" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="20" width="194" height="170" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(26, 42, "one review · 10 words", 12, MUTED, "start", 700)}
${fo(26, 52, 172, 90, REV05.replace("disappointing", '<b class="hd" style="transition:background .5s">disappointing</b>').replace("hospital", '<b class="hh" style="transition:background .5s">hospital</b>'), 17, INK, 600)}
<g class="a o0 tf05">${t(26, 158, "“disappointing”  1 ÷ 10 = 0.10", 13, TERRA, "start", 800)}${t(26, 178, "“hospital”  1 ÷ 10 = 0.10", 13, NAVY, "start", 800)}</g>
<g class="a o0 grids">
  ${t(222, 34, "", 12.5, NAVY, "start", 800, "gl1")}${GRID("hospital", 222, 42, NAVY)}
  ${t(222, 172, "", 12.5, TERRA, "start", 800, "gl2")}${GRID("disappointing", 222, 180, TERRA)}
</g>
<g class="a o0 idf05">
  <rect x="14" y="206" width="194" height="140" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(26, 226, "IDF weight", 12.5, MUTED, "start", 800)}
  ${IDF.map(([w, d, v], i) => `${t(110, 252 + i * 34, w, 12.5, INK, "end", 700)}<rect class="ib" x="116" y="${240 + i * 34}" width="${(v * 28).toFixed(0)}" height="16" rx="3" fill="${[GREY, NAVY, TERRA][i]}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .9s ${.3 + i * .35}s"/>${t(116, 266 + i * 34, `in ${fmt(d)} · ${v.toFixed(2)}`, 10.5, MUTED, "start", 600)}`).join("")}
</g>`,
    render(r, b) {
      const hl = (s, c) => { const e = r.querySelector(s); if (e) e.style.background = c; };
      hl(".hd", b >= 1 ? "#F8D9CD" : "transparent"); hl(".hh", b >= 1 ? "#D5E3F1" : "transparent");
      H.show(r, ".tf05", b >= 1);
      H.show(r, ".grids", b >= 2);
      r.querySelector(".gl1").textContent = b >= 3 ? `“hospital” · in ${fmt(D.dfreq.hospital)} reviews` : "5,200 reviews";
      r.querySelector(".gl2").textContent = b >= 3 ? `“disappointing” · in ${D.dfreq.disappointing} reviews` : "5,200 reviews";
      H.q(r, ".gc").forEach(e => { e.style.fillOpacity = b >= 3 ? (.08 + .92 * Math.min(1, (+e.dataset.v) / 12)).toFixed(2) : .08; });
      H.show(r, ".idf05", b >= 4); H.q(r, ".ib").forEach(e => { e.style.transform = b >= 4 ? "scaleX(1)" : "scaleX(0)"; });
    }
  };

  /* ------------------------------------------------------------ s06 · worked by hand */
  SC.s06 = {
    copy: [
      { k: "Teaching example · TF", m: "A 60-word review says “disappointing” 3 times.", s: "tf = 3 ÷ 60 = 0.05", l: "tf = 0.05" },
      { k: "Step 2 · IDF", m: "“disappointing” is in 500 of 5,000 reviews.", s: "idf = ln(5,000 ÷ 500) = ln(10) = 2.30", l: "idf = 2.30" },
      { k: "Step 3 · multiply", m: "0.05 × 2.30 = 0.115", s: "The weight of “disappointing” in this review.", l: "w = 0.115" },
      { k: "Now “hospital”", m: "In 4,500 of 5,000 reviews: idf = ln(1.11) = 0.105", s: "Same 3 times: 0.05 × 0.105 = 0.005", l: "w = 0.005" },
      { k: "The point", m: "Same count, about twenty-two times the weight.", s: "A word that is everywhere distinguishes nothing.", l: "≈ 22× the weight" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="14" y="14" width="452" height="72" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<g font-family="Cambria,Georgia,serif" fill="${NAVY}" font-style="italic">
  <text x="96" y="60" font-size="30" text-anchor="middle">w</text><text x="140" y="58" font-size="26" text-anchor="middle" font-style="normal">=</text>
  <text x="186" y="44" font-size="20" text-anchor="middle">n</text><path d="M168 52 H204" stroke="${NAVY}" stroke-width="2"/><text x="186" y="74" font-size="20" text-anchor="middle">N</text>
  <text x="232" y="60" font-size="24" text-anchor="middle" font-style="normal">×</text>
  <text x="276" y="60" font-size="26" text-anchor="middle" font-style="normal">ln(</text>
  <text x="318" y="44" font-size="20" text-anchor="middle">D</text><path d="M302 52 H334" stroke="${NAVY}" stroke-width="2"/><text x="318" y="74" font-size="20" text-anchor="middle">d</text>
  <text x="342" y="60" font-size="26" text-anchor="middle" font-style="normal">)</text>
</g>
<g class="lab06">${t(400, 40, "n: times in review", 11, MUTED, "middle", 700)}${t(400, 56, "N: words in review", 11, MUTED, "middle", 700)}${t(400, 72, "D: reviews · d: with word", 11, MUTED, "middle", 700)}</g>
<g class="a o0 card06"><rect x="14" y="100" width="168" height="110" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="26" y="${114 + i * 13}" width="${[140, 120, 136, 110, 140, 90][i]}" height="6" rx="3" fill="#E3DCCD"/>`).join("")}
  ${[[40, 112], [96, 138], [60, 164]].map(([x, y]) => `<rect x="${x}" y="${y}" width="58" height="10" rx="3" fill="${TERRA}"/>`).join("")}
  ${t(98, 202, "60 words · “disappointing” × 3", 11, TERRA, "middle", 800)}</g>
${[["tf = 3 ÷ 60 = 0.05", 15, INK], ["idf = ln(5,000 ÷ 500) = 2.30", 15, INK], ["w = 0.05 × 2.30 = 0.115", 19, TERRA], ["hospital: idf = ln(5,000 ÷ 4,500) = 0.105\nw = 0.05 × 0.105 = 0.005", 14, NAVY]].map(([s, sz, c], i) =>
  `<g class="a o0 w06" style="transform:translateX(-12px)">${s.split("\n").map((line, j) => t(196, 124 + i * 34 + j * 20, line, sz, c, "start", 800)).join("")}</g>`).join("")}
<g class="a o0 bars06">
  <path d="M40 336 H300" stroke="${MUTED}" stroke-width="2"/>
  <rect class="b6d" x="70" y="246" width="70" height="90" fill="${TERRA}" style="transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform 1s"/>
  <rect class="b6h" x="200" y="332" width="70" height="4" fill="${NAVY}" style="transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform 1s .3s"/>
  ${t(105, 240, "0.115", 14, TERRA, "middle", 800)}${t(235, 324, "0.005", 14, NAVY, "middle", 800)}
  ${t(105, 352, "disappointing", 12, INK, "middle", 700)}${t(235, 352, "hospital", 12, INK, "middle", 700)}
</g>
<g class="a o0 x20" style="transform:scale(1.7)"><circle cx="384" cy="282" r="50" fill="${GOLD}"/>${t(384, 282, "≈ 22×", 26, INK, "middle", 800)}${t(384, 304, "the weight", 13, INK, "middle", 700)}</g>`,
    render(r, b) {
      H.show(r, ".card06", true);
      H.q(r, ".w06").forEach((g, i) => { const on = b >= i; g.style.opacity = on ? 1 : 0; g.style.transform = on ? "none" : "translateX(-12px)"; });
      H.show(r, ".bars06", b >= 2); H.tf(r, ".b6d", b >= 2 ? "scaleY(1)" : "scaleY(0)"); H.tf(r, ".b6h", b >= 3 ? "scaleY(1)" : "scaleY(0)");
      H.show(r, ".x20", b >= 4); H.tf(r, ".x20", b >= 4 ? "scale(1)" : "scale(1.7)");
    }
  };

  /* ------------------------------------------------------------ s07 · weigh a word (activity) */
  SC.s07 = {
    copy: [
      { k: "Your turn", m: "Weigh real words from the Al Waha reviews.", s: `D = ${fmt(D.D)} reviews.`, l: "Real document counts" },
      { k: "Your turn", m: "Choose a word and compare its weight with “hospital”.", s: "Then press Continue.", l: "Compare with “hospital”" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="14" y="14" width="452" height="96" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(30, 40, "", 15, INK, "start", 800, "f7a")}
${t(30, 66, "", 15, MUTED, "start", 700, "f7b")}
${t(30, 94, "", 19, TERRA, "start", 800, "f7c")}
${t(30, 136, "reviews that contain the word", 12.5, MUTED, "start", 800)}
<rect x="30" y="146" width="420" height="22" rx="5" fill="#fff" stroke="${EDGE}"/><rect class="dw" x="30" y="146" width="0" height="22" rx="5" fill="${TERRA}" style="transition:width .7s"/>${t(456, 162, "", 12, INK, "end", 700, "dwt")}
<rect x="30" y="176" width="420" height="22" rx="5" fill="#fff" stroke="${EDGE}"/><rect class="dh" x="30" y="176" width="${(420 * D.dfreq.hospital / D.D).toFixed(0)}" height="22" rx="5" fill="${NAVY}"/>${t(456, 192, `hospital · ${fmt(D.dfreq.hospital)}`, 12, INK, "end", 700)}
${t(30, 228, "weight in this review", 12.5, MUTED, "start", 800)}
<path d="M40 340 H440" stroke="${MUTED}" stroke-width="2"/>
<rect class="ww" x="90" y="240" width="110" height="100" fill="${TERRA}" style="transform-box:fill-box;transform-origin:bottom;transition:transform .8s"/>
<rect class="wh" x="280" y="240" width="110" height="100" fill="${NAVY}" style="transform-box:fill-box;transform-origin:bottom;transition:transform .8s"/>
${t(145, 236, "", 15, TERRA, "middle", 800, "wwt")}${t(335, 236, "", 15, NAVY, "middle", 800, "wht")}
${t(145, 356, "", 12.5, INK, "middle", 700, "wwn")}${t(335, 356, "hospital", 12.5, INK, "middle", 700)}`,
    update(r, w, n, N) {
      const d = D.dfreq[w], idf = Math.log(D.D / d), tf = n / N, wv = tf * idf, hv = tf * Math.log(D.D / D.dfreq.hospital), mx = .3;
      r.querySelector(".f7a").textContent = `“${w}”: tf = ${n} ÷ ${N} = ${tf.toFixed(3)}`;
      r.querySelector(".f7b").textContent = `idf = ln(${fmt(D.D)} ÷ ${fmt(d)}) = ${idf.toFixed(2)}`;
      r.querySelector(".f7c").textContent = `w = ${tf.toFixed(3)} × ${idf.toFixed(2)} = ${wv.toFixed(3)}`;
      r.querySelector(".dw").setAttribute("width", (420 * d / D.D).toFixed(0)); r.querySelector(".dwt").textContent = `${w} · ${fmt(d)}`;
      r.querySelector(".ww").style.transform = `scaleY(${Math.min(1, wv / mx).toFixed(3)})`; r.querySelector(".wh").style.transform = `scaleY(${Math.min(1, hv / mx).toFixed(3)})`;
      const top = v => 340 - 100 * Math.min(1, v / mx) - 6;
      const a = r.querySelector(".wwt"), h = r.querySelector(".wht"); a.textContent = wv.toFixed(3); a.setAttribute("y", top(wv)); h.textContent = hv.toFixed(3); h.setAttribute("y", top(hv));
      r.querySelector(".wwn").textContent = w;
      return { wv, hv, d, idf };
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s07.update(r, "disappointing", 1, 10); } }
  };

  /* ------------------------------------------------------------ s08 · the word complain */
  const CP = D.complain, TOP8 = D.topPos.slice(0, 5);
  SC.s08 = {
    copy: [
      { k: "A puzzle", m: "The biggest positive weight in the model: “complain”.", s: "Read alone, that looks absurd.", l: `complain: +${TOP8[0][1]}` },
      { k: "Count it", m: `${fmt(CP.any.n)} reviews contain either form: ${CP.any.mean} against ${CP.none.mean}.`, s: "On its own, the word seems to carry nothing.", l: `${CP.any.mean} vs ${CP.none.mean}` },
      { k: "Read the sentences", m: `“Nothing to complain about.” ${CP.nothing.n} reviews, average ${CP.nothing.mean}.`, s: "Mean satisfaction in this phrase group.", l: `${CP.nothing.n} · ${CP.nothing.mean}` },
      { k: "Read the sentences", m: `“I will be making a complaint.” ${CP.making.n} reviews, average ${CP.making.mean}.`, s: "Counted as a different word: “complaint”.", l: `${CP.making.n} · ${CP.making.mean}` },
      { k: "The stop words", m: "This pipeline loses the word “nothing”.", s: "One coefficient is never the meaning of a word.", l: "complain = nothing to complain about" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a lead"><rect x="14" y="14" width="452" height="168" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(28, 38, "Largest positive weights · satisfaction model", 12.5, MUTED, "start", 800)}
  ${TOP8.map(([w, v], i) => `<g class="${i ? "" : "lead0"}">${t(170, 66 + i * 25, w, 14, i ? INK : TERRA, "end", 800)}<rect x="178" y="${53 + i * 25}" width="${(v * 17).toFixed(0)}" height="17" rx="4" fill="${i ? GREY : TERRA}"/>${t(184 + v * 17, 66 + i * 25, "+" + v, 12.5, MUTED, "start", 700)}</g>`).join("")}
  <g class="a o0 wow"><g class="bob"><circle cx="440" cy="34" r="16" fill="${GOLD}"/>${t(440, 40, "?!", 16, INK, "middle", 800)}</g></g>
</g>
<g class="a o0 two">
  ${[["say “nothing to complain about”", CP.nothing, GREEN, 14], ["say “I will be making a complaint”", CP.making, TERRA, 244]].map(([s, c, col, x], i) => `<g class="a o0 tw${i}" style="transform:translateY(14px)"><rect x="${x}" y="14" width="222" height="168" rx="14" fill="#fff" stroke="${col}" stroke-width="3"/>
    ${t(x + 111, 62, fmt(c.n), 34, col, "middle", 800)}${t(x + 111, 84, "reviews " + s.split(" ")[0], 12, MUTED, "middle", 700)}${fo(x + 12, 90, 198, 36, "“" + s.slice(5, -1) + "”", 13.5, INK, 700, "text-align:center")}
    ${t(x + 111, 150, "average satisfaction", 12, MUTED, "middle", 700)}${t(x + 111, 174, c.mean, 22, col, "middle", 800)}</g>`).join("")}
</g>
<g class="a o0 cmp"><rect x="14" y="196" width="452" height="150" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(28, 220, "Average satisfaction", 12.5, MUTED, "start", 800)}
  ${[["either word form", CP.any, TERRA], ["does not", CP.none, GREY]].map(([s, c, col], i) => `${t(200, 256 + i * 44, s + " · " + fmt(c.n), 13, INK, "end", 700)}<rect class="cb" x="208" y="${240 + i * 44}" width="${(c.mean * 2.8).toFixed(0)}" height="22" rx="4" fill="${col}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform 1s ${i * .3}s"/>${t(214 + c.mean * 2.8, 257 + i * 44, c.mean, 14, INK, "start", 800)}`).join("")}
</g>
<g class="a o0 stopdemo"><rect x="14" y="196" width="452" height="150" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(28, 220, "What the model actually sees", 12.5, MUTED, "start", 800)}
  ${(() => { const ws = ["nothing", "to", "complain", "about"]; let x = 60; return ws.map(w => { const wd = H.tw(w, 17); const s = `<g class="a sd ${w === "complain" ? "sdk" : "sdx"}">${tile(x, 236, w, { size: 17, h: 34, stroke: w === "complain" ? NAVY : TERRA })}</g>`; x += wd + 12; return s; }).join(""); })()}
  <g class="a o0 eq">${t(240, 316, "“complain” survives the reassurance", 18, GREEN, "middle", 800)}<circle cx="432" cy="310" r="14" fill="${GOLD}"/><path d="M425 313 q7 7 14 0" stroke="${INK}" stroke-width="2.5" fill="none"/><circle cx="427" cy="306" r="2" fill="${INK}"/><circle cx="437" cy="306" r="2" fill="${INK}"/></g>
</g>`,
    render(r, b) {
      H.show(r, ".lead", b < 2); H.show(r, ".wow", b < 2);
      H.show(r, ".cmp", b >= 1 && b < 4); H.q(r, ".cb").forEach(e => { e.style.transform = b >= 1 ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".two", b >= 2);
      [0, 1].forEach(i => { const on = b >= 2 + i; H.show(r, ".tw" + i, on); H.tf(r, ".tw" + i, on ? "none" : "translateY(14px)"); });
      H.show(r, ".stopdemo", b >= 4); H.delay(r, ".stopdemo", b >= 4 ? .3 : 0);
      H.q(r, ".sdx").forEach((g, i) => { g.style.transitionDelay = b >= 4 ? (1.2 + i * .3) + "s" : "0s"; g.style.opacity = b >= 4 ? .0 : 1; g.style.transform = b >= 4 ? `translateY(60px) rotate(${i % 2 ? 12 : -12}deg)` : "none"; });
      H.show(r, ".eq", b >= 4); H.delay(r, ".eq", b >= 4 ? 2.6 : 0);
    }
  };

  /* ------------------------------------------------------------ s10 · you read, the word list reads (activity) */
  const LAB = { "1": ["Positive", GREEN], "0": ["Mixed", GOLD], "-1": ["Negative", TERRA] };
  const mark = (rv) => rv.t.replace(/[A-Za-z']+/g, w => { const l = w.toLowerCase(); return rv.pos.includes(l) ? `<span class="wp">${w}</span>` : rv.neg.includes(l) ? `<span class="wn">${w}</span>` : w; });
  SC.s10 = {
    copy: [
      { k: "Your turn", m: "Six real reviews from the file.", s: "Read each one yourself.", l: "Six reviews" },
      { k: "Your turn", m: "Label each one: positive, mixed or negative.", s: "Use the buttons under the stage.", l: "Label all six" },
      { k: "The word list reads", m: "It counts good words and bad words.", s: "Green and red show the dictionary matches.", l: "Word list labels" },
      { k: "Where it fails", m: "“complain” is bad, “improve” is good.", s: "So “Nothing to complain about” scores negative, and “This needs to improve” positive.", l: "Wrong for this setting" },
      { k: "Report it", m: `Agreement with the reference labels: ${D.agree}% of all ${fmt(D.D)} reviews.`, s: "Report how the reference labels were constructed.", l: `agreement ${D.agree}%` }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<style>.wp,.wn{border-radius:3px;transition:background .6s,color .6s}.lit .wp{background:#CDEBD8;color:#1E5C38}.lit .wn{background:#F6CFC2;color:#8E3315}</style>
${D.read6.map((rv, i) => { const x = 10 + (i % 2) * 232, y = 8 + Math.floor(i / 2) * 116; return `<g class="a o0 rc" data-i="${i}" style="transform:translateY(10px)">
  <rect class="rcb" x="${x}" y="${y}" width="226" height="108" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(x + 12, y + 18, (i + 1) + " · " + rv.id, 11, MUTED, "start", 800)}
  ${fo(x + 10, y + 22, 208, 62, mark(rv), 12.5, INK, 600)}
  <g class="you" style="opacity:0;transition:opacity .4s"><rect x="${x + 8}" y="${y + 84}" width="100" height="18" rx="9" fill="${SKY}"/>${t(x + 58, y + 97, "", 11, NAVY, "middle", 800, "yt")}</g>
  <g class="mach" style="opacity:0;transition:opacity .5s ${.3 + i * .25}s"><rect x="${x + 114}" y="${y + 84}" width="104" height="18" rx="9" fill="${LAB[rv.lex][1]}"/>${t(x + 166, y + 97, "word list: " + LAB[rv.lex][0], 10.5, "#fff", "middle", 800)}</g>
</g>`; }).join("")}
<g class="a o0 agree" style="transform:scale(1.6)"><rect x="110" y="128" width="260" height="104" rx="16" fill="${INK}" fill-opacity=".92"/>${t(240, 166, D.agree + "%", 36, GOLD, "middle", 800)}${t(240, 192, "word list vs template-derived reference labels", 13, "#fff", "middle", 600)}${t(240, 214, `all ${fmt(D.D)} reviews`, 12, "#E7DDCB", "middle", 400)}</g>`,
    mark(r, i, lab) { const g = r.querySelectorAll(".rc")[i]; if (!g) return; g.querySelector(".yt").textContent = "you: " + LAB[lab][0]; g.querySelector(".you").style.opacity = 1; },
    render(r, b) {
      H.q(r, ".rc").forEach((g, i) => { g.style.transitionDelay = b === 0 ? (i * .25) + "s" : "0s"; g.style.opacity = 1; g.style.transform = "none"; g.classList.toggle("lit", b >= 2); g.querySelector(".mach").style.opacity = b >= 2 ? 1 : 0;
        const rv = D.read6[i], hot = b === 3 && (rv.t.includes("complain about") || rv.t.includes("improve"));
        const rb = g.querySelector(".rcb"); rb.style.stroke = hot ? TERRA : ""; rb.style.strokeWidth = hot ? "4" : ""; g.style.opacity = b === 3 && !hot ? .45 : 1; });
      H.show(r, ".agree", b >= 4); H.tf(r, ".agree", b >= 4 ? "scale(1)" : "scale(1.6)"); H.delay(r, ".agree", b >= 4 ? .6 : 0);
    }
  };
})();
