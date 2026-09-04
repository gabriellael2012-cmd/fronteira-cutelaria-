import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { X, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product;
  allProducts?: Product[];
  onClose: () => void;
  onWhatsAppInquiry?: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts = [],
  onClose,
}) => {
  // Find current index in product list
  const list = allProducts.length > 0 ? allProducts : [product];
  const initialIndex = Math.max(0, list.findIndex((p) => p.id === product.id));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [direction, setDirection] = useState<number>(1); // 1 = next (slides up), -1 = prev (slides down)

  useEffect(() => {
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  }, [product, list]);

  const currentItem = list[currentIndex] || product;

  const goToNext = useCallback(() => {
    setDirection(1); // Next: outgoing goes UP (-100%), incoming comes UP from bottom (+100% -> 0)
    setCurrentIndex((prev) => (prev + 1) % list.length);
  }, [list.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1); // Prev: outgoing goes DOWN (+100%), incoming comes DOWN from top (-100% -> 0)
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  }, [list.length]);

  // Keyboard navigation for vertical and horizontal arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, onClose]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Tenho interesse na Faca Campeira no valor de R$ 149,90.'
    );
    window.open(`https://wa.me/5548996129568?text=${message}`, '_blank');
  };

  // Variants for continuous simultaneous vertical slide
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '100%' : '-100%',
      opacity: 1,
    }),
    center: {
      y: '0%',
      opacity: 1,
      transition: {
        y: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-100%' : '100%',
      opacity: 1,
      transition: {
        y: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
      },
    }),
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-950 border border-orange-500/40 rounded-3xl shadow-[0_16px_60px_rgba(234,88,12,0.25)] overflow-hidden my-auto flex flex-col text-slate-100 animate-product-slide"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between bg-black/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-orange-400 uppercase">
              FRONTEIRA CUTELARIA {list.length > 1 && `• ITEM ${currentIndex + 1} DE ${list.length}`}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
            title="Fechar"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Large Image & Clear Info */}
        <div className="p-5 sm:p-8 flex flex-col items-center space-y-6">
          {/* Continuous Vertical Slide Viewport */}
          <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl group select-none">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentItem.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentItem.images[0]}
                  alt={currentItem.name}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vertical Next / Previous Floating Controls */}
            {list.length > 1 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                <button
                  onClick={goToPrev}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-[#EA580C] text-white border border-white/20 hover:border-orange-400 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-90 cursor-pointer"
                  title="Item Anterior (Subir)"
                  aria-label="Item Anterior"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-[#EA580C] text-white border border-white/20 hover:border-orange-400 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-90 cursor-pointer"
                  title="Próximo Item (Descer)"
                  aria-label="Próximo Item"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Product Title & Price */}
          <div className="w-full text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight uppercase">
              {currentItem.name}
            </h2>

            <div className="inline-block px-5 py-2 rounded-full bg-orange-950/60 border border-orange-500/50">
              <span className="text-2xl sm:text-3xl font-black text-[#EA580C] font-mono tracking-tight">
                {currentItem.formattedPrice || 'R$ 149,90'}
              </span>
            </div>
          </div>

          {/* Prominent WhatsApp CTA Button */}
          <div className="w-full pt-2">
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.98] text-white text-base sm:text-lg font-black font-mono tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(234,88,12,0.45)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.65)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>PEDIR PELO WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
