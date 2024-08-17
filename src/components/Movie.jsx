export default function Movie({ movie }) {
  return (
    <div className="movie-card flex items-center gap-3 p-3">
      <img
        className="w-16"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />

      <div className="info">
        <h4 className="font-bold text-lg">{movie.title}</h4>
        <p>Released: {movie.release_date}</p>
      </div>
    </div>
  );
}
