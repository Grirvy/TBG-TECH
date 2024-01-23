const Post = require('../models/Post'); // Assuming you have a Post model

exports.displayHomepage = async (req, res) => {
  try {
    if (req.session.user) {
      const userId = req.session.user.id;
      // Fetch existing blog posts from the database
      const posts = await Post.findAll();

      // Render the homepage with blog posts
      res.render('homepage', { posts, loggedIn: req.session.user });
    } else {
      // User is not logged in, handle accordingly
      res.render('login', { message: 'Please log in to view the homepage' });
      // or redirect to the login page
      // res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};