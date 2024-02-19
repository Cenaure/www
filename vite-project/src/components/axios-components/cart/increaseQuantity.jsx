import { API_URL } from "../../../http";
import instance from "../../../http";

const increaseQuantity = async (productId, userId) => {
  try {
    const {data} = await instance.post(`${API_URL}/cart/${userId}/${productId}/increase`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default increaseQuantity;
