import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartCount, 
    subtotal, 
    updateQuantity, 
    removeFromCart, 
    setActiveTab,
    qualifiesForFreeShipping
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveTab('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    setActiveTab('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Dimmed backdrop matching Screenshot 7 */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        {/* White Drawer Panel matching Screenshot 7 */}
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          
          {/* Header matching Screenshot 7 */}
          <div className="p-5 pb-3 flex items-start justify-between border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Shopping Cart
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-700 hover:text-black p-1 text-sm font-semibold active:scale-90 transition-transform cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Mint Green Free Shipping Bar with Truck ON TOP OF LINE */}
          <div className="px-5 pt-6 pb-3 border-b border-gray-100">
            <div className="w-full bg-[#E5F5ED] h-2.5 rounded-full relative">
              <div 
                className="bg-[#48B382] h-full rounded-full relative transition-all duration-500"
                style={{ width: qualifiesForFreeShipping ? '100%' : '65%' }}
              >
                {/* Truck icon sitting directly ON TOP of line */}
                <div className="absolute right-0 bottom-full mb-0.5 translate-x-1/2 pointer-events-none">
                  <svg 
                    viewBox="0 0 34 22" 
                    className="w-6 h-4 text-[#48B382] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 0 5 L 20 5 L 20 17 L 0 17 Z" fill="#48B382" />
                    <path d="M 6 2 L 14 2 C 16 2, 16 5, 16 5 L 4 5 C 4 5, 4 2, 6 2 Z" fill="#48B382" />
                    <path d="M 20 8 L 26 8 L 30 13 L 30 17 L 20 17 Z" fill="#48B382" />
                    <path d="M 22 10 L 25 10 L 28 13 L 22 13 Z" fill="white" />
                    <circle cx="8" cy="18" r="2.5" fill="white" stroke="#48B382" strokeWidth="1.5" />
                    <circle cx="25" cy="18" r="2.5" fill="white" stroke="#48B382" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-[12px] text-[#48B382] font-medium mt-1">
              You qualify for free shipping!
            </div>
          </div>

          {/* Cart Items List matching Screenshot 7 */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                Your cart is empty.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="py-4 flex space-x-3.5 relative">
                  {/* Thumbnail matching Screenshot 7 */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover object-top border border-gray-200 flex-shrink-0"
                  />

                  {/* Details matching Screenshot 7 */}
                  <div className="flex-1 pr-6 space-y-1.5 select-text">
                    <h4 className="text-[12px] font-normal text-gray-900 leading-snug cursor-text select-text">
                      {item.title}
                    </h4>

                    {/* Price matching Screenshot 7 */}
                    <div className="flex items-center space-x-1.5 text-xs cursor-text select-text">
                      {item.originalPrice && (
                        <span className="text-gray-400 line-through text-[11px]">
                          Rs.{item.originalPrice.toLocaleString()}.00
                        </span>
                      )}
                      <span className="text-[#E03137] font-semibold text-[13px]">
                        Rs.{item.price.toLocaleString()}.00
                      </span>
                    </div>

                    {/* Stepper matching Screenshot 7 */}
                    <div className="inline-flex items-center border border-gray-300 text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 active:scale-90 transition-transform cursor-pointer"
                      >
                        —
                      </button>
                      <span className="px-3 py-1 font-medium text-center cursor-text select-text">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 active:scale-90 transition-transform cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove button matching Screenshot 7 (✕) */}
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="absolute top-4 right-0 text-gray-400 hover:text-black p-1 text-sm active:scale-75 transition-transform cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer matching Screenshot 7 */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-white space-y-3.5 select-text">
              <div className="space-y-1 text-xs text-gray-800 cursor-text select-text">
                <div className="flex justify-between font-normal">
                  <span>Subtotal:</span>
                  <span className="font-bold">Rs.{subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-1">
                  <span>Total:</span>
                  <span className="font-bold">Rs.{subtotal.toLocaleString()}.00</span>
                </div>
              </div>

              {/* Action Buttons matching Screenshot 7 */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
                >
                  CHECKOUT
                </button>

                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 bg-white hover:bg-gray-50 text-black font-semibold text-xs uppercase tracking-widest border border-gray-300 transition-all active:scale-95 cursor-pointer"
                >
                  VIEW CART
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
