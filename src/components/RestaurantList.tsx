import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { RESTAURANTS } from '../data/mockData.ts';
import { Star, Clock, Bike, ArrowUpRight, Award } from 'lucide-react';

interface RestaurantListProps {
  onViewMenu: (restaurantId: string) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ onViewMenu }) => {
  const { selectedRestaurantId, setSelectedRestaurantId } = useCart();

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurantId(id);
    onViewMenu(id);
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200/60" id="restaurants-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Partner Kitchens</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured US Restaurants
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Hand-selected kitchens with top hygiene ratings, fast prep times, and rave customer reviews.
            </p>
          </div>

          {selectedRestaurantId && (
            <button
              onClick={() => setSelectedRestaurantId(null)}
              className="self-start md:self-auto text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full border border-orange-200 transition-colors"
            >
              Reset Restaurant Filter
            </button>
          )}
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESTAURANTS.map((restaurant) => {
            const isSelected = selectedRestaurantId === restaurant.id;

            return (
              <div
                key={restaurant.id}
                className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-xl'
                    : 'border-stone-200/80 hover:border-stone-300'
                }`}
                id={`restaurant-card-${restaurant.id}`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{restaurant.rating}</span>
                      <span className="text-stone-400 font-normal">({restaurant.reviewCount})</span>
                    </div>

                    {/* Featured / Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                      {restaurant.isFeatured && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                          Top Choice
                        </span>
                      )}
                    </div>

                    {/* Restaurant Name in photo for high-end look */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-display text-2xl font-extrabold tracking-tight drop-shadow-sm">
                        {restaurant.name}
                      </h3>
                      <p className="text-xs text-stone-200 line-clamp-1 drop-shadow-xs">
                        {restaurant.address}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Cuisine Type */}
                    <div className="text-xs font-semibold text-orange-600 mb-3">
                      {restaurant.cuisine}
                    </div>

                    {/* Info Badges */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-stone-100 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bike className="w-4 h-4 text-stone-400 shrink-0" />
                        <span>
                          {restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee.toFixed(2)} Delivery`}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {restaurant.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSelectRestaurant(restaurant.id)}
                    className="w-full bg-stone-900 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group-hover:bg-orange-500 active:scale-98"
                    id={`view-menu-${restaurant.id}`}
                  >
                    <span>View Menu</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
