import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Award, Utensils, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-stone-200/60" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Chef plating artisan food in modern kitchen"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
                  Our Culinary Mission
                </span>
                <div className="text-xl font-bold font-display leading-tight">
                  Empowering independent neighborhood restaurants since 2021
                </div>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 bg-stone-900 text-white p-4 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-stone-800">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold mb-1">
                <Award className="w-4 h-4" />
                <span>US Food Standard</span>
              </div>
              <p className="text-xs text-stone-300">
                100% of our partner kitchens maintain Grade-A health department inspection ratings.
              </p>
            </div>
          </div>

          {/* Right Column: Mission Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              <Utensils className="w-3.5 h-3.5" />
              <span>About QuickBite</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Redefining Fast, Fresh, and Fair Food Delivery across America
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              QuickBite was born with a singular purpose: connecting discerning food lovers with the best independent US neighborhood kitchens without the exorbitant markups or cold delivery times typical of legacy apps.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-1">
                  Thermal Freshness Guard
                </h3>
                <p className="text-xs text-stone-600">
                  Insulated thermal transport ensures burgers stay sizzling hot and salads remain crisp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-1">
                  Eco-Friendly Packaging
                </h3>
                <p className="text-xs text-stone-600">
                  Partner restaurants utilize 100% biodegradable and compostable takeout containers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-1">
                  Fair Driver Earnings
                </h3>
                <p className="text-xs text-stone-600">
                  100% of customer tips and a transparent living wage go directly to local couriers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-stone-900 text-sm mb-1">
                  Guaranteed On-Time
                </h3>
                <p className="text-xs text-stone-600">
                  If your order is delayed over 15 minutes past the estimated window, delivery is on us.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
