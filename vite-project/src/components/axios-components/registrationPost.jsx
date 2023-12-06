import axios from "axios";
import { jwtDecode } from "jwt-decode";
const instance = axios.create({
  withCredentials: true,
});
export const registrationPost = (email, password, name, surname, context, handleClose) => {
  const {user, server} = context;

  let data;
  instance.post('http://localhost:5000/api/user/registration', {
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
 
