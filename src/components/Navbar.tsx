import React, { useState, useEffect } from 'react';
import { User } from '../types';
import {
  Search,
  User as UserIcon,
  Shield,
  Menu,
  X,
  LogOut,
  Camera,
  Check,
  MessageCircle
} from 'lucide-react';

interface NavbarProps {
  currentSection?: string;
  onNavigate?: (section: string) => void;
  onOpenSearch?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
  onOpenAdmin?: () => void;
  currentUser?: User | null;
  onFollowToggle?: () => void;
  onFollowClick?: () => void;
  followerCount?: number;
  isTransitioning?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection = 'inicio',
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  currentUser = null,
  onFollowToggle,
  onFollowClick,
  followerCount,
  isTransitioning = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'INÍCIO' },
    { id: 'laminas', label: 'LÂMINAS' },
    { id: 'localizacao', label: 'LOCALIZAÇÃO' },
    { id: 'faq', label: 'PERGUNTAS FREQUENTES' },
    { id: 'a-fronteira', label: 'A FRONTEIRA' },
    { id: 'contato', label: 'CONTATO' },
  ];

  // Direct navigation with double-click guard during transition
  const handleNavClick = (sectionId: string) => {
    if (isTransitioning) return;
    setMobileMenuOpen(false);
    onNavigate?.(sectionId);
  };

  const handleFollowAction = () => {
    if (!currentUser) {
      onOpenAuth?.();
      return;
    }
    
    if (onFollowToggle) {
      onFollowToggle();
    } else if (onFollowClick) {
      onFollowClick();
    }
  };

  const isFollowing = currentUser?.isFollower ?? false;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-xl border-b border-orange-500/20 py-3'
          : 'bg-black border-b border-zinc-800/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo in exact location (strictly visual and non-interactive, clean and elegant) */}
        <div
          id="navbar-brand-logo"
          className="flex items-center text-left cursor-default select-none"
        >
          <img
            src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
            }}
            alt="Fronteira Cutelaria"
            className="h-10 sm:h-12 w-auto max-w-[190px] object-contain cursor-default select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id || currentSection === `${item.id}-section`;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider font-sans uppercase transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#EA580C] bg-orange-950/40 border border-orange-500/30'
                    : 'text-zinc-300 hover:text-[#EA580C] hover:bg-zinc-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Right Side) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Header Link */}
          <a
            id="nav-whatsapp-header-btn"
            href="https://wa.me/5548996129568?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20atendimento%20da%20Fronteira%20Cutelaria."
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-zinc-300 hover:text-[#EA580C] hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer"
            title="WhatsApp Oficial: (48) 99612-9568"
            aria-label="WhatsApp Oficial"
          >
            <MessageCircle className="w-4 h-4 text-[#EA580C]" />
          </a>

          {/* Global Search Button */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-zinc-300 hover:text-[#EA580C] hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer"
            title="Pesquisar Lâminas"
            aria-label="Pesquisar"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mandatory Follower Button ("SEGUIR A FRONTEIRA") */}
          <button
            id="nav-follow-fronteira-btn"
            onClick={handleFollowAction}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider font-sans uppercase transition-all duration-200 cursor-pointer shadow-sm ${
              isFollowing
                ? 'bg-orange-950/50 text-[#EA580C] border border-[#EA580C] hover:bg-orange-900/40'
                : 'bg-[#EA580C] text-white hover:bg-[#C2410C] border border-transparent shadow-[0_2px_15px_rgba(234,88,12,0.35)]'
            }`}
            title="Seguir a Fronteira Cutelaria"
          >
            {isFollowing ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>✓ SEGUINDO</span>
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5" />
                <span>📸 SEGUIR A FRONTEIRA</span>
              </>
            )}
          </button>

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              id="nav-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-orange-400 transition-all cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline font-sans">
                Olá, {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="nav-login-btn"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#EA580C] bg-zinc-900 hover:bg-zinc-800 border border-orange-500/30 transition-all cursor-pointer uppercase tracking-wider"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}

          {/* Admin Fast Access (if admin user) */}
          {currentUser?.role === 'admin' && (
            <button
              id="nav-admin-fast-btn"
              onClick={onOpenAdmin}
              className="p-2 rounded-xl bg-[#EA580C] text-white hover:bg-[#C2410C] transition-colors cursor-pointer"
              title="Painel Administrativo"
            >
              <Shield className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-[#EA580C] hover:bg-zinc-900 border border-zinc-800 transition-all"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu in Luxury Black + Orange */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-orange-950/60 text-[#EA580C] border border-orange-500/30'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-[#EA580C]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            {/* Mobile WhatsApp Button */}
            <a
              id="mobile-whatsapp-btn"
              href="https://wa.me/5548996129568?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20atendimento%20da%20Fronteira%20Cutelaria."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-orange-500/40 bg-orange-950/30 hover:bg-orange-900/40 text-orange-400 text-xs font-bold font-mono tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#EA580C]" />
              <span>WhatsApp: (48) 99612-9568</span>
            </a>

            {/* Mobile Follow Button */}
            <button
              id="mobile-follow-btn"
              onClick={handleFollowAction}
              className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 ${
                isFollowing
                  ? 'bg-orange-950/60 text-[#EA580C] border border-[#EA580C]'
                  : 'bg-[#EA580C] text-white shadow-lg hover:bg-[#C2410C]'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4 text-[#EA580C]" />
                  <span>✓ JÁ SEGUI (SEGUINDO)</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>📸 SEGUIR A FRONTEIRA</span>
                </>
              )}
            </button>

            {/* Mobile Login / User Profile */}
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile?.();
                }}
                className="w-full py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-orange-400 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>Olá, {currentUser.name} (Meu Perfil)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.();
                }}
                className="w-full py-2.5 rounded-xl border border-zinc-700 text-[#EA580C] bg-zinc-900 hover:bg-zinc-800 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
