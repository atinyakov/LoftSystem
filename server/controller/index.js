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
      res.cookie('accessToken', token, {
        maxAge: 7 * 60 * 60 * 1000,
        path: '/',
        httpOnly: false,
      });
      // console.log(user)
      res.json(user);

      // return res.redirect("/users/" + user.username);
    });
  })(req, res, next);
};

module.exports.getProfile = async function(req, res) {
  try {
    const user = await db.getUserByName(req.body);
    console.log(`User ${user.username} was found`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateProfile = async function(req, res) {
  try {
    console.log('body', req.body)
    const user = await db.getUserToken(req.cookies);
    const {id} = user;
    // const updatedUser = Object.assign(id, req.body)
    const dataTosend = await db.updateUser({id, ...req.body});
    console.log(`User ${user.username} has been updated`);
    res.json(dataTosend);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.getUsers = async function(req, res) {
  try {
    // console.log('body', req.body)
    const users = await db.getUsers();
    // const {id} = user;
    // const updatedUser = Object.assign(id, req.body)
    // const dataTosend = await db.updateUser({id, ...req.body});
    // console.log(`User ${user.username} has been updated`);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updatePermission = async function(req, res) {
  try {
    // console.log('body', req.body)
    const user = await db.getUserByName(req.params);
    const {id} = user;
    // const updatedUser = Object.assign(id, req.body)
    const dataTosend = await db.updateUser({id, ...req.body});
    console.log(`User ${user.username} has been updated`);
    res.json(dataTosend);
    // res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.addArticle = async function(req, res) {
  try {
    const user = await db.getUserByName(req.params);
    // const {id} = user;
    // const updatedUser = Object.assign(id, req.body)
    // const dataTosend = await db.updateUser({id, ...req.body});
    await db.addArticle({...req.body, user});
    // const user = await db.getUserById(req.body.userId);
    // await db.addNews({ ...req.body, user });
    const news = await db.getNews();
    res(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}