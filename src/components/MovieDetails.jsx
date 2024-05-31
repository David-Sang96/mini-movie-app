import React, { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import StarRating from "./StarRating";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [userRating, setUserRating] = useState("");
  useKey("Escape", onCloseMovie);

  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
      // console.log(`clean up function for movie ${title}`);
    };
  }, [title]);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      ratingCount: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  if (isError) return <ErrorMessage message={isError} />;

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
