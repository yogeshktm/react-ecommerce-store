import { useState, useEffect, useContext } from "react";
import Login from "../components/Login";
import AppContext from "../components/AppContext";
import MyProfileContainer from "./MyProfileContainer";

export default function LoginContainer(props) {
  const myContext = useContext(AppContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(0);
  const [loginEmpty, setLoginEmpty] = useState(0);
  const [token, setToken] = useState();

  useEffect(() => {
    WelcomeUser();
  });
  const WelcomeUser = () => {};
  const getUserName = (e) => {
    setUserName(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const submitLoginForm = (e) => {
    e.preventDefault();
    username !== "" && password !== ""
      ? fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            mode: "no-cors",
          },
          body: JSON.stringify({
            username: username, //mor_2314
            password: password, //83r5^_
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.status === "Error") {
              setLoginError(1);
            } else {
              setLoginError(0);
              setToken(res.token);
              sessionStorage.setItem("token", JSON.stringify(res.token));
              sessionStorage.setItem("username", username);
              myContext.setAsLoggedin(1);
              window.location = "/my-profile";
            }
          })
      : setLoginEmpty(1);
  };

  return (
    <>
      {myContext.isLoggedin ? (
        <MyProfileContainer></MyProfileContainer>
      ) : (
        <Login
          getUserName={getUserName}
          getPassword={getPassword}
          handleSubmit={submitLoginForm}
          error={loginError}
          empty={loginEmpty}
        ></Login>
      )}
    </>
  );
}
