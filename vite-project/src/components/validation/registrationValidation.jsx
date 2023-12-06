import validator from 'validator';
import { registrationPost } from '../axios-components/registrationPost';

const registrationValidation = (name, surname, email, password, confirmPassword, context, handleClose) => {
  let errors = {}
  let invClass = {
    name: "form-control",
    surname: "form-control",
    email: "form-control",
    password: "form-control",
    confirmPassword: "form-control",
  };
  if(!name){
    errors.name = "Ім'я не вказане";
    invClass.name = "form-control erInput"
  }
  if(!surname){
    errors.surname = "Прізвище не вказано";
    invClass.surname = "form-control erInput"
  }
  else if (!validator.isEmail(email)) {
    errors.email = email ? "Введений Email некоректний" : "Введіть Email";
    invClass.email = "form-control erInput"
  }
  else if (password.length < 7) {
    errors.password = "Пароль повинен бути довше 6 символів";
    invClass.password = "form-control erInput"
  }
  else if (password != confirmPassword) {
    errors.confirmPassword = "Паролі не збігаються";
    invClass.confirmPassword = "form-control erInput"
  } else {
    registrationPost(email, password, name, surname, context, handleClose);
  }
  return [errors, invClass];
}
 
export default registrationValidation;