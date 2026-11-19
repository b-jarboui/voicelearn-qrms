/* Text analytics, part E (17 Nov 2026): s31 "How BERTopic works, step by step" — a conceptual walkthrough of the
   process with eight real review sentences (positions and groups are an illustration of the logic, marked on screen),
   and a shorter s30 that now only shows what the process found on the 5,200 reviews. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, tile } = H;

  /* ------------------------------------------------------------ s31 · how BERTopic works */
  const REV = [
    ["I felt completely ignored.", 0], ["Nobody told us why the delay was so long.", 0], ["The waiting time was far too long.", 0],
    ["I was treated with real kindness.", 1], ["The staff were outstanding.", 1], ["Thank you to the whole team.", 1], ["Excellent care from start to finish.", 1],
    ["The care itself was fine.", -1]];
  const COL = [TERRA, GREEN], NAME = ["Waiting without information", "People and kindness"];
  const FIN = [[300, 120], [338, 104], [322, 150], [404, 214], [432, 240], [392, 252], [444, 206], [262, 262]];   // final 2-D map positions
  const CLOUD = [[250, 230], [440, 120], [300, 280], [270, 110], [460, 280], [350, 200], [240, 160], [420, 170]]; // scattered "high-dimensional" start
  const STEP = [["1", "Embed"], ["2", "UMAP"], ["3", "HDBSCAN"], ["4", "c-TF-IDF"], ["5", "You name it"]];
  const WORDS = [["long", "delay", "waiting", "told", "ignored"], ["kindness", "staff", "team", "thank", "excellent"]];
  const bar = (x, y, seed) => { let s = seed * 9301 + 49297, out = ""; for (let i = 0; i < 24; i++) { s = (s * 9301 + 49297) % 233280; const h = 4 + (s / 233280) * 14; out += `<rect x="${x + i * 3}" y="${y + 18 - h}" width="2" height="${h.toFixed(1)}" fill="${NAVY}" fill-opacity=".7"/>`; } return out; };
  SC.s31 = {
    copy: [
      { k: "How BERTopic works", m: "Follow eight real excerpts through the whole process.", s: "Five steps, no code.", l: "Eight excerpts" },
      { k: "Step 1 · Embedding", m: "A transformer turns each review into 384 numbers.", s: "An address in meaning space: similar meanings, nearby addresses.", l: "Reviews → addresses" },
      { k: "Step 2 · UMAP", m: "Squeeze 384 dimensions down to a few.", s: "Local neighbourhoods are approximately preserved.", l: "384 → a map" },
      { k: "Step 3 · HDBSCAN", m: "Crowded areas become topics. Lonely reviews are outliers.", s: "No review is forced into a group.", l: "Crowds = topics" },
      { k: "Step 4 · class-based TF-IDF", m: "Join each topic into one long document. Find its distinctive words.", s: "Frequent in this topic, rare in the others.", l: "Key words" },
      { k: "Step 5 · Your part", m: "Read the words and the reviews. Then name the topic.", s: "The method finds the groups. You decide what they mean.", l: "You name it" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${STEP.map(([n, h], i) => `<g class="sp31" data-i="${i}" style="transition:opacity .4s"><rect class="spr31" x="${10 + i * 93}" y="10" width="88" height="30" rx="15" fill="#fff" stroke="${EDGE}" stroke-width="2" style="transition:fill .4s,stroke .4s"/><circle cx="${26 + i * 93}" cy="25" r="9" fill="${NAVY}"/>${t(26 + i * 93, 29, n, 11, "#fff")}${t(39 + i * 93, 30, h, 12, INK, "start", 800)}</g>`).join("")}
${t(470, 352, "illustration of the process · real review sentences", 10, MUTED, "end", 700)}
<!-- the eight review cards (left) -->
${REV.map(([s], i) => `<g class="rc31" data-i="${i}" style="transition:opacity .6s,transform .9s cubic-bezier(.3,.8,.25,1)"><rect x="10" y="${50 + i * 36}" width="196" height="30" rx="8" fill="#fff" stroke="${EDGE}" stroke-width="1.5"/>${fo(16, 52 + i * 36, 186, 28, s, 11, INK, 700, "display:flex;align-items:center;height:28px;line-height:1.1")}</g>`).join("")}
<!-- step 1: number strips -->
${REV.map((_, i) => `<g class="br31" style="opacity:0;transition:opacity .5s ${(i * .12).toFixed(2)}s">${bar(212, 54 + i * 36, i + 1)}<path d="M286 ${65 + i * 36} h8" stroke="${MUTED}" stroke-width="1.5"/></g>`).join("")}
<g class="a o0 lb31">${t(250, 340, "384 numbers per review", 11, NAVY, "middle", 800)}</g>
<!-- the map -->
<rect class="mapbg31" x="226" y="50" width="244" height="240" rx="12" fill="#fff" stroke="${EDGE}" stroke-width="2" style="opacity:0;transition:opacity .5s"/>
<g class="a o0 mt31">${t(348, 70, "", 12, MUTED, "middle", 800, "mtt31")}</g>
<g class="a o0 hulls31"><ellipse cx="318" cy="126" rx="44" ry="38" fill="${TERRA}" fill-opacity=".1" stroke="${TERRA}" stroke-width="2.5" stroke-dasharray="6 4"/><ellipse cx="418" cy="228" rx="46" ry="40" fill="${GREEN}" fill-opacity=".1" stroke="${GREEN}" stroke-width="2.5" stroke-dasharray="6 4"/>
  ${t(318, 178, "topic A", 12, TERRA, "middle", 800)}${t(418, 282, "topic B", 12, GREEN, "middle", 800)}${t(262, 284, "outlier", 11, MUTED, "middle", 800)}</g>
${REV.map(([, g], i) => `<circle class="pt31" data-i="${i}" cx="0" cy="0" r="7" style="opacity:0;fill:${NAVY};transition:transform 1.3s cubic-bezier(.3,.8,.25,1) ${(i * .06).toFixed(2)}s,fill .6s,opacity .5s"/>`).join("")}
<!-- step 4: one long document per topic → distinctive words -->
<g class="a o0 ct31" style="transform:translateY(12px)">${[0, 1].map(k => `<rect x="${226 + k * 124}" y="50" width="118" height="240" rx="12" fill="#fff" stroke="${COL[k]}" stroke-width="2.5"/>${t(285 + k * 124, 70, "topic " + "AB"[k] + " · one document", 11, COL[k], "middle", 800)}
  ${[0, 1, 2, 3, 4].map(j => `<rect x="${236 + k * 124}" y="${82 + j * 9}" width="${98 - (j % 2) * 18}" height="5" rx="2" fill="#E3DCCD"/>`).join("")}
  ${t(285 + k * 124, 144, "distinctive words", 10.5, MUTED, "middle", 800)}
  ${WORDS[k].map((w, j) => `<g class="cw31" style="transition:opacity .4s ${(.6 + j * .25).toFixed(2)}s;opacity:0"><rect x="${238 + k * 124}" y="${152 + j * 26}" width="${(84 - j * 12)}" height="18" rx="4" fill="${COL[k]}" fill-opacity="${.85 - j * .12}"/>${t(242 + k * 124, 165 + j * 26, w, 11.5, "#fff", "start", 800)}</g>`).join("")}`).join("")}</g>
<!-- step 5: you name it -->
<g class="a o0 nm31" style="transform:scale(.9)">${[0, 1].map(k => `<rect x="${230 + k * 2}" y="${84 + k * 110}" width="236" height="44" rx="22" fill="${COL[k]}"/>${t(348, 112 + k * 110, "“" + NAME[k] + "”", 14, "#fff", "middle", 800)}`).join("")}
  ${person(270, 330, NAVY, 1)}${fo(292, 292, 172, 50, "Read the reviews behind the words first. Then name.", 12, INK, 700)}</g>`,
    render(r, b) {
      H.q(r, ".sp31").forEach(g => { const i = +g.dataset.i, on = b === i + 1, done = b > i + 1; g.style.opacity = b === 0 || on || done ? 1 : .4; const rc = g.querySelector(".spr31"); rc.style.fill = on ? "#FCEFE9" : done ? "#EAF5EE" : "#fff"; rc.style.stroke = on ? TERRA : done ? GREEN : ""; });
      // cards: visible in steps 0–1, then fade to the side
      H.q(r, ".rc31").forEach(g => { const i = +g.dataset.i; g.style.opacity = b <= 1 ? 1 : b <= 3 ? .35 : .25; g.style.transform = "none";
        const rc = g.querySelector("rect"); rc.style.stroke = b >= 3 ? (REV[i][1] >= 0 ? COL[REV[i][1]] : GREY) : ""; rc.style.strokeWidth = b >= 3 ? "2.5" : ""; });
      H.q(r, ".br31").forEach(e => { e.style.opacity = b === 1 ? 1 : 0; }); H.show(r, ".lb31", b === 1);
      r.querySelector(".mapbg31").style.opacity = b >= 1 && b <= 3 ? 1 : 0;
      H.show(r, ".mt31", b >= 1 && b <= 3); r.querySelector(".mtt31").textContent = b === 1 ? "meaning space: 384 dimensions (cannot be drawn)" : b === 2 ? "after UMAP: a map you can see" : "dense crowds → topics";
      H.q(r, ".pt31").forEach(e => { const i = +e.dataset.i, g = REV[i][1], p = b >= 2 ? FIN[i] : CLOUD[i];
        e.style.opacity = b >= 1 && b <= 3 ? (b === 1 ? .55 : 1) : 0; e.style.transform = `translate(${p[0]}px,${p[1]}px)`;
        e.style.fill = b >= 3 ? (g >= 0 ? COL[g] : GREY) : NAVY; e.setAttribute("r", b === 1 ? 11 : 7); });
      H.show(r, ".hulls31", b === 3);
      H.show(r, ".ct31", b === 4); H.tf(r, ".ct31", b === 4 ? "none" : "translateY(12px)"); H.q(r, ".cw31").forEach(e => { e.style.opacity = b === 4 ? 1 : 0; });
      H.show(r, ".nm31", b >= 5); H.tf(r, ".nm31", b >= 5 ? "none" : "scale(.9)");
    }
  };

  /* ------------------------------------------------------------ s30 (shorter) · what the process found on 5,200 reviews */
  const base = SC.s30, TPS = window.W13X.tr.bertopic.topics, BT = window.W13X.tr.bertopic;
  const NEG = TPS.reduce((a, b) => b.compl > a.compl ? b : a), POS = TPS.filter(x => x.words.join(" ").includes("kindness")).reduce((a, b) => b.compl < a.compl ? b : a, { compl: 99 });
  const SZ = BT.sizes, PCT = Math.round(100 * BT.outliers / 5200);
  SC.s30 = {
    svg: base.svg,
    copy: [
      { k: "BERTopic on our reviews", m: "The same five steps, on all 5,200 reviews.", s: "The map shows a sample of 700 reviews.", l: "5,200 reviews" },
      { k: "The topics", m: `${TPS.length} topics, at minimum group size 60.`, s: "Much finer than the 4 topics from NMF.", l: `${TPS.length} topics` },
      { k: "Two examples", m: `“Felt ignored”: ${NEG.compl}% complaints. “Real kindness”: ${POS.compl}%.`, s: "Each named only after reading its words and reviews.", l: "Two topics" },
      { k: "Outliers and settings", m: `${PCT}% of reviews are outliers. One setting changes everything.`, s: `Minimum topic size ${SZ[0][0]}: ${SZ[0][1]} topics · ${SZ[2][0]}: none at all.`, l: "Settings decide" },
      { k: "So", m: "Choose the setting, report it, and read the reviews.", s: "", l: "Choose · report · read" }
    ],
    render(r, b) { base.render(r, [0, 1, 3, 4, 4][b]); if (b === 2) { /* show the two topic cards */ H.show(r, ".wd30", true); H.show(r, ".tc30", true); H.show(r, ".sz30", false); } if (b === 1) { H.show(r, ".tc30", false); H.show(r, ".wd30", false); } }
  };
})();
