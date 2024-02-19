import changeType from "../axios-components/types/changeType";
import createType from "../axios-components/types/typeCreate";

const typeValidation = async (name, attributes, brands, id) => {
  let errors = {}
  let invClass = {
    name: "form-control",
  };

  if (name == undefined) {
    errors.name = "Введіть назву";
    invClass.name = "form-control erInput"
  } else{
    if(!id) await createType(name, attributes, brands)
    else if(id) await changeType(id, name, attributes, brands)
  }
  return [errors, invClass];
}
 
export default typeValidation;