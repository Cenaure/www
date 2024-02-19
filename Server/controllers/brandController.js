const Brand = require('../models/brand-model');
const ApiError = require('../error/api-error');

class BrandController {
    async create(req, res) {
        const { name } = req.body;

        if (!name) {
            throw new ApiError(400, 'Ім\'я обов\'язкове');
        }

        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            throw new ApiError(400, 'Бренд з такою назвою вже існує');
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

    async deleteBrands(req, res, next){
        try {
            const { brandIds } = req.body;

            const result = await Brand.deleteMany({ _id: { $in: brandIds } });

            res.json({ success: true, deletedCount: result.deletedCount });
        } catch(error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateBrand(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body

            const brand = await Brand.findById(id)

            brand.name = name

            brand.save()
            res.json(brand)
        } catch (error) {
            next(ApiError.internal(error.message))
        }
    }
}

module.exports = new BrandController