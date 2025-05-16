import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Exemple simple de vérification
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const data = await login(email, password);
      sessionStorage.setItem("username", data.user.name);
      sessionStorage.setItem("idUser", data.user.id);

      // ✅ Redirection après connexion réussie
      navigate("/produits");
    } catch (err) {
      setError("Identifiants invalides ou erreur serveur.");
    }
  };

  return (
    <div className="login-page">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
