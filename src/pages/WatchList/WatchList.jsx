// pages/WatchList/WatchList.jsx
export default function WatchList({watchlist,loading, error}){

    if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
//   if (!watchlist) return <p className="muted">Add a movie to the watchlist to begin.</p>;

    const watchlist2=[
        {Title:"something",Year:2025,Genre:"Comedy", Rated:"PG-13", imdbRating:"7.4",Runtime:"121 min",Poster:"https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"},
        {Title:"something",Year:2025,Genre:"Comedy", Rated:"PG-13", imdbRating:"7.4",Runtime:"121 min",Poster:"https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"},
        {Title:"something",Year:2025,Genre:"Comedy", Rated:"PG-13", imdbRating:"7.4",Runtime:"121 min",Poster:"https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"},
        {Title:"something",Year:2025,Genre:"Comedy", Rated:"PG-13", imdbRating:"7.4",Runtime:"121 min",Poster:"https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"},
        {Title:"something",Year:2025,Genre:"Comedy", Rated:"PG-13", imdbRating:"7.4",Runtime:"121 min",Poster:"https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"},
    ]
     return (
        <div>
            {
                watchlist2.map(movie=> (
                    <div>
                        <img src={movie.Poster} alt={movie.Title} />
                        <p>{movie.Title} {`(${movie.Year})`}</p>
                        <p>{movie.Genre}</p>
                        <p><strong> Rated:</strong> {movie.Rated} • <strong>Runtime:</strong> {movie.Runtime} </p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>

                    </div>
                ))
            }
        </div>
     )
    
}