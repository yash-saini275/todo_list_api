'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// DB Schema for Todo list.
var TaskSchema = Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed'],
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);