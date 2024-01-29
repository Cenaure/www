import { API_URL } from "../../../http";
import instance from "../../../http";

const devicesDelete = async (deviceIds) => {
  try {
    const {data} = await instance.delete(`${API_URL}/device/delete`, { data: { deviceIds: deviceIds } })
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default devicesDelete;  