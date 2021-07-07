export default function Login(props) {
  const { getUserName, getPassword, handleSubmit } = props;
  return (
    <div className="login">
      <h2>Login</h2>
      <p className="error">
        {props.error ? "Username/password is incorrect" : ""}
      </p>
      {props.empty ? (
        <p className="error">Login/Password should not be empty</p>
      ) : (
        <></>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" onChange={getUserName} />
        <input type="password" placeholder="password" onChange={getPassword} />
        <button className="btn-primary">submit</button>
      </form>
    </div>
  );
}
