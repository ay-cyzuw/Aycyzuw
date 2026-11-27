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
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

var hSvg0 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
var hSvg1 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
var eyeSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f4c81" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
var shSvg = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
var phSvg = '<div class="p-ph"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>AÝ-ÇYZUW</span></div>';
var emptyBoxSvg = '<svg viewBox="0 0 64 64" fill="none"><path d="M10 22L32 10L54 22V46L32 58L10 46V22Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/><path d="M10 22L32 34L54 22" stroke="#94a3b8" stroke-width="2"/><path d="M32 34V58" stroke="#94a3b8" stroke-width="2"/><rect x="16" y="35" width="8" height="6" rx="1" fill="#f59e0b"/></svg>';

var lImg = document.getElementById("logoImg");
if (lImg) {
  lImg.onload = function () { lImg.style.display = "block"; document.getElementById("logoTxt").style.display = "none"; };
  lImg.onerror = function () {
    if (!this.dataset.t) { this.dataset.t = "1"; this.src = "img/logo.jpg"; }
    else { this.style.display = "none"; document.getElementById("logoTxt").style.display = "block"; }
  };
}

var knownBrands = ["Double A", "Dolphin", "Pensan", "Hatber", "CASIO", "Maped", "Faber-Castell", "ErichKrause", "Berlingo", "Koh-i-Noor", "Attache", "Brauberg", "Centrum", "Deli", "Pilot", "Bic", "Student", "Kangaro", "Sonet", "Gamma", "Luch"];
var cats = [];
function addCat(id, tk, ru, ico, img, subsStr) {
  var subs = subsStr.split("|").map(function (s) {
    var p = s.split("~");
    return { tk: p[0], ru: p[1] || p[0] };
  });
  cats.push({ id: id, tk: tk, ru: ru, i: ico, img: img, subs: subs });
}

addCat("Ofis", "Ofis harytlary", "Товары для офиса", "🗂️", "img/ofis.jpg", "Ofis esbaplary~Офисные принадлежности|Papkalar we arhiw~Папки и архивы|Ofis kagyz önümleri~Бумажная продукция|Tanyşdyryş enjamlary~Оборудование для презентаций|Ofis tehnikasy~Офисная техника");
addCat("Mekdep", "Mekdep harytlary", "Товары для школы", "🎒", "img/mekdep.jpg", "Mekdep esbaplary~Школьные принадлежности|Mekdep torbalary~Портфели для школьников|Depderler we gündelikler~Тетради и дневники|Surat we çyzuw albomlary~Альбомы и папки для рисования|Reňkli kagyz we karton~Цветная бумага и картон");
addCat("Ýazuw", "Ruçkalar, galamlar, markerler", "Ручки, карандаши, маркеры", "🖊️", "img/yazuw.jpg", "Ruçkalar~Ручки|Galamlar~Карандаши|Markerler we tekstmarkerler~Маркеры и текстмаркеры|Pozgyç we uçlaýjylar~Ластики и точилки|Çyzgyç we sirkullar~Линейки и циркули");
addCat("Kitap", "Kitaplar", "Книги", "📚", "img/kitaplar.jpg", "Çeper edebiýat~Художественная литература|Çagalar edebiýaty~Детская литература|Türkmen dilindäki kitaplar~Книги на Туркменском языке|Daşary ýurt dillerindäki kitaplar~Книги на иностранном языке|Okuw gollanmalary we sözlükler~Учебные пособия и словари|Psihologiýa we işewürlik~Психология и деловая литература");
addCat("Döredijilik", "Döredijilik", "Творчество", "🎨", "img/doredijilik.jpg", "Çaga döredijiligi~Детское творчество|Pazllar~Пазлы|Belgiler boýunça suratlar~Картины по номерам|Döredijilik harytlary~Товары для творчества|Çeperçilik harytlary~Товары для художества");
addCat("Baýramçylyk", "Baýramçylyk harytlary", "Товары для праздника", "🎈", "img/bayramcylyk.jpg", "Baýramçylyk bezegleri~Аксессуары для праздника|Açyk hatlar we konwertler~Открытки и конверты|Baýramçylyk şemleri~Свечи для праздника|Howa şarlary we gaplama~Воздушные шары и упаковка");
addCat("Oýunjak", "Oýunjaklar", "Игрушки", "🧸", "img/oyunjak.jpg", "Konstruktorlar we Lego~Конструкторы и Лего|Stol oýunlary we pazllar~Настольные игры и пазлы|Maşynlar we robotlar~Машины и роботы|Gurjaklar we ýumşak oýunjaklar~Куклы и мягкие игрушки|Ösdüriji we sport oýunjaklary~Развивающие и sport игры");
addCat("Bižuteriýa", "Bižuteriýa", "Бижутерия", "💍", "img/bizuteriya.jpg", "Saç bezegleri we obodoklar~Аксессуары для волос и ободки|Bilezikler we şaý-sepler~Браслеты и украшения");
addCat("Sowgatlyk", "Sowgatlyk önümler", "Сувенирная продукция", "🎁", "img/sowgatlyk.jpg", "Breloklar we antistressler~Брелки и антистрессы|Gapjyklar we kopilkalar~Кошельки и копилки|Sowgatlyk gutular we aýnalar~Подарочные коробки и зеркала");
addCat("Kompýuter", "Kompýuter enjamlary", "Компьютерная техника", "💻", "img/kompyuter.jpg", "Fleşkalar we diskler~Носители информации и флешки|Syçanjyk halylary we aksessuarlar~Коврики и аксессуары|Nauşnikler we kolonkalar~Наушники и колонки|Printer boýaglary~Краски для принтеров");
addCat("Hojalyk", "Öý-hojalyk harytlary", "Хозяйственные товары", "🏠", "img/hojalyk.jpg", "Suw çüýşeleri we termoslar~Бутылки для воды и термосы|Interýer bezegleri we sagatlar~Декор интерьера и часы|Hoşboý yslar we arassaçylyk~Освежители и хозтовары|Zibil bedrelere we beýlekiler~Урны и прочие товары");

var dictPairs = [

  { ru: "шариковая ручка", tk: "şarikli ruçka" }, { ru: "гелевая ручка", tk: "gelli ruçka" },
  { ru: "простой карандаш", tk: "ýönekeý galam" }, { ru: "цветные карандаши", tk: "reňkli galamlar" },
  { ru: "тетрадь", tk: "depder" }, { ru: "ручка", tk: "ruçka" }, { ru: "карандаш", tk: "galam" },
  { ru: "ластик", tk: "pozgyç" }, { ru: "стиралка", tk: "pozgyç" }, { ru: "точилка", tk: "uçlaýjy" },
  { ru: "линейка", tk: "çyzgyç" }, { ru: "циркуль", tk: "sirkul" }, { ru: "маркер", tk: "marker" },
  { ru: "бумага", tk: "kagyz" }, { ru: "альбом", tk: "albom" }, { ru: "дневник", tk: "gündelik" },
  { ru: "блокнот", tk: "bloknot" }, { ru: "папка", tk: "papka" }, { ru: "файл", tk: "faýl" },
  { ru: "степлер", tk: "stepler" }, { ru: "скобы", tk: "skoba" }, { ru: "ножницы", tk: "gaýçy" },
  { ru: "клей", tk: "ýelim" }, { ru: "калькулятор", tk: "kalkulýator" }, { ru: "пенал", tk: "penal" },
  { ru: "рюкзак", tk: "rukzak" }, { ru: "портфель", tk: "portfel" }, { ru: "краски", tk: "boýaglar" },
  { ru: "акварель", tk: "akwarel" }, { ru: "гуашь", tk: "guaş" }, { ru: "кисть", tk: "çotga" },
  { ru: "пластилин", tk: "plastilin" }, { ru: "книга", tk: "kitap" }, { ru: "скотч", tk: "skoç" }
];

