const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    products: [{
        productId: {
            type: string
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],
    amount: { type: Numbers, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }

}, { timestamp: true });

module.exports = mongoose.model("Order", orderSchema)