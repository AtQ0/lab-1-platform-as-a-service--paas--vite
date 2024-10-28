import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movieInfo, setMovieInfo] = useState([]); // State to store movie information as an array
  const [newMovieName, setNewMovieName] = useState(''); // State for new movie name
  const [newMovieYear, setNewMovieYear] = useState(''); // State for new movie year

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        setMovieInfo(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMovieInfo([{ name: 'Failed to fetch data', year: '' }]);
      });
  }, []);

  // Function to add a new movie
  const addNewMovie = () => {
    if (newMovieName && newMovieYear) {
      const newMovie = { name: newMovieName, year: newMovieYear };
      setMovieInfo([...movieInfo, newMovie]); // Update movie list with new movie
      setNewMovieName(''); // Clear input fields
      setNewMovieYear('');
    } else {
      alert('Please enter both the movie name and year.');
    }
  };

  return (
    <>
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

      {/* Input fields and button to add a new movie */}
      <div className="add-movie">
        <h2>Add New Movie</h2>
        <input
          type="text"
          placeholder="Movie Name"
          value={newMovieName}
          onChange={(e) => setNewMovieName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={newMovieYear}
          onChange={(e) => setNewMovieYear(e.target.value)}
        />
        <button onClick={addNewMovie}>Add Movie</button>
      </div>
    </>
  );
}

export default App;
