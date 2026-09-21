// Corte Certo — menu móvel
// Mostra/esconde o painel de navegação em ecrãs estreitos (≤760px) e troca
// o ícone do botão entre "menu" e "fechar".
(function () {
  var toggle = document.getElementById('nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  var iconUse = toggle.querySelector('use');

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (iconUse) iconUse.setAttribute('href', open ? '#i-close' : '#i-menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(panel.hidden);
  });

  // fecha o painel ao clicar num link lá dentro
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // fecha com a tecla Escape e devolve o foco ao botão
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  // fecha ao clicar fora do menu
  document.addEventListener('click', function (e) {
    if (panel.hidden) return;
    if (!panel.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  // fecha automaticamente se a janela voltar a ficar larga (desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760 && !panel.hidden) setOpen(false);
  });
})();
