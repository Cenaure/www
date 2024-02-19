const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const attributeTypeController = require('../controllers/attributeTypeController');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);
router.get('/:typeId', typeController.getOne);
router.put('/:typeId', checkRole('ADMIN'), typeController.changeType);
router.post('/:typeId/attributes', checkRole('ADMIN'), attributeTypeController.createAttribute);

router.delete('/:typeId/attributes/:attributeId', checkRole('ADMIN'), attributeTypeController.deleteAttribute);
router.delete('/delete', checkRole('ADMIN'), typeController.deleteTypes);

module.exports = router;
