const ApiError = require('../error/api-error');
const Type = require('../models/type-model');

class AttributeTypeController {
  async createAttribute(req, res, next) {
    const { typeId } = req.params;
    const { name, values } = req.body;
    try {
      const productType = await Type.findById(typeId);  

      if (!productType) {
        return ApiError.badRequest('Категорія не знайдена');
      } 

      productType.attributes.push({ name, values });  
      await productType.save(); 
      res.send({ message: 'Атрибут успешно создан' });  
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async updateAttribute(req, res, next) {
    const { typeId, attributeId } = req.params;
    const { name, values } = req.body;
    try {
      const productType = await Type.findById(typeId);

      if (!productType) {
        return next(ApiError.badRequest('Категорія не знайдена'));
      }
      
      let attribute = productType.attributes.id(attributeId);
    
      if (!attribute) {
        productType.attributes.push({ name, values });  
      } else {
        attribute.name = name;
        attribute.values = values;
      }
      await productType.save();
      res.send({ message: 'Характеристика оновлена' });
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }




  async deleteAttribute(req, res, next) {
    const { typeId, attributeId } = req.params;
    try {
      const productType = await Type.findById(typeId);
      if (!productType) {
        return res.status(404).send({ message: 'Тип продукта не знайдено' });
      }
      productType.attributes.id(attributeId).deleteOne();
      await productType.save();
      res.send({ message: 'Характеристика видалена' });
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }
}

module.exports = new AttributeTypeController