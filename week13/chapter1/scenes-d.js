/* Week 13 · Chapter 3 animated scenes, part D (s28 sub-word tokens, s29 transformer and attention, s30 BERTopic,
   and a corrected s26 with real embedding similarities). Added 17 Nov 2026.
   Data: window.W13X.tr, computed with the all-MiniLM-L6-v2 transformer (sentence-transformers) on the 5,200 Al Waha reviews:
   real tokenizer output, real first-layer attention weights, real cosine similarities, and BERTopic's default pipeline
   (embeddings → UMAP → HDBSCAN → class-based TF-IDF) run step by step. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, TR = window.W13X.tr;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, tile } = H;
  const fmt = n => Math.round(n).toLocaleString("en-US");
  const PURPLE = "#7B5EA7", TEAL = "#2A9D8F";

  /* lay out a row of tiles centred on cx */
  const row = (words, cy, o) => { o = o || {}; const sz = o.size || 15, gap = o.gap || 6, ws = words.map(w => H.tw(w, sz)), tot = ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1); let x = (o.cx || 240) - tot / 2;
    return words.map((w, i) => { const s = { w, x, y: cy, wd: ws[i] }; x += ws[i] + gap; return s; }); };

  /* ------------------------------------------------------------ s28 · sub-word tokens */
  const TK = TR.tokens, MW = TK[2].t, UP = TR.wordsplit.unprofessionalism;
  SC.s28 = {
    copy: [
      { k: "Language models", m: "Transformers read text differently. It starts with how they cut it.", s: "Everything so far counted whole words.", l: "Cutting text" },
      { k: "Tokens", m: `A fixed list of about ${fmt(TR.vocab)} pieces.`, s: "Common words stay whole: nothing, complain, complaint.", l: `${fmt(TR.vocab)} pieces` },
      { k: "Rarer words", m: "Rarer words are split into pieces.", s: "midwives → mid + ##wives · attentive → at + ##ten + ##tive", l: "Sub-word pieces" },
      { k: "Never unknown", m: "Any word can be built from pieces.", s: "TF-IDF ignores a word it never saw. A transformer does not.", l: "No unknown words" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(30, 38, "real tokenizer of a small transformer (MiniLM)", 11.5, MUTED, "start", 700)}
<g class="a w28">${t(240, 76, "“Nothing to complain about.”", 19, INK, "middle", 800)}</g>
<g class="a o0 tk28a">${row(TK[0].t, 92).map((o, i) => `<g class="a pc28" style="transition-delay:${(i * .12).toFixed(2)}s">${tile(o.x, o.y, o.w, { size: 15, stroke: GOLD, fill: "#FFF6E3" })}</g>`).join("")}</g>
<g class="a o0 voc28"><rect x="330" y="20" width="126" height="40" rx="10" fill="${INK}"/>${t(393, 38, "vocabulary", 11, "#E7DDCB", "middle", 700)}${t(393, 54, fmt(TR.vocab) + " pieces", 13.5, GOLD, "middle", 800)}</g>
<g class="a o0 mw28">${t(240, 162, "“The midwives were attentive.”", 17, INK, "middle", 800)}
  ${row(MW, 174, { size: 14, gap: 5 }).map((o, i) => `<g class="a pc28" style="transition-delay:${(.4 + i * .12).toFixed(2)}s">${tile(o.x, o.y, o.w, { size: 14, stroke: o.w.startsWith("##") || o.w === "mid" || o.w === "at" ? TERRA : GOLD, fill: o.w.startsWith("##") || o.w === "mid" || o.w === "at" ? "#FCEFE9" : "#FFF6E3" })}</g>`).join("")}</g>
<g class="a o0 up28">${t(240, 240, "“unprofessionalism”", 17, INK, "middle", 800)}
  ${row(UP, 252, { size: 14, gap: 4 }).map((o, i) => `<g class="a pc28 upc" style="transition-delay:${(.3 + i * .18).toFixed(2)}s;transform:translateY(16px)">${tile(o.x, o.y, o.w, { size: 14, stroke: TERRA, fill: "#FCEFE9" })}</g>`).join("")}
  <rect x="40" y="298" width="186" height="40" rx="10" fill="#F1ECE2"/>${t(133, 315, "TF-IDF: never seen", 12, MUTED, "middle", 800)}${t(133, 331, "→ ignored", 13, TERRA, "middle", 800)}
  <rect x="254" y="298" width="186" height="40" rx="10" fill="#EAF5EE"/>${t(347, 315, "transformer", 12, MUTED, "middle", 800)}${t(347, 331, "→ 6 known pieces", 13, GREEN, "middle", 800)}</g>`,
    render(r, b) {
      H.show(r, ".tk28a", b >= 1); H.show(r, ".voc28", b >= 1);
      H.show(r, ".mw28", b >= 2); H.show(r, ".up28", b >= 3);
      H.q(r, ".upc").forEach(g => { g.style.opacity = b >= 3 ? 1 : 0; g.style.transform = b >= 3 ? "none" : "translateY(16px)"; });
    }
  };

  /* ------------------------------------------------------------ s29 · the transformer and attention (real weights) */
  const AT = TR.attention, ATK = AT.tokens, AW = AT.w, CI = ATK.indexOf("complain");
  const AX = (() => { const ws = ATK.map(w => H.tw(w, 14)), gap = 10, tot = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1); let x = 240 - tot / 2; return ATK.map((w, i) => { const c = x + ws[i] / 2; x += ws[i] + gap; return { w, x: c, wd: ws[i] }; }); })();
  SC.s29 = {
    copy: [
      { k: "The engine", m: "Inside these models: the transformer.", s: "Its key idea is attention.", l: "Transformer" },
      { k: "Attention", m: "Every token looks at every other token.", s: "And decides how much each one matters for its meaning.", l: "All-to-all" },
      { k: "Real attention weights", m: "“complain” looks at to, itself, and nothing.", s: `Layer ${AT.layer} of ${AT.layers}, MiniLM. [CLS] is a summary token.`, l: "Real weights" },
      { k: "Context", m: "TF-IDF threw “nothing” away. A transformer keeps it in view.", s: "Many layers of attention let context change meaning.", l: "Nothing is kept" },
      { k: "GPT", m: "Generative Pre-trained Transformer.", s: "The T in GPT.", l: "The T in GPT" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<g class="a stk29">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${170 + i * 4}" y="${60 + i * 26}" width="140" height="22" rx="6" fill="${NAVY}" fill-opacity="${.25 + i * .12}"/>`).join("")}${t(262, 244, "layers of attention", 13, NAVY, "middle", 800)}${t(262, 262, "MiniLM: 6 layers", 11.5, MUTED, "middle", 700)}</g>
