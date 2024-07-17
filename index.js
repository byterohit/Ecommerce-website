const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectMongodb } = require("./connect");
const {restrictToLoggedinUserOnly} = require("./middlewares/auth");
const app = express();
PORT = 3000;
const {} = require("./middlewares/auth");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRoute");
const addProductRouter = require("./routes/addProducts");
const getproductRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

connectMongodb("mongodb://localhost:27017/task").then(() => {
    console.log("Mongo Connected");
})
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static('./uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/", staticRouter);
app.use("/add",restrictToLoggedinUserOnly, addProductRouter);
app.use("/cart",restrictToLoggedinUserOnly, cartRouter);
app.use("/products",restrictToLoggedinUserOnly, getproductRouter);
app.get("/login", (req, res) => {
   return res.render("login");
});
app.get("/signup", (req, res) => {
    return res.render("signup");
});
app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));