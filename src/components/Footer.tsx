import React from 'react';
import { storage } from '../utils/storage';
import { User } from '../types';
import {
  MessageCircle,
  Instagram,
  Mail,
  Shield,
  Camera,
  Check,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  currentUser?: User | null;
  onFollowClick?: () => void;
  onNavigate?: (section: string) => void;
  onOpenAdmin?: () => void;
  followerCount?: number;
}

export const Footer: React.FC<FooterProps> = ({
  currentUser,
  onFollowClick,
  onNavigate,
  onOpenAdmin,
  followerCount = 0,
}) => {
  const siteConfig = storage.getSiteConfig();

  const handleNav = (sectionId: string) => {
    onNavigate?.(sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFollowing = currentUser?.isFollower ?? false;

  return (
    <footer className="bg-black text-slate-100 border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand & Follower Column */}
          <div className="lg:col-span-5 space-y-5">
            <button
              onClick={() => handleNav('inicio')}
              className="flex items-center text-left group cursor-pointer focus:outline-none"
              title="Fronteira Cutelaria — Início"
            >
              <img
                src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
                }}
                alt="Fronteira Cutelaria"
                className="h-12 sm:h-14 w-auto max-w-[200px] object-contain transition-transform duration-200 ease-out group-hover:scale-[1.02]"
              />
            </button>

            <p className="text-xs text-zinc-400 font-normal leading-relaxed max-w-sm">
              Cutelaria artesanal sob encomenda e pronta entrega. Facas com alma forjadas a fogo com aços nobres de alta performance e madeiras centenárias.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#EA580C]">
              🔪 Navegação Direta
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-zinc-400">
              <li>
                <button
                  onClick={() => handleNav('inicio')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalogo')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Catálogo de Lâminas (21 Peças)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('localizacao')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Localização & Mapa
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('a-fronteira')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  A Fronteira
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contato')}
                  className="hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Contato Oficial
                </button>
              </li>
            </ul>
          </div>

          {/* Official Channels Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#EA580C]">
              🔪 Canais Oficiais
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da Fronteira Cutelaria.')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#EA580C] flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#EA580C]" />
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-[#EA580C]">
                    WhatsApp Oficial
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {siteConfig.whatsappFormatted}
                </span>
              </a>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#EA580C] flex items-center justify-between transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#EA580C]" />
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-[#EA580C]">
                    Instagram Oficial
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {siteConfig.instagramHandle}
                </span>
              </a>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Área Administrativa</span>
                </button>

                <button
                  onClick={scrollToTop}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[#EA580C] hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Voltar ao Topo"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slogan Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} FRONTEIRA CUTELARIA. Todos os direitos reservados.</p>
          <p className="text-[#EA580C] font-bold tracking-wider text-center text-xs">
            FRONTEIRA CUTELARIA — PRECISÃO FORJADA EM CADA DETALHE.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Certificado de Autenticidade Incluso</span>
            <span>•</span>
            <span>Envio Seguro Nacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
