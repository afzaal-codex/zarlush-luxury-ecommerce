import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Heart, ShoppingBag, Truck, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, setActiveTab, isQuickViewClosing } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Unstitched');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setSelectedSize(quickViewProduct.sizes?.[0] || 'Unstitched');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  // Ensure multiple images are available for every product
  const galleryImages = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image, quickViewProduct.hoverImage || quickViewProduct.image];

  const currentImage = galleryImages[selectedImageIndex] || quickViewProduct.image;
  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const subtotalPrice = quickViewProduct.price * quantity;

  const handleAddToCart = () => {
    setAddedAnimation(true);
    addToCart(quickViewProduct, selectedSize, quantity);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 400);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
    setActiveTab('checkout');
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/60 sm:bg-black/50 sm:flex sm:items-center sm:justify-center font-sans overflow-y-auto transition-opacity duration-300 ${isQuickViewClosing ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Mobile: 100% Full Screen Page
          Desktop: Elegant Centered Modal
          Exit: scale-50 opacity-0 → shrinks to center like closing a window */}
      <div className={`bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-lg overflow-y-auto relative flex flex-col shadow-2xl transition-all duration-300 ease-in ${
        isQuickViewClosing
          ? 'scale-75 opacity-0 sm:scale-50'
          : 'scale-100 opacity-100 animate-in slide-in-from-bottom sm:zoom-in-95 duration-250'
      }`}>
        
        {/* Top Header Bar for Mobile matching Native App feel */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-gray-100 px-4 py-3 flex items-center justify-between sm:hidden">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="flex items-center space-x-1 text-gray-800 active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-medium">Back</span>
          </button>

          <span className="font-serif font-bold text-sm text-gray-900 truncate max-w-[200px]">
            {quickViewProduct.title}
          </span>

          <button
            onClick={() => toggleWishlist(quickViewProduct.id)}
            className="p-1 text-gray-800 active:scale-90 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-[#8A0000] fill-[#8A0000]' : ''}`} />
          </button>
        </div>

        {/* Desktop Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="hidden sm:flex absolute top-3 right-3 z-30 p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors active:scale-90"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Content Grid with generous bottom padding for mobile sticky action bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 flex-1 pb-36 sm:pb-8">
          
          {/* Image Gallery Column (Left on Desktop, Top on Mobile) */}
          <div className="sm:col-span-6 bg-gray-50 p-4 sm:p-6 flex flex-col justify-between">
            
            {/* Main Image View */}
            <div className="relative aspect-3/4 rounded-xs overflow-hidden bg-white shadow-xs mb-3">
              <img
                src={currentImage}
                alt={quickViewProduct.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/kp1330_main.jpg';
                }}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              {quickViewProduct.discount && (
                <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-0.5 tracking-wider">
                  {quickViewProduct.discount}
                </div>
              )}
            </div>

            {/* Multiple Images Thumbnails Gallery */}
            <div className="flex space-x-2.5 overflow-x-auto pb-1 select-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-18 sm:w-16 sm:h-20 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 active:scale-95 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-black ring-1 ring-black shadow-xs'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/kp1330_main.jpg';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Product Details Column (Right on Desktop, Bottom on Mobile) - All text selectable with I-beam */}
          <div className="sm:col-span-6 p-5 sm:p-7 flex flex-col justify-start text-xs space-y-4 select-text">
            
            <div className="space-y-3.5">
              
              {/* Product Title */}
              <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-snug cursor-text select-text">
                {quickViewProduct.title}
              </h1>

              {/* Flame Urgency Indicator */}
              <div className="flex items-center space-x-1.5 text-[#E03137] font-semibold text-xs sm:text-sm cursor-text select-text">
                <span>🔥</span>
                <span>{quickViewProduct.soldRecent || 12} sold in last 16 hours</span>
              </div>

              {/* Vendor & Stock Status */}
              <div className="space-y-1.5 text-gray-600 text-[12px] border-b border-gray-100 pb-3 cursor-text select-text">
                <div className="flex items-center space-x-1.5">
                  <span className="text-gray-400">Vendor:</span>{' '}
                  <span className="text-gray-900 font-medium">{quickViewProduct.vendor || 'Zarlush.pk'}</span>
                </div>
                <div className="flex items-center space-x-1.5 flex-wrap">
                  <span className="text-gray-400">Availability:</span>{' '}
                  <span className="text-emerald-700 font-medium">In Stock (Dispatches in 24 hrs)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-gray-400">Product Type:</span>{' '}
                  <span className="text-gray-900 font-medium">{quickViewProduct.type || 'Luxury Pret'}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-2 pt-1 text-sm sm:text-base cursor-text select-text">
                {quickViewProduct.originalPrice && (
                  <span className="text-gray-400 line-through font-medium text-xs sm:text-sm">
                    Rs.{quickViewProduct.originalPrice.toLocaleString()}.00
                  </span>
                )}
                <span className="font-bold text-[#8A0000] text-lg sm:text-xl">
                  Rs.{quickViewProduct.price.toLocaleString()}.00
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  SAVE {quickViewProduct.discount?.replace('-', '')}
                </span>
              </div>

              {/* Size Selection */}
              <div className="pt-1">
                <label className="block text-gray-700 font-medium text-[11px] uppercase tracking-wider mb-1.5">
                  Select Size / Stitching:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(quickViewProduct.sizes || ['Unstitched', 'Small', 'Medium', 'Large']).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-xs transition-all active:scale-95 cursor-pointer ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-xs'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="pt-2">
                <label className="block text-gray-700 font-medium text-[11px] uppercase tracking-wider mb-1.5 cursor-text select-text">
                  Quantity:
                </label>
                <div className="inline-flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 active:scale-90 transition-transform cursor-pointer"
                  >
                    —
                  </button>
                  <span className="px-4 py-1.5 text-center font-medium min-w-8 text-sm cursor-text select-text">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 active:scale-90 transition-transform cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal Calculation */}
              <div className="text-[12px] text-gray-700 font-medium pt-1 cursor-text select-text">
                Subtotal: <strong className="text-black">Rs.{subtotalPrice.toLocaleString()}.00</strong>
              </div>

              {/* Specifications & Details */}
              {quickViewProduct.details && (
                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1 cursor-text select-text">
                  <div className="font-semibold text-gray-700 mb-1">Package Includes:</div>
                  {quickViewProduct.details.map((d, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <span className="text-[#8A0000]">✦</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:block pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm cursor-pointer ${
                  addedAnimation ? 'bg-emerald-600' : ''
                }`}
              >
                {addedAnimation ? '✓ ADDED TO BAG' : 'ADD TO CART'}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#8A0000] hover:bg-[#6e0000] text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                BUY NOW WITH CASH ON DELIVERY
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Sticky Bottom Action Bar with backdrop blur */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 flex space-x-2 shadow-lg">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xs active:scale-95 transition-transform cursor-pointer"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-[#8A0000] text-white font-bold text-xs uppercase tracking-wider rounded-xs active:scale-95 transition-transform cursor-pointer"
          >
            BUY NOW (COD)
          </button>
        </div>

      </div>
    </div>
  );
};
