import React from 'react';
import { Collection } from '../types';
import { ArrowRight, Layers } from 'lucide-react';

interface CollectionsSectionProps {
  collections: Collection[];
  onExploreCollection: (categoryName: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  collections,
  onExploreCollection,
}) => {
  return (
    <section id="colecoes-section" className="py-20 bg-black text-slate-100 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-3">
              <span>🔪 COLEÇÕES OFICIAIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              COLEÇÕES <span className="text-[#EA580C]">FRONTEIRA</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Séries temáticas concebidas com propósitos específicos — da culinária de alta gastronomia às expedições mais severas de campo.
          </p>
        </div>

        {/* Collections Grid in Black + Orange */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onExploreCollection(col.name.split(' ')[0] || 'Todos')}
              className="group relative bg-zinc-950 rounded-3xl border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_35px_rgba(234,88,12,0.2)] hover:border-orange-500/70 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="aspect-[16/10] bg-black overflow-hidden relative">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-black/80 text-[#EA580C] border border-orange-500/40 shadow-sm backdrop-blur-sm">
                  {col.badge}
                </span>

                <span className="absolute bottom-4 left-4 text-xs font-mono font-bold text-white drop-shadow-md">
                  🔪 {col.piecesCount} Lâminas na Série
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-2">
                    {col.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">
                    Aço: <strong className="text-[#EA580C]">{col.highlightSteel}</strong>
                  </span>

                  <button className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-[#EA580C] group-hover:translate-x-1 transition-transform">
                    <span>Explorar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
