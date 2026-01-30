import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "./hooks/useMovieTrailer";

function VideoBackground({ movieId }) {
  const trailerId = useSelector(
    (state) => state.movies?.nowTrailerMovies
  );

  const [isMuted, setIsMuted] = useState(true);

  useMovieTrailer(movieId);

  // Netflix trick: unmute on any interaction
  useEffect(() => {
    const enableSound = () => {
      setIsMuted(false);
      window.removeEventListener("click", enableSound);
      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("keydown", enableSound);
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("scroll", enableSound);
    window.addEventListener("keydown", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("scroll", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, []);

  if (!trailerId) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Mute/Unmute button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-10 right-4 sm:bottom-12 sm:right-10 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition text-lg"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Video iframe */}
      <iframe
        className="
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          w-[177.78vh] h-[100vh]
          min-w-[100vw] min-h-[56.25vw]
          sm:w-[177.78vh] sm:h-[100vh]
          pointer-events-none
        "
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=0&loop=1&playlist=${trailerId}&mute=${isMuted ? 1 : 0}&modestbranding=1&showinfo=0&rel=0`}
        allow="autoplay; encrypted-media"
        title="Movie Trailer"
        frameBorder="0"
      />
    </div>
  );
}

export default VideoBackground;
