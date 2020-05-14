import axios from "axios";

export const getUser = async (email, password) => {
  return axios.post("/users/login", {
    email: email,
    password: password,
  });
};

export const getOtherUser = async (username) => {
  return axios.post("/users/getotheruser", {
    username: username,
  });
};
