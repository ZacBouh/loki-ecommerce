import { RequestHandler } from "express";
import { Product } from "../models/product.js";
import { Types } from "mongoose";

export default class ProductController {

    static getProducts : RequestHandler = async ( _, res ) => {
        const products = await Product.find().exec()
        res.json(products)
    }

    static getProduct : RequestHandler = async (req, res) => {
        const productId = req.params.id
        if(!Types.ObjectId.isValid(productId)){
            res.status(400).json({error : 'Invalid product Id'})
            return 
        }    
        try {

            const product = await Product.findOne({_id: productId}).exec()
            if(!product){
                res.status(404).json({error: 'Product not found'})
                return
            }
            res.json(product)
        } catch (err) {
            console.log("ProductController error on getProduct ",err)
        } 
    }

}
