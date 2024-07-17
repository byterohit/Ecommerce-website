const Product = require("../models/product");
const cartProduct = require("../models/cart");


async function getCart(req, res) {
    const cartProducts =await cartProduct.find({ createdBy: req.user._id});
    res.render("cart", ({
        cartProducts: cartProducts,
    }));
}

async function addToCart(req, res) {
    const { productImage,productName, price, category } = await Product.findOne({ _id: req.params.id });
    await cartProduct.create({
        productImage,
        productName,
        price,
        category,
        createdBy: req.user._id,
    });
    return res.redirect("/cart");
}

async function getCartProductDelete(req, res) {
    await cartProduct.findOneAndDelete({ _id: req.params.id });
    return res.redirect("/cart");
}


module.exports = {getCart , addToCart ,getCartProductDelete }