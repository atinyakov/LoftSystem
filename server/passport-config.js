const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const db = require('./model/db')

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await db.getUserByName(username);
    if (user && user.isValidPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
