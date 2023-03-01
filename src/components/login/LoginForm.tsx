import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setVerifedUser } from "../../redux/slices/verifedUser";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const { users } = useAppSelector((state) => state);
    const [errorLogin, setErrorLogin] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const { verifedUser } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();
    
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
                dispatch(setVerifedUser({
                    login: true,
                    userId: users[i].id
                }))
                setIsLoggedIn(true);
                return
            }
        }

        console.log("Email o password incorrectos");
        setErrorLogin(true)
    }

    useEffect(() => {
        if (isLoggedIn) {
            if (verifedUser.login) {
                console.log("Deberias ir al home");
                navigate("/");
            }
        }
    }, [isLoggedIn, verifedUser.login])

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