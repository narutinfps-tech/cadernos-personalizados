import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Check, 
  CreditCard, 
  Mail, 
  Phone, 
  User, 
  Sparkles,
  ExternalLink,
  Download,
  AlertCircle,
  QrCode,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Plan } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan;
  onPlanChange: (planId: 'basic' | 'complete') => void;
  plans: Plan[];
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  selectedPlan, 
  onPlanChange, 
  plans 
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  // Card Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Reset states on open/close
  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setPaymentMethod('pix');
      setIsCopied(false);
      setErrorMsg(null);
    }
  }, [isOpen]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!name || !email || !whatsapp) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        setErrorMsg('Por favor, preencha todos os dados do cartão de crédito.');
        return;
      }
    }
    
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleCopyPix = () => {
    const pixCode = "00020101021126750014br.gov.bcb.pix2553pix.canva.com/artes/capasde-caderno-400-completo-520400005303986540510.005802BR5915CanvaPacksLtda6009SAO_PAULO62290525capas400canvapacksdigital6304CA2F";
    navigator.clipboard.writeText(pixCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Mock deliverable links
  const deliverables = [
    {
      title: "Pack de 400+ Capas de Caderno (Editável)",
      description: "Brochura, brochurão, desenho e fofos. Editável no Canva.",
      url: "https://canva.com/design/playful-notebooks-pack-demo",
      type: "canva",
      planRequired: "basic"
    },
    {
      title: "Bônus #1 — Guia Rápido de Personalização",
      description: "Como abrir, editar nome, turma e exportar em alta qualidade.",
      url: "https://canva.com/design/bonus-guide-canva-demo",
      type: "guide",
      planRequired: "complete"
    },
    {
      title: "Bônus #2 — Checklist de Pré-Impressão (PDF)",
      description: "Checklist simples com os principais pontos para evitar erros de impressão.",
      url: "https://canva.com/design/printing-checklist-pdf-demo",
      type: "pdf",
      planRequired: "complete"
    },
    {
      title: "Bônus #3 — 50+ Capas Extras Mais Pedidas",
      description: "Seleção especial de temas fofos adicionais recomendados.",
      url: "https://canva.com/design/extra-notebooks-themes-demo",
      type: "canva",
      planRequired: "complete"
    }
  ];

  if (!isOpen) return null;

  return (
    <div id="checkout_modal_container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        id="checkout_card"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden text-gray-900 border border-gray-100"
      >
        {/* Header bar */}
        <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-200" />
            <div>
              <span className="font-display font-semibold text-lg block">Checkout Seguro</span>
              <span className="text-[10px] text-emerald-100 uppercase tracking-widest font-mono">🔒 Compra 100% Segura e Protegida</span>
            </div>
          </div>
          <button 
            id="close_modal_btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700/80 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Switcher if not on Success step */}
        {step !== 'success' && step !== 'processing' && (
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano Selecionado:</span>
            <div className="flex gap-1 bg-gray-200/60 p-1 rounded-lg">
              {plans.map((p) => (
                <button
                  key={p.id}
                  id={`plan_select_${p.id}`}
                  type="button"
                  onClick={() => onPlanChange(p.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    selectedPlan.id === p.id 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {p.id === 'basic' ? 'Básico (R$ 5,99)' : 'Completo (R$ 10,00)'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {step === 'details' && (
            <form id="checkout_details_form" onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="text-center space-y-1 mb-2">
                <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Passo 1 de 2</span>
                <h3 className="font-display font-bold text-xl text-gray-900">Seus dados para envio</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Você recebe tudo na hora, direto no seu e-mail e WhatsApp. Preencha corretamente.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="fullname" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      id="fullname"
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome" 
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Seu E-mail <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      id="email"
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com" 
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="whatsapp" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    WhatsApp com DDD <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      id="whatsapp"
                      type="tel" 
                      required 
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999" 
                      className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex justify-between items-center mt-6">
                <div>
                  <span className="text-xs text-emerald-800 font-semibold block">Total a pagar:</span>
                  <span className="text-xs text-gray-400 line-through">{selectedPlan.originalPrice}</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-2xl text-emerald-600">{selectedPlan.price}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                id="submit_details_btn"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all text-center block text-sm font-display tracking-wide uppercase mt-4"
              >
                Prosseguir para o Pagamento
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form id="checkout_payment_form" onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="text-center space-y-1 mb-2">
                <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Passo 2 de 2</span>
                <h3 className="font-display font-bold text-xl text-gray-900">Forma de Pagamento</h3>
                <p className="text-xs text-gray-500">
                  Escolha como prefere pagar. Processamento instantâneo.
                </p>
              </div>

              {/* Payment Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="pay_method_pix"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                    paymentMethod === 'pix' 
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Pix (Rápido)</span>
                </button>
                <button
                  type="button"
                  id="pay_method_card"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                    paymentMethod === 'card' 
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Cartão Crédito</span>
                </button>
              </div>

              {/* Selected method content */}
              <AnimatePresence mode="wait">
                {paymentMethod === 'pix' ? (
                  <motion.div 
                    key="pix-area"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center space-y-3"
                  >
                    <div className="bg-white p-2.5 rounded-lg shadow-xs border border-gray-100">
                      {/* Fake QR code representation */}
                      <div className="w-28 h-28 bg-emerald-900/5 flex items-center justify-center rounded-md border border-emerald-500/10 relative overflow-hidden">
                        <QrCode className="w-20 h-20 text-emerald-900/60" />
                        <div className="absolute inset-0 border border-emerald-500/25 pulse-border rounded-md pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-xs font-semibold text-gray-800">Copia e Cola Pix</span>
                      <p className="text-[10px] text-gray-500 leading-normal max-w-xs mt-0.5">
                        Copie a chave Pix abaixo e pague no aplicativo do seu banco de preferência.
                      </p>
                    </div>

                    <div className="w-full flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1.5">
                      <input 
                        readOnly 
                        value="pix.canva.com/artes/capasde-caderno-400-completo..." 
                        className="text-[10px] bg-transparent text-gray-500 outline-none flex-1 font-mono select-all px-1.5"
                      />
                      <button
                        type="button"
                        id="copy_pix_btn"
                        onClick={handleCopyPix}
                        className={`py-1.5 px-3 rounded-md text-xs font-medium cursor-pointer transition-colors flex items-center gap-1 ${
                          isCopied 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="card-area"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Número do Cartão</label>
                      <input 
                        type="text" 
                        required={paymentMethod === 'card'}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nome Impresso no Cartão</label>
                      <input 
                        type="text" 
                        required={paymentMethod === 'card'}
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="NOME DO TITULAR" 
                        className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none uppercase"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Validade</label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'card'}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA" 
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-center font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">CVV</label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'card'}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          placeholder="123" 
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-center font-mono"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Note about immediate delivery */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-2.5 items-start mt-4">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-900 leading-normal font-sans">
                  <strong>Entrega Instantânea:</strong> Assim que finalizar, os links de edição do Canva serão liberados automaticamente aqui na tela para você!
                </p>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-3 flex items-center gap-2 mt-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/3 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-2.5 px-3 rounded-xl cursor-pointer text-xs uppercase"
                >
                  Voltar
                </button>
                <button
                  id="payments_submit_btn"
                  type="submit"
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all text-center text-xs font-display uppercase tracking-wider"
                >
                  {paymentMethod === 'pix' ? 'Confirmar Pagamento Pix' : 'Pagar com Cartão'}
                </button>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div id="processing_container" className="py-12 flex flex-col items-center space-y-4 text-center">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <Lock className="w-5 h-5 text-emerald-600 absolute" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-gray-900">Processando Pagamento</h3>
                <p className="text-xs text-gray-400">Validando transação com segurança SSL criptografada...</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div id="success_container" className="space-y-6">
              <div className="text-center space-y-2 py-2">
                <div className="inline-flex items-center justify-center bg-emerald-100 p-3 rounded-full mb-1">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-emerald-600">Compra Aprovada! 🎉</h3>
                <p className="text-sm font-semibold text-gray-800">
                  Parabéns, {name || 'Cliente'}!
                </p>
                <p className="text-xs text-gray-500 leading-normal max-w-sm mx-auto">
                  Acabamos de catalogar e enviar os links de acesso para o e-mail <strong className="text-gray-900">{email || 'cadastrado'}</strong> e para o WhatsApp <strong className="text-gray-900">{whatsapp || 'informado'}</strong>.
                </p>
              </div>

              {/* Delivery Section */}
              <div className="border border-emerald-100 bg-emerald-50/40 rounded-2xl p-4 md:p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-emerald-100/60 pb-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Acesso Imediato aos Seus Modelos:</span>
                </div>

                <div className="space-y-3">
                  {deliverables.map((item, idx) => {
                    const isAvailable = selectedPlan.id === 'complete' || item.planRequired === 'basic';
                    return (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                          isAvailable 
                          ? 'border-emerald-100 shadow-xs hover:border-emerald-300' 
                          : 'border-gray-200/50 bg-gray-50/50 opacity-60'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-gray-900">{item.title}</span>
                            {!isAvailable && (
                              <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full uppercase">
                                Exclusivo Completo
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 leading-normal max-w-xs">{item.description}</p>
                        </div>

                        <div>
                          {isAvailable ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 shadow-xs hover:shadow-sm"
                            >
                              {item.type === 'canva' || item.type === 'guide' ? (
                                <>
                                  Abrir no Canva
                                  <ExternalLink className="w-3 h-3" />
                                </>
                              ) : (
                                <>
                                  Baixar PDF
                                  <Download className="w-3 h-3" />
                                </>
                              )}
                            </a>
                          ) : (
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-lg">
                              🔒 Bloqueado
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedPlan.id === 'basic' && (
                  <div className="bg-amber-50 border border-amber-100/60 rounded-xl p-3 flex flex-col space-y-2 mt-2">
                    <span className="text-xs font-bold text-amber-800 block">Deseja os bônus exclusivos por mais R$4,01?</span>
                    <p className="text-[10px] text-amber-700 leading-normal">
                      Você pode fazer o upgrade do seu pedido agora para o **Plano Completo** e liberar os 3 Bônus sensacionais e as Capas Extras na hora!
                    </p>
                    <button
                      type="button"
                      id="upgrade_plan_btn"
                      onClick={() => {
                        onPlanChange('complete');
                        setStep('payment');
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-3 rounded-lg text-xs tracking-wide uppercase transition-all shadow-xs"
                    >
                      Fazer Upgrade por Apenas R$ 4,01
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-center text-center">
                <button
                  type="button"
                  id="final_close_btn"
                  onClick={onClose}
                  className="text-xs text-gray-500 hover:text-gray-900 font-medium underline"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
