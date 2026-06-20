const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "×" : "☰";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll("video").forEach((video) => {
  const applyVideoOrientation = () => {
    if (video.videoHeight > video.videoWidth) {
      video.classList.add("portrait-video");
      video.closest(".gallery-item, .media-large, .media-side")?.classList.add("portrait-media");
    }
  };

  if (video.readyState >= 1) {
    applyVideoOrientation();
  } else {
    video.addEventListener("loadedmetadata", applyVideoOrientation, { once: true });
  }
});

const form = document.querySelector("#contactForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const message = document.querySelector("#message").value.trim();
    const text = encodeURIComponent(`Merhaba, web siteniz üzerinden iletişime geçiyorum.\nAd Soyad: ${name}\nTelefon: ${phone}\nTaşınma Detayları: ${message}`);
    window.open(`https://wa.me/905050744686?text=${text}`, "_blank", "noopener");
  });
}
