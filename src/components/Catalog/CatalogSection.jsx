import React from 'react';
import { ProductCard } from '../Product/ProductCard';
import { PRODUCTS } from '../../data/products';

export const CatalogSection = ({ selectedCategory, sortBy = 'featured' }) => {
  let filtered = selectedCategory === 'All'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'bestseller') {
    filtered.sort((a, b) => (b.soldRecent || 0) - (a.soldRecent || 0));
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 font-sans">
      
      {/* 2 cards per row on mobile (`grid-cols-2`), 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};
