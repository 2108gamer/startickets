const { model, Schema } = require('mongoose');

const kissSchema = new Schema({
    key: { type: String, required: true, unique: true },
    kisses: { type: Number, default: 0 }
});

module.exports = model('Kiss', kissSchema);