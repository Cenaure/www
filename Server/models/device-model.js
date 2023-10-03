const {Schema, model} = require('mongoose');

const DeviceSchema = new Schema({
    name: {type: String, unique: true, require: true},
    price: {type: Number, unique: false, require: true},
    rating: {type: Number, unique: false, default: 0},
    img: {type: String, unique: false, require: true},
    typeId: {type: Schema.Types.ObjectId, ref: 'Type'},
    brandId: {type: Schema.Types.ObjectId, ref: 'Brand'},
    info: [{ type: Schema.Types.ObjectId, ref: 'DeviceInfo' }]
})

module.exports = model('Device', DeviceSchema);
