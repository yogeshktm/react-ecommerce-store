import loaderImg from '../images/785.gif';

export default function SignUp(props) {
  const { email, pwd, handleSignUp, signupState, successMessage, errorMessage, isLoading } = props;
  return (
    <div className="login">
      <h2>Sign up</h2>
      <p className="error">
        {props.error ? "Username/password is incorrect" : ""}
      </p>
      {props.empty ? (
        <p className="error">Login/Password should not be empty</p>
      ) : (
        <></>
      )}
      <form className="login-form" onSubmit={handleSignUp}>
        <input type="email" placeholder="email" {...email} required />
        <input type="password" placeholder="password" {...pwd} required />
        <button className="btn-primary login-btn">{isLoading ? <img src={loaderImg} alt="Loading..." /> : 'Register'}</button>
        {
          signupState ? <p className="success"> {successMessage} </p> : <p className="error"> {errorMessage}</p>
        }
      </form>
    </div >
  );
}
