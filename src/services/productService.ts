// src/services/ProductService.ts

import type { Product } from "../types/Product"

const API_URL = 'http://localhost:3000/api/products' // à adapter selon ton backend

export const ProductService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits.")
    }
    return await response.json()
  },

  async fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Produit avec l'id ${id} introuvable.`)
    }
    return await response.json()
  },

  // Exemples supplémentaires si tu veux ajouter des produits côté admin
  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (!response.ok) {
      throw new Error("Erreur lors de la création du produit.")
    }
    return await response.json()
  }
}