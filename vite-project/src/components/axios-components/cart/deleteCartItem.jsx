import { API_URL } from "../../../http";
import instance from "../../../http";

const deleteCartItem = async (userId, itemId) => {
  try {
    const {data} = await instance.delete(`${API_URL}/cart/${userId}/${itemId}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default deleteCartItem;  