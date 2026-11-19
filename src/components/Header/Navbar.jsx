import React, { useState } from 'react';
import { Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WishlistDrawer } from '../Wishlist/WishlistDrawer';

export const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const { cartCount, setIsCartOpen, openCart, setIsSearchOpen, setIsAuthModalOpen, user, setActiveTab, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const navLinks = [
    { name: 'SUMMER', value: 'Summer' },
    { name: 'WINTER', value: 'Winter' },
    { name: 'READY TO WEAR', value: 'Ready to Wear' },
    { name: 'NEW ARRIVAL', value: 'New Arrival' },
    { name: 'SALE', value: 'Sale' },
  ];

  const handleNavClick = (catValue) => {
    setSelectedCategory(catValue);
    setActiveTab('home');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Top Row:
              - Mobile: Menu button on left, Center brand name "Zarlush.pk", Action icons on right
              - Desktop: Left brand name "Zarlush.pk", Log in on right */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 pb-2">
            
            {/* Mobile: Hamburger Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 text-gray-800 active:scale-90 transition-transform cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Name matching User Request:
                - Mobile: Centered text name "Zarlush.pk", NO LOGO
                - Desktop: Left text name "Zarlush.pk", NO LOGO */}
            <div 
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('home');
              }}
              className="cursor-pointer text-center sm:text-left flex-1 sm:flex-initial"
            >
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-gray-900 hover:text-[#8A0000] transition-colors">
                Zarlush<span className="font-sans font-normal text-sm sm:text-base text-gray-400">.pk</span>
              </span>
            </div>

            {/* Right Side Icons:
                - Desktop: Log in button
                - Mobile: Wishlist + Search + Bag */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Wishlist Heart Icon (Added to Header per request) */}
              <button
                onClick={() => setWishlistOpen(true)}
                className="relative p-1 text-gray-800 hover:text-[#8A0000] active:scale-90 transition-transform cursor-pointer"
                aria-label="Wishlist"
                title="View Wishlist"
              >
                <Heart className={`w-5 h-5 stroke-[1.8] ${wishlist.length > 0 ? 'text-[#8A0000] fill-[#8A0000]/15' : 'text-gray-800'}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8A0000] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="sm:hidden p-1 text-gray-800 active:scale-90 transition-transform cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Mobile Shopping Bag Icon with Count Centered inside */}
              <button
                onClick={() => openCart()}
                className="sm:hidden relative flex items-center justify-center p-1 text-gray-900 active:scale-90 transition-transform cursor-pointer"
                aria-label="Cart"
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-[1.5]">
                    {/* Bag body: y from 8 to 22 */}
                    <path d="M 4 8 L 20 8 L 21.5 22 L 2.5 22 Z" />
                    {/* Handle */}
                    <path d="M 8.5 8 C 8.5 4.5, 15.5 4.5, 15.5 8" />
                  </svg>
                  {/* Count: bag body center is at y≈15/24 = 62.5% from top */}
                  <span className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-900 leading-none select-none pointer-events-none">
                    {cartCount}
                  </span>
                </div>
              </button>

              {/* Desktop User Account Login */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 text-xs text-gray-800 hover:text-black font-medium cursor-pointer"
              >
                <span>{user ? user.name.split(' ')[0] : 'Log in'}</span>
                <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center p-0.5">
                  <User className="w-3.5 h-3.5 text-gray-700 stroke-[1.8]" />
                </div>
              </button>

            </div>

          </div>

          {/* Lower Desktop Navigation Row */}
          <div className="hidden sm:flex items-center justify-between py-2.5 border-t border-gray-50 text-[13px] tracking-wider font-medium text-gray-800">
            
            {/* Category Navigation Links */}
            <nav className="flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.value)}
                  className={`uppercase hover:text-black transition-colors cursor-pointer ${
                    selectedCategory === link.value ? 'text-black font-bold border-b border-black' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Desktop Right Action Icons: Search & Bag with count in center */}
            <div className="flex items-center space-x-5 ml-auto">
              
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-1.5 text-gray-800 hover:text-black active:scale-95 transition-transform cursor-pointer"
              >
                <span className="text-[13px]">Search</span>
                <Search className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Shopping Bag with count centered directly inside */}
              <button
                onClick={() => openCart()}
                className="relative flex items-center justify-center p-1 text-gray-900 hover:opacity-80 active:scale-90 transition-transform cursor-pointer"
                aria-label="Cart"
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-[1.5]">
                    {/* Bag body: y from 8 to 22 */}
                    <path d="M 4 8 L 20 8 L 21.5 22 L 2.5 22 Z" />
                    {/* Handle */}
                    <path d="M 8.5 8 C 8.5 4.5, 15.5 4.5, 15.5 8" />
                  </svg>
                  {/* Count: bag body center is at y≈15/24 = 62.5% from top */}
                  <span className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-900 leading-none select-none pointer-events-none">
                    {cartCount}
                  </span>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.value)}
                className="block w-full text-left text-sm font-semibold uppercase text-gray-800 py-1.5 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="font-medium text-black"
              >
                {user ? `Logged in: ${user.name}` : 'Sign In / Register'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
