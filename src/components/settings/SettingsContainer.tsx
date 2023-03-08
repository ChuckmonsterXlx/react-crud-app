import React, {useState, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from './settingsContainer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faBorderAll, faUser, faSignOutAlt, faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import { IProfileImg, setVerifedUser } from "../../redux/slices/verifedUser";

const SettingsContainer = () => {

    const {verifedUser} = useAppSelector((state) => state);
    const [ imgOptionSelected, setImgOptionSelected ] = useState("");
    const [optionsImg, setOptionImg] = useState<IOptionsImg[]>([])
    const [visibleEditProfileImg, setVisibleEditProfileImg] = useState(false);
    const [visibleEditName, setVisibleEditName] = useState(false);
    const [visibleEditLastName, setVisibleEditLastName] = useState(false);
    const [visibleBtnUpdate, setVisibleBtnUpdate] = useState(false);
    const indicatorPI = 'profileImg';
    const indicatorN = 'iName';
    const indicatorLN = 'iLastName';
    const [whenChange, setWhenChange] = useState(false);
    const dispatch = useAppDispatch();

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
        setVisibleBtnUpdate(true);
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

        const data = {
            name: userRegister.name,
            lastName: userRegister.lastName,
            profileImg: userRegister.profileImg
        };

        fetch("http://localhost:3001/users/" + verifedUser.userId, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          updated();
        })
        .catch(error => {
          console.error('Ha ocurrido un error:', error);
        });

    }

    const updated = () => {
        setVisibleBtnUpdate(false)
        setVisibleEditProfileImg(false);
        setVisibleEditName(false);
        setVisibleEditLastName(false);

        dispatch(setVerifedUser({
            ...verifedUser, 
            name: userRegister.name,
            lastName: userRegister.lastName,
            profileImg: userRegister.profileImg
        }))
    }

    const cancelUpdate = () => {
        setVisibleBtnUpdate(false)
        setVisibleEditProfileImg(false);
        setVisibleEditName(false);
        setVisibleEditLastName(false);
        setUserRegister({
            profileImg: verifedUser.profileImg,
            name: verifedUser.name,
            lastName: verifedUser.lastName
        })
    }

    useEffect(() => {
        updateOptionsImg();
        setImgOptionSelected(verifedUser.profileImg.value);
    }, []);
    useEffect(() => {
        setUserRegister({
            profileImg: verifedUser.profileImg,
            name: verifedUser.name,
            lastName: verifedUser.lastName
        })
    }, [verifedUser]);
    useEffect(() => {
        if ( verifedUser.profileImg.value === userRegister.profileImg.value 
            && verifedUser.name === userRegister.name 
            && verifedUser.lastName === userRegister.lastName ) {
                console.log("Coincide");
                setWhenChange(false);
        } else {
            console.log("No coincide");
            setWhenChange(true);
        }
    }, [verifedUser, userRegister]);

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
        {
            visibleBtnUpdate ?
                <div>
                    <button onClick={cancelUpdate}>Cancel</button>
                    <button disabled={!whenChange} onClick={onUpdate}>Update</button>
                </div>
            :
                null
        }
    </>
   )
}

export default SettingsContainer;