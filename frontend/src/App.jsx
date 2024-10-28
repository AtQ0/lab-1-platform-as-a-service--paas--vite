import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movieInfo, setMovieInfo] = useState([]); // State to store movie information as an array

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        // Map each movie to an object with name and year for individual rendering
        setMovieInfo(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMovieInfo([{ name: 'Failed to fetch data', year: '' }]);
      });
  }, []);

  return (
    <>
      {/* Display each movie on a new line */}
      <div className="movie-info">
        <h2>Movies</h2>
        {movieInfo.length > 0 ? (
          movieInfo.map((movie, index) => (
            <p key={index}>{movie.name} (Year: {movie.year})</p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
