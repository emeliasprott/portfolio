document.addEventListener("DOMContentLoaded", function () {
  // Smooth fade-in animations with intersection observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stagger children with slight delay
        const children = entry.target.querySelectorAll(".fade-child");
        children.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, i * 150);
        });

        // Stop observing once visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade elements
  document.querySelectorAll(".fade").forEach((el) => {
    observer.observe(el);
  });

  // Smooth scroll offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = document.querySelector(".nav").offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active state to nav on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
