import React, { useState } from 'react';
import { User, Product, CustomPieceRequest } from '../types';
import { storage } from '../utils/storage';
import { X, User as UserIcon, Heart, FileText, Camera, Check, Shield, Edit3, LogOut, CheckCircle2 } from 'lucide-react';

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleFollow: () => void;
  onUpdateUser?: (updated: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onClose,
  onLogout,
  onOpenAdmin,
  onSelectProduct,
  onToggleFollow,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'saved' | 'requests'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingNameOnly, setIsChangingNameOnly] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [preferences, setPreferences] = useState(user.preferences || '');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const allProducts = storage.getProducts();
  const savedIds = storage.getSavedProducts();
  const savedProducts = allProducts.filter((p) => savedIds.includes(p.id));

  const allRequests = storage.getCustomRequests();
  const userRequests = allRequests.filter(
    (r) => r.email.toLowerCase() === user.email.toLowerCase() || r.customerName.toLowerCase() === user.name.toLowerCase()
  );

  const handlePhoneChange = (val: string) => {
    setPhone(storage.formatPhone(val));
    if (errorMsg) setErrorMsg('');
  };

  const handleSaveNameOnly = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed.length < 2) {
      setErrorMsg('Por favor, informe um nome com pelo menos 2 caracteres.');
      return;
    }
    const updated = storage.saveIdentifiedUser(trimmed, user.email, user.phone || '');
    if (updated) {
      onUpdateUser?.(updated);
      setSuccessMsg('Nome alterado com sucesso!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsChangingNameOnly(false);
      setErrorMsg('');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    if (!trimmedEmail || !storage.isValidEmail(trimmedEmail)) {
      setErrorMsg('Por favor, informe um e-mail válido.');
      return;
    }

    if (!phone.trim() || phoneDigits.length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp/telefone válido com DDD.');
      return;
    }

    const updated = storage.saveIdentifiedUser(trimmedName, trimmedEmail, phone);
    if (preferences !== user.preferences) {
      storage.updateUserProfile(updated.id, { preferences });
      updated.preferences = preferences;
    }

    if (updated) {
      onUpdateUser?.(updated);
      setSuccessMsg('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden p-6 sm:p-8 text-slate-100 my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EA580C] text-white font-black flex items-center justify-center text-lg shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white">
                MEU PERFIL
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                {user.email} {user.role === 'admin' && '• Administrador da Forja'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-2xl bg-black p-1 border border-zinc-800 my-4 shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'info'
                ? 'bg-zinc-900 text-[#EA580C] shadow-sm border border-orange-500/30'
                : 'text-zinc-400 hover:text-[#EA580C]'
            }`}
          >
            Dados & Comunidade
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-zinc-900 text-[#EA580C] shadow-sm border border-orange-500/30'
                : 'text-zinc-400 hover:text-[#EA580C]'
            }`}
          >
            Lâminas Salvas ({savedProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-zinc-900 text-[#EA580C] shadow-sm border border-orange-500/30'
                : 'text-zinc-400 hover:text-[#EA580C]'
            }`}
          >
            Solicitações ({userRequests.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-grow pr-1 space-y-4">
          {successMsg && (
            <div className="p-3 rounded-xl bg-zinc-900 border border-orange-500/40 text-[#EA580C] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4">
              {/* Follower Status Card */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Status na Fronteira</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {user.isFollower ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#EA580C] text-white">
                        <Check className="w-3.5 h-3.5" />
                        <span>Membro Seguidor Oficial</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-zinc-800 text-zinc-300">
                        Visitante Cadastrado
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={onToggleFollow}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    user.isFollower
                      ? 'bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-red-950 hover:text-red-400 hover:border-red-800'
                      : 'bg-[#EA580C] text-white hover:bg-[#C2410C]'
                  }`}
                >
                  {user.isFollower ? 'Deixar de Seguir' : '📸 Seguir a Fronteira'}
                </button>
              </div>

              {/* Edit Form */}
              {isChangingNameOnly ? (
                <form onSubmit={handleSaveNameOnly} className="space-y-4 bg-black p-4 rounded-2xl border border-orange-500/40">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      Novo Nome
                    </label>
                    <input
                      type="text"
                      required
                      autoFocus
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Como deseja ser chamado..."
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                    {errorMsg && (
                      <p className="text-xs text-red-400 font-mono mt-1">{errorMsg}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setName(user.name);
                        setIsChangingNameOnly(false);
                        setErrorMsg('');
                      }}
                      className="w-1/2 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-bold font-mono uppercase cursor-pointer hover:bg-zinc-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold font-mono uppercase cursor-pointer shadow-md"
                    >
                      Salvar Nome
                    </button>
                  </div>
                </form>
              ) : isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      1. Nome Completo <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      2. E-mail <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      3. WhatsApp / Telefone <span className="text-[#EA580C]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(48) 99612-9568"
                      maxLength={16}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                      Preferências de Cutelaria (Opcional)
                    </label>
                    <input
                      type="text"
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      placeholder="Ex: Facas artesanais, churrasco gaúcho"
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-750 rounded-xl text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setErrorMsg('');
                      }}
                      className="w-1/2 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-bold font-mono uppercase cursor-pointer hover:bg-zinc-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold font-mono uppercase cursor-pointer shadow-md"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">Nome:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{user.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setName(user.name);
                          setIsChangingNameOnly(true);
                          setErrorMsg('');
                        }}
                        className="text-[11px] font-mono text-orange-400 hover:text-orange-300 underline cursor-pointer"
                        title="Alterar somente o nome"
                      >
                        (Alterar)
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">E-mail:</span>
                    <span className="font-bold text-white">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">WhatsApp:</span>
                    <span className="font-bold text-white">{user.phone || 'Não cadastrado'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">Preferências:</span>
                    <span className="font-bold text-white">{user.preferences || 'Geral'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => {
                        setName(user.name);
                        setIsChangingNameOnly(true);
                        setErrorMsg('');
                      }}
                      className="py-2.5 rounded-xl bg-orange-950/40 hover:bg-orange-900/40 text-orange-400 text-xs font-bold font-mono uppercase border border-orange-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>ALTERAR NOME</span>
                    </button>

                    <button
                      onClick={() => {
                        setName(user.name);
                        setEmail(user.email);
                        setPhone(user.phone || '');
                        setPreferences(user.preferences || '');
                        setIsEditing(true);
                        setErrorMsg('');
                      }}
                      className="py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white text-xs font-bold font-mono uppercase border border-zinc-750 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>EDITAR PERFIL</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              {savedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="p-3 rounded-2xl bg-black border border-zinc-800 hover:border-orange-500/60 transition-all flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover bg-zinc-900"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-xs text-white truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-black text-[#EA580C] font-mono block">
                          {product.formattedPrice}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {product.steel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-zinc-500 text-xs font-mono">
                  Nenhuma lâmina favoritada no momento.
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-3">
              {userRequests.length > 0 ? (
                userRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-black border border-zinc-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{req.pieceType}</span>
                      <span className="px-2 py-0.5 rounded-full font-mono uppercase text-[10px] bg-zinc-900 text-[#EA580C] border border-orange-500/30 font-bold">
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-[11px]">
                      Aço: {req.steelChoice} • Cabo: {req.handleChoice}
                    </p>
                    <div className="text-[10px] font-mono text-zinc-500">
                      Enviado em: {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-zinc-500 text-xs font-mono">
                  Nenhuma solicitação personalizada enviada ainda.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-850 flex items-center justify-between shrink-0">
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-red-500 hover:text-red-400 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da Conta</span>
          </button>

          {user.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-mono font-bold uppercase shadow-sm cursor-pointer"
            >
              Painel Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
