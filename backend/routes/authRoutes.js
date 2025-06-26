const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start google oauth login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle google callback
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
    })
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;