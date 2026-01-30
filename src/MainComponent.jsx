import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground.jsx";
import VideoTitle from "./VideoTitle.jsx";

function MainComponent() {
  const nowPlayingMovies = useSelector(
    (state) => state.movies?.nowPlayingMovies
  );

  if (!nowPlayingMovies || nowPlayingMovies.length === 0) return null;

  const { id, original_title, overview, title } = nowPlayingMovies[12];


  return (
    <div>
      <VideoTitle
        title={original_title || title}
        overview={overview}
      />
      <VideoBackground movieId={id} />
    </div>
  );
}

export default MainComponent;
