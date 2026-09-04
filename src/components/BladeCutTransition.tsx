import React from 'react';

/**
 * BladeCutTransition
 * 
 * Efeito Cinematográfico Global de Corte de Lâmina — Fronteira Cutelaria
 * 
 * Visual:
 * - Linha diagonal incisiva de corte rápido (0ms a 180ms)
 * - Núcleo branco temperado no centro, brilho metálico de aço polido
 * - Borda e rastro sutil em laranja da marca (#EA580C)
 * - Fio cirúrgico, sem lasers ou neon artificial — sensação genuína de metal e lâmina
 * - Separação visual das bordas cortadas (120ms a 280ms)
 * - Camada overlay temporária de alto z-index, 100% pointer-events-none
 */
interface BladeCutTransitionProps {
  isSeparating?: boolean;
}

export const BladeCutTransition: React.FC<BladeCutTransitionProps> = ({ isSeparating = false }) => {
  return (
    <div
      id="global-blade-cut-overlay"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Traçado da Incisão Cirúrgica em SVG (vetor com precisão sub-pixel em qualquer resolução) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Fio da incisão: Aço branco no núcleo com sutis reflexos em laranja Fronteira */}
          <linearGradient id="bladeSeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0" />
            <stop offset="25%" stopColor="#EA580C" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#EA580C" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </linearGradient>

          {/* Difração suave de luz do corte */}
          <filter id="bladeGlowSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Linha de incisão diagonal cruzando a tela de (0, 350) a (1000, 650) */}
        <line
          x1="0"
          y1="350"
          x2="1000"
          y2="650"
          stroke="url(#bladeSeamGradient)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          className="animate-cinematic-seam"
          filter="url(#bladeGlowSoft)"
        />
      </svg>

      {/* 2. Feixe Rápido da Lâmina Cortando a Tela (0ms a 180ms) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[150vw] h-[5px] rotate-[16.7deg] transform-gpu flex items-center justify-center">
          {/* Lâmina veloz em movimento diagonal */}
          <div className="absolute top-0 left-0 h-full w-[45vw] sm:w-[35vw] animate-cinematic-blade-sweep">
            {/* Corpo do feixe: rastro metálico cortante com núcleo branco puro e halo âmbar */}
            <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-600/35 via-70% via-zinc-200/90 to-white rounded-full shadow-[0_0_12px_#FFFFFF,0_0_20px_#EA580C]" />

            {/* Fagulha e ponto incisivo de corte no fio de aço */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_2px_#FFFFFF,0_0_18px_4px_#EA580C] animate-cinematic-spark flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#EA580C] rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Efeito de Realce nas Bordas da Separação (120ms a 280ms) */}
      {isSeparating && (
        <div className="absolute inset-0">
          {/* Borda superior cortada com brilho de aço */}
          <div
            className="absolute inset-0 animate-cinematic-split-top"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 35%)',
            }}
          >
            <div
              className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent shadow-[0_0_8px_#FFFFFF]"
              style={{
                top: '35%',
                transform: 'translateY(-1px) rotate(16.7deg)',
                transformOrigin: '0% 0%',
                width: '130vw',
              }}
            />
          </div>

          {/* Borda inferior cortada com brilho quente */}
          <div
            className="absolute inset-0 animate-cinematic-split-bottom"
            style={{
              clipPath: 'polygon(0 35%, 100% 65%, 100% 100%, 0 100%)',
            }}
          >
            <div
              className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/80 via-50% to-transparent shadow-[0_0_8px_#EA580C]"
              style={{
                top: '35%',
                transform: 'translateY(1px) rotate(16.7deg)',
                transformOrigin: '0% 0%',
                width: '130vw',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
