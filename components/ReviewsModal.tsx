
import React, { useState, useEffect } from 'react';
import { Language, MenuItem, Review } from '../types';
import { TRANSLATIONS, REVIEWS_API_URL, MOCK_REVIEWS } from '../constants';

interface Props {
  lang: Language;
  onClose: () => void;
  menuItems: MenuItem[];
}

const STORAGE_KEY = 'rita_custom_reviews';

const ReviewsModal: React.FC<Props> = ({ lang, onClose, menuItems }) => {
  const t = TRANSLATIONS[lang];
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [receiptCode, setReceiptCode] = useState('');

  // Fetch reviews from API or fallback
  const loadReviews = async () => {
    setIsLoading(true);
    try {
      if (REVIEWS_API_URL) {
        const response = await fetch(REVIEWS_API_URL);
        const data = await response.json();
        if (Array.isArray(data)) {
          // Merge API reviews with Mock reviews
          setReviews([...data, ...MOCK_REVIEWS]);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("API Fetch failed, using local storage fallback", e);
    }

    // Fallback: LocalStorage
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
      itemName: selectedItem || undefined,
      isVerified: true
    };

    try {
      if (REVIEWS_API_URL) {
        // Send to Google Apps Script
        await fetch(REVIEWS_API_URL, {
          method: 'POST',
          body: JSON.stringify(newReview),
        });
      } else {
        // Just simulate if no URL set
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Update Local State immediately for responsiveness
      setReviews([newReview, ...reviews]);

      // Save to LocalStorage as backup
      const saved = localStorage.getItem(STORAGE_KEY);
      const customReviews = saved ? JSON.parse(saved) : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newReview, ...customReviews]));

      setShowForm(false);
      resetForm();
    } catch (error) {
      alert(lang === 'es' ? 'Error al guardar. Intenta de nuevo.' : 'Error saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setNewComment('');
    setNewName('');
    setSelectedItem('');
    setReceiptCode('');
    setNewRating(5);
  };

  const avgRating = (reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0");

  return (
    <div className="fixed inset-0 z-[100] bg-[#39322c]/60 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
      <div
        className="bg-[#efdecc] w-full max-w-2xl h-full md:h-auto md:max-h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border-x-0 md:border-2 border-[#39322c]"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b-2 border-[#39322c] flex items-center justify-between bg-white">
          <div>
            <h2 className="text-4xl font-antonio font-bold text-[#39322c] uppercase tracking-tighter leading-none">
              {t.reviews}
            </h2>
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
          <div className="flex items-center gap-4">
            {isLoading && (
              <div className="w-4 h-4 border-2 border-[#39322c] border-t-transparent animate-spin rounded-full"></div>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 border-2 border-[#39322c] flex items-center justify-center text-[#39322c] text-2xl hover:bg-[#39322c] hover:text-[#efdecc] transition-colors active:scale-95"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8">
          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-white border-2 border-[#39322c] p-6 space-y-6 animate-in slide-in-from-top duration-300 shadow-[6px_6px_0px_0px_rgba(57,50,44,1)]">
              <div className="flex justify-between items-center border-b border-[#39322c]/10 pb-4">
                <h3 className="font-antonio font-bold text-lg uppercase tracking-widest text-[#39322c]">
                  {lang === 'es' ? 'VALIDAR TICKET' : 'VALIDATE TICKET'}
                </h3>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setShowForm(false)}
                  className="text-[#39322c] text-[10px] font-bold uppercase tracking-widest border-b border-[#39322c] disabled:opacity-30"
                >
                  {lang === 'es' ? 'CANCELAR' : 'CANCEL'}
                </button>
              </div>

              <div className="bg-[#39322c]/5 p-4 border-l-4 border-[#39322c]">
                <p className="text-[10px] leading-relaxed text-[#39322c] font-inter font-bold uppercase tracking-wider">
                  {lang === 'es'
                    ? 'Para garantizar la autenticidad, se requiere el código de 8 dígitos de su ticket.'
                    : 'To ensure authenticity, the 8-digit code from your receipt is required.'}
                </p>
              </div>

              <div className="flex gap-4 justify-center py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={isSaving}
                    onClick={() => setNewRating(star)}
                    className={`text-4xl transition-transform active:scale-90 ${newRating >= star ? 'text-[#39322c] opacity-100' : 'text-[#39322c] opacity-20'}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#39322c]/40 uppercase tracking-widest ml-1">
                      {lang === 'es' ? 'NOMBRE' : 'NAME'} *
                    </label>
                    <input
                      type="text"
                      disabled={isSaving}
                      className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c] font-lexend text-sm disabled:opacity-50"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[9px] font-bold uppercase tracking-widest ml-1 ${receiptCode && !isCodeValid ? 'text-red-600' : 'text-[#39322c]/40'}`}>
                      {lang === 'es' ? 'CÓDIGO (8 DÍGITOS)' : 'CODE (8 DIGITS)'} *
                    </label>
                    <input
                      type="text"
                      disabled={isSaving}
                      inputMode="numeric"
                      maxLength={8}
                      placeholder="e.g. 12345678"
                      className={`w-full px-4 py-3 border-2 bg-[#efdecc]/5 focus:outline-none font-lexend text-sm ${receiptCode && !isCodeValid ? 'border-red-300' : 'border-[#39322c]/20 focus:border-[#39322c]'} disabled:opacity-50`}
                      value={receiptCode}
                      onChange={(e) => setReceiptCode(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#39322c]/40 uppercase tracking-widest ml-1">
                    {lang === 'es' ? 'PRODUCTO (OPCIONAL)' : 'PRODUCT (OPTIONAL)'}
                  </label>
                  <select
                    disabled={isSaving}
                    className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c] font-lexend text-sm appearance-none disabled:opacity-50"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    <option value="">{lang === 'es' ? 'Opinión General' : 'General Review'}</option>
                    {menuItems.map(item => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#39322c]/40 uppercase tracking-widest ml-1">
                    {lang === 'es' ? 'TU COMENTARIO' : 'YOUR COMMENT'} *
                  </label>
                  <textarea
                    disabled={isSaving}
                    className="w-full px-4 py-3 border-2 border-[#39322c]/20 bg-[#efdecc]/5 focus:outline-none focus:border-[#39322c] font-lexend text-sm min-h-[100px] disabled:opacity-50"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isCodeValid || !newComment || !newName || isSaving}
                className="w-full py-5 bg-[#39322c] text-[#efdecc] font-antonio font-bold text-xl uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#efdecc] border-t-transparent animate-spin rounded-full"></div>
                    {lang === 'es' ? 'GUARDANDO...' : 'SAVING...'}
                  </>
                ) : (
                  lang === 'es' ? 'PUBLICAR RESEÑA' : 'POST REVIEW'
                )}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="group w-full py-10 border border-white/60 bg-transparent text-[#39322c] flex flex-col items-center justify-center transition-all active:scale-[0.98] hover:border-white hover:bg-white/5"
            >
              <span className="font-antonio font-bold text-3xl uppercase tracking-widest mb-2">+ {lang === 'es' ? 'ESCRIBIR RESEÑA' : 'WRITE A REVIEW'}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
                {lang === 'es' ? 'SE REQUIERE TICKET DE COMPRA' : 'RECEIPT REQUIRED'}
              </span>
            </button>
          )}

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 text-center font-antonio text-[#39322c]">
              {lang === 'es' ? 'FEEDBACK DE NUESTROS CLIENTES' : 'CUSTOMER FEEDBACK'}
            </h4>

            <div className="space-y-4 pb-12">
              {reviews.map((r) => (
                <div key={r.id} className="p-6 bg-transparent border border-white/60 backdrop-blur-[2px] relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-antonio font-bold text-[#39322c] text-xl uppercase tracking-tight">{r.author}</span>
                        {r.isVerified && (
                          <div className="flex items-center gap-1.5 bg-[#39322c] px-2 py-0.5" title="Compra Verificada">
                            <span className="text-[#efdecc] text-[9px]">✓</span>
                            <span className="text-[8px] font-bold text-[#efdecc] uppercase tracking-wider font-antonio">
                              {lang === 'es' ? 'COMPRA VERIFICADA' : 'VERIFIED PURCHASE'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex text-[#39322c] text-[10px]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < r.rating ? 'opacity-100' : 'opacity-10'}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] text-[#39322c]/30 font-bold uppercase tracking-widest font-inter">{r.date}</span>
                  </div>

                  {r.itemName && (
                    <div className="mb-3">
                      <span className="inline-block px-2 py-0.5 bg-white/30 border border-white/40 text-[#39322c] text-[9px] font-bold uppercase tracking-widest">
                        {r.itemName}
                      </span>
                    </div>
                  )}

                  <p className="text-[#39322c]/80 font-inter leading-relaxed text-sm italic">
                    "{r.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/10 border-t border-white/20 text-center">
          <p className="text-[8px] font-bold tracking-[0.3em] uppercase opacity-30 font-inter text-[#39322c]">
            Rita Specialty Coffee & Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
