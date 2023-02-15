import React, { useState } from 'react'
import SubNavBar from '../components/notes/subNavBar/SubNavBar'
import AddNewNote from '../components/notes/addNewNote/AddNewNote'

const Dashboard = () => {

  const [viewAddNewNote, setViewAddNewNote] = useState(false);

  return (
    <>
      <SubNavBar />
      {
        viewAddNewNote ? 
          <AddNewNote />
        :
          null
      }
    </>  
  )
}

export default Dashboard