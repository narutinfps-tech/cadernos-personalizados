import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Flame, 
  Lock, 
  Star, 
  Clock, 
  ChevronLeft,
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
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Plan, Bonus, Review, FAQItem } from './types';
import CheckoutModal from './components/CheckoutModal';
import FAQAccordion from './components/FAQAccordion';
import { InfiniteCarouselRow } from './components/InfiniteCarouselRow';
import SocialProofToast from './components/SocialProofToast';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'complete'>('complete');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [viewers, setViewers] = useState(16);
  const [spotsLeft, setSpotsLeft] = useState(7);

  useEffect(() => {
    // Fluctuating viewers to simulate real-time page traffic
    const viewersInterval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const newVal = prev + delta;
        return Math.max(11, Math.min(26, newVal));
      });
    }, 4500);

    // Progressive countdown of spots left with soft limits to keep tension
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev <= 3) {
          // Occasionally fluctuate/reset to simulate high demand on the last slots
          return Math.random() > 0.82 ? 4 : 3;
        }
        return prev - 1;
      });
    }, 15000);

    return () => {
      clearInterval(viewersInterval);
      clearInterval(spotsInterval);
    };
  }, []);

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
      answer: "Sim. Você tem 7 dias de garantia para testar o material com tranquilidade."
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
  const testimonialImages = [
    "https://i.ibb.co/bgf6r0wz/Design-sem-nome.png",
    "https://i.ibb.co/v4hL5mSw/Chat-GPT-Image-29-de-mai-de-2026-20-41-50.png",
    "https://i.ibb.co/8n9KnV4Z/Chat-GPT-Image-29-de-mai-de-2026-20-39-40.png"
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
      finalPrice: "GRÁTIS",
      image: "https://i.ibb.co/BHBX7JDR/Chat-GPT-Image-29-de-mai-de-2026-20-18-58.png"
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
      finalPrice: "GRÁTIS",
      image: "https://i.ibb.co/W4xZ6bt1/Chat-GPT-Image-29-de-mai-de-2026-20-27-29.png"
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
      finalPrice: "GRÁTIS",
      image: "https://i.ibb.co/67FWZsWm/Chat-GPT-Image-29-de-mai-de-2026-20-23-23.png"
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
          <span className="uppercase font-extrabold tracking-widest leading-normal">
            ⚡ Oferta Especial Disponível Apenas Hoje - {formattedToday}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <header id="hero_section" className="relative overflow-hidden bg-white pt-8 pb-16 md:py-24 border-b border-gray-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Centered Content Column */}
            <div className="w-full space-y-6 text-center flex flex-col items-center">
              
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

              <div id="subheadline_mockup" className="pt-3 pb-2 flex justify-center overflow-hidden">
                <img
                  src="https://i.ibb.co/Gf9RQv2x/0e5bb497-93b5-4572-a81b-738ffbcaae97.png"
                  alt="Mockup Capas de Caderno Canva"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply select-none"
                />
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-center">
                Personalize em poucos minutos, envie para impressão e atenda seus clientes com muito mais agilidade, sem começar do zero e sem depender de designer.
              </p>

              {/* Highlights Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2 text-left">
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
              <div className="pt-4 space-y-3 max-w-sm mx-auto w-full">
                <button
                  type="button"
                  id="hero_primary_cta_btn"
                  onClick={() => handleOpenCheckout('complete')}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-base md:text-lg py-4 px-8 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wide group"
                >
                  ACESSAR AGORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 bg-gold-500 rounded-full animate-ping shrink-0" />
                  Você recebe tudo na hora, direto no seu e-mail e WhatsApp.
                </p>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* How it Works Section */}
      <section id="how_it_works_section" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Modelos Editáveis</span>
            <h2 id="section_how_works_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              VEJA NOSSOS MODELOS PRONTOS DE CAPAS DE CADERNO
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Estes são alguns dos mais de 400 modelos incríveis que você vai receber prontos para editar no Canva.
            </p>
          </div>

          {/* Infinite Scroll Showcase with Two Horizontal Rows */}
          <div className="w-full overflow-hidden relative flex flex-col gap-6 py-6 select-none">
            {/* Left Fade Gradient overlay */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            {/* Right Fade Gradient overlay */}
            <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            {/* Row 1 - Scrolls Left & supports touch drag */}
            <InfiniteCarouselRow
              direction="left"
              speed={0.8}
              heightClass="h-56 sm:h-72 md:h-80 lg:h-[360px]"
              images={[
                "https://i.ibb.co/zhhkckWL/Pokemon.jpg",
                "https://i.ibb.co/VYfbx71Z/Capirava-2.jpg",
                "https://i.ibb.co/Tq706PPY/Autismo-F.jpg",
                "https://i.ibb.co/93d8BR37/Autismo-F-2.jpg",
                "https://i.ibb.co/nNXzQMf3/Astronauta-1.jpg",
                "https://i.ibb.co/XxrgQJdt/Chat-GPT-Image-29-de-mai-de-2026-18-10-18-6.png",
                "https://i.ibb.co/BHP0cRR6/Chat-GPT-Image-29-de-mai-de-2026-18-10-17-4.png",
                "https://i.ibb.co/s9Tm7ZB3/Chat-GPT-Image-29-de-mai-de-2026-18-10-17-5.png"
              ]}
            />

            {/* Row 2 - Scrolls Right & supports touch drag */}
            <InfiniteCarouselRow
              direction="right"
              speed={0.8}
              heightClass="h-56 sm:h-72 md:h-80 lg:h-[360px]"
              images={[
                "https://i.ibb.co/hFMk90tF/vasco.jpg",
                "https://i.ibb.co/xtFQPfrW/patrulha-canina.jpg",
                "https://i.ibb.co/Kcn3Pshn/panda.jpg",
                "https://i.ibb.co/1YstQMXY/naruto.jpg",
                "https://i.ibb.co/cXsSdGqb/Chat-GPT-Image-29-de-mai-de-2026-18-10-15-3.png",
                "https://i.ibb.co/fzRjNtWf/Chat-GPT-Image-29-de-mai-de-2026-18-10-15-1.png",
                "https://i.ibb.co/jvV03mq1/Chat-GPT-Image-29-de-mai-de-2026-18-10-15-2.png"
              ]}
            />
          </div>

          {/* Bridge transition styling to Canva Editor view */}
          <div className="my-10 max-w-4xl mx-auto text-center px-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />
            <div className="relative inline-block bg-slate-50 px-6 sm:px-8 py-3 rounded-full border border-slate-200/50 shadow-sm z-10">
              <span className="flex items-center justify-center gap-2 text-indigo-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                Dê uma espiada nos modelos por dentro do Canva!
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
              </span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <h3 id="section_canva_editor_subtitle" className="font-display font-extrabold text-xl md:text-2xl text-gray-800 tracking-tight uppercase">
              Modelos de Designers Reais 100% Organizados
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
              Veja o layout profissional com camadas bem organizadas, fontes editáveis e designs projetados milimetricamente para um acabamento perfeito na impressão.
            </p>
          </div>

          {/* Second Infinite Scroll Carousel - Canva Internals with 2 columns/tracks */}
          <div className="w-full overflow-hidden relative flex flex-col gap-6 py-6 select-none bg-slate-100/35 rounded-3xl border border-slate-200/30">
            {/* Left Fade Gradient overlay */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            {/* Right Fade Gradient overlay */}
            <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            {/* Row 1 - Scrolls Left */}
            <InfiniteCarouselRow
              direction="left"
              speed={0.7}
              heightClass="h-64 sm:h-80 md:h-[360px] lg:h-[450px]"
              images={[
                "https://i.ibb.co/391CYnDC/01.webp",
                "https://i.ibb.co/zTBxPtpW/02.webp",
                "https://i.ibb.co/Z61CtRvd/03.webp",
                "https://i.ibb.co/S7fTLKZf/04.webp"
              ]}
            />

            {/* Row 2 - Scrolls Right */}
            <InfiniteCarouselRow
              direction="right"
              speed={0.7}
              heightClass="h-64 sm:h-80 md:h-[360px] lg:h-[450px]"
              images={[
                "https://i.ibb.co/93z52bPX/05.webp",
                "https://i.ibb.co/KjbMk8tC/06.webp",
                "https://i.ibb.co/RTj4KK7G/07.webp",
                "https://i.ibb.co/tMvm95s3/08.webp"
              ]}
            />
          </div>

          <div className="text-center mt-12 space-y-6 px-2">
            <p className="font-semibold text-sm sm:text-base md:text-lg text-gold-850 bg-gold-50/70 inline-block py-2.5 px-5 sm:px-6 rounded-full border border-gold-200/55 max-w-full">
              Tudo já vem pronto e editável para facilitar sua rotina e te ajudar a vender rápido.
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
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 text-center">
              <h3 className="font-display font-bold text-xl text-gray-900">Mais tempo livre ou mais vendas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Você para de perder horas criando capas repetidas do zero. Com modelos prontos, você só adapta e entrega.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 text-center">
              <h3 className="font-display font-bold text-xl text-gray-900">Dá conta de mais encomendas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pedidos pequenos também tomam tempo quando você precisa começar tudo do zero. Com o pack, você consegue atender mais clientes com menos esforço.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 text-center">
              <h3 className="font-display font-bold text-xl text-gray-900">Mais segurança na personalização</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Os modelos já vêm prontos para editar no Canva. Você só troca as informações necessárias e mantém o visual profissional.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 lg:col-span-1 text-center">
              <h3 className="font-display font-bold text-xl text-gray-900">Menos retrabalho</h3>
              <div className="space-y-1.5 text-gray-600 text-sm flex flex-col items-center">
                <p>• Menos tempo ajustando layout.</p>
                <p>• Menos dor de cabeça com cliente.</p>
                <p>• Menos bloqueio criativo na hora de criar.</p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4 lg:col-span-2 text-center">
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
            
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Quer ganhar tempo e parar de criar capas do zero</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Os pedidos chegam, o cliente pede uma capa simples, e mesmo assim você perde tempo montando tudo. Com os modelos prontos, você só personaliza e agiliza a entrega.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-pink-100 text-pink-700 rounded-2xl flex items-center justify-center shrink-0">
                <Printer className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Trabalha com papelaria personalizada ou gráfica rápida</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Se você vende personalizados, encadernação, cadernos escolares ou materiais impressos, esse pack pode te ajudar a ter mais opções prontas para mostrar e vender.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 shrink-0" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-gray-900 leading-snug">Não domina design, mas quer entregar algo bonito</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Você não precisa criar layouts do zero. Os modelos já vêm prontos para editar no Canva, com visual colorido, infantil e profissional.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shrink-0">
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

      {/* Infinite Carousel below Ideal For Profiles */}
      <section id="profiles_carousel_section" className="py-6 bg-white overflow-hidden">
        <div className="w-full overflow-hidden relative flex flex-col gap-6 py-2 select-none">
          {/* Left Fade Gradient overlay */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Right Fade Gradient overlay */}
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Row 1 - Scrolls Left */}
          <InfiniteCarouselRow
            direction="left"
            speed={0.7}
            heightClass="h-44 sm:h-52 md:h-60"
            images={[
              "https://i.ibb.co/4gFJy5C3/Chat-GPT-Image-29-de-mai-de-2026-21-23-48-10.png",
              "https://i.ibb.co/V06TDZrF/Chat-GPT-Image-29-de-mai-de-2026-21-23-47-8.png",
              "https://i.ibb.co/C3gZMYh1/Chat-GPT-Image-29-de-mai-de-2026-21-23-47-9.png",
              "https://i.ibb.co/5JP0S8J/Chat-GPT-Image-29-de-mai-de-2026-21-23-46-5.png",
              "https://i.ibb.co/KchwTzrm/Chat-GPT-Image-29-de-mai-de-2026-21-23-46-6.png",
              "https://i.ibb.co/KjK2Qc91/Chat-GPT-Image-29-de-mai-de-2026-21-23-46-7.png"
            ]}
          />
          
          {/* Row 2 - Scrolls Right */}
          <InfiniteCarouselRow
            direction="right"
            speed={0.7}
            heightClass="h-44 sm:h-52 md:h-60"
            images={[
              "https://i.ibb.co/hRf1hBcr/Chat-GPT-Image-29-de-mai-de-2026-21-23-45-2.png",
              "https://i.ibb.co/Cprb4xSW/Chat-GPT-Image-29-de-mai-de-2026-21-23-45-3.png",
              "https://i.ibb.co/QvtH2zk2/Chat-GPT-Image-29-de-mai-de-2026-21-23-46-4.png",
              "https://i.ibb.co/4RvJSQFX/Chat-GPT-Image-29-de-mai-de-2026-21-23-45-1.png",
              "https://i.ibb.co/9k0sVqwc/Chat-GPT-Image-29-de-mai-de-2026-21-21-03-2.png",
              "https://i.ibb.co/0NkXBNy/Chat-GPT-Image-29-de-mai-de-2026-21-21-04-3.png"
            ]}
          />
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

                  {bonus.image && (
                    <div className="w-full mt-2 bg-slate-50/50 rounded-2xl p-1 border border-slate-100/60 flex items-center justify-center overflow-hidden">
                      <img 
                        src={bonus.image} 
                        alt={bonus.title} 
                        referrerPolicy="no-referrer"
                        className="max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>
                  )}

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

                  {/* Urgency Indicators */}
                  <div className="flex flex-1 items-center justify-center gap-2 mt-3 text-[11px] font-semibold">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                      <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{viewers} vendo agora</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 font-bold px-2.5 py-1 rounded-full animate-pulse whitespace-nowrap">
                      <span>Restam {spotsLeft} unidades</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  id="checkout_basic_btn"
                  onClick={() => handleOpenCheckout('basic')}
                  className="w-full bg-slate-900 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] text-white font-black py-4.5 sm:py-5 px-6 rounded-2xl cursor-pointer transition-all uppercase text-sm sm:text-base tracking-widest shadow-lg"
                >
                  {plans[0].cta}
                </button>
              </div>
            </div>

            {/* Plan 2: Completo (Bônus included) */}
            <div id="plan_card_complete" className="bg-white rounded-3xl border-2 border-amber-400 p-6 md:p-8 flex flex-col justify-between shadow-2xl shadow-amber-200/30 relative md:scale-102 hover:scale-[1.01] transition-all overflow-visible mt-6 md:mt-0">
              
              {/* Elegant floating badge pill centered at the very top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-350 to-gold-500 text-slate-950 text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-full shadow-md border border-gold-300 flex items-center gap-1.5 z-10 whitespace-nowrap leading-none">
                <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse fill-red-500 shrink-0" />
                <span>{plans[1].badge}</span>
              </div>

              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h3 className="font-display font-black text-xl text-amber-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5 leading-none">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    {plans[1].name.replace('⚡ ', '')}
                  </h3>
                  <p className="text-gray-900 text-sm font-extrabold leading-snug mt-2 text-center md:text-left">
                    {plans[1].subtitle}
                  </p>
                </div>

                <div className="space-y-3.5 pt-1">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block text-center md:text-left">
                    O que inclui + bônus:
                  </span>
                  <div className="space-y-2.5">
                    {plans[1].features.map((feat, idx) => {
                      const isNew = idx >= 3 && idx <= 5; // index of bonus items
                      if (isNew) {
                        return (
                          <div key={idx} className="flex items-start gap-3 bg-amber-50/60 p-3 rounded-2xl border border-amber-200/45 transition-all hover:bg-amber-100/40">
                            <div className="shrink-0 p-1 bg-amber-100 text-amber-700 font-bold rounded-lg mt-0.5 shadow-xs">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            </div>
                            <div className="space-y-1 text-left">
                              <span className="text-xs text-amber-950 font-bold block leading-snug">
                                {feat.includes(' — ') ? feat.split(' — ')[0] : feat}
                              </span>
                              {feat.includes(' — ') && (
                                <span className="text-[11px] text-slate-600 block leading-normal font-medium">
                                  {feat.split(' — ')[1]}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="flex items-start gap-2.5 px-1 py-0.5 text-left">
                          <div className="shrink-0 p-0.5 bg-emerald-50 text-emerald-600 rounded-full mt-0.5 border border-emerald-100">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-xs text-slate-750 font-semibold leading-normal">{feat}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <div className="text-center">
                  <span className="text-xs text-slate-400 line-through block mb-0.5 font-bold">{plans[1].originalPrice}</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Por apenas:</span>
                    <span className="font-display font-black text-4xl text-amber-500">{plans[1].price}</span>
                  </div>

                  {/* Urgency Indicators */}
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] font-semibold">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full whitespace-nowrap border border-amber-100/40">
                      <Eye className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{viewers + 3} vendo agora</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-650 px-2.5 py-1 rounded-full animate-pulse whitespace-nowrap">
                      <span className="text-red-600 font-bold">Restam {spotsLeft - 3 >= 2 ? spotsLeft - 3 : 2} unidades</span>
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50/45 border border-amber-200/40 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-amber-900 font-semibold leading-relaxed">
                    {plans[1].notes}
                  </p>
                </div>

                <button
                  type="button"
                  id="checkout_complete_btn"
                  onClick={() => handleOpenCheckout('complete')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.03] active:scale-[0.98] text-white font-black py-4.5 sm:py-5 px-6 rounded-2xl cursor-pointer transition-all uppercase text-sm sm:text-base tracking-widest shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 border-none"
                >
                  <Sparkles className="w-5 h-5 shrink-0 text-white animate-pulse" />
                  <span>{plans[1].cta}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Social Proof Section (Reviews Showcase) */}
      <section id="reviews_section" className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Clientes Reais</span>
            <h2 id="reviews_section_title" className="font-display font-extrabold text-2xl md:text-4xl text-gray-900 tracking-tight">
              VEJA O QUE NOSSAS CLIENTES ESTÃO DIZENDO
            </h2>
          </div>

          {/* Image Carousel */}
          <div className="relative max-w-sm mx-auto px-8">
            {/* Main Carousel Card Container  */}
            <div className="relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentReviewIndex}
                  src={testimonialImages[currentReviewIndex]}
                  alt={`Depoimento ${currentReviewIndex + 1}`}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="max-h-[360px] md:max-h-[420px] w-auto object-contain"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={() => setCurrentReviewIndex((prev) => (prev === 0 ? testimonialImages.length - 1 : prev - 1))}
                className="absolute -left-1 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none flex items-center justify-center z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentReviewIndex((prev) => (prev === testimonialImages.length - 1 ? 0 : prev + 1))}
                className="absolute -right-1 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none flex items-center justify-center z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Pagination Indicator / Dots */}
            <div className="flex justify-center items-center gap-2 mt-5">
              {testimonialImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentReviewIndex 
                      ? "w-7 bg-indigo-600 shadow-xs" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
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
              <ShieldCheck className="w-11 h-11 text-gold-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 bg-gold-400 text-slate-900 font-bold text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">7 dias</div>
            </div>
          </div>

          <h2 id="guarantee_title" className="font-display font-extrabold text-2xl md:text-4xl text-sky-950">
            GARANTIA DE 7 DIAS — RISCO ZERO PARA VOCÊ
          </h2>

          <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4 max-w-xl mx-auto font-semibold">
            <p>Você não precisa decidir no escuro.</p>
            <p>Após a compra, você tem 7 dias para acessar o material, testar os modelos, personalizar no Canva e ver se ele realmente facilita sua rotina.</p>
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

      <SocialProofToast />

    </div>
  );
}
