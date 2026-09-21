/* =========================================================
   Corte Certo — interações da página
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function closeMenu() {
    if (!navToggle || !siteNav) return;
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Destaque do link ativo ao fazer scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = siteNav ? siteNav.querySelectorAll("a") : [];

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var match = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", match);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Formulário de contacto (envia por email) ---------- */
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        if (formStatus) {
          formStatus.textContent = "Preenche o nome e o email antes de enviar.";
          formStatus.className = "form-status is-error";
        }
        return;
      }

      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var telefone = (data.get("telefone") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var servico = (data.get("servico") || "").toString().trim();
      var descricao = (data.get("descricao") || "").toString().trim();
      var preferencia = (data.get("preferencia") || "").toString().trim();

      var linhas = [
        "Nome: " + nome,
        "Telefone: " + (telefone || "(não indicado)"),
        "Email: " + email,
        "Serviço pretendido: " + servico,
        "Zona / descrição do trabalho: " + (descricao || "(não indicado)"),
        "Preferência de contacto: " + (preferencia || "(não indicado)")
      ];

      var assunto = encodeURIComponent("Pedido de orçamento - Corte Certo");
      var corpo = encodeURIComponent(linhas.join("\n"));
      var mailtoUrl = "mailto:joaoocarril@gmail.com?subject=" + assunto + "&body=" + corpo;

      if (formStatus) {
        formStatus.textContent = "A abrir o teu email com os dados preenchidos…";
        formStatus.className = "form-status is-ok";
      }

      window.location.href = mailtoUrl;
    });
  }

  /* ---------- Botão de partilha ---------- */
  var shareBtn = document.getElementById("shareBtn");
  var fabToast = document.getElementById("fabToast");
  var toastTimer = null;

  function showToast(mensagem) {
    if (!fabToast) return;
    fabToast.textContent = mensagem;
    fabToast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      fabToast.classList.remove("is-visible");
    }, 2400);
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var shareData = {
        title: document.title,
        text: "Corte Certo — limpeza de jardins e destroçamento de terrenos.",
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () { /* utilizador cancelou a partilha */ });
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(window.location.href)
          .then(function () { showToast("Link copiado!"); })
          .catch(function () { showToast("Não foi possível copiar o link."); });
      } else {
        showToast("Não foi possível partilhar automaticamente.");
      }
    });
  }
})();
