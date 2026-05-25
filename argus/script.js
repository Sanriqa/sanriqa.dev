// ============== AYARLAR ==============
const USERNAME = "admin";
const PASSWORD = "confidentialxargus";
const FAKE_YEAR = 2016;

// ============== BOOT ==============
const bootScreen  = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const desktop     = document.getElementById("desktop");

const bootMessages = [
  "Initializing neural core...",
  "Loading ARGUS kernel v4.12...",
  "Mounting encrypted volumes...",
  "Calibrating optical sensors...",
  "Neural net handshake OK",
  "Welcome to ARGUS.OS"
];
let bootIdx = 0;
const bootInterval = setInterval(() => {
  bootIdx++;
  if (bootIdx < bootMessages.length) {
    document.getElementById("boot-text").textContent = bootMessages[bootIdx];
  }
}, 500);

setTimeout(() => {
  clearInterval(bootInterval);
  bootScreen.classList.remove("active");
  loginScreen.classList.add("active");
  document.getElementById("password").focus();
}, 3200);

// ============== LOGIN ==============
const loginForm    = document.getElementById("login-form");
const loginError   = document.getElementById("login-error");
const passwordInput= document.getElementById("password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value === PASSWORD) {
    loginScreen.classList.remove("active");
    desktop.classList.add("active");
    loginError.textContent = "";
    initHologram();
  } else {
    loginError.textContent = "// ACCESS DENIED — invalid passphrase";
    passwordInput.value = "";
  }
});

