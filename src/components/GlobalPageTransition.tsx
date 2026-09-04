import React from 'react';

interface GlobalPageTransitionProps {
  children: React.ReactNode;
  activeKey: string;
}

/**
 * GlobalPageTransition
 * 
 * Utiliza animação CSS pura (.page-enter com @keyframes pageFadeIn de 350ms ease-out both).
 * A propriedade `activeKey` força uma nova instância do fade-in toda vez que o usuário navega,
 * garantindo:
 * 1. Entrada suave (opacity 0 -> 1 em ~350ms)
 * 2. Independência total do scroll ou do mouse
 * 3. Término autônomo com opacity: 1 e interatividade total garantida
 */
export const GlobalPageTransition: React.FC<GlobalPageTransitionProps> = ({
  children,
  activeKey,
}) => {
  return (
    <div
      key={`tab-${activeKey}`}
      id="global-page-transition-container"
      className="global-fade-in w-full flex-grow flex flex-col"
      style={{
        visibility: 'visible',
      }}
    >
      {children}
    </div>
  );
};
