(function () {
  var C = CONTENT, $ = function (id) { return document.getElementById(id); };
  var an = $("announce"); if (an) an.textContent = C.announcement || ""; if (an && !C.announcement) an.hidden = true;
  $("steps").innerHTML = C.steps.map(function (s, i) {
    return '<div class="step rv" style="--d:' + i * 0.1 + 's"><b>' + (i + 1) + "</b><h3>" + s.title + "</h3><p>" + s.text + "</p></div>";
  }).join("");
  var sc = C.sizeChart;
  $("sizeTable").innerHTML = "<table><thead><tr>" + sc.headers.map(function (h) { return "<th>" + h + "</th>"; }).join("") +
    "</tr></thead><tbody>" + sc.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
  $("sizeTip").textContent = sc.unit + ". " + sc.tip;
  $("dgrid").innerHTML = C.delivery.map(function (d, i) {
    return '<div class="dc rv" style="--d:' + i * 0.12 + 's"><h3>' + d.title + "</h3><p>" + d.text + "</p></div>";
  }).join("");
  $("faqList").innerHTML = C.faqs.map(function (f) { return "<details><summary>" + f.q + "</summary><p>" + f.a + "</p></details>"; }).join("");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("on"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll("#steps .rv, #dgrid .rv").forEach(function (el) { io.observe(el); });
})();
