const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    type: { type: String, required: true },
    results: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', ResultSchema);
