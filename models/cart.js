const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        category: ["Electronics", "Shoes", "Clothes"],
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    }
},
    { timestamps: true },
);
const cartItems = mongoose.model("cartItems", cartSchema);

module.exports = cartItems;