
import React, { useState } from 'react';
import { Language, MenuItem } from '../types';
import { THEME } from '../constants';

interface Props {
  onSelect: (lang: Language) => void;
  menuItems: MenuItem[];
  onOpenReviews: () => void;
}

const LanguageLanding: React.FC<Props> = ({ onSelect, onOpenReviews }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      style={{ backgroundColor: THEME.background }}
    >
      {/* Branding Section - Width reduced to match buttons (180px) */}
      <div className="flex flex-col items-center mb-8 animate-in fade-in zoom-in duration-700 w-full max-w-[180px]">
        {/* Logo Container */}
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src="http://www.r2d2.com.ar/varios/RITA_logo.jpg"
              alt="RITA SPECIALTY COFFEE"
              className="w-full h-auto object-contain"
              style={{ maxHeight: '180px' }}
              onError={() => {
                console.warn("External logo failed to load. Falling back to stylized text logo.");
                setImageError(true);
              }}
            />
          ) : (
            /* Fallback Stylized Text Logo - Scaled down to fit 180px */
            <div className="flex flex-col items-center animate-in fade-in duration-500">
              <h1 className="text-6xl font-revoxa font-normal tracking-tight text-[#211d1c] relative leading-none">
                RITA
                <span className="absolute -top-1 -right-4 text-[10px] font-bold border border-[#211d1c] rounded-full w-4 h-4 flex items-center justify-center font-inter">R</span>
              </h1>
            </div>
          )}
        </div>

        {/* Subtitle - Narrowed to fit and tightened */}
        <p className="text-[11px] md:text-xs font-antonio tracking-[0.3em] font-bold uppercase opacity-70 mb-2 mt-1" style={{ color: '#211d1c' }}>
          SPECIALTY COFFEE
        </p>

        {/* Divider Line */}
        <div className="h-[2px] w-12 bg-[#211d1c] opacity-60"></div>
      </div>

      {/* Language Selection Section */}
      <div className="w-full max-w-[180px] flex flex-col items-center">
        {/* MENU Label */}
        <div className="mb-3">
          <p className="text-[9px] font-bold tracking-[0.8em] uppercase opacity-30 text-[#211d1c]">
            MENÚ
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => onSelect('es')}
            className="w-full py-4 border-2 border-[#211d1c] bg-[#211d1c] text-[#efdecc] font-antonio font-bold text-lg tracking-[0.2em] transition-all active:scale-95 shadow-lg"
          >
            ESPAÑOL
          </button>

          <button
            onClick={() => onSelect('en')}
            className="w-full py-4 border-2 border-[#211d1c] text-[#211d1c] font-antonio font-bold text-lg tracking-[0.2em] transition-all active:scale-95"
          >
            ENGLISH
          </button>
        </div>
      </div>

      {/* Reviews Section - Matches 180px width */}
      <div className="mt-8 w-full max-w-[180px]">
        <button
          onClick={onOpenReviews}
          className="group w-full py-5 border border-white/60 bg-transparent text-[#211d1c] flex flex-col items-center justify-center transition-all active:scale-[0.98] hover:border-white hover:bg-white/5"
        >
          <div className="text-[#211d1c] opacity-30 group-hover:opacity-100 transition-opacity mb-1">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span className="font-antonio font-bold text-lg uppercase tracking-[0.3em]">REVIEWS</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-20 mt-0.5 font-inter text-center leading-none">Verified Feedback</span>
        </button>
      </div>

      <div className="mt-6">
        <p className="text-[9px] font-bold tracking-[0.2em] opacity-20 uppercase font-inter">
          Rita Specialty Coffee & Experience
        </p>
      </div>
    </div>
  );
};

export default LanguageLanding;
