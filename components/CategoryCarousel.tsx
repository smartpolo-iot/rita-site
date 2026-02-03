
import React, { useRef, useEffect } from 'react';
import { CategoryIcon } from './Icons';

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryCarousel: React.FC<Props> = ({ categories, activeCategory, onCategoryClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the carousel to keep the active category visible
  useEffect(() => {
    if (activeBtnRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeBtnRef.current;

      const containerWidth = container.offsetWidth;
      const buttonOffset = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      // Center the button in the scroll view
      const scrollPosition = buttonOffset - (containerWidth / 2) + (buttonWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeCategory]);

  return (
    <div className="relative border-t border-[#211d1c]/5">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar scroll-smooth py-3 px-4 gap-2 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              ref={isActive ? activeBtnRef : null}
              onClick={() => onCategoryClick(cat)}
              className={`
                flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-all duration-300
                font-category text-[11px] tracking-widest uppercase
                border-2 ${isActive ? 'bg-[#211d1c] text-[#efdecc] border-[#211d1c]' : 'bg-transparent text-[#211d1c] border-[#211d1c]/10'}
                active:scale-95
              `}
            >
              <CategoryIcon category={cat} className={`h-3 w-3 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gradients for scroll cues */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-50"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50"></div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryCarousel;
