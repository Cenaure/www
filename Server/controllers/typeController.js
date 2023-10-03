const Type = require('../models/type-model');
const ApiError = require('../error/api-error');

class TypeController {
    async create(req, res) {
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
}

module.exports = new TypeController;