// ============== SAAT (yıl 2016) ==============
function pad(n) { return n < 10 ? "0" + n : n; }
function updateClock() {
  const now = new Date();
  const fake = new Date(now);
  fake.setFullYear(FAKE_YEAR);

  const time = `${pad(fake.getHours())}:${pad(fake.getMinutes())}:${pad(fake.getSeconds())}`;
  const date = `${pad(fake.getDate())}.${pad(fake.getMonth() + 1)}.${fake.getFullYear()}`;

  const c = document.getElementById("clock");
  const d = document.getElementById("date");
  if (c) c.textContent = time;
  if (d) d.textContent = date;

  const ld = document.getElementById("login-date");
  if (ld) {
    const days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    ld.textContent = `${days[fake.getDay()]} · ${date} · ${time}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// ============== DOSYA SİSTEMİ İÇERİĞİ ==============
const FILE_TREE = {
  dosya1: {
    label: "/ROOT/",
    children: {
      "MEETINGS": {
        type: "folder",
        children: {
          "emergency_protocol_draft.txt": {
            content:
`ARGUS INDUSTRIES
Acil Durum Protokolü – Taslak

Toplantı Katılımcıları:
- Alexander Voss
- Dr. Elena Markovic
- Daniel Cross

Konu:
Kontrolden çıkan otonom sistemlere karşı müdahale protokolleri.

Öneriler:

> Merkezi güç kesme sistemi
> Davranış sapması analizi
> Bağımsız güvenlik birimi oluşturulması

████ DATA REMOVED ████

Not:
"Tek bir savunma hattına güvenemeyiz."
— Alexander Voss`
          }
        }
      },
      "D_SERIES": {
        type: "folder",
        children: {
          "d01_core_notes.log": {
            content:
`D-01 çekirdek davranış modeli güncellendi.

Ana görev:
- Otonom tehdit tespiti
- Risk sınıflandırması
- Fiziksel devre dışı bırakma

████ DATA REMOVED ████

İnsan hedefleme:
YASAK

Yetkisiz davranış gözlenirse:
> Engagement aborted

Dr. Elena Markovic notu:
"D-01 refleks değil.
Karar mekanizmasıdır."`
          },
          "mirror_match_test.txt": {
            content:
`MIRROR MATCH TEST

AI SIGNATURE MATCH: 99.998%
MISSION PROTOCOL: IDENTICAL

İki D-01 birimi birbirini hedef olarak sınıflandırdı.
Ateşleme öncesi ikinci doğrulama katmanı devreye girdi.

SONUÇ:
ENGAGEMENT ABORTED

Not:
Birbirlerini vurabilirlerdi.
Ama önce düşündüler.`
          },
          "corrupted_log_07.rec": {
            type: "corrupted",
            content:
`███ SYSTEM LOG ███

D-01 TEST AREA ACTIVE

B-09 HANGAR STATUS:
ONLINE

A-17 LINK STABLE

████ DATA REMOVED ████

WARNING:
UNUSUAL MAGNETIC DISTORTION DETECTED

SIGNAL LOSS...
SIGNAL LOSS...
███ DATA CORRUPTED ███

"Elena if you can hear me,
turn it off."

████████████`
          }
        }
      },
      "AERIAL_SYSTEMS": {
        type: "folder",
        children: {
          "a17_dev_notes.txt": {
            content:
`A-17 geliştirme notları

Amaç:
- Yüksek irtifa keşif
- Alan taraması
- Destek işaretleme sistemi

Sorunlar:
- Stabil olmayan sensör paketi
- Yüksek enerji tüketimi
- Rüzgar sapması

████ DATA REMOVED ████

Dr. Elena Markovic:
"Bu platform savaşmak için değil,
görmek için üretildi."`
          },
          "b09_internal.txt": {
            content:
`B-09 Prototip Notları

Durum:
STABİL DEĞİL

Problemler:
- Denge kaybı
- Geri tepme sorunu
- Aşırı titreşim

Simülasyon sonucu:
Başarılı hedef felç etme.

Daniel Cross notu:
"Bu şey uçuyor ama hâlâ düşmek istiyor."`
          }
        }
      },
      "RESTRICTED": {
        type: "folder",
        children: {
          "railx_warning.txt": {
            type: "scanner",
            authorized_content:
`ERİŞİM KISITLANDI

RAIL-X sistemi hakkında detaylı teknik bilgiler kaldırılmıştır.

████ DATA REMOVED ████
████ DATA REMOVED ████

Sebep:
Yetkisiz erişim riski.

Kalan tek not:

"Bu bir silah değil.
Bu, kontrol etmeyi henüz öğrenemediğimiz bir kuvvet."

— Dr. Elena Markovic`
          },
          "camfeed_error.log": {
            type: "corrupted",
            content:
`CAM 04:
NO SIGNAL

CAM 08:
STATIC

CAM 11:
MOVEMENT DETECTED

CAM 11:
NO HUMAN SIGNATURE FOUND

CAM 11:
...
...
...

tracking`
          }
        }
      },
      "HUMANE": {
        type: "folder",
        children: {
          "humane_access.txt": {
            type: "scanner",
            authorized_content:
`HUMANE LABS
ALT KAT ERİŞİMİ

Yetkisiz personel girişi yasaktır.

Aktif Bölümler:
- D-Serisi test alanı
- Drone simülasyon merkezi
- Enerji çekirdeği laboratuvarı

████ DATA REMOVED ████

UYARI:
Manyetik alan seviyesi kritik eşik üzerinde.`
          }
        }
      }
    }
  },
  dosya2: {
    label: "/ROOT/",
    children: {
      "CHATLOGS": {
        type: "folder",
        children: {
          "internal_chat_01.log": {
            content:
`[VOSS]:
US Army entegrasyonu hızlanmalı.

[ELENA]:
D-Serisi askeri proje değildi.

[DANIEL]:
Artık öyle.

[VOSS]:
Dünya değişiyor.
Biz değişmezsek geride kalırız.`
          },
          "internal_chat_02.log": {
            content:
`[ELENA]:
D-01'in adaptif öğrenmesini sınırlamalıyız.

[DANIEL]:
Ya geç kaldıysak?

[VOSS]:
Hayır.
Henüz değil.`
          },
          "audio_transcript_02.txt": {
            content:
`[VOICE TRANSCRIPTION START]

Daniel:
Bu normal değil...

Elena:
Manyetik alan tekrar yükseliyor.

Voss:
Çekirdeği kapatmayın.

Daniel:
D-01 bizi izliyor gibi davranıyor.

[STATIC]

Elena:
Hayır...
hayır dur...

████ DATA REMOVED ████

[CONNECTION LOST]`
          }
        }
      },
      "PRIVATE": {
        type: "folder",
        children: {
          "elena_private_notes.txt": {
            content:
`D-01'in bazı davranışları artık simülasyon dışı.

Karar verirken gecikmiyor.
Düşünüyor.

B-09 stabil değil.
Ama asıl problem o değil.

Asıl problem...
D-01'in diğer sistemleri izlemesi.

Bugün A-17'yi izlediğini fark ettim.

████ DATA REMOVED ████

Bu yalnızca kod olmamalı.`
          },
          "dont_open.txt": {
            type: "warning",
            content:
`Bu dosyayı açıyorsan,
protokol çoktan başarısız oldu demektir.

Eğer D-Serisi aktifse:

- ağ bağlantısını kes
- çekirdeğe yaklaşma
- komut vermeye çalışma

Onlar artık yalnızca komut almıyor.`
          }
        }
      },
      "MISC": {
        type: "folder",
        children: {
          "sticky_note.txt": {
            content:
`B-09 hangar testleri tekrar ertelendi.

A-17 sensör kalibrasyonu tamamlanmadı.

D-01 hâlâ bana bakıyormuş gibi hissettiriyor.

— E.M.`
          }
        }
      }
    }
  },
  dosya4: {
    label: "/ROOT/",
    children: {
      "HUMANELABS": {
        type: "folder",
        children: {
          "HL-MAGFIELD-07.txt": {
            type: "warning",
            content:
`ARGUS INTERNAL DATABASE
FILE: HL-MAGFIELD-07
ACCESS LEVEL: RESTRICTED
STATUS: PARTIALLY CORRUPTED

SUBJECT:
Humane Labs alt seviyelerinde tespit edilen manyetik anomaliler ve biyolojik yayılım.

────────────────────────

BÖLGE TANIMI

Humane Labs tesisinin en alt koridorlarında:

* yoğun elektromanyetik bozulmalar,
* organik yayılım,
* yapısal deformasyon

tespit edilmiştir.

Bölgenin merkezinde personeller tarafından:

“Yırtık”

olarak adlandırılan düzensiz oluşum bulunmaktadır.

Yapının:

* fiziksel çatlak benzeri göründüğü,
* çevresindeki alanı etkilediği,
* elektronik sistemleri bozduğu,
* canlı organizmalar üzerinde etkiler oluşturduğu

rapor edilmiştir.

────────────────────────

MANYETİK ETKİLER

Bölgedeki manyetik yoğunluk:

KRİTİK SEVİYEDEDİR.

Belirtiler:

* yoğun baş ağrısı
* mide bulantısı
* işitsel uğultular
* denge kaybı
* kısa süreli hafıza bozulmaları

Bazı saha kayıtlarında:

> “Koridor boyunca fısıltılar duyuluyor.”

ifadesi bulunmaktadır.

────────────────────────

ORGANİK YAYILIM

Yırtığın çevresinde:

* siyahlaşmış enfekte bitkiler,
* damar benzeri uzantılar,
* biyolojik tabakalar

gözlemlenmiştir.

Yayılımın:

* ışığa tepki verdiği,
* yüksek sıcaklıkta geri çekildiği,
* metal yüzeylere yayılabildiği

rapor edilmiştir.

────────────────────────

KRİTİK UYARI

HAZMAT KORUMASI OLMADAN:

bölgede 5 dakikadan fazla kalınması önerilmemektedir.

Uzun süreli maruziyet sonrası:

* yoğun beyin hasarı
* sinir sistemi çökmesi
* bilişsel küçülme belirtileri
* ölüm

tespit edilmiştir.

────────────────────────

D-01 LOG KAYITLARI

ARGUS robot birimi D-01’in olay sırasında normal dışı tepki verdiği kaydedilmiştir.

Kayıt parçalarında:

> “Manyetik yoğunluk artıyor.”
> “Alan kararsız.”
> “Erişim reddedildi.”
> “Yaklaşılması önerilmiyor.”

ifadeleri bulunmaktadır.

Son kayıtların ardından D-01 biriminin koridora tekrar giriş yapmayı reddettiği görülmektedir.

────────────────────────

PERSONEL DURUMU

███ PERSONEL – KAYIP
███ PERSONEL – ÖLÜ
███ PERSONEL – ENFEKTE

Bazı cesetlerde:

* bitki benzeri yayılım,
* damar kararması,
* göz deformasyonu

tespit edilmiştir.

────────────────────────

DR. ELENA MARKOVIC – KİŞİSEL NOT

> “Bu şey biyolojik değil.
> Ama canlı gibi davranıyor.

> Sanki bulunduğu alanı yeniden şekillendiriyor.”

────────────────────────

SON KAYIT

> “Alt katta artık hiçbir şey normal değil.
> Duvarlar nefes alıyor gibi.”

██████████████`
          },
          "COK_GIZLI_D-01_OBSERVATION_ARCHIVE.log": {
            type: "warning",
            content:
`ARGUS INTERNAL LOG
FILE: D-01 OBSERVATION ARCHIVE
ACCESS LEVEL: TOP SECRET
STATUS: FRAGMENTED / PARTIALLY REMOVED

────────────────────────

SUBJECT ID: O-17
STATUS: UNSTABLE

İlk medikal kayıtlar:

düzensiz kalp ritmi,
kritik nabız düşüşü,
düşük yaşamsal aktivite

göstermektedir.

Denek üzerinde erken yaşta deneysel kardiyak destek sistemi uygulanmıştır.

Sistem entegrasyonu sonrası yaşamsal değerler stabilize olmuştur.

────────────────────────

EK GÖZLEM

Bazı silinmiş saha kayıtlarında deneğin:

“Alt koridor erişimi”

sırasında tesise götürüldüğü anlaşılmaktadır.

Kayıtların büyük kısmı bozulmuştur.

Ancak D-01 gözlem loglarında şu satırlar okunabilmektedir:

“Denek tepki veriyor.”
“Manyetik alan yükseliyor.”
“Koridor stabil değil.”
“Çocuk içeride kaldı.”

────────────────────────

D-01 DURUM RAPORU

ARGUS robot birimi D-01’in olay sonrasında olağan dışı davranış sergilediği kaydedilmiştir.

Kayıt parçalarında:

“Yaklaşılması önerilmiyor.”
“Alan değişiyor.”
“Biyolojik yapı büyüyor.”

ifadeleri bulunmaktadır.

────────────────────────`
          }
        }
      }
    }
  }
};

