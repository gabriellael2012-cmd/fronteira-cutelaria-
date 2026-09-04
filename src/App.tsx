import React, { useState, useEffect } from 'react';
import { storage } from './utils/storage';
import { Product, User, Collection, SiteConfig } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { MandatoryLoginGate } from './components/MandatoryLoginGate';
import { UserProfile } from './components/UserProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { BladeCutTransition } from './components/BladeCutTransition';
import { MessageCircle } from 'lucide-react';

export function App() {
  // Master State
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(storage.getSiteConfig());

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mandatory Login Identification Gate State
  const [isVisitorIdentified, setIsVisitorIdentified] = useState<boolean>(() => {
    return storage.hasIdentifiedVisitor();
  });

  // Modal & Navigation Controls
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<string>('Todos');
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Global Blade Cut Navigation Transition States
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isCutting, setIsCutting] = useState<boolean>(false);
  const [isSeparating, setIsSeparating] = useState<boolean>(false);
  const [tabTransitionKey, setTabTransitionKey] = useState<number>(0);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);

  const isTransitioningRef = React.useRef<boolean>(false);
  const cutTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const separateTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const swapTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const cutEndTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const endTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Load Seed & LocalStorage data on mount
  const refreshAppData = () => {
    const p = storage.getProducts();
    const c = storage.getCollections();
    const u = storage.getCurrentUser();
    const s = storage.getSavedProducts();
    const f = storage.getFollowers();
    const cfg = storage.getSiteConfig();

    setProducts(p);
    setCollections(c);
    setCurrentUser(u);
    setSavedProductIds(s);
    setFollowerCount(f.length);
    setSiteConfig(cfg);
    setIsVisitorIdentified(storage.hasIdentifiedVisitor());
  };

  useEffect(() => {
    refreshAppData();

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      if (cutTimeoutRef.current) clearTimeout(cutTimeoutRef.current);
      if (separateTimeoutRef.current) clearTimeout(separateTimeoutRef.current);
      if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
      if (cutEndTimeoutRef.current) clearTimeout(cutEndTimeoutRef.current);
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, []);

  // Handle identification from Mandatory Login Gate
  const handleVisitorIdentified = (identifiedUser: User) => {
    setCurrentUser(identifiedUser);
    setIsVisitorIdentified(true);
    setFollowerCount(storage.getFollowers().length);
  };

  // Handle follow / unfollow toggle
  const handleFollowToggle = () => {
    if (currentUser) {
      storage.toggleFollow(currentUser);
      setCurrentUser(storage.getCurrentUser());
      setFollowerCount(storage.getFollowers().length);
    }
  };

  // Toggle Save / Favorite
  const handleToggleSave = (productId: string) => {
    const updated = storage.toggleSaveProduct(productId);
    setSavedProductIds(updated);
  };

  // WhatsApp Inquiry for a specific product
  const handleWhatsAppInquiry = (product: Product) => {
    const message = `Olá! Gostaria de informações sobre a peça *${product.name}* (Ref: ${product.serialNumber || product.id}) no valor de ${product.formattedPrice}. Está disponível para envio imediato?`;
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /**
   * TRANSIÇÃO CINEMATOGRÁFICA GLOBAL — CORTE DE LÂMINA + SEPARAÇÃO + FADE-IN
   * 
   * Timing Cinematográfico Exato:
   * 0ms:     Usuário clica na aba. Bloqueia cliques duplicados. Inicia o corte incisivo.
   * 0–180ms: A linha de corte de aço polido e rastro laranja atravessa a tela na diagonal.
   * 120–280ms: Pequena separação física do conteúdo da tela ao longo do corte (80-150ms).
   * 250ms:   Troca para a nova aba, desativa a separação e reseta a posição ao topo.
   * 250–650ms: Nova aba aparece com fade-in cinematográfico suave via cubic-bezier(0.22, 1, 0.36, 1).
   * 280ms:   Remove completamente o overlay do corte de lâmina.
   * 650ms:   Transição totalmente finalizada; novos cliques liberados.
   */
  const navegarPara = (elementId: string) => {
    // 1. Bloqueia cliques duplicados durante a transição
    if (isTransitioningRef.current) {
      return;
    }

    let target = elementId;
    if (
      target === 'acervo' ||
      target === 'acervo-section' ||
      target === 'laminas' ||
      target === 'laminas-section' ||
      target === 'catalogo' ||
      target === 'catalogo-section'
    ) {
      target = 'laminas';
    } else if (
      target === 'a-fronteira' ||
      target === 'a-fronteira-section' ||
      target === 'sobre' ||
      target === 'sobre-section'
    ) {
      target = 'a-fronteira';
    } else if (
      target === 'contato' ||
      target === 'contato-section'
    ) {
      target = 'contato';
    } else if (
      target === 'faq' ||
      target === 'faq-section'
    ) {
      target = 'faq';
    } else if (
      target === 'localizacao' ||
      target === 'localizacao-section'
    ) {
      target = 'localizacao';
    } else if (
      target === 'inicio' ||
      target === 'inicio-section'
    ) {
      target = 'inicio';
    }

    // Se já estiver na aba atual, rola suavemente ao topo
    if (target === activeSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Limpa quaisquer timeouts pendentes de transições anteriores
    if (cutTimeoutRef.current) clearTimeout(cutTimeoutRef.current);
    if (separateTimeoutRef.current) clearTimeout(separateTimeoutRef.current);
    if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
    if (cutEndTimeoutRef.current) clearTimeout(cutEndTimeoutRef.current);
    if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);

    // Captura scroll atual para o corte e separação alinharem-se ao campo de visão
    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    setCurrentScrollY(currentScroll);

    // ETAPA 1 (0ms): Bloqueia novos cliques e inicia transição
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    // ETAPA 2 (0ms–180ms): Dispara corte incisivo de lâmina
    setIsCutting(true);

    // ETAPA 3 (120ms–280ms): Separação física do conteúdo da tela
    separateTimeoutRef.current = setTimeout(() => {
      setIsSeparating(true);
    }, 120);

    // ETAPA 4 (250ms): Troca de aba, desativação da separação e fade-in cinematográfico
    swapTimeoutRef.current = setTimeout(() => {
      setIsSeparating(false);
      setActiveSection(target);
      setTabTransitionKey((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 250);

    // ETAPA 5 (280ms): Remove o overlay do corte de lâmina
    cutEndTimeoutRef.current = setTimeout(() => {
      setIsCutting(false);
    }, 280);

    // ETAPA 6 (650ms): Transição 100% finalizada e liberação de novos cliques
    endTimeoutRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
      setIsCutting(false);
      setIsSeparating(false);
    }, 650);
  };

  /**
   * Ativa a busca abrindo o Catálogo e focando no campo de pesquisa
   */
  const handleOpenSearch = () => {
    navegarPara('laminas');
    setTimeout(() => {
      const searchInput = document.getElementById('catalog-search-input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 150);
  };

  // Renderizador do Conteúdo da Aba Ativa
  const renderCurrentTab = (section: string) => {
    switch (section) {
      case 'inicio':
        return (
          <HeroSection
            onNavigate={navegarPara}
            currentUser={currentUser}
          />
        );
      case 'laminas':
        return (
          <CatalogSection
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onWhatsAppInquiry={handleWhatsAppInquiry}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
            initialFilter={catalogFilter}
          />
        );
      case 'localizacao':
        return <LocationSection />;
      case 'faq':
        return <FAQSection />;
      case 'a-fronteira':
        return <AboutSection />;
      case 'contato':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-[#EA580C] selection:text-white flex flex-col font-sans">
      {/* 1. Loading Screen inicial com paleta unificada */}
      {isLoading && (
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      )}

      {/* 2. Mandatory Login Identification Gate (Obrigatório antes de acessar o site) */}
      {!isLoading && !isVisitorIdentified && (
        <MandatoryLoginGate
          onIdentified={handleVisitorIdentified}
          onOpenAdminDirectly={() => setIsAdminOpen(true)}
        />
      )}

      {/* 3. CONTEÚDO PRINCIPAL DO SITE (Apenas liberado após identificação completa) */}
      {!isLoading && isVisitorIdentified && (
        <>
          {/* Fixed Black + Orange Navigation Bar */}
          <Navbar
            currentSection={activeSection}
            onNavigate={navegarPara}
            onOpenSearch={handleOpenSearch}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            currentUser={currentUser}
            onFollowToggle={handleFollowToggle}
            onFollowClick={handleFollowToggle}
            followerCount={followerCount}
            isTransitioning={isTransitioning}
          />

          {/* Main Content Body com Transição Global de Aba (Corte Cinematográfico + Separação + Reveal) */}
          <main className="flex-grow pt-20 bg-black min-h-[calc(100vh-80px)] flex flex-col relative overflow-hidden">
            {/* Camada Global de Corte de Lâmina (Transição Cinematográfica: 0ms a 280ms) */}
            {isCutting && <BladeCutTransition isSeparating={isSeparating} />}

            {/* Conteúdo com Separação Física pelo Corte durante 120ms a 250ms */}
            {isSeparating ? (
              <div className="relative w-full flex-grow flex flex-col overflow-hidden">
                {/* Metade superior cortada (afasta-se para cima e direita) */}
                <div
                  className="w-full flex-grow flex flex-col animate-cinematic-split-top"
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% calc(${currentScrollY}px + 65vh), 0 calc(${currentScrollY}px + 35vh))`
                  }}
                >
                  {renderCurrentTab(activeSection)}
                </div>

                {/* Metade inferior cortada (afasta-se para baixo e esquerda) */}
                <div
                  className="absolute inset-0 w-full flex-grow flex flex-col animate-cinematic-split-bottom pointer-events-none"
                  style={{
                    clipPath: `polygon(0 calc(${currentScrollY}px + 35vh), 100% calc(${currentScrollY}px + 65vh), 100% 100%, 0 100%)`
                  }}
                >
                  {renderCurrentTab(activeSection)}
                </div>
              </div>
            ) : (
              <div
                key={`${activeSection}-${tabTransitionKey}`}
                id={`tab-view-${activeSection}`}
                className="cinematic-page-reveal w-full flex-grow flex flex-col opacity-100"
              >
                {renderCurrentTab(activeSection)}
              </div>
            )}
          </main>

          {/* Clean Black + Orange Footer */}
          <Footer
            currentUser={currentUser}
            onFollowClick={handleFollowToggle}
            onNavigate={navegarPara}
            onOpenAdmin={() => setIsAdminOpen(true)}
            followerCount={followerCount}
          />

          {/* Floating Concierge WhatsApp Action Button (Orange + White) */}
          <div className="fixed bottom-6 right-6 z-40">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com o cuteleiro da Fronteira Cutelaria.')}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-mono text-xs font-bold uppercase shadow-[0_8px_25px_rgba(234,88,12,0.35)] transition-all duration-200 transform hover:scale-105 border border-orange-400/30"
              title="Falar no WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="hidden sm:inline tracking-wider">🔪 WhatsApp Oficial</span>
            </a>
          </div>
        </>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          allProducts={products.slice(0, 21)}
          onClose={() => setSelectedProduct(null)}
          onWhatsAppInquiry={handleWhatsAppInquiry}
          isSaved={savedProductIds.includes(selectedProduct.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(u) => {
            setCurrentUser(u);
            setIsVisitorIdentified(true);
            setFollowerCount(storage.getFollowers().length);
          }}
        />
      )}

      {isProfileModalOpen && currentUser && (
        <UserProfile
          user={currentUser}
          onClose={() => setIsProfileModalOpen(false)}
          onLogout={() => {
            storage.setCurrentUser(null);
            try {
              localStorage.removeItem('fronteira_user_name');
              localStorage.removeItem('fronteira_user_email');
              localStorage.removeItem('fronteira_user_phone');
            } catch {}
            setCurrentUser(null);
            setIsVisitorIdentified(false);
            setIsProfileModalOpen(false);
          }}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
          }}
          onOpenAdmin={() => {
            setIsProfileModalOpen(false);
            setIsAdminOpen(true);
          }}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleFollow={handleFollowToggle}
        />
      )}

      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={refreshAppData}
        />
      )}
    </div>
  );
}

export default App;
