/* === APP.JS — 1-NJI BÖLEK === */
var toastTimer;
function showToast(msg) {
  var tb = document.getElementById("toastBox");
  if (!tb) return;
  tb.innerText = msg;
  tb.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { tb.classList.remove("show"); }, 2600);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

var hSvg0 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
var hSvg1 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
var eyeSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#13669e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
var shSvg = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
var phSvg = '<div class="p-ph"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>AÝ-ÇYZUW</span></div>';
var emptyBoxSvg = '<svg viewBox="0 0 64 64" fill="none"><path d="M10 22L32 10L54 22V46L32 58L10 46V22Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/><path d="M10 22L32 34L54 22" stroke="#94a3b8" stroke-width="2"/><path d="M32 34V58" stroke="#94a3b8" stroke-width="2"/><path d="M21 16L43 28" stroke="#cbd5e1" stroke-width="2"/><rect x="16" y="35" width="8" height="6" rx="1" fill="#f59e0b"/></svg>';

var lImg = document.getElementById("logoImg");
if (lImg) {
  lImg.onload = function () { lImg.style.display = "block"; document.getElementById("logoTxt").style.display = "none"; };
  lImg.onerror = function () {
    if (!this.dataset.t) { this.dataset.t = "1"; this.src = "img/logo.jpg"; }
    else { this.style.display = "none"; document.getElementById("logoTxt").style.display = "block"; }
  };
}

var cats = [
  { id: "Ofis", tk: "Ofis üçin", ru: "Для офиса", i: "🗂️", img: "img/ofis.jpg" },
  { id: "Torba", tk: "Mekdep üçin", ru: "Для школы", i: "🎒", img: "img/mekdep.jpg" },
  { id: "Kagyz", tk: "Kagyz önümleri", ru: "Бумажная продукция", i: "📄", img: "img/kagyz.jpg" },
  { id: "Ýazuw", tk: "Ýazuw esbaplary", ru: "Письменные товары", i: "🖊️", img: "img/yazuw.jpg" },
  { id: "Döredijilik", tk: "Döredijilik", ru: "Творчество", i: "🎨", img: "img/doredijilik.jpg" },
  { id: "Kitap", tk: "Kitaplar", ru: "Книги", i: "📚", img: "img/kitaplar.jpg" },
  { id: "Oýunjak", tk: "Oýunjaklar", ru: "Игрушки", i: "🧸", img: "img/oyunjak.jpg" },
  { id: "Baýramçylyk", tk: "Baýramçylyk", ru: "Праздник", i: "🎈", img: "img/bayramcylyk.jpg" },
  { id: "Umumy", tk: "Umumy harytlar", ru: "Общие товары", i: "🛍️", img: "img/umumy.jpg" }
];

var knownBrands = ["Double A", "Dolphin", "Pensan", "Hatber", "CASIO", "Maped", "Faber-Castell", "ErichKrause", "Berlingo", "Koh-i-Noor", "Attache", "Brauberg", "Centrum", "Deli", "Pilot", "Bic"];

var dictPairs = [
  { ru: "шариковая ручка", tk: "şarikli ruçka" }, { ru: "гелевая ручка", tk: "gelli ruçka" },
  { ru: "простой карандаш", tk: "ýönekeý galam" }, { ru: "цветные карандаши", tk: "reňkli galamlar" },
  { ru: "офисная бумага", tk: "ofis kagyzy" }, { ru: "школьная тетрадь", tk: "mekdep depderi" },
  { ru: "альбом для рисования", tk: "surat albomy" }, { ru: "тетрадь", tk: "depder" }, { ru: "тетрад", tk: "depder" },
  { ru: "ручка", tk: "ruçka" }, { ru: "шариковая", tk: "şarikli" }, { ru: "гелевая", tk: "gelli" },
  { ru: "карандаш", tk: "galam" }, { ru: "арандаш", tk: "galam" }, { ru: "простой", tk: "ýönekeý" }, { ru: "цветные", tk: "reňkli" },
  { ru: "ластик", tk: "pozgyç" }, { ru: "стиралка", tk: "pozgyç" }, { ru: "точилка", tk: "uçlaýjy" }, { ru: "линейка", tk: "çyzgyç" },
  { ru: "циркуль", tk: "sirkul" }, { ru: "маркер", tk: "marker" }, { ru: "бумага", tk: "kagyz" },
  { ru: "альбом", tk: "albom" }, { ru: "албом", tk: "albom" }, { ru: "дневник", tk: "gündelik" },
  { ru: "блокнот", tk: "bloknot" }, { ru: "блакнот", tk: "bloknot" }, { ru: "влокнот", tk: "bloknot" },
  { ru: "папка", tk: "papka" }, { ru: "файл", tk: "faýl" }, { ru: "степлер", tk: "stepler" },
  { ru: "скобы", tk: "skoba" }, { ru: "ножницы", tk: "gaýçy" }, { ru: "ножници", tk: "gaýçy" }, { ru: "клей", tk: "ýelim" },
  { ru: "калькулятор", tk: "kalkulýator" }, { ru: "калкулятор", tk: "kalkulýator" }, { ru: "пенал", tk: "penal" },
  { ru: "рюкзак", tk: "rukzak" }, { ru: "юкзак", tk: "rukzak" }, { ru: "портфель", tk: "portfel" }, { ru: "портфел", tk: "portfel" },
  { ru: "краски", tk: "boýaglar" }, { ru: "акварель", tk: "akwarel" }, { ru: "гуашь", tk: "guaş" }, { ru: "гуаш", tk: "guaş" },
  { ru: "кисть", tk: "çotga" }, { ru: "пластилин", tk: "plastilin" }, { ru: "книга", tk: "kitap" },
  { ru: "скотч", tk: "skoç" }, { ru: "черная", tk: "gara" }, { ru: "синяя", tk: "gök" },
  { ru: "красная", tk: "gyzyl" }, { ru: "зеленая", tk: "ýaşyl" }, { ru: "белая", tk: "ak" },
  { ru: "клетку", tk: "gözenek" }, { ru: "линию", tk: "çyzykly" }, { ru: "лист", tk: "list" },
  { ru: "набор", tk: "toplum" }, { ru: "стикер", tk: "stiker" }, { ru: "часи", tk: "sagat" }, { ru: "часы", tk: "sagat" }
];
/* === APP.JS — 2-NJI BÖLEK === */
function trText(str, targetLang) {
  if (!str) return "";
  var res = String(str);
  for (var i = 0; i < dictPairs.length; i++) {
    var pair = dictPairs[i];
    var from = targetLang === "tk" ? pair.ru : pair.tk;
    var to = targetLang === "tk" ? pair.tk : pair.ru;
    var esc = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var rx = new RegExp(esc, "gi");
    res = res.replace(rx, function (m) {
      return m.charAt(0) === m.charAt(0).toUpperCase() ? to.charAt(0).toUpperCase() + to.slice(1) : to;
    });
  }
  return res;
}

