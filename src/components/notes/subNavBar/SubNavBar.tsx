import React, { useContext } from "react";
import styles from './subNavBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ViewAddNewNoteContext } from "../../../pages/dashboard/Dashboard";

const SubNavBar = () => {

    const { viewAddNewNote, setViewAddNewNote } = useContext(ViewAddNewNoteContext);

    const showHide = () => {
        setViewAddNewNote(!viewAddNewNote);
    }

    return (
        <>
            <div className={styles.subNavBar}>
                <div className={styles.container}>
                    <h1>Notes</h1>
                    <div onClick={() => showHide()} ><FontAwesomeIcon icon={faPlus}/> Add note</div>
                </div>
            </div>
        </>
    )
}

export default SubNavBar