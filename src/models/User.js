const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    salt: {type: String},
    role: {type: String},
    avatar: {type: String},
})

module.exports = mongoose.model('User', User);
