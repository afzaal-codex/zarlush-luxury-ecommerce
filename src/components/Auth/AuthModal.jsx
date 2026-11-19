import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useCart();
  const [email, setEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      loginUser(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-sm rounded-none p-8 relative shadow-2xl text-center space-y-5">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-black p-1"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Name matching Screenshot 4: "Kashaf.pk" -> "Zarlush.pk" */}
        <div className="font-serif font-bold text-lg text-black">
          Zarlush.pk
        </div>

        {/* Heading & Subtitle matching Screenshot 4 */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900">Sign in</h3>
          <p className="text-xs text-gray-500">Sign in or create an account</p>
        </div>

        {/* Purple "Continue with shop" button matching Screenshot 4 */}
        <button
          onClick={() => loginUser('customer@zarlush.pk', 'Syeda Maryam')}
          className="w-full py-3 bg-[#5A31F4] hover:bg-[#4b26db] text-white font-medium text-xs rounded-md shadow-xs transition-colors"
        >
          Continue with shop
        </button>

        {/* Divider matching Screenshot 4: "or" */}
        <div className="relative flex items-center justify-center py-1">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400">or</span>
          <div className="border-t border-gray-200 w-full" />
        </div>

        {/* Email input with arrow matching Screenshot 4 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-xs placeholder:text-gray-400 focus:outline-hidden focus:border-black pr-10"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black p-1"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Terms and Privacy policy links matching Screenshot 4 */}
        <div className="space-y-4 pt-2 text-[11px] text-gray-500">
          <p>
            By continuing, you agree to our{' '}
            <a href="#terms" className="underline hover:text-black">
              Terms of service
            </a>
          </p>
          <div>
            <a href="#privacy" className="text-blue-600 hover:underline">
              Privacy policy
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
