import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

type HeaderProps = {
  cartCount: number
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const navigate = useNavigate()
  const username = sessionStorage.getItem('username')

  const handleLogout = () => {
    sessionStorage.removeItem('username')
    navigate('/produits') // redirige vers produits après déconnexion
    window.location.reload() // recharge pour que l’état reflète le changement
  }

  return (
    <header className="header">
      <h1>Market</h1>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/produits">Produits</Link>
        <Link to="/panier">
          <FaShoppingCart style={{ marginRight: '5px' }} />
          Panier ({cartCount})
        </Link>

        {!username ? (
          <Link to="/login">Se connecter</Link>
        ) : (
          <>
            <span>Bienvenue, {username}</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header