const db = require("../model/db");
const passport = require("passport");
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

      const token = uuidv1();
      user.setToken(token);
      await db.updateUser(user);
      res.cookie("accessToken", token, {
        maxAge: 7 * 60 * 60 * 1000,
        path: "/",
        httpOnly: false
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
  const accessToken = req.cookies;
  try {
    const formidable = require("formidable");
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
      if (err) {
        // if (fs.existsSync(files.photo.path)) {
        //   fs.unlinkSync(files.photo.path);
        // }
        console.error(err);
        return res.status(400).json({ error: "Возникла ошибка при обработке" });
      }
      // console.log('body', fields);
      const user = await db.getUserToken(accessToken);
      const { id } = user;
      const updatedUser = await db.updateUser({ id, ...fields });
      // const updatedUser = Object.assign(id, req.body)
      // console.log(`User ${updatedUser.username} has been updated`);
      res.json(updatedUser);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.getUsers = async function(req, res) {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updatePermission = async function(req, res) {
  try {
    const user = await db.getUserByID(req.params);
    const { id } = user;
    const dataTosend = await db.updateUser({ id, ...req.body });
    console.log(`User ${user.username} has been updated`);
    res.json(dataTosend);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.addArticle = async function(req, res) {
  try {
    const user = await db.getUserToken({
      accessToken: req.headers.authorization
    });

    await db.addArticle({ ...req.body, user });

    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.getNews = async function(req, res) {
  try {
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateArticle = async function(req, res) {
  try {
    await db.updateArticle({ id: req.params.id, ...req.body });
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteArticle = async function(req, res) {
  try {
    await db.deleteArticle(req.params.id);

    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteUser = async function(req, res) {
  try {
    const user = await db.deleteUser(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.refreshToken = async function(req, res) {
  try {
    const accessToken = req.cookies;
    const user = await db.getUserToken(accessToken);
    // const { id } = user;
    // const updatedUser = await db.updateUser({ id, ...fields });
    res.set('authorization', user.refreshToken);
    res.send()
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
