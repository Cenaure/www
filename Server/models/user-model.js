const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: "user"},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('User', UserSchema);