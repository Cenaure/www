const Type = require('../models/type-model');
const ApiError = require('../error/api-error');

class TypeController {
    async create(req, res, next) {
        try {
            const { name, brands } = req.body;

            if (!name) {
                next(ApiError.badRequest("Не вказане ім'я категорії"));
            }

            const existingType = await Type.findOne({ name });
            if (existingType) {
                next(ApiError.badRequest("Така категорія вже існує"));
            }

            const type = await Type.create({ name, brands });
            res.json(type);
        } catch (error) {
            next(ApiError.internal(error.message))
        }
    }

    async getAll(req, res) {
        try {
            const types = await Type.find();
            res.json(types);
        } catch (error) {
            res.status(500).json({ message: 'Внутрішня помилка сервера' });
        }
    }

    async getOne(req, res, next) {
        try {
            const { typeId } = req.params;
            const type = await Type.findById(typeId);
            if (!type) {
                throw new ApiError(404, 'Type not found');
            }
            return res.json(type);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteTypes(req, res, next){
        try {
            const { typeIds } = req.body;

            const result = await Type.deleteMany({ _id: { $in: typeIds } });

            res.json({ success: true, deletedCount: result.deletedCount });
        } catch(error) {
            next(ApiError.internal(error.message));
        }
    }

    async changeType(req, res, next){
        try {
            const { typeId } = req.params;
            const { name, attributes, brands } = req.body;
            if (!typeId || !name) {
                return res.status(400).json({message: "ID категорії та нове ім'я мають бути надані"});
            }
    
            const category = await Type.findById(typeId);
            if (!category) {
                return res.status(404).json({message: "Категорія не знайдена"});
            }
    
            category.name = name;
            category.attributes = attributes;
            category.brands = brands;
            await category.save();
    
            return res.json(category);
        } catch(error) {
            next(ApiError.internal(error.message));
        }
    }
    
}

module.exports = new TypeController;