function detectCatSub(name) {
  var s = String(name).toLowerCase();
  if (/ручк|ruck|ruçk/.test(s)) return { c: "Ýazuw", sub: /гел|gel/.test(s) ? "Gelli ruçkalar" : "Şarikli ruçkalar" };
  if (/карандаш|арандаш|galam/.test(s)) return { c: "Ýazuw", sub: /цвет|reňk/.test(s) ? "Reňkli galamlar" : "Ýönekeý galamlar" };
  if (/ластик|стиралк|pozgy|точилк|uçla|tocil/.test(s)) return { c: "Ýazuw", sub: "Pozgyç we uçlaýjylar" };
  if (/линейк|çyzgy|liney|циркуль|сиркул|sirkul|транспортир|угольник/.test(s)) return { c: "Ýazuw", sub: "Çyzuw esbaplary" };
  if (/маркер|marker|корректор|замазк|zamask|выделител|layner|hayla|haýla/.test(s)) return { c: "Ýazuw", sub: "Marker we korrektorlar" };
  if (/тетрад|етрад|depder/.test(s)) return { c: "Kagyz", sub: "Mekdep depderleri" };
  if (/бумаг|бумг|kagyz|a4|а4|ватман|картон|стикер|тикер|stiker|zametka/.test(s)) return { c: "Kagyz", sub: "Printer, stiker we reňkli kagyz" };
  if (/блокнот|блакнот|влокнот|bloknot|дневник|gündelik|gundelik|ежедневник/.test(s)) return { c: "Kagyz", sub: "Gündelik we bloknotlar" };
  if (/альбом|албом|albom|скетчбук|sketch/.test(s)) return { c: "Döredijilik", sub: "Surat albomlary" };
  if (/краск|boýag|гуаш|акварел|кист|çotga|çotka|пластилин|холст|holst|мел|фломастер|пломастер|палитр|palitra/.test(s)) return { c: "Döredijilik", sub: "Boýag, çotga we plastilin" };
  if (/папк|papka|файл|faýl|скоросшиват|планшет/.test(s)) return { c: "Ofis", sub: "Faýl we papkalar" };
  if (/калькулятор|калкулятор|kalkulýator|kalkulyator/.test(s)) return { c: "Ofis", sub: "Kalkulýatorlar" };
  if (/степлер|stepler|скоб|дырокол|дыракол|dyrakol|скотч|skoç|ножниц|gaýçy|gaycy|клей|ýelim|kley|скрепк|skrepk|кнопк|подставк|органайзер|organa/.test(s)) return { c: "Ofis", sub: "Ofis esbaplary" };
  if (/пенал|penal|рюкзак|юкзак|rukzak|портфел|portfel|сумк|sumka|обложк|мешок|ланч/.test(s)) return { c: "Torba", sub: "Mekdep torba, penal we daşlyk" };
  if (/книг|kitap|сказк|словарь|sözlük|sozluk|пропис|атлас|глобус|globus|энциклопед/.test(s)) return { c: "Kitap", sub: "Okuw kitaplary we gollanmalar" };
  if (/лего|lego|кукл|gurjak|машин|masyn|пазл|pazl|шахмат|küşt|kust|игра|oýun|мяч|top|конструктор/.test(s)) return { c: "Oýunjak", sub: "Çaga oýunjaklary" };
  if (/шар|şar|свеч|подар|лента|lenta|конверт|konwert|веревк|ýüp|бант|открытк|пакет|happy birthday/.test(s)) return { c: "Baýramçylyk", sub: "Baýramçylyk we sowgat bezegleri" };
  return { c: "Umumy", sub: "Beýleki harytlar" };
}

function autoCategorizeAll(list) {
  if (!Array.isArray(list)) return [];
  for (var i = 0; i < list.length; i++) {
    var det = detectCatSub(list[i].t);
    list[i].c = det.c;
    list[i].sub = det.sub;
    list[i].s = Math.max(0, Number(list[i].s) || 0);
    list[i].p = Math.max(0, Number(list[i].p) || 0);
  }
  return list;
}

function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

var baseData = (typeof githubBaza !== "undefined" && Array.isArray(githubBaza)) ? githubBaza : [];
var db = autoCategorizeAll(lsGet("ay_db_v22", baseData));
var favs = lsGet("ay_favs", []);
var views = lsGet("ay_views", {});
var orders = lsGet("ay_orders", []);
var userAddr = lsGet("ay_uaddr", { nm: "", ph: "", ad: "" });
var admPassSaved = lsGet("ay_apass", "AyCyzuw@2026");
var m1 = lsGet("ay_m1", "aycyzuw.tm.arkadag@gmail.com");
var m2 = lsGet("ay_m2", "aycyzuw.tm2026@gmail.com");
var smsPh = lsGet("ay_sms", "+99365637644");
var ordCounter = parseInt(lsGet("ay_ord_cnt", 0), 10) || 0;

var cart = [], lang = "tk", taps = 0, tt, curDet = null, curQtyItem = null;
var fMin = 0, fMax = Infinity, fBrand = "";
var displayLimit = 40;

function catName(c) { for (var i = 0; i < cats.length; i++) if (cats[i].id === c) return cats[i][lang]; return c; }

function getProdImgUrl(x) {
  if (x.img && String(x.img).trim() !== "") {
    var s = String(x.img).trim();
    if (s.indexOf("http") === 0 || s.indexOf("data:") === 0 || s.indexOf("img/") === 0) return s;
    return "img/" + s + (s.indexOf(".") === -1 ? ".jpg" : "");
  }
  return "img/" + x.id + ".jpg";
}

function getActiveBrands() {
  var found = [];
  for (var b = 0; b < knownBrands.length; b++) {
    var br = knownBrands[b];
    for (var i = 0; i < db.length; i++) {
      if (String(db[i].t).toLowerCase().indexOf(br.toLowerCase()) > -1) { found.push(br); break; }
    }
  }
  return found;
}

function flyToCart(el, imgUrl) {
  if (!el) return;
  var card = el.closest(".card") || el.closest(".det-info") || el;
  var imgBox = card.querySelector(".pimg") || card.querySelector("#detImgWrap") || el;
  var navCart = document.getElementById("navCartBtn");
  if (!imgBox || !navCart) return;
  var r = imgBox.getBoundingClientRect();
  var target = navCart.getBoundingClientRect();

  var flyer = document.createElement("img");
  flyer.className = "fly-img";
  flyer.src = imgUrl || "img/logo.png";
  flyer.onerror = function () { this.style.background = "var(--p)"; };
  flyer.style.left = (r.left + r.width / 2 - 27) + "px";
  flyer.style.top = (r.top + r.height / 2 - 27) + "px";
  document.body.appendChild(flyer);

  requestAnimationFrame(function () {
    flyer.style.left = (target.left + target.width / 2 - 12) + "px";
    flyer.style.top = (target.top + 6) + "px";
    flyer.style.width = "22px";
    flyer.style.height = "22px";
    flyer.style.opacity = "0.25";
  });
  setTimeout(function () { flyer.remove(); }, 650);
}

function getCartQty(id) { for (var i = 0; i < cart.length; i++) if (cart[i].id === id) return cart[i].q; return 0; }

