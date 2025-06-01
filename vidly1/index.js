const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

//if jwt env is not set exit the process.
if(!(config.get('jwtSecrete'))){
    console.log("FATAL ERROR: jwt secrete is not define");
    process.exit(1);
}


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));