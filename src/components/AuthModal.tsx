import React, { useState } from 'react';
import { storage } from '../utils/storage';
import { User } from '../types';
import { X, Mail, User as UserIcon, Phone, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-mask Brazilian phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = storage.formatPhone(e.target.value);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
    if (generalError) setGeneralError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (nameError) setNameError('');
    if (generalError) setGeneralError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    if (generalError) setGeneralError('');
  };

  const validate = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setGeneralError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (!trimmedName) {
      setNameError('Por favor, informe seu Nome completo.');
      isValid = false;
    } else if (trimmedName.length < 2) {
      setNameError('O nome deve ter pelo menos 2 caracteres.');
      isValid = false;
    }

    if (!trimmedEmail) {
      setEmailError('Por favor, informe seu E-mail.');
      isValid = false;
    } else if (!storage.isValidEmail(trimmedEmail)) {
      setEmailError('Informe um e-mail válido (ex: seuemail@exemplo.com).');
      isValid = false;
    }

    if (!phone.trim() || phoneDigits.length === 0) {
      setPhoneError('Por favor, informe seu WhatsApp/telefone.');
      isValid = false;
    } else if (phoneDigits.length < 10) {
      setPhoneError('Informe um número válido com DDD (ex: (48) 99612-9568).');
      isValid = false;
    }

    if (!isValid) {
      setGeneralError('Preencha os 3 campos obrigatórios para continuar.');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const user = storage.identifyUser(name, email, phone);
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 150);
    } catch (err) {
      console.error(err);
      setGeneralError('Erro ao registrar seus dados. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const isFilled =
    name.trim().length >= 2 &&
    storage.isValidEmail(email) &&
    phone.replace(/\D/g, '').length >= 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] overflow-hidden p-6 sm:p-8 text-slate-100 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 p-1.5 rounded-2xl bg-black border border-zinc-800 mx-auto mb-3 flex items-center justify-center shadow-lg select-none">
            <img
              src="https://i.ibb.co/YB8vNBj0/Whats-App-Image-2026-09-01-at-21-11-49.jpg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/logo-fronteira.jpg";
              }}
              alt="Fronteira Cutelaria"
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-[#EA580C] text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1.5">
            <Sparkles className="w-3 h-3 text-[#EA580C]" />
            <span>IDENTIFICAÇÃO DE ACESSO</span>
          </div>
          <h3 className="text-lg font-bold font-display text-white">
            FRONTEIRA CUTELARIA
          </h3>
          <p className="text-xs text-zinc-400 font-mono">
            Preencha seus 3 dados para entrar na plataforma
          </p>
        </div>

        {generalError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-mono text-center flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Form with 3 Mandatory Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nome */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-bold uppercase text-zinc-300">
                1. Nome Completo <span className="text-[#EA580C]">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EA580C]" />
              <input
                type="text"
                autoFocus
                value={name}
                onChange={handleNameChange}
                placeholder="Ex: Gabriel Silva"
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  nameError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-zinc-750 focus:border-[#EA580C]'
                }`}
              />
            </div>
            {nameError && (
              <p className="mt-1 text-xs font-mono text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* 2. E-mail */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-bold uppercase text-zinc-300">
                2. E-mail <span className="text-[#EA580C]">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EA580C]" />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Ex: seuemail@exemplo.com"
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  emailError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-zinc-750 focus:border-[#EA580C]'
                }`}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-xs font-mono text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* 3. WhatsApp / Telefone */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-bold uppercase text-zinc-300">
                3. WhatsApp / Telefone <span className="text-[#EA580C]">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EA580C]" />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(48) 99612-9568"
                maxLength={16}
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  phoneError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-zinc-750 focus:border-[#EA580C]'
                }`}
              />
            </div>
            {phoneError && (
              <p className="mt-1 text-xs font-mono text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{phoneError}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-2xl font-bold font-mono text-xs tracking-wider uppercase transition-all cursor-pointer shadow-[0_4px_16px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2 ${
              isFilled
                ? 'bg-[#EA580C] hover:bg-[#C2410C] text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750 hover:text-white'
            }`}
          >
            <span>{isSubmitting ? 'ENTRANDO...' : 'ACESSAR PLATAFORMA'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-zinc-850 text-center flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
          <span>Dados salvos com segurança para navegação</span>
        </div>
      </div>
    </div>
  );
};
