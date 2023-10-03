const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

// Добавление устройства в корзину
router.post('/', basketController.addToCart);

// Получение содержимого корзины для пользователя
router.get('/:userId', basketController.getCartItems);

// Удаление устройства из корзины
router.delete('/:userId/:deviceId', basketController.removeFromCart);

module.exports = router;
