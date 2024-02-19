import { API_URL } from "../../../http";
import instance from "../../../http";

const changeType = async (id, name, attributes, brands) => {
  try {
    let brandIds = brands.filter(brand => brand.id && brand.id.trim() !== '').map(brand => brand.id);
    const cleanedAttributes = attributes.map(attribute => ({
      ...attribute,
      values: attribute.values.filter(value => value !== '')
    }));

    console.log(cleanedAttributes)
    const {data} = await instance.put(`${API_URL}/type/${id}`, {
      name: name,
      attributes: cleanedAttributes,
      brands: brandIds
    })
    return data
  } catch (error) {
    console.log(error);
  }
}

export default changeType;
