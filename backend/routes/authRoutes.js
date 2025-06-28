const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Start Google OAuth login'
    #swagger.responses[302] = {
      description: 'Redirect to Google login'
    }
  */
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Handle Google OAuth callback'
    #swagger.responses[302] = {
      description: 'Redirect to dashboard or login on failure'
    }
  */
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard'
  })
);

router.get('/logout', (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout the user'
    #swagger.security = [{
      cookieAuth: []
    }]
    #swagger.responses[302] = {
      description: 'Redirect to home page'
    }
  */
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
