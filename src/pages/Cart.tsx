import React from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/Product'

type CartProps = {
  cartItems: Product[]
  onRemove: (productId: string) => void // on supprime par id produit
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove }) => {
  // Regroupe les produits par ID avec quantité
  const groupedItems = cartItems.reduce((acc: Record<string, { product: Product; quantity: number }>, item) => {
    if (acc[item._id]) {
      acc[item._id].quantity += 1
    } else {
      acc[item._id] = { product: item, quantity: 1 }
    }
    return acc
  }, {})

  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="cart-page">
      <h2>Votre panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {Object.values(groupedItems).map(({ product, quantity }) => (
              <li key={product._id}>
                {product.name} x {quantity} — {product.price * quantity + '€'} 
                <button onClick={() => onRemove(product._id)} style={{ marginLeft: 10 }}>
                  Retirer une unité
                </button>
              </li>
            ))}
          </ul>
          <h3>Total : {total} z</h3>
          <Link to="/commander">
            <button>Passer la commande</button>
          </Link>
        </>
      )}
    </div>
  )
}

export default Cart