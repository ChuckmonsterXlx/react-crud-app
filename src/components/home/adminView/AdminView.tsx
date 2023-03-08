import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUsers } from "../../../redux/slices/users";
import { IRole } from "../../../redux/slices/verifedUser";
import styles from "./adminView.module.css" 

const AdminView = () => {
    const dispatch = useAppDispatch();
    const [visibleBtnUpdate, setVisibleBtnUpdate] = useState(true);
    const { users, verifedUser } = useAppSelector((state) => state);
    const [roleOptionSelected, setRoleOptionSelected] = useState('');
    const [optionalRoles, setOptionalRoles] = useState([
        {label: "Admin", value: "admin"}, {label: "Member", value: "member"}
    ]);
    
    const [usersUpdate, setUsersUpdate] = useState<IUserUpdate[]>([]);

    interface IUserUpdate {
        userID: string,
        role: string
    }
    const [userUpdate, setUserUpdate] = useState<IUserUpdate>({
        userID: '',
        role: ''
    });

    const handleSubmit = () => {
        console.log(usersUpdate);
        // const data = {
        //     role: 
        // };
        // fetch("http://localhost:3001/users/" + , {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(data => {
        //   updated();
        // })
        // .catch(error => {
        //   console.error('Ha ocurrido un error:', error);
        // });
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>, userID: string) => {
        const selectedValue = event.target.value;
        const selectedOption = optionalRoles.find((option) => option.value === selectedValue);
        if (selectedOption) {
          const userToUpdate = users.find((user) => user.id === userID);
          if (userToUpdate) {
            //if (usersUpdate.find((user) => user.userID === userID)) {
            //    usersUpdate.push({userID: userID, role: selectedOption.value})
            //}
            setUserUpdate({...usersUpdate, userID: userID, role: selectedOption.value});
            
            const updatedUser = {
              ...userToUpdate,
              role: {
                label: selectedOption.label,
                value: selectedOption.value,
              },
            };
            const updatedUsers = users.map((user) => {
              if (user.id === userID) {
                return updatedUser;
              }
              return user;
            });
            setUsersUpdate([...usersUpdate, { userID: userID, role: selectedOption.value }]);
            dispatch(setUsers(updatedUsers));

          }
        }
      };

    useEffect(() => {
        console.log(usersUpdate);
    }, [usersUpdate])

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
                                        <select name="role" value={user.role.value} onChange={(event) => handleRoleChange(event, user.id)}>
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
            {
                visibleBtnUpdate ?
                    <div>
                        <button >Cancel</button>
                        <button onClick={handleSubmit}>Update</button>
                    </div>
                :
                    null
            }
        </>
    )
}

export default AdminView