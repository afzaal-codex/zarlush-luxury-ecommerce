import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  // Fade-in on open
  useEffect(() => {
    if (isSearchOpen) {
      setSearchTerm('');
      // Slight delay so the CSS transition fires
      setTimeout(() => {
        setVisible(true);
        inputRef.current?.focus();
      }, 20);
    } else {
      setVisible(false);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setIsSearchOpen(false), 300);
  };

  if (!isSearchOpen) return null;

  const results = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div
      className={`fixed inset-0 z-50 font-sans transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ───────────────────────────────────────────────
          MOBILE LAYOUT: Full-screen image fade backdrop
          ─────────────────────────────────────────────── */}
      <div className="sm:hidden relative w-full h-full flex flex-col">

        {/* Full-screen faded background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kp1106_clean.jpg"
            alt=""
            aria-hidden="true"
            className={`w-full h-full object-cover object-top transition-all duration-700 ${
              visible ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
            }`}
          />
          {/* Deep dark gradient over the image so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>

        {/* Mobile Header */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-safe pt-4 pb-3 border-b border-white/10">
          <button
            onClick={handleClose}
            className="p-1 text-white/80 hover:text-white transition-colors active:scale-90"
            aria-label="Close search"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-white text-base tracking-wide">
            Zarlush<span className="font-sans font-normal text-xs text-white/50">.pk</span>
          </span>
          <div className="w-7" /> {/* spacer */}
        </div>

        {/* Mobile Search Input */}
        <div className="relative z-10 px-5 pt-8 pb-5">
          <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3 font-medium">
            What are you looking for?
          </p>
          <div className="relative flex items-center">
            <Search className="absolute left-0 w-5 h-5 text-white/50 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dresses, fabrics, brands…"
              className="w-full bg-transparent text-white text-xl placeholder:text-white/30 focus:outline-none py-2 pl-8 border-b border-white/30 focus:border-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-0 text-white/50 hover:text-white active:scale-90 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Results or Banner */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-6">
          {searchTerm.trim() === '' ? (
            /* Trending chips when no query */
            <div className="mt-2">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Trending</p>
              <div className="flex flex-wrap gap-2">
                {['Winter Karandi', 'Lawn Suits', 'Velvet Pret', 'Embroidered', 'Dhanak'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 rounded-full border border-white/20 text-white/70 text-xs hover:bg-white/10 hover:border-white/40 transition-all active:scale-95 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-white/40 text-sm mt-4">No results for "{searchTerm}"</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setQuickViewProduct(product);
                    handleClose();
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:bg-white/15 transition-all active:scale-95 border border-white/10"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/kp1330_main.jpg'; }}
                    className="w-full h-36 object-cover object-top"
                  />
                  <div className="p-2">
                    <h4 className="text-[11px] font-semibold text-white line-clamp-2 leading-snug">{product.title}</h4>
                    <div className="text-xs font-bold text-[#FF8A8A] mt-1">Rs.{product.price.toLocaleString()}.00</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────
          DESKTOP LAYOUT: Classic top-sheet style
          ─────────────────────────────────────────────── */}
      <div className="hidden sm:flex flex-col w-full h-full">

        {/* Top White Header Section */}
        <div className="bg-white border-b border-gray-200 shadow-sm">

          {/* Deep Red Announcement Strip */}
          <div className="bg-[#8A0000] text-white py-1 px-4 text-[12px] font-bold text-center">
            Free shipping Nationwide &nbsp;&nbsp;&nbsp;&nbsp; Summer Sale Live now - Flat 50% off - Free shipping Nationwide
          </div>

          {/* Desktop Header */}
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <span className="font-serif font-bold text-xl tracking-tight text-gray-900">
              Zarlush<span className="font-sans font-normal text-sm text-gray-400">.pk</span>
            </span>
            <button
              onClick={handleClose}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-black cursor-pointer"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-[#EFEFEF] py-8 px-6">
            <div className="max-w-2xl mx-auto relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-xl sm:text-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none py-2 pr-10 border-b border-gray-300 focus:border-black transition-colors"
              />
              <Search className="w-6 h-6 text-gray-700 absolute right-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Desktop Results / Banner */}
        <div className="flex-1 overflow-y-auto relative bg-[#1E1E1E]">
          {searchTerm.trim() === '' ? (
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src="/images/summer_banner.png"
                alt="Summer Collection"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setQuickViewProduct(product);
                    handleClose();
                  }}
                  className="bg-white p-3 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/kp1330_main.jpg'; }}
                    className="w-full h-44 object-cover object-top mb-2"
                  />
                  <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">{product.title}</h4>
                  <div className="text-xs font-bold text-[#E03137] mt-1">Rs.{product.price.toLocaleString()}.00</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
