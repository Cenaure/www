const Router = require('express');
const router = new Router();
const OrderController = require('../controllers/orderController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', OrderController.create);
router.get('/', checkRole("ADMIN"), OrderController.getAll);
router.post('/resetCounter', checkRole("ADMIN"),OrderController.resetCounter);
router.put('/:id', checkRole("ADMIN"), OrderController.update);

module.exports = router;
