const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.displaySigninForm = (req, res) => {
  // Render the sign-in form
  res.render('signin');
};

exports.handleSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (user && bcrypt.compareSync(password, user.password)) {
      // If the user exists and the password is correct, set the session
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/'); // Redirect to the homepage or another desired route
    } else {
      // If authentication fails, render the sign-in form with an error message
      res.render('signin', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};