const {Schema, model} = require('mongoose');

const CharacteristicSchema = new Schema({
    name: {type: String, unique: true, require: true},
    value: {type: String, unique: false, require: true},
    typeId: {type: Schema.Types.ObjectId, ref: 'Type'}
})

module.exports = model('Characteristic', CharacteristicSchema);