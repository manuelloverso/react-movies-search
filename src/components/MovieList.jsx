import { useEffect, useState } from "react";

export default function MovieList({ query }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function searchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${query}`
        );
        const data = await res.json();
        console.log(data.results);

        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    }

    searchMovie();
  }, [query]);

  return (
    <div className="container mx-auto md:px-24">
      <div className="flex pt-10 ">
        <div className="movie-list w-1/2 p-6">
          <div className="card rounded-lg bg-zinc-800 p-4">
            <h3 className="font-semibold text-2xl">Search results ⬇️</h3>
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="movie-details w-1/2 p-6"></div>
      </div>
    </div>
  );
}
