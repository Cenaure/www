const {Schema, model} = require('mongoose');

const RatingSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    device: {type: Schema.Types.ObjectId, ref: 'Device'},
    rate: {type: Number, unique: false, require: true},
})

module.exports = model('Rating', RatingSchema);