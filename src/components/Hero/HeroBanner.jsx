import React from 'react';
import { ArrowRight, Sparkles, Shield, Award, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const HeroBanner = ({ onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-[#0F0F11] text-white">
      {/* Background Hero Banner matching Screenshot 8 style: High fashion editorial model */}
      <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[660px] flex items-center">
        {/* Background Overlay & Picture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
            alt="Zarlush Luxury Summer & Festive Collection"
            className="w-full h-full object-cover object-top opacity-70 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            
            {/* Calligraphic Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs tracking-[0.2em] uppercase text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>THE ROYAL SUMMER & FESTIVE EDIT '26</span>
            </div>

            {/* Main Luxury Typography matching Screenshot 8 */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                SUMMER <br />
                <span className="italic font-normal text-amber-100">COLLECTION</span>
              </h1>
              <div className="inline-block border-y border-amber-300/40 py-1 px-3 text-xs tracking-[0.3em] uppercase text-gray-200 font-mono">
                WWW.ZARLUSH.PK
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 max-w-lg font-light leading-relaxed">
              Immerse yourself in opulent handcrafted Karandi shawls, fine Supima lawn, and royal micro-velvet pret. Masterfully tailored with timeless heritage embroideries.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="py-4 px-8 bg-[#850B1B] hover:bg-[#680814] text-white font-semibold text-xs sm:text-sm tracking-widest uppercase rounded shadow-lg transition-all flex items-center space-x-2 group active:scale-95"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onShopNow}
                className="py-4 px-8 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-widest uppercase rounded border border-white/30 backdrop-blur-xs transition-colors"
              >
                FLAT 50% OFF SALE
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg text-[11px] sm:text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Nationwide COD</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>100% Original Fabric</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>7-Day Exchange</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Featured Micro-Banner Strip */}
      <div className="bg-[#18181B] border-t border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-gray-300 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-gray-200 font-medium">Free Delivery for all orders over PKR 4,000 nationwide</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-[11px] text-gray-400">
            <span>• Cash On Delivery Available</span>
            <span>• Same Day Dispatch in Lahore & Faisalabad</span>
            <span>• WhatsApp Support: 0305-8973929</span>
          </div>
        </div>
      </div>
    </div>
  );
};

