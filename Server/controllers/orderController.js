const ApiError = require('../error/api-error');
const Order = require('../models/order-model')

class OrderController {
  async create(req, res, next) {
    try {
      const { firstName, secondName, patronymic, email, phoneNumber,
      locality, deliveryType, postalCode, street, house, apartment,
      paymentMethod, devices, deliveryPrice, devicesPrice, createdAt } = req.body;
  
      if (!firstName || !secondName || !patronymic || !email || !phoneNumber
        || !locality || !deliveryType || !paymentMethod) {
        throw new ApiError(400, 'Не всі обов\'язкові поля заповнені');
      }
      
      if (!devices || !devicesPrice) {
          throw new ApiError(400, 'Помилка серверу');
      }
  
      const order = await Order.create({
        user: { firstName, secondName, patronymic, email, phoneNumber },
        delivery: { locality, deliveryType, postalCode, street, house, apartment },
        paymentMethod,
        orderInformation: { devices, deliveryPrice, devicesPrice, createdAt }
      });

      req.app.get('io').emit('newOrderToAdmin', order);
      res.json(order);
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }

  async resetCounter(){
    Order.counterReset('orderNumber', function(err) {});
  }

  async getAll(req, res, next){
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }

  async update(req, res, next){
    try {
      const {user, delivery, paymentMethod, orderInformation} = req.body;
      const {id} = req.params

      if (!id) {
        throw new ApiError(400, 'Не вказан ID замовлення');
      }

      const order = await Order.findById(id);

      if (!order) {
        throw new ApiError(404, 'Заказ не знайдено');
      }

      order.user = user;
      order.delivery = delivery;
      order.paymentMethod = paymentMethod;
      order.orderInformation = orderInformation;

      await order.save();

      res.json(order);
    } catch (error) {
      next(ApiError.internal(error.message))
    }
  }
}

module.exports = new OrderController