import React from "react";
import { BG_netflix } from "./utils/Images";
import SearchBar from "./SearchBar";
import SearchSuggestion from "./SearchSuggestion";
import { useSelector } from "react-redux";

function Search() {
  const searchData = useSelector((store) => store.movies.nowSearchMovies);

  return (
    <div className="relative min-h-screen w-screen">
      {/* Background */}
      <img
        src={BG_netflix}
        alt="Netflix Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Search Bar Container */}
      <div className="relative z-10 flex justify-center pt-20 sm:pt-28 md:pt-40 px-4">
        <SearchBar />
      </div>

      {/* Optional: Suggestions below SearchBar */}
      {searchData?.length > 0 && (
        <div className="relative z-10 mt-4 px-4 md:px-12">
          <SearchSuggestion />
        </div>
      )}
    </div>
  );
}

export default Search;
