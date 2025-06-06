document.addEventListener("DOMContentLoaded", function () {
  // Funcionalidade de alternância de tema
  const themeToggle = document.querySelector(".theme-toggle");
  const htmlElement = document.documentElement;

  themeToggle.addEventListener("click", function () {
    htmlElement.classList.toggle("dark");
    const isDarkMode = htmlElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);
  });

  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    htmlElement.classList.add("dark");
  } else if (savedDarkMode === "false") {
    htmlElement.classList.remove("dark");
  }

  // Menu mobile
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuToggle.addEventListener("click", function () {
    this.classList.toggle("active");

    if (this.classList.contains("active")) {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "80px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.backgroundColor = "var(--bg-secondary)";
      navLinks.style.padding = "20px";
      navLinks.style.boxShadow = "0 10px 20px var(--shadow)";

      this.querySelector("span:nth-child(1)").style.transform =
        "rotate(45deg) translate(5px, 5px)";
      this.querySelector("span:nth-child(2)").style.opacity = "0";
      this.querySelector("span:nth-child(3)").style.transform =
        "rotate(-45deg) translate(7px, -7px)";
    } else {
      navLinks.style.display = "none";

      this.querySelector("span:nth-child(1)").style.transform = "none";
      this.querySelector("span:nth-child(2)").style.opacity = "1";
      this.querySelector("span:nth-child(3)").style.transform = "none";
    }
  });

  const navLinkItems = document.querySelectorAll(".nav-links a");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
        mobileMenuToggle.classList.remove("active");
        mobileMenuToggle.querySelector("span:nth-child(1)").style.transform =
          "none";
        mobileMenuToggle.querySelector("span:nth-child(2)").style.opacity = "1";
        mobileMenuToggle.querySelector("span:nth-child(3)").style.transform =
          "none";
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.style = "";
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const skillSection = document.querySelector(".skills");
  const skillLevels = document.querySelectorAll(".skill-level");

  function animateSkills() {
    if (isElementInViewport(skillSection)) {
      skillLevels.forEach((level) => {
        level.style.width =
          level.style.width ||
          level.getAttribute("style").match(/width:\s*(\d+)%/)[1] + "%";
      });
      window.removeEventListener("scroll", animateSkills);
    }
  }

  window.addEventListener("scroll", animateSkills);
  animateSkills();

  // Validação do formulário
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Por favor, insira um endereço de e-mail válido");
      return;
    }

    // evitar redirecionamento
    fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        mostrarMensagem();
        contactForm.reset(); 
      } else {
        alert("Erro ao enviar o formulário.");
      }
    }).catch(() => {
      alert("Erro ao enviar o formulário.");
    });

    // evitar redirecionamento
  });
}

function mostrarMensagem() {
  const mensagem = document.getElementById('thankYouMessage');
  mensagem.style.display = 'block';

  setTimeout(() => {
    mensagem.style.display = 'none';
  }, 5000);
}

function isValidEmail(email) {
  // Função simples para validar email
  return /\S+@\S+\.\S+/.test(email);
}



function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}




  const heroContent = document.querySelector(".hero-content");

  if (heroContent) {
    heroContent.classList.add("hidden");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    observer.observe(heroContent);
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
