import { config } from "dotenv";
import express, { application } from 'express';
import session from 'express-session';
import db from '@services/db';
config()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("<h1>Back end is running </h1>")
})

app.listen(port, () => console.log(`👂 Serveur listening on http://localhost:${port}`))
