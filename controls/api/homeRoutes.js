const router = require('express').Router();
const { displayHomepage } = require('../homeController');

// Add route for the homepage
router.get('/', displayHomepage);

module.exports = router;