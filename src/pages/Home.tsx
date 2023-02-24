import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux/index'

const Home = () => {
  const { notes } = useAppSelector((state) => state);
  console.log(notes);

  return (
    <div>
      <h1>Bienvenido, usuario</h1>
    </div>
  )
}

export default Home