import React from 'react';
import { Shield, Sparkles, ChevronDown, CheckCircle2, MessageCircle, Instagram } from 'lucide-react';
import { User } from '../types';
import { HeroKnifeBackground } from './HeroKnifeBackground';

// URL oficial do Instagram da Fronteira Cutelaria configurada em constante única
export const INSTAGRAM_URL = 'https://instagram.com/fronteiracutelaria';

interface HeroSectionProps {
  onNavigate?: (section: string) => void;
  currentUser?: User | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, currentUser }) => {
  const handleExplore = (target: string) => {
    onNavigate?.(target);
  };

  const trustHighlights = [
    { label: 'Aços Nobres Selecionados', desc: '5160, Damasco & N690' },
    { label: 'Têmpera Integral Criogênica', desc: 'Dureza 58-61 HRC' },
    { label: 'Garantia Vitalícia de Forja', desc: 'Certificado Autêntico' },
    { label: 'Envio Seguro para Todo o Brasil', desc: 'Embalagem Reforçada' },
  ];

  return (
    <section id="inicio-section" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black text-slate-100">
      {/* Composição visual artística de fundo com as 21 facas reais */}
      <HeroKnifeBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Welcome Pill & Greeting */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/50 border border-orange-500/40 shadow-sm">
            <span className="text-sm">🔪</span>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#EA580C] uppercase">
              {currentUser?.name ? `OLÁ, ${currentUser.name.toUpperCase()} • BEM-VINDO À FRONTEIRA` : 'FRONTEIRA CUTELARIA • FORJA ARTESANAL'}
            </span>
          </div>
        </div>

        {/* Brand Logo Presentation (Clean, Elegant & Premium) */}
        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mb-8 px-2 select-none">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.8)] p-2 sm:p-3 cursor-default">
            <div className="w-full h-56 sm:h-72 md:h-84 lg:h-96 rounded-2xl overflow-hidden bg-black flex items-center justify-center pointer-events-none select-none">
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="w-full h-full object-contain cursor-default"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* 3. FRASE "PRECISÃO NÃO É UM DETALHE." */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            PRECISÃO NÃO É <span className="text-[#EA580C]">UM DETALHE.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-medium mt-2 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            A <strong className="text-white font-bold">Fronteira Cutelaria</strong> transforma matéria-prima, técnica e identidade em peças criadas para durar gerações.
          </p>
        </div>

        {/* 4. SEÇÃO DOS 10 MIL APAIXONADOS POR LÂMINAS (Restaurada & Destacada) */}
        <div
          id="hero-instagram-community-banner"
          className="w-full max-w-2xl mb-10 px-2 select-none"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/95 border border-zinc-800 hover:border-[#EA580C]/70 shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
            {/* Frase Obrigatória */}
            <div className="text-center sm:text-left flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-[0_0_10px_#EA580C] shrink-0 hidden sm:inline-block" />
              <p className="text-base sm:text-lg font-extrabold text-white tracking-tight drop-shadow-md">
                Somos mais de <span className="text-[#EA580C]">10 mil apaixonados</span> por lâminas
              </p>
            </div>

            {/* Botão Chamativo: SIGA AGORA com Ícone do Instagram */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                id="hero-instagram-cta-btn"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] active:scale-95 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(234,88,12,0.45)] hover:shadow-[0_6px_25px_rgba(234,88,12,0.6)] transition-all duration-200 flex items-center justify-center gap-2.5 border border-orange-400/40 cursor-pointer"
                title="Siga a Fronteira Cutelaria no Instagram oficial"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>SIGA AGORA</span>
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            id="hero-explore-catalog-btn"
            onClick={() => handleExplore('laminas')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold font-sans text-sm tracking-wider uppercase shadow-[0_8px_30px_rgba(234,88,12,0.4)] transition-all duration-200 transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🔪 EXPLORAR O CATÁLOGO</span>
          </button>

          <a
            id="hero-whatsapp-btn"
            href="https://wa.me/5548996129568?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20atendimento%20da%20Fronteira%20Cutelaria."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-950 hover:bg-zinc-900 text-white border border-orange-500/60 hover:border-[#EA580C] font-bold font-sans text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#EA580C]" />
            <span>WHATSAPP: (48) 99612-9568</span>
          </a>

          <button
            id="hero-about-btn"
            onClick={() => handleExplore('a-fronteira-section')}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-[#EA580C] border-2 border-zinc-700 hover:border-orange-500/60 font-bold font-sans text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md"
          >
            CONHECER A FRONTEIRA
          </button>
        </div>

        {/* Key Quality Pillars in Clean Black Cards with Orange Accents */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {trustHighlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transition-all duration-200 hover:border-orange-500/50 hover:shadow-[0_4px_25px_rgba(234,88,12,0.15)]"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-950/60 border border-orange-500/30 flex items-center justify-center text-[#EA580C] mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-zinc-100 tracking-wide mb-1">
                {item.label}
              </h4>
              <p className="text-[11px] text-zinc-400 font-mono">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => handleExplore('laminas')}
          className="mt-12 text-[#EA580C] hover:text-orange-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Ver Catálogo"
        >
          <ChevronDown className="w-6 h-6 text-[#EA580C] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
