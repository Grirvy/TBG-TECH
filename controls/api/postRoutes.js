const router = require('express').Router();
const { displayPost, updatePost, deletePost, displayDashboard } = require('..//postController');

// Route to display a single blog post
router.get('/:postId', displayPost);

// Route to update a blog post
router.put('/:postId/update', updatePost);

// Route to delete a blog post
router.delete('/:postId/delete', deletePost);

// Route to display the dashboard with the list of blog posts
router.get('/dashboard', displayDashboard);

module.exports = router;