<g class="a o0 tks29">${AX.map((o, i) => `${tile(o.x - o.wd / 2, 270, o.w, { size: 14, stroke: i === CI ? TERRA : (o.w.startsWith("[") ? GREY : NAVY), fill: i === CI ? "#FCEFE9" : "#fff", color: o.w.startsWith("[") ? MUTED : INK })}`).join("")}</g>
<g class="a o0 all29">${AX.map((a, i) => AX.map((b2, j) => j > i ? `<path d="M${a.x} 268 Q${(a.x + b2.x) / 2} ${268 - Math.abs(a.x - b2.x) * .55} ${b2.x} 268" fill="none" stroke="${GREY}" stroke-width="1.2" stroke-opacity=".5"/>` : "").join("")).join("")}</g>
<g class="a o0 real29">${AX.map((o, j) => j === CI ? "" : `<path class="dr" pathLength="1" d="M${AX[CI].x} 268 Q${(AX[CI].x + o.x) / 2} ${268 - Math.abs(AX[CI].x - o.x) * .6 - 20} ${o.x} 268" fill="none" stroke="${o.w === "nothing" ? TERRA : NAVY}" stroke-width="${(1 + AW[j] * 26).toFixed(1)}" stroke-opacity="${o.w.startsWith("[") ? .35 : .85}" stroke-linecap="round"/>${t(o.x, 300 + 10, AW[j].toFixed(2), 12, o.w === "nothing" ? TERRA : MUTED, "middle", 800)}`).join("")}
  <circle cx="${AX[CI].x}" cy="250" r="12" fill="none" stroke="${TERRA}" stroke-width="2.5"/>${t(AX[CI].x, 334, "self " + AW[CI].toFixed(2), 11, TERRA, "middle", 800)}</g>
