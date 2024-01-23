const router = require('express').Router();
const { displayDashboard } = require('../dashboardController');

// Add route for displaying the dashboard
router.get('/', displayDashboard);

module.exports = router;