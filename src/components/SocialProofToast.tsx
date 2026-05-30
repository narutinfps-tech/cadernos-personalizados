import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag } from 'lucide-react';

interface Purchase {
  id: number;
  name: string;
  city: string;
  timeAgo: string;
}

const BRAZILIAN_NAMES = [
  'Mariana Silva', 'Roberto Mendes', 'Amanda Fonseca', 'Carlos Duarte', 
  'Camila Lima', 'Felipe Gomes', 'Beatriz Costa', 'Thiago Alves', 
  'Juliana Moretti', 'Lucas Pinheiro', 'Sofia Rodrigues', 'Daniela Souza', 
  'Rodrigo Teixeira', 'Vanessa Santos', 'Pedro Henrique', 'Aline Vieira',
  'Gabriela Rocha', 'Marcelo Antunes', 'Larissa Cavalcanti', 'Vitor Rezende'
];

const CITIES = [
  'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 
  'Curitiba - PR', 'Salvador - BA', 'Porto Alegre - RS', 'Brasília - DF', 
  'Fortaleza - CE', 'Recife - PE', 'Goiânia - GO', 'Campinas - SP', 
  'Vitória - ES', 'Florianópolis - SC', 'Belém - PA', 'Niterói - RJ'
];

const TIMES = [
  'há poucos segundos', 'há 12 segundos', 'há 1 minuto', 'agora mesmo', 
  'há 45 segundos', 'há 30 segundos'
];

export default function SocialProofToast() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    // Show first toast after 3 seconds
    const initialTimeout = setTimeout(() => {
      triggerNewToast();
    }, 3000);

    const interval = setInterval(() => {
      triggerNewToast();
    }, 12000); // Trigger a toast every 12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerNewToast = () => {
    const randomName = BRAZILIAN_NAMES[Math.floor(Math.random() * BRAZILIAN_NAMES.length)];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomTime = TIMES[Math.floor(Math.random() * TIMES.length)];

    setCurrentPurchase({
      id: Date.now(),
      name: randomName,
      city: randomCity,
      timeAgo: randomTime,
    });

    // Auto dismiss after 5.5 seconds
    setTimeout(() => {
      setCurrentPurchase(null);
    }, 5500);
  };

  return (
    <div id="social_proof_container" className="fixed bottom-4 left-4 z-50 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence mode="wait">
        {currentPurchase && (
          <motion.div
            key={currentPurchase.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            id={`purchase_toast_${currentPurchase.id}`}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-100 flex items-center gap-3.5"
          >
            {/* Pulsing indicator & icon */}
            <div className="relative w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            {/* content body */}
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-xs text-gray-400 font-medium">Inscrição confirmada!</p>
              <p className="text-sm text-gray-800 font-bold leading-snug truncate mt-0.5">
                {currentPurchase.name}
              </p>
              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-emerald-600">acabou de comprar o Plano Completo</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400 text-[10px] whitespace-nowrap">{currentPurchase.city}</span>
              </p>
            </div>

            {/* Dynamic time badge */}
            <div className="text-[10px] text-emerald-600/80 bg-emerald-50 px-2.5 py-1 rounded-full font-bold whitespace-nowrap shrink-0 self-start mt-0.5">
              {currentPurchase.timeAgo}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