<g class="a o0 lg29">${t(240, 56, "Where does “complain” look?", 20, INK, "middle", 800)}${t(240, 80, "real attention weights · MiniLM, layer " + AT.layer + " of " + AT.layers, 12.5, MUTED, "middle", 700)}${t(240, 102, "thicker line = more attention · the weights add up to 1", 12, MUTED, "middle", 600)}<rect x="150" y="118" width="180" height="30" rx="15" fill="#FCEFE9"/>${t(240, 138, "“nothing” gets " + AW[ATK.indexOf("nothing")].toFixed(2), 14, TERRA, "middle", 800)}</g>
<g class="a o0 vs29"><rect x="40" y="40" width="190" height="96" rx="12" fill="#F1ECE2"/>${t(135, 62, "TF-IDF sees", 12.5, MUTED, "middle", 800)}${tile(96, 76, "complain", { size: 14, stroke: GREY })}${t(135, 126, "“nothing” thrown away", 12, TERRA, "middle", 800)}
  <rect x="250" y="40" width="190" height="96" rx="12" fill="#EAF5EE"/>${t(345, 62, "transformer sees", 12.5, MUTED, "middle", 800)}${t(345, 98, "nothing ↔ complain", 15, GREEN, "middle", 800)}${t(345, 126, "context is kept", 12, GREEN, "middle", 800)}</g>
