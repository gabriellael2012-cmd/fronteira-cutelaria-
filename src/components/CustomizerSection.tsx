import React, { useState } from 'react';
import { storage } from '../utils/storage';
import { CustomPieceRequest } from '../types';
import { Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

export const CustomizerSection: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    whatsapp: '',
    pieceType: 'Faca Gaúcha Tradicional',
    steelChoice: 'Aço Damasco Imperial (Padrão Torcido)',
    bladeFinish: 'Acetinado Manual com Dorso Mosqueado',
    handleChoice: 'Jacarandá da Bahia Centenário',
    pinsChoice: 'Pinos Mosaico em Latão e Cobre',
    sheathChoice: 'Bainha em Couro Bovino com Clip de Aço',
    engravingText: '',
    details: '',
    budget: 'R$ 1.500 a R$ 3.000',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<CustomPieceRequest | null>(null);

  const pieceTypes = [
    'Faca Gaúcha Tradicional (8 a 10 pol.)',
    'Faca Chef Gourmet & Cutelo',
    'Faca de Caça & Bushcraft',
    'Faca Tática & Combate',
    'Canivete de Bolso Artesanal',
    'Conjunto Churrasco Premium (Faca + Garfo)',
  ];

  const steelOptions = [
    'Aço Carbono 5160 Virgem (Alta Tenacidade)',
    'Aço Damasco Imperial (+300 Camadas)',
    'Aço Inox Austríaco N690 (Têmpera Criogênica)',
    'Aço D2 de Alta Retenção de Fio',
    'San Mai (Núcleo Carbono com Laterais Inox)',
  ];

  const handleOptions = [
    'Jacarandá da Bahia Centenário',
    'Imbuia Rajada Estabilizada',
    'Chifre de Cervo Colorado Importado',
    'Micarta Canvas Tática',
    'Madeira Híbrida com Resina Epóxi',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.whatsapp || !formData.email) {
      alert('Por favor, preencha nome, e-mail e WhatsApp.');
      return;
    }

    const newRequest: CustomPieceRequest = {
      id: `req_${Date.now()}`,
      customerName: formData.customerName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      pieceType: formData.pieceType,
      steelChoice: formData.steelChoice,
      bladeFinish: formData.bladeFinish,
      handleChoice: formData.handleChoice,
      pinsChoice: formData.pinsChoice,
      sheathChoice: formData.sheathChoice,
      engravingText: formData.engravingText,
      details: formData.details,
      budget: formData.budget,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    storage.addCustomRequest(newRequest);
    setSubmittedRequest(newRequest);
    setIsSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedRequest) return;
    const siteConfig = storage.getSiteConfig();

    const msg = `*SOLICITAÇÃO DE PEÇA PERSONALIZADA — FRONTEIRA CUTELARIA*

*Cliente:* ${submittedRequest.customerName}
*WhatsApp:* ${submittedRequest.whatsapp}
*E-mail:* ${submittedRequest.email}
*Tipo de Peça:* ${submittedRequest.pieceType}
*Aço Escolhido:* ${submittedRequest.steelChoice}
*Empunhadura:* ${submittedRequest.handleChoice}
*Gravação a Laser:* ${submittedRequest.engravingText || 'Sem gravação'}
*Bainha:* ${submittedRequest.sheathChoice}
*Orçamento Estimado:* ${submittedRequest.budget}
*Detalhes:* ${submittedRequest.details || 'Nenhum detalhe adicional'}

Gostaria de formalizar o orçamento com o mestre cuteleiro.`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="personalize-section" className="py-20 bg-black text-slate-100 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-3">
            <span>🔪 FORJA SOB MEDIDA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
            PERSONALIZE A SUA <span className="text-[#EA580C]">PEÇA</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Desenvolva uma lâmina exclusiva junto ao cuteleiro. Escolha o desenho do perfil, a liga do aço, a empunhadura em madeiras nobres e grave seu nome ou brasão a laser.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-zinc-950 border-2 border-orange-500/50 rounded-3xl p-8 sm:p-12 text-center shadow-xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white font-display mb-3">
              SOLICITAÇÃO RECEBIDA COM SUCESSO!
            </h3>

            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-8 leading-relaxed">
              Registramos seu projeto no sistema da <strong className="text-white">Fronteira Cutelaria</strong>. Você já pode encaminhar a proposta diretamente para o WhatsApp oficial para iniciar o atendimento imediato.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(234,88,12,0.4)] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Encaminhar para o WhatsApp Oficial</span>
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-bold font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Nova Solicitação
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.7)] space-y-6"
          >
            {/* Contact Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Ex: Gabriel Silva"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  E-mail de Contato *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  WhatsApp com DDD *
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="(54) 99999-9999"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>

            {/* Customizer Preferences Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-850">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Tipo de Peça
                </label>
                <select
                  value={formData.pieceType}
                  onChange={(e) => setFormData({ ...formData, pieceType: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#EA580C] cursor-pointer"
                >
                  {pieceTypes.map((t, idx) => (
                    <option key={idx} value={t} className="bg-zinc-900 text-white">{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Liga de Aço Desejada
                </label>
                <select
                  value={formData.steelChoice}
                  onChange={(e) => setFormData({ ...formData, steelChoice: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#EA580C] cursor-pointer"
                >
                  {steelOptions.map((s, idx) => (
                    <option key={idx} value={s} className="bg-zinc-900 text-white">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Material da Empunhadura
                </label>
                <select
                  value={formData.handleChoice}
                  onChange={(e) => setFormData({ ...formData, handleChoice: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-[#EA580C] cursor-pointer"
                >
                  {handleOptions.map((h, idx) => (
                    <option key={idx} value={h} className="bg-zinc-900 text-white">{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                  Gravação Personalizada a Laser (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.engravingText}
                  onChange={(e) => setFormData({ ...formData, engravingText: e.target.value })}
                  placeholder="Ex: Nome, data comemorativa ou brasão..."
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="pt-4 border-t border-zinc-850">
              <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                Descrição do Pedido e Preferências Especiais
              </label>
              <textarea
                rows={4}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Descreva detalhes específicos como medidas, geometria de corte, trabalho no dorso ou finalidade da lâmina..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="customizer-submit-btn"
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(234,88,12,0.3)] transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>ENVIAR SOLICITAÇÃO</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
