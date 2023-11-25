// implement your posts router here
const Posts = require('./posts-model')
const express = require('express')
const router = express.Router()

module.exports = router;


// GET ('/api/posts') Returns **an array of all the post objects** contained in the database  

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({
            message: `The posts information could not be retrieved`
        })
    }
})

// GET ('/api/posts/:id') Returns **the post object with the specified id**
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.findById(id);
        if (!post) {
            res.status(404).json({
                message: `The post with the specified ID does not exist`
            })
        } else {
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: `The post information could not be retrieved`
        })
    }
})

// POST ('/api/posts') Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body;
        if (!title || !contents) {
            res.status(400).json({
                message: `Please provide title and contents for the post`
            })
        } else {
            const createdPost = await Posts.insert({ title, contents })
            res.status(201).json(createdPost)
        }
    } catch (err) {
        res.status(500).json({
            message: `There was an error while saving the post to the database`
        })
    }
})

// PUT ('/api/posts/:id') Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, contents } = req.body;
        if (!title || !contents) {
            res.status(400).json({
                message: `Please provide title and contents for the post`
            })
        } else {
            const updated = await Posts.update(id, { title, contents });
            if (updated) {
                const updatedPost = await Posts.findById(id);
                res.status(200).json(updatedPost)
            } else {
                res.status(404).json({
                    message: `The post with the specified ID does not exist`
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: `The post information could not be modified`
        })
    }
})

// DELETE ('/api/posts/:id') Removes the post with the specified id and returns the **deleted post object**
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const postToDelete = await Posts.findById(id)
        if (!postToDelete) {
            res.status(404).json({
                message: `The post with the specified ID does not exist`
            })
        } else {
            await Posts.remove(id);
            res.json(postToDelete);
        }
    } catch (err) {
        res.status(500).json({
            message: `The post could not be removed`
        })
    }
})

// GET ('/api/posts/:id/comments') Returns an **array of all the comment objects** associated with the post with the specified id
router.get('/:id/comments', async (req,res) => {
    try{
        const { id } = req.params;
        const searchPost = await Posts.findById(id);
        if(!searchPost){
            res.status(404).json({
                message: `The post with the specified ID does not exist`
            })
        } else {
            const comments = await Posts.findPostComments(id);
            res.status(200).json(comments);
        }
    } catch(err){
        res.status(500).json({
            message: `The comments information could not be retrieved`
        })
    }
})

module.exports = router;
