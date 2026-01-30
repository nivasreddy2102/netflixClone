import React from "react"; 
import { useSelector } from "react-redux"; 
import MovieList from "./MovieList"; 
 
function SecondaryContainer() { 
  const movies = useSelector( 
    (state) => state.movies); 
 
  if (!movies) return null; 
 
  return ( 
      <div className="bg-[#141414]">
      <div className="-mt-32 md:-mt-20 relative z-30 px-4 md:px-12 lg:px-16 space-y-8 pb-20"> 
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} /> 
        <MovieList title="Popular Movies" movies={movies.nowPopularMovies} /> 
        <MovieList title="Top Rated Movies" movies={movies.nowTopMovies} /> 
        <MovieList title="Upcoming Movies" movies={movies.nowComingMovies} /> 
      </div> 
    </div> 
  ); 
} 
 
export default SecondaryContainer;