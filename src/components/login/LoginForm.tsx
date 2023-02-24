import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const { users } = useAppSelector((state) => state);
    const [errorLogin, setErrorLogin] = useState(false);
    
    interface IUserLogin {
        email: string;
        password: string;
    }
    const [userLogin, setUserLogin] = useState<IUserLogin>({
        email: "",
        password: ""
    });
    
    

    const handleChange = ({target: {name, value}}: {target: {name: string, value: string}}) => {
        setUserLogin({...userLogin, [name]: value});
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        for (let i = 0; i < users.length; i++) {
            if (userLogin.email === users[i].email && userLogin.password === users[i].password)
            {
                setErrorLogin(false);
                return console.log("Has iniciado sesion");
            }
        }

        console.log("Email o password incorrectos");
        setErrorLogin(true)
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <p>Login</p>
                {errorLogin && <p className={styles.errorText}>wrong email or password</p>}
                <div>
                    <input type='email' placeholder='email' name="email" onChange={handleChange} required/>
                </div>
                <div>
                    <input type='password' placeholder='password' name="password" onChange={handleChange} required/>
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