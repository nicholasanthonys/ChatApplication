var Conversation = require("../models/Conversation");

module.exports = {
  //post conversations/id
  async insertMessage(req, res, id) {
    var date = new Date();
    let day = date.getDate(); //tanggal misalnya : 25
    let month = date.getMonth(); //Be careful! January is 0 not 1
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let dateString =
      day +
      "-" +
      (month + 1) +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    let newMessage = {
      sender: req.body.sender,
      receiver: req.body.receiver,
      timestamps: dateString,
      message: req.body.message,
    };

    try {
      var conversation = await Conversation.findById(id);
    } catch (err) {
      console.log("conversation find id error");
      newMessage["status"] = "failed";
      res.status(302).send({
        newMessage: newMessage,
      });
    }

    //set newMessage id auto increment
    newMessage["id"] = conversation.logs.length + 1;

    conversation.logs.push(newMessage);
    conversation.save((err) => {
      if (!err) {
        newMessage["status"] = "sent";
        res.status(201).send({
          newMessage: newMessage,
        });
      } else {
        newMessage["status"] = "failed";
        res.status(302).send({
          newMessage: newMessage,
        });
      }
    });
  },

  //post conversations/new
  async createConversation(req, res) {
    var conversation = new Conversation();
    conversation.members = req.body.members;
    conversation.logs = [];

    await conversation.save((err) => {
      if (!err) {
        res.status(201).send({
          status: "create berhasil",
          conversation: conversation,
        });
      } else {
        res.status(302).send("error creating new conversation");
      }
    });
  },

  //get : /conversations/id
  async getConversation(req, res, id) {
    try {
      var conversations = await Conversation.findById(id);
      console.log(conversations);
      res.status(201).send(conversations);
    } catch (err) {
      console.log(err);
      res.status(302).send(err);
    }
  },
};
