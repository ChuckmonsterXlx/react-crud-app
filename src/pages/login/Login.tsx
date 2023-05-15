import React from "react";
import LoginForm from "../../components/login/LoginForm";
import styles from './login.module.css'

const Login = () => {

    return(
        <div className={ styles.mainContainer }>
            <LoginForm />
        </div>
    )
}

export default Login;