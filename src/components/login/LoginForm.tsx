import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser, setUsers } from "../../redux/slices/users";
import { setVerifedUser } from "../../redux/slices/verifedUser";
import styles from "./loginForm.module.css";

const LoginForm = () => {
    const navigate = useNavigate();
    //const { users } = useAppSelector((state) => state);
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

        fetch("http://localhost:3001/users")
            .then((res) => res.json())
            .then((res) => {
                dispatch(setUsers(res));
                startingSession(res);
            })
            .catch((error) => console.log(error));
    }

    const startingSession = (users:IUser[]) => {
        let emailL = userLogin.email.toLowerCase();
        let emailLDB = '';
        
        for (let i = 0; i < users.length; i++) {
            emailLDB = users[i].email.toLowerCase();
            if (emailL === emailLDB && userLogin.password === users[i].password)
            {
                setErrorLogin(false);
                dispatch(setVerifedUser({
                    login: true,
                    userId: users[i].id,
                    name: users[i].name,
                    lastName: users[i].lastName,
                    email: users[i].email,
                    role: users[i].role,
                    profileImg: users[i].profileImg,
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
                <p>Log in</p>
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