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
    <div id="social_proof_container" className="fixed bottom-4 left-4 z-50 pointer-events-none max-w-[280px] sm:max-w-[320px] w-full px-4 sm:px-0">
      <AnimatePresence mode="wait">
        {currentPurchase && (
          <motion.div
            key={currentPurchase.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            id={`purchase_toast_${currentPurchase.id}`}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-emerald-100 flex items-center gap-2.5"
          >
            {/* Pulsing indicator & small icon */}
            <div className="relative w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white"></span>
              </span>
            </div>

            {/* content body: compact details */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-baseline justify-between gap-1">
                <p className="text-xs text-gray-800 font-bold truncate leading-tight">
                  {currentPurchase.name}
                </p>
                <span className="text-[9px] text-gray-400 shrink-0 whitespace-nowrap">
                  {currentPurchase.city.split(' - ')[0]}
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold leading-tight mt-0.5">
                Comprou o Plano Completo <span className="text-gray-400 font-normal text-[10px] whitespace-nowrap">({currentPurchase.timeAgo})</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
