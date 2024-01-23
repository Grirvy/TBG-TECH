const Post = require('../models/Post');

exports.displayPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the details of the selected post
    const post = await Post.findByPk(postId);

    // Render the post details view
    res.render('postDetails', { post, loggedIn: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, contents } = req.body;

    // Update the selected post in the database
    await Post.update(
      { title, contents },
      {
        where: { id: postId, user_id: req.session.user.id },
      }
    );

    // Redirect back to the dashboard with the updated list of blog posts
    res.redirect('/posts/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Delete the selected post from the database
    await Post.destroy({
      where: { id: postId, user_id: req.session.user.id },
    });

    res.redirect('/posts/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.displayDashboard = async (req, res) => {
  try {
    // Fetch all blog posts for the logged-in user
    const userPosts = await Post.findAll({
      where: { user_id: req.session.user.id },
    });

    // Render the dashboard view with the list of user's blog posts
    res.render('dashboard', { userPosts, loggedIn: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
