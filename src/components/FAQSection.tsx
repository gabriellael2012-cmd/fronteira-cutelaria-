import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Search,
  Sparkles,
  ShieldCheck,
  MapPin,
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';
import { storage } from '../utils/storage';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: 'cuidados' | 'encomendas' | 'produtos' | 'entrega';
  badge?: string;
}

/**
 * LISTA COMPLETA DE PERGUNTAS E RESPOSTAS OFICIAIS
 * Estruturada de forma modular para permitir fácil inclusão e edição de novos itens no futuro.
 */
export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'A faca artesanal enferruja?',
    answer:
      'Sim. Dependendo do tipo de aço e dos cuidados, uma lâmina pode oxidar. Aços carbono geralmente exigem mais atenção, enquanto aços inoxidáveis possuem maior resistência à corrosão. Após o uso, o ideal é limpar e secar bem a faca e evitar deixá-la úmida por longos períodos.',
    category: 'cuidados',
    badge: 'Aço & Oxidação',
  },
  {
    id: 2,
    question: 'Como faço a manutenção e limpeza adequada da minha lâmina?',
    answer:
      'Após o uso, lave a lâmina quando necessário e seque-a completamente. Evite guardar a faca molhada ou suja. Para lâminas de aço carbono, uma fina camada de óleo apropriado para manutenção pode ajudar a proteger contra a oxidação. Nunca deixe a faca submersa em água por muito tempo.',
    category: 'cuidados',
    badge: 'Limpeza & Cuidados',
  },
  {
    id: 3,
    question: 'Qual o melhor aço para minha necessidade: inox, carbono ou disco de arado?',
    answer:
      'Isso depende da utilização desejada. O aço inoxidável geralmente oferece maior resistência à corrosão e praticidade no dia a dia. O aço carbono pode oferecer excelentes características de corte, mas exige mais cuidados contra oxidação. O material conhecido como disco de arado possui características próprias e pode ser utilizado em determinados tipos de facas artesanais. A escolha ideal depende do uso, manutenção desejada e preferência do cliente.',
    category: 'produtos',
    badge: 'Tipos de Aço',
  },
  {
    id: 4,
    question: 'Posso personalizar com meu nome ou logo na lâmina?',
    answer:
      'Sim. Consulte a Fronteira Cutelaria sobre as possibilidades de personalização disponíveis. Dependendo do projeto, pode ser possível adicionar nomes, iniciais ou logotipos.',
    category: 'encomendas',
    badge: 'Personalização',
  },
  {
    id: 5,
    question: 'Quanto tempo leva para produzir uma peça personalizada sob encomenda?',
    answer:
      'O prazo pode variar conforme o modelo, nível de personalização, materiais escolhidos e demanda de produção. Consulte a Fronteira Cutelaria para receber uma estimativa atualizada para o seu pedido.',
    category: 'encomendas',
    badge: 'Prazo de Produção',
  },
  {
    id: 6,
    question: 'Como funciona a garantia da Fronteira Cutelaria?',
    answer:
      'As condições de garantia podem variar conforme o produto e a natureza do problema. Entre em contato com a Fronteira Cutelaria apresentando as informações do pedido e detalhes da situação para receber orientação sobre a análise e o atendimento.',
    category: 'produtos',
    badge: 'Garantia',
  },
  {
    id: 7,
    question: 'Qual é o valor de uma faca?',
    answer:
      'Os valores podem variar conforme o modelo, tamanho, aço, cabo, acabamento e nível de personalização. Consulte o catálogo para visualizar os produtos disponíveis e entre em contato pelo WhatsApp para informações atualizadas.',
    category: 'produtos',
    badge: 'Valores & Catálogo',
  },
  {
    id: 8,
    question: 'Vocês fazem facas sob encomenda?',
    answer:
      'Sim, é possível consultar a disponibilidade para projetos personalizados. Entre em contato, explique o modelo desejado e informe suas preferências para receber orientações sobre as possibilidades.',
    category: 'encomendas',
    badge: 'Sob Encomenda',
  },
  {
    id: 9,
    question: 'Posso escolher o material do cabo?',
    answer:
      'Dependendo do projeto e da disponibilidade, podem existir diferentes opções de materiais e acabamentos. Consulte a Fronteira Cutelaria para verificar quais opções estão disponíveis para o modelo desejado.',
    category: 'encomendas',
    badge: 'Cabos Nobres',
  },
  {
    id: 10,
    question: 'Qual a diferença entre uma faca artesanal e uma faca industrial?',
    answer:
      'Uma faca artesanal é produzida com atenção individual ao projeto, aos materiais e aos detalhes do acabamento. Já os processos industriais normalmente possuem produção em maior escala e padronização. As características específicas podem variar de acordo com cada peça e fabricante.',
    category: 'produtos',
    badge: 'Artesanal vs Industrial',
  },
  {
    id: 11,
    question: 'As facas vêm afiadas?',
    answer:
      'A condição de entrega pode variar conforme o modelo e o acabamento. Consulte as informações do produto ou entre em contato com a Fronteira Cutelaria para confirmar os detalhes da peça escolhida.',
    category: 'produtos',
    badge: 'Afiação & Fio',
  },
  {
    id: 12,
    question: 'Como devo guardar minha faca?',
    answer:
      'Guarde a faca em um local seco, limpo e seguro. Antes de armazená-la, certifique-se de que a lâmina esteja completamente seca. Evite locais com umidade excessiva.',
    category: 'cuidados',
    badge: 'Armazenamento',
  },
  {
    id: 13,
    question: 'Posso lavar minha faca na máquina de lavar louças?',
    answer:
      'Não é recomendado. O calor, a umidade prolongada e os produtos utilizados na lavagem podem prejudicar a lâmina e o cabo. Para preservar melhor a peça, prefira a limpeza manual e a secagem imediata.',
    category: 'cuidados',
    badge: 'Lavagem & Cuidado',
  },
  {
    id: 14,
    question: 'A Fronteira Cutelaria entrega para outras cidades?',
    answer:
      'Consulte diretamente a Fronteira Cutelaria para verificar as opções de entrega ou envio disponíveis para sua região.',
    category: 'entrega',
    badge: 'Envio & Entregas',
  },
  {
    id: 15,
    question: 'Onde fica a Fronteira Cutelaria?',
    answer:
      'A Fronteira Cutelaria está localizada em: Anexo ao Posto Ipiranga – Av. Minas Gerais, 305 – Centro, Camboriú – SC, 88340-000. Utilize também a seção de localização existente no site para ajudar o cliente a encontrar a loja.',
    category: 'entrega',
    badge: 'Endereço & Loja',
  },
  {
    id: 16,
    question: 'Posso retirar minha faca pessoalmente?',
    answer:
      'Consulte a Fronteira Cutelaria para verificar a disponibilidade de retirada presencial e combinar os detalhes antes de se deslocar até o local.',
    category: 'entrega',
    badge: 'Retirada Presencial',
  },
  {
    id: 17,
    question: 'Posso presentear alguém com uma faca personalizada?',
    answer:
      'Sim. Uma peça personalizada pode ser uma opção especial para presente. Consulte as possibilidades de personalização, materiais e prazos antes de realizar o pedido.',
    category: 'encomendas',
    badge: 'Presentes & Homenagens',
  },
  {
    id: 18,
    question: 'Como faço para pedir uma faca?',
    answer:
      'O cliente pode acessar o catálogo, escolher o modelo desejado e utilizar o botão de WhatsApp para entrar em contato diretamente com a Fronteira Cutelaria.',
    category: 'encomendas',
    badge: 'Como Pedir',
  },
  {
    id: 19,
    question: 'Como sei qual faca é ideal para mim?',
    answer:
      'Isso depende da finalidade de uso, preferência de tamanho, tipo de lâmina, material e nível de manutenção desejado. Entre em contato com a Fronteira Cutelaria e informe como pretende utilizar a faca para receber orientação.',
    category: 'produtos',
    badge: 'Escolha Ideal',
  },
  {
    id: 20,
    question: 'O que devo fazer se minha faca apresentar sinais de oxidação?',
    answer:
      'Não ignore os primeiros sinais. Limpe e seque cuidadosamente a peça e procure orientação adequada para o material específico da lâmina. Para evitar novos problemas, mantenha a faca limpa e seca e siga as recomendações de conservação.',
    category: 'cuidados',
    badge: 'Recuperação & Oxidação',
  },
];

