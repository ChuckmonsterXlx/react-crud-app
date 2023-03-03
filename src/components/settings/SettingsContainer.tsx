import React from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from './settingsContainer.module.css'

const SettingsContainer = () => {

    const {verifedUser} = useAppSelector((state) => state);

   return(
    <>
        <h3>Usuarios registrados</h3>
        <div className={ styles.tableContainer }>
            <table className={ styles.table }>
                <tbody>
                    <tr>
                    <td>Profile Picture:</td>
                    <td>Avatar</td>
                    </tr>
                    <tr>
                    <td>Name:</td>
                    <td>{verifedUser.name}</td>
                    </tr>
                    <tr>
                    <td>Last Name:</td>
                    <td>{verifedUser.lastName}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
   )
}

export default SettingsContainer;