function setExactQty(p, val) {
  var n = parseInt(val, 10);
  if (isNaN(n) || n <= 0) {
    cart = cart.filter(function (it) { return it.id !== p.id; });
  } else {
    var maxS = p.s || p.max || 999;
    if (n > maxS) {
      showToast(lang === "tk" ? "📦 Ammarda diňe " + maxS + " sany bar" : "📦 На складе только " + maxS + " шт");
      n = maxS;
    }
    var found = false;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === p.id) { cart[i].q = n; found = true; }
    if (!found) cart.push({ id: p.id, t: p.t, p: p.p, c: p.c || "Umumy", img: p.img || "", q: n, max: maxS });
  }
  updCart(); render();
  if (curDet && curDet.id === p.id) updDetBtn(p);
}

function promptQty(p) {
  curQtyItem = p;
  document.getElementById("qtyItemTitle").innerText = trText(p.t, lang);
  var inp = document.getElementById("qtyInput");
  inp.value = getCartQty(p.id) || 1;
  inp.max = p.s || p.max || 999;
  document.getElementById("qpMaxBtn").innerText = lang === "tk" ? "Ählisi" : "Все";
  document.getElementById("qpMaxBtn").onclick = function () { inp.value = p.s || p.max || 50; };
  document.getElementById("qtyModal").classList.add("open");
  setTimeout(function () { inp.focus(); inp.select(); }, 100);
}
window.setPresetQ = function (n) { if (curQtyItem) document.getElementById("qtyInput").value = Math.min(n, curQtyItem.s || curQtyItem.max || 999); };
document.getElementById("btnConfirmQty").onclick = function () {
  if (curQtyItem) setExactQty(curQtyItem, document.getElementById("qtyInput").value);
  document.getElementById("qtyModal").classList.remove("open");
};

function addCart(p, btnEl) {
  var cur = getCartQty(p.id);
  var maxS = p.s || 999;
  if (cur + 1 > maxS) {
    showToast(lang === "tk" ? "📦 Ammarda diňe " + maxS + " sany bar" : "📦 На складе только " + maxS + " шт");
    return;
  }
  setExactQty(p, cur + 1);
  if (btnEl) flyToCart(btnEl, getProdImgUrl(p));
}
/* === APP.JS — 3-NJI BÖLEK === */
function toggleFav(id) {
  var idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1); else favs.push(id);
  lsSet("ay_favs", favs);
  render(); renderFavs();
  if (curDet && curDet.id === id) updDetFav(id);
}

function updDetFav(id) {
  var isF = favs.indexOf(id) > -1;
  document.getElementById("detTopFav").innerHTML = isF ? hSvg1 : hSvg0;
  var lkCnt = (isF ? 1 : 0) + (parseInt(String(id), 36) % 5 + 1 || 2);
  var statSpans = document.querySelectorAll("#detPage .stat-item");
  if (statSpans.length >= 2) {
    statSpans.item(0).innerHTML = (isF ? hSvg1 : hSvg0) + " <b id='detLikes'>" + lkCnt + "</b>";
    statSpans.item(1).innerHTML = eyeSvg + " <b id='detViews'>" + (views[id] || 15) + "</b>";
  }
}

function updDetBtn(x) {
  var w = document.getElementById("detBarWrap"); w.innerHTML = "";
  var q = getCartQty(x.id);
  if (x.s <= 0) {
    w.innerHTML = '<button class="btn1" disabled style="opacity:.6">' + (lang === "tk" ? "Gutardy" : "Нет в наличии") + '</button>';
  } else if (q > 0) {
    var box = document.createElement("div"); box.className = "iqty"; box.style.height = "44px";
    var bm = document.createElement("button"); bm.innerText = "−"; bm.onclick = function () { setExactQty(x, q - 1); };
    var sp = document.createElement("span"); sp.innerText = q + (lang === "tk" ? " sany (üýtget)" : " шт (изм.)"); sp.onclick = function () { promptQty(x); };
    var bp = document.createElement("button"); bp.innerText = "+";
    bp.onclick = function () {
      if (q >= x.s) { showToast(lang === "tk" ? "📦 Ammarda diňe " + x.s + " sany bar" : "📦 На складе только " + x.s + " шт"); return; }
      addCart(x, bp);
    };
    box.appendChild(bm); box.appendChild(sp); box.appendChild(bp); w.appendChild(box);
  } else {
    var b = document.createElement("button"); b.className = "btn1";
    b.innerText = lang === "tk" ? "🛒 Sebede goş" : "🛒 Добавить в корзину";
    b.onclick = function () { addCart(x, b); };
    w.appendChild(b);
  }
}

function openDet(x) {
  curDet = x;
  views[x.id] = (views[x.id] || (parseInt(String(x.id), 36) % 40 + 12 || 15)) + 1;
  lsSet("ay_views", views);
  var titleTr = trText(x.t, lang);
  document.getElementById("detTopTitle").innerText = titleTr;
  document.getElementById("detName").innerText = titleTr;
  document.getElementById("detPrc").innerText = x.p + " m";
  document.getElementById("detCat").innerText = catName(x.c);
  document.getElementById("detSub").innerText = trText(x.sub || "Umumy", lang);
  document.getElementById("detDesc").style.display = x.d ? "block" : "none";
  document.getElementById("detDesc").innerText = x.d ? trText(x.d, lang) : "";

  document.getElementById("detTopShare").innerHTML = shSvg;
  updDetFav(x.id); updDetBtn(x);

  var iw = document.getElementById("detImgWrap"); iw.innerHTML = "";
  var imgUrl = getProdImgUrl(x);
  var im = document.createElement("img");
  im.src = imgUrl;
  im.onerror = function () { iw.innerHTML = phSvg; };
  iw.appendChild(im);

  document.getElementById("detImgBoxClick").onclick = function () {
    document.getElementById("zoomImg").src = imgUrl;
    document.getElementById("zoomModal").classList.add("open");
  };

  document.getElementById("detTopFav").onclick = function () { toggleFav(x.id); };
  document.getElementById("detTopShare").onclick = function () {
    var txt = titleTr + " — " + x.p + " m\n" + location.href;
    if (navigator.share) navigator.share({ title: titleTr, text: txt }).catch(function () {});
  };

  var simBox = document.getElementById("detSim"); simBox.innerHTML = "";
  var scnt = 0;
  for (var i = 0; i < db.length; i++) {
    var s = db[i];
    if (s.id !== x.id && s.c === x.c && scnt < 10) {
      var sc = document.createElement("div"); sc.className = "sim-card";
      var si = document.createElement("div"); si.className = "sim-img";
      var simg = document.createElement("img"); simg.src = getProdImgUrl(s); simg.loading = "lazy";
      simg.onerror = function () { this.parentElement.innerHTML = phSvg; };
      si.appendChild(simg);
      var sb = document.createElement("div"); sb.style.padding = "8px";
      sb.innerHTML = '<div style="font-size:13.5px;font-weight:800;color:var(--p);margin-bottom:2px">' + escapeHtml(s.p) + ' m</div><div style="font-size:11.5px;height:30px;overflow:hidden">' + escapeHtml(trText(s.t, lang)) + '</div>';
      sc.appendChild(si); sc.appendChild(sb);
      (function (item) { sc.onclick = function () { openDet(item); document.getElementById("detPage").scrollTop = 0; }; })(s);
      simBox.appendChild(sc); scnt++;
    }
  }
  document.getElementById("detPage").classList.add("open");
}

