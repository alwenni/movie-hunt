// pages/Description/Description.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Description({ setWatchList, watchList }) {
  const { imdbID } = useParams();
  const location = useLocation();
  const stateMovie = location.state?.movie || null;

  const [movie, setMovie] = useState(stateMovie);          // show something immediately if passed
  const [loading, setLoading] = useState(!stateMovie);     // fetch if missing
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OMDB_KEY;

  useEffect(() => {
    const ctrl = new AbortController();

    // Always fetch details by ID so we have full fields (Genre, Rated, Plot, etc.)
    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");

        if (!apiKey) {
          setError("Missing OMDb API key (VITE_OMDB_KEY).");
          setLoading(false);
          return;
        }

        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`Network error (${res.status})`);
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found.");
        }

        // If we had a minimal object from state, merge it with full details (details win)
        setMovie(prev => ({ ...(prev || {}), ...data }));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load movie.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (imdbID) fetchDetails();

    return () => ctrl.abort();
  }, [imdbID, apiKey]);

  // Avoid duplicates in watchlist
  const inWatchlist = useMemo(
    () => Array.isArray(watchList) && movie && watchList.some(m => m.imdbID === movie.imdbID),
    [watchList, movie]
  );

  function addToWatchList() {
    if (!movie || inWatchlist) return;
    setWatchList([...(watchList || []), movie]);
  }

  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="muted">No movie found.</p>;

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div>
      <h1>Description for {imdbID}</h1>

      <h2>{movie.Title}</h2>
      {hasPoster && <img src={movie.Poster} alt={movie.Title} />}

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

      <button
        type="button"
        onClick={addToWatchList}
        disabled={inWatchlist}
        title={inWatchlist ? "Already in watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? "In Watchlist ✓" : "Add to Watchlist"}
      </button>
    </div>
  );
}
