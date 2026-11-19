import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartPage = () => {
  const { 
    cart, 
    subtotal, 
    updateQuantity, 
    removeFromCart, 
    setActiveTab, 
    formattedTimeLeft,
    qualifiesForFreeShipping
  } = useCart();

  return (
    <div className="bg-white min-h-[70vh] py-6 px-4 sm:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Breadcrumb matching Screenshot 2: "Home > Your Cart" */}
      <div className="text-[12px] text-gray-500 mb-4 flex items-center space-x-1.5">
        <button 
          onClick={() => setActiveTab('home')}
          className="hover:text-black transition-colors"
        >
          Home
        </button>
        <span>&gt;</span>
        <span className="text-gray-600">Your Cart</span>
      </div>

      {/* Title matching Screenshot 2: "YOUR CART" */}
      <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-black mb-4">
        YOUR CART
      </h1>

      {/* Free Shipping Progress Bar with Truck ON TOP OF LINE per user request: "delivey wala icon line k ooper ho" */}
      <div className="mb-5 pt-6 pb-1">
        <div className="w-full bg-[#E5F5ED] h-2.5 rounded-full relative">
          <div 
            className="bg-[#48B382] h-full rounded-full relative transition-all duration-500"
            style={{ width: qualifiesForFreeShipping ? '100%' : '65%' }}
          >
            {/* Delivery truck sitting directly ON TOP of the green line */}
            <div className="absolute right-0 bottom-full mb-0.5 translate-x-1/2 pointer-events-none">
              <svg 
                viewBox="0 0 34 22" 
                className="w-7 h-5 text-[#48B382] fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Truck Cargo Body */}
                <path d="M 0 5 L 20 5 L 20 17 L 0 17 Z" fill="#48B382" />
                {/* Top Cargo Outline */}
                <path d="M 6 2 L 14 2 C 16 2, 16 5, 16 5 L 4 5 C 4 5, 4 2, 6 2 Z" fill="#48B382" />
                {/* Truck Cab */}
                <path d="M 20 8 L 26 8 L 30 13 L 30 17 L 20 17 Z" fill="#48B382" />
                {/* Windshield */}
                <path d="M 22 10 L 25 10 L 28 13 L 22 13 Z" fill="white" />
                {/* Wheels touching top of line */}
                <circle cx="8" cy="18" r="2.5" fill="white" stroke="#48B382" strokeWidth="1.5" />
                <circle cx="25" cy="18" r="2.5" fill="white" stroke="#48B382" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-[12px] text-[#48B382] font-medium mt-1.5">
          You qualify for free shipping!
        </div>
      </div>

      {/* Urgency Callout Banner matching Screenshot 2: "ⓘ Please, hurry! Someone has placed an order..." */}
      <div className="bg-[#FEF6EC] border border-[#FDE5CC] rounded-none p-3.5 mb-8 flex items-center space-x-2 text-[12px] text-gray-800">
        <span className="text-gray-600 text-sm font-serif">ⓘ</span>
        <span>
          Please, hurry! Someone has placed an order on one of the items you have in the cart. We'll keep it for you for <strong className="font-bold">{formattedTimeLeft}</strong> minutes.
        </span>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State matching Screenshot 5 & 6 */
        <div className="py-16 text-center space-y-4">
          <p className="text-gray-500 text-sm">Your cart is empty</p>
          <button
            onClick={() => setActiveTab('home')}
            className="py-3 px-8 bg-black text-white text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        /* Cart Table matching Screenshot 2 */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table Section */}
          <div className="lg:col-span-8">
            
            {/* Table Headers matching Screenshot 2 */}
            <div className="grid grid-cols-12 text-[12px] font-bold text-gray-800 uppercase pb-3 border-b border-gray-200">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-2 text-center">QUANTITY</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.cartId} className="py-5 grid grid-cols-12 items-center text-xs">
                  
                  {/* Product Column */}
                  <div className="col-span-6 flex items-start space-x-3.5 pr-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 sm:w-20 sm:h-24 object-cover object-top border border-gray-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 text-[12px] sm:text-[13px] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Zarlush.Pk
                      </p>
                    </div>
                  </div>

                  {/* Price Column */}
                  <div className="col-span-2 text-center">
                    {item.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through mr-1 block sm:inline">
                        Rs.{item.originalPrice.toLocaleString()}.00
                      </span>
                    )}
                    <span className="text-gray-900 font-medium">
                      Rs.{item.price.toLocaleString()}.0
                    </span>
                  </div>

                  {/* Quantity Stepper: "[ — 1 + ]" */}
                  <div className="col-span-2 flex justify-center">
                    <div className="inline-flex items-center border border-gray-300 text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 active:scale-90 transition-transform"
                      >
                        —
                      </button>
                      <span className="px-3 py-1 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 active:scale-90 transition-transform"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Column & Remove */}
                  <div className="col-span-2 flex items-center justify-end space-x-3">
                    <span className="text-gray-900 font-medium whitespace-nowrap">
                      Rs.{(item.price * item.quantity).toLocaleString()}.00
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-500 hover:text-black p-1 text-xs active:scale-75 transition-transform"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Secure Shopping Guarantee matching Screenshot 2 */}
            <div className="mt-8 pt-4 flex items-center space-x-2 text-xs text-gray-700 font-medium">
              <span className="w-4 h-4 bg-black text-white rounded-xs flex items-center justify-center text-[10px]">
                ✔
              </span>
              <span>Secure Shopping Guarantee</span>
            </div>

          </div>

          {/* Right Order Summary Column matching Screenshot 2 */}
          <div className="lg:col-span-4 bg-white p-6 border-t lg:border-t-0 lg:border-l border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-gray-200">
              ORDER SUMMARY
            </h3>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center text-gray-800">
                <span className="line-through">Subtotal</span>
                <span className="font-bold text-sm">Rs.{subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between items-center text-gray-900 pt-2 border-t border-gray-100">
                <span className="font-bold uppercase">TOTAL:</span>
                <span className="font-bold text-base">Rs.{subtotal.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Action Buttons with click bounce animation */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setActiveTab('checkout')}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={() => setActiveTab('home')}
                className="w-full py-3 bg-white hover:bg-gray-50 text-black font-semibold text-xs uppercase tracking-wider border border-gray-300 transition-all active:scale-95"
              >
                CONTINUE SHOPPING
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