document.getElementById("closeZoom").onclick = function () { document.getElementById("zoomModal").classList.remove("open"); };
document.getElementById("zoomModal").onclick = function (e) { if (e.target === this) this.classList.remove("open"); };

function makeCard(x) {
  var card = document.createElement("div"); card.className = "card";
  card.onclick = function () { openDet(x); };
  var isLiked = favs.indexOf(x.id) > -1;
  var fbtn = document.createElement("button");
  fbtn.className = "fav-btn" + (isLiked ? " liked" : "");
  fbtn.innerHTML = isLiked ? hSvg1 : hSvg0;
  fbtn.onclick = function (e) { e.stopPropagation(); toggleFav(x.id); };
  card.appendChild(fbtn);

  var pimg = document.createElement("div"); pimg.className = "pimg";
  var img = document.createElement("img");
  img.src = getProdImgUrl(x);
  img.loading = "lazy";
  img.onerror = function () { this.parentElement.innerHTML = phSvg; };
  pimg.appendChild(img);

  var info = document.createElement("div"); info.className = "cbody";
  var prcDiv = document.createElement("div"); prcDiv.className = "prc"; prcDiv.innerText = x.p + " m";
  var ttlDiv = document.createElement("div"); ttlDiv.className = "ttl"; ttlDiv.innerText = trText(x.t, lang);
  info.appendChild(prcDiv); info.appendChild(ttlDiv);

  var q = getCartQty(x.id);
  if (x.s <= 0) {
    var btn = document.createElement("button"); btn.className = "add"; btn.disabled = true;
    btn.innerText = lang === "tk" ? "Gutardy" : "Нет в наличии";
    info.appendChild(btn);
  } else if (q > 0) {
    var qbox = document.createElement("div"); qbox.className = "iqty";
    qbox.onclick = function (e) { e.stopPropagation(); };
    var bm = document.createElement("button"); bm.innerText = "−"; bm.onclick = function () { setExactQty(x, q - 1); };
    var sp = document.createElement("span"); sp.innerText = q; sp.onclick = function () { promptQty(x); };
    var bp = document.createElement("button"); bp.innerText = "+";
    bp.onclick = function () {
      if (q >= x.s) { showToast(lang === "tk" ? "📦 Ammarda diňe " + x.s + " sany bar" : "📦 На складе только " + x.s + " шт"); return; }
      addCart(x, bp);
    };
    qbox.appendChild(bm); qbox.appendChild(sp); qbox.appendChild(bp);
    info.appendChild(qbox);
  } else {
    var btn = document.createElement("button"); btn.className = "add";
    btn.innerText = lang === "tk" ? "+ Sebede goş" : "+ В корзину";
    btn.onclick = function (e) { e.stopPropagation(); addCart(x, btn); };
    info.appendChild(btn);
  }
  card.appendChild(pimg); card.appendChild(info);
  return card;
}
/* === APP.JS — 4-NJI BÖLEK === */
window.filterByCat = function (cid, subName) {
  document.getElementById("fcat").value = cid || "";
  document.getElementById("fsub").value = subName || "";
  fBrand = "";
  displayLimit = 40;
  showTab("home");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.filterByBrand = function (bname) {
  document.getElementById("fcat").value = "";
  document.getElementById("fsub").value = "";
  fBrand = bname || "";
  displayLimit = 40;
  showTab("home");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function makeColorfulCatCard(c, idx) {
  var d = document.createElement("div");
  d.className = "ccol-card grad-" + (idx % 9);
  var title = document.createElement("div");
  title.className = "ccol-title";
  title.innerText = c[lang];
  d.appendChild(title);

  if (c.img) {
    var im = document.createElement("img");
    im.className = "ccol-img";
    im.src = c.img;
    im.alt = c[lang];
    im.onerror = function () {
      this.remove();
      var sp = document.createElement("div");
      sp.className = "ccol-ico";
      sp.innerText = c.i;
      d.appendChild(sp);
    };
    d.appendChild(im);
  } else {
    var sp = document.createElement("div");
    sp.className = "ccol-ico";
    sp.innerText = c.i;
    d.appendChild(sp);
  }
  d.onclick = function () { filterByCat(c.id, ""); };
  return d;
}

function renderBrandsUI() {
  var brands = getActiveBrands();
  var cRow = document.getElementById("brandCirclesRow");
  var vGrid = document.getElementById("homeVipBrands");
  var hTitle = document.getElementById("homeBrandTitle");

  if (!brands.length) {
    if (cRow) cRow.style.display = "none";
    if (vGrid) vGrid.style.display = "none";
    if (hTitle) hTitle.style.display = "none";
    return;
  }

  if (cRow) { cRow.style.display = "flex"; cRow.innerHTML = ""; }
  if (vGrid) { vGrid.style.display = "grid"; vGrid.innerHTML = ""; }
  if (hTitle) hTitle.style.display = "flex";

  brands.forEach(function (bn) {
    var slug = bn.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cRow) {
      var item = document.createElement("div");
      item.className = "bcircle-item";
      item.innerHTML = '<div class="bcircle-ring"><img src="img/brands/' + slug + '.png" onerror="this.parentElement.innerHTML=\'<span class=bcircle-txt>' + escapeHtml(bn) + '</span>\'"></div><span class="bcircle-lbl">' + escapeHtml(bn) + '</span>';
      item.onclick = function () { filterByBrand(bn); };
      cRow.appendChild(item);
    }
    if (vGrid) {
      var vc = document.createElement("div");
      vc.className = "vip-card";
      vc.innerHTML = '<div class="vip-top"><span class="vip-badge">★</span><img src="img/brands/' + slug + '.png" onerror="this.parentElement.innerHTML=\'<span class=vip-badge>★</span><b style=color:var(--p);font-size:14px>' + escapeHtml(bn) + '</b>\'"></div><div class="vip-bot">' + escapeHtml(bn) + '</div>';
      vc.onclick = function () { filterByBrand(bn); };
      vGrid.appendChild(vc);
    }
  });
}

function renderBrandChips() {
  var wrap = document.getElementById("brandFilterWrap"), box = document.getElementById("brandChips");
  if (!wrap || !box) return;
  var foundBrands = getActiveBrands();
  if (!foundBrands.length) { wrap.style.display = "none"; return; }
  wrap.style.display = "block"; box.innerHTML = "";
  for (var k = 0; k < foundBrands.length; k++) {
    var ch = document.createElement("span");
    ch.className = "b-chip" + (fBrand === foundBrands[k] ? " act" : "");
    ch.innerText = foundBrands[k];
    (function (bn) { ch.onclick = function () { fBrand = (fBrand === bn) ? "" : bn; renderBrandChips(); }; })(foundBrands[k]);
    box.appendChild(ch);
  }
}

function renderFilterList() {
  var wrap = document.getElementById("fListWrap");
  if (!wrap) return;
  var fc = document.getElementById("fcat"), fsub = document.getElementById("fsub");
  var curCat = fc.value, curSub = fsub.value;
  wrap.innerHTML = "";

  if (!curCat) {
    var rAll = document.createElement("div");
    rAll.className = "flist-row" + (curCat === "" ? " act" : "");
    rAll.innerHTML = "<span>" + (lang === "tk" ? "Ähli kategoriýalar" : "Все категории") + "</span><span>›</span>";
    rAll.onclick = function () { fc.value = ""; fsub.value = ""; renderFilterList(); };
    wrap.appendChild(rAll);
    for (var i = 0; i < cats.length; i++) {
      var c = cats[i], row = document.createElement("div");
      row.className = "flist-row";
      row.innerHTML = "<span>" + escapeHtml(c[lang]) + "</span><span>›</span>";
      (function (cid) { row.onclick = function () { fc.value = cid; fsub.value = ""; renderFilterList(); }; })(c.id);
      wrap.appendChild(row);
    }
  } else {
    var back = document.createElement("div"); back.className = "flist-back";
    back.innerHTML = "<span>‹</span><span>" + (lang === "tk" ? "Ähli kategoriýalar" : "Все категории") + "</span>";
    back.onclick = function () { fc.value = ""; fsub.value = ""; renderFilterList(); };
    wrap.appendChild(back);

    var head = document.createElement("div"); head.className = "flist-head";
    head.innerText = catName(curCat); wrap.appendChild(head);

    var rAllSub = document.createElement("div");
    rAllSub.className = "flist-row" + (curSub === "" ? " act" : "");
    rAllSub.innerHTML = "<span>" + (lang === "tk" ? "Ähli harytlar" : "Все товары") + "</span><span>›</span>";
    rAllSub.onclick = function () { fsub.value = ""; renderFilterList(); };
    wrap.appendChild(rAllSub);

    var subs = {};
    for (var j = 0; j < db.length; j++) if (db[j].c === curCat && db[j].sub) subs[db[j].sub] = 1;
    Object.keys(subs).forEach(function (sname) {
      var srow = document.createElement("div");
      srow.className = "flist-row" + (curSub === sname ? " act" : "");
      srow.innerHTML = "<span>" + escapeHtml(trText(sname, lang)) + "</span><span>›</span>";
      srow.onclick = function () { fsub.value = (fsub.value === sname) ? "" : sname; renderFilterList(); };
      wrap.appendChild(srow);
    });
  }
  renderBrandChips();
}

function initF() {
  var g2 = document.getElementById("cgrid2");
  if (g2) {
    g2.innerHTML = "";
    for (var i = 0; i < cats.length; i++) g2.appendChild(makeColorfulCatCard(cats[i], i));
  }
  renderBrandsUI();
  renderFilterList();
}
/* === APP.JS — 5A BÖLEK === */
function render() {
  var qv = document.getElementById("q").value.trim(), q = qv.toLowerCase();
  var fc = document.getElementById("fcat").value, fsub = document.getElementById("fsub").value;
  var hz = document.getElementById("hideZero").checked, pg = document.getElementById("pgrid");
  document.getElementById("clrQ").style.display = qv ? "block" : "none";

  var hasPriceF = (fMin > 0 || fMax < Infinity);
  var isFiltered = Boolean(qv || fc || fsub || fBrand || hasPriceF);
  document.getElementById("homeTopBlocks").style.display = isFiltered ? "none" : "block";
  document.getElementById("fBadge").style.display = (fc || fsub || fBrand || hasPriceF) ? "inline" : "none";

  var cb = document.getElementById("catBanner");
  if (fc || fBrand) {
    cb.style.display = "flex";
    var lbl = fc ? (catName(fc) + (fsub ? " › " + trText(fsub, lang) : "")) : "";
    if (fBrand) lbl += (lbl ? " • " : "") + fBrand;
    document.getElementById("catBannerTitle").innerText = lbl;
  } else cb.style.display = "none";

  var matched = [];
  for (var i = 0; i < db.length; i++) {
    var x = db[i];
    if (hz && x.s <= 0) continue;
    if (x.p < fMin || x.p > fMax) continue;
    if (fc && x.c !== fc) continue;
    if (fsub && x.sub !== fsub) continue;
    if (fBrand && String(x.t).toLowerCase().indexOf(fBrand.toLowerCase()) === -1) continue;
    if (q) {
      var trTitle = trText(x.t, lang).toLowerCase();
      if (String(x.t).toLowerCase().indexOf(q) === -1 && trTitle.indexOf(q) === -1 && String(x.id).toLowerCase().indexOf(q) === -1) continue;
    }
    matched.push(x);
  }

  pg.innerHTML = "";
  var lmWrap = document.getElementById("loadMoreWrap");

  if (!matched.length) {
    lmWrap.style.display = "none";
    pg.innerHTML = '<div class="empty-box" style="grid-column:1/-1">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Haryt tapylmady" : "Товары не найдены") + '</p></div>';
    return;
  }

  var showCnt = Math.min(displayLimit, matched.length);
  var frag = document.createDocumentFragment();
  for (var k = 0; k < showCnt; k++) frag.appendChild(makeCard(matched[k]));
  pg.appendChild(frag);

  if (matched.length > displayLimit) {
    lmWrap.style.display = "block";
    var rem = matched.length - displayLimit;
    document.getElementById("btnLoadMore").innerText = (lang === "tk" ? "Ýene görkez (+" + Math.min(40, rem) + ")" : "Показать ещё (+" + Math.min(40, rem) + ")");
  } else {
    lmWrap.style.display = "none";
  }
}

document.getElementById("btnLoadMore").onclick = function () { displayLimit += 40; render(); };

function resetAllFilters() {
  document.getElementById("q").value = "";
  document.getElementById("fcat").value = "";
  document.getElementById("fsub").value = "";
  document.getElementById("fMinP").value = "";
  document.getElementById("fMaxP").value = "";
  fMin = 0; fMax = Infinity; fBrand = "";
  displayLimit = 40;
  renderFilterList(); render();
}

function renderFavs() {
  var fg = document.getElementById("fgrid"); fg.innerHTML = ""; var found = 0;
  for (var i = 0; i < db.length; i++) if (favs.indexOf(db[i].id) > -1) { fg.appendChild(makeCard(db[i])); found++; }
  if (!found) fg.innerHTML = '<div class="empty-box" style="grid-column:1/-1">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Halanan haryt ýok" : "Нет избранных товаров") + '</p></div>';
}

function renderStockList() {
  var sl = document.getElementById("stockList"); sl.innerHTML = "";
  var lim = Math.min(150, db.length);
  for (var i = 0; i < lim; i++) {
    var x = db[i], row = document.createElement("div"); row.className = "adm-row";
    var sp = document.createElement("span"); sp.style.maxWidth = "65%";
    sp.innerText = "[" + x.id + "] " + x.t;
    row.appendChild(sp);
    var inp = document.createElement("input"); inp.type = "number"; inp.value = x.s;
    inp.style.cssText = "width:65px;padding:4px 6px;margin:0;text-align:center";
    (function (idx) { inp.onchange = function () { db[idx].s = Math.max(0, parseFloat(this.value) || 0); lsSet("ay_db_v22", db); render(); }; })(i);
    row.appendChild(inp); sl.appendChild(row);
  }
}

function renderOrders() {
  var ol = document.getElementById("olist");
  if (!orders.length) { ol.innerHTML = '<div class="empty-box">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Heniz sargyt ýok" : "Заказов пока нет") + '</p></div>'; return; }
  var h = "";
  for (var i = orders.length - 1; i >= 0; i--) {
    var o = orders[i];
    h += '<div style="background:var(--c);border:1px solid var(--b);padding:13px;border-radius:14px;margin-bottom:10px;font-size:13px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><b style="color:var(--p)">Sargyt ' + escapeHtml(o.id) + '</b><b style="color:var(--ok)">' + escapeHtml(o.tot) + '</b></div><span style="color:var(--m);font-size:12px">' + escapeHtml(o.nm) + ' (' + escapeHtml(o.ph) + ') • ' + escapeHtml(o.ad) + '</span><div style="margin-top:8px;white-space:pre-wrap;font-size:12px;background:var(--g);padding:9px;border-radius:9px;line-height:1.4">' + escapeHtml(o.cleanDet) + '</div></div>';
  }
  ol.innerHTML = h;
}
/* === APP.JS — 5B BÖLEK === */
function updCart() {
  var c = 0, subTot = 0, cl = document.getElementById("clist");
  var invList = document.getElementById("invItemsList");
  cl.innerHTML = "";
  if (invList) invList.innerHTML = "";

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i]; c += item.q; subTot += item.p * item.q;
    var row = document.createElement("div"); row.className = "citem-new";

    var imgDiv = document.createElement("div"); imgDiv.className = "citem-img";
    var im = document.createElement("img"); im.src = getProdImgUrl(item);
    im.onerror = function () { this.parentElement.innerHTML = phSvg; };
    imgDiv.appendChild(im);

    var body = document.createElement("div"); body.className = "citem-body";
    var top = document.createElement("div"); top.className = "citem-top";
    var cttl = document.createElement("div"); cttl.className = "citem-title"; cttl.innerText = trText(item.t, lang);
    top.appendChild(cttl);
    var delBtn = document.createElement("button"); delBtn.className = "citem-del"; delBtn.innerText = "✕";
    (function (it) { delBtn.onclick = function () { setExactQty(it, 0); }; })(item);
    top.appendChild(delBtn);

    var bot = document.createElement("div"); bot.className = "citem-bot";
    bot.innerHTML = '<div class="citem-prc">' + (item.p * item.q).toFixed(2) + ' m</div>';
    var qc = document.createElement("div"); qc.className = "qctrl-new";
    var bm = document.createElement("button"); bm.innerText = "−";
    var qn = document.createElement("span"); qn.innerText = item.q;
    var bp = document.createElement("button"); bp.innerText = "+";
    (function (it) {
      bm.onclick = function () { setExactQty(it, it.q - 1); };
      qn.onclick = function () { promptQty(it); };
      bp.onclick = function () {
        if (it.q >= it.max) { showToast(lang === "tk" ? "📦 Ammarda diňe " + it.max + " sany bar" : "📦 На складе только " + it.max + " шт"); return; }
        setExactQty(it, it.q + 1);
      };
    })(item);
    qc.appendChild(bm); qc.appendChild(qn); qc.appendChild(bp);
    bot.appendChild(qc);

    body.appendChild(top); body.appendChild(bot);
    row.appendChild(imgDiv); row.appendChild(body);
    cl.appendChild(row);

    if (invList) {
      var irow = document.createElement("div"); irow.className = "inv-item-row";
      var iname = document.createElement("div"); iname.className = "inv-item-name";
      iname.innerText = (i + 1) + ". " + trText(item.t, lang) + " (" + item.q + " × " + item.p.toFixed(2) + " m)";
      var isum = document.createElement("div"); isum.className = "inv-item-sum";
      isum.innerText = (item.p * item.q).toFixed(2) + " m";
      irow.appendChild(iname); irow.appendChild(isum);
      invList.appendChild(irow);
    }
  }

  var hasItems = cart.length > 0;
  document.getElementById("cartMainCard").style.display = hasItems ? "block" : "none";
  document.getElementById("btnClearCart").style.display = hasItems ? "block" : "none";
  document.getElementById("cartEmptyWrap").innerHTML = hasItems ? "" : '<div class="empty-box">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Sebediňiz boş" : "Ваша корзина пуста") + '</p></div>';

  var cityEl = document.getElementById("citySel");
  var city = cityEl ? cityEl.value : "arkadag";
  var delivCost = 0;
  if (subTot > 0) {
    if (city === "arkadag") delivCost = subTot >= 200 ? 0 : 10;
    else if (city === "gokdepe") delivCost = 50;
    else if (city === "ashgabat") delivCost = 70;
    else if (city === "anew" || city === "baherden") delivCost = 100;
  }
  var grandTot = subTot + delivCost;

  var pill = document.getElementById("freeShipPill");
  var progBox = document.querySelector(".ship-prog-box");
  pill.innerText = "🚚 " + delivCost.toFixed(2) + " m";

  if (city === "arkadag") {
    if (progBox) progBox.style.display = "block";
    var pct = Math.min(100, Math.round((subTot / 200) * 100));
    document.getElementById("shipProgFill").style.width = pct + "%";
    if (subTot >= 200) {
      pill.className = "free-badge ok";
      document.getElementById("shipProgTxt").innerText = lang === "tk" ? "✅ Arkadag şäherine eltip bermek mugt (0.00 m)!" : "✅ Доставка по г. Аркадаг бесплатная (0.00 м)!";
    } else {
      pill.className = "free-badge";
      var left = (200 - subTot).toFixed(2);
      document.getElementById("shipProgTxt").innerText = lang === "tk" ? "Arkadag şäherine mugt eltip bermek üçin ýene " + left + " m goşuň" : "До бесплатной доставки по г. Аркадаг ещё " + left + " м";
    }
  } else {
    pill.className = "free-badge";
    if (progBox) progBox.style.display = "none";
  }

  document.getElementById("cnt").innerText = c;
  document.getElementById("navCartLbl").innerText = subTot > 0 ? (subTot.toFixed(2) + " m") : (lang === "tk" ? "Sebet" : "Корзина");
  document.getElementById("sumSub").innerText = subTot.toFixed(2) + " m";
  document.getElementById("sumDel").innerText = delivCost.toFixed(2) + " m";
  document.getElementById("sumTot").innerText = grandTot.toFixed(2) + " m";

  if (document.getElementById("invSub")) {
    var nextNo = String(ordCounter + 101).padStart(5, "0");
    document.getElementById("invNum").innerText = "FAKTURA № " + nextNo;
    document.getElementById("invDate").innerText = new Date().toLocaleDateString("ru-RU");
    document.getElementById("invSub").innerText = subTot.toFixed(2) + " m";
    document.getElementById("invDel").innerText = delivCost.toFixed(2) + " m";
    document.getElementById("invGrand").innerText = grandTot.toFixed(2) + " m";
  }
}
/* === APP.JS — 6A BÖLEK === */
function showTab(t) {
  var s = document.querySelectorAll(".sec"), n = document.querySelectorAll(".nbtn");
  for (var i = 0; i < s.length; i++) s[i].classList.remove("act");
  for (var j = 0; j < n.length; j++) n[j].classList.toggle("act", n[j].getAttribute("data-t") === t);
  document.getElementById("s-" + t).classList.add("act");
  document.getElementById("searchBoxMain").style.display = (t === "home") ? "flex" : "none";
  if (t === "fav") renderFavs();
  if (t === "orders") renderOrders();
}

