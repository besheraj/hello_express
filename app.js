const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');


//Import Routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

// Route Middlewears
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/posts',postsRoute)
app.use('/api/auth',authRoute)


//Connect To DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to DB')
    })

// Listen
app.listen(4000, () => console.log('Server is up and running'));
