const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.post('/:userId/:itemId/increase', cartController.increaseQuantity);
router.post('/:userId/:itemId/decrease', cartController.decreaseQuantity);
router.post('/add-to-cart', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.delete('/:userId/:itemId', cartController.deleteItem)

module.exports = router;