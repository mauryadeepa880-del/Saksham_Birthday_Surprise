// Saksham's birthday surprise — edit the date/PIN below if you reuse this project.
const BIRTHDAY = new Date(2026, 9, 20, 0, 0, 0); // 20 October 2026 (month is zero-based)
const SECRET_PIN = "20102010"; // DDMMYYYY

const screens = [...document.querySelectorAll(".screen")];
const showScreen = id => {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({top: 0, behavior: "smooth"});
};
const pad = n => String(n).padStart(2, "0");

function updateCountdown() {
  const now = new Date();
  let diff = BIRTHDAY - now;
  if (diff <= 0) {
    document.querySelector("#countdown-screen .eyebrow").textContent = "Today's the day! 🎉";
    document.querySelector("#countdown-screen h1").innerHTML = "Happy Birthday<br><span>Saksham!</span>";
    document.querySelector("#countdown-screen .subtitle").textContent = "Your surprise is ready whenever you are.";
    diff = 0;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("continue-btn").addEventListener("click", () => showScreen("pin-screen"));
document.querySelectorAll("[data-back]").forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.back)));

document.getElementById("pin-form").addEventListener("submit", event => {
  event.preventDefault();
  const pin = document.getElementById("pin-input").value.trim();
  if (pin === SECRET_PIN) {
    document.getElementById("pin-error").textContent = "";
    document.getElementById("pin-input").value = "";
    showScreen("gifts-screen");
    burstConfetti();
  } else {
    document.getElementById("pin-error").textContent = "Not quite! Try your birthday as DDMMYYYY 💗";
    document.getElementById("pin-input").select();
  }
});

const photoList = [
  ["assets/saksham_01_pink_shirt.jpg", "A smart look, a classic memory 💗"],
  ["assets/saksham_02_traditional.jpg", "Dressed up for a special evening ✨"],
  ["assets/saksham_03_birthday_hat.jpg", "Birthday vibes from the memory box 🎉"],
  ["assets/saksham_04_party.jpg", "Another moment worth keeping 📸"],
  ["assets/saksham_05_childhood.jpg", "A little throwback to the good old days 🌟"]
];

const revealContent = document.getElementById("reveal-content");
function openGift(type) {
  showScreen("reveal-screen");
  if (type === "message") {
    revealContent.innerHTML = `
      <div class="eyebrow">Gift 01 · from the heart</div>
      <h2 class="reveal-title">To my brother by choice 💗</h2>
      <article class="message-card">
        <p><strong>Happy Birthday, Saksham! 🎂</strong></p>
        <p>Some people are friends, and some become family without sharing the same surname. You're that kind of person.</p>
        <p>Thanks for the laughs, the memories, the random moments, and all the times that make friendship feel like brotherhood. Life will keep changing, but I hope we always keep that same bond, the same madness, and the same loyalty.</p>
        <p>May this new year bring you happiness, confidence, good health, success in everything you work for, and plenty of reasons to smile. Keep being yourself, keep aiming high, and never forget that your best days are still ahead.</p>
        <p><strong>Happy Birthday, bhai! Here's to more memories, more laughs, and a friendship that stays strong. 🤝💖</strong></p>
        <p style="text-align:right;margin-bottom:0">— Your friend, Subhash</p>
      </article>`;
  } else if (type === "photos") {
    const figures = photoList.map((photo, i) => `
      <figure class="photo-frame" style="--tilt:${i % 2 ? "1.5deg" : "-1.5deg"}">
        <img src="${photo[0]}" alt="Saksham memory ${i+1}" loading="lazy">
        <figcaption>${photo[1]}</figcaption>
      </figure>`).join("");
    revealContent.innerHTML = `
      <div class="eyebrow">Gift 02 · memory album</div>
      <h2 class="reveal-title">Moments that matter 📸</h2>
      <p class="subtitle">Five photos, lots of memories, and a friendship worth celebrating.</p>
      <div class="photo-gallery">${figures}</div>`;
  } else if (type === "cake") {
    revealContent.innerHTML = `
      <div class="eyebrow">Gift 03 · make a wish</div>
      <h2 class="reveal-title">A cake just for you 🎂</h2>
      <p class="subtitle">Three little candles for a big year ahead. Make a wish, then blow them out!</p>
      <div class="cake-stage">
        <div class="candle"><span class="flame"></span></div>
        <div class="candle"><span class="flame"></span></div>
        <div class="candle"><span class="flame"></span></div>
        <div class="cake"><div class="cake-plate"></div></div>
        <div class="cake-plate"></div>
      </div>
      <p class="cake-instruction" id="cake-instruction">Tap the button to blow out the candles.</p>
      <div class="cake-actions">
        <button class="secondary-btn" id="blow-candles">💨 Blow out candles</button>
        <button class="secondary-btn" id="relight-candles">✨ Relight them</button>
      </div>
      <p class="tiny-note">May your wishes turn into goals, and your goals into achievements.</p>`;
    document.getElementById("blow-candles").addEventListener("click", () => {
      document.querySelectorAll(".flame").forEach(flame => flame.style.display = "none");
      document.getElementById("cake-instruction").textContent = "Wish made! Happy Birthday, Saksham! 🎉";
      burstConfetti();
    });
    document.getElementById("relight-candles").addEventListener("click", () => {
      document.querySelectorAll(".flame").forEach(flame => flame.style.display = "block");
      document.getElementById("cake-instruction").textContent = "Candles are glowing again. Make another wish! ✨";
    });
  }
}
document.querySelectorAll("[data-gift]").forEach(card => card.addEventListener("click", () => openGift(card.dataset.gift)));
document.getElementById("close-reveal").addEventListener("click", () => showScreen("gifts-screen"));
document.getElementById("back-to-gifts").addEventListener("click", () => showScreen("gifts-screen"));

function burstConfetti() {
  const symbols = ["💗", "✨", "🎉", "♡", "🌸"];
  for (let i = 0; i < 26; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(piece.style, {
      position: "fixed", zIndex: 20, left: Math.random() * 100 + "vw", top: "-30px",
      fontSize: (14 + Math.random() * 18) + "px", pointerEvents: "none",
      transition: "transform 2.6s ease-in, opacity 2.6s ease-in"
    });
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random()*700-350}deg)`;
      piece.style.opacity = "0";
    });
    setTimeout(() => piece.remove(), 2800);
  }
}

const birthdaySong = document.getElementById("birthdaySong");

document.getElementById("continue-btn").addEventListener("click", () => {
    if (birthdaySong) {
        birthdaySong.play().catch(error => console.log("Tap to enable music."));
    }
});
