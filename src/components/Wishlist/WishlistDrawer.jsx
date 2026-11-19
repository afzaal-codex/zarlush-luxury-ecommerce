import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#8A0000] fill-[#8A0000]" />
              <h2 className="text-base font-bold text-gray-900">
                Your Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black p-1 text-sm font-semibold"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="text-sm text-gray-600 font-medium">Your wishlist is empty</p>
                <p className="text-xs text-gray-400">Tap the heart icon on any dress to save it here.</p>
              </div>
            ) : (
              wishlistedProducts.map((item) => (
                <div key={item.id} className="py-4 flex space-x-3.5 items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover object-top border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="text-xs font-bold text-[#8A0000] mt-1">
                      Rs.{item.price.toLocaleString()}.00
                    </div>

                    <div className="mt-2.5 flex items-center space-x-2">
                      <button
                        onClick={() => {
                          addToCart(item, 'Unstitched', 1);
                          toggleWishlist(item.id);
                        }}
                        className="py-1 px-3 bg-black hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center space-x-1 active:scale-95 transition-transform"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                      
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

