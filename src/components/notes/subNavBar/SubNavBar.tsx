import React, { useContext } from "react";
import styles from './subNavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ViewAddNewNoteContext } from "../../../pages/Dashboard";

const SubNavBar = () => {

    const { viewAddNewNote, setViewAddNewNote } = useContext(ViewAddNewNoteContext);

    const showHide = () => {
        setViewAddNewNote(!viewAddNewNote);
    }

    return (
        <>
            <div className={styles.subNavBar}>
                <div className={styles.container} onClick={() => showHide()}>
                    <h1>Notes</h1>
                    <p><FontAwesomeIcon icon={faPlus} /> Add note</p>
                </div>
            </div>
        </>
    )
}

export default SubNavBar