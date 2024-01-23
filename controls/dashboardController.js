const { Post } = require('../models'); // Assuming you have a Post model

exports.displayDashboard = async (req, res) => {
  try {
    // Fetch all blog posts created by the logged-in user
    const userId = req.session.user.id;
    const userPosts = await Post.findAll({ where: { userId } });

    // Render the dashboard with user's blog posts
    res.render('dashboard', { userPosts, loggedIn: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
