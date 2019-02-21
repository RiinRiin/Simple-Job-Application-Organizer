// Represents data from our database, and defines schemas for each collection
// Schema for the User collection

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    refreshToken: String
});

mongoose.model('users', userSchema);
