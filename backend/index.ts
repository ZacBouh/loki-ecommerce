import { config } from "dotenv";
import express, { application } from 'express';
import session from 'express-session';
config()

const app = express()
const port = process.env.PORT

app.listen(port, () => console.log(`👂 Serveur listening on http://localhost:${port}`))
