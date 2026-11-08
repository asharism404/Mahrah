(function () {
  var KEY = "mahrah_bag_v1", items = [];
  var find = function (id) { return PRODUCTS.filter(function (p) { return p.id === id && !p.hidden; })[0]; };
  var colourOf = function (p, n) { return p.colours.filter(function (c) { return c.name === n; })[0] || p.colours[0]; };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); };
  function maxQty(p, it) {
    if (p.outOfStock) return 0;
    if (p.madeToOrder) return 5;
    var s = colourOf(p, it.colour).sizes || p.sizes || {};
    return Math.min(5, s[it.size] || 0);
  }
  function load() {
    try { items = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { items = []; }
    items = items.filter(function (it) { var p = find(it.id); if (!p) return false; var m = maxQty(p, it); if (m < 1) return false; it.qty = Math.min(it.qty, m); return true; });
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} }
  function count() { return items.reduce(function (n, i) { return n + i.qty; }, 0); }
  function totals() {
    var pay = 0, saved = 0;
    items.forEach(function (it) { var x = AM.pricing(find(it.id)); pay += x.pay * it.qty; if (x.mrp) saved += (x.mrp - x.pay) * it.qty; });
    return { pay: pay, saved: saved };
  }

  var wrap = document.createElement("div");
  wrap.innerHTML = '<div class="cscrim" id="cscrim"></div><aside class="cart" id="cart" aria-hidden="true" aria-label="Shopping bag"></aside>';
  document.body.appendChild(wrap);
  var cart = document.getElementById("cart"), scrim = document.getElementById("cscrim");

  function render() {
    var n = count();
    document.querySelectorAll(".cc").forEach(function (el) { el.textContent = n; el.classList.toggle("on", n > 0); });
    var body;
    if (!items.length) {
      body = '<div class="cempty"><p class="ar">حقيبتك فارغة</p><h3>Your bag is empty</h3><p>Add a piece you love and it will appear here.</p><button type="button" class="btn" data-cclose>Continue shopping</button></div>';
    } else {
      var t = totals();
      body = '<ul class="clist">' + items.map(function (it, i) {
        var p = find(it.id), c = colourOf(p, it.colour), x = AM.pricing(p), m = maxQty(p, it);
        var img = c.image || (p.images && p.images[0]) || p.image;
        return '<li><a class="cimg" href="#p-' + p.id + '" data-cclose><img src="' + img + '" alt=""></a><div class="cinfo"><b>' + esc(p.name) + "</b><small>" + esc(it.colour) + " &middot; Size " + esc(it.size) + "</small>" +
          '<span class="cprice">' + AM.fmt(x.pay * it.qty) + (x.mrp ? "<s>" + AM.fmt(x.mrp * it.qty) + "</s>" : "") + "</span>" +
          '<div class="qty"><button type="button" data-q="-1" data-i="' + i + '" aria-label="Decrease">&minus;</button><span>' + it.qty + '</span><button type="button" data-q="1" data-i="' + i + '" aria-label="Increase"' + (it.qty >= m ? " disabled" : "") + '>+</button></div>' +
          (it.qty >= m && !p.madeToOrder ? '<em class="cmax">Only ' + m + " available</em>" : "") +
          '</div><button type="button" class="crm" data-rm="' + i + '" aria-label="Remove">&times;</button></li>';
      }).join("") + "</ul>" +
        '<div class="cfoot"><div class="crow"><span>Subtotal</span><b>' + AM.fmt(t.pay) + "</b></div>" +
        (t.saved ? '<div class="crow save"><span>You save</span><b>' + AM.fmt(t.saved) + "</b></div>" : "") +
        '<p class="cnote">Delivery and payment are confirmed with you on WhatsApp.</p>' +
        '<button type="button" class="btn csend" data-send>Send order on WhatsApp</button>' +
        '<button type="button" class="clear" data-clear>Clear bag</button></div>';
    }
    cart.innerHTML = '<div class="ch"><h2>Your bag <small>' + (n ? "(" + n + ")" : "") + '</small></h2><button type="button" class="x" data-cclose aria-label="Close bag">&times;</button></div>' + body;
  }

  function open(o) {
    cart.classList.toggle("open", o); scrim.classList.toggle("show", o); cart.setAttribute("aria-hidden", String(!o));
    document.body.classList.toggle("lock", o || /^#p-/.test(location.hash));
    if (o) { render(); var x = cart.querySelector(".x"); if (x) x.focus({ preventScroll: true }); }
  }

  function add(p, colour, size) {
    var it = items.filter(function (i) { return i.id === p.id && i.colour === colour && i.size === size; })[0];
    var m = maxQty(p, { colour: colour, size: size });
    if (it) { if (it.qty >= m) { AM.toast("That is all we have in this size"); return; } it.qty++; }
    else items.push({ id: p.id, colour: colour, size: size, qty: 1 });
    save(); render(); open(true);
    document.querySelectorAll(".cartbtn").forEach(function (b) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
  }

  function message() {
    var t = totals(), L = ["Hello " + STORE.name + ", I would like to order:", ""];
    items.forEach(function (it, i) {
      var p = find(it.id), x = AM.pricing(p);
      L.push((i + 1) + ". " + p.name, "   Colour: " + it.colour + " | Size: " + it.size + " | Qty: " + it.qty,
        "   " + AM.fmt(x.pay) + " x " + it.qty + " = " + AM.fmt(x.pay * it.qty) + (x.mrp ? " (" + x.off + "% off)" : ""));
    });
    L.push("", "Total: " + AM.fmt(t.pay)); if (t.saved) L.push("You save: " + AM.fmt(t.saved));
    return L.join("\n");
  }

  cart.addEventListener("click", function (e) {
    if (e.target.closest("[data-cclose]")) { open(false); return; }
    var q = e.target.closest("[data-q]");
    if (q && !q.disabled) { var it = items[+q.dataset.i]; it.qty += +q.dataset.q; if (it.qty < 1) items.splice(+q.dataset.i, 1); save(); render(); return; }
    var rm = e.target.closest("[data-rm]"); if (rm) { items.splice(+rm.dataset.rm, 1); save(); render(); return; }
    if (e.target.closest("[data-clear]")) { items = []; save(); render(); return; }
    if (e.target.closest("[data-send]")) window.open("https://wa.me/" + STORE.whatsapp + "?text=" + encodeURIComponent(message()), "_blank", "noopener");
  });
  scrim.addEventListener("click", function () { open(false); });
  document.addEventListener("click", function (e) { if (e.target.closest("[data-cart]")) { e.preventDefault(); open(true); } });
  addEventListener("keydown", function (e) { if (e.key === "Escape" && cart.classList.contains("open")) open(false); });
  addEventListener("hashchange", function () { if (cart.classList.contains("open")) open(false); });

  load(); render();
  AM.cart = { add: add, refresh: render, open: function () { open(true); } };
})();
