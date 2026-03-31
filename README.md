# Catheons — restaurante (estrutura modular)

Arquivos criados para um site modularizado onde cada "Deus" (tema) tem seu próprio cardápio e bebidas.

Como usar
- Abra `restaurante/index.html` em um navegador (basta dar duplo clique) — o site usa ES modules, portanto abrir via file:// funciona na maioria dos navegadores modernos.

Modificar e estender
- Dados dos deuses: `js/data/deuses.js` — adicione/remova deuses, pratos e bebidas aqui.
- Componente de menu: `js/components/menu.js` — renderiza pratos e bebidas.
- Componente de história: `js/components/story.js` — renderiza a história e espaço para galeria.
- Lógica de montagem: `js/app.js` — popula as patinhas e faz a troca entre deuses.
- Estilos: `css/style.css` — temas e layout (usar variáveis CSS para cores principais).

Assets
- `assets/patinhas.svg` — ícone usado na navegação esquerda. Você pode substituir por `patinhas.png` com o mesmo nome caso prefira PNG.

Próximos passos sugeridos
- Adicionar imagens por deus em `assets/` e estender `deuses.js` com campos de imagens.
- Tornar o cardápio dinâmico carregando JSON externo se desejar edição sem deploy.
- Adicionar formulários de reserva reais (integração backend) ou usar um serviço externo.
