import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import styles from './note.module.css'

const Note = () => {
    const { note } = useAppSelector((state) => state);
    // const note = ['a','a'];

    return (
        <>
            <div className={styles.mainContainerNotes}>
                {
                    note ?
                        note.map((note, index) => {
                            return (
                                <div className={styles.containerNote} key={index}>
                                    <p className={styles.title}>{note.title}</p>
                                    <p className={styles.content}>{note.content}</p>
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