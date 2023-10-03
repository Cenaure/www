const { Schema, model } = require('mongoose');

const BasketDeviceSchema = new Schema({
  device: { type: Schema.Types.ObjectId, ref: 'Device' }, // Убедитесь, что ref указывает на правильное имя модели "Device"
  basket: { type: Schema.Types.ObjectId, ref: 'Basket' }, // Убедитесь, что ref указывает на правильное имя модели "Basket"
  quantity: { type: Number, default: 1 },
});

module.exports = model('BasketDevice', BasketDeviceSchema);
