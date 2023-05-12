import React, { createContext, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import SubNavBar from '../../components/notes/subNavBar/SubNavBar'
import AddNewNote from '../../components/notes/addNewNote/AddNewNote'
import Note from '../../components/notes/note/Note';
import '../../animations/animations.css'
import styles from './dashboard.module.css'

export const ViewAddNewNoteContext = createContext({
  viewAddNewNote: false,
  setViewAddNewNote: (value: boolean) => {},
});

const Dashboard = () => {
  const addNewNoteRef = useRef(null);

  const [viewAddNewNote, setViewAddNewNote] = useState(false);

  return (
    <>
      <ViewAddNewNoteContext.Provider value={{ viewAddNewNote, setViewAddNewNote }}>
        <div className={ styles.mainContainer }>
          <SubNavBar />
          <CSSTransition in={viewAddNewNote} timeout={200} classNames="fade" unmountOnExit nodeRef={addNewNoteRef}>
            <div ref={addNewNoteRef}>
              <AddNewNote />
            </div>
          </CSSTransition>
          <Note />
        </div>
      </ViewAddNewNoteContext.Provider>
    </>  
  )
}

export default Dashboard