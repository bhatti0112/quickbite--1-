import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Percent, 
  Bike, 
  Sparkles 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    tip,
    setTip,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isCustomTip, setIsCustomTip] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Free delivery threshold: $35 or code FREESHIP (min $25)
  const freeThreshold = 35.0;
  const progressToFree = Math.min(100, (subtotal / freeThreshold) * 100);
  const remainingForFree = Math.max(0, freeThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-900 leading-tight">
                  Your Order Cart
                </h2>
                <span className="text-xs text-stone-600">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-rose-600 px-2 py-1 transition-colors"
                  title="Clear Cart"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="bg-orange-50/80 px-5 py-2.5 border-b border-orange-100 text-xs text-stone-700">
              {deliveryFee === 0 ? (
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>You unlocked Free Delivery! 🎉</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Add ${remainingForFree.toFixed(2)} more for Free Delivery</span>
                    <span className="text-orange-600 font-bold">{progressToFree.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-orange-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressToFree}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-800">Your cart is empty</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-xs mt-1">
                    Looks like you haven't added anything yet. Explore our favorite dishes and top US kitchens!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 rounded-xl object-cover shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display text-sm font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-stone-400 font-medium">
                        {item.product.restaurantName}
                      </div>

                      {/* Addon Pills */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-xs text-stone-600 mt-1">
                          + {item.selectedOptions.join(', ')}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <div className="text-xs italic text-amber-700 mt-0.5">
                          Note: "{item.specialInstructions}"
                        </div>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-extrabold text-sm text-stone-900">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Bottom Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>{appliedPromo.code} applied (-${discount.toFixed(2)})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-stone-400 hover:text-stone-700 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600 font-medium mt-1">{promoError}</p>
                )}
              </div>

              {/* Courier Tip Selector */}
              <div className="bg-white p-3 rounded-xl border border-stone-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-orange-500" />
                    Courier Tip (100% goes to driver)
                  </span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[2.0, 3.0, 5.0].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setTip(amount);
                        setIsCustomTip(false);
                      }}
                      className={`text-xs py-1.5 font-bold rounded-lg border transition-all ${
                        tip === amount && !isCustomTip
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsCustomTip(true);
                    }}
                    className={`text-xs py-1.5 font-bold rounded-lg border transition-all ${
                      isCustomTip
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {isCustomTip && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-stone-600 font-bold">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={tip}
                      onChange={(e) => setTip(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-24 text-xs p-1.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 && (
                      <span className="text-xs font-bold uppercase bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-stone-800">
                    {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span className="font-semibold text-stone-800">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Courier Tip</span>
                  <span className="font-semibold text-stone-800">${tip.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                  <span>Estimated Total</span>
                  <span className="text-base text-orange-600 font-display">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-between"
                id="cart-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1 font-extrabold">
                  <span>${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
