const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLoginPage = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/home');
    } else {
      res.redirect('/login'); // Add error handling as needed
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};