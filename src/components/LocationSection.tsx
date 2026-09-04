import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const address = 'Anexo ao Posto Ipiranga - Av. Minas Gerais, 305 - Centro, Camboriú - SC, 88340-000';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="localizacao-section" className="py-20 bg-zinc-950 text-slate-100 border-t border-zinc-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-orange-500/40 text-xs font-mono font-bold tracking-[0.2em] text-[#EA580C] uppercase mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>LOCALIZAÇÃO OFICIAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight mb-4 uppercase">
            ENCONTRE A <span className="text-[#EA580C]">FRONTEIRA CUTELARIA</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Venha conhecer o nosso ponto de atendimento ou trace sua rota pelo Google Maps com facilidade.
          </p>
        </div>

        {/* Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address Details Card */}
          <div className="lg:col-span-5 bg-black border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.8)] space-y-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-orange-950/80 border border-orange-500/40 text-orange-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">Endereço</h3>
                  <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-orange-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">Atendimento</h3>
                  <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                    Segunda a Sábado — Entre em contato pelo WhatsApp para agendamentos e informações sobre visitas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-orange-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">WhatsApp Direto</h3>
                  <p className="text-sm text-zinc-300 font-medium leading-relaxed font-mono">
                    (48) 99612-9568
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-zinc-850">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.98] text-white text-sm sm:text-base font-black font-mono tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(234,88,12,0.45)] transition-all"
              >
                <Navigation className="w-5 h-5" />
                <span>ABRIR NO GOOGLE MAPS</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)] min-h-[380px] sm:min-h-[440px] relative">
            <iframe
              title="Localização da Fronteira Cutelaria"
              src="https://maps.google.com/maps?q=Av.+Minas+Gerais,+305+-+Centro,+Cambori%C3%BA+-+SC,+88340-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0 grayscale-[25%] contrast-125"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
