const Device = require('../models/device-model');
const ApiError = require('../error/api-error');
const uuid = require('uuid')
const path = require('path');
const fs = require('fs');
class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, description} = req.body;
    
            const existingDevice = await Device.findOne({ name });
            if (existingDevice) {
                next(ApiError.badRequest("Товар з такою назвою вже існує"));
            }
    
            let fileNames = [];
            if (Array.isArray(req.files.imgs)) {
              for (let file of req.files.imgs) {
                let fileName = uuid.v4() + ".jpg";
                file.mv(path.resolve(__dirname, '..', 'static', fileName));
                fileNames.push(fileName);
              }
            } else if (typeof req.files.imgs === 'object' && req.files.imgs !== null) {
                let file = req.files.imgs;
                let fileName = uuid.v4() + ".jpg";
                file.mv(path.resolve(__dirname, '..', 'static', fileName));
                fileNames.push(fileName);
            }

            const device = await Device.create({ name, price, brandId, typeId, imgs: fileNames, description});
    
            return res.json(device);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    

    async getAll(req, res, next) {
        try {
            const { brandId, typeId, limit, page } = req.query;
            let offset = (page || 1) * (limit || 9) - (limit || 9);
            let devices;
            let totalCount;

            if (!brandId && !typeId) {
                devices = await Device.find().limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments().exec();
            } /*else if (brandId && !typeId) {
                devices = await Device.find({ brandId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ brandId }).exec();
            } else if (!brandId && typeId) {
                devices = await Device.find({ typeId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ typeId }).exec();
            } else {
                devices = await Device.find({ typeId, brandId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ typeId, brandId }).exec();
            }*/
        
            return res.json({ count: totalCount, rows: devices });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.findOne({ _id: id });
            if (!device) {
                throw new ApiError(404, 'Device not found');
            }
            return res.json(device);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }   

    async deleteDevices(req, res, next){
        try {
            const { deviceIds } = req.body;
    
            const devicesToDelete = await Device.find({ _id: { $in: deviceIds } });
    
            const result = await Device.deleteMany({ _id: { $in: deviceIds } });
    
            devicesToDelete.forEach(device => {
                device.imgs.forEach(image => {
                    const imagePath = path.join(__dirname, '..', 'static', image);
                    fs.unlink(imagePath, err => {
                        if (err) {
                            console.error(`Failed to delete image ${image}: ${err}`);
                        }
                    });
                });
            });
    
            res.json({ success: true, deletedCount: result.deletedCount });
        } catch(error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateDevice(req, res, next) {
        try {
            const { id } = req.params;
            const updatedItem = req.body;
            const device = await Device.findByIdAndUpdate(id, updatedItem, { new: true });

            if (!device) {
                return next(ApiError.internal(`Товар за айді ${id} не знайдено`));
            }

            return res.json(device);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new DeviceController();