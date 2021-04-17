const express = require('express');
const users = require('../controllers/users');
const router = express.Router();

const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegistration)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;