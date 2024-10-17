import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

export default function MovieDetails({
  selectedId,
  addToWatchedList,
  setSelectedId,
  watchedList,
}) {
  const [movie, setMovie] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  /* check if the film is already in the watched list */
  const found = watchedList.find((m) => m.id === selectedId);

  useEffect(() => {
    if (!selectedId) return;
    setIsLoading(true);
    setErr(null);

    async function searchSelectedMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}?api_key=84160a7353d1d37c7ead96a2fcac030a`
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Movie not found");
          }
          throw new Error("Something went wrong, try again later");
        }

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setErr(err.message);
        console.error("my log: " + err);
      } finally {
        setIsLoading(false);
      }
    }

    searchSelectedMovie();

    setIsWatched(false);
  }, [selectedId]);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        setSelectedId(null);
        console.log("closing");
      }
    };
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);
  return (
    <div
      style={{ height: "75vh" }}
      className="movie-details bg-zinc-800 p-4 overflow-y-auto"
    >
      <div className="sticky top-0 w-full h-3">
        <button
          onClick={() => setSelectedId(null)}
          id="close-details"
          className="absolute z-10 text-xl font-medium right-0 bg-indigo-600 rounded-full px-2"
        >
          X
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : err ? (
        <div className="h-full flex items-center justify-center text-2xl font-semibold">
          <span>{err}</span>
        </div>
      ) : !movie ? (
        <div className="h-full flex items-center justify-center text-2xl font-semibold">
          <span>There was an error, try again later.</span>
        </div>
      ) : (
        <div>
          <img
            className="w-full rounded-xl mb-4"
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780/${movie?.backdrop_path}`
                : ""
            }
            alt={movie.title}
          />

          <h3 className="text-center text-4xl font-semibold mb-5">
            {movie.title}
          </h3>
          <p className="leading-8 text-lg mb-6">{movie.overview}</p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-indigo-600">
              Origin Country:
            </span>{" "}
            {movie.origin_country[0]}
          </p>

          {movie.genres.length > 0 && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">Genres:</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}

          {movie.release_date && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">
                Release Date:
              </span>{" "}
              {movie.release_date}
            </p>
          )}

          {movie.runtime && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">Runtime:</span>{" "}
              {movie.runtime} min
            </p>
          )}

          {movie.vote_average > 0 && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">
                Vote Average:
              </span>{" "}
              {movie.vote_average.toFixed(1)}⭐
            </p>
          )}

          {movie.budget > 0 && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">Budget:</span>{" "}
              {movie.budget.toLocaleString("it-IT")}$
            </p>
          )}

          {movie.revenue > 0 && (
            <p className="text-lg mb-3">
              <span className="font-semibold text-indigo-600">Revenue:</span>{" "}
              {movie.revenue.toLocaleString("it-IT")}$
            </p>
          )}

          <div className="actions text-center mt-5">
            {isWatched || found ? (
              <StarRating
                addToWatchedList={addToWatchedList}
                oldRating={found?.rating}
                movie={movie}
              />
            ) : (
              <button
                onClick={() => setIsWatched(true)}
                className="p-2 font-semibold text-lg rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 transition-colors"
              >
                I have watched it
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