function trText(str, targetLang) {
  if (!str) return "";
  var res = String(str);
  for (var i = 0; i < dictPairs.length; i++) {
    var pair = dictPairs[i];
    var from = targetLang === "tk" ? pair.ru : pair.tk;
    var to = targetLang === "tk" ? pair.tk : pair.ru;
    var esc = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    res = res.replace(new RegExp(esc, "gi"), function (m) {
      return m.charAt(0) === m.charAt(0).toUpperCase() ? to.charAt(0).toUpperCase() + to.slice(1) : to;
    });
  }
  return res;
}

// Akylly Gözleg: Kiril we Latyn harplaryny deňeşdirmek üçin
function normSearch(s) {
  var map = {
    "а":"a","б":"b","в":"w","г":"g","д":"d","е":"e","ё":"yo","ж":"j","з":"z","и":"i","й":"y",
    "к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f",
    "х":"h","ц":"s","ч":"ch","ш":"sh","щ":"sh","ъ":"","ы":"y","ь":"","э":"e","ю":"yu","я":"ya",
    "ä":"a","ö":"o","ü":"u","ň":"n","ş":"sh","ç":"ch","ž":"j","ý":"y"
  };
  return String(s || "").toLowerCase().replace(/ch|sh|yu|ya|yo/g, function(m) { return m; })
    .split("").map(function(ch) { return map[ch] !== undefined ? map[ch] : ch; }).join("");
}

function detectCatSub(name) {
  var s = String(name).toLowerCase();
  if (/флеш|fles|диск|disk|cd-r|dvd|мышь|мышк|коврик|наушник|inpods|ultrapods|колонка|kalonka|принтер|printer|inkbank|usb|adapter|модем/.test(s)) {
    if (/флеш|fles|диск|disk|cd-r|dvd/.test(s)) return { c: "Kompýuter", sub: "Fleşkalar we diskler" };
    if (/наушник|inpods|ultrapods|колонка|kalonka|speaker|микрофон/.test(s)) return { c: "Kompýuter", sub: "Nauşnikler we kolonkalar" };
    if (/принтер|printer|inkbank/.test(s)) return { c: "Kompýuter", sub: "Printer boýaglary" };
    return { c: "Kompýuter", sub: "Syçanjyk halylary we aksessuarlar" };
  }
  if (/заколк|zokolka|ободок|abadok|abodok|браслет|бреслет|брош|волос|saç|sac|невидимк|newidimk|newedimk|шпилк|бантик|bantik/.test(s)) {
    if (/браслет|бреслет|jewelry|monjuk/.test(s)) return { c: "Bižuteriýa", sub: "Bilezikler we şaý-sepler" };
    return { c: "Bižuteriýa", sub: "Saç bezegleri we obodoklar" };
  }
  if (/брелок|brelok|копилк|kopilk|кошел|gapjyk|антистресс|anti stres|сквиш|squishy|lapa|зеркал|ayna|aýna|подарочн.*коробк|karopka sowgat/.test(s)) {
    if (/брелок|brelok|антистресс|anti stres|сквиш|squishy|lapa/.test(s)) return { c: "Sowgatlyk", sub: "Breloklar we antistressler" };
    if (/кошел|gapjyk|копилк|kopilk/.test(s)) return { c: "Sowgatlyk", sub: "Gapjyklar we kopilkalar" };
    return { c: "Sowgatlyk", sub: "Sowgatlyk gutular we aýnalar" };
  }
  if (/бутылк|бутилк|butilk|термос|termos|освежител|освижител|мыло|мило|салфетк|salfetka|урн|bedere|будильник|часи|часы|sagat|декор|dekor|decor|зонт|zont/.test(s)) {
    if (/бутылк|бутилк|butilk|термос|termos/.test(s)) return { c: "Hojalyk", sub: "Suw çüýşeleri we termoslar" };
    if (/урн|bedere/.test(s)) return { c: "Hojalyk", sub: "Zibil bedrelere we beýlekiler" };
    if (/освежител|освижител|мыло|мило|салфетк|salfetka/.test(s)) return { c: "Hojalyk", sub: "Hoşboý yslar we arassaçylyk" };
    return { c: "Hojalyk", sub: "Interýer bezegleri we sagatlar" };
  }
  if (/шар|şar|balloon|свеч|шем|подар|лента|lenta|открытк|otkritk|топер|toper|happy birthday|праздн|хлопуш/.test(s)) {
    if (/открытк|otkritk|конверт|konwert/.test(s)) return { c: "Baýramçylyk", sub: "Açyk hatlar we konwertler" };
    if (/свеч|шем/.test(s)) return { c: "Baýramçylyk", sub: "Baýramçylyk şemleri" };
    if (/шар|şar|balloon|упаков|пленка для празднич/.test(s)) return { c: "Baýramçylyk", sub: "Howa şarlary we gaplama" };
    return { c: "Baýramçylyk", sub: "Baýramçylyk bezegleri" };
  }
  if (/лего|lego|кукл|gurjak|машин|masyn|car|пазл|pazl|шахмат|küşt|kust|chess|игра|oýun|oyun|мяч|top|конструктор|пистолет|pistolet|робот|robot|uno|мафи|домино|лол|lol/.test(s)) {
    if (/лего|lego|конструктор|building blocks/.test(s)) return { c: "Oýunjak", sub: "Konstruktorlar we Lego" };
    if (/пазл|pazl|шахмат|küşt|kust|chess|uno|мафи|домино|лото|кубик рубик/.test(s)) return { c: "Oýunjak", sub: "Stol oýunlary we pazllar" };
    if (/машин|masyn|car|робот|robot|вертол|самол|поезд|poyuz/.test(s)) return { c: "Oýunjak", sub: "Maşynlar we robotlar" };
    if (/кукл|gurjak|barbie|мягк/.test(s)) return { c: "Oýunjak", sub: "Gurjaklar we ýumşak oýunjaklary" };
    return { c: "Oýunjak", sub: "Ösdüriji we sport oýunjaklary" };
  }
  if (/ручк|ruck|ruçk|карандаш|арандаш|galam|маркер|marker|текстмакер|текстовыделител|хайлайтер|haýla|hayla|ластик|стиралк|pozgy|точилк|uçla|tocil|линейк|çyzgy|liney|циркуль|сиркул|sirkul/.test(s)) {
    if (/ручк|ruck|ruçk/.test(s)) return { c: "Ýazuw", sub: "Ruçkalar" };
    if (/карандаш|арандаш|galam/.test(s)) return { c: "Ýazuw", sub: "Galamlar" };
    if (/маркер|marker|текстмакер|текстовыделител|хайлайтер|haýla|hayla|лайнер|layner/.test(s)) return { c: "Ýazuw", sub: "Markerler we tekstmarkerler" };
    if (/ластик|стиралк|pozgy|точилк|uçla|tocil/.test(s)) return { c: "Ýazuw", sub: "Pozgyç we uçlaýjylar" };
    return { c: "Ýazuw", sub: "Çyzgyç we sirkullar" };
  }
  if (/краск|boýag|гуаш|акварел|кист|çotga|çotka|пластилин|холст|holst|мел|фломастер|пломастер|палитр|palitra|мольберт|malbert|раскраск|raskraska|алмазн|картина по номерам|бисер|фетр/.test(s)) {
    if (/пазл/.test(s)) return { c: "Döredijilik", sub: "Pazllar" };
    if (/алмазн|картина по номерам/.test(s)) return { c: "Döredijilik", sub: "Belgiler boýunça suratlar" };
    if (/холст|holst|мольберт|malbert|подрамник|мастихин|маслян/.test(s)) return { c: "Döredijilik", sub: "Çeperçilik harytlary" };
    if (/наклейк|stiker|стикер|бисер|фетр|лента декоратив/.test(s)) return { c: "Döredijilik", sub: "Döredijilik harytlary" };
    return { c: "Döredijilik", sub: "Çaga döredijiligi" };
  }
  if (/книг|kitap|сказк|ertek|словарь|sözlük|sozluk|пропис|атлас|глобус|globus|энциклопед|учебник|oxford|headway/.test(s)) {
    if (/сказк|ertek|малыш|детск/.test(s)) return { c: "Kitap", sub: "Çagalar edebiýaty" };
    if (/türkmen|turkmen|gurbannazar|kerbabaýew|magtymguly|gurbannepesow/.test(s)) return { c: "Kitap", sub: "Türkmen dilindäki kitaplar" };
    if (/english|oxford|headway|иностран|турецк|kitap /.test(s)) return { c: "Kitap", sub: "Daşary ýurt dillerindäki kitaplar" };
    if (/словарь|sözlük|sozluk|пропис|атлас|глобус|globus|учебник|тренаж/.test(s)) return { c: "Kitap", sub: "Okuw gollanmalary we sözlükler" };
    if (/психолог|бизнес|привыч|кийосаки|карнеги|законов власти/.test(s)) return { c: "Kitap", sub: "Psihologiýa we işewürlik" };
    return { c: "Kitap", sub: "Çeper edebiýat" };
  }
  if (/папк|papka|файл|faýl|скоросшиват|степлер|stepler|скоб|дырокол|дыракол|dyrakol|скотч|skoç|ножниц|gaýçy|gaycy|клей|ýelim|kley|скрепк|skrepk|зажим|органайзер|organa|калькулятор|калкулятор|kalkul|бумаг.*а4|бумаг.*а3|ламинат|брошюр|доск.*магнит|доск.*маркер|печат|штамп|ценник|чек/.test(s)) {
    if (/папк|papka|файл|faýl|скоросшиват/.test(s)) return { c: "Ofis", sub: "Papkalar we arhiw" };
    if (/бумаг.*а4|бумаг.*а3|фотобумаг|чек|рулон|конверт|блокнот|ежедневник/.test(s)) return { c: "Ofis", sub: "Ofis kagyz önümleri" };
    if (/доск.*магнит|доск.*маркер|пробков/.test(s)) return { c: "Ofis", sub: "Tanyşdyryş enjamlary" };
    if (/калькулятор|калкулятор|kalkul|ламинат|брошюр|резак|уничтожит|батаре/.test(s)) return { c: "Ofis", sub: "Ofis tehnikasy" };
    return { c: "Ofis", sub: "Ofis esbaplary" };
  }
  if (/пенал|penal|рюкзак|юкзак|rukzak|портфел|portfel|сумк|sumka|мешок/.test(s)) return { c: "Mekdep", sub: "Mekdep torbalary" };
  if (/тетрад|етрад|depder|дневник|gündelik|gundelik/.test(s)) return { c: "Mekdep", sub: "Depderler we gündelikler" };
  if (/альбом|албом|albom|скетчбук|sketch/.test(s)) return { c: "Mekdep", sub: "Surat we çyzuw albomlary" };
  if (/цветн.*бумаг|картон|ватман/.test(s)) return { c: "Mekdep", sub: "Reňkli kagyz we karton" };
  return { c: "Mekdep", sub: "Mekdep esbaplary" };
}
~Подарочные коробки и зеркала");
addCat("Kompýuter", "Kompýuter enjamlary", "Компьютерная техника", "💻", "img/kompyuter.jpg", "Fleşkalar we diskler~Носители информации и флешки|Syçanjyk halylary we aksessuarlar~Коврики и аксессуары|Nauşnikler we kolonkalar~Наушники и колонки|Printer boýaglary~Краски для принтеров");
addCat("Hojalyk", "Öý-hojalyk harytlary", "Хозяйственные товары", "🏠", "img/hojalyk.jpg", "Suw çüýşeleri we termoslar~Бутылки для воды и термосы|Interýer bezegleri we sagatlar~Декор интерьера и часы|Hoşboý yslar we arassaçylyk~Освежители и хозтовары|Zibil bedrelere we beýlekiler~Урны и прочие товары");
function autoCategorizeAll(list) {
  if (!Array.isArray(list)) return [];
  for (var i = 0; i < list.length; i++) {
    var det = detectCatSub(list[i].t);
    list[i].c = det.c;
    list[i].sub = det.sub;
    list[i].s = Math.max(0, Number(list[i].s) || 0);
    list[i].p = Math.max(0, Number(list[i].p) || 0);
    list[i].op = Math.max(0, Number(list[i].op) || 0);
  }
  return list;
}

