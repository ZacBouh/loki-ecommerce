import React, { useState } from 'react'
import { login } from '../services/authService'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Exemple simple de vérification
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }

   const data = await login(email, password)
    localStorage.setItem('token', data.token)
  }

  return (
    <div className="login-page">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  )
}

export default Login