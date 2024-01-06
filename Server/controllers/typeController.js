const Type = require('../models/type-model');
const ApiError = require('../error/api-error');

class TypeController {
    async create(req, res, next) {
        const { name } = req.body;

        if (!name) {
            next(ApiError.badRequest(error.message));
        }

        const existingType = await Type.findOne({ name });
        if (existingType) {
            next(ApiError.badRequest(error.message));
        }

        const type = await Type.create({ name });
        res.json(type);
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
}

module.exports = new TypeController;