function lsGet(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

var baseData = (typeof githubBaza !== "undefined" && Array.isArray(githubBaza)) ? githubBaza : [];
var db = autoCategorizeAll(lsGet("ay_db_v32", baseData));
var favs = lsGet("ay_favs", []);
var views = lsGet("ay_views", {});
var orders = lsGet("ay_orders", []);
var userAddr = lsGet("ay_uaddr", { nm: "", ph: "", ad: "" });
var m1 = lsGet("ay_m1", "aycyzuw.tm.arkadag@gmail.com");
var m2 = lsGet("ay_m2", "aycyzuw.tm2026@gmail.com");
var smsPh = lsGet("ay_sms", "+99365637644");
var ordCounter = parseInt(lsGet("ay_ord_cnt", 0), 10) || 0;
var adminSessionPass = "";

var cart = [], lang = "tk", taps = 0, tt, curDet = null, curQtyItem = null;
var fMin = 0, fMax = Infinity, fBrand = "", fOnlyPromo = false;
var displayLimit = 40;
var activeMenuCat = "";

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
      showToast(lang === "tk" ? "⚠️ Häzirki wagtda has köp mukdar elýeterli däl" : "⚠️ Большее количество временно недоступно");
      n = maxS;
    }
    var found = false;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === p.id) { cart[i].q = n; found = true; }
    if (!found) cart.push({ id: p.id, t: p.t, p: p.p, c: p.c || "Mekdep", img: p.img || "", q: n, max: maxS });
  }
  updCart(); render();
  if (curDet && curDet.id === p.id) updDetBtn(p);
}

function promptQty(p) {
  curQtyItem = p;
  document.getElementById("qtyItemTitle").innerText = trText(p.t, lang);
  var inp = document.getElementById("qtyInput");
  inp.value = getCartQty(p.id) || 1;
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
    showToast(lang === "tk" ? "⚠️ Häzirki wagtda has köp mukdar elýeterli däl" : "⚠️ Большее количество временно недоступно");
    return;
  }
  setExactQty(p, cur + 1);
  if (btnEl) flyToCart(btnEl, getProdImgUrl(p));
}

function toggleFav(id) {
  var idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1); else favs.push(id);
  lsSet("ay_favs", favs);
  render(); renderFavs();
  if (curDet && curDet.id === id) updDetFav(id);
}
var detGalleryImgs = [];
var curZoomIdx = 0;

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
      if (q >= x.s) { showToast(lang === "tk" ? "⚠️ Häzirki wagtda has köp mukdar elýeterli däl" : "⚠️ Большее количество временно недоступно"); return; }
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

function renderDetThumbs() {
  var tBox = document.getElementById("detThumbs");
  if (!tBox) return;
  if (detGalleryImgs.length <= 1) { tBox.style.display = "none"; return; }
  tBox.style.display = "flex";
  tBox.innerHTML = "";
  detGalleryImgs.forEach(function (src, idx) {
    var btn = document.createElement("button");
    btn.className = "det-thumb-btn" + (idx === curZoomIdx ? " act" : "");
    btn.innerHTML = '<img src="' + src + '" alt="">';
    btn.onclick = function () {
      curZoomIdx = idx;
      var iw = document.getElementById("detImgWrap");
      iw.innerHTML = '<img src="' + src + '" alt="">';
      renderDetThumbs();
    };
    tBox.appendChild(btn);
  });
}

