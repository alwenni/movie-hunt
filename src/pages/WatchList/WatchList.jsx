// pages/WatchList/WatchList.jsx
export default function WatchList({ watchlist = [], loading, error, onRemove }) {
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  if (!Array.isArray(watchlist) || watchlist.length === 0) {
    return <p className="muted">Add a movie to the watchlist to begin.</p>;
  }

  return (
    <div className="watchlist">
      {watchlist.map((movie, idx) => (
        <div className="watchlist-item" key={movie.imdbID || `${movie.Title}-${movie.Year}-${idx}`}>
          {movie.Poster && <img src={movie.Poster} alt={movie.Title} />}
          <p>{movie.Title} {movie.Year ? `(${movie.Year})` : null}</p>
          {movie.Genre && <p>{movie.Genre}</p>}
          <p>
            {movie.Rated && (<><strong>Rated:</strong> {movie.Rated} </>)}
            {movie.Runtime && (<>• <strong>Runtime:</strong> {movie.Runtime}</>)}
          </p>
          {movie.imdbRating && <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>}

          {onRemove && (
            <button type="button" onClick={() => onRemove(movie.imdbID || movie.Title)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
