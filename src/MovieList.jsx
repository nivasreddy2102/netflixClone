import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function MovieList({ title, movies }) {
  const sliderRef = useRef(null);

  if (!movies) return null;

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 sm:px-6 md:px-12 mb-10 group">
      {/* TITLE */}
      <h2 className="text-base sm:text-lg md:text-xl text-white font-semibold mb-3 md:mb-4">
        {title}
      </h2>

      {/* LEFT ARROW (DESKTOP ONLY) */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 z-20
          hidden md:group-hover:flex
          items-center justify-center
          w-12 h-20 bg-black/60 hover:bg-black/80
          text-white rounded-r transition
        "
      >
        <ChevronLeft size={30} />
      </button>

      {/* RIGHT ARROW (DESKTOP ONLY) */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 z-20
          hidden md:group-hover:flex
          items-center justify-center
          w-12 h-20 bg-black/60 hover:bg-black/80
          text-white rounded-l transition
        "
      >
        <ChevronRight size={30} />
      </button>

      {/* MOVIE ROW */}
      <div
        ref={sliderRef}
        className="
          flex gap-3 sm:gap-4
          overflow-x-scroll scroll-smooth
          snap-x snap-mandatory
          -ml-4 sm:-ml-6 md:-ml-12
          px-4 sm:px-0
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {movies.map((movie) => (
          <div key={movie.id} className="snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
