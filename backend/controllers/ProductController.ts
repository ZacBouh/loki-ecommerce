import { NextFunction, RequestHandler } from "express";
import { Product } from "../models/product.js";
export default class ProductController {

    static getProducts : RequestHandler = async (req , res , next) => {
        const products = Product.find()
        res.json(products)
    }

}
