const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
});

module.exports = mongoose.model('Signup', signupSchema);
