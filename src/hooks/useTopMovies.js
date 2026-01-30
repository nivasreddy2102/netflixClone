import { useDispatch } from "react-redux";
import {  addnowTopMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Images";
import { useSelector } from "react-redux";
const topMovies=()=>{
const dispatch=useDispatch()
const top=useSelector((state)=>state.movies.nowTopMovies)
  const fetching = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addnowTopMovies(data.results))
      // console.log(data.results); // movies array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
   !top && fetching();
  }, []);
}

export default topMovies;