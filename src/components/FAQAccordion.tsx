import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQItem } from '../types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq_accordion_wrapper" className="space-y-3 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id}
            id={`faq_item_${item.id}`}
            className="bg-white rounded-2xl border border-coral-100 shadow-xs hover:shadow-md transition-all overflow-hidden"
          >
            <button
              type="button"
              id={`faq_trigger_${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-sans cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                <span className="font-semibold text-gray-800 text-sm md:text-base leading-tight">
                  {item.question}
                </span>
              </div>
              <span className="text-gray-400 shrink-0">
                {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-500" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-gray-50/80 text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
