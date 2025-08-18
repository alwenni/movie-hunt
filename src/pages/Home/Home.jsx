// pages/Home/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import NavBar from "../../components/Nav/Nav";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OMDB_KEY;

  async function searchMovies(term = query, nextPage = 1) {
    const q = (term || "").trim();
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        q
      )}&page=${nextPage}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setResults(data.Search || []);
        setTotalResults(Number(data.totalResults || 0));
        setPage(nextPage);
      } else {
        setResults([]);
        setTotalResults(0);
        setError(data.Error || "No results.");
      }
    } catch {
      setResults([]);
      setTotalResults(0);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchMovies(query, 1);
  }

  const totalPages = Math.ceil(totalResults / 10);

  useEffect(() => {
    searchMovies("The Purge", 1);

  }, []);

  return (
    <div>

      <h1 class="Welcome-Msg">Welcome to MovieHunt</h1>
      <p className="read-the-docs">Search any movie title and browse results below.</p>

      <form onSubmit={handleSubmit}>
        <div   className="input-container">

        <input
          type="search"
          placeholder="Search movies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movies"
        
        />
        </div>
        <div>

        <button type="submit">Search</button>
        </div>
      </form>

      {loading && <p className="muted">Loading…</p>}
      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && results.length > 0 && (
        <>
          <section className="grid" aria-live="polite">
            {results.map((m) => (
              <Link
                key={m.imdbID}
                to={`/description/${m.imdbID}`}     // ← navigate to description page
                className="grid-card"
                title={m.Title}
                state={{ movie: m }}
              >
                <div className="thumb">
                  {m.Poster && m.Poster !== "N/A" ? (
                    <img src={m.Poster} alt={`${m.Title} poster`} loading="lazy" />
                  ) : (
                    <span className="no-poster">No poster</span>
                  )}
                </div>
                <div className="meta">
                  <strong style={{ display: "block" }}>{m.Title}</strong>
                  <span>{m.Year}</span>
                </div>
              </Link>
            ))}
          </section>

          {totalPages > 1 && (
            <nav className="pager" aria-label="Pagination">
              <button
                disabled={page <= 1}
                onClick={() => searchMovies(query, page - 1)}
              >
                Prev
              </button>
              <span>
                 Page {page} of {totalPages} 
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => searchMovies(query, page + 1)}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="muted">Try a title like “Inception” or “The Matrix”.</p>
      )}
    </div>
  );
}
