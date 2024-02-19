const Router = require('express');
const router = new Router();
const BrandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), BrandController.create);
router.delete('/delete', checkRole('ADMIN'), BrandController.deleteBrands);
router.put('/:id', checkRole('ADMIN'), BrandController.updateBrand);
router.get('/', BrandController.getAll);

module.exports = router;
