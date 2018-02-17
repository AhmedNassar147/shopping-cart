var passport = require('passport');
var User = require('../models/user-schema');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

// create user and check if user.email is exist
passport.use('local.signup', new localStrategy({
 // config for what fiels the user create
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
// create user and chcking
}, function(req, email, password, done){
  // check the field are valid or not using express-validator
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty().isLength({min: 4});
  // if there are errors pass it to falsh
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user){
    if (err) {
      return done(err);
    }
    // if user.email is exist
    if (user) {
      return done(null, false, {message: 'email is already in use'});
    }
    var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result){
        if (err) {
          done(err);
        }
        return done(null, newUser);
      });
  });
}));

// sign in user

passport.use('local.signin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done ){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  };
  User.findOne({'email': email}, function(err, user){
    if (err) {
      return done(err);
    }
    // if user.email is not exist
    if (!user) {
      return done(null, false, {message: 'user not found'});
    }
    if (!user.validPassword(password)) {
      return done(null, false, {message: 'password does not match'});      
    }
    return done(null, user);
  });
}))