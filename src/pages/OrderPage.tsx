import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";
import { OrderService } from "../services/orderService";
import type { Order } from "../types/Order";

type OrderPageProps = {
  cartItems: Product[];
  onOrderComplete: () => void;
};

const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  onOrderComplete,
}) => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !address.trim() ||
      !postalCode.trim() ||
      !city.trim() ||
      !country.trim()
    ) {
      return alert("Veuillez remplir tous les champs de livraison.");
    }

    const order: Order = {
      user: "defaultUserId", // ou récupéré via le contexte utilisateur si tu as un système d'auth
      adress: address, // attention : ton backend utilise "adress" et non "address"
      price: total,
      dateOrder: new Date(),
      products: cartItems,
    };

    const result = await OrderService.createOrder(order);

    if (result.success) {
      alert("Commande validée avec succès !");
      onOrderComplete();
      navigate("/produits");
    } else {
      setError(
        result.message || "Erreur lors de la validation de la commande."
      );
    }
  };

  return (
    <div className="order-page">
      <h2>Finaliser la commande</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Adresse de livraison :</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
          />
        </div>

        <div>
          <label>Code postal :</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ville :</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Pays :</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <h3>Récapitulatif :</h3>
        <ul>
          {cartItems.map((item, i) => (
            <li key={i}>
              {item.name} - {item.price} z
            </li>
          ))}
        </ul>

        <h4>Total : {total} z</h4>

        <button type="submit">Valider la commande</button>
      </form>
    </div>
  );
};

export default OrderPage;
