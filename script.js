/* ===== Carrossel ===== */
const track = document.getElementById("carouselTrack");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dotsWrap = document.getElementById("carouselDots");
const totalSlides = slides.length;

let currentSlide = 0;

function slidesToShow() {
  return window.innerWidth <= 600 ? 1 : 2;
}

function maxIndex() {
  return Math.max(0, totalSlides - slidesToShow());
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  const count = maxIndex() + 1;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Ir para o slide " + (i + 1));
    b.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(b);
  }
  updateDots();
}

function updateDots() {
  if (!dotsWrap) return;
  Array.from(dotsWrap.children).forEach((d, i) =>
    d.classList.toggle("active", i === currentSlide)
  );
}

function render() {
  const perView = slidesToShow();
  const step = 100 / perView;
  const offset = -currentSlide * step - (currentSlide > 0 ? currentSlide * (24 / track.offsetWidth) * 100 / perView : 0);
  // simpler: translate by slide width including gap
  const slideW = slides[0].getBoundingClientRect().width;
  const gap = 24;
  track.style.transform = `translateX(${-currentSlide * (slideW + gap)}px)`;
  updateDots();
}

function goToSlide(i) {
  currentSlide = Math.min(Math.max(i, 0), maxIndex());
  render();
}

function moveCarousel(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = maxIndex();
  else if (currentSlide > maxIndex()) currentSlide = 0;
  render();
}

window.addEventListener("resize", () => {
  currentSlide = Math.min(currentSlide, maxIndex());
  buildDots();
  render();
});

buildDots();
render();

/* ===== FAQ ===== */
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const answer = faqItem.querySelector(".faq-answer");
  const isOpen = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").classList.remove("open");
  });

  if (!isOpen) {
    faqItem.classList.add("active");
    answer.classList.add("open");
  }
}
