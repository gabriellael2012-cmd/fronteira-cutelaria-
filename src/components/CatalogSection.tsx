import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Search, X, Shield, RefreshCw } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onWhatsAppInquiry?: (product: Product) => void;
  savedProductIds?: string[];
  onToggleSave?: (productId: string) => void;
  initialFilter?: string;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Exact 21 catalog products base
  const baseProducts = useMemo(() => products.slice(0, 21), [products]);

  // Real-time case-insensitive search filter
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return baseProducts;

    return baseProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description?.toLowerCase().includes(query) ?? false;
      const serialMatch = product.serialNumber?.toLowerCase().includes(query) ?? false;
      const catMatch = product.category?.toLowerCase().includes(query) ?? false;
      const steelMatch = product.specs?.steel?.toLowerCase().includes(query) ?? false;
      return nameMatch || descMatch || serialMatch || catMatch || steelMatch;
    });
  }, [baseProducts, searchQuery]);

  // Focus search input when clicking the lupa icon button
  const handleLupaClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <section
      id="laminas"
      className="relative py-20 sm:py-24 bg-black text-slate-100 border-t border-zinc-900 overflow-hidden flex-grow flex flex-col justify-start"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-600/5 blur-[120px] pointer-events-none" />

      {/* Catalog Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4 shadow-sm">
            <span>🔪 CATÁLOGO OFICIAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight mb-4 uppercase">
            CATÁLOGO <span className="text-[#EA580C]">FRONTEIRA</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Acervo exclusivo de facas campeiras artesanais forjadas na fronteira. Peças únicas numeradas para churrasco, lida e colecionadores.
          </p>
        </div>

        {/* Real-time Search Bar with Active Magnifying Glass (Lupa) */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative flex items-center">
            {/* Clickable Magnifying Glass (Lupa) */}
            <button
              type="button"
              id="catalog-search-lupa-btn"
              onClick={handleLupaClick}
              className="absolute left-4 z-10 text-zinc-400 hover:text-[#EA580C] transition-colors p-1 cursor-pointer"
              title="Clique para pesquisar"
              aria-label="Ativar pesquisa"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Live Search Input */}
            <input
              ref={searchInputRef}
              id="catalog-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por faca campeira, modelo ou detalhe..."
              className="w-full pl-12 pr-12 py-3.5 bg-zinc-950/90 border border-zinc-800 rounded-2xl text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all"
            />

            {/* Clear button (X) when query is active */}
            {searchQuery && (
              <button
                type="button"
                id="catalog-search-clear-btn"
                onClick={handleClearSearch}
                className="absolute right-4 text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
                title="Limpar pesquisa"
                aria-label="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Real-time count status */}
          <div className="flex items-center justify-between mt-2.5 px-2 text-xs text-zinc-500 font-mono">
            <span>
              {searchQuery ? (
                <>
                  Buscando por: <strong className="text-zinc-300">"{searchQuery}"</strong>
                </>
              ) : (
                'Exibindo acervo completo'
              )}
            </span>
            <span className="text-[#EA580C] font-semibold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'lâmina' : 'lâminas'}
            </span>
          </div>
        </div>

        {/* 21 Products Grid or Empty Search State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div
            id="catalog-empty-search-state"
            className="text-center py-16 px-6 max-w-md mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-950/40 border border-orange-500/30 flex items-center justify-center text-[#EA580C]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-2">
              Nenhuma lâmina encontrada
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Não encontramos nenhum resultado para <span className="text-orange-400 font-semibold">"{searchQuery}"</span>. Tente outro termo ou limpe o filtro.
            </p>
            <button
              type="button"
              onClick={handleClearSearch}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ver todas as 21 lâminas</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
