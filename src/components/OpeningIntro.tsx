import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, CheckCircle2, ArrowRight } from 'lucide-react';
import { storage } from '../utils/storage';

interface OpeningIntroProps {
  onComplete: () => void;
}

export const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'instagram'>('intro');
  const [hasClickedInstagram, setHasClickedInstagram] = useState(false);
  const siteConfig = storage.getSiteConfig();

  useEffect(() => {
    // Elegant quick 2.4s intro in White + Orange before transitioning to mandatory Instagram gate
    const timer = setTimeout(() => {
      setStep('instagram');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenInstagram = () => {
    setHasClickedInstagram(true);
    window.open(siteConfig.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFinish = () => {
    localStorage.setItem('fronteira_intro_seen', 'true');
    localStorage.setItem('fronteira_instagram_confirmed', 'true');
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black text-slate-100 px-4"
      >
        {/* Subtle orange accent ambient glow on black background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/40 via-black to-black" />

        {step === 'intro' ? (
          <motion.div
            key="intro-step"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center max-w-lg w-full flex flex-col items-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 mb-6 p-2 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#EA580C] mb-2">
              🔪 CUTELARIA ARTESANAL DE ALTO PADRÃO
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white font-display mb-3">
              FRONTEIRA CUTELARIA
            </h1>

            <div className="h-0.5 w-16 bg-[#EA580C] mx-auto my-3 rounded-full" />

            <p className="text-base sm:text-lg text-zinc-300 font-medium tracking-wide max-w-md">
              "PRECISÃO FORJADA EM CADA DETALHE."
            </p>

            <button
              onClick={() => setStep('instagram')}
              className="mt-8 text-xs font-semibold uppercase tracking-widest text-orange-400 hover:text-[#EA580C] flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-4 border border-orange-500/40 rounded-full hover:bg-orange-950/40 bg-zinc-900/60"
            >
              <span>Avançar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="instagram-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-zinc-950 border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-5 p-1 rounded-2xl bg-black border border-zinc-800 shadow-sm flex items-center justify-center">
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#EA580C] font-display tracking-tight mb-3">
              SIGA A FRONTEIRA CUTELARIA
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed mb-8">
              Antes de entrar, siga a <strong className="text-white">Fronteira Cutelaria</strong> no Instagram e acompanhe nossas novidades, peças e coleções exclusivas.
            </p>

            <div className="w-full space-y-3">
              {/* Mandatory Instagram Button */}
              <button
                id="intro-instagram-follow-btn"
                onClick={handleOpenInstagram}
                className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(234,88,12,0.4)] transform hover:scale-[1.02] cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
                <span>📸 SEGUIR A FRONTEIRA NO INSTAGRAM</span>
              </button>

              {/* Confirm Follow and Enter Site */}
              <button
                id="intro-confirm-follow-btn"
                onClick={handleFinish}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                  hasClickedInstagram
                    ? 'bg-zinc-900 text-orange-400 border-[#EA580C] hover:bg-orange-950/40 shadow-md'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                <span>✓ JÁ SEGUI</span>
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 font-mono mt-6">
              🔪 FRONTEIRA CUTELARIA • EXPERIÊNCIA EXCLUSIVA
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
