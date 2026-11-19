import React from 'react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#8A0000] text-white overflow-hidden py-1.5 px-2 text-[12px] font-bold select-none border-b border-[#6E0000]">
      {/* Exact continuous text banner matching Screenshot 2 & 6 */}
      <div className="flex whitespace-nowrap justify-around items-center max-w-7xl mx-auto tracking-normal">
        <span className="px-4">Summer Sale Live now - Flat 50% off - Free shipping Nationwide</span>
        <span className="px-4 hidden sm:inline">Summer Sale Live now - Flat 50% off - Free shipping Nationwide</span>
        <span className="px-4 hidden md:inline">Summer Sale Live now - Flat 50% off - Free shipping Nationwide</span>
      </div>
    </div>
  );
};
