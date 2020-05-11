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
    let dateString = day + "-" + (month + 1) + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

    let conversation = await Conversation.findById(id);
    let newMessage = {
      sender: req.body.sender,
      receiver: req.body.receiver,
      timestamps: dateString,
      message: req.body.message,
    };

    conversation.logs.push(newMessage);
    conversation.save((err) => {
      if (!err) {
        res.status(201).send({
          status: "sent",
          log: conversation.logs,
        });
      } else {
        res.status(302).send({
          status: "failed",
          log: conversation.logs,
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
    console.log('from express : getConversation');
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
