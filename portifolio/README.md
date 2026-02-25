# Portfólio de Desenvolvedor

Site estático que serve como portfólio para um desenvolvedor fullstack em busca de vaga. O design foi atualizado com estilo moderno e dark‑first, usando painéis transparentes, animações, cores contrastantes (tons escuros, cinzas, azul claro, branco e laranja) e layout responsivo.

## Estrutura

- `index.html` – Página única com seções mostradas/ocultadas via JavaScript.
- `styles.css` – Folha de estilo com tema dark padrão, variáveis CSS, nav responsiva, glassmorphism, animações e classes de efeitos de fundo.
- `script.js` – Lida com menu móvel, alternância entre seções sem recarregar, troca de tema (dark/light) e alternância de efeitos de fundo.
- `images/` – Contém capturas de tela (placeholder) dos projetos. Substitua pelos seus screenshots.

## Como visualizar

Abra `index.html` em qualquer navegador. Use o menu ou clique nos cartões de projeto para navegar entre as seções com transições suaves. Clique no botão 🎭 no cabeçalho para alternar entre efeitos de fundo:

1. transição senoidal entre tons escuros (preto, azul, cinza) gerada via JavaScript;
2. gradiente animado original.

Novos efeitos podem ser adicionados em `styles.css` (classes `body.effectN`) e em `script.js` (array `effects` e lógica correspondente).

## Adicionar screenshots

Coloque imagens reais em `images/` com os nomes:

- `tarefas.png` e `tarefas-detail.png`
- `blog.png` e `blog-detail.png`
- `api.png` e `api-detail.png`

As imagens serão exibidas nos cartões e na página de detalhes de cada projeto.
