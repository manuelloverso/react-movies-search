import { useEffect, useState } from "react";
import Movie from "./Movie";
import Loader from "./Loader";

export default function MovieList({ query, isSearched }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!isSearched) return;
    setErr(null);
    setIsLoading(true);
    async function searchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${query}`
        );

        console.log(res);

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

    searchMovie();
  }, [query]);

  return (
    <div className="container mx-auto md:px-24">
      <div className="flex pt-10 ">
        <div className="movie-list w-1/2 p-6">
          <div className="card rounded-lg bg-zinc-800 p-4">
            {isLoading ? (
              <Loader />
            ) : err ? (
              <span>{err}</span>
            ) : !isSearched ? (
              <span>Search some films</span>
            ) : (
              <>
                <h3 className="font-semibold text-2xl mb-3">
                  Search results ⬇️
                </h3>
                <ul className="flex flex-col ">
                  {movies.map((movie) => (
                    <li
                      key={movie.id}
                      className="border-b border-gray-600 hover:bg-zinc-700"
                    >
                      <Movie movie={movie} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="movie-details w-1/2 p-6"></div>
      </div>
    </div>
  );
}
