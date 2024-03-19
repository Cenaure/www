const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.post('/', cartController.createCart);
router.post('/:userId/:itemId/increase', cartController.increaseQuantity);
router.post('/:userId/:itemId/decrease', cartController.decreaseQuantity);
router.get('/:userId', cartController.getCart);
router.delete('/:userId/:itemId', cartController.deleteItem)
router.delete('/:userId', cartController.deleteCart)

module.exports = router;