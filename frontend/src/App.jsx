import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movieInfo, setMovieInfo] = useState([]); // State to store movie information as an array
  const [newMovieName, setNewMovieName] = useState(''); // State for new movie name
  const [newMovieYear, setNewMovieYear] = useState(''); // State for new movie year
  const [editMovieId, setEditMovieId] = useState(null); // State for the movie currently being edited
  const [editMovieName, setEditMovieName] = useState(''); // State for the name of the movie being edited
  const [editMovieYear, setEditMovieYear] = useState(''); // State for the year of the movie being edited

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

  // Function to add a new movie via POST request
  const addNewMovie = () => {
    if (newMovieName && newMovieYear) {
      const newMovie = { name: newMovieName, year: newMovieYear };

      // Send a POST request to add the new movie to the backend
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      })
        .then((response) => response.json())
        .then((addedMovie) => {
          setMovieInfo([...movieInfo, addedMovie]); // Update movie list with the newly added movie
          setNewMovieName(''); // Clear input fields
          setNewMovieYear('');
        })
        .catch((error) => {
          console.error('Error adding movie:', error);
          alert('Failed to add movie.');
        });
    } else {
      alert('Please enter both the movie name and year.');
    }
  };

  // Function to edit a movie
  const editMovie = (movie) => {
    setEditMovieId(movie.id); // Set the ID of the movie to be edited
    setEditMovieName(movie.name); // Set the input field for name
    setEditMovieYear(movie.year); // Set the input field for year
  };

  // Function to save the edited movie
  const saveEditedMovie = () => {
    if (editMovieName && editMovieYear && editMovieId) {
      const updatedMovie = { name: editMovieName, year: editMovieYear };

      fetch(`/api/${editMovieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      })
        .then((response) => response.json())
        .then((updatedMovie) => {
          // Update the movie list with the edited movie
          setMovieInfo(movieInfo.map(movie => (movie.id === editMovieId ? updatedMovie : movie)));
          setEditMovieName(''); // Clear edit input fields
          setEditMovieYear('');
          setEditMovieId(null); // Clear edit mode
        })
        .catch((error) => {
          console.error('Error updating movie:', error);
          alert('Failed to update movie.');
        });
    } else {
      alert('Please enter both the movie name and year.');
    }
  };

  // Function to delete a movie by ID
  const deleteMovie = (id) => {
    fetch(`/api/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the movie list after successful deletion
          setMovieInfo(movieInfo.filter(movie => movie.id !== id));
        } else {
          alert('Failed to delete movie.');
        }
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie.');
      });
  };

  return (
    <>
      <div className="movie-info">
        <h2>Movies</h2>
        {movieInfo.length > 0 ? (
          movieInfo.map((movie) => (
            <div key={movie.id} className="movie-item">
              <p className="movie-details">{movie.name} (Year: {movie.year})</p>
              <div className="movie-actions">
                <button className="edit-button" onClick={() => editMovie(movie)}>Edit</button>
                <button className="remove-button" onClick={() => deleteMovie(movie.id)}>Remove</button>
              </div>
            </div>
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

      {/* Edit Movie Modal */}
      {editMovieId && (
        <div className="edit-movie-modal">
          <button className="close-button" onClick={() => setEditMovieId(null)}>X</button>
          <h2>Edit Movie</h2>
          <input
            type="text"
            placeholder="Movie Name"
            value={editMovieName}
            onChange={(e) => setEditMovieName(e.target.value)} // Update the edit movie name
          />
          <input
            type="number"
            placeholder="Year"
            value={editMovieYear}
            onChange={(e) => setEditMovieYear(e.target.value)} // Update the edit movie year
          />
          <button className="modal-button" onClick={saveEditedMovie}>Save Changes</button>
          <button className="modal-button" onClick={() => setEditMovieId(null)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default App;
