const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productos: [
        {
            producto: {
                type : String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})


const CartModel = mongoose.model('carts',cartSchema);

module.exports = CartModel;
