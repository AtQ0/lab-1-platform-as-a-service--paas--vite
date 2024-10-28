import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
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
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Display the movie info here */}
      <div className="movie-info">
        <h2>Movies</h2>
        <p>{movieInfo || 'Loading...'}</p>
      </div>
    </>
  );
}

export default App;
