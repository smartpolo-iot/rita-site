
import React from 'react';
import { MenuItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { CategoryIcon } from './Icons';

interface Props {
  item: MenuItem;
  lang: Language;
  onViewReviews?: (item: MenuItem) => void;
}

export const VeggieIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <span className="text-[10px] font-bold tracking-widest font-category">VEGGIE</span>
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9" />
    </svg>
  </div>
);

export const VeganIcon = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <span className="text-[10px] font-bold tracking-widest font-category">VEGAN</span>
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  </div>
);

const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-[#39322c]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ProductCard: React.FC<Props> = ({ item, lang, onViewReviews }) => {
  const t = TRANSLATIONS[lang];

  return (
    /* Changed border-white/60 to border-[#39322c]/15 to match the font color and maintain 2px thickness */
    <div className={`relative p-6 flex flex-col border-b-2 border-[#39322c]/15 transition-all ${!item.available ? 'opacity-40' : ''}`}>

      {item.label && (
        <div className="mb-3">
          <span className="bg-[#39322c] text-[#efdecc] text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest font-category">
            {item.label}
          </span>
        </div>
      )}

      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-grow flex gap-3">
          <div className="text-[#39322c] opacity-30 mt-1 flex-shrink-0">
            <CategoryIcon category={item.category || item.grupo} className="h-5 w-5" />
          </div>
          <div>
            {item.name ? (
              <h3 className="text-2xl font-product font-bold text-[#39322c] uppercase tracking-tight leading-none mb-2">
                {item.name}
                {!item.available && (
                  <span className="block text-[10px] font-bold text-red-800 tracking-[0.1em] mt-1 opacity-100 uppercase">
                    {t.unavailable}
                  </span>
                )}
              </h3>
            ) : !item.available && (
              <span className="block text-[10px] font-bold text-red-800 tracking-[0.1em] mb-2 uppercase">
                {t.unavailable}
              </span>
            )}

            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                {item.veggie && <div title="Vegetariano" className="text-[#39322c]"><VeggieIcon /></div>}
                {item.vegan && <div title="Vegano" className="text-[#39322c]"><VeganIcon /></div>}
              </div>

              {(item.veggie || item.vegan) && <div className="h-3 w-[1px] bg-[#39322c]/20"></div>}

              <button
                onClick={() => onViewReviews?.(item)}
                className="flex items-center gap-1.5 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex text-[#39322c] text-[10px]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.round(item.rating || 0) ? 'opacity-100' : 'opacity-10'}>★</span>
                  ))}
                </div>
                {item.reviewsCount && (
                  <span className="text-[9px] font-bold opacity-30 group-hover:opacity-100 uppercase tracking-widest font-category border-b border-transparent group-hover:border-[#39322c]/30">
                    ({item.reviewsCount})
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xl font-category font-bold whitespace-nowrap text-[#39322c]">
            {/^[0-9., ]+$/.test(item.price) ? `${t.currency} ${item.price}` : item.price}
          </span>
          {item.unit && item.unit !== 'Unidad' && (
            <span className="text-[9px] font-bold opacity-40 uppercase tracking-[0.2em] font-category mt-1 text-[#39322c]">
              {item.unit}
            </span>
          )}
        </div>
      </div>

      <div className="h-[1px] w-6 bg-[#39322c]/10 mb-4"></div>

      <div className="space-y-3">
        {item.ingredients && (
          <p className="text-[19.5px] text-[#39322c]/90 leading-relaxed font-description whitespace-pre-wrap">
            {renderFormattedText(item.ingredients)}
          </p>
        )}

        {item.comment && (
          <p className="text-[17.5px] text-[#39322c]/40 italic font-description leading-snug whitespace-pre-wrap">
            {renderFormattedText(item.comment)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
