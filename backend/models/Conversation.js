const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ConversationSchema = new Schema(
  {
    conversationID: {
      type: String,
    },
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
