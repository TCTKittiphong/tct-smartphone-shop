import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Basket from "./components/Basket";
import Swal from "sweetalert2";
import { AuthProvider } from "./components/Users/authContext";
import { Register } from "./components/Users/Register";
import { Login } from "./components/Users/Login";
import { ProtectedRoute } from "./components/Users/ProtectedRoute";
import ProductView from "./components/ProductView";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [basketData, setBasketData] = useState([]);

  const navigate = useNavigate();

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
    Swal.fire({
      position: "end",
      icon: "success",
      title: "Remove Product success",
      showConfirmButton: false,
      timer: 1000,
    });
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

  const productView = (product) => {
    return navigate(`/product-view/${product}`);
  };

  return (
    <div className="container">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Products
                  categories={categories}
                  addProduct={addProduct}
                  basketData={basketData}
                  productView={productView}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/basket"
            element={
              <ProtectedRoute>
                <Basket
                  basketData={basketData}
                  updateProduct={updateProduct}
                  handleEmptyBasket={handleEmptyBasket}
                  RemoveItemFromBasket={RemoveItemFromBasket}
                  productView={productView}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-view/:id"
            element={
              <ProtectedRoute>
                <ProductView basketData={basketData} addProduct={addProduct} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
