import axios from "axios";
import { jwtDecode } from "jwt-decode";

const checkPost = async () => {
  try {
    const res =  await axios.get('http://localhost:5000/api/user/refresh', {withCredentials: true});
    console.log(res);
    localStorage.setItem('accessToken', res.data.accessToken);
    return jwtDecode(res.data.accessToken)
  } catch (e) {
    console.log(e);
  }
}
 
export default checkPost;