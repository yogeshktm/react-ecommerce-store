import { useState, useEffect, useContext } from "react";
import getFirebase from "../firebase"
import Container from "@material-ui/core/Container";
import useInput from "../hooks/useInput";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import AppContext from "../components/AppContext";
import MyProfileContainer from "./MyProfileContainer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function LoginContainer(props) {
  const myContext = useContext(AppContext);
  const firebaseInstance = getFirebase();
  const loginEmail = useInput("")
  const loginPassword = useInput("")
  const email = useInput("")
  const password = useInput("");
  const [loginStatus, setLoginStatus] = useState(0);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [registrationSuccess, setRegistationSuccess] = useState(null);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isRegLoading, setRegLoading] = useState(false);
  const classes = useStyles();
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setLoginStatus(0);
  }
  const signUp = async (event) => {
    event.preventDefault();
    if ((email.value !== '') && (password.value !== '')) {
      setRegLoading(true);
      try {
        if (firebaseInstance) {
          const user = await firebaseInstance.auth().createUserWithEmailAndPassword(email.value, password.value)
          alert(`Welcome ${email.value}!`);
          setRegistationSuccess(1);
          handleReset();
          setRegLoading(false);
        }
      } catch (error) {
        setRegistationSuccess(0);
        setRegistrationErrorMessage(error.message);
        handleReset();
        setRegLoading(false);
      }
    }
  };
  const signIn = async (event) => {
    setLoginStatus(0);
    event.preventDefault();
    if ((loginEmail.value !== '') && (loginPassword.value !== '')) {
      setLoading(true);
      try {
        if (firebaseInstance) {
          const user = await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(loginEmail.value, loginPassword.value);
          sessionStorage.setItem('loginStatus', '1');
          myContext.setAsLoggedin(1);
          setLoginStatus(0);
          handleReset();
          setLoading(false);
          writeUserData(user.user.uid, user.user.email);
          console.log(user.user);
          console.log(user.user.email);
          console.log(user.user.uid);
          myContext.setEmail(user.user.email);
          myContext.setUserName(user.user.displayName);
          myContext.setUserData(user.user);
        }
      } catch (error) {
        setLoginStatus(1);
        setLoginErrorMessage(error.message);
        console.log("error", error);
        setLoginStatus(1);
        setLoading(false);
      }
    }
  };

  const writeUserData = (uid, email) => {
    firebaseInstance.database().ref('users/' + uid).set({
      email: email,
    });
  }
  return (
    <>
      {myContext.isLoggedin ? (
        <MyProfileContainer></MyProfileContainer>
      ) : (
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <SignUp
                  email={email}
                  pwd={password}
                  handleSignUp={signUp}
                  signupState={registrationSuccess}
                  successMessage="Successfully signed up ! login to continue..."
                  errorMessage={registrationErrorMessage}
                  isLoading={isRegLoading}
                ></SignUp>
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <Login
                  email={loginEmail}
                  pwd={loginPassword}
                  handleLogin={signIn}
                  loginStatus={loginStatus}
                  loginErrorMessage={loginErrorMessage}
                  isLoading={isLoading}
                ></Login>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )
      }
    </>
  );
}
