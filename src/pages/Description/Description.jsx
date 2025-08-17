
// pages/Description/Description.jsx
import { useParams } from "react-router-dom";
export default function Description({ movie, loading, error }) {
  const { id } = useParams();
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="muted">Search for a movie to begin.</p>;

  return (
    <div>

      <h1>Description for {id}</h1>
      <h2>{movie.Title}</h2>
      <p>{movie.Genre}</p>
      <p> <strong>Released:</strong> {movie.Released}</p>
      <p><strong>Rated:</strong> {movie.Rated}  • <strong> Metascore:</strong> {movie.Metascore} • <strong> IMDb rating:</strong>  {movie.imbdRating}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p>Earnings: {movie.BoxOffice}</p>
      <p>{movie.Plot}</p>
    </div>
  )
}