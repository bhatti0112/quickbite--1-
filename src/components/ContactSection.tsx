import React, { useState } from 'react';
import { FAQS } from '../data/mockData.ts';
import { useCart } from '../context/CartContext.tsx';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Info,
  Compass,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { addToast } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Question');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-stone-50/80 border-b border-stone-200/60" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-2 bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>US Support & Headquarters</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            We're Here to Help You
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Have an inquiry about an active delivery, partner restaurant onboarding, or dietary questions? Reach out anytime.
          </p>

          {/* Prompt Mandate: Clearly label company information as demo/fictitious */}
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 text-xs px-3.5 py-1.5 rounded-full font-medium shadow-2xs">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Portfolio Demo Project: All business information, telephone numbers, and addresses are fictional.</span>
          </div>
        </div>

        {/* Contact Info + Interactive Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Official Contact Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                  QB
                </div>
                <h3 className="font-display text-2xl font-black text-stone-900 tracking-tight">
                  QuickBite HQ
                </h3>
              </div>
              <p className="text-xs text-stone-600">
                Delivering culinary excellence across major metropolitan US markets.
              </p>
            </div>

            {/* Business info strictly as prompt asked */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400">Corporate Address</div>
                  <div className="font-bold text-stone-900 mt-0.5">QuickBite</div>
                  <div>123 Market Street</div>
                  <div>New York, NY 10001</div>
                  <div className="text-stone-600">United States</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400">Phone Support</div>
                  <a 
                    href="tel:+18005550147" 
                    className="font-bold text-stone-900 hover:text-orange-600 transition-colors mt-0.5 block"
                  >
                    +1 (800) 555-0147
                  </a>
                  <div className="text-stone-600 text-xs">Toll-free customer hotline</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400">Email Helpdesk</div>
                  <a 
                    href="mailto:support@quickbite.example" 
                    className="font-bold text-stone-900 hover:text-orange-600 transition-colors mt-0.5 block"
                  >
                    support@quickbite.example
                  </a>
                  <div className="text-stone-600 text-xs">Replies within 15 minutes</div>
                </div>
              </div>

              {/* Customer Support Hours */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400">Support Operating Hours</div>
                  <div className="font-bold text-stone-900 mt-0.5">Monday–Sunday</div>
                  <div className="text-orange-600 font-bold">8:00 AM – 11:00 PM ET</div>
                </div>
              </div>
            </div>

            {/* Social Icons (Facebook, Instagram, X, LinkedIn) */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-3">
                Follow QuickBite Socials
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#social-fb"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-[#1877F2] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-2xs font-black text-sm"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  f
                </a>

                {/* Instagram */}
                <a
                  href="#social-ig"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-2xs font-bold text-xs"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  IG
                </a>

                {/* X */}
                <a
                  href="#social-x"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-black hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-2xs font-bold text-sm"
                  aria-label="X (formerly Twitter)"
                  title="X"
                >
                  𝕏
                </a>

                {/* LinkedIn */}
                <a
                  href="#social-in"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-[#0A66C2] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-2xs font-bold text-xs"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50">
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
              Send us a Message
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              Our dispatch and support team typically replies in less than 15 minutes during operating hours.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-emerald-900">Message Dispatched!</h4>
                <p className="text-xs text-emerald-600 max-w-sm mx-auto">
                  Thank you for contacting QuickBite. A support specialist will review your ticket and reach out via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-emerald-600 underline hover:text-emerald-800 pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Order Question">Order Inquiry / Delivery Status</option>
                    <option value="Restaurant Partner">Become a Restaurant Partner</option>
                    <option value="Courier Partner">Courier Driver Application</option>
                    <option value="General Feedback">General Feedback or Compliment</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help you today..."
                    className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:bg-white focus:border-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20 active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Google Maps-Style Location Placeholder */}
        <div className="mb-16 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-lg">
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-400" />
              <span className="font-display font-bold text-sm">QuickBite US Distribution Hub & Headquarters</span>
            </div>
            <span className="text-xs text-stone-400 hidden sm:inline">123 Market Street, Manhattan, New York</span>
          </div>

          {/* Interactive Map Canvas Simulator */}
          <div className="relative h-72 sm:h-80 w-full bg-stone-100 overflow-hidden">
            {/* Map styling elements (roads, grid patterns, pins) */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #f8fafc 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}
            />

            {/* Simulated Road Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e2e8f0" strokeWidth="24" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#fef08a" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#e2e8f0" strokeWidth="20" />
              <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#e2e8f0" strokeWidth="16" />
              <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#fed7aa" strokeWidth="10" />
            </svg>

            {/* Main HQ Map Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-in zoom-in-50 duration-500 z-10">
              <div className="bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 mb-1 whitespace-nowrap border border-white/20">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                QuickBite HQ • 123 Market St
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/40 border-2 border-white">
                <MapPin className="w-6 h-6 fill-white" />
              </div>
              <div className="w-4 h-1.5 rounded-full bg-stone-400/40 blur-[1px] mt-0.5" />
            </div>

            {/* Map UI Overlays */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-md border border-stone-200 text-xs font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Map View • New York Downtown</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-stone-200 text-xs font-bold text-stone-700 flex items-center gap-2">
              <button 
                onClick={() => addToast("GPS Route set to 123 Market Street, New York, NY 10001", "info")}
                className="text-orange-600 hover:text-orange-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Quick answers about orders, delivery speeds, fees, and dietary preferences.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-stone-900">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full text-stone-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
