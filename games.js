/* ============================================================
   games.js — 3 mini game: Trivia Quiz, Memory Match, Catch the Star
   ============================================================ */

(function () {
  "use strict";

  const cardsWrap = document.getElementById("gameCards");
  const modal = document.getElementById("gameModal");
  const stage = document.getElementById("gameStage");
  const closeBtn = document.getElementById("gameClose");

  const GAMES = [
    { id: "quiz", icon: "🎉", title: "Trivia Quiz", desc: "how well do you know me?" },
    { id: "memory", icon: "🧠", title: "Memory Match", desc: "match the cards" },
    { id: "catch", icon: "⭐", title: "Catch the Star", desc: "catch as many as you can" },
  ];

  GAMES.forEach((g) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `<span class="icon">${g.icon}</span><p class="title">${g.title}</p><p class="desc">${g.desc}</p>`;
    card.addEventListener("click", () => openGame(g.id));
    cardsWrap.appendChild(card);
  });

  function openGame(id) {
    modal.classList.add("active");
    if (id === "quiz") renderQuiz();
    if (id === "memory") renderMemory();
    if (id === "catch") renderCatch();
  }

  function closeGame() {
    modal.classList.remove("active");
    stage.innerHTML = "";
    if (window.__catchInterval) clearInterval(window.__catchInterval);
    if (window.__catchSpawnTimer) clearInterval(window.__catchSpawnTimer);
  }
  closeBtn.addEventListener("click", closeGame);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeGame();
  });

  // ============================================================
  // GAME 1 — TRIVIA QUIZ
  // ============================================================
  function renderQuiz() {
    const questions = SITE_DATA.quiz || [];
    let index = 0;
    let score = 0;

    function showQuestion() {
      const item = questions[index];
      stage.innerHTML = `
        <h3 class="game-title">Trivia Quiz</h3>
        <p class="quiz-progress">Question ${index + 1} of ${questions.length}</p>
        <p class="quiz-question">${item.q}</p>
        <div class="quiz-options">
          ${item.options
            .map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`)
            .join("")}
        </div>
      `;
      stage.querySelectorAll(".quiz-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = Number(btn.dataset.i);
          stage.querySelectorAll(".quiz-option").forEach((b, i) => {
            b.disabled = true;
            if (i === item.correct) b.classList.add("correct");
            else if (i === chosen) b.classList.add("wrong");
          });
          if (chosen === item.correct) score++;
          setTimeout(() => {
            index++;
            if (index < questions.length) showQuestion();
            else showResult();
          }, 700);
        });
      });
    }

    function showResult() {
      stage.innerHTML = `
        <h3 class="game-title">Done!</h3>
        <p class="quiz-result">${score} out of ${questions.length} correct 🥳</p>
        <p class="game-sub">thanks for playing, Van</p>
        <button class="game-btn" id="quizReplay">Play Again</button>
      `;
      document.getElementById("quizReplay").addEventListener("click", () => {
        index = 0;
        score = 0;
        showQuestion();
      });
    }

    showQuestion();
  }

  // ============================================================
  // GAME 2 — MEMORY MATCH
  // ============================================================
  function renderMemory() {
    const emojis = ["🎮", "🚀", "✨", "🎉", "🌙", "🍕", "⚡", "💫"];
    let deck = [...emojis, ...emojis]
      .map((e) => ({ e, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    let firstPick = null;
    let lock = false;
    let matches = 0;
    let moves = 0;

    stage.innerHTML = `
      <h3 class="game-title">Memory Match</h3>
      <p class="game-sub">flip 2 cards, match the pictures</p>
      <div class="memory-grid" id="memGrid"></div>
      <p class="memory-status" id="memStatus">Moves: 0 · Matched: 0/${emojis.length}</p>
    `;
    const grid = document.getElementById("memGrid");
    const status = document.getElementById("memStatus");

    deck.forEach((card, i) => {
      const el = document.createElement("div");
      el.className = "memory-card";
      el.dataset.index = i;
      el.textContent = "★";
      grid.appendChild(el);

      el.addEventListener("click", () => {
        if (lock || el.classList.contains("flipped") || el.classList.contains("matched")) return;
        el.textContent = card.e;
        el.classList.add("flipped");

        if (!firstPick) {
          firstPick = { el, card };
          return;
        }

        moves++;
        if (firstPick.card.e === card.e) {
          el.classList.add("matched");
          firstPick.el.classList.add("matched");
          matches++;
          firstPick = null;
          status.textContent = `Moves: ${moves} · Matched: ${matches}/${emojis.length}`;
          if (matches === emojis.length) {
            setTimeout(() => {
              stage.innerHTML = `
                <h3 class="game-title">Yay, You Won! 🎉</h3>
                <p class="quiz-result">Finished in ${moves} moves</p>
                <button class="game-btn" id="memReplay">Play Again</button>
              `;
              document.getElementById("memReplay").addEventListener("click", renderMemory);
            }, 500);
          }
        } else {
          lock = true;
          status.textContent = `Moves: ${moves} · Matched: ${matches}/${emojis.length}`;
          setTimeout(() => {
            el.textContent = "★";
            el.classList.remove("flipped");
            firstPick.el.textContent = "★";
            firstPick.el.classList.remove("flipped");
            firstPick = null;
            lock = false;
          }, 700);
        }
      });
    });
  }

  // ============================================================
  // GAME 3 — CATCH THE STAR
  // ============================================================
  function renderCatch() {
    let score = 0;
    let timeLeft = 20;

    stage.innerHTML = `
      <h3 class="game-title">Catch the Star</h3>
      <p class="game-sub">tap the falling stars before they hit the bottom</p>
      <p class="catch-score">Score: <span id="catchScore">0</span> · Time: <span id="catchTime">20</span>s</p>
      <div class="catch-stage" id="catchStage"></div>
    `;
    const catchStage = document.getElementById("catchStage");
    const scoreEl = document.getElementById("catchScore");
    const timeEl = document.getElementById("catchTime");
    const emojis = ["⭐", "✨", "🌟", "💫"];

    function spawnHeart() {
      const heart = document.createElement("div");
      heart.className = "catch-heart";
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = Math.random() * 85 + "%";
      const duration = 2.2 + Math.random() * 1.6;
      heart.style.animationDuration = duration + "s";
      catchStage.appendChild(heart);

      heart.addEventListener("click", () => {
        score++;
        scoreEl.textContent = score;
        heart.remove();
      });
      setTimeout(() => heart.remove(), duration * 1000 + 50);
    }

    window.__catchSpawnTimer = setInterval(spawnHeart, 500);
    window.__catchInterval = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(window.__catchInterval);
        clearInterval(window.__catchSpawnTimer);
        catchStage.innerHTML = "";
        stage.innerHTML = `
          <h3 class="game-title">Time's Up!</h3>
          <p class="quiz-result">Your score: ${score} ⭐</p>
          <button class="game-btn" id="catchReplay">Play Again</button>
        `;
        document.getElementById("catchReplay").addEventListener("click", renderCatch);
      }
    }, 1000);
  }
})();
