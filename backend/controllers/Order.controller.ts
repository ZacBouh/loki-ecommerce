import { RequestHandler } from "express";
import { Order } from '../models/order.js';
import mongoose from 'mongoose';

export default class OrderController {
  static createOrder: RequestHandler = async (req, res) => {
    const { userId, address, price, items } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'ID utilisateur invalide.' });
      return;
    }

    if (!address || typeof address !== 'string' || address.trim().length < 1) {
      res.status(400).json({ message: 'Adresse invalide.' });
      return;
    }

    if (!items || typeof items !== 'object') {
      res.status(400).json({ message: 'Items manquants ou invalides.' });
      return;
    }

    // ✅ Conversion en tableau
    const formattedItems = Object.entries(items).map(([_, item]: any) => ({
      product: item.product._id || item.product,
      quantity: item.quantity
    }));

    if (formattedItems.length === 0) {
      res.status(400).json({ message: 'Aucun produit dans la commande.' });
      return;
    }

    if (typeof price !== 'number' || price <= 0) {
      res.status(400).json({ message: 'Prix invalide.' });
      return;
    }

    try {
      const order = await Order.create({
        user: userId,
        address,
        items: formattedItems,
        total_price: price
      });

      res.status(201).json({
        success: true,
        order
      });
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
}
