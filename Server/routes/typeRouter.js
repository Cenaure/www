const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const attributeTypeController = require('../controllers/attributeTypeController');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.get('/:typeId', typeController.getOne);
router.post('/:typeId/attributes', checkRole('ADMIN'), attributeTypeController.createAttribute);
router.put('/:typeId/attributes/:attributeId', checkRole('ADMIN'), attributeTypeController.updateAttribute);
router.delete('/:typeId/attributes/:attributeId', checkRole('ADMIN'), attributeTypeController.deleteAttribute);

module.exports = router;
