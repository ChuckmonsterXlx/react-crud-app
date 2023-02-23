import React from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faBorderAll } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {

    return (
        <nav className={styles.navContainer}>
        <ul>
            <li>
                <div className={styles.iconContainer}><FontAwesomeIcon icon={faBars} /></div>
            </li>
          <li>
            <Link to="/"><div className={styles.iconContainer}><FontAwesomeIcon icon={faHome}/></div> Home</Link>
          </li>
          <li>
            <Link to="/dashboard"><div className={styles.iconContainer}><FontAwesomeIcon icon={faBorderAll}/></div> Dashboard</Link>
            
          </li>
        </ul>
      </nav>
    )
}

export default NavBar;