function setL(l) {
  lang = l;
  var els = document.querySelectorAll("[data-tk]");
  for (var i = 0; i < els.length; i++) els[i].innerText = els[i].getAttribute("data-" + l);
  document.getElementById("q").placeholder = l === "tk" ? "Haryt ady boýunça gözleg..." : "Поиск товара...";
  initF(); render(); updCart();
  showToast(l === "tk" ? "🇹🇲 Dil: Türkmençe" : "🇷🇺 Язык: Русский");
}

var curSlide = 0;
function goSlide(n) {
  curSlide = n;
  var tr = document.getElementById("slideTrack"), dots = document.querySelectorAll(".sdot");
  if (tr) tr.style.transform = "translateX(-" + (curSlide * 100) + "%)";
  for (var d = 0; d < dots.length; d++) dots[d].classList.toggle("act", d === curSlide);
}
setInterval(function () { goSlide((curSlide + 1) % 3); }, 4500);

document.getElementById("btnClearCart").onclick = function () {
  cart = []; updCart(); render();
  showToast(lang === "tk" ? "🗑️ Sebet arassalandy" : "🗑️ Корзина очищена");
};
document.getElementById("btnOpenCheckout").onclick = function () {
  if (userAddr.nm && !document.getElementById("nm").value) document.getElementById("nm").value = userAddr.nm;
  if (userAddr.ph && !document.getElementById("ph").value) document.getElementById("ph").value = userAddr.ph;
  if (userAddr.ad && !document.getElementById("ad").value) document.getElementById("ad").value = userAddr.ad;
  updCart();
  document.getElementById("chkPage").classList.add("open");
};
document.getElementById("chkBack").onclick = function () { document.getElementById("chkPage").classList.remove("open"); };

