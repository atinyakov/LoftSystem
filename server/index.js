const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

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
