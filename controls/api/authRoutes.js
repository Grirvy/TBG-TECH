const router = require('express').Router();
const { showSignUp, showSignIn, signUp, signIn, logOut } = require('../authController');

// Add routes for sign-up, sign-in, and log-out
router.get('/signup', showSignUp);
router.post('/signup', signUp);
router.get('/signin', showSignIn);
router.post('/signin', signIn);
router.get('/logout', logOut);

module.exports = router;