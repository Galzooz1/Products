const mongoose = require("mongoose");
const Joi = require("joi");

let productSchema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    img: String,
    price: Number,
    user_id: String,
    date_created: {
        type: Date,
        default: Date.now
    }
})

exports.ProductModel = mongoose.model("products", productSchema);

exports.validProduct = (_bodyProduct) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        info: Joi.string().min(2).max(200).required(),
        category: Joi.string().min(2).max(50).required(),
        img: Joi.string().min(2).max(200).required(),
        price: Joi.number().min(0).max(100).required()
    })
    return joiSchema.validate(_bodyProduct);
}