// 🔗 Fungsi buka link card
function openLink(url) {
  window.open(url, "_blank");
}

// 🗓️ Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// 🎵 Musik dan kontrol
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

// Set volume awal
music.volume = 0.05;

// Autoplay + fallback (kalau browser blokir)
window.addEventListener("DOMContentLoaded", () => {
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      document.body.addEventListener(
        "click",
        () => {
          music.play();
          showPopup("🎶 Musik dimulai!");
        },
        { once: true }
      );
    });
  }
});

// Tombol play/pause
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    showPopup("🎵 Musik dimainkan");
  } else {
    music.pause();
    showPopup("⏸ Musik dijeda");
  }
});

// 🎚️ Tambah slider volume
const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = "0";
volumeSlider.max = "1";
volumeSlider.step = "0.01";
volumeSlider.value = music.volume;
Object.assign(volumeSlider.style, {
  position: "fixed",
  bottom: "100px",
  right: "30px",
  width: "120px",
  accentColor: "#ffb3c6",
  cursor: "pointer",
  zIndex: "1000",
});
document.body.appendChild(volumeSlider);
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

// 🔇 Tombol mute cepat
const muteBtn = document.createElement("button");
muteBtn.textContent = "🔇";
Object.assign(muteBtn.style, {
  position: "fixed",
  bottom: "160px",
  right: "30px",
  background: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "45px",
  height: "45px",
  cursor: "pointer",
  fontSize: "18px",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  zIndex: "1000",
});
document.body.appendChild(muteBtn);
muteBtn.addEventListener("click", () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "🔈" : "🔇";
  showPopup(music.muted ? "🔈 Musik dimute" : "🔇 Musik aktif");
});

// 💬 Popup pesan kecil
function showPopup(text) {
  const popup = document.createElement("div");
  popup.textContent = text;
  Object.assign(popup.style, {
    position: "fixed",
    bottom: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    opacity: "0",
    transition: "opacity 0.3s ease, bottom 0.3s ease",
    zIndex: "999",
  });
  document.body.appendChild(popup);
  requestAnimationFrame(() => {
    popup.style.opacity = "1";
    popup.style.bottom = "45px";
  });
  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.bottom = "25px";
    setTimeout(() => popup.remove(), 300);
  }, 2000);
}
