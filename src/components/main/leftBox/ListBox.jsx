import React, { useState } from "react";
import MovieList from "./MovieList";

const ListBox = ({ tempMovieData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && <MovieList movies={movies} />}
    </div>
  );
};

export default ListBox;
