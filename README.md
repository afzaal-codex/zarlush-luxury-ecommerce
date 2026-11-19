# ZARLUSH COUTURE — Luxury Pret & E-Commerce Storefront

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A responsive luxury Pakistani haute couture and pret e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**. Designed for Eastern Pret, Unstitched Summer Lawn, Winter Karandi, and Festive Velvet collections with a refined shopping experience.

---

## 💎 Live Repository & Demo
* **Repository:** [https://github.com/afzaal-codex/zarlush-luxury-ecommerce](https://github.com/afzaal-codex/zarlush-luxury-ecommerce)
* **Brand Identity:** **ZARLUSH.PK** (*Zarlush Couture / Maison de Luxe*)
* **Theme:** Luxury Pakistani Couture, Deep Crimson (`#8A0000`), Dark Accents, Warm Pearl Backgrounds, and Elegant Typography.

---

## 🌟 Key Features

1. **Top Announcement Marquee Bar**:
   - Deep crimson ticker: *"Summer Sale Live now – Flat 50% off – Free shipping Nationwide"*.
   - Free nationwide shipping banner matching high-end pret retail aesthetics.

2. **Luxury Sticky Header & Navigation**:
   - Responsive clean brand typography (`Zarlush.pk`).
   - Wishlist heart icon with live count badge.
   - Custom SVG Shopping Bag icon with dynamic item count centered in the bag.
   - Quick search launcher and user login modal.
   - Mobile hamburger navigation drawer.

3. **"Shop By Category" Showcase**:
   - Featured seasonal collections (Summer Lawn, Winter Karandi, Ready To Wear Pret).
   - High-resolution local image assets with solid full-width bottom label bars.
   - Instant sorting dropdown (Featured, Best Selling, Price Low to High, Price High to Low).

4. **Product Catalog Grid**:
   - Mobile-first 2-column grid (`grid-cols-2`) on mobile screens, expanding to 3-4 columns on desktop.
   - Quick-add to cart and wishlist toggle buttons (visible on hover on desktop, always visible on mobile).
   - Struck-through original prices with deep crimson discounted sale pricing.
   - 5-star customer review ratings and sold counters.
   - Selectable text with I-beam text cursor (`cursor: text`).

5. **Quick View & Full-Screen Mobile Detail Modal**:
   - Native app-like full-screen experience on mobile, elegant centered modal on desktop.
   - Multi-image gallery with thumbnail switcher.
   - Flame urgency indicator (`🔥 18 sold in last 16 hours`).
   - Size selection (`Unstitched`, `Small`, `Medium`, `Large`, `XL`) and quantity stepper.
   - **Shrink-to-Center Exit Animation**: When clicking the cart, the detail page smoothly scales down into the center before the cart opens.
   - Generous bottom padding ensuring sticky bottom buttons never obscure product details.

6. **Interactive Slide-Out Cart Drawer**:
   - Free Shipping progress bar with delivery truck icon riding on top of the progress line.
   - Real-time line item quantity updates, removals, and subtotal calculation.
   - Quick access to Checkout and dedicated Cart view.

7. **Dedicated Cart Page**:
   - Tabular cart view matching luxury checkout flows.
   - 40-minute reservation countdown timer (*"Please hurry! We'll keep your cart for 39:49 minutes"*).
   - Secure shopping guarantees and coupon voucher code application.

8. **2-Column Shopify-Style Checkout**:
   - Left Column: Contact details, billing address (with Pakistan cities dropdown), and default **Cash Upon Delivery (COD)** payment selection.
   - Right Column: Order summary with product line items, quantity badges, and live totals.
   - Confetti celebration modal upon successful order placement.

9. **Mobile Full-Screen Search Overlay**:
   - Faded luxury background image fade-in transition on mobile.
   - Instant real-time search across product titles, codes, and fabrics.
   - Quick-select trending search chips.

10. **Floating WhatsApp Concierge**:
    - Sticky floating WhatsApp assistance button for customer support.

---

## 🛠️ Tech Stack

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animations & Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Storage:** LocalStorage for Cart, Wishlist, User state, and Order history

---

## 🚀 Quick Start Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* `npm` or `pnpm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/afzaal-codex/zarlush-luxury-ecommerce.git

# 2. Navigate to project folder
cd zarlush-luxury-ecommerce

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
├── public/
│   └── images/              # High-resolution local dress & banner assets
├── src/
│   ├── components/
│   │   ├── Auth/            # Sign-in & registration modal
│   │   ├── Cart/            # Slide-out drawer & full cart page
│   │   ├── Catalog/         # Product catalog grid
│   │   ├── Checkout/        # 2-Column COD checkout page
│   │   ├── Common/          # Brand logo, WhatsApp floating widget
│   │   ├── Footer/          # 5-Column luxury footer
│   │   ├── Header/          # Announcement ticker & sticky navbar
│   │   ├── Hero/            # Category hero section & banners
│   │   ├── Product/         # Product card & QuickView modal
│   │   ├── Search/          # Search modal with full-screen mobile fade
│   │   └── Wishlist/        # Slide-out wishlist drawer
│   ├── context/
│   │   └── CartContext.jsx  # Global cart, wishlist, orders & timer state
│   ├── data/
│   │   └── products.js      # Ultra high-res catalog data
│   ├── App.jsx              # Main application router & layout
│   ├── index.css            # Tailwind CSS v4 & custom cursor rules
│   └── main.jsx             # Entry point
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
