const Device = require('../models/device-model');
const DeviceInfo = require('../models/deviceInfo-model');
const ApiError = require('../error/api-error');
const uuid = require('uuid')
const path = require('path');

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info} = req.body;
    
            const existingDevice = await Device.findOne({ name });
            if (existingDevice) {
                next(ApiError.badRequest(error.message));
            }

            let characteristics = [];
            for (let characteristic of req.body.characteristics) {
                const char = await Characteristic.create({name: characteristic.name, value: characteristic.value, typeId});
                characteristics.push(char._id);
            }
    
            let fileNames = [];
            for (let file of req.files.imgs) {
                let fileName = uuid.v4() + ".jpg";
                file.mv(path.resolve(__dirname, '..', 'static', fileName));
                fileNames.push(fileName);
            }

            const device = await Device.create({ name, price, brandId, typeId, imgs: fileNames, characteristics });

    
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
    
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
            } else if (brandId && !typeId) {
                devices = await Device.find({ brandId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ brandId }).exec();
            } else if (!brandId && typeId) {
                devices = await Device.find({ typeId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ typeId }).exec();
            } else {
                devices = await Device.find({ typeId, brandId }).limit(limit).skip(offset).exec();
                totalCount = await Device.countDocuments({ typeId, brandId }).exec();
            }
        
            return res.json({ count: totalCount, rows: devices });
        } catch (error) {
            return next(ApiError.badRequest(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const device = await Device.findOne({ _id: id }).populate('info');
            if (!device) {
                throw new ApiError(404, 'Device not found');
            }
            return res.json(device);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }   
}

module.exports = new DeviceController();