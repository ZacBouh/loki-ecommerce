import { RequestHandler } from "express";
import { Product } from "../models/product.js";

export default class ProductController {

    static logger(...args : any){
        
    }

    static getProducts : RequestHandler = async (req , res , next) => {
        const products = await Product.find().exec()
        res.json(products)
    }

    static getProduct : RequestHandler = async (req, res, next) => {
        const productId = req.params.id
        const product = await Product.findById(productId).exec()
        if(!product){
            res.status(201)
            return
        }
        console.log("found product ", product.id)
    }

}
