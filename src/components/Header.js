import logo from "../images/logo-1.png";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import AllCategoriesContainer from "../container/AllCategoriesContainer";
import React, { useState, useContext } from "react";
import AppContext from "./AppContext";
import Switch from "@material-ui/core/Switch";
import cartIcon from "../images/shopping-cart.png";

export default function Header(props) {
  const MyContext = useContext(AppContext);
  const [accountDropdownStatus, setAccountDropdown] = useState(0);
  const [state, setState] = React.useState({
    darkMode: false,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    console.log(state);
    let rootElement = document.getElementById("root");
    if (!state.darkMode) {
      rootElement.classList.add("dark-mode");
    } else {
      rootElement.classList.remove("dark-mode");
    }
  };
  const logout = () => {
    if (MyContext.isLoggedin) {
      sessionStorage.clear();
      MyContext.setAsLoggedin(0);
      window.location.href = "/login";
    }
  };
  const openDropdown = () => {
    setAccountDropdown(1);
  };
  const closeDropdown = () => {
    setAccountDropdown(0);
  };
  return (
    <header>
      <Container maxWidth="md">
        <div className="app-header">
          <Link to="/" className="logo">
            <img className="logo" src={logo} alt="Logo" />
          </Link>

          <nav className="main-menu">
            <AllCategoriesContainer></AllCategoriesContainer>
          </nav>
          {MyContext.isLoggedin ? (
            <>
              <div
                className="my-account"
                onMouseOver={openDropdown}
                onMouseLeave={closeDropdown}
              >
                My Account
                {accountDropdownStatus ? (
                  <ul className="my-account-dropdown">
                    <li>
                      <Link to="/my-profile">My profile</Link>
                    </li>
                    <li>
                      <Link onClick={logout} to="/logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
              <Link to="/cart">
                <img src={cartIcon} alt="cart" className="cart-icon" />
              </Link>
              <div className="dark-mode-toggle">
                <Switch
                  checked={state.darkMode}
                  onChange={handleChange}
                  name="darkMode"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label>Dark mode</label>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </Container>
    </header>
  );
}
