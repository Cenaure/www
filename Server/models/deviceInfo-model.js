const {Schema, model} = require('mongoose');

const DeviceInfoSchema = new Schema({
    title: {type: String, unique: true, require: true},
    description: {type: String, unique: false, require: true},
    deviceId: {type: Schema.Types.ObjectId, ref: 'Device'}
})

module.exports = model('DeviceInfo', DeviceInfoSchema);