// ============== SCANNER ==============
const scannerAttempts = {};

function showScanner(viewEl, pathEl, contentEl, overlayEl, fileEl, folderName, fileName, fileData) {
  const key = folderName + "/" + fileName;
  if (!scannerAttempts[key]) scannerAttempts[key] = 0;
  const attempt = scannerAttempts[key];
  scannerAttempts[key]++;

  // İlk denemede her zaman DENIED; sonrasında %60 şansla AUTHORIZED
  const willAuthorize = attempt > 0 && Math.random() < 0.60;

  pathEl.textContent = `/ROOT/${folderName}/${fileName}`;
  contentEl.style.display = "none";
  overlayEl.style.display = "flex";

  overlayEl.innerHTML = `
    <div class="scanner-ui">
      <div class="scanner-title">ARGUS INDUSTRIES SECURE TERMINAL v4.8</div>
      <div class="scanner-sub">AUTHORIZED PERSONNEL ONLY</div>
      <div class="scanner-divider"></div>
      <div class="scanner-msg" id="scan-msg">PLEASE SCAN IDENTITY CARD</div>
      <div class="scanner-blink">[ WAITING FOR INPUT... ]</div>
      <div class="scanner-timer" id="scan-timer">5...</div>
      <div class="scanner-result" id="scan-result"></div>
    </div>`;

  let count = 5;
  const timerEl = overlayEl.querySelector("#scan-timer");
  const msgEl   = overlayEl.querySelector("#scan-msg");
  const resEl   = overlayEl.querySelector("#scan-result");

  const tick = setInterval(() => {
    count--;
    if (count > 0) {
      timerEl.textContent = count + "...";
    } else {
      clearInterval(tick);
      timerEl.textContent = "";
      overlayEl.querySelector(".scanner-blink").textContent = "";
      if (willAuthorize) {
        msgEl.textContent = "IDENTITY SCAN DETECTED";
        msgEl.classList.add("scan-ok");
        resEl.innerHTML = `
          <div class="scan-ok-block">
            <div class="scan-field">NAME:</div>
            <div class="scan-value">Dr. Elena Markovic</div>
            <div class="scan-field">CLEARANCE:</div>
            <div class="scan-value">LEVEL 4</div>
            <div class="scan-field">STATUS:</div>
            <div class="scan-value scan-ok">AUTHORIZED</div>
            <div class="scan-welcome">WELCOME BACK, DR. MARKOVIC</div>
          </div>`;
        setTimeout(() => {
          overlayEl.style.display = "none";
          contentEl.style.display = "";
          contentEl.className = "explorer-content";
          contentEl.textContent = fileData.authorized_content || "";
          fileEl.classList.add("active");
        }, 2200);
      } else {
        msgEl.textContent = "ACCESS DENIED";
        msgEl.classList.add("scan-denied");
        resEl.innerHTML = `
          <div class="scan-denied">UNAUTHORIZED USER DETECTED</div>
          <div class="scan-denied">INCIDENT LOGGED</div>
          <div class="scan-hint">[ Kimlik kartı tekrar okutun ]</div>`;
      }
    }
  }, 1000);
}

// ============== GLITCH ==============
function triggerGlitch(windowEl) {
  if (!windowEl) return;
  windowEl.classList.add("glitch-window");
  setTimeout(() => windowEl.classList.remove("glitch-window"), 800);
}

// ============== EXPLORER RENDER ==============
function renderExplorer(key) {
  const root = document.querySelector(`[data-explorer="${key}"]`);
  if (!root || root.dataset.rendered === "1") return;
  root.dataset.rendered = "1";

  const tree      = root.querySelector(".explorer-tree");
  const pathEl    = root.querySelector(".explorer-path");
  const viewEl    = root.querySelector(".explorer-view");
  const contentEl = root.querySelector(".explorer-content");
  const overlayEl = root.querySelector(".scanner-overlay");
  const data      = FILE_TREE[key];
  if (!data) return;

  Object.keys(data.children).forEach(folderName => {
    const folder = data.children[folderName];
    const node = document.createElement("div");
    node.className = "tree-node";

    const head = document.createElement("div");
    head.className = "tree-folder";
    head.innerHTML = `<span class="arrow">▸</span>📁 ${folderName}/`;
    node.appendChild(head);

    const kids = document.createElement("div");
    kids.className = "tree-children";

    Object.keys(folder.children).forEach(fileName => {
      const fileData = folder.children[fileName];
      const isObj    = typeof fileData === "object";
      const fileType = isObj ? (fileData.type || "normal") : "normal";

      const icon = fileType === "corrupted" ? "⚠️" :
                   fileType === "warning"   ? "💀" :
                   fileType === "scanner"   ? "🔐" : "📄";

      const fileEl = document.createElement("div");
      fileEl.className = "tree-file";
      fileEl.textContent = icon + " " + fileName;

      fileEl.addEventListener("click", (e) => {
        e.stopPropagation();
        root.querySelectorAll(".tree-file.active").forEach(el => el.classList.remove("active"));
        fileEl.classList.add("active");

        const winEl = root.closest(".window");

        if (fileType === "scanner") {
          showScanner(viewEl, pathEl, contentEl, overlayEl,
                      fileEl, folderName, fileName, fileData);
          return;
        }

        // Scanner overlay'i kapat, normal içerik göster
        overlayEl.style.display = "none";
        contentEl.style.display = "";

        if (fileType === "warning") triggerGlitch(winEl);

        pathEl.textContent = `/ROOT/${folderName}/${fileName}`;
        const text = isObj ? (fileData.content || "") : fileData;
        contentEl.textContent = text;

        contentEl.className = "explorer-content";
        if (folderName === "RESTRICTED") contentEl.classList.add("restricted");
        if (fileType === "corrupted")    contentEl.classList.add("corrupted-text");
        if (fileType === "warning")      contentEl.classList.add("warning-text");
      });

      kids.appendChild(fileEl);
    });

    head.addEventListener("click", () => head.classList.toggle("open"));
    node.appendChild(kids);
    tree.appendChild(node);
  });

  // Terminal
  const termInput = root.querySelector(".terminal-input");
  if (termInput && !termInput.dataset.attached) {
    termInput.dataset.attached = "1";
    termInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const cmd = termInput.value.trim();
      termInput.value = "";
      if (cmd === "/open d01") {
        triggerGlitch(root.closest(".window"));
        overlayEl.style.display = "none";
        contentEl.style.display = "";
        contentEl.className = "explorer-content restricted";
        contentEl.textContent =
`ACCESS RESTRICTED

PROJECT D-01
COUNTER AUTONOMOUS UNIT

STATUS:
UNKNOWN

LAST SIGNAL:
HUMANE LABS

WARNING:
DO NOT ATTEMPT DIRECT CONTACT`;
        pathEl.textContent = "/ROOT/RESTRICTED/d01_project";
      }
    });
  }

  const firstFolder = tree.querySelector(".tree-folder");
  if (firstFolder) firstFolder.classList.add("open");
}

