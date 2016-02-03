
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },

    updatedAt: {
        type: Date,
        default: new Date(),
    },

    done: {
        type: Boolean,
        default: false,
    },

}, {collection: 'todos'});

mongoose.model('Todo', TodoSchema);
