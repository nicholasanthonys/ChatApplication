const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ConversationSchema = new Schema(
  {
    //members adalah array of username
    members: {
      type: Array,
    },
    logs: {
      type: Array,
    },
  },
  { collection: "conversations" }
);

var Conversation = mongoose.model("conversation", ConversationSchema);
module.exports = Conversation;
