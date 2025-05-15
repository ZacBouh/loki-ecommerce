import { useEffect, useState } from "react";
import "./App.css";
import Cart from "./pages/Cart";
import Header from "./pages/Header";
import Products from "./pages/Products";
import OrderPage from "./pages/OrderPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProductService } from "./services/productService";

type Product = {
  id: number;
  name: string;
  price: number;
};

function App() {
   const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Épée du chasseur", price: 100 },
    { id: 2, name: "Potion de soin", price: 25 },
    { id: 3, name: "Armure en écailles", price: 250 },
  ]);

   useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error("Erreur de chargement des produits :", err)
      }
    }
    loadProducts()
  }, [])

  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <>
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Navigate to="/produits" />} />
        <Route
          path="/produits"
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path="/panier"
          element={<Cart cartItems={cart} onRemove={removeFromCart} />}
        />
        <Route
          path="/commander"
          element={
            <OrderPage cartItems={cart} onOrderComplete={() => setCart([])} />
          }
        />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
          <Route
          path="/login"
          element={
            <Login />
          }
        />
      </Routes>
    </>
  );
}

export default App;
