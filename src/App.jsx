import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from "react";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Basket from "./components/Basket";
import Swal from "sweetalert2";
import Home from "./components/Users/Home";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [basketData, setBasketData] = useState([]); 

  const fetchProductsPerCategory = async () => {
    const { data: products } = await commerce.products.list();
    const { data: categoriesData } = await commerce.categories.list();
    const productsPerCategory = categoriesData.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((product) =>
            product.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, []);
    setCategories(productsPerCategory);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };

  useEffect(() => {
    fetchProductsPerCategory();
    fetchBasketData();
  }, []);

  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
    Swal.fire({
      position: "end",
      icon: "success",
      title: "Add Product success",
      showConfirmButton: false,
      timer: 1000,
    });
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
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route
          path="/products"
          element={
            <Products
              categories={categories}
              addProduct={addProduct}
              basketData={basketData}
            />
          }
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
    </Router>
  );
};

export default App;
