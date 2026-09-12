import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { CATEGORIES } from '../data/mockData.ts';
import { Sparkles, Utensils } from 'lucide-react';

interface CategoriesProps {
  onCategorySelect?: () => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const handleSelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    if (onCategorySelect) {
      onCategorySelect();
    }
  };

  return (
    <section className="py-12 bg-white border-b border-stone-200/60" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Flavors</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Popular Food Categories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelect(null)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === null
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              All Cuisines
            </button>
            {selectedCategory && (
              <span className="text-xs text-orange-600 font-semibold">
                Filtering by {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </div>
        </div>

        {/* Categories Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(isSelected ? null : cat.id)}
                className={`group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 border focus:outline-none ${
                  isSelected
                    ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-500/20 scale-[1.02]'
                    : 'bg-stone-50/70 hover:bg-white border-stone-200/80 hover:border-orange-300 hover:shadow-md'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                {/* Round Image Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2.5 rounded-full overflow-hidden shadow-inner border-2 border-white group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 transition-opacity ${
                    isSelected ? 'bg-orange-500/10' : 'bg-black/10 group-hover:opacity-0'
                  }`} />
                </div>

                <span className={`text-xs sm:text-sm font-bold tracking-tight mb-0.5 line-clamp-1 ${
                  isSelected ? 'text-orange-600' : 'text-stone-900 group-hover:text-orange-600'
                }`}>
                  {cat.name}
                </span>

                <span className="text-xs text-stone-400 font-medium">
                  {cat.itemCount}+ items
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
