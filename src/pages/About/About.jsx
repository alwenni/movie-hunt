// pages/About/About.jsx
export default function About(){ 
    return (
    <div className="about">
      <h1>About MovieHunt</h1>
      <p>
        MovieHunt is a simple React app that allows you to search for movies 
        and view details such as posters, ratings, and plot summaries. You can also add movies to your watchlist.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Search movies by title</li>
        <li>View movie posters, genres, and release year</li>
        <li>Add movies to your watchlist</li>
      </ul>

      <h2>Technologies</h2>
      <p>Built with React, CSS, and the OMDb API.</p>

      <h2>Credits</h2>
      <p>
        All movie data provided by <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>.
      </p>

      <footer>
        <h3>Created by: </h3>
        <ul>
        <li>Mahmood Kadhem</li>
        <li>Husain Alnahash</li>
        <li>Husain Folath</li>
        <li>Ali Jawad</li>
        <li>Mohamed Ali Jaber</li>
        <li>Aqeel Muslim</li>
      </ul>
      </footer>
    </div>
  ); }