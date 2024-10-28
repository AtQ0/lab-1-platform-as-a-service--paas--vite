import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [movieInfo, setMovieInfo] = useState([]);
    const [newMovieName, setNewMovieName] = useState('');
    const [newMovieYear, setNewMovieYear] = useState('');
    const [editMovieId, setEditMovieId] = useState(null);
    const [editMovieName, setEditMovieName] = useState('');
    const [editMovieYear, setEditMovieYear] = useState('');

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

    const addNewMovie = () => {
        if (newMovieName && newMovieYear) {
            const newMovie = { name: newMovieName, year: newMovieYear };

            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            })
                .then((response) => response.json())
                .then((addedMovie) => {
                    setMovieInfo([...movieInfo, addedMovie]);
                    setNewMovieName('');
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

    const editMovie = (movie) => {
        setEditMovieId(movie.id);
        setEditMovieName(movie.name);
        setEditMovieYear(movie.year);
    };

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
                    setMovieInfo(movieInfo.map(movie => (movie.id === editMovieId ? updatedMovie : movie)));
                    setEditMovieName('');
                    setEditMovieYear('');
                    setEditMovieId(null);
                })
                .catch((error) => {
                    console.error('Error updating movie:', error);
                    alert('Failed to update movie.');
                });
        } else {
            alert('Please enter both the movie name and year.');
        }
    };

    const deleteMovie = (id) => {
        fetch(`/api/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
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

            {editMovieId && (
                <div className="edit-movie-modal">
                    <button className="close-button" onClick={() => setEditMovieId(null)}>X</button>
                    <h2>Edit Movie</h2>
                    <input
                        type="text"
                        placeholder="Movie Name"
                        value={editMovieName}
                        onChange={(e) => setEditMovieName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={editMovieYear}
                        onChange={(e) => setEditMovieYear(e.target.value)}
                    />
                    <button className="modal-button" onClick={saveEditedMovie}>Save Changes</button>
                    <button className="modal-button" onClick={() => setEditMovieId(null)}>Cancel</button>
                </div>
            )}
        </>
    );
}

export default App;
