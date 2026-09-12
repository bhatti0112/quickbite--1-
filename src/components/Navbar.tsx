import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { US_CITIES } from '../data/mockData.ts';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  Menu, 
  X, 
  Flame, 
  ChevronDown,
  LogOut,
  Tag
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { 
    itemCount, 
    setIsCartOpen, 
    selectedCity, 
    setSelectedCity, 
    searchQuery, 
    setSearchQuery,
    user,
    setIsAuthOpen,
    logoutUser,
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top micro banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full text-xs font-semibold">
              <Tag className="w-3 h-3" /> WELCOME20
            </span>
            <span className="hidden sm:inline text-stone-300">Get 20% off your first delivery! Min order $15.</span>
          </div>

          <div className="flex items-center gap-3 text-stone-300 text-xs">
            <span className="hidden md:inline">US Delivery Only</span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1 text-emerald-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Kitchens Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 fill-current text-white" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl tracking-tight text-stone-900">
                  Quick<span className="text-orange-500">Bite</span>
                </span>
                <span className="hidden lg:block text-xs font-bold text-stone-400 -mt-0.5">
                  Fresh & Fast US
                </span>
              </div>
            </button>

            {/* City Selector */}
            <div className="relative hidden md:block ml-2">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-full transition-colors border border-stone-200"
                id="city-selector-btn"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate max-w-[110px]">{selectedCity.name}, {selectedCity.state}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isCityDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsCityDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-20">
                    <div className="px-3 py-1.5 text-xs font-bold text-stone-400">
                      Select Delivery Metro
                    </div>
                    {US_CITIES.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-orange-50 transition-colors ${
                          selectedCity.name === city.name ? 'text-orange-600 font-semibold bg-orange-50/50' : 'text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {city.name}, {city.state}
                        </span>
                        <span className="text-xs text-stone-400 font-normal">{city.deliveryTimeBonus}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-2 lg:mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search restaurants, dishes, or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-sm text-stone-800 placeholder-stone-400 rounded-full border border-stone-200/80 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                id="navbar-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('restaurants')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Restaurants
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Offers</span>
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-1.5 text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-50 rounded-lg transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 text-stone-700 hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
                  id="user-profile-btn"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold">{user.name.split(' ')[0]}</span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-20">
                      <div className="px-3 py-2 border-b border-stone-100 text-xs">
                        <div className="font-semibold text-stone-800">{user.name}</div>
                        <div className="text-stone-400 truncate">{user.email}</div>
                      </div>
                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-100 rounded-full transition-colors border border-stone-200"
                id="login-btn"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-3.5 sm:px-4 py-2 rounded-full font-bold text-sm shadow-md shadow-orange-500/25 transition-all"
              id="navbar-cart-btn"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center bg-white text-orange-600 font-extrabold text-xs w-5 h-5 rounded-full shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 lg:hidden rounded-lg hover:bg-stone-100"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search dishes, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-100 text-sm text-stone-800 placeholder-stone-400 rounded-full border border-stone-200 outline-none"
              id="mobile-search-input"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="py-2 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">City</span>
            <div className="flex flex-wrap gap-1.5">
              {US_CITIES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCity(c)}
                  className={`text-xs px-2.5 py-1 rounded-full border ${
                    selectedCity.name === c.name ? 'bg-orange-500 text-white border-orange-500' : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('restaurants')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            Restaurants
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            Categories
          </button>
          <button
            onClick={() => handleNavClick('offers')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            Special Offers
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            About QuickBite
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-3 py-2 text-stone-800 font-semibold hover:bg-orange-50 hover:text-orange-600 rounded-lg"
          >
            Contact & Support
          </button>
        </div>
      )}
    </header>
  );
};
