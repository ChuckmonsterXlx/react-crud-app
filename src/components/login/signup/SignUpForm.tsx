import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./signUpForm.module.css";

const SignUpForm = () => {
    const { users } = useAppSelector((state) => state);

    interface IUserRegister {
        name: string;
        lastname: string;
        email: string;
        password: string;
    }

    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleChange = ({target: {name, value}}: {target: {name: string, value: string}}) => {
        setUserRegister({...userRegister, [name]: value});
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        for (let i = 0; i < users.length; i++) {
            if (users[i].email != userRegister.email) {
                fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userRegister)
                })
                .then(res => res.json())
                .then(data => {

                })
                .catch(error => {
                    console.error('Ha ocurrido un error:', error);
                });
            } else {
                console.log("El correo ya esta en uso");
            }
        }
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.signUpForm} onSubmit={handleSubmit} >
                <p>SignUp Form</p>
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