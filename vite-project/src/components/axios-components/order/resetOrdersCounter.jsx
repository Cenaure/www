import { API_URL } from "../../../http";
import instance from "../../../http";

const resetOrdersCounter = async () => {
  try {
    const {data} = await instance.post(`${API_URL}/order/resetCounter`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default resetOrdersCounter;