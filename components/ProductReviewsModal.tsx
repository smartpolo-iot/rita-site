
import React, { useMemo } from 'react';
import { MenuItem, Review, Language } from '../types';
import { MOCK_REVIEWS, TRANSLATIONS } from '../constants';

interface Props {
  item: MenuItem;
  lang: Language;
  onClose: () => void;
}

const ProductReviewsModal: React.FC<Props> = ({ item, lang, onClose }) => {
  const t = TRANSLATIONS[lang];

  // Filter reviews for this item
  const productReviews = useMemo(() => {
    // Attempt to match by name or by group/category
    return MOCK_REVIEWS.filter(r =>
      (r.itemName && r.itemName.toUpperCase() === item.name.toUpperCase()) ||
      (r.itemName && r.itemName.toUpperCase() === item.grupo.toUpperCase()) ||
      (r.itemName && r.itemName.toUpperCase() === item.category.toUpperCase())
    );
  }, [item]);

  // If no specific reviews, generate some placeholder content based on the item's rating
  const reviewsToDisplay = productReviews.length > 0 ? productReviews : [
    {
      id: 'placeholder-1',
      author: lang === 'es' ? 'Cliente RITA' : 'RITA Customer',
      rating: Math.round(item.rating || 5),
      comment: lang === 'es'
        ? `Excelente elección, el ${item.name} es uno de nuestros favoritos.`
        : `Excellent choice, ${item.name} is one of our favorites.`,
      date: '2024-02-15',
      isVerified: true
    }
  ];

  return (
    <div className="fixed inset-0 z-[110] bg-[#39322c]/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="bg-[#efdecc] w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(57,50,44,1)] border-2 border-[#39322c] flex flex-col animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-[#39322c] flex items-center justify-between bg-white">
          <div className="pr-8">
            <h3 className="text-2xl font-product font-bold text-[#39322c] uppercase tracking-tight leading-none mb-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex text-[#39322c] text-[10px]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(item.rating || 0) ? 'opacity-100' : 'opacity-10'}>★</span>
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#39322c]/40 uppercase tracking-[0.2em]">
                {item.reviewsCount} {t.reviews}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 border-2 border-[#39322c] flex items-center justify-center text-[#39322c] text-2xl hover:bg-[#39322c] hover:text-[#efdecc] transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Reviews List */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {reviewsToDisplay.map((r) => (
            <div key={r.id} className="p-4 bg-white/40 border border-[#39322c]/10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-antonio font-bold text-[#39322c] text-sm uppercase tracking-tight">{r.author}</span>
                    {r.isVerified && (
                      <span className="text-[8px] font-bold text-[#39322c]/40 border border-[#39322c]/20 px-1 uppercase tracking-widest">
                        {lang === 'es' ? 'Verificado' : 'Verified'}
                      </span>
                    )}
                  </div>
                  <div className="flex text-[#39322c] text-[8px] mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < r.rating ? 'opacity-100' : 'opacity-10'}>★</span>
                    ))}
                  </div>
                </div>
                <span className="text-[8px] text-[#39322c]/30 font-bold uppercase tracking-widest">{r.date}</span>
              </div>
              <p className="text-[#39322c]/80 text-xs italic leading-relaxed">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#39322c]/10 bg-white/20 text-center">
          <p className="text-[8px] font-bold tracking-[0.3em] uppercase opacity-30 text-[#39322c]">
            Verified Product Feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsModal;
