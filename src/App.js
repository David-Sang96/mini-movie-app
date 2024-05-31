import { useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import Main from "./components/main/Main";
import Box from "./components/main/leftBox/Box";
import MovieList from "./components/main/leftBox/MovieList";
import WatchedList from "./components/main/rightBox/WatchedList";
import WatchedSummary from "./components/main/rightBox/WatchedSummary";
import Logo from "./components/nav/Logo";
import Navbar from "./components/nav/Navbar";
import NumResults from "./components/nav/NumResults";
import Search from "./components/nav/Search";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useMovies } from "./hooks/useMovie";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { isLoading, error, movies } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    const isExisted = watched.some((item) => item.imdbID === movie.imdbID);
    if (!isExisted) setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("Watched", JSON.stringify([...watched, movie]));
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        /> */}
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
