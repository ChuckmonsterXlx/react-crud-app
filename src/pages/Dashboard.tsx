import React, { createContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import SubNavBar from '../components/notes/subNavBar/SubNavBar'
import AddNewNote from '../components/notes/addNewNote/AddNewNote'
import Note from '../components/notes/note/Note';
import '../animations/animations.css'

export const ViewAddNewNoteContext = createContext({
  viewAddNewNote: false,
  setViewAddNewNote: (value: boolean) => {},
});

const Dashboard = () => {

  const [viewAddNewNote, setViewAddNewNote] = useState(false);

  return (
    <>
      <ViewAddNewNoteContext.Provider value={{ viewAddNewNote, setViewAddNewNote }}>
        <SubNavBar />
        {
          viewAddNewNote ? 
            <CSSTransition in={viewAddNewNote} timeout={300} classNames="fade" unmountOnExit>
              <AddNewNote />
            </CSSTransition>
          :
            null
        }
        <Note />
      </ViewAddNewNoteContext.Provider>
    </>  
  )
}

export default Dashboard