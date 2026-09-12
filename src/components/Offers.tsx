import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { PROMO_OFFERS } from '../data/mockData.ts';
import { Tag, Sparkles, Check, ArrowRight, Percent, Truck, Gift } from 'lucide-react';

export const Offers: React.FC = () => {
  const { applyPromo, appliedPromo, setIsCartOpen } = useCart();

  const getOfferIcon = (code: string) => {
    switch (code) {
      case 'WELCOME20':
        return <Percent className="w-5 h-5 text-orange-600" />;
      case 'FREESHIP':
        return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'WEEKEND30':
        return <Gift className="w-5 h-5 text-amber-600" />;
      default:
        return <Tag className="w-5 h-5 text-orange-600" />;
    }
  };

  const handleApply = (code: string) => {
    applyPromo(code);
    setIsCartOpen(true);
  };

  return (
    <section className="py-12 bg-stone-100/60 border-b border-stone-200/60" id="offers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Promotions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Exclusive QuickBite Deals
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm">
            Apply discount codes directly to your basket at checkout. Valid across all participating restaurants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_OFFERS.map((offer) => {
            const isApplied = appliedPromo?.code === offer.code;

            return (
              <div
                key={offer.code}
                className={`relative rounded-2xl p-6 bg-white border transition-all duration-300 hover:shadow-xl group flex flex-col justify-between overflow-hidden ${
                  isApplied
                    ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                    : 'border-stone-200/90 hover:border-orange-200'
                }`}
              >
                {/* Decorative background aura */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/40 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                      {getOfferIcon(offer.code)}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                      Limited Time
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                    {offer.description}
                  </h3>

                  <p className="text-xs text-stone-600 mb-6">
                    {offer.code === 'WELCOME20' && 'Valid on your very first QuickBite order. Max discount $10.'}
                    {offer.code === 'FREESHIP' && 'Enjoy zero delivery fees on orders meeting $25 minimum threshold.'}
                    {offer.code === 'WEEKEND30' && 'Take an extra $5 off all weekend orders over $30.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-stone-200 flex items-center justify-between gap-3">
                  <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-stone-400" />
                    <code className="text-xs font-mono font-bold text-stone-800 tracking-wider">
                      {offer.code}
                    </code>
                  </div>

                  <button
                    onClick={() => handleApply(offer.code)}
                    className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 ${
                      isApplied
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-900 hover:bg-orange-500 text-white shadow-sm'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Code</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
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
