/* The course's chapter list. It is used by the course home page and by the chapter menu in every chapter.
   To add a chapter, add one line here. Set live:false to show a chapter as "coming soon". */
window.VL_COURSE = {
  title: "Machine learning for quality research",
  chapters: [
    { n: 1, week: 11, title: "What machine learning is", href: "week11/chapter1/", minutes: 22, live: true,
      meta: "Week 11 · 25 scenes · about 22 minutes · grow a decision tree, pick the best algorithm, six activities and a quiz",
      targets: ["Define machine learning", "Features and labels", "Train and test", "Overfitting", "Confusion matrix", "Cross-validation"] },
    { n: 2, week: 12, title: "Finding groups nobody labelled", href: "week12/chapter1/", minutes: 23, live: true,
      meta: "Week 12 · 26 scenes · about 23 minutes · run k-means yourself, seven activities and a quiz",
      targets: ["How k-means works", "Standardise before distance", "The noise floor", "Elbow and silhouette", "Hierarchical and DBSCAN", "From clusters to segments"] },
    { n: 3, week: 13, title: "Turning written reviews into variables", href: "week13/chapter1/", minutes: 30, live: true,
      meta: "Week 13 · 31 scenes · about 30 minutes · TF-IDF, transformers and attention, BERTopic, a leak hunt, six activities and a quiz",
      targets: ["Text as variables", "TF-IDF", "Topics and BERTopic", "Tokens and transformers", "Fit on train only", "Read the sentences"] }
  ]
};

/* Chapter menu inside a chapter page: <nav class="chmenu" data-ch="1"> gets "Course home" and a chapter dropdown. */
(function () {
  function build() {
    var nav = document.querySelector("nav.chmenu[data-ch]"); if (!nav || !window.VL_COURSE) return;
    var cur = +nav.getAttribute("data-ch"), root = "../../";
    var sel = nav.querySelector("select") || document.createElement("select");
    sel.id = "chsel"; sel.setAttribute("aria-label", "Go to chapter"); sel.textContent = "";
    window.VL_COURSE.chapters.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c.href; o.textContent = "Chapter " + c.n + ": " + c.title + (c.live ? "" : " (coming soon)");
      o.disabled = !c.live; if (c.n === cur) o.selected = true;
      sel.appendChild(o);
    });
    sel.onchange = function () { if (sel.value) location.href = root + sel.value; };
    if (!sel.parentNode) { var lab = document.createElement("label"); lab.className = "chpick"; lab.appendChild(document.createTextNode("Chapter ")); lab.appendChild(sel); nav.appendChild(lab); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
