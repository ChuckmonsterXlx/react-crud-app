import React, { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setNotes } from '../../../redux/slices/notes';
import styles from './addNewNote.module.css'
import { ViewAddNewNoteContext } from '../../../pages/notes/Notes';

const AddNewNote = () => {
  const dispatch = useAppDispatch();
  const { verifedUser } = useAppSelector((state) => state);

  const { viewAddNewNote, setViewAddNewNote } = useContext(ViewAddNewNoteContext);

  const [singleData, setSingleData] = useState({
    title: '',
    content: '',
    userId: verifedUser.userId,
    privacy: {
      label: "Private",
      value: "private",
    },
  });
  
  const privacyOptions = [
    {
      label: "Private",
      value: "private",
    },
    {
      label: "Public",
      value: "public",
    },
  ];

  
  const handleChange = (e:any) => {
    setSingleData({
      ...singleData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (singleData.title != '' && singleData.content != ''){
      createNote();
    }
  };
  
  const createNote = () => {
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleData)
    })
    .then(res => res.json())
    .then(data => {
      setSingleData({
        title: "",
        content: "",
        userId: verifedUser.userId,
        privacy: {
          label: "Private",
          value: "private",
        },
      });
      updateNotes();
    })
    .catch(error => {
      console.error('Ha ocurrido un error:', error);
    });
  };

  const updateNotes = () => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setNotes(res));
      })
      .catch((error) => console.error(error));
  }

  const hideView = () => {
    setViewAddNewNote(!viewAddNewNote);
  }

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = privacyOptions.find((option) => option.value === selectedValue);
    if ( selectedOption ) {
      setSingleData({
        ...singleData,
        privacy: selectedOption
      });
    }
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <form className={styles.formContainer}>
          <input 
            type="text" 
            name="title" 
            placeholder="Title" 
            onChange={handleChange} 
            value={singleData.title}
          />

          <textarea 
            name="content" 
            placeholder="Content"
            onChange={handleChange} 
            value={singleData.content}
          />
          
          <div className={ styles.selectContainer }>
            <p>Privacy: </p>
            <select onChange={(event) => handlePrivacyChange(event)}>
              {privacyOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.btnsContainer}>
            <p className={styles.btn} onClick={hideView}>Cancel</p>
            <p className={styles.btn} onClick={handleSubmit}>Save</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddNewNote