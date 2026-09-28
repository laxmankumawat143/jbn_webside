const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuButton.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

const quoteForm = document.querySelector("#quoteForm");
const formNote = document.querySelector("#formNote");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);

  const name = formData.get("name");
  const phone = formData.get("phone");
  const category = formData.get("category");

  const message =
    `New Scrap Enquiry\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Scrap Category: ${category}`;

  const whatsappNumber = "919898383534";
  const whatsappUrl = new URL(`https://wa.me/${whatsappNumber}`);
  whatsappUrl.searchParams.set("text", message);

  window.open(whatsappUrl.toString(), "_blank");

  formNote.textContent = "Your enquiry is opening in WhatsApp.";
  formNote.style.color = "#20c76a";
  quoteForm.reset();

});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counters = document.querySelectorAll("[data-count]");

const updateCounter = (counter) => {
  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";

  if (prefersReducedMotion) {
    counter.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.floor(easedProgress * target)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const stats = document.querySelector(".stats");

if (stats && counters.length) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      counters.forEach(updateCounter);
      observer.disconnect();
    }
  }, { threshold: 0.35 });

  statsObserver.observe(stats);
}
