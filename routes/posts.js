const express = require('express')
const router = express.Router();
const Post = require('../models/Post')

// gets back all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
});

// Submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }

});

// Specific post
router.get('/:postId', async (req, res) => {
    try {
        const id = req.params.postId
        const posts = await Post.findById(id);
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
});

// Delete post 
router.delete('/:postId', async (req, res) => {
    try {
        const id = req.params.postId
        const deletePost = await Post.remove({ _id: id });
        res.json({ message: 'post removed' })
    } catch (err) {
        res.json({ message: err })
    }
});

//Update post
router.patch('/:postId', async (req, res) => {
    try {
        const id = req.params.postId
        const updatePost = await Post.updateOne(
            { _id: id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            })
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;