import React, { useEffect, useState } from "react";

function VideoTitle({ title, overview }) {
  const [showOverview, setShowOverview] = useState(true);

  return (
    <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 pl-12 md:pl-24 z-20 text-white pointer-events-none">
      {/* Title with text shadow for better readability */}
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl max-w-2xl leading-tight">
        {title}
      </h1>

      {/* Overview with max width and better typography */}
      <p
        className={`hidden md:block text-base lg:text-lg max-w-xl leading-relaxed drop-shadow-lg transition-all duration-1000
                    ${showOverview ? "opacity-100 translate-y-0 mb-6" : "opacity-0 -translate-y-2 mb-0"}`}
      >
        {overview?.length > 200 ? `${overview.slice(0, 200)}...` : overview}
      </p>

      {/* Buttons with better styling */}
      <div className="flex gap-3 md:gap-4 pointer-events-auto">
        <button
          className="flex items-center gap-2 bg-white hover:bg-white/90 
                     text-black px-6 md:px-8 py-2 md:py-3 rounded 
                     font-semibold text-sm md:text-base
                     transition-all duration-200 transform hover:scale-105 
                     shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>

        <button
          className="flex items-center gap-2 bg-gray-500/70 hover:bg-gray-500/50 
                     backdrop-blur-sm text-white px-6 md:px-8 py-2 md:py-3 rounded 
                     font-semibold text-sm md:text-base
                     transition-all duration-200 transform hover:scale-105 
                     shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle; 