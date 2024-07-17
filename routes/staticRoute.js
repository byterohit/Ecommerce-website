const express = require("express");
const Product = require("../models/product");
const multer = require("multer");
const router = express.Router();
const { roleverify } = require("../middlewares/auth");
const { getHomepage, getProductDelete, getProductUpdate, onlyAdmin } = require("../controllers/products");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth")

const storage = multer.diskStorage({
    destination: function (req, file, cb) { return cb(null, "./uploads"); },
    filename: function (req, file, cb) { return cb(null, `${Date.now()}-${file.originalname}`); },
})
const upload = multer({ storage: storage });

router.get("/", restrictToLoggedinUserOnly, getHomepage);

router.get("/logout", restrictToLoggedinUserOnly, (req, res) => {
    res.cookie("uid", "");
    return res.render("login");
})

router.get("/add", restrictToLoggedinUserOnly, roleverify(["Admin"]), async (req, res) => {
    return res.render("addProduct");
});

router.get("/delete/:id", restrictToLoggedinUserOnly, roleverify(["Admin"]), getProductDelete)

router.get("/update", restrictToLoggedinUserOnly, roleverify(["Admin"]), upload.single('productImage'), onlyAdmin)

router.get("/edit/:productid", restrictToLoggedinUserOnly, roleverify(["Admin"]), async (req, res) => {
    const products = await Product.findOne({ _id: req.params.productid });
    res.render("updateProduct", { products });
})


router.post("/update/:productid", upload.single('productImage'), getProductUpdate)


module.exports = router;