function openDet(x) {
  curDet = x;
  views[x.id] = (views[x.id] || (parseInt(String(x.id), 36) % 40 + 12 || 15)) + 1;
  lsSet("ay_views", views);
  var titleTr = trText(x.t, lang);
  document.getElementById("detTopTitle").innerText = titleTr;
  document.getElementById("detName").innerText = titleTr;

  var prcEl = document.getElementById("detPrc");
  var oldEl = document.getElementById("detOldPrc");
  var pBadge = document.getElementById("detPromoBadge");
  prcEl.innerText = x.p + " m";
  if (x.op && x.op > x.p) {
    var disc = Math.round(((x.op - x.p) / x.op) * 100);
    prcEl.classList.add("promo-on");
    oldEl.style.display = "inline";
    oldEl.innerText = x.op + " m";
    pBadge.style.display = "block";
    pBadge.innerText = "-" + disc + "%";
  } else {
    prcEl.classList.remove("promo-on");
    oldEl.style.display = "none";
    pBadge.style.display = "none";
  }

  document.getElementById("detCat").innerText = catName(x.c);
  document.getElementById("detSub").innerText = trText(x.sub || "Umumy", lang);
  document.getElementById("detDesc").style.display = x.d ? "block" : "none";
  document.getElementById("detDesc").innerText = x.d ? trText(x.d, lang) : "";

  document.getElementById("detTopShare").innerHTML = shSvg;
  updDetFav(x.id); updDetBtn(x);

  var baseImg = getProdImgUrl(x);
  detGalleryImgs = [baseImg];
  curZoomIdx = 0;
  var tBox = document.getElementById("detThumbs");
  if (tBox) { tBox.style.display = "none"; tBox.innerHTML = ""; }

  var iw = document.getElementById("detImgWrap"); iw.innerHTML = "";
  var im = document.createElement("img");
  im.src = baseImg;
  im.onerror = function () { iw.innerHTML = phSvg; };
  iw.appendChild(im);

  // 2-nji we 3-nji suratlary barlamak (barkod_2.jpg, barkod_3.jpg)
  if (baseImg.indexOf("img/") === 0 && baseImg.indexOf(".") > -1) {
    var dotIdx = baseImg.lastIndexOf(".");
    var prefix = baseImg.slice(0, dotIdx);
    var ext = baseImg.slice(dotIdx);
    [prefix + "_2" + ext, prefix + "_3" + ext].forEach(function (extraUrl) {
      var probe = new Image();
      probe.onload = function () {
        if (curDet && curDet.id === x.id && detGalleryImgs.indexOf(extraUrl) === -1) {
          detGalleryImgs.push(extraUrl);
          renderDetThumbs();
        }
      };
      probe.src = extraUrl;
    });
  }

  document.getElementById("detImgBoxClick").onclick = function () { openZoomAt(curZoomIdx); };
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

function openZoomAt(idx) {
  if (!detGalleryImgs.length) return;
  curZoomIdx = (idx + detGalleryImgs.length) % detGalleryImgs.length;
  document.getElementById("zoomImg").src = detGalleryImgs[curZoomIdx];
  var multi = detGalleryImgs.length > 1;
  document.getElementById("zoomPrev").style.display = multi ? "flex" : "none";
  document.getElementById("zoomNext").style.display = multi ? "flex" : "none";
  document.getElementById("zoomCounter").innerText = (curZoomIdx + 1) + " / " + detGalleryImgs.length;
  document.getElementById("zoomModal").classList.add("open");
}
document.getElementById("zoomPrev").onclick = function (e) { e.stopPropagation(); openZoomAt(curZoomIdx - 1); };
document.getElementById("zoomNext").onclick = function (e) { e.stopPropagation(); openZoomAt(curZoomIdx + 1); };
document.getElementById("closeZoom").onclick = function () { document.getElementById("zoomModal").classList.remove("open"); };
document.getElementById("zoomModal").onclick = function (e) { if (e.target === this) this.classList.remove("open"); };
var touchStartX = 0;
document.getElementById("zoomModal").addEventListener("touchstart", function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.getElementById("zoomModal").addEventListener("touchend", function (e) {
  var dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 45 && detGalleryImgs.length > 1) openZoomAt(dx < 0 ? curZoomIdx + 1 : curZoomIdx - 1);
}, { passive: true });
function makeCard(x) {
  var card = document.createElement("div"); card.className = "card";
  card.onclick = function () { openDet(x); };

  if (x.op && x.op > x.p) {
    var disc = Math.round(((x.op - x.p) / x.op) * 100);
    var pb = document.createElement("div");
    pb.className = "promo-badge";
    pb.innerText = "-" + disc + "%";
    card.appendChild(pb);
  }

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
  var prcRow = document.createElement("div"); prcRow.className = "prc-row";
  var prcDiv = document.createElement("span");
  prcDiv.className = "prc" + (x.op && x.op > x.p ? " promo-on" : "");
  prcDiv.innerText = x.p + " m";
  prcRow.appendChild(prcDiv);
  if (x.op && x.op > x.p) {
    var oldDiv = document.createElement("span");
    oldDiv.className = "old-prc";
    oldDiv.innerText = x.op + " m";
    prcRow.appendChild(oldDiv);
  }

  var ttlDiv = document.createElement("div"); ttlDiv.className = "ttl"; ttlDiv.innerText = trText(x.t, lang);
  info.appendChild(prcRow); info.appendChild(ttlDiv);

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
      if (q >= x.s) { showToast(lang === "tk" ? "⚠️ Häzirki wagtda has köp mukdar elýeterli däl" : "⚠️ Большее количество временно недоступно"); return; }
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

function renderPromoSection() {
  var sec = document.getElementById("promoSection");
  var grid = document.getElementById("promoScrollGrid");
  if (!sec || !grid) return;
  var promos = db.filter(function (x) { return x.op && x.op > x.p && x.s > 0; });
  if (!promos.length) { sec.style.display = "none"; return; }
  sec.style.display = "block";
  grid.innerHTML = "";
  var lim = Math.min(12, promos.length);
  for (var i = 0; i < lim; i++) grid.appendChild(makeCard(promos[i]));
}

document.getElementById("btnAllPromos").onclick = function () {
  fOnlyPromo = true;
  document.getElementById("fOnlyPromo").checked = true;
  displayLimit = 40;
  render();
};

window.filterByCat = function (cid, subName) {
  document.getElementById("fcat").value = cid || "";
  document.getElementById("fsub").value = subName || "";
  fBrand = ""; fOnlyPromo = false;
  displayLimit = 40;
  showTab("home");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.filterByBrand = function (bname) {
  document.getElementById("fcat").value = "";
  document.getElementById("fsub").value = "";
  fBrand = bname || ""; fOnlyPromo = false;
  displayLimit = 40;
  showTab("home");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function renderCatalogGrid() {
  var g2 = document.getElementById("cgrid2");
  var subHdr = document.getElementById("catSubHeader");
  if (!g2) return;
  g2.innerHTML = "";

  if (!activeMenuCat) {
    if (subHdr) subHdr.style.display = "none";
    for (var i = 0; i < cats.length; i++) {
      (function (c, idx) {
        var d = document.createElement("div");
        d.className = "ccol-card grad-" + (idx % 11);
        d.innerHTML = '<div class="ccol-title">' + escapeHtml(c[lang]) + '</div>';
        if (c.img) {
          var im = document.createElement("img");
          im.className = "ccol-img";
          im.src = c.img;
          im.onerror = function () { this.remove(); var sp = document.createElement("div"); sp.className = "ccol-ico"; sp.innerText = c.i; d.appendChild(sp); };
          d.appendChild(im);
        }
        d.onclick = function () {
          if (c.subs && c.subs.length) {
            activeMenuCat = c.id;
            renderCatalogGrid();
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            filterByCat(c.id, "");
          }
        };
        g2.appendChild(d);
      })(cats[i], i);
    }
  } else {
    var catObj = null;
    for (var k = 0; k < cats.length; k++) if (cats[k].id === activeMenuCat) catObj = cats[k];
    if (!catObj) { activeMenuCat = ""; renderCatalogGrid(); return; }

    if (subHdr) {
      subHdr.style.display = "flex";
      document.getElementById("catSubTitle").innerText = catObj[lang];
      document.getElementById("btnCatBack").onclick = function () { activeMenuCat = ""; renderCatalogGrid(); };
      document.getElementById("btnCatAllItems").onclick = function () { filterByCat(catObj.id, ""); };
    }

    catObj.subs.forEach(function (subItem, idx) {
      var d = document.createElement("div");
      d.className = "ccol-card grad-" + ((idx + 2) % 11);
      d.innerHTML = '<div class="ccol-title">' + escapeHtml(subItem[lang]) + '</div><div class="ccol-ico">' + catObj.i + '</div>';
      d.onclick = function () { filterByCat(catObj.id, subItem.tk); };
      g2.appendChild(d);
    });
  }
}

function openBrandsModal() {
  var box = document.getElementById("brandsGridBox");
  if (!box) return;
  var brands = getActiveBrands();
  box.innerHTML = "";
  brands.forEach(function (bn) {
    var slug = bn.toLowerCase().replace(/[^a-z0-9]/g, "");
    var card = document.createElement("div");
    card.className = "brand-cube-card";
    card.innerHTML = '<div class="brand-cube-logo"><img src="img/brands/' + slug + '.png" alt="' + escapeHtml(bn) + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'"><span class="brand-cube-fallback" style="display:none">' + escapeHtml(bn) + '</span></div><div class="brand-cube-name">' + escapeHtml(bn) + '</div>';
    card.onclick = function () {
      document.getElementById("brandsPage").classList.remove("open");
      filterByBrand(bn);
    };
    box.appendChild(card);
  });
  document.getElementById("brandsPage").classList.add("open");
}

function handleSlideClick() {
  if (curSlide === 0) { activeMenuCat = ""; showTab("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else if (curSlide === 1) { document.getElementById("delivModal").classList.add("open"); }
  else if (curSlide === 2) { openBrandsModal(); }
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
  renderCatalogGrid();
  renderFilterList();
  renderPromoSection();
}

var lastLoggedSearch = "";
function render() {
  var qv = document.getElementById("q").value.trim(), q = qv.toLowerCase();
  var qNorm = normSearch(qv);
  var fc = document.getElementById("fcat").value, fsub = document.getElementById("fsub").value;
  var hz = document.getElementById("hideZero").checked, pg = document.getElementById("pgrid");
  document.getElementById("clrQ").style.display = qv ? "block" : "none";

  var hasPriceF = (fMin > 0 || fMax < Infinity);
  var isFiltered = Boolean(qv || fc || fsub || fBrand || hasPriceF || fOnlyPromo);
  document.getElementById("homeTopBlocks").style.display = isFiltered ? "none" : "block";
  document.getElementById("fBadge").style.display = (fc || fsub || fBrand || hasPriceF || fOnlyPromo) ? "inline" : "none";

  var cb = document.getElementById("catBanner");
  if (fc || fBrand || fOnlyPromo) {
    cb.style.display = "flex";
    var parts = [];
    if (fOnlyPromo) parts.push(lang === "tk" ? "Arzanladyşdaky harytlar" : "Товары по акции");
    if (fc) parts.push(catName(fc) + (fsub ? " › " + trText(fsub, lang) : ""));
    if (fBrand) parts.push(fBrand);
    document.getElementById("catBannerTitle").innerText = parts.join(" • ");
  } else cb.style.display = "none";

  if (q && q.length >= 3 && q !== lastLoggedSearch) {
    lastLoggedSearch = q;
    fetch("send.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "search_log", q: q }) }).catch(function () {});
  }

  var matched = [];
  for (var i = 0; i < db.length; i++) {
    var x = db[i];
    if (hz && x.s <= 0) continue;
    if (fOnlyPromo && !(x.op && x.op > x.p)) continue;
    if (x.p < fMin || x.p > fMax) continue;
    if (fc && x.c !== fc) continue;
    if (fsub && x.sub !== fsub) continue;
    if (fBrand && String(x.t).toLowerCase().indexOf(fBrand.toLowerCase()) === -1) continue;
    if (q) {
      var origLow = String(x.t).toLowerCase();
      var trTitle = trText(x.t, lang).toLowerCase();
      var normT = normSearch(x.t + " " + trTitle);
      if (origLow.indexOf(q) === -1 && trTitle.indexOf(q) === -1 && normT.indexOf(qNorm) === -1 && String(x.id).toLowerCase().indexOf(q) === -1) continue;
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
  document.getElementById("fOnlyPromo").checked = false;
  fMin = 0; fMax = Infinity; fBrand = ""; fOnlyPromo = false;
  displayLimit = 40;
  renderFilterList(); render();
}

function renderFavs() {
  var fg = document.getElementById("fgrid"); fg.innerHTML = ""; var found = 0;
  for (var i = 0; i < db.length; i++) if (favs.indexOf(db[i].id) > -1) { fg.appendChild(makeCard(db[i])); found++; }
  if (!found) fg.innerHTML = '<div class="empty-box" style="grid-column:1/-1">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Halanan haryt ýok" : "Нет избранных товаров") + '</p></div>';
}
window.switchAdmTab = function (tabName, btnEl) {
  var tabs = document.querySelectorAll(".adm-tab");
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("act");
  if (btnEl) btnEl.classList.add("act");
  var panes = document.querySelectorAll(".adm-pane");
  for (var j = 0; j < panes.length; j++) panes[j].style.display = "none";
  var target = document.getElementById("adm-pane-" + tabName);
  if (target) target.style.display = "block";
  if (tabName === "low") initLowStockSelect();
};

function saveBazaToServer() {
  lsSet("ay_db_v32", db);
  render(); renderPromoSection();
  if (!adminSessionPass) return;
  var cleanExport = db.map(function (item) {
    var obj = { id: item.id, t: item.t, s: item.s, p: item.p };
    if (item.op && item.op > item.p) obj.op = item.op;
    return obj;
  });
  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "save_baza", pass: adminSessionPass, items: cleanExport })
  }).then(function (r) { return r.json(); }).then(function (res) {
    if (res && res.ok) showToast("✅ Serwerde ýatda saklandy!");
  }).catch(function () {});
}

var editingProdObj = null;
function openEditProdModal(item) {
  editingProdObj = item;
  document.getElementById("editProdTitle").innerText = "[" + item.id + "] " + item.t;
  document.getElementById("edProdStock").value = item.s;
  document.getElementById("edProdPrice").value = item.p;
  document.getElementById("edProdOldPrice").value = item.op || 0;
  document.getElementById("admEditProdModal").classList.add("open");
}

document.getElementById("btnSaveProdEdit").onclick = function () {
  if (!editingProdObj) return;
  editingProdObj.s = Math.max(0, parseFloat(document.getElementById("edProdStock").value) || 0);
  editingProdObj.p = Math.max(0, parseFloat(document.getElementById("edProdPrice").value) || 0);
  var opVal = Math.max(0, parseFloat(document.getElementById("edProdOldPrice").value) || 0);
  editingProdObj.op = (opVal > editingProdObj.p) ? opVal : 0;
  document.getElementById("admEditProdModal").classList.remove("open");
  renderStockList();
  saveBazaToServer();
};

function renderStockList() {
  var sl = document.getElementById("stockList");
  if (!sl) return;
  sl.innerHTML = "";
  var qEl = document.getElementById("admProdSearch");
  var q = qEl ? qEl.value.trim().toLowerCase() : "";
  var list = [];
  for (var i = 0; i < db.length; i++) {
    if (!q || String(db[i].t).toLowerCase().indexOf(q) > -1 || String(db[i].id).toLowerCase().indexOf(q) > -1) {
      list.push(db[i]);
    }
    if (list.length >= 120) break;
  }
  list.forEach(function (x) {
    var row = document.createElement("div"); row.className = "adm-row";
    var promoTag = (x.op && x.op > x.p) ? ' <span style="background:#e11d48;color:#fff;padding:1px 6px;border-radius:5px;font-size:10px">AKSIÝA</span>' : '';
    row.innerHTML = '<div style="flex:1"><b>[' + escapeHtml(x.id) + ']</b> ' + escapeHtml(x.t) + promoTag + '</div>' +
      '<div style="text-align:right;white-space:nowrap"><b style="color:var(--p)">' + x.p + ' m</b><br><span style="font-size:11px;color:var(--m)">Sany: ' + x.s + '</span></div>';
    row.onclick = function () { openEditProdModal(x); };
    sl.appendChild(row);
  });
}

function initLowStockSelect() {
  var sel = document.getElementById("admLowCatSel");
  if (!sel) return;
  if (!sel.options.length) {
    var optAll = document.createElement("option");
    optAll.value = ""; optAll.innerText = "Ähli bölümler (Kategoriýalar)";
    sel.appendChild(optAll);
    cats.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c.id; o.innerText = c.tk;
      sel.appendChild(o);
    });
  }
  renderLowStockReport();
}

var currentLowReportText = "";
window.renderLowStockReport = function () {
  var catVal = document.getElementById("admLowCatSel").value;
  var maxQ = parseInt(document.getElementById("admLowMaxQty").value, 10);
  var box = document.getElementById("admLowList");
  var cntEl = document.getElementById("admLowCount");
  box.innerHTML = "";
  var filtered = db.filter(function (x) {
    if (catVal && x.c !== catVal) return false;
    return x.s <= maxQ;
  });
  cntEl.innerText = "Tapylan haryt sany: " + filtered.length;
  var lines = ["AÝ-ÇYZUW — Azalan harytlar (" + (catVal || "Ählisi") + "):"];
  filtered.forEach(function (x, idx) {
    var r = document.createElement("div"); r.className = "adm-row";
    r.innerHTML = '<span><b>[' + escapeHtml(x.id) + ']</b> ' + escapeHtml(x.t) + '</span><b style="color:var(--err)">' + x.s + ' sany</b>';
    box.appendChild(r);
    lines.push((idx + 1) + ". [" + x.id + "] " + x.t + " — " + x.s + " sany");
  });
  currentLowReportText = lines.join("\n");
};

document.getElementById("btnCopyLowStock").onclick = function () {
  if (!currentLowReportText) return;
  if (navigator.clipboard) navigator.clipboard.writeText(currentLowReportText).then(function () { showToast("📋 Azalan harytlar sanawy kopiýalandy!"); });
};

function processImportedRows(rows) {
  var added = 0;
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i];
    if (!cols || cols.length < 4) continue;
    var id = String(cols[0] || "").trim(), t = String(cols[1] || "").trim();
    var stk = Math.max(0, parseFloat(String(cols[2] || "0").replace(",", ".")) || 0);
    var p = Math.max(0, parseFloat(String(cols[3] || "0").replace(",", ".")) || 0);
    if (!id || !t || isNaN(p) || (p === 0 && isNaN(parseFloat(cols[3])))) continue;
    var autoCat = detectCatSub(t);
    var found = false;
    for (var j = 0; j < db.length; j++) {
      if (String(db[j].id) === id) { db[j].t = t; db[j].s = stk; db[j].p = p; db[j].c = autoCat.c; db[j].sub = autoCat.sub; found = true; break; }
    }
    if (!found) db.push({ id: id, t: t, s: stk, p: p, op: 0, c: autoCat.c, sub: autoCat.sub });
    added++;
  }
  renderStockList(); initF(); saveBazaToServer();
  document.getElementById("admStat").innerText = "✅ Ýüklendi: " + added + " | Jemi: " + db.length;
  showToast("✅ " + added + " sany haryt täzelendi!");
}

document.getElementById("excelFileInp").onchange = function (e) {
  var file = e.target.files[0];
  if (!file) return;
  if (typeof XLSX === "undefined") { showToast("⚠️ Excel okaýjy ýüklenmedi, interneti barlaň!"); return; }
  var reader = new FileReader();
  reader.onload = function (ev) {
    var wb = XLSX.read(ev.target.result, { type: "binary" });
    var ws = wb.Sheets[wb.SheetNames[0]];
    var rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
    processImportedRows(rows);
    e.target.value = "";
  };
  reader.readAsBinaryString(file);
};
window.loadAdminServerData = function () {
  if (!adminSessionPass) return;
  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "get_admin_data", pass: adminSessionPass })
  }).then(function (r) { return r.json(); }).then(function (res) {
    if (!res || !res.ok) return;
    var td = (res.days && res.days[res.today]) ? res.days[res.today] : { views: 0, orders: 0, rev: 0 };
    document.getElementById("stTodayViews").innerText = td.views || 0;
    document.getElementById("stTodayOrders").innerText = td.orders || 0;
    document.getElementById("stTodayRev").innerText = (Number(td.rev) || 0).toFixed(2) + " m";
    document.getElementById("stTotalViews").innerText = res.total_views || 0;

    var sBox = document.getElementById("stTopSearches");
    var sKeys = Object.keys(res.searches || {});
    if (!sKeys.length) {
      sBox.innerHTML = "<span style='color:var(--m)'>Heniz gözleg maglumaty ýok</span>";
    } else {
      sBox.innerHTML = sKeys.slice(0, 10).map(function (k, i) {
        return "<div style='display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed var(--b)'><span>" + (i + 1) + ". " + escapeHtml(k) + "</span><b>" + res.searches[k] + " gezek</b></div>";
      }).join("");
    }

    var hBox = document.getElementById("stHistoryList");
    var dKeys = Object.keys(res.days || {}).sort().reverse().slice(0, 7);
    if (!dKeys.length) {
      hBox.innerHTML = "<span style='color:var(--m)'>Taryh ýok</span>";
    } else {
      hBox.innerHTML = dKeys.map(function (dk) {
        var inf = res.days[dk];
        return "<div style='display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed var(--b)'><b>" + dk + "</b><span>👥 " + (inf.views || 0) + " | 🛒 " + (inf.orders || 0) + " | 💰 " + (Number(inf.rev) || 0).toFixed(2) + " m</span></div>";
      }).join("");
    }

    var oBox = document.getElementById("admLiveOrdersList");
    var liveOrds = res.orders || [];
    if (!liveOrds.length) {
      oBox.innerHTML = "<div style='text-align:center;padding:20px;color:var(--m)'>Serwerde heniz sargyt ýok</div>";
    } else {
      oBox.innerHTML = liveOrds.map(function (o) {
        var phClean = String(o.ph || "").replace(/[^0-9+]/g, "");
        return '<div style="background:var(--g);border:1px solid var(--b);border-radius:12px;padding:11px;margin-bottom:9px;font-size:12.5px">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px"><b style="color:var(--p)">' + escapeHtml(o.id) + ' • ' + escapeHtml(o.date || "") + '</b><b style="color:var(--ok)">' + escapeHtml(o.tot) + '</b></div>' +
          '<div><b>' + escapeHtml(o.nm) + '</b> — <a href="tel:' + phClean + '" style="color:var(--p);font-weight:700">' + escapeHtml(o.ph) + '</a></div>' +
          '<div style="color:var(--m);font-size:11.5px;margin:2px 0 6px">' + escapeHtml(o.ad) + '</div>' +
          '<div style="background:var(--c);padding:7px;border-radius:8px;white-space:pre-wrap;font-size:11.5px;margin-bottom:6px">' + escapeHtml(o.det) + '</div>' +
          '<select onchange="updateLiveOrderStatus(\'' + escapeHtml(o.id) + '\', this.value)" style="margin:0;padding:6px;font-size:12px;font-weight:700">' +
          '<option value="Täze"' + (o.status === "Täze" ? " selected" : "") + '>🆕 Täze sargyt</option>' +
          '<option value="Ýolda"' + (o.status === "Ýolda" ? " selected" : "") + '>🚚 Ýolda</option>' +
          '<option value="Gowşuryldy"' + (o.status === "Gowşuryldy" ? " selected" : "") + '>✅ Gowşuryldy</option>' +
          '</select></div>';
      }).join("");
    }
  }).catch(function () {});
};

