import { jwtDecode } from "jwt-decode";
import instance from "../../http";
import { API_URL } from "../../http";

export const registrationPost = (email, password, name, surname, context, handleClose) => {
  const {user, server} = context;

  let data;
  instance.post(`${API_URL}/user/registration`, {
    email: email,
    password: password,
    firstName: name,
    secondName: surname
  }).then(res => {
    data = jwtDecode(res.data.accessToken); //access token decode
    user.setUser(res.data.user);
    user.setIsAuth(true);
    localStorage.setItem('token', res.data.accessToken);
    handleClose();
  }).catch(e => {
    server.setServerE(e.response.data.message); //return server error as a message
  })    
}
 