document.getElementById("btnImport").onclick = function () {
  var raw = document.getElementById("pasteBox").value.trim();
  if (!raw) { showToast("⚠️ Excel maglumatyny goýuň!"); return; }
  var lines = raw.split(/\r?\n/), added = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    var cols = line.indexOf("\t") > -1 ? line.split("\t") : line.split(/\s{2,}/);
    if (cols.length < 4) continue;
    var id = String(cols[0]).trim();
    var t = String(cols[1]).trim();
    var stk = Math.max(0, parseFloat(String(cols[2]).replace(",", ".")) || 0);
    var p = Math.max(0, parseFloat(String(cols[3]).replace(",", ".")) || 0);
    if (!id || !t) continue;

    var autoCat = detectCatSub(t);
    var found = false;
    for (var j = 0; j < db.length; j++) {
      if (String(db[j].id) === id) {
        db[j].t = t; db[j].s = stk; db[j].p = p;
        db[j].c = autoCat.c; db[j].sub = autoCat.sub;
        found = true; break;
      }
    }
    if (!found) {
      db.push({ id: id, t: t, s: stk, p: p, c: autoCat.c, sub: autoCat.sub });
    }
    added++;
  }
  lsSet("ay_db_v22", db); render(); renderStockList(); initF();
  document.getElementById("admStat").innerText = "✅ Ýüklendi: " + added + " | Jemi: " + db.length;
  document.getElementById("pasteBox").value = "";
  showToast("✅ " + added + " sany haryt ýüklendi!");
};

