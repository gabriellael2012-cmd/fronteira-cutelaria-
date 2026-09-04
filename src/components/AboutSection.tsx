import React from 'react';
import { Shield, Sparkles, CheckCircle2, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Identidade & Tradição',
      desc: 'Nascida no coração da cutelaria sul-americana, unindo a ancestralidade da forja ao rigor metalúrgico moderno.',
    },
    {
      title: 'Processo & Precisão',
      desc: 'Cada lâmina é desbastada, temperada e afiada manualmente em ângulos microscópicos para retenção de fio extrema.',
    },
    {
      title: 'Matéria-Prima Nobre',
      desc: 'Trabalhamos exclusivamente com ligas virgens certificadas, aços Damasco de alto padrão e madeiras de lei centenárias.',
    },
    {
      title: 'Qualidade Inegociável',
      desc: 'Inspeção individual de dureza Rockwell e balanceamento anatômico em 100% das peças entregues.',
    },
  ];

  return (
    <section id="a-fronteira-section" className="py-20 bg-black text-slate-100 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Brand Logo & Presentation Card */}
          <div className="lg:col-span-5 flex flex-col items-center text-center p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-[0_8px_35px_rgba(0,0,0,0.8)]">
            <div className="w-28 h-28 p-2 rounded-2xl bg-black border border-zinc-800 mb-6 flex items-center justify-center shadow-md">
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#EA580C] uppercase mb-2">
              🔪 ALMA FORJADA A FOGO
            </span>

            <h3 className="text-2xl font-black font-display text-white mb-4">
              FRONTEIRA CUTELARIA
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              "Não forjamos apenas ferramentas de corte. Criamos extensões da personalidade de quem reconhece o valor do trabalho feito com paciência, paixão e maestria."
            </p>
          </div>

          {/* Institutional Text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-3 shadow-sm">
                <span>🔪 A MARCA & MANIFESTO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
                A <span className="text-[#EA580C]">FRONTEIRA</span>
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                A <strong className="text-white">Fronteira Cutelaria</strong> foi concebida para atender aos entusiastas e profissionais mais exigentes. Da escolha do bloco de aço bruto até a gravação final do número de série, todo o ciclo de fabricação respeita as regras mais nobres da forjaria artesanal de alto desempenho.
              </p>
            </div>

            {/* 4 Pillars Grid in Black + Orange */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-sm flex flex-col justify-between space-y-2 hover:border-[#EA580C] transition-colors"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-[#EA580C]">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
