import React from 'react'
import type { Product } from '../types/Product'
import { Link } from 'react-router-dom'

type ProductsProps = {
  products: Product[]
  addToCart: (product: Product) => void
}

const Products: React.FC<ProductsProps> = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          <h2>{product.name}</h2>
          <p><strong>Marque :</strong> {product.brand}</p>
          <p><strong>Catégorie :</strong> {product.category}</p>
          <p><strong>Stock :</strong> {product.countInStock > 0 ? `${product.countInStock} en stock` : 'Rupture'}</p>
          <p><strong>Note :</strong> {product.rating} / 5 ({product.numReviews} avis)</p>
          <p><strong>Description :</strong> {product.description.slice(0, 100)}...</p>
          <p><strong>Prix :</strong> {product.price} z</p>

          <button onClick={() => addToCart(product)}>Ajouter au panier</button>
          <Link to={`/produit/${product.id}`} className="details-link">Voir les détails</Link>
        </div>
      ))}
    </div>
  )
}

export default Products