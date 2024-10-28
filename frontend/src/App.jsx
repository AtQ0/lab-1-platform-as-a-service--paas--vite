import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movieInfo, setMovieInfo] = useState(''); // State to store movie information

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        // Construct a string that includes each movie's name and year
        const movieInfo = result
          .map(movie => `${movie.name} (Year: ${movie.year})`)
          .join(', ');

        setMovieInfo(movieInfo); // Update the state with movieInfo
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMovieInfo('Failed to fetch data');
      });
  }, []);

  return (
    <>
      {/* Display movie info here */}
      <div className="movie-info">
        <h2>Movies</h2>
        <p>{movieInfo || 'Loading...'}</p>
      </div>
    </>
  );
}

export default App;
