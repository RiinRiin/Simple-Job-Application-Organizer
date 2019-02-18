// Defines google OAuth Strategy

require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy
    (
        {
            clientID: process.env.CLIENT_ID, //YOUR_CLIENT_ID
            clientSecret: process.env.CLIENT_SECRET, //YOUR_CLIENT_SECRET
            callbackURL: 'http://localhost:5000/auth/google/callback', //YOUR_REDIRECT_URL
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        (accessToken, refreshToken, profile, done) => 
        {
            /* 
            Store accessToken, refreshToken, profile into a database 
            so you can fetch them to use it whenever, wherever 
            instead of storing it as a global variable
            */
            exports.accessToken = accessToken;

            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        // we already have a record with the given profile ID
                        done(null, existingUser);
                    } else {
                        // we don't have a user record with this ID, make a new record
                        new User({ googleId: profile.id, accessToken: accessToken, refreshToken: refreshToken }).save()
                            .then(user => done(null, user))
                            .catch(console.error);
                    }
                })
        }
    )
);

