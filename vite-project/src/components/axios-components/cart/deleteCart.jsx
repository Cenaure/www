import { API_URL } from "../../../http";
import instance from "../../../http";

const deleteCart = async ({userId}) => {
  try {
    console.log(userId)
    const {data} = await instance.delete(`${API_URL}/cart/${userId}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default deleteCart;
