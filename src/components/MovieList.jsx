import { useEffect, useState } from "react";

export default function MovieList({ query }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function searchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=84160a7353d1d37c7ead96a2fcac030a&query=${query}`
        );
        const data = await res.json();
        setMovie(data.results[0].title);
      } catch (err) {
        console.error(err);
      }
    }

    searchMovie();
  }, [query]);

  return <div className="movie-list">{movie}</div>;
}
