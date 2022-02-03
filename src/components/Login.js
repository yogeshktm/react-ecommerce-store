import loaderImg from '../images/785.gif';
import { Link } from "react-router-dom";

export default function Login(props) {
    const { email, pwd, handleLogin, loginStatus, loginErrorMessage, isLoading } = props;
    return (
        <div className="login">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" placeholder="email" {...email} required />
                <input type="password" placeholder="password" {...pwd} required />
                <button className="btn-primary login-btn">{isLoading ? <img src={loaderImg} alt="Loading..." /> : 'Login'}</button>
                <Link className="forget-link" to="/forget-password">Forget password</Link>
            </form>
            {
                loginStatus ? <p className="error">{loginErrorMessage}</p> : ""
            }
        </div>
    );
}
