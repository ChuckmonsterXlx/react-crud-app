import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUsers } from "../../../redux/slices/users";
import { IRole } from "../../../redux/slices/verifedUser";
import styles from "./adminView.module.css" 

const AdminView = () => {
    const dispatch = useAppDispatch();
    const [visibleBtnUpdate, setVisibleBtnUpdate] = useState(false);
    const { users, verifedUser } = useAppSelector((state) => state);
    const [roleOptionSelected, setRoleOptionSelected] = useState('');
    const [optionalRoles, setOptionalRoles] = useState([
        {label: "Admin", value: "admin"}, {label: "Member", value: "member"}
    ]);
    
    const [usersUpdate, setUsersUpdate] = useState<IUserUpdate[]>([]);

    interface IUserUpdate {
        userID: string,
        roleEditing: string
    }
    const [userUpdate, setUserUpdate] = useState<IUserUpdate>({
        userID: '',
        roleEditing: ''
    });

    const handleSubmit = () => {
        console.log(usersUpdate);
        usersUpdate.map((userUpdate) => {
            users.map((user) => {
                if ( user.id === userUpdate.userID ) {
                    console.log( "userid: ", user.id, " rol: ", user.role.value, userUpdate.roleEditing )
                    let data;
                    // let data = {
                    //     role: {
                    //         label: '',
                    //         value: ''
                    //     },
                    //     roleEditing: ''
                    // }

                    if ( !(user.role.value === userUpdate.roleEditing) ) {
                        console.log("cambio el user.id, ", user.id);
                        optionalRoles.map((optionalRole) => {
                            if ( userUpdate.roleEditing === optionalRole.value ) {

                                data = {
                                    role: {
                                        label: optionalRole.label,
                                        value: optionalRole.value
                                    },
                                    roleEditing: optionalRole.value
                                }
                            }
                        })
                    }

                    console.log(data);

                    fetch("http://localhost:3001/users/" + user.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(data => {
                      refreshUsers();
                    })
                    .catch(error => {
                    console.error('Ha ocurrido un error:', error);
                    });
                }
            })
        })
    }

    const refreshUsers = () => {
        fetch("http://localhost:3001/users")
            .then((res) => res.json())
            .then((res) => {
                dispatch(setUsers(res));
            })
            .catch((error) => console.log(error));
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
            setUserUpdate({userID: userID, roleEditing: selectedOption.value});
            
            const updatedUser = {
              ...userToUpdate,
              roleEditing: selectedOption.value
            };
            const updatedUsers = users.map((user) => {
              if (user.id === userID) {
                return updatedUser;
              }
              return user;
            });
            if (!usersUpdate.find((user) => user.userID === userID)){
                setUsersUpdate([...usersUpdate, { userID: userID, roleEditing: selectedOption.value }]);
            } else {
                usersUpdate.map((user) => {
                    if (user.userID === userID) {
                        user.roleEditing = selectedOption.value
                    }
                })
                console.log("Ya se encuentra el user: ", userID)
            }
            
            dispatch(setUsers(updatedUsers));

          }
        }
      };

    useEffect(() => {
        console.log("UserUpdate: ", userUpdate);
    }, [userUpdate])

    useEffect(() => {
        let changeCounter = 0;
        usersUpdate.map((userUpdate) => {
            users.map((user) => {
                if ( user.id === userUpdate.userID ) {
                    if ( user.role.value === userUpdate.roleEditing ) {
                        if ( changeCounter < 1 ) {
                            setVisibleBtnUpdate(false);
                        }
                    } else {
                        changeCounter++;
                        setVisibleBtnUpdate(true);
                    }
                }
            })
        })
    }, [users]);

    useEffect(() => {

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
                                        <select name="role" value={user.roleEditing} onChange={(event) => handleRoleChange(event, user.id)}>
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