import { API_URL } from "../../http";
import instance from "../../http";

const fetchOneDevice = async (id) => {
  try {
    const {data} = await instance.get(`${API_URL}/device/${id}`)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default fetchOneDevice;  