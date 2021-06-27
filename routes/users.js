const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
    forwardAuthentication
} = require('../config/auth');

///---CALL USER MODEL--------///
const User = require('../models/User');

router.get('/login', forwardAuthentication, (req, res) => {
    res.render('login', {
        extractStyles: true,
        title: 'Login'
    });
})

router.get('/register', forwardAuthentication, (req, res) => {
    res.render('register', {
        extractStyles: true,
        title: 'Register'
    });
})


///---HANDLING REGISTRATION--------///
router.post('/register', (req, res) => {
    const {
        username,
        password,
        password2
    } = req.body;
    let errors = [];

    if (password !== password2) {
        errors.push({
            msg: "Passwords don't match"
        });
    }
    if (password.length < 6) {
        errors.push({
            msg: 'Password should be at least 6 characters'
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            extractStyles: true,
            title: 'Register',
            errors,
            username,
            password,
            password2
        });
    } else {
        User.findOne({
            username: username
        }).then(user => {
            if (user) {
                //if user exits
                errors.push({
                    msg: 'Username already exits'
                });
                res.render('register', {
                    extractStyles: true,
                    title: 'Register',
                    errors,
                    username,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    username,
                    password
                });
                bcrypt.genSalt(16, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('successMsg', 'Registration Successful');
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    })
                })

            }
        });

    }
});


///---HANDLING LOGIN--------///
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

///---HANDLING LOGOUT--------///
router.get('/logout', (req, res) => {
    req.logOut();
    //snd flash message
    req.flash('successMsg', "You are logged out");
    res.redirect('/users/login');
});

module.exports = router;