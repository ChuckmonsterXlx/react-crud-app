import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUsers } from "../../../redux/slices/users";
import styles from "./signUpForm.module.css";

const SignUpForm = () => {
    const { users } = useAppSelector((state) => state);
    const [errorEmailInUse, setErrorEmailInUse] = useState(false);
    const dispatch = useAppDispatch();

    interface IUserRegister {
        name: string;
        lastName: string;
        email: string;
        password: string;
    }

    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = ({target: {name, value}}: {target: {name: string, value: string}}) => {
        setUserRegister({...userRegister, [name]: value});
    }

    const updateUsers = () => {
        fetch("http://localhost:3001/users")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setUsers(res));
        })
        .catch((error) => console.error(error));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(users);
        if ( !(users.some((user) => user.email === userRegister.email) ) ) {
            return (
                fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userRegister)
                })
                .then(res => res.json())
                .then(data => {
                    updateUsers();
                    setErrorEmailInUse(false)
                })
                .catch(error => {
                    console.error('Ha ocurrido un error:', error);
                })
            );
        } else {
            setErrorEmailInUse(true)
            console.log("El correo ya esta en uso");
        }
    }

    useEffect(() => {
        console.log(users);
    }, [users])

    return (
        <div className={styles.formContainer}>
            <form className={styles.signUpForm} onSubmit={handleSubmit} >
                <p>SignUp Form</p>
                {errorEmailInUse && <p className={styles.errorEmail}>Email in use</p>}
                <div>
                    <input type='text' placeholder='name' name="name" onChange={handleChange} required/>
                </div>
                <div>
                    <input type='text' placeholder='last name' name="lastName" onChange={handleChange} required/>
                </div>
                <div>
                    <input type='email' placeholder='email' name="email" onChange={handleChange} required/>
                </div>
                <div>
                    <input type='password' placeholder='password' name="password"  onChange={handleChange} required/>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
                <div>
                    <Link to="/login">Login here</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;