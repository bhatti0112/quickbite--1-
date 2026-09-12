import React, { useState } from 'react';
import { useCart } from '../context/CartContext.tsx';
import { X, Lock, Mail, User, Flame, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser } = useCart();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('••••••••');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const finalName = isSignUp ? name : name || email.split('@')[0];
    loginUser(finalName, email);
  };

  const handleQuickDemo = () => {
    loginUser('Alex Morgan', 'alex.morgan@example.com');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={() => setIsAuthOpen(false)} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 p-6 sm:p-8">
        
        {/* Close button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-orange-500/25">
          <Flame className="w-6 h-6 fill-current" />
        </div>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-black text-stone-900">
            {isSignUp ? 'Join QuickBite' : 'Welcome to QuickBite'}
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            {isSignUp
              ? 'Create your customer account to save favorites and earn rewards'
              : 'Sign in to access your saved delivery addresses and coupons'}
          </p>
        </div>

        {/* Quick Demo One-Click Login Button */}
        <button
          onClick={handleQuickDemo}
          className="w-full mb-4 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <span>⚡ One-Click Demo Sign In (Alex Morgan)</span>
        </button>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-stone-200" />
          <span className="flex-shrink mx-3 text-xs text-stone-400 font-bold uppercase tracking-widest">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-stone-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-stone-900 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Login / SignUp */}
        <div className="mt-5 text-center text-xs text-stone-600">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-orange-600 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to QuickBite?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-orange-600 font-bold hover:underline"
              >
                Create an account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
