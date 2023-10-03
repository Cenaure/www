const {Schema, model} = require('mongoose');

const BasketSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{ type: Schema.Types.ObjectId, ref: 'BasketDevice' }],
})

module.exports = model('Basket', BasketSchema);