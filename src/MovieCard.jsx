import React from "react";
import { IMG_CDN_URL } from "./utils/Images";

function MovieCard({ movie }) {
  if (!movie?.poster_path) return null;

  return (
    <div
      className="
        min-w-[120px] sm:min-w-[140px] md:min-w-[180px] lg:min-w-[200px]
        cursor-pointer
        transition duration-300
        md:hover:scale-110 md:hover:z-10
        px-1
      "
    >
      <img
        src={IMG_CDN_URL + movie.poster_path}
        alt={movie.title}
        className="rounded-md w-full"
      />
    </div>
  );
}

export default MovieCard;
