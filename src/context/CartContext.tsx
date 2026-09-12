import React, { createContext, useContext, useEffect, useState } from 'react';
import { PROMO_OFFERS, US_CITIES } from '../data/mockData.ts';
import { CartItem, CityOption, OrderDetails, Product, PromoCode } from '../types.ts';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, specialInstructions?: string, selectedOptions?: string[]) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  tip: number;
  setTip: (tip: number) => void;
  total: number;
  itemCount: number;
  appliedPromo: PromoCode | null;
  applyPromo: (codeStr: string) => { success: boolean; message: string };
  removePromo: () => void;
  
  // UI & navigation states
  selectedCity: CityOption;
  setSelectedCity: (city: CityOption) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRestaurantId: string | null;
  setSelectedRestaurantId: (resId: string | null) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Order flow
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;
  createOrder: (customerData: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    apt?: string;
    city: string;
    zipCode: string;
    paymentMethod: 'card' | 'applepay' | 'googlepay' | 'cash';
  }) => OrderDetails;

  // User auth state (mock)
  user: { name: string; email: string } | null;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('quickbite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCity, setSelectedCity] = useState<CityOption>(US_CITIES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [tip, setTip] = useState<number>(3.0);

  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const savedUser = localStorage.getItem('quickbite_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    try {
      localStorage.setItem('quickbite_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    specialInstructions?: string,
    selectedOptions?: string[]
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions: specialInstructions || next[existingIndex].specialInstructions,
          selectedOptions: selectedOptions || next[existingIndex].selectedOptions,
        };
        return next;
      }
      return [...prev, { product, quantity, specialInstructions, selectedOptions }];
    });
    addToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`, 'success');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast(`Removed "${item.product.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const subtotal = Number(
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
  );

  // Delivery fee calculation
  let deliveryFee = cart.length === 0 ? 0 : 2.49;
  if (subtotal >= 35 || (appliedPromo && appliedPromo.code === 'FREESHIP' && subtotal >= appliedPromo.minSubtotal)) {
    deliveryFee = 0;
  }

  // Discount calculation
  let discount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minSubtotal) {
    if (appliedPromo.discountType === 'percentage') {
      discount = Number(((subtotal * appliedPromo.value) / 100).toFixed(2));
    } else {
      discount = Number(appliedPromo.value.toFixed(2));
    }
  }

  // US sales tax estimation (~8.875%)
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = cart.length === 0 ? 0 : Number((taxableAmount * 0.08875).toFixed(2));

  // Final total
  const total = cart.length === 0 ? 0 : Number((taxableAmount + deliveryFee + tax + tip).toFixed(2));
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyPromo = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const match = PROMO_OFFERS.find((p) => p.code === cleanCode);
    if (!match) {
      return { success: false, message: 'Invalid promo code' };
    }
    if (subtotal < match.minSubtotal) {
      return {
        success: false,
        message: `Order must be at least $${match.minSubtotal.toFixed(2)} to use ${cleanCode}`,
      };
    }
    setAppliedPromo(match);
    addToast(`Promo code "${cleanCode}" applied!`, 'success');
    return { success: true, message: `Promo applied: ${match.description}` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    addToast('Promo code removed', 'info');
  };

  const createOrder = (customerData: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    apt?: string;
    city: string;
    zipCode: string;
    paymentMethod: 'card' | 'applepay' | 'googlepay' | 'cash';
  }): OrderDetails => {
    const orderId = 'QB-' + Math.floor(100000 + Math.random() * 900000);
    const order: OrderDetails = {
      orderId,
      ...customerData,
      items: [...cart],
      subtotal,
      deliveryFee,
      tax,
      discount,
      tip,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
      estimatedDeliveryTime: '25-35 minutes',
    };

    setLastOrder(order);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    return order;
  };

  const loginUser = (name: string, email: string) => {
    const u = { name, email };
    setUser(u);
    localStorage.setItem('quickbite_user', JSON.stringify(u));
    setIsAuthOpen(false);
    addToast(`Welcome to QuickBite, ${name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('quickbite_user');
    addToast('Logged out successfully', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
        itemCount,
        appliedPromo,
        applyPromo,
        removePromo,

        selectedCity,
        setSelectedCity,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedRestaurantId,
        setSelectedRestaurantId,

        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        selectedProduct,
        setSelectedProduct,

        lastOrder,
        setLastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        createOrder,

        user,
        loginUser,
        logoutUser,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
