const mongoose = require('mongoose');

//Định nghĩa Schema
const Apartment = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    address: {type: String},
    cover: {type: String},
    }, {
        timestamps: true
    })

module.exports = mongoose.model('Apartment', Apartment);