const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
        unique:true,
    },
    productName: {
        type: String,
        required: true,
        unique:true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        category: ["Electronics", "Shoes", "Clothes"],
    },
},
    { timestamps: true },
);
const products = mongoose.model("products", taskSchema);

module.exports = products;