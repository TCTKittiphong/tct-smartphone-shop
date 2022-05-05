import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Products from "./components/Products";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Basket from "./components/Basket";
import { Users } from "./components/Users/Users";
import {signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import auth from "./lib/firebase_config";
import Banner from "./components/Banner";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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
  };
  console.log("basketData.total_items", basketData);

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if(user){
        setUserInfo(user);
      } 
      else {
        setUserInfo(null);
      }
    });
  }, []);

  const login = () => {
    auth.languageCode = 'us';
    const provaider = new GoogleAuthProvider();
    signInWithPopup(auth, provaider)

    .then((result) => {
      console.log("SignIn : ", result);
    })

    .catch(err => {
      window.alert(err);
    });
  }

  const logout = () => {
    signOut(auth)

    .then(() => {
    })

    .catch(err => {
      window.alert(err);
    });
  }

  console.log(userInfo);

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
          {/* <Route path="/" element={<Users user={userInfo} login={login} logout={logout}/>} /> */}
          <Route
            path="/"
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
