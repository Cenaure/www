const {Schema, model} = require('mongoose');

const TypeBrandSchema = new Schema({
    type: {type: Schema.Types.ObjectId, ref: 'Type'},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'}
})

module.exports = model('TypeBrand', TypeBrandSchema);