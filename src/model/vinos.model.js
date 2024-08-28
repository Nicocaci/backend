const mongoose = require('mongoose');

const vinoSchema = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    path: String,
})

const VinoModel = mongoose.model("vinos",vinoSchema);

module.exports = VinoModel;