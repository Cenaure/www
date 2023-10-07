const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', cartController.addToCart);
router.get('/get-cart', cartController.getCart);

module.exports = router;

