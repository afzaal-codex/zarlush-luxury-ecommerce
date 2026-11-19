import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { PAKISTAN_CITIES } from '../../data/products';

export const CheckoutPage = () => {
  const { cart, subtotal, grandTotal, placeOrder, setActiveTab, setIsAuthModalOpen, user } = useCart();

  // Form State matching Screenshot 1
  const [contact, setContact] = useState(user ? user.email : '');
  const [paymentMethod, setPaymentMethod] = useState('Cash Upon Delivery (COD)');
  const [country, setCountry] = useState('Pakistan');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        contact,
        paymentMethod,
        address: { firstName, lastName, address, city, country, postalCode, phone }
      });
      setIsSubmitting(false);
      setOrderConfirmed(order);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
    }, 800);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-xs text-gray-500">
            Thank you! Your order <strong className="text-black">{orderConfirmed.orderId}</strong> has been received and will be delivered via Cash On Delivery.
          </p>
          <div className="bg-gray-50 p-4 text-left text-xs space-y-2 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold">PKR Rs {orderConfirmed.total.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment:</span>
              <span>Cash Upon Delivery (COD)</span>
            </div>
          </div>
          <button
            onClick={() => {
              setOrderConfirmed(null);
              setActiveTab('home');
            }}
            className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Top Header matching Screenshot 1 */}
      <header className="border-b border-gray-200 py-3.5 px-6 sm:px-16 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab('home')}
          className="cursor-pointer"
        >
          <span className="font-serif font-bold text-xl sm:text-2xl text-black">
            Zarlush.pk
          </span>
        </div>

        {/* Blue outline shopping bag icon matching Screenshot 1 */}
        <button 
          onClick={() => setActiveTab('cart')}
          className="text-blue-600 hover:text-blue-700"
          title="Return to Cart"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current fill-none stroke-[1.8]"
          >
            <path d="M 4 8 L 20 8 L 22 24 L 2 24 Z" />
            <path d="M 8 8 C 8 3, 16 3, 16 8" />
          </svg>
        </button>
      </header>

      {/* Main 2-Column Split matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)]">
        
        {/* Left Column (Forms) */}
        <div className="lg:col-span-7 px-6 sm:px-16 py-8">
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto lg:mr-0 space-y-7">
            
            {/* Contact section matching Screenshot 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-gray-900">Contact</h2>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email or mobile phone number"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 pr-9"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-xs">?</span>
                </div>
              </div>
            </div>

            {/* Payment section matching Screenshot 1 */}
            <div>
              <h2 className="text-base font-bold text-gray-900">Payment</h2>
              <p className="text-[11px] text-gray-500 mt-0.5 mb-2.5">
                All transactions are secure and encrypted.
              </p>

              {/* Selected box matching Screenshot 1: blue outline & light blue background */}
              <div className="border border-blue-600 bg-blue-50/20 rounded-md p-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-900">
                  Cash Upon Delivery (COD)
                </span>
              </div>
            </div>

            {/* Billing address section matching Screenshot 1 */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2.5">Billing address</h2>

              <div className="space-y-2.5">
                
                {/* Country/Region dropdown */}
                <div className="relative">
                  <label className="block text-[10px] text-gray-400 px-3 pt-1 bg-white border border-gray-300 rounded-t-md border-b-0 leading-tight">
                    Country/Region
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 pb-2 pt-0 border border-gray-300 rounded-b-md border-t-0 text-xs font-normal text-gray-900 focus:outline-hidden bg-white"
                  >
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>

                {/* First name & Last name */}
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name (optional)"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                {/* Address */}
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600"
                />

                {/* City & Postal code */}
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600"
                  />
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal code (optional)"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-blue-600 pr-9"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="text-xs">?</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Complete order Button matching Screenshot 1: Big solid blue button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-3.5 bg-[#005BD3] hover:bg-[#004bb0] text-white font-bold text-sm rounded-md transition-colors"
              >
                {isSubmitting ? 'Processing order...' : 'Complete order'}
              </button>
            </div>

            {/* Terms and policies link matching Screenshot 1 */}
            <div className="pt-2 text-xs text-blue-600">
              <a href="#terms" className="hover:underline">
                Terms and policies
              </a>
            </div>

          </form>
        </div>

        {/* Right Column (Product list & Summary) matching Screenshot 1 */}
        <div className="lg:col-span-5 bg-[#F5F5F5] px-6 sm:px-12 py-8 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="max-w-md mx-auto lg:ml-0 space-y-6">
            
            {/* Products List matching Screenshot 1 */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3.5">
                    {/* Thumbnail with black pill badge "1" matching Screenshot 1 */}
                    <div className="relative w-14 h-16 bg-white border border-gray-200 overflow-hidden rounded-xs flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center -translate-y-1 translate-x-1">
                        {item.quantity}
                      </span>
                    </div>

                    <h4 className="font-normal text-gray-900 text-[12px] leading-snug max-w-[200px]">
                      {item.title}
                    </h4>
                  </div>

                  {/* Price matching Screenshot 1: Rs 4,199.00 */}
                  <div className="text-gray-900 font-medium whitespace-nowrap pl-2 text-[12px]">
                    Rs {(item.price * item.quantity).toLocaleString()}.00
                  </div>
                </div>
              ))}
            </div>

            {/* Total line matching Screenshot 1: "Total       PKR Rs 8,398.00" */}
            <div className="pt-6 border-t border-gray-300 flex items-center justify-between text-sm">
              <span className="font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-[11px] text-gray-500 mr-1.5 font-medium">PKR</span>
                <span className="text-base font-bold text-gray-900">
                  Rs {subtotal.toLocaleString()}.00
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
