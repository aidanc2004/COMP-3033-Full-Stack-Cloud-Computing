// Aidan Carey 0302409c Final Project Backend

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./todoModel');

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><h2>From the NODE.js API<h2>');
});

// return all todos
app.get('/todo', async(req, res) => {
    try {
        const todo = await Todo.find({});
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// return a todo by id
app.get('/todo/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// create a todo
app.post('/todo', async(req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(200).json(todo);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// update a todo, used for checking and unchecked a todo
app.put('/todo/:id', async(req, res) => {
    try {
        const {id} = req.body;
        const todo = await Todo.updateMany({id}, req.body);
        // we cannot find any todo in database
        if(!todo){
            return res.status(404).json({message: `cannot find any todo with ID ${id}`});
        }
        const updatedTodo = await Todo.find({id});
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete a todo
app.delete('/todo/:id', async(req, res) =>{
    try {
        const {id} = req.body;
        const todo = await Todo.deleteMany({id});
        // doesnt exist
        if(!todo) {
            return res.status(404).json({message: `cannot find any todo with ID ${id}`});
        }
        res.status(200).json(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

mongoose.set("strictQuery", false);
// NOTE: Will not run unless the user's IP is set on Atlas
mongoose.connect("mongodb+srv://example.mongodb.net/")
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`Connected and listening on port ${PORT}.`);
    });
}).catch((error) => {
    console.log(error);
})
