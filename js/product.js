(function () {
  var pdp = document.getElementById("pdp"), lastY = 0, isOpen = false, idx = 0, imgs = [], cur = null, baseTitle = document.title;
  var find = function (id) { return PRODUCTS.filter(function (p) { return p.id === id && !p.hidden; })[0]; };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };

  function gallery(p) {
    var a = (p.images && p.images.length ? p.images : [p.image]).slice();
    p.colours.forEach(function (c) { if (c.image && a.indexOf(c.image) < 0) a.push(c.image); });
    return a;
  }

  function render(p) {
    cur = p; imgs = gallery(p); idx = 0;
    var st = AM.status(p), sold = st.key === "sold";
    var stText = sold ? "Sold out" : st.key === "low" ? "Only a few left" : st.key === "mto" ? "Made to order" : "In stock";
    var multi = imgs.length > 1;
    var thumbs = multi ? '<div class="thumbs">' + imgs.map(function (s, i) {
      return '<button type="button" data-i="' + i + '" aria-label="Photo ' + (i + 1) + '" aria-current="' + (i === 0) + '"><img src="' + s + '" alt=""></button>';
    }).join("") + "</div>" : "";
    var sw = p.colours.map(function (c, k) {
      return '<button type="button" style="--c:' + c.hex + '" title="' + esc(c.name) + '" aria-label="' + esc(c.name) + '" data-img="' + (c.image || "") + '" aria-pressed="' + (k === 0) + '"></button>';
    }).join("");
    var sizes = AM.sizeBtns(p, 0);
    var paras = (p.longDescription && p.longDescription.length ? p.longDescription : [p.description]).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    var wl = function (g) { g = +g; return g < 200 ? "lightweight" : g <= 250 ? "medium weight" : "substantial, structured weight"; };
    var glance = [["Fabric", p.fabric], ["Weight", p.gsm ? p.gsm + " GSM, " + wl(p.gsm) : ""], ["Fit", p.fit], ["Includes", p.includes]].filter(function (r) { return r[1]; })
      .map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
    var exp = (CONTENT.experience || []).map(function (x) { return "<li><b>" + esc(x.title) + "</b><span>" + esc(x.text) + "</span></li>"; }).join("");
    var acc = "";
    if (p.highlights && p.highlights.length) acc += "<details open><summary>Highlights</summary><ul>" + p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></details>";
    if (p.fabric || p.care || p.gsm) acc += "<details><summary>Fabric, weight and care</summary>" + (p.fabric ? "<p><b>Fabric:</b> " + esc(p.fabric) + "</p>" : "") + (p.gsm ? "<p><b>Weight:</b> " + p.gsm + " GSM (grams per square metre), " + wl(p.gsm) + ". Higher GSM means a thicker, more structured fabric.</p>" : "") + (p.care ? "<p><b>Care:</b> " + esc(p.care) + "</p>" : "") + "</details>";
    acc += "<details><summary>Delivery and exchange</summary>" + CONTENT.delivery.map(function (d) { return "<p><b>" + esc(d.title) + ":</b> " + esc(d.text) + "</p>"; }).join("") + "</details>";
    acc += '<details><summary>Size guide</summary><p>See our measurement chart to find your fit. <a href="#sizes">Open size guide</a></p></details>';
    var rel = PRODUCTS.filter(function (x) { return !x.hidden && x.id !== p.id; }).slice(0, 3).map(function (x) {
      var im = x.images && x.images.length ? x.images[0] : x.image;
      return '<a class="rel" href="#p-' + x.id + '"><span class="relph' + (x.crop ? " crop" : "") + '"><img src="' + im + '" alt="" loading="lazy"></span><b>' + esc(x.name) + "</b><small>" + AM.pricing(x).pay.toLocaleString("en-IN").replace(/^/, STORE.currency) + "</small></a>";
    }).join("");
    pdp.innerHTML =
      '<div class="pbar"><a class="pback" href="#collection">&#8249; Back to collection</a>' +
      '<a class="plogo" href="#top"><img src="images/logo.jpg" alt="" width="40" height="40"><span>' + esc(STORE.name.toUpperCase()) + '</span></a>' +
      '<div class="navr"><a class="bag" data-wa target="_blank" rel="noopener">WhatsApp</a><button type="button" class="cartbtn" data-cart aria-label="Open bag"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><i class="cc">0</i></button></div></div>' +
      '<div class="pwrap"><div class="gal"><div class="gmain" id="gmain"><img id="gimg" src="' + imgs[0] + '" alt="' + esc(p.name) + '">' +
      (multi ? '<button type="button" class="gnav prev" aria-label="Previous photo">&#8249;</button><button type="button" class="gnav next" aria-label="Next photo">&#8250;</button><span class="gcount" id="gcount">1 / ' + imgs.length + "</span>" : "") +
      "</div>" + thumbs + "</div>" +
      '<div class="pinfo"><p class="crumb">' + esc((CATEGORIES.filter(function (c) { return c.id === p.category; })[0] || { name: "" }).name) + (p.badge ? ' <span class="pbadge">' + esc(p.badge) + "</span>" : "") + "</p>" +
      "<h1>" + esc(p.name) + '</h1><div class="ar parname">' + esc(p.arabic) + "</div>" +
      '<div class="price">' + AM.priceHTML(p) + "</div>" + (AM.pricing(p).save ? '<p class="save">You save ' + AM.fmt(AM.pricing(p).save) + " on the original price</p>" : "") + '<p class="pstatus ' + st.key + '">' + stText + "</p>" +
      '<div class="pdesc">' + paras + "</div>" + (glance ? '<dl class="glance">' + glance + "</dl>" : "") +
      '<div class="lbl">Colour: <b id="pcn">' + esc(p.colours[0].name) + '</b></div><div class="sw">' + sw + "</div>" +
      '<div class="lbl">Size</div><div class="sizes">' + sizes + "</div>" +
      '<div class="note">' + (st.key === "mto" ? "Made to order. Delivery time confirmed on WhatsApp." : "") + "</div>" +
      '<button type="button" class="btn order"' + (sold ? " disabled" : "") + ">" + (sold ? "Sold out" : "Add to bag") + '</button><button type="button" class="buy">Buy now on WhatsApp</button>' +
      '<div class="acc">' + acc + "</div>" + (exp ? '<div class="pexp"><h3>The House of Al Mahrah experience</h3><ul>' + exp + "</ul></div>" : "") + "</div></div>" +
      '<div class="pwrap more"><h2>You may also like</h2><div class="relgrid">' + rel + "</div></div>";
    AM.applyColour(pdp, p, 0); AM.cart.refresh();
    pdp.querySelectorAll("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + STORE.whatsapp; });
    setImg(0, true);
  }

  function setImg(n, first) {
    idx = (n + imgs.length) % imgs.length;
    var im = document.getElementById("gimg"), gm = document.getElementById("gmain");
    var apply = function () {
      im.src = imgs[idx]; gm.classList.remove("zoom"); im.style.transformOrigin = "";
      im.classList.toggle("crop", !!cur.crop && idx === 0);
      im.style.opacity = 1;
    };
    if (first) apply(); else { im.style.opacity = 0; setTimeout(apply, 160); }
    var c = document.getElementById("gcount"); if (c) c.textContent = (idx + 1) + " / " + imgs.length;
    pdp.querySelectorAll(".thumbs button").forEach(function (b) { b.setAttribute("aria-current", String(+b.dataset.i === idx)); });
  }

  pdp.addEventListener("click", function (e) {
    var t = e.target.closest(".thumbs button"); if (t) { setImg(+t.dataset.i); return; }
    if (e.target.closest(".gnav.prev")) { setImg(idx - 1); return; }
    if (e.target.closest(".gnav.next")) { setImg(idx + 1); return; }
    var sw = e.target.closest(".sw button");
    if (sw) {
      pdp.querySelectorAll(".sw button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      sw.setAttribute("aria-pressed", "true"); document.getElementById("pcn").textContent = sw.title;
      if (sw.dataset.img) { var k = imgs.indexOf(sw.dataset.img); if (k >= 0) setImg(k); }
      AM.applyColour(pdp, cur, Array.prototype.indexOf.call(sw.parentNode.children, sw));
      return;
    }
    var sz = e.target.closest(".sizes button");
    if (sz && !sz.disabled) { pdp.querySelectorAll(".sizes button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); }); sz.setAttribute("aria-pressed", "true"); return; }
    var isBuy = !!e.target.closest(".buy");
    if (isBuy && e.target.closest(".buy").dataset.restock) {
      window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent("Hello " + STORE.name + ", please let me know when " + cur.name + " (" + document.getElementById("pcn").textContent + ") is back in stock."), "_blank", "noopener"); return;
    }
    if (e.target.closest(".btn.order") || isBuy) {
      var s = pdp.querySelector('.sizes button[aria-pressed="true"]');
      if (!s) { AM.toast("Please choose a size first"); return; }
      if (!isBuy) { AM.cart.add(cur, document.getElementById("pcn").textContent, s.dataset.size); return; }
      window.open(AM.orderUrl(cur, document.getElementById("pcn").textContent, s.dataset.size), "_blank", "noopener"); return;
    }
    var gm = e.target.closest("#gmain");
    if (gm && !gm.dataset.moved) {
      var r = gm.getBoundingClientRect(), im = document.getElementById("gimg");
      im.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%";
      gm.classList.toggle("zoom");
    }
  });
  pdp.addEventListener("mousemove", function (e) {
    var gm = e.target.closest("#gmain");
    if (gm && gm.classList.contains("zoom")) { var r = gm.getBoundingClientRect(); document.getElementById("gimg").style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%"; }
  });
  var sx = null;
  pdp.addEventListener("pointerdown", function (e) { var g = e.target.closest("#gmain"); if (g && !e.target.closest(".gnav")) { sx = e.clientX; g.dataset.moved = ""; } });
  pdp.addEventListener("pointerup", function (e) {
    var g = e.target.closest("#gmain");
    if (sx !== null && g && imgs.length > 1 && Math.abs(e.clientX - sx) > 45) { g.dataset.moved = "1"; setImg(idx + (e.clientX < sx ? 1 : -1)); setTimeout(function () { g.dataset.moved = ""; }, 60); }
    sx = null;
  });
  addEventListener("keydown", function (e) {
    if (!isOpen) return;
    if (e.key === "ArrowRight" && imgs.length > 1) setImg(idx + 1);
    if (e.key === "ArrowLeft" && imgs.length > 1) setImg(idx - 1);
    if (e.key === "Escape") location.hash = "#collection";
  });

  function show(p) {
    if (!isOpen) lastY = scrollY;
    render(p); pdp.scrollTop = 0; pdp.classList.add("open"); pdp.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock"); isOpen = true; document.title = p.name + " | " + STORE.name; pdp.focus({ preventScroll: true });
  }
  function hide() {
    if (!isOpen) return;
    pdp.classList.remove("open"); pdp.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock");
    isOpen = false; document.title = baseTitle;
    requestAnimationFrame(function () { if (!/^#p-/.test(location.hash) && (location.hash === "#collection" || !location.hash)) scrollTo(0, lastY); });
  }
  function route() {
    var h = location.hash.slice(1);
    if (h.indexOf("p-") === 0) { var p = find(h.slice(2)); if (p) { show(p); return; } }
    hide();
  }
  addEventListener("hashchange", route); route();
})();
