const Product = require("../models/product");

async function getHomepage(req, res) {
    const userRole =req.user.role;
    const allProducts = await Product.find({});
    res.render("homepage", ({
        myAllProducts: allProducts,userRole: userRole
    }));
}


async function createProduct(req, res) {
    const { productName, desc, price, category } = req.body;
    await Product.create({
        productImage: req.file.filename,
        productName,
        desc,
        price,
        category,
    });
    return res.redirect("/products");
}

async function getProducts(req, res) {
    try {
        const category = req.query.category;
        let query = {};
        if (category || category == " ") {
            query.category = category;
        }
        const allProducts = await Product.find(query);
        res.render("products", ({
            myAllProducts: allProducts,
        }));
    } catch (error) {
        console.log(error);
    }
}



async function onlyAdmin(req, res) {
    try {
        const category = req.query.category;
        let query = {};
        if (category) {
            query.category = category;
        }
        const allProducts = await Product.find(query);
        res.render("admin", ({
            allProducts: allProducts,
        }));
    } catch (error) {
        console.log(error);
    }
}



async function getProductUpdate(req, res) {
    const { productImage, productName, desc, price, category } = req.body;
    await Product.findOneAndUpdate({ _id: req.params.productid }, { productImage, productName, desc, price, category }, { new: true });
    return res.redirect("/update");
}


async function getProductDelete(req, res) {
    await Product.findOneAndDelete({ _id: req.params.id });
    return res.redirect("/update");
}


module.exports = { getHomepage, createProduct, getProducts, getProductDelete, getProductUpdate, onlyAdmin, };