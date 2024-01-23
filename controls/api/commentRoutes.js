const router = require('express').Router();
const { postComment } = require('../commentController');

// Add route for posting a comment on a blog post
router.post('/:postId/comment', postComment);

module.exports = router;