import axios from "axios";
import { jwtDecode } from "jwt-decode";

const loginPost = (email, password, context, handleClose) => {
  const {user, server} = context
 
  let data;
  axios.post('http://localhost:5000/api/user/login', {
    email: email,
    password: password,
  }).then(res => {
    data = jwtDecode(res.data.accessToken);
    user.setUser(user);
    user.setIsAuth(true);
    localStorage.setItem('token', res.data.accessToken);
    handleClose();
  }).catch(e => {
    server.setServerE(e.response.data.message); //return server error as a message
  })
}
 
export default loginPost;