window.updateLiveOrderStatus = function (oid, st) {
  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "order_status", pass: adminSessionPass, id: oid, status: st })
  }).then(function () { showToast("✅ Sargyt ýagdaýy täzelendi!"); }).catch(function () {});
};
function renderOrders() {
  var ol = document.getElementById("olist");
  if (!orders.length) { ol.innerHTML = '<div class="empty-box">' + emptyBoxSvg + '<p>' + (lang === "tk" ? "Heniz sargyt ýok" : "Заказов пока нет") + '</p></div>'; return; }
  var h = "";
  for (var i = orders.length - 1; i >= 0; i--) {
    var o = orders[i];
    h += '<div style="background:var(--c);border:1px solid var(--b);padding:14px;border-radius:15px;margin-bottom:10px;font-size:13px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><b style="color:var(--p)">Sargyt ' + escapeHtml(o.id) + '</b><b style="color:var(--ok)">' + escapeHtml(o.tot) + '</b></div><span style="color:var(--m);font-size:12px">' + escapeHtml(o.nm) + ' (' + escapeHtml(o.ph) + ') • ' + escapeHtml(o.ad) + '</span><div style="margin-top:8px;white-space:pre-wrap;font-size:12px;background:var(--g);padding:9px;border-radius:9px;line-height:1.45">' + escapeHtml(o.cleanDet) + '</div></div>';
  }
  ol.innerHTML = h;
}

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
        if (it.q >= it.max) { showToast(lang === "tk" ? "⚠️ Häzirki wagtda has köp mukdar elýeterli däl" : "⚠️ Большее количество временно недоступно"); return; }
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
function toggleCityDrop(e) {
  if (e) e.stopPropagation();
  var w = document.getElementById("cityDropWrap");
  if (w) w.classList.toggle("open");
}

