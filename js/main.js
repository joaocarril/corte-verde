/* ==========================================================================
   CORTE CERTO — main.js
   Funcionalidades globais, carregadas em TODAS as páginas do site:
     - Menu mobile (hamburger)
     - Cabeçalho com efeito ao fazer scroll
     - Scroll suave para âncoras internas da mesma página
     - Animações de entrada ao aparecerem no ecrã (scroll reveal)
     - Botão "voltar ao topo"
     - Formulário de contacto: validação no frontend + mensagem demonstrativa
     - Ano atual no rodapé

   Nota: este projeto não tem backend. O formulário de contacto apenas
   valida os dados no browser e mostra uma mensagem de sucesso demonstrativa;
   nenhum dado é efetivamente enviado para nenhum servidor.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    inicializarMenuMobile();
    inicializarCabecalhoScroll();
    inicializarScrollSuave();
    inicializarAnimacoesEntrada();
    inicializarBotaoTopo();
    inicializarFormularioContacto();
    definirAnoRodape();
  });

  /* ------------------------------------------------------------------
     Menu mobile (hamburger)
  ------------------------------------------------------------------ */
  function inicializarMenuMobile() {
    var botao = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-principal");
    if (!botao || !nav) return;

    function fechar() {
      botao.setAttribute("aria-expanded", "false");
      nav.classList.remove("aberto");
      document.body.classList.remove("menu-aberto");
    }

    function alternar() {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      nav.classList.toggle("aberto", !aberto);
      document.body.classList.toggle("menu-aberto", !aberto);
    }

    botao.addEventListener("click", function (evento) {
      evento.stopPropagation();
      alternar();
    });

    // Fechar automaticamente ao escolher um link do menu
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fechar);
    });

    // Fechar com a tecla Escape (acessibilidade por teclado)
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") fechar();
    });

    // Fechar ao clicar fora do menu aberto
    document.addEventListener("click", function (evento) {
      var cliqueDentro = nav.contains(evento.target) || botao.contains(evento.target);
      if (!cliqueDentro && nav.classList.contains("aberto")) fechar();
    });

    // Garantir que o menu fecha se a janela for aumentada para desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) fechar();
    });
  }

  /* ------------------------------------------------------------------
     Cabeçalho: sombra e compactação ao fazer scroll
  ------------------------------------------------------------------ */
  function inicializarCabecalhoScroll() {
    var cabecalho = document.querySelector(".cabecalho");
    if (!cabecalho) return;

    function atualizar() {
      cabecalho.classList.toggle("scrolled", window.scrollY > 12);
    }

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
  }

  /* ------------------------------------------------------------------
     Scroll suave para âncoras internas (links que começam por "#")
     Links para outras páginas (ex.: "../../index.html#contacto") não são
     intercetados: o browser trata-os normalmente.
  ------------------------------------------------------------------ */
  function inicializarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (evento) {
        var idAlvo = link.getAttribute("href").slice(1);
        if (!idAlvo) return;

        var alvo = document.getElementById(idAlvo);
        if (!alvo) return;

        evento.preventDefault();
        var cabecalho = document.querySelector(".cabecalho");
        var offset = cabecalho ? cabecalho.offsetHeight : 0;
        var posicao = alvo.getBoundingClientRect().top + window.pageYOffset - offset + 1;

        window.scrollTo({ top: posicao, behavior: "smooth" });
        history.pushState(null, "", "#" + idAlvo);
      });
    });
  }

  /* ------------------------------------------------------------------
     Animações de entrada ao aparecerem no ecrã (IntersectionObserver)

     Para garantir que o conteúdo NUNCA fica invisível (por exemplo, se o
     IntersectionObserver não disparar para algum elemento num scroll muito
     rápido, ou em navegadores/dispositivos pouco comuns), esta função usa
     três camadas de segurança:
       1) IntersectionObserver — mecanismo principal, mais eficiente;
       2) verificação manual (posição do elemento face ao ecrã) a cada
          scroll/redimensionamento, como rede de segurança redundante;
       3) um temporizador final que revela tudo o que ainda esteja
          pendente, para que nenhuma secção fique em branco.
  ------------------------------------------------------------------ */
  function inicializarAnimacoesEntrada() {
    var elementos = document.querySelectorAll(".reveal");
    if (!elementos.length) return;

    function revelarTudo() {
      elementos.forEach(function (el) { el.classList.add("visivel"); });
    }

    // Sem suporte para IntersectionObserver: mostrar tudo de imediato
    if (!("IntersectionObserver" in window)) {
      revelarTudo();
      return;
    }

    // Escalonar (stagger) elementos que partilham o mesmo contentor (ex.: grelhas de cartões)
    var contadores = new WeakMap();
    elementos.forEach(function (el) {
      var pai = el.parentElement;
      var indice = contadores.get(pai) || 0;
      el.style.transitionDelay = Math.min(indice * 60, 360) + "ms";
      contadores.set(pai, indice + 1);
    });

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });

    elementos.forEach(function (el) { observador.observe(el); });

    // --- Rede de segurança 1: verificação manual redundante ---------
    var verificacaoAtiva = true;
    function verificarManualmente() {
      if (!verificacaoAtiva) return;
      var algumPendente = false;

      elementos.forEach(function (el) {
        if (el.classList.contains("visivel")) return;
        var retangulo = el.getBoundingClientRect();
        var estaProximoDoEcra = retangulo.top < window.innerHeight * 1.1 && retangulo.bottom > -150;
        if (estaProximoDoEcra) {
          el.classList.add("visivel");
          observador.unobserve(el);
        } else {
          algumPendente = true;
        }
      });

      if (!algumPendente) verificacaoAtiva = false;
    }

    var verificacaoAgendada = false;
    function agendarVerificacao() {
      if (verificacaoAgendada) return;
      verificacaoAgendada = true;
      window.requestAnimationFrame(function () {
        verificarManualmente();
        verificacaoAgendada = false;
      });
    }

    window.addEventListener("scroll", agendarVerificacao, { passive: true });
    window.addEventListener("resize", agendarVerificacao);
    agendarVerificacao();

    // --- Rede de segurança 2: garantia final -------------------------
    // Caso, por qualquer motivo, algum elemento continue por revelar,
    // este temporizador garante que todo o conteúdo acaba sempre visível.
    window.setTimeout(revelarTudo, 3500);
  }

  /* ------------------------------------------------------------------
     Botão "voltar ao topo"
  ------------------------------------------------------------------ */
  function inicializarBotaoTopo() {
    var botao = document.querySelector(".botao-topo");
    if (!botao) return;

    function atualizar() {
      botao.classList.toggle("visivel", window.scrollY > 480);
    }

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });

    botao.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     Formulário de contacto
     - Valida nome, email, telefone, serviço e mensagem no frontend
     - Pré-seleciona o serviço quando chega um parâmetro ?servico= na URL
     - Mostra uma mensagem de sucesso demonstrativa (sem envio real)
  ------------------------------------------------------------------ */
  function inicializarFormularioContacto() {
    var wrapper = document.querySelector(".formulario");
    var form = document.getElementById("form-contacto");
    if (!wrapper || !form) return;

    preencherServicoPorParametro(form);

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var validadores = {
      nome: function (valor) { return valor.trim().length >= 2; },
      email: function (valor) { return regexEmail.test(valor.trim()); },
      telefone: function (valor) {
        var limpo = valor.replace(/[\s()-]/g, "");
        return /^\+?\d{9,13}$/.test(limpo);
      },
      servico: function (valor) { return valor.trim().length > 0; },
      mensagem: function (valor) { return valor.trim().length >= 10; }
    };

    function validarCampo(campoEl) {
      var validar = validadores[campoEl.name];
      if (!validar) return true;

      var valido = validar(campoEl.value);
      var campoWrapper = campoEl.closest(".campo");
      if (campoWrapper) campoWrapper.classList.toggle("campo--invalido", !valido);
      return valido;
    }

    var camposDoFormulario = form.querySelectorAll("input, select, textarea");

    camposDoFormulario.forEach(function (campoEl) {
      campoEl.addEventListener("blur", function () { validarCampo(campoEl); });
      campoEl.addEventListener("input", function () {
        if (campoEl.closest(".campo--invalido")) validarCampo(campoEl);
      });
    });

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      var tudoValido = true;
      var primeiroInvalido = null;

      camposDoFormulario.forEach(function (campoEl) {
        var valido = validarCampo(campoEl);
        if (!valido) {
          tudoValido = false;
          if (!primeiroInvalido) primeiroInvalido = campoEl;
        }
      });

      if (!tudoValido) {
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      // A partir daqui os dados são válidos. Como este projeto não tem
      // backend, NENHUM pedido é enviado de facto: mostramos apenas uma
      // mensagem de sucesso demonstrativa.
      wrapper.classList.add("enviado");
      var sucesso = wrapper.querySelector(".formulario__sucesso");
      if (sucesso) {
        sucesso.setAttribute("tabindex", "-1");
        sucesso.focus();
      }
      form.reset();
    });
  }

  function preencherServicoPorParametro(form) {
    var parametros = new URLSearchParams(window.location.search);
    var servico = parametros.get("servico");
    if (!servico) return;

    var select = form.querySelector("#servico");
    var mensagem = form.querySelector("#mensagem");
    if (!select) return;

    var opcaoEncontrada = false;
    Array.prototype.forEach.call(select.options, function (opcao) {
      if (opcao.text.trim().toLowerCase() === servico.trim().toLowerCase()) {
        select.value = opcao.value;
        opcaoEncontrada = true;
      }
    });

    if (!opcaoEncontrada) {
      select.value = "Outro";
      if (mensagem && !mensagem.value) {
        mensagem.value = "Tenho interesse no seguinte serviço: " + servico + ". ";
      }
    }
  }

  /* ------------------------------------------------------------------
     Ano atual no rodapé (mantém o copyright sempre atualizado)
  ------------------------------------------------------------------ */
  function definirAnoRodape() {
    var ano = new Date().getFullYear();
    document.querySelectorAll(".ano-atual").forEach(function (el) {
      el.textContent = ano;
    });
  }

})();
