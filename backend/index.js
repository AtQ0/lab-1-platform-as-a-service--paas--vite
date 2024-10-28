const dotenv = require('dotenv'),
    express = require('express'),
    path = require('path'),
    { Client } = require('pg');

const app = express()


dotenv.config();


//Connect to postgres db via PGURI in .env
const client = new Client({
    connectionString: process.env.PGURI,
})

client.connect();

// Serve frontend files from the 'dist' folder
app.use(express.static(path.join(path.resolve(), 'dist')));

//Backend
app.get('/api', async (request, response) => {
    const { rows } = await client.query(
        //'SELECT * FROM cities WHERE name = $1',
        //['Stockholm']
        'SELECT * FROM cities WHERE population > $1',
        ['400000']


    )
    response.send(rows);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}`);
});
