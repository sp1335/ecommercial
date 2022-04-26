const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: {
            type: string
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
}, { timestamp: true });

module.exports = mongoose.model("Cart", cartSchema)