document.getElementById("btnOrd").onclick = function () {
  var nm = document.getElementById("nm").value.trim();
  var ph = document.getElementById("ph").value.trim();
  var ad = document.getElementById("ad").value.trim();
  var nt = document.getElementById("nt").value.trim();
  if (!nm || !ph || !ad) {
    showToast(lang === "tk" ? "⚠️ Adyňyzy, telefonyňyzy we salgyňyzy ýazyň!" : "⚠️ Заполните имя, телефон и адрес!");
    return;
  }

  var btn = this; btn.disabled = true; btn.innerText = lang === "tk" ? "Iberilýär..." : "Отправка...";
  var cleanDet = "", subTot = 0, mailItems = [];
  var baseSiteUrl = (location.origin && location.origin !== "null") ? (location.origin + location.pathname.replace(/\/[^\/]*$/, "/")) : "";

  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    var rawImg = getProdImgUrl(it);
    var fullImgLink = (rawImg.indexOf("http") === 0 || rawImg.indexOf("data:") === 0) ? rawImg : (baseSiteUrl ? baseSiteUrl + rawImg : "");

    cleanDet += (i + 1) + ". " + it.t + " (" + it.q + " × " + it.p.toFixed(2) + " m = " + (it.p * it.q).toFixed(2) + " m)\n";
    mailItems.push({ id: it.id, t: it.t, q: it.q, p: it.p, img: fullImgLink });

    subTot += it.p * it.q;
    for (var j = 0; j < db.length; j++) if (db[j].id === it.id) db[j].s = Math.max(0, db[j].s - it.q);
  }

  var cityEl = document.getElementById("citySel");
  var cityVal = cityEl ? cityEl.value : "arkadag";
  var cityLabel = (cityEl && cityEl.selectedIndex >= 0) ? cityEl.options[cityEl.selectedIndex].text.split("(")[0].trim() : "Arkadag şäheri";
  var delivCost = 0;
  if (subTot > 0) {
    if (cityVal === "arkadag") delivCost = subTot >= 200 ? 0 : 10;
    else if (cityVal === "gokdepe") delivCost = 50;
    else if (cityVal === "ashgabat") delivCost = 70;
    else if (cityVal === "anew" || cityVal === "baherden") delivCost = 100;
  }
  var grandTot = subTot + delivCost;
  var invNo = String(ordCounter + 101).padStart(5, "0");
  var oid = "#" + invNo, totStr = grandTot.toFixed(2) + " m";
  var fullAd = cityLabel + ", " + ad;
  var footInfo = "\nHarytlar: " + subTot.toFixed(2) + " m | Eltip bermek (" + cityLabel + "): " + delivCost.toFixed(2) + " m";
  if (nt) footInfo += "\nBellik: " + nt;
  cleanDet += footInfo;

  ordCounter += 1;
  orders.push({ id: oid, nm: nm, ph: ph, ad: fullAd, cleanDet: cleanDet, tot: totStr });
  lsSet("ay_db_v22", db); lsSet("ay_orders", orders); lsSet("ay_ord_cnt", ordCounter);

  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: m1 || "aycyzuw.tm.arkadag@gmail.com",
      cc: m2 || "",
      subject: "Faktura № " + invNo + " (" + cityLabel + " - " + totStr + ")",
      invNo: invNo,
      nm: nm,
      ph: ph,
      ad: fullAd,
      nt: nt || "Ýok",
      items: mailItems,
      subTot: subTot.toFixed(2) + " m",
      deliv: delivCost.toFixed(2) + " m (" + cityLabel + ")",
      totStr: totStr
    })
  }).catch(function () {}).finally(function () {
    btn.disabled = false; btn.innerText = lang === "tk" ? "✅ Sargydy tassykla" : "✅ Подтвердить заказ";
    document.getElementById("chkPage").classList.remove("open");
    cart = []; updCart(); render();
    showToast(lang === "tk" ? "✅ Sargydyňyz kabul edildi! (Faktura № " + invNo + ")" : "✅ Ваш заказ принят! (Фактура № " + invNo + ")");
    showTab("orders");
  });
};
/* === APP.JS — 6B BÖLEK === */
document.getElementById("detBack").onclick = function () { document.getElementById("detPage").classList.remove("open"); };
document.getElementById("logoBtn").onclick = function () {
  taps++; clearTimeout(tt); tt = setTimeout(function () { taps = 0; }, 800);
  if (taps === 3) {
    taps = 0;
    document.getElementById("admPass").value = "";
    document.getElementById("admLogin").classList.add("open");
    setTimeout(function () { document.getElementById("admPass").focus(); }, 100);
  } else {
    resetAllFilters();
    showTab("home");
  }
};

