import { API_URL } from "../../../http";
import instance from "../../../http";

const createOrder = async ({
  firstName, secondName, patronymic, email, phoneNumber,
  locality, deliveryType, postalCode, street, house, apartment,
  paymentMethod, devices, deliveryPrice, devicesPrice, createdAt
}) => {
  try {
    const {data} = await instance.post(`${API_URL}/order/`, {
      firstName: firstName,
      secondName: secondName, 
      patronymic: patronymic, 
      email: email, 
      phoneNumber: phoneNumber,
      locality: locality, 
      deliveryType: deliveryType, 
      postalCode: postalCode, 
      street: street, 
      house: house, 
      apartment: apartment,
      paymentMethod: paymentMethod,
      devices: devices, 
      deliveryPrice: deliveryPrice, 
      devicesPrice: devicesPrice,
      createdAt: createdAt,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default createOrder;