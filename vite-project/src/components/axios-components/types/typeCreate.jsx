import { API_URL } from "../../../http";
import instance from "../../../http";

const createType = async (name, attributes) => {
  try {
    console.log(attributes)
    const {data} = await instance.post(`${API_URL}/type/`, {
      name: name
    }).then(({data}) => {
      attributes.forEach((attribute) => {
        instance.post(`${API_URL}/type/${data._id}/attributes`, {
          name: attribute.name,
          values: attribute.values
        })
      })
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
  }
}

export default createType;  