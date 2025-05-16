import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";
import { OrderService } from "../services/orderService";  

type OrderPageProps = {
  cartItems: Product[];
  onOrderComplete: () => void;
};

const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  onOrderComplete,
}) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const groupedItems = cartItems.reduce((acc: Record<string, { product: Product; quantity: number }>, item) => {
      if (acc[item._id]) {
        acc[item._id].quantity += 1
      } else {
        acc[item._id] = { product: item, quantity: 1 }
      }
      return acc
    }, {})

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !address.trim()
    ) {
      return alert("Veuillez remplir tous les champs de livraison.");
    }

    const order: any = {
      userId: "defaultUserId", // ou récupéré via le contexte utilisateur si tu as un système d'auth
      address: address, // attention : ton backend utilise "adress" et non "address"
      price: total,
      items: groupedItems,
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

        {error && <p className="error">{error}</p>}

        <h3>Récapitulatif :</h3>
        <ul>
  {Object.values(groupedItems).map(({ product, quantity }) => (
    <li key={product._id}>
      {product.name} x {quantity} — {product.price * quantity} z
    </li>
  ))}
</ul>

        <h4>Total : {total} €</h4>

        <button type="submit">Valider la commande</button>
      </form>
    </div>
  );
};

export default OrderPage;
