const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { UserModel, validUser, genToken, validLogin } = require("../models/userModel");
const { authToken } = require("../middlewares/auth");
const router = express.Router();

//Main
router.get("/", async(req, res) => {
    let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
    let page = req.query.page;
    try {
        let data = await UserModel.find({}, { password: 0 })
        .limit(perPage)
        .skip(page * perPage)
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//Sign up
router.post("/", async(req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(201).json(_.pick(user, ["_id", "user", "email", "date_created"]))
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//Login
router.post("/login", async(req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: "Email incorrect!" });
        }
        let validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).json({ msg: "Password incorrect!" });
        }
        let myToken = genToken(user._id);
        res.json({ token: myToken });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//User Info
router.get("/userInfo", authToken, async(req, res) => {
    try {
        let user = await UserModel.find({ _id: req.userData._id }, { password: 0 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})
module.exports = router;