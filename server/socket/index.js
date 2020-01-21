var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.sockets.on("users:connect", socket => {
  socket.emit("hello", "hi from server io!");
});

server.listen(3000, function() {
  console.log("WEBSOCKEtS app listening on port 3000!");
});
