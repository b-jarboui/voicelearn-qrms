/* Text analytics animated scenes, part B (s11–s20). Uses window.SCH helpers from scenes-a.js. */
(function () {
  "use strict";
  const SC = window.SC, H = window.SCH, D = window.W13DATA;
  const { NAVY, TERRA, GREEN, GOLD, INK, SKY, MUTED, GREY, PAPER, EDGE } = H.C;
  const { t, fo, person, tile, bubble } = H;
  const fmt = n => n.toLocaleString("en-US");

  /* ------------------------------------------------------------ s12 · fit on train, transform on test */
  const pile = (x, y, n, col, cls) => `<g class="${cls}">${[0, 1, 2, 3].map(i => `<rect x="${x + i * 4}" y="${y - i * 4}" width="74" height="52" rx="6" fill="#fff" stroke="${col}" stroke-width="2"/>`).join("")}
    ${[0, 1, 2].map(i => `<rect x="${x + 22}" y="${y - 2 + i * 10}" width="${44 - i * 8}" height="4" rx="2" fill="${col}" fill-opacity=".5"/>`).join("")}${t(x + 49, y + 60, n, 13, col, "middle", 800)}</g>`;
  const WORDS12 = ["staff", "outstanding", "waited", "kindness", "attentive", "long", "team", "complaint"];
  SC.s12 = {
    copy: [
      { k: "Line 14", m: "Split first: 3,900 to train, 1,300 locked away.", s: "train_test_split(…, test_size=0.25, random_state=42)", l: "Split first" },
      { k: "Line 18 · fit_transform", m: "The vectoriser learns its vocabulary from training reviews only.", s: `Here: ${D.vocabTrain} terms.`, l: `fit on train · ${D.vocabTrain} terms` },
      { k: "Line 19 · transform", m: "Test reviews pass through the same vocabulary. Nothing new is learned.", s: "A word the training reviews never used is ignored.", l: "transform the test rows" },
      { k: "The classic mistake", m: "Fit on all the reviews, before the split.", s: `Now the test rows helped choose the features (${D.vocabAll} terms).`, l: "Leak ✗" },
      { k: "The rule", m: "The order is the method.", s: "fit_transform on train · transform on test.", l: "Order = method" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<g class="a all12">${pile(18, 54, "5,200 reviews", MUTED, "")}</g>
<g class="a o0 tr12">${pile(18, 54, "3,900 · train", NAVY, "")}</g>
<g class="a o0 te12" style="transform:translate(0,0)">${pile(18, 54, "1,300 · test", TERRA, "")}
  <g class="lk12"><rect x="44" y="34" width="22" height="16" rx="3" fill="${INK}"/><path d="M49 34 v-6 a6 6 0 0 1 12 0 v6" fill="none" stroke="${INK}" stroke-width="3"/></g></g>
<g class="a o0 book" style="transform:scale(.6)">
  <path d="M190 120 q50 -18 50 0 v100 q0 -18 -50 0 z" fill="#fff" stroke="${NAVY}" stroke-width="3"/><path d="M290 120 q-50 -18 -50 0 v100 q0 -18 50 0 z" fill="#fff" stroke="${NAVY}" stroke-width="3"/>
  ${[0, 1, 2, 3, 4].map(i => `<path d="M198 ${136 + i * 14} h34 M248 ${136 + i * 14} h34" stroke="${SKY}" stroke-width="4" stroke-linecap="round"/>`).join("")}
  ${t(240, 246, "vectoriser · vocabulary", 12.5, NAVY, "middle", 800)}${t(240, 270, "", 22, NAVY, "middle", 800, "voc12")}
</g>
<g class="flow12">${WORDS12.map((w, i) => `<g class="fw" style="opacity:0">${tile(110, 196 + (i % 3) * 4, w, { size: 11, h: 20 })}</g>`).join("")}</g>
<g class="a o0 lab1">${t(152, 110, "fit_transform(train)", 13, NAVY, "middle", 800)}</g>
<g class="a o0 rows12"><rect x="330" y="230" width="136" height="106" rx="10" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(398, 250, "test rows → numbers", 12, TERRA, "middle", 800)}
  ${[0, 1, 2, 3, 4].map(i => [0, 1, 2, 3, 4, 5].map(j => `<rect x="${342 + j * 20}" y="${260 + i * 14}" width="16" height="10" rx="2" fill="${(i * 5 + j * 3) % 7 < 2 ? TERRA : "#EDE6DA"}"/>`).join("")).join("")}</g>
<g class="a o0 lab2">${t(398, 222, "transform(test)", 13, TERRA, "middle", 800)}<path class="dr ar2" pathLength="1" d="M100 290 C 180 330, 240 300, 250 250" fill="none" stroke="${TERRA}" stroke-width="3" stroke-dasharray="1"/><path class="dr ar3" pathLength="1" d="M300 200 C 330 210, 340 220, 360 228" fill="none" stroke="${TERRA}" stroke-width="3"/>
  <g class="new12">${tile(250, 316, "new word", { size: 11, h: 20, stroke: GREY, color: MUTED })}${t(306, 331, "ignored", 11, MUTED, "start", 700)}</g></g>
<g class="a o0 bad12"><path class="dr ar4" pathLength="1" d="M70 240 C 120 120, 160 110, 200 150" fill="none" stroke="${TERRA}" stroke-width="5"/>
  <g transform="rotate(-5 380 80)"><rect x="300" y="52" width="164" height="56" rx="10" fill="#fff" stroke="${TERRA}" stroke-width="3.5"/>${t(382, 76, "✗ fitted on ALL rows", 15, TERRA, "middle", 800)}${t(382, 98, "test rows chose features", 12.5, INK, "middle", 700)}</g></g>
<g class="a o0 code12"><rect x="140" y="296" width="326" height="52" rx="8" fill="${INK}"/>
  <text x="152" y="317" font-family="Consolas,monospace" font-size="12.5" fill="#F6B8A0">X_tr = vec.fit_transform(text.iloc[tr])</text>
  <text x="152" y="337" font-family="Consolas,monospace" font-size="12.5" fill="#F6B8A0">X_te = vec.transform(text.iloc[te])</text></g>`,
    render(r, b) {
      const alive = H.alive(r); clearInterval(r._t12);
      H.show(r, ".all12", b === 0); H.delay(r, ".all12", 0);
      H.show(r, ".tr12", b >= 0); H.delay(r, ".tr12", b === 0 ? 1 : 0); H.tf(r, ".tr12", "translate(0px,88px)");
      H.show(r, ".te12", b >= 0); H.delay(r, ".te12", b === 0 ? 1.4 : 0); H.tf(r, ".te12", "translate(0px,212px)");
      H.show(r, ".book", b >= 1); H.tf(r, ".book", b >= 1 ? "none" : "scale(.6)");
      H.show(r, ".lab1", b >= 1 && b !== 3);
      const v = r.querySelector(".voc12"); if (b >= 1) H.count(v, b === 3 ? D.vocabAll : D.vocabTrain, 1500, x => Math.round(x) + " terms");
      const fw = H.q(r, ".fw");
      fw.forEach(g => { g.style.transition = "none"; g.style.opacity = 0; });
      if (b === 1 || b === 3) { let k = 0; const tick = () => { if (!alive()) { clearInterval(r._t12); return; } const g = fw[k % fw.length]; k++;
          g.style.transition = "none"; g.style.opacity = 1; g.style.transform = b === 3 && k % 2 ? "translate(-10px,100px)" : "none"; void g.getBoundingClientRect();
          g.style.transition = "transform 1.4s ease-in, opacity 1.4s ease-in"; g.style.transform = "translate(110px,-40px) scale(.6)"; g.style.opacity = 0; };
        r._t12 = setInterval(tick, 420); }
      H.show(r, ".rows12", b === 2); H.show(r, ".lab2", b === 2); H.draw(r, ".ar2,.ar3", b === 2);
      H.show(r, ".bad12", b === 3); H.draw(r, ".ar4", b === 3);
      H.show(r, ".code12", b >= 4);
    }
  };

  /* ------------------------------------------------------------ s13 · fix a broken script (activity) */
  const CODE = [
    [17, 'vec = TfidfVectorizer(min_df=5, ngram_range=(1, 2), stop_words="english")'],
    [18, "X_tr = vec.transform(text.iloc[tr])"],
    [19, "X_te = vec.transform(text.iloc[te])"],
    [20, 'print("vocabulary:", len(vec.get_feature_names_out()), "terms")'],
    [22, "model = Ridge(alpha=1.0, random_state=42).fit(X_tr, y[tr])"],
    [23, 'print("held-out R2:", round(r2_score(y[te], model.predict(X_te)), 3))']];
  SC.s13 = {
    copy: [
      { k: "Your turn", m: "This script will not run. Read the error first.", s: "Error type, line, cause, fix: write all four down.", l: "NotFittedError" },
      { k: "Your turn", m: "Find the line, then choose the fix.", s: "Then press Continue.", l: "Find and fix" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="10" y="12" width="460" height="214" rx="12" fill="#1E2430"/>
<circle cx="28" cy="28" r="5" fill="#E86A5A"/><circle cx="44" cy="28" r="5" fill="${GOLD}"/><circle cx="60" cy="28" r="5" fill="#6CCB92"/>${t(250, 32, "review_features.py", 12, "#A9B2C0", "middle", 700)}
${CODE.map(([n, s], i) => `<g class="ln" data-n="${n}"><rect class="lnb" x="14" y="${46 + i * 29}" width="452" height="26" rx="4" fill="transparent" style="transition:fill .4s"/>
  <text x="34" y="${64 + i * 29}" font-family="Consolas,monospace" font-size="12" fill="#6B7383" text-anchor="end">${n}</text>
  <text class="lt" x="44" y="${64 + i * 29}" font-family="Consolas,monospace" font-size="${s.length > 60 ? 10.4 : 12}" fill="#E6EAF0">${s.replace(/</g, "&lt;")}</text></g>`).join("")}
<rect class="outbox" x="10" y="236" width="460" height="112" rx="12" fill="#2A1A18"/>
${t(24, 258, "Output", 12, "#A9B2C0", "start", 700)}
<g class="err"><text x="24" y="282" font-family="Consolas,monospace" font-size="11.5" fill="#F6B8A0">  File "review_features.py", line 18, in &lt;module&gt;</text>
  <text x="24" y="304" font-family="Consolas,monospace" font-size="11.5" fill="#FF8A75" font-weight="700">sklearn.exceptions.NotFittedError:</text>
  <text x="24" y="324" font-family="Consolas,monospace" font-size="11.5" fill="#FF8A75" font-weight="700">The TF-IDF vectorizer is not fitted</text></g>
<g class="okout" style="opacity:0;transition:opacity .6s .6s"><text x="24" y="290" font-family="Consolas,monospace" font-size="13" fill="#9EE6B8">vocabulary: ${D.vocabTrain} terms</text>
  <text x="24" y="314" font-family="Consolas,monospace" font-size="13" fill="#9EE6B8">held-out R2: 0.739</text></g>`,
    pick(r, n) { H.q(r, ".ln").forEach(g => { g.querySelector(".lnb").style.fill = +g.dataset.n === n ? (n === 18 ? "rgba(232,176,75,.3)" : "rgba(255,255,255,.12)") : "transparent"; }); },
    fix(r, ok) {
      const g = H.q(r, ".ln").find(x => x.dataset.n === "18"); if (!g) return;
      const lt = g.querySelector(".lt");
      if (ok) { lt.textContent = "X_tr = vec.fit_transform(text.iloc[tr])"; lt.style.fill = "#9EE6B8"; g.querySelector(".lnb").style.fill = "rgba(108,203,146,.22)";
        H.show(r, ".err", false); r.querySelector(".okout").style.opacity = 1; r.querySelector(".outbox").style.fill = "#16261D"; }
    },
    render(r, b) { r.querySelector(".err").style.transition = "opacity .5s"; }
  };

  /* ------------------------------------------------------------ s14 · results */
  const RES = [["review text alone", .739, TERRA], ["six operational measures", .806, NAVY], ["both together", .868, GREEN], ["text, vectoriser leaked", .739, GREY]];
  SC.s14 = {
    copy: [
      { k: "Held-out R² · 1,300 test episodes", m: "The review text alone: 0.739.", s: "About 74% of the variation in satisfaction.", l: "text 0.739" },
      { k: "Held-out R²", m: "Six operational measures: 0.806.", s: "Wait, staffing, training, occupancy, handoffs, prior visits.", l: "operations 0.806" },
      { k: "Held-out R²", m: "Both together: 0.868. The text adds +0.062.", s: "Observed increase on the same held-out episodes.", l: "both 0.868 (+0.062)" },
      { k: "The leak", m: "Vectoriser fitted on all rows: also 0.739.", s: "The rounded test score is unchanged.", l: "leaked 0.739 = honest" },
      { k: "Why, and why the rule stands", m: "Thirty sentences → a vocabulary that barely moves.", s: "The vocabulary changed even with equal rounded scores.", l: `${D.vocabTrain} vs ${D.vocabAll} terms` }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
<rect x="12" y="12" width="456" height="206" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(24, 34, "held-out R², same 1,300 episodes", 12.5, MUTED, "start", 800)}
${[0, .2, .4, .6, .8, 1].map(v => `<path d="M${180 + v * 270} 44 V206" stroke="#EEE8DC" stroke-width="1.5"/>${t(180 + v * 270, 214, v.toFixed(1), 9.5, MUTED, "middle", 600)}`).join("")}
${RES.map(([s, v, c], i) => `<g class="a o0 rr14">${t(172, 70 + i * 40, s, 13, INK, "end", 700)}
  <rect class="rb" x="180" y="${54 + i * 40}" width="${(v * 270).toFixed(0)}" height="24" rx="4" fill="${c}" ${i === 3 ? `fill-opacity=".35" stroke="${MUTED}" stroke-dasharray="5 3" stroke-width="2"` : ""} style="transform-box:fill-box;transform-origin:left;transform:scaleX(0);transition:transform 1.1s"/>
  ${t(186 + v * 270, 71 + i * 40, v.toFixed(3), 13, INK, "start", 800)}</g>`).join("")}
<g class="a o0 plus14"><path d="M380 74 h14 v40 h-14" fill="none" stroke="${GREEN}" stroke-width="2.5"/>${t(398, 100, "", 12, GREEN, "start", 800)}</g>
<g class="a o0 eq14"><path d="M379 74 C 420 90, 420 170, 379 182" fill="none" stroke="${MUTED}" stroke-width="2" stroke-dasharray="4 3"/>${t(414, 132, "same", 12, MUTED, "middle", 800)}</g>
<g class="a o0 why14" style="transform:translateY(12px)">
  <rect x="12" y="230" width="220" height="118" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>${t(122, 252, "this file", 13, NAVY, "middle", 800)}
  ${t(122, 284, `${D.nSent} sentences`, 20, NAVY, "middle", 800)}${t(122, 310, `${D.vocabTrain} terms (train) · ${D.vocabAll} (all)`, 12.5, INK, "middle", 700)}${t(122, 332, "the leak has almost nothing to add", 11.5, MUTED, "middle", 600)}
  <rect x="248" y="230" width="220" height="118" rx="14" fill="${INK}"/>${t(358, 252, "evaluation design", 13, GOLD, "middle", 800)}
  ${fo(262, 262, 194, 84, "Fitting before the split exposes the vocabulary to test reviews. The size and direction of a score change can vary.", 12.5, "#fff", 400)}
</g>`,
    render(r, b) {
      H.q(r, ".rr14").forEach((g, i) => { const on = b >= i || (b === 4); g.style.opacity = on ? 1 : 0; g.querySelector(".rb").style.transform = on ? "scaleX(1)" : "scaleX(0)"; });
      H.show(r, ".plus14", b === 2); const pl = r.querySelector(".plus14 text"); pl.textContent = "+0.062";
      H.show(r, ".eq14", b === 3); H.delay(r, ".eq14", b === 3 ? 1.2 : 0);
      H.show(r, ".why14", b >= 4); H.tf(r, ".why14", b >= 4 ? "none" : "translateY(12px)");
    }
  };
  // place the +0.062 bracket between the operations bar end and the both bar end
  (function () { const o = 180 + .806 * 270, n = 180 + .868 * 270; SC.s14.svg = SC.s14.svg.replace('<path d="M380 74 h14 v40 h-14"', `<path d="M${o.toFixed(0)} 116 h0 M${o.toFixed(0)} 112 V150 M${n.toFixed(0)} 150 V112 M${o.toFixed(0)} 112 H${n.toFixed(0)}"`).replace(`${t(398, 100, "", 12, GREEN, "start", 800)}`, `${t(((o + n) / 2).toFixed(0), 108, "", 12, GREEN, "middle", 800)}`).replace('M379 74 C 420 90, 420 170, 379 182', `M${(180 + .739 * 270 + 46).toFixed(0)} 66 C 440 90, 440 170, ${(180 + .739 * 270 + 46).toFixed(0)} 186`).replace(`${t(414, 132, "same", 12, MUTED, "middle", 800)}`, `${t(446, 132, "same", 12, MUTED, "middle", 800)}`); })();

  /* ------------------------------------------------------------ s15 · hunt for leaked words (activity) */
  const LK = D.leak.terms, CF = D.complFiled;
  SC.s15 = {
    copy: [
      { k: "A yes or no outcome", m: "Did the patient file a formal complaint?", s: `Text-only model, held-out AUC ${D.leak.auc["000000"]}.`, l: `AUC ${D.leak.auc["000000"]}` },
      { k: "Your turn", m: "Flag terms from the declaration of intent.", s: "Compare stored refits at the same prediction time.", l: "Hunt the leak" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="12" y="12" width="206" height="170" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(115, 36, "held-out AUC · complaint filed", 12, MUTED, "middle", 800)}
<path d="M45 150 A70 70 0 0 1 185 150" fill="none" stroke="#EEE8DC" stroke-width="16" stroke-linecap="round"/>
<path class="arc15" d="M45 150 A70 70 0 0 1 185 150" fill="none" stroke="${NAVY}" stroke-width="16" stroke-linecap="round" style="stroke-dasharray:220 220;stroke-dashoffset:220;transition:stroke-dashoffset 1s"/>
${t(115, 140, "0.837", 30, NAVY, "middle", 800, "auc15")}${t(115, 172, "0.5 = coin flip · 1 = perfect", 10.5, MUTED, "middle", 600)}
<rect x="226" y="12" width="242" height="170" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
${t(240, 36, "suspect words", 12, MUTED, "start", 800)}
${LK.map((w, i) => { const x = 240 + (i % 2) * 112, y = 48 + Math.floor(i / 2) * 42; return `<g class="lk" data-i="${i}">${tile(x, y, w, { size: 14, h: 32 })}<g class="x15" style="opacity:0;transition:opacity .4s"><path d="M${x + 4} ${y + 16} H${x + H.tw(w, 14) - 4}" stroke="${TERRA}" stroke-width="3.5"/></g></g>`; }).join("")}
<g class="a o0 after15" style="transform:translateY(12px)">
  <rect x="12" y="192" width="456" height="156" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  ${t(24, 214, "", 14, INK, "start", 800, "res15")}
  ${t(24, 240, `${fmt(CF.filed)} episodes had a filing. In ${CF.filedWrote} the review declared intent.`, 12.5, INK, "start", 600)}
  ${t(24, 262, `And of the ${CF.wrote} reviews declaring intent, ${Math.round(100 * CF.filedWrote / CF.wrote)}% had a recorded filing.`, 12.5, INK, "start", 600)}
  ${t(24, 290, "The model's strongest complaint words:", 12.5, MUTED, "start", 800)}
  ${D.complTop.slice(0, 5).map(([w], i) => tile(24 + i * 84, 300, w, { size: 13, h: 26, stroke: NAVY })).join("")}
  ${t(452, 340, "about waiting, not about the complaint", 11.5, NAVY, "end", 700)}
</g>`,
    update(r, mask, done) {
      H.q(r, ".lk").forEach((g, i) => { const on = mask[i] === "1"; g.querySelector("rect").style.stroke = on ? TERRA : ""; g.querySelector("rect").style.fill = on ? "#FCEFE9" : "#fff"; g.querySelector(".x15").style.opacity = done && on ? 1 : 0; });
      const a = done ? D.leak.auc[mask] : D.leak.auc["000000"];
      H.count(r.querySelector(".auc15"), a, 900, v => v.toFixed(3));
      const arc = r.querySelector(".arc15"), L = arc.getTotalLength(); arc.style.strokeDasharray = L + " " + L; arc.style.strokeDashoffset = (L * (1 - (a - .5) / .5)).toFixed(1);
      H.show(r, ".after15", !!done); H.tf(r, ".after15", done ? "none" : "translateY(12px)");
      const res = r.querySelector(".res15"); res.textContent = done ? `Before ${D.leak.auc["000000"]} → after ${a.toFixed(3)} (change ${(a - D.leak.auc["000000"]).toFixed(3)}).` : "";
    },
    render(r, b) { const s = r.querySelector("svg"); if (!s._init) { s._init = 1; SC.s15.update(r, "000000", false); } }
  };

  /* ------------------------------------------------------------ s16 · read thirty by hand */
  const hue = i => `hsl(${(i * 47) % 360} 55% 58%)`;
  SC.s16 = {
    copy: [
      { k: "Before any modelling", m: "Read thirty reviews at random, and write down what you see.", s: "Look for repeated wording.", l: "30 random reviews" },
      { k: "Do it here", m: "The same sentences keep coming back.", s: "Same colour = same sentence.", l: "Repeats" },
      { k: "What reading reveals", m: `All ${fmt(D.D)} reviews are built from just ${D.nSent} sentences.`, s: `Only ${fmt(D.nUnique)} different reviews. No score or coefficient would tell you that.`, l: `${D.nSent} sentences` },
      { k: "Standard practice", m: "Templates may recur in both train and test.", s: "New language is a different transfer test.", l: "Read first" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${D.thirty.map(([id, txt], i) => { const x = 10 + (i % 6) * 77, y = 10 + Math.floor(i / 6) * 60, S = D.thirtyS[i];
  return `<g class="a o0 c16" style="transform:rotate(${(i % 3) - 1}deg) translateY(10px)"><rect x="${x}" y="${y}" width="72" height="54" rx="6" fill="#fff" stroke="${EDGE}" stroke-width="1.5"/>
  ${S.map((s, j) => `<rect class="sb" data-s="${s}" x="${x + 6}" y="${y + 7 + j * (40 / S.length)}" width="${60 - (j % 2) * 12}" height="${Math.max(4, 40 / S.length - 4).toFixed(1)}" rx="2" fill="${hue(s)}" style="fill-opacity:.25;transition:fill-opacity .5s ${(.2 + i * .04).toFixed(2)}s"/>`).join("")}</g>`; }).join("")}
<g class="a o0 tot16" style="transform:scale(1.5)"><rect x="70" y="232" width="340" height="112" rx="16" fill="${INK}" fill-opacity=".94"/>
  ${[[D.nSent, "sentences"], [fmt(D.nUnique), "different reviews"], [fmt(D.D), "reviews"]].map(([v, s], i) => `${t(130 + i * 110, 282, v, 30, [GOLD, "#fff", "#fff"][i], "middle", 800)}${t(130 + i * 110, 306, s, 12, "#E7DDCB", "middle", 600)}`).join("")}
  ${t(240, 332, "found by reading, not by modelling", 12.5, GOLD, "middle", 700)}</g>
<g class="a o0 read16"><rect x="300" y="236" width="170" height="112" rx="14" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/>
  ${person(340, 330, NAVY, 1)}<path d="M352 290 q16 -8 32 0 v26 q-16 -8 -32 0 z M384 290 q16 -8 32 0 v26 q-16 -8 -32 0 z" fill="${SKY}" stroke="${NAVY}" stroke-width="2"/>
  ${t(420, 262, "read first", 13, NAVY, "middle", 800)}</g>`,
    render(r, b) {
      H.q(r, ".c16").forEach((g, i) => { g.style.transitionDelay = b === 0 ? (i * .05) + "s" : "0s"; g.style.opacity = b === 2 ? .35 : 1; g.style.transform = `rotate(${(i % 3) - 1}deg)`; });
      H.q(r, ".sb").forEach(e => { e.style.fillOpacity = b >= 1 ? 1 : .25; });
      H.show(r, ".tot16", b === 2); H.tf(r, ".tot16", b === 2 ? "scale(1)" : "scale(1.5)"); H.delay(r, ".tot16", b === 2 ? .6 : 0);
      H.show(r, ".read16", b >= 3);
    }
  };

  /* ------------------------------------------------------------ s17 · four sentences you may not write */
  const SENT = [["“Patients care most about complain.”", "A coefficient is not a topic."], ["“The most common themes were team, hospital, visit.”", "Frequent terms alone do not establish themes."], ["“Sentiment analysis shows patients are dissatisfied.”", "Which model? How well did it agree with a human?"], ["“The reviews confirm the satisfaction scores.”", "Same people, same visits: not corroboration."]];
  SC.s17 = {
    copy: [
      { k: "Your turn", m: "May you write each sentence, or not?", s: "Decide under the stage.", l: "Four sentences" },
      { k: "Sentence 1", m: "“Care most about complain”? No.", s: "A coefficient is not a topic, and this one is not even about complaining.", l: "1 · not allowed" },
      { k: "Sentence 2", m: "“Common themes: team, hospital, visit”? No.", s: "Frequency alone does not establish a theme.", l: "2 · not allowed" },
      { k: "Sentence 3", m: "“Sentiment analysis shows…”? No.", s: "Which model, trained on what, and how well did it agree with a human reader?", l: "3 · not allowed" },
      { k: "Sentence 4", m: "“The reviews confirm the scores”? No.", s: "Same people, same visits. All four are off limits.", l: "4 · not allowed" }
    ],
    svg: `
<rect width="480" height="360" fill="#EFE8DA"/>
<rect x="20" y="16" width="440" height="330" rx="6" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
<path d="M20 16 h440 v10 h-440z" fill="${NAVY}"/>
${t(38, 52, "Draft report · Text results", 14, MUTED, "start", 700)}
${SENT.map(([s, why], i) => `<g class="sn">${t(38, 92 + i * 70, s, 14, INK, "start", 700)}
  <path class="dr st" pathLength="1" d="M34 ${87 + i * 70} H${Math.min(452, 42 + s.length * 6.75).toFixed(0)}" stroke="${TERRA}" stroke-width="3"/>
  <g class="a o0 why">${t(38, 114 + i * 70, "✗  " + why, 13, TERRA, "start", 700)}</g></g>`).join("")}
<g class="a o0 all" style="transform:scale(1.8)"><g transform="rotate(-5 352 50)"><rect x="248" y="33" width="208" height="36" rx="8" fill="#fff" stroke="${TERRA}" stroke-width="4"/>${t(352, 58, "ALL FOUR: OFF LIMITS", 17, TERRA, "middle", 800)}</g></g>`,
    render(r, b) {
      H.q(r, ".sn").forEach((g, i) => { const on = b >= i + 1; g.querySelector(".st").style.strokeDashoffset = on ? 0 : 1; const w = g.querySelector(".why"); w.style.transitionDelay = on ? ".9s" : "0s"; w.style.opacity = on ? 1 : 0; });
      H.show(r, ".all", b >= 4); H.tf(r, ".all", b >= 4 ? "scale(1)" : "scale(1.8)"); H.delay(r, ".all", b >= 4 ? 4.5 : 0);
    }
  };

  /* ------------------------------------------------------------ s19 · quiz (panel only) */
  SC.s19 = { full: true, copy: [{ k: "Quiz", m: "Fourteen questions", s: "Apply the methods to review evidence.", l: "Knowledge check" }], svg: '<rect width="480" height="360" fill="#F6F1E7"/>', render() { } };

  /* ------------------------------------------------------------ s20 · takeaways */
  const IDEAS = [
    ["Text is a variable", "Every choice between sentence and column is yours to record.", "sliders"],
    ["TF-IDF", "Frequent in this review, rare across all of them.", "scale"],
    ["Read the sentences", "Never read meaning into one coefficient.", "eye"],
    ["Fit on train only", "And read the text before you trust a model of it.", "lock"]];
  const icon = (k, x, y) => ({
    sliders: [0, 1, 2].map(i => `<path d="M${x - 16} ${y - 10 + i * 10} H${x + 16}" stroke="${INK}" stroke-width="2.5"/><circle cx="${x - 8 + i * 9}" cy="${y - 10 + i * 10}" r="4" fill="${TERRA}"/>`).join(""),
    scale: `<path d="M${x} ${y - 14} V${y + 12} M${x - 18} ${y - 6} H${x + 18}" stroke="${INK}" stroke-width="2.5"/><path d="M${x - 24} ${y + 4} l6 -10 l6 10 z" fill="${TERRA}"/><path d="M${x + 12} ${y - 2} l6 -4 l6 4 z" fill="${NAVY}"/>`,
    eye: `<path d="M${x - 18} ${y} q18 -16 36 0 q-18 16 -36 0 z" fill="#fff" stroke="${NAVY}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="6" fill="${NAVY}"/>`,
    lock: `<rect x="${x - 11}" y="${y - 4}" width="22" height="17" rx="3" fill="${GREEN}"/><path d="M${x - 7} ${y - 4} v-6 a7 7 0 0 1 14 0 v6" fill="none" stroke="${GREEN}" stroke-width="3"/>`
  })[k];
  SC.s20 = {
    copy: [
      { k: "Takeaways", m: "Four ideas to keep from this chapter.", s: "", l: "Four ideas" },
      { k: "Idea 1", m: "A text feature is a variable like any other.", s: "Record every choice between the sentence and the column.", l: "1 · text is a variable" },
      { k: "Idea 2", m: "TF-IDF rewards words frequent here, rare everywhere else.", s: "A word in every review distinguishes nothing.", l: "2 · TF-IDF" },
      { k: "Idea 3", m: "Never read meaning into one coefficient.", s: "Go back to the sentences.", l: "3 · read the sentences" },
      { k: "Idea 4", m: "Fit the vectoriser on training rows only.", s: "And read the text yourself before you trust any model of it.", l: "4 · fit on train" },
      { k: "Your report", m: "Show how the evidence supports the conclusion.", s: "Unit, evidence, checks and limitations.", l: "Reporting checklist" }
    ],
    svg: `
<rect width="480" height="360" fill="${PAPER}"/>
${IDEAS.map(([h, s, ic], i) => { const x = 20 + (i % 2) * 226, y = 18 + Math.floor(i / 2) * 120;
  return `<g class="a o0 idea" style="transform:translateY(14px)"><rect x="${x}" y="${y}" width="214" height="108" rx="14" fill="#fff" stroke="${EDGE}" stroke-width="2"/>
  <circle cx="${x + 34}" cy="${y + 36}" r="24" fill="#F1ECE2"/>${icon(ic, x + 34, y + 36)}
  ${t(x + 66, y + 41, (i + 1) + " · " + h, 14.5, INK, "start", 800)}
  ${fo(x + 14, y + 62, 190, 42, s, 13, MUTED, 400)}</g>`; }).join("")}
<g class="a o0 tasks">
  <rect x="20" y="262" width="440" height="86" rx="14" fill="${NAVY}"/>
  ${t(36, 284, "Reporting checklist", 14, GOLD, "start", 800)}
  ${["state the unit and coverage", "show a de-identified example", "report held-out errors", "identify limits of transfer"].map((s, i) =>
    `<g class="tk" style="transition:opacity .5s ${.4 + i * .5}s"><circle cx="${42 + (i % 2) * 214}" cy="${304 + Math.floor(i / 2) * 24}" r="7" fill="${GREEN}"/>${t(42 + (i % 2) * 214, 308 + Math.floor(i / 2) * 24, "✓", 10, "#fff")}${t(56 + (i % 2) * 214, 309 + Math.floor(i / 2) * 24, s, 13, "#fff", "start", 600)}</g>`).join("")}
</g>`,
    render(r, b) {
      H.q(r, ".idea").forEach((g, i) => { g.style.opacity = b >= i + 1 ? 1 : b === 0 ? .25 : 0; g.style.transform = b >= i + 1 ? "none" : "translateY(14px)"; });
      H.show(r, ".tasks", b >= 5); H.q(r, ".tk").forEach(e => { e.style.opacity = b >= 5 ? 1 : 0; });
    }
  };
})();
