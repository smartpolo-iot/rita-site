
import React from 'react';

interface IconProps {
  category: string;
  className?: string;
}

export const normalizeStr = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();

export const CategoryIcon: React.FC<IconProps> = ({ category, className = "h-6 w-6" }) => {
  const norm = normalizeStr(category);
  const stroke = "currentColor";
  const sWidth = "1.5";

  // Specific check for "TO GO" / "LLEVAR" coffee
  if (norm.includes('LLEVAR') || norm.includes('TO GO')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        {/* Cup Body */}
        <path d="M17 8L15.5 21H8.5L7 8" />
        {/* Lid */}
        <path d="M6 8H18L17.5 5H6.5L6 8Z" />
        {/* Lid Top Detail */}
        <path d="M10 3H14" />
      </svg>
    );
  }

  if (norm.includes('CAFE')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
        <path d="M6 2v2M10 2v2M14 2v2" />
      </svg>
    );
  }
  if (norm.includes('ESPECIALES')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    );
  }
  if (norm.includes('BEBIDAS')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M6 3h12l-1 15a2 2 0 01-2 2H9a2 2 0 01-2-2L6 3z" />
        <path d="M6 7h12M12 20V10" />
      </svg>
    );
  }
  if (norm.includes('TE')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M12 3v11a4 4 0 004 4h1a3 3 0 000-6h-1a2 2 0 01-2-2V3z" />
        <path d="M12 11h.01M9 11h.01M6 11h.01" />
      </svg>
    );
  }
  if (norm.includes('DESAYUNA')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
  if (norm.includes('ALMORZA')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M7 2v10M10 2v10M4 2v10M7 12v10M17 2v10a3 3 0 01-3 3h-1v7" />
      </svg>
    );
  }
  if (norm.includes('BRUNCHEA')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      </svg>
    );
  }
  if (norm.includes('SALADOS')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M3 18c1.5-2 3-3 9-3s7.5 1 9 3v1H3v-1z" />
        <path d="M6 15c0-4 3-7 6-7s6 3 6 7" />
        <path d="M12 8V4m0 0a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    );
  }
  if (norm.includes('DULCES') || norm.includes('PASTELERIA')) {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
        <path d="M20 21H4a2 2 0 01-2-2V9a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" />
        <path d="M2 13h20M12 7V3" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke={stroke} strokeWidth={sWidth}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};
