import validator from 'validator';
import loginPost from '../axios-components/loginPost';

const loginValidation = (email, password, context, handleClose) => {
  let errors = {}
  let invClass = {
    email: "form-control",
    password: "form-control",
  };
  let success = false;
  if (!validator.isEmail(email)) {
    errors.email = email ? "Введений Email некоректний" : "Введіть Email";
    invClass.email = "form-control erInput"
  }
  else if (password.length == 0) {
    errors.password = "Введіть пароль";
    invClass.password = "form-control erInput"
  } else {
    loginPost(email, password, context, handleClose);
  }
  return [errors, invClass];
}
 
export default loginValidation;