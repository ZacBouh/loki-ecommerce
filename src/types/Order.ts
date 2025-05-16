import type { Product } from "./Product"

export type Order = {
  _id?: string         // généré automatiquement par MongoDB
  user: string         // ID ou nom de l'utilisateur
  adress: string       // (note : tu as une faute à "address" si tu veux corriger)
  price: number
  dateOrder?: Date     // peut être optionnel si c’est le backend qui le définit
  products: Product[]
}