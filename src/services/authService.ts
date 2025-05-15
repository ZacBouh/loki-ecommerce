const API_URL = 'http://localhost:3000/api/auth'

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Erreur de connexion')
  }

  return await response.json() // ex: { token: 'xxx' }
}

export const register = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || "Erreur lors de l'inscription")
  }

  return await response.json()
}