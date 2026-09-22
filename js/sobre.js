/* ==========================================================================
   CORTE CERTO — sobre.js
   Funcionalidade exclusiva da página "Sobre Nós": uma linha vertical que
   acompanha o scroll e vai "preenchendo" a linha temporal da empresa,
   dando uma noção visual de progresso ao longo da história.
   ========================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", inicializarProgressoTimeline);

  function inicializarProgressoTimeline() {
    var timeline = document.querySelector(".timeline");
    if (!timeline) return;

    var progresso = document.createElement("div");
    progresso.className = "timeline__progresso";
    progresso.setAttribute("aria-hidden", "true");
    timeline.appendChild(progresso);

    function atualizar() {
      var retangulo = timeline.getBoundingClientRect();
      var pontoDeReferencia = window.innerHeight * 0.8;
      var distanciaPercorrida = pontoDeReferencia - retangulo.top;
      var percentagem = Math.max(0, Math.min(1, distanciaPercorrida / retangulo.height));
      progresso.style.height = (percentagem * 100) + "%";
    }

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
  }

})();
