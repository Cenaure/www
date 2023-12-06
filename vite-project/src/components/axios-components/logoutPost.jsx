import { useNavigate } from 'react-router-dom';
import instance from "../../http";
const logoutPost = async (context) => {
  const navigate = useNavigate();
  const {user, server} = context
    instance.post('http://localhost:5000/api/user/logout', {}).then(res => {
      localStorage.clear();
      user.setUser(null);
      user.setIsAuth(false);
    }).finally(() => {
      navigate('/')
    }).catch(e => {
      server.setServerE(e.response.data.message); 
    })
}
 
export default logoutPost;