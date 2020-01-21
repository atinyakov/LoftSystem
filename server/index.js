const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var FileStore = require('session-file-store')(session);
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


require('./model');
// require('./socket');
require('./passport-config');

app.use(cookieParser())
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
app.use(require("./routes"));


io.sockets.on("connection", socket => {
  socket.emit("hello", "hi from server io!");
});

router.get("*", res => {
  res.sendFile = fs.readFileSync(
    path.resolve(path.join(__dirname, "..", "build", "index.html")),
    "utf8"
  );
});


app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
