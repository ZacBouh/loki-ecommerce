import { config } from "dotenv";
import express from 'express';
import ProductController from "./controllers/ProductController.js";
import AuthController from "./controllers/AuthController.js";
import path from 'path'
import { fileURLToPath } from "url";
config()

const app = express()
const port = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const appDistRoot = path.join(__dirname, '..', '..', 'dist') 
console.log()

app.use(express.static(appDistRoot))
app.use(express.json())

// Produits 
app.get('/api/products', ProductController.getProducts)
app.get('/api/products/:id', ProductController.getProduct)

// Login User
app.post('/api/auth/login', AuthController.loginUser)

// Création Commande


app.get(/.*/, (req, res) => {
    res.sendFile(path.join(appDistRoot, 'index.html'))  
})

app.listen(port, () => console.log(`👂 Serveur listening on http://localhost:${port}`))
