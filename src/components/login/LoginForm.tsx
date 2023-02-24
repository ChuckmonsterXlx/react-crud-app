import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const { user } = useAppSelector((state) => state);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleChange = (e:any) => {
        if(e.target.name === "email") {
            setEmail(e.target.value)
        }
        else if(e.target.name === "password") {
            setPassword(e.target.value)
        }
        else {
            console.log("error in input")
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        for (let i = 0; i < user.length; i++) {
            if (email === user[i].email && password === user[i].password)
            {
                return console.log("Has iniciado sesion");
            }
        }

        console.log("Email o password incorrectos");

    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <p>Login</p>
                <div>
                    <input type='email' placeholder='email' name="email" onChange={handleChange}/>
                </div>
                <div>
                    <input type='password' placeholder='password' name="password" onChange={handleChange} />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
                <div>
                    <Link to="/signup">Signup here</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;