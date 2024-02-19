import { API_URL } from "../../../http";
import instance from "../../../http";

const brandsDelete = async (brandIds) => {
  try {
    const {data} = await instance.delete(`${API_URL}/brand/delete`, { data: { brandIds: brandIds } })
    return data
  } catch (error) {
    console.log(error);
  }
}

export default brandsDelete;  