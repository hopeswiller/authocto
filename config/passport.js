const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// const { getCachedData } = require('../routes/users')
const { getCachedData } = require('./redis');

///---LOAD USER MODEL--------///
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            //check username
            const cached_profile = await getCachedData(username)

            if (cached_profile) {
                console.log('Using cached data...')
                bcrypt.compare(password, cached_profile.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, cached_profile);
                    }
                    else {
                        return done(null, false, { message: 'Password Incorrect' })
                    }
                });
            }
            else {
                console.log(`Using DB data...`)
                User.findOne({ username: username }).then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Username not registered' })
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'Password Incorrect' })
                        }
                    });
                });
            }

        })
    )

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}