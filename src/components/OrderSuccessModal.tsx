import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Bike, 
  ChefHat, 
  PackageCheck, 
  X, 
  Phone, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrder } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1 = Confirmed, 2 = Preparing, 3 = Out for delivery

  useEffect(() => {
    if (isOrderSuccessOpen) {
      // Trigger festive confetti explosion!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#10b981', '#3b82f6'],
        });
      } catch {
        // graceful confetti fallback
      }

      // Progressively simulate order steps for realism
      const timer1 = setTimeout(() => setCurrentStep(2), 3500);
      const timer2 = setTimeout(() => setCurrentStep(3), 8000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setCurrentStep(1);
    }
  }, [isOrderSuccessOpen]);

  if (!isOrderSuccessOpen || !lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="fixed inset-0" onClick={() => setIsOrderSuccessOpen(false)} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 my-6">
        
        {/* Top Success Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center relative">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-black/10 animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Order Placed Successfully
          </span>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
            Thank you, {lastOrder.customerName.split(' ')[0]}!
          </h2>

          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Order ID: <span className="font-mono font-bold text-white">{lastOrder.orderId}</span>
          </p>
        </div>

        {/* Live Delivery Progress Tracker */}
        <div className="p-6 space-y-6">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-stone-400 block">Estimated Delivery</span>
                <span className="font-display text-lg font-bold text-stone-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  {lastOrder.estimatedDeliveryTime}
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                {currentStep === 1 && 'Order Confirmed'}
                {currentStep === 2 && 'Kitchen Preparing'}
                {currentStep === 3 && 'Driver En Route'}
              </span>
            </div>

            {/* Stepper Bar */}
            <div className="relative flex items-center justify-between">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-200 -z-0" />
              <div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-orange-500 transition-all duration-700 -z-0"
                style={{
                  width: currentStep === 1 ? '10%' : currentStep === 2 ? '50%' : '100%',
                }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= 1 ? 'bg-orange-500 text-white shadow-md' : 'bg-stone-200 text-stone-400'
                }`}>
                  <PackageCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-stone-600 mt-1.5">Confirmed</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= 2 ? 'bg-orange-500 text-white shadow-md' : 'bg-stone-200 text-stone-400'
                }`}>
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-stone-600 mt-1.5">Preparing</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep >= 3 ? 'bg-orange-500 text-white shadow-md animate-pulse' : 'bg-stone-200 text-stone-400'
                }`}>
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-stone-600 mt-1.5">On The Way</span>
              </div>
            </div>
          </div>

          {/* Courier Card Simulation */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                MR
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Marcus R. (Your Courier)</div>
                <div className="text-xs text-stone-600 flex items-center gap-1">
                  <span>Honda Civic (Silver)</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">4.9 ★ (1.8k deliveries)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Simulated Call: Dialing Courier Marcus at +1 (800) 555-0147...`)}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-orange-600 hover:border-orange-300 shadow-2xs transition-all"
              title="Call Courier"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Order Summary & Destination */}
          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex items-start gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/70">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-800 block">Delivering to:</span>
                <span>{lastOrder.address}, {lastOrder.city}, {lastOrder.zipCode}</span>
              </div>
            </div>

            {/* Receipt mini breakdown */}
            <div className="p-3 rounded-xl border border-stone-100 space-y-1">
              <div className="flex justify-between font-semibold text-stone-800 pb-1 border-b border-stone-100">
                <span>Items ({lastOrder.items.length})</span>
                <span>${lastOrder.total.toFixed(2)} Paid ({lastOrder.paymentMethod.toUpperCase()})</span>
              </div>
              {lastOrder.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-stone-600 pt-0.5">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Back to QuickBite Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
