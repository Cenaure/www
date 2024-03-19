import { API_URL } from "../../../http";
import instance from "../../../http";

const updateOrder = async ({orderInfo}) => {
  try {
    console.log(orderInfo)
    const {
      user: { firstName, secondName, patronymic, email, phoneNumber },
      delivery: { locality, deliveryType, postalCode, street, house, apartment },
      paymentMethod,
      orderInformation: { devices, deliveryPrice, devicesPrice, createdAt },
      _id
    } = orderInfo;

    const {data} = await instance.put(`${API_URL}/order/${_id}`, {
      user: { firstName, secondName, patronymic, email, phoneNumber },
      delivery: { locality, deliveryType, postalCode, street, house, apartment },
      paymentMethod,
      orderInformation: { devices, deliveryPrice, devicesPrice, createdAt }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default updateOrder;