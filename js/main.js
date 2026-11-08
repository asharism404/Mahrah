(function () {
  var fmt = function (n) { return STORE.currency + Number(n).toLocaleString("en-IN"); };
  var grid = document.getElementById("grid");
  var toastEl = document.getElementById("toast"), tt;

  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  function status(p) {
    if (p.outOfStock) return { key: "sold", label: "Sold out" };
    if (p.madeToOrder) return { key: "mto", label: "Made to order" };
    var total = 0, has = false;
    p.colours.forEach(function (c) { if (c.sizes) { has = true; for (var z in c.sizes) total += c.sizes[z]; } });
    if (!has) for (var s in p.sizes) total += p.sizes[s];
    if (total === 0) return { key: "sold", label: "Sold out" };
    if (total <= STORE.lowStockAt) return { key: "low", label: "Few left" };
    return { key: "ok", label: "" };
  }

  function pricing(p) {
    var mrp = p.price, sale = null, r10 = function (n) { return Math.round(n / 10) * 10; };
    if (p.salePrice && p.salePrice < mrp) sale = p.salePrice;
    else if (p.discount > 0) sale = r10(mrp * (100 - p.discount) / 100);
    else if (p.oldPrice && p.oldPrice > p.price) { mrp = p.oldPrice; sale = p.price; }
    else if (STORE.sitewideDiscount > 0 && !p.noSale) sale = r10(mrp * (100 - STORE.sitewideDiscount) / 100);
    if (sale === null || sale >= mrp) return { pay: mrp, mrp: null, off: 0, save: 0 };
    return { pay: sale, mrp: mrp, off: Math.round((mrp - sale) / mrp * 100), save: mrp - sale };
  }
  function priceHTML(p) {
    var x = pricing(p);
    return '<span class="now">' + fmt(x.pay) + "</span>" + (x.mrp ? "<s>" + fmt(x.mrp) + '</s><em class="off">' + x.off + "% OFF</em>" : "");
  }
  function priceText(p) {
    var x = pricing(p);
    return fmt(x.pay) + (x.mrp ? " (" + x.off + "% off, MRP " + fmt(x.mrp) + ")" : "");
  }
  function sizeBtns(p, k) {
    var s = (p.colours[k] && p.colours[k].sizes) || p.sizes || {};
    return Object.keys(s).map(function (z) {
      var off = p.outOfStock || (!p.madeToOrder && s[z] === 0);
      return '<button type="button" data-size="' + z + '"' + (off ? " disabled" : "") + ' aria-pressed="false">' + z + "</button>";
    }).join("");
  }
  function applyColour(root, p, k) {
    var s = (p.colours[k] && p.colours[k].sizes) || p.sizes || {};
    var none = !!p.outOfStock || (!p.madeToOrder && Object.keys(s).every(function (z) { return s[z] === 0; }));
    root.querySelector(".sizes").innerHTML = sizeBtns(p, k);
    root.querySelector(".note").textContent = none ? (p.outOfStock ? "Currently out of stock." : "This colour is sold out. Try another colour.") : (p.madeToOrder ? "Made to order. Delivery time confirmed on WhatsApp." : "");
    var b = root.querySelector(".btn.order"); b.disabled = none; b.textContent = none ? "Sold out" : "Add to bag";
    var bu = root.querySelector(".buy");
    if (bu) { bu.hidden = false; bu.dataset.restock = none ? "1" : ""; bu.textContent = none ? "Ask when it is back on WhatsApp" : "Buy now on WhatsApp"; }
  }

  function card(p, i) {
    var st = status(p), sold = st.key === "sold";
    var badge = sold ? "Sold out" : st.key === "low" ? "Few left" : p.badge;
    var badgeCls = sold ? "sold" : st.key === "low" ? "low" : "";
    var sizes = sizeBtns(p, 0);
    var sw = p.colours.map(function (c, k) {
      return '<button type="button" style="--c:' + c.hex + '" title="' + c.name + '" aria-label="' + c.name + '" data-img="' + (c.image || "") + '" aria-pressed="' + (k === 0) + '"></button>';
    }).join("");
    var el = document.createElement("article");
    el.className = "card rv" + (sold ? " soldout" : "");
    el.style.setProperty("--d", (i % 3) * 0.12 + "s");
    el.dataset.id = p.id;
    el.innerHTML =
      '<a class="ph' + (p.crop ? " crop" : "") + '" href="#p-' + p.id + '" aria-label="View ' + p.name + '">' + (badge ? '<span class="badge ' + badgeCls + '">' + badge + "</span>" : "") + (pricing(p).off && !sold ? '<span class="salebadge">' + pricing(p).off + "% OFF</span>" : "") +
      '<img src="' + (p.images && p.images.length ? p.images[0] : p.image) + '" alt="' + p.name + '" loading="lazy"></a>' +
      '<div class="info"><h3><a href="#p-' + p.id + '">' + p.name + '</a></h3><div class="ar">' + p.arabic + "</div>" +
      '<p class="meta">' + p.description + "</p>" +
      '<a class="view" href="#p-' + p.id + '">View details</a>' +
      '<div class="sw">' + sw + "</div><div class=\"cn\">" + p.colours[0].name + "</div>" +
      '<div class="price">' + priceHTML(p) + "</div>" +
      '<div class="sizes">' + sizes + "</div><div class=\"note\">" + (st.key === "mto" ? "Made to order. Delivery time confirmed on WhatsApp." : "") + "</div>" +
      '<button type="button" class="btn order"' + (sold ? " disabled" : "") + ">" + (sold ? "Sold out" : "Add to bag") + '</button><button type="button" class="buy">Buy now on WhatsApp</button></div>';
    applyColour(el, p, 0);
    return el;
  }

  /* categories: filter + hamburger menu */
  var visible = PRODUCTS.filter(function (p) { return !p.hidden; });
  var cats = CATEGORIES.filter(function (c) { return visible.some(function (p) { return p.category === c.id; }); });
  var current = "all", chipsEl = document.getElementById("chips"), menuEl = document.getElementById("catMenu"), emptyEl = document.getElementById("empty");
  var countOf = function (id) { return id === "all" ? visible.length : visible.filter(function (p) { return p.category === id; }).length; };

  function render() {
    grid.innerHTML = "";
    var list = visible.filter(function (p) { return current === "all" || p.category === current; });
    list.forEach(function (p, i) { var el = card(p, i); grid.appendChild(el); requestAnimationFrame(function () { el.classList.add("on"); }); });
    emptyEl.hidden = list.length > 0;
    chipsEl.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.cat === current)); });
    menuEl.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-current", String(b.dataset.cat === current)); });
  }

  var all = [{ id: "all", name: "All pieces", arabic: "" }].concat(cats);
  chipsEl.innerHTML = all.map(function (c) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="false">' + c.name + "</button>"; }).join("");
  menuEl.innerHTML = all.map(function (c) {
    return '<li><button type="button" data-cat="' + c.id + '" aria-current="false"><span>' + c.name + "</span><small>" + (c.arabic ? '<span class="ar">' + c.arabic + "</span>" : "") + countOf(c.id) + "</small></button></li>";
  }).join("");

  function pick(id, scroll) {
    current = id; render();
    if (scroll) document.getElementById("collection").scrollIntoView({ behavior: calmMotion() ? "auto" : "smooth" });
  }
  function calmMotion() { return matchMedia("(prefers-reduced-motion:reduce)").matches; }
  chipsEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) pick(b.dataset.cat, false); });

  var drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim"), burger = document.getElementById("burger");
  function menu(open) {
    drawer.classList.toggle("open", open); scrim.classList.toggle("show", open);
    drawer.setAttribute("aria-hidden", String(!open)); burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("lock", open);
    if (open) document.getElementById("closeMenu").focus(); else if (document.activeElement && drawer.contains(document.activeElement)) burger.focus();
  }
  burger.addEventListener("click", function () { menu(!drawer.classList.contains("open")); });
  scrim.addEventListener("click", function () { menu(false); });
  document.getElementById("closeMenu").addEventListener("click", function () { menu(false); });
  addEventListener("keydown", function (e) { if (e.key === "Escape") menu(false); });
  menuEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; menu(false); pick(b.dataset.cat, true); });
  drawer.querySelectorAll(".dm a").forEach(function (a) { a.addEventListener("click", function () { menu(false); }); });
  render();

  grid.addEventListener("click", function (e) {
    var c = e.target.closest(".card"); if (!c) return;
    var p = PRODUCTS.filter(function (x) { return x.id === c.dataset.id; })[0];
    var sw = e.target.closest(".sw button");
    if (sw) {
      c.querySelectorAll(".sw button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      sw.setAttribute("aria-pressed", "true"); c.querySelector(".cn").textContent = sw.title;
      if (sw.dataset.img) c.querySelector(".ph img").src = sw.dataset.img;
      applyColour(c, p, Array.prototype.indexOf.call(sw.parentNode.children, sw)); return;
    }
    var sz = e.target.closest(".sizes button");
    if (sz && !sz.disabled) {
      c.querySelectorAll(".sizes button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      sz.setAttribute("aria-pressed", "true"); return;
    }
    var isBuy = !!e.target.closest(".buy");
    if (isBuy && e.target.closest(".buy").dataset.restock) {
      window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent("Hello " + STORE.name + ", please let me know when " + p.name + " (" + c.querySelector(".cn").textContent + ") is back in stock."), "_blank", "noopener"); return;
    }
    if (e.target.closest(".order") || isBuy) {
      var size = c.querySelector('.sizes button[aria-pressed="true"]');
      if (!size) { toast("Please choose a size first"); return; }
      var colour = c.querySelector(".cn").textContent;
      if (!isBuy) { AM.cart.add(p, colour, size.dataset.size); return; }
      var msg = "Hello " + STORE.name + ", I would like to order:\n" + p.name + "\nColour: " + colour + "\nSize: " + size.dataset.size + "\nPrice: " + priceText(p);
      window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    }
  });

  window.AM = { pricing: pricing, priceHTML: priceHTML, fmt: fmt, status: status, toast: toast, sizeBtns: sizeBtns, applyColour: applyColour, orderUrl: function (p, colour, size) {
    var msg = "Hello " + STORE.name + ", I would like to order:\n" + p.name + "\nColour: " + colour + "\nSize: " + size + "\nPrice: " + priceText(p);
    return "https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(msg);
  } };

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
