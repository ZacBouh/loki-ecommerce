// src/Products.tsx
import React from 'react'

type Product = {
  id: number
  name: string
  price: number
}

type ProductsProps = {
  products: Product[]
  addToCart: (product: Product) => void
}

const Products: React.FC<ProductsProps> = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="card">
          <h2>{product.name}</h2>
          <p>Prix : {product.price} z</p>
          <button onClick={() => addToCart(product)}>Ajouter au panier</button>
        </div>
      ))}
    </div>
  )
}

export default Products