import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import styles from './note.module.css'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { setNotes } from '../../../redux/slices/notes';

const Note = () => {
    const { note } = useAppSelector((state) => state);
    const noteRefs = useRef<(any | null)[]>([]);

    const [lastRef, setLastRef] = useState(null);
    const [editMode, setEditMode] = useState(false);
    
    const dispatch = useAppDispatch();

    const [singledata, setSingledata] = useState({
        title: '',
        content: ''
    });

    const deleteNote = (noteID:string) => {
        fetch("http://localhost:3001/posts/" + noteID, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(singledata)
        })
        .then(res => res.json())
        .then(data => {
          setSingledata({
            title: "",
            content: ""
          });
          updateNotes();
        })
        .catch(error => {
          console.error('Ha ocurrido un error:', error);
        });
    };

    const editNote = (noteID:string, index:number) => {
        let noteRef = noteRefs.current[index];

        if (!editMode) {
            const btnOption = noteRef.current.querySelector('.btnOption');
            const noteTitle = noteRef.current.querySelector('.noteTitle');
            const noteContent = noteRef.current.querySelector('.noteContent');

            setEditMode(true);

            btnOption.style.display = 'none';
            
            const newNoteTitle = document.createElement('input');
            newNoteTitle.type = 'text';
            newNoteTitle.value = noteTitle.innerText;
            newNoteTitle.className = styles.titleEdit;

            const newNoteContent = document.createElement('textarea');
            newNoteContent.value = noteContent.innerText;
            newNoteContent.className = styles.contentEdit;

            const btnContainer = document.createElement('div');
            btnContainer.className = styles.btnContainer;

            const cancelButton = document.createElement('button');
            cancelButton.innerText = 'Cancel';
            cancelButton.addEventListener('click', () => {
                noteRef.current.replaceChild(noteTitle, newNoteTitle);
                noteRef.current.replaceChild(noteContent, newNoteContent);
                noteRef.current.removeChild(btnContainer);
                setEditMode(false);
                btnOption.style.display = 'block';
            });
            const acceptButton = document.createElement('button');
            acceptButton.innerText = 'Ok';
            acceptButton.addEventListener('click', async () => {
                await updateNote(noteID, newNoteTitle.value, newNoteContent.value );
                noteTitle.innerText = newNoteTitle.value;
                noteContent.innerText = newNoteContent.value;
                noteRef.current.replaceChild(noteTitle, newNoteTitle);
                noteRef.current.replaceChild(noteContent, newNoteContent);
                noteRef.current.removeChild(btnContainer);
                setEditMode(false);
                btnOption.style.display = 'block';
            })
            
            noteRef.current.replaceChild(newNoteTitle, noteTitle);
            noteRef.current.replaceChild(newNoteContent, noteContent);
            noteRef.current.appendChild(btnContainer);
            btnContainer.appendChild(cancelButton);
            btnContainer.appendChild(acceptButton);
        } else {
            console.log('no puedes editar la nota');
        }

    }

    const updateNote = async (noteID:string, title:string, content:string) => {
        const data = {
            title: title,
            content: content
        };
        fetch("http://localhost:3001/posts/" + noteID, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          updateNotes();
        })
        .catch(error => {
          console.error('Ha ocurrido un error:', error);
        });
    };

    const updateNotes = async () => {
        await fetch("http://localhost:3001/posts")
          .then((res) => res.json())
          .then((res) => {
            dispatch(setNotes(res));
          })
          .catch((error) => console.error(error));
    };

    const updateNoteRef = () => {
        noteRefs.current = Array.from({ length: note?.length || 0 }).map(
          (_, i) => noteRefs.current[i] || React.createRef()
        );
        setLastRef(noteRefs.current[noteRefs.current.length - 1]);
    };

    useEffect(() => {
        updateNoteRef();
    }, [note]);

    return (
        <>
            <div className={styles.mainContainerNotes}>
                {
                    note ?
                        note.map((note, index) => {
                            return (
                                <div className={styles.containerNote} key={index} ref={noteRefs.current[index]}>
                                    <div className={ styles.divOptions }>
                                        <div className={`btnOption `+styles.iconOption } onClick={() => editNote(note.id, index)}>
                                            <FontAwesomeIcon icon={ faEdit } />
                                        </div>
                                        <div className={ styles.iconOption } onClick={() => deleteNote(note.id)}>
                                            <FontAwesomeIcon icon={ faTimes } />
                                        </div>
                                    </div>
                                    <p className={`noteTitle `+styles.title}>{note.title}</p>
                                    <p className={`noteContent `+ styles.content}>{note.content}</p>
                                </div>
                            );
                        })
                    :
                        null
                }
            </div>
        </>
    )
}

export default Note