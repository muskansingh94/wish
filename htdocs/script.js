// ===== MODE =====
let mode = "birthday";

if (mode === "auto") {
  const now = new Date();

  const today = new Date(now);
  today.setHours(0,0,0,0);

  const birthday = new Date("2026-03-21");
  birthday.setHours(0,0,0,0);

  const prevDay = new Date(birthday);
  prevDay.setDate(birthday.getDate() - 1);

  const hour = now.getHours();

  if (today.getTime() === prevDay.getTime()) {
    mode = (hour < 21) ? "before9" : "after9";
  } 
  else if (today.getTime() === birthday.getTime()) {
    mode = "birthday";
  }
}

// ===== MUSIC =====
const music = document.getElementById("bg-music");

function startMusic() {
  music.play().then(() => {
    music.volume = 0;
    let vol = 0;

    let fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);
  }).catch(() => {});

  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// ===== SLIDES =====
const slides = document.querySelectorAll(".slide");

slides.forEach((slide, i) => {
  slide.classList.add(mode + "-" + (i + 1));
});

// ===== CONTENT =====
if (mode === "birthday") {

  slides[0].innerHTML = `
    <img src="2.jpeg">
    <h2 class="anim-pop">🎉 HAPPY BIRTHDAY mogli 🐵🎉</h2>
  `;

  slides[1].innerHTML = `<h2 class="anim-zoom">You are the most special person ❤️</h2>`;
  slides[2].innerHTML = `<h2 class="anim-left">aee sab churai hai 🙈</h2>`;
  slides[3].innerHTML = "<img src='4.jpeg'>";
  slides[4].innerHTML = "<img src='3.jpeg'>";
  slides[5].innerHTML = `<h2 class="anim-type">Thank you for everything 🐵💖</h2>`;
  slides[6].innerHTML = `<h2 class="anim-pop">Enjoy your special day 🎊</h2>`;

  // ✅ FIX: added start classes
  slides[7].innerHTML = `
    <h2 class="anim-zoom">tum 🙈</h2> 
    <div class="pixel-container">
      <img src="1.jpeg" class="pixel p1 start1">
      <img src="2.jpeg" class="pixel p2 start2">
      <img src="3.jpeg" class="pixel p3 start3">
      <img src="4.jpeg" class="pixel p4 start4">

      <img src="1.jpeg" class="final-img">

      <h2 class="final-text">🎉 HAPPY BIRTHDAY mogli 🐵🎉 once again</h2>
    </div>
  `;
}

// ===== SLIDER =====
let current = 0;

// ✅ NEW FLAG (prevent repeat)
let pixelPlayed = false;

function showSlide(index) {
  slides.forEach(s => s.style.display = "none");
  slides[index].style.display = "flex";

  if (index === 7 && mode === "birthday") {
    setTimeout(() => {
      animatePixels();
    }, 200);
  }
}

// ❌ removed setInterval(nextSlide, 3500)
// ✅ NEW SMART SLIDER
function runSlider() {
  showSlide(current);

  let delay = 3500;

  // ⏳ stay longer on last slide
  if (current === 7 && mode === "birthday") {
    delay = 8000;
  }

  setTimeout(() => {
    current = (current + 1) % slides.length;
    runSlider();
  }, delay);
}

// ===== PIXEL ANIMATION =====
function animatePixels() {

  // ❌ STOP REPEAT
  if (pixelPlayed) return;
  pixelPlayed = true;

  const pixels = document.querySelectorAll(".pixel");
  const finalImg = document.querySelector(".final-img");
  const finalText = document.querySelector(".final-text");

  if (!pixels.length) return;

  // reset once (important for clean start)
  pixels.forEach(img => img.classList.remove("show"));

  // force reflow
  void document.querySelector(".pixel-container").offsetWidth;

  // pixel animation
  pixels.forEach((img, i) => {
    setTimeout(() => {
      img.classList.add("show");
    }, i * 400);
  });

  // final image + text
  setTimeout(() => {
    finalImg.classList.add("show-final");
    finalText.classList.add("show-text");
  }, pixels.length * 400 + 500);
}

// ===== START =====
runSlider();