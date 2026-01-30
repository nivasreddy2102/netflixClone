import React, { useRef, useState } from "react";
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

  const [searched, setSearched] = useState(false);
  const searchData = useRef("");
  const text = lang[language] || lang.en;

  const handleSearch = async () => {
    const query = searchData.current?.value?.trim();
    if (!query) return;

    setSearched(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      const data = await res.json();
      dispatch(addnowSearchMovies(data.results || []));
    } catch (error) {
      console.error("TMDb Search Error:", error);
      dispatch(addnowSearchMovies([]));
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto px-4 md:px-0">
      {/* SEARCH BAR */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-gray-700 hover:border-red-600"
      >
        <input
          ref={searchData}
          type="text"
          placeholder={text.aiSearchPlaceholder}
          className="w-full px-4 py-3 text-white bg-transparent outline-none placeholder-gray-400"
        />

        <button
          type="submit"
          onClick={handleSearch}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 font-semibold"
        >
          {text.search}
        </button>
      </form>

      {/* RESULTS */}
      {searched && searchMovies?.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2">
          <SearchSuggestion />
        </div>
      )}

      {/* NO RESULTS MESSAGE */}
      {searched && searchMovies?.length === 0 && (
        <div className="mt-3 text-center text-gray-400 text-sm">
          🎬 Movie is not present. Please search for other movies.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
