import { API_URL } from "../../../http";
import instance from "../../../http";

const createType = async (name, attributes, brands) => {
  try {
    let brandIds = brands.filter(brand => brand.id && brand.id.trim() !== '').map(brand => brand.id);
    const {data} = await instance.post(`${API_URL}/type/`, {
      name: name,
      brands: brandIds
    }).then(async ({data}) => {
      await Promise.all(attributes.map((attribute) => {
        return instance.post(`${API_URL}/type/${data._id}/attributes`, {
          name: attribute.name,
          values: attribute.values
        })
      }))
      return data;
    })
    return data
  } catch (error) {
    console.log(error);
  }
}

export default createType;
