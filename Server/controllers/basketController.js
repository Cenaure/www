const Basket = require('../models/basket-model');
const BasketDevice = require('../models/basketDevice-model');

class BasketController {
  // Функция для поиска BasketDevice по его _id
  async findBasketDeviceById(basketDeviceId) {
    try {
      const basketDevice = await BasketDevice.findById(basketDeviceId).populate('device');
      return basketDevice;
    } catch (error) {
      // Обработка ошибок
      console.error(error);
      return null;
    }
  }
  
  // Определите функцию addToCart как метод класса (если класс уже определен)
  // или оставьте ее как обычную функцию, если класс не используется
  // и вам не нужен доступ к this.
  
  // Пример использования функции addToCart
  async addToCart(req, res) {
    try {
      const { userId, deviceId, quantity } = req.body;
  
      let basket = await Basket.findOne({ user: userId });
  
      if (!basket) {
        basket = new Basket({ user: userId, items: [] });
      }
  
      // Получаем идентификаторы всех BasketDevice в корзине
      const basketDeviceIds = basket.items.map((item) => item.toString());
  
      // Ищем BasketDevice по идентификатору устройства (deviceId)
      const foundBasketDeviceId = basketDeviceIds.find(
        (basketDeviceId) => basketDeviceId === deviceId
      );
  
      if (foundBasketDeviceId) {
        // BasketDevice найден, обновляем количество
        const foundBasketDevice = await findBasketDeviceById(foundBasketDeviceId);
        if (foundBasketDevice) {
          foundBasketDevice.quantity += quantity;
          await foundBasketDevice.save(); // Обновляем существующий объект в базе данных
        }
      } else {
        // BasketDevice не найден, создаем новый
        const newBasketDevice = new BasketDevice({ device: deviceId, quantity });
        basket.items.push(newBasketDevice);
        await newBasketDevice.save(); // Сохраняем новый объект в базе данных
      }
  
      await basket.save();
      res.status(201).json(basket);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.log(error);
    }
  }
  

  // Получение содержимого корзины для пользователя
  async getCartItems(req, res) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findOne({ user: userId }).populate('items.device');
      res.json(basket);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Удаление устройства из корзины
  async removeFromCart(req, res) {
    try {
      const { userId, deviceId } = req.params;

      const basket = await Basket.findOne({ user: userId });
      if (basket) {
        basket.items = basket.items.filter((item) => item.device.toString() !== deviceId);
        await basket.save();
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new BasketController();
