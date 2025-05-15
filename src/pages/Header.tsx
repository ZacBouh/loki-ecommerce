// src/Header.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

type HeaderProps = {
  cartCount: number
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="header">
      <h1>Market</h1>
      <nav>
        <Link to="/produits">Produits</Link>
        <Link to="/panier">
          <FaShoppingCart style={{ marginRight: '5px' }} />
          Panier ({cartCount})
        </Link>
        <Link to="/register">Inscription</Link>
      </nav>
    </header>
  )
}

export default Header