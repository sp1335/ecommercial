const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desctiption: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    isAdming: {
        type: Boolean,
        default: false
    }
}, { timestamp: true });

module.exports = mongoose.model("Product", productSchema)