import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserIcon, Mail, Phone, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { storage } from '../utils/storage';
import { User } from '../types';

interface MandatoryLoginGateProps {
  onIdentified: (user: User) => void;
  onOpenAdminDirectly?: () => void;
}

export const MandatoryLoginGate: React.FC<MandatoryLoginGateProps> = ({
  onIdentified,
  onOpenAdminDirectly
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Field-specific validation states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-mask Brazilian phone number: (XX) 9XXXX-XXXX or (XX) XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = storage.formatPhone(raw);
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

  const validateForm = (): boolean => {
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
      setNameError('O nome deve conter pelo menos 2 caracteres.');
      isValid = false;
    }

    if (!trimmedEmail) {
      setEmailError('Por favor, informe seu E-mail.');
      isValid = false;
    } else if (!storage.isValidEmail(trimmedEmail)) {
      setEmailError('Por favor, informe um e-mail válido (ex: seuemail@exemplo.com).');
      isValid = false;
    }

    if (!phone.trim() || phoneDigits.length === 0) {
      setPhoneError('Por favor, informe seu WhatsApp/telefone.');
      isValid = false;
    } else if (phoneDigits.length < 10) {
      setPhoneError('Informe um número completo com DDD (ex: (48) 99612-9568).');
      isValid = false;
    }

    if (!isValid) {
      setGeneralError('Preencha os 3 campos obrigatórios corretamente para acessar o site.');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const user = storage.identifyUser(name, email, phone);
      setTimeout(() => {
        onIdentified(user);
      }, 200);
    } catch (err) {
      console.error(err);
      setGeneralError('Ocorreu um erro ao salvar seus dados. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const isFormFilled =
    name.trim().length >= 2 &&
    storage.isValidEmail(email) &&
    phone.replace(/\D/g, '').length >= 10;

  return (
    <div
      id="mandatory-login-gate-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-slate-100 p-4 sm:p-6 overflow-y-auto"
    >
      {/* Ambient background glow in pure black + orange accents */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/40 via-black to-black" />
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#EA580C_1px,transparent_1px),linear-gradient(to_bottom,#EA580C_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg bg-zinc-950 border border-zinc-800 shadow-[0_20px_70px_rgba(0,0,0,0.9)] rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center my-auto"
      >
        {/* Logo Oficial Centralizada */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 p-2 rounded-2xl bg-black border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center justify-center select-none">
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

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-[#EA580C] text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-2.5">
          <Sparkles className="w-3 h-3 text-[#EA580C]" />
          <span>ACESSO À PLATAFORMA</span>
        </div>

        {/* Título Oficial */}
        <h1 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white mb-1.5 leading-tight">
          BEM-VINDO À <span className="text-[#EA580C]">FRONTEIRA CUTELARIA</span>
        </h1>

        {/* Texto Explicativo */}
        <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-6 max-w-md">
          Preencha os dados abaixo para desbloquear o acervo completo de facas artesanais, coleções e atendimento personalizado.
        </p>

        {/* Erro Geral */}
        <AnimatePresence>
          {generalError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="w-full mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-mono text-center flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{generalError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulário com os 3 Campos Obrigatórios */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
          {/* 1. NOME (Obrigatório) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="gate-name-input"
                className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300"
              >
                1. NOME COMPLETO <span className="text-[#EA580C] font-bold">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <UserIcon className="w-4 h-4 text-[#EA580C]" />
              </div>
              <input
                id="gate-name-input"
                type="text"
                autoFocus
                value={name}
                onChange={handleNameChange}
                placeholder="Ex: Gabriel Silva"
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  nameError
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-zinc-750 focus:border-[#EA580C] focus:ring-1 focus:ring-orange-500/40'
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

          {/* 2. E-MAIL (Obrigatório) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="gate-email-input"
                className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300"
              >
                2. E-MAIL <span className="text-[#EA580C] font-bold">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4 text-[#EA580C]" />
              </div>
              <input
                id="gate-email-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Ex: seuemail@exemplo.com"
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  emailError
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-zinc-750 focus:border-[#EA580C] focus:ring-1 focus:ring-orange-500/40'
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

          {/* 3. WHATSAPP / TELEFONE (Obrigatório com formato brasileiro) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="gate-phone-input"
                className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300"
              >
                3. WHATSAPP / TELEFONE <span className="text-[#EA580C] font-bold">*</span>
              </label>
              <span className="text-[10px] font-mono text-orange-400/80 uppercase">Obrigatório</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Phone className="w-4 h-4 text-[#EA580C]" />
              </div>
              <input
                id="gate-phone-input"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(48) 99612-9568"
                maxLength={16}
                className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border rounded-2xl text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  phoneError
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                    : 'border-zinc-750 focus:border-[#EA580C] focus:ring-1 focus:ring-orange-500/40'
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

          {/* Botão de Liberação de Acesso */}
          <div className="pt-2">
            <button
              id="login-gate-enter-btn"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_25px_rgba(234,88,12,0.4)] ${
                isFormFilled
                  ? 'bg-[#EA580C] hover:bg-[#C2410C] text-white hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750 hover:text-zinc-200'
              }`}
            >
              <span>{isSubmitting ? 'LIBERANDO ACESSO...' : 'ACESSAR A FRONTEIRA'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Rodapé Informativo */}
        <div className="mt-6 pt-4 border-t border-zinc-850 w-full flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
          <span>Acesso Seguro • Seus dados ficam salvos para sua navegação</span>
        </div>

        {/* Acesso Administrativo para o Proprietário */}
        {onOpenAdminDirectly && (
          <button
            type="button"
            onClick={onOpenAdminDirectly}
            className="mt-3 text-[11px] text-zinc-500 hover:text-orange-400 font-mono underline transition-colors cursor-pointer"
          >
            Acesso administrativo
          </button>
        )}
      </motion.div>
    </div>
  );
};
