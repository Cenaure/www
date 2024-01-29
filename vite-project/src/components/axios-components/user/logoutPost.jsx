import instance from "../../../http";
import { API_URL } from "../../../http";
const logoutPost = async (context, navigate) => {
  const {user, server} = context
    instance.post(`${API_URL}/user/logout`, {}).then(res => {
      localStorage.clear();
      user.setUser('');
      user.setIsAuth(false);
    }).finally(() => navigate('/')).catch(e => console.log(e))
}
 
export default logoutPost;