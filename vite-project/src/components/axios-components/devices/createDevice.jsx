import { API_URL } from "../../../http";
import instance from "../../../http";
import createDeviceAttribute from "./createDeviceAttribute";

const createDevice = async (name, price, imgs, typeId, brandId, description, values) => {
  try {
    //console.log(values)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('typeId', typeId);
    formData.append('brandId', brandId);
    formData.append('description', description);

    Array.from(imgs).forEach((img, index) => {
      formData.append(`imgs`, img);
    });

    const {data} = await instance.post(`${API_URL}/device`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    for (const e of Object.values(values)) {
      await createDeviceAttribute(data._id, e._id, e.value)
    } 

    return data
  } catch (error) {
    console.log(error);
  }
}

export default createDevice;
