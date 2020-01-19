const db = require("../model/db");
const passport = require('passport');
const uuidv1 = require("uuid/v1");


module.exports.saveNewUser = async function(req, res) {
  try {
    const user = await db.addUser(req.body);
    console.log(`User ${user.username} is saved with id ${user.id}`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.login = async function(req, res, next) {
  // const user = await db.getUserByName(req.body);

  passport.authenticate("local", async function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }

      const token = uuidv1()
      user.setToken(token);
      await db.updateUser(user);
      res.cookie('access_token', token, {
        maxAge: 7 * 60 * 60 * 1000,
        path: '/',
        httpOnly: false,
      });
      console.log(user)
      res.json(user);

      // return res.redirect("/users/" + user.username);
    });
  })(req, res, next);
};
