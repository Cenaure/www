import { API_URL } from "../../../http";
import instance from "../../../http";

const fetchDevicesByType = async (typeId) => {
  try {
    let url = `${API_URL}/device`;
    if (typeId) {
      url += `?typeId=${typeId}`;
    }
    const {data} = await instance.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchDevicesByType;
