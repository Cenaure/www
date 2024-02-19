import { jwtDecode } from "jwt-decode";
import instance from "../../../http";
import getCart from "../cart/getCart";

const loginPost = (email, password, context, handleClose) => {
  const {user, server, basket} = context
 
  let data;
  instance.post('http://localhost:5000/api/user/login', {
    email: email,
    password: password,
  }).then(res => {
    data = jwtDecode(res.data.accessToken);
    user.setUser(res.data.user);
    basket.updateBasket(res.data.user.id)
    user.setIsAuth(true);
    localStorage.setItem('token', res.data.accessToken);
    handleClose();
  }).catch(e => {
    server.setServerE(e.response.data.message); //return server error as a message
  })
  //TODO server errors like in login
}
 
export default loginPost;