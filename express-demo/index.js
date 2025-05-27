const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/courses', courses);
app.use('/', home);
app.use(helmet());

// if(app.get('env')=== 'development'){
//     app.use(morgan('tiny'));
//     console.log("morgan enabled");
// }

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// console.log(`Application ENV: ${app.get('env')}`)

// console.log(`Application ENV: ${config.util.getEnv('NODE_ENV')}`);

// console.log(`Application name: ${config.get('name')}`);





 

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening on port ${port}...`));

