const Brand = require('../models/brand-model');
const ApiError = require('../error/api-error');

class BrandController {
    async create(req, res) {
        const { name } = req.body;

        if (!name) {
            throw new ApiError(400, 'Name is required');
        }

        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            throw new ApiError(400, 'Brand with the same name already exists');
        }
        
        const brand = await Brand.create({ name });
        res.json(brand);
    }

    async getAll(req, res) {
        try {
            const brands = await Brand.find();

            res.json(brands);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new BrandController