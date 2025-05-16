import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Product } from '../types/Product'
import { ProductService } from '../services/productService'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return
        const prod = await ProductService.fetchProductById(Number(id))
        setProduct(prod)
      } catch (err) {
        setError('Produit introuvable.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <p>Chargement du produit...</p>
  if (error || !product) return <p>{error}</p>

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>&larr; Retour</button>

      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ maxWidth: '400px' }} />
      <p><strong>Description :</strong> {product.description}</p>
      <p><strong>Marque :</strong> {product.brand}</p>
      <p><strong>Catégorie :</strong> {product.category}</p>
      <p><strong>Prix :</strong> {product.price} z</p>
      <p><strong>En stock :</strong> {product.countInStock}</p>
      <p><strong>Note :</strong> {product.rating} / 5</p>
      <p><strong>Nombre d’avis :</strong> {product.numReviews}</p>
    </div>
  )
}

export default ProductDetail