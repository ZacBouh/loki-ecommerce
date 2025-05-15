import { RequestHandler } from "express";
import { Product } from "../models/product.js";
export default class ProductController {

    static getProducts : RequestHandler = async (req , res , next) => {
        const products = await Product.find().exec()
        console.log("found products ", products)
        res.json(products)
    }

}