<g class="a o0 gpt29" style="transform:scale(1.5)"><rect x="96" y="100" width="288" height="80" rx="14" fill="${INK}"/>${["G", "P", "T"].map((c, i) => t(170 + i * 70, 148, c, 34, i === 2 ? GOLD : "#fff", "middle", 800)).join("")}${t(240, 170, "Generative · Pre-trained · Transformer", 12, "#E7DDCB", "middle", 700)}</g>`,
    render(r, b) {
      H.show(r, ".stk29", b === 0 || b === 4); H.show(r, ".tks29", b >= 1 && b <= 3);
      H.show(r, ".all29", b === 1); H.show(r, ".real29", b === 2 || b === 3); H.draw(r, ".real29 .dr", b >= 2);
      H.show(r, ".vs29", b === 3); H.show(r, ".lg29", b === 2);
      H.show(r, ".gpt29", b >= 4); H.tf(r, ".gpt29", b >= 4 ? "scale(1)" : "scale(1.5)");
    }
  };

  /* ------------------------------------------------------------ s26 (corrected) · embeddings, tested for real */
  const SM = TR.sim, SE = SM.emb, STF = SM.tfidf;
  const SENTS = [["Nothing to complain about.", GREEN], ["Very impressed with the whole visit.", GREEN], ["I will be making a complaint.", TERRA]];
  SC.s26 = {
    copy: [
      { k: "Embeddings", m: "Every sentence becomes a list of numbers.", s: "Similar meanings are meant to sit close together.", l: "Embeddings" },
      { k: "We tested it", m: "A small transformer (MiniLM), three real sentences.", s: "Closeness from 0 (unrelated) to 1 (the same).", l: "A real test" },
      { k: "The result", m: `${SE[0][2].toFixed(2)} with “making a complaint”, ${SE[0][1].toFixed(2)} with “very impressed”.`, s: "The shared word “complain” still pulled them together.", l: "Fooled by a word" },
      { k: "Bigger models", m: "TF-IDF: 0 for every pair. LLMs usually do better.", s: "And they can label sentiment with no training data from you.", l: "TF-IDF · LLMs" },
      { k: "Same rules", m: "Check it against 30 reviews you read yourself.", s: "Report the agreement. Never let it read the data for you.", l: "Still check" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="336" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${SENTS.map(([s, c], i) => `<g class="a o0 sc26" style="transition-delay:${i * .25}s"><rect x="${24 + i * 148}" y="26" width="140" height="58" rx="10" fill="#fff" stroke="${c}" stroke-width="2.5"/>${fo(30 + i * 148, 32, 128, 48, s, 12.5, INK, 700, "text-align:center")}${t(94 + i * 148, 100, "→ 384 numbers", 10.5, MUTED, "middle", 700)}</g>`).join("")}
<g class="a o0 ax26">${t(30, 128, "how close? (cosine similarity)", 12, MUTED, "start", 800)}
  ${[0, .25, .5, .75, 1].map(v => `<path d="M${200 + v * 240} 138 V258" stroke="#EEE8DC" stroke-width="1.5"/>${t(200 + v * 240, 272, v.toFixed(2), 10, MUTED, "middle", 600)}`).join("")}
  ${t(190, 162, "“nothing…” ↔ “making a complaint”", 11.5, INK, "end", 800)}${t(190, 226, "“nothing…” ↔ “very impressed”", 11.5, INK, "end", 800)}
  ${t(60, 182, "transformer", 10.5, NAVY, "start", 700)}${t(60, 246, "transformer", 10.5, NAVY, "start", 700)}</g>
${[[SE[0][2], 148, NAVY], [SE[0][1], 212, NAVY]].map(([v, y, c], i) => `<g class="a o0 eb26"><rect class="bar26" x="200" y="${y}" width="${(v * 240).toFixed(0)}" height="18" rx="4" fill="${i ? GREEN : TERRA}" style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform 1s ${(i * .4).toFixed(1)}s"/>${t(206 + v * 240, y + 14, v.toFixed(2), 13, INK, "start", 800)}</g>`).join("")}
${[[STF[0][2], 170], [STF[0][1], 234]].map(([v, y]) => `<g class="a o0 tb26"><rect x="200" y="${y}" width="3" height="14" fill="${GREY}"/>${t(210, y + 12, "TF-IDF " + v.toFixed(2), 11.5, MUTED, "start", 800)}</g>`).join("")}
<g class="a o0 pull26"><rect x="300" y="140" width="156" height="40" rx="10" fill="#FCEFE9" stroke="${TERRA}" stroke-width="2"/>${t(378, 158, "pulled together", 12, TERRA, "middle", 800)}${t(378, 173, "by the word “complain”", 11, TERRA, "middle", 700)}</g>
<g class="a o0 llm26" style="transform:translateY(12px)"><rect x="258" y="282" width="198" height="56" rx="12" fill="${INK}"/>${fo(268, 288, 180, 48, "Large language model (illustration): “Nothing to complain about.” → <b style='color:#9EE6B8'>positive</b>", 11.5, "#fff", 600)}</g>
<g class="a o0 ck26" style="transform:translateY(12px)"><rect x="24" y="282" width="226" height="56" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2.5"/>${person(48, 330, NAVY, .8)}${fo(66, 288, 180, 48, "Check against 30 reviews you read. Report the agreement.", 12, INK, 700)}</g>`,
    render(r, b) {
      H.show(r, ".sc26", true); H.show(r, ".ax26", b >= 1);
      H.show(r, ".eb26", b >= 2); H.q(r, ".bar26").forEach(e => { e.style.transform = b >= 2 ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".pull26", b === 2); H.delay(r, ".pull26", b === 2 ? 1.4 : 0);
      H.show(r, ".tb26", b >= 3);
      H.show(r, ".llm26", b >= 3); H.tf(r, ".llm26", b >= 3 ? "none" : "translateY(12px)");
      H.show(r, ".ck26", b >= 4); H.tf(r, ".ck26", b >= 4 ? "none" : "translateY(12px)");
    }
  };

  /* ------------------------------------------------------------ s30 · BERTopic (real pipeline on 5,200 reviews) */
  const BT = TR.bertopic, TPS = BT.topics, MAP = TR.map, PAL = [NAVY, TERRA, GREEN, GOLD, PURPLE, TEAL, "#B5651D", "#4F7CAC"];
  const NEG = TPS.reduce((a, b) => b.compl > a.compl ? b : a), POS = TPS.filter(x => x.words.join(" ").includes("kindness")).reduce((a, b) => b.compl < a.compl ? b : a, { compl: 99 });
  const SZ = BT.sizes, OUT = BT.outliers, PCT = Math.round(100 * OUT / 5200);
  const STEPS = [["1", "Embed", "every review → numbers"], ["2", "UMAP", "squeeze to 5 dims"], ["3", "HDBSCAN", "find dense groups"], ["4", "c-TF-IDF", "name each group"]];
  SC.s30 = {
    copy: [
      { k: "BERTopic", m: "Topics from embeddings, in four steps.", s: "Embed, squeeze, cluster, describe.", l: "Four steps" },
      { k: "Steps 1–3", m: "Embed. Squeeze with UMAP. Cluster with HDBSCAN.", s: "HDBSCAN is a cousin of DBSCAN from Week 12.", l: "Dense groups" },
      { k: "Step 4", m: "Describe each group by its most distinctive words.", s: "A class-based TF-IDF: one big document per group.", l: "Name the groups" },
      { k: "On our reviews", m: `${TPS.length} topics, much finer than NMF's 4.`, s: `“Felt ignored”: ${NEG.compl}% complaints. “Real kindness”: ${POS.compl}%.`, l: `${TPS.length} topics` },
      { k: "Settings decide", m: `${fmt(OUT)} reviews (${PCT}%) left as outliers.`, s: `Minimum topic size ${SZ[0][0]}: ${SZ[0][1]} topics · ${SZ[2][0]}: none at all.`, l: "Choose, report, read" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${STEPS.map(([n, h, s], i) => `<g class="st30" data-i="${i}" style="transition:opacity .5s"><rect class="sr30" x="${12 + i * 116}" y="12" width="108" height="50" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2" style="transition:stroke .4s"/>
  <circle cx="${28 + i * 116}" cy="30" r="9" fill="${NAVY}"/>${t(28 + i * 116, 34, n, 11, "#fff")}${t(42 + i * 116, 34, h, 13, INK, "start", 800)}${t(66 + i * 116, 52, s, 9.5, MUTED, "middle", 700)}${i < 3 ? t(122 + i * 116, 42, "›", 18, MUTED, "middle", 800) : ""}</g>`).join("")}
<rect x="12" y="72" width="226" height="276" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(24, 92, "700 reviews on a 2-D map (UMAP)", 10.5, MUTED, "start", 700)}
${MAP.map((p, i) => { const x = 26 + p[0] * 198, y = 106 + (1 - p[1]) * 226; return `<circle class="mp30" data-k="${p[2]}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" style="fill:${GREY};fill-opacity:.55;transition:fill .7s ${(i % 50 * .01).toFixed(2)}s,fill-opacity .7s"/>`; }).join("")}
<g class="a o0 ol30">${t(225, 340, "grey = outliers", 10.5, MUTED, "end", 700)}</g>
<g class="a o0 wd30">${[NEG, POS].map((tp, i) => `<rect x="246" y="${74 + i * 92}" width="222" height="84" rx="12" fill="#fff" stroke="${i ? GREEN : TERRA}" stroke-width="2.5"/>${t(258, 94 + i * 92, "top words", 10.5, MUTED, "start", 800)}
  ${fo(256, 100 + i * 92, 204, 54, tp.words.slice(0, 5).join(" · "), 12.5, i ? GREEN : TERRA, 800)}`).join("")}</g>
<g class="a o0 tc30">${[[NEG, TERRA, "“felt ignored”"], [POS, GREEN, "“real kindness”"]].map(([tp, c, n], i) => `${t(458, 94 + i * 92, n, 12, c, "end", 800)}${t(258, 150 + i * 92, `${fmt(tp.n)} reviews · satisfaction ${tp.sat} · complaints ${tp.compl}%`, 10.5, INK, "start", 700)}`).join("")}
  <rect x="246" y="262" width="222" height="40" rx="10" fill="${INK}"/>${t(357, 287, `${TPS.length} topics found, by itself`, 13.5, GOLD, "middle", 800)}</g>
<g class="a o0 sz30" style="transform:translateY(12px)"><rect x="246" y="74" width="222" height="274" rx="14" fill="#fff" stroke="${TERRA}" stroke-width="2.5"/>
  ${t(357, 98, "one setting, three answers", 13, TERRA, "middle", 800)}${t(270, 124, "min. topic size", 11, MUTED, "start", 800)}${t(392, 124, "topics", 11, MUTED, "middle", 800)}${t(446, 124, "outliers", 11, MUTED, "end", 800)}
  ${SZ.slice(0, 3).map(([m, n, o], i) => `<rect x="258" y="${134 + i * 40}" width="198" height="32" rx="8" fill="${m === BT.minSize ? "#FCEFE9" : "#F7F4EE"}"/>${t(286, 155 + i * 40, m, 15, INK, "middle", 800)}${t(392, 155 + i * 40, n, 16, n ? NAVY : TERRA, "middle", 800)}${t(446, 155 + i * 40, fmt(o), 13, MUTED, "end", 700)}`).join("")}
  ${fo(258, 260, 200, 80, `With ${BT.minSize}: ${fmt(OUT)} reviews (${PCT}%) are outliers. Choose the setting, report it, and read the reviews in each topic.`, 12, INK, 600)}</g>`,
    render(r, b) {
      const act = [[0, 1, 2, 3], [0, 1, 2], [3], [], []][b] || [];
      H.q(r, ".st30").forEach(g => { const i = +g.dataset.i; g.style.opacity = b >= 3 || act.includes(i) || b === 0 ? 1 : .35; g.querySelector(".sr30").style.stroke = b > 0 && b < 3 && act.includes(i) ? TERRA : ""; g.querySelector(".sr30").style.strokeWidth = b > 0 && b < 3 && act.includes(i) ? "3" : ""; });
      H.q(r, ".mp30").forEach(e => { const k = +e.dataset.k, on = b >= 1 && k >= 0; e.style.fill = on ? PAL[k % PAL.length] : GREY; e.style.fillOpacity = on ? .9 : (b >= 1 ? .3 : .55); });
      H.show(r, ".ol30", b >= 1);
      H.show(r, ".wd30", b === 2 || b === 3); H.show(r, ".tc30", b === 3);
      H.show(r, ".sz30", b >= 4); H.tf(r, ".sz30", b >= 4 ? "none" : "translateY(12px)");
    }
  };
})();
