const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Please enter a name for the todo."]
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    },
    added: {
        type: Date,
        required: false,
        default: () => Date.now("<YYYY-mm-dd HH:MM:ss>")
    }
});

// const Todo = mongoose.model('Todo', todoSchema, 'myTodos');
module.exports = mongoose.model('Todo', todoSchema);