function selectCityOpt(val, el) {
  var inp = document.getElementById("citySel");
  var txt = document.getElementById("cityDropText");
  var wrap = document.getElementById("cityDropWrap");
  if (inp) inp.value = val;
  if (txt && el) {
    var sp = el.querySelector("span");
    txt.innerText = sp ? sp.innerText : el.innerText;
  }
  var opts = document.querySelectorAll("#cityDropList .csel-opt");
  for (var i = 0; i < opts.length; i++) opts[i].classList.remove("act");
  if (el) el.classList.add("act");
  if (wrap) wrap.classList.remove("open");
  updCart();
}

document.addEventListener("click", function (e) {
  var wrap = document.getElementById("cityDropWrap");
  if (wrap && !wrap.contains(e.target)) wrap.classList.remove("open");
});

function validateTmPhone(forceShow) {
  var inp = document.getElementById("ph");
  var wrap = document.getElementById("phFieldWrap");
  if (!inp || !wrap) return false;
  var raw = inp.value.replace(/\D/g, "");
  if (raw.indexOf("993") === 0 && raw.length > 8) raw = raw.slice(3);
  if (raw.length > 8) raw = raw.slice(0, 8);
  inp.value = raw.length > 2 ? (raw.slice(0, 2) + " " + raw.slice(2)) : raw;

  var isValid = /^(61|62|63|64|65|71)\d{6}$/.test(raw);
  if (raw.length === 0 && !forceShow) { wrap.classList.remove("invalid"); return false; }
  if (!isValid) { wrap.classList.add("invalid"); return false; }
  wrap.classList.remove("invalid");
  return true;
}

