import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  ArrowLeft,
  AlertTriangle,
  Loader2,
  Bike
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    tip,
    total,
    appliedPromo,
    selectedCity,
    createOrder,
    user
  } = useCart();

  const [customerName, setCustomerName] = useState(user?.name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@example.com');
  const [phone, setPhone] = useState('(212) 555-0198');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [apt, setApt] = useState('Apt 4B');
  const [city, setCity] = useState(selectedCity.name);
  const [zipCode, setZipCode] = useState(selectedCity.zip);
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave at the front door and ring bell.');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay' | 'cash'>('card');
  const [cardName, setCardName] = useState('Alex Morgan');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('•••');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim() || !zipCode.trim()) {
      setErrorMsg('Please fill in all required delivery fields.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate realistic 1.2s payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      createOrder({
        customerName,
        email,
        phone,
        address: `${address}${apt ? `, ${apt}` : ''}`,
        city,
        zipCode,
        paymentMethod,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={() => !isSubmitting && setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-display text-xl font-bold text-stone-900">
              QuickBite Express Checkout
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 flex items-center gap-2 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Demo Checkout Mode:</strong> No real money or actual credit card processing is conducted. Fictional demo flow.
          </span>
        </div>

        {/* Form & Summary */}
        <form onSubmit={handleSubmitOrder} className="p-6 max-h-[calc(85vh-140px)] overflow-y-auto space-y-6">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 cols: Customer info & Delivery & Payment */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Section 1: Customer Contact */}
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4 text-orange-500" />
                  1. Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">US Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(212) 555-0198"
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: US Delivery Address */}
              <div className="pt-3 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  2. US Delivery Address
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main Street"
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">Apt / Suite</label>
                      <input
                        type="text"
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                        placeholder="Apt 4B"
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="10001"
                        className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Drop-off Instructions</label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Leave at apartment door, do not knock"
                      className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method UI */}
              <div className="pt-3 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-orange-500" />
                  3. Payment Method (Demo)
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'bg-orange-50 border-orange-500 text-orange-900 ring-2 ring-orange-500/20'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'applepay'
                        ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span> Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'cash'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-stone-600 font-semibold mb-1">
                      <span>Demo Test Card (Auto-filled)</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-0.5">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-0.5">Expires</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full text-xs font-mono bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-0.5">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full text-xs font-mono bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right 5 cols: Order Summary & Place Order */}
            <div className="lg:col-span-5 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between space-y-4">
              
              <div>
                <h3 className="font-display text-base font-bold text-stone-900 pb-3 border-b border-stone-200">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items mini list */}
                <div className="max-h-48 overflow-y-auto divide-y divide-stone-200/60 py-2 space-y-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs">
                          {item.quantity}x
                        </span>
                        <span className="font-medium text-stone-800 truncate max-w-[150px]">
                          {item.product.name}
                        </span>
                      </div>
                      <span className="font-semibold text-stone-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown */}
                <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount ({appliedPromo?.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Courier Tip</span>
                    <span>${tip.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-300 text-sm font-extrabold text-stone-900">
                    <span>Order Total</span>
                    <span className="text-orange-600 font-display">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="place-order-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Place Order (${total.toFixed(2)})</span>
                    </>
                  )}
                </button>
                <div className="text-center text-xs text-stone-400 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant confirmation & live status tracking</span>
                </div>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
