import { API_URL } from "../../../http";
import instance from "../../../http";

const typesDelete = async (typeIds) => {
  try {
    const {data} = await instance.delete(`${API_URL}/type/delete`, { data: { typeIds: typeIds } })
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default typesDelete;  