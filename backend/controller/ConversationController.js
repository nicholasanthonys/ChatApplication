var Conversation = require("../models/Conversation");
var socket = require("../database/socket");

module.exports = {
  async insert(req, res) {
    let conversationID = req.body.conversationID;
    let conversation = await Conversation.findById("5eb7a398f1c8b647d42b4fbe");
    Conversation.find;
    let newMessage = {
      sender: req.body.sender,
      receiver: req.body.receiver,
      timestamps: "2020-02-03",
      message: req.body.message,
    };

    conversation.logs.push(newMessage);
    conversation.save((err) => {
      if (!err) {
        res.send({
          status: "sent",
          log: conversation.logs,
        });
      } else {
        res.send({
          status: "failed",
          log: conversation.logs,
        });
      }
    });

    // var newConversation = new Conversation();
    // //tes insert to mongodb
    // newConversation.conversationID = "123";
    // newConversation.member = ["nicholas", "jesslyn"];
    // newConversation.logs = [
    //   {
    //     sender: "nicholas",
    //     receiver: "jeje",
    //     timestamps: "2020-05-10 07:45:54",
    //     message: "i love you",
    //   },
    //   {
    //     sender: "jeje",
    //     receiver: "nicholas",
    //     timestamps: "2020-05-10 07:45:54",
    //     message: "i love you too",
    //   },
    // ];
    // newConversation.save((err, doc) => {
    //   if (!err) {
    //     res.send("Insert berhasil");
    //   } else {
    //     res.send("Insert gagal\n" + err);
    //   }
    // });
  },

  async readAll(req, res) {
    try {
      var conversations = await Conversation.find({
        conversationID: "123",
      });
      console.log("berhasil baca");
      console.log(conversations);
      res.send(conversations);
    } catch (err) {
      res.send(err);
    }
  },
};
