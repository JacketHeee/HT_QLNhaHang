import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QRCodeScanner from './components/QRCodeScanner';
import MenuPage from './components/MenuPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import './components/Menu.css';
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(
          cart.map(item =>
              item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
          )
      );
    } else {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
        cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
    );
  };

  return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">POS System</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/scan">Scan QR</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart ({cart.length})</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/scan" element={<QRCodeScanner />} />
          <Route path="/menu" element={<MenuPage addToCart={addToCart} cart={cart} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/" element={<QRCodeScanner />} />
        </Routes>
      </Router>
  );
}

export default App;