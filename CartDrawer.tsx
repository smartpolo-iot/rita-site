
import React from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS, THEME } from '../constants';
import { formatPrice } from '../services/sheetService';

interface Props {
  items: CartItem[];
  lang: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<Props> = ({ items, lang, onUpdateQuantity, onClose, onCheckout }) => {
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
  // Fix: Parse string price to number for calculation by removing thousand separators and converting decimal comma
  const total = items.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/\./g, '').replace(',', '.')) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl font-dosis animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-4xl font-condensed font-bold text-teal-600 uppercase tracking-tighter">{t.orderSummary}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 text-4xl leading-none">&times;</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 italic">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-2xl font-condensed uppercase tracking-widest">{t.emptyCart}</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex flex-col shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-condensed font-bold text-2xl text-gray-800 uppercase tracking-tight leading-none mb-1">{item.name}</h4>
                    <p className="text-teal-600 font-bold text-xl">
                      {/^[0-9., ]+$/.test(item.price) ? `${t.currency} ${item.price}` : item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl shadow-inner border border-gray-100 ml-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-2xl font-bold active:scale-90"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-2xl font-bold active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>

                {item.comment && (
                  <div className="mt-2 p-3 bg-white/50 border border-teal-100 rounded-lg italic text-gray-600 text-sm">
                    <span className="font-bold text-teal-600 not-italic mr-1 text-xs uppercase">Note:</span>
                    "{item.comment}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-8">
            <span className="text-3xl font-condensed font-bold text-gray-400 uppercase tracking-widest">{t.total}</span>
            <span className="text-4xl font-condensed font-bold text-teal-600">{t.currency} {formatPrice(total)}</span>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full py-6 rounded-2xl text-2xl font-condensed font-bold uppercase tracking-[0.2em] shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              style={{ backgroundColor: THEME.accent, color: THEME.textDark }}
            >
              {t.checkout}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 text-teal-600 font-condensed font-bold text-xl uppercase tracking-widest"
            >
              {t.continueOrdering}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
