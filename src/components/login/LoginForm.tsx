import React from "react";
import { Link } from "react-router-dom";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.loginForm}>
                <div>
                    <input type='email' placeholder='email' name="email" required />
                </div>
                <div>
                    <input type='password' placeholder='password' name="psw" required />
                </div>
                <div>
                    <button type='button'>Login</button>
                </div>
                <div>
                    <Link to="/signup">Signup here</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;