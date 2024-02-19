import { API_URL } from "../../../http";
import instance from "../../../http";

const createBrand = async (name) => {
  try {
    const {data} = await instance.post(`${API_URL}/brand/`, {
      name: name,
    })
    return data
  } catch (error) {
    console.log(error);
  }
}

export default createBrand;
