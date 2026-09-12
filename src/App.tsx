import React, { useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Categories } from './components/Categories.tsx';
import { Offers } from './components/Offers.tsx';
import { RestaurantList } from './components/RestaurantList.tsx';
import { FoodMenu } from './components/FoodMenu.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { ToastContainer } from './components/Toast.tsx';
import { Product } from './types.ts';
import { Home, Utensils, Tag, ShoppingBag, PhoneCall } from 'lucide-react';

const QuickBiteApp: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setIsCartOpen,
    itemCount 
  } = useCart();

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mapping: Record<string, string> = {
      restaurants: 'restaurants-section',
      categories: 'categories-section',
      menu: 'menu-section',
      offers: 'offers-section',
      about: 'about-section',
      contact: 'contact-section',
    };

    const targetElementId = mapping[sectionId] || sectionId;
    const el = document.getElementById(targetElementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 selection:bg-orange-200 selection:text-orange-900 pb-16 lg:pb-0">
      
      {/* Sticky Header */}
      <Navbar onNavigate={handleNavigate} />

      {/* Hero Section */}
      <div id="home-section">
        <Hero 
          onOrderNow={() => handleNavigate('menu')}
          onExploreRestaurants={() => handleNavigate('restaurants')}
        />
      </div>

      {/* Promotional Offers Bar */}
      <Offers />

      {/* Food Categories */}
      <Categories onCategorySelect={() => handleNavigate('menu')} />

      {/* Featured Restaurants */}
      <RestaurantList onViewMenu={() => handleNavigate('menu')} />

      {/* Food Menu Products Grid */}
      <FoodMenu onProductClick={handleProductSelect} />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section & FAQ */}
      <ContactSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Floating Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-4 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleNavigate('home')}
          className="flex flex-col items-center text-stone-600 hover:text-orange-600 p-1"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => handleNavigate('menu')}
          className="flex flex-col items-center text-stone-600 hover:text-orange-600 p-1"
        >
          <Utensils className="w-5 h-5" />
          <span className="text-xs font-bold mt-0.5">Menu</span>
        </button>

        <button
          onClick={() => handleNavigate('offers')}
          className="flex flex-col items-center text-stone-600 hover:text-orange-600 p-1"
        >
          <Tag className="w-5 h-5" />
          <span className="text-xs font-bold mt-0.5">Deals</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-orange-600 font-bold p-1"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs font-black w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-xs font-bold mt-0.5">Cart</span>
        </button>

        <button
          onClick={() => handleNavigate('contact')}
          className="flex flex-col items-center text-stone-600 hover:text-orange-600 p-1"
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-xs font-bold mt-0.5">Contact</span>
        </button>
      </div>

      {/* Modals and Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <QuickBiteApp />
    </CartProvider>
  );
}
