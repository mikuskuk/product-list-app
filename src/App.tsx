import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <div className="mt-2 mx-4 md:mx-0 md:w-1/2 lg:w-1/3 mx-auto">
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
