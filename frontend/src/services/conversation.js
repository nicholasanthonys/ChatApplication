import axios from "axios";

export const getConversation = async (id) => {
  //id adalah uid object conversation
  console.log('from axios, id is ' + id);
  return axios.get("/conversation/" + id);
};

//send Message
export const sendMessage = async (id, sender, receiver, message) => {
  //id adalah uobject conversation
  return axios.post("/conversation/" + id, {
    sender: sender,
    receiver: receiver,
    message: message,
  });
};
