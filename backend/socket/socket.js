/*
  socket IO
*/
module.exports = function (server) {
  var io = require("socket.io").listen(server);

  io.on("connection", function (socket) {
    console.log("backend : someone connected");

    //get message from client
    socket.on("emitMessage", (msg) => {
      //send message to client
      io.emit("emitMessage", msg);
    });
  });
};
