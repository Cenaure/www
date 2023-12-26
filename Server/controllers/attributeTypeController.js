const ApiError = require('../error/api-error');
const Type = require('../models/type-model');

class AttributeTypeController {
    async createAttribute(req, res, next) {
      const { typeId } = req.params;
      const { name } = req.body;
      try {
        const productType = await Type.findById(typeId);

        if (!productType) {
          return ApiError.badRequest('Категорія не знайдена');
        }

        productType.attributes.push({ name });

        await productType.save();

        res.send({ message: 'Атрибут успешно создан' });

      } catch (error) {
        next(ApiError.internal(error.message));
      }
    }

    async updateAttribute(req, res, next) {
      const { typeId, attributeId } = req.params;
      const { name, value } = req.body;

      try {
        const productType = await Type.findById(typeId);

        if (!productType) {
          return ApiError.badRequest('Категорія не знайдена');
        }

        const attribute = productType.attributes.id(attributeId);

        if (!attribute) {
          return ApiError.badRequest('Характеристика не знайдена');
        }

        attribute.name = name;
        attribute.value = value;

        await productType.save();

        res.send({ message: 'Характеристика оновлена' });
      } catch (err) {
        next(ApiError.internal(error.message));
      }
    }

    async deleteAttribute(req, res, next) {
      const { typeId, attributeId } = req.params;

      try {
        const productType = await Type.findById(typeId);

        if (!productType) {
          return res.status(404).send({ message: 'Тип продукта не найден' });
        }

        productType.attributes.id(attributeId).remove();

        await productType.save();

        res.send({ message: 'Характеристика видалена' });
      } catch (err) {
        next(ApiError.internal(error.message));
      }
    }

}

module.exports = new AttributeTypeController