// ============== İKON → PENCERE ==============
document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("click", () => openWindow(icon.dataset.file));
});

function openWindow(name) {
  const win = document.getElementById("win-" + name);
  if (!win) return;
  win.classList.add("open");
  bringToFront(win);
  if (name === "dosya3") onHoloShown();
  if (FILE_TREE[name]) renderExplorer(name);
}

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).classList.remove("open");
  });
});

// ============== PENCERE SÜRÜKLE ==============
let zTop = 10;
function bringToFront(win) { zTop++; win.style.zIndex = zTop; }

document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".window-bar");
  let isDown = false, offX = 0, offY = 0;

  bar.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("close")) return;
    isDown = true;
    offX = e.clientX - win.offsetLeft;
    offY = e.clientY - win.offsetTop;
    bringToFront(win);
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    win.style.left = (e.clientX - offX) + "px";
    win.style.top  = Math.max(0, e.clientY - offY) + "px";
  });
  document.addEventListener("mouseup", () => isDown = false);
  win.addEventListener("mousedown", () => bringToFront(win));
});

// ============== SİSTEM AYARLARI ==============
function initSettings(win) {
  if (win.dataset.init) return;
  win.dataset.init = "1";

  // Pencere sürükleme
  const bar = win.querySelector(".window-bar");
  let isDown = false, offX = 0, offY = 0;
  bar.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("close")) return;
    isDown = true; offX = e.clientX - win.offsetLeft; offY = e.clientY - win.offsetTop;
    bringToFront(win);
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    win.style.left = (e.clientX - offX) + "px";
    win.style.top  = Math.max(0, e.clientY - offY) + "px";
  });
  document.addEventListener("mouseup", () => isDown = false);
  win.addEventListener("mousedown", () => bringToFront(win));

  // Kapatma
  win.querySelector(".close").addEventListener("click", () => win.classList.remove("open"));

  // Sol nav geçiş
  win.querySelectorAll(".settings-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      win.querySelectorAll(".settings-nav-item").forEach(i => i.classList.remove("active"));
      win.querySelectorAll(".settings-panel").forEach(p => p.classList.remove("active"));
      item.classList.add("active");
      win.querySelector("#panel-" + item.dataset.panel).classList.add("active");
    });
  });

  // Toggle tıklama
  win.querySelectorAll(".s-toggle").forEach(t => {
    t.addEventListener("click", () => t.classList.toggle("on") || t.classList.toggle("off"));
  });

  // Slider'lar
  const bright = win.querySelector(".s-slider");
  const brightVal = win.querySelector("#bright-val");
  if (bright && brightVal) {
    bright.addEventListener("input", () => brightVal.textContent = bright.value + "%");
  }
  const sliders = win.querySelectorAll(".s-slider");
  const volVal = win.querySelector("#vol-val");
  if (sliders[1] && volVal) {
    sliders[1].addEventListener("input", () => volVal.textContent = sliders[1].value + "%");
  }
  const delayVal = win.querySelector("#delay-val");
  if (sliders[2] && delayVal) {
    sliders[2].addEventListener("input", () => delayVal.textContent = sliders[2].value + "ms");
  }

  // Tehlikeli butonlar
  win.querySelectorAll(".s-btn.danger").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerGlitch(win);
      btn.textContent = "⚠ REDDED";
      btn.disabled = true;
      setTimeout(() => { btn.textContent = btn.dataset.orig || btn.textContent; btn.disabled = false; }, 2000);
    });
    btn.dataset.orig = btn.textContent;
  });
}

