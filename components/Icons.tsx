
import React, { useState, useEffect } from 'react';
import { Language, Review } from '../types';
import { TRANSLATIONS, REVIEWS_API_URL, MOCK_REVIEWS } from '../constants';

interface Props {
  lang: Language;
  onClose: () => void;
}

const STORAGE_KEY = 'rita_custom_reviews';

const ReviewsModal: React.FC<Props> = ({ lang, onClose }) => {
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [receiptCode, setReceiptCode] = useState('');

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      if (REVIEWS_API_URL) {
        const response = await fetch(REVIEWS_API_URL);
        const data = await response.json();
        if (Array.isArray(data)) {
          setReviews([...data, ...MOCK_REVIEWS]);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("API Fetch failed, using local fallback");
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...MOCK_REVIEWS]);
      } catch (e) {
        setReviews(MOCK_REVIEWS);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const isCodeValid = /^\d{8}$/.test(receiptCode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeValid || isSaving) return;

    setIsSaving(true);

    const newReview: Review = {
      id: Date.now().toString(),
      author: newName || 'Anónimo',
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('en-CA'),
      isVerified: true
    };

    try {
      if (REVIEWS_API_URL) {
        await fetch(REVIEWS_API_URL, {
          method: 'POST',
          body: JSON.stringify(newReview),
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setReviews([newReview, ...reviews]);
      const saved = localStorage.getItem(STORAGE_KEY);
      const customReviews = saved ? JSON.parse(saved) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newReview, ...customReviews]));

      setShowForm(false);
      setNewComment('');
      setNewName('');
      setReceiptCode('');
      setNewRating(5);
    } catch (error) {
      alert(lang === 'es' ? 'Error al guardar.' : 'Error saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const avgRating = (reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0");

  return (
    <div className="fixed inset-0 z-[100] bg-[#39322c]/60 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
      <div className="bg-[#efdecc] w-full max-w-2xl h-full md:h-auto md:max-h-[92vh] shadow-2xl flex flex-col overflow-hidden border-x-0 md:border-2 border-[#39322c]">
        {/* Header */}
        <div className="p-6 md:p-8 border-b-2 border-[#39322c] flex items-center justify-between bg-white">
          <div>
            <h2 className="text-4xl font-antonio font-bold text-[#39322c] uppercase tracking-tighter leading-none">{t.reviews}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-antonio font-bold text-[#39322c]">{avgRating}</span>
              <div className="flex text-[#39322c] text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(Number(avgRating)) ? 'opacity-100' : 'opacity-20'}>★</span>
                ))}
              </div>
              <span className="text-[10px] font-bold text-[#39322c]/40 uppercase tracking-[0.2em]">({reviews.length})</span>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 border-2 border-[#39322c] flex items-center justify-center text-[#39322c] text-2xl active:scale-95">&times;</button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-white border-2 border-[#39322c] p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(57,50,44,1)]">
              <div className="flex justify-between items-center border-b border-[#39322c]/10 pb-4">
                <h3 className="font-antonio font-bold text-lg uppercase tracking-widest text-[#39322c]">
                  {lang === 'es' ? 'VALIDAR TICKET' : 'VALIDATE TICKET'}
                </h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-[#39322c] text-[10px] font-bold uppercase tracking-widest border-b border-[#39322c]">
                  {lang === 'es' ? 'CANCELAR' : 'CANCEL'}
                </button>
              </div>

              <div className="flex gap-4 justify-center py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setNewRating(star)} className={`text-4xl ${newRating >= star ? 'opacity-100' : 'opacity-20'}`}>★</button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={lang === 'es' ? 'NOMBRE' : 'NAME'}
                    className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c]"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder={lang === 'es' ? 'CÓDIGO TICKET (8 DÍGITOS)' : 'TICKET CODE (8 DIGITS)'}
                    className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c]"
                    value={receiptCode}
                    onChange={(e) => setReceiptCode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
                <textarea
                  placeholder={lang === 'es' ? 'TU COMENTARIO' : 'YOUR COMMENT'}
                  className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c] min-h-[100px]"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isCodeValid || !newComment || !newName || isSaving}
                className="w-full py-5 bg-[#39322c] text-[#efdecc] font-antonio font-bold text-xl uppercase tracking-[0.2em] disabled:opacity-20"
              >
                {isSaving ? (lang === 'es' ? 'GUARDANDO...' : 'SAVING...') : (lang === 'es' ? 'PUBLICAR' : 'POST')}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-10 border border-[#39322c]/20 text-[#39322c] flex flex-col items-center justify-center hover:bg-white/10"
            >
              <span className="font-antonio font-bold text-3xl uppercase tracking-widest mb-1">+ {lang === 'es' ? 'ESCRIBIR RESEÑA' : 'WRITE A REVIEW'}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">{lang === 'es' ? 'SE REQUIERE TICKET' : 'RECEIPT REQUIRED'}</span>
            </button>
          )}

          <div className="space-y-6 pb-12">
            {reviews.map((r) => (
              <div key={r.id} className="p-6 border border-[#39322c]/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-antonio font-bold text-[#39322c] text-xl uppercase tracking-tight">{r.author}</span>
                      {r.isVerified && <span className="bg-[#39322c] text-[#efdecc] text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest font-antonio">VERIFICADO</span>}
                    </div>
                    <div className="flex text-[#39322c] text-[10px]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < r.rating ? 'opacity-100' : 'opacity-10'}>★</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] text-[#39322c]/30 font-bold uppercase tracking-widest">{r.date}</span>
                </div>
                <p className="text-[#39322c]/80 leading-relaxed text-sm italic">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
