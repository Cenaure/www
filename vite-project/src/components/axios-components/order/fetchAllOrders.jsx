import { API_URL } from "../../../http";
import instance from "../../../http";

const fetchAllOrders = async () => {
  try {
    
    const {data} = await instance.get(`${API_URL}/order/`);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchAllOrders;