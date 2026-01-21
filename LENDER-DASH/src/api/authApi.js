import api from "./api";

export const signInUser = (payload) =>
  api.post("/user/signin", payload);
