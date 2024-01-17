const Router = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');
const attributeDeviceController = require('../controllers/attributeDeviceController');

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);
router.delete('/delete', checkRole('ADMIN'), DeviceController.deleteDevices);
router.post('/:deviceId/attributes/:attributeId', checkRole('ADMIN'), attributeDeviceController.createAttribute);
router.put('/:deviceId/attributes/:attributeId', checkRole('ADMIN'), attributeDeviceController.updateAttribute);

module.exports = router;
