import React, { useMemo } from 'react';

// As 21 facas reais em ordem estrita (com a duplicação proposital da 21 sendo a mesma da 6)
export const HERO_KNIFE_IMAGES = [
  { id: 1, url: 'https://i.ibb.co/939PxNXk/Whats-App-Image-2026-09-01-at-21-58-51.jpg', title: 'Lâmina 01' },
  { id: 2, url: 'https://i.ibb.co/4R7QqTQZ/Whats-App-Image-2026-09-01-at-21-58-51-1.jpg', title: 'Lâmina 02' },
  { id: 3, url: 'https://i.ibb.co/zWXp0Ppq/Whats-App-Image-2026-09-01-at-21-58-52.jpg', title: 'Lâmina 03' },
  { id: 4, url: 'https://i.ibb.co/N6WjVHSj/Whats-App-Image-2026-09-01-at-21-58-52-1.jpg', title: 'Lâmina 04' },
  { id: 5, url: 'https://i.ibb.co/DDF74Grm/Whats-App-Image-2026-09-01-at-21-58-53.jpg', title: 'Lâmina 05' },
  { id: 6, url: 'https://i.ibb.co/YBbwm54B/Whats-App-Image-2026-09-01-at-21-58-53-1.jpg', title: 'Lâmina 06' },
  { id: 7, url: 'https://i.ibb.co/0yrMyCmC/Whats-App-Image-2026-09-01-at-21-58-53-3.jpg', title: 'Lâmina 07' },
  { id: 8, url: 'https://i.ibb.co/Jwpb57FZ/Whats-App-Image-2026-09-01-at-21-58-54.jpg', title: 'Lâmina 08' },
  { id: 9, url: 'https://i.ibb.co/Jjg7xrB0/Whats-App-Image-2026-09-01-at-21-58-54-1.jpg', title: 'Lâmina 09' },
  { id: 10, url: 'https://i.ibb.co/bhpxk6Z/Whats-App-Image-2026-09-01-at-21-58-54-2.jpg', title: 'Lâmina 10' },
  { id: 11, url: 'https://i.ibb.co/hJFH7Lrv/Whats-App-Image-2026-09-01-at-21-58-54-3.jpg', title: 'Lâmina 11' },
  { id: 12, url: 'https://i.ibb.co/yngvQs0y/Whats-App-Image-2026-09-01-at-21-58-55.jpg', title: 'Lâmina 12' },
  { id: 13, url: 'https://i.ibb.co/XxxSmB69/Whats-App-Image-2026-09-01-at-21-58-55-1.jpg', title: 'Lâmina 13' },
  { id: 14, url: 'https://i.ibb.co/RGWnn2BY/Whats-App-Image-2026-09-01-at-21-58-55-2.jpg', title: 'Lâmina 14' },
  { id: 15, url: 'https://i.ibb.co/ZRHVB8WW/Whats-App-Image-2026-09-01-at-21-58-55-3.jpg', title: 'Lâmina 15' },
  { id: 16, url: 'https://i.ibb.co/Ps7zysCm/Whats-App-Image-2026-09-01-at-21-58-56-1.jpg', title: 'Lâmina 16' },
  { id: 17, url: 'https://i.ibb.co/39DbDqpY/Whats-App-Image-2026-09-01-at-21-58-56.jpg', title: 'Lâmina 17' },
  { id: 18, url: 'https://i.ibb.co/GvCVrwsq/Whats-App-Image-2026-09-01-at-21-58-56-2.jpg', title: 'Lâmina 18' },
  { id: 19, url: 'https://i.ibb.co/39tcTh38/Whats-App-Image-2026-09-01-at-21-58-56-3.jpg', title: 'Lâmina 19' },
  { id: 20, url: 'https://i.ibb.co/1YYkNShT/Whats-App-Image-2026-09-01-at-21-58-56-4.jpg', title: 'Lâmina 20' },
  { id: 21, url: 'https://i.ibb.co/YBbwm54B/Whats-App-Image-2026-09-01-at-21-58-53-1.jpg', title: 'Lâmina 21' },
];

