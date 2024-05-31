import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    const getData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${apiUrl}?apikey=${apiKey}&s=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");

        // console.log(movies); this gonna be empty array cuz setting state is async
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, error, movies };
}
