export const DEUSES = [
  {
    id: 'zeus',
    name: 'Zeus Felino',
    palette: {
      primary: '#0b2545',
      accent: '#c59a3d',
      // subtle color trio (weak / mid / light) used to tint UI accents/borders
      soft: { weak: '#9B7D55', mid: '#745935', light: '#CAA775' }
    },
    // background image filename (relative to /images/deities/) and per-deity text theme
    background: {
      image: 'gato_zeus.png',
      overlay: 'linear-gradient(rgba(6,10,14,0.56), rgba(6,10,14,0.28))',
      titleColor: '#fffdf9',
      textColor: '#fbf9f6',
      titleBg: 'linear-gradient(rgba(10,14,20,0.48), rgba(10,14,20,0.18))',
      titleShadow: '0 10px 30px rgba(4,8,12,0.5)',
      textShadow: '0 2px 10px rgba(0,0,0,0.45)'
    },
    description: 'Senhor do céu e dos trovões, agora com bigodes majestosos.',
    story: [
      'Zeus Felino nasceu entre nuvens douradas, onde trovões ecoavam em ronronados. Dizem que quando ele salta, relâmpagos se transformam em brilhos de seda que aquecem a garganta dos felinos que descansam no Olimpo felpudo.',
      'Em sua juventude, Zeus Felino aprendeu a domar ventos com a leveza de uma patinha pousando sobre pétalas. Ele coleciona pequenos meteoros que parecem brinquedos e se diverte escondendo-os atrás das nuvens para que apenas os mais atentos possam encontrá-los.',
      'Seu paladar é exigente: prefere peixes grelhados com ervas que lembram o aroma das correntes de ar das montanhas. Suas festas são marcadas por canções noturnas e pratos compartilhados à luz das estrelas.'
    ],
    dishes: [
      { name: 'Tábua Olímpica', description: 'Seleção de frutos do mar e queijos divinos', price: 'R$ 78', image: 'tabua_olimpica.png' },
      { name: 'Nuvem de Bacalhau', description: 'Bacalhau desfiado com azeite aromático', price: 'R$ 62', image: 'nuvem_de_bacalhau.png' },
      { name: 'Trufa do Monte', description: 'Trufas negras sobre creme de raiz', price: 'R$ 48', image: 'trufa_do_monte.png' }
    ],
    drinks: [
      { name: 'Trovão Tônico', description: 'Tônica cítrica com toque de mel', price: 'R$ 22', image: 'trovao_tonico.png' },
      { name: 'Néctar de Zeus', description: 'Coquetel dourado com especiarias', price: 'R$ 28', image: 'nectar_de_zeus.png' },
      { name: 'Brisa Celeste', description: 'Mocktail refrescante', price: 'R$ 18', image: 'brisa_celeste.png' }
    ]
  },
  {
    id: 'athena',
    name: 'Athena Mia',
    palette: {
      primary: '#12324b',
      accent: '#9aa7b0',
      soft: { weak: '#493116', mid: '#745027', light: '#9F7440' }
    },
    background: {
      image: 'gato_athena.png',
      overlay: 'linear-gradient(rgba(8,12,18,0.52), rgba(8,12,18,0.22))',
      titleColor: '#fffdf6',
      textColor: '#faf8f5',
      titleBg: 'linear-gradient(rgba(12,16,22,0.46), rgba(12,16,22,0.18))',
      titleShadow: '0 10px 30px rgba(6,10,14,0.45)',
      textShadow: '0 2px 10px rgba(0,0,0,0.42)'
    },
    description: 'Deusa da sabedoria com olhar perspicaz e patinhas de estrategista.',
    story: [
      'Athena Mia observa com calma as mesas do restaurante, como se desenhasse jogadas em um tabuleiro invisível. Ela ensina os filhotes a equilibrar pratos e taças, como uma mestre em equilibrios sutis.',
      'Seus conselhos são procurados por gatos jovens que desejam aprender a conduzir uma noite perfeita: quando falar, quando aceitar um carinho e quando simplesmente ronronar em silêncio. Suas receitas trazem ervas e raízes que despertam a mente e aquecem o coração.',
      'Há quem diga que Athena Mia borda mapas das estrelas nas toalhas, para que os notívagos encontrem sempre o caminho de volta até a lareira.'
    ],
    dishes: [
      { name: 'Ensopado da Estrategista', description: 'Ensopado de legumes com toque de ervas', price: 'R$ 42', image: 'ensopado_da_estrategista.png' },
      { name: 'Croquetes de Oliva', description: 'Croquetes recheados com pasta de azeitona', price: 'R$ 36', image: 'croquetes_de_oliva.png' }
    ],
    drinks: [
      { name: 'Elixir da Lira', description: 'Cidra suave com mel', price: 'R$ 16', image: 'elixir_da_lira.png' },
      { name: 'Chá de Biblioteca', description: 'Infusão relaxante', price: 'R$ 12', image: 'cha_de_biblioteca.png' }
    ]
  },
  {
    id: 'hades',
    name: 'Hades Miado',
    palette: {
      primary: '#151515',
      accent: '#7f5a2a',
      soft: { weak: '#0A0C0E', mid: '#1B2228', light: '#367294' }
    },
    background: {
      image: 'gato_hades.png',
      overlay: 'linear-gradient(rgba(12,6,24,0.36), rgba(12,6,24,0.24))',
      titleColor: '#fbf9f8',
      textColor: '#f7f5f4',
      titleBg: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.06))',
      titleShadow: '0 8px 26px rgba(0,0,0,0.6)',
      textShadow: '0 1px 6px rgba(0,0,0,0.4)'
    },
    description: 'Guardião das sombras, apaixonado por sabores intensos.',
    story: [
      'Hades Miado reina sobre recantos silenciosos e gosta de convidar poucos para suas degustações. Seus pratos são densos, preparados com paciência e fumaça que anuncia lembranças antigas.',
      'Os antenados sabem que sua cozinha guarda segredos: raízes curadas em barris, especiarias que mudam de nota conforme a lua e sopas que aquecem mais do que o corpo — aquecem memórias.',
      'Ele caminha entre mesas com passos suaves, ofertando pratos que lembram noites longas e conversas profundas. Sua presença é um convite à contemplação.'
    ],
    dishes: [
      { name: 'Carne do Submundo', description: 'Cortes marcantes com redução de vinho', price: 'R$ 88', image: 'carne_do_submundo.png' },
      { name: 'Purê Obscuro', description: 'Purê de raízes defumadas', price: 'R$ 34', image: 'pure_obscuro.png' }
    ],
    drinks: [
      { name: 'Sussurro Noturno', description: 'Coquetel escuro com especiarias', price: 'R$ 30', image: 'sussurro_noturno.png' },
      { name: 'Vinho das Profundezas', description: 'Taça de tinto encorpado', price: 'R$ 26', image: 'vinho_das_profundezas.png' }
    ]
  }
];
