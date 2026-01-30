import { useDispatch } from "react-redux";
import {  addnowUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Images";
import { useSelector } from "react-redux";
const upcomingMovies=()=>{
const dispatch=useDispatch()
const upcoming=useSelector((state)=>state.movies.nowUpcomingMovies)
  const fetching = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addnowUpcomingMovies(data.results))
      // console.log(data.results); // movies array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
   !upcoming && fetching();
  }, []);
}

export default upcomingMovies;