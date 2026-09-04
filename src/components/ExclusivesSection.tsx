import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Award } from 'lucide-react';

interface ExclusivesSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onWhatsAppInquiry: (product: Product) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
}

export const ExclusivesSection: React.FC<ExclusivesSectionProps> = ({
  products,
  onSelectProduct,
  onWhatsAppInquiry,
  savedProductIds,
  onToggleSave,
}) => {
  const exclusiveProducts = products.filter((p) => p.isExclusive);

  return (
    <section id="exclusivas-section" className="py-20 bg-black text-slate-100 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-3 shadow-sm">
            <span>🔪 OBRAS SINGULARES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
            PEÇAS <span className="text-[#EA580C]">ÚNICAS</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Determinadas lâminas possuem produção estritamente limitada ou características irrepetíveis — como padrões raros de aço Damasco e blocos nobres de madeiras centenárias. Cada exemplar conta com número de série gravado e certificado de exclusividade.
          </p>
        </div>

        {/* Exclusive Blades Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exclusiveProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onWhatsAppInquiry={onWhatsAppInquiry}
              isSaved={savedProductIds.includes(product.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
