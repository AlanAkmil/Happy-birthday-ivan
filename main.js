/* ============================================================
   main.js — page 2 interactions
   ============================================================ */

(function () {
  "use strict";

  // ---------- fill content from data.js ----------
  document.getElementById("pageTitle").textContent = SITE_DATA.birthdayTitle;
  document.getElementById("heroTitle").textContent = SITE_DATA.birthdayTitle;
  document.getElementById("heroDate").textContent = SITE_DATA.birthdayDate;
  document.getElementById("closingName").textContent = SITE_DATA.name;
  document.getElementById("closingText").textContent = SITE_DATA.closingMessage;
  document.getElementById("musicTitle").textContent = SITE_DATA.musicTitle;
  document.getElementById("lockHint").textContent = SITE_DATA.secretHint || "enter the secret code";

  // ---------- floating lanterns background ----------
  const field = document.getElementById("lanternField");
  const LANTERN_COUNT = 14;
  for (let i = 0; i < LANTERN_COUNT; i++) {
    const l = document.createElement("div");
    l.className = "lantern";
    l.style.left = Math.random() * 100 + "%";
    const duration = 9 + Math.random() * 8;
    l.style.animationDuration = duration + "s";
    l.style.animationDelay = -Math.random() * duration + "s";
    l.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
    field.appendChild(l);
  }

  // ============================================================
  // LOCK SCREEN
  // ============================================================
  const lockOverlay = document.getElementById("lockOverlay");
  const lockDots = document.getElementById("lockDots");
  const lockPad = document.getElementById("lockPad");
  const code = String(SITE_DATA.secretCode || "0000");
  let entered = "";

  function renderDots() {
    lockDots.innerHTML = "";
    for (let i = 0; i < code.length; i++) {
      const d = document.createElement("span");
      d.className = "lock-dot" + (i < entered.length ? " filled" : "");
      lockDots.appendChild(d);
    }
  }
  renderDots();

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"];
  keys.forEach((k) => {
    const btn = document.createElement("button");
    btn.className = "lock-key";
    btn.textContent = k;
    btn.addEventListener("click", () => handleKey(k));
    lockPad.appendChild(btn);
  });

  function handleKey(k) {
    if (k === "⌫") {
      entered = entered.slice(0, -1);
      renderDots();
      return;
    }
    if (k === "✓") {
      checkCode();
      return;
    }
    if (entered.length < code.length) {
      entered += k;
      renderDots();
      if (entered.length === code.length) {
        setTimeout(checkCode, 150);
      }
    }
  }

  function checkCode() {
    if (entered === code) {
      lockOverlay.classList.add("hidden");
    } else {
      lockDots.classList.add("shake");
      setTimeout(() => {
        lockDots.classList.remove("shake");
        entered = "";
        renderDots();
      }, 400);
    }
  }

  // ---------- scroll cue ----------
  document.getElementById("scrollCue").addEventListener("click", () => {
    document.getElementById("giftSection").scrollIntoView({ behavior: "smooth" });
  });

  // ---------- gift box open ----------
  const giftBox = document.getElementById("giftBox");
  const giftHint = document.getElementById("giftHint");
  const revealSections = document.querySelectorAll(".reveal-on-gift");
  let opened = false;

  giftBox.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    giftBox.classList.add("opened");
    giftHint.style.opacity = "0";

    setTimeout(() => {
      revealSections.forEach((s, i) => {
        setTimeout(() => s.classList.add("visible"), i * 150);
      });
      document.getElementById("bouquetSection").scrollIntoView({ behavior: "smooth" });
      startTypewriter();
    }, 600);
  });

  // ---------- letter typewriter ----------
  let typed = false;
  function startTypewriter() {
    if (typed) return;
    typed = true;
    const el = document.getElementById("letterText");
    const cursor = document.getElementById("letterCursor");
    const text = SITE_DATA.letter;
    let i = 0;

    function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 22);
      } else {
        cursor.style.display = "none";
      }
    }
    tick();
  }

  // ============================================================
  // BOUQUET
  // ============================================================
  const bouquetField = document.getElementById("bouquetField");
  const bouquetNote = document.getElementById("bouquetNote");
  const flowerEmojis = ["🌷", "🌸", "🌹", "🌺", "🌻", "💐"];

  SITE_DATA.bouquet.forEach((msg, i) => {
    const btn = document.createElement("button");
    btn.className = "bouquet-flower";
    btn.textContent = flowerEmojis[i % flowerEmojis.length];
    btn.style.animationDelay = i * 0.3 + "s";
    btn.addEventListener("click", () => {
      bouquetNote.style.opacity = "0";
      setTimeout(() => {
        bouquetNote.textContent = msg;
        bouquetNote.style.opacity = "1";
      }, 200);
    });
    bouquetField.appendChild(btn);
  });

  // ============================================================
  // TIMELINE
  // ============================================================
  const timelineTrack = document.getElementById("timelineTrack");
  (SITE_DATA.timeline || []).forEach((item) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `
      <p class="timeline-label">${item.label}</p>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    timelineTrack.appendChild(div);
  });

  // ============================================================
  // GALLERY — swipeable photo stack (only runs if section exists)
  // ============================================================
  const stack = document.getElementById("photoStack");
  const counterEl = document.getElementById("stackCounter");
  if (stack && counterEl) {
    const photos = SITE_DATA.photos;
    let stackOrder = photos.map((_, i) => i); // display order, front card = index 0

    var renderStack = function () {
      stack.innerHTML = "";
      const visible = stackOrder.slice(0, 4); // only render top 4 cards (perf)
      visible
        .slice()
        .reverse()
        .forEach((photoIndex, pos) => {
          const depth = visible.length - 1 - pos; // 0 = frontmost
          const card = document.createElement("div");
          card.className = "photo-card";
          card.style.zIndex = 10 - depth;
          card.style.setProperty("--depth", depth);
          card.style.setProperty("--tilt", `${(photoIndex % 2 === 0 ? -1 : 1) * (3 + (photoIndex % 3))}deg`);
          card.classList.add("text-card");
          const p = document.createElement("p");
          p.textContent = photos[photoIndex];
          card.appendChild(p);
          stack.appendChild(card);

          if (depth === 0) makeDraggable(card);
        });
      counterEl.textContent = `${photos.length - stackOrder.length + 1} / ${photos.length}`;
    };

    var nextCard = function () {
      if (stackOrder.length <= 1) return; // last card, stays put
      const front = stackOrder.shift();
      stackOrder.push(front); // send to back so it can cycle again
      renderStack();
    };

    var makeDraggable = function (card) {
      let startX = 0;
      let currentX = 0;
      let dragging = false;

      function onDown(e) {
        dragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        card.style.transition = "none";
      }
      function onMove(e) {
        if (!dragging) return;
        currentX = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
        const rotate = currentX / 12;
        card.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
      }
      function onUp() {
        if (!dragging) return;
        dragging = false;
        card.style.transition = "transform 0.35s ease";
        if (Math.abs(currentX) > 90) {
          const dir = currentX > 0 ? 1 : -1;
          card.style.transform = `translateX(${dir * 500}px) rotate(${dir * 40}deg)`;
          setTimeout(nextCard, 250);
        } else {
          card.style.transform = "translateX(0) rotate(0deg)";
        }
        currentX = 0;
      }

      card.addEventListener("mousedown", onDown);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      card.addEventListener("touchstart", onDown, { passive: true });
      card.addEventListener("touchmove", onMove, { passive: true });
      card.addEventListener("touchend", onUp);
    };

    renderStack();
  }

  // ============================================================
  // SCROLL REVEAL (animasi muncul pelan & smooth pas discroll)
  // ============================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
  );

  document
    .querySelectorAll(".scroll-reveal, .timeline-item")
    .forEach((el) => revealObserver.observe(el));

  // ---------- music player (YouTube, autoplay) ----------
  const YT_VIDEO_ID = "VT1-sitWRtY"; // https://youtu.be/VT1-sitWRtY
  const player = document.getElementById("musicPlayer");
  const toggle = document.getElementById("musicToggle");
  let ytPlayer = null;
  let playing = false;

  window.onYouTubeIframeAPIReady = function () {
    ytPlayer = new YT.Player("ytMusic", {
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        loop: 1,
        playlist: YT_VIDEO_ID, // wajib biar loop jalan
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (e) => {
          e.target.setVolume(70);
          e.target.playVideo();

          // Kalau browser blokir autoplay bersuara (belum ada gesture di
          // halaman ini), nyalakan otomatis di interaksi pertama user.
          ["click", "touchstart", "keydown", "scroll"].forEach((evt) =>
            window.addEventListener(evt, () => e.target.playVideo(), { once: true, passive: true })
          );
        },
        onStateChange: (e) => {
          playing = e.data === YT.PlayerState.PLAYING;
          player.classList.toggle("playing", playing);
        },
      },
    });
  };

  toggle.addEventListener("click", () => {
    if (!ytPlayer) return;
    if (playing) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
  });
})();
