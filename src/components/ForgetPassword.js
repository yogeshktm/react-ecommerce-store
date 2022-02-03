import { useState } from 'react';
import loaderImg from '../images/785.gif';
import useInput from '../hooks/useInput';
import getFirebase from '../firebase';
import { act } from 'react-dom/test-utils';
export default function ForgetPassword(props) {
    const email = useInput("");
    const firebaseInstance = getFirebase();
    const [forgetPwdSuccess, setForgetPwdSuccess] = useState(false);
    const [forgetPwdError, setForgetPwdError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const handleResetPwd = (event) => {
        event.preventDefault();
        firebaseInstance.auth().sendPasswordResetEmail(email.value)
            .then(() => {
                // Password reset email sent!
                // ..
                alert("success");
                setForgetPwdSuccess(true);
                setForgetPwdError(false);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                setForgetPwdSuccess(false);
                setForgetPwdError(true);
                setErrorMsg(error.message);
            });
    }
    return (
        <div className="login">
            <h2>Forget Password</h2>
            <form className="forget-pwd-form" onSubmit={handleResetPwd}>
                <input type="email" placeholder="email" {...email} required />
                <button className="btn-primary forget-pwd-btn">Send Reset password mail</button>
            </form>
            {
                forgetPwdSuccess ? <p className="success">Reset password mail sent ! please check your inbox</p> : ""
            }
            {
                forgetPwdError ? <p className="error">{errorMsg}</p> : null
            }
        </div>
    );
}






























