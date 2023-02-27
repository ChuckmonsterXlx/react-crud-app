import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux/index'

const Home = () => {
  const { notes, verifedUser } = useAppSelector((state) => state);

  return (
    <div>
      <h1>Bienvenido, usuario {verifedUser.idUser}</h1>
    </div>
  )
}

export default Home