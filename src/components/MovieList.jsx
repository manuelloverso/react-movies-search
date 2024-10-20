import { useEffect, useState } from "react";
import Movie from "./Movie";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import WatchedMovies from "./WatchedMovies";
import { motion } from "framer-motion";

const api_key = "84160a7353d1d37c7ead96a2fcac030a";

export default function MovieList({ query, isSearched }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  /* selected movie */
  const [selectedId, setSelectedId] = useState(null);
  const [watchedList, setWatchedList] = useState(function () {
    const list = JSON.parse(localStorage.getItem("list"));
    return list;
  });

  /*   useEffect(() => {
    const list = JSON.parse(localStorage.getItem("list"));
    if (list) setWatchedList(list);
  }, []); */

  const addToWatchedList = (movie, rating) => {
    const { id, title, poster_path, runtime } = movie;
    const newMovie = { id, title, poster_path, runtime, rating };
    const foundIndex = watchedList.findIndex((m) => m.id === newMovie.id);

    if (foundIndex !== -1) {
      // Movie exists, so update its rating
      const updatedList = [...watchedList];
      updatedList[foundIndex] = { ...updatedList[foundIndex], rating };
      setWatchedList(updatedList);
      localStorage.setItem("list", JSON.stringify(updatedList));
    } else {
      // Movie does not exist, add it to the list
      setWatchedList([newMovie, ...watchedList]);
      localStorage.setItem("list", JSON.stringify([newMovie, ...watchedList]));
    }

    setSelectedId(null);
  };

  const removeFromWatchedList = (id) => {
    const newArr = watchedList.filter((m) => m.id !== id);
    setWatchedList(newArr);
    localStorage.setItem("list", JSON.stringify(newArr));
  };

  useEffect(() => {
    const controller = new AbortController();

    if (!isSearched) return;
    setErr(null);
    setIsLoading(true);
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong, try again later");

        const data = await res.json();

        if (data.results.length == 0) throw new Error("No results found");

        setMovies(data.results);
        setErr(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErr(err.message);
        }
        console.error("my log: " + err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, isSearched]);

  return (
    <div className="container mx-auto md:px-24">
      <div className="flex flex-wrap pt-10 ">
        <div className="movie-details w-full md:w-1/2 md:order-last p-6">
          {selectedId ? (
            <MovieDetails
              watchedList={watchedList}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              addToWatchedList={addToWatchedList}
            />
          ) : (
            <WatchedMovies
              setSelectedId={setSelectedId}
              removeFromWatchedList={removeFromWatchedList}
              watchedList={watchedList}
            />
          )}
        </div>
        <div className="movie-list w-full md:w-1/2 p-6">
          <div
            style={{ height: "75vh" }}
            className="cards bg-zinc-800 p-4 overflow-y-auto"
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
                <p className="text-end text-indigo-600 text-xl font-medium">
                  {movies.length} movies found
                </p>
                <ul className="flex flex-col ">
                  {movies.map((movie) => (
                    <motion.li
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setSelectedId(movie.id)}
                      key={movie.id}
                      className="border-b border-gray-600 hover:bg-zinc-700 cursor-pointer"
                    >
                      <Movie movie={movie} />
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
