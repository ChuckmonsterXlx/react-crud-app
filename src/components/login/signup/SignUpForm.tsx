import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./signUpForm.module.css";

const SignUpForm = () => {
    const { user } = useAppSelector((state) => state);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <div className={styles.formContainer}>
            <form className={styles.signUpForm} >
                <p>SignUp Form</p>
                <div>
                    <input type='text' placeholder='name' name="name" />
                </div>
                <div>
                    <input type='text' placeholder='last name' name="lastName" />
                </div>
                <div>
                    <input type='email' placeholder='email' name="email" />
                </div>
                <div>
                    <input type='password' placeholder='password' name="password"  />
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