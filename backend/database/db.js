const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://nicho:1234@chatapplication-yq6bn.mongodb.net/chatProjectDB",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("MongoDB connection succeeded");
    } else {
      console.log("Error in DB Connection " + err);
    }
  }
);

module.export = mongoose;
