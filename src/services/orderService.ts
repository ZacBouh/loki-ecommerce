import type { Order } from "../types/Order"

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/order`

export const OrderService = {
  async createOrder(order: Order): Promise<any> {
    console.log(order)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la commande.")
    }

    return await response.json()
  },

  async fetchOrders(): Promise<Order[]> {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des commandes.")
    }
    return await response.json()
  },

  async fetchOrderById(id: string): Promise<Order> {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`Commande avec l'id ${id} introuvable.`)
    }
    return await response.json()
  }
}