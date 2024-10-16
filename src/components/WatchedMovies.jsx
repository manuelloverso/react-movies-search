export default function WatchedMovies({
  removeFromWatchedList,
  watchedList,
  setSelectedId,
}) {
  console.log(watchedList);
  return (
    <div
      style={{ height: "75vh" }}
      className="movie-details rounded-xl bg-zinc-800 p-4 overflow-y-auto"
    >
      <header className="bg-indigo-600 rounded-xl p-4 mb-3">
        <h3 className="text-center font-medium text-xl">Movies you watched</h3>
      </header>

      {watchedList.length < 1 ? (
        <p className="text-center font-medium text-lg mt-6">
          There are no saved movies
        </p>
      ) : (
        <ul className="">
          {watchedList.map((movie) => (
            <li
              className="p-3 border-b border-gray-600 flex items-center gap-3 hover:bg-zinc-700 "
              key={movie.id}
            >
              <img
                className="w-12"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="w-full">
                <h4
                  onClick={() => setSelectedId(movie.id)}
                  className="text-lg font-medium cursor-pointer"
                >
                  {movie.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span>{movie.runtime}min ⏳</span>
                    <span>{movie.rating}⭐</span>
                  </span>

                  <button
                    onClick={() => removeFromWatchedList(movie.id)}
                    className="rounded-full px-2 bg-red-500"
                  >
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
