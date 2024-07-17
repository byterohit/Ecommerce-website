const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.json("Invalid User details");
        return res.render("login");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.json("Invalid password");
        return res.render("login");
    }
    const token = setUser(user);
    res.cookie("uid", token, { expires: new Date(Date.now() + 10000000), httpOnly: true });
    return res.redirect("/");
}

module.exports = { handleUserLogin, handleUserSignup, };