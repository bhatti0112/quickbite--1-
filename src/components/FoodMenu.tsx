import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { PRODUCTS, RESTAURANTS, CATEGORIES } from '../data/mockData.ts';
import { Product } from '../types.ts';
import { Star, Plus, Flame, UtensilsCrossed, X, SlidersHorizontal, Check } from 'lucide-react';

interface FoodMenuProps {
  onProductClick: (product: Product) => void;
}

export const FoodMenu: React.FC<FoodMenuProps> = ({ onProductClick }) => {
  const { 
    addToCart, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    selectedRestaurantId,
    setSelectedRestaurantId,
    cart
  } = useCart();

  // Filter products based on Category, Search Query, and Restaurant
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category filter
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Restaurant filter
    if (selectedRestaurantId && product.restaurantId !== selectedRestaurantId) {
      return false;
    }

    // Search query filter (matches name, description, cuisine, or restaurant)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesRestaurant = product.restaurantName.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesIngredients = product.ingredients.some(i => i.toLowerCase().includes(q));

      return matchesName || matchesDesc || matchesRestaurant || matchesCategory || matchesIngredients;
    }

    return true;
  });

  const activeRestaurant = RESTAURANTS.find(r => r.id === selectedRestaurantId);
  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section className="py-16 bg-stone-50/70 border-b border-stone-200/60" id="menu-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Cuisine Specialties</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Explore Our Food Menu
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Freshly cooked dishes made with premium ingredients and delivered fast to your table.
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {activeRestaurant && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 border border-orange-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span>Restaurant: {activeRestaurant.name}</span>
                <button 
                  onClick={() => setSelectedRestaurantId(null)}
                  className="hover:text-orange-900 p-0.5"
                  aria-label="Clear restaurant filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {activeCategoryObj && (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span>Category: {activeCategoryObj.name}</span>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="hover:text-amber-900 p-0.5"
                  aria-label="Clear category filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-stone-200 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span>"{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-stone-900 p-0.5"
                  aria-label="Clear search filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {(activeRestaurant || activeCategoryObj || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedRestaurantId(null);
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 underline ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCartCount = cart.find(i => i.product.id === product.id)?.quantity || 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  id={`product-card-${product.id}`}
                >
                  <div>
                    {/* Food Picture Card */}
                    <div 
                      onClick={() => onProductClick(product)}
                      className="relative aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isPopular && (
                          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-current" /> Popular
                          </span>
                        )}
                        {product.isSpicy && (
                          <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">
                            Spicy 🌶️
                          </span>
                        )}
                        {product.isVegetarian && (
                          <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">
                            Veg 🌱
                          </span>
                        )}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{product.rating}</span>
                      </div>

                      {/* Quick view overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          Click for Details & Ingredients
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-5">
                      {/* Restaurant Origin */}
                      <div className="text-xs font-semibold text-orange-600 mb-1">
                        {product.restaurantName}
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onProductClick(product)}
                        className="font-display text-lg font-bold text-stone-900 hover:text-orange-600 cursor-pointer transition-colors leading-tight mb-1.5"
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                        {product.description}
                      </p>

                      {/* Ingredients Pill Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {product.ingredients.slice(0, 3).map((ing) => (
                          <span key={ing} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full">
                            {ing}
                          </span>
                        ))}
                        {product.ingredients.length > 3 && (
                          <span className="text-xs text-stone-400 self-center">
                            +{product.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and Add to Cart Row */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-stone-400 font-semibold block">Price</span>
                      <span className="text-lg font-extrabold text-stone-900 tracking-tight">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {inCartCount > 0 && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                          {inCartCount} in cart
                        </span>
                      )}

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-stone-900 hover:bg-orange-500 text-white font-bold p-2.5 sm:px-3.5 sm:py-2 rounded-xl text-xs transition-all shadow-sm hover:shadow flex items-center gap-1.5 active:scale-95"
                        id={`add-to-cart-${product.id}`}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200/80 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-stone-900 mb-2">No Matching Food Items</h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              We couldn't find any items matching your selected criteria. Try resetting filters or searching for something else.
            </p>
            <button
              onClick={() => {
                setSelectedRestaurantId(null);
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
