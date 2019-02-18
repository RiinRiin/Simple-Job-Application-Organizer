//The entry point for running the backend server locally, and main server for production

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
app.use(helmet());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
require('./db/models/users'); //Mongoose create new collection of users
require('./passport/googleStrategy')//Defines google OAuth Strategy
require('./passport/authRoutes')(app); //express app function is passed to authRoutes & only need to run once to configure


app.listen(process.env.PORT || 5000, () => {
    console.log('Server running port 5000');
});
