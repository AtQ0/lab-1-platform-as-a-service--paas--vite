const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const { Client } = require('pg');
const cron = require('node-cron');

const app = express();

dotenv.config();

// Connect to PostgreSQL database via PGURI in .env
const client = new Client({
    connectionString: process.env.PGURI,
});

client.connect();

// Middleware to parse JSON data
app.use(express.json());

// Serve frontend files from the 'dist' folder
app.use(express.static(path.join(path.resolve(), 'dist')));

// Default movies to reset the table with
const defaultMovies = [
    { name: 'Dancing with the wolves', year: 1994 },
    { name: 'Demolition Man', year: 1997 },
    { name: 'Casino', year: 1997 },
];

// Function to reset the movies table
const resetMoviesTable = async () => {
    try {
        await client.query('DELETE FROM movies'); // Clear existing data
        for (const movie of defaultMovies) {
            await client.query(
                'INSERT INTO movies (name, year) VALUES ($1, $2)',
                [movie.name, movie.year]
            );
        }
        console.log('Movies table reset to default values.');
    } catch (error) {
        console.error('Error resetting movies table:', error);
    }
};

// Schedule the reset to run every 5 minutes
cron.schedule('*/5 * * * *', resetMoviesTable);

// GET route to fetch all movies
app.get('/api', async (request, response) => {
    try {
        const { rows } = await client.query('SELECT * FROM movies');
        response.json(rows);
    } catch (error) {
        console.error('Error fetching movies:', error);
        response.status(500).json({ error: 'Failed to fetch movies' });
    }
});

// POST route to add a new movie
app.post('/api', async (request, response) => {
    const { name, year } = request.body;

    if (!name || !year) {
        return response.status(400).json({ error: 'Movie name and year are required' });
    }

    try {
        const { rows } = await client.query(
            'INSERT INTO movies (name, year) VALUES ($1, $2) RETURNING *',
            [name, year]
        );
        response.status(201).json(rows[0]); // Send back the newly added movie
    } catch (error) {
        console.error('Error adding movie:', error);
        response.status(500).json({ error: 'Failed to add movie' });
    }
});

// PUT route to update an existing movie by ID
app.put('/api/:id', async (request, response) => {
    const { id } = request.params;
    const { name, year } = request.body;

    if (!name || !year) {
        return response.status(400).json({ error: 'Movie name and year are required' });
    }

    try {
        const { rows } = await client.query(
            'UPDATE movies SET name = $1, year = $2 WHERE id = $3 RETURNING *',
            [name, year, id]
        );

        if (rows.length === 0) {
            return response.status(404).json({ error: 'Movie not found' });
        }

        response.json(rows[0]); // Send back the updated movie
    } catch (error) {
        console.error('Error updating movie:', error);
        response.status(500).json({ error: 'Failed to update movie' });
    }
});

// DELETE route to remove a movie by ID
app.delete('/api/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const { rowCount } = await client.query('DELETE FROM movies WHERE id = $1', [id]);

        if (rowCount === 0) {
            return response.status(404).json({ error: 'Movie not found' });
        }

        response.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting movie:', error);
        response.status(500).json({ error: 'Failed to delete movie' });
    }
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
