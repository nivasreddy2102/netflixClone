import React from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Images";
import { addTrailerMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const useMovieTrailer=(movieId)=>{
  const movieTrailer=useSelector((state)=>state.movies.nowTrailerMovies)
     const dispatch = useDispatch();
      useEffect(() => {
        if (!movieId) return;
    
        const fetchTrailer = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            API_OPTIONS
          );
    
          const data = await res.json();
    
          const trailer = data.results?.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
    
          dispatch(
            addTrailerMovies(trailer?.key || data.results?.[0]?.key)
          );
        };
    
      !movieTrailer &&  fetchTrailer();
      }, [movieId, movieTrailer, dispatch]);
    


}
export default useMovieTrailer;