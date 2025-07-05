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

const { register, login, getProfile } = require('../controllers/auth');
const { verifyToken } = require('../middleware/middleware');

router.post('/register',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register a new user with email and password'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'User registration data',
      required: true,
      schema: { email: 'user@example.com', password: 'password123' }
    }
    #swagger.responses[201] = {
      description: 'User registered successfully'
    }
    #swagger.responses[400] = {
      description: 'Validation error or user already exists'
    }
  */
  register
);

router.post('/login',
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login with email and password'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'User login data',
      required: true,
      schema: { email: 'user@example.com', password: 'password123' }
    }
    #swagger.responses[200] = {
      description: 'Login successful, returns JWT token'
    }
    #swagger.responses[401] = {
      description: 'Invalid credentials'
    }
  */
  login
);

router.get('/profile', verifyToken,
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Get current logged-in user profile'
    #swagger.security = [{
      bearerAuth: []
    }]
    #swagger.responses[200] = {
      description: 'Returns user profile data'
    }
    #swagger.responses[401] = {
      description: 'Unauthorized'
    }
  */
  getProfile
);

module.exports = router;
