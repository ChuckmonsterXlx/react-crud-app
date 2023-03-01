import React from 'react'
import { useAppSelector } from '../../../hooks/redux';
import AdminView from '../adminView/AdminView';
import styles from './homeContainer.module.css'

const HomeContainer = () => {
  const { notes, verifedUser } = useAppSelector((state) => state);


  return (
    <div className={styles.mainContainer }>
      <div className={ styles.topContainer }>
        <div className={styles.img}></div>
        <h1>Welcome!  {verifedUser.name} {verifedUser.lastName}</h1>
      </div>
      <div>
        { 
          verifedUser.role === 'admin' ? 
            <AdminView />
          : verifedUser.role === 'member' ?
            <h1>Eres un miembro</h1>
          : <h1>Tienes un error en el role</h1>
        }
      </div>
    </div>
  )
}

export default HomeContainer;