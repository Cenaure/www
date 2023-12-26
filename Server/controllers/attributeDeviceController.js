const ApiError = require('../error/api-error');
const Device = require('../models/device-model');
const Type = require('../models/type-model');

class AttributeDeviceController {
  async createAttribute(req, res, next) {
    const { deviceId, attributeId } = req.params;
    const { value } = req.body;
    try {

      const device = await Device.findById(deviceId);

      if (!device) {
        next(ApiError.badRequest('Пристрій не знайдено'));
      }

      const type = await Type.findById(device.typeId);
      const attribute = type.attributes.id(attributeId);

      if (!attribute) {
        next(ApiError.badRequest('Атрибут не знайдено'));
      }

      // Додаємо атрибут до продукту
      device.attributes.push({
        name: attribute.name,
        value: value
      });

      await device.save();

      res.json(device);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async updateAttribute(req, res, next) {
    const { deviceId, attributeId } = req.params;
    const { name, value } = req.body;
    try {
      const device = await Type.findById(deviceId);
      if (!device) {
        return ApiError.badRequest('Товар не знайдений');
      }
      const attribute = device.attributes.id(attributeId);
      if (!attribute) {
        return ApiError.badRequest('Характеристика не знайдена');
      }
      attribute.name = name;
      attribute.value = value;
      await device.save();
      res.send({ message: 'Характеристика оновлена' });
    } catch (err) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new AttributeDeviceController