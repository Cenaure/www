import { API_URL } from "../../../http";
import instance from "../../../http";
import changeDeviceAttribute from "./changeDeviceAttribute";

const updateDevice = async (name, price, imgs, typeId, brandId, description, values, id) => {
  try {
    console.log(2)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('typeId', typeId);
    formData.append('brandId', brandId);
    formData.append('description', description);

    Array.from(imgs).forEach((img, index) => {
      formData.append(`imgs`, img);
    });
    
    const {data} = await instance.put(`${API_URL}/device/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    for (const e of Object.values(values)) {
      console.log(data._id, e._id, e.value)
      await changeDeviceAttribute(data._id, e._id, e.value);
    }    

    return data
  } catch (error) {
    console.log(error);
  }
}

export default updateDevice;
