import createDevice from '../axios-components/devices/createDevice';
import changeDevice from '../axios-components/devices/changeDevice';

const deviceValidation = async (name, price, imgs, selectedTypeId, selectedBrandId, description, values, id) => {
  console.log(values)
  let errors = {}
  let invClass = {
    name: "form-control",
    price: "form-control",
    imgs: "form-control",
    category: "form-control",
    brand: "form-control",
  };

  if (name == undefined) {
    errors.name = "Введіть назву";
    invClass.name = "form-control erInput"
  } else if (price == undefined) {
    errors.price = "Введіть ціну";
    invClass.price = "form-control erInput"
  } else if (imgs.length == 0) {
    errors.imgs = "Не вказані картинки";
    invClass.imgs = "form-control erInput"
  } else if (selectedTypeId == undefined) {
    errors.category = "Не вказана категорія";
    invClass.category = "form-control erInput"
  } else if (selectedBrandId == undefined) {
    errors.brand = "Не вказан бренд";
    invClass.brand = "form-control erInput"
  } else{
    if(!id) await createDevice(name, price, imgs, selectedTypeId, selectedBrandId, description, values)
    else await changeDevice(name, price, imgs, selectedTypeId, selectedBrandId, description, values, id)
  }
  return [errors, invClass];
}
 
export default deviceValidation;