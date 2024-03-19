import validator from 'validator';

const orderValidation = async ({
  firstName,
  secondName,
  patronymic,
  email,
  phoneNumber,
  locality,
  deliveryType,
  postalCode,
  street,
  house,
  apartment,
  paymentMethod,
}) => {
  let errors = {};

  if (firstName.length == 0) errors.firstName = true
  if (secondName.length == 0) errors.secondName = true
  if (patronymic.length == 0) errors.patronymic = true
  if (email.length == 0 || !validator.isEmail(email)) errors.email = true
  if (phoneNumber.length == 0) errors.phoneNumber = true
  if (locality.length == 0) errors.locality = true
  if (deliveryType.length == 0) errors.deliveryType = true
  if (deliveryType != "Кур'єрська доставка"){
    if (postalCode.length == 0) errors.postalCode = true
  } else {
    if (street.length == 0) errors.street = true
    if (house.length == 0) errors.house = true
    if (apartment.length == 0) errors.house = true
  }
  if (paymentMethod.length == 0) errors.paymentMethod = true

  if(errors) return errors;
}

export default orderValidation