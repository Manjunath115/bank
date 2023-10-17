import axios from "axios";

export function signUp(username, email, password) {
  const userData = {
    username,
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqlND3P9HTMW7YO78xVpcDNEz1LNlJdAg`,userData
    );
}
