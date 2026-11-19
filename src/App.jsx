import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/Header/AnnouncementBar';
import { Navbar } from './components/Header/Navbar';
import { CategoryHeroSection } from './components/Hero/CategoryHeroSection';
import { CatalogSection } from './components/Catalog/CatalogSection';
import { CartPage } from './components/Cart/CartPage';
import { CheckoutPage } from './components/Checkout/CheckoutPage';
import { CartDrawer } from './components/Cart/CartDrawer';
import { QuickViewModal } from './components/Product/QuickViewModal';
import { SearchModal } from './components/Search/SearchModal';
import { AuthModal } from './components/Auth/AuthModal';
import { WhatsAppButton } from './components/Common/WhatsAppButton';
import { Footer } from './components/Footer/Footer';

const MainApp = () => {
  const { activeTab } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      
      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <AuthModal />
      <WhatsAppButton />

      {activeTab === 'checkout' ? (
        /* Full Checkout Page matching Screenshot 1 */
        <CheckoutPage />
      ) : activeTab === 'cart' ? (
        /* Full Cart Page matching Screenshot 2 with fixed truck bar */
        <div className="flex-1 flex flex-col">
          <AnnouncementBar />
          <Navbar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          <main className="flex-1">
            <CartPage />
          </main>
          <Footer />
        </div>
      ) : (
        /* Home Catalog View with Shop By Category hero section matching media_1795062759910_d7b65dfa.png */
        <div className="flex-1 flex flex-col">
          <AnnouncementBar />
          <Navbar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          <main className="flex-1">
            {/* "Shop By Category" Hero Section matching user screenshot 3 */}
            <CategoryHeroSection 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Catalog Grid with 2 cards per row on mobile, hover/touch cart & wishlist icons */}
            <CatalogSection 
              selectedCategory={selectedCategory} 
              sortBy={sortBy}
            />
          </main>
          <Footer />
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
