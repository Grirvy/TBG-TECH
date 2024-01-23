const sessionTimeout = (req, res, next) => {
    // Check if the user is authenticated and if the session is defined
    if (req.session && req.session.logged_in) {
      // Set the maximum idle time in milliseconds (e.g., 30 minutes)
      const maxIdleTime = 30 * 60 * 1000;
  
      const currentTime = new Date().getTime();
  
      // Check if the user's last activity time is within the allowed limit
      if (req.session.lastActivity && (currentTime - req.session.lastActivity) < maxIdleTime) {
        // Update the last activity time
        req.session.lastActivity = currentTime;
        return next();
      }
  
      // Destroy the session if the user is idle for too long
      req.session.destroy(() => {
        res.redirect('/signin');
      });
    } else {
      // If not authenticated or session is undefined, proceed to the next middleware
      next();
    }
  };
  
  module.exports = sessionTimeout;
  