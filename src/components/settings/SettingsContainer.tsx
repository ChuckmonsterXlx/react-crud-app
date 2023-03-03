import React, {useState, useEffect} from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from './settingsContainer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faBorderAll, faUser, faSignOutAlt, faCog, faEdit } from "@fortawesome/free-solid-svg-icons";

const SettingsContainer = () => {

    const {verifedUser} = useAppSelector((state) => state);
    const [ imgOptionSelected, setImgOptionSelected ] = useState("");
    const [optionsImg, setOptionImg] = useState<IOptionsImg[]>([])
    const [visibleEditProfileImg, setVisibleEditProfileImg] = useState(false);

    interface IOptionsImg {
        label: string,
        value: string,
        url: string
    }

    const handleImgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = optionsImg.find((option) => option.value === selectedValue);
        if (selectedOption) {
            setImgOptionSelected(selectedOption.value);
            setUserRegister({ ...userRegister, [event.target.name]: selectedOption.url });
        }
    };

    interface IUserRegister {
        name: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        urlProfileImg: string;
    }

    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        role: "member",
        urlProfileImg: "",
    });

    const updateOptionsImg = () => {
        fetch("http://localhost:3001/profileImgs")
            .then((res) => res.json())
            .then((res) => {
                setOptionImg(res)
                console.log(res);
            })
            .catch((error) => console.error(error));
    }

    const handleVisibleEdit = () => {
        setVisibleEditProfileImg(!visibleEditProfileImg);
    }

    useEffect(() => {
        updateOptionsImg();
    }, [])

    return(
    <>
        <h3>Usuarios registrados</h3>
        <div className={ styles.tableContainer }>
            <table className={ styles.table }>
                <tbody>
                    <tr>
                        <td>Profile Picture:</td>
                        <td>
                            {
                                visibleEditProfileImg ?
                                    <select name="urlProfileImg" value={imgOptionSelected} onChange={handleImgChange}>
                                        <option value="">Select a picture image</option>
                                        {optionsImg.map((option, index) => (
                                            <option key={index} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                :
                                    <>
                                        {verifedUser.profileImg.label}
                                    </>
                            }
                        </td>
                        <td><div onClick={() => handleVisibleEdit()} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faEdit}/></div></td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{verifedUser.name}</td>
                        <td><FontAwesomeIcon icon={faEdit}/></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td>{verifedUser.lastName} </td>
                        <td><FontAwesomeIcon icon={faEdit}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button>Cancel</button>
            <button>Update</button>
        </div>
    </>
   )
}

export default SettingsContainer;