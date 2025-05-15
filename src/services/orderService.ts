export type Product = {
  id: number
  name: string
  price: number
}

export type OrderData = {
  address: string
  postalCode: string
  city: string
  country: string
  products: Product[]
}

const API_URL = 'http://localhost:3000/api/orders' // adapte selon ton backend

export const OrderService = {
  async placeOrder(orderData: OrderData): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const error = await response.json()
        return { success: false, message: error.message || 'Erreur lors de la commande' }
      }

      return { success: true }
    } catch (error) {
      return { success: false, message: (error as Error).message }
    }
  },
}
