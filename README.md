# Simple-Job-Application-Organizer
Organizes your job applications in order to better track your progress

Work in progress.

Currently able to run React app and server.  Then login through a google account and fetch all the lists form the user's gmail account.

You must setup your own .env file with:
* CLIENT_ID=your google client ID
* CLIENT_SECRET=your google client secret
* MONGO_URI=your mongo uri
* COOKIE_KEY=anystring

To run: npm start to run the react app
Then node server/index.js to run the server
