import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Products from "./components/Products";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Basket from "./components/Basket";
import Swal from "sweetalert2";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data) || []);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();
  }, []);

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
    Swal.fire({
      position: 'end',
      icon: 'success',
      title: 'Add Product success',
      showConfirmButton: false,
      timer: 1000
    })
  };
  console.log("basketData.total_items", basketData);

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
    console.log(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };


  return (
    <Router>
      <div>
        <NavBar 
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />
        <Routes>
          <Route
            path="/products"
            element={<Products products={products} addProduct={addProduct} />}
          />
          <Route
            path="/basket"
            element={
              <Basket
                basketData={basketData}
                updateProduct={updateProduct}
                handleEmptyBasket={handleEmptyBasket}
                RemoveItemFromBasket={RemoveItemFromBasket}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
