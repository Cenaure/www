import { API_URL } from "../../../http";
import instance from "../../../http";

const changeDeviceAttribute = async (deviceId, attributeId, value) => {
  try {
    const {data} = await instance.put(`${API_URL}/device/${deviceId}/attributes/${attributeId}`, {
      value: value
    })
    
    return data
  } catch (error) {
    console.log(error);
  }
}

export default changeDeviceAttribute;  