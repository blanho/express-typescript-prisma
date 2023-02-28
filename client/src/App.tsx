import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CardPage';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart/:id?" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
