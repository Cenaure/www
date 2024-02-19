import { API_URL } from "../../../http";
import instance from "../../../http";

const decreaseQuantity = async (productId, userId) => {
  try {
    const {data} = await instance.post(`${API_URL}/cart/${userId}/${productId}/decrease`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default decreaseQuantity;
