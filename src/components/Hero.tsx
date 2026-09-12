import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { US_CITIES } from '../data/mockData.ts';
import { Search, MapPin, ArrowRight, Sparkles, Clock, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onExploreRestaurants: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreRestaurants }) => {
  const { searchQuery, setSearchQuery, selectedCity, setSelectedCity } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderNow();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-stone-50/30 pt-8 pb-16 lg:py-20">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs sm:text-sm font-semibold tracking-wide border border-orange-200 shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>Fastest US Food Delivery Network</span>
            </div>

            {/* Main Prompt-Specified Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Delicious food <br className="hidden sm:block" />
              delivered <span className="text-orange-500 underline decoration-amber-400 decoration-wavy decoration-2">to your door</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Order handcrafted burgers, artisanal pizzas, fresh sushi, and wholesome bowls from the highest-rated local kitchens in your city. Delivered piping hot in 25–35 minutes.
            </p>

            {/* City & Search Combined Interactive Box */}
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-stone-200/60 border border-stone-200/80 max-w-xl mx-auto lg:mx-0 transition-all hover:border-stone-300"
              id="hero-search-form"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                {/* Location selector dropdown */}
                <div className="relative flex items-center bg-stone-50 rounded-xl px-3 py-2 border border-stone-200/70 sm:w-44 shrink-0">
                  <MapPin className="w-4 h-4 text-orange-500 mr-2 shrink-0" />
                  <select
                    value={selectedCity.name}
                    onChange={(e) => {
                      const found = US_CITIES.find(c => c.name === e.target.value);
                      if (found) setSelectedCity(found);
                    }}
                    className="bg-transparent text-xs sm:text-sm font-bold text-stone-800 focus:outline-none w-full cursor-pointer"
                    id="hero-city-select"
                    aria-label="Select delivery city"
                  >
                    {US_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search input */}
                <div className="relative flex-1 flex items-center bg-stone-50 rounded-xl px-3 py-2 border border-stone-200/70">
                  <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for restaurants, dishes, or cuisines"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none w-full"
                    id="hero-search-input"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                  id="hero-search-btn"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Prompt Requested CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-lg shadow-stone-900/15 hover:shadow-xl transition-all flex items-center gap-2 group active:scale-95"
                id="hero-order-now-btn"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreRestaurants}
                className="bg-white hover:bg-stone-100 text-stone-800 font-bold px-6 py-3.5 rounded-xl text-base border border-stone-200 shadow-sm hover:shadow transition-all active:scale-95"
                id="hero-explore-restaurants-btn"
              >
                Explore Restaurants
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-stone-700">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold leading-none">25–35 Min</div>
                  <div className="text-xs text-stone-600">Average Delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-700">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold leading-none">4.9 / 5.0</div>
                  <div className="text-xs text-stone-600">Over 50K Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold leading-none">100% Fresh</div>
                  <div className="text-xs text-stone-600">Quality Guarantee</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Column - Attractive Food Photography Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Food Photo Hero Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-400/40 border-4 border-white aspect-[4/3] sm:aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  alt="Delicious gourmet dishes on restaurant table"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg mb-1.5 shadow-sm">
                    Today's Top Pick
                  </span>
                  <div className="text-lg font-bold">Artisan Craft Kitchens</div>
                  <div className="text-xs text-stone-200">Prepared fresh upon order with local organic ingredients</div>
                </div>
              </div>

              {/* Floating Badge 1: Delivery Time */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-600">Express Courier</div>
                  <div className="text-sm font-bold text-stone-900">20-30 min delivery</div>
                </div>
              </div>

              {/* Floating Badge 2: Featured Burger */}
              <div className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-stone-200 flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80"
                  alt="Burger thumbnail"
                  className="w-11 h-11 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-900">Classic Cheeseburger</span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">$12.99</span>
                  </div>
                  <div className="text-xs text-stone-600 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>4.9 (420+ reviews)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
