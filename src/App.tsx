import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Flame, 
  Lock, 
  Star, 
  Clock, 
  ChevronRight, 
  Check, 
  Gift, 
  Share2, 
  BookOpen, 
  FileCheck, 
  FolderPlus, 
  Layout, 
  Printer, 
  Edit3, 
  Eye, 
  Maximize2,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Plan, Bonus, Review, FAQItem } from './types';
import CheckoutModal from './components/CheckoutModal';
import FAQAccordion from './components/FAQAccordion';

const mockupNotebooks = '/src/assets/images/mockup_notebooks_1780084514295.png';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'complete'>('complete');

  // FAQ Data from the prompt
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Preciso saber design para usar as capas?",
      answer: "Não. Os modelos já estão prontos. Você só precisa abrir no Canva e personalizar as informações como nome, turma, cores ou detalhes do cliente."
    },
    {
      id: 2,
      question: "Em qual programa eu edito?",
      answer: "Você edita tudo pelo Canva. Não precisa instalar programa pesado nem contratar designer."
    },
    {
      id: 3,
      question: "O acesso é imediato?",
      answer: "Sim. Após a compra, você recebe as informações de acesso para começar a usar o material."
    },
    {
      id: 4,
      question: "Posso usar as capas para vender aos meus clientes?",
      answer: "Sim. O material foi pensado justamente para quem trabalha com papelaria, gráfica, encadernação e personalizados."
    },
    {
      id: 5,
      question: "Funciona para quais tipos de caderno?",
      answer: "O pack inclui modelos variados para diferentes tipos de caderno, como brochura, brochurão e caderno de desenho."
    },
    {
      id: 6,
      question: "Vou receber os arquivos para download?",
      answer: "Você recebe acesso aos modelos editáveis no Canva e poderá personalizar e baixar os arquivos conforme sua necessidade."
    },
    {
      id: 7,
      question: "E se eu tiver dificuldade?",
      answer: "Você terá acesso ao guia rápido de uso, que mostra como personalizar os modelos de forma simples."
    },
    {
      id: 8,
      question: "Existe garantia?",
      answer: "Sim. Você tem 15 dias de garantia para testar o material com tranquilidade."
    }
  ];

  // Pricing Plans Data from the prompt
  const plans: Plan[] = [
    {
      id: 'basic',
      name: "PLANO BÁSICO",
      subtitle: "400 Capas de Caderno Editáveis no Canva",
      popular: false,
      originalPrice: "De R$47,90",
      price: "R$5,99",
      features: [
        "400 capas prontas e editáveis",
        "Modelos para personalizar no Canva",
        "Capas organizadas por tema",
        "Acesso imediato",
        "Ideal para quem quer começar agora"
      ],
      cta: "QUERO SOMENTE O BÁSICO"
    },
    {
      id: 'complete',
      name: "⚡ PLANO COMPLETO",
      badge: "MAIS VENDIDO",
      subtitle: "400 Capas de Caderno Editáveis no Canva + Bônus Exclusivos",
      popular: true,
      originalPrice: "De R$67,90",
      price: "R$10,00",
      features: [
        "400 capas prontas e editáveis",
        "Modelos para brochura, brochurão e desenho",
        "Capas organizadas por tema e estilo",
        "Bônus #1 — Guia rápido de personalização no Canva",
        "Bônus #2 — Checklist antes de enviar para impressão",
        "Bônus #3 — Capas extras mais pedidas",
        "Acesso imediato",
        "Ideal para quem quer usar com mais segurança e praticidade"
      ],
      cta: "QUERO O PLANO COMPLETO",
      notes: "Por só R$4,01 a mais, você leva todos os bônus e o material completo para usar com muito mais facilidade."
    }
  ];

  // Client Testimonials from the prompt
  const reviews: Review[] = [
    {
      id: 1,
      text: "“Comprei mais pelo preço, mas acabei me surpreendendo. As capas são bem bonitas e consegui editar no Canva sem dificuldade.”",
      author: "Patrícia",
      role: "Papelaria personalizada"
    },
    {
      id: 2,
      text: "“Eu perdia muito tempo criando capa simples do zero. Agora só escolho o modelo, troco o nome e já mando a prévia para o cliente.”",
      author: "Renata",
      role: "Personalizados escolares"
    },
    {
      id: 3,
      text: "“Gostei porque tem bastante variedade. Dá para usar como base e adaptar para vários tipos de pedido.”",
      author: "Camila",
      role: "Gráfica rápida"
    },
    {
      id: 4,
      text: "“Não sou designer, então pra mim ajudou bastante. Consegui personalizar as capas sem ficar travando no Canva.”",
      author: "Juliana",
      role: "Mãe empreendedora"
    }
  ];

  // Bonuses from the prompt
  const bonuses: Bonus[] = [
    {
      id: 1,
      number: "01",
      title: "BÔNUS #1 — Guia rápido para editar suas capas no Canva",
      description: "Um passo a passo simples para você entender como abrir, editar e personalizar os modelos.",
      points: [
        "Mostra como trocar nome e turma",
        "Ensina como ajustar elementos no Canva",
        "Ideal para quem ainda não tem muita prática",
        "Ajuda você a usar o material com mais segurança"
      ],
      originalPrice: "Valor: R$27",
      finalPrice: "GRÁTIS"
    },
    {
      id: 2,
      number: "02",
      title: "BÔNUS #2 — Checklist antes de enviar para impressão",
      description: "Antes de mandar para a gráfica, confira os principais pontos para evitar erros.",
      points: [
        "Ajuda a revisar o arquivo",
        "Evita esquecer detalhes importantes",
        "Reduz retrabalho",
        "Facilita sua rotina de atendimento"
      ],
      originalPrice: "Valor: R$27",
      finalPrice: "GRÁTIS"
    },
    {
      id: 3,
      number: "03",
      title: "BÔNUS #3 — Capas extras mais pedidas",
      description: "Uma seleção especial de modelos com temas populares para aumentar suas opções de venda.",
      points: [
        "Mais variedade para oferecer",
        "Mais opções para seus clientes escolherem",
        "Modelos prontos para personalizar",
        "Ideal para pedidos rápidos"
      ],
      originalPrice: "Valor: R$27",
      finalPrice: "GRÁTIS"
    }
  ];

  const handleOpenCheckout = (planId: 'basic' | 'complete') => {
    if (planId === 'basic') {
      window.location.href = 'https://pay.wiapy.com/DgU7b_71Xb';
    } else {
      window.location.href = 'https://pay.wiapy.com/6CXeKT_B3';
    }
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1];

  const formattedToday = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div id="sales_page" className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Urgency / Trust Top Banner Header */}
      <div id="top_crisis_banner" className="bg-red-600 text-white text-xs sm:text-sm font-bold tracking-wider text-center py-2.5 sm:py-3 px-4 shadow-sm flex items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 font-display flex-wrap justify-center">
          <Flame className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
          <span className="uppercase font-extrabold tracking-widest leading-normal">
            ⚡ Oferta Especial Disponível Apenas Hoje - {formattedToday}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <header id="hero_section" className="relative overflow-hidden bg-white pt-8 pb-16 md:py-24 border-b border-gray-100">
        
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-teal-200/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                Compra 100% Segura e Protegida
              </div>

              <h1 id="hero_main_title" className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-5.5xl text-gray-900 leading-tight lg:leading-none tracking-tight">
                <span className="text-gold-gradient block lg:inline">400 CAPAS DE CADERNO</span> PERSONALIZADAS EM MINUTOS COM MODELOS PRONTOS NO CANVA
              </h1>

              <div className="pt-1">
                <p className="font-display font-bold text-sm sm:text-base md:text-lg text-gold-700 bg-gold-100/70 py-2.5 px-4 sm:px-5 rounded-2xl border border-gold-200 inline-block max-w-full shadow-xs leading-normal">
                  Editáveis no Canva e prontas para personalizar, imprimir e vender.
                </p>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Personalize em poucos minutos, envie para impressão e atenda seus clientes com muito mais agilidade, sem começar do zero e sem depender de designer.
              </p>

              {/* Highlights Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2 text-left">
                {[
                  "Modelos prontos para editar",
                  "Capas organizadas por tema e estilo",
                  "Prontas para personalizar no Canva",
                  "Ideal para papelarias, gráficas e personalizados"
                ].map((txt, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl sm:bg-transparent sm:p-0">
                    <div className="flex-shrink-0 bg-emerald-100 text-emerald-800 p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug">{txt}</span>
                  </div>
                ))}
              </div>

              {/* Hero Call to Action Buttons */}
              <div className="pt-4 space-y-3 max-w-sm mx-auto lg:mx-0">
                <button
                  type="button"
                  id="hero_primary_cta_btn"
                  onClick={() => handleOpenCheckout('complete')}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base md:text-lg py-4 px-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wide group"
                >
                  ACESSAR AGORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-gray-500 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1">
                  <span className="inline-block w-2 h-2 bg-gold-500 rounded-full animate-ping shrink-0" />
                  Você recebe tudo na hora, direto no seu e-mail e WhatsApp.
                </p>
              </div>

            </div>

            {/* Right Mockup Graphic Column */}
            <div className="lg:col-span-5 flex justify-center relative mt-10 lg:mt-0 pb-8 lg:pb-0 px-2 sm:px-0">
              <div className="relative w-full max-w-md">
                
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-coral-100 to-indigo-100 rounded-3xl -rotate-3 scale-[1.03] opacity-60 filter blur-xs" />
                
                {/* Simulated App Mockup Body */}
                <div id="mockup_image_frame" className="relative bg-white p-3 rounded-3xl shadow-xl border border-gray-100 overflow-hidden group">
                  <img
                    src={mockupNotebooks}
                    alt="Coleção de Capas de Caderno Editáveis"
                    className="w-full h-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Interactive Badge */}
                  <div className="absolute top-6 right-6 bg-indigo-600 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>+400 Modelos de Capas</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 bg-white border border-emerald-100 text-slate-800 text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-slate-900">Garantia Incondicional de 15 Dias</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* How it Works Section */}
      <section id="how_it_works_section" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Fluxo Ilustrado</span>
            <h2 id="section_how_works_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              VEJA COMO FUNCIONAM AS CAPAS DE CADERNO PRONTAS NO CANVA
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Com esse pack, você não precisa criar capa por capa do zero.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 relative">
            
            {/* Step 1 */}
            <div id="step_1" className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-row md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:border-indigo-200 transition-all text-left">
              <span className="font-mono text-2xl md:text-3xl font-black text-indigo-500/30 md:absolute md:top-4 md:right-4 shrink-0 leading-none">01</span>
              <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Layout className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">Você abre o Canva.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div id="step_2" className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-row md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:border-indigo-200 transition-all text-left">
              <span className="font-mono text-2xl md:text-3xl font-black text-indigo-500/30 md:absolute md:top-4 md:right-4 shrink-0 leading-none">02</span>
              <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Eye className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">Escolhe o modelo.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div id="step_3" className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-row md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:border-indigo-200 transition-all text-left">
              <span className="font-mono text-2xl md:text-3xl font-black text-indigo-500/30 md:absolute md:top-4 md:right-4 shrink-0 leading-none">03</span>
              <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Edit3 className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">Personaliza com nome, turma ou tema.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div id="step_4" className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-row md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:border-indigo-200 transition-all text-left">
              <span className="font-mono text-2xl md:text-3xl font-black text-indigo-500/30 md:absolute md:top-4 md:right-4 shrink-0 leading-none">04</span>
              <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Printer className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">Baixa o arquivo.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div id="step_5" className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 shadow-xs relative flex flex-row md:flex-col items-center md:items-start gap-4 md:space-y-4 hover:border-gold-300 transition-all text-left">
              <span className="font-mono text-2xl md:text-3xl font-black text-gold-500/30 md:absolute md:top-4 md:right-4 shrink-0 leading-none">05</span>
              <div className="p-2.5 sm:p-3 bg-gold-50 text-gold-600 rounded-xl shrink-0">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base leading-tight">E envia para impressão.</p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12 space-y-6 px-2">
            <p className="font-semibold text-sm sm:text-base md:text-lg text-gold-850 bg-gold-50/70 inline-block py-2.5 px-5 sm:px-6 rounded-full border border-gold-200/55 max-w-full">
              Tudo já vem organizado para facilitar sua rotina e te ajudar a entregar mais rápido.
            </p>

            <div>
              <button
                type="button"
                id="how_works_cta_btn"
                onClick={() => handleOpenCheckout('complete')}
                className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base py-4 px-8 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 uppercase tracking-wide"
              >
                QUERO AS CAPAS PERSONALIZADAS
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits section */}
      <section id="benefits_section" className="py-16 md:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Produtividade & Lucro</span>
            <h2 id="section_benefits_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              MAIS TEMPO, MENOS ESTRESSE E MUITO MAIS AGILIDADE NO SEU DIA A DIA
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4">
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest block font-mono">VANTAGEM 01</span>
              <h3 className="font-display font-bold text-xl text-gray-900">Mais tempo livre ou mais vendas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Você para de perder horas criando capas repetidas do zero. Com modelos prontos, você só adapta e entrega.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4">
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest block font-mono">VANTAGEM 02</span>
              <h3 className="font-display font-bold text-xl text-gray-900">Dá conta de mais encomendas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pedidos pequenos também tomam tempo quando você precisa começar tudo do zero. Com o pack, você consegue atender mais clientes com menos esforço.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4">
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest block font-mono">VANTAGEM 03</span>
              <h3 className="font-display font-bold text-xl text-gray-900">Mais segurança na personalização</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Os modelos já vêm prontos para editar no Canva. Você só troca as informações necessárias e mantém o visual profissional.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 lg:col-span-1">
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest block font-mono">VANTAGEM 04</span>
              <h3 className="font-display font-bold text-xl text-gray-900">Menos retrabalho</h3>
              <div className="space-y-1.5 text-gray-600 text-sm">
                <p>• Menos tempo ajustando layout.</p>
                <p>• Menos dor de cabeça com cliente.</p>
                <p>• Menos bloqueio criativo na hora de criar.</p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 lg:col-span-2">
              <span className="text-xs font-extrabold text-indigo-500 uppercase tracking-widest block font-mono">VANTAGEM 05</span>
              <h3 className="font-display font-bold text-xl text-gray-900">Independência de designer</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mesmo sem dominar design, você consegue criar capas bonitas, organizadas e com aparência profissional.
              </p>
            </div>

          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              id="benefits_cta_btn"
              onClick={() => handleOpenCheckout('complete')}
              className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base py-4 px-8 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 uppercase tracking-wide"
            >
              QUERO AS CAPAS PERSONALIZADAS
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Opp Cost Section */}
      <section id="opportunity_cost_section" className="py-16 md:py-24 bg-emerald-50 text-slate-800 relative overflow-hidden border-y border-emerald-100">
        
        {/* Soft background glow decoration */}
        <div className="absolute inset-0 bg-radial-gradient from-emerald-100/60 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 px-4 py-2 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <AlertTriangle className="w-4.5 h-4.5 text-emerald-600" />
            Não Deixe o Tempo Passar
          </div>

          <h2 id="opp_cost_title" className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 leading-tight">
            QUANTO TEMPO E QUANTOS PEDIDOS VOCÊ VAI PERDER POR NÃO TER ESSAS CAPAS PRONTAS?
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Enquanto você cria tudo do zero, outras pessoas já estão personalizando, enviando a prévia e fechando pedidos.
          </p>

          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl mx-auto border border-emerald-200/80 text-left space-y-4 shadow-sm">
            <span className="font-display font-bold text-emerald-800 uppercase block tracking-wider text-xs">Com esse material, você consegue:</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Atender mais pedidos",
                "Entregar mais rápido",
                "Trabalhar com menos estresse",
                "Ter mais variedade para oferecer",
                "Personalizar capas mesmo sem ser designer"
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 text-emerald-600">
                    <CheckCircle className="w-5 h-5 fill-emerald-100" />
                  </span>
                  <span className="text-slate-700 text-xs md:text-sm font-semibold">{txt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              id="opp_cost_cta_btn"
              onClick={() => handleOpenCheckout('complete')}
              className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base md:text-lg py-4.5 px-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-101 transition-all inline-flex items-center gap-2 uppercase tracking-wide animate-pulse"
            >
              QUERO ACESSAR AGORA E USAR HOJE
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Audience section: Ideal For */}
      <section id="ideal_for_section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Perfis Recomendados</span>
            <h2 id="section_ideal_for_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              ESSE MATERIAL É IDEAL PARA VOCÊ QUE…
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                <Clock className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Quer ganhar tempo e parar de criar capas do zero</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Os pedidos chegam, o cliente pede uma capa simples, e mesmo assim você perde tempo montando tudo. Com os modelos prontos, você só personaliza e agiliza a entrega.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-pink-100 text-pink-700 rounded-2xl">
                <Printer className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Trabalha com papelaria personalizada ou gráfica rápida</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Se você vende personalizados, encadernação, cadernos escolares ou materiais impressos, esse pack pode te ajudar a ter mais opções prontas para mostrar e vender.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <Sparkles className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Não domina design, mas quer entregar algo bonito</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Você não precisa criar layouts do zero. Os modelos já vêm prontos para editar no Canva, com visual colorido, infantil e profissional.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex gap-4 items-start">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                <FolderPlus className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Precisa de variedade para atender clientes diferentes</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  São mais de 400 modelos com estilos variados para você ter opções para meninos, meninas, temas escolares, bichinhos, espaço, futebol, desenhos, capas fofas e muito mais.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* What you Receive Section */}
      <section id="what_you_receive_section" className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 px-3.5 py-1 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
              ⚡ ACESSO IMEDIATO
            </div>
            <h2 id="receive_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              TUDO O QUE VOCÊ VAI RECEBER
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-md space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "+ de 400 capas de caderno prontas e editáveis no Canva",
                "Modelos para caderno brochura",
                "Modelos para caderno brochurão",
                "Modelos para caderno de desenho",
                "Capas organizadas por tema e estilo",
                "Capas infantis, escolares, fofas, criativas e coloridas",
                "Modelos prontos para personalização",
                "Arquivos editáveis no Canva",
                "Ideal para imprimir, vender ou usar com clientes",
                "Acesso rápido após a compra"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-emerald-100 text-emerald-800 rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <span className="text-gray-700 font-medium text-xs md:text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 text-center">
              <p className="text-sm font-semibold text-indigo-600 leading-normal">
                Você recebe tudo de forma prática para começar a usar ainda hoje.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Bonus Area */}
      <section id="bonus_section" className="py-16 md:py-24 bg-gradient-to-b from-orange-50 via-orange-50/55 to-white text-gray-800 relative border-y border-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 bg-gold-450/20 text-orange-850 border border-orange-300/40 px-3.5 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider">
              🔥 3 BÔNUS EXCLUSIVOS
            </span>
            <h2 id="bonus_section_title" className="font-display font-extrabold text-3xl md:text-4xl text-orange-950">
              E NÃO PARA POR AÍ… TEM MAIS!
            </h2>
            <p className="text-orange-900/90 text-base font-medium">Você também vai receber:</p>
          </div>

          {/* Bonus Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {bonuses.map((bonus) => (
              <div 
                key={bonus.id} 
                id={`bonus_card_${bonus.id}`}
                className="bg-white border border-orange-100 rounded-3xl p-6 relative flex flex-col justify-between hover:border-gold-400/80 hover:shadow-lg transition-all shadow-sm group"
              >
                
                {/* Visual Circle number badge */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-gold-400 text-slate-900 font-bold flex items-center justify-center rounded-xl text-sm font-display shadow-md">
                  #{bonus.number}
                </div>

                <div className="space-y-4">
                  {bonus.id === 1 && <BookOpen className="w-10 h-10 text-orange-500" />}
                  {bonus.id === 2 && <FileCheck className="w-10 h-10 text-orange-500" />}
                  {bonus.id === 3 && <Sparkles className="w-10 h-10 text-orange-500" />}

                  <h3 className="font-display font-black text-lg text-slate-900 leading-tight group-hover:text-orange-700 transition-colors">
                    {bonus.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed font-normal">
                    {bonus.description}
                  </p>

                  <div className="space-y-2 border-t border-orange-100/75 pt-4 pb-2">
                    {bonus.points.map((pt, index) => (
                      <div key={index} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-[11px] leading-snug font-semibold">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <div className="flex items-center justify-between bg-orange-50/40 rounded-xl px-4 py-2 border border-orange-100/60">
                    <span className="text-gray-400 text-xs line-through font-normal">{bonus.originalPrice}</span>
                    <span className="text-orange-850 text-xs font-bold uppercase bg-orange-200/60 px-2.5 py-1 rounded-full">{bonus.finalPrice}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing / CTA Selector Section */}
      <section id="pricing_section" className="py-16 md:py-24 bg-slate-50 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold-700 bg-gold-100 px-3.5 py-1.5 rounded-full">Garanta Seu Desconto</span>
            <h2 id="pricing_section_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              ESCOLHA A MELHOR OPÇÃO PARA VOCÊ
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Plan 1: Básico */}
            <div id="plan_card_basic" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all relative">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-gray-500 uppercase tracking-widest block font-mono">PLANO BÁSICO</h3>
                  <p className="text-gray-800 text-sm font-semibold leading-snug mt-1">400 Capas de Caderno Editáveis no Canva</p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">O que inclui:</span>
                  {plans[0].features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="shrink-0 bg-gray-100 text-gray-600 p-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-600 text-xs font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <div className="text-center">
                  <span className="text-xs text-gray-400 line-through block mb-0.5">{plans[0].originalPrice} Por apenas:</span>
                  <span className="font-display font-black text-4xl text-gray-900">{plans[0].price}</span>
                </div>

                <button
                  type="button"
                  id="checkout_basic_btn"
                  onClick={() => handleOpenCheckout('basic')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-2xl cursor-pointer transition-all uppercase text-xs tracking-wider"
                >
                  {plans[0].cta}
                </button>
              </div>
            </div>

            {/* Plan 2: Completo (Bônus included) */}
            <div id="plan_card_complete" className="bg-white rounded-3xl border-2 border-gold-400 p-6 md:p-8 flex flex-col justify-between shadow-xl relative md:scale-102 hover:scale-[1.01] transition-all overflow-hidden mt-4 md:mt-0">
              
              {/* Highlight Ribbon Ribbon Badge */}
              <div className="absolute top-0 right-0 bg-gold-400 text-slate-950 text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-bl-xl shadow-xs">
                {plans[1].badge}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-black text-lg text-gold-600 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                    {plans[1].name}
                  </h3>
                  <p className="text-gray-900 text-sm font-bold leading-snug mt-1.5">
                    {plans[1].subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider block">O que inclui + bônus:</span>
                  {plans[1].features.map((feat, idx) => {
                    const isNew = idx >= 3 && idx <= 5; // index of bonus items
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`shrink-0 p-0.5 rounded-full mt-0.5 ${isNew ? 'bg-gold-100 text-gold-700 font-bold' : 'bg-gold-50 text-gold-600'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={`text-xs ${isNew ? 'text-gold-950 font-bold' : 'text-slate-600'}`}>{feat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <div className="text-center">
                  <span className="text-xs text-gray-400 line-through block mb-0.5">{plans[1].originalPrice} Por apenas:</span>
                  <span className="font-display font-black text-4xl text-gold-500">{plans[1].price}</span>
                </div>

                <div className="bg-gold-50/70 border border-gold-200/50 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-gold-900 font-medium leading-relaxed">
                    {plans[1].notes}
                  </p>
                </div>

                <button
                  type="button"
                  id="checkout_complete_btn"
                  onClick={() => handleOpenCheckout('complete')}
                  className="w-full bg-gold-400 hover:bg-gold-500 hover:scale-101 text-slate-950 font-bold py-3.5 px-4 rounded-2xl cursor-pointer transition-all uppercase text-xs tracking-wider shadow-md focus:ring-4 focus:ring-gold-100"
                >
                  {plans[1].cta}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Social Proof Section (Reviews) */}
      <section id="reviews_section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Clientes Reais</span>
            <h2 id="reviews_section_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              VEJA O QUE NOSSAS CLIENTES ESTÃO DIZENDO
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                id={`review_card_${rev.id}`}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-4 shadow-xs"
              >
                
                {/* Visual Mock Ratings */}
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-gray-700 text-xs md:text-sm italic leading-relaxed">
                  {rev.text}
                </p>

                <div className="border-t border-gray-200/60 pt-3">
                  <span className="font-bold text-gray-900 text-xs md:text-sm block">{rev.author}</span>
                  <span className="text-gray-500 text-[11px] uppercase font-semibold tracking-wider font-mono">{rev.role}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section id="guarantee_section" className="py-16 md:py-24 bg-sky-50 text-slate-800 relative overflow-hidden border-t border-sky-100">
        
        {/* Soft background sphere */}
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex justify-center">
            {/* Graphic Badge */}
            <div className="w-20 h-20 bg-gold-450/25 text-gold-600 border border-gold-300/40 rounded-3xl flex items-center justify-center shadow-lg relative">
              <Calendar className="w-10 h-10 text-gold-600" />
              <div className="absolute -top-1 -right-1 bg-gold-400 text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">15 dias</div>
            </div>
          </div>

          <h2 id="guarantee_title" className="font-display font-extrabold text-2xl md:text-4xl text-sky-950">
            GARANTIA DE 15 DIAS — RISCO ZERO PARA VOCÊ
          </h2>

          <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4 max-w-xl mx-auto font-semibold">
            <p>Você não precisa decidir no escuro.</p>
            <p>Após a compra, você tem 15 dias para acessar o material, testar os modelos, personalizar no Canva e ver se ele realmente facilita sua rotina.</p>
            <p>Se por qualquer motivo você sentir que não é para você, é só solicitar o reembolso dentro do prazo da garantia.</p>
          </div>

          <div className="text-sky-700 font-bold text-sm font-sans tracking-wide space-y-1">
            <p className="no-underline">Sem burocracia.</p>
            <p className="no-underline">Sem complicação.</p>
            <p className="no-underline">Sem dor de cabeça.</p>
          </div>

          <p className="text-gold-600 font-black text-lg md:text-xl font-display">
            O risco fica com a gente, não com você.
          </p>

          <div className="pt-2">
            <button
              type="button"
              id="guarantee_cta_btn"
              onClick={() => handleOpenCheckout('complete')}
              className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base py-4 px-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all uppercase tracking-wide inline-flex items-center gap-1.5"
            >
              QUERO ACESSAR AGORA
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq_section" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Dúvidas Frequentes</span>
            <h2 id="faq_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              PERGUNTAS FREQUENTES
            </h2>
          </div>

          <FAQAccordion items={faqItems} />

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 text-slate-505 text-xs py-10 text-center px-4">
        <p className="max-w-md mx-auto text-[11px] leading-relaxed text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Capas de Caderno Canva. Todos os direitos reservados. Canva é uma marca registrada de Canva Pty Ltd. Esta página não possui qualquer filiação formal com o Canva.
        </p>
      </footer>

      {/* Simulated Interactive Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            selectedPlan={selectedPlan}
            onPlanChange={(planId) => setSelectedPlanId(planId)}
            plans={plans}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