export const HeroKnifeBackground: React.FC = () => {
  // Composição minimalista e moderna: apenas 6 facas emblemáticas dispostas com amplo espaço negativo
  // Cada peça é uma obra de arte isolada que complementa o ambiente sem roubar o foco
  const leftKnives = useMemo(
    () => [
      { id: 1, url: 'https://i.ibb.co/939PxNXk/Whats-App-Image-2026-09-01-at-21-58-51.jpg', title: 'Lâmina Campeira Clássica', delay: 100 },
      { id: 6, url: 'https://i.ibb.co/YBbwm54B/Whats-App-Image-2026-09-01-at-21-58-53-1.jpg', title: 'Faca Artesanal Especial', delay: 200 },
      { id: 14, url: 'https://i.ibb.co/RGWnn2BY/Whats-App-Image-2026-09-01-at-21-58-55-2.jpg', title: 'Lâmina Nobre Forjada', delay: 300 },
    ],
    []
  );

  const rightKnives = useMemo(
    () => [
      { id: 3, url: 'https://i.ibb.co/zWXp0Ppq/Whats-App-Image-2026-09-01-at-21-58-52.jpg', title: 'Lâmina de Caça e Campo', delay: 150 },
      { id: 9, url: 'https://i.ibb.co/Jjg7xrB0/Whats-App-Image-2026-09-01-at-21-58-54-1.jpg', title: 'Faca Campeira Selecionada', delay: 250 },
      { id: 18, url: 'https://i.ibb.co/GvCVrwsq/Whats-App-Image-2026-09-01-at-21-58-56-2.jpg', title: 'Lâmina Robusta de Forja', delay: 350 },
    ],
    []
  );

  return (
    <div
      id="hero-knife-mosaic-background"
      className="knife-mosaic absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-black"
      aria-hidden="true"
    >
      {/* 1. Composição Artística Espaçada (Apenas 6 facas no total emoldurando as laterais) */}
      <div className="absolute inset-0 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 pointer-events-none">
        {/* Ala Lateral Esquerda (3 facas com espaçamento vertical muito generoso) */}
        <div className="flex flex-col justify-between items-start w-28 sm:w-36 md:w-44 lg:w-52 xl:w-56 h-full max-h-[85vh] py-6 space-y-12 sm:space-y-16 lg:space-y-24 opacity-80 sm:opacity-85">
          {leftKnives.map((knife, idx) => (
            <div
              key={`knife-left-${knife.id}`}
              className="knife-tile-enter relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.85)] transition-all duration-300"
              style={{
                animationDelay: `${knife.delay}ms`,
                transform: idx === 1 ? 'translateX(14px)' : 'translateX(0)',
              }}
            >
              {/* Imagem da Faca — Luminosidade natural, aço nítido e elegante */}
              <img
                src={knife.url}
                alt={knife.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-110 saturate-100"
                loading="eager"
              />
              {/* Sutil vinheta translúcida de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        {/* Ala Lateral Direita (3 facas com espaçamento vertical muito generoso) */}
        <div className="flex flex-col justify-between items-end w-28 sm:w-36 md:w-44 lg:w-52 xl:w-56 h-full max-h-[85vh] py-6 space-y-12 sm:space-y-16 lg:space-y-24 opacity-80 sm:opacity-85">
          {rightKnives.map((knife, idx) => (
            <div
              key={`knife-right-${knife.id}`}
              className="knife-tile-enter relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.85)] transition-all duration-300"
              style={{
                animationDelay: `${knife.delay}ms`,
                transform: idx === 1 ? 'translateX(-14px)' : 'translateX(0)',
              }}
            >
              {/* Imagem da Faca — Luminosidade natural, aço nítido e elegante */}
              <img
                src={knife.url}
                alt={knife.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-110 saturate-100"
                loading="eager"
              />
              {/* Sutil vinheta translúcida de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Iluminação de Forja Nobre e Sutil (#EA580C) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-orange-600/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-16 right-20 w-[300px] h-[300px] bg-orange-700/8 blur-[140px] pointer-events-none rounded-full" />

      {/* 3. Overlay Escuro Suave & Balanceado:
          - Centro preservado para contraste absoluto da marca e textos.
          - Laterais e topo mais abertos e suaves (40% a 58%), garantindo lâminas nítidas e visíveis sem peso excessivo.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.80)_0%,_rgba(0,0,0,0.68)_48%,_rgba(0,0,0,0.40)_82%,_rgba(0,0,0,0.58)_100%)] pointer-events-none" />

      {/* 4. Vinhetas Suaves de Transição Superior e Inferior (Atenuadas para eliminar peso escuro no topo) */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </div>
  );
};
