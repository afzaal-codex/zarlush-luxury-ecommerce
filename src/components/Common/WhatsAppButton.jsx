import React from 'react';

export const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/923058973929?text=Assalam-o-Alaikum%20Zarlush.pk,%20I%20want%20to%20inquire%20about%20your%20dress%20collection.', '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={handleClick}
        className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        aria-label="WhatsApp Contact"
        title="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 32 32" 
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.64.72 5.12 1.98 7.24L2 30l7.02-1.92C11.04 29.23 13.45 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.3 0-4.48-.68-6.32-1.85l-.45-.29-4.17 1.14 1.14-4.06-.29-.47A11.45 11.45 0 014.56 16C4.56 9.69 9.69 4.56 16 4.56S27.44 9.69 27.44 16 22.31 27.56 16 27.56zm6.3-8.62c-.35-.17-2.07-1.02-2.39-1.14-.32-.12-.55-.17-.79.17-.23.35-.91 1.14-1.11 1.38-.2.23-.41.26-.76.09-.35-.17-1.48-.55-2.81-1.74-1.04-.93-1.74-2.08-1.94-2.43-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.79-1.9-1.08-2.6-.28-.68-.57-.59-.79-.6h-.67c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.17.23 2.45 3.74 5.94 5.25.83.36 1.48.57 1.98.73.83.26 1.59.23 2.19.14.67-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.08-.15-.31-.24-.66-.41z"/>
        </svg>
      </button>
    </div>
  );
};
