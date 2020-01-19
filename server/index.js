const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

require('./model');
require('./passport-config');

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat2',
  store: new FileStore(),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const router = express.Router();

app.use(express.static(path.join(__dirname, "..", "build")));

// app.use(require("./admin"));

router.get("*", res => {
  res.sendFile = fs.readFileSync(
    path.resolve(path.join(__dirname, "..", "build", "index.html")),
    "utf8"
  );
});

app.post('/test', (req,res) => {
    res.send(req.body);
    console.log(req.body)
})

app.use(require("./routes/profile"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
