const express = require("express");
const router = express.Router();
const { addToCart,getCart ,getCartProductDelete} = require("../controllers/cart");

router.get("/",getCart);

router.get("/:id", addToCart);

router.get("/delete/:id",getCartProductDelete);

module.exports = router;