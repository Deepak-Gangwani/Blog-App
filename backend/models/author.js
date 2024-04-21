const mongoose = require('mongoose')


const Author = mongoose.model('Author', {

    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    date: {
        type: String
    },
    password: {
        type: String
    },
    about: {
        type: String
    },
    image: {
        type: String
    }

})

module.exports = Author;

