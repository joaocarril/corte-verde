# Corte Certo — Website Institucional

Website institucional para a **Corte Certo**, empresa dedicada à limpeza de jardins,
limpeza de terrenos e manutenção de espaços exteriores.

Este projeto foi construído inteiramente em **HTML, CSS e JavaScript puros** (sem
frameworks, bibliotecas externas ou backend), para poder ser aberto, editado e publicado
em qualquer alojamento web sem dependências.

---

## Índice

1. [Objetivo do projeto](#1-objetivo-do-projeto)
2. [Estrutura das pastas](#2-estrutura-das-pastas)
3. [Como abrir o website](#3-como-abrir-o-website)
4. [Como alterar os contactos](#4-como-alterar-os-contactos)
5. [Como alterar textos](#5-como-alterar-textos)
6. [Como adicionar ou editar serviços](#6-como-adicionar-ou-editar-serviços)
7. [Como adicionar ou editar produtos](#7-como-adicionar-ou-editar-produtos)
8. [Como substituir imagens](#8-como-substituir-imagens)
9. [Como alterar as cores do site](#9-como-alterar-as-cores-do-site)
10. [Como alterar os links das redes sociais](#10-como-alterar-os-links-das-redes-sociais)
11. [Como ativar uma fonte do Google Fonts](#11-como-ativar-uma-fonte-do-google-fonts)
12. [Informações ainda por preencher (placeholders)](#12-informações-ainda-por-preencher-placeholders)
13. [Notas técnicas](#13-notas-técnicas)

---

## 1. Objetivo do projeto

Apresentar a Corte Certo como uma empresa profissional, fiável e experiente, através de
um website moderno, responsivo e fácil de navegar, com quatro páginas principais:

- **Início** — apresentação geral da empresa, serviços e produtos em destaque, motivos
  para escolher a Corte Certo e formulário de contacto;
- **Serviços** — lista completa dos 18 serviços prestados;
- **Produtos** — equipamentos e ferramentas utilizados/disponibilizados;
- **Sobre Nós** — história, missão, valores, equipa e percurso da empresa.

---

## 2. Estrutura das pastas

```text
corte-certo/
│
├── index.html                     → Página inicial
│
├── paginas/
│   ├── servicos/servicos.html     → Página "Serviços"
│   ├── produtos/produtos.html     → Página "Produtos"
│   └── sobre/sobre.html           → Página "Sobre Nós"
│
├── css/
│   ├── style.css                  → Estilos globais (cabeçalho, rodapé, botões,
│   │                                 hero, secções da página inicial, animações,
│   │                                 responsividade)
│   ├── servicos.css               → Estilos exclusivos da página "Serviços"
│   ├── produtos.css               → Estilos exclusivos da página "Produtos"
│   └── sobre.css                  → Estilos exclusivos da página "Sobre Nós"
│
├── js/
│   ├── main.js                    → Funcionalidades globais (menu mobile, scroll,
│   │                                 animações, formulário, botão "voltar ao topo")
│   ├── servicos.js                → Pesquisa de serviços + destaque por ligação direta
│   ├── produtos.js                → Filtro de produtos por categoria
│   └── sobre.js                   → Progresso visual da linha temporal
│
├── imagens/
│   ├── logo/                      → Logótipo (cor, branco e favicon)
│   ├── hero/                      → Imagens de fundo dos cabeçalhos (hero)
│   ├── servicos/                  → Imagens dos serviços
│   ├── produtos/                  → Imagens dos produtos
│   └── sobre/                     → Imagens da página "Sobre Nós"
│
└── README.md                      → Este ficheiro
```

Cada página HTML está na sua própria pasta (dentro de `paginas/`), com os ficheiros CSS e
JavaScript centralizados nas pastas `css/` e `js/`. Não existe CSS nem JavaScript escrito
diretamente dentro dos ficheiros HTML — toda a lógica de estilo e comportamento está nos
ficheiros externos correspondentes.

---

## 3. Como abrir o website

O projeto **não precisa de servidor nem de backend**. Para o testar localmente, basta:

1. Fazer duplo clique no ficheiro `index.html` (abre no browser predefinido), **ou**
2. Arrastar o ficheiro `index.html` para dentro de uma janela do browser (Chrome, Edge,
   Firefox, etc.).

Todos os caminhos entre páginas, imagens, CSS e JavaScript usam **caminhos relativos**,
pelo que a estrutura de pastas deve manter-se exatamente como está — se mover ou renomear
uma pasta, os links e as imagens dessa página deixam de funcionar.

Para colocar o site online, basta enviar a pasta `corte-certo/` (com toda a sua
estrutura) para qualquer serviço de alojamento de páginas estáticas (por exemplo, um
alojamento tradicional por FTP, GitHub Pages, Netlify, Vercel, etc.) — não é necessário
nenhum processo de build.

---

## 4. Como alterar os contactos

Os dados de contacto (telefone, email, localização e horário) aparecem atualmente como
**placeholders**, claramente identificados entre parênteses retos, por exemplo:
`[INSERIR TELEFONE]`.

Estes dados repetem-se em **vários ficheiros**, porque o projeto não usa nenhum sistema de
"includes" (não há backend). Sempre que atualizar um contacto, repita a alteração nos
seguintes locais:

- `index.html` → secção "Contacto" (perto do fim da página) e rodapé;
- `paginas/servicos/servicos.html` → rodapé;
- `paginas/produtos/produtos.html` → rodapé;
- `paginas/sobre/sobre.html` → rodapé.

Em cada ficheiro, procure por `[INSERIR TELEFONE]`, `[INSERIR EMAIL]`,
`[INSERIR LOCALIZAÇÃO]` e `[INSERIR HORÁRIO]` e substitua pelo texto real. Não se esqueça
de também atualizar os **links** associados (não apenas o texto visível):

```html
<a href="tel:+351XXXXXXXXX">[INSERIR TELEFONE]</a>
<a href="mailto:INSERIR_EMAIL@corte-certo.pt">[INSERIR EMAIL]</a>
<a href="https://wa.me/351XXXXXXXXX">WhatsApp</a>
```

- Em `tel:+351XXXXXXXXX`, substitua `XXXXXXXXX` pelo número real (sem espaços).
- Em `mailto:...`, substitua pelo endereço de email real.
- Em `https://wa.me/351XXXXXXXXX`, substitua pelo número de WhatsApp real (formato
  internacional, sem `+` nem espaços — por exemplo `https://wa.me/351912345678`).

---

## 5. Como alterar textos

Todos os textos estão escritos diretamente no HTML de cada página, dentro de tags como
`<h1>`, `<h2>`, `<h3>` e `<p>`. Para alterar um texto:

1. Abra o ficheiro HTML da página correspondente num editor de texto/código (por exemplo,
   o Visual Studio Code, o Bloco de Notas, ou qualquer outro editor);
2. Localize o texto que pretende alterar (use a função de pesquisar do editor,
   `Ctrl+F`/`Cmd+F`);
3. Substitua apenas o texto, mantendo as tags HTML (`<h2>`, `<p>`, etc.) intactas à volta.

Na página "Sobre Nós" (`paginas/sobre/sobre.html`), preste especial atenção aos textos
entre parênteses retos (ex.: `[ANO DE FUNDAÇÃO]`, `[HISTÓRIA DA EMPRESA]`) — são
placeholders que devem ser substituídos pela história real da empresa antes de publicar o
site (ver secção 12).

---

## 6. Como adicionar ou editar serviços

Os serviços estão listados em `paginas/servicos/servicos.html`, dentro da grelha
`<div class="grelha-servicos">`. Cada serviço é um bloco `<article class="cartao
cartao-servico" id="...">` independente.

**Para adicionar um novo serviço:**

1. Copie um bloco `<article class="cartao cartao-servico" ...> ... </article>` completo
   (de um serviço já existente);
2. Cole-o dentro da `<div class="grelha-servicos">`, antes do fecho `</div>`;
3. Dê-lhe um `id` novo e único (sem espaços nem acentos — ex.: `id="rega-automatica"`);
4. Altere a imagem (`<img src="...">`), o ícone, o título (`<h3>`), a descrição, os
   benefícios (`<li>` dentro de `.cartao-servico__beneficios`) e o link do botão "Pedir
   Orçamento";
5. Se quiser que este serviço também apareça em destaque na página inicial, copie um dos
   cartões da secção "Os nossos serviços" em `index.html` e ajuste o link "Saber Mais"
   para apontar para `paginas/servicos/servicos.html#o-novo-id`.

**Para remover um serviço**, apague o bloco `<article>...</article>` correspondente.

O campo de pesquisa no topo da página filtra automaticamente com base no texto de cada
cartão (título, descrição e benefícios) — não precisa de nenhuma configuração adicional.

---

## 7. Como adicionar ou editar produtos

Os produtos estão em `paginas/produtos/produtos.html`, dentro da
`<div class="grelha-produtos">`, seguindo a mesma lógica dos serviços.

**Para adicionar um novo produto:**

1. Copie um bloco `<article class="cartao cartao-produto-completo" ...>...</article>`;
2. Dê-lhe um `id` único e defina a categoria em `data-categoria="..."` — as categorias
   disponíveis no filtro são: `corte`, `poda`, `limpeza` e `protecao` (pode criar uma nova
   categoria, mas nesse caso adicione também um novo botão de filtro em
   `.filtro-produtos`, seguindo o mesmo padrão dos existentes);
3. Atualize a imagem, o nome, a categoria visível (`.cartao-produto-completo__categoria`),
   a descrição e as características;
4. Caso não existam informações reais sobre preços ou modelos, mantenha a indicação
   "Modelo e preço sob consulta" (ou similar) — **não invente preços**.

Não se esqueça de colocar a imagem correspondente na pasta `imagens/produtos/`.

---

## 8. Como substituir imagens

Todas as imagens atuais em `imagens/` são **ilustrações SVG geradas automaticamente**,
com a indicação "IMAGEM DEMONSTRATIVA" visível — servem apenas de placeholder visual até
existirem fotografias reais da empresa.

Para substituir uma imagem:

1. Prepare a fotografia real (formatos recomendados: `.jpg` para fotografias, `.png` para
   imagens com transparência, ou `.svg` para logótipos vetoriais);
2. Nomeie o novo ficheiro **exatamente igual** ao ficheiro que está a substituir (por
   exemplo, substitua o conteúdo de `imagens/servicos/limpeza-terrenos.svg` por um
   `imagens/servicos/limpeza-terrenos.jpg` com fotografia real);
3. Se dér um nome diferente ou uma extensão diferente ao ficheiro, terá também de
   atualizar o atributo `src="..."` da tag `<img>` correspondente no(s) ficheiro(s) HTML;
4. Para melhor desempenho, use imagens otimizadas para a web (largura recomendada:
   800–1200px para cartões, 1600–1920px para imagens de fundo do hero) e comprima-as antes
   de as adicionar (por exemplo, com o TinyPNG ou o Squoosh).

Organização recomendada das pastas de imagens (já preparada no projeto):

```text
imagens/
├── logo/       → Logótipo (cor e branco) e favicon
├── hero/       → Imagens de fundo dos cabeçalhos das 4 páginas
├── servicos/   → Fotografias dos serviços
├── produtos/   → Fotografias dos produtos/equipamentos
└── sobre/      → Fotografias da equipa e da história da empresa
```

Todas as imagens têm texto alternativo (`alt="..."`) — ao substituir uma imagem, atualize
também o `alt` para descrever a fotografia real, mantendo o site acessível.

---

## 9. Como alterar as cores do site

Todas as cores do website estão centralizadas em **variáveis CSS**, no topo do ficheiro
`css/style.css`:

```css
:root {
  --cor-verde-escuro: #1B4332;
  --cor-verde-medio: #2D6A4F;
  --cor-verde-medio-claro: #40916C;
  --cor-verde-claro: #95D5B2;
  --cor-verde-suave: #EDF7F0;
  --cor-destaque: #E9A23B;
  --cor-destaque-escuro: #C97F1E;
  /* ... */
}
```

Para alterar a paleta de cores de todo o site, basta editar os valores destas variáveis
**uma única vez** no início de `css/style.css` — todas as páginas e componentes (botões,
cabeçalho, rodapé, cartões, ícones) são atualizados automaticamente, porque todo o CSS do
projeto usa estas variáveis em vez de cores fixas.

---

## 10. Como alterar os links das redes sociais

Os ícones de redes sociais aparecem no rodapé de todas as páginas
(`<div class="rodape__redes">`), atualmente com `href="#"` e um atributo `title` a indicar
qual o link em falta, por exemplo:

```html
<a href="#" class="rodape__link-social" aria-label="Facebook da Corte Certo" title="[LINK FACEBOOK]">
```

Para ativar os links reais, substitua o `href="#"` pelo link completo da respetiva rede
social (ex.: `href="https://www.facebook.com/cortecerto"`) e remova o atributo `title`
(que serve apenas de lembrete). Como o rodapé se repete em todas as páginas, faça esta
alteração em:

- `index.html`
- `paginas/servicos/servicos.html`
- `paginas/produtos/produtos.html`
- `paginas/sobre/sobre.html`

Se algum ícone (ex.: TikTok) não for necessário, pode simplesmente apagar o bloco
`<a class="rodape__link-social">...</a>` correspondente nos 4 ficheiros.

---

## 11. Como ativar uma fonte do Google Fonts

Por predefinição, o site usa apenas fontes seguras do sistema operativo, para funcionar
perfeitamente offline e sem dependências externas. Se quiser usar uma fonte do Google
Fonts (por exemplo, "Poppins" para títulos e "Inter" para texto corrido — já previstas no
código):

1. Escolha as fontes em [fonts.google.com](https://fonts.google.com);
2. Em cada ficheiro HTML (`index.html` e as 3 páginas em `paginas/`), descomente (ou
   adicione) no `<head>` as linhas semelhantes a:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

3. As variáveis `--fonte-titulos` e `--fonte-corpo`, no início de `css/style.css`, já
   estão preparadas com esses nomes de fonte — não é necessário alterar mais nada.

---

## 12. Informações ainda por preencher (placeholders)

Por indicação do pedido original, **nenhuma informação real da empresa foi inventada**.
Antes de publicar o site, reveja e substitua todos os textos assinalados entre parênteses
retos `[ ... ]`, nomeadamente:

- Telefone, email, localização e horário (secção de contacto e rodapé, em todas as
  páginas — ver secção 4 deste README);
- Links das redes sociais (Facebook, Instagram, WhatsApp e TikTok — ver secção 10);
- Ano de fundação, nome do(a) fundador(a), localização da empresa e história da empresa
  (`paginas/sobre/sobre.html`);
- Datas e acontecimentos da linha temporal (`paginas/sobre/sobre.html`);
- Nomes e cargos da equipa (`paginas/sobre/sobre.html`);
- Todas as imagens demonstrativas (ver secção 8).

---

## 13. Notas técnicas

- **Sem frameworks nem bibliotecas externas** — HTML, CSS e JavaScript puros.
- **Sem backend** — o formulário de contacto (`index.html`) valida os dados no browser e
  mostra uma mensagem de sucesso demonstrativa, mas não envia efetivamente nenhum email.
  Para ativar o envio real, será necessário ligar o formulário a um serviço de backend ou
  de envio de formulários (por exemplo, um endpoint próprio, ou serviços de terceiros
  dedicados a formulários estáticos).
- **Totalmente responsivo**, com pontos de quebra (breakpoints) para telemóvel (até
  599px), tablet (600–1023px) e desktop (a partir de 1024px).
- **Acessibilidade**: navegação por teclado, link de saltar para o conteúdo, `alt` em
  todas as imagens, `label` em todos os campos de formulário, contraste de cor cuidado e
  respeito pela preferência de "movimento reduzido" do sistema operativo
  (`prefers-reduced-motion`).
- **SEO básico**: `<title>` e meta description únicos por página, HTML semântico
  (`header`, `nav`, `main`, `section`, `article`, `footer`), hierarquia de títulos e
  `Open Graph` para partilha em redes sociais.
