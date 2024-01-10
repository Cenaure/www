import { API_URL } from "../../http";
import instance from "../../http";

const createDeviceAttribute = async (deviceId, attributeId, value) => {
  try {
    const {data} = await instance.post(`${API_URL}/device/${deviceId}/attributes/${attributeId}`, {
      value: value
    })
    
    return data
  } catch (error) {
    console.log(error);
  }
}

export default createDeviceAttribute;  