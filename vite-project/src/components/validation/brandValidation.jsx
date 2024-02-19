import changeBrand from "../axios-components/brands/changeBrand";
import createBrand from "../axios-components/brands/createBrand";

const brandValidation = async (name, id) => {
  let errors = {}
  let invClass = {
    name: "form-control",
  };

  if (name == undefined) {
    errors.name = "Введіть назву";
    invClass.name = "form-control erInput"
  } else{
    if(!id) await createBrand(name)
    else if(id) await changeBrand(id, name)
  }
  return [errors, invClass];
}
 
export default brandValidation;