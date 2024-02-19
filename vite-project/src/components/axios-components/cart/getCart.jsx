import { API_URL } from "../../../http";
import instance from "../../../http";

const getCart = async (userId) => {
  try {
    const {data} = await instance.get(`${API_URL}/cart/${userId}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default getCart;  