import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Pre-seed with the exact two products from user's screenshots (KP1330 & KP1326)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('zarlush_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Refresh images with high-resolution versions from PRODUCTS
        return parsed.map(item => {
          const match = PRODUCTS.find(p => p.code === item.code || p.id === item.id);
          return match ? { ...item, image: match.image } : item;
        });
      }
    } catch (e) {
      console.error(e);
    }
    // Default initial cart matching Screenshot 1 & 2
    const item1 = PRODUCTS.find(p => p.code === 'KP1330') || PRODUCTS[1];
    const item2 = PRODUCTS.find(p => p.code === 'KP1326') || PRODUCTS[0];
    return [
      {
        cartId: 'item-init-1',
        id: item1.id,
        code: item1.code,
        title: item1.title,
        price: item1.price,
        originalPrice: item1.originalPrice,
        image: item1.image,
        size: 'Unstitched',
        quantity: 1
      },
      {
        cartId: 'item-init-2',
        id: item2.id,
        code: item2.code,
        title: item2.title,
        price: item2.price,
        originalPrice: item2.originalPrice,
        image: item2.image,
        size: 'Unstitched',
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('zarlush_wishlist');
      return saved ? JSON.parse(saved) : ['kp-1326', 'kp-1450'];
    } catch (e) {
      return ['kp-1326'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  // Tracks the shrink-to-center exit animation state for QuickViewModal
  const [isQuickViewClosing, setIsQuickViewClosing] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'cart' | 'checkout' | 'orders'
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('zarlush_orders');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // User auth state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('zarlush_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Urgent cart countdown timer (starts around 39:50 from the screenshots)
  const [timeLeft, setTimeLeft] = useState(39 * 60 + 49);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 40 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('zarlush_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zarlush_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('zarlush_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('zarlush_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('zarlush_user');
      }
    } catch (e) {}
  }, [user]);

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping on orders over PKR 5,000
  const freeShippingThreshold = 5000;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold || (appliedPromo && appliedPromo.code === 'FREESHIP') || subtotal > 0;
  const shippingFee = qualifiesForFreeShipping ? 0 : (cart.length > 0 ? 250 : 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedPromo.value) / 100);
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = appliedPromo.value;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Cart actions
  const addToCart = (product, size = 'Unstitched', quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartId: `${product.id}-${size}-${Date.now()}`,
          id: product.id,
          code: product.code,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          size: size,
          quantity: quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Open cart — if QuickView modal is open, animate it closed first (shrink to center),
  // then open cart after the exit animation completes (300ms)
  const openCart = () => {
    if (quickViewProduct) {
      setIsQuickViewClosing(true);
      setTimeout(() => {
        setIsQuickViewClosing(false);
        setQuickViewProduct(null);
        setIsCartOpen(true);
      }, 300);
    } else {
      setIsCartOpen(true);
    }
  };

  // Promo code validation
  const applyPromoCode = (code) => {
    setPromoError('');
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a voucher code');
      return false;
    }
    if (cleanCode === 'LUXURY10' || cleanCode === 'ZARLUSH10') {
      setAppliedPromo({ code: cleanCode, type: 'percentage', value: 10, label: '10% Exclusive Couture Discount' });
      return true;
    }
    if (cleanCode === 'SAVE500') {
      setAppliedPromo({ code: cleanCode, type: 'fixed', value: 500, label: 'PKR 500 Seasonal Voucher' });
      return true;
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: cleanCode, type: 'fixed', value: 0, label: 'Free Nationwide Express Shipping' });
      return true;
    }
    setPromoError('Invalid coupon code. Try LUXURY10 or SAVE500');
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Place order
  const placeOrder = (orderDetails) => {
    const orderNumber = `ZL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal,
      shippingFee,
      discountAmount,
      total: grandTotal,
      paymentMethod: orderDetails.paymentMethod || 'Cash Upon Delivery (COD)',
      shippingAddress: orderDetails.address,
      status: 'Confirmed - Processing Dispatch'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // User auth simulation
  const loginUser = (email, name = 'Valued Customer') => {
    const newUser = {
      email,
      name: name || email.split('@')[0],
      phone: '0300-1234567'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shippingFee,
        discountAmount,
        grandTotal,
        qualifiesForFreeShipping,
        freeShippingThreshold,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        quickViewProduct,
        setQuickViewProduct,
        isQuickViewClosing,
        setIsQuickViewClosing,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        wishlist,
        toggleWishlist,
        activeTab,
        setActiveTab,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromo,
        orders,
        placeOrder,
        user,
        loginUser,
        logoutUser,
        timeLeft,
        formattedTimeLeft: formatTimer(timeLeft)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
