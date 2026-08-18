// ===== background music via hidden YouTube player =====
// Video: https://youtu.be/VT1-sitWRtY
const YT_VIDEO_ID = "VT1-sitWRtY";

let ytPlayer = null;
let ytReady = false;
let wantsPlay = false;
let isMuted = false;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("ytMusic", {
    videoId: YT_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      loop: 1,
      playlist: YT_VIDEO_ID, // required for loop to work
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: () => {
        ytReady = true;
        if (wantsPlay) startMusic();
      },
    },
  });
}

function startMusic() {
  wantsPlay = true;
  if (!ytReady || !ytPlayer) return;
  try {
    ytPlayer.setVolume(70);
    ytPlayer.playVideo();
    const btn = document.getElementById("musicToggle");
    if (btn) btn.textContent = "🔊";
    isMuted = false;
  } catch (e) {
    console.warn("music start failed", e);
  }
}

function toggleMusic() {
  if (!ytPlayer) return;
  const btn = document.getElementById("musicToggle");
  if (isMuted) {
    ytPlayer.unMute();
    ytPlayer.playVideo();
    if (btn) btn.textContent = "🔊";
    isMuted = false;
  } else {
    ytPlayer.mute();
    if (btn) btn.textContent = "🔇";
    isMuted = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("musicToggle");
  if (musicBtn) musicBtn.addEventListener("click", toggleMusic);

  // Hook into the existing "START" taps — this is a real user gesture,
  // so the browser will allow audio to actually play (not just muted autoplay).
  const introBtnEl = document.getElementById("introBtn");
  const startBtnEl = document.getElementById("startBtn");
  if (introBtnEl) introBtnEl.addEventListener("click", startMusic, { once: true });
  if (startBtnEl) startBtnEl.addEventListener("click", startMusic, { once: true });
});
