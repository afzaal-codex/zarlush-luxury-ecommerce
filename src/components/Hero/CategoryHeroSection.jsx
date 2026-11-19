import React from 'react';

export const CategoryHeroSection = ({ onSelectCategory, selectedCategory, sortBy, setSortBy }) => {
  const categories = [
    {
      id: 'summer',
      name: 'Summer',
      title: 'Summer Collection',
      image: '/images/kp1106_clean.jpg', // Ultra clean high-res image
      tag: 'Lawn Pret'
    },
    {
      id: 'winter',
      name: 'Winter',
      title: 'Winter Karandi',
      image: '/images/kp1330_main.jpg', // Local 100% reliable high-res image
      tag: 'Karandi Shawls'
    },
    {
      id: 'ready-to-wear',
      name: 'Ready to Wear',
      title: 'Ready To Wear',
      image: '/images/kp1326_main.jpg', // Local 100% reliable high-res image
      tag: 'Festive Velvet'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-4 font-sans">
      
      {/* Top Section matching Screenshot 3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6">
        
        {/* Left Side: "Shop By Category" */}
        <div className="md:col-span-3 text-left">
          <h2 className="text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs text-gray-500 mt-1 hidden md:block">
            Explore our latest luxury pret & unstitched collections.
          </p>
        </div>

        {/* Right Side: 3 Category Cards side-by-side matching Screenshot 3 */}
        <div className="md:col-span-9 grid grid-cols-3 gap-3 sm:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`relative aspect-3/4 rounded-xs overflow-hidden cursor-pointer group shadow-2xs transition-all active:scale-95 ${
                selectedCategory === cat.name ? 'ring-2 ring-black' : 'hover:opacity-95'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/kp1106_clean.jpg';
                }}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Full-width black label bar at bottom — matches screenshot exactly */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/85 px-3 py-2">
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white block leading-none">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Sort By Row matching Screenshot 3 */}
      <div className="pt-4 pb-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800 uppercase tracking-wider text-[11px]">SORT BY</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-900 bg-white focus:outline-hidden font-medium cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="bestseller">Best Selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="text-[11px] text-gray-500">
          Showing <strong>All Outfits</strong>
        </div>
      </div>

    </section>
  );
};
