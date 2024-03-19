import axios from "axios";
import { API_URL } from "../../../http";

const instance = axios.create({
  withCredentials: true,
});

const checkPost = async () => {
  try {
    const res = await instance.get(`${API_URL}/user/refresh`);
    localStorage.setItem('accessToken', res.data.accessToken);
    return res;
  } catch (e) {
    console.log(e);
  }
}
 
export default checkPost;