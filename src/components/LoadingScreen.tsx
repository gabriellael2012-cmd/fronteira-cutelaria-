import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Elegant, fast loading experience (1.3s total)
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onLoaded();
      }, 350); // allow exit animation to complete
    }, 1300);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-slate-100 select-none overflow-hidden px-4"
        >
          {/* Subtle warm orange ambient vignette harmonized with the black background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(234,88,12,0.12)_0%,_rgba(0,0,0,0.85)_60%,_rgba(0,0,0,1)_100%)]" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
            {/* Logo Container - Harmonized in black/deep zinc and matching orange border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-36 h-36 sm:w-44 sm:h-44 p-3 rounded-2xl bg-black border border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex items-center justify-center mb-6"
            >
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="w-full h-full object-contain rounded-xl"
              />
            </motion.div>

            {/* Brand Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="space-y-1.5 mb-6 text-center"
            >
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#EA580C] uppercase block">
                CUTELARIA ARTESANAL DE ALTO PADRÃO
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-wider">
                FRONTEIRA CUTELARIA
              </h2>
            </motion.div>

            {/* Harmonized Loading Bar */}
            <div className="w-44 sm:w-52 h-1 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.0,
                  ease: 'easeInOut',
                }}
                className="w-1/2 h-full bg-gradient-to-r from-orange-600 via-[#EA580C] to-orange-500 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.6)]"
              />
            </div>
            
            <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase mt-3">
              Carregando experiência...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
