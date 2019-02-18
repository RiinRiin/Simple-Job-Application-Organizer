// Routes related to authentication

const passport = require('passport');
const path = require('path');

// everything inside is being exported as a function
module.exports = (app) =>{
    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly'],
            accessType: 'offline'
        })
    );

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback', 
        passport.authenticate('google', {failureRedirect: '/login'}), 
        (req, res) => 
        {
            res.redirect('/api/user');
        }
    );

    app.get('/', (req, res) => {
        res.end("This is the home route")
    });

    app.get('/login', (req, res) => {
        //serve or render the login page
        res.sendFile(path.resolve('views/login.html'));
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        // res.send(req.user);
        res.redirect('/login');
    });

    app.get('/api/user', (req, res) => {
        //successful Authentication
        if (req.isAuthenticated()){
            // gmail funciton
            require('../api_requests/gmail_api_calls').listLabels();
            // require('../api_requests/gmail_api_calls').listMessages();
            res.end('Authentication successful! Please return to the console.'); //TEMPORARY
        } else {
            // Not authenticated
            res.redirect('/login');
        }
    });
}
