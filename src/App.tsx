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
import type { Product } from "./types/Product";
import ProductDetail from "./pages/ProductDetail";

function App() {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.fetchProducts()
        console.log(data)
        setProducts(data as Product[])
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

  const removeFromCart = (id: string) => {
  const index = cart.findIndex((item) => item._id === id);
  if (index !== -1) {
    const newCart = [...cart];
    newCart.splice(index, 1); // retire la première occurrence
    setCart(newCart);
  }
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
        <Route path="/produit/:id" element={<ProductDetail />} />
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