function showTab(t) {
  var s = document.querySelectorAll(".sec"), n = document.querySelectorAll(".nbtn");
  for (var i = 0; i < s.length; i++) s[i].classList.remove("act");
  for (var j = 0; j < n.length; j++) n[j].classList.toggle("act", n[j].getAttribute("data-t") === t);
  document.getElementById("s-" + t).classList.add("act");
  document.getElementById("searchBoxMain").style.display = (t === "home") ? "flex" : "none";

  if (t === "menu") { activeMenuCat = ""; renderCatalogGrid(); }
  if (t === "fav") renderFavs();
  if (t === "orders") renderOrders();
}

function setL(l) {
  lang = l;
  var els = document.querySelectorAll("[data-tk]");
  for (var i = 0; i < els.length; i++) els[i].innerText = els[i].getAttribute("data-" + l);
  document.getElementById("q").placeholder = l === "tk" ? "Haryt ady ýa-da barkod boýunça gözleg..." : "Поиск по названию или штрихкоду...";
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

document.getElementById("btnClearCart").onclick = function () { cart = []; updCart(); render(); showToast(lang === "tk" ? "🗑️ Sebet arassalandy" : "🗑️ Корзина очищена"); };
document.getElementById("btnOpenCheckout").onclick = function () {
  if (userAddr.nm && !document.getElementById("nm").value) document.getElementById("nm").value = userAddr.nm;
  if (userAddr.ph && !document.getElementById("ph").value) { document.getElementById("ph").value = userAddr.ph; validateTmPhone(false); }
  if (userAddr.ad && !document.getElementById("ad").value) document.getElementById("ad").value = userAddr.ad;
  updCart();
  document.getElementById("chkPage").classList.add("open");
};
document.getElementById("chkBack").onclick = function () { document.getElementById("chkPage").classList.remove("open"); };

document.getElementById("btnImport").onclick = function () {
  var raw = document.getElementById("pasteBox").value.trim();
  if (!raw) { showToast("⚠️ Excel maglumatyny goýuň!"); return; }
  var lines = raw.split(/\r?\n/);
  var rows = lines.map(function (line) {
    return line.indexOf("\t") > -1 ? line.split("\t") : line.split(/\s{2,}/);
  });
  processImportedRows(rows);
  document.getElementById("pasteBox").value = "";
};

document.getElementById("btnOrd").onclick = function () {
  var nm = document.getElementById("nm").value.trim(), ad = document.getElementById("ad").value.trim(), nt = document.getElementById("nt").value.trim();
  if (!nm || !ad) { showToast(lang === "tk" ? "⚠️ Adyňyzy we salgyňyzy ýazyň!" : "⚠️ Заполните имя и адрес!"); return; }
  if (!validateTmPhone(true)) { showToast(lang === "tk" ? "⚠️ Dogry telefon belgi giriziň!" : "⚠️ Введите правильный номер телефона!"); document.getElementById("ph").focus(); return; }
  var ph = "+993 " + document.getElementById("ph").value.trim();
  var btn = this; btn.disabled = true; btn.innerText = lang === "tk" ? "Iberilýär..." : "Отправка...";
  var cleanDet = "", subTot = 0, mailItems = [];
  var baseSiteUrl = (location.origin && location.origin !== "null") ? (location.origin + location.pathname.replace(/\/[^\/]*$/, "/")) : "";

  for (var i = 0; i < cart.length; i++) {
    var it = cart[i], rawImg = getProdImgUrl(it);
    var fullImgLink = (rawImg.indexOf("http") === 0 || rawImg.indexOf("data:") === 0) ? rawImg : (baseSiteUrl ? baseSiteUrl + rawImg : "");
    cleanDet += (i + 1) + ". " + it.t + " (" + it.q + " × " + it.p.toFixed(2) + " m = " + (it.p * it.q).toFixed(2) + " m)\n";
    mailItems.push({ id: it.id, t: it.t, q: it.q, p: it.p, img: fullImgLink });
    subTot += it.p * it.q;
    for (var j = 0; j < db.length; j++) if (db[j].id === it.id) db[j].s = Math.max(0, db[j].s - it.q);
  }

  var cityEl = document.getElementById("citySel"), cityVal = cityEl ? cityEl.value : "arkadag";
  var cityNames = { arkadag: "Arkadag şäheri", gokdepe: "Gökdepe", ashgabat: "Aşgabat şäheri", anew: "Änew", baherden: "Bäherden" };
  var cityLabel = cityNames[cityVal] || "Arkadag şäheri";
  var delivCost = subTot > 0 ? (cityVal === "arkadag" ? (subTot >= 200 ? 0 : 10) : (cityVal === "gokdepe" ? 50 : (cityVal === "ashgabat" ? 70 : 100))) : 0;
  var grandTot = subTot + delivCost, invNo = String(ordCounter + 101).padStart(5, "0"), oid = "#" + invNo, totStr = grandTot.toFixed(2) + " m";
  var fullAd = cityLabel + ", " + ad;
  cleanDet += "\nHarytlar: " + subTot.toFixed(2) + " m | Eltip bermek (" + cityLabel + "): " + delivCost.toFixed(2) + " m" + (nt ? "\nBellik: " + nt : "");

  ordCounter += 1;
  orders.push({ id: oid, nm: nm, ph: ph, ad: fullAd, cleanDet: cleanDet, tot: totStr });
  lsSet("ay_db_v32", db); lsSet("ay_orders", orders); lsSet("ay_ord_cnt", ordCounter);

  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "order", to: m1, cc: m2, subject: "Faktura № " + invNo + " (" + cityLabel + " - " + totStr + ")", invNo: invNo, nm: nm, ph: ph, ad: fullAd, nt: nt || "Ýok", items: mailItems, subTot: subTot.toFixed(2) + " m", deliv: delivCost.toFixed(2) + " m (" + cityLabel + ")", totStr: totStr, totNum: grandTot })
  }).catch(function () {}).finally(function () {
    btn.disabled = false; btn.innerText = lang === "tk" ? "✅ Sargyt et" : "✅ Оформить заказ";
    document.getElementById("chkPage").classList.remove("open");
    cart = []; updCart(); render();
    showToast(lang === "tk" ? "✅ Sargydyňyz kabul edildi! (Faktura № " + invNo + ")" : "✅ Ваш заказ принят! (Фактура № " + invNo + ")");
    showTab("orders");
  });
};
document.getElementById("detBack").onclick = function () { document.getElementById("detPage").classList.remove("open"); };
document.getElementById("logoBtn").onclick = function () {
  taps++; clearTimeout(tt); tt = setTimeout(function () { taps = 0; }, 800);
  if (taps === 3) { taps = 0; document.getElementById("admPass").value = ""; document.getElementById("admLogin").classList.add("open"); setTimeout(function () { document.getElementById("admPass").focus(); }, 100); }
  else { resetAllFilters(); showTab("home"); }
};

