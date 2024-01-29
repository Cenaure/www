import { API_URL } from "../../../http";
import instance from "../../../http";

const fetchBrands = async () => {
  try {
    const {data} = await instance.get(`${API_URL}/brand`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default fetchBrands;  