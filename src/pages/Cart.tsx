import React from 'react'
import { Link } from 'react-router-dom'

type Product = {
  id: number
  name: string
  price: number
}

type CartProps = {
  cartItems: Product[]
  onRemove: (productId: number) => void // on supprime par id produit
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove }) => {
  // Regroupe les produits par ID avec quantité
  const groupedItems = cartItems.reduce((acc: Record<number, { product: Product; quantity: number }>, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1
    } else {
      acc[item.id] = { product: item, quantity: 1 }
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
              <li key={product.id}>
                {product.name} x {quantity} — {product.price * quantity} z
                <button onClick={() => onRemove(product.id)} style={{ marginLeft: 10 }}>
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