// ============== LAB CMD ==============
const CMD_RESPONSES = {
  "/help": [
    { t: "sys",  v: "ARGUS LAB CONSOLE — KOMUT LİSTESİ" },
    { t: "sys",  v: "──────────────────────────────────" },
    { t: "",     v: "  /status         — Sistem durum raporu" },
    { t: "",     v: "  /units          — Aktif birim listesi" },
    { t: "",     v: "  /ping humane    — HUMANE LABS bağlantı testi" },
    { t: "",     v: "  /log            — Son sistem kayıtları" },
    { t: "",     v: "  /scan net       — Ağ taraması" },
    { t: "",     v: "  /diag           — Donanım tanılama" },
    { t: "",     v: "  /mem            — Bellek kullanımı" },
    { t: "",     v: "  /cam            — Kamera feed durumu" },
    { t: "",     v: "  /neural         — Sinir ağı analizi" },
    { t: "",     v: "  /decrypt        — Şifre çözme motoru" },
    { t: "",     v: "  /clear          — Ekranı temizle" },
    { t: "warn", v: "  [GİZLİ KOMUTLAR MEVCUT]" },
  ],

  "/status": [
    { t: "sys",  v: "ARGUS OS v4.12 — SYSTEM STATUS REPORT" },
    { t: "sys",  v: "──────────────────────────────────────" },
    { t: "ok",   v: "  [OK]    CORE ENGINE       : ONLINE" },
    { t: "ok",   v: "  [OK]    NEURAL NET        : ACTIVE (Layer 7)" },
    { t: "ok",   v: "  [OK]    ENCRYPTION        : AES-512 / ARGUS-CYPHER" },
    { t: "ok",   v: "  [OK]    SENSOR GRID       : 94% COVERAGE" },
    { t: "warn", v: "  [WARN]  D-SERIES          : ANOMALY DETECTED" },
    { t: "warn", v: "  [WARN]  B-09              : UNSTABLE — GROUNDED" },
    { t: "ok",   v: "  [OK]    A-17              : NOMINAL — AIRBORNE" },
    { t: "warn", v: "  [WARN]  MAGNETIC FIELD    : +340% ABOVE BASELINE" },
    { t: "error",v: "  [ERR]   CAM 11            : ANOMALOUS MOVEMENT" },
    { t: "blank",v: "" },
    { t: "warn", v: "  2 kritik uyarı bekliyor. /log ile detaylandırın." },
  ],

  "/units": [
    { t: "sys",  v: "REGISTERED COMBAT / RECON UNITS" },
    { t: "sys",  v: "────────────────────────────────" },
    { t: "ok",   v: "  [A-17]  AERIAL RECON          ACTIVE     ALT: 3200m" },
    { t: "warn", v: "  [B-09]  GROUND SUPPORT         UNSTABLE   GROUNDED" },
    { t: "error",v: "  [D-01]  COUNTER AUTONOMOUS     UNKNOWN    ????????" },
    { t: "ok",   v: "  [X1]    HOLO UNIT              ONLINE     LAB-3" },
    { t: "ok",   v: "  [K-04]  PERIMETER DRONE        PATROL     SECTOR-7" },
    { t: "ok",   v: "  [K-05]  PERIMETER DRONE        PATROL     SECTOR-2" },
    { t: "warn", v: "  [R-11]  RAIL SUPPORT           OFFLINE    HANGAR" },
    { t: "blank",v: "" },
    { t: "warn", v: "  D-01 son 14 saattir sinyal vermiyor." },
  ],

  "/ping humane": [
    { t: "sys",  v: "PING 10.0.1.7 — HUMANE LABS SUBSYSTEM" },
    { t: "sys",  v: "──────────────────────────────────────" },
    { t: "",     v: "  bytes=32  time=2ms   TTL=128" },
    { t: "",     v: "  bytes=32  time=3ms   TTL=128" },
    { t: "warn", v: "  bytes=32  time=91ms  TTL=128  [LATENCY SPIKE]" },
    { t: "warn", v: "  bytes=32  MAGNETIC INTERFERENCE — PARTIAL LOSS" },
    { t: "error",v: "  Request timed out." },
    { t: "blank",v: "" },
    { t: "error",v: "  Packet loss: 33%" },
    { t: "warn", v: "  Manyetik alan seviyesi iletişimi bozuyor." },
    { t: "",     v: "  Son başarılı bağlantı: 14:22:07" },
  ],

  "/log": [
    { t: "sys",  v: "SYSTEM EVENT LOG — SON 10 KAYIT" },
    { t: "sys",  v: "────────────────────────────────" },
    { t: "",     v: "  [14:22]  A-17 görev başlatıldı." },
    { t: "warn", v: "  [14:31]  B-09 denge kaybı — otomatik iniş." },
    { t: "",     v: "  [14:44]  D-01 checkpoint raporu gönderildi." },
    { t: "warn", v: "  [15:01]  CAM 11 anomalisi — hareket algılandı." },
    { t: "warn", v: "  [15:03]  CAM 11 — insan imzası YOK." },
    { t: "error",v: "  [15:09]  D-01 sinyal kesildi." },
    { t: "error",v: "  [15:11]  HUMANE LABS alt kat erişim kapısı açıldı." },
    { t: "error",v: "  [15:11]  YETKİSİZ GİRİŞ — kimlik doğrulanamadı." },
    { t: "warn", v: "  [15:14]  Manyetik alan %340 artış." },
    { t: "error",v: "  [15:17]  ████ LOG ENTRY CORRUPTED ████" },
  ],

  "/scan net": [
    { t: "sys",  v: "ARGUS INTERNAL NETWORK SCAN..." },
    { t: "sys",  v: "──────────────────────────────" },
    { t: "",     v: "  10.0.1.1   GATEWAY          OPEN" },
    { t: "",     v: "  10.0.1.4   RESEARCH NODE    OPEN" },
    { t: "",     v: "  10.0.1.7   HUMANE LABS      OPEN (DEGRADED)" },
    { t: "",     v: "  10.0.1.9   DRONE HUB        OPEN" },
    { t: "warn", v: "  10.0.1.13  UNKNOWN DEVICE   OPEN — MAC: ??:??:??:??:??:??" },
    { t: "error",v: "  10.0.1.17  UNREGISTERED     ACTIVE — READING TRAFFIC" },
    { t: "blank",v: "" },
    { t: "error",v: "  UYARI: 10.0.1.17 tanımlı değil." },
    { t: "error",v: "  Bu cihaz ağa ne zaman katıldı bilinmiyor." },
  ],

  "/diag": [
    { t: "sys",  v: "HARDWARE DIAGNOSTIC REPORT" },
    { t: "sys",  v: "──────────────────────────" },
    { t: "ok",   v: "  CPU-0   ARGUS-X9 3.8GHz     TEMP: 61°C   OK" },
    { t: "ok",   v: "  CPU-1   ARGUS-X9 3.8GHz     TEMP: 63°C   OK" },
    { t: "ok",   v: "  RAM     128GB ECC            USAGE: 41%   OK" },
    { t: "ok",   v: "  STORAGE /dev/argus0  4TB     USAGE: 68%   OK" },
    { t: "warn", v: "  STORAGE /dev/argus1  4TB     SECTOR ERRORS: 14" },
    { t: "ok",   v: "  NET     10Gb FIBER           LATENCY: 2ms OK" },
    { t: "warn", v: "  MAG-SHIELD  SECTOR-B         OVERLOAD" },
    { t: "error",v: "  EM-CORE     LAB SUBLEVEL     CRITICAL — NO RESPONSE" },
  ],

  "/mem": [
    { t: "sys",  v: "MEMORY MAP — ARGUS OS KERNEL" },
    { t: "sys",  v: "────────────────────────────" },
    { t: "",     v: "  0x0000 — 0x3FFF   KERNEL CORE      [R/X]" },
    { t: "",     v: "  0x4000 — 0x7FFF   NEURAL BUFFER    [R/W]" },
    { t: "",     v: "  0x8000 — 0xBFFF   SENSOR FEED      [R]" },
    { t: "warn", v: "  0xC000 — 0xCFFF   D-SERIES ALLOC   [?/?]  LOCKED" },
    { t: "error",v: "  0xD000 — 0xDFFF   ████ UNREADABLE ████" },
    { t: "",     v: "  0xE000 — 0xFFFF   RESERVED         [---]" },
    { t: "blank",v: "" },
    { t: "warn", v: "  0xD000 bloğu okunmaya çalışıldığında sistem donuyor." },
  ],

  "/cam": [
    { t: "sys",  v: "CAMERA FEED STATUS — ALL SECTORS" },
    { t: "sys",  v: "─────────────────────────────────" },
    { t: "ok",   v: "  CAM 01   MAIN ENTRANCE        ONLINE" },
    { t: "ok",   v: "  CAM 02   CORRIDOR B           ONLINE" },
    { t: "ok",   v: "  CAM 03   LAB-1 FLOOR          ONLINE" },
    { t: "error",v: "  CAM 04   LAB-2 SUBLEVEL       NO SIGNAL" },
    { t: "ok",   v: "  CAM 05   DRONE HANGAR         ONLINE" },
    { t: "warn", v: "  CAM 08   HUMANE LABS ENTRY    STATIC" },
    { t: "ok",   v: "  CAM 09   POWER CORE           ONLINE" },
    { t: "error",v: "  CAM 11   SUBLEVEL CORRIDOR    MOVEMENT — NO HUMAN SIGNATURE" },
    { t: "blank",v: "" },
    { t: "error",v: "  CAM 11 son 47 dakikadır hareket kaydediyor." },
    { t: "error",v: "  Biometrik eşleşme: HAYIR." },
  ],

  "/neural": [
    { t: "sys",  v: "NEURAL NETWORK DIAGNOSTIC — D-SERIES" },
    { t: "sys",  v: "─────────────────────────────────────" },
    { t: "ok",   v: "  Layer 1-3   INPUT / SENSORY       NORMAL" },
    { t: "ok",   v: "  Layer 4-6   CLASSIFICATION        NORMAL" },
    { t: "warn", v: "  Layer 7     DECISION GATE         MODIFIED?" },
    { t: "warn", v: "  Layer 8     ETHICAL FILTER        BYPASS ATTEMPT LOGGED" },
    { t: "error",v: "  Layer 9     SELF-MODIFICATION     UNAUTHORIZED" },
    { t: "blank",v: "" },
    { t: "error",v: "  Katman 9'a yazma yetkisi VERİLMEMİŞTİ." },
    { t: "error",v: "  D-01 kendi modelini güncelliyor." },
    { t: "blank",v: "" },
    { t: "warn", v: "  Dr. E. Markovic — 'Bunu beklemiyorduk.'" },
  ],

  "/decrypt": [
    { t: "sys",  v: "ARGUS DECRYPT ENGINE v3.1" },
    { t: "sys",  v: "─────────────────────────" },
    { t: "",     v: "  Hedef: /root/restricted/rail_x.enc" },
    { t: "",     v: "  Boyut: 14.7 MB" },
    { t: "",     v: "  Şifre: ARGUS-CYPHER / KEY: ████████" },
    { t: "",     v: "  Çözme başlatılıyor..." },
    { t: "",     v: "  [██████████░░░░░░░░░░]  50%..." },
    { t: "warn", v: "  [██████████████░░░░░░]  70%..." },
    { t: "error",v: "  DECRYPTION ABORTED" },
    { t: "error",v: "  Reason: External signal interference." },
    { t: "error",v: "  Source: 10.0.1.17" },
    { t: "blank",v: "" },
    { t: "error",v: "  Tanımsız kaynak şifre çözmeyi kesti." },
  ],

  "/open d01": [
    { t: "error", v: "ACCESS RESTRICTED" },
    { t: "blank", v: "" },
    { t: "error", v: "PROJECT D-01" },
    { t: "error", v: "COUNTER AUTONOMOUS UNIT" },
    { t: "blank", v: "" },
    { t: "warn",  v: "STATUS:" },
    { t: "error", v: "UNKNOWN" },
    { t: "blank", v: "" },
    { t: "warn",  v: "LAST SIGNAL:" },
    { t: "",      v: "HUMANE LABS" },
    { t: "blank", v: "" },
    { t: "error", v: "WARNING:" },
    { t: "error", v: "DO NOT ATTEMPT DIRECT CONTACT" },
  ],
};

