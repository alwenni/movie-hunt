// pages/Description/Description.jsx
import { useLocation, useParams } from "react-router-dom";

export default function Description({ setWatchList, watchList, loading, error }) {
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  const { imdbID } = useParams();                  // ✅ get id from URL
  const location = useLocation();
  const movie = location.state?.movie;             // ✅ movie passed via Link state

  if (!movie) return <p className="muted">Search for a movie to begin.</p>;

  function addToWatchList() {
    // avoid duplicates
    const exists = Array.isArray(watchList) && watchList.some(m => m.imdbID === movie.imdbID);
    if (!exists) {
      setWatchList([...(watchList || []), movie]);
    }
  }

  return (
    <div>
      <h1>Description for {imdbID}</h1>

      <h2>{movie.Title}</h2>
      {movie.Poster && <img src={movie.Poster} alt={movie.Title} />}
      {movie.Genre && <p>{movie.Genre}</p>}

      <p>
        {movie.Released && (<><strong>Released:</strong> {movie.Released} </>)}
        {movie.Rated && (<>• <strong>Rated:</strong> {movie.Rated} </>)}
        {movie.Metascore && (<>• <strong>Metascore:</strong> {movie.Metascore} </>)}
        {movie.imdbRating && (<>• <strong>IMDb rating:</strong> {movie.imdbRating}</>)}
      </p>

      {movie.Runtime && <p><strong>Runtime:</strong> {movie.Runtime}</p>}
      {movie.BoxOffice && <p><strong>Earnings:</strong> {movie.BoxOffice}</p>}
      {movie.Plot && <p>{movie.Plot}</p>}

      <button type="button" onClick={addToWatchList}>
        Add to Watchlist
      </button>
    </div>
  );
}
