import { useDispatch, useSelector } from "react-redux";
import { addnowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Images";
const playingMovies=()=>{
const dispatch=useDispatch()
const playing=useSelector((state)=>state.movies.nowPlayingMovies)
  const fetching = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addnowPlayingMovies(data.results))
      // console.log(data.results); // movies array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !playing && fetching();
  }, [playing]);
}

export default playingMovies;