import React from 'react';

export const BrandLogo = () => {
  return (
    <div className="flex items-center cursor-pointer select-none">
      {/* Clean, luxury typography matching user request: "bs name hi likhein" */}
      <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-gray-900 hover:text-[#8A0000] transition-colors">
        Zarlush<span className="font-sans font-normal text-sm sm:text-base text-gray-400">.pk</span>
      </span>
    </div>
  );
};
