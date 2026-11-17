/* Week 13 · Chapter 3 animated scenes, part C (s21–s27, added 17 Nov 2026). Uses window.SCH from scenes-a.js.
   Data: window.W13X (real figures from the 5,200 Al Waha reviews, scikit-learn 1.8). Scene s26 is an illustration (marked on screen). */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, X = window.W13X;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, tile } = H;
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const alive = r => { const s = r.querySelector("svg"); return () => s && s.isConnected; };

  /* ------------------------------------------------------------ s21 · the document-term matrix */
  const DT = X.dtm, CN = X.corner;
  SC.s21 = {
    copy: [
      { k: "One giant table", m: "5,200 reviews become one table of numbers.", s: "It is called the document-term matrix.", l: "Document-term matrix" },
      { k: "Rows and columns", m: `One row per review, one column per term (${DT.cols}).`, s: "Each cell: that term's weight in that review.", l: `${fmt(DT.rows)} × ${DT.cols}` },
      { k: "Mostly empty", m: `Only ${DT.fill}% of the cells are filled.`, s: `About ${Math.round(DT.perRow)} terms per review, out of ${DT.cols}.`, l: `${DT.fill}% filled` },
      { k: "Sparse", m: "A sparse table: exactly what a model needs.", s: "Rows of numbers, like Weeks 9 to 11.", l: "Ready for a model" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="262" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${CN.terms.map((w, j) => `<g class="a o0 hd21" style="transition-delay:${(.2 + j * .03).toFixed(2)}s"><text transform="translate(${80 + j * 16} 76) rotate(-58)" font-size="9.5" fill="${MUTED}" font-weight="700">${w}</text></g>`).join("")}
${CN.cells.map((row, i) => `<g class="a o0 rw21" style="transition-delay:${(i * .08).toFixed(2)}s;transform:translateX(-14px)">${t(66, 93 + i * 15, "review " + (i + 1), 9.5, MUTED, "end", 700)}
  ${row.map((v, j) => `<rect class="cl21${v ? " on21" : ""}" x="${74 + j * 16}" y="${83 + i * 15}" width="13" height="12" rx="2" fill="${v ? NAVY : "#F1ECE2"}" style="transition:fill .5s,opacity .5s"/>`).join("")}</g>`).join("")}
${t(260, 274 - 6, `… and ${fmt(DT.rows - 12)} more rows, ${DT.cols - 24} more columns`, 11, MUTED, "middle", 700)}
${[[fmt(DT.rows) + " × " + DT.cols, "reviews × terms", NAVY], [DT.fill + "%", "cells filled", TERRA], ["≈ " + Math.round(DT.perRow), "terms per review", GREEN]].map(([v, s, c], i) => `<g class="a o0 st21" style="transform:translateY(12px);transition-delay:${i * .3}s"><rect x="${12 + i * 154}" y="284" width="148" height="62" rx="12" fill="#fff" stroke="${c}" stroke-width="2.5"/>${t(86 + i * 154, 314, v, 20, c, "middle", 800)}${t(86 + i * 154, 334, s, 11.5, MUTED, "middle", 700)}</g>`).join("")}
<g class="a o0 sp21" style="transform:scale(1.6)"><g transform="rotate(-7 300 160)"><rect x="214" y="138" width="172" height="44" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(300, 168, "SPARSE", 24, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.q(r, ".rw21").forEach(g => { g.style.opacity = 1; g.style.transform = "none"; });
      H.show(r, ".hd21", b >= 1);
      H.q(r, ".cl21").forEach(e => { const on = e.classList.contains("on21"); e.style.fill = b === 0 ? "#F1ECE2" : on ? (b >= 2 ? TERRA : NAVY) : "#F1ECE2"; e.style.opacity = b >= 2 && !on ? .45 : 1; });
      H.q(r, ".st21").forEach((g, i) => { const on = (i === 0 && b >= 1) || (i > 0 && b >= 2); g.style.opacity = on ? 1 : 0; g.style.transform = on ? "none" : "translateY(12px)"; });
      H.show(r, ".sp21", b >= 3); H.tf(r, ".sp21", b >= 3 ? "scale(1)" : "scale(1.6)");
    }
  };

  /* ------------------------------------------------------------ s22 · stemming, helpful and dangerous */
  const ST = X.stems;
  SC.s22 = {
    copy: [
      { k: "Another choice", m: "Stemming cuts words back to their root.", s: "waited, waiting → wait.", l: "Stemming" },
      { k: "When it helps", m: `waited (${ST.waited}) + waiting (${ST.waiting}) → wait (${ST.waited + ST.waiting}).`, s: "Two columns become one stronger feature.", l: "Helpful merge" },
      { k: "When it hurts", m: "complain + complaint → complain.", s: `Happy patients (${ST.complain}) merged with unhappy ones (${ST.complaint}).`, l: "Harmful merge" },
      { k: "So", m: "Record it, and check what it merged.", s: "Like every preparation choice.", l: "Record and check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a sc22"><rect x="150" y="16" width="180" height="44" rx="22" fill="${INK}"/>${t(240, 44, "✂  cut to the root", 16, GOLD, "middle", 800)}</g>
<g class="a o0 pn22a"><rect x="12" y="74" width="222" height="200" rx="14" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>${t(123, 98, "helps", 15, GREEN, "middle", 800)}
  <g class="a mv22a1">${tile(30, 116, "waited", { size: 15, stroke: NAVY })}${t(66, 162, ST.waited, 12, MUTED, "middle", 700)}</g>
  <g class="a mv22a2">${tile(130, 116, "waiting", { size: 15, stroke: NAVY })}${t(170, 162, ST.waiting, 12, MUTED, "middle", 700)}</g>
  <g class="a o0 res22a" style="transform:scale(.6)">${tile(78, 196, "wait", { size: 20, h: 38, stroke: GREEN, fill: "#EAF5EE" })}${t(123, 256, (ST.waited + ST.waiting) + " uses, one feature", 12.5, GREEN, "middle", 800)}</g></g>
<g class="a o0 pn22b"><rect x="246" y="74" width="222" height="200" rx="14" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>${t(357, 98, "hurts", 15, TERRA, "middle", 800)}
  <g class="a mv22b1">${tile(258, 116, "complain", { size: 15, stroke: GREEN })}${t(305, 162, ST.complain + " · happy", 11.5, GREEN, "middle", 700)}</g>
  <g class="a mv22b2">${tile(360, 116, "complaint", { size: 15, stroke: TERRA })}${t(410, 162, ST.complaint + " · unhappy", 11.5, TERRA, "middle", 700)}</g>
  <g class="a o0 res22b" style="transform:scale(.6)">${tile(298, 196, "complain", { size: 20, h: 38, stroke: TERRA, fill: "#FCEFE9" })}${t(357, 256, "opposite meanings, one feature", 12.5, TERRA, "middle", 800)}</g>
  <g class="a o0 wr22"><g class="shake"><circle cx="446" cy="214" r="14" fill="${TERRA}"/>${t(446, 220, "!", 17, "#fff")}</g></g></g>
<g class="a o0 ck22" style="transform:translateY(12px)"><rect x="60" y="286" width="360" height="58" rx="12" fill="${INK}"/>${["record the choice", "check what it merged"].map((s, i) => `<circle cx="${92 + i * 172}" cy="315" r="10" fill="${GREEN}"/>${t(92 + i * 172, 320, "✓", 12, "#fff")}${t(108 + i * 172, 320, s, 14, "#fff", "start", 700)}`).join("")}</g>`,
    render(r, b) {
      H.show(r, ".pn22a", b >= 1); H.show(r, ".pn22b", b >= 2);
      H.tf(r, ".mv22a1", b >= 1 ? "translate(40px,40px) scale(.7)" : "none"); H.tf(r, ".mv22a2", b >= 1 ? "translate(-48px,40px) scale(.7)" : "none"); H.delay(r, ".mv22a1,.mv22a2", b >= 1 ? .8 : 0);
      H.set(r, ".mv22a1,.mv22a2", "opacity", b >= 1 ? "0" : "1");
      H.show(r, ".res22a", b >= 1); H.tf(r, ".res22a", b >= 1 ? "scale(1)" : "scale(.6)"); H.delay(r, ".res22a", b >= 1 ? 1.6 : 0);
      H.tf(r, ".mv22b1", b >= 2 ? "translate(36px,40px) scale(.7)" : "none"); H.tf(r, ".mv22b2", b >= 2 ? "translate(-50px,40px) scale(.7)" : "none"); H.delay(r, ".mv22b1,.mv22b2", b >= 2 ? .8 : 0);
      H.set(r, ".mv22b1,.mv22b2", "opacity", b >= 2 ? "0" : "1");
      H.show(r, ".res22b", b >= 2); H.tf(r, ".res22b", b >= 2 ? "scale(1)" : "scale(.6)"); H.delay(r, ".res22b", b >= 2 ? 1.6 : 0);
      H.show(r, ".wr22", b >= 2); H.delay(r, ".wr22", b >= 2 ? 2.2 : 0);
      H.show(r, ".ck22", b >= 3); H.tf(r, ".ck22", b >= 3 ? "none" : "translateY(12px)");
    }
  };

  /* ------------------------------------------------------------ s23 · words that separate complaints */
  const DC = X.distinct.complaint.slice(0, 5), DN = X.distinct.none.filter(w => ["thank", "kindness", "excellent", "complain"].includes(w[0]));
  const pair = (rows, y0, label, col) => `${t(24, y0, label, 13, col, "start", 800)}${rows.map(([w, c, n], i) => { const y = y0 + 14 + i * 26;
    return `<g class="a o0 pw23" style="transition-delay:${(.2 + i * .2).toFixed(2)}s">${t(118, y + 15, w, 14, INK, "end", 800)}
      <rect class="bc23" x="126" y="${y + 2}" width="${(c * 5.4).toFixed(0)}" height="10" rx="3" fill="${TERRA}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .8s ${(.3 + i * .2).toFixed(2)}s"/>
      <rect class="bc23" x="126" y="${y + 13}" width="${(n * 5.4).toFixed(0)}" height="10" rx="3" fill="${NAVY}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform .8s ${(.45 + i * .2).toFixed(2)}s"/>
      ${t(132 + c * 5.4, y + 11, c + "%", 10.5, TERRA, "start", 800)}${t(132 + n * 5.4, y + 22, n + "%", 10.5, NAVY, "start", 800)}</g>`; }).join("")}`;
  SC.s23 = {
    copy: [
      { k: "Telling them apart", m: "Which words separate complaints from the rest?", s: "Share of reviews containing each word, in each group.", l: "Two groups of reviews" },
      { k: "More in complaints", m: `“long”: ${DC[0][1]}% of complaint reviews, ${DC[0][2]}% of the others.`, s: "Then far, delay, told, waiting.", l: "Complaint words" },
      { k: "More in happy visits", m: "thank, kindness, excellent.", s: "Found in 13–18% of happy reviews, 2–3% of complaints.", l: "Happy words" },
      { k: "The story", m: "Complaints are about waiting without information.", s: "Check it by reading the reviews themselves.", l: "A finding to check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<g transform="translate(300 26)"><rect width="12" height="10" rx="2" fill="${TERRA}"/>${t(16, 9, "filed a complaint", 11, MUTED, "start", 700)}<rect y="14" width="12" height="10" rx="2" fill="${NAVY}"/>${t(16, 23, "no complaint", 11, MUTED, "start", 700)}</g>
<g class="g23a">${pair(DC, 44, "more common in complaints", TERRA)}</g>
<g class="g23b">${pair(DN, 196, "more common in happy visits", GREEN)}</g>
<g class="a o0 st23" style="transform:scale(1.5)"><rect x="262" y="276" width="196" height="62" rx="10" fill="${INK}"/>${t(360, 301, "waiting + no information", 14, GOLD, "middle", 800)}${t(360, 325, "= complaint", 15, "#fff", "middle", 800)}</g>`,
    render(r, b) {
      [".g23a", ".g23b"].forEach((s, i) => { const on = b >= i + 1; H.q(r, s + " .pw23").forEach(e => { e.style.opacity = on ? 1 : 0; }); H.q(r, s + " .bc23").forEach(e => { e.style.transform = on ? "scaleX(1)" : "scaleX(0)"; }); });
      H.show(r, ".st23", b >= 3); H.tf(r, ".st23", b >= 3 ? "scale(1)" : "scale(1.5)");
    }
  };

  /* ------------------------------------------------------------ s24 · topic modelling */
  const TP = X.topics, TN = ["Kindness and the team", "Emergency department pressure", "Excellent care", "Appointment timing"], TC = [GREEN, TERRA, NAVY, GOLD];
  const short = w => w.length > 13 ? w.slice(0, 12) + "…" : w;
  const WORDS24 = TP.flatMap((tp, k) => tp.words.slice(0, 4).map((w, j) => ({ w, k, j })));
  const scat = (i) => { const a = i * 2.39996, rr = 40 + (i % 5) * 22; return [240 + Math.cos(a) * rr * 1.7, 180 + Math.sin(a) * rr]; };
  SC.s24 = {
    copy: [
      { k: "What are they about?", m: "Topic modelling groups words that appear together.", s: "No labels needed: it is unsupervised.", l: "Words, unsorted" },
      { k: "Four topics", m: "Each topic is a list of words.", s: "Method: non-negative matrix factorisation (NMF), 4 topics.", l: "4 topics" },
      { k: "The topics", m: "Kindness, emergency pressure, excellent care, timing.", s: "Each review gets a share of each topic.", l: "Names" },
      { k: "Your choice", m: "The number of topics and their names are yours.", s: "Read the reviews behind each topic before naming it.", l: "Choose, then read" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${TP.map((tp, k) => { const x = 12 + (k % 2) * 232, y = 12 + Math.floor(k / 2) * 168; return `<g class="a o0 cd24" style="transition-delay:${k * .2}s"><rect x="${x}" y="${y}" width="224" height="160" rx="14" fill="#fff" stroke="${TC[k]}" stroke-width="2.5"/>
  <circle cx="${x + 22}" cy="${y + 22}" r="11" fill="${TC[k]}"/>${t(x + 22, y + 27, k + 1, 12, "#fff")}
  <g class="a o0 nm24">${t(x + 40, y + 27, TN[k], 13.5, INK, "start", 800)}</g>
  <g class="a o0 sh24">${t(x + 210, y + 148, `${tp.share}% of reviews`, 11.5, MUTED, "end", 700)}</g></g>`; }).join("")}
${WORDS24.map(({ w, k, j }, i) => { const [sx, sy] = scat(i), tx = 12 + (k % 2) * 232 + 14 + (j % 2) * 104, ty = 12 + Math.floor(k / 2) * 168 + 46 + Math.floor(j / 2) * 40;
  return `<g class="wd24" data-dx="${(tx - sx).toFixed(1)}" data-dy="${(ty - sy).toFixed(1)}" style="transition:transform 1.3s cubic-bezier(.3,.8,.25,1) ${(i * .04).toFixed(2)}s">${tile(sx, sy, short(w), { size: 12.5, h: 26, stroke: GREY })}</g>`; }).join("")}
<g class="a o0 st24" style="transform:scale(1.6)"><g transform="rotate(-6 240 180)"><rect x="104" y="158" width="272" height="44" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(240, 187, "YOUR CHOICE · YOUR NAMES", 18, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.q(r, ".wd24").forEach(g => { g.style.transform = b >= 1 ? `translate(${g.dataset.dx}px,${g.dataset.dy}px)` : "none";
        const rc = g.querySelector("rect"); const k = WORDS24[[...g.parentNode.querySelectorAll(".wd24")].indexOf(g)].k; rc.style.stroke = b >= 1 ? TC[k] : GREY; rc.style.transition = "stroke .6s 1s"; });
      H.show(r, ".cd24", b >= 1); H.show(r, ".nm24", b >= 2); H.show(r, ".sh24", b >= 2);
      H.show(r, ".st24", b >= 3); H.tf(r, ".st24", b >= 3 ? "scale(1)" : "scale(1.6)"); H.delay(r, ".st24", b >= 3 ? .8 : 0);
    }
  };

  /* ------------------------------------------------------------ s25 · topic explorer (activity) */
  SC.s25 = {
    copy: [
      { k: "Your turn", m: "Open each topic: words, an example, and the scores.", s: "Real figures, 5,200 reviews.", l: "Topic explorer" },
      { k: "Your turn", m: "A topic is what people talk about, not how they feel.", s: "Then press Continue.", l: "Topic ≠ sentiment" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect class="bx25" x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="3" style="transition:stroke .4s"/>
${t(30, 44, "", 18, INK, "start", 800, "ti25")}
<g class="ws25"></g>
${t(30, 150, "a review that is mostly this topic", 11.5, MUTED, "start", 800)}
<g class="ex25"></g>
${[["share of reviews", 0, 100, MUTED], ["average satisfaction", 1, 100, GREEN], ["filed a complaint", 2, 40, TERRA]].map(([n, i, mx, c]) => `${t(30, 252 + i * 34, n, 12.5, INK, "start", 700)}<rect x="196" y="${240 + i * 34}" width="200" height="16" rx="4" fill="#F1ECE2"/><rect class="b25-${i}" x="196" y="${240 + i * 34}" width="0" height="16" rx="4" fill="${c}" style="transition:width .7s"/>${t(404, 253 + i * 34, "", 13, INK, "start", 800, "v25-" + i)}`).join("")}`,
    show(r, k) {
      const tp = TP[k]; if (!r.querySelector(".ti25")) return;
      r.querySelector(".bx25").style.stroke = TC[k]; r.querySelector(".ti25").textContent = `Topic ${k + 1} · ${TN[k]}`; r.querySelector(".ti25").setAttribute("fill", TC[k] === GOLD ? "#9A6B0A" : TC[k]);
      let x = 30, y = 60, s = ""; tp.words.forEach(w => { const wd = H.tw(w, 13); if (x + wd > 456) { x = 30; y += 34; } s += tile(x, y, w, { size: 13, h: 26, stroke: TC[k] }); x += wd + 8; });
      r.querySelector(".ws25").innerHTML = s;
      r.querySelector(".ex25").innerHTML = fo(30, 158, 420, 64, "“" + tp.example + "”", 14.5, INK, 600, "background:#F7F4EE;border-radius:10px;padding:8px 10px;box-sizing:border-box");
      [[tp.share, 100, "%"], [tp.sat, 100, ""], [tp.compl, 40, "%"]].forEach(([v, mx, u], i) => { r.querySelector(".b25-" + i).setAttribute("width", Math.min(200, v / mx * 200).toFixed(0)); r.querySelector(".v25-" + i).textContent = v + u; });
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s25.show(r, 0); } }
  };

  /* ------------------------------------------------------------ s26 · embeddings and language models (illustration) */
  const EMB = [["Nothing to complain about.", 352, 92, GREEN], ["Very impressed with the whole visit.", 300, 66, GREEN], ["Excellent care from start to finish.", 392, 128, GREEN],
    ["I will be making a complaint.", 110, 214, TERRA], ["Very disappointing visit.", 64, 182, TERRA], ["I felt completely ignored.", 150, 250, TERRA],
    ["Reasonable experience overall.", 226, 150, GOLD], ["Acceptable, but not exceptional.", 262, 186, GOLD]];
  SC.s26 = {
    copy: [
      { k: "Beyond word counts", m: "Modern language models do something different.", s: "Everything so far counted words.", l: "Counting words" },
      { k: "Embeddings", m: "Every sentence becomes a list of numbers: a point in meaning space.", s: "Similar meaning → close together.", l: "Meaning space" },
      { k: "Context", m: "“Nothing to complain about” sits near “very impressed”.", s: "Far from “making a complaint”: the words are read together.", l: "Read in context" },
      { k: "Large language models", m: "ChatGPT is built on this idea.", s: "It can label sentiment or topics with no training data from you.", l: "LLMs" },
      { k: "Same rules", m: "Check it against 30 reviews you read yourself.", s: "Report the agreement. Never let it read the data for you.", l: "Still check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="bag26" style="transition:opacity .6s"><rect x="40" y="40" width="400" height="190" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(240, 66, "word counts", 14, MUTED, "middle", 800)}
  ${[["complain", 1], ["nothing", 0], ["complaint", 1], ["making", 1], ["visit", 2], ["impressed", 1]].map(([w, n], i) => `${tile(64 + (i % 3) * 126, 86 + Math.floor(i / 3) * 56, w, { size: 13, h: 26, stroke: GREY })}${t(64 + (i % 3) * 126 + H.tw(w, 13) + 16, 104 + Math.floor(i / 3) * 56, "× " + n, 13, MUTED, "start", 800)}`).join("")}
  ${t(240, 214, "“nothing” thrown away, “complain” counted: no context", 12.5, TERRA, "middle", 800)}</g>
<g class="a o0 map26"><rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <ellipse cx="350" cy="96" rx="100" ry="56" fill="${GREEN}" fill-opacity=".08"/><ellipse cx="108" cy="214" rx="100" ry="58" fill="${TERRA}" fill-opacity=".08"/>
  ${t(456, 336, "illustration, not a real embedding", 10.5, MUTED, "end", 700)}${t(24, 34, "meaning space", 12.5, MUTED, "start", 800)}
  ${EMB.map(([s, x, y, c], i) => `<g class="a o0 pt26" data-i="${i}" style="transition-delay:${(.3 + i * .15).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="7" fill="${c}"/>${t(x + (x > 300 ? -10 : 10), y - 10, s, 10.5, INK, x > 300 ? "end" : "start", 700)}</g>`).join("")}
  <g class="a o0 lk26"><path d="M352 92 L110 214" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="6 5"/>${t(250, 140, "far apart", 13, TERRA, "middle", 800)}<circle class="pulse2" cx="352" cy="92" r="14" fill="none" stroke="${GREEN}" stroke-width="3"/></g></g>
<g class="a o0 llm26" style="transform:translateY(12px)"><rect x="258" y="232" width="200" height="104" rx="14" fill="${INK}"/>${t(358, 254, "ChatGPT", 13, GOLD, "middle", 800)}
  ${fo(270, 260, 180, 70, "“Nothing to complain about.” → <b style='color:#9EE6B8'>positive</b>", 13, "#fff", 600)}</g>
<g class="a o0 ck26" style="transform:translateY(12px)"><rect x="22" y="282" width="226" height="56" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>${person(46, 330, NAVY, .8)}${fo(64, 288, 180, 48, "Check against 30 reviews you read. Report the agreement.", 12, INK, 700)}</g>`,
    render(r, b) {
      r.querySelector(".bag26").style.opacity = b === 0 ? 1 : 0;
      H.show(r, ".map26", b >= 1); H.show(r, ".pt26", b >= 1);
      H.q(r, ".pt26").forEach(g => { const i = +g.dataset.i; g.style.opacity = b >= 1 ? (b === 2 && i !== 0 && i !== 3 && i !== 1 ? .35 : 1) : 0; });
      H.show(r, ".lk26", b >= 2);
      H.show(r, ".llm26", b >= 3); H.tf(r, ".llm26", b >= 3 ? "none" : "translateY(12px)");
      H.show(r, ".ck26", b >= 4); H.tf(r, ".ck26", b >= 4 ? "none" : "translateY(12px)");
    }
  };

  /* ------------------------------------------------------------ s27 · the text analytics workflow */
  const STEPS = [["Read", "30 reviews first", "eye"], ["Prepare", "record every choice", "sliders"], ["Split", "train / test", "split"], ["Fit", "vectoriser on train only", "gear"], ["Inspect", "top terms, leaks, negation", "lens"], ["Report", "what it adds, whose voice", "doc"]];
  const ic = (k, x, y) => ({
    eye: `<path d="M${x - 14} ${y} q14 -13 28 0 q-14 13 -28 0 z" fill="#fff" stroke="${NAVY}" stroke-width="2.2"/><circle cx="${x}" cy="${y}" r="5" fill="${NAVY}"/>`,
    sliders: [0, 1, 2].map(i => `<path d="M${x - 13} ${y - 8 + i * 8} H${x + 13}" stroke="${INK}" stroke-width="2"/><circle cx="${x - 6 + i * 7}" cy="${y - 8 + i * 8}" r="3.2" fill="${TERRA}"/>`).join(""),
    split: `<rect x="${x - 15}" y="${y - 7}" width="21" height="14" rx="2" fill="${NAVY}"/><rect x="${x + 8}" y="${y - 7}" width="8" height="14" rx="2" fill="${TERRA}"/>`,
    gear: `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${NAVY}" stroke-width="5" stroke-dasharray="4 3"/><circle cx="${x}" cy="${y}" r="3" fill="${NAVY}"/>`,
    lens: `<circle cx="${x - 2}" cy="${y - 2}" r="8" fill="${SKY}" stroke="${INK}" stroke-width="2.5"/><path d="M${x + 4} ${y + 4} l7 7" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
    doc: `<rect x="${x - 9}" y="${y - 12}" width="18" height="24" rx="2" fill="#fff" stroke="${NAVY}" stroke-width="2"/>${[0, 1, 2].map(i => `<path d="M${x - 5} ${y - 6 + i * 6} H${x + 5}" stroke="${GREY}" stroke-width="2"/>`).join("")}`
  })[k];
  const POS27 = STEPS.map((_, i) => [80 + (i % 3) * 160, 100 + Math.floor(i / 3) * 150]);
  SC.s27 = {
    copy: [
      { k: "The whole workflow", m: "Text analytics in six steps.", s: "", l: "Six steps" },
      { k: "Steps 1–2", m: "Read a sample. Prepare, and record every choice.", s: "", l: "Read · prepare" },
      { k: "Steps 3–4", m: "Split. Fit the vectoriser on training rows only.", s: "Then build the model.", l: "Split · fit" },
      { k: "Step 5", m: "Inspect: top terms, leaks, negation.", s: "Read the errors, not just the score.", l: "Inspect" },
      { k: "Step 6", m: "Report what the text adds, and whose voice it is.", s: "And what it cannot tell you.", l: "Report" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<path class="dr pth27" pathLength="1" d="M${POS27[0][0]} ${POS27[0][1]} H${POS27[2][0]} C 470 ${POS27[2][1]}, 470 ${POS27[5][1]}, ${POS27[5][0]} ${POS27[5][1]} H${POS27[3][0]}" fill="none" stroke="${GREY}" stroke-width="4" stroke-dasharray="1" style="transition:stroke-dashoffset 2.5s ease"/>
${STEPS.map(([h, s, k], i) => { const [x, y] = POS27[i]; return `<g class="sp27" data-i="${i}" style="transition:opacity .5s"><circle class="cc27" cx="${x}" cy="${y}" r="34" fill="#fff" stroke="${EDGE}" stroke-width="3" style="transition:stroke .4s,fill .4s"/>${ic(k, x, y)}
  <circle cx="${x - 26}" cy="${y - 26}" r="11" fill="${NAVY}"/>${t(x - 26, y - 21, i + 1, 12, "#fff")}
  ${t(x, y + 54, h, 15, INK, "middle", 800)}${t(x, y + 72, s, 11.5, MUTED, "middle", 600)}</g>`; }).join("")}`,
    render(r, b) {
      const on = [[], [0, 1], [2, 3], [4], [5]], act = b === 0 ? [0, 1, 2, 3, 4, 5] : on[b], done = b === 0 ? [] : [].concat(...on.slice(1, b));
      H.draw(r, ".pth27", true);
      H.q(r, ".sp27").forEach(g => { const i = +g.dataset.i, a = act.includes(i), d = done.includes(i); g.style.opacity = a || d || b === 0 ? 1 : .35;
        const c = g.querySelector(".cc27"); c.style.stroke = a && b > 0 ? TERRA : d ? GREEN : ""; c.style.fill = d ? "#EAF5EE" : "#fff"; c.classList.toggle("pulse2", a && b > 0); });
    }
  };
})();
