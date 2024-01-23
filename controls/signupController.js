const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getSignupPage = (req, res) => {
  res.render('signup');
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.user = newUser;
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};