const conversationController = require("../controller/ConversationController");
var conversationsRouter = require("../routes/conversations");
/*
  socket IO
*/
function sockets(server) {
  var io = require("socket.io").listen(server);

  io.on("connection", function (socket) {
    console.log("backend : someone connected");

    //get message from client
    socket.on("emitMessage", (msg) => {
      //konfirmasi
      console.log("backend : message received : ");
      console.log(msg);
      //send message to client

      io.emit("emitMessage", msg);
    });
  });
}
module.exports = sockets;
