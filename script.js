document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  /* Fade-in with stagger */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          const children = entry.target.querySelectorAll(".fade-child");
          children.forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 120);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade").forEach((el) => observer.observe(el));
});
