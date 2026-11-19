import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    setJustAdded(true);
    addToCart(product, 'Unstitched', 1);
    setTimeout(() => setJustAdded(false), 700);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = (e) => {
    // If user is selecting text, do not open modal
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      return;
    }
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="bg-white flex flex-col group text-left relative"
    >
      {/* Product Image Container */}
      <div 
        onClick={handleCardClick}
        className="relative aspect-3/4 w-full bg-gray-50 overflow-hidden mb-2 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/kp1330_main.jpg';
          }}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-103"
        />

        {/* Discount Badge in Top Left matching Screenshot 3 */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-black text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 tracking-wider z-10">
            {product.discount}
          </div>
        )}

        {/* Wishlist Heart Icon:
            - Desktop: Revealed on hover
            - Mobile: Visible by default
            - Click animation: active:scale-75 */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white/95 hover:bg-white text-gray-800 rounded-full shadow-xs transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 active:scale-75 hover:scale-110 z-10 cursor-pointer"
          aria-label="Wishlist"
          title="Save to Wishlist"
        >
          <Heart 
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isWishlisted ? 'text-[#8A0000] fill-[#8A0000]' : 'text-gray-700'
            }`} 
          />
        </button>

        {/* Cart Quick-Add Icon:
            - Desktop: Revealed on hover
            - Mobile: Visible by default
            - Click animation: active:scale-75 */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-2 right-2 p-1.5 sm:p-2 text-white rounded-full shadow-md transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-75 z-10 cursor-pointer ${
            justAdded ? 'bg-emerald-600 scale-110' : 'bg-black hover:bg-neutral-800'
          }`}
          aria-label="Add to cart"
          title="Add directly to cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </button>
      </div>

      {/* Details matching Screenshot 3 & 7 - selectable with I-beam text cursor */}
      <div className="space-y-1">
        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-xs sm:text-[13px] font-normal text-gray-900 line-clamp-2 leading-snug group-hover:underline cursor-text select-text"
        >
          {product.title}
        </h3>

        {/* 5 Star Reviews matching Screenshot 7 */}
        <div className="flex items-center space-x-1 py-0.5">
          <div className="flex text-emerald-700 cursor-default">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-emerald-700 text-xs">★</span>
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] text-gray-500 cursor-text select-text">
            {product.reviewsCount} reviews
          </span>
        </div>

        {/* Price: Strikethrough & crimson */}
        <div className="flex items-baseline space-x-1.5 pt-0.5 text-xs sm:text-sm cursor-text select-text">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-[10px] sm:text-[11px] cursor-text select-text">
              Rs.{product.originalPrice.toLocaleString()}.00
            </span>
          )}
          <span className="font-semibold text-[#8A0000] cursor-text select-text">
            Rs.{product.price.toLocaleString()}.00
          </span>
        </div>
      </div>
    </div>
  );
};
