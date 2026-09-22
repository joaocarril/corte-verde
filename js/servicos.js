/* ==========================================================================
   CORTE CERTO — servicos.js
   Funcionalidades exclusivas da página "Serviços":
     - Destaque temporário do serviço quando se chega por uma ligação direta
       (ex.: um card da página inicial que aponta para servicos.html#poda-arvores)
     - Pesquisa/filtro em tempo real dos 18 serviços apresentados
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    destacarServicoPorHash();
    inicializarPesquisaServicos();
  });

  /* ------------------------------------------------------------------
     Destacar visualmente o cartão do serviço indicado na hiperligação
  ------------------------------------------------------------------ */
  function destacarServicoPorHash() {
    var hash = window.location.hash.replace("#", "");
    if (!hash) return;

    var alvo = document.getElementById(hash);
    if (!alvo || !alvo.classList.contains("cartao-servico")) return;

    // Pequeno atraso para garantir que o scroll automático do browser já ocorreu
    window.setTimeout(function () {
      alvo.classList.add("destaque-temporario");
      window.setTimeout(function () {
        alvo.classList.remove("destaque-temporario");
      }, 2900);
    }, 350);
  }

  /* ------------------------------------------------------------------
     Pesquisa em tempo real: filtra os cartões pelo texto do título,
     descrição e benefícios
  ------------------------------------------------------------------ */
  function inicializarPesquisaServicos() {
    var input = document.getElementById("pesquisa-servico");
    var cartoes = document.querySelectorAll(".cartao-servico");
    var semResultados = document.querySelector(".sem-resultados");
    var estadoResultado = document.querySelector(".pesquisa-servicos__resultado");

    if (!input || !cartoes.length) return;

    input.addEventListener("input", function () {
      var termo = input.value.trim().toLowerCase();
      var visiveis = 0;

      cartoes.forEach(function (cartao) {
        var texto = cartao.textContent.toLowerCase();
        var corresponde = termo === "" || texto.indexOf(termo) !== -1;
        cartao.hidden = !corresponde;
        if (corresponde) visiveis += 1;
      });

      if (semResultados) semResultados.classList.toggle("visivel", visiveis === 0 && termo !== "");

      if (estadoResultado) {
        estadoResultado.textContent = termo === ""
          ? ""
          : visiveis + " de " + cartoes.length + " serviços encontrados para \"" + termo + "\".";
      }
    });
  }

})();
