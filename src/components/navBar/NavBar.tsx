import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faStickyNote, faBorderAll, faUser, faSignOutAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setVerifedUser } from "../../redux/slices/verifedUser";
//font awesome

const NavBar = () => {
    const dispatch = useAppDispatch();
    const { verifedUser } = useAppSelector((state) => state);

    const [hideShowNav, setHideShowNav] = useState(false);

    const onHideShowNav = () => {
        setHideShowNav(!hideShowNav)
    }

    const onLogOut = () => {
         dispatch(setVerifedUser({
            login: false,
            userId: "",
            name: '',
            lastName: '',
            email: '',
            role: {label: '', value:''}, 
            profileImg: {label: '', value: '', url: ''}
         }))
    }

    return (
        <nav className={styles.navContainer}>
            <ul>
                <li onClick={onHideShowNav}>
                    <div className={styles.iconContainer}><FontAwesomeIcon icon={faBars} /></div>
                </li>
                { 
                    verifedUser.login ? 
                        <>
                            <li>
                                <Link to="/">
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faHome}/>
                                    </div>
                                    { hideShowNav && <div className={ styles.nameBtn }>Home</div>}
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes">
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faStickyNote}/>
                                    </div>
                                    {hideShowNav && <div className={ styles.nameBtn }>Notes</div>}
                                </Link>   
                            </li>
                            <li>
                                <Link to="/settings">
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faCog}/>
                                    </div>
                                    {hideShowNav && <div className={ styles.nameBtn }>Settings</div>}
                                </Link>   
                            </li>
                            <li>
                                <div onClick={onLogOut} className={styles.textList}>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faSignOutAlt}/>
                                    </div>
                                    {hideShowNav && <div className={ styles.nameBtn }>LogOut</div>}
                                </div>   
                            </li>
                        </>
                    :
                        <>
                            <li>
                                <Link to="/login"><div className={styles.iconContainer}><FontAwesomeIcon icon={faUser}/></div>{hideShowNav && 'Login'}</Link>   
                            </li>
                        </>

                }
            </ul>
        </nav>
    )
}

export default NavBar;