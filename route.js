const express = require("express");

//Router setup
const router = express.Router();
const Post = require('../model/postModel');

//GET: Greetings EndPoints
router.get('/', (req, res) => {
    res.end(" You are connected to your Server...! ");
});

//POST: Add a new Task
router.post('/addTask', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newTask = new Post ({ title, content });
        await newTask.save();
        res.status(201).json(newTask);
       
    }catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GET Router: To Greeting 
router.get('/getPosts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: err.message});
    }
});

//DELETE Method
router.delete('/deletePost/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) return res.status(404).json({error: 'POST NOT FOUND..!'});
        res.json({message: 'Post deleted Success...'});
    } catch (error) {
        res.status(400).json({error: err.message});
    }
});

//Patch Method to Update the Particular Post
router.patch('/getUpdate/:id', async (req, res) => {
    try {
        const updatedpost = await Post.findByIdAndUpdate(req.params.id);
        if(!updatedpost) return res.status(404).json({ error: "post not found"});
        res.json({ message: "Post Updated Success"});
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});


//export router
module.exports = router;