var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const bcrypts = require('bcryptjs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy ({
  userNameField: 'email',
  passwordField: 'password',
  passwordReqToCallback: true
}, function(req, email, password, done) {
  user.findOne({'email': email}, function(err, user) {
    if(err) {
      return done(err);
    }
    if(user) {
      return done(null, false, {message:'email is already use.'})
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = password;
  });
  bcrypt.gensalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if(err) {
        return done(err);
      }
      newUser.email = email;
      newUser.password = hash;
      newUser.save(function(err, result) {
        if (err) {
          return done(err);
        }
          return done(null, newUser);
      });
    });
  });
}));
