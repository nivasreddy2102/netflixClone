import { useDispatch } from "react-redux";
import { addnowPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Images";
import { useSelector } from "react-redux";
const popularMovies=()=>{
const dispatch=useDispatch()
const popular=useSelector((state)=>state.movies.nowPopularMovies)
  const fetching = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addnowPopularMovies(data.results))
      // console.log(data.results); // movies array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    !popular && fetching();
  }, []);
}

export default popularMovies;