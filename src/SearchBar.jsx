import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "./utils/languageConstants";
import { API_OPTIONS } from "./utils/Images";
import { addnowSearchMovies } from "./utils/moviesSlice";
import SearchSuggestion from "./SearchSuggestion";

const SearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config?.language);
  const searchMovies = useSelector(
    (store) => store.movies.nowSearchMovies
  );

  const searchData = useRef("");
  const text = lang[language] || lang.en;

  const handleSearch = async () => {
    const query = searchData.current?.value;
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      const data = await res.json();
      dispatch(addnowSearchMovies(data.results));
    } catch (error) {
      console.error("TMDb Search Error:", error);
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto px-4 md:px-0">
      {/* SEARCH BAR */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          flex items-center
          bg-black/80 backdrop-blur-sm
          rounded-lg overflow-hidden shadow-2xl
          border border-gray-700
          transition-all duration-300
          hover:border-red-600
        "
      >
        <input
          ref={searchData}
          type="text"
          placeholder={text.aiSearchPlaceholder}
          className="
            w-full
            px-4 md:px-5 py-3 md:py-3.5
            text-white text-base md:text-lg
            bg-transparent outline-none
            placeholder-gray-400 focus:placeholder-gray-500
          "
        />

        <button
          onClick={handleSearch}
          type="submit"
          className="
            bg-gradient-to-r from-red-600 to-red-700
            hover:from-red-700 hover:to-red-800
            text-white px-4 md:px-8
            py-3 md:py-3.5
            text-sm md:text-lg font-semibold
            transition-all duration-300
            hover:shadow-lg hover:shadow-red-600/50
            
          "
        >
          {text.search}
        </button>
      </form>

      {/* SEARCH RESULTS DROPDOWN */}
      {searchMovies && searchMovies.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 sm:mt-3 px-0 sm:px-0">
          <SearchSuggestion />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
