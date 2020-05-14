import axios from "axios";

export const getConversation = async (id) => {
  //id adalah uid object conversation
  console.log("from axios, id is " + id);
  return axios.post("/conversation/chatscreen", {
    id: id,
  });
};

//send Message
export const sendMessage = async (id, sender, receiver, message) => {
  //id adalah uobject conversation
  return axios.post("/conversation/detail", {
    id: id,
    sender: sender,
    receiver: receiver,
    message: message,
  });
};

//load list chat with lates message
export const loadListChat = async (username) => {
  return axios.post("/conversation/listchat", {
    username: username,
  });
};
