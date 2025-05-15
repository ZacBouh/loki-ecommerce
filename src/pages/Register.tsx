import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../services/authService'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    const data = await register(name, email, password)
    localStorage.setItem('token', data.token)
    alert('Inscription réussie !')
  }

  return (
    <div className="register-page">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Nom :</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirmer le mot de passe :</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Déjà un compte ?{' '}
        <Link to="/login">
          <strong>Se connecter ici</strong>
        </Link>
      </p>
    </div>
  )
}

export default Register