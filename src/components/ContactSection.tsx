import React, { useState } from 'react';
import { storage } from '../utils/storage';
import { MessageCircle, Instagram, Mail, MapPin, Send, CheckCircle2, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const siteConfig = storage.getSiteConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor, preencha nome, e-mail e sua mensagem.');
      return;
    }

    storage.addCustomRequest({
      customerName: name,
      email: email,
      whatsapp: phone || '(Não informado)',
      pieceType: 'Contato Institucional',
      steelChoice: '-',
      bladeFinish: '-',
      handleChoice: '-',
      pinsChoice: '-',
      sheathChoice: '-',
      details: message,
    });

    setIsSent(true);
  };

  return (
    <section id="contato-section" className="py-20 bg-black text-slate-100 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-3">
            <span>🔪 ATENDIMENTO OFICIAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
            CANAIS DE <span className="text-[#EA580C]">CONTATO</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Fale diretamente com nossa equipe para tirar dúvidas técnicas, solicitar orçamentos personalizados ou acompanhar seus pedidos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Direct Contacts Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Box */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com o atendimento da Fronteira Cutelaria.')}`}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/60 transition-all flex items-start gap-4 shadow-lg group block"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#EA580C] tracking-wider block mb-1">
                  Atendimento Instantâneo
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-[#EA580C] transition-colors">
                  WhatsApp Oficial
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {siteConfig.whatsappFormatted}
                </p>
              </div>
            </a>

            {/* Instagram Box */}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/60 transition-all flex items-start gap-4 shadow-lg group block"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#EA580C] flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#EA580C] tracking-wider block mb-1">
                  Rede Oficial
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-[#EA580C] transition-colors">
                  Instagram Oficial
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {siteConfig.instagramHandle}
                </p>
              </div>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-start gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#EA580C] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#EA580C] tracking-wider block mb-1">
                  E-mail Institucional
                </span>
                <h4 className="text-lg font-bold text-white">
                  {siteConfig.emailContact}
                </h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  Envio seguro de orçamentos e notas
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-start gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#EA580C] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#EA580C] tracking-wider block mb-1">
                  Localização da Forja
                </span>
                <h4 className="text-lg font-bold text-white">
                  {siteConfig.location}
                </h4>
                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  Envios segurados para todo o território nacional
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form in Black + Orange */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
            <h3 className="text-xl font-bold text-white font-display mb-6 flex items-center gap-2">
              <span className="text-[#EA580C]">🔪</span>
              <span>Envie uma Mensagem</span>
            </h3>

            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EA580C] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Mensagem Enviada com Sucesso!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  A equipe da Fronteira Cutelaria responderá sua solicitação em breve no WhatsApp ou e-mail informado.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 text-[#EA580C] border border-zinc-800 font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                      WhatsApp com DDD
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(54) 99999-9999"
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-2">
                    Mensagem ou Dúvida *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos te ajudar?"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#EA580C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(234,88,12,0.3)] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
