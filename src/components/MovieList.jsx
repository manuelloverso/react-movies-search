import { useEffect, useState } from "react";
import Movie from "./Movie";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";

const api_key = "84160a7353d1d37c7ead96a2fcac030a";

export default function MovieList({ query, isSearched }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  /* selected movie */
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!isSearched) return;
    setErr(null);
    setIsLoading(true);
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong, try again later");

        const data = await res.json();

        if (data.results.length == 0) throw new Error("No results found");

        setMovies(data.results);
      } catch (err) {
        setErr(err.message);
        console.error("my log: " + err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="container mx-auto md:px-24">
      <div className="flex pt-10 ">
        <div className="movie-list w-1/2 p-6">
          <div
            style={{ height: "75vh" }}
            className="card rounded-lg bg-zinc-800 p-4 overflow-y-auto"
          >
            {isLoading ? (
              <Loader />
            ) : err ? (
              <div className="h-full flex items-center justify-center text-2xl font-semibold">
                <span>{err}</span>
              </div>
            ) : !isSearched ? (
              <div className="h-full flex items-center justify-center text-2xl font-semibold">
                <span>Search some movies</span>
              </div>
            ) : (
              <>
                <ul className="flex flex-col ">
                  {movies.map((movie) => (
                    <li
                      onClick={() => setSelectedId(movie.id)}
                      key={movie.id}
                      className="border-b border-gray-600 hover:bg-zinc-700 cursor-pointer"
                    >
                      <Movie movie={movie} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="movie-details w-1/2 p-6">
          {selectedId && <MovieDetails selectedId={selectedId} />}
        </div>
      </div>
    </div>
  );
}
