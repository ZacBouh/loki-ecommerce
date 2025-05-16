import { config } from "dotenv";
import express from 'express';
import ProductController from "./controllers/ProductController.js";
config()

const app = express()
const port = process.env.PORT

app.get('/api/products', ProductController.getProducts)

// Login User

// Produits 
// tous les produits
// 1 seul produit

// Création Commande


app.get(/.*/,(req, res) => {
    res.send("<h1>Back end is running 👍</h1>")
})

app.listen(port, () => console.log(`👂 Serveur listening on http://localhost:${port}`))