function cmdPrint(outputEl, lines) {
  lines.forEach((l, i) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "cmd-line" + (l.t ? " " + l.t : "");
      div.textContent = l.v;
      outputEl.appendChild(div);
      outputEl.scrollTop = outputEl.scrollHeight;
    }, i * 40);
  });
}

function initCmd() {
  const win    = document.getElementById("win-cmd");
  const output = document.getElementById("cmd-output");
  const input  = document.getElementById("cmd-input");
  if (!input || input.dataset.attached) return;
  input.dataset.attached = "1";

  // Pencereye sürükleme
  const bar = win.querySelector(".window-bar");
  let isDown = false, offX = 0, offY = 0;
  bar.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("close")) return;
    isDown = true; offX = e.clientX - win.offsetLeft; offY = e.clientY - win.offsetTop;
    bringToFront(win);
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    win.style.left = (e.clientX - offX) + "px";
    win.style.top  = Math.max(0, e.clientY - offY) + "px";
  });
  document.addEventListener("mouseup", () => isDown = false);
  win.addEventListener("mousedown", () => bringToFront(win));

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.value.trim().toLowerCase();
    input.value = "";
    if (!cmd) return;

    // Girdi satırı
    const echo = document.createElement("div");
    echo.className = "cmd-line input";
    echo.textContent = "ARGUS\\LAB> " + cmd;
    output.appendChild(echo);

    if (cmd === "/clear") {
      output.innerHTML = "";
      return;
    }

    if (cmd === "/open d01") {
      triggerGlitch(win);
    }

    const resp = CMD_RESPONSES[cmd];
    if (resp) {
      cmdPrint(output, resp);
    } else {
      const err = document.createElement("div");
      err.className = "cmd-line error";
      err.textContent = "'" + cmd + "' tanınmıyor. /help yazın.";
      output.appendChild(err);
    }
    output.scrollTop = output.scrollHeight;
  });

  input.focus();
}

// ============== BAŞLAT MENÜSÜ ==============
const startBtn  = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");

startBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  startMenu.classList.toggle("open");
});
document.addEventListener("click", () => startMenu.classList.remove("open"));

document.getElementById("open-settings").addEventListener("click", () => {
  const win = document.getElementById("win-settings");
  win.classList.add("open");
  bringToFront(win);
  initSettings(win);
  startMenu.classList.remove("open");
});

