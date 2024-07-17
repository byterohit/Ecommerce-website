const express = require("express");
const multer = require("multer");
const { createProduct } = require("../controllers/products");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({ storage: storage });

router.post("/", upload.single("productImage"), createProduct);


module.exports = router;