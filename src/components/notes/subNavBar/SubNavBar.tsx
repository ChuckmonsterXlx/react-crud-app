import React from "react";
import styles from './subNavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const SubNavBar = () => {
    return (
        <>
            <div className={styles.subNavBar}>
                <div className={styles.container}>
                    <h1>Notes</h1>
                    <p><FontAwesomeIcon icon={faPlus} /> Add note</p>
                </div>
            </div>
        </>
    )
}

export default SubNavBar