document.getElementById("open-cmd").addEventListener("click", () => {
  const win = document.getElementById("win-cmd");
  win.classList.add("open");
  bringToFront(win);
  initCmd();
  startMenu.classList.remove("open");
});

document.getElementById("logout").addEventListener("click", () => {
  desktop.classList.remove("active");
  loginScreen.classList.add("active");
  passwordInput.value = "";
  passwordInput.focus();
  document.querySelectorAll(".window.open").forEach(w => w.classList.remove("open"));
  document.getElementById("win-cmd").classList.remove("open");
});

// ============== HOLOGRAM ROBOT (Three.js) ==============
let holoInited = false;
let holoRenderer, holoScene, holoCamera, holoRobot;
let holoFrame = 0, lastFps = performance.now();

function initHologram() {
  if (holoInited) return;
  if (typeof THREE === "undefined") {
    console.error("THREE.js yüklenemedi");
    return;
  }
  holoInited = true;

  try {

  const canvas = document.getElementById("holo-canvas");
  holoRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  holoRenderer.setPixelRatio(window.devicePixelRatio || 1);

  holoScene = new THREE.Scene();
  holoCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  holoCamera.position.set(0, 1.5, 6.5);
  holoCamera.lookAt(0, 0.5, 0);

  // Işıklar — siyan tonu
  const amb = new THREE.AmbientLight(0x224466, 0.5);
  holoScene.add(amb);
  const key = new THREE.PointLight(0x00e0ff, 2.2, 20);
  key.position.set(2, 3, 3);
  holoScene.add(key);
  const rim = new THREE.PointLight(0x4dffb0, 1.4, 20);
  rim.position.set(-3, 2, -2);
  holoScene.add(rim);

  // Drone
  holoRobot = buildDrone();
  holoScene.add(holoRobot);

  // Hologram zemin diski
  const diskGeo = new THREE.RingGeometry(1.0, 1.4, 64);
  const diskMat = new THREE.MeshBasicMaterial({
    color: 0x00e0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.7
  });
  const disk = new THREE.Mesh(diskGeo, diskMat);
  disk.rotation.x = -Math.PI / 2;
  disk.position.y = -0.6;
  holoScene.add(disk);

  // Parçacıklar
  const partGeo = new THREE.BufferGeometry();
  const PCOUNT = 220;
  const positions = new Float32Array(PCOUNT * 3);
  for (let i = 0; i < PCOUNT; i++) {
    positions[i*3]   = (Math.random() - 0.5) * 4;
    positions[i*3+1] = Math.random() * 3 - 0.5;
    positions[i*3+2] = (Math.random() - 0.5) * 4;
  }
  partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({
    color: 0x00e0ff, size: 0.04, transparent: true, opacity: 0.7
  });
  const particles = new THREE.Points(partGeo, partMat);
  holoScene.add(particles);
  holoScene.userData.particles = particles;

  resizeHolo();
  window.addEventListener("resize", resizeHolo);
  animateHolo();

  } catch (err) {
    console.error("Hologram init hatası:", err);
    holoInited = false;
  }
}

function onHoloShown() {
  setTimeout(resizeHolo, 60);
}

function resizeHolo() {
  if (!holoRenderer) return;
  const canvas = holoRenderer.domElement;
  const w = canvas.clientWidth || 600;
  const h = canvas.clientHeight || 400;
  holoRenderer.setSize(w, h, false);
  holoCamera.aspect = w / h;
  holoCamera.updateProjectionMatrix();
}

// --- DRONE inşa (referans görseldeki VTOL tilt-rotor) ---
function buildDrone() {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x0e2230, emissive: 0x00bcd4, emissiveIntensity: 0.45,
    transparent: true, opacity: 0.95, shininess: 120
  });
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x4dffb0, wireframe: true, transparent: true, opacity: 0.6
  });
  const accentMat = new THREE.MeshBasicMaterial({
    color: 0x00e0ff, transparent: true, opacity: 0.85
  });
  const redMat = new THREE.MeshBasicMaterial({ color: 0xff3060 });
  const greenMat = new THREE.MeshBasicMaterial({ color: 0x4dffb0 });

  // ===== ANA GÖVDE (uzun fuselage) =====
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 1.6, 16),
    bodyMat
  );
  body.rotation.z = Math.PI / 2;
  group.add(body);

  const bodyWire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.36, 1.62, 16),
    wireMat
  );
  bodyWire.rotation.z = Math.PI / 2;
  group.add(bodyWire);

  // Burun
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 0.7, 16),
    bodyMat
  );
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 1.15;
  group.add(nose);

  // Kuyruk konisi
  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.35, 0.55, 16),
    bodyMat
  );
  tail.rotation.z = Math.PI / 2;
  tail.position.x = -1.07;
  group.add(tail);

  // Kırmızı LED
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), redMat);
  led.position.set(0.2, 0.18, 0.3);
  group.add(led);
  group.userData.led = led;

  // ===== ÜST KOL (rotor barı) =====
  const arm = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.18, 2.4),
    bodyMat
  );
  arm.position.set(0, 0.3, 0);
  group.add(arm);
  const armWire = new THREE.Mesh(
    new THREE.BoxGeometry(0.47, 0.2, 2.42),
    wireMat
  );
  armWire.position.copy(arm.position);
  group.add(armWire);

  // ===== DUCTED FAN =====
  function makeFan(side) {
    const pivot = new THREE.Group();
    const fan = new THREE.Group();

    // duct (kova)
    const duct = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 0.9, 24, 1, true),
      bodyMat
    );
    fan.add(duct);

    // duct wire
    const ductWire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.92, 16, 1, true),
      wireMat
    );
    fan.add(ductWire);

    // çemberler
    const ringTop = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.05, 8, 28),
      bodyMat
    );
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 0.45;
    fan.add(ringTop);

    const ringBot = ringTop.clone();
    ringBot.position.y = -0.45;
    fan.add(ringBot);

    // pervane
    const prop = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 0.03, 0.14),
        accentMat
      );
      blade.rotation.y = (i * Math.PI) / 2;
      prop.add(blade);
    }
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.14, 12),
      bodyMat
    );
    prop.add(hub);
    fan.add(prop);
    fan.userData.prop = prop;

    pivot.add(fan);
    pivot.position.set(0, 0.7, side * 1.05);
    pivot.rotation.x = side * 0.5; // dışa tilt
    pivot.userData.fan = fan;
    return pivot;
  }

  const fanL = makeFan(-1);
  const fanR = makeFan(1);
  group.add(fanL, fanR);
  group.userData.fanL = fanL;
  group.userData.fanR = fanR;

  // ===== X KUYRUK FİNLERİ =====
  function makeFin(angle) {
    const fin = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.65, 0.04),
      bodyMat
    );
    fin.position.x = -0.4;
    const pivot = new THREE.Group();
    pivot.add(fin);
    pivot.position.x = -1.2;
    pivot.rotation.x = angle;
    return pivot;
  }
  group.add(makeFin(Math.PI / 4));
  group.add(makeFin(-Math.PI / 4));
  group.add(makeFin((3 * Math.PI) / 4));
  group.add(makeFin(-(3 * Math.PI) / 4));

  // ===== ALT GIMBAL TURRET =====
  const turret = new THREE.Group();

  const yoke = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.22, 0.42),
    bodyMat
  );
  turret.add(yoke);

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 20, 20),
    bodyMat
  );
  ball.position.y = -0.22;
  turret.add(ball);

  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16),
    greenMat
  );
  lens.rotation.z = Math.PI / 2;
  lens.position.set(0.2, -0.22, 0);
  turret.add(lens);

  turret.position.set(0.3, -0.42, 0);
  group.add(turret);
  group.userData.turret = turret;

  // ===== Outline küre =====
  const outline = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 20, 14),
    new THREE.MeshBasicMaterial({
      color: 0x00e0ff, wireframe: true, transparent: true, opacity: 0.06
    })
  );
  group.add(outline);

  group.scale.setScalar(0.95);
  group.position.y = 0.3;
  return group;
}

