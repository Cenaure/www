import { API_URL } from "../../http";
import instance from "../../http";

const fetchTypes = async (id) => {
  try {
    const {data} = await instance.get(`${API_URL}/type`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default fetchTypes;  