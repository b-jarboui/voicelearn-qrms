/* The course's chapter list. It is used by the course home page and by the chapter menu in every chapter.
   To add a chapter, add one line here. Set live:false to show a chapter as "coming soon". */
window.VL_COURSE = {
  title: "Machine learning for quality research",
  chapters: [
    { n: 1, week: 11, title: "What machine learning is", href: "week11/chapter1/", minutes: 12, live: true,
      meta: "Week 11 · 16 scenes · about 12 minutes · interactive activities and a quiz",
      targets: ["Define machine learning", "Understanding versus predicting", "Cut-offs and rules", "The accuracy trap"] },
    { n: 2, week: 12, title: "Finding groups nobody labelled", href: "week12/chapter1/", minutes: 15, live: true,
      meta: "Week 12 · 18 scenes · about 15 minutes · run k-means yourself, five activities and a quiz",
      targets: ["How k-means works", "Standardise before distance", "The noise floor", "Name clusters defensibly"] },
    { n: 3, week: 13, title: "Turning written reviews into variables", href: "week13/chapter1/", minutes: 18, live: false,
      meta: "Week 13 · 20 scenes · about 18 minutes · TF-IDF by hand, a leak hunt, five activities and a quiz",
      targets: ["Text as variables", "TF-IDF", "Read the sentences", "Fit on train only"] }
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
