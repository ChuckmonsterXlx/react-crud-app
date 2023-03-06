import React, {useState, useEffect} from "react";
import { useAppSelector } from "../../hooks/redux";
import styles from './settingsContainer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faBorderAll, faUser, faSignOutAlt, faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import { IProfileImg } from "../../redux/slices/verifedUser";

const SettingsContainer = () => {

    const {verifedUser} = useAppSelector((state) => state);
    const [ imgOptionSelected, setImgOptionSelected ] = useState("");
    const [optionsImg, setOptionImg] = useState<IOptionsImg[]>([])
    const [visibleEditProfileImg, setVisibleEditProfileImg] = useState(false);
    const [visibleEditName, setVisibleEditName] = useState(false);
    const [visibleEditLastName, setVisibleEditLastName] = useState(false);
    const indicatorPI = 'profileImg';
    const indicatorN = 'iName';
    const indicatorLN = 'iLastName';
    const [updatePictureImg, setUpdatePictureImage] = useState<IProfileImg>({
        label: '', value: '', url: ''
    });
    const [updateName, setUpdateName] = useState('');
    const [updateLastName, setUpdateLastName] = useState('');

    interface IOptionsImg {
        label: string,
        value: string,
        url: string
    }
    interface IUserRegister {
        name: string;
        lastName: string;
        profileImg: IProfileImg;
    }
    const [userRegister, setUserRegister] = useState<IUserRegister>({
        name: verifedUser.name,
        lastName: verifedUser.lastName,
        profileImg: verifedUser.profileImg,
    });

    const handleImgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = optionsImg.find((option) => option.value === selectedValue);
        if (selectedOption) {
            setImgOptionSelected(selectedOption.value);
            setUserRegister({ ...userRegister, [event.target.name]: selectedOption });
        }
    };

    const handleChange = ({target: {name, value}}: {target: {name: string, value: string}}) => {
        setUserRegister({...userRegister, [name]: value});
    }

    const updateOptionsImg = () => {
        fetch("http://localhost:3001/profileImgs")
            .then((res) => res.json())
            .then((res) => {
                setOptionImg(res)
                console.log(res);
            })
            .catch((error) => console.error(error));
    }

    const handleVisibleEdit = (indicator:string) => {
        switch (indicator) {
            case 'profileImg':
                setVisibleEditProfileImg(!visibleEditProfileImg);
                break;
        
            case 'iName':
                setVisibleEditName(!visibleEditName);
                break;

            case 'iLastName': 
                setVisibleEditLastName(!visibleEditLastName);
                break;
            
            default:
                break;
        }
    }

    const onUpdate = () => {
        // const entriesA = Object.entries(verifedUser);
        // const entriesB = Object.entries(userRegister);

        // if (entriesA === entriesB && entriesA.every(([key, value]) => userRegister.hasOwnProperty(key) && userRegister[key] === value))

        console.log(userRegister);

    }

    useEffect(() => {
        updateOptionsImg();
    }, []);

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
                                    <select name="profileImg" value={imgOptionSelected} onChange={handleImgChange}>
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
                        <td><div onClick={() => handleVisibleEdit(indicatorPI)} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faEdit}/></div></td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        {
                            visibleEditName ? 
                                <td><input type="text" placeholder={verifedUser.name} name="name" onChange={handleChange}/></td>
                            :
                                <td>{verifedUser.name}</td>
                        }
                        <td><div onClick={() => handleVisibleEdit(indicatorN)} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faEdit}/></div></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        {
                            visibleEditLastName ? 
                                <td><input type="text" placeholder={verifedUser.lastName} name="lastName" onChange={handleChange}/></td>
                            :
                                <td>{verifedUser.lastName} </td>
                        }
                        <td><div onClick={() => handleVisibleEdit(indicatorLN)} style={{cursor:'pointer'}}><FontAwesomeIcon icon={faEdit}/></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button>Cancel</button>
            <button onClick={onUpdate}>Update</button>
        </div>
    </>
   )
}

export default SettingsContainer;