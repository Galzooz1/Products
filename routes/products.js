const express = require("express");
const { authToken } = require("../middlewares/auth");
const { ProductModel, validProduct } = require("../models/productModel");
const router = express.Router();

//MAIN
//?sort=
//?reverse=yes
//?page=0
// sort -> לפי איזה מאפיין נרצה למיין את התוצאות
 // 1-> מהקטן לגדול ASCENDING
 // -1 -> מהגדול לקטן DESCINGING
 // example: http://localhost:3000/products?sort=name&reverse=yes
 // reverse and sort must come together!
router.get("/", async(req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
    let page = req.query.page;
    let sortQ = req.query.sort;
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    try {
        let prodData = await ProductModel.find({})
            .sort({
                [sortQ]: reverse
            })
            .limit(perPage)
            .skip(page * perPage)
        res.json(prodData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//SEARCH
//?s=tomato
router.get("/search", async(req, res) => {
    let searchQ = req.query.s;
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
    let page = req.query.page;
    let sortQ = req.query.sort;
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    try {
        let searchRegQ = new RegExp(searchQ, "i");
        let prodData = await ProductModel.find({ $or: [{ name: searchRegQ }, { info: searchRegQ }] })
        .sort({
            [sortQ]: reverse
        })
        .limit(perPage)
        .skip(page * perPage)
        res.json(prodData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//Sort by price
//prices?min=10&max=20
router.get("/prices", async(req, res) => {
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
    let page = req.query.page;
    let sortQ = req.query.sort;
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    try {
        let min = Number(req.query.min);
        let max = Number(req.query.max);
        let prodData = await ProductModel.find({})
        .sort({
            [sortQ]: reverse
        })
        .limit(perPage)
        .skip(page * perPage)
        let productFilter = await prodData.filter(item => {
            return item.price >= min && item.price <= max;
        })
        res.json(productFilter);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//SEARCH BY CATEGORY
// /category/fruits
router.get("/category/:catName", async(req, res) => {
    let catName = req.params.catName;
  let perPage = (req.query.perPage)? Number(req.query.perPage) : 10;
    let page = req.query.page;
    let sortQ = req.query.sort;
    let reverse = (req.query.reverse == "yes") ? -1 : 1;
    try {
        let prodData = await ProductModel.find({ category: catName })
        .sort({
            [sortQ]: reverse
        })
        .limit(perPage)
        .skip(page * perPage)
        res.json(prodData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//ADD
router.post("/", authToken, async(req, res) => {
    let validBody = validProduct(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let product = new ProductModel(req.body);
        product.user_id = req.userData._id;
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//DELETE
router.delete("/:delId", authToken, async(req, res) => {
    let delId = req.params.delId;
    try {
        let product = await ProductModel.deleteOne({ _id: delId, user_id: req.userData._id });
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

//EDIT
router.put("/:editId", authToken, async(req, res) => {
    let editId = req.params.editId;
    let validBody = validProduct(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let product = await ProductModel.updateOne({ _id: editId, user_id: req.userData._id }, req.body);
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;