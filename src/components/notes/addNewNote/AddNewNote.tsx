import React, { useContext, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setNotes } from '../../../redux/slices/notes';
import styles from './addNewNote.module.css'
import { ViewAddNewNoteContext } from '../../../pages/notes/Notes';

const AddNewNote = () => {
  const dispatch = useAppDispatch();
  const { verifedUser } = useAppSelector((state) => state);

  const { viewAddNewNote, setViewAddNewNote } = useContext(ViewAddNewNoteContext);

  const [singledata, setSingledata] = useState({
      title: '',
      content: '',
      userId: verifedUser.userId
  });
  
  const handleChange = (e:any) => {
    setSingledata({
      ...singledata,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (singledata.title != '' && singledata.content != ''){
      createNote();
    }
  };
  
  const createNote = () => {
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singledata)
    })
    .then(res => res.json())
    .then(data => {
      setSingledata({
        title: "",
        content: "",
        userId: verifedUser.userId
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

  return (
      <>
        <div className={styles.mainContainer}>
          <form className={styles.formContainer}>
                <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                onChange={handleChange} 
                value={singledata.title}
                />
                <textarea 
                  name="content" 
                  placeholder="Content"
                  onChange={handleChange} 
                  value={singledata.content}
                />
                <div className={styles.btnsContainer}>
                  <p className={styles.btn} onClick={hideView}>Cancelar</p>
                  <p className={styles.btn} onClick={handleSubmit}>Guardar</p>
                </div>
            </form>
        </div>
      </>
  )
}

export default AddNewNote