import { API_URL } from "../../../http";
import instance from "../../../http";

const fetchOneType = async (id) => {
  try {
    const {data} = await instance.get(`${API_URL}/type/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default fetchOneType;  