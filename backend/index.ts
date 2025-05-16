import { config } from "dotenv";
import express from 'express';
import ProductController from "./controllers/ProductController.js";
import path from 'path'
import { fileURLToPath } from "url";
config()

const app = express()
const port = process.env.PORT

app.get('/api/products', ProductController.getProducts)
app.get('/api/products/:id', ProductController.getProducts)


// Login User

// Produits 
// tous les produits
// 1 seul produit

// Création Commande

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(path.join(__dirname, '..', '..', 'dist'))
app.get(/.*/, express.static(path.join(__dirname, '..', '..', 'dist')))

app.listen(port, () => console.log(`👂 Serveur listening on http://localhost:${port}`))