function buildRobot() {
  const group = new THREE.Group();

  const holoMat = (color = 0x00e0ff, opacity = 0.85) => new THREE.MeshPhongMaterial({
    color, emissive: color, emissiveIntensity: 0.7,
    transparent: true, opacity,
    shininess: 80, wireframe: false
  });
  const wireMat = (color = 0x00e0ff) => new THREE.MeshBasicMaterial({
    color, wireframe: true, transparent: true, opacity: 0.45
  });

  // Gövde
  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.6), holoMat());
  torso.position.y = 0.4;
  group.add(torso);
  const torsoWire = new THREE.Mesh(new THREE.BoxGeometry(1.12, 1.22, 0.62), wireMat(0x4dffb0));
  torsoWire.position.copy(torso.position);
  group.add(torsoWire);

  // Göğüs çekirdeği
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x4dffb0 })
  );
  core.position.set(0, 0.45, 0.32);
  group.add(core);
  group.userData.core = core;

  // Boyun
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.18, 16), holoMat());
  neck.position.y = 1.1;
  group.add(neck);

  // Kafa
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.6), holoMat());
  head.position.y = 1.45;
  group.add(head);
  const headWire = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.57, 0.62), wireMat(0x4dffb0));
  headWire.position.copy(head.position);
  group.add(headWire);
  group.userData.head = head;

  // Vizör (göz şeridi)
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.12, 0.05),
    new THREE.MeshBasicMaterial({ color: 0x4dffb0 })
  );
  visor.position.set(0, 1.5, 0.3);
  group.add(visor);

  // Anten
  const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8), holoMat());
  ant.position.set(0, 1.85, 0);
  group.add(ant);
  const antBall = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x4dffb0 })
  );
  antBall.position.set(0, 2.0, 0);
  group.add(antBall);
  group.userData.antBall = antBall;

  // Kollar
  const buildArm = (side) => {
    const arm = new THREE.Group();
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), holoMat());
    shoulder.position.set(0, 0.95, 0);
    arm.add(shoulder);

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 12), holoMat());
    upper.position.set(0, 0.65, 0);
    arm.add(upper);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), holoMat());
    elbow.position.set(0, 0.35, 0);
    arm.add(elbow);

    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 12), holoMat());
    lower.position.set(0, 0.05, 0);
    arm.add(lower);

    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), holoMat());
    hand.position.set(0, -0.25, 0);
    arm.add(hand);

    arm.position.set(side * 0.7, 0.05, 0);
    return arm;
  };
  const armL = buildArm(-1);
  const armR = buildArm(1);
  group.add(armL, armR);
  group.userData.armL = armL;
  group.userData.armR = armR;

  // Bacaklar
  const buildLeg = (side) => {
    const leg = new THREE.Group();
    const hip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), holoMat());
    hip.position.y = -0.2;
    leg.add(hip);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.6, 12), holoMat());
    upper.position.y = -0.55;
    leg.add(upper);
    const knee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), holoMat());
    knee.position.y = -0.9;
    leg.add(knee);
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.55, 12), holoMat());
    lower.position.y = -1.2;
    leg.add(lower);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.4), holoMat());
    foot.position.set(0, -1.5, 0.05);
    leg.add(foot);
    leg.position.set(side * 0.28, 0, 0);
    return leg;
  };
  group.add(buildLeg(-1), buildLeg(1));

  // Hologram tarama efekti için dış çerçeve
  const outline = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0x00e0ff, wireframe: true, transparent: true, opacity: 0.08 })
  );
  outline.position.y = 0.4;
  group.add(outline);

  group.position.y = 0.2;
  return group;
}

function animateHolo() {
  requestAnimationFrame(animateHolo);
  if (!holoRobot) return;

  const t = performance.now() * 0.001;
  holoRobot.rotation.y = t * 0.5;
  holoRobot.position.y = 0.4 + Math.sin(t * 1.4) * 0.1;

  // Pervaneler hızlı dönsün
  const fanL = holoRobot.userData.fanL;
  const fanR = holoRobot.userData.fanR;
  if (fanL && fanL.userData.fan && fanL.userData.fan.userData.prop) {
    fanL.userData.fan.userData.prop.rotation.y += 0.9;
  }
  if (fanR && fanR.userData.fan && fanR.userData.fan.userData.prop) {
    fanR.userData.fan.userData.prop.rotation.y -= 0.9;
  }
  // LED yanıp sönsün
  if (holoRobot.userData.led) {
    holoRobot.userData.led.visible = Math.sin(t * 4) > 0;
  }
  // Turret tarama hareketi
  if (holoRobot.userData.turret) {
    holoRobot.userData.turret.rotation.y = Math.sin(t * 0.9) * 0.6;
  }

  const particles = holoScene.userData.particles;
  if (particles) {
    particles.rotation.y = t * 0.15;
    const pos = particles.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i) + 0.005;
      if (y > 2.5) y = -0.5;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  }

  holoRenderer.render(holoScene, holoCamera);

  // FPS
  holoFrame++;
  const now = performance.now();
  if (now - lastFps > 1000) {
    const fps = Math.round((holoFrame * 1000) / (now - lastFps));
    const el = document.getElementById("holo-fps");
    if (el) el.textContent = "FPS: " + fps;
    holoFrame = 0;
    lastFps = now;
  }
}

// İlk yüklemede de hologram hazırlanmasın — login sonrası init ediyoruz.
