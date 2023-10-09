const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
(username, password, done) => {
    console.log('Finding username');
    User.findOne({ email: username }, (err, user) => {
        if (err) { console.log('Error occured'); return done(err); }
        if (!user) {
            return done(null, false, {
                message: "Incorrect username."
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: "Incorrect password."
            });
        }
        console.log('Returned?');
        return done(null, user);
    });
}));