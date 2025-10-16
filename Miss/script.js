// Scroll halus ke bagian proyek
document.getElementById("scrollProjects").addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

// Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// Tombol salin email
document.getElementById("copyEmail").addEventListener("click", () => {
  const email = document.getElementById("email").textContent;
  navigator.clipboard.writeText(email).then(() => alert("Email disalin: " + email));
});

// Toggle expand detail proyek
function toggleDetail(id) {
  const card = document.getElementById(id).parentElement;
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(c => { if(c!==card) c.classList.remove('open'); });
  card.classList.toggle('open');
}

// Tombol link tiap proyek
function openLink(event, url) {
  event.stopPropagation(); // mencegah toggle
  window.open(url, "_blank");
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animasi fade-up saat scroll
const faders = document.querySelectorAll('.fade-up, .card');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Animasi untuk about section
const aboutElements = document.querySelectorAll('.about .fade-up');
aboutElements.forEach(el => {
  appearOnScroll.observe(el);
});
