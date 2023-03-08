import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./adminView.module.css" 

const AdminView = () => {
    const { users, verifedUser } = useAppSelector((state) => state);
    const [optionalRoles, setOptionalRoles] = useState([
        {label: "Admin", value: "admin"}, {label: "Member", value: "member"}
    ])

    return (
        <>
            <h3>Usuarios registrados</h3>
            <div className={ styles.tableContainer }>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select name="profileImg" value={user.role.value} onChange={() => console.log("Cambio")}>
                                            {optionalRoles.map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminView