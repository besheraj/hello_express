const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

//Middlewears
// app.use('/', () => {

// })

//Import Routes
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const postsRoute = require('./routes/posts');

app.use('/posts',postsRoute)


//Connect To DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB')
    })

// Listen
app.listen(4000);
