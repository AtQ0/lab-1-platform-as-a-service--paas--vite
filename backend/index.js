const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const { Client } = require('pg');

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

// POST route to add a new movie (on the same `/api` endpoint)
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
