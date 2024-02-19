import { API_URL } from "../../../http";
import instance from "../../../http";

const addToCart = async (productId, quantity, userId) => {
  try {
    const {data} = await instance.post(`${API_URL}/cart/add-to-cart`, {
      productId: productId,
      quantity: quantity,
      userId: userId,
    })

    return data
  } catch (error) {
    console.log(error);
  }
}

export default addToCart;
