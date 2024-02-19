import { API_URL } from "../../../http";
import instance from "../../../http";

const changeBrand = async (id, name) => {
  try {
    const {data} = await instance.put(`${API_URL}/brand/${id}`, {
      name: name
    })
    return data
  } catch (error) { 
    console.log(error);
  }
}

export default changeBrand;
