const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    photo: { type: String },
    description: { type: String }
});

module.exports = model('DonateCashPresent', schema);