var searchTimer;
document.getElementById("q").onkeyup = function () { clearTimeout(searchTimer); searchTimer = setTimeout(function () { displayLimit = 40; render(); }, 180); };
document.getElementById("hideZero").onchange = function () { displayLimit = 40; render(); };
document.getElementById("clrQ").onclick = function () { document.getElementById("q").value = ""; displayLimit = 40; render(); };
document.getElementById("btnExitCat").onclick = resetAllFilters;

document.getElementById("btnSort").onclick = function () { document.getElementById("sm").classList.add("open"); };
document.getElementById("btnFilt").onclick = function () { renderFilterList(); document.getElementById("fm").classList.add("open"); };
document.getElementById("btnApplyF").onclick = function () {
  fMin = parseFloat(document.getElementById("fMinP").value) || 0;
  var mx = parseFloat(document.getElementById("fMaxP").value);
  fMax = (!isNaN(mx) && mx > 0) ? mx : Infinity;
  fOnlyPromo = document.getElementById("fOnlyPromo").checked;
  displayLimit = 40; render(); document.getElementById("fm").classList.remove("open");
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
  var pass = inp.value;
  if (!pass) return;
  fetch("send.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "auth", pass: pass })
  }).then(function (r) { return r.json(); }).then(function (res) {
    inp.value = "";
    if (res && res.ok) {
      adminSessionPass = pass;
      document.getElementById("adminPanel").style.display = "block";
      document.getElementById("admMail1").value = m1; document.getElementById("admMail2").value = m2; document.getElementById("admSms").value = smsPh;
      document.getElementById("admStat").innerText = "Jemi haryt sany: " + db.length;
      renderStockList();
      loadAdminServerData();
      document.getElementById("admLogin").classList.remove("open");
      showTab("prof");
    } else {
      showToast("❌ Nädogry parol!");
    }
  }).catch(function () {
    inp.value = "";
    showToast("⚠️ Serwer (send.php) elýeterli däl!");
  });
};

document.getElementById("btnSaveMail").onclick = function () {
  m1 = document.getElementById("admMail1").value.trim();
  m2 = document.getElementById("admMail2").value.trim();
  smsPh = document.getElementById("admSms").value.trim();
  lsSet("ay_m1", m1); lsSet("ay_m2", m2); lsSet("ay_sms", smsPh);
  showToast("✅ Ýatda saklandy!");
};
document.getElementById("btnClear").onclick = function () { if (confirm("Lokal keşi arassalamalymy?")) { localStorage.removeItem("ay_db_v32"); db = autoCategorizeAll(baseData.slice()); render(); renderStockList(); initF(); } };
document.getElementById("btnLogout").onclick = function () { adminSessionPass = ""; document.getElementById("adminPanel").style.display = "none"; document.getElementById("admPass").value = ""; };
document.getElementById("btnCopyGit").onclick = function () {
  var cleanExport = db.map(function (item) {
    var obj = { id: item.id, t: item.t, s: item.s, p: item.p };
    if (item.op && item.op > item.p) obj.op = item.op;
    return obj;
  });
  if (navigator.clipboard) navigator.clipboard.writeText("var githubBaza = " + JSON.stringify(cleanExport, null, 2) + ";").then(function () { showToast("📋 baza.js üçin kopiýalandy!"); });
};

var nbtns = document.querySelectorAll(".nbtn");
for (var i = 0; i < nbtns.length; i++) nbtns[i].onclick = function () { showTab(this.getAttribute("data-t")); };
var clsBtns = document.querySelectorAll(".cls");
for (var j = 0; j < clsBtns.length; j++) clsBtns[j].onclick = function () { document.getElementById(this.getAttribute("data-m")).classList.remove("open"); };

// PWA Ekrana goşmak we Service Worker
var deferredPrompt;
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  deferredPrompt = e;
  var btnInst = document.getElementById("goInstallApp");
  if (btnInst) {
    btnInst.style.display = "flex";
    btnInst.onclick = function () {
      if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; btnInst.style.display = "none"; }
    };
  }
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(function () {});
}

// Myhman sanyny serwerde hasaba almak we Umumy bazany (baza_live.json) çekmek
fetch("send.php?action=visit").catch(function () {});
fetch("baza_live.json?t=" + Date.now()).then(function (r) {
  if (!r.ok) throw new Error();
  return r.json();
}).then(function (liveData) {
  if (Array.isArray(liveData) && liveData.length > 0) {
    db = autoCategorizeAll(liveData);
    lsSet("ay_db_v32", db);
    initF(); render(); updCart();
  }
}).catch(function () {});

initF(); render(); updCart();
