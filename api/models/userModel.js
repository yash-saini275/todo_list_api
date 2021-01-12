'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema to store user information.
var UserSchema = Schema({
    first_name: {
        type: String,
        required: 'Kindly enter the first name.'
    },
    last_name: {
        type: String,
        required: 'Kindly enter the last name.'
    },
    username: {
        type: String,
        unique: true,
        required: 'Kindly enter the username.'
    },
    password: {
        type: String,
        required: 'Kindly enter the password.'
    },
});

module.exports = mongoose.model('Users', UserSchema);