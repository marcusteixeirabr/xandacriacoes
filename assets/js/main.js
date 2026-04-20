/* ================================================
   main.js — Xanda Criações
   Melhorias com JavaScript puro (sem dependências)
   ================================================ */

/* ------------------------------------------------
   1. NAV ACTIVE STATE
   Destaca automaticamente o link da página atual
   no menu de navegação.
   ------------------------------------------------ */
(function markActiveNavLink() {
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("nav-active");
      link.setAttribute("aria-current", "page");
    }
  });
})();

/* ------------------------------------------------
   2. SCROLL REVEAL
   Elementos com [data-reveal] aparecem suavemente
   quando entram na viewport ao rolar a página.

   Como usar no HTML:
     <div data-reveal>...</div>
     <div data-reveal="left">...</div>   (slide da esquerda)
     <div data-reveal="right">...</div>  (slide da direita)
     <div data-reveal="up">...</div>     (padrão — sobe)

   O CSS necessário é injetado automaticamente.
   ------------------------------------------------ */
(function scrollReveal() {
  /* Injeta o CSS de animação apenas uma vez */
  if (!document.getElementById("scroll-reveal-styles")) {
    const style = document.createElement("style");
    style.id = "scroll-reveal-styles";
    style.textContent = `
      [data-reveal] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      [data-reveal],
      [data-reveal="up"]    { transform: translateY(32px); }
      [data-reveal="left"]  { transform: translateX(-32px); }
      [data-reveal="right"] { transform: translateX(32px);  }

      [data-reveal].revealed {
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
    document.head.appendChild(style);
  }

  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Pequeno delay escalonado para grupos de elementos */
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll("[data-reveal]"),
          );
          const index = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("revealed"), index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ------------------------------------------------
   3. FORMULÁRIO DE CONTATO → WHATSAPP
   Ao submeter o formulário da página contato.html,
   monta uma mensagem formatada e abre o WhatsApp
   com os dados preenchidos.
   ------------------------------------------------ 
(function contactFormToWhatsApp() {
  const form = document.querySelector(".contact-form, form");
  if (!form) return;

  // Impede o envio padrão e intercepta
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coleta campos pelo name ou pelo label/placeholder
    const get = (selector) => {
      const el = form.querySelector(selector);
      return el ? el.value.trim() : "";
    };

    const nome = get('[name="nome"], #nome, input[placeholder*="ome"]');
    const telefone = get(
      '[name="telefone"], #telefone, input[placeholder*="hatsApp"], input[placeholder*="elefone"]',
    );
    const email = get('[name="email"], #email, input[type="email"]');
    const produto = get('[name="produto"], #produto, select');
    const mensagem = get('[name="mensagem"], #mensagem, textarea');

    // Validação simples
    if (!nome || !mensagem) {
      showFormFeedback(
        form,
        "error",
        "Por favor, preencha pelo menos o nome e a mensagem.",
      );
      return;
    }

    // Monta a mensagem para o WhatsApp
    let texto = `Olá, Xanda! 👋\n\n`;
    texto += `*Nome:* ${nome}\n`;
    if (telefone) texto += `*Telefone:* ${telefone}\n`;
    if (email) texto += `*E-mail:* ${email}\n`;
    if (produto) texto += `*Produto de interesse:* ${produto}\n`;
    texto += `\n*Mensagem:*\n${mensagem}`;

    const numero = "5547992680063";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    showFormFeedback(form, "success", "Redirecionando para o WhatsApp…");
    setTimeout(() => window.open(url, "_blank"), 800);
  });

  // Exibe feedback visual no formulário
  function showFormFeedback(form, type, message) {
    let feedback = form.querySelector(".form-feedback");

    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "form-feedback";
      feedback.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 500;
      `;
      form.appendChild(feedback);
    }

    feedback.textContent = message;

    if (type === "success") {
      feedback.style.background = "#d1fae5";
      feedback.style.color = "#065f46";
      feedback.style.border = "1px solid #6ee7b7";
    } else {
      feedback.style.background = "#fee2e2";
      feedback.style.color = "#991b1b";
      feedback.style.border = "1px solid #fca5a5";
    }
  }
})();

 ------------------------------------------------
   4. DESATIVA LINKS DO NAV QUE APONTAM PARA A PÁGINA ATUAL
   Evita duplicidade de destaque (ex: "Solicitar Orçamento"
   na página de contato).
   ------------------------------------------------ 
(function disableSelfLinks() {
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.removeAttribute("href"); // remove o clique
      link.setAttribute("aria-disabled", "true");
      link.classList.add("nav-disabled");
    }
  });
})(); */
