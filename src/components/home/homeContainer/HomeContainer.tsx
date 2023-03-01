import React from 'react'
import { useAppSelector } from '../../../hooks/redux';
import styles from './homeContainer.module.css'

const HomeContainer = () => {
  const { notes, verifedUser } = useAppSelector((state) => state);


  return (
    <div className={styles.mainContainer }>
      <div className={styles.img}></div>
      <h1>Welcome!  {verifedUser.name} {verifedUser.lastName}</h1>
    </div>
  )
}

export default HomeContainer;