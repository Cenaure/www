import instance from "../../http";
const logoutPost = async (context, navigate) => {
  const {user, server} = context
    instance.post('http://localhost:5000/api/user/logout', {}).then(res => {
      localStorage.clear();
      user.setUser('');
      user.setIsAuth(false);
    }).finally(() => navigate('/')).catch(e => console.log(e))
}
 
export default logoutPost;