export const FAQSection: React.FC = () => {
  // Estado para controlar qual acordeão está aberto (null para todos fechados, ou o ID da pergunta)
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const siteConfig = storage.getSiteConfig();

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Filtro dinâmico por termo digitado (pergunta ou resposta)
  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return FAQ_DATA;
    const term = searchTerm.toLowerCase();
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term) ||
        (item.badge && item.badge.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Estive lendo a seção de Perguntas Frequentes da Fronteira Cutelaria e gostaria de tirar uma dúvida adicional sobre as lâminas.'
  )}`;

  return (
    <section
      id="faq-section"
      className="py-20 bg-black text-slate-100 border-t border-zinc-900 relative selection:bg-[#EA580C] selection:text-white"
    >
      {/* Luz ambiente de forja sutil ao fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Principal */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>CENTRAL DE DÚVIDAS • GUIA COMPLETO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight mb-4 uppercase">
            PERGUNTAS <span className="text-[#EA580C]">FREQUENTES</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Tire todas as suas dúvidas sobre cuidados com a lâmina, tipos de aços, personalização,
            encomendas, garantias e localização da <strong className="text-white">Fronteira Cutelaria</strong>.
          </p>

          {/* Barra de Busca Rápida por Dúvidas */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
              <input
                id="faq-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por assunto (ex: ferrugem, aço, cabo, entrega, valor)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-[#EA580C] focus:outline-none text-sm text-white placeholder:text-zinc-500 shadow-md transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 text-zinc-500 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
                  title="Limpar pesquisa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchTerm && (
              <p className="text-xs text-zinc-400 font-mono mt-2 text-left px-2">
                Encontradas <span className="text-[#EA580C] font-bold">{filteredQuestions.length}</span> perguntas para &quot;{searchTerm}&quot;
              </p>
            )}
          </div>
        </div>

        {/* Lista de Acordeões com Transição Suave */}
        <div className="space-y-3.5">
          {filteredQuestions.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`bg-zinc-950 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#EA580C]/70 shadow-[0_6px_30px_rgba(234,88,12,0.18)]'
                    : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                {/* Botão de Pergunta (Disparador do Acordeão) */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-7 flex items-center justify-between text-left gap-4 cursor-pointer select-none transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Número Identificador */}
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#EA580C] text-white'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {item.id.toString().padStart(2, '0')}
                    </span>

                    {/* Texto da Pergunta */}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* Ícone Indicador de Abertura/Fechamento com Rotação Fluida */}
                  <div
                    className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 shrink-0 border ${
                      isOpen
                        ? 'bg-[#EA580C] border-[#EA580C] text-white rotate-180 shadow-[0_0_12px_rgba(234,88,12,0.5)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                  </div>
                </button>

                {/* Conteúdo da Resposta com Animação Fluida de Abertura/Fechamento */}
                <div
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-5 pt-2 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed border-t border-zinc-900/90 bg-zinc-950/80">
                      {/* Destaque temático da resposta */}
                      <div className="flex items-start gap-3">
                        <div className="w-1 self-stretch rounded-full bg-[#EA580C] shrink-0 mt-0.5" />
                        <p className="flex-1 text-zinc-300">{item.answer}</p>
                      </div>

                      {/* Badge da Categoria */}
                      {item.badge && (
                        <div className="mt-3.5 flex items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#EA580C] bg-orange-950/40 border border-orange-500/20 px-2.5 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 px-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <p className="text-zinc-400 font-sans text-sm mb-3">
                Nenhuma pergunta encontrada para o termo digitado.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider border border-zinc-700 cursor-pointer"
              >
                Limpar pesquisa
              </button>
            </div>
          )}
        </div>

        {/* Card de Atendimento Direto ao Final */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/10 border border-[#EA580C]/40 flex items-center justify-center text-[#EA580C] mb-4 shadow-sm">
              <MessageCircle className="w-6 h-6 text-[#EA580C]" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-wide mb-2 uppercase">
              AINDA COM DÚVIDAS SOBRE SUA LÂMINA?
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-6">
              Nossa equipe da Fronteira Cutelaria está pronta para orientar sobre modelos, tipo de aço,
              personalização em relevo e encomendas sob medida.
            </p>

            <a
              id="faq-whatsapp-direct-btn"
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] active:scale-95 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_6px_25px_rgba(234,88,12,0.4)] transition-all duration-200 flex items-center justify-center gap-3 border border-orange-400/40 cursor-pointer"
              title="Fale diretamente com o atendimento da Fronteira Cutelaria pelo WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>FALAR NO WHATSAPP: {siteConfig.whatsappFormatted}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
