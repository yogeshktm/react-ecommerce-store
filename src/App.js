import "./App.css";
import ProductDetailContainer from "./container/ProductDetailContainer";
import Header from "./components/Header";
import CategoryProducts from "./container/CategoryProducts";
import LoginContainer from "./container/LoginContainer";
import ProductListItemContainer from "./container/ProductListItemContainer";
import AppContext from "./components/AppContext";

import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyProfileContainer from "./container/MyProfileContainer";
// import CartContainer from "./container/CartContainer";

function App() {
  const [isLoggedin, setAsLoggedin] = useState(0);
  const [userName, setUserName] = useState();
  const [ProductsData, SetProductsData] = useState();
  const [isLoading, setLoading] = useState(0);
  const [darkMode, setDarkMode] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  useEffect(() => {
    checkLoginStatus();
  });
  useEffect(() => {
    getAllProductsData();
  }, []);
  const checkLoginStatus = () => {
    const authToken = sessionStorage.getItem("token");
    console.log(authToken);
    if (authToken) {
      JSON.parse(authToken);
      console.log(authToken);
      setAsLoggedin(1);
    }
  };
  const getAllProductsData = (e) => {
    fetch("https://fakestoreapi.com/products?limit=50")
      .then((res) => res.json())
      .then((res) => {
        SetProductsData(res);
        setLoading(1);
      });
  };
  const values = {
    isLoggedin,
    setAsLoggedin,
    userName,
    setUserName,
    ProductsData,
    SetProductsData,
    isLoading,
    setLoading,
    darkMode,
    setDarkMode,
  };
  return (
    <div className="App">
      <AppContext.Provider value={values}>
        <Header></Header>
        <Switch>
          <Route
            path="/"
            component={() => <ProductListItemContainer />}
            exact
          />
          <Route path="/product-detail/:id">
            <ProductDetailContainer></ProductDetailContainer>
          </Route>
          <Route
            path="/products/:category"
            component={() => <CategoryProducts />}
          />
          <Route
            path="/login"
            component={() => <LoginContainer></LoginContainer>}
          ></Route>
          <Route
            path={isLoggedin ? "/my-profile" : "/login"}
            component={() =>
              isLoggedin ? (
                <MyProfileContainer />
              ) : (
                <LoginContainer></LoginContainer>
              )
            }
          ></Route>
          {/* <Route
            path="/cart"
            component={() => <CartContainer></CartContainer>}
          ></Route> */}
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
