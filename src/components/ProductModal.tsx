import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { Product } from '../types.ts';
import { X, Star, Plus, Minus, Flame, ShoppingBag, Clock, Sparkles, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const sampleAddons = [
    { name: 'Extra Melted Cheese', price: 1.50 },
    { name: 'House Truffle Aioli Dip', price: 1.25 },
    { name: 'Ripe Haas Avocado Slices', price: 1.99 },
    { name: 'Spicy Jalapeño Crisp', price: 0.99 },
  ];

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, addonName) => {
    const found = sampleAddons.find((a) => a.name === addonName);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, specialInstructions, selectedAddons);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Food Image with Badges */}
        <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Restaurant & Rating Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.restaurantName}
            </span>
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-300 font-normal">({product.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(85vh-200px)] overflow-y-auto space-y-6">
          
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 text-xs text-stone-600 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Prep time: {product.prepTime}
                </span>
                <span>•</span>
                <span>{product.calories} Calories</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-orange-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-stone-400 block font-medium">Base Price (USD)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Key Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="text-xs bg-stone-100 text-stone-700 font-medium px-3 py-1 rounded-full border border-stone-200/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Add-ons Customization */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Optional Customizations
              </h3>
              <span className="text-xs text-stone-400">Choose extras</span>
            </div>

            <div className="space-y-2">
              {sampleAddons.map((addon) => {
                const isChecked = selectedAddons.includes(addon.name);
                return (
                  <button
                    key={addon.name}
                    type="button"
                    onClick={() => toggleAddon(addon.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-sm text-left transition-all ${
                      isChecked
                        ? 'bg-orange-50 border-orange-400 font-semibold text-orange-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-orange-500 border-orange-500 text-white' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-bold text-stone-900">+${addon.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label htmlFor="modal-special-instructions" className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Special Instructions (Optional)
            </label>
            <input
              id="modal-special-instructions"
              type="text"
              placeholder="e.g. dressing on the side, extra crispy, no onions..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 placeholder-stone-400 focus:bg-white focus:border-orange-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Modal Footer (Quantity + Add to Cart Button) */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-white rounded-2xl border border-stone-200 p-1 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-extrabold text-sm text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex-1 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-between sm:justify-center gap-3"
            id="modal-add-to-cart-btn"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </div>
            <span className="bg-orange-600/60 px-2.5 py-0.5 rounded-lg text-sm font-extrabold">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
