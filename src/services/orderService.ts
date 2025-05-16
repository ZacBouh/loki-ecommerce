import type { Order } from "../types/Order"

const API_URL = 'http://localhost:3000/api/orders'

export const OrderService = {
  async createOrder(order: Order): Promise<any> {
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