var searchTimer;
document.getElementById("q").onkeyup = function () {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function () { displayLimit = 40; render(); }, 180);
};
document.getElementById("hideZero").onchange = function () { displayLimit = 40; render(); };
document.getElementById("clrQ").onclick = function () { document.getElementById("q").value = ""; displayLimit = 40; render(); };
document.getElementById("btnExitCat").onclick = resetAllFilters;

document.getElementById("btnSort").onclick = function () { document.getElementById("sm").classList.add("open"); };
document.getElementById("btnFilt").onclick = function () { renderFilterList(); document.getElementById("fm").classList.add("open"); };
document.getElementById("btnApplyF").onclick = function () {
  fMin = parseFloat(document.getElementById("fMinP").value) || 0;
  var mx = parseFloat(document.getElementById("fMaxP").value);
  fMax = (!isNaN(mx) && mx > 0) ? mx : Infinity;
  displayLimit = 40;
  render(); document.getElementById("fm").classList.remove("open");
};
document.getElementById("btnResetF").onclick = function () { resetAllFilters(); document.getElementById("fm").classList.remove("open"); };

document.getElementById("srtDef").onclick = function () { db.sort(function (a, b) { return String(a.id).localeCompare(String(b.id)); }); render(); document.getElementById("sm").classList.remove("open"); };
document.getElementById("srt1").onclick = function () { db.sort(function (a, b) { return a.p - b.p; }); render(); document.getElementById("sm").classList.remove("open"); };
document.getElementById("srt2").onclick = function () { db.sort(function (a, b) { return b.p - a.p; }); render(); document.getElementById("sm").classList.remove("open"); };
document.getElementById("srtAz").onclick = function () { db.sort(function (a, b) { return trText(a.t, lang).localeCompare(trText(b.t, lang)); }); render(); document.getElementById("sm").classList.remove("open"); };

document.getElementById("goOrd").onclick = function () { showTab("orders"); };
document.getElementById("backProf").onclick = function () { showTab("prof"); };
document.getElementById("goLang").onclick = function () { setL(lang === "tk" ? "ru" : "tk"); };
document.getElementById("goDark").onclick = function () { document.body.classList.toggle("dark"); };
document.getElementById("goAddr").onclick = function () { document.getElementById("svNm").value = userAddr.nm; document.getElementById("svPh").value = userAddr.ph; document.getElementById("svAd").value = userAddr.ad; document.getElementById("addrModal").classList.add("open"); };
document.getElementById("btnSaveAddr").onclick = function () { userAddr = { nm: document.getElementById("svNm").value.trim(), ph: document.getElementById("svPh").value.trim(), ad: document.getElementById("svAd").value.trim() }; lsSet("ay_uaddr", userAddr); document.getElementById("addrModal").classList.remove("open"); showToast("✅ Ýatda saklandy!"); };
document.getElementById("goCall").onclick = function () { location.href = "tel:" + String(smsPh).replace(/[^0-9+]/g, ""); };
document.getElementById("goSms").onclick = function () { location.href = "sms:" + String(smsPh).replace(/[^0-9+]/g, ""); };

document.getElementById("btnCheckAdm").onclick = function () {
  var inp = document.getElementById("admPass");
  if (inp.value === admPassSaved) {
    inp.value = "";
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("admMail1").value = m1; document.getElementById("admMail2").value = m2; document.getElementById("admSms").value = smsPh;
    document.getElementById("admStat").innerText = "Jemi haryt sany: " + db.length;
    renderStockList(); document.getElementById("admLogin").classList.remove("open"); showTab("prof");
  } else {
    inp.value = "";
    showToast("❌ Nädogry parol!");
  }
};
document.getElementById("btnSaveMail").onclick = function () {
  var np = document.getElementById("admNewPass").value.trim();
  if (np) { admPassSaved = np; lsSet("ay_apass", admPassSaved); document.getElementById("admNewPass").value = ""; }
  m1 = document.getElementById("admMail1").value.trim();
  m2 = document.getElementById("admMail2").value.trim();
  smsPh = document.getElementById("admSms").value.trim();
  lsSet("ay_m1", m1); lsSet("ay_m2", m2); lsSet("ay_sms", smsPh);
  showToast("✅ Ýatda saklandy!");
};
document.getElementById("btnClear").onclick = function () { if (confirm("Arassalamalymy?")) { localStorage.removeItem("ay_db_v22"); db = autoCategorizeAll(baseData.slice()); render(); renderStockList(); initF(); } };
document.getElementById("btnLogout").onclick = function () { document.getElementById("adminPanel").style.display = "none"; document.getElementById("admPass").value = ""; };
document.getElementById("btnCopyGit").onclick = function () {
  var cleanExport = db.map(function (item) {
    return { id: item.id, t: item.t, s: item.s, p: item.p };
  });
  if (navigator.clipboard) {
    navigator.clipboard.writeText("var githubBaza = " + JSON.stringify(cleanExport, null, 2) + ";").then(function () {
      showToast("📋 baza.js üçin kopiýalandy!");
    });
  }
};

var citySelEl = document.getElementById("citySel");
if (citySelEl) citySelEl.onchange = updCart;

var nbtns = document.querySelectorAll(".nbtn");
for (var i = 0; i < nbtns.length; i++) nbtns[i].onclick = function () { showTab(this.getAttribute("data-t")); };
var clsBtns = document.querySelectorAll(".cls");
for (var j = 0; j < clsBtns.length; j++) clsBtns[j].onclick = function () { document.getElementById(this.getAttribute("data-m")).classList.remove("open"); };

initF(); render(); updCart();
