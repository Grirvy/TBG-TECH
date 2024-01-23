const { User } = require('../models'); // Assuming you have a User model

const showSignUp = (req, res) => {
  res.render('signup'); // Assuming you have a 'signup' view
};

const showSignIn = (req, res) => {
  res.render('signin'); // Assuming you have a 'signin' view
};

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user in the database
    await User.create({ username, password });

    // Redirect the user to the homepage or dashboard
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Implement logic to check user credentials against the database
    // Assuming you have a method like User.authenticate(username, password)
    const user = await User.authenticate(username, password);

    if (user) {
      // Set user session to indicate logged in
      req.session.user = user;

      // Redirect the user to the homepage or dashboard
      res.redirect('/');
    } else {
      // Handle incorrect credentials, maybe render an error message
      res.render('signin', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const logOut = (req, res) => {
    // Clear user session to indicate log out
    req.session.destroy(() => {
      res.redirect('/');
    });
};

module.exports = {
  showSignUp,
  showSignIn,
  signUp,
  signIn,
  logOut
};