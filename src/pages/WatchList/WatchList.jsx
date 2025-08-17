// pages/WatchList/WatchList.jsx
import "./WatchList.css";
import { useEffect, useMemo, useState } from "react";

export default function WatchList({ watchlist = [], loading, error, setWatchList }) {
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!Array.isArray(watchlist) || watchlist.length === 0) {
    return <p className="muted">Add a movie to the watchlist to begin.</p>;
  }

  const apiKey = import.meta.env.VITE_OMDB_KEY;

  // Local cache of fetched details: { [imdbID]: fullMovie }
  const [detailsById, setDetailsById] = useState({});
  const [enriching, setEnriching] = useState(false);
  const [enrichError, setEnrichError] = useState("");

  // Helper: decide if an item needs enrichment (missing common detail fields)
  const needsEnrichment = useMemo(
    () =>
      watchlist.filter(
        (m) =>
          m &&
          (!m.Genre || !m.Rated || !m.Runtime || !m.imdbRating || m.Poster === "N/A")
      ),
    [watchlist]
  );

  // Fetch full details for any items that need it (by imdbID; fallback by title+year)
  useEffect(() => {
    if (!apiKey) return; // silently skip if key missing

    const controller = new AbortController();

    async function hydrate() {
      // Collect unique IDs we don't already have in cache
      const ids = [
        ...new Set(
          needsEnrichment
            .map((m) => m.imdbID)
            .filter(Boolean)
            .filter((id) => !detailsById[id])
        ),
      ];

      // If any items lack imdbID, try by title/year as a fallback
      const titleLookups = needsEnrichment.filter((m) => !m.imdbID && m?.Title);

      if (ids.length === 0 && titleLookups.length === 0) return;

      setEnriching(true);
      setEnrichError("");

      try {
        const idFetches = ids.map(async (id) => {
          const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(
            id
          )}&plot=short`;
          const res = await fetch(url, { signal: controller.signal });
          const data = await res.json();
          return data.Response === "True" ? { id, data } : null;
        });

        const titleFetches = titleLookups.map(async (m) => {
          const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
            m.Title
          )}${m.Year ? `&y=${encodeURIComponent(m.Year)}` : ""}&plot=short`;
          const res = await fetch(url, { signal: controller.signal });
          const data = await res.json();
          // Try to synthesize an id key to store in cache if api returned one
          return data.Response === "True" && data.imdbID
            ? { id: data.imdbID, data }
            : null;
        });

        const results = await Promise.all([...idFetches, ...titleFetches]);

        const ok = results.filter(Boolean);
        if (ok.length) {
          setDetailsById((prev) => {
            const next = { ...prev };
            for (const { id, data } of ok) next[id] = data;
            return next;
          });
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          setEnrichError("Some details could not be fetched.");
        }
      } finally {
        setEnriching(false);
      }
    }

    hydrate();
    return () => controller.abort();
  }, [apiKey, needsEnrichment, detailsById]);

  // Merge cached details into each watchlist item for display
  const displayList = watchlist.map((m) => {
    const extra = m.imdbID && detailsById[m.imdbID] ? detailsById[m.imdbID] : {};
    return { ...m, ...extra };
  });

  const removeMovie = (idOrTitle) => {
    setWatchList((prev) => prev.filter((m) => (m.imdbID ?? m.Title) !== idOrTitle));
  };

  const validPoster = (p) => p && p !== "N/A";

  return (
    <div className="watchlist">
      {enrichError && <p className="error">{enrichError}</p>}
      {enriching && <p className="muted">Fetching details…</p>}

      {displayList.map((movie, idx) => (
        <div
          className="watchlist-item"
          key={movie.imdbID || `${movie.Title}-${movie.Year}-${idx}`}
        >
          {validPoster(movie.Poster) && <img src={movie.Poster} alt={movie.Title} />}

          <p>
            {movie.Title} {movie.Year ? `(${movie.Year})` : null}
          </p>

          <p>{movie.Genre || "—"}</p>

          <p>
            <strong>Rated:</strong> {movie.Rated || "—"} {" • "}
            <strong>Runtime:</strong> {movie.Runtime || "—"}
          </p>

          <p>
            <strong>IMDb Rating:</strong> {movie.imdbRating || "—"}
          </p>

          <button
            type="button"
            onClick={() => removeMovie(movie.imdbID || movie.Title)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
