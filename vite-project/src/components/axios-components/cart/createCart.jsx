import { API_URL } from "../../../http";
import instance from "../../../http";

const addToCart = async () => {
  try {
    const {data} = await instance.post(`${API_URL}/cart/`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default addToCart;
