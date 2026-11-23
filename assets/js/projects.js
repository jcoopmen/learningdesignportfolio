/* Featured project order on the home page.
   Reorder or remove ids here. Each id matches a data-project attribute in index.html.
   A project left out of this list is hidden from the home page. */
var FEATURED = [
  "commercial-card-simulation",
  "crisis-line-course",
  "waste-recycling-courses",
  "support-centre-course"
];

(function () {
  var list = document.querySelector(".projects");
  if (!list) return;
  var cards = {};
  list.querySelectorAll("[data-project]").forEach(function (card) {
    cards[card.getAttribute("data-project")] = card;
    card.hidden = true;
  });
  FEATURED.forEach(function (id) {
    if (cards[id]) {
      cards[id].hidden = false;
      list.appendChild(cards[id]);
    }
  });
})();

/* Home page header: size the headline so the text block is exactly as tall as the portrait.
   The top of the headline lines up with the top of the photo, and the supporting sentence
   ends level with the bottom of it. Without JavaScript the CSS layout is used as is. */
(function () {
  var hero = document.querySelector(".hero");
  if (!hero) return;
  var text = hero.querySelector(".hero__text");
  var head = hero.querySelector(".display");
  var img = hero.querySelector(".hero__photo");
  if (!text || !head || !img) return;

  function fitHero() {
    head.style.fontSize = ""; text.style.minHeight = ""; hero.classList.remove("is-fit");
    var cols = getComputedStyle(hero).gridTemplateColumns.split(" ").length;
    if (cols < 2 || !img.offsetHeight) return;          /* stacked on small screens */
    hero.classList.add("is-fit");
    var target = img.offsetHeight, lo = 22, hi = 120, best = lo;
    for (var i = 0; i < 12; i++) {
      var mid = (lo + hi) / 2;
      head.style.fontSize = mid + "px";
      if (text.offsetHeight <= target) { best = mid; lo = mid; } else { hi = mid; }
    }
    head.style.fontSize = best + "px";
    text.style.minHeight = target + "px";
  }

  var raf;
  function queue() { cancelAnimationFrame(raf); raf = requestAnimationFrame(fitHero); }
  window.addEventListener("resize", queue);
  img.addEventListener("load", queue);
  if (img.complete) queue();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
})();
