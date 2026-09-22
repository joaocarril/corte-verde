/* ==========================================================================
   CORTE CERTO — produtos.js
   Funcionalidade exclusiva da página "Produtos": filtro por categoria.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    inicializarFiltroProdutos();
    destacarProdutoPorHash();
  });

  /* ------------------------------------------------------------------
     Filtro de produtos por categoria (Todos / Corte / Poda / Limpeza / Proteção)
  ------------------------------------------------------------------ */
  function inicializarFiltroProdutos() {
    var botoes = document.querySelectorAll(".filtro-produtos__btn");
    var produtos = document.querySelectorAll(".cartao-produto-completo");
    var semResultados = document.querySelector(".sem-resultados");
    if (!botoes.length || !produtos.length) return;

    botoes.forEach(function (botao) {
      botao.addEventListener("click", function () {
        botoes.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        botao.setAttribute("aria-pressed", "true");

        var categoria = botao.getAttribute("data-filtro");
        var visiveis = 0;

        produtos.forEach(function (produto) {
          var corresponde = categoria === "todos" || produto.getAttribute("data-categoria") === categoria;
          produto.hidden = !corresponde;
          if (corresponde) visiveis += 1;
        });

        if (semResultados) semResultados.classList.toggle("visivel", visiveis === 0);
      });
    });
  }

  /* ------------------------------------------------------------------
     Ao chegar por uma ligação direta (ex.: index.html -> #rocadoras),
     garantir que o filtro "Todos" fica ativo para o produto ser visível
  ------------------------------------------------------------------ */
  function destacarProdutoPorHash() {
    var hash = window.location.hash.replace("#", "");
    if (!hash) return;
    var alvo = document.getElementById(hash);
    if (!alvo) return;

    window.setTimeout(function () {
      alvo.classList.add("destaque-temporario");
      window.setTimeout(function () {
        alvo.classList.remove("destaque-temporario");
      }, 2900);
    }, 350);
  }

})();
