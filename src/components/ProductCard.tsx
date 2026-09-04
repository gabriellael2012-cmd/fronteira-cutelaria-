import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onWhatsAppInquiry?: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-zinc-950 rounded-2xl border border-zinc-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_36px_rgba(234,88,12,0.22)] hover:border-orange-500/80 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Knife Image */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Clean Details: Name & Price Only */}
      <div className="p-5 flex flex-col items-center text-center space-y-2.5">
        <h3 className="text-lg font-black tracking-wide text-white group-hover:text-orange-400 transition-colors uppercase">
          {product.name}
        </h3>

        <div className="inline-block px-4 py-1.5 rounded-full bg-orange-950/40 border border-orange-500/30 group-hover:border-orange-500/60 transition-colors">
          <span className="text-base font-extrabold text-[#EA580C] font-mono tracking-tight">
            {product.formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
