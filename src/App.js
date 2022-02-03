import "./App.css";
import ProductDetailContainer from "./container/ProductDetailContainer";
import Header from "./components/Header";
import CategoryProducts from "./container/CategoryProducts";
import LoginContainer from "./container/LoginContainer";
import ProductListItemContainer from "./container/ProductListItemContainer";
import AppContext from "./components/AppContext";
import getFirebase from "./firebase"



import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect, useDebugValue, lazy } from "react";
import MyProfileContainer from "./container/MyProfileContainer";
import { logRoles, queries, queryAllByRole, within } from '@testing-library/dom';
import { withMobileDialog, Zoom } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import { amber, brown, pink, purple, red, teal, yellow } from '@material-ui/core/colors';
import { mockComponent } from 'react-dom/cjs/react-dom-test-utils.development';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';
import testUtils from 'react-dom/test-utils';
import zIndex from '@material-ui/core/styles/zIndex';
import { hydrate } from 'react-dom/cjs/react-dom.development';
import { act } from '@testing-library/react';
import ForgetPassword from "./components/ForgetPassword";
// import CartContainer from "./container/CartContainer";

function App() {
  const [isLoggedin, setAsLoggedin] = useState(0);
  const [userName, setUserName] = useState("User");
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [ProductsData, SetProductsData] = useState();
  const [isLoading, setLoading] = useState(0);
  const [darkMode, setDarkMode] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  useEffect(() => {
    getAllProductsData();
  }, []);
  // Listen to onAuthStateChanged
  useEffect(() => {
    const firebase = getFirebase();
    let loginState = sessionStorage.getItem('loginStatus');
    if (loginState !== null) {
      setAsLoggedin(1);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setEmail(user.email);
          alert(user.email);
          setUserData(user);
          console.log("userdata", user);
        }
      });
    }
    else {

    }
    // if (loginStatus) {
    // if (firebase) {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       var uid = user.uid;
    //       setAsLoggedin(1);
    //       setEmail(user.email);
    //       alert(user.email);
    //       // ...
    //     } else {
    //       // User is signed out
    //       // ...
    //       setAsLoggedin(0);
    //       setEmail("");
    //     }
    //   });
    // }
    // }


  }, []);
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
    email,
    setEmail,
    userData,
    setUserData
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
            path="/forget-password"
            component={() => <ForgetPassword />}
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
