import React from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Heart, ShieldCheck } from 'lucide-react';
import { US_CITIES } from '../data/mockData.ts';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Quick<span className="text-orange-500">Bite</span>
              </span>
            </div>

            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              QuickBite connects food lovers across the United States with exceptional local kitchens. Real-time temperature tracking, prompt courier service, and honest chef partnerships.
            </p>

            {/* Fictional Address & Contact Info from prompt */}
            <div className="space-y-1.5 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>123 Market Street, New York, NY 10001, United States</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>+1 (800) 555-0147 (Mon–Sun 8AM–11PM ET)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>support@quickbite.example</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="font-display font-bold text-white text-sm mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('restaurants')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Featured Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Food Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Deals & Coupons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-orange-600 transition-colors"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Cuisines */}
          <div>
            <h3 className="font-display font-bold text-white text-sm mb-4">
              Cuisines
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>Artisanal Burgers</li>
              <li>Wood-Fired Pizza</li>
              <li>Handcrafted Sushi</li>
              <li>Authentic Mexican</li>
              <li>Chinese Wok & Dim Sum</li>
              <li>Healthy Organic Bowls</li>
            </ul>
          </div>

          {/* Col 5: Major US Metros */}
          <div>
            <h3 className="font-display font-bold text-white text-sm mb-4">
              Serving US Cities
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {US_CITIES.map((c) => (
                <span
                  key={c.name}
                  className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-lg"
                >
                  {c.name}, {c.state}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Portfolio Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} QuickBite Inc. All rights reserved. Built with React, Vite, and Tailwind CSS.
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fictional business & portfolio demonstration. No real charges are made.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
