# Catheons - Projeto SENAC (Desafio com IA)

Este projeto foi desenvolvido para uma atividade do SENAC com um desafio objetivo: criar um site completo em 48 horas usando inteligencia artificial como apoio no processo de criacao.

O tema escolhido foi um restaurante mitologico felino, com foco em experiencia visual, interacoes interessantes, paleta de cores harmoniosa e um estilo elegante que guie o usuario de forma natural ate a vontade de fazer uma reserva.

## Objetivo do Projeto

Criar uma experiencia de marca memoravel para um restaurante tematico ficticio, unindo:

- identidade visual forte
- storytelling para cada "deus"
- cardapios dinamicos por tema
- microinteracoes que valorizam a navegacao

## Funcionalidades Implementadas

- Troca dinamica de tema por divindade (cores, menu e historia)
- Efeitos visuais de transicao por personagem
- Background da historia configurado por dados
- Preview de imagem no hover de pratos e bebidas
- Popup e modal de localizacao com acessibilidade basica (tecla Esc e foco)
- Navegacao por teclado (setas esquerda/direita)

## Estrutura do Projeto

```text
.
|- index.html
|- css/
|  \- style.css
|- images/
|  |- deities/
|  |- dishes/
|  \- main_logo.png
\- js/
	|- app.js
	|- components/
	|  |- menu.js
	|  \- story.js
	|- data/
	|  \- deuses.js
	\- lib/
		|- dishPreview.js
		|- effects.js
		\- map.js
```

## Como Executar

1. Abra o arquivo `index.html` no navegador.
2. Se o navegador bloquear modulos ES no modo `file://`, rode com um servidor local simples.

Exemplo com VS Code:

1. Instale a extensao Live Server.
2. Clique com o botao direito em `index.html`.
3. Selecione "Open with Live Server".

## Como Personalizar Rapido

- Deuses, pratos e bebidas: `js/data/deuses.js`
- Render do menu: `js/components/menu.js`
- Render das historias: `js/components/story.js`
- Orquestracao da aplicacao: `js/app.js`
- Efeitos e paleta: `js/lib/effects.js`
- Hover de imagens dos pratos: `js/lib/dishPreview.js`
- Localizacao (popup/modal): `js/lib/map.js`
- Estilos globais: `css/style.css`

## Boas Praticas Adotadas

- Separacao por responsabilidade (dados, componentes e bibliotecas)
- Reaproveitamento de logica em modulos dedicados
- CSS com variaveis para facilitar evolucao de tema
- Estrutura preparada para adicionar novos "deuses" sem reescrever a aplicacao

## Proximos Passos

- Integrar botao de reserva com formulario real
- Adicionar analytics para medir interesse em pratos e cliques de reserva
- Expandir acessibilidade (ARIA mais detalhado e navegacao por teclado em todos os pontos)

---

Projeto academico desenvolvido no SENAC.
