const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


///---LOAD USER MODEL--------///
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username,password,done) => {
            //check username
            User.findOne({username:username}).then(user => {
                if(!user){
                    return done(null,false,{message:'Username not registered'})
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{message:'Password Incorrect'})
                    }
                });
            });
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}