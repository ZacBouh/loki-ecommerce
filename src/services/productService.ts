// src/services/ProductService.ts

import type { Product } from "../types/Product"

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/products`

export const ProductService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits.")
    }
    return await response.json()
  },

  async fetchProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Produit avec l'id ${id} introuvable.`)
    }
    return await response.json()
  },
}