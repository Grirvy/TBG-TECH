const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    const userId = req.session.user.id;

    // Save the comment to the database
    await Comment.create({ content, userId, postId });

    // Redirect back to the post
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};