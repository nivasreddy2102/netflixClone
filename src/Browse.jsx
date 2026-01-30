import playingMovies from "./hooks/useplayingMovies"
import Header from "./Header";
import React from "react";
import MainComponent from "./MainComponent";
import SecondaryContainer from "./SecondaryContainer";
import popularMovies from "./hooks/usePopularMovies";
import topMovies from "./hooks/useTopMovies";
import upcomingMovies from "./hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import Search from "./Search";



function Browse() {
  const search=useSelector((state)=>state.search.toggleSearch);
  // console.log(search)
  playingMovies();
  popularMovies();
  topMovies();
  upcomingMovies();

  return (
    <div>
      <Header />
      {search?<Search/>:<>
        <MainComponent/>
      <SecondaryContainer/>
      </>}
    
    </div>
  );
}

export default Browse;
