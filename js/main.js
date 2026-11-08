(function () {
  var fmt = function (n) { return STORE.currency + Number(n).toLocaleString("en-IN"); };
  var grid = document.getElementById("grid");
  var toastEl = document.getElementById("toast"), tt;

  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  function status(p) {
    if (p.madeToOrder) return { key: "mto", label: "Made to order" };
    var total = 0; for (var s in p.sizes) total += p.sizes[s];
    if (total === 0) return { key: "sold", label: "Sold out" };
    if (total <= STORE.lowStockAt) return { key: "low", label: "Few left" };
    return { key: "ok", label: "" };
  }

  function card(p, i) {
    var st = status(p), sold = st.key === "sold";
    var badge = sold ? "Sold out" : st.key === "low" ? "Few left" : p.badge;
    var badgeCls = sold ? "sold" : st.key === "low" ? "low" : "";
    var sizes = Object.keys(p.sizes).map(function (s) {
      var off = !p.madeToOrder && p.sizes[s] === 0;
      return '<button type="button" data-size="' + s + '"' + (off ? " disabled" : "") + ' aria-pressed="false">' + s + "</button>";
    }).join("");
    var sw = p.colours.map(function (c, k) {
      return '<button type="button" style="--c:' + c.hex + '" title="' + c.name + '" aria-label="' + c.name + '" aria-pressed="' + (k === 0) + '"></button>';
    }).join("");
    var el = document.createElement("article");
    el.className = "card rv" + (sold ? " soldout" : "");
    el.style.setProperty("--d", (i % 3) * 0.12 + "s");
    el.dataset.id = p.id;
    el.innerHTML =
      '<div class="ph' + (p.crop ? " crop" : "") + '">' + (badge ? '<span class="badge ' + badgeCls + '">' + badge + "</span>" : "") +
      '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="info"><h3>' + p.name + '</h3><div class="ar">' + p.arabic + "</div>" +
      '<p class="meta">' + p.description + "</p>" +
      '<div class="sw">' + sw + "</div><div class=\"cn\">" + p.colours[0].name + "</div>" +
      '<div class="price">' + fmt(p.price) + (p.oldPrice ? "<s>" + fmt(p.oldPrice) + "</s>" : "") + "</div>" +
      '<div class="sizes">' + sizes + "</div><div class=\"note\">" + (st.key === "mto" ? "Made to order. Delivery time confirmed on WhatsApp." : "") + "</div>" +
      '<button type="button" class="btn order"' + (sold ? " disabled" : "") + ">" + (sold ? "Sold out" : "Order on WhatsApp") + "</button></div>";
    return el;
  }

  PRODUCTS.filter(function (p) { return !p.hidden; }).forEach(function (p, i) { grid.appendChild(card(p, i)); });

  grid.addEventListener("click", function (e) {
    var c = e.target.closest(".card"); if (!c) return;
    var p = PRODUCTS.filter(function (x) { return x.id === c.dataset.id; })[0];
    var sw = e.target.closest(".sw button");
    if (sw) {
      c.querySelectorAll(".sw button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      sw.setAttribute("aria-pressed", "true"); c.querySelector(".cn").textContent = sw.title; return;
    }
    var sz = e.target.closest(".sizes button");
    if (sz && !sz.disabled) {
      c.querySelectorAll(".sizes button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      sz.setAttribute("aria-pressed", "true"); return;
    }
    if (e.target.closest(".order")) {
      var size = c.querySelector('.sizes button[aria-pressed="true"]');
      if (!size) { toast("Please choose a size first"); return; }
      var colour = c.querySelector(".cn").textContent;
      var msg = "Hello " + STORE.name + ", I would like to order:\n" + p.name + "\nColour: " + colour + "\nSize: " + size.dataset.size + "\nPrice: " + fmt(p.price);
      window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    }
  });

  /* contact links */
  document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + STORE.whatsapp; });
  document.querySelectorAll("[data-ig]").forEach(function (a) { a.href = STORE.instagram; });
  document.querySelectorAll("[data-mail]").forEach(function (a) { a.href = "mailto:" + STORE.email; a.textContent = STORE.email; });

  /* header + hero parallax */
  var hd = document.getElementById("hd"), arch = document.querySelector("#arch img");
  var calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function onScroll() {
    hd.classList.toggle("solid", scrollY > 40);
    if (arch && !calm && scrollY < 900) arch.style.transform = "translateY(" + scrollY * -0.05 + "px)";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* scroll reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("on"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
})();
